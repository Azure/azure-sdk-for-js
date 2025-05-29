import { CodeSigningAccount, CodeSigningAccountPatch, CheckNameAvailability, CheckNameAvailabilityResult, _CodeSigningAccountListResult } from "../../models/models.js";
import { CodeSigningContext as Client } from "../index.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import { CodeSigningAccountsGetOptionalParams, CodeSigningAccountsCreateOptionalParams, CodeSigningAccountsUpdateOptionalParams, CodeSigningAccountsDeleteOptionalParams, CodeSigningAccountsListByResourceGroupOptionalParams, CodeSigningAccountsListBySubscriptionOptionalParams, CodeSigningAccountsCheckNameAvailabilityOptionalParams } from "../../models/options.js";
export declare function _getSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, options?: CodeSigningAccountsGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<CodeSigningAccount>;
/** Get a trusted Signing Account. */
export declare function get(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, options?: CodeSigningAccountsGetOptionalParams): Promise<CodeSigningAccount>;
export declare function _createSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, resource: CodeSigningAccount, options?: CodeSigningAccountsCreateOptionalParams): StreamableMethod;
export declare function _createDeserialize(result: PathUncheckedResponse): Promise<CodeSigningAccount>;
/** Create a trusted Signing Account. */
export declare function create(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, resource: CodeSigningAccount, options?: CodeSigningAccountsCreateOptionalParams): PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
export declare function _updateSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, properties: CodeSigningAccountPatch, options?: CodeSigningAccountsUpdateOptionalParams): StreamableMethod;
export declare function _updateDeserialize(result: PathUncheckedResponse): Promise<CodeSigningAccount>;
/** Update a trusted signing account. */
export declare function update(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, properties: CodeSigningAccountPatch, options?: CodeSigningAccountsUpdateOptionalParams): PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
export declare function _$deleteSend(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, options?: CodeSigningAccountsDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Delete a trusted signing account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, subscriptionId: string, resourceGroupName: string, accountName: string, options?: CodeSigningAccountsDeleteOptionalParams): PollerLike<OperationState<void>, void>;
export declare function _listByResourceGroupSend(context: Client, subscriptionId: string, resourceGroupName: string, options?: CodeSigningAccountsListByResourceGroupOptionalParams): StreamableMethod;
export declare function _listByResourceGroupDeserialize(result: PathUncheckedResponse): Promise<_CodeSigningAccountListResult>;
/** Lists trusted signing accounts within a resource group. */
export declare function listByResourceGroup(context: Client, subscriptionId: string, resourceGroupName: string, options?: CodeSigningAccountsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<CodeSigningAccount>;
export declare function _listBySubscriptionSend(context: Client, subscriptionId: string, options?: CodeSigningAccountsListBySubscriptionOptionalParams): StreamableMethod;
export declare function _listBySubscriptionDeserialize(result: PathUncheckedResponse): Promise<_CodeSigningAccountListResult>;
/** Lists trusted signing accounts within a subscription. */
export declare function listBySubscription(context: Client, subscriptionId: string, options?: CodeSigningAccountsListBySubscriptionOptionalParams): PagedAsyncIterableIterator<CodeSigningAccount>;
export declare function _checkNameAvailabilitySend(context: Client, subscriptionId: string, body: CheckNameAvailability, options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams): StreamableMethod;
export declare function _checkNameAvailabilityDeserialize(result: PathUncheckedResponse): Promise<CheckNameAvailabilityResult>;
/** Checks that the trusted signing account name is valid and is not already in use. */
export declare function checkNameAvailability(context: Client, subscriptionId: string, body: CheckNameAvailability, options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams): Promise<CheckNameAvailabilityResult>;
//# sourceMappingURL=index.d.ts.map