"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedStartFromContinuation = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const index_js_1 = require("../../request/index.js");
const ChangeFeedEnums_js_1 = require("./ChangeFeedEnums.js");
/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from a saved point.
 */
class ChangeFeedStartFromContinuation {
    constructor(continuation) {
        this.continuationToken = continuation;
    }
    getCfResource() {
        return this.continuationToken;
    }
    getCfResourceJson() {
        return JSON.parse(this.continuationToken);
    }
    getResourceType() {
        const cToken = this.getCfResourceJson();
        if (Object.prototype.hasOwnProperty.call(cToken, "partitionKey") &&
            Object.prototype.hasOwnProperty.call(cToken, "Continuation") &&
            typeof cToken.Continuation === "string") {
            return ChangeFeedEnums_js_1.ChangeFeedResourceType.PartitionKey;
        }
        else if (Object.prototype.hasOwnProperty.call(cToken, "Continuation") &&
            Array.isArray(cToken.Continuation) &&
            cToken.Continuation.length > 0) {
            return ChangeFeedEnums_js_1.ChangeFeedResourceType.FeedRange;
        }
        else {
            throw new index_js_1.ErrorResponse("Invalid continuation token.");
        }
    }
}
exports.ChangeFeedStartFromContinuation = ChangeFeedStartFromContinuation;
//# sourceMappingURL=ChangeFeedStartFromContinuation.js.map