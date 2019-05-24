// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

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
