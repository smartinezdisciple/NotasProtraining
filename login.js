let DICCIONARIO = {};

fetch("codigos.json")
  .then(r => r.json())
  .then(diccionario => {
    DICCIONARIO = diccionario;
    console.log(`Cargados ${Object.keys(DICCIONARIO).length} estudiantes`);
  })
  .catch(err => console.error("Error cargando códigos:", err));

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
