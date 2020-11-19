// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { operationOptionsToRequestOptionsBase, RequestOptionsBase } from "@azure/core-http";
import { createSpan, setParentSpan } from "../../../../keyvault-common";
import {
  GetCertificateOptions,
  KeyVaultCertificateWithPolicy,
  RecoverDeletedCertificateOptions
} from "../../certificatesModels";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { GetCertificateResponse, RecoverDeletedCertificateResponse } from "../../generated/models";
import { getCertificateWithPolicyFromCertificateBundle } from "../../transformations";
import {
  KeyVaultCertificatePollOperation,
  KeyVaultCertificatePollOperationState
} from "../keyVaultCertificatePoller";

/**
 * Deprecated: Public representation of the recover delete certificate poll operation
 */
export type RecoverDeletedCertificateState = KeyVaultCertificatePollOperationState<
  KeyVaultCertificateWithPolicy
>;

/**
 * An interface representing the state of a recover delete certificate poll operation
 */
export interface RecoverDeletedCertificatePollOperationState
  extends KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy> {}

/**
 * An interface representing a delete certificate's poll operation
 */
export class RecoverDeletedCertificatePollOperation extends KeyVaultCertificatePollOperation<
  RecoverDeletedCertificatePollOperationState,
  KeyVaultCertificateWithPolicy
> {
  constructor(
    public state: RecoverDeletedCertificatePollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Canceling the deletion of a certificate is not supported." });
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   */
  private async getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("getCertificate", requestOptions);

    let result: GetCertificateResponse;

    try {
      result = await this.client.getCertificate(
        this.vaultUrl,
        certificateName,
        "",
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result);
  }

  /**
   * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
   * requires the certificate/recover permission.
   */
  private async recoverDeletedCertificate(
    certificateName: string,
    options: RecoverDeletedCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("recoverDeletedCertificate", requestOptions);

    let result: RecoverDeletedCertificateResponse;

    try {
      result = await this.client.recoverDeletedCertificate(
        this.vaultUrl,
        certificateName,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result._response.parsedBody);
  }

  /**
   * Reaches to the service and updates the delete certificate's poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: RecoverDeletedCertificatePollOperationState) => void;
    } = {}
  ): Promise<RecoverDeletedCertificatePollOperation> {
    const state = this.state;
    const { certificateName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      try {
        state.result = await this.getCertificate(certificateName, this.requestOptions);
        state.isCompleted = true;
      } catch (e) {
        // getCertificate will only work once the LRO is completed.
      }
      if (!state.isCompleted) {
        state.result = await this.recoverDeletedCertificate(certificateName, this.requestOptions);
        state.isStarted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getCertificate(certificateName, this.requestOptions);
        state.isCompleted = true;
      } catch (error) {
        if (error.statusCode === 403) {
          // At this point, the resource exists but the user doesn't have access to it.
          state.isCompleted = true;
        } else if (error.statusCode !== 404) {
          state.error = error;
          state.isCompleted = true;
        }
      }
    }

    return this;
  }
}
