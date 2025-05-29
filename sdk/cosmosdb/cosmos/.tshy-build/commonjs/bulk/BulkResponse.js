"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkResponse = void 0;
const constants_js_1 = require("../common/constants.js");
const statusCodes_js_1 = require("../common/statusCodes.js");
const index_js_1 = require("../index.js");
const batch_js_1 = require("../utils/batch.js");
/**
 * Represents a batch response for bulk request.
 * @hidden
 */
class BulkResponse {
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
        bulkResponse.createAndPopulateResults(operations, 0, new index_js_1.ErrorResponse());
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
            if ((0, batch_js_1.isSuccessStatusCode)(responseMessage.code)) {
                bulkResponse = new BulkResponse(statusCodes_js_1.StatusCodes.InternalServerError, statusCodes_js_1.SubStatusCodes.Unknown, responseMessage.headers, operations);
            }
            // When the overall response status code is TooManyRequests, propagate the RetryAfter into the individual operations.
            let retryAfterMilliseconds = 0;
            if (responseMessage.code === statusCodes_js_1.StatusCodes.TooManyRequests) {
                const retryAfter = (_a = responseMessage.headers) === null || _a === void 0 ? void 0 : _a[constants_js_1.Constants.HttpHeaders.RetryAfterInMs];
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
                if ((0, batch_js_1.isSuccessStatusCode)(itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.statusCode)) {
                    const result = {
                        statusCode: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.statusCode,
                        eTag: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.eTag,
                        activityId: (_a = responseMessage.headers) === null || _a === void 0 ? void 0 : _a[constants_js_1.Constants.HttpHeaders.ActivityId],
                        sessionToken: (_b = responseMessage.headers) === null || _b === void 0 ? void 0 : _b[constants_js_1.Constants.HttpHeaders.SessionToken],
                        requestCharge: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.requestCharge,
                        resourceBody: itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.resourceBody,
                        // diagnostics will be filled in Batcher dispatch to capture the complete diagnostics(e.g. decryption)
                        diagnostics: null,
                        headers: responseMessage.headers,
                    };
                    results.push(result);
                }
                else {
                    const error = new index_js_1.ErrorResponse();
                    error.code = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.statusCode;
                    error.substatus = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.subStatusCode;
                    error.message = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.message;
                    error.requestCharge = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.requestCharge;
                    error.body = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.resourceBody;
                    error.headers = responseMessage.headers;
                    error.activityId = (_c = responseMessage.headers) === null || _c === void 0 ? void 0 : _c[constants_js_1.Constants.HttpHeaders.ActivityId];
                    error.retryAfterInMs = itemResponse === null || itemResponse === void 0 ? void 0 : itemResponse.retryAfterMilliseconds;
                    error.diagnostics = responseMessage.diagnostics;
                    results.push(error);
                }
            }
        }
        let statusCode = responseMessage.code;
        let subStatusCode = responseMessage.substatus;
        if (responseMessage.code === statusCodes_js_1.StatusCodes.MultiStatus) {
            for (const result of results) {
                if (result instanceof index_js_1.ErrorResponse &&
                    result.statusCode !== statusCodes_js_1.StatusCodes.FailedDependency &&
                    result.statusCode >= statusCodes_js_1.StatusCodes.BadRequest) {
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
            const errorResponse = new index_js_1.ErrorResponse();
            errorResponse.message = error.message;
            errorResponse.code = this.statusCode;
            errorResponse.substatus = this.subStatusCode;
            errorResponse.retryAfterInMs = retryAfterInMs;
            errorResponse.activityId = (_a = this.headers) === null || _a === void 0 ? void 0 : _a[constants_js_1.Constants.HttpHeaders.ActivityId];
            errorResponse.body = error.body;
            errorResponse.diagnostics = error.diagnostics;
            errorResponse.headers = this.headers;
            errorResponse.requestCharge = error.requestCharge;
            return errorResponse;
        });
    }
}
exports.BulkResponse = BulkResponse;
//# sourceMappingURL=BulkResponse.js.map