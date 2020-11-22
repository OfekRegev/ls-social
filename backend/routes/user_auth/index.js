const UserModel = require('../../db_models/user_model');
module.exports.plugin = {
  pkg: require('./package.json'),
  register: function(server, options, next) {
    // creating a route for sign-up request
    server.route([{
        method: "POST",
        path: "/sing_up",
        handler: async function(request, reply) {
          // first we need to validate the user is not already registered by checking whether the email is already in our database
          let existing_user = await UserModel.findOne({
            "email": request.payload.email
          });
          if (existing_user) {
            console.log("user already exist");
            const response = reply.response({
              message: "This email has already registered for ls-social account, Please try again with another email"
            });
            response.code(400);
            return response;
          } else {
            // validating the user saved to the db successfuly
            try {
              // saving the user to the database
              let user = new UserModel({
                email: request.payload.email,
                name: request.payload.name,
                password: request.payload.password,
              })
              await user.save();
              let auth_model = new AuthModel({
                user_id : user.user_id
              })
              console.log("user added");
              // successfuly saved the user details in the db. the user is now signed up
              const response = reply.response({
                message: "Successfuly signed up!",
                auth_token : auth_model.auth_token
              });
              response.code(200);
              return response;
            } catch (e) {
              console.error(e);
              // the user didn't save in the databbase, reply an error response
              console.log("user add failed");
              const response = reply.response({
                message: "Error during signing up"
              });
              response.code(400);
              return response;
            }

          }
        }
      },
      // login route
      {
        method: "POST",
        path: "/login",
        handler: async function(request, reply) {
          console.log(request.payload);
          let user = await UserModel.findOne({
            "email": request.payload.email,
            "password" : request.payload.password
          })
          if (user) {
            // this user is in the system and the password is valid
            const response = reply.response({
              message: "Welcome to LSocial"
            })
            response.code(200)
            response.redirect("/feed")
            return response;
          } else {
            // this user is not in the system
            const response = reply.response({
              message: "Login failed. Incorrect username or password."
            });
            response.code(400);
            return response;
          }
        }
      }
    ]);
  }
}
