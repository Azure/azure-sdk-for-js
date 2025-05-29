import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountBatchConfigurations } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { BatchConfiguration, IntegrationAccountBatchConfigurationsListOptionalParams, IntegrationAccountBatchConfigurationsGetOptionalParams, IntegrationAccountBatchConfigurationsGetResponse, IntegrationAccountBatchConfigurationsCreateOrUpdateOptionalParams, IntegrationAccountBatchConfigurationsCreateOrUpdateResponse, IntegrationAccountBatchConfigurationsDeleteOptionalParams } from "../models/index.js";
/** Class containing IntegrationAccountBatchConfigurations operations. */
export declare class IntegrationAccountBatchConfigurationsImpl implements IntegrationAccountBatchConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationAccountBatchConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * List the batch configurations for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, integrationAccountName: string, options?: IntegrationAccountBatchConfigurationsListOptionalParams): PagedAsyncIterableIterator<BatchConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List the batch configurations for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get a batch configuration for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param batchConfigurationName The batch configuration name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, integrationAccountName: string, batchConfigurationName: string, options?: IntegrationAccountBatchConfigurationsGetOptionalParams): Promise<IntegrationAccountBatchConfigurationsGetResponse>;
    /**
     * Create or update a batch configuration for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param batchConfigurationName The batch configuration name.
     * @param batchConfiguration The batch configuration.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, integrationAccountName: string, batchConfigurationName: string, batchConfiguration: BatchConfiguration, options?: IntegrationAccountBatchConfigurationsCreateOrUpdateOptionalParams): Promise<IntegrationAccountBatchConfigurationsCreateOrUpdateResponse>;
    /**
     * Delete a batch configuration for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param batchConfigurationName The batch configuration name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, integrationAccountName: string, batchConfigurationName: string, options?: IntegrationAccountBatchConfigurationsDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=integrationAccountBatchConfigurations.d.ts.map