(function(){
    angular.module('primeiraApp').factory('msgs', [
        'toastr',
        MsgsFactory
    ])

    function MsgsFactory(toastr) {
        
        //Mensagens de sucesso:
        function addSuccess(msgs) {
            addMsg(msgs, 'Sucesso', 'success')
        }

        //Mensagens de erro:
        function addError(msgs) {
            addMsg(msgs, 'Erro', 'error')
        }

        //Método interno da factory:
        function addMsg(msgs, title, method) {
            if(msgs instanceof Array) {
                msgs.forEach(msg => toastr[method](msg, title))
            } else {
                toastr[method](msgs, title)
            }
        }

        return { addSuccess, addError }
    }
})()