// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { StorageBrowserPolicy } from "./policies/StorageBrowserPolicy";
export { StorageBrowserPolicy };

/**
 * StorageBrowserPolicyFactory is a factory class helping generating BrowserPolicy objects.
 */
export class StorageBrowserPolicyFactory implements RequestPolicyFactory {
  /**
   * Creates a StorageBrowserPolicyFactory object.
   *
   * @param nextPolicy -
   * @param options -
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageBrowserPolicy {
    return new StorageBrowserPolicy(nextPolicy, options);
  }
}
