// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CreateCertificateState } from "./operation.js";
import { CreateCertificatePollOperation } from "./operation.js";
import type {
  KeyVaultCertificateWithPolicy,
  CreateCertificateOptions,
  CertificatePolicy,
} from "../../certificatesModels.js";
import type { KeyVaultCertificatePollerOptions } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";

export interface CreateCertificatePollerOptions extends KeyVaultCertificatePollerOptions {
  certificatePolicy?: CertificatePolicy;
  createCertificateOptions: CreateCertificateOptions;
}

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
      resumeFrom,
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
        createCertificateOptions,
      },
      vaultUrl,
      client,
      operationOptions,
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
