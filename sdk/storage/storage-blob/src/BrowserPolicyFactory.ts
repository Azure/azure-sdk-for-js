// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { BrowserPolicy as StorageBlobBrowserPolicy } from "./policies/BrowserPolicy";
export { StorageBlobBrowserPolicy };

/**
 * StorageblobBrowserPolicyFactory is a factory class helping generating StorageBlobBrowserPolicy objects.
 *
 * @export
 * @class StorageBlobBrowserPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class StorageBlobBrowserPolicyFactory implements RequestPolicyFactory {
  /**
   * Creates a StorageBlobBrowserPolicyFactory object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {StorageBlobBrowserPolicy}
   * @memberof StorageBlobBrowserPolicyFactory
   */
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): StorageBlobBrowserPolicy {
    return new StorageBlobBrowserPolicy(nextPolicy, options);
  }
}
