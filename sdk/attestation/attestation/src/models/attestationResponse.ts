// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AttestationToken } from "./attestationToken";

/**
 * An AttestationResponse represents the response from the Microsoft Azure
 * Attestation service. It has two properties:
 *
 * @param token - The attestation token returned from the attestation service.
 * @typeparam value - The body of the token returned by the attestation service.
 *
 */
export interface AttestationResponse<T> {
  /**
   * The Attestation Token returned from the attestation service.
   */
  token: AttestationToken;

  /**
   * The value of the response from the attestation service.
   */

  value: T;
}

/** Create an AttestationResponse object.
 *
 * @param token - Token which was returned from the attestation service.
 * @param value - Value for the response. Typically represents the body of the token returned by the service.
 * @returns - A newly created AttestationResponse object.
 */
export function createAttestationResponse<T>(token: AttestationToken, value: T) : AttestationResponse<T> {
  return { token: token, value: value };
}
