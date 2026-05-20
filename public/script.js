async function cargarEstado() {

  try {

    const response = await fetch("/estado");

    const data = await response.json();

    document.getElementById("nivel").innerText =
      data.nivel ?? "--";

    document.getElementById("distancia").innerText =
      data.distancia ?? "-- cm";

    document.getElementById("modo").innerText =
      data.modo ?? "--";

    document.getElementById("atasco").innerText =
      data.atasco ? "SI" : "NO";

    document.getElementById("lluvia").innerText =
      data.lluvia ? "SI" : "NO";

    document.getElementById("tiempo").innerText =
      data.timestamp
        ? new Date(data.timestamp).toLocaleTimeString()
        : "--";

  } catch (error) {

    console.error("Error estado:", error);
  }
}

async function cargarHistorial() {

  try {

    const response = await fetch("/historial");

    const data = await response.json();

    const historial =
      document.getElementById("historial");

    historial.innerHTML = "";

    data.reverse().forEach(item => {

      historial.innerHTML += `
        <div class="item">

          💧 ${item.nivel}
          | 📏 ${item.distancia} cm
          | ⚙️ ${item.modo}
          | 🚨 ${item.atasco ? "SI" : "NO"}
          | 🌧 ${item.lluvia ? "SI" : "NO"}

        </div>
      `;
    });

  } catch (error) {

    console.error("Error historial:", error);
  }
}

// Actualizar cada 2 segundos
setInterval(() => {

  cargarEstado();
  cargarHistorial();

}, 2000);

// Primera carga
cargarEstado();
cargarHistorial();