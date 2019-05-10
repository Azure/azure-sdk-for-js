import {
  BaseRequestPolicy,
  HttpOperationResponse,
  isNode,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "@azure/ms-rest-js";

import { HeaderConstants, URLConstants } from "../utils/constants";
import { setURLParameter } from "../utils/utils.common";

/**
 * BrowserPolicy will handle differences between Node.js and browser runtime, including:
 *
 * 1. Browsers cache GET/HEAD requests by adding conditional headers such as 'IF_MODIFIED_SINCE'.
 * BrowserPolicy is a policy used to add a timestamp query to GET/HEAD request URL
 * thus avoid the browser cache.
 *
 * 2. Remove cookie header for security
 *
 * 3. Remove content-length header to avoid browsers warning
 *
 * @class BrowserPolicy
 * @extends {BaseRequestPolicy}
 */
export class BrowserPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of BrowserPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @memberof BrowserPolicy
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof BrowserPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (isNode) {
      return this._nextPolicy.sendRequest(request);
    }

    if (request.method.toUpperCase() === "GET" || request.method.toUpperCase() === "HEAD") {
      request.url = setURLParameter(
        request.url,
        URLConstants.Parameters.FORCE_BROWSER_NO_CACHE,
        new Date().getTime().toString()
      );
    }

    request.headers.remove(HeaderConstants.COOKIE);

    // According to XHR standards, content-length should be fully controlled by browsers
    request.headers.remove(HeaderConstants.CONTENT_LENGTH);

    return this._nextPolicy.sendRequest(request);
  }
}
