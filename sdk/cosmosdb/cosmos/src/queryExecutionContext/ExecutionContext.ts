// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, Response } from "../request";
import { RUConsumedManager } from "../common";
export interface ExecutionContextOptions {
  diagnosticNode: DiagnosticNodeInternal;
  operationOptions?: QueryOperationOptions;
  ruConsumed?: RUConsumedManager;
}
/** @hidden */
export interface ExecutionContext {
  nextItem: (options: ExecutionContextOptions) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (options: ExecutionContextOptions) => Promise<Response<any>>; // TODO: code smell
}
