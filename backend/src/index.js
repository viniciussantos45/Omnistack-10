const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
//O código abaixo extrai o servidor http da aplicação 
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@first-8o8zg.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}); //http://portquiz.net:27017/ ← link para verificar se o DB se conectou corretamente.

app.use(cors());
app.use(express.json());
app.use(routes);

//Definindo porta para acesso no localhost
server.listen(3333);