// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationOptions } from "@azure-rest/core-client";
import type {
  DeleteCertificateOptions,
  DeletedCertificate,
  GetDeletedCertificateOptions,
} from "../../certificatesModels.js";
import type { KeyVaultCertificatePollOperationState } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePollOperation } from "../keyVaultCertificatePoller.js";
import type { KeyVaultClient } from "../../keyVaultClient.js";
import { getDeletedCertificateFromDeletedCertificateBundle } from "../../transformations.js";
import { tracingClient } from "../../tracing.js";

/**
 * The public representation of the DeleteCertificatePoller operation state.
 */
export type DeleteCertificateState = KeyVaultCertificatePollOperationState<DeletedCertificate>;

/**
 * An interface representing the state of a delete certificate's poll operation
 */
export interface DeleteCertificatePollOperationState
  extends KeyVaultCertificatePollOperationState<DeletedCertificate> {}

/**
 * An interface representing a delete certificate's poll operation
 */
export class DeleteCertificatePollOperation extends KeyVaultCertificatePollOperation<
  DeleteCertificatePollOperationState,
  DeletedCertificate
> {
  constructor(
    public state: DeleteCertificatePollOperationState,
    private client: KeyVaultClient,
    private operationOptions: OperationOptions = {},
  ) {
    super(state, { cancelMessage: "Canceling the deletion of a certificate is not supported." });
  }

  /**
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate. This operation requires the certificates/delete permission.
   */
  private deleteCertificate(
    certificateName: string,
    options: DeleteCertificateOptions = {},
  ): Promise<DeletedCertificate> {
    return tracingClient.withSpan(
      "DeleteCertificatePoller.deleteCertificate",
      options,
      async (updatedOptions) => {
        const response = await this.client.deleteCertificate(certificateName, updatedOptions);
        return getDeletedCertificateFromDeletedCertificateBundle(response);
      },
    );
  }

  /**
   * Retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the
   * current deletion recovery level. This operation requires the certificates/get permission.
   */
  public async getDeletedCertificate(
    certificateName: string,
    options: GetDeletedCertificateOptions = {},
  ): Promise<DeletedCertificate> {
    return tracingClient.withSpan(
      "DeleteCertificatePoller.getDeletedCertificate",
      options,
      async (updatedOptions) => {
        const response = await this.client.getDeletedCertificate(certificateName, updatedOptions);
        return getDeletedCertificateFromDeletedCertificateBundle(response);
      },
    );
  }

  /**
   * Reaches to the service and updates the delete certificate's poll operation.
   */
  async update(
    this: DeleteCertificatePollOperation,
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: DeleteCertificatePollOperationState) => void;
    } = {},
  ): Promise<DeleteCertificatePollOperation> {
    const state = this.state;
    const { certificateName } = state;

    if (options.abortSignal) {
      this.operationOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const deletedCertificate = await this.deleteCertificate(
        certificateName,
        this.operationOptions,
      );
      state.isStarted = true;
      state.result = deletedCertificate;
      if (!deletedCertificate.recoveryId) {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getDeletedCertificate(certificateName, this.operationOptions);
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
