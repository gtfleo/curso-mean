// Função no formato auto invocada para fugir do escopo global:
// Essa factory será usada para esconder as abas
(function(){
    angular.module('primeiraApp').factory('tabs', [ function() {

        function show(owner, {
            //Cada comando desses é uma variável de um único objeto, e iniciadas com valor padrão
            // É igual a show(owner, obj) {obj.tabList = false, obj.tabCreate = false}
            tabList = false,
            tabCreate = false,
            tabUpdate = false,
            tabDelete = false
        }) {    //aqui é o corpo do método
            owner.tabList = tabList
            owner.tabCreate = tabCreate
            owner.tabUpdate = tabUpdate
            owner.tabDelete = tabDelete
        }

        return { show }
    }])
})()