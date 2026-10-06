// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * as types from "./types.js";
export { DeletedManagedHsm } from "./deleted-managed-hsm.js";
export { DeletedVault } from "./deleted-vault.js";
export {
  ManagedHsm,
  type ManagedHsmProps,
  ManagedHsmKey,
  type ManagedHsmKeyProps,
  KeyVaultManagedHsmKey,
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
  VaultPrivateEndpointConnection,
  type VaultPrivateEndpointConnectionProps,
  Secret,
  type SecretProps,
} from "./key-vault.js";
