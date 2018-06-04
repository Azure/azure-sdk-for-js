/**
 * Represents the Retry policy assocated with throttled requests in the Azure Cosmos DB database service.
 * @property {int} [MaxRetryAttemptCount] - Max number of retries to be performed for a request. Default value 9.
 * @property {int} [FixedRetryIntervalInMilliseconds] - Fixed retry interval in milliseconds to wait \
 *                        between each retry ignoring the retryAfter returned as part of the response.
 * @property {int} [MaxWaitTimeInSeconds] - Max wait time in seconds to wait for a request while \
 *                        the retries are happening. Default value 30 seconds.
 */
export class RetryOptions {
    constructor(
        public readonly MaxRetryAttemptCount: number = 9,
        public readonly FixedRetryIntervalInMilliseconds: number = 0,
        public readonly MaxWaitTimeInSeconds: number = 30,
    ) { }
}
