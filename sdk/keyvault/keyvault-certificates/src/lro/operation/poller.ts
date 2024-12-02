// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificateOperationState } from "./operation.js";
import { CertificateOperationPollOperation } from "./operation.js";
import type { KeyVaultCertificateWithPolicy } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollerOptions } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePoller, cleanState } from "../keyVaultCertificatePoller.js";

export interface CertificateOperationPollerOptions extends KeyVaultCertificatePollerOptions {}

/**
 * Class that creates a poller that waits until a certificate finishes being created
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
      operationOptions,
      intervalInMs = 2000,
      resumeFrom,
    } = options;

    let state: CertificateOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new CertificateOperationPollOperation(
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

  /**
   * Gets the public state of the polling operation
   */
  public getOperationState(): CertificateOperationState {
    return {
      ...cleanState(this.operation.state),
      certificateOperation: this.operation.state.certificateOperation,
    };
  }
}
