import { Operation, _OperationListResult } from "../../models/models.js";
import { CodeSigningContext as Client } from "../index.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { OperationsListOptionalParams } from "../../models/options.js";
export declare function _listSend(context: Client, options?: OperationsListOptionalParams): StreamableMethod;
export declare function _listDeserialize(result: PathUncheckedResponse): Promise<_OperationListResult>;
/** List the operations for the provider */
export declare function list(context: Client, options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
//# sourceMappingURL=index.d.ts.map