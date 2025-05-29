import type { TriggerRunOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { TriggerRunRerunTriggerInstanceOptionalParams, TriggerRunCancelTriggerInstanceOptionalParams, RunFilterParameters, TriggerRunQueryTriggerRunsByWorkspaceOptionalParams, TriggerRunQueryTriggerRunsByWorkspaceResponse } from "../models/index.js";
/** Class containing TriggerRunOperations operations. */
export declare class TriggerRunOperationsImpl implements TriggerRunOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class TriggerRunOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Rerun single trigger instance by runId.
     * @param triggerName - The trigger name.
     * @param runId - The pipeline run identifier.
     * @param options - The options parameters.
     */
    rerunTriggerInstance(triggerName: string, runId: string, options?: TriggerRunRerunTriggerInstanceOptionalParams): Promise<void>;
    /**
     * Cancel single trigger instance by runId.
     * @param triggerName - The trigger name.
     * @param runId - The pipeline run identifier.
     * @param options - The options parameters.
     */
    cancelTriggerInstance(triggerName: string, runId: string, options?: TriggerRunCancelTriggerInstanceOptionalParams): Promise<void>;
    /**
     * Query trigger runs.
     * @param filterParameters - Parameters to filter the pipeline run.
     * @param options - The options parameters.
     */
    queryTriggerRunsByWorkspace(filterParameters: RunFilterParameters, options?: TriggerRunQueryTriggerRunsByWorkspaceOptionalParams): Promise<TriggerRunQueryTriggerRunsByWorkspaceResponse>;
}
//# sourceMappingURL=triggerRunOperations.d.ts.map