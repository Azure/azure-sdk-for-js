import { ResourceResponse } from "../../request/index.js";
export class StoredProcedureResponse extends ResourceResponse {
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
//# sourceMappingURL=StoredProcedureResponse.js.map