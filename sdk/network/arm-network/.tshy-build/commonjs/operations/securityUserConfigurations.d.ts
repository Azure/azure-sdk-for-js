import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SecurityUserConfigurations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SecurityUserConfiguration, SecurityUserConfigurationsListOptionalParams, SecurityUserConfigurationsGetOptionalParams, SecurityUserConfigurationsGetResponse, SecurityUserConfigurationsCreateOrUpdateOptionalParams, SecurityUserConfigurationsCreateOrUpdateResponse, SecurityUserConfigurationsDeleteOptionalParams } from "../models/index.js";
/** Class containing SecurityUserConfigurations operations. */
export declare class SecurityUserConfigurationsImpl implements SecurityUserConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class SecurityUserConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the network manager security user configurations in a network manager, in a paginated
     * format.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, options?: SecurityUserConfigurationsListOptionalParams): PagedAsyncIterableIterator<SecurityUserConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists all the network manager security user configurations in a network manager, in a paginated
     * format.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves a network manager security user configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: SecurityUserConfigurationsGetOptionalParams): Promise<SecurityUserConfigurationsGetResponse>;
    /**
     * Creates or updates a network manager security user configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param securityUserConfiguration The security user configuration to create or update
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, configurationName: string, securityUserConfiguration: SecurityUserConfiguration, options?: SecurityUserConfigurationsCreateOrUpdateOptionalParams): Promise<SecurityUserConfigurationsCreateOrUpdateResponse>;
    /**
     * Deletes a network manager security user configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: SecurityUserConfigurationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a network manager security user configuration.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param configurationName The name of the network manager Security Configuration.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, configurationName: string, options?: SecurityUserConfigurationsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param networkManagerName The name of the network manager.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=securityUserConfigurations.d.ts.map