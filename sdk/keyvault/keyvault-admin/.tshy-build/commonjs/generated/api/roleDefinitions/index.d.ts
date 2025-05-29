import { KeyVaultContext as Client, RoleDefinitionsCreateOrUpdateOptionalParams, RoleDefinitionsDeleteOptionalParams, RoleDefinitionsGetOptionalParams, RoleDefinitionsListOptionalParams } from "../index.js";
import { RoleDefinition, RoleDefinitionCreateParameters, _RoleDefinitionListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
export declare function _listSend(context: Client, scope: string, options?: RoleDefinitionsListOptionalParams): StreamableMethod;
export declare function _listDeserialize(result: PathUncheckedResponse): Promise<_RoleDefinitionListResult>;
/** Get all role definitions that are applicable at scope and above. */
export declare function list(context: Client, scope: string, options?: RoleDefinitionsListOptionalParams): PagedAsyncIterableIterator<RoleDefinition>;
export declare function _getSend(context: Client, scope: string, roleDefinitionName: string, options?: RoleDefinitionsGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<RoleDefinition>;
/** Get the specified role definition. */
export declare function get(context: Client, scope: string, roleDefinitionName: string, options?: RoleDefinitionsGetOptionalParams): Promise<RoleDefinition>;
export declare function _createOrUpdateSend(context: Client, scope: string, roleDefinitionName: string, parameters: RoleDefinitionCreateParameters, options?: RoleDefinitionsCreateOrUpdateOptionalParams): StreamableMethod;
export declare function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<RoleDefinition>;
/** Creates or updates a custom role definition. */
export declare function createOrUpdate(context: Client, scope: string, roleDefinitionName: string, parameters: RoleDefinitionCreateParameters, options?: RoleDefinitionsCreateOrUpdateOptionalParams): Promise<RoleDefinition>;
export declare function _$deleteSend(context: Client, scope: string, roleDefinitionName: string, options?: RoleDefinitionsDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<RoleDefinition>;
/** Deletes a custom role definition. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, scope: string, roleDefinitionName: string, options?: RoleDefinitionsDeleteOptionalParams): Promise<RoleDefinition>;
//# sourceMappingURL=index.d.ts.map