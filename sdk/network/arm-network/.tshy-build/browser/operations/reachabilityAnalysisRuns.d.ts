import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ReachabilityAnalysisRuns } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ReachabilityAnalysisRun, ReachabilityAnalysisRunsListOptionalParams, ReachabilityAnalysisRunsGetOptionalParams, ReachabilityAnalysisRunsGetResponse, ReachabilityAnalysisRunsCreateOptionalParams, ReachabilityAnalysisRunsCreateResponse, ReachabilityAnalysisRunsDeleteOptionalParams, ReachabilityAnalysisRunsDeleteResponse } from "../models/index.js";
/** Class containing ReachabilityAnalysisRuns operations. */
export declare class ReachabilityAnalysisRunsImpl implements ReachabilityAnalysisRuns {
    private readonly client;
    /**
     * Initialize a new instance of the class ReachabilityAnalysisRuns class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets list of Reachability Analysis Runs.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, workspaceName: string, options?: ReachabilityAnalysisRunsListOptionalParams): PagedAsyncIterableIterator<ReachabilityAnalysisRun>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets list of Reachability Analysis Runs.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets Reachability Analysis Run.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param reachabilityAnalysisRunName Reachability Analysis Run name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, workspaceName: string, reachabilityAnalysisRunName: string, options?: ReachabilityAnalysisRunsGetOptionalParams): Promise<ReachabilityAnalysisRunsGetResponse>;
    /**
     * Creates Reachability Analysis Runs.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param reachabilityAnalysisRunName Reachability Analysis Run name.
     * @param body Analysis Run resource object to create/update.
     * @param options The options parameters.
     */
    create(resourceGroupName: string, networkManagerName: string, workspaceName: string, reachabilityAnalysisRunName: string, body: ReachabilityAnalysisRun, options?: ReachabilityAnalysisRunsCreateOptionalParams): Promise<ReachabilityAnalysisRunsCreateResponse>;
    /**
     * Deletes Reachability Analysis Run.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param reachabilityAnalysisRunName Reachability Analysis Run name.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, workspaceName: string, reachabilityAnalysisRunName: string, options?: ReachabilityAnalysisRunsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<ReachabilityAnalysisRunsDeleteResponse>, ReachabilityAnalysisRunsDeleteResponse>>;
    /**
     * Deletes Reachability Analysis Run.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param reachabilityAnalysisRunName Reachability Analysis Run name.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, workspaceName: string, reachabilityAnalysisRunName: string, options?: ReachabilityAnalysisRunsDeleteOptionalParams): Promise<ReachabilityAnalysisRunsDeleteResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=reachabilityAnalysisRuns.d.ts.map