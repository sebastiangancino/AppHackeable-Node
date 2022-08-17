
const express = require("express");
const cors = require("cors");
const {Client} = require('pg')
 

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!")
});

app.post("/users", (req, res) => {
    const userData = req.body;
    saveUserInDataBase(userData.name, userData.surname, userData.age, userData.password)
    res.send("Hello World!");
  });


  app.get("/users", async (req, res)=> {
    const users = await getUserInDataBase();
    res.send(users);
  })

app.listen(port, () => {
  console.log(`Example app listening at http:/localhost:${port}`);
});

 async function saveUserInDataBase(name, surname, age , password) {
  //Guarda en la Base de datos
  const client = new Client({
    user: 'kfzeoopprlylck',
    host: 'ec2-44-205-64-253.compute-1.amazonaws.com',
    database: 'dft9e1jbi2hcs6',
    password: 'df26f4f913cfb820517884f6f753c9949a8955354a76580c7a6ee9d72b09c352',
    port: 5432,
    ssl:{
      rejectUnauthorized:false,
    },
  }); 

  await client.connect();


 const queryToInsert = 
 "INSERT INTO users values ('"+
 name +
 "','" +
 surname+
 "','" +
 age +
 "','" +
 password +
 "')";
 
 console.log("Se está ejecutando", queryToInsert);

 const res = await client.query(queryToInsert);
  console.log(res.rows);
  await client.end();
}

async function getUserInDataBase() {
  //Guarda en la Base de datos
  const client = new Client({
    user: 'kfzeoopprlylck',
    host: 'ec2-44-205-64-253.compute-1.amazonaws.com',
    database: 'dft9e1jbi2hcs6',
    password: 'df26f4f913cfb820517884f6f753c9949a8955354a76580c7a6ee9d72b09c352',
    port: 5432,
    ssl:{
      rejectUnauthorized:false,
    },
  }); 

  await client.connect();
 
 const res = await client.query("Select * from users");
  console.log(res.rows);
  await client.end();
  return res.rows;
}
