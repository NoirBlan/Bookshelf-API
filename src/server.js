const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });
  // Add the routes.
  server.route(routes);

  // Start the server.
  await server.start();
  console.log(`Server Berjalan pada ${server.info.uri}`);
};

init();
