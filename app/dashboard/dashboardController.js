(function() {
    angular.module('primeiraApp').controller('DashboardCtrl', [
        '$http',
        'consts',
        DashboardController
    ])
    
    function DashboardController($http, consts) {
        const vm = this
        //fazer uma requisição http para a ApiRest do backend para obter o sumario de todos os pagamentos da aplicação
        vm.getSummary = function() {
            const url = `${consts.apiUrl}/billingSummary`;
            $http.get(url).then(function(response) {
                const {credit = 0, debt = 0} = response.data
                vm.credit = credit
                vm.debt = debt
                vm.total = credit - debt
            })
        }
        
        vm.getSummary()
        /*Dessa forma, sempre que o controller DashboardCtrl for iniciado, ele vai chamar 
        essa função getSummary, que vai fazer uma requisição get e, no sucesso, ele vai 
        colocar as 3 variáveis credit/debt/total no escopo*/
    }
})()

/*
    (function(){})() função auto referenciada serve para fugir do escopo global
    vm = ViewModel

    Essas boas práticas foram tiradas do guia do John Papa:
    http://github.com/johnpapa/angular-styleguide
*/