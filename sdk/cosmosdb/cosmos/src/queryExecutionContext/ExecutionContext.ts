// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, Response } from "../request";
import { RUConsumedManager } from "../common";
import { CosmosHeaders } from "./headerUtils";
export interface ExecutionContextNextItemOptions {
  diagnosticNode: DiagnosticNodeInternal;
  operationOptions?: QueryOperationOptions;
  ruConsumed?: RUConsumedManager;
}
export interface ExecutionContextFetchMoreOptions extends ExecutionContextNextItemOptions {
  nextItemRespHeaders?: CosmosHeaders;
}
/** @hidden */
export interface ExecutionContext {
  nextItem: (
    options: ExecutionContextNextItemOptions,
  ) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (options: ExecutionContextFetchMoreOptions) => Promise<Response<any>>; // TODO: code smell
}
