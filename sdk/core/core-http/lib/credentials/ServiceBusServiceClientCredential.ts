/* super(
      serviceBusSettings._wrapPassword,
      serviceBusSettings._wrapName,
      serviceBusSettings._sharedAccessKeyName,
      serviceBusSettings._sharedAccessKey,
      serviceBusSettings._serviceBusEndpointUri,
      serviceBusSettings._wrapEndpointUri,
      authenticationProvider
    );

*/

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpHeaders } from "../httpHeaders";
import { Constants } from "../util/constants";
import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
import crypto from "crypto";
import util from "util";

import azureCommon from "azure-common";

var date = azureCommon.date;
var azureutil = azureCommon.util;

var HmacSha256Sign = azureCommon.HmacSha256Sign;

const HeaderConstants = Constants.HeaderConstants;

export class ServiceBusServiceClientCredential implements ServiceClientCredentials {
  connectionString: string;

  keyName: string;
  keyValue: string;

  signer: any;
  /**
   * Creates a new BasicAuthenticationCredentials object.
   *
   * @constructor
   * @param {string} connectionString Connection string.
   */
  constructor(connectionString: string) {
    if (
      connectionString === null ||
      connectionString === undefined ||
      typeof connectionString.valueOf() !== "string"
    ) {
      throw new Error("connectionString cannot be null or undefined and must be of type string.");
    }
    this.connectionString = connectionString;

    // SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=Jw0ekInJiwyO/SnZ4NoZdgYizYVciY9d7HvUdxe8E0U=
    const keyName = "RootManageSharedAccessKey";
    const keyValue = "Jw0ekInJiwyO/SnZ4NoZdgYizYVciY9d7HvUdxe8E0U=";
    this.keyName = keyName;
    this.keyValue = keyValue;

    this.signer = new HmacSha256Sign(keyValue);
  }

  private _generateSignature(targetUri: any, expirationDate: any): any {
    const getvalueToAppend = function(value: any, noNewLine?: any): any {
      var returnValue = "";
      if (!azureutil.objectIsNull(value)) {
        returnValue = value;
      }

      if (noNewLine !== true) {
        returnValue += "\n";
      }

      return returnValue;
    };

    var stringToSign = getvalueToAppend(targetUri) + getvalueToAppend(expirationDate, true);

    return encodeURIComponent(
      crypto
        .createHmac("sha256", this.keyValue)
        .update(stringToSign)
        .digest("base64")
    );
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
    var expirationDate = Math.round(date.minutesFromNow(5) / 1000); //
    var signature = this._generateSignature(targetUri, expirationDate);
    webResource.headers.set(
      HeaderConstants.AUTHORIZATION,
      util.format(
        "SharedAccessSignature sig=%s&se=%s&skn=%s&sr=%s",
        signature,
        expirationDate,
        this.keyName,
        targetUri
      )
    );

    return Promise.resolve(webResource);

    // set SASkey and value in the header.. after encoding.. using HMAC and stuff..
  }
}
