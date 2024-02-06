// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StoredAttestationPolicy } from "./storedAttestationPolicy";
// import { AttestationSigningKey } from "./attestationSigningKey";
import { AttestationToken, AttestationTokenImpl } from "./attestationToken";

/**
 *
 * An AttestationPolicyToken represents an AttestationToken which holds an attestation
 * policy document.
 *
 * When the attestation service receives a set policy request, the payload of the
 * set policy token contains a {@link https://datatracker.ietf.org/doc/html/rfc7515 | JSON Web Signature}
 * whose body contains the actual attestation policy document.
 *
 * The AttestationPolicyToken represents this JWS object.
 */
export interface AttestationPolicyToken extends AttestationToken {}

/** Constructs an AttestationToken containing an Attestation Policy document.
 *
 * @param policy - Attestation policy to embed in the attestation token.
 * @param privateKey - optional private key used to sign the attestation token.
 * @param certificate - optional certificate used to verify the attestation token.
 *
 * @remarks Note that if the attestation instance is running in `Isolated` mode,
 *  the privateKey and certificate are required. If the attestation instance
 *  is running in `AAD` mode, they are optional.
 *
 * @throws {@link Error} when the key in the certificate provided does not match the private key.
 */
export function createAttestationPolicyToken(
  policy: string,
  privateKey?: string,
  certificate?: string
): AttestationPolicyToken {
  const token = AttestationTokenImpl.create({
    body: new StoredAttestationPolicy(policy).serialize(),
    privateKey: privateKey,
    certificate: certificate,
  });
  return token;
}
