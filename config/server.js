const port = 3003 //port é a porta e pode possuir qualquer nome

const bodyParser = require('body-parser') // serve para fazer o parser ou a interpretação do corpo da requisição
const express = require('express')
const server = express()
const allowCors = require('./cors') //permite cross-origin requeste para essa APIRest

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
/*  urlencoded é o formato dos dados quando se faz a submissão de um formulario na aplicacao frontend
    extend: true quer dizer que o modulo vai ser capaz de interpretar mais tipos de informacao que venham na submissao de um formulario
    use é uma função do express que diz que pra toda requisição que chegar dentro do backend ela vai ser passada pelo midware urlencoded
*/
/*  essa cadeia significa que dentro do ciclo de requisição, quando ela chegar no backend ela vai passar
    primeiro pelo midware (server.use) urlencoded e vai verificar se os dados foram submetidos por um formulario;
    se não for, o proximo middleware é o json e vai verificar se o conteúdo é um json...
    se for, o bodyParser vai fazer uma interpretação (parser) em cima do body e transformar num objeto a ser utilizado no backend
    
    obs.: os dois midwares serão chamados para todas as requisições, pois não está amarrada a nenhuma URL específica.
*/

server.use(allowCors) //permite uma requisição de outro domínio que não seja o da API

//port foi a constante declarada logo acima
server.listen(port, function(){ 
    console.log(`Backend is running on port ${port}.`)
})

/* Descomente para entender a logica do midware
server.use(function(req, res, next){
    //res.send('Funcionou')
    console.log('meu middleware 1')
    next()

})

server.use(function(req, res, next){
    console.log('meu middleware 2')
    res.send('Funcionou novamente')    
})
*/

// Exportando o servidor para uso no arquivo routes:
module.exports = server