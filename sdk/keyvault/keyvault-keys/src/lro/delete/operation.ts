// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { RequestOptionsBase } from "@azure/core-http";
import { DeletedKey, KeyClientInterface } from "../../keysModels";
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
    private client: KeyClientInterface,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, "Canceling the deletion of a key is not supported.");
  }

  /**
   * @summary Reaches to the service and updates the delete key's poll operation.
   * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
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
      const deletedKey = await this.client.deleteKey(name, this.requestOptions);
      state.isStarted = true;
      state.result = deletedKey;
      if (!deletedKey.properties.recoveryId) {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.client.getDeletedKey(name, {
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

    return new DeleteKeyPollOperation(state, this.client, this.requestOptions);
  }
}
