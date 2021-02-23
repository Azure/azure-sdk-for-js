// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AbortSignal } from "@azure/abort-controller";
import { operationOptionsToRequestOptionsBase, RequestOptionsBase } from "@azure/core-http";
import {
  CancelCertificateOperationOptions,
  CertificateOperation,
  GetCertificateOptions,
  GetPlainCertificateOperationOptions,
  KeyVaultCertificateWithPolicy
} from "../../certificatesModels";
import {
  cleanState,
  KeyVaultCertificatePollOperation,
  KeyVaultCertificatePollOperationState
} from "../keyVaultCertificatePoller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle
} from "../../transformations";
import { createSpan } from "../../tracing";
import {
  KeyVaultClientGetCertificateOperationResponse,
  KeyVaultClientGetCertificateResponse,
  KeyVaultClientUpdateCertificateOperationResponse
} from "../../generated/models";

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
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state);
  }

  /**
   * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
   */
  private async cancelCertificateOperation(
    certificateName: string,
    options: CancelCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
    const { span, updatedOptions } = createSpan(
      "generatedClient.cancelCertificateOperation",
      options
    );

    let result: KeyVaultClientUpdateCertificateOperationResponse;
    try {
      result = await this.client.updateCertificateOperation(
        this.vaultUrl,
        certificateName,
        true,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getCertificateOperationFromCoreOperation(
      certificateName,
      this.vaultUrl,
      result._response.parsedBody
    );
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   */
  private async getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const { span, updatedOptions } = createSpan("generatedClient.getCertificate", options);

    let result: KeyVaultClientGetCertificateResponse;

    try {
      result = await this.client.getCertificate(this.vaultUrl, certificateName, "", updatedOptions);
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result);
  }

  /**
   * Gets the certificate operation.
   */
  private async getPlainCertificateOperation(
    certificateName: string,
    options?: GetPlainCertificateOperationOptions
  ): Promise<CertificateOperation> {
    const { span, updatedOptions } = createSpan(
      "generatedClient.getPlainCertificateOperation",
      options
    );

    let result: KeyVaultClientGetCertificateOperationResponse;

    try {
      result = await this.client.getCertificateOperation(
        this.vaultUrl,
        certificateName,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getCertificateOperationFromCoreOperation(
      certificateName,
      this.vaultUrl,
      result._response.parsedBody
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
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      state.isStarted = true;
      state.result = await this.getCertificate(certificateName, this.requestOptions);
      state.certificateOperation = await this.getPlainCertificateOperation(
        certificateName,
        this.requestOptions
      );
    } else if (!state.isCompleted) {
      state.certificateOperation = await this.getPlainCertificateOperation(
        certificateName,
        this.requestOptions
      );
    }

    if (state.certificateOperation && state.certificateOperation.status !== "inProgress") {
      state.isCompleted = true;
      state.result = await this.getCertificate(certificateName, this.requestOptions);
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
      this.requestOptions.abortSignal = options.abortSignal;
    }

    state.certificateOperation = await this.cancelCertificateOperation(
      certificateName,
      this.requestOptions
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
      ...cleanState(this.state)
    };
    return JSON.stringify({
      state
    });
  }
}
