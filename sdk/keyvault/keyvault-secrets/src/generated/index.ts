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
  KnownDeletionRecoveryLevel,
  DeletionRecoveryLevel,
  SecretBundle,
  KeyVaultError,
  ErrorModel,
  ErrorModel_1,
  DeletedSecretBundle,
  SecretUpdateParameters,
  SecretItem,
  DeletedSecretItem,
  BackupSecretResult,
  SecretRestoreParameters,
  KnownVersions,
} from "./models/index.js";
export {
  KeyVaultClientOptionalParams,
  RestoreSecretOptionalParams,
  BackupSecretOptionalParams,
  RecoverDeletedSecretOptionalParams,
  PurgeDeletedSecretOptionalParams,
  GetDeletedSecretOptionalParams,
  GetDeletedSecretsOptionalParams,
  GetSecretVersionsOptionalParams,
  GetSecretsOptionalParams,
  GetSecretOptionalParams,
  UpdateSecretOptionalParams,
  DeleteSecretOptionalParams,
  SetSecretOptionalParams,
} from "./api/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
