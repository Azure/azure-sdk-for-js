// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyVaultKeyPoller, KeyVaultKeyPollerOptions } from "../keyVaultKeyPoller";
import { RecoverDeletedKeyPollOperation, RecoverDeletedKeyPollOperationState } from "./operation";
import { KeyVaultKey } from "../../keysModels";

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
        name
      },
      vaultUrl,
      client,
      operationOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
