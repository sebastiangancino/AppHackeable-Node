
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
  });
});

function eventToUserData(event) {

const elements = event.target.elements;  
const name = event.target.elements.name.value;
const surname = event.target.elements.surname.value;
const age = elements.age.value;
const password = elements.password.value;
return {
  name: name,
  surname: surname,
  age: age,
  password: password,
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

// Add some text to the new cells:
cell1.innerHTML = user.name;
cell2.innerHTML = user.surname;
cell3.innerHTML = user.age;
cell4.innerHTML = user.password; 
  }
  
document.addEventListener("DOMContentLoaded", () => { //Method para mostrar datos al cargar la página
  refreshTable(); 

 }); 

