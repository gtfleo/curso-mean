/*
    Arquivo onde serão expostos os serviços que deverão ser fornecidos via APIRest
*/

// Importando o lodash
const _ = require('lodash')

// Importando o billingCycle.js:
const BillingCycle = require('./billingCycle')

// Com apenas uma linha de código, o node-restful vai criar a API Rest baseada no padrão Rest, para o objeto BillingCycle
BillingCycle.methods(['get', 'post', 'put', 'delete'])
/*  Aqui estamos dizendo que será criada a API Rest para os métodos passados dentro do array:
    get: obter a informação sobre ciclo de pagamento
    post: inserir um novo ciclo de pagamento
    put: alterar ciclo de pagamento existente
    delete: remover ciclo de pagamento
*/

// new: true - Configurando para que toda vez que haja uma alteração, venha-se o valor novo (por padrão vem o antigo);
// runValidators: true - Configurando para rodar validações dos valores min e max definidos nos schemas:
BillingCycle.updateOptions({new: true, runValidators: true})

// Após ida ao banco, fazer padronização de erros para mostrar no frontend:
BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

// Função middleware de enviar o erro ou continuar:
function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle    //objeto do node-restful com os erros (para saber se tem erro ou não)

    if(bundle.errors) {
        var errors = parseErrors(bundle.errors) //bundle.errors é igual a nodeRestfulErrors
        res.status(500).json({errors})
    } else {
        next()
    }
}

// Função parseErrors:
function parseErrors(nodeRestfulErrors) {
    const errors = [] 
    //percorrendo cada um dos atributos do objeto nodeRestfulErrors, do array errors:
    _.forIn(nodeRestfulErrors, error => errors.push(error.message)) //adicionando o atributo error via 'push' ao array
    //retornando a constante de erros:
    return errors
}

// Serviço de Contador que será usado para paginação (não vem por padrão, como os demais) - (via método middleware)
BillingCycle.route('count', function(req, res, next) {   //route - vem do express
    BillingCycle.count(function(error, value) {          //count - vem do mongoose
        if(error) {
            res.status(500).json({errors: [error]})     //padronizando os tipos de erro para tratamento no frontend
            //o {} significa que teremos um objeto como resposta;
            //esse objeto tem um atributo chamado erros (no plurar);
            //e esse atributo é um array que pode ter um ou mais erros (nesse caso, só tem um [error], que voltou do banco)
        } else {
            res.json({value}) //caso não haja erro, retorna o resultado - count
        }
    }) 
})

module.exports = BillingCycle