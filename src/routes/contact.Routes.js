import express from "express";
const contactRouter = express.Router();
import { accessTokenValidator } from "../middleware/tokenValidator.js";

import {
  getAllContacts,
  getIndividualContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";

// with this below code we are securing all our route and make them privite
contactRouter.use(accessTokenValidator);

// we are chaining the method because they use same route
// getting all contacts from database
// the second method will be creating new contact
// the thrid method will update a contact
contactRouter.route("/").get(getAllContacts).post(createContact);

// we are chaining the method because they use same route
// getting a single contact from database
// second method is for update contact
// thrid method is for delete contact
contactRouter
  .route("/:id")
  .get(getIndividualContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = contactRouter;
