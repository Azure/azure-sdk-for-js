// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions } from "@azure/core-http";
import {
  GetCertificateOptions,
  KeyVaultCertificateWithPolicy,
  RecoverDeletedCertificateOptions,
} from "../../certificatesModels";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { tracingClient } from "../../tracing";
import { getCertificateWithPolicyFromCertificateBundle } from "../../transformations";
import {
  KeyVaultCertificatePollOperation,
  KeyVaultCertificatePollOperationState,
} from "../keyVaultCertificatePoller";

/**
 * Deprecated: Public representation of the recovery of a deleted certificate poll operation
 */
export type RecoverDeletedCertificateState =
  KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy>;

/**
 * An interface representing the recovery of a deleted certificate's poll operation
 */
export class RecoverDeletedCertificatePollOperation extends KeyVaultCertificatePollOperation<
  RecoverDeletedCertificateState,
  KeyVaultCertificateWithPolicy
> {
  constructor(
    public state: RecoverDeletedCertificateState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private operationOptions: OperationOptions = {}
  ) {
    super(state, {
      cancelMessage: "Canceling the recovery of a deleted certificate is not supported.",
    });
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   */
  private getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    return tracingClient.withSpan(
      "RecoverDeletedCertificatePoller.getCertificate",
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
   * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
   * requires the certificate/recover permission.
   */
  private recoverDeletedCertificate(
    certificateName: string,
    options: RecoverDeletedCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    return tracingClient.withSpan(
      "RecoverDeletedCertificatePoller.recoverDeletedCertificate",
      options,
      async (updatedOptions) => {
        const result = await this.client.recoverDeletedCertificate(
          this.vaultUrl,
          certificateName,
          updatedOptions
        );
        return getCertificateWithPolicyFromCertificateBundle(result._response.parsedBody);
      }
    );
  }

  /**
   * Reaches to the service and updates the poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: RecoverDeletedCertificateState) => void;
    } = {}
  ): Promise<RecoverDeletedCertificatePollOperation> {
    const state = this.state;
    const { certificateName } = state;

    if (options.abortSignal) {
      this.operationOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      try {
        state.result = await this.getCertificate(certificateName, this.operationOptions);
        state.isCompleted = true;
      } catch (e: any) {
        // getCertificate will only work once the LRO is completed.
      }
      if (!state.isCompleted) {
        state.result = await this.recoverDeletedCertificate(certificateName, this.operationOptions);
        state.isStarted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getCertificate(certificateName, this.operationOptions);
        state.isCompleted = true;
      } catch (error: any) {
        if (error.statusCode === 403) {
          // At this point, the resource exists but the user doesn't have access to it.
          state.isCompleted = true;
        } else if (error.statusCode !== 404) {
          state.error = error;
          state.isCompleted = true;
          throw error;
        }
      }
    }

    return this;
  }
}
