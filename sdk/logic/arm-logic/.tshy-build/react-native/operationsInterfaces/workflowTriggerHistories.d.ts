import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowTriggerHistory, WorkflowTriggerHistoriesListOptionalParams, WorkflowTriggerHistoriesGetOptionalParams, WorkflowTriggerHistoriesGetResponse, WorkflowTriggerHistoriesResubmitOptionalParams } from "../models/index.js";
/** Interface representing a WorkflowTriggerHistories. */
export interface WorkflowTriggerHistories {
    /**
     * Gets a list of workflow trigger histories.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, triggerName: string, options?: WorkflowTriggerHistoriesListOptionalParams): PagedAsyncIterableIterator<WorkflowTriggerHistory>;
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
}
//# sourceMappingURL=workflowTriggerHistories.d.ts.map