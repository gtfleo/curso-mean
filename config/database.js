const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/db_finance')
/*  mongodb:// é a url de conexão com o mongodb
    após o '//' poderíamos informar usuário e senha para a conexão
    localhost é o local do banco (não estamos informando a porta)
    db_finance é o nome do banco
*/

// Traduzindo algumas mensagens de erro, de forma global:
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "'{VALUE}' é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "'{VALUE}' é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."