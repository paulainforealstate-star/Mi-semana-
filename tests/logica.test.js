"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const M = require("../prototipo/logica.js");

const AHORA = "2026-11-09T08:00";

const base = [
  { id: 1, asig: "Estadística", color: "#000", titulo: "P2", fecha: "2026-11-11", hora: "23:59", peso: 20, estado: "ENVIADA", envio: "11/11/2026 18:42" },
  { id: 2, asig: "Marketing", color: "#000", titulo: "Caso", fecha: "2026-11-12", hora: "14:00", peso: 30, estado: "BORRADOR" },
  { id: 3, asig: "Diseño", color: "#000", titulo: "Póster", fecha: "2026-11-12", hora: "23:59", peso: 10, estado: "PENDIENTE" },
  { id: 4, asig: "Economía", color: "#000", titulo: "Test", fecha: "2026-11-13", hora: "12:00", peso: 5, estado: "PENDIENTE" }
];

test("un plazo ya pasado sin envío se muestra como VENCIDA", () => {
  const vencida = { fecha: "2026-11-02", hora: "10:00", estado: "PENDIENTE" };
  assert.equal(M.estadoEfectivo(vencida, AHORA), "VENCIDA");
});

test("una entrega enviada nunca se marca como vencida aunque el plazo haya pasado", () => {
  const enviada = { fecha: "2026-11-02", hora: "10:00", estado: "ENVIADA", envio: "x" };
  assert.equal(M.estadoEfectivo(enviada, AHORA), "ENVIADA");
});

test("un borrador nunca se presenta como entregado", () => {
  const borrador = base[1];
  const texto = M.textoEstado(borrador, AHORA);
  assert.equal(texto, "BORRADOR · no entregada");
  assert.ok(!/ENVIADA/.test(texto));
});

test("el listado sale ordenado por fecha y hora", () => {
  const desordenado = [base[3], base[1], base[0], base[2]];
  const orden = M.filtrar(desordenado, {}, AHORA).map((e) => e.id);
  assert.deepEqual(orden, [1, 2, 3, 4]);
});

test("el filtro por estado funciona", () => {
  const solo = M.filtrar(base, { estado: "PENDIENTE" }, AHORA).map((e) => e.id);
  assert.deepEqual(solo, [3, 4]);
});

test("el filtro por asignatura funciona", () => {
  const solo = M.filtrar(base, { asig: "Marketing" }, AHORA).map((e) => e.id);
  assert.deepEqual(solo, [2]);
});

test("dos entregas el mismo día generan una coincidencia", () => {
  const c = M.coincidencias(base, AHORA);
  assert.equal(c.length, 1);
  assert.equal(c[0].dia, "2026-11-12");
  assert.equal(c[0].entregas.length, 2);
});

test("una entrega ya enviada no cuenta para coincidencias", () => {
  const datos = [
    { id: 5, asig: "A", fecha: "2026-11-12", hora: "10:00", peso: 1, estado: "ENVIADA", envio: "x" },
    { id: 6, asig: "B", fecha: "2026-11-12", hora: "11:00", peso: 1, estado: "PENDIENTE" }
  ];
  assert.equal(M.coincidencias(datos, AHORA).length, 0);
});

test("el resumen semanal incluye solo las entregas de la semana indicada", () => {
  const datos = base.concat([
    { id: 7, asig: "Fuera", fecha: "2026-11-20", hora: "10:00", peso: 1, estado: "PENDIENTE" }
  ]);
  const semana = M.resumenSemanal(datos, "2026-11-09", "2026-11-15").map((e) => e.id);
  assert.deepEqual(semana, [1, 2, 3, 4]);
});

test("el .ics contiene aviso de 24 horas y excluye las entregas enviadas", () => {
  const ics = M.generarIcs(base, AHORA);
  assert.ok(ics.startsWith("BEGIN:VCALENDAR"));
  assert.ok(ics.trimEnd().endsWith("END:VCALENDAR"));
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 3);
  assert.equal((ics.match(/TRIGGER:-PT24H/g) || []).length, 3);
  assert.ok(!/UID:1@mi-semana/.test(ics));
});
