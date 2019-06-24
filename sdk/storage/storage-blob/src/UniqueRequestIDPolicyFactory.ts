// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { UniqueRequestIDPolicy } from "./policies/UniqueRequestIDPolicy";

/**
 * UniqueRequestIDPolicyFactory is a factory class helping generating UniqueRequestIDPolicy objects.
 *
 * @export
 * @class UniqueRequestIDPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class UniqueRequestIDPolicyFactory implements RequestPolicyFactory {
  /**
   * Creates a UniqueRequestIDPolicy object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {UniqueRequestIDPolicy}
   * @memberof UniqueRequestIDPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): UniqueRequestIDPolicy {
    return new UniqueRequestIDPolicy(nextPolicy, options);
  }
}
