// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateOperationPollOperation, CertificateOperationState } from "./operation";
import { KeyVaultCertificateWithPolicy } from "../../certificatesModels";
import {
  KeyVaultCertificatePoller,
  KeyVaultCertificatePollerOptions,
  cleanState,
} from "../keyVaultCertificatePoller";

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
      operationOptions
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
