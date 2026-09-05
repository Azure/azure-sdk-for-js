// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { DeletedManagedHsm } from "./deleted-managed-hsm.js";
export { DeletedVault } from "./deleted-vault.js";
export {
  ManagedHsm,
  type ManagedHsmProps,
  ManagedHSMKey,
  type ManagedHSMKeyProps,
  KeyVaultManagedHsmKey,
  ManagedHSMPrivateEndpointConnection,
  type ManagedHSMPrivateEndpointConnectionProps,
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
export * from "./types.js";
