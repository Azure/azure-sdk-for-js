import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ObjectReplicationPoliciesOperations } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { ObjectReplicationPolicy, ObjectReplicationPoliciesListOptionalParams, ObjectReplicationPoliciesGetOptionalParams, ObjectReplicationPoliciesGetResponse, ObjectReplicationPoliciesCreateOrUpdateOptionalParams, ObjectReplicationPoliciesCreateOrUpdateResponse, ObjectReplicationPoliciesDeleteOptionalParams } from "../models/index.js";
/** Class containing ObjectReplicationPoliciesOperations operations. */
export declare class ObjectReplicationPoliciesOperationsImpl implements ObjectReplicationPoliciesOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class ObjectReplicationPoliciesOperations class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * List the object replication policies associated with the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: ObjectReplicationPoliciesListOptionalParams): PagedAsyncIterableIterator<ObjectReplicationPolicy>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List the object replication policies associated with the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get the object replication policy of the storage account by policy ID.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param objectReplicationPolicyId For the destination account, provide the value 'default'. Configure
     *                                  the policy on the destination account first. For the source account, provide the value of the policy
     *                                  ID that is returned when you download the policy that was defined on the destination account. The
     *                                  policy is downloaded as a JSON file.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, objectReplicationPolicyId: string, options?: ObjectReplicationPoliciesGetOptionalParams): Promise<ObjectReplicationPoliciesGetResponse>;
    /**
     * Create or update the object replication policy of the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param objectReplicationPolicyId For the destination account, provide the value 'default'. Configure
     *                                  the policy on the destination account first. For the source account, provide the value of the policy
     *                                  ID that is returned when you download the policy that was defined on the destination account. The
     *                                  policy is downloaded as a JSON file.
     * @param properties The object replication policy set to a storage account. A unique policy ID will be
     *                   created if absent.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, objectReplicationPolicyId: string, properties: ObjectReplicationPolicy, options?: ObjectReplicationPoliciesCreateOrUpdateOptionalParams): Promise<ObjectReplicationPoliciesCreateOrUpdateResponse>;
    /**
     * Deletes the object replication policy associated with the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param objectReplicationPolicyId For the destination account, provide the value 'default'. Configure
     *                                  the policy on the destination account first. For the source account, provide the value of the policy
     *                                  ID that is returned when you download the policy that was defined on the destination account. The
     *                                  policy is downloaded as a JSON file.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, accountName: string, objectReplicationPolicyId: string, options?: ObjectReplicationPoliciesDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=objectReplicationPoliciesOperations.d.ts.map