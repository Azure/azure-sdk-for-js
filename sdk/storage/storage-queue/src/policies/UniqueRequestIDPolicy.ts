import {
  BaseRequestPolicy,
  generateUuid,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "@azure/ms-rest-js";

import { HeaderConstants } from "../utils/constants";

/**
 * UniqueRequestIDPolicy generates an UUID as x-ms-request-id header value.
 *
 * @class UniqueRequestIDPolicy
 * @extends {BaseRequestPolicy}
 */
export class UniqueRequestIDPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of UniqueRequestIDPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @memberof UniqueRequestIDPolicy
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  /**
   * Sends request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof UniqueRequestIDPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (!request.headers.contains(HeaderConstants.X_MS_CLIENT_REQUEST_ID)) {
      request.headers.set(HeaderConstants.X_MS_CLIENT_REQUEST_ID, generateUuid());
    }

    return this._nextPolicy.sendRequest(request);
  }
}
