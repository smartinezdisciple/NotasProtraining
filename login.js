const CODIGO = "N5&U";

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigoIngresado = document.getElementById("access-code").value.trim();

  if (codigoIngresado === CODIGO) {
    window.location.href = "index.html";
  } else {
    alert("Código incorrecto. Intenta de nuevo.");
  }
});
