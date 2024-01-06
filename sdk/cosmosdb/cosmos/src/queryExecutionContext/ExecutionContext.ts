// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, RUConsumedManager, Response } from "../request";

/** @hidden */
export interface ExecutionContext {
  nextItem: (
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumed?: RUConsumedManager
  ) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumed?: RUConsumedManager
  ) => Promise<Response<any>>; // TODO: code smell
}
