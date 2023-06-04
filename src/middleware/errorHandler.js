import {
  VALIDATION_ERROR,
  UNAUTHORIZED,
  FOR_BIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
} from "../constants";

const errorHandler = (error, request, response, next) => {
  // the below code is for setting the status code
  // if we are mentioned the status code in response we send that
  // if we aren't send the status code in response we then set it as 500
  const statusCode = response.statusCode ? response.statusCode : 500;
  switch (statusCode) {
    // the below case if validation error
    case VALIDATION_ERROR:
      response.json({ title: "VALIDATION ERROR", message: error.message });
      break;
    case UNAUTHORIZED:
      response.json({ title: "UNAUTHORIZED", message: error.message });
      break;
    case FOR_BIDDEN:
      response.json({ title: "FOR_BIDDEN", message: error.message });
      break;
    // the below case is for no data available
    case NOT_FOUND:
      response.json({ title: "NOT FOUND", message: error.message });
      break;
    case SERVER_ERROR:
      response.json({ title: "SERVER_ERROR", message: error.message });
      break;
    default:
      "No Error All Good";
      break;
  }
};

export default errorHandler;
