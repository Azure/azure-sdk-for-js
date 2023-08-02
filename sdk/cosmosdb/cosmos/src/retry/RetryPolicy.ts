// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DiagnosticNodeInternal } from "../CosmosDiagnostics";
import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";

/**
 * @hidden
 */
export interface RetryPolicy {
  retryAfterInMs: number;
  shouldRetry: (
    errorResponse: ErrorResponse,
    diagnosticNode: DiagnosticNodeInternal,
    retryContext?: RetryContext,
    locationEndpoint?: string
  ) => Promise<boolean | [boolean, string]>;
}
