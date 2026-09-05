# Invitación · Mis 19 · Glenda

Invitación web para el cumpleaños número 19 de Glenda.
HTML, CSS y JavaScript puro — sin frameworks ni build.

## Evento

| | |
|---|---|
| **Fecha** | Domingo 6 de septiembre de 2026 |
| **Hora** | 5:00 PM |
| **Lugar** | 33836 S 7000 W, West Valley City, Utah 84128 |

## Qué incluye

- Portada con sobre de apertura y animación de pétalos
- Cuenta regresiva en tiempo real
- Tarjetas de fecha, hora y ubicación con enlace a Google Maps
- Botón para agregar el evento al calendario (`.ics`)
- Galería de imágenes
- **Confirmación de asistencia por WhatsApp** con mensaje automático

## Estructura

```
index.html          Marcado de la invitación
css/styles.css      Estilos y animaciones
js/main.js          Cuenta regresiva, pétalos, RSVP y calendario
assets/             Imágenes (generadas con Higgsfield)
```

## Cambiar los datos del evento

Todo está centralizado en `CONFIG`, al inicio de `js/main.js`:

```js
const CONFIG = {
  nombre:    'Glenda',
  edad:      19,
  fecha:     new Date(2026, 8, 6, 17, 0, 0),  // mes 8 = septiembre
  duracionH: 5,
  direccion: '33836 S 7000 W, West Valley City, Utah 84128',
  whatsapp:  '13857700508'
};
```

El texto visible de la fecha y la hora también aparece en `index.html`
(`#heroFecha`, `#datoFecha`, `#datoHora`).

## Desarrollo local

Cualquier servidor estático sirve:

```bash
npx --yes serve .
```

## Créditos

Imágenes generadas con [Higgsfield](https://higgsfield.ai).
Tipografías: Cormorant Garamond, Great Vibes y Montserrat (Google Fonts).
