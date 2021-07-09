// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AttestationToken } from "./attestationToken";

/**
 * An AttestationResponse represents the response from the Microsoft Azure
 * Attestation service. It has two properties:
 *
 * @typeparam token - The attestation token returned from the attestation service.
 * @typeparam value - The body of the token returned by the attestation service.
 *
 *
 */
export class AttestationResponse<T> {
  constructor(token: AttestationToken, value: T) {
    this.token = token;
    this.value = value;
  }

  /**
   * The Attestation Token returned from the attestation service.
   */
  token: AttestationToken;

  /**
   * The value of the response from the attestation service.
   */

  value: T;
}
