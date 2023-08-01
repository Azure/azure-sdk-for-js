// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The codesign request information to be signed by the service. */
export interface CodeSigningSubmissionOptions {
  /**
   * The supported signature algorithm identifiers.
   *
   * Possible values: RS256, RS384, RS512, PS256, PS384, PS512, ES256, ES384, ES512, ES256K
   */
  signatureAlgorithm: string;
  /** Content digest to codesign. */
  digest: string;
  /** List of full file digital signatures. */
  fileHashList?: string[];
  /** List of authenticode digital signatures. */
  authenticodeHashList?: string[];
}
