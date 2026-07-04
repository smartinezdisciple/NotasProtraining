# Agrupación de cursos por disciplina

## Cambio realizado
Se modificó `renderizarCursos()` en `main.js` para agrupar los cursos por `disciplina`.

## Comportamiento
- Los cursos se agrupan por disciplina (Idiomas, Canto, Bajo, etc.)
- Si una disciplina tiene sub-clases (ej. Inglés, Francés dentro de Idiomas): se muestra el nombre de la disciplina como título y debajo la lista de clases con su nivel y nota final.
- Si una disciplina no tiene sub-clases: se muestra como antes, una tarjeta individual con la nota final.

## Archivos modificados
- `main.js` — función `renderizarCursos` reescrita
