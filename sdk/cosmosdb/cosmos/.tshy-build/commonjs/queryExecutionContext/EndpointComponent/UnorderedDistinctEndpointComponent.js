"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnorderedDistinctEndpointComponent = void 0;
const hashObject_js_1 = require("../../utils/hashObject.js");
/** @hidden */
class UnorderedDistinctEndpointComponent {
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
                const hashedResult = await (0, hashObject_js_1.hashObject)(item);
                if (!this.hashedResults.has(hashedResult)) {
                    buffer.push(item);
                    this.hashedResults.add(hashedResult);
                }
            }
        }
        return { result: buffer, headers: response.headers };
    }
}
exports.UnorderedDistinctEndpointComponent = UnorderedDistinctEndpointComponent;
//# sourceMappingURL=UnorderedDistinctEndpointComponent.js.map