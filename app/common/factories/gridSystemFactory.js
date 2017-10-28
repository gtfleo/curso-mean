/* 
    Esse método vai receber um conjunto de números e transformar num conjunto de classes css do bootstrap,
    para controle do sistema de grid 
*/

(function(){
    angular.module('primeiraApp').factory('gridSystem', [ function() {

        function toCssClasses(numbers) {
            /*se numbers estiver definida (V), 
                faz number.split que é para separar pelos espaços em branco e gerar um array com cada um dos números
            caso numbers esteja indefinida (F),
                retorna um array vazio */
            const cols = numbers ? numbers.split(' ') : []
            
            let classes = '' //variável vazia

            //concatenando o array com as classes do bootstrap:
            //se o primeiro elemento do array estiver preenchido, a var classes recebe a concatenação:
            if(cols[0]) classes += `col-xs-${cols[0]}`
            //se os próximos estiverem preenchidos, continua concatenando e separando as classes com espaço em branco no início:
            if(cols[1]) classes += ` col-sm-${cols[1]}`
            if(cols[2]) classes += ` col-md-${cols[2]}`
            if(cols[3]) classes += ` col-lg-${cols[3]}`

            return classes
        }

        return { toCssClasses }
        //expondo o método e uma factory sempre responde um objeto '{}'
        //return { toCssClasses } é a anotação nova. O babel tornará compatível com versões anteriores, 
        //onde o código usado era return { toCssClasses: toCssClasses } */
    }])

    //xs é celular; sm é tablet; md é computador pequeno; lg é tela grande
})()