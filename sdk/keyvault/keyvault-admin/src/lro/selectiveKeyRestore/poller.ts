// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  KeyVaultSelectiveKeyRestorePollOperation,
  KeyVaultSelectiveKeyRestoreOperationState,
  KeyVaultSelectiveKeyRestorePollOperationState
} from "./operation";
import { KeyVaultAdminPollerOptions, KeyVaultAdminPoller } from "../keyVaultAdminPoller";
import { KeyVaultSelectiveKeyRestoreResult } from "../../backupClientModels";
import { createTraceFunction } from "../../../../keyvault-common/src";

export interface KeyVaultSelectiveKeyRestorePollerOptions extends KeyVaultAdminPollerOptions {
  keyName: string;
  folderUri: string;
  sasToken: string;
  folderName: string;
}

/**
 * @internal
 */
export const withTrace = createTraceFunction(
  "Azure.KeyVault.Admin.KeyVaultSelectiveKeyRestorePoller"
);

/**
 * Class that creates a poller that waits until a key of a Key Vault backup ends up being restored.
 */
export class KeyVaultSelectiveKeyRestorePoller extends KeyVaultAdminPoller<
  KeyVaultSelectiveKeyRestoreOperationState,
  KeyVaultSelectiveKeyRestoreResult
> {
  constructor(options: KeyVaultSelectiveKeyRestorePollerOptions) {
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

    let state: KeyVaultSelectiveKeyRestorePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new KeyVaultSelectiveKeyRestorePollOperation(
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
