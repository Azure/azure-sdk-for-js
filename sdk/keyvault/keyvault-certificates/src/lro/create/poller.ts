// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CreateCertificatePollOperation, CreateCertificateState } from "./operation";
import {
  KeyVaultCertificateWithPolicy,
  CreateCertificateOptions,
  CertificatePolicy
} from "../../certificatesModels";
import {
  KeyVaultCertificatePoller,
  KeyVaultCertificatePollerOptions
} from "../keyVaultCertificatePoller";
import { createTraceFunction } from "../../../../keyvault-common/src";

export interface CreateCertificatePollerOptions extends KeyVaultCertificatePollerOptions {
  certificatePolicy?: CertificatePolicy;
  createCertificateOptions: CreateCertificateOptions;
}

/**
 * @internal
 */
export const withTrace = createTraceFunction("Azure.KeyVault.Certificates.CreateCertificatePoller");

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
export class CreateCertificatePoller extends KeyVaultCertificatePoller<
  CreateCertificateState,
  KeyVaultCertificateWithPolicy
> {
  constructor(options: CreateCertificatePollerOptions) {
    const {
      vaultUrl,
      client,
      certificateName,
      certificatePolicy,
      createCertificateOptions,
      operationOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: CreateCertificateState | undefined;

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
      operationOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
