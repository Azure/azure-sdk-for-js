// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";

/**
 * @ignore
 */
export interface RetryPolicy {
  retryAfterInMilliseconds: number;
  shouldRetry: (
    errorResponse: ErrorResponse,
    retryContext?: RetryContext,
    locationEndpoint?: string
  ) => Promise<boolean | [boolean, string]>;
}
