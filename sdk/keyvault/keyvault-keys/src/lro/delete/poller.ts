// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeleteKeyPollOperation, DeleteKeyPollOperationState } from "./operation";
import { DeletedKey } from "../../keysModels";
import { KeyVaultKeyPoller, KeyVaultKeyPollerOptions } from "../keyVaultKeyPoller";
import { createTraceFunction } from "../../../../keyvault-common/src";

/**
 * @internal
 */
export const withTrace = createTraceFunction("Azure.KeyVault.Keys.DeleteKeyPoller");

/**
 * Class that creates a poller that waits until a key finishes being deleted.
 */
export class DeleteKeyPoller extends KeyVaultKeyPoller<DeleteKeyPollOperationState, DeletedKey> {
  constructor(options: KeyVaultKeyPollerOptions) {
    const { vaultUrl, client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: DeleteKeyPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new DeleteKeyPollOperation(
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
