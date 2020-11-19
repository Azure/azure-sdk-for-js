// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CreateCertificatePollOperation, CreateCertificatePollOperationState } from "./operation";
import {
  KeyVaultCertificateWithPolicy,
  CreateCertificateOptions,
  CertificatePolicy
} from "../../certificatesModels";
import {
  KeyVaultCertificatePoller,
  KeyVaultCertificatePollerOptions
} from "../keyVaultCertificatePoller";

export interface CreateCertificatePollerOptions extends KeyVaultCertificatePollerOptions {
  certificatePolicy?: CertificatePolicy;
  createCertificateOptions: CreateCertificateOptions;
}

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
export class CreateCertificatePoller extends KeyVaultCertificatePoller<
  CreateCertificatePollOperationState,
  KeyVaultCertificateWithPolicy
> {
  constructor(options: CreateCertificatePollerOptions) {
    const {
      vaultUrl,
      client,
      certificateName,
      certificatePolicy,
      createCertificateOptions,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: CreateCertificatePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new CreateCertificatePollOperation(
      {
        ...state,
        certificateName,
        certificatePolicy,
        createCertificateOptions
      },
      vaultUrl,
      client,
      requestOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
