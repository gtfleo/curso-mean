(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'msgs', //msgsFactory.js
        'tabs', //tabsFactory.js
        'consts',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, msgs, tabs, consts) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        //sempre que precisar resetar será trazido uma lista atualizada e zerar o ciclo de pagamento:
        vm.refresh = function() {
            //location é usado para pegar o valor do parâmetro page da url (routes.js '?page');
            //page recebe o valor da url (se setado) ou 1 (se não setado):
            const page = parseInt($location.search().page) || 1

            //?skip pula registros e faz o controle de início da paginação (se page=1, skip=0)
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response) {
                //vm.billingCycle = {} limpa a referencia ao objeto, para poder incluir o próximo;
                //declarar credits: [{}], debts: [{}] cria-se elementos vazios e evita-se que tenha que ter
                //um débito ou crédito disponível, para fazer as outras ações que estão dentro de 
                //creditList.html ou debtList.html
                vm.billingCycle = {credits: [{}], debts: [{}]} 
                vm.billingCycles = response.data //através do get feito na url
                vm.calculateValues() //atualizando o somatório com a função lá de baixo

                //depois q a lista foi obtida, fazer um count de billingCycles, 
                //que vai retornar a quantidade de regs da collection no mongo:
                $http.get(`${url}/count`).then(function(response) {
                    vm.pages = Math.ceil(response.value / 10) //Math.ceil arredonda pra cima (10 regs por página)
                    tabs.show(vm, {tabList: true, tabCreate: true}) //mostra tabList e tabCreate apenas depois do count, para que o paginador apareça na tela sempre que houver conteúdo
                })
            })
        }

        vm.create = function() {
            //post porque será um insert na base:
            $http.post(url, vm.billingCycle).then(function(response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response) {
                msgs.addError(response.data.errors) //errors é a forma de expor os erros escolhida na APIRest
            })
        }

        // recebe como parâmetro o próprio billingCycle que é a linha atual
        vm.showTabUpdate = function(billingCycle) {
            vm.billingCycle = billingCycle      //seleciona
            vm.calculateValues()                //calcula os valores
            tabs.show(vm, {tabUpdate: true})    //mostra a aba
        }

        vm.showTabDelete = function(billingCycle) {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, {tabDelete: true})
        }

        vm.update = function() {
            const updateUrl = `${url}/${vm.billingCycle._id}`
            $http.put(updateUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response) {
                msgs.addError(response.data.errors)
            })
        }

        // a função não precisa receber parametro porque ao selecionar aba delete ele já 
        // selecionou a linha atual (billingCycle) e moveu pra variável vm.billingCycle
        vm.delete = function() {
            //concatenando a url base (const url lá de cima) com o id do billingCycle
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response) {
                msgs.addError(response.data.errors)
            })
        }

        //usando o método splice ele altera o array atual para inserir elementos num índice
        //w3schools.com/jsref/jsref_splice.asp
        //Na prática, ao clicar em create ou clone, o elemento será adicionado no próximo índice
        vm.addCredit = function(index) {
            //index+1: incluindo no proximo índice a partir do atual
            //0: não vai remover nenhum elemento
            //{}: o elemento adicionado é um objeto vazio
            vm.billingCycle.credits.splice(index + 1, 0, {})
        }

        //recebe o nome e o valor do indice e duplica no próximo elemento do array:
        vm.cloneCredit = function(index, {name, value}) {
            vm.billingCycle.credits.splice(index + 1, 0, {name, value})
            vm.calculateValues()
        }

        vm.deleteCredit = function(index) {
            //executa a função de deletar apenas se o array for maior do que 1 (tem registro):
            if(vm.billingCycle.credits.length > 1) {
                //index, 1: excluir 1 elemento e é o próprio índice:
                vm.billingCycle.credits.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.addDebt = function(index) {
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}) {
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
            vm.calculateValues()
        }

        vm.deleteDebt = function(index) {
            if(vm.billingCycle.debts.length > 1) {
                vm.billingCycle.debts.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.calculateValues = function() {
            vm.credit = 0
            vm.debt = 0
            //se billingCycle estiver com valor válido
            if(vm.billingCycle) {
                //usando o destructure para tirar o atributo value de dentro de credits:
                vm.billingCycle.credits.forEach(function({value}) {
                    //+= atribuição aditiva à variável credit
                    //!value: se valor não existir; ||: ou; isNaN: não é um número; 
                    //?: então recebe zero; : parseFloat(): senão recebe
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.billingCycle.debts.forEach(function({value}) {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                })
            }

            vm.total = vm.credit - vm.debt
        }

        vm.refresh()
    }
})()

/*
    Obs.: cada função criada aqui deve ser acionada num outro arquivo (html)
*/