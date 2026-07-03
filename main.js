const ICONOS = {
  "Canto": "mic",
  "Piano": "piano",
  "Guitarra": "guitar_acoustic",
  "Bajo": "audio_video",
  "Sonido": "graphic_eq",
  "Danza": "accessibility",
  "Emociones": "favorite",
  "Idiomas": "language",
  "Deportes": "sports_soccer",
  "Batería": "drum"
};

function renderizarCursos(cursos) {
  const contenedor = document.getElementById("courses-container");
  contenedor.innerHTML = "";

  let sumaNotas = 0;

  for (const curso of cursos) {
    const icono = ICONOS[curso.disciplina] || "school";
    sumaNotas += curso.notaFinal;

    const card = document.createElement("div");
    card.className = "glass-panel rounded-xl p-6 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden";

    card.innerHTML = `
      <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="flex justify-between items-start mb-4">
        <h3 class="font-title-sm text-title-sm text-white font-semibold flex items-center gap-3">
          <span class="p-2 bg-primary-container/30 rounded-lg">
            <span class="material-symbols-outlined text-primary text-xl">${icono}</span>
          </span>
          ${curso.clase || curso.disciplina}
        </h3>
        <span class="px-3 py-1 bg-tertiary-container/20 text-tertiary-fixed border border-tertiary-container/30 rounded-full font-label-sm text-label-sm shadow-sm">
          ${curso.nivel || curso.disciplina}
        </span>
      </div>
      <div class="w-full flex justify-center mt-2 border-t border-white/5 pt-4">
        <div class="text-center">
          <p class="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-widest opacity-70">Final Grade</p>
          <p class="font-headline-md text-headline-md text-secondary-fixed">${curso.notaFinal}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  }

  const promedio = sumaNotas / cursos.length;
  document.getElementById("promedio-valor").textContent = promedio.toFixed(1) + "%";
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const data = params.get("data");
  if (!data) {
    document.getElementById("student-name").textContent = "Sin sesión";
    return;
  }

  const cursos = JSON.parse(decodeURIComponent(data));
  if (!cursos || cursos.length === 0) return;

  document.getElementById("student-name").textContent = cursos[0].nombre;
  renderizarCursos(cursos);
}

document.addEventListener("DOMContentLoaded", init);
