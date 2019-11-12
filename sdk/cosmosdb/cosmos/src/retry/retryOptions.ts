// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Represents the Retry policy assocated with throttled requests in the Azure Cosmos DB database service.
 */
export interface RetryOptions {
  /** Max number of retries to be performed for a request. Default value 9. */
  maxRetryAttemptCount: number;
  /** Fixed retry interval in milliseconds to wait between each retry ignoring the retryAfter returned as part of the response. */
  fixedRetryIntervalInMilliseconds: number;
  /** Max wait time in seconds to wait for a request while the retries are happening. Default value 30 seconds. */
  maxWaitTimeInSeconds: number;
}
