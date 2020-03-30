// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpHeaders, WebResource, ServiceClientCredentials } from "@azure/core-http";
import { generateKey } from "./crypto";

/**
 * @internal
 * @ignore
 * @class SasServiceClientCredentials
 * @implements {ServiceClientCredentials}
 */
export class SasServiceClientCredentials implements ServiceClientCredentials {
  keyName: string;
  keyValue: string;

  /**
   * Creates a new sasServiceClientCredentials object.
   *
   * @constructor
   * @param {string} sharedAccessKeyName The SAS key name to use.
   * @param {string} sharedAccessKey The SAS key value to use
   */
  constructor(sharedAccessKeyName: string, sharedAccessKey: string) {
    this.keyName = sharedAccessKeyName;
    this.keyValue = sharedAccessKey;
  }

  private async _generateSignature(targetUri: string, expirationDate: number): Promise<string> {
    const stringToSign = `${targetUri}\n${expirationDate}`;
    const result = await generateKey(this.keyValue, stringToSign);
    return result;
  }

  /**
   * Signs a request with the Authentication header.
   *
   * @param {WebResource} webResource The WebResource to be signed.
   * @returns {Promise<WebResource>} The signed request object.
   */
  async signRequest(webResource: WebResource): Promise<WebResource> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();

    const targetUri = encodeURIComponent(webResource.url.toLowerCase()).toLowerCase();

    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    const expirationDate = Math.round(date.getTime() / 1000);
    const signature = await this._generateSignature(targetUri, expirationDate);
    webResource.headers.set(
      "authorization",
      `SharedAccessSignature sig=${signature}&se=${expirationDate}&skn=${this.keyName}&sr=${targetUri}`
    );
    webResource.withCredentials = true;
    return webResource;
  }
}
