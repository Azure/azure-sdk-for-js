import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { OperationEntity, OperationsListOptionalParams } from "../models/index.js";
/** Interface representing a Operations. */
export interface Operations {
    /**
     * Lists all the available REST API operations.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<OperationEntity>;
}
//# sourceMappingURL=operations.d.ts.map