/**
 * Continuation token for change feed of entire container, or a specific Epk Range.
 * @internal
 */
export class ContinuationTokenForPartitionKey {
    constructor(rid, partitionKey, continuation) {
        this.rid = rid;
        this.partitionKey = partitionKey;
        this.Continuation = continuation;
    }
}
//# sourceMappingURL=ContinuationTokenForPartitionKey.js.map