export const internalErrorResponse = (error) => {
  return {
    success: false,
    message: 'Internal Server Error',
    data: {},
    err: error
  };
};

export const customErrorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }
  return {
    success: false,
    err: error.explanation,
    data: {},
    message: error.message
  };
};

export const successresponse = function (data, message) {
  return {
    success: true,
    data,
    message,
    err: {}
  };
};
