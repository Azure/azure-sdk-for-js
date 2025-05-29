import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { Permission } from "./Permission.js";
import type { PermissionBody } from "./PermissionBody.js";
import type { PermissionDefinition } from "./PermissionDefinition.js";
export declare class PermissionResponse extends ResourceResponse<PermissionDefinition & PermissionBody & Resource> {
    constructor(resource: PermissionDefinition & PermissionBody & Resource, headers: CosmosHeaders, statusCode: number, permission: Permission, diagnostics: CosmosDiagnostics);
    /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
    readonly permission: Permission;
}
//# sourceMappingURL=PermissionResponse.d.ts.map