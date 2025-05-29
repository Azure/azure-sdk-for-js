import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationServiceEnvironments } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { IntegrationServiceEnvironment, IntegrationServiceEnvironmentsListBySubscriptionOptionalParams, IntegrationServiceEnvironmentsListByResourceGroupOptionalParams, IntegrationServiceEnvironmentsGetOptionalParams, IntegrationServiceEnvironmentsGetResponse, IntegrationServiceEnvironmentsCreateOrUpdateOptionalParams, IntegrationServiceEnvironmentsCreateOrUpdateResponse, IntegrationServiceEnvironmentsUpdateOptionalParams, IntegrationServiceEnvironmentsUpdateResponse, IntegrationServiceEnvironmentsDeleteOptionalParams, IntegrationServiceEnvironmentsRestartOptionalParams } from "../models/index.js";
/** Class containing IntegrationServiceEnvironments operations. */
export declare class IntegrationServiceEnvironmentsImpl implements IntegrationServiceEnvironments {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationServiceEnvironments class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of integration service environments by subscription.
     * @param options The options parameters.
     */
    listBySubscription(options?: IntegrationServiceEnvironmentsListBySubscriptionOptionalParams): PagedAsyncIterableIterator<IntegrationServiceEnvironment>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Gets a list of integration service environments by resource group.
     * @param resourceGroup The resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroup: string, options?: IntegrationServiceEnvironmentsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<IntegrationServiceEnvironment>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets a list of integration service environments by subscription.
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * Gets a list of integration service environments by resource group.
     * @param resourceGroup The resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets an integration service environment.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    get(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentsGetOptionalParams): Promise<IntegrationServiceEnvironmentsGetResponse>;
    /**
     * Creates or updates an integration service environment.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param integrationServiceEnvironment The integration service environment.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroup: string, integrationServiceEnvironmentName: string, integrationServiceEnvironment: IntegrationServiceEnvironment, options?: IntegrationServiceEnvironmentsCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<IntegrationServiceEnvironmentsCreateOrUpdateResponse>, IntegrationServiceEnvironmentsCreateOrUpdateResponse>>;
    /**
     * Creates or updates an integration service environment.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param integrationServiceEnvironment The integration service environment.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroup: string, integrationServiceEnvironmentName: string, integrationServiceEnvironment: IntegrationServiceEnvironment, options?: IntegrationServiceEnvironmentsCreateOrUpdateOptionalParams): Promise<IntegrationServiceEnvironmentsCreateOrUpdateResponse>;
    /**
     * Updates an integration service environment.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param integrationServiceEnvironment The integration service environment.
     * @param options The options parameters.
     */
    beginUpdate(resourceGroup: string, integrationServiceEnvironmentName: string, integrationServiceEnvironment: IntegrationServiceEnvironment, options?: IntegrationServiceEnvironmentsUpdateOptionalParams): Promise<PollerLike<PollOperationState<IntegrationServiceEnvironmentsUpdateResponse>, IntegrationServiceEnvironmentsUpdateResponse>>;
    /**
     * Updates an integration service environment.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param integrationServiceEnvironment The integration service environment.
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroup: string, integrationServiceEnvironmentName: string, integrationServiceEnvironment: IntegrationServiceEnvironment, options?: IntegrationServiceEnvironmentsUpdateOptionalParams): Promise<IntegrationServiceEnvironmentsUpdateResponse>;
    /**
     * Deletes an integration service environment.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    delete(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentsDeleteOptionalParams): Promise<void>;
    /**
     * Restarts an integration service environment.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    restart(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentsRestartOptionalParams): Promise<void>;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroup The resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=integrationServiceEnvironments.d.ts.map