/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { stringToBytes } from "../utils/utf8.browser";
import { TypeDeserializer } from "../utils/typeDeserializer"

import * as Mappers from "../generated/models/mappers";
    
/**
 * Represents a stored attestation policy sent to the attestation service.
 */
export class StoredAttestationPolicy {
  constructor(value: string) {
    this.attestationPolicy = stringToBytes(value);
  }

  serialize() : string {
    return TypeDeserializer.serialize(
            this,
            Mappers.StoredAttestationPolicy);
  }

  /**
   * 
   * @param value - Raw JSON object from service to serialize as an attestation policy.
   * @returns Stored attestation policy.
   */
  static deserialize(value: any) : StoredAttestationPolicy {
    return TypeDeserializer.deserialize(value, {StoredAttestationPolicy: Mappers.StoredAttestationPolicy}, "StoredAttestationPolicy") as StoredAttestationPolicy;
  }

  /**
   * Stored attestation policy, utf8 encoded.
   */
  attestationPolicy: Uint8Array;
}
