const ICONOS = {
  "Canto": "mic_external_on",
  "Piano": "piano",
  "Guitarra": "music_note",
  "Bajo": "music_note",
  "Sonido": "graphic_eq",
  "Danza": "accessibility_new",
  "Emociones": "add_reaction",
  "Idiomas": "language",
  "Deportes": "sports",
  "Batería": "auto_awesome"
};

function renderizarCursos(cursos) {
  const contenedor = document.getElementById("courses-container");
  contenedor.innerHTML = "";

  const grupos = {};
  for (const curso of cursos) {
    if (!grupos[curso.disciplina]) grupos[curso.disciplina] = [];
    grupos[curso.disciplina].push(curso);
  }

  let sumaNotas = 0;
  let totalCursos = 0;

  for (const [disciplina, entries] of Object.entries(grupos)) {
    const icono = ICONOS[disciplina] || "school";
    const tieneClases = entries.some(e => e.clase);

    if (tieneClases) {
      let clasesHtml = "";
      for (const entry of entries) {
        sumaNotas += entry.notaFinal;
        totalCursos++;
        clasesHtml += `
          <div class="py-4 border-b border-white/5 last:border-b-0">
            <p class="text-white font-label-md text-label-md text-center">${entry.clase}</p>
            <div class="flex justify-center mt-2">
              <div class="text-center">
                <p class="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-widest opacity-70">Nota final</p>
                <p class="font-headline-sm text-headline-sm text-secondary-fixed">${entry.notaFinal}</p>
              </div>
            </div>
          </div>
        `;
      }

      const card = document.createElement("div");
      card.className = "glass-panel rounded-xl p-6 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden";
      card.innerHTML = `
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-title-sm text-title-sm text-white font-semibold flex items-center gap-3">
            <span class="p-2 bg-primary-container/30 rounded-lg">
              <span class="material-symbols-outlined text-primary text-xl">${icono}</span>
            </span>
            ${disciplina}
          </h3>
          <span class="px-3 py-1 bg-tertiary-container/20 text-tertiary-fixed border border-tertiary-container/30 rounded-full font-label-sm text-label-sm shadow-sm">
            ${entries[0].nivel || disciplina}
          </span>
        </div>
        <div class="w-full border-t border-white/5">
          ${clasesHtml}
        </div>
      `;
      contenedor.appendChild(card);

    } else {
      const curso = entries[0];
      sumaNotas += curso.notaFinal;
      totalCursos++;

      const card = document.createElement("div");
      card.className = "glass-panel rounded-xl p-6 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden";
      card.innerHTML = `
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-title-sm text-title-sm text-white font-semibold flex items-center gap-3">
            <span class="p-2 bg-primary-container/30 rounded-lg">
              <span class="material-symbols-outlined text-primary text-xl">${icono}</span>
            </span>
            ${disciplina}
          </h3>
          <span class="px-3 py-1 bg-tertiary-container/20 text-tertiary-fixed border border-tertiary-container/30 rounded-full font-label-sm text-label-sm shadow-sm">
            ${curso.nivel || disciplina}
          </span>
        </div>
        <div class="w-full flex justify-center mt-2 border-t border-white/5 pt-4">
          <div class="text-center">
            <p class="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-widest opacity-70">Nota final</p>
            <p class="font-headline-md text-headline-md text-secondary-fixed">${curso.notaFinal}</p>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    }
  }

  const promedio = sumaNotas / totalCursos;
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
