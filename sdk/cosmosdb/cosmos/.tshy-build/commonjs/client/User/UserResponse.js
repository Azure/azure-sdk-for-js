"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
const index_js_1 = require("../../request/index.js");
class UserResponse extends index_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, user, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.user = user;
    }
}
exports.UserResponse = UserResponse;
//# sourceMappingURL=UserResponse.js.map