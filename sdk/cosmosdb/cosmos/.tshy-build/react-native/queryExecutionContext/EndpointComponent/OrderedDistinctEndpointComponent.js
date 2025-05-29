import { hashObject } from "../../utils/hashObject.js";
/** @hidden */
export class OrderedDistinctEndpointComponent {
    constructor(executionContext) {
        this.executionContext = executionContext;
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
                if (hashedResult !== this.hashedLastResult) {
                    buffer.push(item);
                    this.hashedLastResult = hashedResult;
                }
            }
        }
        return { result: buffer, headers: response.headers };
    }
}
//# sourceMappingURL=OrderedDistinctEndpointComponent.js.map