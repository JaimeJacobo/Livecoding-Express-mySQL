const chalk = require('chalk');
const express = require('express');
const database = require('./conf.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(port, (error)=>{
  if(error){
    console.log(chalk.red.inverse.bold('Ha habido un error en el app listener'));
  } else {
    console.log(chalk.green.inverse.bold(`Conectado al puerto ${port}`))
  }
})

//Ruta GET para el home de localhost:3000
app.get('/', (request, response)=>{
  response.send('Conectado correctamente a tu nuevo servidor');
})  

//Ruta GET para localhost:3000/otro-mensaje
app.get('/otro-mensaje', (request, response)=>{
  response.send('Este es otro mensaje');
})

//Ruta GET para mostrar a todos los jugadores masculinos
app.get('/jugadores-padel', (request, response)=>{
  database.query('SELECT * FROM jugadores_masculino', (error, results)=>{
    if(error){
      console.log(chalk.red.inverse.bold('Ha habido un error para mostrar los jugadores'));
      response.send(error.sqlMessage)
    } else {
      console.log(chalk.blue.inverse.bold('Jugadores mostrados correctamente'));
      response.send(results);
    }
  })
})


//Ruta POST para crear un nuevo jugador masculino
app.post('/crear-jugador-masculino', (request, response)=>{
  database.query('INSERT INTO jugadores_masculino SET ?', request.body, (error, results)=>{
    if(error){
      console.log(chalk.red.inverse.bold('Ha habido un fallo al añadir un nuevo jugador'));
      response.send(error.sqlMessage);
    } else {
      console.log(chalk.blue.inverse.bold('Jugador creado con exito'));
      response.send('Has creado un nuevo jugador con exito');
    }
  })
})


//Ruta PUT para editar un jugador masculino
app.put('/editar-jugador-masculino/:id', (request, response)=>{

  database.query('UPDATE jugadores_masculino SET ? WHERE id = ?', [request.body, request.params.id], (error, results)=>{
    if(error){
      console.log(chalk.red.inverse.bold('Ha habido un error al intentar editar un jugador'));
      response.send(error.sqlMessage)
    } else {
      console.log(chalk.blue.inverse.bold('Jugador editado correctamente'));
      response.send('Jugador editado correctamente');
    }
  })
})

//Ruta DELETE para eliminar un jugador masculino
app.delete('/eliminar-jugador-masculino/:id', (request, response)=>{
  database.query('DELETE FROM jugadores_masculino WHERE id = ?', request.params.id, (error, results)=>{
    if(error){
      console.log(chalk.red.inverse.bold('Ha habido un error al intentar eliminar un jugador'));
      response.send(error.sqlMessage)
    } else {
      console.log(chalk.blue.inverse.bold('Jugador eliminado correctamente'));
      response.send("Jugador eliminado correctamente");
    }
  })
})






