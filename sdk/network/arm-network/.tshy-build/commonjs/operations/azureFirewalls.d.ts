import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AzureFirewalls } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { AzureFirewall, AzureFirewallsListOptionalParams, AzureFirewallsListAllOptionalParams, AzureFirewallsDeleteOptionalParams, AzureFirewallsGetOptionalParams, AzureFirewallsGetResponse, AzureFirewallsCreateOrUpdateOptionalParams, AzureFirewallsCreateOrUpdateResponse, TagsObject, AzureFirewallsUpdateTagsOptionalParams, AzureFirewallsUpdateTagsResponse, AzureFirewallsListLearnedPrefixesOptionalParams, AzureFirewallsListLearnedPrefixesResponse, FirewallPacketCaptureParameters, AzureFirewallsPacketCaptureOptionalParams, AzureFirewallsPacketCaptureResponse } from "../models/index.js";
/** Class containing AzureFirewalls operations. */
export declare class AzureFirewallsImpl implements AzureFirewalls {
    private readonly client;
    /**
     * Initialize a new instance of the class AzureFirewalls class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all Azure Firewalls in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: AzureFirewallsListOptionalParams): PagedAsyncIterableIterator<AzureFirewall>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the Azure Firewalls in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: AzureFirewallsListAllOptionalParams): PagedAsyncIterableIterator<AzureFirewall>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Deletes the specified Azure Firewall.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, azureFirewallName: string, options?: AzureFirewallsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified Azure Firewall.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, azureFirewallName: string, options?: AzureFirewallsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified Azure Firewall.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, azureFirewallName: string, options?: AzureFirewallsGetOptionalParams): Promise<AzureFirewallsGetResponse>;
    /**
     * Creates or updates the specified Azure Firewall.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param parameters Parameters supplied to the create or update Azure Firewall operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, azureFirewallName: string, parameters: AzureFirewall, options?: AzureFirewallsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<AzureFirewallsCreateOrUpdateResponse>, AzureFirewallsCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified Azure Firewall.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param parameters Parameters supplied to the create or update Azure Firewall operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, azureFirewallName: string, parameters: AzureFirewall, options?: AzureFirewallsCreateOrUpdateOptionalParams): Promise<AzureFirewallsCreateOrUpdateResponse>;
    /**
     * Updates tags of an Azure Firewall resource.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param parameters Parameters supplied to update azure firewall tags.
     * @param options The options parameters.
     */
    beginUpdateTags(resourceGroupName: string, azureFirewallName: string, parameters: TagsObject, options?: AzureFirewallsUpdateTagsOptionalParams): Promise<SimplePollerLike<OperationState<AzureFirewallsUpdateTagsResponse>, AzureFirewallsUpdateTagsResponse>>;
    /**
     * Updates tags of an Azure Firewall resource.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param parameters Parameters supplied to update azure firewall tags.
     * @param options The options parameters.
     */
    beginUpdateTagsAndWait(resourceGroupName: string, azureFirewallName: string, parameters: TagsObject, options?: AzureFirewallsUpdateTagsOptionalParams): Promise<AzureFirewallsUpdateTagsResponse>;
    /**
     * Lists all Azure Firewalls in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all the Azure Firewalls in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the azure firewall.
     * @param options The options parameters.
     */
    beginListLearnedPrefixes(resourceGroupName: string, azureFirewallName: string, options?: AzureFirewallsListLearnedPrefixesOptionalParams): Promise<SimplePollerLike<OperationState<AzureFirewallsListLearnedPrefixesResponse>, AzureFirewallsListLearnedPrefixesResponse>>;
    /**
     * Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the azure firewall.
     * @param options The options parameters.
     */
    beginListLearnedPrefixesAndWait(resourceGroupName: string, azureFirewallName: string, options?: AzureFirewallsListLearnedPrefixesOptionalParams): Promise<AzureFirewallsListLearnedPrefixesResponse>;
    /**
     * Runs a packet capture on AzureFirewall.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param parameters Parameters supplied to run packet capture on azure firewall.
     * @param options The options parameters.
     */
    beginPacketCapture(resourceGroupName: string, azureFirewallName: string, parameters: FirewallPacketCaptureParameters, options?: AzureFirewallsPacketCaptureOptionalParams): Promise<SimplePollerLike<OperationState<AzureFirewallsPacketCaptureResponse>, AzureFirewallsPacketCaptureResponse>>;
    /**
     * Runs a packet capture on AzureFirewall.
     * @param resourceGroupName The name of the resource group.
     * @param azureFirewallName The name of the Azure Firewall.
     * @param parameters Parameters supplied to run packet capture on azure firewall.
     * @param options The options parameters.
     */
    beginPacketCaptureAndWait(resourceGroupName: string, azureFirewallName: string, parameters: FirewallPacketCaptureParameters, options?: AzureFirewallsPacketCaptureOptionalParams): Promise<AzureFirewallsPacketCaptureResponse>;
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
//# sourceMappingURL=azureFirewalls.d.ts.map