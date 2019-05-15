import {
  BaseRequestPolicy,
  HttpHeaders,
  HttpOperationResponse,
  isNode,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "@azure/ms-rest-js";

import { HeaderConstants } from "../utils/constants";

/**
 * TelemetryPolicy is a policy used to tag user-agent header for every requests.
 *
 * @class TelemetryPolicy
 * @extends {BaseRequestPolicy}
 */
export class TelemetryPolicy extends BaseRequestPolicy {
  /**
   * Telemetry string.
   *
   * @type {string}
   * @memberof TelemetryPolicy
   */
  public readonly telemetry: string;

  /**
   * Creates an instance of TelemetryPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {ITelemetryOptions} [telemetry]
   * @memberof TelemetryPolicy
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, telemetry: string) {
    super(nextPolicy, options);
    this.telemetry = telemetry;
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof TelemetryPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (isNode) {
      if (!request.headers) {
        request.headers = new HttpHeaders();
      }
      if (!request.headers.get(HeaderConstants.USER_AGENT)) {
        request.headers.set(HeaderConstants.USER_AGENT, this.telemetry);
      }
    }

    return this._nextPolicy.sendRequest(request);
  }
}
