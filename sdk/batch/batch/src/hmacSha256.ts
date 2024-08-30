/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import jssha from "jssha";
import { Buffer } from "buffer";

/**
 * Describes the HmacSHA256Sign object.
 */
export class HmacSha256Sign {
  private _accessKey: string;
  private _decodedAccessKey: Buffer;

  constructor(accessKey: string) {
    this._accessKey = accessKey;
    this._decodedAccessKey = Buffer.from(this._accessKey, "base64");
  }

  /**
   * Computes a signature for the specified string using the HMAC-SHA256 algorithm.
   *
   * @param stringToSign The UTF-8-encoded string to sign.
   * @return A String that contains the HMAC-SHA256-encoded signature.
   */
  sign(stringToSign: string): string {
    // Encoding the Signature
    // Signature=Base64(HMAC-SHA256(UTF8(StringToSign)))
    const shaObj = new jssha("SHA-256", "ARRAYBUFFER");
    shaObj.setHMACKey(this._decodedAccessKey, "ARRAYBUFFER");
    shaObj.update(Buffer.from(stringToSign, "utf8"));
    return shaObj.getHMAC("B64");
  }
}
