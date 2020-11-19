// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { operationOptionsToRequestOptionsBase, RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { GetKeyResponse, RecoverDeletedKeyResponse } from "../../generated/models";
import { KeyVaultKey, GetKeyOptions, RecoverDeletedKeyOptions } from "../../keysModels";
import { createSpan, setParentSpan } from "../../tracing";
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
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Canceling the recovery of a deleted key is not supported." });
  }

  /**
   * The getKey method gets a specified key and is applicable to any key stored in Azure Key Vault.
   * This operation requires the keys/get permission.
   * @summary Get a specified key from a given key vault.
   * @param {string} name The name of the key.
   * @param {GetKeyOptions} [options] The optional parameters.
   */
  private async getKey(name: string, options: GetKeyOptions = {}): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("getKey", requestOptions);

    let response: GetKeyResponse;
    try {
      response = await this.client.getKey(
        this.vaultUrl,
        name,
        options && options.version ? options.version : "",
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getKeyFromKeyBundle(response);
  }

  /**
   * Sends a request to recover a deleted Key Vault Key based on the given name.
   * Since the Key Vault Key won't be immediately recover the deleted key, we have {@link beginRecoverDeletedKey}.
   * @param {string} name The name of the Key Vault Key.
   * @param {RecoverDeletedKeyOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async recoverDeletedKey(
    name: string,
    options: RecoverDeletedKeyOptions = {}
  ): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("recoverDeletedKey", requestOptions);

    let response: RecoverDeletedKeyResponse;
    try {
      response = await this.client.recoverDeletedKey(
        this.vaultUrl,
        name,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getKeyFromKeyBundle(response);
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
        state.result = await this.getKey(name, { requestOptions });
        state.isCompleted = true;
      } catch {
        // Nothing to do here.
      }
      if (!state.isCompleted) {
        state.result = await this.recoverDeletedKey(name, { requestOptions });
        state.isStarted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getKey(name, { requestOptions });
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
