import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { StoredProcedure } from "./StoredProcedure.js";
import type { StoredProcedureDefinition } from "./StoredProcedureDefinition.js";
export declare class StoredProcedureResponse extends ResourceResponse<StoredProcedureDefinition & Resource> {
    constructor(resource: StoredProcedureDefinition & Resource, headers: CosmosHeaders, statusCode: number, storedProcedure: StoredProcedure, diagnostics: CosmosDiagnostics);
    /**
     * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
     */
    readonly storedProcedure: StoredProcedure;
    /**
     * Alias for storedProcedure.
     *
     * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
     */
    get sproc(): StoredProcedure;
}
//# sourceMappingURL=StoredProcedureResponse.d.ts.map