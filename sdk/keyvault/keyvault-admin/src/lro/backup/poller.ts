// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BackupPollOperation, BackupOperationState, BackupPollOperationState } from "./operation";
import { KeyVaultAdminPollerOptions, KeyVaultAdminPoller } from "../keyVaultAdminPoller";
import { BackupResult } from "../../backupClientModels";
import { createTraceFunction } from "../../../../keyvault-common/src";

export interface BackupPollerOptions extends KeyVaultAdminPollerOptions {
  blobStorageUri: string;
  sasToken: string;
}

/**
 * @internal
 */
export const withTrace = createTraceFunction("Azure.KeyVault.Admin.BackupPoller");

/**
 * Class that creates a poller that waits until the backup of a Key Vault ends up being generated.
 */
export class BackupPoller extends KeyVaultAdminPoller<BackupOperationState, BackupResult> {
  constructor(options: BackupPollerOptions) {
    const {
      client,
      vaultUrl,
      blobStorageUri,
      sasToken,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: BackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new BackupPollOperation(
      {
        ...state,
        blobStorageUri,
        sasToken
      },
      vaultUrl,
      client,
      requestOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
