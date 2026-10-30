/*
 * Datos de ejemplo para el prototipo. En producción vendrían del campus virtual.
 * Semana de demostración: del 9 al 15 de noviembre de 2026.
 */
(function (root) {
  "use strict";

  root.MiSemanaDatos = {
    ahora: "2026-11-09T08:00",
    entregas: [
      { id: 1, asig: "Estadística", color: "#1f4e79", titulo: "Práctica 2", fecha: "2026-11-11", hora: "23:59", peso: 20, estado: "ENVIADA", envio: "11/11/2026 18:42", archivo: "practica2_estadistica.pdf" },
      { id: 2, asig: "Marketing", color: "#8a4b00", titulo: "Caso 1", fecha: "2026-11-12", hora: "14:00", peso: 30, estado: "BORRADOR", archivo: "caso1_borrador.docx" },
      { id: 3, asig: "Diseño de servicios", color: "#5b2c83", titulo: "Póster del servicio", fecha: "2026-11-12", hora: "23:59", peso: 10, estado: "PENDIENTE" },
      { id: 4, asig: "Economía", color: "#1e6b30", titulo: "Test 3", fecha: "2026-11-13", hora: "12:00", peso: 5, estado: "PENDIENTE" }
    ]
  };
})(typeof window !== "undefined" ? window : globalThis);
