// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/constants.js";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes.js";
import type { CosmosDiagnostics, Response } from "../index.js";
import { ErrorResponse } from "../index.js";
import type { CosmosHeaders } from "../queryExecutionContext/headerUtils.js";
import type { StatusCode, SubStatusCode } from "../request/StatusCodes.js";
import type { ExtendedOperationResponse } from "../utils/batch.js";
import { isSuccessStatusCode, isErrorResponse } from "../utils/batch.js";
import type { ItemBulkOperation } from "./index.js";



/**
 * Represents a batch response for bulk request.
 * @hidden
 */

export class BulkResponse {
  statusCode: StatusCode;
  subStatusCode: SubStatusCode;
  headers: CosmosHeaders;
  operations: ItemBulkOperation[];
  results: (ExtendedOperationResponse | ErrorResponse)[] = [];
  diagnostics: CosmosDiagnostics;

  constructor(
    statusCode: StatusCode,
    subStatusCode: SubStatusCode,
    headers: CosmosHeaders,
    operations: ItemBulkOperation[],
  ) {
    this.statusCode = statusCode;
    this.subStatusCode = subStatusCode;
    this.headers = headers;
    this.operations = operations;
  }

  /**
   * Generate empty response object
   */
  static createEmptyResponse(
    operations: ItemBulkOperation[],
    statusCode: StatusCode,
    subStatusCode: SubStatusCode,
    headers: CosmosHeaders,
  ): BulkResponse {
    const bulkResponse = new BulkResponse(statusCode, subStatusCode, headers, operations);
    bulkResponse.createAndPopulateResults(operations, 0);
    return bulkResponse;
  }

  /**
   * static method to create BulkResponse from Response object
   */
  static fromResponseMessage(
    responseMessage: Response<any>,
    operations: ItemBulkOperation[],
  ): BulkResponse {
    // Create and populate the response object
    let bulkResponse = this.populateFromResponse(responseMessage, operations);

    if (!bulkResponse.results || bulkResponse.results.length !== operations.length) {
      // Server should be guaranteeing number of results equal to operations when
      // batch request is successful - so fail as InternalServerError if this is not the case.
      if (isSuccessStatusCode(responseMessage.code)) {
        bulkResponse = new BulkResponse(
          StatusCodes.InternalServerError,
          SubStatusCodes.Unknown,
          responseMessage.headers,
          operations,
        );
      }

      // When the overall response status code is TooManyRequests, propagate the RetryAfter into the individual operations.
      let retryAfterMilliseconds = 0;

      if (responseMessage.code === StatusCodes.TooManyRequests) {
        const retryAfter = responseMessage.headers?.[Constants.HttpHeaders.RetryAfterInMs];
        retryAfterMilliseconds = !retryAfter || isNaN(Number(retryAfter)) ? 0 : Number(retryAfter);
      }

      bulkResponse.createAndPopulateResults(operations, retryAfterMilliseconds);
    }
    return bulkResponse;
  }

  private static populateFromResponse(
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    responseMessage: Response<any>,
    operations: ItemBulkOperation[],
  ): BulkResponse {
    const results: (ExtendedOperationResponse | ErrorResponse)[] = [];

    if (responseMessage.result) {
      for (let i = 0; i < operations.length; i++) {
        const itemResponse = responseMessage.result[i];

        if (isSuccessStatusCode(itemResponse?.statusCode)) {
          const result: ExtendedOperationResponse = {
            statusCode: itemResponse?.statusCode,
            eTag: itemResponse?.eTag,
            activityId: responseMessage.headers?.[Constants.HttpHeaders.ActivityId],
            sessionToken: responseMessage.headers?.[Constants.HttpHeaders.SessionToken],
            requestCharge: itemResponse?.requestCharge,
            resourceBody: itemResponse?.resourceBody,
            // diagnostics will be filled in BulkBatcher dispatch to capture the complete diagnostics(e.g. decryption)
            diagnostics: null,
            headers: responseMessage.headers,
          };
          results.push(result);
        } else {
          const error: ErrorResponse = new ErrorResponse();
          error.code = itemResponse?.statusCode;
          error.substatus = itemResponse?.subStatusCode;
          error.body = itemResponse?.resourceBody;
          error.headers = responseMessage.headers;
          error.activityId = responseMessage.headers?.[Constants.HttpHeaders.ActivityId];
          error.retryAfterInMs = itemResponse?.retryAfter;
          error.diagnostics = responseMessage.diagnostics;
          results.push(error);
        }
      }
    }
    let statusCode = responseMessage.code;
    let subStatusCode = responseMessage.substatus;

    if (responseMessage.code === StatusCodes.MultiStatus) {
      for (const result of results) {
        if (
          isErrorResponse(result) &&
          result.statusCode !== StatusCodes.FailedDependency &&
          result.statusCode >= StatusCodes.BadRequest
        ) {
          statusCode = typeof result.code === "number" ? result.code : Number(result.code);
          subStatusCode = result.substatus;
          break;
        }
      }
    }

    const bulkResponse = new BulkResponse(
      statusCode,
      subStatusCode,
      responseMessage.headers,
      operations,
    );
    bulkResponse.results = results;
    return bulkResponse;
  }

  private createAndPopulateResults(operations: ItemBulkOperation[], retryAfterInMs: number): void {
    this.results = operations.map(() => {
      const errorResponse = new ErrorResponse();
      errorResponse.code = this.statusCode;
      errorResponse.substatus = this.subStatusCode;
      errorResponse.retryAfterInMs = retryAfterInMs;
      errorResponse.activityId = this.headers?.[Constants.HttpHeaders.ActivityId];
      errorResponse.body = undefined;
      errorResponse.diagnostics = null;
      errorResponse.headers = this.headers;
      return errorResponse;
    });
  }
}
