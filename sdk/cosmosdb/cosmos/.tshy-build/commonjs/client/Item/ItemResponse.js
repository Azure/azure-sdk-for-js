"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemResponse = void 0;
const ResourceResponse_js_1 = require("../../request/ResourceResponse.js");
class ItemResponse extends ResourceResponse_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, subsstatusCode, item, diagnostics) {
        super(resource, headers, statusCode, diagnostics, subsstatusCode);
        this.item = item;
    }
}
exports.ItemResponse = ItemResponse;
//# sourceMappingURL=ItemResponse.js.map