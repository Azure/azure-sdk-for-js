// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { StorageRetryPolicy, StorageRetryPolicyType } from "./policies/StorageRetryPolicy";

export { StorageRetryPolicyType, StorageRetryPolicy };

/**
 * Storage Blob retry options interface.
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
   * A value of zero or undefined means no default timeout on SDK client, Azure
   * Storage server's default timeout policy will be used.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-blob-service-operations
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

  /**
   * If a secondaryHost is specified, retries will be tried against this host. If secondaryHost is undefined
   * (the default) then operations are not retried against another host.
   *
   * NOTE: Before setting this field, make sure you understand the issues around
   * reading stale and potentially-inconsistent data at
   * {@link https://docs.microsoft.com/en-us/azure/storage/common/storage-designing-ha-apps-with-ragrs}
   *
   * @type {string}
   * @memberof StorageRetryOptions
   */
  readonly secondaryHost?: string;
}

/**
 * StorageRetryPolicyFactory is a factory class helping generating {@link StorageRetryPolicy} objects.
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
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {StorageRetryPolicy}
   * @memberof StorageRetryPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy {
    return new StorageRetryPolicy(nextPolicy, options, this.retryOptions);
  }
}
