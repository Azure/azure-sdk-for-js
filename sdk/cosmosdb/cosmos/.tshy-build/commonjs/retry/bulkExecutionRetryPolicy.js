"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkExecutionRetryPolicy = void 0;
const helper_js_1 = require("../common/helper.js");
const statusCodes_js_1 = require("../common/statusCodes.js");
/**
 * This class implements the retry policy for bulk operations.
 * @hidden
 */
class BulkExecutionRetryPolicy {
    constructor(nextRetryPolicy) {
        this.MaxRetriesOn410 = 10;
        this.SubstatusCodeBatchResponseSizeExceeded = 3402;
        this.nextRetryPolicy = nextRetryPolicy;
        this.retriesOn410 = 0;
    }
    async shouldRetry(err, diagnosticNode) {
        if (!err) {
            return false;
        }
        if (err.code === statusCodes_js_1.StatusCodes.Gone) {
            this.retriesOn410++;
            if (this.retriesOn410 > this.MaxRetriesOn410) {
                return false;
            }
            if (err.substatus === statusCodes_js_1.SubStatusCodes.PartitionKeyRangeGone ||
                err.substatus === statusCodes_js_1.SubStatusCodes.CompletingSplit ||
                err.substatus === statusCodes_js_1.SubStatusCodes.CompletingPartitionMigration) {
                return true;
            }
            if (err.substatus === statusCodes_js_1.SubStatusCodes.NameCacheIsStale) {
                return true;
            }
        }
        // API can return 413 which means the response is bigger than 4Mb.
        // Operations that exceed the 4Mb limit are returned as 413/3402, while the operations within the 4Mb limit will be 200
        // TODO: better way to handle this error
        if (err.code === statusCodes_js_1.StatusCodes.RequestEntityTooLarge &&
            err.substatus === this.SubstatusCodeBatchResponseSizeExceeded) {
            return true;
        }
        // check for 429 error
        let shouldRetryForThrottle = false;
        if (err.code === statusCodes_js_1.StatusCodes.TooManyRequests) {
            const retryResult = await this.nextRetryPolicy.shouldRetry(err, diagnosticNode);
            shouldRetryForThrottle = Array.isArray(retryResult) ? retryResult[0] : retryResult;
        }
        if (shouldRetryForThrottle) {
            await (0, helper_js_1.sleep)(this.nextRetryPolicy.retryAfterInMs);
        }
        return shouldRetryForThrottle;
    }
}
exports.BulkExecutionRetryPolicy = BulkExecutionRetryPolicy;
//# sourceMappingURL=bulkExecutionRetryPolicy.js.map