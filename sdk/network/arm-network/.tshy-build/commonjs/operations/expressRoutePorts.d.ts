import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRoutePorts } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ExpressRoutePort, ExpressRoutePortsListByResourceGroupOptionalParams, ExpressRoutePortsListOptionalParams, ExpressRoutePortsDeleteOptionalParams, ExpressRoutePortsGetOptionalParams, ExpressRoutePortsGetResponse, ExpressRoutePortsCreateOrUpdateOptionalParams, ExpressRoutePortsCreateOrUpdateResponse, TagsObject, ExpressRoutePortsUpdateTagsOptionalParams, ExpressRoutePortsUpdateTagsResponse, GenerateExpressRoutePortsLOARequest, ExpressRoutePortsGenerateLOAOptionalParams, ExpressRoutePortsGenerateLOAResponse } from "../models/index.js";
/** Class containing ExpressRoutePorts operations. */
export declare class ExpressRoutePortsImpl implements ExpressRoutePorts {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRoutePorts class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List all the ExpressRoutePort resources in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: ExpressRoutePortsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<ExpressRoutePort>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * List all the ExpressRoutePort resources in the specified subscription.
     * @param options The options parameters.
     */
    list(options?: ExpressRoutePortsListOptionalParams): PagedAsyncIterableIterator<ExpressRoutePort>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, expressRoutePortName: string, options?: ExpressRoutePortsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, expressRoutePortName: string, options?: ExpressRoutePortsDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves the requested ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of ExpressRoutePort.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, expressRoutePortName: string, options?: ExpressRoutePortsGetOptionalParams): Promise<ExpressRoutePortsGetResponse>;
    /**
     * Creates or updates the specified ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param parameters Parameters supplied to the create ExpressRoutePort operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, expressRoutePortName: string, parameters: ExpressRoutePort, options?: ExpressRoutePortsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRoutePortsCreateOrUpdateResponse>, ExpressRoutePortsCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param parameters Parameters supplied to the create ExpressRoutePort operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, expressRoutePortName: string, parameters: ExpressRoutePort, options?: ExpressRoutePortsCreateOrUpdateOptionalParams): Promise<ExpressRoutePortsCreateOrUpdateResponse>;
    /**
     * Update ExpressRoutePort tags.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the ExpressRoutePort resource.
     * @param parameters Parameters supplied to update ExpressRoutePort resource tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, expressRoutePortName: string, parameters: TagsObject, options?: ExpressRoutePortsUpdateTagsOptionalParams): Promise<ExpressRoutePortsUpdateTagsResponse>;
    /**
     * List all the ExpressRoutePort resources in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * List all the ExpressRoutePort resources in the specified subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Generate a letter of authorization for the requested ExpressRoutePort resource.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of ExpressRoutePort.
     * @param request Request parameters supplied to generate a letter of authorization.
     * @param options The options parameters.
     */
    generateLOA(resourceGroupName: string, expressRoutePortName: string, request: GenerateExpressRoutePortsLOARequest, options?: ExpressRoutePortsGenerateLOAOptionalParams): Promise<ExpressRoutePortsGenerateLOAResponse>;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRoutePorts.d.ts.map