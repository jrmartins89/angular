const app = require("./backend/app");
const http = require("http");
const debug = require("debug")("node-angular");

//when we try to set up a port or receive a port through an environment variable this function verifies
//if it's a valid number

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

//this function checks if there is an error, logs an error message and exits the js server
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//function that listens to the incoming requests and logs a message informing that it's listening to the requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// server setup. there are two servers: one for errors and the other for logs. The error server will inform if something
//went wrong with the starting of the server.


const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
