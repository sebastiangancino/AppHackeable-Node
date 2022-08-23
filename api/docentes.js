const form = document.getElementById("createDocenteForm");//constante form del formulario
form.addEventListener("submit", (event) => {
  //cuando form tenga el evento submit ejecuta la función
  event.preventDefault(); //quitamos el comportamiento por defecto que actualiza la página al dar click  al boton
  const docenteData = eventToDocenteData(event);
  const docenteDataJson = JSON.stringify(docenteData);
  
  fetch("http://localhost:3000/docentes", {
    method: "POST", //tipo de método
    headers: {
      "Content-Type": "application/json", //le decimos que es un aplication JSON
    },
    body: docenteDataJson,
  }).then((result)=> {
    refreshTable();
  });
});


function eventToDocenteData(event) {

    
    const cod_doc = docentes.cod_doc.value;
    /* const cod_nac = elements.cod_nac.value;
     */const cod_nac= docentes.cod_nac.value;
    const apellido_doc = docentes.apellido_doc.value;
    const nombre_doc = docentes.nombre_doc.value;
    const identificacion_doc =   docentes.identificacion_doc.value;
    const correo_doc =  docentes.correo_doc.value;
    const telefono_doc =  docentes.telefono_doc.value;
    
    
    
    return {
      cod_doc: cod_doc,
      cod_nac: cod_nac,
      nombre_doc: nombre_doc,
      apellido_doc: apellido_doc,
      identificacion_doc: identificacion_doc ,
      correo_doc: correo_doc,
      telefono_doc: telefono_doc,
    };
    }


async function refreshTable(){
 const docentes = await getDocentesFromApi();
drawDocenteTable(docentes);

}

async function getDocentesFromApi(){
  const response = await fetch("http://localhost:3000/docentes")
  const docentes = await response.json();
  return docentes;
}


async function drawDocenteTable(docentes){
    document.getElementById("docenteDataTableTBody").innerHTML = "";
   docentes.forEach((docente)  => {
    addDocenteToTable(docente);
    
 });

}

function addDocenteToTable(docente) {
    //(method insert row ) consuluserDataTableTBodytar paraingresar filas
  const docenteDataTable = document.getElementById("docenteDataTableTBody");

// Create an empty <tr> element and add it to the 1st position of the table:
const row = docenteDataTable.insertRow(-1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
const cell1 = row.insertCell(0);
const cell2 = row.insertCell(1);
const cell3 = row.insertCell(2);    
const cell4 = row.insertCell(3);
const cell5 = row.insertCell(4);
const cell6 = row.insertCell(5);
const cell7 = row.insertCell(6);


// Add some text to the new cells:
cell1.innerHTML = docente.cod_doc;
cell2.innerHTML = docente.cod_nac;
cell3.innerHTML = docente.apellido_doc;
cell4.innerHTML = docente.nombre_doc; 
cell5.innerHTML = docente.identificacion_doc; 
cell6.innerHTML = docente.correo_doc; 
cell7.innerHTML = docente.telefono_doc;   



  }




  
document.addEventListener("DOMContentLoaded", () => { //Method para mostrar datos al cargar la página
  refreshTable(); 

 }); 

