(function () {
    angular.module('primeiraApp').factory('handleResponseError', [
        '$q',
        '$window',
        'consts',
        HandleResponseErrorFactory
    ])
    function HandleResponseErrorFactory($q, $window, consts) {
        function responseError(errorResponse) {
            if (errorResponse.status === 403) {
                localStorage.removeItem(consts.userKey) //remover a chave do localStorage
                $window.location.href = '/'             //dar um refresh na aplicação e redireciona para a pagina de autenticacao
            }
            return $q.reject(errorResponse)
        }
        return { responseError }
    }
})()