import { CodeSigningContext } from "../../api/codeSigningContext.js";
import { CodeSigningAccount, CodeSigningAccountPatch, CheckNameAvailability, CheckNameAvailabilityResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import { CodeSigningAccountsGetOptionalParams, CodeSigningAccountsCreateOptionalParams, CodeSigningAccountsUpdateOptionalParams, CodeSigningAccountsDeleteOptionalParams, CodeSigningAccountsListByResourceGroupOptionalParams, CodeSigningAccountsListBySubscriptionOptionalParams, CodeSigningAccountsCheckNameAvailabilityOptionalParams } from "../../models/options.js";
/** Interface representing a CodeSigningAccounts operations. */
export interface CodeSigningAccountsOperations {
    /** Get a trusted Signing Account. */
    get: (resourceGroupName: string, accountName: string, options?: CodeSigningAccountsGetOptionalParams) => Promise<CodeSigningAccount>;
    /** Create a trusted Signing Account. */
    create: (resourceGroupName: string, accountName: string, resource: CodeSigningAccount, options?: CodeSigningAccountsCreateOptionalParams) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
    /** Update a trusted signing account. */
    update: (resourceGroupName: string, accountName: string, properties: CodeSigningAccountPatch, options?: CodeSigningAccountsUpdateOptionalParams) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
    /** Delete a trusted signing account. */
    /**
     *  @fixme delete is a reserved word that cannot be used as an operation name.
     *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
     *         to the operation to override the generated name.
     */
    delete: (resourceGroupName: string, accountName: string, options?: CodeSigningAccountsDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    /** Lists trusted signing accounts within a resource group. */
    listByResourceGroup: (resourceGroupName: string, options?: CodeSigningAccountsListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<CodeSigningAccount>;
    /** Lists trusted signing accounts within a subscription. */
    listBySubscription: (options?: CodeSigningAccountsListBySubscriptionOptionalParams) => PagedAsyncIterableIterator<CodeSigningAccount>;
    /** Checks that the trusted signing account name is valid and is not already in use. */
    checkNameAvailability: (body: CheckNameAvailability, options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams) => Promise<CheckNameAvailabilityResult>;
}
export declare function getCodeSigningAccounts(context: CodeSigningContext, subscriptionId: string): {
    get: (resourceGroupName: string, accountName: string, options?: CodeSigningAccountsGetOptionalParams) => Promise<CodeSigningAccount>;
    create: (resourceGroupName: string, accountName: string, resource: CodeSigningAccount, options?: CodeSigningAccountsCreateOptionalParams) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
    update: (resourceGroupName: string, accountName: string, properties: CodeSigningAccountPatch, options?: CodeSigningAccountsUpdateOptionalParams) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
    delete: (resourceGroupName: string, accountName: string, options?: CodeSigningAccountsDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    listByResourceGroup: (resourceGroupName: string, options?: CodeSigningAccountsListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<CodeSigningAccount, CodeSigningAccount[], import("../../static-helpers/pagingHelpers.js").PageSettings>;
    listBySubscription: (options?: CodeSigningAccountsListBySubscriptionOptionalParams) => PagedAsyncIterableIterator<CodeSigningAccount, CodeSigningAccount[], import("../../static-helpers/pagingHelpers.js").PageSettings>;
    checkNameAvailability: (body: CheckNameAvailability, options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams) => Promise<CheckNameAvailabilityResult>;
};
export declare function getCodeSigningAccountsOperations(context: CodeSigningContext, subscriptionId: string): CodeSigningAccountsOperations;
//# sourceMappingURL=index.d.ts.map