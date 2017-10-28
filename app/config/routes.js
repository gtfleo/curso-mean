// Padrão como o angular faz ingeção de dependência (stateProvide, urlProvider, funcao)
angular.module('primeiraApp').config([
    '$stateProvider',                               //objeto dentro do ui-router - 1o elemento do array
    '$urlRouterProvider',                           //2o elemento do array
    function($stateProvider, $urlRouterProvider) {  //3o elemento do array - método ou variável que aponte para o método

        // Aqui começa a particularidade de cada frontend:
        $stateProvider.state('dashboard', {         //Transita de um estado para o outro
            url: "/dashboard",                      //atualiza a url para /dashboard
            templateUrl: "dashboard/dashboard.html" //aponta para o arquivo a ser atualizado no index.html no ui-view
        }).state('billingCycle', {
            url: "/billingCycles?page",             //?page indica passagem do parâmetro page na url para paginação (count no controller)
            templateUrl: "billingCycle/tabs.html"
        })

        //Se estado inválido, vai para um estado padrão
        $urlRouterProvider.otherwise('/dashboard')
    }
])