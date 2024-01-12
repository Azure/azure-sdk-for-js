// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, Response } from "../request";
import { RUConsumedManager } from "../common";

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
