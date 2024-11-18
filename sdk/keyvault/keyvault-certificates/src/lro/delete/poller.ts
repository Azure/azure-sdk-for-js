// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeleteCertificatePollOperationState } from "./operation.js";
import { DeleteCertificatePollOperation } from "./operation.js";
import type { DeletedCertificate } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollerOptions } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";

export interface DeleteCertificatePollerOptions extends KeyVaultCertificatePollerOptions {}

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
      resumeFrom,
    } = options;

    let state: DeleteCertificatePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new DeleteCertificatePollOperation(
      {
        ...state,
        certificateName,
      },
      vaultUrl,
      client,
      operationOptions,
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
