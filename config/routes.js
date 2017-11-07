/*
    Esse arquivo tem como objetivo definir as rotas, em quais as URLs serão expostos os serviços do BillingCycle, 
    que a aplicação irá consumir
*/

// É necessário o express:
const express = require('express')

// Middleware criado para controle de autenticação do banco:
const auth = require('./auth')

// Apontando para o método function, com parâmetro chamado server
// Isso serve para passar informação pra outro módulo, dentro do node
module.exports = function(server){
    
    //API de rotas:

    /*
    * Rotas abertas
    */
    // a função express.Router() vai retornar um middlaware, que vai ser chamado sempre que a URL for /oapi
    const openApi = express.Router()
    server.use('/oapi', openApi)    //oapi = open api

    const AuthService = require('../api/user/authService') //importando o serviço do authService.js
    openApi.post('/login', AuthService.login)   //cada url apontando para um método (login, signup, validateToken)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /*
    * Rotas protegidas por Token JWT
    */
    // a função express.Router() vai retornar um middlaware, que vai ser chamado sempre que a URL for /api
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    //A chamada ao método auth é o que de fato vai proteger a API (tudo que for '/api'):
    protectedApi.use(auth)

    // rotas da API   
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(protectedApi, '/billingCycles') //todos os serviços usarão como url raiz billingCycles

    // rota da sumarização (feita separado do arquivo billingCycleService
    const billingSummaryService = require('../api/billingSummary/billingSummaryService') //pegando o que está no module.exports do arquivo billingSummaryService.js
    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary) //criando a rota para acionar o serviço


    /* Rota de teste:
    router.route('/teste').get(function(req, res, next){
        res.send('funcionou')
    })
    */
}