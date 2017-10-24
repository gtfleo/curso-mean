/*
    Esse arquivo tem como objetivo definir as rotas, em quais as URLs serão expostos os serviços do BillingCycle, 
    que a aplicação irá consumir
*/

// É necessário o express:
const express = require('express')

// Apontando para o método function, com parâmetro chamado server
// Isso serve para passar informação pra outro módulo, dentro do node
module.exports = function(server){
    
    //API de rotas:
    
    // a função express.Router() vai retornar um middlaware, que vai ser chamado sempre que a URL for /api
    const router = express.Router()
    server.use('/api', router)
   
    /* Rota de teste:
    router.route('/teste').get(function(req, res, next){
        res.send('funcionou')
    })
    */

    // rotas da API
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycles') //todos os serviços usarão como url raiz billingCycles

    // rota da sumarização (feita separado do arquivo billingCycleService
    const billingSummaryService = require('../api/billingSummary/billingSummaryService') //pegando o que está no module.exports do arquivo billingSummaryService.js
    router.route('/billingSummary').get(billingSummaryService.getSummary) //criando a rota para acionar o serviço
}