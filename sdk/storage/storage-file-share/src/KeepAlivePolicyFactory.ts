import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";

import { KeepAlivePolicy } from "./policies/KeepAlivePolicy";

/**
 * Interface of KeepAlivePolicy options.
 *
 * @export
 * @interface KeepAliveOptions
 */
export interface KeepAliveOptions {
  enable: boolean;
}

/**
 * KeepAlivePolicyFactory is a factory class helping generating KeepAlivePolicy objects.
 *
 * @export
 * @class KeepAlivePolicyFactory
 * @implements {RequestPolicyFactory}
 */
export class KeepAlivePolicyFactory implements RequestPolicyFactory {
  /**
   * Creates an instance of KeepAlivePolicyFactory.
   *
   * @param {KeepAliveOptions} [telemetry]
   * @memberof KeepAlivePolicyFactory
   */
  constructor(private readonly keepAliveOptions: KeepAliveOptions = { enable: true }) {}

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): KeepAlivePolicy {
    return new KeepAlivePolicy(nextPolicy, options, this.keepAliveOptions);
  }
}
