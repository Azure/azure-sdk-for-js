// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants, StatusCodes, SubStatusCodes } from "../common";
import type { CosmosDiagnostics } from "../CosmosDiagnostics";
import type { CosmosHeaders } from "../queryExecutionContext";
import type { StatusCode, SubStatusCode, Response } from "../request";
import { isSuccessStatusCode } from "../utils/batch";
import { BulkOperationResult } from "./BulkOperationResult";
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
        operations: ItemBulkOperation[]
    ) {
        this.statusCode = statusCode;
        this.subStatusCode = subStatusCode;
        this.headers = headers;
        this.operations = operations;
    }

    /**
     * static method to create BulkResponse from Response object
     */
    static fromResponseMessage(responseMessage: Response<any>, operations: ItemBulkOperation[]): BulkResponse {
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
                    operations
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

    private static populateFromResponse(responseMessage: Response<any>, operations: ItemBulkOperation[]): BulkResponse {
        const results: BulkOperationResult[] = [];

        if (responseMessage.result) {
            for (let i = 0; i < operations.length; i++) {
                const itemResponse = responseMessage.result[i];
                const result = new BulkOperationResult(
                    itemResponse?.statusCode,
                    itemResponse?.subStatusCode ?? SubStatusCodes.Unknown,
                    itemResponse?.eTag,
                    itemResponse.retryAfterMilliseconds ?? 0,
                    responseMessage.headers?.[Constants.HttpHeaders.ActivityId],
                    responseMessage.headers?.[Constants.HttpHeaders.SessionToken],
                    itemResponse?.requestCharge,
                    itemResponse?.resourceBody
                );
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

        const bulkResponse = new BulkResponse(statusCode, subStatusCode, responseMessage.headers, operations);
        bulkResponse.results = results;
        return bulkResponse;
    }

    private createAndPopulateResults(operations: ItemBulkOperation[], retryAfterInMs: number): void {
        this.results = operations.map(() => {
            return new BulkOperationResult(
                this.statusCode,
                this.subStatusCode,
                this.headers?.[Constants.HttpHeaders.ETag],
                retryAfterInMs,
                this.headers?.[Constants.HttpHeaders.ActivityId],
                this.headers?.[Constants.HttpHeaders.SessionToken],
                this.headers?.[Constants.HttpHeaders.RequestCharge],
            );
        });
    }
}
