module.exports = function(application) {
    this.index = res => res.render('index');
    this.compiler = res => res.render('compiler');
    return this;
}