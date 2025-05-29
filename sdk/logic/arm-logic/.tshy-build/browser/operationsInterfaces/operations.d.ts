import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operation, OperationsListOptionalParams } from "../models/index.js";
/** Interface representing a Operations. */
export interface Operations {
    /**
     * Lists all of the available Logic REST API operations.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
}
//# sourceMappingURL=operations.d.ts.map