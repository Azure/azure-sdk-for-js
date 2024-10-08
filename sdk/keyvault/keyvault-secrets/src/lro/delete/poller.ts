// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeleteSecretPollOperation, DeleteSecretPollOperationState } from "./operation.js";
import { DeletedSecret } from "../../secretsModels.js";
import { KeyVaultSecretPoller, KeyVaultSecretPollerOptions } from "../keyVaultSecretPoller.js";

/**
 * Class that creates a poller that waits until a secret finishes being deleted.
 */
export class DeleteSecretPoller extends KeyVaultSecretPoller<
  DeleteSecretPollOperationState,
  DeletedSecret
> {
  constructor(options: KeyVaultSecretPollerOptions) {
    const { vaultUrl, client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: DeleteSecretPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new DeleteSecretPollOperation(
      {
        ...state,
        name,
      },
      vaultUrl,
      client,
      operationOptions,
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
