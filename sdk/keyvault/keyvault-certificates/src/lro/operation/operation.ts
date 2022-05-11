// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AbortSignal } from "@azure/abort-controller";
import { OperationOptions } from "@azure/core-http";
import {
  CancelCertificateOperationOptions,
  CertificateOperation,
  GetCertificateOptions,
  GetPlainCertificateOperationOptions,
  KeyVaultCertificateWithPolicy,
} from "../../certificatesModels";
import {
  cleanState,
  KeyVaultCertificatePollOperation,
  KeyVaultCertificatePollOperationState,
} from "../keyVaultCertificatePoller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle,
} from "../../transformations";
import { tracingClient } from "../../tracing";

/**
 * An interface representing the publicly available properties of the state of the CertificateOperationPoller.
 */
export interface CertificateOperationState
  extends KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy> {
  /**
   * The operation of the certificate
   */
  certificateOperation?: CertificateOperation;
}

/**
 * An interface representing the active operation of a certificate's creation,
 * which is represented locally as the "operation" of an active LRO Poller.
 */
export class CertificateOperationPollOperation extends KeyVaultCertificatePollOperation<
  CertificateOperationState,
  KeyVaultCertificateWithPolicy
> {
  constructor(
    public state: CertificateOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private operationOptions: OperationOptions = {}
  ) {
    super(state);
  }

  /**
   * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
   */
  private cancelCertificateOperation(
    certificateName: string,
    options: CancelCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
    return tracingClient.withSpan(
      "CertificateOperationPoller.cancelCertificateOperation",
      options,
      async (updatedOptions) => {
        const result = await this.client.updateCertificateOperation(
          this.vaultUrl,
          certificateName,
          true,
          updatedOptions
        );
        return getCertificateOperationFromCoreOperation(
          certificateName,
          this.vaultUrl,
          result._response.parsedBody
        );
      }
    );
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   */
  private getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    return tracingClient.withSpan(
      "CertificateOperationPoller.getCertificate",
      options,
      async (updatedOptions) => {
        const result = await this.client.getCertificate(
          this.vaultUrl,
          certificateName,
          "",
          updatedOptions
        );
        return getCertificateWithPolicyFromCertificateBundle(result);
      }
    );
  }

  /**
   * Gets the certificate operation.
   */
  private getPlainCertificateOperation(
    certificateName: string,
    options: GetPlainCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
    return tracingClient.withSpan(
      "CertificateOperationPoller.getPlainCertificateOperation",
      options,
      async (updatedOptions) => {
        const result = await this.client.getCertificateOperation(
          this.vaultUrl,
          certificateName,
          updatedOptions
        );
        return getCertificateOperationFromCoreOperation(
          certificateName,
          this.vaultUrl,
          result._response.parsedBody
        );
      }
    );
  }

  /**
   * Reaches to the service and updates the poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: CertificateOperationState) => void;
    } = {}
  ): Promise<CertificateOperationPollOperation> {
    const state = this.state;
    const certificateName = state.certificateName!;

    if (options.abortSignal) {
      this.operationOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      state.isStarted = true;
      state.result = await this.getCertificate(certificateName, this.operationOptions);
      state.certificateOperation = await this.getPlainCertificateOperation(
        certificateName,
        this.operationOptions
      );
    } else if (!state.isCompleted) {
      state.certificateOperation = await this.getPlainCertificateOperation(
        certificateName,
        this.operationOptions
      );
    }

    if (state.certificateOperation && state.certificateOperation.status !== "inProgress") {
      state.isCompleted = true;
      state.result = await this.getCertificate(certificateName, this.operationOptions);
      if (state.certificateOperation.error) {
        state.error = new Error(state.certificateOperation.error.message);
      }
    }

    return this;
  }

  /**
   * Reaches to the service and cancels the certificate's operation, also updating the poll operation.
   */
  async cancel(
    this: CertificateOperationPollOperation,
    options: { abortSignal?: AbortSignal } = {}
  ): Promise<CertificateOperationPollOperation> {
    const state = this.state;
    const certificateName = state.certificateName!;

    if (options.abortSignal) {
      this.operationOptions.abortSignal = options.abortSignal;
    }

    state.certificateOperation = await this.cancelCertificateOperation(
      certificateName,
      this.operationOptions
    );

    this.state.isCancelled = true;
    return this;
  }

  /**
   * Serializes the certificate's poll operation
   */
  public toString(): string {
    const state: CertificateOperationState = {
      certificateOperation: this.state.certificateOperation,
      ...cleanState(this.state),
    };
    return JSON.stringify({
      state,
    });
  }
}
