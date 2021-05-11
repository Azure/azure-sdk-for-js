// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RestorePollOperation,
  RestoreOperationState,
  RestorePollOperationState
} from "./operation";
import { KeyVaultAdminPollerOptions, KeyVaultAdminPoller } from "../keyVaultAdminPoller";
import { RestoreResult } from "../../backupClientModels";
import { createTraceFunction } from "../../../../keyvault-common/src";

export interface RestorePollerOptions extends KeyVaultAdminPollerOptions {
  folderUri: string;
  sasToken: string;
  folderName: string;
}

/**
 * @internal
 */
export const withTrace = createTraceFunction("Azure.KeyVault.Admin.RestorePoller");

/**
 * Class that creates a poller that waits until a Key Vault ends up being restored.
 */
export class RestorePoller extends KeyVaultAdminPoller<RestoreOperationState, RestoreResult> {
  constructor(options: RestorePollerOptions) {
    const {
      client,
      vaultUrl,
      folderUri,
      sasToken,
      folderName,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: RestorePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new RestorePollOperation(
      {
        ...state,
        folderUri,
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
