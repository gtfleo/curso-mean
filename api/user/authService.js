const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') //criptografa a senha para gravar na base
const User = require('./user')
const env = require('../../.env') //para obter o authSecret para geração do token jwt a partir desse segredo

//As 2 expressões regulares abaixo são para validar o formato do email:

//formato do email: string+@+string+.+string
const emailRegex = /\S+@\S+\.\S+/

//formato da senha: entre 6 e 12 caracteres, um digito '\d', uma letra minúscula '[a-z]', maiúscula '[A-Z]' e especial '[@#$%]'
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

//método genérico para tratar os erros do banco de dados e colocando num formato único:
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

//Método (middleware) login (pode tirar o next, por não está usando):
const login = (req, res, next) => {
    const email = req.body.email || ''          //do body da requisição pegar o email 
    const password = req.body.password || ''    //do body da requisição pegar a senha
    /*Obs.: aqui existe a necessidade de se adicionar uma camada de segurança de criptografia na 
    comunicação, para os dados acima não possam ser visualizados por sistemas de monitoramento 
    de tráfego na rede. Implementar aqui uma estrutura de 'https' entre browser e servidor! */

    //Consultar apenas um único usuário (findOne) pelo email:
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err) //recebe de volta uma lista de erros

            //ou recebe 1 usuário e compara de forma síncrona (compareSync) a senha recebida com a senha do banco
            //usando o bcrypt para comparar, pois a senha do banco já está criptografada 
        } else if (user && bcrypt.compareSync(password, user.password)) {
            //se bateu usuário e senha, retorna token (que expira em 1 dia):
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            const { name, email } = user //carrega nome e email do usuario
            res.json({ name, email, token })    //responde 
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
            //sempre devolva que o par (usuário e senha) estão inválidos-boa prática de segurança
        }
    })
}

//Validação do token pois ele fica armazenado no webstorage (usuário sai e volta e continua logado)
const validateToken = (req, res, next) => {
    const token = req.body.token || ''  //recebe o token no body da requisição

    //função do jwt que verifica o token (junto com o segredo)
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

//Método 
const signup = (req, res, next) => {
    //parte 1: nome, email, senha e confirmação de senha
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    //parte 2: validação de email e senha com as expressões regulares de cima ('...Regex')
    if (!email.match(emailRegex)) {
        return res.status(400).send({
            errors: ['O e-mail informado está inválido']})
    }
    if(!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [ "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 6- 12." ]})
    }

    //parte 3: criptografia da senha
    const salt = bcrypt.genSaltSync()   //o salt será usado para geração de um novo códigoHash
    const passwordHash = bcrypt.hashSync(password, salt) //usando o novo salt para gerar um novo hash

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    //parte 4: faz consulta das informações do novo usuário (por email), para evitar registro duplicado
    User.findOne({ email }, (err, user) => {
        if (err) {  //se gerou erro, retorna o erro
            return sendErrorsFromDB(res, err)
        } else if (user) {  //se trouxe usuário, não permite duplicado
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {    //monta novo usuário, com nome, email e senha hash
            const newUser = new User({ name, email, password: passwordHash })
            //metodo para salvar usuario:
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {    
                    //após cadastro, já direciona o usuário para o login
                    login(req, res, next)
                }
            })
        }
    })
}

//exportando as 3 funções, para mapeamento das rotas:
module.exports = { login, signup, validateToken }