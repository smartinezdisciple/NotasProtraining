const HOJAS_CURSOS = [
  "Canto", "Piano", "Guitarra", "Bajo", "Sonido",
  "Danza", "Emociones", "Idiomas", "Deportes", "Batería",
  "Artes Plásticas"
];

function parsearHojaAP(data) {
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

export function leerExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
        let filas = [];
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
        if (wb.SheetNames.includes("AP")) {
          const dataAP = XLSX.utils.sheet_to_json(wb.Sheets["AP"], { header: 1 });
          const ap = parsearHojaAP(dataAP);
          filas = filas.concat(ap);
        }
        resolve(filas);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
