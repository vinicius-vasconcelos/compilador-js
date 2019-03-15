module.exports = function (application) {
    this.abrirArq = (req, res) => {
        console.log(req.body);
        res.send('chegou aqui caralho');
    }

    this.compilar = (req, res) => {

        let programa = req.body;
        let lexemas = programa.codigo.toString().split('<div>');

         //modificar '&gt', '&lt' e '&amp' e quebrando em linhas
        for(let i = 0; i < lexemas.length; i++)
            lexemas[i] = lexemas[i].replace('</div>', '').replace('&gt;', '>').replace('&lt;', '<').replace('&amp;&amp;', '&&');

        //construir tabela de cadeias e tokens(para a análise lexica)
        application.app.classesApoio.analisadorLexico.analisadorLexico(lexemas).then(log =>{
            //console.log(log);
            let mensagemLog = '';
            let tabela = '';

            //tratando recebimento para dar resposta
            for(let i = 0; i < log.length; i++) {
                //erros léxicos
                if(!log[i].status)
                    mensagemLog += `LINHA ${log[i].linha} : "${log[i].cadeia}" cadeia inválida [ERRO LÉXICO] <br>`;
                
                    //erros sintáticos
                if(!log[i].statusSintatico)
                mensagemLog += `LINHA ${log[i].linha} : ${log[i].erroSintatico} [ERRO SINTÁTICO] <br>`;
                
                tabela += `${log[i].cadeia}:${log[i].token},`;
            }

            if(mensagemLog == '')
                mensagemLog = 'Compilado com SUCESSO !!!'

            res.send(`${mensagemLog}#${tabela}`);
        }).catch(errLog => {
            //console.log('Err = ' + errLog);
            res.send(`${errLog}#`);
        });
        
    }

    return this;
}