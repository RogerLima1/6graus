document.addEventListener("DOMContentLoaded", () => {
  const graph = new Graph();
  let actors = [];

  fetch("data/data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const movie = item.title;
      const cast = item.cast;
      graph.addVertex(movie);

      cast.forEach((actor) => {
        graph.addEdge(movie, actor);
        if (!actors.includes(actor)) actors.push(actor);
      });
    });
    actors.sort((a, b) => a.localeCompare(b));

    populateSelects(actors);
  });

    const populateSelects = (actors) => {
      const datalist = document.getElementById("actors");
      datalist.innerHTML = ""; 
    
      actors.forEach((actor) => {
        const option = document.createElement("option");
        option.value = actor;
        datalist.appendChild(option);
      });
    };

    document.getElementById("bfs-btn").addEventListener("click", () => {
      const from = document.getElementById("from").value.trim();
      const to = document.getElementById("to").value.trim();
    
      if (!actors.includes(from) || !actors.includes(to)) {
        displayError("Comando inválido. Favor digitar um nome válido.");
        return;
      }
    
      const result = graph.bfsShortPath(from, to);
      displayResult(result);
    });
    
    document.getElementById("bfs6-btn").addEventListener("click", () => {
      const from = document.getElementById("from").value.trim();
      const to = document.getElementById("to").value.trim();
    
      if (!actors.includes(from) || !actors.includes(to)) {
        displayError("Comando inválido. Favor digitar um nome válido.");
        return;
      }
    
      const results = graph.bfsMax(from, to);
      displayResults(results);
    });
    
    const displayError = (msg) => {
      const output = document.getElementById("output");
      output.innerHTML = `<span style="color: #ff4444; font-weight: bold;">${msg}</span>`;
    };
    
  const displayResult = (path) => {
    const output = document.getElementById("output");
    output.innerHTML = path
      ? `Caminho: ${path.join(" -> ")}<br>Comprimento: ${path.length - 1}`
      : "Relacionamento inexistente.";
  };

  const displayResults = (paths) => {
    const output = document.getElementById("output");
    output.innerHTML = paths
      ? paths
          .map(
            (p) => `Caminho: ${p.join(" -> ")}<br>Comprimento: ${p.length - 1}`
          )
          .join("<hr>")
      : "Relacionamento inexistente.";
  };
});
