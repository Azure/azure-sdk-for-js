// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { stringToBytes } from "../utils/utf8";
import { TypeDeserializer } from "../utils/typeDeserializer";

import * as Mappers from "../generated/models/mappers";

/**
 * Represents a stored attestation policy sent to the attestation service.
 */
export class StoredAttestationPolicy {
  constructor(value: string) {
    this.attestationPolicy = stringToBytes(value);
  }

  /**
   * Serializes a StoredAttestationPolicy object to a JSON encoded string.
   *
   * @returns The serialized JSON policy.
   */
  serialize(): string {
    return TypeDeserializer.serialize(
      this,
      { StoredAttestationPolicy: Mappers.StoredAttestationPolicy },
      Mappers.StoredAttestationPolicy,
    );
  }

  /**
   * Deserializes a stored attestation policy object returned from the attestation service.
   *
   * @param value - Raw JSON object from service to serialize as an attestation policy.
   * @returns Stored attestation policy.
   */
  static deserialize(value: unknown): StoredAttestationPolicy {
    return TypeDeserializer.deserialize(
      value,
      { StoredAttestationPolicy: Mappers.StoredAttestationPolicy },
      "StoredAttestationPolicy",
    ) as StoredAttestationPolicy;
  }

  /**
   * Stored attestation policy, utf8 encoded.
   */
  attestationPolicy: Uint8Array;
}
