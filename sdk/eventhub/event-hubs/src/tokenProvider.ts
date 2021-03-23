// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseEventHubConnectionString } from "./util/connectionStringUtils";
import {
  AccessToken,
  AzureNamedKeyCredential,
  AzureSASCredential,
  NamedKeyCredential,
  SASCredential
} from "@azure/core-auth";
import { Buffer } from "buffer";
import isBuffer from "is-buffer";
import jssha from "jssha";

export interface TokenProvider {
  /**
   * Property used to distinguish TokenProvider from TokenCredential.
   */
  isTokenProvider: true;
  getToken(audience: string): AccessToken;
}

/**
 * Creates a token provider from the Event Hub connection string;
 * @param connectionString - The Event Hub connection string
 */
export function createTokenProvider(connectionString: string): TokenProvider {
  const parsed = parseEventHubConnectionString(connectionString);

  if (parsed.sharedAccessSignature == null) {
    return new NamedKeyTokenProvider(
      new AzureNamedKeyCredential(parsed.sharedAccessKeyName!, parsed.sharedAccessKey!)
    );
  } else {
    return new SharedAccessSignatureTokenProvider(
      new AzureSASCredential(parsed.sharedAccessSignature)
    );
  }
}

/**
 * Defines the SharedKeyCredential.
 * @internal
 */
export class NamedKeyTokenProvider implements TokenProvider {
  /**
   * Property used to distinguish TokenProvider from TokenCredential.
   */
  get isTokenProvider(): true {
    return true;
  }

  /**
   * The NamedKeyCredential containing the key name and secret key value.
   */
  private _credential: NamedKeyCredential;

  /**
   * Initializes a new instance of SharedKeyCredential
   * @param credential - The `NamedKeyCredential` containing a key name and secret key value.
   */
  constructor(credential: NamedKeyCredential) {
    this._credential = credential;
  }

  /**
   * Gets the sas token for the specified audience
   * @param audience - The audience for which the token is desired.
   */
  getToken(audience: string): AccessToken {
    return this._createToken(Math.floor(Date.now() / 1000) + 3600, audience);
  }

  /**
   * Creates the sas token based on the provided information
   * @param expiry - The time period in unix time after which the token will expire.
   * @param audience - The audience for which the token is desired.
   * @param hashInput - The input to be provided to hmac to create the hash.
   */
  protected _createToken(
    expiry: number,
    audience: string,
    hashInput?: string | Buffer
  ): AccessToken {
    audience = encodeURIComponent(audience);
    const keyName = encodeURIComponent(this._credential.name);
    const stringToSign = audience + "\n" + expiry;
    hashInput = hashInput || this._credential.key;
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
}

/**
 * A credential that takes a SharedAccessSignature:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @internal
 */
export class SharedAccessSignatureTokenProvider implements TokenProvider {
  /**
   * Property used to distinguish TokenProvider from TokenCredential.
   */
  get isTokenProvider(): true {
    return true;
  }

  /**
   * The NamedKeyCredential containing the key name and secret key value.
   */
  private _credential: SASCredential;

  /**
   * @param sharedAccessSignature - A shared access signature of the form
   * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
   */
  constructor(credential: SASCredential) {
    this._credential = credential;
  }

  /**
   * Retrieve a valid token for authenticaton.
   *
   * @param _audience - Not applicable as the signature is already calculated.
   */
  getToken(_audience: string): AccessToken {
    return {
      token: this._credential.signature,
      expiresOnTimestamp: 0
    };
  }
}
