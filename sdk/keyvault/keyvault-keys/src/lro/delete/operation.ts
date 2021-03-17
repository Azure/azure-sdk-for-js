// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientDeleteKeyResponse,
  KeyVaultClientGetDeletedKeyResponse
} from "../../generated/models";
import { DeletedKey, DeleteKeyOptions, GetDeletedKeyOptions } from "../../keysModels";
import { createSpan } from "../../tracing";
import { getKeyFromKeyBundle } from "../../transformations";
import { KeyVaultKeyPollOperation, KeyVaultKeyPollOperationState } from "../keyVaultKeyPoller";

/**
 * An interface representing the state of a delete key's poll operation
 */
export interface DeleteKeyPollOperationState extends KeyVaultKeyPollOperationState<DeletedKey> {}

export class DeleteKeyPollOperation extends KeyVaultKeyPollOperation<
  DeleteKeyPollOperationState,
  DeletedKey
> {
  constructor(
    public state: DeleteKeyPollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Canceling the deletion of a key is not supported." });
  }

  /**
   * Sends a delete request for the given Key Vault Key's name to the Key Vault service.
   * Since the Key Vault Key won't be immediately deleted, we have {@link beginDeleteKey}.
   */
  private async deleteKey(name: string, options: DeleteKeyOptions = {}): Promise<DeletedKey> {
    const { span, updatedOptions } = createSpan("generatedClient.deleteKey", options);

    let response: KeyVaultClientDeleteKeyResponse;
    try {
      response = await this.client.deleteKey(this.vaultUrl, name, updatedOptions);
    } finally {
      span.end();
    }

    return getKeyFromKeyBundle(response);
  }

  /**
   * The getDeletedKey method returns the specified deleted key along with its properties.
   * This operation requires the keys/get permission.
   */
  private async getDeletedKey(
    name: string,
    options: GetDeletedKeyOptions = {}
  ): Promise<DeletedKey> {
    const { span, updatedOptions } = createSpan("generatedClient.getDeletedKey", options);

    let response: KeyVaultClientGetDeletedKeyResponse;
    try {
      response = await this.client.getDeletedKey(this.vaultUrl, name, updatedOptions);
    } finally {
      span.end();
    }

    return getKeyFromKeyBundle(response);
  }

  /**
   * Reaches to the service and updates the delete key's poll operation.
   */
  public async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: DeleteKeyPollOperationState) => void;
    } = {}
  ): Promise<DeleteKeyPollOperation> {
    const state = this.state;
    const { name } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const deletedKey = await this.deleteKey(name, this.requestOptions);
      state.isStarted = true;
      state.result = deletedKey;
      if (!deletedKey.properties.recoveryId) {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getDeletedKey(name, {
          requestOptions: this.requestOptions
        });
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
