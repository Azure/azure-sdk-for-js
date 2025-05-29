import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowTriggerHistories } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowTriggerHistory, WorkflowTriggerHistoriesListOptionalParams, WorkflowTriggerHistoriesGetOptionalParams, WorkflowTriggerHistoriesGetResponse, WorkflowTriggerHistoriesResubmitOptionalParams } from "../models/index.js";
/** Class containing WorkflowTriggerHistories operations. */
export declare class WorkflowTriggerHistoriesImpl implements WorkflowTriggerHistories {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowTriggerHistories class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of workflow trigger histories.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, triggerName: string, options?: WorkflowTriggerHistoriesListOptionalParams): PagedAsyncIterableIterator<WorkflowTriggerHistory>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of workflow trigger histories.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a workflow trigger history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param historyName The workflow trigger history name. Corresponds to the run name for triggers that
     *                    resulted in a run.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, triggerName: string, historyName: string, options?: WorkflowTriggerHistoriesGetOptionalParams): Promise<WorkflowTriggerHistoriesGetResponse>;
    /**
     * Resubmits a workflow run based on the trigger history.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param historyName The workflow trigger history name. Corresponds to the run name for triggers that
     *                    resulted in a run.
     * @param options The options parameters.
     */
    resubmit(resourceGroupName: string, workflowName: string, triggerName: string, historyName: string, options?: WorkflowTriggerHistoriesResubmitOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workflowTriggerHistories.d.ts.map