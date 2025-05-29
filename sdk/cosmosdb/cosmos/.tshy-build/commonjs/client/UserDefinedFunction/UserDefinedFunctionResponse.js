"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDefinedFunctionResponse = void 0;
const index_js_1 = require("../../request/index.js");
class UserDefinedFunctionResponse extends index_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, udf, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.userDefinedFunction = udf;
    }
    /**
     * Alias for `userDefinedFunction(id)`.
     *
     * A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}.
     */
    get udf() {
        return this.userDefinedFunction;
    }
}
exports.UserDefinedFunctionResponse = UserDefinedFunctionResponse;
//# sourceMappingURL=UserDefinedFunctionResponse.js.map