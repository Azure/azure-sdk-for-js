import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SecurityAdminConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SecurityAdminConfiguration, SecurityAdminConfigurationsListOptionalParams, SecurityAdminConfigurationsGetOptionalParams, SecurityAdminConfigurationsGetResponse, SecurityAdminConfigurationsCreateOrUpdateOptionalParams, SecurityAdminConfigurationsCreateOrUpdateResponse, SecurityAdminConfigurationsDeleteOptionalParams } from "../models/index.js";
/** Class containing SecurityAdminConfigurations operations. */
export declare class SecurityAdminConfigurationsImpl implements SecurityAdminConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class SecurityAdminConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the network manager security admin configurations in a network manager, in a paginated
     * format.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, options?: SecurityAdminConfigurationsListOptionalParams): PagedAsyncIterableIterator<SecurityAdminConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all the network manager security admin configurations in a network manager, in a paginated
     * format.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves a network manager security admin configuration.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: SecurityAdminConfigurationsGetOptionalParams): Promise<SecurityAdminConfigurationsGetResponse>;
    /**
     * Creates or updates a network manager security admin configuration.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param securityAdminConfiguration The security admin configuration to create or update
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, securityAdminConfiguration: SecurityAdminConfiguration, options?: SecurityAdminConfigurationsCreateOrUpdateOptionalParams): Promise<SecurityAdminConfigurationsCreateOrUpdateResponse>;
    /**
     * Deletes a network manager security admin configuration.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: SecurityAdminConfigurationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a network manager security admin configuration.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: SecurityAdminConfigurationsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=securityAdminConfigurations.d.ts.map