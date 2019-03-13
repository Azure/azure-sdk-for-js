import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";

export interface RetryPolicy {
  retryAfterInMilliseconds: number;
  shouldRetry: (
    errorResponse: ErrorResponse,
    retryContext?: RetryContext,
    locationEndpoint?: string
  ) => Promise<boolean | [boolean, string]>;
}
