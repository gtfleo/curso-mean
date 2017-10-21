/*
    Arquivo para configurar o angular

    Nome da aplicação e suas denpendências:
    ui.router - fará as rotas de uma pagina pra outra, atualizando o index.html (ui-view)
    ngAnimate - animações
    toastr - pequenas mensagens que aparecerão na aplicação
*/

angular.module('primeiraApp', [
    'ui.router',
    'ngAnimate',
    'toastr'
  ])