import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operation, OperationsListOptionalParams } from "../models/index.js";
/** Interface representing a Operations. */
export interface Operations {
    /**
     * List the operations for the provider
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
}
//# sourceMappingURL=operations.d.ts.map