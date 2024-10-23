// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export {
  KeyVaultClient,
  KeyVaultClientOptionalParams,
} from "./keyVaultClient.js";
export {
  SecretSetParameters,
  SecretAttributes,
  DeletionRecoveryLevel,
  SecretBundle,
  DeletedSecretBundle,
  SecretUpdateParameters,
  SecretItem,
  DeletedSecretItem,
  BackupSecretResult,
  SecretRestoreParameters,
  Versions,
  KeyVaultError,
  ErrorModel,
  SetSecretOptionalParams,
  DeleteSecretOptionalParams,
  UpdateSecretOptionalParams,
  GetSecretOptionalParams,
  GetSecretsOptionalParams,
  GetSecretVersionsOptionalParams,
  GetDeletedSecretsOptionalParams,
  GetDeletedSecretOptionalParams,
  PurgeDeletedSecretOptionalParams,
  RecoverDeletedSecretOptionalParams,
  BackupSecretOptionalParams,
  RestoreSecretOptionalParams,
} from "./models/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
