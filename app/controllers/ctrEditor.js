module.exports = function (application) {

    this.compilar = (req, res) => {
        
        let programa = req.body;
        let lexemas = programa.codigo.toString().split('<div>');

         //modificar '&gt', '&lt' e '&amp' e quebrando em linhas
        for(let i = 0; i < lexemas.length; i++)
            lexemas[i] = lexemas[i].replace('</div>', '')
                                    .replace('&gt;', '>')
                                    .replace('&lt;', '<')
                                    .replace('&amp;&amp;', '&&')
                                    .replace('<span style="font-size: 1rem;">', '')
                                    .replace('</span><span style="font-size: 1rem;">', '')
                                    .replace('</span>', '')
                                    .replace('<span', '')
                                    .replace('"font-size: 1rem;">', '');
                                    
        let teste = lexemas[0].toString().trim();
        if(teste == '<br>' || teste == ' ') {
            res.send('');
            return;
        }

        //construir tabela de cadeias e tokens(para a análise lexica)
        application.app.classesApoio.analisadorLexico.analisadorLexico(lexemas).then(log =>{

            //console.log(log);
            let mensagemLog = '';
            let tabela = '';
            let linha = 0;

            //tratando recebimento para dar resposta
            for(let i = 0; i < log.length; i++) {

                //erros léxicos
                if(!log[i].status)
                    mensagemLog += `LINHA ${log[i].linha} : "${log[i].cadeia}" cadeia inválida [ERRO LÉXICO] <br>`;
                
                //erros sintáticos
                if(!log[i].statusSintatico && linha != log[i].linha) {
                    linha = log[i].linha;
                    mensagemLog += `LINHA ${log[i].linha} : ${log[i].erroSintatico} [ERRO SINTÁTICO] <br>`;
                }

                //erros semânticos
                if(!log[i].statusSemantico && linha != log[i].linha) {
                    linha = log[i].linha;
                    mensagemLog += `LINHA ${log[i].linha} : ${log[i].erroSemantico} [ERRO SEMÂNTICO] <br>`;
                }
                
                tabela += `${log[i].cadeia}:${log[i].token},`;
            }

            if(mensagemLog == '')
                mensagemLog = 'Compilado com SUCESSO !!!'

            res.send(`${mensagemLog}#${tabela}`);
        }).catch(errLog => {
            console.log('Err = ' + errLog);
            res.send(`${errLog}#`);
        });
        
    }

    return this;
}