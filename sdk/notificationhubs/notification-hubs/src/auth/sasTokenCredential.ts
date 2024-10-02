// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import { signString } from "./hmacSha256.js";

/**
 * Represents a named key credential.
 */
export interface NamedKeyCredential {
  /**
   * The Shared Access Signature key name.
   */
  sharedAccessKeyName: string;

  /**
   * The Shared Access Signature key value.
   */
  sharedAccessKey: string;
}

/**
 * A TokenProvider that generates a Sas token:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @internal
 */
export class SasTokenCredential implements TokenCredential {
  /**
   * The SASCredential containing the key name and secret key value.
   */
  private _credential: NamedKeyCredential;

  /**
   * Initializes a new instance of SasTokenProvider
   * @param credential - The source `NamedKeyCredential` or `SASCredential`.
   */
  constructor(credential: NamedKeyCredential) {
    this._credential = credential;
  }

  /**
   * Gets the sas token for the specified audience
   * @param scopes - The scope for which the token is desired.
   */
  async getToken(scopes: string | string[]): Promise<AccessToken | null> {
    const audience = Array.isArray(scopes) ? scopes[0] : scopes;
    return createToken(
      this._credential.sharedAccessKeyName,
      this._credential.sharedAccessKey,
      Math.floor(Date.now() / 1000) + 3600,
      audience,
    );
  }
}

/**
 * Creates the sas token based on the provided information.
 * @param keyName - The shared access key name.
 * @param key - The shared access key.
 * @param expiry - The time period in unix time after which the token will expire.
 * @param audience - The audience for which the token is desired.
 * @internal
 */
async function createToken(
  keyName: string,
  key: string,
  expiry: number,
  audience: string,
): Promise<AccessToken> {
  audience = encodeURIComponent(audience.toLowerCase());
  keyName = encodeURIComponent(keyName);
  const stringToSign = audience + "\n" + expiry;
  const sig = await signString(key, stringToSign);

  return {
    token: `SharedAccessSignature sr=${audience}&sig=${sig}&se=${expiry}&skn=${keyName}`,
    expiresOnTimestamp: expiry,
  };
}
