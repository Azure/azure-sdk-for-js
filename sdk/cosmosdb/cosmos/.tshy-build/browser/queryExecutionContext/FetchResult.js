// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** @hidden */
export var FetchResultType;
(function (FetchResultType) {
    FetchResultType[FetchResultType["Done"] = 0] = "Done";
    FetchResultType[FetchResultType["Exception"] = 1] = "Exception";
    FetchResultType[FetchResultType["Result"] = 2] = "Result";
})(FetchResultType || (FetchResultType = {}));
/** @hidden */
export class FetchResult {
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
//# sourceMappingURL=FetchResult.js.map