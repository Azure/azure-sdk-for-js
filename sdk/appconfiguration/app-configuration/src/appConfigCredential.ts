// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClientCredentials, WebResource, URLBuilder } from "@azure/core-http";
import { sha256Digest, sha256Hmac } from "./internal/cryptoHelpers";

/**
 * @internal
 * @ignore
 */
export class AppConfigCredential implements ServiceClientCredentials {
  private credential: string;
  private secret: string;

  constructor(credential: string, secret: string) {
    this.credential = credential;
    this.secret = secret;
  }

  /**
   * Signs a request with the values provided in the credential and secret parameter.
   *
   * @param {WebResource} webResource The WebResource to be signed.
   * @returns {Promise<WebResource>} The signed request object.
   */
  async signRequest(webResource: WebResource): Promise<WebResource> {
    const verb = webResource.method.toUpperCase();
    const utcNow = new Date().toUTCString();

    const contentHash = await sha256Digest(webResource.body || "");

    const signedHeaders = "x-ms-date;host;x-ms-content-sha256";

    const url = URLBuilder.parse(webResource.url);
    const query = url.getQuery();
    const urlPathAndQuery = `${url.getPath()}${query ? "?" + query : ""}`;

    const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${url.getHost()};${contentHash}`;

    const signature = await sha256Hmac(this.secret, stringToSign);

    webResource.headers.set("x-ms-date", utcNow);
    webResource.headers.set("x-ms-content-sha256", contentHash);
    webResource.headers.set(
      "Authorization",
      `HMAC-SHA256 Credential=${this.credential}, SignedHeaders=${signedHeaders}, Signature=${signature}`
    );

    return webResource;
  }
}
