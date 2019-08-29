// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpHeaders } from "../httpHeaders";
import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
import { Constants } from "../util/constants";
import { generateKey } from "../util/crypto";

const HeaderConstants = Constants.HeaderConstants;

export class SasServiceClientCredentials implements ServiceClientCredentials {
  keyName: string;
  keyValue: string;

  /**
   * Creates a new sasServiceClientCredentials object.
   *
   * @constructor
   * @param {string} connectionString Connection string.
   */
  constructor(sharedAccessKeyName: string, sharedAccessKey: string) {
    if (sharedAccessKeyName == null) {
      throw new Error(
        "sharedAccessKeyName cannot be null or undefined and must be of type string."
      );
    }

    if (sharedAccessKey == null) {
      throw new Error("sharedAccessKey cannot be null or undefined and must be of type string.");
    }

    const keyName = sharedAccessKeyName;
    const keyValue = sharedAccessKey;
    this.keyName = keyName;
    this.keyValue = keyValue;
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

    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    const expirationDate = Math.round(date.valueOf() / 1000);
    const signature = await this._generateSignature(targetUri, expirationDate);
    webResource.headers.set(
      HeaderConstants.AUTHORIZATION,
      `SharedAccessSignature sig=${signature}&se=${expirationDate}&skn=${this.keyName}&sr=${targetUri}`
    );
    // TODO: Fix server side configuration on response headers
    webResource.headers.set("origin", "http://localhost");
    return Promise.resolve(webResource);
  }
}
