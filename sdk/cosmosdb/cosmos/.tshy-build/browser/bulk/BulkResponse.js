// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants.js";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes.js";
import { ErrorResponse } from "../index.js";
import { isSuccessStatusCode } from "../utils/batch.js";
/**
 * Represents a batch response for bulk request.
 * @hidden
 */
export class BulkResponse {
    constructor(statusCode, subStatusCode, headers, operations) {
        this.results = [];
        this.statusCode = statusCode;
        this.subStatusCode = subStatusCode;
        this.headers = headers;
        this.operations = operations;
    }
    /**
     * Generate empty response object
     */
    static createEmptyResponse(operations, statusCode, subStatusCode, headers) {
        const bulkResponse = new BulkResponse(statusCode, subStatusCode, headers, operations);
        bulkResponse.createAndPopulateResults(operations, 0, new ErrorResponse());
        return bulkResponse;
    }
    /**
     * static method to create BulkResponse from Response object
     */
    static fromResponseMessage(responseMessage, operations) {
        var _a;
        // Create and populate the response object
        let bulkResponse = this.populateFromResponse(responseMessage, operations);
        if (!bulkResponse.results || bulkResponse.results.length !== operations.length) {
            // Server should be guaranteeing number of results equal to operations when
            // batch request is successful - so fail as InternalServerError if this is not the case.
            if (isSuccessStatusCode(responseMessage.code)) {
                bulkResponse = new BulkResponse(StatusCodes.InternalServerError, SubStatusCodes.Unknown, responseMessage.headers, operations);
            }
            // When the overall response status code is TooManyRequests, propagate the RetryAfter into the individual operations.
            let retryAfterMilliseconds = 0;
            if (responseMessage.code === StatusCodes.TooManyRequests) {
                const retryAfter = (_a = responseMessage.headers) === null || _a === void 0 ? void 0 : _a[Constants.HttpHeaders.RetryAfterInMs];
                retryAfterMilliseconds = !retryAfter || isNaN(Number(retryAfter)) ? 0 : Number(retryAfter);
            }
            bulkResponse.createAndPopulateResults(operations, retryAfterMilliseconds, responseMessage);
        }
        return bulkResponse;
    }
    static populateFromResponse(responseMessage, operations) {
        var _a, _b, _c;
        const results = [];
        if (responseMessage.result) {
            for (let i = 0; i < operations.length; i++) {
                const itemResponse = responseMessage.result[i];
                if (isSuccessStatusCode(itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.statusCode)) {
                    const result = {
                        statusCode: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.statusCode,
                        eTag: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.eTag,
                        activityId: (_a = responseMessage.headers) === null || _a === void 0 ? void 0 : _a[Constants.HttpHeaders.ActivityId],
                        sessionToken: (_b = responseMessage.headers) === null || _b === void 0 ? void 0 : _b[Constants.HttpHeaders.SessionToken],
                        requestCharge: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.requestCharge,
                        resourceBody: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.resourceBody,
                        // diagnostics will be filled in Batcher dispatch to capture the complete diagnostics(e.g. decryption)
                        diagnostics: null,
                        headers: responseMessage.headers,
                    };
                    results.push(result);
                }
                else {
                    const error = new ErrorResponse();
                    error.code = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.statusCode;
                    error.substatus = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.subStatusCode;
                    error.message = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.message;
                    error.requestCharge = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.requestCharge;
                    error.body = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.resourceBody;
                    error.headers = responseMessage.headers;
                    error.activityId = (_c = responseMessage.headers) === null || _c === void 0 ? void 0 : _c[Constants.HttpHeaders.ActivityId];
                    error.retryAfterInMs = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.retryAfterMilliseconds;
                    error.diagnostics = responseMessage.diagnostics;
                    results.push(error);
                }
            }
        }
        let statusCode = responseMessage.code;
        let subStatusCode = responseMessage.substatus;
        if (responseMessage.code === StatusCodes.MultiStatus) {
            for (const result of results) {
                if (result instanceof ErrorResponse &&
                    result.statusCode !== StatusCodes.FailedDependency &&
                    result.statusCode >= StatusCodes.BadRequest) {
                    statusCode = typeof result.code === "number" ? result.code : Number(result.code);
                    subStatusCode = result.substatus;
                    break;
                }
            }
        }
        const bulkResponse = new BulkResponse(statusCode, subStatusCode, responseMessage.headers, operations);
        bulkResponse.results = results;
        return bulkResponse;
    }
    createAndPopulateResults(operations, retryAfterInMs, error) {
        this.results = operations.map(() => {
            var _a;
            const errorResponse = new ErrorResponse();
            errorResponse.message = error.message;
            errorResponse.code = this.statusCode;
            errorResponse.substatus = this.subStatusCode;
            errorResponse.retryAfterInMs = retryAfterInMs;
            errorResponse.activityId = (_a = this.headers) === null || _a === void 0 ? void 0 : _a[Constants.HttpHeaders.ActivityId];
            errorResponse.body = error.body;
            errorResponse.diagnostics = error.diagnostics;
            errorResponse.headers = this.headers;
            errorResponse.requestCharge = error.requestCharge;
            return errorResponse;
        });
    }
}
//# sourceMappingURL=BulkResponse.js.map