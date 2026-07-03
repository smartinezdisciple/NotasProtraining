const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const ESPECIALES = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

function caracterAleatorio(conjunto) {
  return conjunto[Math.floor(Math.random() * conjunto.length)];
}

export function crearDigitoCuatroCaracteresAleatorio() {
  const letra = caracterAleatorio(ALFABETO);
  const especial = caracterAleatorio(ESPECIALES);
  const numero = Math.floor(Math.random() * 10);
  const grupos = [
    () => caracterAleatorio(ALFABETO),
    () => caracterAleatorio(ESPECIALES),
    () => Math.floor(Math.random() * 10)
  ];
  const aleatorio = grupos[Math.floor(Math.random() * 3)]();
  const arr = [letra, especial, numero, aleatorio];
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
