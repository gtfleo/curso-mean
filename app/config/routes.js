// Padrão como o angular faz ingeção de dependência (stateProvide, urlProvider, funcao)
angular.module('primeiraApp').config([
    '$stateProvider',                               //objeto dentro do ui-router - 1o elemento do array
    '$urlRouterProvider',                           //2o elemento do array
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {  //3o elemento do array - método ou variável que aponte para o método

        // Aqui começa a particularidade de cada frontend:
        $stateProvider.state('dashboard', {         //Transita de um estado para o outro
            url: "/dashboard",                      //atualiza a url para /dashboard
            templateUrl: "dashboard/dashboard.html" //aponta para o arquivo a ser atualizado no index.html no ui-view
        }).state('billingCycle', {
            url: "/billingCycles?page",             //?page indica passagem do parâmetro page na url para paginação (count no controller)
            templateUrl: "billingCycle/tabs.html"
        })

        //trata erro do backend (\common\factories\handleResponseError.js)
        $httpProvider.interceptors.push('handleResponseError')

        //Se estado inválido, vai para um estado padrão
        //$urlRouterProvider.otherwise('/dashboard') //com o .run, nao precisa mais
    }
])
//o run, dentro do ciclo de vida de inicialização do angular, é executado após o config
//Aqui, em cada mudança de url, o usuario será validado:
.run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'auth',
    function ($rootScope, $http, $location, $window, auth) {
        validateUser()  //chama funcao ao carregar a aplicacao
        $rootScope.$on('$locationChangeStart', () => validateUser()) //chama, também, quando a localizacao mudar

        //valida usuario:
        function validateUser() {
            //pega user da factory auth
            const user = auth.getUser()
            //url da página de autenticacao
            const authPage = '/auth.html'
            //saber se inclui a pagina de autenticacao na localizacao atual
            //se não logado, vai para autenticacao. se estiver, vai para aplicacao
            const isAuthPage = $window.location.href.includes(authPage)

            if (!user && !isAuthPage) {
                $window.location.href = authPage
            } else if (user && !user.isValid) {
                auth.validateToken(user.token, (err, valid) => {
                    if (!valid) {
                        //redireciona a aplicação para authPage
                        $window.location.href = authPage
                    } else {
                        //se token valido
                        user.isValid = true
                        $http.defaults.headers.common.Authorization = user.token
                        isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
                    }
                })
            }
        }
    }
])