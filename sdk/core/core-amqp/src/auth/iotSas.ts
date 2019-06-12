// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { SharedKeyCredential } from "./sas";
import { AccessToken } from "./token";
import { Buffer } from "buffer";

/**
 * @class IotSasTokenProvider
 * @ignore
 * Defines the SharedKeyCredential for IotHub.
 */
export class IotSasTokenProvider extends SharedKeyCredential {
  /**
   * Gets the sas token for the specified audience for IotHub.
   * @ignore
   * @param {string} [audience] - The audience for which the token is desired. If not
   * provided then the Endpoint from the connection string will be applied.
   */
  async getToken(audience: string, requestOptions?: any): Promise<AccessToken | null> {
    return this._createToken(
      Math.floor(Date.now() / 1000) + this.tokenValidTimeInSeconds,
      audience,
      Buffer.from(this.key, "base64")
    );
  }
}
