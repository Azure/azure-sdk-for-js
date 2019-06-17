// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { SharedKeyCredential } from "./sas";
import { AccessToken } from "@azure/core-http";
import { Buffer } from "buffer";

/**
 * @class IotSharedKeyCredential
 * @ignore
 * Defines the IotSharedKeyCredential for IotHub.
 */
export class IotSharedKeyCredential extends SharedKeyCredential {
  /**
   * Gets the sas token for the specified audience for IotHub.
   * @ignore
   * @param {string} [audience] - The audience for which the token is desired. If not
   * provided then the Endpoint from the connection string will be applied.
   */
  getToken(audience: string): AccessToken {
    return this._createToken(
      Math.floor(Date.now() / 1000) + 3600,
      audience,
      Buffer.from(this.key, "base64")
    );
  }
}
