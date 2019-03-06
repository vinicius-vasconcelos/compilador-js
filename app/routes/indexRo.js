module.exports = application => {
    //renderizar vierw principal e compilador
    application.get('/', (req, res) => application.app.controllers.ctrIndex.index(res));
    application.get('/compiler', (req, res) => application.app.controllers.ctrIndex.compiler(res));

    //ajax de requeisçoes ao servidor
    application.post('/abrirArq', (req, res) => application.app.controllers.ctrEditor.abrirArq(req, res));
    application.post('/compilar', (req, res) => application.app.controllers.ctrEditor.compilar(req, res));
}