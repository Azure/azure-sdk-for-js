"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerResponse = void 0;
const ResourceResponse_js_1 = require("../../request/ResourceResponse.js");
/** Response object for Container operations */
class ContainerResponse extends ResourceResponse_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, container, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.container = container;
    }
}
exports.ContainerResponse = ContainerResponse;
//# sourceMappingURL=ContainerResponse.js.map