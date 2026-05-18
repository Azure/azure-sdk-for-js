// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolgRhxXW/result/src/api/index.ts
export type { KeyVaultContext, KeyVaultClientOptionalParams } from "./keyVaultContext.js";
export { createKeyVault } from "./keyVaultContext.js";
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolgRhxXW/base/sdk/keyvault/keyvault-keys/generated/api/index.ts
export {
  createKeyVault,
  KeyVaultContext,
  KeyVaultClientOptionalParams,
} from "./keyVaultContext.js";
=======
export {
  createKeyVault,
  type KeyVaultContext,
  type KeyVaultClientOptionalParams,
} from "./keyVaultContext.js";
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolgRhxXW/custom/sdk/keyvault/keyvault-keys/src/api/index.ts
export {
  getKeyAttestation,
  getRandomBytes,
  updateKeyRotationPolicy,
  getKeyRotationPolicy,
  recoverDeletedKey,
  purgeDeletedKey,
  getDeletedKey,
  getDeletedKeys,
  release,
  unwrapKey,
  secureUnwrapKey,
  secureWrapKey,
  wrapKey,
  verify,
  sign,
  decrypt,
  encrypt,
  restoreKey,
  backupKey,
  getKeys,
  getKeyVersions,
  getKey,
  updateKey,
  deleteKey,
  importKey,
  rotateKey,
  createKey,
} from "./operations.js";
export type {
  GetKeyAttestationOptionalParams,
  GetRandomBytesOptionalParams,
  UpdateKeyRotationPolicyOptionalParams,
  GetKeyRotationPolicyOptionalParams,
  RecoverDeletedKeyOptionalParams,
  PurgeDeletedKeyOptionalParams,
  GetDeletedKeyOptionalParams,
  GetDeletedKeysOptionalParams,
  ReleaseOptionalParams,
  UnwrapKeyOptionalParams,
  SecureUnwrapKeyOptionalParams,
  SecureWrapKeyOptionalParams,
  WrapKeyOptionalParams,
  VerifyOptionalParams,
  SignOptionalParams,
  DecryptOptionalParams,
  EncryptOptionalParams,
  RestoreKeyOptionalParams,
  BackupKeyOptionalParams,
  GetKeysOptionalParams,
  GetKeyVersionsOptionalParams,
  GetKeyOptionalParams,
  UpdateKeyOptionalParams,
  DeleteKeyOptionalParams,
  ImportKeyOptionalParams,
  RotateKeyOptionalParams,
  CreateKeyOptionalParams,
} from "./options.js";
