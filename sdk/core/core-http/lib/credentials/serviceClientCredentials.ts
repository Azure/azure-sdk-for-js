// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebResource } from "../webResource";

export interface ServiceClientCredentials {
  /**
   * Signs a request with the Authentication header.
   *
   * @param {WebResource} webResource The WebResource/request to be signed.
   * @returns {Promise<WebResource>} The signed request object;
   */
  signRequest(webResource: WebResource): Promise<WebResource>;
}
