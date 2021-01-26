// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { operationOptionsToRequestOptionsBase, RequestOptionsBase } from "@azure/core-http";
import { DeletedSecret, DeleteSecretOptions, GetDeletedSecretOptions } from "../../secretsModels";
import {
  KeyVaultSecretPollOperation,
  KeyVaultSecretPollOperationState
} from "../keyVaultSecretPoller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientDeleteSecretResponse,
  KeyVaultClientGetDeletedSecretResponse
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../../../keyvault-common/src";
import { getSecretFromSecretBundle } from "../../transformations";

/**
 * An interface representing the state of a delete secret's poll operation
 */
export interface DeleteSecretPollOperationState
  extends KeyVaultSecretPollOperationState<DeletedSecret> {}

/**
 * An interface representing a delete secret's poll operation
 */
export class DeleteSecretPollOperation extends KeyVaultSecretPollOperation<
  DeleteSecretPollOperationState,
  DeletedSecret
> {
  constructor(
    public state: DeleteSecretPollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Canceling the deletion of a secret is not supported." });
  }

  /**
   * Sends a delete request for the given Key Vault Key's name to the Key Vault service.
   * Since the Key Vault Key won't be immediately deleted, we have {@link beginDeleteKey}.
   */
  private async deleteSecret(
    name: string,
    options: DeleteSecretOptions = {}
  ): Promise<DeletedSecret> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("generatedClient.deleteKey", requestOptions);

    let response: KeyVaultClientDeleteSecretResponse;
    try {
      response = await this.client.deleteSecret(
        this.vaultUrl,
        name,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getSecretFromSecretBundle(response);
  }

  /**
   * The getDeletedSecret method returns the specified deleted secret along with its properties.
   * This operation requires the secrets/get permission.
   */
  private async getDeletedSecret(
    name: string,
    options: GetDeletedSecretOptions = {}
  ): Promise<DeletedSecret> {
    const responseOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("generatedClient.getDeletedSecret", responseOptions);

    let response: KeyVaultClientGetDeletedSecretResponse;
    try {
      response = await this.client.getDeletedSecret(
        this.vaultUrl,
        name,
        setParentSpan(span, responseOptions)
      );
    } finally {
      span.end();
    }

    return getSecretFromSecretBundle(response);
  }

  /**
   * Reaches to the service and updates the delete secret's poll operation.
   */
  public async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: DeleteSecretPollOperationState) => void;
    } = {}
  ): Promise<DeleteSecretPollOperation> {
    const state = this.state;
    const { name } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const deletedSecret = await this.deleteSecret(name, this.requestOptions);
      state.isStarted = true;
      state.result = deletedSecret;
      if (!deletedSecret.properties.recoveryId) {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getDeletedSecret(name, this.requestOptions);
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
