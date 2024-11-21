// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebResourceLike } from "../webResource";

/**
 * Represents an object or class with a `signRequest` method which will sign outgoing requests (for example, by setting the `Authorization` header).
 */
export interface ServiceClientCredentials {
  /**
   * Signs a request with the Authentication header.
   *
   * @param webResource - The WebResourceLike/request to be signed.
   * @returns The signed request object;
   */
  signRequest(webResource: WebResourceLike): Promise<WebResourceLike>;
}
