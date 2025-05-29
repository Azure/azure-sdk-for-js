"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerResponse = void 0;
const index_js_1 = require("../../request/index.js");
class TriggerResponse extends index_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, trigger, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.trigger = trigger;
    }
}
exports.TriggerResponse = TriggerResponse;
//# sourceMappingURL=TriggerResponse.js.map