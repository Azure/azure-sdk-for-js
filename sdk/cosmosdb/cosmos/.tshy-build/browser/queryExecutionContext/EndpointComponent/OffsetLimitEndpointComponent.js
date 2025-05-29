import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
/** @hidden */
export class OffsetLimitEndpointComponent {
    constructor(executionContext, offset, limit) {
        this.executionContext = executionContext;
        this.offset = offset;
        this.limit = limit;
    }
    hasMoreResults() {
        return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
    }
    async fetchMore(diagnosticNode) {
        const aggregateHeaders = getInitialHeader();
        const buffer = [];
        const response = await this.executionContext.fetchMore(diagnosticNode);
        mergeHeaders(aggregateHeaders, response.headers);
        if (response === undefined || response.result === undefined) {
            return { result: undefined, headers: response.headers };
        }
        for (const item of response.result) {
            if (this.offset > 0) {
                this.offset--;
            }
            else if (this.limit > 0) {
                buffer.push(item);
                this.limit--;
            }
        }
        return { result: buffer, headers: aggregateHeaders };
    }
}
//# sourceMappingURL=OffsetLimitEndpointComponent.js.map