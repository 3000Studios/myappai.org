# MyAppAI private command center

The command-center UI is public code but exposes no project records or secret values. Sensitive data and operator actions must remain behind authenticated API routes.

## Required secrets

Configure these as deployment secrets and local environment values; do not place their values in source control:

- `CONTROL_GATE_PASSWORD` - the private password for the entry experience.
- `ADMIN_SESSION_SECRET` - a long random secret used to sign the HttpOnly session cookie.
- `ADMIN_EMAIL` - optional audit identity for the private operator.

## Deployment boundary

The current Node/Express operator service is local-repo infrastructure. A public Cloudflare Pages deployment must use Cloudflare Access or a Pages Function/Worker-backed API to enforce the same session check before exposing any private records or production controls. Do not publish local filesystem, Git, Cloudflare, model-provider, or deployment credentials to browser code.

## Voice behavior

The browser asks for microphone permission after the operator enters. Speech recognition is a browser capability; typed commands remain available if it is unsupported. A three-second quiet period only stages a mission in the UI. Production-impacting work requires a secured, auditable operator action.
