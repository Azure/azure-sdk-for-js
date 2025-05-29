"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeContinuationToken = void 0;
/**
 * Continuation token for change feed of entire container, or a specific Epk Range.
 * @internal
 */
class CompositeContinuationToken {
    constructor(rid, Continuation) {
        this.rid = rid;
        this.Continuation = Continuation;
    }
}
exports.CompositeContinuationToken = CompositeContinuationToken;
//# sourceMappingURL=CompositeContinuationToken.js.map