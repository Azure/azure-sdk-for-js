import { OperationStatuses } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { OperationStatusesGetOptionalParams, OperationStatusesGetResponse } from "../models/index.js";
/** Class containing OperationStatuses operations. */
export declare class OperationStatusesImpl implements OperationStatuses {
    private readonly client;
    /**
     * Initialize a new instance of the class OperationStatuses class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Get the status of a long running azure asynchronous operation.
     * @param location The region name of operation.
     * @param asyncOperationId The operation Id.
     * @param options The options parameters.
     */
    get(location: string, asyncOperationId: string, options?: OperationStatusesGetOptionalParams): Promise<OperationStatusesGetResponse>;
}
//# sourceMappingURL=operationStatuses.d.ts.map