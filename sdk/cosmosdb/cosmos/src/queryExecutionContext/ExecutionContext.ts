// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { Response } from "../request";

/** @hidden */
export interface ExecutionContext {
  nextItem?: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
}
