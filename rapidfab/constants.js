function make_constants(constants) {
  let result = {};
  for(let i = 0; i < constants.length; i++) {
    let constant = constants[i];
    result[constant] = constant;
  }
  return result;
}

const Constants = [
  'HASH_CHANGE',
  'LOCALE_CHANGE',
  'EVENT_STREAM_MESSAGE',
  'RESOURCE_POST_REQUEST',
  'RESOURCE_POST_SUCCESS',
  'RESOURCE_POST_FAILURE',
  'RESOURCE_PUT_REQUEST',
  'RESOURCE_PUT_SUCCESS',
  'RESOURCE_PUT_FAILURE',
  'RESOURCE_LIST_REQUEST',
  'RESOURCE_LIST_SUCCESS',
  'RESOURCE_LIST_FAILURE',
  'RESOURCE_GET_REQUEST',
  'RESOURCE_GET_SUCCESS',
  'RESOURCE_GET_FAILURE',
  'RESOURCE_DELETE_REQUEST',
  'RESOURCE_DELETE_SUCCESS',
  'RESOURCE_DELETE_FAILURE',
  'UPLOAD_MODEL_STORE_ORDER_PAYLOAD',
  'UPLOAD_MODEL_CLEAR',
  'UPLOAD_MODEL_PROGRESS',
  'UPLOAD_MODEL_REQUEST',
  'UPLOAD_MODEL_FAILURE',
  'UPLOAD_MODEL_SUCCESS',
  'SET_PAGE',
]

export default make_constants(Constants)
