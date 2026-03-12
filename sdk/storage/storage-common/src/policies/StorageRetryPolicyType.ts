// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * RetryPolicy types.
 */
export enum StorageRetryPolicyType {
  /**
   * Exponential retry. Retry time delay grows exponentially.
   */
  EXPONENTIAL,
  /**
   * Linear retry. Retry time delay grows linearly.
   */
  FIXED,
}
