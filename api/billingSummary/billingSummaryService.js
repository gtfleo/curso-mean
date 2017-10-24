/* 
    Arquivo criado forma separada para simplificar e unir todas as sumarizações de pagamentos (poderia-se utilixar
    o arquivo billingCycleService.js para isso);
    Outro objetivo é mostrar como fazer o mapeamento de forma manual, sem usar o ...
*/

const _ = require('lodash') //por padrão usa-se o _ para o lodash
const BillingCycle = require('../billingCycle/billingCycle')

// Mais uma função middleware para sumarizar todos os ciclos de pagamento
function getSummary(req, res){
    // Incluindo pipelines (fluxos) de agregação
    BillingCycle.aggregate({    
        $project: {credit:{$sum: "$credits.value"}, debt:{$sum: "$debts.value"}} //soma para cada um dos documentos (lógica diferente do SQL)
        //$project é um objeto que extrai apenas os campos que se quer do banco

    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}    //soma de todos os documentos
        //$group é um objeto que agrupa os documentos por uma expressão especificada
    }, {
        $project: {_id: 0, credit: 1, debt: 1} //projete apenas o credit e o debt
        //no $group o atributo id foi usado porque é exigido pela função, mas acabou sendo agregado. Agora estamos retirando
    }, function(error, result) {
        if(error) {
            res.status(500).json({errors: [error]}) //mesmo padrão de erro definido no billingCycleService
        } else {
            res.json(_.defaults(result[0], {credit: 0, debt: 0})) //se não achou resultado(nulo), o objeto será respondido com zero para debitos e creditos
            // a função defaults do lodash faz um merge(junção) do elemento do array 'result[0] com objeto {credit, debt}
            // ou seja, o resultado dessa função sempre será um objeto válido (nulo ou se não existe débito, move zero, da mesma forma para o crédito)            
        }
    })
}

module.exports = { getSummary } //anotação reduzida para se criar o objeto