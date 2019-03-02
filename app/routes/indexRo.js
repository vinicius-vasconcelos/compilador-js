module.exports = application => {
    application.get('/', (req, res) => application.app.controllers.ctrIndex.index(res));
}