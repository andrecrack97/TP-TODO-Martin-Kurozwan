document.addEventListener("DOMContentLoaded", function() {
    var entradaTarea = document.getElementById("entradaTarea");
    var botonAgregarTarea = document.getElementById("agregarTareaBtn");
    var listaTareas = document.getElementById("listaTareas");
    var botonEliminarCompletadas = document.getElementById("eliminarCompletadas");
    var mostrarTodas = document.getElementById("mostrarTodas");
    var mostrarPendientes = document.getElementById("mostrarPendientes");
    var mostrarCompletadas = document.getElementById("mostrarCompletadas");

    var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function mostrarTareas(filtro) {
        listaTareas.innerHTML = "";
    
        for (let i = 0; i < tareas.length; i++) {
            let tarea = tareas[i];
    
            if (filtro === "pendientes" && tarea.completada) continue;
            if (filtro === "completadas" && !tarea.completada) continue;
    
            let li = document.createElement("li");
    
            let spanTexto = document.createElement("span");
            spanTexto.textContent = tarea.texto;
            if (tarea.completada) {
                spanTexto.style.textDecoration = "line-through";
            }
    
            let botonCompletar = document.createElement("button");
            botonCompletar.textContent = "✔";
            botonCompletar.addEventListener("click", function() {
                completarTarea(i);
            });
    
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "✖";
            botonEliminar.addEventListener("click", function() {
                eliminarTarea(i);
            });
    
            li.appendChild(spanTexto);
            li.appendChild(botonCompletar);
            li.appendChild(botonEliminar);
            listaTareas.appendChild(li);
        }
    }
    

    function completarTarea(indice) {
        tareas[indice].completada = !tareas[indice].completada;
        guardarTareas();
        mostrarTareas("todas");
    }

    function eliminarTarea(indice) {
        tareas.splice(indice, 1);
        guardarTareas();
        mostrarTareas("todas");
    }

    botonAgregarTarea.addEventListener("click", function() {
        let texto = entradaTarea.value.trim();
        if (texto === "") return;
        tareas.push({ texto: texto, completada: false });
        guardarTareas();
        mostrarTareas("todas");
        entradaTarea.value = "";
    });

    entradaTarea.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            botonAgregarTarea.click();
        }
    });

    botonEliminarCompletadas.addEventListener("click", function() {
        tareas = tareas.filter(tarea => !tarea.completada);
        guardarTareas();
        mostrarTareas("todas");
    });

    mostrarTodas.addEventListener("click", function() {
        mostrarTareas("todas");
    });

    mostrarPendientes.addEventListener("click", function() {
        mostrarTareas("pendientes");
    });

    mostrarCompletadas.addEventListener("click", function() {
        mostrarTareas("completadas");
    });

    mostrarTareas("todas");
});
