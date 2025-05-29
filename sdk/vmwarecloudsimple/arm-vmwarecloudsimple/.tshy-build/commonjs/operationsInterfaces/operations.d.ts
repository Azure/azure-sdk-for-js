import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AvailableOperation, OperationsListOptionalParams, OperationsGetOptionalParams, OperationsGetResponse } from "../models/index.js";
/** Interface representing a Operations. */
export interface Operations {
    /**
     * Return list of operations
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<AvailableOperation>;
    /**
     * Return an async operation
     * @param regionId The region Id (westus, eastus)
     * @param referer referer url
     * @param operationId operation id
     * @param options The options parameters.
     */
    get(regionId: string, referer: string, operationId: string, options?: OperationsGetOptionalParams): Promise<OperationsGetResponse>;
}
//# sourceMappingURL=operations.d.ts.map