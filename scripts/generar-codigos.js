const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function caracterAleatorio(conjunto) {
  return conjunto[Math.floor(Math.random() * conjunto.length)];
}

function crearDigitoCuatroCaracteresAleatorio() {
  const digitos = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  ];
  const letras = [
    caracterAleatorio(ALFABETO),
    caracterAleatorio(ALFABETO)
  ];
  const arr = [...digitos, ...letras];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function leerDisciplinasOriginales(filePath) {
  const HOJAS_CURSOS = [
    "Canto", "Piano", "Guitarra", "Bajo", "Sonido",
    "Danza", "Emociones", "Idiomas", "Deportes", "Batería"
  ];
  const wb = XLSX.readFile(filePath);
  const filas = [];
  for (const nombreHoja of HOJAS_CURSOS) {
    if (!wb.SheetNames.includes(nombreHoja)) continue;
    const hojas = XLSX.utils.sheet_to_json(wb.Sheets[nombreHoja], { header: 1 });
    for (const f of hojas) {
      const [nombre, clase, nivel, acumulado, practico, teorico, notaFinal] = f;
      if (!nombre || nombre === "Nombre del estudiante") continue;
      if (notaFinal === undefined || notaFinal === null) continue;
      filas.push({
        nombre: String(nombre).trim(),
        clase: String(clase || "").trim(),
        nivel: String(nivel || "").trim(),
        acumulado: Number(acumulado) || 0,
        practico: Number(practico) || 0,
        teorico: Number(teorico) || 0,
        notaFinal: Number(notaFinal) || 0,
        disciplina: nombreHoja
      });
    }
  }
  return filas;
}

function leerArtesPlasticas(filePath) {
  const wb = XLSX.readFile(filePath);
  const data = XLSX.utils.sheet_to_json(wb.Sheets["AP"], { header: 1 });
  const filas = [];
  let started = false;
  for (const row of data) {
    if (!row || row.length === 0) continue;
    if (row[1] === "Nombre completo") {
      started = true;
      continue;
    }
    if (!started) continue;
    const nombre = row[1];
    const nivel = row[2];
    const estado = row[3];
    if (!nombre || estado !== "A") continue;
    let clase, acumulado, practico, teorico, notaFinal, notaFinalRaw;
    if (nivel === "K") {
      clase = "Artes Plásticas Kids";
      acumulado = Number(row[4]) || 0;
      practico = Number(row[5]) || 0;
      teorico = Number(row[6]) || 0;
      notaFinalRaw = row[7];
    } else if (nivel === 1 || nivel === "1") {
      clase = "Artes Plásticas Básico";
      acumulado = Number(row[8]) || 0;
      practico = Number(row[9]) || 0;
      teorico = Number(row[10]) || 0;
      notaFinalRaw = row[9];
    } else if (nivel === 2 || nivel === "2") {
      clase = "Artes Plásticas";
      acumulado = Number(row[12]) || 0;
      practico = Number(row[13]) || 0;
      teorico = Number(row[14]) || 0;
      notaFinalRaw = row[15];
    } else {
      continue;
    }
    if (notaFinalRaw === undefined || notaFinalRaw === null) continue;
    notaFinal = Number(notaFinalRaw) || 0;
    filas.push({
      nombre: String(nombre).trim(),
      clase,
      nivel: String(nivel).trim(),
      acumulado,
      practico,
      teorico,
      notaFinal,
      disciplina: "Artes Plásticas"
    });
  }
  return filas;
}

function generarDiccionarioCodigos(estudiantes) {
  const grupos = {};
  for (const est of estudiantes) {
    if (!grupos[est.nombre]) grupos[est.nombre] = [];
    grupos[est.nombre].push(est);
  }
  const nombres = Object.keys(grupos);
  const codigos = new Set();
  while (codigos.size < nombres.length) {
    codigos.add(crearDigitoCuatroCaracteresAleatorio());
  }
  const listaCodigos = Array.from(codigos);
  const diccionario = {};
  nombres.forEach((nombre, i) => {
    diccionario[listaCodigos[i]] = grupos[nombre];
  });
  return diccionario;
}

function generarTxt(diccionario, estudiantes) {
  let txt = `Total estudiantes: ${estudiantes.length}\n`;
  txt += "=".repeat(60) + "\n\n";
  for (const [codigo, cursos] of Object.entries(diccionario)) {
    const nombre = cursos[0].nombre;
    txt += `${codigo}  |  ${nombre} (${cursos.length} curso(s))\n`;
    for (const c of cursos) {
      txt += `        ${c.disciplina} - ${c.clase} | Nivel: ${c.nivel} | Nota: ${c.notaFinal}\n`;
    }
    txt += "\n";
  }
  return txt;
}

const rootDir = path.join(__dirname, "..");

const estudiantesOriginales = leerDisciplinasOriginales(path.join(rootDir, "excel.xlsx"));
const estudiantesArtes = leerArtesPlasticas(path.join(rootDir, "ArtesPlasticas.xlsx"));

const todos = [...estudiantesOriginales, ...estudiantesArtes];
const diccionario = generarDiccionarioCodigos(todos);

fs.writeFileSync(path.join(rootDir, "codigos.json"), JSON.stringify(diccionario, null, 2), "utf-8");
fs.writeFileSync(path.join(rootDir, "codigos.txt"), generarTxt(diccionario, todos), "utf-8");

console.log(`Estudiantes originales: ${estudiantesOriginales.length}`);
console.log(`Estudiantes Artes Plásticas: ${estudiantesArtes.length}`);
console.log(`Total estudiantes: ${todos.length}`);
console.log(`Total códigos generados: ${Object.keys(diccionario).length}`);
console.log("codigos.json y codigos.txt generados exitosamente.");
