import { hashObject } from "../../utils/hashObject.js";
/** @hidden */
export class UnorderedDistinctEndpointComponent {
    constructor(executionContext) {
        this.executionContext = executionContext;
        this.hashedResults = new Set();
    }
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
            if (item) {
                const hashedResult = await hashObject(item);
                if (!this.hashedResults.has(hashedResult)) {
                    buffer.push(item);
                    this.hashedResults.add(hashedResult);
                }
            }
        }
        return { result: buffer, headers: response.headers };
    }
}
//# sourceMappingURL=UnorderedDistinctEndpointComponent.js.map