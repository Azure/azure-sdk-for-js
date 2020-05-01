// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { parseConnectionString, ServiceBusConnectionStringModel } from "../util/utils";
import { AccessToken } from "@azure/core-auth";
import { Buffer } from "buffer";
import isBuffer from "is-buffer";
import jssha from "jssha";

/**
 * @class SharedKeyCredential
 * Defines the SharedKeyCredential .
 */
export class SharedKeyCredential {
  /**
   * @property {string} keyName - The name of the EventHub/ServiceBus key.
   */
  keyName: string;

  /**
   * @property {string} key - The secret value associated with the above EventHub/ServiceBus key.
   */
  key: string;

  /**
   * Initializes a new instance of SharedKeyCredential
   * @constructor
   * @param {string} keyName - The name of the EventHub/ServiceBus key.
   * @param {string} key - The secret value associated with the above EventHub/ServiceBus key
   */
  constructor(keyName: string, key: string) {
    this.keyName = keyName;
    this.key = key;
  }

  /**
   * Gets the sas token for the specified audience
   * @param {string} [audience] - The audience for which the token is desired.
   */
  getToken(audience: string): AccessToken {
    return this._createToken(Math.floor(Date.now() / 1000) + 3600, audience);
  }

  /**
   * Creates the sas token based on the provided information
   * @param {string | number} expiry - The time period in unix time after which the token will expire.
   * @param {string} [audience] - The audience for which the token is desired.
   * @param {string | Buffer} [hashInput] The input to be provided to hmac to create the hash.
   */
  protected _createToken(
    expiry: number,
    audience: string,
    hashInput?: string | Buffer
  ): AccessToken {
    audience = encodeURIComponent(audience);
    const keyName = encodeURIComponent(this.keyName);
    const stringToSign = audience + "\n" + expiry;
    hashInput = hashInput || this.key;
    let shaObj: any;
    if (isBuffer(hashInput)) {
      shaObj = new jssha("SHA-256", "ARRAYBUFFER");
      shaObj.setHMACKey(hashInput, "ARRAYBUFFER");
      shaObj.update(Buffer.from(stringToSign));
    } else {
      shaObj = new jssha("SHA-256", "TEXT");
      shaObj.setHMACKey(hashInput, "TEXT");
      shaObj.update(stringToSign);
    }
    const sig = encodeURIComponent(shaObj.getHMAC("B64"));
    return {
      token: `SharedAccessSignature sr=${audience}&sig=${sig}&se=${expiry}&skn=${keyName}`,
      expiresOnTimestamp: expiry
    };
  }

  /**
   * Creates a token provider from the EventHub/ServiceBus connection string;
   * @param {string} connectionString - The EventHub/ServiceBus connection string
   */
  static fromConnectionString(connectionString: string): SharedKeyCredential {
    const parsed = parseConnectionString<ServiceBusConnectionStringModel>(connectionString);
    return new SharedKeyCredential(parsed.SharedAccessKeyName, parsed.SharedAccessKey);
  }
}
