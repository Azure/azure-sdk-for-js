// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { StorageBrowserPolicy } from "./policies/StorageBrowserPolicy";
export { StorageBrowserPolicy };

/**
 * StorageBrowserPolicyFactory is a factory class helping generating StorageBrowserPolicy objects.
 *
 * @export
 * @class StorageBrowserPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class StorageBrowserPolicyFactory implements RequestPolicyFactory {
  /**
   * Creates a StorageBrowserPolicyFactory object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {StorageBrowserPolicy}
   * @memberof StorageBrowserPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageBrowserPolicy {
    return new StorageBrowserPolicy(nextPolicy, options);
  }
}
