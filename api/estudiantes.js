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

  
document.addEventListener("DOMContentLoaded", () => { //Method para mostrar datos al cargar la página
  refreshTable(); 

 }); 

