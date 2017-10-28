//Criando componentes - nome da aplicação + nome do componente + função
angular.module('primeiraApp').component('contentHeader', {
    bindings: {
        name: '@',      //prm de entrada do tipo string que não muda
        small: '@',     //prm de entrada do tipo string que não muda
    },
    template:  `
        <section class="content-header">
            <h1>{{ $ctrl.name }} <small>{{ $ctrl.small }}</small></h1>
        </section>
    `
});

//$ctrl é uma variavel padrao para referenciar o proprio componente