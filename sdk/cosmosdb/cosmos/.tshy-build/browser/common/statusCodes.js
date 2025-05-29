// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @hidden
 */
export const StatusCodes = {
    // Success
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NoContent: 204,
    MultiStatus: 207,
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
    FailedDependency: 424,
    TooManyRequests: 429,
    RetryWith: 449,
    // Server Error
    InternalServerError: 500,
    ServiceUnavailable: 503,
    // System codes
    ENOTFOUND: "ENOTFOUND",
    // Operation pause and cancel. These are FAKE status codes for QOS logging purpose only.
    OperationPaused: 1200,
    OperationCancelled: 1201,
};
/**
 * @hidden
 */
export const SubStatusCodes = {
    Unknown: 0,
    // 400: Bad Request Substatus
    CrossPartitionQueryNotServable: 1004,
    IncorrectContainerRidSubstatus: 1024,
    PartitionKeyMismatch: 1001,
    // 410: StatusCodeType_Gone: substatus
    PartitionKeyRangeGone: 1002,
    CompletingSplit: 1007,
    CompletingPartitionMigration: 1008,
    NameCacheIsStale: 1000,
    // 404: NotFound Substatus
    ReadSessionNotAvailable: 1002,
    // 403: Forbidden Substatus
    WriteForbidden: 3,
    DatabaseAccountNotFound: 1008,
    // 413: Request Entity Too Large Substatus
    ResponseSizeExceeded: 3402,
};
//# sourceMappingURL=statusCodes.js.map