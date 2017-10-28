(function(){
    angular.module('primeiraApp').component('paginator', {
        bindings: {
            url: '@', //url base parra que consiga montar os links para as novas páginas
            pages: '@', //quantidade de páginas a ser randerizada no paginador
        }, 
        controller: [
            '$location', //para ler os parametros da url
            function($location) {
                this.$onInit = function() {
                    //transformando a qtde de páginas para um número inteiro
                    var pages = parseInt(this.pages) || 1 //se parseInt(this.pages) 0 ou falso, pages recebe 1

                    /* Montando a quantidade de páginas
                    1. pages será a quantidade de índices
                    2. fill(0) alimenta cada índice com 0
                    3. percorre o array e transforma cada elemento em índice + 1
                    e temos o número de cada página dentro do array */
                    this.pagesArray = Array(pages).fill(0).map((e, i) => i + 1)
                

                    //aqui pega-se a página atual que está na url e poe na variavel current:
                    this.current = parseInt($location.search().page) || 1

                    //verifica a necessidade de renderizar o paginador (needPagination = true):
                    this.needPagination = this.pages > 1
                    //verifica a necessidade do botão página anterior (hasPrev = true):
                    this.hasPrev = this.current > 1
                    //verifica a necessidade do botão próxima página:
                    this.hasNext = this.current < this.pages

                    //verifica se o elemento i do array é o elemento corrente
                    this.isCurrent = function(i) {
                        return this.current == i
                    }
                }
            }
        ],
        template: `
            <ul ng-if="$ctrl.needPagination"
                class="pagination pagination-sm no-margin pull-right">
                <li ng-if="$ctrl.hasPrev">
                    <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1}}">«</a>
                </li>
                <li ng-class="{active: $ctrl.isCurrent(i)}"
                    ng-repeat="i in $ctrl.pagesArray">
                    <a href="{{ $ctrl.url }}?page={{i}}">{{i}}</a>
                </li>
                <li ng-if="$ctrl.hasNext">
                    <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1}}">»</a>
                </li>
            </ul>
        `
        /*  São 3 partes: Página Anterior / Cada página / Próxima Página.
            0. ul ng-if é para saber se tem que carregar na página o paginador
            pagination é uma classe do adminLte
            1. li ng-if controla a renderização do botão de página anterior
                e monta o link para a página anterior (current - 1)
            2. li depois usa a classe active sempre que o índice for atual (isCurrent)
                e o índice será o utilizado no ng-repeat (e o índice é cada um dos elementos
                preenchidos em pagesArray);
                O ng-repeat vai repetir a construção da lista com o total de páginas.
            3. li ng-if controla a renderização do botão de próxima página
                e monta o link para a próxima página (current + 1)
         */
    });
})()