// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";

import { DfsPolicy } from "./policies/DfsPolicy";


/**
 * DfsPolicyFactory is a factory class helping generating DfsPolicy objects.
 *
 * @export
 * @class DfsPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class DfsPolicyFactory implements RequestPolicyFactory {
  /**
   * Creates a DfsPolicyFactory object.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @returns {DfsPolicy}
   * @memberof DfsPolicyFactory
   */
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): DfsPolicy {
    return new DfsPolicy(nextPolicy, options);
  }
}
