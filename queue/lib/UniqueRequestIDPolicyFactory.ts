import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "ms-rest-js";

import { UniqueRequestIDPolicy } from "./policies/UniqueRequestIDPolicy";

/**
 * UniqueRequestIDPolicyFactory is a factory class helping generating UniqueRequestIDPolicy objects.
 *
 * @export
 * @class UniqueRequestIDPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class UniqueRequestIDPolicyFactory implements RequestPolicyFactory {
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): UniqueRequestIDPolicy {
    return new UniqueRequestIDPolicy(nextPolicy, options);
  }
}
