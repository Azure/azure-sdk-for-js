// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { RequestOptionsBase } from "@azure/core-http";
import {
  DeletedSecret,
  GetSecretOptions,
  KeyVaultSecret,
  SecretProperties
} from "../../secretsModels";
import {
  KeyVaultSecretPollOperation,
  KeyVaultSecretPollOperationState
} from "../keyVaultSecretPoller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { createSpan } from "../../../../keyvault-common/src";
import { KeyVaultClientGetSecretResponse } from "../../generated/models";
import { getSecretFromSecretBundle } from "../../transformations";

/**
 * An interface representing the state of a delete secret's poll operation
 */
export interface RecoverDeletedSecretPollOperationState
  extends KeyVaultSecretPollOperationState<SecretProperties> { }

/**
 * An interface representing a delete secret's poll operation
 */
export class RecoverDeletedSecretPollOperation extends KeyVaultSecretPollOperation<
  RecoverDeletedSecretPollOperationState,
  SecretProperties
> {
  constructor(
    public state: RecoverDeletedSecretPollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Canceling the recovery of a deleted secret is not supported." });
  }

  /**
   * The getSecret method returns the specified secret along with its properties.
   * This operation requires the secrets/get permission.
   */
  private async getSecret(name: string, options: GetSecretOptions = {}): Promise<KeyVaultSecret> {
    const { span, updatedOptions } = createSpan("generatedClient.getSecret", options);

    let response: KeyVaultClientGetSecretResponse;
    try {
      response = await this.client.getSecret(
        this.vaultUrl,
        name,
        options && options.version ? options.version : "",
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getSecretFromSecretBundle(response);
  }

  /**
   * The recoverDeletedSecret method recovers the specified deleted secret along with its properties.
   * This operation requires the secrets/recover permission.
   */
  private async recoverDeletedSecret(
    name: string,
    options: GetSecretOptions = {}
  ): Promise<DeletedSecret> {
    const { span, updatedOptions } = createSpan("generatedClient.recoverDeletedSecret", options);

    let response: KeyVaultClientGetSecretResponse;
    try {
      response = await this.client.recoverDeletedSecret(
        this.vaultUrl,
        name,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return getSecretFromSecretBundle(response);
  }

  /**
   * Reaches to the service and updates the delete secret's poll operation.
   */
  async update(
    this: RecoverDeletedSecretPollOperation,
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: RecoverDeletedSecretPollOperationState) => void;
    } = {}
  ): Promise<RecoverDeletedSecretPollOperation> {
    const state = this.state;
    const { name } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      try {
        state.result = (await this.getSecret(name, this.requestOptions)).properties;
        state.isCompleted = true;
      } catch {
        // Nothing to do here.
      }
      if (!state.isCompleted) {
        state.result = (await this.recoverDeletedSecret(name, this.requestOptions)).properties;
        state.isStarted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = (await this.getSecret(name, this.requestOptions)).properties;
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
