"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinuationTokenForPartitionKey = void 0;
/**
 * Continuation token for change feed of entire container, or a specific Epk Range.
 * @internal
 */
class ContinuationTokenForPartitionKey {
    constructor(rid, partitionKey, continuation) {
        this.rid = rid;
        this.partitionKey = partitionKey;
        this.Continuation = continuation;
    }
}
exports.ContinuationTokenForPartitionKey = ContinuationTokenForPartitionKey;
//# sourceMappingURL=ContinuationTokenForPartitionKey.js.map