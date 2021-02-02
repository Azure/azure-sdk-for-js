// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken } from "@azure/core-auth";
import { SharedKeyCredential } from "../servicebusSharedKeyCredential";
import { HttpHeaders, ServiceClientCredentials, WebResource } from "@azure/core-http";
import { generateKey } from "./crypto";

/**
 * @internal
 */
export class SasServiceClientCredentials implements ServiceClientCredentials {
  keyName: string;
  keyValue: string;
  private sharedKeyCredential: SharedKeyCredential;
  /**
   * Creates a new sasServiceClientCredentials object.
   *
   * @constructor
   * @param sharedAccessKeyName - The SAS key name to use.
   * @param sharedAccessKey - The SAS key value to use
   */
  constructor(sharedAccessKeyName: string, sharedAccessKey: string) {
    this.keyName = sharedAccessKeyName;
    this.keyValue = sharedAccessKey;
    this.sharedKeyCredential = new SharedKeyCredential(this.keyName, this.keyValue);
  }

  private async _generateSignature(targetUri: string, expirationDate: number): Promise<string> {
    const stringToSign = `${targetUri}\n${expirationDate}`;
    const result = await generateKey(this.keyValue, stringToSign);
    return result;
  }

  /**
   * Signs a request with the Authentication header.
   *
   * @param webResource - The WebResource to be signed.
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

  getToken(audience: string): AccessToken {
    return this.sharedKeyCredential.getToken(audience);
  }
}
