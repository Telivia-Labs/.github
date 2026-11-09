#!/bin/sh
# Pase de una hora de la app de GitHub de Telivia (telivia-claude-codex), para sesiones de Claude
# en la nube. Lee la llave de la variable de entorno; nunca de un archivo del repo.
#   TELIVIA_APP_ID   número de la app (por defecto 5662261)
#   TELIVIA_APP_KEY  llave privada: el texto del .pem, o el mismo .pem en base64 de una línea
# Uso: GH_TOKEN=$(sh pase-github.sh)   ·   sh pase-github.sh owner/repo  (pase para un solo repo)
# Imprime solo el pase. No lo muestres ni lo guardes en el repo.
set -eu
APP_ID="${TELIVIA_APP_ID:-5662261}"
: "${TELIVIA_APP_KEY:?Falta TELIVIA_APP_KEY en las variables del entorno}"
LLAVE="$(mktemp)"
trap 'rm -f "$LLAVE"' EXIT
chmod 600 "$LLAVE"
case "$TELIVIA_APP_KEY" in
  *"BEGIN"*) printf '%s\n' "$TELIVIA_APP_KEY" > "$LLAVE" ;;
  *) printf '%s' "$TELIVIA_APP_KEY" | openssl base64 -d -A > "$LLAVE" ;;
esac
b64() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }
ahora=$(date +%s)
cabeza=$(printf '{"alg":"RS256","typ":"JWT"}' | b64)
cuerpo=$(printf '{"iat":%s,"exp":%s,"iss":"%s"}' $((ahora - 60)) $((ahora + 540)) "$APP_ID" | b64)
firma=$(printf '%s.%s' "$cabeza" "$cuerpo" | openssl dgst -sha256 -sign "$LLAVE" -binary | b64)
JWT="$cabeza.$cuerpo.$firma"
api() {
  curl -fsS -m 20 -H "Authorization: Bearer $JWT" -H 'Accept: application/vnd.github+json' "$@"
}
INST=$(api https://api.github.com/app/installations |
  python3 -c 'import sys,json; print(json.load(sys.stdin)[0]["id"])')
if [ $# -ge 1 ]; then datos=$(printf '{"repositories":["%s"]}' "${1#*/}"); else datos='{}'; fi
api -X POST -d "$datos" "https://api.github.com/app/installations/$INST/access_tokens" |
  python3 -c 'import sys,json; print(json.load(sys.stdin)["token"])'
