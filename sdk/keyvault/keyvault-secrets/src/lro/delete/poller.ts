// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeleteSecretPollOperationState } from "./operation.js";
import { DeleteSecretPollOperation } from "./operation.js";
import type { DeletedSecret } from "../../secretsModels.js";
import type { KeyVaultSecretPollerOptions } from "../keyVaultSecretPoller.js";
import { KeyVaultSecretPoller } from "../keyVaultSecretPoller.js";

/**
 * Class that creates a poller that waits until a secret finishes being deleted.
 */
export class DeleteSecretPoller extends KeyVaultSecretPoller<
  DeleteSecretPollOperationState,
  DeletedSecret
> {
  constructor(options: KeyVaultSecretPollerOptions) {
    const { client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: DeleteSecretPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new DeleteSecretPollOperation(
      {
        ...state,
        name,
      },
      client,
      operationOptions,
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
