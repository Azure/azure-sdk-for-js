// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
  WebResource,
  WebResourceLike
} from "@azure/core-http";

/**
 * Creates an HTTP pipeline policy to set extra headers.
 *
 * @param headers - to be set
 */
export const createSetHeadersPolicy = (headers: {
  [propertyName: string]: any;
}): RequestPolicyFactory => {
  return {
    create: (nextpolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new SetHeadersPolicy(headers, nextpolicy, options);
    }
  };
};

/**
 * Set headers policy
 */
class SetHeadersPolicy extends BaseRequestPolicy {
  /**
   * Initializes a new instance of the SetHeadersPolicy class
   * @param headers - The headers by key value pairs to be set
   */
  constructor(
    private readonly headers: { [propertyName: string]: any },
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike
  ) {
    super(nextPolicy, options);
  }

  /**
   * Set extra headers to requests.
   *
   * @param webResource - The WebResource to be modified.
   */
  private async setHeaders(webResource: WebResource): Promise<WebResource> {
    for (const key in this.headers) {
      webResource.headers.set(key, this.headers[key]);
    }
    return webResource;
  }

  /**
   * Modify the request and calls the next policy in the factory.
   */
  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    return this._nextPolicy.sendRequest(await this.setHeaders(webResource));
  }
}
