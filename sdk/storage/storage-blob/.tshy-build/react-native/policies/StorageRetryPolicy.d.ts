import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions, RequestPolicyFactory, WebResourceLike as WebResource, CompatResponse as HttpOperationResponse } from "@azure/core-http-compat";
import { BaseRequestPolicy } from "./RequestPolicy.js";
import type { RestError } from "@azure/core-rest-pipeline";
import { type StorageRetryOptions } from "../StorageRetryPolicyFactory.js";
/**
 * A factory method used to generated a RetryPolicy factory.
 *
 * @param retryOptions -
 */
export declare function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
/**
 * Retry policy with exponential retry and linear retry implemented.
 */
export declare class StorageRetryPolicy extends BaseRequestPolicy {
    /**
     * RetryOptions.
     */
    private readonly retryOptions;
    /**
     * Creates an instance of RetryPolicy.
     *
     * @param nextPolicy -
     * @param options -
     * @param retryOptions -
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, retryOptions?: StorageRetryOptions);
    /**
     * Sends request.
     *
     * @param request -
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
    /**
     * Decide and perform next retry. Won't mutate request parameter.
     *
     * @param request -
     * @param secondaryHas404 -  If attempt was against the secondary & it returned a StatusNotFound (404), then
     *                                   the resource was not found. This may be due to replication delay. So, in this
     *                                   case, we'll never try the secondary again for this operation.
     * @param attempt -           How many retries has been attempted to performed, starting from 1, which includes
     *                                   the attempt will be performed by this method call.
     */
    protected attemptSendRequest(request: WebResource, secondaryHas404: boolean, attempt: number): Promise<HttpOperationResponse>;
    /**
     * Decide whether to retry according to last HTTP response and retry counters.
     *
     * @param isPrimaryRetry -
     * @param attempt -
     * @param response -
     * @param err -
     */
    protected shouldRetry(isPrimaryRetry: boolean, attempt: number, response?: HttpOperationResponse, err?: RestError): boolean;
    /**
     * Delay a calculated time between retries.
     *
     * @param isPrimaryRetry -
     * @param attempt -
     * @param abortSignal -
     */
    private delay;
}
//# sourceMappingURL=StorageRetryPolicy.d.ts.map