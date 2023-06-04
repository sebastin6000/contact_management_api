import express, { json } from "express";
import * as dotenv from "dotenv";
import { contactRouter } from "./routes/contact.Routes.js";
import { userRouter } from "./routes/users.Routes.js";
import errorHandler from "./middleware/errorHandler.js";
import { databaseConnection } from "./config/DBconfig'js";

dotenv.config();
// we are calling this function before our app
// because we have to connect to the DB before listening
databaseConnection();
const app = express();
const PORT = 5000;

app.listen(process.env.PORT || 5000, () => {});

// the below middleware will pasre the strem dada comming from client
// and parse then as json
app.use(express.json());

// ROUTE HANDLERS
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);
