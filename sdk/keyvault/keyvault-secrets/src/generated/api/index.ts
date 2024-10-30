// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createKeyVault,
  KeyVaultContext,
  KeyVaultClientOptionalParams,
} from "./keyVaultContext.js";
export {
  setSecret,
  deleteSecret,
  updateSecret,
  getSecret,
  getSecrets,
  getSecretVersions,
  getDeletedSecrets,
  getDeletedSecret,
  purgeDeletedSecret,
  recoverDeletedSecret,
  backupSecret,
  restoreSecret,
} from "./operations.js";
