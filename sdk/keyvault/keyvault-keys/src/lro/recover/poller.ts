// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoverDeletedKeyPollOperationState } from "./operation.js";
import { RecoverDeletedKeyPollOperation } from "./operation.js";
import type { KeyVaultKey } from "../../keysModels.js";
import type { KeyVaultKeyPollerOptions } from "../keyVaultKeyPoller.js";
import { KeyVaultKeyPoller } from "../keyVaultKeyPoller.js";

/**
 * Class that deletes a poller that waits until a key finishes being deleted
 */
export class RecoverDeletedKeyPoller extends KeyVaultKeyPoller<
  RecoverDeletedKeyPollOperationState,
  KeyVaultKey
> {
  constructor(options: KeyVaultKeyPollerOptions) {
    const { vaultUrl, client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RecoverDeletedKeyPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new RecoverDeletedKeyPollOperation(
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
