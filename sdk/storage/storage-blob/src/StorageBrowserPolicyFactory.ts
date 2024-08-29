// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
  RequestPolicyFactory,
} from "@azure/core-http-compat";
import { StorageBrowserPolicy } from "./policies/StorageBrowserPolicy";
export { StorageBrowserPolicy };

/**
 * StorageBrowserPolicyFactory is a factory class helping generating StorageBrowserPolicy objects.
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
