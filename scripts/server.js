/* eslint-disable no-console */
import StaticServer from 'static-server/server.js';


const server = new StaticServer({ rootPath: process.cwd(), port: 5150, followSymlink: true });
server.start(() => {
  console.log(`Listening on ${server.port}`);
});
