// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @ignore
 */
export const StatusCodes = {
  // Success
  Ok: 200 as 200,
  Created: 201 as 201,
  Accepted: 202 as 202,
  NoContent: 204 as 204,
  NotModified: 304 as 304,

  // Client error
  BadRequest: 400 as 400,
  Unauthorized: 401 as 401,
  Forbidden: 403 as 403,
  NotFound: 404 as 404,
  MethodNotAllowed: 405 as 405,
  RequestTimeout: 408 as 408,
  Conflict: 409 as 409,
  Gone: 410 as 410,
  PreconditionFailed: 412 as 412,
  RequestEntityTooLarge: 413 as 413,
  TooManyRequests: 429 as 429,
  RetryWith: 449 as 449,

  // Server Error
  InternalServerError: 500 as 500,
  ServiceUnavailable: 503 as 503,

  // Operation pause and cancel. These are FAKE status codes for QOS logging purpose only.
  OperationPaused: 1200 as 1200,
  OperationCancelled: 1201 as 1201
};

/**
 * @ignore
 */
export const SubStatusCodes = {
  Unknown: 0 as 0,

  // 400: Bad Request Substatus
  CrossPartitionQueryNotServable: 1004 as 1004,

  // 410: StatusCodeType_Gone: substatus
  PartitionKeyRangeGone: 1002 as 1002,

  // 404: NotFound Substatus
  ReadSessionNotAvailable: 1002 as 1002,

  // 403: Forbidden Substatus
  WriteForbidden: 3 as 3,
  DatabaseAccountNotFound: 1008 as 1008
};
