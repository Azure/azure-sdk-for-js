// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { Response } from "../request";

/** @hidden */
export interface ExecutionContext {
  nextItem: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>; // TODO: code smell
}
