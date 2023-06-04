import asyncHandler from "express-async-handler";
import contactDocuments from "../models/contact.Model.js";

// @description - getting all the contacts from the database
// route - GET /api/contacts
// access - private
const getAllContacts = asyncHandler(async (request, response) => {
  // in the below code we are going to find and get all the contants from the database
  // who is loggedIn
  const contacts = await contactDocuments.find({ user_id: request.user.id });
  response.status(200).json(contacts);
});

// @description - getting individual contact from the database
// route - GET /api/contacts/:id
// access - private
const getIndividualContact = asyncHandler(async (request, response) => {
  // the below code is for finding an individual contact
  const individualContact = await contactDocuments.findById(request.params.id);

  // after writing code for getting individual contact
  // we then have check if the contact is availabe in the database or not
  if (!individualContact) {
    response.status(404);
    throw new Error("Contact Not Found ");
  }

  // if the contact is available in database we then send to the client
  response.status(200).json(individualContact);
});

// @description - creating new contact
// route - GET /api/contacts
// access - private
const createContact = asyncHandler(async (request, response) => {
  // the below code is for pasre the date from the request body inorder to create contact
  const { name, email, phone } = request.body;

  //after then we are checking that all fiels are field
  if (!name || !email || !phone) {
    response.status(400);
    throw new Error("All fields are Mandotary");
  }

  // the below code is for creating a contact
  const newContant = await contactDocuments.create({
    name: name,
    email: email,
    phone: phone,
    user_id: request.user.id,
  });
  response.status(201).json(newContant);
});

// @description - updating a contact
// route - GET /api/contacts/:id
// access - private
const updateContact = asyncHandler(async (request, response) => {
  // the below code is for finding an individual contact for update
  const individualContact = await contactDocuments.findById(request.params.id);

  // after writing code for getting individual contact for update
  // we then have check if the contact is availabe in the database or not
  if (!individualContact) {
    response.status(404);
    throw new Error("Contact Not Found ");
  }

  // the below code is for checking the fetched contact has userid
  // and then we are valitating the logged in user updating the contact or someone else
  if (individualContact.user_id.toString() !== request.body.id) {
    response.status(400);
    throw new Error("User don't have permission to update other user contact ");
  }

  // the below code is for update
  const UpdatedContact = await contactDocuments.findByIdAndUpdate(
    // here we are updating
    // the old id with new id
    // old body to new body
    // and inside the bracket we setting true
    request.params.id,
    request.body,
    { new: true }
  );

  response.status().json(UpdatedContact);
});

// @description - deleting a contact
// route - GET /api/contacts/:id
// access - private
const deleteContact = asyncHandler(async (request, response) => {
  // the below code is for finding an individual contact for delete
  const individualContact = await contactDocuments.findById(request.params.id);

  // after writing code for getting individual contact for delete
  // we then have check if the contact is availabe in the database or not
  if (!individualContact) {
    response.status(404);
    throw new Error("Contact Not Found ");
  }

  // here we are validating the logged in user deleting the contact or someone else
  if (individualContact.user_id.toString() !== request.body.id) {
    response.status(400);
    throw new Error("User don't have permission to update other user contact ");
  }
  // the below code is used for deleting the contact
  await contactDocuments.deleteOne({ _id: request.params._id });

  // after then we are sending deleted contact imformation inorder to
  // inform the client that this contact is deleted
  response.status(200).json(individualContact);
});

export default {
  getAllContacts,
  getIndividualContact,
  createContact,
  updateContact,
  deleteContact,
};
