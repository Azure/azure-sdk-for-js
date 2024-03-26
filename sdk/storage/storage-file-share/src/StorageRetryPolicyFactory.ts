// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
  RequestPolicyFactory,
} from "@azure/core-http-compat";
import { StorageRetryPolicy, StorageRetryPolicyType } from "../../storage-blob/src/policies/StorageRetryPolicy";

export { StorageRetryPolicyType, StorageRetryPolicy };

/**
 * Storage Blob retry options interface.
 */
export interface StorageRetryOptions {
  /**
   * Optional. StorageRetryPolicyType, default is exponential retry policy.
   */
  readonly retryPolicyType?: StorageRetryPolicyType;

  /**
   * Optional. Max try number of attempts, default is 4.
   * A value of 1 means 1 try and no retries.
   * A value smaller than 1 means default retry number of attempts.
   */
  readonly maxTries?: number;

  /**
   * Optional. Indicates the maximum time in ms allowed for any single try of an HTTP request.
   * A value of zero or undefined means no default timeout on SDK client, Azure
   * Storage server's default timeout policy will be used.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-blob-service-operations
   */
  readonly tryTimeoutInMs?: number;

  /**
   * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
   * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
   * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
   */
  readonly retryDelayInMs?: number;

  /**
   * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
   * If you specify 0, then you must also specify 0 for retryDelayInMs.
   */
  readonly maxRetryDelayInMs?: number;
}

/**
 * StorageRetryPolicyFactory is a factory class helping generating {@link StorageRetryPolicy} objects.
 */
export class StorageRetryPolicyFactory implements RequestPolicyFactory {
  private retryOptions?: StorageRetryOptions;

  /**
   * Creates an instance of StorageRetryPolicyFactory.
   * @param retryOptions -
   */
  constructor(retryOptions?: StorageRetryOptions) {
    this.retryOptions = retryOptions;
  }

  /**
   * Creates a StorageRetryPolicy object.
   *
   * @param nextPolicy -
   * @param options -
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy {
    return new StorageRetryPolicy(nextPolicy, options, this.retryOptions);
  }
}
