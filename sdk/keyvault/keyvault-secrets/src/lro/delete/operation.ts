// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  DeleteSecretOptions,
  DeletedSecret,
  GetDeletedSecretOptions,
} from "../../secretsModels.js";
import type { KeyVaultSecretPollOperationState } from "../keyVaultSecretPoller.js";
import { KeyVaultSecretPollOperation } from "../keyVaultSecretPoller.js";
import type { KeyVaultClient } from "../../keyVaultClient.js";
import { getSecretFromSecretBundle } from "../../transformations.js";
import type { OperationOptions } from "@azure-rest/core-client";
import { tracingClient } from "../../tracing.js";

/**
 * An interface representing the state of a delete secret's poll operation
 */
export interface DeleteSecretPollOperationState extends KeyVaultSecretPollOperationState<DeletedSecret> {}

/**
 * An interface representing a delete secret's poll operation
 */
export class DeleteSecretPollOperation extends KeyVaultSecretPollOperation<
  DeleteSecretPollOperationState,
  DeletedSecret
> {
  constructor(
    public state: DeleteSecretPollOperationState,
    private client: KeyVaultClient,
    private operationOptions: OperationOptions = {},
  ) {
    super(state, { cancelMessage: "Canceling the deletion of a secret is not supported." });
  }

  /**
   * Sends a delete request for the given Key Vault Key's name to the Key Vault service.
   * Since the Key Vault Key won't be immediately deleted, we have {@link beginDeleteKey}.
   */
  private deleteSecret(name: string, options: DeleteSecretOptions = {}): Promise<DeletedSecret> {
    return tracingClient.withSpan(
      "DeleteSecretPoller.deleteSecret",
      options,
      async (updatedOptions) => {
        const response = await this.client.deleteSecret(name, updatedOptions);
        return getSecretFromSecretBundle(response);
      },
    );
  }

  /**
   * The getDeletedSecret method returns the specified deleted secret along with its properties.
   * This operation requires the secrets/get permission.
   */
  private getDeletedSecret(
    name: string,
    options: GetDeletedSecretOptions = {},
  ): Promise<DeletedSecret> {
    return tracingClient.withSpan(
      "DeleteSecretPoller.getDeletedSecret",
      options,
      async (updatedOptions) => {
        const response = await this.client.getDeletedSecret(name, updatedOptions);
        return getSecretFromSecretBundle(response);
      },
    );
  }

  /**
   * Reaches to the service and updates the delete secret's poll operation.
   */
  public async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: DeleteSecretPollOperationState) => void;
    } = {},
  ): Promise<DeleteSecretPollOperation> {
    const state = this.state;
    const { name } = state;

    if (options.abortSignal) {
      this.operationOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const deletedSecret = await this.deleteSecret(name, this.operationOptions);
      state.isStarted = true;
      state.result = deletedSecret;
      if (!deletedSecret.properties.recoveryId) {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      try {
        state.result = await this.getDeletedSecret(name, this.operationOptions);
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
