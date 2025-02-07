// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { ErrorResponse } from "../request";
import type { RetryContext } from "./RetryContext";

/**
 * @hidden
 */
export interface RetryPolicy {
  retryAfterInMs: number;
  shouldRetry: (
    errorResponse: ErrorResponse,
    diagnosticNode: DiagnosticNodeInternal,
    retryContext?: RetryContext,
    locationEndpoint?: string,
  ) => Promise<boolean | [boolean, string]>;
}
