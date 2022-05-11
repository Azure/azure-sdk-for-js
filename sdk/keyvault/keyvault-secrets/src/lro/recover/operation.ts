// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  DeletedSecret,
  GetSecretOptions,
  KeyVaultSecret,
  SecretProperties,
} from "../../secretsModels";
import {
  KeyVaultSecretPollOperation,
  KeyVaultSecretPollOperationState,
} from "../keyVaultSecretPoller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { getSecretFromSecretBundle } from "../../transformations";
import { OperationOptions } from "@azure/core-http";
import { tracingClient } from "../../tracing";

/**
 * An interface representing the state of a delete secret's poll operation
 */
export interface RecoverDeletedSecretPollOperationState
  extends KeyVaultSecretPollOperationState<SecretProperties> {}

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
    private options: OperationOptions = {}
  ) {
    super(state, { cancelMessage: "Canceling the recovery of a deleted secret is not supported." });
  }

  /**
   * The getSecret method returns the specified secret along with its properties.
   * This operation requires the secrets/get permission.
   */
  private getSecret(name: string, options: GetSecretOptions = {}): Promise<KeyVaultSecret> {
    return tracingClient.withSpan(
      "RecoverDeletedSecretPoller.getSecret",
      options,
      async (updatedOptions) => {
        const response = await this.client.getSecret(
          this.vaultUrl,
          name,
          options && options.version ? options.version : "",
          updatedOptions
        );
        return getSecretFromSecretBundle(response);
      }
    );
  }

  /**
   * The recoverDeletedSecret method recovers the specified deleted secret along with its properties.
   * This operation requires the secrets/recover permission.
   */
  private recoverDeletedSecret(
    name: string,
    options: GetSecretOptions = {}
  ): Promise<DeletedSecret> {
    return tracingClient.withSpan(
      "RecoverDeletedSecretPoller.recoverDeletedSecret",
      options,
      async (updatedOptions) => {
        const response = await this.client.recoverDeletedSecret(
          this.vaultUrl,
          name,
          updatedOptions
        );
        return getSecretFromSecretBundle(response);
      }
    );
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
      this.options.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      try {
        state.result = (await this.getSecret(name, this.options)).properties;
        state.isCompleted = true;
      } catch {
        // Nothing to do here.
      }
      if (!state.isCompleted) {
        state.result = (await this.recoverDeletedSecret(name, this.options)).properties;
        state.isStarted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = (await this.getSecret(name, this.options)).properties;
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
