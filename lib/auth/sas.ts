// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as crypto from "crypto";
import { parseConnectionString } from "../util/utils";
import { TokenInfo, TokenProvider, TokenType } from "./token";

/**
 * @class SasTokenProvider
 * Defines the SasTokenProvider.
 */
export class SasTokenProvider implements TokenProvider {
  /**
   * @property {string} namespace - The namespace of the EventHub instance.
   */
  namespace: string;

  /**
   * @property {string} keyName - The name of the EventHub key.
   */
  keyName: string;

  /**
   * @property {string} key - The secret value associated with the above EventHub key
   */
  key: string;
  /**
   * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it is good to renew the token. Default = 900 seconds (15 minutes).
   */
  tokenRenewalMarginInSeconds: number;
  /**
   * @property {number} tokenValidTimeInSeconds - The number of seconds for which the token is valid. Default = 3600 seconds (1 hour).
   */
  tokenValidTimeInSeconds: number;

  /**
   * Initializes a new isntance of SasTokenProvider
   * @constructor
   * @param {string} namespace - The namespace of the EventHub instance.
   * @param {string} keyName - The name of the EventHub key.
   * @param {string} key - The secret value associated with the above EventHub key
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
  getToken(audience?: string): Promise<TokenInfo> {
    return Promise.resolve(this._createToken(Math.floor(Date.now() / 1000) + this.tokenValidTimeInSeconds, audience));
  }

  /**
   * Creates the sas token based on the provided information
   * @param {string | number} expiry - The time period in unix time after which the token will expire.
   * @param {string} [audience] - The audience for which the token is desired. If not
   * provided then the Endpoint from the connection string will be applied.
   */
  private _createToken(expiry: number, audience?: string): TokenInfo {
    if (!audience) audience = this.namespace;
    audience = encodeURIComponent(audience);
    const keyName = encodeURIComponent(this.keyName);
    const stringToSign = audience + '\n' + expiry;
    const sig = encodeURIComponent(crypto.createHmac('sha256', this.key).update(stringToSign, 'utf8').digest('base64'));
    return {
      token: `SharedAccessSignature sr=${audience}&sig=${sig}&se=${expiry}&skn=${keyName}`,
      tokenType: TokenType.CbsTokenTypeSas,
      expiry: expiry
    };
  }

  /**
   *
   * @param {string} connectionString - The EventHub connection string
   */
  static fromConnectionString(connectionString: string): SasTokenProvider {
    let parsed = parseConnectionString(connectionString);
    return new SasTokenProvider(parsed.Endpoint, parsed.SharedAccessKeyName, parsed.SharedAccessKey);
  }
}
