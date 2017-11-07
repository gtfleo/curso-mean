(function () {
    angular.module('primeiraApp').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth', //factory
        AuthController
    ])

    function AuthController($location, msgs, auth) {
        const vm = this

        //var loginMode começa verdadeira
        vm.loginMode = true

        //função changeMode - Dentro de uma mesma página existirá o modo de login e o modo de cadastro
        //essa função servirá para ativar/desativar alguns elementos(campos) de acordo com o modo da página
        vm.changeMode = () => vm.loginMode = !vm.loginMode

        //verifica se o que está sendo digitado está sendo gravado no log
        vm.login = () => {
            //auth.login(vm.user, err => err ? msgs.addError(err) : msgs.addSuccess('Sucesso!')) //teste
            auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.signup = () => {
            //auth.signup(vm.user, err => err ? msgs.addError(err) : msgs.addSuccess('Sucesso!')) //teste
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.getUser = () => auth.getUser()

        vm.logout = () => {
            //auth.logout(() => msgs.addSuccess('Sucesso!')) //teste
            auth.logout(() => $location.path('/')) 
        }
    }
})()