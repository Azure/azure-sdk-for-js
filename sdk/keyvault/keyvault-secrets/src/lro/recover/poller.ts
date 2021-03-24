// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RecoverDeletedSecretPollOperation,
  RecoverDeletedSecretPollOperationState
} from "./operation";
import { SecretProperties } from "../../secretsModels";
import { KeyVaultSecretPoller, KeyVaultSecretPollerOptions } from "../keyVaultSecretPoller";
import {
  createTraceFunction,
  TracedFunction
} from "../../../../keyvault-common/src/tracingHelpers";

/**
 * Class that deletes a poller that waits until a secret finishes being deleted
 */
export class RecoverDeletedSecretPoller extends KeyVaultSecretPoller<
  RecoverDeletedSecretPollOperationState,
  SecretProperties
> {
  constructor(options: KeyVaultSecretPollerOptions) {
    const { vaultUrl, client, name, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RecoverDeletedSecretPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new RecoverDeletedSecretPollOperation(
      {
        ...state,
        name
      },
      vaultUrl,
      client,
      requestOptions
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}

export const withTrace: TracedFunction = createTraceFunction(
  "Azure.KeyVault.Certificates.RecoverDeletedSecretPoller"
);
