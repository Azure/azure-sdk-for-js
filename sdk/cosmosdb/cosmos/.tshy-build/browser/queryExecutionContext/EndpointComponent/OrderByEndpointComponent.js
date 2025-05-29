/** @hidden */
export class OrderByEndpointComponent {
    /**
     * Represents an endpoint in handling an order by query. For each processed orderby
     * result it returns 'payload' item of the result
     *
     * @param executionContext - Underlying Execution Context
     * @hidden
     */
    constructor(executionContext, emitRawOrderByPayload = false) {
        this.executionContext = executionContext;
        this.emitRawOrderByPayload = emitRawOrderByPayload;
    }
    /**
     * Determine if there are still remaining resources to processs.
     * @returns true if there is other elements to process in the OrderByEndpointComponent.
     */
    hasMoreResults() {
        return this.executionContext.hasMoreResults();
    }
    async fetchMore(diagnosticNode) {
        const buffer = [];
        const response = await this.executionContext.fetchMore(diagnosticNode);
        if (response === undefined || response.result === undefined) {
            return { result: undefined, headers: response.headers };
        }
        for (const item of response.result) {
            if (this.emitRawOrderByPayload) {
                buffer.push(item);
            }
            else {
                buffer.push(item.payload);
            }
        }
        return { result: buffer, headers: response.headers };
    }
}
//# sourceMappingURL=OrderByEndpointComponent.js.map