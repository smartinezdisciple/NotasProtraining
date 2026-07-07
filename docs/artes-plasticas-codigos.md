# Artes Plásticas - Nueva disciplina y nuevo formato de códigos

## Cambios realizados

### 1. Nueva disciplina: Artes Plásticas
- Se agregaron 14 estudiantes activos desde la hoja "AP" del archivo `ArtesPlasticas.xlsx`
- 3 niveles: Kids (K), Básico (1), Plásticas (2)
- 2 estudiantes (André Josué Flores Ponce, Valerie López Muñoz) ya existían en otras disciplinas y fueron agrupados bajo el mismo código

### 2. Nuevo formato de código (utils.js)
- **Antes**: 4 caracteres con letras, números y caracteres especiales (ej: `u4;2`, `0>p%`)
- **Ahora**: 4 caracteres con exactamente 2 dígitos (0-9) y 2 letras (A-Z, a-z), sin especiales (ej: `9c7A`, `6lD0`, `3op0`)
- Se eliminó la constante `ESPECIALES` y se simplificó `crearDigitoCuatroCaracteresAleatorio()`

### 3. Archivos generados
- `codigos.json` — 196 códigos únicos, 317 registros de cursos
- `codigos.txt` — Formato legible, mismo contenido

### 4. Archivos modificados
- `utils.js` — Nueva generación de códigos (2 dígitos + 2 letras)
- `excel.js` — Soporte para hoja "AP" de ArtesPlasticas.xlsx, agregada a HOJAS_CURSOS
- `main.js` — Icono "palette" para Artes Plásticas

### 5. Script auxiliar
- `scripts/generar-codigos.js` — Lee ambos xlsx (excel.xlsx + ArtesPlasticas.xlsx) y genera codigos.json/codigos.txt
