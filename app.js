//require das consfigurações gerais do servidor
const config = require('./config/config');

//require dos arquivos do servidor(rotas, views, arquivos estáticos)
const app = require('./config/server');

//subindo o servidor
app.listen(config.server.port, () => console.log('RUN SERVER... %s:%s', config.server.host, config.server.port));