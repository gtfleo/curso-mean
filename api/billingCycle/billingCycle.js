// Declarando as dependências

const restful = require('node-restful') 
/*  
    node-restful é um pacote declarado no package.json que fornece uma forma bastante simples de expor uma api restful 
    para a aplicação frontend (com uma única linha realizar serviços como inclusão, exclusão, alteração, consulta);
    integração entre express e o mongoose (para não usar o mongoose puro)
*/
const mongoose = restful.mongoose

// Esquemas de como será armazenado as informações no mongodb, que serão validados por ele:
// Crédito:
const creditSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do crédito!'] }
})

// Débito:
const debtSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] },
    status: { type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO']}
})

// O próprio ciclo de pagamento:
const billingCycleSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts: [debtSchema]
})

// Expondo o esquema para importação através do require (consumo em outro modulo .js)
module.exports = restful.model('BillingCycle', billingCycleSchema)