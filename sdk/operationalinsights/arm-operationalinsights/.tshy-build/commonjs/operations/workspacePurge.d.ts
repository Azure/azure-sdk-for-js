import { WorkspacePurge } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { WorkspacePurgeBody, WorkspacePurgePurgeOptionalParams, WorkspacePurgePurgeResponse, WorkspacePurgeGetPurgeStatusOptionalParams, WorkspacePurgeGetPurgeStatusResponse } from "../models/index.js";
/** Class containing WorkspacePurge operations. */
export declare class WorkspacePurgeImpl implements WorkspacePurge {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkspacePurge class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Purges data in an Log Analytics workspace by a set of user-defined filters.
     *
     * In order to manage system resources, purge requests are throttled at 50 requests per hour. You
     * should batch the execution of purge requests by sending a single command whose predicate includes
     * all user identities that require purging. Use the in operator to specify multiple identities. You
     * should run the query prior to using for a purge request to verify that the results are expected.
     * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics
     * product team reserves the right to reject requests for purge operations that are not for the purpose
     * of GDPR compliance. In the event of a dispute, please create a support ticket
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param body Describes the body of a request to purge data in a single table of an Log Analytics
     *             Workspace
     * @param options The options parameters.
     */
    purge(resourceGroupName: string, workspaceName: string, body: WorkspacePurgeBody, options?: WorkspacePurgePurgeOptionalParams): Promise<WorkspacePurgePurgeResponse>;
    /**
     * Gets status of an ongoing purge operation.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param purgeId In a purge status request, this is the Id of the operation the status of which is
     *                returned.
     * @param options The options parameters.
     */
    getPurgeStatus(resourceGroupName: string, workspaceName: string, purgeId: string, options?: WorkspacePurgeGetPurgeStatusOptionalParams): Promise<WorkspacePurgeGetPurgeStatusResponse>;
}
//# sourceMappingURL=workspacePurge.d.ts.map