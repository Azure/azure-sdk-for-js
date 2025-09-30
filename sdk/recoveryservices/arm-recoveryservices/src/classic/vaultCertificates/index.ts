// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import { create } from "../../api/vaultCertificates/operations.js";
import type { VaultCertificatesCreateOptionalParams } from "../../api/vaultCertificates/options.js";
import type { CertificateRequest, VaultCertificateResponse } from "../../models/models.js";

/** Interface representing a VaultCertificates operations. */
export interface VaultCertificatesOperations {
  /** Uploads a certificate for a resource. */
  create: (
    resourceGroupName: string,
    vaultName: string,
    certificateName: string,
    certificateRequest: CertificateRequest,
    options?: VaultCertificatesCreateOptionalParams,
  ) => Promise<VaultCertificateResponse>;
}

function _getVaultCertificates(context: RecoveryServicesContext) {
  return {
    create: (
      resourceGroupName: string,
      vaultName: string,
      certificateName: string,
      certificateRequest: CertificateRequest,
      options?: VaultCertificatesCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, vaultName, certificateName, certificateRequest, options),
  };
}

export function _getVaultCertificatesOperations(
  context: RecoveryServicesContext,
): VaultCertificatesOperations {
  return {
    ..._getVaultCertificates(context),
  };
}
