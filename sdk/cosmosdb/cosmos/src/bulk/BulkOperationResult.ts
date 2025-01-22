// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JSONObject } from "../queryExecutionContext";
import type { StatusCode, SubStatusCode } from "../request";

/**
 * Represents a result for a specific operation that was part of a batch request
 */
export class BulkOperationResult {
  /** completion status for the operation */
  statusCode: StatusCode;
  /** detailed completion status for the operation */
  subStatusCode: SubStatusCode;
  /** entity tag associated with resource */
  etag: string;
  /** resource body */
  resourceBody: JSONObject;
  /** indicates time in ms to wait before retrying the operation in case operation is rate limited */
  retryAfter: number;
  /** activity id associated with the operation  */
  activityId: string;
  /** session token assigned to the result */
  sessionToken: string;
  /** request charge for the operation */
  requestCharge: number;

  constructor(
    statusCode?: StatusCode,
    subStatusCode?: SubStatusCode,
    etag?: string,
    retryAfter?: number,
    activityId?: string,
    sessionToken?: string,
    requestCharge?: number,
    resource?: JSONObject,
  ) {
    this.statusCode = statusCode;
    this.subStatusCode = subStatusCode;
    this.etag = etag;
    this.retryAfter = retryAfter;
    this.activityId = activityId;
    this.sessionToken = sessionToken;
    this.requestCharge = requestCharge;
    this.resourceBody = resource;
  }
}
