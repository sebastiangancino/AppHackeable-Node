
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
    saveUserInDataBase( 
      userData.cod_estu, 
      userData.cod_nac,  
      userData.apellido_estu, 
      userData.nombre_estu,  
      userData.telefono_estu,
      userData.correo_estu,
      userData.fecha_nac_estu,
      userData.ident_estu,
      userData.direccion_estu,

      )
    res.send("Hello World!");
  });


  app.get("/users", async (req, res)=> {
    const users = await getUserInDataBase();
    res.send(users);
  })

app.listen(port, () => {
  console.log(`Example app listening at http:/localhost:${port}`);
});

 async function saveUserInDataBase(cod_estu, cod_nac, apellido_estu ,nombre_estu,  telefono_estu, correo_estu, fecha_nac_estu,ident_estu, direccion_estu) {
  //Guarda en la Base de datos
  const client = new Client({
    user: 'yiqyaovtxyqnfj',
    host: 'ec2-44-209-186-51.compute-1.amazonaws.com',
    database: 'd7bfbe8kpjru51',
    password: '5c295666fdeff0d1b148b9124337d28496d4d144e38b8726e1e51f17ebabbc83',
    port: 5432,
    ssl:{
      rejectUnauthorized:false,
    },
  }); 

  await client.connect();

 const queryToInsert = 
 "INSERT INTO estudiante values ('"+
 cod_estu +
 "','" +
 cod_nac+
 "','" +
 apellido_estu +
 "','" +
 nombre_estu +
 "','" +
 telefono_estu+
 "','" +
 correo_estu +
 "','" +
 fecha_nac_estu +
 "','" + 
 ident_estu +
 "','" +
 direccion_estu+
 "')";
 
 console.log("Se está ejecutando", queryToInsert);

 const res = await client.query(queryToInsert);
  console.log(res.rows);
  await client.end();

}

async function getUserInDataBase() {
  //Guarda en la Base de datos
  const client = new Client({
    user: 'yiqyaovtxyqnfj',
    host: 'ec2-44-209-186-51.compute-1.amazonaws.com',
    database: 'd7bfbe8kpjru51',
    password: '5c295666fdeff0d1b148b9124337d28496d4d144e38b8726e1e51f17ebabbc83',
    port: 5432,
    ssl:{
      rejectUnauthorized:false,
    },
  }); 

  await client.connect();
 
 const res = await client.query("Select * from estudiante");
  console.log(res.rows);
  await client.end();
  return res.rows;
}
