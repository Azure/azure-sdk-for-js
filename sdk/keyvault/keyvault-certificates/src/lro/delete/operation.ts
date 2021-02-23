// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { operationOptionsToRequestOptionsBase, RequestOptionsBase } from "@azure/core-http";
import {
  DeleteCertificateOptions,
  DeletedCertificate,
  GetDeletedCertificateOptions
} from "../../certificatesModels";
import {
  KeyVaultCertificatePollOperation,
  KeyVaultCertificatePollOperationState
} from "../keyVaultCertificatePoller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { getDeletedCertificateFromDeletedCertificateBundle } from "../../transformations";
import {
  KeyVaultClientDeleteCertificateResponse,
  KeyVaultClientGetDeletedCertificateResponse
} from "../../generated/models";
import { createSpan } from "../../tracing";

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
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Canceling the deletion of a certificate is not supported." });
  }

  /**
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate. This operation requires the certificates/delete permission.
   */
  private async deleteCertificate(
    certificateName: string,
    options: DeleteCertificateOptions = {}
  ): Promise<DeletedCertificate> {
    const { span, updatedOptions } = createSpan("generatedClient.deleteCertificate", options);

    let response: KeyVaultClientDeleteCertificateResponse;
    try {
      response = await this.client.deleteCertificate(
        this.vaultUrl,
        certificateName,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getDeletedCertificateFromDeletedCertificateBundle(response);
  }

  /**
   * Retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the
   * current deletion recovery level. This operation requires the certificates/get permission.
   */
  public async getDeletedCertificate(
    certificateName: string,
    options: GetDeletedCertificateOptions = {}
  ): Promise<DeletedCertificate> {
    const { span, updatedOptions } = createSpan("generatedClient.getDeletedCertificate", options);

    let result: KeyVaultClientGetDeletedCertificateResponse;
    try {
      result = await this.client.getDeletedCertificate(
        this.vaultUrl,
        certificateName,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getDeletedCertificateFromDeletedCertificateBundle(result._response.parsedBody);
  }

  /**
   * Reaches to the service and updates the delete certificate's poll operation.
   */
  async update(
    this: DeleteCertificatePollOperation,
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: DeleteCertificatePollOperationState) => void;
    } = {}
  ): Promise<DeleteCertificatePollOperation> {
    const state = this.state;
    const { certificateName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const deletedCertificate = await this.deleteCertificate(certificateName, this.requestOptions);
      state.isStarted = true;
      state.result = deletedCertificate;
      if (!deletedCertificate.recoveryId) {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getDeletedCertificate(certificateName, this.requestOptions);
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
