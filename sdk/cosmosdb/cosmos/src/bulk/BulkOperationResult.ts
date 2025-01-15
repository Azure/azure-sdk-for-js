// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JSONObject } from "../queryExecutionContext";
import type { StatusCode, SubStatusCode } from "../request";

/**
 * Represents a result for a specific operation that was part of a batch request
 */
export class BulkOperationResult {
  statusCode: StatusCode;
  subStatusCode: SubStatusCode;
  etag: string;
  resourceBody: JSONObject;
  retryAfter: number;
  activityId: string;
  sessionToken: string;
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
