# VRIL LLC — sitio web

Landing de una página + Términos, Privacidad y 404. Orientado a presencia empresarial y requisitos habituales de Stripe (servicios claros, precios, contacto, políticas).

## Arranque local

```bash
npm start
```

Abre `http://localhost:5173`.

## Antes de publicar (crítico para Stripe)

Edita **`js/config.js`**:

| Campo | Notas |
| --- | --- |
| `email` | Correo real de la empresa |
| `phone` | Opcional pero recomendable |
| `location` | Ciudad o área, p. ej. `San Juan, Puerto Rico` |
| `registryNumber` | Solo si está verificado en el Dpto. de Estado de PR |
| `formspreeId` | ID de Formspree para el formulario de contacto |

También:

1. Sustituir URLs canónicas / sitemap con el dominio final.
2. Convertir `assets/og-image.svg` a PNG 1200×630 si el host de compartir no acepta SVG.
3. Revisar Términos y Privacidad con un abogado en Puerto Rico (hoy son borradores).
4. Confirmar el rojo de marca (`#C8102E` en CSS).
5. Desplegar en HTTPS (Vercel, Netlify, etc.) y enlazar esa URL en Stripe.

## Estructura

```
index.html          Landing
terminos.html       Términos (con política de reembolso)
privacidad.html     Aviso de privacidad
404.html
css/styles.css
js/config.js        Datos editables
js/main.js
assets/
```

## Despliegue rápido (Vercel)

1. Sube el repo o arrastra la carpeta a Vercel.
2. Framework preset: Other / static.
3. Dominio personalizado recomendado (ej. `vril.pr` o `www.vrilllc.com`).
