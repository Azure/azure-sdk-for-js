// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SelectiveRestorePollOperation,
  SelectiveRestoreOperationState,
  SelectiveRestorePollOperationState
} from "./operation";
import { KeyVaultAdminPollerOptions, KeyVaultAdminPoller } from "../keyVaultAdminPoller";
import { RestoreResult } from "../../backupClientModels";
import { createTraceFunction } from "../../../../keyvault-common/src";

export interface SelectiveRestorePollerOptions extends KeyVaultAdminPollerOptions {
  keyName: string;
  blobStorageUri: string;
  sasToken: string;
  folderName: string;
}

/**
 * @internal
 */
export const withTrace = createTraceFunction("Azure.KeyVault.Admin.SelectiveRestorePoller");

/**
 * Class that creates a poller that waits until a key of a Key Vault backup ends up being restored.
 */
export class SelectiveRestorePoller extends KeyVaultAdminPoller<
  SelectiveRestoreOperationState,
  RestoreResult
> {
  constructor(options: SelectiveRestorePollerOptions) {
    const {
      client,
      vaultUrl,
      keyName,
      blobStorageUri,
      sasToken,
      folderName,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: SelectiveRestorePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new SelectiveRestorePollOperation(
      {
        ...state,
        keyName,
        blobStorageUri,
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
