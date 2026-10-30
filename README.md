# Mi Semana

Panel y resumen semanal que reúnen todas las entregas de todas las asignaturas de Moodle en un solo sitio, ordenadas por fecha y estado.

> Propuesta de valor: «Todo lo que tienes que entregar, en un solo sitio y a tiempo».

Proyecto derivado de la práctica «Mi Semana · Práctica Doble Diamante» (Diseño y Mantenimiento de Servicios, Grado en Ciencia, Gestión e Ingeniería de Servicios, URJC).

---

## 1. Problema

Los plazos de un estudiante están repartidos en las aulas de Moodle de cada asignatura. Los avisos importantes se pierden entre notificaciones que no requieren acción: en el recuento del grupo, cada persona recibió entre 40 y 75 avisos en una semana, y solo entre 3 y 6 pedían una acción.

Datos de referencia (una clase, n = 28, y una semana de observación):

- 21 de 28 estudiantes olvidaron o entregaron tarde alguna tarea por no ver el plazo.
- 24 de 28 reconocen que no leen la mayoría de los correos del campus.

## 2. Objetivo

Que cada estudiante sepa en menos de un minuto qué tiene que entregar esta semana, en qué orden y en qué estado, sin revisar cada aula de Moodle.

## 3. Usuarios

- **Principal:** estudiantes con varias asignaturas. Persona ficticia: Marta, 20 años, seis asignaturas, trabaja los fines de semana y estudia en el tren.
- **Secundarios:**
  - Profesorado: publica las tareas con fecha y peso.
  - Servicio de campus virtual: configura el bloque del panel y el correo semanal.

## 4. Restricciones

- No cambiar de plataforma: debe funcionar sobre Moodle, aprovechando funciones existentes.
- No aumentar el trabajo docente.
- Debe funcionar bien en el móvil.

## 5. Alcance

**Dentro:** panel de entregas, estados, confirmación de envío, resumen semanal por correo, recordatorios y exportación al calendario.

**Fuera:** metodología docente, calendario académico, criterios de evaluación, asistente conversacional (idea descartada) y actividades que no se entregan en Moodle, como exposiciones orales.

## 6. Componentes

### 6.1 Panel «Mi Semana» (portada del campus)

- Lista única de entregas de todas las asignaturas, ordenadas por fecha de cierre.
- Cada entrega muestra: asignatura (con color propio), título de la tarea, fecha y hora de cierre, peso en la nota (%) y estado.
- Filtros por estado (todas, pendientes, borradores, enviadas) y por asignatura.
- Alerta de coincidencias: si dos o más entregas vencen el mismo día, aparece un aviso que indica cuáles son y cuánto pesa cada una.
- Botón «Añadir a mi calendario» (global y por entrega).

### 6.2 Estados de una entrega

| Estado | Significado | Color | Texto visible |
|---|---|---|---|
| PENDIENTE | No hay archivo subido. | Azul | PENDIENTE |
| BORRADOR | Archivo subido, pero no enviado. | Naranja | BORRADOR · no entregada |
| ENVIADA | Entrega registrada. | Verde | ENVIADA · dd/mm/aaaa hh:mm |
| VENCIDA | Plazo cumplido sin entrega. | Rojo | VENCIDA |

El estado siempre se indica también con texto, nunca solo con color.

### 6.3 Confirmación de envío

- Pantalla con «ENVIADA», fecha y hora exactas, nombre del archivo y aviso de copia por correo.
- Enlace de vuelta al panel.
- «Borrador» debe ser inequívoco: otro color, otro icono y el texto «no entregada».

### 6.4 Resumen semanal por correo

- Un único correo cada lunes a las 08:00: «Tu semana: N entregas».
- Lista ordenada por fecha, con asignatura, peso y estado.
- Sustituye a los avisos sueltos sobre tareas.
- Se puede desactivar desde preferencias, pero viene activado por defecto.

### 6.5 Recordatorios

- Aviso 24 horas antes de cada plazo para entregas PENDIENTES o BORRADOR.
- Exportación de fechas a un archivo de calendario (.ics) compatible con el calendario del móvil.

### 6.6 Coordinación de plazos (fase posterior)

- Vista del peso de cada tarea y aviso cuando dos entregas coinciden, para priorizar.

