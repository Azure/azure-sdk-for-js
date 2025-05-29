import type { RoleDefinitions } from "../operationsInterfaces/index.js";
import type { AccessControlClient } from "../accessControlClient.js";
import type { RoleDefinitionsListRoleDefinitionsOptionalParams, RoleDefinitionsListRoleDefinitionsResponse, RoleDefinitionsGetRoleDefinitionByIdOptionalParams, RoleDefinitionsGetRoleDefinitionByIdResponse, RoleDefinitionsListScopesOptionalParams, RoleDefinitionsListScopesResponse } from "../models/index.js";
/** Class containing RoleDefinitions operations. */
export declare class RoleDefinitionsImpl implements RoleDefinitions {
    private readonly client;
    /**
     * Initialize a new instance of the class RoleDefinitions class.
     * @param client - Reference to the service client
     */
    constructor(client: AccessControlClient);
    /**
     * List role definitions.
     * @param options - The options parameters.
     */
    listRoleDefinitions(options?: RoleDefinitionsListRoleDefinitionsOptionalParams): Promise<RoleDefinitionsListRoleDefinitionsResponse>;
    /**
     * Get role definition by role definition Id.
     * @param roleDefinitionId - Synapse Built-In Role Definition Id.
     * @param options - The options parameters.
     */
    getRoleDefinitionById(roleDefinitionId: string, options?: RoleDefinitionsGetRoleDefinitionByIdOptionalParams): Promise<RoleDefinitionsGetRoleDefinitionByIdResponse>;
    /**
     * List rbac scopes.
     * @param options - The options parameters.
     */
    listScopes(options?: RoleDefinitionsListScopesOptionalParams): Promise<RoleDefinitionsListScopesResponse>;
}
//# sourceMappingURL=roleDefinitions.d.ts.map