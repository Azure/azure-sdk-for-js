// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RUConsumed } from "../common";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { OperationOptions, Response } from "../request";

/** @hidden */
export interface ExecutionContext {
  nextItem: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: OperationOptions,
    ruConsumed?: RUConsumed
  ) => Promise<Response<any>>; // TODO: code smell
}
