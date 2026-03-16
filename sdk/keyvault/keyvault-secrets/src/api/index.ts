// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createKeyVault,
  type KeyVaultContext,
  type KeyVaultClientOptionalParams,
} from "./keyVaultContext.js";
export {
  restoreSecret,
  backupSecret,
  recoverDeletedSecret,
  purgeDeletedSecret,
  getDeletedSecret,
  getDeletedSecrets,
  getSecretVersions,
  getSecrets,
  getSecret,
  updateSecret,
  deleteSecret,
  setSecret,
} from "./operations.js";
export type {
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
} from "./options.js";
