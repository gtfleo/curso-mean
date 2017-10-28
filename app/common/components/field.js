/* Código Padrão para criação de componente
(function() {
    angular.module('primeiraApp').component('xxxx', {

    })
})()
*/

(function() {
    angular.module('primeiraApp').component('field', {
      bindings: {
          id: '@',
          label: '@',
          type: '@',
          grid: '@',
          model: '=',   //binding de 2 direções-o que alterar no controller (binding) será refletido no componente e vice-versa
          placeholder: '@',
          readonly: '<', //binding unidirecional-só reflete no componente-para que os campos do formulário fiquem apenas de leitura na exclusão
      },
      controller: [
          'gridSystem',
          function(gridSystem) {
            this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
          }
      ],
      template: `
         <div class="{{ $ctrl.gridClasses }}">
           <div class="form-group">
             <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
             <input ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control"
                type="{{ $ctrl.type }}" placeholder="{{ $ctrl.placeholder }}"
                ng-readonly="$ctrl.readonly" />
           </div>
         </div>
      `
    });
})()