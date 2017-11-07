/*
    Middleware responsável por proteger a API, ou seja, sempre que houver uma requisição nas urls que são
    protegidas, esses filtros vão proteger alguns dos webservices da aplicação backend
*/

const jwt = require('jsonwebtoken')
const env = require('../.env')  //authSecret

module.exports = (req, res, next) => {
    /* CORS preflight request-Requisição é do tipo options, ou seja, antes de mandar a requisição de fato,
    para saber os métodos que estão disponíveis a partir de uma requisição feita de um domínio diferente;
    Quando o CORS tá habilitado pode vir uma requisição de outra origem para consumir seu webservice.
    
    Se for options, não valida - vai para o proximo */
    if (req.method === 'OPTIONS') {
        next()
    } else {
        //o token pode vir do body, da query ou do header com cabeçalho 'authorization' (incluído no cors.js)
        const token = req.body.token || req.query.token || req.headers['authorization']

        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] })
        }

        jwt.verify(token, env.authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                })
            } else {
                //req.decoded = decoded //é o token, caso queira usar em outra requisição (NÃO ESTÁ SENDO USADO)

                //se tem token e foi verificado corretamente, passa para proximo mddleware
                next()
            }
        })
    }
}