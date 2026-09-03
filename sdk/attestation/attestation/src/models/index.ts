// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type { AttestationSigner } from "./attestationSigner.js";
export type { AttestationToken, AttestationTokenValidationOptions } from "./attestationToken.js";
export type { AttestationResponse } from "./attestationResponse.js";
export type { PolicyResult } from "./policyResult.js";
export type { AttestationResult, AttestationSgxCollateralInfo } from "./attestationResult.js";
export {
  KnownAttestationType,
  KnownCertificateModification,
  KnownPolicyModification,
  type AttestationType,
  type CertificateModification,
  type PolicyModification,
  type PolicyCertificatesModificationResult,
} from "../generated/models/index.js";
export {
  type AttestationPolicyToken,
  createAttestationPolicyToken,
} from "./attestationPolicyToken.js";
