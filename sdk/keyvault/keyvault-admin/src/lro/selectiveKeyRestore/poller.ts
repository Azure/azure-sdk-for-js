// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  KeyVaultSelectiveRestorePollOperation,
  KeyVaultSelectiveRestoreOperationState,
  KeyVaultSelectiveRestorePollOperationState
} from "./operation";
import { KeyVaultAdminPollerOptions, KeyVaultAdminPoller } from "../keyVaultAdminPoller";
import { KeyVaultSelectiveKeyRestoreResult } from "../../backupClientModels";
import { createTraceFunction } from "../../../../keyvault-common/src";

export interface KeyVaultSelectiveRestorePollerOptions extends KeyVaultAdminPollerOptions {
  keyName: string;
  folderUri: string;
  sasToken: string;
  folderName: string;
}

/**
 * @internal
 */
export const withTrace = createTraceFunction("Azure.KeyVault.Admin.KeyVaultSelectiveRestorePoller");

/**
 * Class that creates a poller that waits until a key of a Key Vault backup ends up being restored.
 */
export class KeyVaultSelectiveKeyRestorePoller extends KeyVaultAdminPoller<
  KeyVaultSelectiveRestoreOperationState,
  KeyVaultSelectiveKeyRestoreResult
> {
  constructor(options: KeyVaultSelectiveRestorePollerOptions) {
    const {
      client,
      vaultUrl,
      keyName,
      folderUri,
      sasToken,
      folderName,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: KeyVaultSelectiveRestorePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new KeyVaultSelectiveRestorePollOperation(
      {
        ...state,
        keyName,
        folderUri: folderUri,
        sasToken,
        folderName
      },
      vaultUrl,
      client,
      requestOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
