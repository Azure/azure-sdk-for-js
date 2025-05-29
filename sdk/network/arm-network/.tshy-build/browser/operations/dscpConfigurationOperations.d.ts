import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DscpConfigurationOperations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { DscpConfiguration, DscpConfigurationListOptionalParams, DscpConfigurationListAllOptionalParams, DscpConfigurationCreateOrUpdateOptionalParams, DscpConfigurationCreateOrUpdateResponse, DscpConfigurationDeleteOptionalParams, DscpConfigurationGetOptionalParams, DscpConfigurationGetResponse } from "../models/index.js";
/** Class containing DscpConfigurationOperations operations. */
export declare class DscpConfigurationOperationsImpl implements DscpConfigurationOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class DscpConfigurationOperations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets a DSCP Configuration.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: DscpConfigurationListOptionalParams): PagedAsyncIterableIterator<DscpConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all dscp configurations in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: DscpConfigurationListAllOptionalParams): PagedAsyncIterableIterator<DscpConfiguration>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Creates or updates a DSCP Configuration.
     * @param resourceGroupName The name of the resource group.
     * @param dscpConfigurationName The name of the resource.
     * @param parameters Parameters supplied to the create or update dscp configuration operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, dscpConfigurationName: string, parameters: DscpConfiguration, options?: DscpConfigurationCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<DscpConfigurationCreateOrUpdateResponse>, DscpConfigurationCreateOrUpdateResponse>>;
    /**
     * Creates or updates a DSCP Configuration.
     * @param resourceGroupName The name of the resource group.
     * @param dscpConfigurationName The name of the resource.
     * @param parameters Parameters supplied to the create or update dscp configuration operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, dscpConfigurationName: string, parameters: DscpConfiguration, options?: DscpConfigurationCreateOrUpdateOptionalParams): Promise<DscpConfigurationCreateOrUpdateResponse>;
    /**
     * Deletes a DSCP Configuration.
     * @param resourceGroupName The name of the resource group.
     * @param dscpConfigurationName The name of the resource.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, dscpConfigurationName: string, options?: DscpConfigurationDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a DSCP Configuration.
     * @param resourceGroupName The name of the resource group.
     * @param dscpConfigurationName The name of the resource.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, dscpConfigurationName: string, options?: DscpConfigurationDeleteOptionalParams): Promise<void>;
    /**
     * Gets a DSCP Configuration.
     * @param resourceGroupName The name of the resource group.
     * @param dscpConfigurationName The name of the resource.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, dscpConfigurationName: string, options?: DscpConfigurationGetOptionalParams): Promise<DscpConfigurationGetResponse>;
    /**
     * Gets a DSCP Configuration.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all dscp configurations in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
}
//# sourceMappingURL=dscpConfigurationOperations.d.ts.map