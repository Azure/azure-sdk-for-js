"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedDistinctEndpointComponent = void 0;
const hashObject_js_1 = require("../../utils/hashObject.js");
/** @hidden */
class OrderedDistinctEndpointComponent {
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
                const hashedResult = await (0, hashObject_js_1.hashObject)(item);
                if (hashedResult !== this.hashedLastResult) {
                    buffer.push(item);
                    this.hashedLastResult = hashedResult;
                }
            }
        }
        return { result: buffer, headers: response.headers };
    }
}
exports.OrderedDistinctEndpointComponent = OrderedDistinctEndpointComponent;
//# sourceMappingURL=OrderedDistinctEndpointComponent.js.map