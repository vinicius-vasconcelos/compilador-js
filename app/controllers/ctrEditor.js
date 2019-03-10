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
            lexemas[i] = lexemas[i].replace('</div>', '').replace('&gt;', '>').replace('&lt;', '<');

        //construir tabela de cadeias e tokens(para a análise lexica)
        application.app.classesApoio.analisadorLexico.analisadorLexico(lexemas);
        


        //console.log(application.app.classesApoio.defGeral.operadores().t_add);

        res.send('chegou aqui caralho');
    }

    return this;
}