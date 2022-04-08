// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { DeletedKey, DeleteKeyOptions, GetDeletedKeyOptions } from "../../keysModels";
import { tracingClient } from "../../tracing";
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
    private operationOptions: OperationOptions = {}
  ) {
    super(state, { cancelMessage: "Canceling the deletion of a key is not supported." });
  }

  /**
   * Sends a delete request for the given Key Vault Key's name to the Key Vault service.
   * Since the Key Vault Key won't be immediately deleted, we have {@link beginDeleteKey}.
   */
  private deleteKey(name: string, options: DeleteKeyOptions = {}): Promise<DeletedKey> {
    return tracingClient.withSpan("DeleteKeyPoller.deleteKey", options, async (updatedOptions) => {
      const response = await this.client.deleteKey(this.vaultUrl, name, updatedOptions);
      return getKeyFromKeyBundle(response);
    });
  }

  /**
   * The getDeletedKey method returns the specified deleted key along with its properties.
   * This operation requires the keys/get permission.
   */
  private getDeletedKey(name: string, options: GetDeletedKeyOptions = {}): Promise<DeletedKey> {
    return tracingClient.withSpan(
      "DeleteKeyPoller.getDeletedKey",
      options,
      async (updatedOptions) => {
        const response = await this.client.getDeletedKey(this.vaultUrl, name, updatedOptions);
        return getKeyFromKeyBundle(response);
      }
    );
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
      this.operationOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const deletedKey = await this.deleteKey(name, this.operationOptions);
      state.isStarted = true;
      state.result = deletedKey;
      if (!deletedKey.properties.recoveryId) {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getDeletedKey(name, this.operationOptions);
        state.isCompleted = true;
      } catch (error) {
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
