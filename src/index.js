const inputTarea  = document.querySelector("#input-tarea");
const btnAgregar  = document.querySelector("#btn-agregar");
const listaTareas = document.querySelector("#lista-tareas");
const contador    = document.querySelector("#contador");
const errorMsg    = document.querySelector("#error-msg");
const emptyState  = document.querySelector("#empty-state");

function actualizarContador() {
  const pendientes = listaTareas.querySelectorAll(".tarea-item:not(.completada)");
  contador.textContent = pendientes.length;

  const totalTareas = listaTareas.querySelectorAll(".tarea-item").length;
  emptyState.style.display = totalTareas > 0 ? "none" : "block";
}



function mostrarError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add("visible");
  inputTarea.classList.add("error");

  setTimeout(function () {
    errorMsg.classList.remove("visible");
    inputTarea.classList.remove("error");
  }, 2500);
}

function crearTarea(texto) {

  const li = document.createElement("li");
  li.classList.add("tarea-item");

  const btnCheck = document.createElement("button");
  btnCheck.classList.add("btn-check");

  const span = document.createElement("span");
  span.classList.add("tarea-texto");
  span.textContent = texto;

  const btnDel = document.createElement("button");
  btnDel.classList.add("btn-del");
  btnDel.textContent = "✕";

  li.append(btnCheck);
  li.append(span);
  li.append(btnDel);
  listaTareas.append(li);

  

  btnCheck.addEventListener("click", function () {
    if (li.classList.contains("completada")) {
      li.classList.remove("completada");
    } else {
      li.classList.add("completada");
    }
    actualizarContador();
  });


  btnDel.addEventListener("click", function () {
    li.classList.add("eliminando");
    setTimeout(function () {
      li.remove();
      actualizarContador();
    }, 250);
  });

  actualizarContador();
}



function agregarTarea() {
  const texto = inputTarea.value;

  if (texto.length === 0) {
    mostrarError("La tarea no puede estar vacía.");
    inputTarea.focus();
    return;
  }

  if (texto.trim().length === 0) {
    mostrarError("La tarea no puede contener solo espacios en blanco.");
    inputTarea.focus();
    return;
  }

  crearTarea(texto.trim());
  inputTarea.value = "";
  inputTarea.focus();
}

btnAgregar.addEventListener("click", agregarTarea);

inputTarea.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

actualizarContador();