import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WorkflowTriggers } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { WorkflowTrigger, WorkflowTriggersListOptionalParams, WorkflowTriggersGetOptionalParams, WorkflowTriggersGetResponse, WorkflowTriggersResetOptionalParams, WorkflowTriggersRunOptionalParams, WorkflowTriggersGetSchemaJsonOptionalParams, WorkflowTriggersGetSchemaJsonResponse, SetTriggerStateActionDefinition, WorkflowTriggersSetStateOptionalParams, WorkflowTriggersListCallbackUrlOptionalParams, WorkflowTriggersListCallbackUrlResponse } from "../models/index.js";
/** Class containing WorkflowTriggers operations. */
export declare class WorkflowTriggersImpl implements WorkflowTriggers {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkflowTriggers class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of workflow triggers.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workflowName: string, options?: WorkflowTriggersListOptionalParams): PagedAsyncIterableIterator<WorkflowTrigger>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of workflow triggers.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a workflow trigger.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workflowName: string, triggerName: string, options?: WorkflowTriggersGetOptionalParams): Promise<WorkflowTriggersGetResponse>;
    /**
     * Resets a workflow trigger.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    reset(resourceGroupName: string, workflowName: string, triggerName: string, options?: WorkflowTriggersResetOptionalParams): Promise<void>;
    /**
     * Runs a workflow trigger.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    run(resourceGroupName: string, workflowName: string, triggerName: string, options?: WorkflowTriggersRunOptionalParams): Promise<void>;
    /**
     * Get the trigger schema as JSON.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    getSchemaJson(resourceGroupName: string, workflowName: string, triggerName: string, options?: WorkflowTriggersGetSchemaJsonOptionalParams): Promise<WorkflowTriggersGetSchemaJsonResponse>;
    /**
     * Sets the state of a workflow trigger.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param setState The workflow trigger state.
     * @param options The options parameters.
     */
    setState(resourceGroupName: string, workflowName: string, triggerName: string, setState: SetTriggerStateActionDefinition, options?: WorkflowTriggersSetStateOptionalParams): Promise<void>;
    /**
     * Get the callback URL for a workflow trigger.
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param triggerName The workflow trigger name.
     * @param options The options parameters.
     */
    listCallbackUrl(resourceGroupName: string, workflowName: string, triggerName: string, options?: WorkflowTriggersListCallbackUrlOptionalParams): Promise<WorkflowTriggersListCallbackUrlResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param workflowName The workflow name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workflowTriggers.d.ts.map