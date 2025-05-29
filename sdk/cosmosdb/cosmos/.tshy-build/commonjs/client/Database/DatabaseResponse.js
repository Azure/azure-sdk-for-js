"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseResponse = void 0;
const ResourceResponse_js_1 = require("../../request/ResourceResponse.js");
/** Response object for Database operations */
class DatabaseResponse extends ResourceResponse_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, database, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.database = database;
    }
}
exports.DatabaseResponse = DatabaseResponse;
//# sourceMappingURL=DatabaseResponse.js.map