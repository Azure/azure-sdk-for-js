// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { parseConnectionString, ServiceBusConnectionStringModel } from "../util/utils";
import { TokenInfo, TokenProvider, TokenType } from "./token";
const isBuffer = require("is-buffer");
const jssha = require("jssha");

/**
 * @class SasTokenProvider
 * Defines the SasTokenProvider.
 */
export class SasTokenProvider implements TokenProvider {
  /**
   * @property {string} namespace - The namespace of the EventHub/ServiceBus instance.
   */
  namespace: string;

  /**
   * @property {string} keyName - The name of the EventHub/ServiceBus key.
   */
  keyName: string;

  /**
   * @property {string} key - The secret value associated with the above EventHub/ServiceBus key.
   */
  key: string;
  /**
   * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it
   * is good to renew the token. Default = 900 seconds (15 minutes).
   */
  tokenRenewalMarginInSeconds: number;
  /**
   * @property {number} tokenValidTimeInSeconds - The number of seconds for which the token
   * is valid. Default = 3600 seconds (1 hour).
   */
  tokenValidTimeInSeconds: number;

  /**
   * Initializes a new isntance of SasTokenProvider
   * @constructor
   * @param {string} namespace - The namespace of the EventHub/ServiceBus instance.
   * @param {string} keyName - The name of the EventHub/ServiceBus key.
   * @param {string} key - The secret value associated with the above EventHub/ServiceBus key
   */
  constructor(namespace: string, keyName: string, key: string, tokenValidTimeInSeconds?: number, tokenRenewalMarginInSeconds?: number) {
    this.namespace = namespace;
    this.keyName = keyName;
    this.key = key;
    this.tokenValidTimeInSeconds = tokenValidTimeInSeconds || 3600;
    this.tokenRenewalMarginInSeconds = tokenRenewalMarginInSeconds || 900;
    if (this.tokenValidTimeInSeconds <= this.tokenRenewalMarginInSeconds) {
      throw new Error('tokenRenewalMarginInSeconds must be less than tokenValidTimeInSeconds');
    }
  }

  /**
   * Gets the sas token for the specified audience
   * @param {string} [audience] - The audience for which the token is desired. If not
   * provided then the Endpoint from the connection string will be applied.
   */
  async getToken(audience?: string): Promise<TokenInfo> {
    return this._createToken(Math.floor(Date.now() / 1000) + this.tokenValidTimeInSeconds, audience);
  }

  /**
   * @protected
   * Creates the sas token based on the provided information
   * @param {string | number} expiry - The time period in unix time after which the token will expire.
   * @param {string} [audience] - The audience for which the token is desired. If not
   * provided then the Endpoint from the connection string will be applied.
   * @param {string | Buffer} [hashInput] The input to be provided to hmac to create the hash.
   */
  protected _createToken(expiry: number, audience?: string, hashInput?: string | Buffer): TokenInfo {
    if (!audience) audience = this.namespace;
    audience = encodeURIComponent(audience);
    const keyName = encodeURIComponent(this.keyName);
    const stringToSign = audience + '\n' + expiry;
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
      tokenType: TokenType.CbsTokenTypeSas,
      expiry: expiry
    };
  }

  /**
   * Creates a token provider from the EventHub/ServiceBus connection string;
   * @param {string} connectionString - The EventHub/ServiceBus connection string
   */
  static fromConnectionString(connectionString: string): SasTokenProvider {
    const parsed = parseConnectionString<ServiceBusConnectionStringModel>(connectionString);
    return new SasTokenProvider(parsed.Endpoint, parsed.SharedAccessKeyName, parsed.SharedAccessKey);
  }
}
