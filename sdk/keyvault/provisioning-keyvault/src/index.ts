// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * as types from "./types.js";
export { DeletedManagedHsm, type DeletedManagedHsmProps } from "./deleted-managed-hsm.js";
export { DeletedVault, type DeletedVaultProps } from "./deleted-vault.js";
export {
  ManagedHsm,
  type ManagedHsmProps,
  ManagedHsmKey,
  type ManagedHsmKeyProps,
  KeyVaultManagedHsmKey,
  type KeyVaultManagedHsmKeyProps,
  ManagedHsmPrivateEndpointConnection,
  type ManagedHsmPrivateEndpointConnectionProps,
} from "./managed-hsm.js";
export {
  KeyVault,
  type KeyVaultProps,
  AccessPolicy,
  type AccessPolicyProps,
  VaultKey,
  type VaultKeyProps,
  Version,
  type VersionProps,
  VaultPrivateEndpointConnection,
  type VaultPrivateEndpointConnectionProps,
  Secret,
  type SecretProps,
} from "./key-vault.js";
