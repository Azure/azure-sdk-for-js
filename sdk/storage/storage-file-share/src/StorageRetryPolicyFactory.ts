// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import {
  StorageRetryPolicy,
  StorageRetryPolicyType
} from "./policies/StorageRetryPolicy";

export { StorageRetryPolicyType, StorageRetryPolicy };

/**
 * Retry options interface.
 *
 * @export
 * @interface StorageRetryOptions
 */
export interface StorageRetryOptions {
  /**
   * Optional. StorageRetryPolicyType, default is exponential retry policy.
   *
   * @type {StorageRetryPolicyType}
   * @memberof StorageRetryOptions
   */
  readonly retryPolicyType?: StorageRetryPolicyType;

  /**
   * Optional. Max try number of attempts, default is 4.
   * A value of 1 means 1 try and no retries.
   * A value smaller than 1 means default retry number of attempts.
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly maxTries?: number;

  /**
   * Optional. Indicates the maximum time in ms allowed for any single try of an HTTP request.
   * A value of zero or undefined means that you accept our default timeout, 60s or 60 * 1000ms.
   *
   * NOTE: When transferring large amounts of data, the default TryTimeout will probably
   * not be sufficient. You should override this value based on the bandwidth available to
   * the host machine and proximity to the Storage service. A good starting point may be something
   * like (60 seconds per MB of anticipated-payload-size)
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly tryTimeoutInMs?: number;

  /**
   * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
   * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
   * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly retryDelayInMs?: number;

  /**
   * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
   * If you specify 0, then you must also specify 0 for retryDelayInMs.
   *
   * @type {number}
   * @memberof StorageRetryOptions
   */
  readonly maxRetryDelayInMs?: number;
}

/**
 * StorageRetryPolicyFactory is a factory class helping generating StorageRetryPolicy objects.
 *
 * @export
 * @class StorageRetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class StorageRetryPolicyFactory implements RequestPolicyFactory {
  private retryOptions?: StorageRetryOptions;

  /**
   * Creates an instance of StorageRetryPolicyFactory.
   * @param {StorageRetryOptions} [retryOptions]
   * @memberof StorageRetryPolicyFactory
   */
  constructor(retryOptions?: StorageRetryOptions) {
    this.retryOptions = retryOptions;
  }

  /**
   * Creates a StorageRetryPolicy object.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {StorageRetryPolicy}
   * @memberof StorageRetryPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy {
    return new StorageRetryPolicy(nextPolicy, options, this.retryOptions);
  }
}
