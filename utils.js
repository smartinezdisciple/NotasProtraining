const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function caracterAleatorio(conjunto) {
  return conjunto[Math.floor(Math.random() * conjunto.length)];
}

export function crearDigitoCuatroCaracteresAleatorio() {
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

export function generarDiccionarioCodigos(estudiantes) {
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
