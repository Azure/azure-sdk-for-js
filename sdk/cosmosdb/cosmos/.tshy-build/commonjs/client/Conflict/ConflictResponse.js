"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictResponse = void 0;
const index_js_1 = require("../../request/index.js");
class ConflictResponse extends index_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, conflict, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.conflict = conflict;
    }
}
exports.ConflictResponse = ConflictResponse;
//# sourceMappingURL=ConflictResponse.js.map