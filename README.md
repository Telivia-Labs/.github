# .github · Telivia Labs

Plantillas que GitHub aplica a todos los repos de la organización sin copiarlas.

- **Tareas** (`.github/ISSUE_TEMPLATE/tarea.yml`): qué, para quién, qué debe ser siempre cierto,
  carpeta del área, fase, agente (Claude o Codex), tamaño estimado (máximo 400 líneas) y riesgos.
  No hay tareas en blanco.
- **PR** (`.github/pull_request_template.md`): qué cambia, por qué, cómo se probó (con salida real),
  cómo se revierte, «N de M», el agente (Cerebro, que es Claude, o Dexter, que es Codex) y la tarea
  que cierra.

Límites: PR de máximo 400 líneas cambiadas sin contar lo generado ni los archivos borrados completos
(decisión de Juan, 8 nov 2026; si es más, PR consecutivos «N de M»,
sin excepciones). Código nuevo o tocado: máximo 100 caracteres por línea, 300 líneas por archivo y
50 líneas por función, sin contar líneas en blanco ni comentarios. Lo heredado que ya se pasa se
registra y no puede crecer.

Un repo que tenga su propia plantilla deja de usar la de aquí. Los agentes (Claude y Codex) no escriben
tareas a mano: usan `scripts/nueva-tarea.js` del orquestador.

## Revisor de forma
`.github/workflows/forma.yml` falla el PR si el título no es Conventional Commits en inglés de máximo
72 caracteres, si falta una sección de la plantilla, si pasa de 400 líneas sin contar lo generado o si
no enlaza una tarea («Closes #12»). También si el código nuevo tiene líneas de más de 100 caracteres o un
archivo nuevo de más de 300 líneas; las 50 líneas por función las revisa ESLint (paso «limites» de
telivia-calidad). Falla la tarea si le falta un campo obligatorio, y avisa en ella.

Cada repo lo llama con este archivo, `.github/workflows/revisar-forma.yml`:

```yaml
name: revisar-forma
on:
  pull_request:
    types: [opened, edited, synchronize, reopened]
  issues:
    types: [opened, edited]
permissions:
  contents: read
  pull-requests: read
  issues: write
jobs:
  forma:
    uses: Telivia-Labs/.github/.github/workflows/forma.yml@main
    # with:
    #   generados: "supabase/tipos/, *.generado.ts"   # lo que no cuenta como líneas
```

Pruebas: `node --test` (sin librerías, Node 22).
