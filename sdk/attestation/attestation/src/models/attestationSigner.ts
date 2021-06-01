/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import {JsonWebKey} from "../generated/models";
import {base64DecodeString} from "../utils/base64";

/**
 * An AttestationSigner represents a signing certificate chain/Key ID combination
 * returned by the attestation service.
 */
export class AttestationSigner
{
  /**
   * @internal
   * 
   * @param key - JSON Web Key describing the attestation signer.
   */
  constructor(key?: JsonWebKey) {
    if (key?.kid) {
      this.keyId = key.kid.toString();
    }

    this.certificates = key?.x5C?.map(base64DecodeString) ?? []
  }

  /**
   * The Key ID for the signer, as defined by the "kid" parameter in 
   * {@link https://datatracker.ietf.org/doc/html/rfc7517#section-4.5 | RFC 7517 section 4.5}
   */
  keyId?: string;

  /**
   * An array of X.509 DER encoded certificates one of which will be used to
   * sign an attestation token. Also the "x5c" parameter in 
   * {@link https://datatracker.ietf.org/doc/html/rfc7517#section-4.7 | RFC 7517 section 4.7}
   */

  certificates: Uint8Array[]
};
