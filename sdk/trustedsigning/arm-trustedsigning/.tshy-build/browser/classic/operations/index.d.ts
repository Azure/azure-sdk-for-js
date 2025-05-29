import { CodeSigningContext } from "../../api/codeSigningContext.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { OperationsListOptionalParams } from "../../models/options.js";
/** Interface representing a Operations operations. */
export interface OperationsOperations {
    /** List the operations for the provider */
    list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}
export declare function getOperations(context: CodeSigningContext): {
    list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation, Operation[], import("../../static-helpers/pagingHelpers.js").PageSettings>;
};
export declare function getOperationsOperations(context: CodeSigningContext): OperationsOperations;
//# sourceMappingURL=index.d.ts.map