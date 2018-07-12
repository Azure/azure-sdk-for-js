// tslint:disable:object-literal-key-quotes
export const StatusCodes = {
  // Success
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,
  NotModified: 304,

  // Client error
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  PreconditionFailed: 412,
  RequestEntityTooLarge: 413,
  TooManyRequests: 429,
  RetryWith: 449,

  // Server Error
  InternalServerError: 500,
  ServiceUnavailable: 503,

  // Operation pause and cancel. These are FAKE status codes for QOS logging purpose only.
  OperationPaused: 1200,
  OperationCancelled: 1201
};

export const SubStatusCodes = {
  Unknown: 0,

  // 400: Bad Request Substatus
  CrossPartitionQueryNotServable: 1004,

  // 410: StatusCodeType_Gone: substatus
  PartitionKeyRangeGone: 1002,

  // 404: NotFound Substatus
  ReadSessionNotAvailable: 1002,

  // 403: Forbidden Substatus
  WriteForbidden: 3
};
