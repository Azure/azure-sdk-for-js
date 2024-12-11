// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { KeyVaultClient } from "./keyVaultClient.js";
export {
  SecretSetParameters,
  SecretAttributes,
  SecretBundle,
  KeyVaultError,
  ErrorModel,
  DeletedSecretBundle,
  SecretUpdateParameters,
  SecretItem,
  DeletedSecretItem,
  BackupSecretResult,
  SecretRestoreParameters,
  KnownVersions,
  KnownDeletionRecoveryLevel,
  DeletionRecoveryLevel,
} from "./models/index.js";
export {
  KeyVaultClientOptionalParams,
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
} from "./api/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
