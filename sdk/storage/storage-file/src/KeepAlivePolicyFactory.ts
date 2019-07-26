import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/ms-rest-js";

import { KeepAlivePolicy } from "./policies/KeepAlivePolicy";

/**
 * Interface of KeepAlivePolicy options.
 *
 * @export
 * @interface IKeepAliveOptions
 */
export interface IKeepAliveOptions {
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
   * @param {IKeepAliveOptions} [telemetry]
   * @memberof KeepAlivePolicyFactory
   */
  constructor(private readonly keepAliveOptions: IKeepAliveOptions = { enable: true }) {}

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): KeepAlivePolicy {
    return new KeepAlivePolicy(nextPolicy, options, this.keepAliveOptions);
  }
}
