# .github · Telivia Labs

Plantillas que GitHub aplica a todos los repos de la organización sin copiarlas.

- **Tareas** (`.github/ISSUE_TEMPLATE/tarea.yml`): qué, para quién, qué debe ser siempre cierto,
  carpeta del área, fase, agente (Claude o Codex), tamaño estimado (máximo 400 líneas) y riesgos.
  No hay tareas en blanco.
- **PR** (`.github/pull_request_template.md`): qué cambia, por qué, cómo se probó (con salida real),
  cómo se revierte, «N de M» y la tarea que cierra.

Límites: PR de máximo 400 líneas cambiadas sin contar lo generado (si es más, PR consecutivos «N de M»,
sin excepciones). Código nuevo o tocado: máximo 100 caracteres por línea, 300 líneas por archivo y
50 líneas por función, sin contar líneas en blanco ni comentarios. Lo heredado que ya se pasa se
registra y no puede crecer.

Un repo que tenga su propia plantilla deja de usar la de aquí. Los agentes (Claude y Codex) no escriben
tareas a mano: usan `scripts/nueva-tarea.js` del orquestador.
