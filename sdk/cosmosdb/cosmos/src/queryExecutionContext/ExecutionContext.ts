// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, Response } from "../request";
import { RUConsumedManager } from "../common";
import { CosmosHeaders } from "./headerUtils";
export interface ExecutionContextOptions {
  diagnosticNode: DiagnosticNodeInternal;
  operationOptions?: QueryOperationOptions;
  ruConsumed?: RUConsumedManager;
}
export interface ExecutionContextHybridOptions extends ExecutionContextOptions {
  nextItemRespHeaders?: CosmosHeaders;
}
/** @hidden */
export interface ExecutionContext {
  nextItem: (
    options: ExecutionContextOptions,
  ) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (options: ExecutionContextOptions) => Promise<Response<any>>; // TODO: code smell
}
