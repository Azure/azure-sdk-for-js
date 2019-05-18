/**
 * Represents the Retry policy assocated with throttled requests in the Azure Cosmos DB database service.
 */
export class RetryOptions {
  constructor(
    /** Max number of retries to be performed for a request. Default value 9. */
    public readonly MaxRetryAttemptCount: number = 9,
    /** Fixed retry interval in milliseconds to wait between each retry ignoring the retryAfter returned as part of the response. */
    public readonly FixedRetryIntervalInMilliseconds: number = 0,
    /** Max wait time in seconds to wait for a request while the retries are happening. Default value 30 seconds. */
    public readonly MaxWaitTimeInSeconds: number = 30
  ) {}
}
