(function () {
    angular.module('primeiraApp').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ])
    function AuthFactory($http, consts) {

        //let = variável (porque user vai mudar na execucao do programa)
        let user = null

        function getUser() {
            //se a variável não estiver setada, tenta pegar o user do localStorage
            //e faz um parse pra transformar num objeto
            if (!user) {
                user = JSON.parse(localStorage.getItem(consts.userKey))
            }
            //retorna o usuario
            return user
        }

        function signup(user, callback) {
            submit('signup', user, callback)
        }

        function login(user, callback) {
            submit('login', user, callback)
        }

        function submit(url, user, callback) {
            //para montar a url usa-se consts.oapiUrl (\config\consts.js) + login ou signup + user (parâmetro)
            $http.post(`${consts.oapiUrl}/${url}`, user)
                .then(resp => {
                    //transforma o JSON numa string e armazena no localstorage, pegando userKey (\config\consts.js)
                    localStorage.setItem(consts.userKey, JSON.stringify(resp.data))

                    //a partir do service $http do angular, colocar um header padrão Authorization
                    //qualquer novo request usando o $http, jogar o header Authorization por padrão,
                    //com o token como conteudo
                    $http.defaults.headers.common.Authorization = resp.data.token

                    //parâmetros do callback: erro ou dados (\backend\api\user\authService.js)
                    //então, no resp.data vem nome, email e token
                    if (callback) callback(null, resp.data)
                }).catch(function (resp) {
                    if (callback) callback(resp.data.errors, null)
                })
        }

        function logout(callback) {
            //limpa usuario para poder sair da aplicacao e mudar de pagina no logout
            user = null
            //retira o usuario da localStorage
            localStorage.removeItem(consts.userKey)
            //limpa o header
            $http.defaults.headers.common.Authorization = ''
            //retorna callback sem erro e sem dados
            if (callback) callback(null)
        }

        function validateToken(token, callback) {
            if (token) {
               //token setado, chama validateToken do backend (\backend\api\user\authService.js)
                $http.post(`${consts.oapiUrl}/validateToken`, { token })
                    .then(resp => {
                        //se não estiver valido, chama o logout
                        if (!resp.data.valid) {
                            logout()
                        //se estiver valido, põe o token no header
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }

                        //independente do resultado, se a callback existe, passa valido ou invalido
                        if (callback) callback(null, resp.data.valid)

                    }).catch(function (resp) {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token inválido.')
            }
        }

        return { signup, login, logout, getUser, validateToken }
    }
})()