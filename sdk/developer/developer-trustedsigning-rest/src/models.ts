// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The artifact request information to be signed by the service. */
export interface SigningPayloadOptions {
  /**
   * The supported signature algorithm identifiers.
   *
   * Possible values: "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512", "ES256K"
   */
  signatureAlgorithm: SignatureAlgorithm;
  /** Content digest to sign. */
  digest: string;
  /** List of full file digital signatures. */
  fileHashList?: string[];
  /** List of authenticode digital signatures. */
  authenticodeHashList?: string[];
}

/** Alias for SignatureAlgorithm */
export type SignatureAlgorithm = string;
