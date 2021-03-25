// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeleteCertificatePollOperation, DeleteCertificatePollOperationState } from "./operation";
import { DeletedCertificate } from "../../certificatesModels";
import {
  KeyVaultCertificatePoller,
  KeyVaultCertificatePollerOptions
} from "../keyVaultCertificatePoller";
import { createTraceFunction } from "../../../../keyvault-common/src";

export interface DeleteCertificatePollerOptions extends KeyVaultCertificatePollerOptions {}

/**
 * @internal
 */
export const withTrace = createTraceFunction("Azure.KeyVault.Certificates.DeleteCertificatePoller");

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
export class DeleteCertificatePoller extends KeyVaultCertificatePoller<
  DeleteCertificatePollOperationState,
  DeletedCertificate
> {
  constructor(options: DeleteCertificatePollerOptions) {
    const {
      vaultUrl,
      client,
      certificateName,
      operationOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: DeleteCertificatePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new DeleteCertificatePollOperation(
      {
        ...state,
        certificateName
      },
      vaultUrl,
      client,
      operationOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
