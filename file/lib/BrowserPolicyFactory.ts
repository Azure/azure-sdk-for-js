import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "ms-rest-js";

import { BrowserPolicy } from "./policies/BrowserPolicy";

/**
 * BrowserPolicyFactory is a factory class helping generating BrowserPolicy objects.
 *
 * @export
 * @class BrowserPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class BrowserPolicyFactory implements RequestPolicyFactory {
  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): BrowserPolicy {
    return new BrowserPolicy(nextPolicy, options);
  }
}
