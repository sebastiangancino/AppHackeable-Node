const form = document.getElementById("createMateriasForm");//constante form del formulario
form.addEventListener("submit", (event) => {
  //cuando form tenga el evento submit ejecuta la función
  event.preventDefault(); //quitamos el comportamiento por defecto que actualiza la página al dar click  al boton
  const materiaData = eventToMateriaData(event);
  const materiaDataJson = JSON.stringify(materiaData);
  
  fetch("http://localhost:3000/materias", {
    method: "POST", //tipo de método
    headers: {
      "Content-Type": "application/json", //le decimos que es un aplication JSON
    },
    body: materiaDataJson,
  }).then((result)=> {
    refreshTable();
  });
});


function eventToMateriaData(event) {

    
    const cod_mat = materias.cod_mat.value;
    /* const cod_nac = elements.cod_nac.value;
     */const cod_doc= materias.cod_doc.value;
    const nombre_mat = materias.nombre_mat.value;
    const horario_mat =   materias.horario_mat.value;
    const numero_hora_mat =  materias.numero_hora_mat.value;
    
    
    
    return {
      cod_mat: cod_mat,
      cod_doc: cod_doc,
      nombre_mat: nombre_mat,
      horario_mat: horario_mat,
      numero_hora_mat: numero_hora_mat ,
     
    };
    }


async function refreshTable(){
 const materias = await getMateriasFromApi();
drawMateriaTable(materias);

}

async function getMateriasFromApi(){
  const response = await fetch("http://localhost:3000/materias")
  const materias = await response.json();
  return materias;
}


async function drawMateriaTable(materias){
    document.getElementById("materiaDataTableTBody").innerHTML = "";
   materias.forEach((materia)  => {
    addMateriaToTable(materia);
    
 });

}

function addMateriaToTable(materia) {
    //(method insert row ) consuluserDataTableTBodytar paraingresar filas
  const materiaDataTable = document.getElementById("materiaDataTableTBody");

// Create an empty <tr> element and add it to the 1st position of the table:
const row = materiaDataTable.insertRow(-1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
const cell1 = row.insertCell(0);
const cell2 = row.insertCell(1);
const cell3 = row.insertCell(2);    
const cell4 = row.insertCell(3);
const cell5 = row.insertCell(4);



// Add some text to the new cells:
cell1.innerHTML = materia.cod_mat;
cell2.innerHTML = materia.cod_doc;
cell3.innerHTML = materia.nombre_mat;
cell4.innerHTML = materia.horario_mat; 
cell5.innerHTML = materia.numero_hora_mat; 



  }




  
document.addEventListener("DOMContentLoaded", () => { //Method para mostrar datos al cargar la página
  refreshTable(); 

 }); 

