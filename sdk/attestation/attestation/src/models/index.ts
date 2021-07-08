// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateModification } from "../generated/models/index";

export { AttestationSigner } from "./attestationSigner";
export { AttestationToken, AttestationTokenValidationOptions } from "./attestationToken";
export { AttestationResponse } from "./attestationResponse";
export { PolicyResult } from "./policyResult";
export { AttestationResult } from "./attestationResult";
export {
  KnownAttestationType,
  KnownCertificateModification,
  KnownPolicyModification,
  AttestationType,
  CertificateModification,
  PolicyModification
} from "../generated/models/index";
export { AttestationPolicyToken, createAttestationPolicyToken } from "./attestationPolicyToken";

/**
 * The result of a policy certificate modification
 */
export interface PolicyCertificatesModificationResult {
  /**
   * Hex encoded SHA1 Hash of the DER encoded certificate which was added or removed
   */
  certificateThumbprint?: string;
  /**
   * The state of the certificate after the operation has completed.
   */
  certificateResolution?: CertificateModification;
}
