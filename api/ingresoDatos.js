
const form = document.getElementById("createUserForm");//constante form del formulario
form.addEventListener("submit", (event) => {

  
  //cuando form tenga el evento submit ejecuta la función
  event.preventDefault(); //quitamos el comportamiento por defecto que actualiza la página al dar click  al boton
  const userData = eventToUserData(event);
  const userDataJson = JSON.stringify(userData);
  
  fetch("http://localhost:3000/users", {
    method: "POST", //tipo de método
    headers: {
      "Content-Type": "application/json", //le decimos que es un aplication JSON
    },
    body: userDataJson,
  }).then((result)=> {
    refreshTable();
    scrollWin() ;
    
    
  });

 
});

 
/* function captureSelect() {
  cod_nac= document.getElementById("cod_nac").value;
  console.log(cod_nac)
}
 */
 
function scrollWin() {
  window.scrollTo(0, 10000);
} 

function scrollWindUp() {
  location.reload();
  window.scrollTo(0, 1);

} 
 

function eventToUserData(event) {

const elements = event.target.elements;  
const cod_estu = elements.cod_estu.value;
/* const cod_nac = elements.cod_nac.value;
 */const cod_nac= document.getElementById("cod_nac").value;
const apellido_estu = elements.apellido_estu.value;
const nombre_estu = elements.nombre_estu.value;
const telefono_estu = elements.telefono_estu.value;
const correo_estu =  elements.correo_estu.value;
const fecha_nac_estu =  elements.fecha_nac_estu.value;
const ident_estu =  elements.ident_estu.value;
const direccion_estu =  elements.direccion_estu.value;



return {
  cod_estu: cod_estu,
  cod_nac: cod_nac,
  apellido_estu: apellido_estu,
  nombre_estu: nombre_estu,
  telefono_estu: telefono_estu,
  correo_estu: correo_estu,
  fecha_nac_estu: fecha_nac_estu,
  ident_estu: ident_estu ,
  direccion_estu: direccion_estu
};
}

async function refreshTable(){
 const users = await getUserFromApi();
drawUserTable(users);


}

async function getUserFromApi(){
  const response = await fetch("http://localhost:3000/users")
  const users = await response.json();
  return users;
}

/* async function getDocenteFromApi(){
  const response = await fetch("http://localhost:3000/docente")
  const docente = await response.json();
  return docente;
} */


async function drawUserTable(users){
     document.getElementById("userDataTableTBody").innerHTML = "";
    users.forEach((user)  => {
     addUserToTable(user);
     
  });

}

  function addUserToTable(user) {
    //(method insert row ) consuluserDataTableTBodytar paraingresar filas
  const userDataTable = document.getElementById("userDataTableTBody");

// Create an empty <tr> element and add it to the 1st position of the table:
const row = userDataTable.insertRow(-1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
const cell1 = row.insertCell(0);
const cell2 = row.insertCell(1);
const cell3 = row.insertCell(2);    
const cell4 = row.insertCell(3);
const cell5 = row.insertCell(4);
const cell6 = row.insertCell(5);
const cell7 = row.insertCell(6);    
const cell8 = row.insertCell(7);
const cell9 = row.insertCell(8);

// Add some text to the new cells:
cell1.innerHTML = user.cod_estu;
cell2.innerHTML = user.cod_nac;
cell3.innerHTML = user.apellido_estu;
cell4.innerHTML = user.nombre_estu; 
cell5.innerHTML = user.telefono_estu; 
cell6.innerHTML = user.correo_estu; 
cell7.innerHTML = user.fecha_nac_estu; 
cell8.innerHTML = user.ident_estu;
cell9.innerHTML = user.direccion_estu;  



  }
   

  
document.addEventListener("DOMContentLoaded", () => { //Method para mostrar datos al cargar la página
  refreshTable(); 

 }); 

