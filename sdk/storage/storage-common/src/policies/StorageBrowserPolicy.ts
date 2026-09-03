// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
  WebResourceLike as WebResource,
  CompatResponse as HttpOperationResponse,
} from "@azure/core-http-compat";
import { BaseRequestPolicy } from "./RequestPolicy.js";

/**
 * StorageBrowserPolicy will handle differences between Node.js and browser runtime, including:
 *
 * 1. Browsers cache GET/HEAD requests by adding conditional headers such as 'IF_MODIFIED_SINCE'.
 * StorageBrowserPolicy is a policy used to add a timestamp query to GET/HEAD request URL
 * thus avoid the browser cache.
 *
 * 2. Remove cookie header for security
 *
 * 3. Remove content-length header to avoid browsers warning
 *
 * In Node.js, this policy is a no-op pass-through.
 */
export class StorageBrowserPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of StorageBrowserPolicy.
   * @param nextPolicy -
   * @param options -
   */
  // The base class has a protected constructor. Adding a public one to enable constructing of this class.
  /* eslint-disable-next-line @typescript-eslint/no-useless-constructor*/
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param request -
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(request);
  }
}
