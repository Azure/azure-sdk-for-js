import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ServiceEndpointPolicyDefinitions } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ServiceEndpointPolicyDefinition, ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams, ServiceEndpointPolicyDefinitionsDeleteOptionalParams, ServiceEndpointPolicyDefinitionsGetOptionalParams, ServiceEndpointPolicyDefinitionsGetResponse, ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams, ServiceEndpointPolicyDefinitionsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing ServiceEndpointPolicyDefinitions operations. */
export declare class ServiceEndpointPolicyDefinitionsImpl implements ServiceEndpointPolicyDefinitions {
    private readonly client;
    /**
     * Initialize a new instance of the class ServiceEndpointPolicyDefinitions class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all service endpoint policy definitions in a service end point policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy name.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, serviceEndpointPolicyName: string, options?: ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<ServiceEndpointPolicyDefinition>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Deletes the specified ServiceEndpoint policy definitions.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the Service Endpoint Policy.
     * @param serviceEndpointPolicyDefinitionName The name of the service endpoint policy definition.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, serviceEndpointPolicyName: string, serviceEndpointPolicyDefinitionName: string, options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified ServiceEndpoint policy definitions.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the Service Endpoint Policy.
     * @param serviceEndpointPolicyDefinitionName The name of the service endpoint policy definition.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, serviceEndpointPolicyName: string, serviceEndpointPolicyDefinitionName: string, options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams): Promise<void>;
    /**
     * Get the specified service endpoint policy definitions from service endpoint policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy name.
     * @param serviceEndpointPolicyDefinitionName The name of the service endpoint policy definition name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, serviceEndpointPolicyName: string, serviceEndpointPolicyDefinitionName: string, options?: ServiceEndpointPolicyDefinitionsGetOptionalParams): Promise<ServiceEndpointPolicyDefinitionsGetResponse>;
    /**
     * Creates or updates a service endpoint policy definition in the specified service endpoint policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param serviceEndpointPolicyDefinitionName The name of the service endpoint policy definition name.
     * @param serviceEndpointPolicyDefinitions Parameters supplied to the create or update service endpoint
     *                                         policy operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, serviceEndpointPolicyName: string, serviceEndpointPolicyDefinitionName: string, serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition, options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ServiceEndpointPolicyDefinitionsCreateOrUpdateResponse>, ServiceEndpointPolicyDefinitionsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a service endpoint policy definition in the specified service endpoint policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy.
     * @param serviceEndpointPolicyDefinitionName The name of the service endpoint policy definition name.
     * @param serviceEndpointPolicyDefinitions Parameters supplied to the create or update service endpoint
     *                                         policy operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, serviceEndpointPolicyName: string, serviceEndpointPolicyDefinitionName: string, serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition, options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams): Promise<ServiceEndpointPolicyDefinitionsCreateOrUpdateResponse>;
    /**
     * Gets all service endpoint policy definitions in a service end point policy.
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy name.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param serviceEndpointPolicyName The name of the service endpoint policy name.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=serviceEndpointPolicyDefinitions.d.ts.map