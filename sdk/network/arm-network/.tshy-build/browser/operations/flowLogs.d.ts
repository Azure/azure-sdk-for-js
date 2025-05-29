import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { FlowLogs } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { FlowLog, FlowLogsListOptionalParams, FlowLogsCreateOrUpdateOptionalParams, FlowLogsCreateOrUpdateResponse, TagsObject, FlowLogsUpdateTagsOptionalParams, FlowLogsUpdateTagsResponse, FlowLogsGetOptionalParams, FlowLogsGetResponse, FlowLogsDeleteOptionalParams } from "../models/index.js";
/** Class containing FlowLogs operations. */
export declare class FlowLogsImpl implements FlowLogs {
    private readonly client;
    /**
     * Initialize a new instance of the class FlowLogs class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all flow log resources for the specified Network Watcher.
     * @param resourceGroupName The name of the resource group containing Network Watcher.
     * @param networkWatcherName The name of the Network Watcher resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkWatcherName: string, options?: FlowLogsListOptionalParams): PagedAsyncIterableIterator<FlowLog>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Create or update a flow log for the specified network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkWatcherName The name of the network watcher.
     * @param flowLogName The name of the flow log.
     * @param parameters Parameters that define the create or update flow log resource.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkWatcherName: string, flowLogName: string, parameters: FlowLog, options?: FlowLogsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<FlowLogsCreateOrUpdateResponse>, FlowLogsCreateOrUpdateResponse>>;
    /**
     * Create or update a flow log for the specified network security group.
     * @param resourceGroupName The name of the resource group.
     * @param networkWatcherName The name of the network watcher.
     * @param flowLogName The name of the flow log.
     * @param parameters Parameters that define the create or update flow log resource.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkWatcherName: string, flowLogName: string, parameters: FlowLog, options?: FlowLogsCreateOrUpdateOptionalParams): Promise<FlowLogsCreateOrUpdateResponse>;
    /**
     * Update tags of the specified flow log.
     * @param resourceGroupName The name of the resource group.
     * @param networkWatcherName The name of the network watcher.
     * @param flowLogName The name of the flow log.
     * @param parameters Parameters supplied to update flow log tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, networkWatcherName: string, flowLogName: string, parameters: TagsObject, options?: FlowLogsUpdateTagsOptionalParams): Promise<FlowLogsUpdateTagsResponse>;
    /**
     * Gets a flow log resource by name.
     * @param resourceGroupName The name of the resource group.
     * @param networkWatcherName The name of the network watcher.
     * @param flowLogName The name of the flow log resource.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkWatcherName: string, flowLogName: string, options?: FlowLogsGetOptionalParams): Promise<FlowLogsGetResponse>;
    /**
     * Deletes the specified flow log resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkWatcherName The name of the network watcher.
     * @param flowLogName The name of the flow log resource.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkWatcherName: string, flowLogName: string, options?: FlowLogsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified flow log resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkWatcherName The name of the network watcher.
     * @param flowLogName The name of the flow log resource.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkWatcherName: string, flowLogName: string, options?: FlowLogsDeleteOptionalParams): Promise<void>;
    /**
     * Lists all flow log resources for the specified Network Watcher.
     * @param resourceGroupName The name of the resource group containing Network Watcher.
     * @param networkWatcherName The name of the Network Watcher resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group containing Network Watcher.
     * @param networkWatcherName The name of the Network Watcher resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=flowLogs.d.ts.map