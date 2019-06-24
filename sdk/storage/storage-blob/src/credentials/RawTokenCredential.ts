// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";

/**
 * RawTokenCredential is a TokenCredential that always returns the given token.
 * Renew the token by setting a new token string value to token property.
 *
 * @example
 *  const rawTokenCredential = new RawTokenCredential("token");
 *  const pipeline = newPipeline(tokenCredential);
 *
 *  const queueServiceClient = new QueueServiceClient("https://mystorageaccount.queue.core.windows.net", pipeline);
 *
 *  // Set up a timer to refresh the token
 *  const timerID = setInterval(() => {
 *    // Update token by accessing to public tokenCredential.token
 *    tokenCredential.token = "updatedToken";
 *    // WARNING: Timer must be manually stopped! It will forbid GC of tokenCredential
 *    if (shouldStop()) {
 *      clearInterval(timerID);
 *    }
 *  }, 60 * 60 * 1000); // Set an interval time before your token expired
 * @export
 * @implements {TokenCredential}
 *
 */
export class RawTokenCredential implements TokenCredential {
  /**
   * Mutable token value. You can set a renewed token value to this property,
   * for example, when an OAuth token is expired.
   *
   * @type {string}
   */
  public token: string;

  /**
   * Creates an instance of TokenCredential.
   * @param {string} token
   */
  constructor(token: string) {
    this.token = token;
  }

  /**
   * Retrieves the token stored in this RawTokenCredential.
   * 
   * @param _scopes Ignored since token is already known.
   * @param _options Ignored since token is already known.
   * @returns {AccessToken} The access token details.
   */
  async getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    return {
      token: this.token,
      expiresOnTimestamp: Date.now() + 2 * 60 * 1000 // 2 Minutes
    };
  }
}
