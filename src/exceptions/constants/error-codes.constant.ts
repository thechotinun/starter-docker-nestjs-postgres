export const ErrorCodes: { [key: number]: string } = {
  0: 'UNDEFINED_ERROR',
  900000: 'PROTOTYPE_ERROR',
  900403: 'UNAUTHORIZED',
  900422: 'VALIDATE_ERROR',
  900423: 'BAD_REQUEST',
  //
  100101: 'EXAMPLE_NOT_FOUND',
  100102: 'EXAMPLE_DELETE_ERROR',
  100103: 'EXAMPLE_CREATE_ERROR',
  100104: 'EXAMPLE_UPDATE_ERROR',
  100105: 'EXAMPLE_EXIST',
  //
  100201: 'USER_NOT_FOUND',
  100202: 'USER_DELETE_ERROR',
  100203: 'USER_CREATE_ERROR',
  100204: 'USER_UPDATE_ERROR',
  100205: 'USER_EXIST',
  //
  100301: 'BANNER_NOT_FOUND',
  100302: 'BANNER_DELETE_ERROR',
  100303: 'BANNER_CREATE_ERROR',
  100304: 'BANNER_UPDATE_ERROR',
  100305: 'BANNER_EXIST',
  //
  100401: 'PRODUCT_NOT_FOUND',
  100402: 'PRODUCT_DELETE_ERROR',
  100403: 'PRODUCT_CREATE_ERROR',
  100404: 'PRODUCT_UPDATE_ERROR',
  100405: 'PRODUCT_EXIST',
};