## 7. Flujos de usuario

**F1. Ver la semana.** El estudiante entra en Moodle, ve el panel en la portada y encuentra sus entregas en menos de un minuto.

**F2. Comprobar un envío.** Tras subir el archivo, ve la confirmación «ENVIADA» y recibe la copia por correo.

**F3. Planificar en el móvil.** Pulsa «Añadir a mi calendario» y el plazo queda en la agenda con aviso 24 h antes.

**F4. Lunes.** Recibe el correo resumen y no necesita revisar las aulas.

## 8. Criterios de aceptación

- [ ] Las entregas de todas las asignaturas aparecen en un único listado ordenado por fecha.
- [ ] Cada entrega muestra asignatura, título, fecha y hora, peso y estado.
- [ ] Un borrador nunca se muestra como enviado.
- [ ] Si dos entregas vencen el mismo día, aparece la alerta de coincidencia.
- [ ] El filtro por estado y el filtro por asignatura funcionan juntos.
- [ ] La exportación genera un archivo .ics válido con fecha de cierre y aviso de 24 horas.
- [ ] El correo del lunes llega solo si hay entregas en la semana.
- [ ] El panel es utilizable con 360 px de ancho y con lector de pantalla.
- [ ] El contraste de texto cumple WCAG AA (4,5:1 para texto normal).

## 9. Datos necesarios

| Dato | Origen | Obligatorio |
|---|---|---|
| Fecha y hora de cierre | Configurada por el profesorado | Sí |
| Peso en la nota (%) | Configurado por el profesorado | Sí |
| Asignatura y color | Campus virtual | Sí |
| Estado y fecha de envío | Registro de entregas de Moodle | Sí |
| Nombre del archivo enviado | Registro de entregas | No (solo en confirmación) |

**Supuesto crítico:** el profesorado registra todas las entregas como tareas con fecha. Hay que validarlo en el piloto.

## 10. Requisitos no funcionales

- **Móvil primero:** diseño responsive, con navegación y botones de al menos 44 × 44 px.
- **Accesibilidad:** contraste suficiente, compatibilidad con lector de pantalla, navegación por teclado y el estado nunca solo por color.
- **Privacidad:** no guardar datos personales fuera de lo necesario. Las estadísticas de uso son agregadas, sin nombres.
- **Rendimiento:** el panel se muestra en menos de 2 segundos con una conexión normal.

## 11. Criterios de éxito

- Reducir las entregas olvidadas o fuera de plazo un 30 % frente al mismo periodo del curso anterior.
- Uso semanal del panel por al menos el 60 % del alumnado.
- Encontrar las entregas de la semana en menos de un minuto (prueba cronometrada con 10 estudiantes).
- Satisfacción de 4/5 o más en una encuesta breve al final del piloto.

## 12. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Tareas sin fecha | Guía breve para docentes y comprobación del registro antes del piloto. |
| El resumen se convierte en un correo más | Sustituir avisos, no sumarlos. |
| Bajo uso del panel | Ofrecerlo en la portada y no solo en el aula. |
| Problemas de accesibilidad | Revisar contraste, lector de pantalla y uso móvil antes del lanzamiento. |

## 13. Plan de lanzamiento

1. **Piloto de cuatro semanas** en las asignaturas de primer curso de un grado.
2. **Configuración** de la portada, el bloque del panel y el correo semanal. No se desarrolla una aplicación nueva.
3. **Guía breve** para el profesorado y comprobación de que las tareas están registradas con fecha.
4. **Presentación** de la propuesta en clase y aviso en cada aula.
5. **Medición** de los indicadores de la sección 11.

## 14. Preguntas abiertas

- ¿Qué pasa si un profesor no pone fecha a una tarea? ¿Aparece en el panel como «sin fecha»?
- ¿Cómo se tratan las presentaciones orales, que no se entregan en Moodle?
- ¿Quién mantiene la configuración del bloque después del piloto?
- ¿Se puede mostrar el peso de cada tarea en la nota sin cambiar la configuración de calificaciones?

## 15. Origen del diseño

