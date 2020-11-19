// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateOperationPollOperation, CertificateOperationState } from "./operation";
import { KeyVaultCertificateWithPolicy } from "../../certificatesModels";
import {
  KeyVaultCertificatePoller,
  KeyVaultCertificatePollerOptions
} from "../keyVaultCertificatePoller";

export interface CertificateOperationPollerOptions extends KeyVaultCertificatePollerOptions {}

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
export class CertificateOperationPoller extends KeyVaultCertificatePoller<
  CertificateOperationState,
  KeyVaultCertificateWithPolicy
> {
  constructor(options: CertificateOperationPollerOptions) {
    const {
      vaultUrl,
      client,
      certificateName,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: CertificateOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new CertificateOperationPollOperation(
      {
        ...state,
        certificateName
      },
      vaultUrl,
      client,
      requestOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
