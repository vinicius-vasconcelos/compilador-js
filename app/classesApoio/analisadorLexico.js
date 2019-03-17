module.exports = function(application) {

    this.analisadorLexico = lexemas => {
        
        return new Promise( async (resolve, reject) => {
            let linhaAtual;
            let tabelaSimbolos = [];
            let cadeia;
            let token;
            let status = true;
            let explodiu = false; // variável para controlar fim do comentário inexistente
            let inicioComentario = 0;
            
            //percorrendo todo o código digitado
            for(let l = 0; l < lexemas.length; l++) {
                cadeia = '';
                linhaAtual = lexemas[l];

                //repetição para achar os tokens
                for(let c = 0; !explodiu && c < linhaAtual.length; c++){

                    //Achou um comentário
                    if(linhaAtual[c] == '/' && linhaAtual[c+1] == '*') { 
                        let i = c + 2;
                        let flag = true;
                        inicioComentario = l;

                        do {
                            i++;

                            if(linhaAtual[i] == '*')
                                if(linhaAtual[i+1] == '/') {
                                    flag = false;
                                    i = i + 2;
                                }

                            if(flag && i == linhaAtual.length) {
                                linhaAtual = lexemas[++l];
                                i = c = 0;
                                if(l == lexemas.length) { 
                                    flag = false;
                                    explodiu = true;
                                    //i = linhaAtual.length;
                                }
                            }

                        } while(flag);
                        c = i;
                    }

                    //até achar um espaço em branco (outro comando)
                    if(!explodiu && linhaAtual[c] != ' ') { 

                        if(linhaAtual[c] == '"') { //Aqui começa uma string ex: "ola3 mundo"
                            cadeia = '"';
                            let s
                            for(s = c+1; linhaAtual[s] != '"'; s++)
                                cadeia += `${linhaAtual[s]}`;
                            cadeia += '"';
                            c = s;
                        }
                        else { //concatenando letras até formar o comando
                            cadeia += `${linhaAtual[c]}`;
                        }
                    }
                    else { //inserindo na tabela e verificando lexicamente;

                        if(cadeia != '') {
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
            }

            //chamando meu análisador sintático
           await application.app.classesApoio.analisadorSintatico.analisadorSintatico(tabelaSimbolos).then(tabela => {
                tabelaSimbolos = tabela;
           }).catch(err => {
                console.log('ERRO NO ANÁLISADOR SINTÁTICO !!! ERROR: ' + err)
           });


            if(explodiu) // se um comentário foi aberto e não foi fechado
                reject(`LINHA ${lexemas.length-1}: comentário não finalizado falta de "chicoend" [COMENTÀRIO INICIADO NA LINHA: ${inicioComentario}]`);
            else
                resolve(tabelaSimbolos);
        });
    }
    return this;
}