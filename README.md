# VRIL LLC — sitio web

Landing + Términos, Privacidad y 404. Orientado a presencia empresarial y requisitos habituales de Stripe.

## En vivo

- **Producción:** https://vrilwebapp.vercel.app
- **GitHub:** https://github.com/itsConflei/VrilWebApp
- **Formulario:** Formspree `mpppaeop` → correo del admin configurado en Formspree

## Arranque local

```bash
npm start
```

Abre `http://localhost:5173`.

## Configuración (`js/config.js`)

| Campo | Estado |
| --- | --- |
| `siteUrl` | `https://vrilwebapp.vercel.app` |
| `formspreeId` | `mpppaeop` |
| `email` | Placeholder — poner correo real |
| `phone` | Vacío (opcional, recomendado) |
| `location` | `Puerto Rico` — idealmente ciudad |
| `registryNumber` | Solo si está verificado en PR |

## Pendiente antes de Stripe

1. Correo real del administrador (sitio + Formspree).
2. Ciudad / área de servicio.
3. Teléfono (recomendado).
4. Revisión legal de Términos y Privacidad en Puerto Rico.
5. Dominio propio (opcional pero más profesional).
6. Probar envío del formulario de punta a punta.

## Despliegue

Push a `main` en GitHub → Vercel redespliega automáticamente.
