// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { KeyVaultClient } from "./keyVaultClient.js";
export type {
  SecretSetParameters,
  SecretAttributes,
  DeletionRecoveryLevel,
  SecretBundle,
  KeyVaultError,
  ErrorModel,
  DeletedSecretBundle,
  SecretUpdateParameters,
  SecretItem,
  DeletedSecretItem,
  BackupSecretResult,
  SecretRestoreParameters,
  ContentType,
} from "./models/index.js";
export { KnownDeletionRecoveryLevel, KnownContentType, KnownVersions } from "./models/index.js";
export type {
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
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
