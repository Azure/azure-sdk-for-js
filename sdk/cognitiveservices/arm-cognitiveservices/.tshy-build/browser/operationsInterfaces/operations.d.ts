import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operation, OperationsListOptionalParams } from "../models/index.js";
/** Interface representing a Operations. */
export interface Operations {
    /**
     * Lists all the available Cognitive Services account operations.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
}
//# sourceMappingURL=operations.d.ts.map