module.exports = function(application) {

    this.analisadorLexico = (lexemas) => {
        /*console.log(lexemas);
        console.log('---------------------------------------------------------------------');*/
        let linhaAtual;
        let tabelaSimbolos = [];
        let cadeia;
        let token;
        let status = true;
        
        //percorrendo todo o código digitado
        for(let l = 0; l < lexemas.length; l++) {
            cadeia = '';
            linhaAtual = lexemas[l];

            //repetição para achar os tokens
            for(let c = 0; c < linhaAtual.length; c++){
                //até achar um espaço em branco (outro comando)
                if(linhaAtual[c] != ' ') {
                    cadeia += `${linhaAtual[c]}`;
                }
                else { //inserindo na tabela e verificando lexicamente;

                    //verificando se existe um token para a cadeia
                    token = application.app.classesApoio.tokens.verificaToken(cadeia);
                    //token = token.replace('Promise', ' ').replace('{', ' ').replace('}', ' ').replace('<rejected>', ' ').trim();

                    console.log('------------------------------------------------------------------------');
                    console.log(token);
                    console.log('------------------------------------------------------------------------');
                    if(!token) {
                        token = '';
                        status = token;
                    }

                    //criando tabela de simbolos
                    tabelaSimbolos.push({
                        cadeia: cadeia,
                        token: token,
                        linha: l,
                        status: status
                    });

                    cadeia = '';
                }
            }
        }
        console.log(tabelaSimbolos);
    }
    
    return this;
}