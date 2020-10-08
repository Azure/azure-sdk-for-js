// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultKey, KeyClientInterface } from "../../keysModels";
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
    private client: KeyClientInterface,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, "Canceling the recovery of a deleted key is not supported.");
  }

  /**
   * @summary Reaches to the service and updates the delete key's poll operation.
   * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
   */
  public async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: RecoverDeletedKeyPollOperationState) => void;
    } = {}
  ): Promise<RecoverDeletedKeyPollOperation> {
    const state = this.state;
    const { name } = state;

    const requestOptions = this.requestOptions;
    if (options.abortSignal) {
      requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      try {
        state.result = await this.client.getKey(name, { requestOptions });
        state.isCompleted = true;
      } catch {
        // Nothing to do here.
      }
      if (!state.isCompleted) {
        state.result = await this.client.recoverDeletedKey(name, { requestOptions });
        state.isStarted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.client.getKey(name, { requestOptions });
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

    return new RecoverDeletedKeyPollOperation(state, this.client, this.requestOptions);
  }
}
