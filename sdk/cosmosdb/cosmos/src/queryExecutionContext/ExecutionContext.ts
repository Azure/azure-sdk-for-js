// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RUConsumed } from "../common";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, Response } from "../request";

/** @hidden */
export interface ExecutionContext {
  nextItem: (
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumed?: RUConsumed
  ) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumed?: RUConsumed
  ) => Promise<Response<any>>; // TODO: code smell
}
