// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { StorageBrowserPolicy } from "./policies/StorageBrowserPolicy";
export { StorageBrowserPolicy };

/**
 * StorageBrowserPolicyFactory is a factory class helping generating {@link StorageBrowserPolicy} objects.
 *
 * @export
 * @class StorageBrowserPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class StorageBrowserPolicyFactory implements RequestPolicyFactory {
  /**
   * Creates a StorageBrowserPolicyFactory object.
   *
   * @param nextPolicy -
   * @param options -
   *
   * @memberof StorageBrowserPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageBrowserPolicy {
    return new StorageBrowserPolicy(nextPolicy, options);
  }
}
