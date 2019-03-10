module.exports = function (application) {

    this.verificaToken = cadeia => {

        return new Promise((resolve, reject) => {

            //pesquisando entre caracteres especiais
            Object.keys(caracteres_especiais()).forEach(function(key){
                console.log(`${cadeia} <================> ${caracteres_especiais()[key]}: ${cadeia == caracteres_especiais()[key]}`)
                if(cadeia == caracteres_especiais()[key]) {
                    resolve(key);
                }
                    
            });

            //pesquisando entre operadores
            Object.keys(operadores()).forEach(function(key){
                if(cadeia.toString() == operadores()[key].toString()) {
                    resolve(key);
                }
                    
            });

            //pesquisando entre tipos
            Object.keys(tipos()).forEach(function(key){
                if(cadeia.toString() == tipos()[key].toString()) {
                    resolve(key);
                }
                    
            });

            //pesquisando entre estruturas de controle
            Object.keys(est_controle()).forEach(function(key){
                if(cadeia.toString() == est_controle()[key].toString()) {
                    resolve(key);
                }
                    
            });

            //pesquisando entre estruturas de repetição
            Object.keys(est_repeticao()).forEach(function(key){
                if(cadeia.toString() == est_repeticao()[key].toString()) {
                    resolve(key);
                }
                    
            });

            //pesquisando entre 
            Object.keys(inicio_termino()).forEach(function(key){
                if(cadeia.toString() == inicio_termino()[key].toString()) {
                    resolve(key);
                }
                    
            });

            //se não, não faz parte da linguagem
            reject(false);

        });
    }

    //função de caracteres especiais da linguagem
    function caracteres_especiais(){
        return {
            t_achave: '{',
            t_fchave: '}',
            t_aparenteses: '(',
            t_fparenteses: ')',
            t_ptv: ';'
        }
    }

    //função de operadores da linguagem
    function operadores(){
        return {
            t_atri: '=',
            t_comp: '==',
            t_add: '+',
            t_sub: '-',
            t_mul: '*',
            t_div: '/',
            t_maior: '>',
            t_menor: '<',
            t_add2: '++',
            t_sub2: '--'
        }
    }

    //função de tipos da linguagem
    function tipos(){
        return {
            t_integer: 'chico',
            t_float: 'chicao',
            t_string: 'chicos'
        }
    }

    //função de estruturas de controle da linguagem
    function est_controle(){
        return {
            t_if: 'taestudando?',
            t_else: 'vish'
        }
    }

    //função de estruturas de repetição da linguagem
    function est_repeticao(){
        return {
            t_for: 'atelerlivros',
            t_while: 'enquantonaoestudar'
        }
    }

    //função de inicialização e termino de bloco de código
    function inicio_termino(){
        return {
            t_inicio: 'chicoman',
            t_fim: 'chicoend'
        }
    }

    return this;
}