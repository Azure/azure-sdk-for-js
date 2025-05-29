import { KeyVaultContext } from "../../api/keyVaultContext.js";
import { RoleAssignmentsListForScopeOptionalParams, RoleAssignmentsGetOptionalParams, RoleAssignmentsCreateOptionalParams, RoleAssignmentsDeleteOptionalParams } from "../../api/options.js";
import { RoleAssignment, RoleAssignmentCreateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
/** Interface representing a RoleAssignments operations. */
export interface RoleAssignmentsOperations {
    /** Gets role assignments for a scope. */
    listForScope: (scope: string, options?: RoleAssignmentsListForScopeOptionalParams) => PagedAsyncIterableIterator<RoleAssignment>;
    /** Get the specified role assignment. */
    get: (scope: string, roleAssignmentName: string, options?: RoleAssignmentsGetOptionalParams) => Promise<RoleAssignment>;
    /** Creates a role assignment. */
    create: (scope: string, roleAssignmentName: string, parameters: RoleAssignmentCreateParameters, options?: RoleAssignmentsCreateOptionalParams) => Promise<RoleAssignment>;
    /** Deletes a role assignment. */
    /**
     *  @fixme delete is a reserved word that cannot be used as an operation name.
     *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
     *         to the operation to override the generated name.
     */
    delete: (scope: string, roleAssignmentName: string, options?: RoleAssignmentsDeleteOptionalParams) => Promise<RoleAssignment>;
}
export declare function _getRoleAssignmentsOperations(context: KeyVaultContext): RoleAssignmentsOperations;
//# sourceMappingURL=index.d.ts.map