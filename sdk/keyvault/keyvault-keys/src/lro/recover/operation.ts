// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { KeyVaultKey, GetKeyOptions, RecoverDeletedKeyOptions } from "../../keysModels";
import { tracingClient } from "../../tracing";
import { getKeyFromKeyBundle } from "../../transformations";
import { KeyVaultKeyPollOperation, KeyVaultKeyPollOperationState } from "../keyVaultKeyPoller";

/**
 * An interface representing the state of a delete key's poll operation
 */
export interface RecoverDeletedKeyPollOperationState
  extends KeyVaultKeyPollOperationState<KeyVaultKey> {}

export class RecoverDeletedKeyPollOperation extends KeyVaultKeyPollOperation<
  RecoverDeletedKeyPollOperationState,
  KeyVaultKey
> {
  constructor(
    public state: RecoverDeletedKeyPollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private operationOptions: OperationOptions = {}
  ) {
    super(state, { cancelMessage: "Canceling the recovery of a deleted key is not supported." });
  }

  /**
   * The getKey method gets a specified key and is applicable to any key stored in Azure Key Vault.
   * This operation requires the keys/get permission.
   */
  private getKey(name: string, options: GetKeyOptions = {}): Promise<KeyVaultKey> {
    return tracingClient.withSpan(
      "RecoverDeleteKeyPoller.getKey",
      options,
      async (updatedOptions) => {
        const response = await this.client.getKey(
          this.vaultUrl,
          name,
          updatedOptions?.version || "",
          updatedOptions
        );
        return getKeyFromKeyBundle(response);
      }
    );
  }

  /**
   * Sends a request to recover a deleted Key Vault Key based on the given name.
   * Since the Key Vault Key won't be immediately recover the deleted key, we have {@link beginRecoverDeletedKey}.
   */
  private async recoverDeletedKey(
    name: string,
    options: RecoverDeletedKeyOptions = {}
  ): Promise<KeyVaultKey> {
    return tracingClient.withSpan(
      "RecoverDeletedKeyPoller.recoverDeleteKey",
      options,
      async (updatedOptions) => {
        const response = await this.client.recoverDeletedKey(this.vaultUrl, name, updatedOptions);
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
      fireProgress?: (state: RecoverDeletedKeyPollOperationState) => void;
    } = {}
  ): Promise<RecoverDeletedKeyPollOperation> {
    const state = this.state;
    const { name } = state;

    const operationOptions = this.operationOptions;
    if (options.abortSignal) {
      operationOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      try {
        state.result = await this.getKey(name, operationOptions);
        state.isCompleted = true;
      } catch {
        // Nothing to do here.
      }
      if (!state.isCompleted) {
        state.result = await this.recoverDeletedKey(name, operationOptions);
        state.isStarted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getKey(name, operationOptions);
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
