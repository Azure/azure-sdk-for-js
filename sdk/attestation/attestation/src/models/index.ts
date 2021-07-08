// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AttestationSigner } from "./attestationSigner";
// export { AttestationSigningKey, createAttestationSigningKey } from "./attestationSigningKey";
export { AttestationToken, AttestationTokenValidationOptions } from "./attestationToken";
export { AttestationResponse } from "./attestationResponse";
export { PolicyResult } from "./policyResult";
export { AttestationResult } from "./attestationResult";
export {
  KnownAttestationType,
  KnownCertificateModification,
  KnownPolicyModification
} from "../generated/models/index";
export { AttestationPolicyToken } from "./attestationPolicyToken";

/**
 * The result of a policy certificate modification
 */
export interface PolicyCertificatesModificationResult {
  /**
   * Hex encoded SHA1 Hash of the binary representation certificate which was added or removed
   */
  certificateThumbprint?: string;
  /**
   * The result of the operation
   */
  certificateResolution?: CertificateModification;
}

/**
 * Defines values for AttestationType.
 * {@link KnownAttestationType} can be used interchangeably with AttestationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SgxEnclave**: Intel Software Guard eXtensions
 * **OpenEnclave**: OpenEnclave extensions to SGX
 * **Tpm**: Edge TPM Virtualization Based Security
 */
export type AttestationType = string;

/**
 * Defines values for CertificateModification.
 * {@link KnownCertificateModification} can be used interchangeably with CertificateModification,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **IsPresent**: After the operation was performed, the certificate is in the set of certificates.
 * **IsAbsent**: After the operation was performed, the certificate is no longer present in the set of certificates.
 */
export type CertificateModification = string;

/**
 * Defines values for PolicyModification.
 * {@link KnownPolicyModification} can be used interchangeably with PolicyModification,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updated**: The specified policy object was updated.
 * **Removed**: The specified policy object was removed.
 */
export type PolicyModification = string;
