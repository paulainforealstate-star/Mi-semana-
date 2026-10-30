/*
 * Lógica de negocio de Mi Semana (sin dependencias de DOM).
 * Se usa desde index.html y desde las pruebas (tests/).
 */
(function (root) {
  "use strict";

  var ESTADOS = ["PENDIENTE", "BORRADOR", "ENVIADA", "VENCIDA"];

  // Clave de orden: fecha y hora como texto ISO, comparable sin conversiones.
  function claveOrden(e) {
    return e.fecha + "T" + e.hora;
  }

  // Estado mostrado. Una entrega sin envío cuyo plazo ya pasó es VENCIDA.
  function estadoEfectivo(e, ahora) {
    if (e.estado === "ENVIADA") return "ENVIADA";
    if (e.fecha + "T" + e.hora < ahora) return "VENCIDA";
    return e.estado; // PENDIENTE o BORRADOR
  }

  // Texto visible del estado. Un borrador nunca se presenta como entregado.
  function textoEstado(e, ahora) {
    var est = estadoEfectivo(e, ahora);
    if (est === "ENVIADA") return "ENVIADA · " + e.envio;
    if (est === "BORRADOR") return "BORRADOR · no entregada";
    return est;
  }

  // Entregas ordenadas por plazo, filtradas por estado y asignatura.
  function filtrar(entregas, filtro, ahora) {
    filtro = filtro || {};
    return entregas
      .slice()
      .sort(function (a, b) { return claveOrden(a).localeCompare(claveOrden(b)); })
      .filter(function (e) {
        var est = estadoEfectivo(e, ahora);
        if (filtro.estado && filtro.estado !== "TODAS" && est !== filtro.estado) return false;
        if (filtro.asig && filtro.asig !== "TODAS" && e.asig !== filtro.asig) return false;
        return true;
      });
  }

  // Días con más de una entrega. Solo se avisa de entregas que aún no están enviadas.
  function coincidencias(entregas, ahora) {
    var porDia = {};
    entregas
      .filter(function (e) { return estadoEfectivo(e, ahora) !== "ENVIADA"; })
      .forEach(function (e) { (porDia[e.fecha] = porDia[e.fecha] || []).push(e); });
    return Object.keys(porDia)
      .filter(function (d) { return porDia[d].length > 1; })
      .sort()
      .map(function (d) { return { dia: d, entregas: porDia[d] }; });
  }

  // Entregas que el resumen del lunes debe listar: las de la semana indicada.
  function resumenSemanal(entregas, inicioISO, finISO) {
    return entregas
      .filter(function (e) { return e.fecha >= inicioISO && e.fecha <= finISO; })
      .sort(function (a, b) { return claveOrden(a).localeCompare(claveOrden(b)); });
  }

  // Calendario .ics con aviso 24 h antes. Solo entregas no enviadas.
  function generarIcs(entregas, ahora) {
    var lineas = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Mi Semana//ES", "CALSCALE:GREGORIAN"];
    entregas
      .filter(function (e) { return estadoEfectivo(e, ahora) !== "ENVIADA"; })
      .forEach(function (e) {
        var inicio = e.fecha.replace(/-/g, "") + "T" + e.hora.replace(":", "") + "00";
        lineas.push(
          "BEGIN:VEVENT",
          "UID:" + e.id + "@mi-semana",
          "DTSTART;TZID=Europe/Madrid:" + inicio,
          "DTEND;TZID=Europe/Madrid:" + inicio,
          "SUMMARY:Entrega: " + e.asig + " · " + e.titulo + " (" + e.peso + " %)",
          "BEGIN:VALARM",
          "TRIGGER:-PT24H",
          "ACTION:DISPLAY",
          "DESCRIPTION:Entrega en 24 horas",
          "END:VALARM",
          "END:VEVENT"
        );
      });
    lineas.push("END:VCALENDAR");
    return lineas.join("\r\n");
  }

  var api = {
    ESTADOS: ESTADOS,
    estadoEfectivo: estadoEfectivo,
    textoEstado: textoEstado,
    filtrar: filtrar,
    coincidencias: coincidencias,
    resumenSemanal: resumenSemanal,
    generarIcs: generarIcs
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.MiSemana = api;
})(typeof window !== "undefined" ? window : globalThis);
