# Despliegue de Mi Semana

Guía para poner en marcha el piloto sobre el campus virtual (Moodle). La solución no requiere una aplicación nueva: se apoya en el bloque de cronología, en el panel de inicio y en el sistema de mensajería que ya existen.

> Antes de empezar, confirma la versión de Moodle del campus. Los nombres de menús varían entre versiones; los pasos de este documento describen el flujo general.

---

## 0. Requisitos previos

| Requisito | Responsable | Comprobación |
|---|---|---|
| Moodle con bloque «Línea de tiempo» habilitado | Campus virtual | El bloque aparece en el panel de inicio. |
| Cuenta de servicio con permisos de administración de bloques | Campus virtual | Puede añadir bloques a la portada. |
| Tareas con fecha de cierre y peso en la nota | Profesorado del piloto | Las tareas aparecen en la línea de tiempo. |
| Correo institucional operativo para el resumen semanal | Campus virtual / TI | Un correo de prueba llega a un buzón de control. |
| Tiempo de cron configurado (cada 15 minutos o menos) | Campus virtual | Las tareas programadas se ejecutan. |

## 1. Fase 0: validar el supuesto crítico (una semana antes)

El piloto depende de que todas las entregas tengan fecha. Antes de activar nada:

1. Listar las asignaturas del piloto.
2. Para cada asignatura, contar las tareas entregables y comprobar que tienen fecha de cierre y peso.
3. Anotar las que no cumplen. Se corrigen con el profesorado antes de seguir.

Criterio de paso: al menos el 95 % de las entregas del piloto tienen fecha y peso. Por debajo de ese umbral no se activa el panel.

## 2. Fase 1: configurar el panel «Mi Semana»

1. Activar el modo de edición de la portada del campus.
2. Añadir el bloque de **Línea de tiempo** en la columna lateral o principal.
3. Configurar el bloque:
   - Mostrar solo tareas con fecha de cierre.
   - Ventana de visualización: 7 días, con opción de ver más.
   - Ordenar por fecha de cierre.
4. Crear el bloque personalizado «Mi Semana» con el contenido de `prototipo/index.html` como referencia de diseño. Insertar el marcado del panel y, si el campus lo permite, los estilos de `prototipo/index.html`.
5. Comprobar que el bloque muestra peso y estado por entrega. Si el campus no muestra el peso, usar la descripción de la tarea como respaldo y anotarlo en incidencias.
6. Revisar la accesibilidad con un lector de pantalla y con una anchura de 360 px.

Criterio de paso: un estudiante de prueba encuentra sus entregas de la semana en menos de un minuto.

## 3. Fase 2: correo del lunes

1. Crear una tarea programada que se ejecute cada lunes a las 08:00 (hora de Madrid).
2. Para cada estudiante con entregas en la semana, generar el resumen con el asunto **«Tu semana: N entregas»**.
3. Usar la plantilla de correo que figura en la sección «Plantilla del resumen» más abajo.
4. Si un estudiante no tiene entregas esa semana, no enviar correo.
5. Mantener la opción de desactivarlo desde las preferencias de notificaciones.

### Plantilla del resumen

```
Asunto: Tu semana: {N} entregas

Hola {nombre}:

Estas son tus entregas de la semana del {inicio} al {fin}:

{lista ordenada por fecha: día · asignatura · título · peso · estado}

Recuerda: un borrador no está entregado hasta que aparezca como ENVIADA.
Recibirás un aviso 24 horas antes de cada plazo.

Mi Semana · Campus virtual
```

## 4. Fase 3: recordatorios y calendario

1. Activar el aviso de 24 horas antes de cada plazo para entregas PENDIENTES o en BORRADOR.
2. Habilitar la descarga del calendario (.ics) desde el panel, según lo que permita el campus.
3. Probar la descarga con un calendario de prueba en el móvil y comprobar que el aviso llega 24 horas antes.

## 5. Fase 4: formación y comunicación

1. Guía de una página para el profesorado del piloto (ver `docs/guia-profesorado.md`, pendiente de redactar).
2. Presentación de 10 minutos en clase, con una captura del panel.
3. Un cartel en cada aula del piloto con el enlace al panel.

## 6. Fase 5: piloto de cuatro semanas

| Semana | Actividad | Indicador |
|---|---|---|
| 1 | Activación y comprobación con 5 estudiantes | Entregas visibles: 100 % de las tareas del piloto |
| 2 | Piloto completo con todo el alumnado | Uso del panel (registros agregados) |
| 3 | Revisión de incidencias y ajustes | Número de tareas sin fecha o sin peso |
| 4 | Medición final y encuesta | Entregas fuera de plazo, satisfacción |

Indicadores de éxito: los de la sección 11 del README.

## 7. Verificación tras el despliegue

- [ ] El panel muestra entregas de todas las asignaturas del piloto.
- [ ] Un borrador aparece como BORRADOR y nunca como ENVIADA.
- [ ] Las coincidencias de fecha generan el aviso correspondiente.
- [ ] El correo del lunes llega solo a quien tiene entregas.
- [ ] La descarga .ics abre en el calendario del móvil.
- [ ] El panel funciona con lector de pantalla y con 360 px de ancho.
- [ ] Las pruebas de `npm test` pasan en el repositorio.

## 8. Retroceso (rollback)

Si algo sale mal, se puede volver al estado anterior sin afectar a las entregas:

1. Ocultar el bloque «Mi Semana» de la portada (no se borra, por si hace falta).
2. Desactivar la tarea programada del correo del lunes.
3. Desactivar los avisos de 24 horas.
4. Comunicar a los estudiantes el canal habitual de avisos.

Ninguna de estas acciones modifica tareas, notas ni entregas. Los datos de Moodle permanecen intactos.

## 9. Operación y mantenimiento

| Tarea | Frecuencia | Responsable |
|---|---|---|
| Revisar tareas sin fecha o sin peso | Cada inicio de semana | Campus virtual |
| Revisar que el correo del lunes se envía | Cada lunes | Campus virtual |
| Revisar incidencias de accesibilidad | Mensual | Campus virtual con el equipo |
| Actualizar el prototipo y las pruebas si cambia el diseño | Según cambios | Equipo de desarrollo |

## 10. Privacidad (RGPD)

- Base jurídica: interés público en la prestación del servicio educativo.
- Datos tratados: los ya presentes en Moodle (tareas, fechas, estado de entrega, nota de peso).
- No se guardan datos personales fuera de Moodle. El calendario .ics se genera en el navegador y no se envía a ningún servicio externo.
- Las estadísticas de uso son agregadas y no identifican a ningún estudiante.
- Antes del piloto, revisar con el delegado de protección de datos de la universidad.

## 11. Incidencias frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| Una tarea no aparece en el panel | No tiene fecha de cierre | Pedir al profesorado que la configure. |
| El estado aparece como PENDIENTE tras enviar | Sincronización pendiente | Esperar al siguiente ciclo de cron o revisar el registro de entregas. |
| El correo del lunes no llega | Tarea programada desactivada o correo bloqueado | Revisar la tarea programada y la lista de envíos. |
| El .ics no se importa | Formato de hora o zona horaria | Comprobar que la zona es Europe/Madrid y probar con otro calendario. |
