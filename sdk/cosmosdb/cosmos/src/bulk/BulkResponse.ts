// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../ClientContext";
import { Constants, StatusCodes, SubStatusCodes } from "../common";
import type { CosmosDiagnostics } from "../CosmosDiagnostics";
import type { CosmosHeaders } from "../queryExecutionContext";
import type { StatusCode, SubStatusCode, Response } from "../request";
import type { BulkOperationResult } from "../utils/batch";
import { isSuccessStatusCode } from "../utils/batch";
import type { ItemBulkOperation } from "./ItemBulkOperation";

/**
 * Represents a batch response for bulk request.
 * @hidden
 */

export class BulkResponse {
  statusCode: StatusCode;
  subStatusCode: SubStatusCode;
  headers: CosmosHeaders;
  operations: ItemBulkOperation[];
  results: BulkOperationResult[] = [];
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
    clientContext: ClientContext
  ): BulkResponse {
    // Create and populate the response object
    let bulkResponse = this.populateFromResponse(responseMessage, operations, clientContext);

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

      bulkResponse.createAndPopulateResults(operations, retryAfterMilliseconds, clientContext);
    }

    return bulkResponse;
  }

  private static populateFromResponse(
    responseMessage: Response<any>,
    operations: ItemBulkOperation[],
    clientContext: ClientContext
  ): BulkResponse {
    const results: BulkOperationResult[] = [];

    if (responseMessage.result) {
      for (let i = 0; i < operations.length; i++) {
        const itemResponse = responseMessage.result[i];
        const result: BulkOperationResult = {
          statusCode: itemResponse?.statusCode,
          subStatusCode: itemResponse?.subStatusCode ?? SubStatusCodes.Unknown,
          eTag: itemResponse?.eTag,
          retryAfter: itemResponse.retryAfterMilliseconds ?? 0,
          activityId: responseMessage.headers?.[Constants.HttpHeaders.ActivityId],
          sessionToken: responseMessage.headers?.[Constants.HttpHeaders.SessionToken],
          requestCharge: itemResponse?.requestCharge,
          resourceBody: itemResponse?.resourceBody,
          operationInput: operations[i].operationInput,
          diagnostics: operations[i].operationContext.diagnosticNode.toDiagnostic(clientContext.getClientConfig()),
        };
        results.push(result);
      }
    }
    let statusCode = responseMessage.code;
    let subStatusCode = responseMessage.substatus;

    if (responseMessage.code === StatusCodes.MultiStatus) {
      for (const result of results) {
        if (
          result.statusCode !== StatusCodes.FailedDependency &&
          result.statusCode >= StatusCodes.BadRequest
        ) {
          statusCode = result.statusCode;
          subStatusCode = result.subStatusCode;
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

  private createAndPopulateResults(operations: ItemBulkOperation[], retryAfterInMs: number, clientContext?: ClientContext): void {
    this.results = operations.map(
      (operation): BulkOperationResult => ({
        statusCode: this.statusCode,
        subStatusCode: this.subStatusCode,
        eTag: this.headers?.[Constants.HttpHeaders.ETag],
        retryAfter: retryAfterInMs,
        activityId: this.headers?.[Constants.HttpHeaders.ActivityId],
        sessionToken: this.headers?.[Constants.HttpHeaders.SessionToken],
        requestCharge: this.headers?.[Constants.HttpHeaders.RequestCharge],
        resourceBody: undefined,
        operationInput: operation.operationInput,
        diagnostics: clientContext ? operation.operationContext.diagnosticNode.toDiagnostic(clientContext.getClientConfig()) : undefined,
      }),
    );
  }
}
