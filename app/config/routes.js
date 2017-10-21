// Padrão como o angular faz ingeção de dependência (stateProvide, urlProvider, funcao)
angular.module('primeraApp').config([
    '$stateProvider',                               //objeto dentro do ui-router - 1o elemento do array
    '$urlRouterProvider',                           //2o elemento do array
    function($stateProvider, $urlRouterProvider) {  //3o elemento do array - método ou variável que aponte para o método
        $stateProvider.state('dashboard', {         //Transita de um estado para o outro
            url: "/dashboard",                      //atualiza a url para /dashboard
            templateUrl: "dashboard/dashboard.html" //aponta para o arquivo a ser atualizado no index.html no ui-view
        }).state('billingCycle', {
            url: "/billingCycles",
            templateUrl: "billingCycle/tabs.html"
        })

        //Se estado inválido, vai para um estado padrão
        $urlRouterProvider.otherwise('/dashboard')
    }
])
