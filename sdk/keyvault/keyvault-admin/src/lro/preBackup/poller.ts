// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyVaultAdminPoller, KeyVaultAdminPollerOptions } from "../keyVaultAdminPoller";
import {
  KeyVaultPreBackupOperationState,
  KeyVaultPreBackupPollOperation,
  KeyVaultPreBackupPollOperationState,
} from "./operation";
import { KeyVaultBackupResult } from "../../backupClientModels";

export interface KeyVaultPreBackupPollerOptions extends KeyVaultAdminPollerOptions {
  blobStorageUri: string;
  sasToken?: string;
}

/**
 * Class that creates a poller that waits until the backup of a Key Vault ends up being generated.
 */
export class KeyVaultPreBackupPoller extends KeyVaultAdminPoller<
  KeyVaultPreBackupOperationState,
  KeyVaultBackupResult
> {
  constructor(options: KeyVaultPreBackupPollerOptions) {
    const {
      client,
      vaultUrl,
      blobStorageUri,
      sasToken,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom,
    } = options;

    let state: KeyVaultPreBackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new KeyVaultPreBackupPollOperation(
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
