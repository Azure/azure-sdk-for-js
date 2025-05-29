import { KeyVaultContext } from "../../api/keyVaultContext.js";
import { RoleDefinitionsListOptionalParams, RoleDefinitionsGetOptionalParams, RoleDefinitionsCreateOrUpdateOptionalParams, RoleDefinitionsDeleteOptionalParams } from "../../api/options.js";
import { RoleDefinition, RoleDefinitionCreateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
/** Interface representing a RoleDefinitions operations. */
export interface RoleDefinitionsOperations {
    /** Get all role definitions that are applicable at scope and above. */
    list: (scope: string, options?: RoleDefinitionsListOptionalParams) => PagedAsyncIterableIterator<RoleDefinition>;
    /** Get the specified role definition. */
    get: (scope: string, roleDefinitionName: string, options?: RoleDefinitionsGetOptionalParams) => Promise<RoleDefinition>;
    /** Creates or updates a custom role definition. */
    createOrUpdate: (scope: string, roleDefinitionName: string, parameters: RoleDefinitionCreateParameters, options?: RoleDefinitionsCreateOrUpdateOptionalParams) => Promise<RoleDefinition>;
    /** Deletes a custom role definition. */
    /**
     *  @fixme delete is a reserved word that cannot be used as an operation name.
     *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
     *         to the operation to override the generated name.
     */
    delete: (scope: string, roleDefinitionName: string, options?: RoleDefinitionsDeleteOptionalParams) => Promise<RoleDefinition>;
}
export declare function _getRoleDefinitionsOperations(context: KeyVaultContext): RoleDefinitionsOperations;
//# sourceMappingURL=index.d.ts.map