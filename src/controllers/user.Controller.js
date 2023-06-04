import asyncHandler from "express-async-handler";
import userDocument from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @description - creating or registering a user
// route - POST /api/users/register
// access - public
const registerUser = asyncHandler(async (request, response) => {
  // whenever a user wants to register the user have to give his
  // username , password , email from the body
  // so the below code is for getting that imformation from the body
  const { username, email, password } = request.body;

  //after then we have to check the user filled all the field
  if (!username || !email || !password) {
    response.status(400);
    throw new Error("All fields are mandatory ");
  }

  // after checking for the field we have to check the user provided email is unique
  // so we have to check that email
  // the below code will check that user provided email is available in the database
  const emailValidation = await userDocument.findOne({ email });

  // so if a user is already exists with the given email
  // the below code will execute
  if (emailValidation) {
    response.status(400);
    throw new Error("A user is already has this email");
  }

  // after the check if there is no user available with the provided email
  // we then have to create a user
  // so creating a user we have to hash or encrypt the password before
  // saving the password in database because we don't have to save the password as plain text
  // so for hasing we use bcrypt
  // the first step is the hash the password with bcrypt
  const encryptedPassword = await bcrypt.hash(password, 10);

  // after then we are creating a user and we can store the user in the database
  // and we are only storing the encrypted password not the plain password
  const newUser = await userDocument.create({
    username,
    email,
    password: encryptedPassword,
  });

  // after creating the user we have to send an response
  // in the response we don't have to send the encrypted password
  // so the below code we are doing that
  if (newUser) {
    response.status(200).json({ _id: username._id, email: username.email });
  } else {
    response.status(400);
    throw new Error("User data is not valid ");
  }
});

// @description - logging in the user and also we are implementing JWT here
// route - POST /api/contacts
// access - public
const loginUser = asyncHandler(async (request, response) => {
  // so whenever a user is trying to login
  // they will provide email address and password in the request body
  const { email, password } = request.body;

  // after then we are checking the user gives both the email and password
  if (!email || !password) {
    response.status(400);
    throw new Error("All fields are mandatory");
  }

  // after the validation we then have to check the user is available in the database or not
  const user = await userDocument.find({ email });

  // after then we have to compare password from the user
  // and the hassedpassword in the database for the user
  // so in the below code we are doing this in the below code
  if (user && (await bcrypt.compare(encryptedPassword, user.password))) {
    // if the user and password matches we have to send a token in the response
    // so the first step is to sign in the user with the JWT for accesstoken
    const accessToken = jwt.sign(
      {
        //payload that we are going to embed into the token
        user: { username: user.username, email: user.email, id: user._id },
      },
      // accessToken secreat
      process.env.JWT_ACCESS_TOKEN_SECREAT,

      // token expiry date
      { expiresIn: "15m" }
    );

    // sending the accessToken in the response
    response.status(200).json({ accessToken });
  } else {
    // this else block is for if we have error
    response.status(400);
    throw new Error("UserName or Password is Invalid");
  }
});

// @description - information about the current user and this endpoint can only be accessed
// when the user provides the access token if the user already logged in
// generally the user is going to send the accessToken in the bearer session or header
// and then we have to validate this accessToken
// is the token is correct token for the user
// inorder to do this we are creating a middleware
// route - GET /api/contacts
// access - private
const currentUser = asyncHandler(async (request, response) => {
  response.json(request.user);
});

module.exports = { registerUser, loginUser, currentUser };
