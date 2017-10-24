/*  OBS1: 
    Antes de rodar a aplicação, é necessário startar o node pelo prompt, através do comando 'npm run dev' 
    (onde dev é o script para desenvolvimento, criado no package.json) (depois do comando mongod)
    OBS2: 
    Também é necessário startar o mongo pelo prompt através do comando 'mongod' (primeiro esse)
    OBS3:
    realizar os comandos no prompt, dentro da pasta backend da aplicação
*/

const server = require('./config/server') //Importando o servidor do arquivo server.js
require('./config/database') 
require('./config/routes')(server) //chamando a função do arquivo routes, passando o parametro server
