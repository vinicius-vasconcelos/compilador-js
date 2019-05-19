/*
    *** "analisadorSemantico"
        * verifica tipos
        * verifica inicialização (obs. minha BNF expecídica que todas variáveis deve ser inicializadas)
        * verifica a não utilização das variáveis
        * verfica e faz casting de variáveis
*/

module.exports = function(application) {
    let pos;
    let vetVar;

    this.analisadorSemantico = tabelaSimbolos => {
        return new Promise(async (resolve, reject) => {
            pos = 0;
            vetVar = new Array();

            resolve(await verificaTipos(tabelaSimbolos));
        });
    }

    //função para verficar se foi atribuido valores corretos as variáveis
    function verificaTipos(tabelaSimbolos) {

        for (let i = 0; i < tabelaSimbolos.length; i++, pos++) {
            
            //achando um token id
            if(tabelaSimbolos[i].token == 't_id') {
                
                //é uma declaração
                if(tabelaSimbolos[i-1].token != 't_ptv' &&
                    tabelaSimbolos[i-1].token != 't_aparenteses' &&
                    tabelaSimbolos[i-1].token != 't_achave' &&
                    tabelaSimbolos[i-1].token != 't_fchave' &&
                    tabelaSimbolos[i-1].token != 't_do') {
                    
                    //t_integer
                    if(tabelaSimbolos[i-1].token == 't_integer') {

                        //verificando tipos
                        if(tabelaSimbolos[i-1].token == 't_integer' && tabelaSimbolos[i+2].token == 't_num') {
                            gravaMsgSemantico(true, tabelaSimbolos, pos, '');

                            //inserindo em uma tabela de variáveis
                            let type = '';
                            if(tabelaSimbolos[i-1].token == 't_integer')
                                type = 't_num';
                            if(tabelaSimbolos[i-1].token == 't_float')
                                type = 't_flo';
                            if(tabelaSimbolos[i-1].token == 't_expoente')
                                type = 't_exp';

                            vetVar.push({
                                variavel: tabelaSimbolos[i].cadeia,
                                tipo: type,
                                valor: tabelaSimbolos[i+2].cadeia,
                            });
                        } 
                        else
                            gravaMsgSemantico(false, tabelaSimbolos, pos, `Chico é um tipo inteiro`);

                    }//t_float
                    else if(tabelaSimbolos[i-1].token == 't_float'){

                        //verificando tipos
                        if(tabelaSimbolos[i-1].token == 't_float' && tabelaSimbolos[i+2].token == 't_flo') {
                            gravaMsgSemantico(true, tabelaSimbolos, pos, '');

                            //inserindo em uma tabela de variáveis
                            let type = '';
                            if(tabelaSimbolos[i-1].token == 't_integer')
                                type = 't_num';
                            if(tabelaSimbolos[i-1].token == 't_float')
                                type = 't_flo';
                            if(tabelaSimbolos[i-1].token == 't_expoente')
                                type = 't_exp';

                            vetVar.push({
                                variavel: tabelaSimbolos[i].cadeia,
                                tipo: type,
                                valor: tabelaSimbolos[i+2].cadeia,
                            });
                        } 
                        else
                            gravaMsgSemantico(false, tabelaSimbolos, pos, `Chicao é um tipo float`);

                    }//t_expoente
                    else if(tabelaSimbolos[i-1].token == 't_expoente') {
                        
                        //verificando tipos
                        if(tabelaSimbolos[i-1].token == 't_expoente' && tabelaSimbolos[i+2].token == 't_exp') {
                            gravaMsgSemantico(true, tabelaSimbolos, pos, '');

                            //inserindo em uma tabela de variáveis
                            let type = '';
                            if(tabelaSimbolos[i-1].token == 't_integer')
                                type = 't_num';
                            if(tabelaSimbolos[i-1].token == 't_float')
                                type = 't_flo';
                            if(tabelaSimbolos[i-1].token == 't_expoente')
                                type = 't_exp';
                            
                            vetVar.push({
                                variavel: tabelaSimbolos[i].cadeia,
                                tipo: type,
                                valor: tabelaSimbolos[i+2].cadeia,
                            });
                        } 
                        else
                            gravaMsgSemantico(false, tabelaSimbolos, pos, `Chicox é um tipo exponencial`);
                    }

                } else { //é uma atribuição
                    let achou = false;

                    //verificando se foi declarada
                    for(let j = 0; j < vetVar.length; j++) {
    
                        if(vetVar[j].variavel == tabelaSimbolos[i].cadeia) {
                            achou = true;

                            //verificando valor com tipo
                            if(vetVar[j].tipo == tabelaSimbolos[i+2].token)
                                gravaMsgSemantico(true, tabelaSimbolos, pos, ``);
                            else
                                gravaMsgSemantico(false, tabelaSimbolos, pos, `Variável '${tabelaSimbolos[i].cadeia}' com tipo inválido`);
                            j = vetVar.length;
                        }
                    }

                    //variável não declarada
                    if(!achou)
                        gravaMsgSemantico(false, tabelaSimbolos, pos, `Variável '${tabelaSimbolos[i].cadeia}' não foi declarada`);
                    //else 
                        //gravaMsgSemantico(true, tabelaSimbolos, pos, ``);
                }
            }
            else
                gravaMsgSemantico(true, tabelaSimbolos, pos, '');
            
        }


        //console.log(vetVar);

        return tabelaSimbolos;
    }

    //função para gravação de mensagens semânticas
    function gravaMsgSemantico(status, tabelaSimbolos, pos, msg) {
        //não ocorreu erros no token
        if(status) {
            tabelaSimbolos[pos].statusSemantico = status;
            tabelaSimbolos[pos].erroSemantico = msg;
        }
        else { //deu bosta no token
            tabelaSimbolos[pos].statusSemantico = status;
            tabelaSimbolos[pos].erroSemantico = msg; 
        }
    }


    return this;
}