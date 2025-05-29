"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetLimitEndpointComponent = void 0;
const headerUtils_js_1 = require("../headerUtils.js");
/** @hidden */
class OffsetLimitEndpointComponent {
    constructor(executionContext, offset, limit) {
        this.executionContext = executionContext;
        this.offset = offset;
        this.limit = limit;
    }
    hasMoreResults() {
        return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
    }
    async fetchMore(diagnosticNode) {
        const aggregateHeaders = (0, headerUtils_js_1.getInitialHeader)();
        const buffer = [];
        const response = await this.executionContext.fetchMore(diagnosticNode);
        (0, headerUtils_js_1.mergeHeaders)(aggregateHeaders, response.headers);
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
exports.OffsetLimitEndpointComponent = OffsetLimitEndpointComponent;
//# sourceMappingURL=OffsetLimitEndpointComponent.js.map