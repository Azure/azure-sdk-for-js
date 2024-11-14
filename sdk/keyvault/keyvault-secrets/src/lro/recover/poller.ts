// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoverDeletedSecretPollOperationState } from "./operation.js";
import { RecoverDeletedSecretPollOperation } from "./operation.js";
import type { SecretProperties } from "../../secretsModels.js";
import type { KeyVaultSecretPollerOptions } from "../keyVaultSecretPoller.js";
import { KeyVaultSecretPoller } from "../keyVaultSecretPoller.js";

/**
 * Class that deletes a poller that waits until a secret finishes being deleted
 */
export class RecoverDeletedSecretPoller extends KeyVaultSecretPoller<
  RecoverDeletedSecretPollOperationState,
  SecretProperties
> {
  constructor(options: KeyVaultSecretPollerOptions) {
    const { vaultUrl, client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RecoverDeletedSecretPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new RecoverDeletedSecretPollOperation(
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
