// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationToken } from "./attestationToken";

/**
 * An AttestationResponse represents the response from the Microsoft Azure
 * Attestation service. It has two properties:
 *
 * @param token - The attestation token returned from the attestation service.
 * @param body - The value of the response from the attestation service.
 * @typeparam T - The type of the {@link body} property.
 *
 */
export interface AttestationResponse<T> {
  /**
   * The Attestation Token returned from the attestation service.
   */
  token: AttestationToken;

  /**
   * The value of the response from the attestation service, derived
   *  from the body of the {@link token} property.
   */

  body: T;
}

/** Create an AttestationResponse object.
 *
 * @param token - Token which was returned from the attestation service.
 * @param value - Value for the response. Usually derived from the body of the token
 *    returned by the service.
 * @returns - A newly created AttestationResponse object.
 */
export function createAttestationResponse<T>(
  token: AttestationToken,
  value: T,
): AttestationResponse<T> {
  return { token: token, body: value };
}
