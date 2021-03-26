// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, NamedKeyCredential, SASCredential } from "@azure/core-auth";
import jssha from "jssha";
import { isNamedKeyCredential, isObjectWithProperties } from "../util/typeGuards";

/**
 * A TokenProvider provides an alternative to TokenCredential for providing an `AccessToken`.
 * @hidden
 */
export interface TokenProvider {
  /**
   * Property used to distinguish TokenProvider from TokenCredential.
   */
  isTokenProvider: true;
  /**
   * Gets the token provided by this provider.
   *
   * This method is called automatically by Azure SDK client libraries.
   *
   * @param scopes - The list of scopes for which the token will have access.
   */
  getToken(audience: string): AccessToken;
}

/**
 * Creates a token provider from the provided shared access data.
 * @param data - The sharedAccessKeyName/sharedAccessKey pair or the sharedAccessSignature.
 * @hidden
 */
export function createTokenProvider(
  data: { sharedAccessKeyName: string; sharedAccessKey: string } | { sharedAccessSignature: string }
): TokenProvider {
  if (isObjectWithProperties(data, ["sharedAccessKeyName", "sharedAccessKey"])) {
    return new SasTokenProvider({ name: data.sharedAccessKeyName, key: data.sharedAccessKey });
  } else {
    return new SasTokenProvider({ signature: data.sharedAccessSignature });
  }
}

/**
 * A TokenProvider that generates a Sas token:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @hidden
 */
export class SasTokenProvider implements TokenProvider {
  /**
   * Property used to distinguish TokenProvider from TokenCredential.
   */
  get isTokenProvider(): true {
    return true;
  }

  /**
   * The SASCredential containing the key name and secret key value.
   */
  private _credential: SASCredential | NamedKeyCredential;

  /**
   * Initializes a new instance of SasTokenProvider
   * @param credential - The source `NamedKeyCredential` or `SASCredential`.
   */
  constructor(credential: SASCredential | NamedKeyCredential) {
    this._credential = credential;
  }

  /**
   * Gets the sas token for the specified audience
   * @param audience - The audience for which the token is desired.
   */
  getToken(audience: string): AccessToken {
    if (isNamedKeyCredential(this._credential)) {
      return createToken(
        this._credential.name,
        this._credential.key,
        Math.floor(Date.now() / 1000) + 3600,
        audience
      );
    } else {
      return {
        token: this._credential.signature,
        expiresOnTimestamp: 0
      };
    }
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
function createToken(keyName: string, key: string, expiry: number, audience: string): AccessToken {
  audience = encodeURIComponent(audience);
  keyName = encodeURIComponent(keyName);
  const stringToSign = audience + "\n" + expiry;

  const shaObj = new jssha("SHA-256", "TEXT");
  shaObj.setHMACKey(key, "TEXT");
  shaObj.update(stringToSign);
  const sig = encodeURIComponent(shaObj.getHMAC("B64"));
  return {
    token: `SharedAccessSignature sr=${audience}&sig=${sig}&se=${expiry}&skn=${keyName}`,
    expiresOnTimestamp: expiry
  };
}
