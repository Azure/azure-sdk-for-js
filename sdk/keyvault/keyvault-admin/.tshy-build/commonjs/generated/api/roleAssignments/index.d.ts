import { KeyVaultContext as Client, RoleAssignmentsCreateOptionalParams, RoleAssignmentsDeleteOptionalParams, RoleAssignmentsGetOptionalParams, RoleAssignmentsListForScopeOptionalParams } from "../index.js";
import { RoleAssignment, RoleAssignmentCreateParameters, _RoleAssignmentListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
export declare function _listForScopeSend(context: Client, scope: string, options?: RoleAssignmentsListForScopeOptionalParams): StreamableMethod;
export declare function _listForScopeDeserialize(result: PathUncheckedResponse): Promise<_RoleAssignmentListResult>;
/** Gets role assignments for a scope. */
export declare function listForScope(context: Client, scope: string, options?: RoleAssignmentsListForScopeOptionalParams): PagedAsyncIterableIterator<RoleAssignment>;
export declare function _getSend(context: Client, scope: string, roleAssignmentName: string, options?: RoleAssignmentsGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment>;
/** Get the specified role assignment. */
export declare function get(context: Client, scope: string, roleAssignmentName: string, options?: RoleAssignmentsGetOptionalParams): Promise<RoleAssignment>;
export declare function _createSend(context: Client, scope: string, roleAssignmentName: string, parameters: RoleAssignmentCreateParameters, options?: RoleAssignmentsCreateOptionalParams): StreamableMethod;
export declare function _createDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment>;
/** Creates a role assignment. */
export declare function create(context: Client, scope: string, roleAssignmentName: string, parameters: RoleAssignmentCreateParameters, options?: RoleAssignmentsCreateOptionalParams): Promise<RoleAssignment>;
export declare function _$deleteSend(context: Client, scope: string, roleAssignmentName: string, options?: RoleAssignmentsDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment>;
/** Deletes a role assignment. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, scope: string, roleAssignmentName: string, options?: RoleAssignmentsDeleteOptionalParams): Promise<RoleAssignment>;
//# sourceMappingURL=index.d.ts.map