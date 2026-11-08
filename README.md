# .github · Telivia Labs

Plantillas que GitHub aplica a todos los repos de la organización sin copiarlas.

- **Tareas** (`.github/ISSUE_TEMPLATE/tarea.yml`): qué, para quién, qué debe ser siempre cierto,
  carpeta del área, fase, agente (Claude o Codex), tamaño estimado (máximo 400 líneas) y riesgos.
  No hay tareas en blanco.
- **PR** (`.github/pull_request_template.md`): qué cambia, por qué, cómo se probó (con salida real),
  cómo se revierte, «N de M» y la tarea que cierra.

Un repo que tenga su propia plantilla deja de usar la de aquí. Los agentes (Claude y Codex) no escriben
tareas a mano: usan `scripts/nueva-tarea.js` del orquestador.
