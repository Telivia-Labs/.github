#!/usr/bin/env bash
# Detector de impeccable (Apache-2.0, sin IA) sobre los archivos de pantalla que toca el PR.
# Usa BASE y NUEVO (commits) y OBLIGATORIO ("true" frena el PR; si no, solo informa).
# Deja impeccable.json con los hallazgos para medir falsos positivos.
set -euo pipefail

aqui="$(cd "$(dirname "$0")" && pwd)"
detector="$aqui/node_modules/.bin/impeccable"

mapfile -t archivos < <(
  git diff --name-only --diff-filter=AMR "$BASE...$NUEVO" -- \
    '*.css' '*.html' '*.htm' '*.jsx' '*.tsx' '*.vue' '*.svelte' |
    grep -Ev '(^|/)(node_modules|vendor|dist)/|\.min\.css$' || true
)

if [ "${#archivos[@]}" -eq 0 ]; then
  echo "impeccable: este PR no toca archivos de pantalla."
  exit 0
fi

echo "impeccable: revisando ${#archivos[@]} archivo(s)."
"$detector" detect --json "${archivos[@]}" > impeccable.json || true

estado=0
"$detector" detect --github "${archivos[@]}" || estado=$?

hallazgos="$(node -e 'console.log(JSON.parse(require("fs").readFileSync(0, "utf8")).length)' \
  < impeccable.json)"
echo "impeccable: ${hallazgos} hallazgo(s)."

if [ "$estado" -ne 0 ] && [ "${OBLIGATORIO:-false}" = "true" ]; then
  echo "::error::impeccable encontró problemas de diseño (revisión obligatoria)."
  exit "$estado"
fi
if [ "$estado" -ne 0 ]; then
  echo "::notice::impeccable solo informa por ahora: estos hallazgos no frenan el PR."
fi
exit 0
