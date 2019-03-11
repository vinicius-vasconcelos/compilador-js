module.exports = function(application) {

    this.analisadorLexico = lexemas => {
        
        return new Promise( async (resolve, reject) => {
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

                        //Aqui começa uma string ex: "ola3 mundo"
                        if(linhaAtual[c] == '"') {
                            cadeia = '"';
                            let s
                            for(s = c+1; linhaAtual[s] != '"'; s++)
                                cadeia += `${linhaAtual[s]}`;
                            cadeia += '"';
                            c = s;
                        }
                        else {
                            cadeia += `${linhaAtual[c]}`;
                        }
                    }
                    else { //inserindo na tabela e verificando lexicamente;
                    
                        //verificando se existe um token para a cadeia
                        await application.app.classesApoio.tokens.verificaToken(cadeia).then(tk => {
                        token = tk;
                        status = true;
                        }).catch( tkErr => {
                            token = 't_invalido';
                            status = false;
                        });

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
            resolve(tabelaSimbolos);
        });
    }
    return this;
}