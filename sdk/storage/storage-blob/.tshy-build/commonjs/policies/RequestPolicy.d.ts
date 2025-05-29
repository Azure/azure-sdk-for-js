import type { HttpPipelineLogLevel, RequestPolicy, RequestPolicyOptionsLike, WebResourceLike, CompatResponse as HttpOperationResponse } from "@azure/core-http-compat";
/**
 * The base class from which all request policies derive.
 */
export declare abstract class BaseRequestPolicy implements RequestPolicy {
    /**
     * The next policy in the pipeline. Each policy is responsible for executing the next one if the request is to continue through the pipeline.
     */
    readonly _nextPolicy: RequestPolicy;
    /**
     * The options that can be passed to a given request policy.
     */
    readonly _options: RequestPolicyOptionsLike;
    /**
     * The main method to implement that manipulates a request/response.
     */
    protected constructor(
    /**
     * The next policy in the pipeline. Each policy is responsible for executing the next one if the request is to continue through the pipeline.
     */
    _nextPolicy: RequestPolicy, 
    /**
     * The options that can be passed to a given request policy.
     */
    _options: RequestPolicyOptionsLike);
    /**
     * Sends a network request based on the given web resource.
     * @param webResource - A {@link WebResourceLike} that describes a HTTP request to be made.
     */
    abstract sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse>;
    /**
     * Get whether or not a log with the provided log level should be logged.
     * @param logLevel - The log level of the log that will be logged.
     * @returns Whether or not a log with the provided log level should be logged.
     */
    shouldLog(logLevel: HttpPipelineLogLevel): boolean;
    /**
     * Attempt to log the provided message to the provided logger. If no logger was provided or if
     * the log level does not meat the logger's threshold, then nothing will be logged.
     * @param logLevel - The log level of this log.
     * @param message - The message of this log.
     */
    log(logLevel: HttpPipelineLogLevel, message: string): void;
}
//# sourceMappingURL=RequestPolicy.d.ts.map