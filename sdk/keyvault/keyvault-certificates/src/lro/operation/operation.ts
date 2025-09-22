// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationOptions } from "@azure-rest/core-client";
import type {
  CancelCertificateOperationOptions,
  CertificateOperation,
  GetCertificateOptions,
  GetPlainCertificateOperationOptions,
  KeyVaultCertificateWithPolicy,
} from "../../certificatesModels.js";
import type { KeyVaultCertificatePollOperationState } from "../keyVaultCertificatePoller.js";
import { cleanState, KeyVaultCertificatePollOperation } from "../keyVaultCertificatePoller.js";
import type { KeyVaultClient } from "../../keyVaultClient.js";
import {
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle,
} from "../../transformations.js";
import { tracingClient } from "../../tracing.js";

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
    private client: KeyVaultClient,
    private operationOptions: OperationOptions = {},
  ) {
    super(state);
  }

  /**
   * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
   */
  private cancelCertificateOperation(
    certificateName: string,
    options: CancelCertificateOperationOptions = {},
  ): Promise<CertificateOperation> {
    return tracingClient.withSpan(
      "CertificateOperationPoller.cancelCertificateOperation",
      options,
      async (updatedOptions) => {
        const response = await this.client.updateCertificateOperation(
          certificateName,
          { cancellationRequested: true },
          updatedOptions,
        );
        return getCertificateOperationFromCoreOperation(certificateName, response);
      },
    );
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   */
  private getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {},
  ): Promise<KeyVaultCertificateWithPolicy> {
    return tracingClient.withSpan(
      "CertificateOperationPoller.getCertificate",
      options,
      async (updatedOptions) => {
        const result = await this.client.getCertificate(certificateName, "", updatedOptions);
        return getCertificateWithPolicyFromCertificateBundle(result);
      },
    );
  }

  /**
   * Gets the certificate operation.
   */
  private getPlainCertificateOperation(
    certificateName: string,
    options: GetPlainCertificateOperationOptions = {},
  ): Promise<CertificateOperation> {
    return tracingClient.withSpan(
      "CertificateOperationPoller.getPlainCertificateOperation",
      options,
      async (updatedOptions) => {
        const response = await this.client.getCertificateOperation(certificateName, updatedOptions);
        return getCertificateOperationFromCoreOperation(certificateName, response);
      },
    );
  }

  /**
   * Reaches to the service and updates the poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: CertificateOperationState) => void;
    } = {},
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
        this.operationOptions,
      );
    } else if (!state.isCompleted) {
      state.certificateOperation = await this.getPlainCertificateOperation(
        certificateName,
        this.operationOptions,
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
    options: { abortSignal?: AbortSignal } = {},
  ): Promise<CertificateOperationPollOperation> {
    const state = this.state;
    const certificateName = state.certificateName!;

    if (options.abortSignal) {
      this.operationOptions.abortSignal = options.abortSignal;
    }

    state.certificateOperation = await this.cancelCertificateOperation(
      certificateName,
      this.operationOptions,
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
