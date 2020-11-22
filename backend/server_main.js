const Hapi = require('@hapi/hapi');
const Ejs = require('ejs');
const Vision = require("@hapi/vision");
const Inert = require('@hapi/inert');
const Mongoose = require('mongoose');
const UserModel = require('./db_models/user_model');
const HapiCoockie = require('@hapi/cookie');
const UserModule = require('./routes/user_auth');
const ls_social_db = Mongoose.connect('mongodb://localhost/ls_social_db', {
  useNewUrlParser: true
});
//Init server
const init = async () => {
  const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
  });
  await server.register([
    UserModule,
  ])
  await server.start();
  console.log("onServerStarted")
}
init()
