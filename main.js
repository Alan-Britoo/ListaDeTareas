/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}
*/
// Función para añadir una nueva tarea
getList("list");
document.getElementById("AgregarTarea").addEventListener("submit", adddata);
let cont = 0;
function adddata(e) {
  e.preventDefault();
  let nota = document.getElementById("nota").value;

  let data = {
    id: cont,
    title: nota,
    completed: false,
  };
  if (!nota) {
    alert("INGRESA UN VALOR");
  } else {
    if (localStorage.getItem("dataTarea") == null) {
      let dataTarea = [];
      dataTarea.push(data);
      localStorage.setItem("dataTarea", JSON.stringify(dataTarea));
    } else {
      let dataTarea = JSON.parse(localStorage.getItem("dataTarea"));
      dataTarea.push(data);
      localStorage.setItem("dataTarea", JSON.stringify(dataTarea));
    }
  }
  cont += 1;
  getList("list");
  getList("listActive");
  document.getElementById("AgregarTarea").reset();
  e.preventDefault();
}

/* const nnn= document.querySelector('.prueba') ;
function pintarHTML(){
  if(dataTarea.length > 0){
    dataTarea.forEach(data=> {
      const li = document.createElement('li')
      li.innerHTML= `${dataTarea.data}<span data-id="${dataTarea.id}">X</span>`;
      nnn.appendChild(li)
    })
  }
} */

//LISTAR NOTAS

function getList(session) {
  let nota = JSON.parse(localStorage.getItem("dataTarea"));
  let tasksView = document.getElementById(session);
  tasksView.innerHTML = "";
  if (nota) {
    for (let i = 0; i < nota.length; i++) {
      let subrayado = nota[i].title;
      if (session == "listActive" && nota[i].completed == false) {
        htmlList(tasksView, nota, i, session);
      } else if (session == "listComple" && nota[i].completed == true) {
        htmlList(tasksView, nota, i, session);
        //nota[i].title.classList.add("subra")
        // console.log(subrayado,"este es")
        //subrayado.style.textDecoration = "line-through";
      } else if (session == "list") {
        htmlList(tasksView, nota, i, session);
      }
    }
  }
}
function htmlList(tasksView, nota, i, session) {
  let title = nota[i].title;
  let che = `<input type="checkbox" checked class="agr" onclick="checkboxx(this)"  id="${i}" name="${i}" ><label  style="padding: 0 5px; text-decoration: line-through;" for="${i}">${title} </label>`;
  let noche = `<input type="checkbox" class="agr" onclick="checkboxx(this)"   id="${i}" name="${i}" ><label  style="padding: 0 5px;" for="${i}">${title} </label>`;

  if (session != "listComple") {
    tasksView.innerHTML += `
    <li id="check" style="list-style: none; margin: 8px 0; ">
    ${nota[i].completed == true ? che : noche}
    </li>`;
  } else {
    tasksView.innerHTML += `
    <li id="check" style="list-style: none; margin: 8px 0; position: relative;">
    <input type="checkbox" checked class="agr" onclick="checkboxx(this)" style=""  id="${i}" name="${i}" >
    <label style="padding: 0 5px; text-decoration: line-through;" for="${i}">${title} </label>
    <a  id= "aaa" href="#" onclick="deletedata('${nota[i].id}')"  style="padding: 0 5px; position: absolute; right: 4%; "><i class="fas fa-trash" id="trash"></i></a>
  </li>`;
    /*  ppppp=document.getElementById(i).checked = true;
  console.log(ppppp, "aqui estoy") */
  }
}
function checkboxx(check) {
  let datosExisten = localStorage.getItem("dataTarea");
  if (datosExisten) {
    let datos = JSON.parse(datosExisten);
    if (datos[check.id]) {
      let estado = datos[check.id].completed;
      datos[check.id].completed = !estado; // hace que coloque el contrario del que ya esta puesto
      localStorage.setItem("dataTarea", JSON.stringify(datos));
      if (estado) {
        getList("listComple");
        //let titlesubra= nota[i].title.classList.add("subra");
      } else {
        getList("listActive");
      }
    } else {
      console.error("ID no encontrado en los datos.");
    }
    getList('list')
  }
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completedata() {}
// Función para borrar una tarea
function deletedata(id) {
  
  let tasks = JSON.parse(localStorage.getItem("dataTarea"));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem("dataTarea", JSON.stringify(tasks));
  getList("listComple");
}
// Funcion para borrar todas las tareas
function deleteAll() {
  let tasks = JSON.parse(localStorage.getItem("dataTarea"));
  localStorage.clear();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed == false) {
      /* tasks.pop(i);  */
      if (localStorage.getItem("dataTarea") == null) {
        let dataTarea = [];
        dataTarea.push(tasks[i]);
        localStorage.setItem("dataTarea", JSON.stringify(dataTarea));
      } else {
        let dataTarea = JSON.parse(localStorage.getItem("dataTarea"));
        dataTarea.push(tasks[i]);
        localStorage.setItem("dataTarea", JSON.stringify(dataTarea));
      }
    }
  }
  /* localStorage.setItem("dataTarea", JSON.stringify(tasks)); */
  getList("listComple");
}
// Función para filtrar tareas completadas
function filterCompleted() {}
// Función para filtrar tareas incompletas

//BOTON ACTIVO POR DEFAULT
const btnAll = document.querySelector("#BtnAll");
btnAll.classList.add("select");

//AGREGAR CLASE A LOS BOTONES DEL NAVBAR
const buttonActive = [...document.querySelectorAll(".active")];
let buttonSelecct = btnAll;
buttonActive.forEach((button) => {
  if (button.type == "button") {
    button.addEventListener("click", () => {
      if (button.value !== undefined) {
        // valida que halla un valor en el button
        if (buttonSelecct !== null) {
          buttonSelecct.classList.remove("select");
        }
        if (buttonSelecct !== button) {
          button.classList.add("select");
          document.getElementById("All").style.display = "none";
          document.getElementById("Active").style.display = "none";
          document.getElementById("Completed").style.display = "none";
          document.getElementById("add").style.display = "block";
          switch (button.id) {
            case "BtnAll":
              document.getElementById("All").style.display = "block";
              break;
            case "BtnActive":
              document.getElementById("Active").style.display = "block";
              break;
            case "BtnCompleted":
              document.getElementById("Completed").style.display = "block";
              document.getElementById("add").style.display = "none";
              break;
            default:
              document.getElementById("All").style.display = "block";
              break;
          }
          buttonSelecct = button;
        } else {
          buttonSelecct = null;
        }
      }
    });
    //claseActivo()
  }
});
//for="${i}"

/* let botonAgregar = document.getElementById('eliminar')
let listaa= document.getElementById('list')
let checks= document.querySelectorAll('.agr')

botonAgregar.addEventListener('click', function(){
  listaa.innerHTML='';
  checks.forEach((e)=>{
    if(e.checks == true){
      console.log(e)
    }
  })
}) */
