module.exports = function (application) {
    this.abrirArq = (req, res) => {
        console.log(req.body);
        res.send('chegou aqui caralho');
    }

    this.compilar = (req, res) => {
        console.log('código: \n' + JSON.stringify(req.body));

        res.send('chegou aqui caralho');
    }

    return this;
}