// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RecoverDeletedCertificatePollOperation,
  RecoverDeletedCertificateState,
} from "./operation";
import { KeyVaultCertificateWithPolicy } from "../../certificatesModels";
import {
  KeyVaultCertificatePoller,
  KeyVaultCertificatePollerOptions,
} from "../keyVaultCertificatePoller";

export interface RecoverDeletedCertificatePollerOptions extends KeyVaultCertificatePollerOptions {}

/**
 * Class that creates a poller that waits until a deleted certificate is fully recovered.
 */
export class RecoverDeletedCertificatePoller extends KeyVaultCertificatePoller<
  RecoverDeletedCertificateState,
  KeyVaultCertificateWithPolicy
> {
  constructor(options: RecoverDeletedCertificatePollerOptions) {
    const {
      vaultUrl,
      client,
      certificateName,
      operationOptions,
      intervalInMs = 2000,
      resumeFrom,
    } = options;

    let state: RecoverDeletedCertificateState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new RecoverDeletedCertificatePollOperation(
      {
        ...state,
        certificateName,
      },
      vaultUrl,
      client,
      operationOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
