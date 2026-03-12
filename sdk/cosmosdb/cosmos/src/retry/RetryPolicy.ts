// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { ErrorResponse, RequestContext } from "../request/index.js";
import type { RetryContext } from "./RetryContext.js";

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
    requestContext?: RequestContext,
  ) => Promise<boolean | [boolean, string]>;
}
