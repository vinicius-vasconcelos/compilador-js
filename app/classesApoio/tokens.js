module.exports = function (application) {

     this.verificaToken = cadeia =>{

        return new Promise((resolve, reject) => {

            //pesquisando entre caracteres especiais
            Object.keys(caracteres_especiais()).forEach(function(key){
                if(cadeia.toString() == caracteres_especiais()[key].toString()) {
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

            //verificando se é t_id
            const regId = /^[A-Za-z]+$/;
            if(regId.test(cadeia.toString()))
                resolve('t_id');

            
            //verificando se é t_num
            const regTnum = /^[0-9]+$/;
            if(regTnum.test(cadeia.toString()))
                resolve('t_num');


            //verificando float (t_float)
            const regTfloat = /^[0-9]+[.[0-9]+]?$/;
            if(regTfloat.test(cadeia.toString()))
                resolve('t_num');

            //verificando número exponencial(t_expoente)
            const regTexpoente = /^[0-9]+[.[0-9]+]?[eE[0-9]+]?$/;
            if(regTexpoente.test(cadeia.toString()))
                resolve('t_num');


            //verificando existencia de string
            if(cadeia[0] == '"' &&cadeia[parseInt(cadeia.length)-1] == '"')
                resolve('t_str');

            
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
            t_maiorI: '>=',
            t_menorI: '<=',
            t_add2: '++',
            t_sub2: '--',
            t_and: '&&',
            t_or: '||'
        }
    }

    //função de tipos da linguagem
    function tipos(){
        return {
            t_integer: 'chico',
            t_float: 'chicao',
            t_string: 'chicos',
            t_expoente: 'chicox'
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