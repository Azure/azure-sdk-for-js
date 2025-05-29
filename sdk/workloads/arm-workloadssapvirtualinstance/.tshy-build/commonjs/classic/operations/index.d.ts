import { WorkloadsContext } from "../../api/workloadsContext.js";
import { Operation } from "../../models/models.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
/** Interface representing a Operations operations. */
export interface OperationsOperations {
    /** List the operations for the provider */
    list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}
export declare function _getOperationsOperations(context: WorkloadsContext): OperationsOperations;
//# sourceMappingURL=index.d.ts.map