Creado con el modelo del Doble Diamante (Design Council, 2007, 2019). Herramientas usadas: desk research, preguntas a mano alzada, Customer Journey Map, persona y mapa de empatía, Crazy 8's, SCAMPER, matriz impacto/esfuerzo, storyboard, service blueprint y prototipo en papel con prueba de usuarios.

Prototipo navegable: `prototipo/index.html`.

---

## 16. Arquitectura

```
mi-semana/
├── README.md                 Especificación (este documento)
├── package.json              Scripts: test
├── prototipo/
│   ├── index.html            Prototipo navegable (panel, confirmación, correo)
│   ├── logica.js             Reglas de negocio sin dependencias de DOM
│   └── datos.js              Datos de ejemplo
├── tests/
│   └── logica.test.js        Pruebas de las reglas de negocio
└── docs/
    └── despliegue.md         Guía de despliegue, retroceso y operación
```

La separación es deliberada: las reglas de negocio (`logica.js`) no dependen de la pantalla. Así se pueden probar sin navegador y reutilizar en el campus.

## 17. Modelo de datos

Cada entrega tiene la siguiente forma:

```json
{
  "id": 2,
  "asig": "Marketing",
  "color": "#8a4b00",
  "titulo": "Caso 1",
  "fecha": "2026-11-12",
  "hora": "14:00",
  "peso": 30,
  "estado": "BORRADOR",
  "envio": null,
  "archivo": "caso1_borrador.docx"
}
```

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | entero | Sí | Identificador de la tarea en Moodle. |
| `asig` | texto | Sí | Nombre de la asignatura. |
| `color` | color hexadecimal | Sí | Un color por asignatura, con contraste suficiente. |
| `titulo` | texto | Sí | Título de la tarea. |
| `fecha` | AAAA-MM-DD | Sí | Fecha de cierre. |
| `hora` | HH:MM | Sí | Hora de cierre, zona Europe/Madrid. |
| `peso` | entero 0–100 | Sí | Peso en la nota final, en porcentaje. |
| `estado` | PENDIENTE, BORRADOR o ENVIADA | Sí | VENCIDA no se guarda: se calcula. |
| `envio` | texto con fecha y hora | Solo si ENVIADA | Fecha y hora del envío registrado. |
| `archivo` | texto | No | Nombre del archivo subido. |

**Regla de cálculo:** VENCIDA se deriva. Una entrega sin envío cuyo plazo ya ha pasado se muestra como VENCIDA. Una entrega ENVIADA nunca se muestra como vencida.

## 18. Reglas de negocio

| Regla | Dónde está | Prueba |
|---|---|---|
| Un borrador nunca se muestra como entregado | `textoEstado` | «un borrador nunca se presenta como entregado» |
| Una entrega enviada no se marca como vencida | `estadoEfectivo` | «una entrega enviada nunca se marca como vencida…» |
| El listado sale por fecha y hora | `filtrar` | «el listado sale ordenado por fecha y hora» |
| Dos entregas el mismo día generan alerta | `coincidencias` | «dos entregas el mismo día generan una coincidencia» |
| El resumen solo incluye su semana | `resumenSemanal` | «el resumen semanal incluye solo…» |
| El .ics tiene aviso de 24 h y excluye enviadas | `generarIcs` | «el .ics contiene aviso de 24 horas…» |

## 19. Cómo ejecutar

Requisitos: Node.js 18 o superior (solo para las pruebas; el prototipo funciona sin Node).

```bash
npm test                    # ejecuta las pruebas de la lógica de negocio
```

Para ver el prototipo, abre `prototipo/index.html` en el navegador.

## 20. Historial de versiones

| Versión | Cambios |
|---|---|
| 0.1 | Especificación inicial y prototipo con datos fijos. |
| 0.2 | Lógica separada en `logica.js`, filtros, alerta de coincidencias, exportación .ics, pruebas automatizadas, guía de despliegue y estados con texto. |

## 21. Pendiente antes del piloto

- [ ] Redactar `docs/guia-profesorado.md`.
- [ ] Validar el supuesto crítico con el profesorado (sección 1 de `docs/despliegue.md`).
- [ ] Revisión de privacidad con el delegado de protección de datos.
- [ ] Prueba de accesibilidad con lector de pantalla y con usuarios reales.
- [ ] Responder a las preguntas abiertas de la sección 14.
