const http = require('http');
const app = require('./app');
const sequelize = require('./config/db');
require('dotenv/config');

const normalizePort = (val) => {
const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || 3000);

app.set('port', port)

const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.')
        process.exit(1)
        break
      default:
        throw error
    }
  }

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

sequelize.sync()
  .then(() => {
    console.log("Tables have been created");

    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("An error occurred while syncing the models", error);
  });

//server.listen inside sequelize.sync is to ensure that the database tables have been successfully created before starting the server