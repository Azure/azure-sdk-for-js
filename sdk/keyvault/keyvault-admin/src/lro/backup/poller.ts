// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultAdminPoller, KeyVaultAdminPollerOptions } from "../keyVaultAdminPoller.js";
import {
  KeyVaultBackupOperationState,
  KeyVaultBackupPollOperation,
  KeyVaultBackupPollOperationState,
} from "./operation.js";
import { KeyVaultBackupResult } from "../../backupClientModels.js";

export interface KeyVaultBackupPollerOptions extends KeyVaultAdminPollerOptions {
  blobStorageUri: string;
  sasToken?: string;
}

/**
 * Class that creates a poller that waits until the backup of a Key Vault ends up being generated.
 */
export class KeyVaultBackupPoller extends KeyVaultAdminPoller<
  KeyVaultBackupOperationState,
  KeyVaultBackupResult
> {
  constructor(options: KeyVaultBackupPollerOptions) {
    const {
      client,
      vaultUrl,
      blobStorageUri,
      sasToken,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom,
    } = options;

    let state: KeyVaultBackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new KeyVaultBackupPollOperation(
      {
        ...state,
        blobStorageUri,
        sasToken,
      },
      vaultUrl,
      client,
      requestOptions,
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
