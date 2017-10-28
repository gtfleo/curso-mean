// Componente da caixa colorida para mostrar os valores de crédito/débito/resultado:

angular.module('primeiraApp').component('valueBox', {
  bindings: {
    grid: '@',
      colorClass: '@',
      value: '@',
      text: '@',
      iconClass: '@'
  },
  controller: [
    'gridSystem',
    function(gridSystem) {
      this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      //arrow function sem chaves pois cabe tudo numa única linha de código
      //$onInit evita erro no grid, pois garante que a arrow function só vai rodar após bindings inicializados
    }
  ],
  template: `
  <div class="{{ $ctrl.gridClasses }}">
    <div class="small-box {{ $ctrl.colorClass }}">
      <div class="inner">
        <h3>{{ $ctrl.value }}</h3>
        <p>{{ $ctrl.text }}</p>
      </div>
      <div class="icon">
        <i class="{{ $ctrl.iconClass }}"></i>
      </div>
    </div>
  </div>
  `
});
  

// controller: lugar para inserir comportamentos dentro do componente
// gridSystem: ingestão de dependência - factory criada para controle de grid do bootstrap
// gridClasses: é uma nova variável dentro do componente (this)