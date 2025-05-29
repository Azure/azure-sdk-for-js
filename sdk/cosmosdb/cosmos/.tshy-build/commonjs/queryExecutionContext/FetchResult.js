"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchResult = exports.FetchResultType = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** @hidden */
var FetchResultType;
(function (FetchResultType) {
    FetchResultType[FetchResultType["Done"] = 0] = "Done";
    FetchResultType[FetchResultType["Exception"] = 1] = "Exception";
    FetchResultType[FetchResultType["Result"] = 2] = "Result";
})(FetchResultType || (exports.FetchResultType = FetchResultType = {}));
/** @hidden */
class FetchResult {
    /**
     * Wraps fetch results for the document producer.
     * This allows the document producer to buffer exceptions so that actual results don't get flushed during splits.
     *
     * @param feedReponse - The response the document producer got back on a successful fetch
     * @param error - The exception meant to be buffered on an unsuccessful fetch
     * @hidden
     */
    constructor(feedResponse, error, headers) {
        // TODO: feedResponse/error
        if (feedResponse !== undefined) {
            this.feedResponse = feedResponse;
            this.headers = headers;
            this.fetchResultType = FetchResultType.Result;
        }
        else {
            this.error = error;
            this.fetchResultType = FetchResultType.Exception;
        }
    }
}
exports.FetchResult = FetchResult;
//# sourceMappingURL=FetchResult.js.map