// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpHeaders } from "../httpHeaders";
import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
import { Constants } from "../util/constants";
import { objectIsNull, isNode } from "../util/utils";
import crypto from "crypto";

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
    if (
      sharedAccessKeyName === null ||
      sharedAccessKeyName === undefined ||
      typeof sharedAccessKeyName.valueOf() !== "string"
    ) {
      throw new Error(
        "sharedAccessKeyName cannot be null or undefined and must be of type string."
      );
    }

    if (
      sharedAccessKey === null ||
      sharedAccessKey === undefined ||
      typeof sharedAccessKey.valueOf() !== "string"
    ) {
      throw new Error("sharedAccessKey cannot be null or undefined and must be of type string.");
    }

    const keyName = sharedAccessKeyName;
    const keyValue = sharedAccessKey;
    this.keyName = keyName;
    this.keyValue = keyValue;
  }

  private _generateSignature(targetUri: any, expirationDate: any): any {
    const getvalueToAppend = function(value: any, noNewLine?: any): any {
      var returnValue = "";
      if (!objectIsNull(value)) {
        returnValue = value;
      }

      if (noNewLine !== true) {
        returnValue += "\n";
      }

      return returnValue;
    };

    var stringToSign = getvalueToAppend(targetUri) + getvalueToAppend(expirationDate, true);

    if (isNode) {
      // HmacSha256Sign
      const result = encodeURIComponent(
        crypto
          .createHmac("sha256", this.keyValue)
          .update(stringToSign)
          .digest("base64")
      );
      return result;
    } else {
      // @ts-ignore
      var hash = CryptoJS.HmacSHA256(stringToSign, this.keyValue);
      // @ts-ignore
      const result = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
      return result;
    }
  }

  /**
   * Signs a request with the Authentication header.
   *
   * @param {WebResource} webResource The WebResource to be signed.
   * @returns {Promise<WebResource>} The signed request object.
   */
  signRequest(webResource: WebResource): any {
    if (!webResource.headers) webResource.headers = new HttpHeaders();

    var targetUri = encodeURIComponent(webResource.url.toLowerCase()).toLowerCase();

    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    var expirationDate = Math.round(date.valueOf() / 1000);
    var signature = this._generateSignature(targetUri, expirationDate);
    webResource.headers.set(
      HeaderConstants.AUTHORIZATION,
      `SharedAccessSignature sig=${signature}&se=${expirationDate}&skn=${this.keyName}&sr=${targetUri}`
    );
    // TODO: Fix server side configuration on response headers
    webResource.headers.set("access-control-allow-origin", "*");
    return Promise.resolve(webResource);
  }
}
