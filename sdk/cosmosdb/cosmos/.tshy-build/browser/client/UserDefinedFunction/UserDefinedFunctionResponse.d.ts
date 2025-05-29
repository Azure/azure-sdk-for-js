import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { UserDefinedFunction } from "./UserDefinedFunction.js";
import type { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition.js";
export declare class UserDefinedFunctionResponse extends ResourceResponse<UserDefinedFunctionDefinition & Resource> {
    constructor(resource: UserDefinedFunctionDefinition & Resource, headers: CosmosHeaders, statusCode: number, udf: UserDefinedFunction, diagnostics: CosmosDiagnostics);
    /** A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}. */
    readonly userDefinedFunction: UserDefinedFunction;
    /**
     * Alias for `userDefinedFunction(id)`.
     *
     * A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}.
     */
    get udf(): UserDefinedFunction;
}
//# sourceMappingURL=UserDefinedFunctionResponse.d.ts.map