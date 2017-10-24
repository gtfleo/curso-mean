/*
    O objetivo aqui é fazer funcionar o CORS (Cross-origin HTTP request),
    que é quando você tem request diferente da origem da aplicação frontend;
    Como o frontend roda na porta 3000 e o backend na 3003 é preciso habilitar nos cabeçalhos da resp
*/

module.exports = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') //* é qualquer origem ou você pode escolher os endereços
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
}