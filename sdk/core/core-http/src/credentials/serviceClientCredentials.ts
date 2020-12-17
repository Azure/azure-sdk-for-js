// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebResourceLike } from "../webResource";

export interface ServiceClientCredentials {
  /**
   * Signs a request with the Authentication header.
   *
   * @param webResource - The WebResourceLike/request to be signed.
   * @returns The signed request object;
   */
  signRequest(webResource: WebResourceLike): Promise<WebResourceLike>;
}
