"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredProcedureResponse = void 0;
const index_js_1 = require("../../request/index.js");
class StoredProcedureResponse extends index_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, storedProcedure, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.storedProcedure = storedProcedure;
    }
    /**
     * Alias for storedProcedure.
     *
     * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
     */
    get sproc() {
        return this.storedProcedure;
    }
}
exports.StoredProcedureResponse = StoredProcedureResponse;
//# sourceMappingURL=StoredProcedureResponse.js.map