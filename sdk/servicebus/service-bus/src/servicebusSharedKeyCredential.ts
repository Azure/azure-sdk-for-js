// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseConnectionString } from "@azure/core-amqp";
import { AccessToken } from "@azure/core-auth";
import { Buffer } from "buffer";
import isBuffer from "is-buffer";
import jssha from "jssha";

/**
 * @class SharedKeyCredential
 * @internal
 * Defines the SharedKeyCredential.
 */
export class SharedKeyCredential {
  /**
   * The name of the EventHub/ServiceBus key.
   */
  keyName: string;

  /**
   * The secret value associated with the above EventHub/ServiceBus key.
   */
  key: string;

  /**
   * Initializes a new instance of SharedKeyCredential
   * @constructor
   * @param keyName - The name of the EventHub/ServiceBus key.
   * @param key - The secret value associated with the above EventHub/ServiceBus key
   */
  constructor(keyName: string, key: string) {
    this.keyName = keyName;
    this.key = key;
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
   * @param hashInput The input to be provided to hmac to create the hash.
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
   * @param connectionString - The EventHub/ServiceBus connection string
   */
  static fromConnectionString(connectionString: string): SharedKeyCredential {
    const parsed = parseConnectionString<{
      SharedAccessSignature: string;
      SharedAccessKeyName: string;
      SharedAccessKey: string;
    }>(connectionString);

    if (parsed.SharedAccessSignature == null) {
      return new SharedKeyCredential(parsed.SharedAccessKeyName, parsed.SharedAccessKey);
    } else {
      return new SharedAccessSignatureCredential(parsed.SharedAccessSignature);
    }
  }
}

/**
 * A credential that takes a SharedAccessSignature:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @internal
 */
export class SharedAccessSignatureCredential extends SharedKeyCredential {
  private _accessToken: AccessToken;

  /**
   * @param sharedAccessSignature - A shared access signature of the form
   * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
   */
  constructor(sharedAccessSignature: string) {
    super("", "");

    this._accessToken = {
      token: sharedAccessSignature,
      expiresOnTimestamp: 0
    };
  }

  /**
   * Retrieve a valid token for authenticaton.
   *
   * @param _audience Not applicable in SharedAccessSignatureCredential as the token is not re-generated at every invocation of the method
   */
  getToken(_audience: string): AccessToken {
    return this._accessToken;
  }
}
