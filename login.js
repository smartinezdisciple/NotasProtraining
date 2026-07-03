import { generarDiccionarioCodigos } from "./utils.js";
import { leerExcel } from "./excel.js";

let DICCIONARIO = {};

fetch("excel.xlsx")
  .then(r => r.arrayBuffer())
  .then(buf => leerExcel(new File([buf], "excel.xlsx")))
  .then(estudiantes => {
    DICCIONARIO = generarDiccionarioCodigos(estudiantes);
    console.log(`Cargados ${Object.keys(DICCIONARIO).length} estudiantes`);
  })
  .catch(err => console.error("Error cargando Excel:", err));

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const codigo = document.getElementById("access-code").value.trim();
  const cursos = DICCIONARIO[codigo];
  if (cursos) {
    const params = new URLSearchParams({ data: JSON.stringify(cursos) });
    window.location.href = "main.html?" + params.toString();
  } else {
    alert("Código incorrecto. Intenta de nuevo.");
  }
});
