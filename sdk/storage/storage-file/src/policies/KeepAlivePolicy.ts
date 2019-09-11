import {
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "@azure/core-http";

import { KeepAliveOptions } from "../KeepAlivePolicyFactory";

/**
 * KeepAlivePolicy is a policy used to control keep alive settings for every request.
 *
 * @class KeepAlivePolicy
 * @extends {BaseRequestPolicy}
 */
export class KeepAlivePolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of KeepAlivePolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {KeepAliveOptions} [keepAliveOptions]
   * @memberof KeepAlivePolicy
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private readonly keepAliveOptions: KeepAliveOptions
  ) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof KeepAlivePolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.keepAlive = this.keepAliveOptions.enable;
    return this._nextPolicy.sendRequest(request);
  }
}
