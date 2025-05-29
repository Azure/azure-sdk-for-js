"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionResponse = void 0;
const index_js_1 = require("../../request/index.js");
class PermissionResponse extends index_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, permission, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.permission = permission;
    }
}
exports.PermissionResponse = PermissionResponse;
//# sourceMappingURL=PermissionResponse.js.map