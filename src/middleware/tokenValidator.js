import asyncHander from "express-async-handler";
import jwt from "jsonwebtoken";

const accessTokenValidator = asyncHander(async (request, response, next) => {
  // so the sending the accesToken in the header > auth > bearer
  let token;

  // so in the below code we are getting token
  let authHeader =
    request.headers.Authorization || request.headers.authorization;

  // in the below code we are checking for the authorization header starts with bearer
  // so in the bearer we have the accessToken
  if (authHeader && authHeader.startsWith("Bearer")) {
    // so in the below code we are extracting the token from the authorization header
    // so in the zeroth index the bearer word is present
    // in the first index there is a space so we split the space with split method
    // so in the second index the token starts but we skipped the space the token
    // starts in the first index
    // so the below code does this
    token = authHeader.split(" ")[1];

    // after then we have to verify the token
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECREAT);

    // and the final part is to handle the error in case we can't validate
    (error, decode) => {
      if (error) {
        response.status(400);
        throw new Error(" User is not Authorized ");
      }
    };
  }

  // here we are decoding the user setting this as requested user
  request.user = decoded.user;

  // and then we are calling the next method inorder to our route handler to work
  next();
});

// the below if check is for token is available in the user header
if (!token) {
  response.status(400);
  throw new Error("user is not authorized or token expired ");
}

module.exports = accessTokenValidator;
