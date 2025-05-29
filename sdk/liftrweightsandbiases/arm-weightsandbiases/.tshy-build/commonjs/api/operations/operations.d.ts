import { WeightsAndBiasesContext as Client } from "../index.js";
import { _OperationListResult, Operation } from "../../models/models.js";
import { OperationsListOptionalParams } from "./options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
export declare function _listSend(context: Client, options?: OperationsListOptionalParams): StreamableMethod;
export declare function _listDeserialize(result: PathUncheckedResponse): Promise<_OperationListResult>;
/** List the operations for the provider */
export declare function list(context: Client, options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
//# sourceMappingURL=operations.d.ts.map