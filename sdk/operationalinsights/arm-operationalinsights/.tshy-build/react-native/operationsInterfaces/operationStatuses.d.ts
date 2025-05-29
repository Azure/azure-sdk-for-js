import { OperationStatusesGetOptionalParams, OperationStatusesGetResponse } from "../models/index.js";
/** Interface representing a OperationStatuses. */
export interface OperationStatuses {
    /**
     * Get the status of a long running azure asynchronous operation.
     * @param location The region name of operation.
     * @param asyncOperationId The operation Id.
     * @param options The options parameters.
     */
    get(location: string, asyncOperationId: string, options?: OperationStatusesGetOptionalParams): Promise<OperationStatusesGetResponse>;
}
//# sourceMappingURL=operationStatuses.d.ts.map