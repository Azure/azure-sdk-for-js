// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyVaultAdminPoller, KeyVaultAdminPollerOptions } from "../keyVaultAdminPoller";
import {
  KeyVaultPreRestoreOperationState,
  KeyVaultPreRestorePollOperation,
  KeyVaultPreRestorePollOperationState,
} from "./operation";
import { KeyVaultRestoreResult } from "../../backupClientModels";

export interface KeyVaultPreRestorePollerOptions extends KeyVaultAdminPollerOptions {
  folderUri: string;
  sasToken?: string;
  folderName?: string;
}

/**
 * Class that creates a poller for the pre-restore operation.
 */
export class KeyVaultPreRestorePoller extends KeyVaultAdminPoller<
  KeyVaultPreRestoreOperationState,
  KeyVaultRestoreResult
> {
  constructor(options: KeyVaultPreRestorePollerOptions) {
    const {
      client,
      vaultUrl,
      folderUri,
      sasToken,
      folderName,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom,
    } = options;

    let state: KeyVaultPreRestorePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new KeyVaultPreRestorePollOperation(
      {
        ...state,
        folderUri,
        sasToken,
        folderName,
      },
      vaultUrl,
      client,
      requestOptions,
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
