/**
 * Continuation token for change feed of entire container, or a specific Epk Range.
 * @internal
 */
export class CompositeContinuationToken {
    constructor(rid, Continuation) {
        this.rid = rid;
        this.Continuation = Continuation;
    }
}
//# sourceMappingURL=CompositeContinuationToken.js.map