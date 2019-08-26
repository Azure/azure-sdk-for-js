import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/ms-rest-js";

import { RetryPolicy, RetryPolicyType } from "./policies/RetryPolicy";

export { RetryPolicyType } from "./policies/RetryPolicy";

/**
 * Retry options interface.
 *
 * @export
 * @interface IRetryOptions
 */
export interface IRetryOptions {
  /**
   * Optional. RetryPolicyType, default is exponential retry policy.
   *
   * @type {RetryPolicyType}
   * @memberof RetryOptions
   */
  readonly retryPolicyType?: RetryPolicyType;

  /**
   * Optional. Max try number of attempts, default is 4.
   * A value of 1 means 1 try and no retries.
   * A value smaller than 1 means default retry number of attempts.
   *
   * @type {number}
   * @memberof IRetryOptions
   */
  readonly maxTries?: number;

  /**
   * Optional. Indicates the maximum time in ms allowed for any single try of an HTTP request.
   * A value of zero or undefined means no default timeout on SDK client, Azure
   * Storage server's default timeout policy will be used.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-blob-service-operations
   *
   * @type {number}
   * @memberof IRetryOptions
   */
  readonly tryTimeoutInMs?: number;

  /**
   * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
   * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
   * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
   *
   * @type {number}
   * @memberof IRetryOptions
   */
  readonly retryDelayInMs?: number;

  /**
   * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
   * If you specify 0, then you must also specify 0 for retryDelayInMs.
   *
   * @type {number}
   * @memberof IRetryOptions
   */
  readonly maxRetryDelayInMs?: number;

  /**
   * If a secondaryHost is specified, retries will be tried against this host. If secondaryHost is undefined
   * (the default) then operations are not retried against another host.
   *
   * NOTE: Before setting this field, make sure you understand the issues around
   * reading stale and potentially-inconsistent data at
   * {@link https://docs.microsoft.com/en-us/azure/storage/common/storage-designing-ha-apps-with-ragrs}
   *
   * @type {string}
   * @memberof IRetryOptions
   */
  readonly secondaryHost?: string;
}

/**
 * RetryPolicyFactory is a factory class helping generating RetryPolicy objects.
 *
 * @export
 * @class RetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class RetryPolicyFactory implements RequestPolicyFactory {
  private retryOptions?: IRetryOptions;

  /**
   * Creates an instance of RetryPolicyFactory.
   * @param {IRetryOptions} [retryOptions]
   * @memberof RetryPolicyFactory
   */
  constructor(retryOptions?: IRetryOptions) {
    this.retryOptions = retryOptions;
  }

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): RetryPolicy {
    return new RetryPolicy(nextPolicy, options, this.retryOptions);
  }
}
