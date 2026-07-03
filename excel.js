const HOJAS_CURSOS = [
  "Canto", "Piano", "Guitarra", "Bajo", "Sonido",
  "Danza", "Emociones", "Idiomas", "Deportes", "Batería"
];

export function leerExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
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
        resolve(filas);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
