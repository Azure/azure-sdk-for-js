// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createDeferredShape,
  createFlatModelShape,
  createRecordShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * The vault's create mode to indicate whether the vault need to be recovered or not.
 */
export type CreateMode = "recover" | "default";

/**
 * The type of action.
 */
export type KeyRotationPolicyActionType = "rotate" | "notify";

/**
 * SKU name to specify whether the key vault is a standard vault or a premium vault.
 */
export type SkuName = "standard" | "premium";

/**
 * An identity that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID.
 */
export interface AccessPolicyEntry {
  /**
   * Application ID of the client making request on behalf of a principal
   */
  applicationId?: string;
  /**
   * The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies.
   */
  objectId: string;
  /**
   * Permissions the identity has for keys, secrets and certificates.
   */
  permissions: Permissions;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: string;
}

/**
 * Input type for An identity that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID.
 */
export interface AccessPolicyEntryInput extends InputOf<AccessPolicyEntry> {
  /**
   * Application ID of the client making request on behalf of a principal
   */
  applicationId?: ExpressionOrValue<string> | undefined;
  /**
   * The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies.
   */
  objectId: ExpressionOrValue<string>;
  /**
   * Permissions the identity has for keys, secrets and certificates.
   */
  permissions: PermissionsInput;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: ExpressionOrValue<string>;
}

/**
 * View type for An identity that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID.
 */
export type AccessPolicyEntryView = AccessPolicyEntryInput;

export const accessPolicyEntryShape: FlatModelShape = createFlatModelShape({
  applicationId: { armPath: ["applicationId"] },
  objectId: { armPath: ["objectId"] },
  permissions: { armPath: ["permissions"], target: createDeferredShape(() => permissionsShape) },
  tenantId: { armPath: ["tenantId"] },
});

export interface Action {
  /**
   * The type of action.
   */
  type?: KeyRotationPolicyActionType;
}

export interface ActionInput extends InputOf<Action> {
  /**
   * The type of action.
   */
  type?: ExpressionOrValue<KeyRotationPolicyActionType> | undefined;
}

export type ActionView = ActionInput;

export const actionShape: FlatModelShape = createFlatModelShape({
  type: { armPath: ["type"] },
});

/**
 * Properties of the deleted managed HSM.
 */
export interface DeletedManagedHsmProperties {
  /**
   * The deleted date.
   */
  deletionDate?: Date;
  /**
   * The location of the original managed HSM.
   */
  location?: string;
  /**
   * The resource id of the original managed HSM.
   */
  mhsmId?: string;
  /**
   * Purge protection status of the original managed HSM.
   */
  purgeProtectionEnabled?: boolean;
  /**
   * The scheduled purged date.
   */
  scheduledPurgeDate?: Date;
  /**
   * Tags of the original managed HSM.
   */
  tags?: Record<string, string>;
}

/**
 * Input type for Properties of the deleted managed HSM.
 */
export interface DeletedManagedHsmPropertiesInput extends InputOf<DeletedManagedHsmProperties> {}

/**
 * View type for Properties of the deleted managed HSM.
 */
export interface DeletedManagedHsmPropertiesView extends InputOf<DeletedManagedHsmProperties> {
  /**
   * Read-only output: The deleted date.
   */
  readonly deletionDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The location of the original managed HSM.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The resource id of the original managed HSM.
   */
  readonly mhsmId?: Expression<string> | undefined;
  /**
   * Read-only output: Purge protection status of the original managed HSM.
   */
  readonly purgeProtectionEnabled?: Expression<boolean> | undefined;
  /**
   * Read-only output: The scheduled purged date.
   */
  readonly scheduledPurgeDate?: Expression<Date> | undefined;
  /**
   * Read-only output: Tags of the original managed HSM.
   */
  readonly tags?: Expression<Record<string, string>> | undefined;
}

export const deletedManagedHsmPropertiesShape: FlatModelShape = createFlatModelShape({
  deletionDate: { armPath: ["deletionDate"], readOnly: true },
  location: { armPath: ["location"], readOnly: true },
  mhsmId: { armPath: ["mhsmId"], readOnly: true },
  purgeProtectionEnabled: { armPath: ["purgeProtectionEnabled"], readOnly: true },
  scheduledPurgeDate: { armPath: ["scheduledPurgeDate"], readOnly: true },
  tags: { armPath: ["tags"], readOnly: true },
});

/**
 * Properties of the deleted vault.
 */
export interface DeletedVaultProperties {
  /**
   * The deleted date.
   */
  deletionDate?: Date;
  /**
   * The location of the original vault.
   */
  location?: string;
  /**
   * Purge protection status of the original vault.
   */
  purgeProtectionEnabled?: boolean;
  /**
   * The scheduled purged date.
   */
  scheduledPurgeDate?: Date;
  /**
   * Tags of the original vault.
   */
  tags?: Record<string, string>;
  /**
   * The resource id of the original vault.
   */
  vaultId?: string;
}

/**
 * Input type for Properties of the deleted vault.
 */
export interface DeletedVaultPropertiesInput extends InputOf<DeletedVaultProperties> {}

/**
 * View type for Properties of the deleted vault.
 */
export interface DeletedVaultPropertiesView extends InputOf<DeletedVaultProperties> {
  /**
   * Read-only output: The deleted date.
   */
  readonly deletionDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The location of the original vault.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: Purge protection status of the original vault.
   */
  readonly purgeProtectionEnabled?: Expression<boolean> | undefined;
  /**
   * Read-only output: The scheduled purged date.
   */
  readonly scheduledPurgeDate?: Expression<Date> | undefined;
  /**
   * Read-only output: Tags of the original vault.
   */
  readonly tags?: Expression<Record<string, string>> | undefined;
  /**
   * Read-only output: The resource id of the original vault.
   */
  readonly vaultId?: Expression<string> | undefined;
}

export const deletedVaultPropertiesShape: FlatModelShape = createFlatModelShape({
  deletionDate: { armPath: ["deletionDate"], readOnly: true },
  location: { armPath: ["location"], readOnly: true },
  purgeProtectionEnabled: { armPath: ["purgeProtectionEnabled"], readOnly: true },
  scheduledPurgeDate: { armPath: ["scheduledPurgeDate"], readOnly: true },
  tags: { armPath: ["tags"], readOnly: true },
  vaultId: { armPath: ["vaultId"], readOnly: true },
});

/**
 * A rule governing the accessibility of a vault from a specific ip address or ip range.
 */
export interface IpRule {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: string;
}

/**
 * Input type for A rule governing the accessibility of a vault from a specific ip address or ip range.
 */
export interface IpRuleInput extends InputOf<IpRule> {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: ExpressionOrValue<string>;
}

/**
 * View type for A rule governing the accessibility of a vault from a specific ip address or ip range.
 */
export type IpRuleView = IpRuleInput;

export const ipRuleShape: FlatModelShape = createFlatModelShape({
  value: { armPath: ["value"] },
});

/**
 * The object attributes managed by the Azure Key Vault service.
 */
export interface KeyAttributes {
  /**
   * Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  created?: number;
  /**
   * Determines whether or not the object is enabled.
   */
  enabled?: boolean;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: number;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: boolean;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: number;
  /**
   * The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval.
   */
  recoveryLevel?: DeletionRecoveryLevel;
  /**
   * Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  updated?: number;
}

/**
 * Input type for The object attributes managed by the Azure Key Vault service.
 */
export interface KeyAttributesInput extends InputOf<KeyAttributes> {
  /**
   * Determines whether or not the object is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: ExpressionOrValue<number> | undefined;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: ExpressionOrValue<boolean> | undefined;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The object attributes managed by the Azure Key Vault service.
 */
export interface KeyAttributesView extends InputOf<KeyAttributes> {
  /**
   * Read-only output: Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly created?: Expression<number> | undefined;
  /**
   * Determines whether or not the object is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: ExpressionOrValue<number> | undefined;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: ExpressionOrValue<boolean> | undefined;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval.
   */
  readonly recoveryLevel?: Expression<DeletionRecoveryLevel> | undefined;
  /**
   * Read-only output: Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly updated?: Expression<number> | undefined;
}

export const keyAttributesShape: FlatModelShape = createFlatModelShape({
  created: { armPath: ["created"], readOnly: true },
  enabled: { armPath: ["enabled"] },
  expires: { armPath: ["exp"] },
  exportable: { armPath: ["exportable"] },
  notBefore: { armPath: ["nbf"] },
  recoveryLevel: { armPath: ["recoveryLevel"], readOnly: true },
  updated: { armPath: ["updated"], readOnly: true },
});

/**
 * The properties of the key.
 */
export interface KeyProperties {
  /**
   * The attributes of the key.
   */
  attributes?: KeyAttributes;
  /**
   * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256
   */
  curveName?: JsonWebKeyCurveName;
  keyOps?: JsonWebKeyOperation[];
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096.
   */
  keySize?: number;
  /**
   * The URI to retrieve the current version of the key.
   */
  keyUri?: string;
  /**
   * The URI to retrieve the specific version of the key.
   */
  keyUriWithVersion?: string;
  /**
   * The type of the key. For valid values, see JsonWebKeyType.
   */
  kty?: JsonWebKeyType;
  /**
   * Key release policy in response. It will be used for both output and input. Omitted if empty
   */
  releasePolicy?: KeyReleasePolicy;
  /**
   * Key rotation policy in response. It will be used for both output and input. Omitted if empty
   */
  rotationPolicy?: RotationPolicy;
}

/**
 * Input type for The properties of the key.
 */
export interface KeyPropertiesInput extends InputOf<KeyProperties> {
  /**
   * The attributes of the key.
   */
  attributes?: KeyAttributesInput | undefined;
  /**
   * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256
   */
  curveName?: ExpressionOrValue<JsonWebKeyCurveName> | undefined;
  keyOps?: InputArray<ExpressionOrValue<JsonWebKeyOperation>, JsonWebKeyOperation[]> | undefined;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096.
   */
  keySize?: ExpressionOrValue<number> | undefined;
  /**
   * The type of the key. For valid values, see JsonWebKeyType.
   */
  kty?: ExpressionOrValue<JsonWebKeyType> | undefined;
  /**
   * Key release policy in response. It will be used for both output and input. Omitted if empty
   */
  releasePolicy?: KeyReleasePolicyInput | undefined;
  /**
   * Key rotation policy in response. It will be used for both output and input. Omitted if empty
   */
  rotationPolicy?: RotationPolicyInput | undefined;
}

/**
 * View type for The properties of the key.
 */
export interface KeyPropertiesView extends InputOf<KeyProperties> {
  /**
   * The attributes of the key.
   */
  attributes?: KeyAttributesView | undefined;
  /**
   * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256
   */
  curveName?: ExpressionOrValue<JsonWebKeyCurveName> | undefined;
  keyOps?: InputArray<ExpressionOrValue<JsonWebKeyOperation>, JsonWebKeyOperation[]> | undefined;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096.
   */
  keySize?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The URI to retrieve the current version of the key.
   */
  readonly keyUri?: Expression<string> | undefined;
  /**
   * Read-only output: The URI to retrieve the specific version of the key.
   */
  readonly keyUriWithVersion?: Expression<string> | undefined;
  /**
   * The type of the key. For valid values, see JsonWebKeyType.
   */
  kty?: ExpressionOrValue<JsonWebKeyType> | undefined;
  /**
   * Key release policy in response. It will be used for both output and input. Omitted if empty
   */
  releasePolicy?: KeyReleasePolicyView | undefined;
  /**
   * Key rotation policy in response. It will be used for both output and input. Omitted if empty
   */
  rotationPolicy?: RotationPolicyView | undefined;
}

export const keyPropertiesShape: FlatModelShape = createFlatModelShape({
  attributes: { armPath: ["attributes"], target: createDeferredShape(() => keyAttributesShape) },
  curveName: { armPath: ["curveName"] },
  keyOps: { armPath: ["keyOps"] },
  keySize: { armPath: ["keySize"] },
  keyUri: { armPath: ["keyUri"], readOnly: true },
  keyUriWithVersion: { armPath: ["keyUriWithVersion"], readOnly: true },
  kty: { armPath: ["kty"] },
  releasePolicy: {
    armPath: ["release_policy"],
    target: createDeferredShape(() => keyReleasePolicyShape),
  },
  rotationPolicy: {
    armPath: ["rotationPolicy"],
    target: createDeferredShape(() => rotationPolicyShape),
  },
});

export interface KeyReleasePolicy {
  /**
   * Content type and version of key release policy
   */
  contentType?: string;
  /**
   * Blob encoding the policy rules under which the key can be released.
   */
  data?: Uint8Array;
}

export interface KeyReleasePolicyInput extends InputOf<KeyReleasePolicy> {
  /**
   * Content type and version of key release policy
   */
  contentType?: ExpressionOrValue<string> | undefined;
  /**
   * Blob encoding the policy rules under which the key can be released.
   */
  data?: ExpressionOrValue<Uint8Array> | undefined;
}

export type KeyReleasePolicyView = KeyReleasePolicyInput;

export const keyReleasePolicyShape: FlatModelShape = createFlatModelShape({
  contentType: { armPath: ["contentType"] },
  data: {
    armPath: ["data"],
    encoding: { encoding: "base64url", wireKind: "string", sourceKind: "bytes" },
  },
});

export interface KeyRotationPolicyAttributes {
  /**
   * Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  created?: number;
  /**
   * The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'.
   */
  expiryTime?: string;
  /**
   * Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  updated?: number;
}

export interface KeyRotationPolicyAttributesInput extends InputOf<KeyRotationPolicyAttributes> {
  /**
   * The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'.
   */
  expiryTime?: ExpressionOrValue<string> | undefined;
}

export interface KeyRotationPolicyAttributesView extends InputOf<KeyRotationPolicyAttributes> {
  /**
   * Read-only output: Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly created?: Expression<number> | undefined;
  /**
   * The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'.
   */
  expiryTime?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly updated?: Expression<number> | undefined;
}

export const keyRotationPolicyAttributesShape: FlatModelShape = createFlatModelShape({
  created: { armPath: ["created"], readOnly: true },
  expiryTime: { armPath: ["expiryTime"] },
  updated: { armPath: ["updated"], readOnly: true },
});

export interface LifetimeAction {
  /**
   * The action of key rotation policy lifetimeAction.
   */
  action?: Action;
  /**
   * The trigger of key rotation policy lifetimeAction.
   */
  trigger?: Trigger;
}

export interface LifetimeActionInput extends InputOf<LifetimeAction> {
  /**
   * The action of key rotation policy lifetimeAction.
   */
  action?: ActionInput | undefined;
  /**
   * The trigger of key rotation policy lifetimeAction.
   */
  trigger?: TriggerInput | undefined;
}

export type LifetimeActionView = LifetimeActionInput;

export const lifetimeActionShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], target: createDeferredShape(() => actionShape) },
  trigger: { armPath: ["trigger"], target: createDeferredShape(() => triggerShape) },
});

export interface ManagedHsmAction {
  /**
   * The type of action.
   */
  type?: KeyRotationPolicyActionType;
}

export interface ManagedHsmActionInput extends InputOf<ManagedHsmAction> {
  /**
   * The type of action.
   */
  type?: ExpressionOrValue<KeyRotationPolicyActionType> | undefined;
}

export type ManagedHsmActionView = ManagedHsmActionInput;

export const managedHsmActionShape: FlatModelShape = createFlatModelShape({
  type: { armPath: ["type"] },
});

/**
 * The object attributes managed by the Azure Key Vault service.
 */
export interface ManagedHsmKeyAttributes {
  /**
   * Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  created?: number;
  /**
   * Determines whether or not the object is enabled.
   */
  enabled?: boolean;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: number;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: boolean;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: number;
  /**
   * The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval.
   */
  recoveryLevel?: DeletionRecoveryLevel;
  /**
   * Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  updated?: number;
}

/**
 * Input type for The object attributes managed by the Azure Key Vault service.
 */
export interface ManagedHsmKeyAttributesInput extends InputOf<ManagedHsmKeyAttributes> {
  /**
   * Determines whether or not the object is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: ExpressionOrValue<number> | undefined;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: ExpressionOrValue<boolean> | undefined;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The object attributes managed by the Azure Key Vault service.
 */
export interface ManagedHsmKeyAttributesView extends InputOf<ManagedHsmKeyAttributes> {
  /**
   * Read-only output: Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly created?: Expression<number> | undefined;
  /**
   * Determines whether or not the object is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: ExpressionOrValue<number> | undefined;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: ExpressionOrValue<boolean> | undefined;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval.
   */
  readonly recoveryLevel?: Expression<DeletionRecoveryLevel> | undefined;
  /**
   * Read-only output: Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly updated?: Expression<number> | undefined;
}

export const managedHsmKeyAttributesShape: FlatModelShape = createFlatModelShape({
  created: { armPath: ["created"], readOnly: true },
  enabled: { armPath: ["enabled"] },
  expires: { armPath: ["exp"] },
  exportable: { armPath: ["exportable"] },
  notBefore: { armPath: ["nbf"] },
  recoveryLevel: { armPath: ["recoveryLevel"], readOnly: true },
  updated: { armPath: ["updated"], readOnly: true },
});

/**
 * The properties of the key.
 */
export interface ManagedHsmKeyProperties {
  /**
   * The attributes of the key.
   */
  attributes?: ManagedHsmKeyAttributes;
  /**
   * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256
   */
  curveName?: JsonWebKeyCurveName;
  keyOps?: JsonWebKeyOperation[];
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096.
   */
  keySize?: number;
  /**
   * The URI to retrieve the current version of the key.
   */
  keyUri?: string;
  /**
   * The URI to retrieve the specific version of the key.
   */
  keyUriWithVersion?: string;
  /**
   * The type of the key. For valid values, see JsonWebKeyType.
   */
  kty?: JsonWebKeyType;
  /**
   * Key release policy in response. It will be used for both output and input. Omitted if empty
   */
  releasePolicy?: ManagedHsmKeyReleasePolicy;
  /**
   * Key rotation policy in response. It will be used for both output and input. Omitted if empty
   */
  rotationPolicy?: ManagedHsmRotationPolicy;
}

/**
 * Input type for The properties of the key.
 */
export interface ManagedHsmKeyPropertiesInput extends InputOf<ManagedHsmKeyProperties> {
  /**
   * The attributes of the key.
   */
  attributes?: ManagedHsmKeyAttributesInput | undefined;
  /**
   * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256
   */
  curveName?: ExpressionOrValue<JsonWebKeyCurveName> | undefined;
  keyOps?: InputArray<ExpressionOrValue<JsonWebKeyOperation>, JsonWebKeyOperation[]> | undefined;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096.
   */
  keySize?: ExpressionOrValue<number> | undefined;
  /**
   * The type of the key. For valid values, see JsonWebKeyType.
   */
  kty?: ExpressionOrValue<JsonWebKeyType> | undefined;
  /**
   * Key release policy in response. It will be used for both output and input. Omitted if empty
   */
  releasePolicy?: ManagedHsmKeyReleasePolicyInput | undefined;
  /**
   * Key rotation policy in response. It will be used for both output and input. Omitted if empty
   */
  rotationPolicy?: ManagedHsmRotationPolicyInput | undefined;
}

/**
 * View type for The properties of the key.
 */
export interface ManagedHsmKeyPropertiesView extends InputOf<ManagedHsmKeyProperties> {
  /**
   * The attributes of the key.
   */
  attributes?: ManagedHsmKeyAttributesView | undefined;
  /**
   * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256
   */
  curveName?: ExpressionOrValue<JsonWebKeyCurveName> | undefined;
  keyOps?: InputArray<ExpressionOrValue<JsonWebKeyOperation>, JsonWebKeyOperation[]> | undefined;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096.
   */
  keySize?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The URI to retrieve the current version of the key.
   */
  readonly keyUri?: Expression<string> | undefined;
  /**
   * Read-only output: The URI to retrieve the specific version of the key.
   */
  readonly keyUriWithVersion?: Expression<string> | undefined;
  /**
   * The type of the key. For valid values, see JsonWebKeyType.
   */
  kty?: ExpressionOrValue<JsonWebKeyType> | undefined;
  /**
   * Key release policy in response. It will be used for both output and input. Omitted if empty
   */
  releasePolicy?: ManagedHsmKeyReleasePolicyView | undefined;
  /**
   * Key rotation policy in response. It will be used for both output and input. Omitted if empty
   */
  rotationPolicy?: ManagedHsmRotationPolicyView | undefined;
}

export const managedHsmKeyPropertiesShape: FlatModelShape = createFlatModelShape({
  attributes: {
    armPath: ["attributes"],
    target: createDeferredShape(() => managedHsmKeyAttributesShape),
  },
  curveName: { armPath: ["curveName"] },
  keyOps: { armPath: ["keyOps"] },
  keySize: { armPath: ["keySize"] },
  keyUri: { armPath: ["keyUri"], readOnly: true },
  keyUriWithVersion: { armPath: ["keyUriWithVersion"], readOnly: true },
  kty: { armPath: ["kty"] },
  releasePolicy: {
    armPath: ["release_policy"],
    target: createDeferredShape(() => managedHsmKeyReleasePolicyShape),
  },
  rotationPolicy: {
    armPath: ["rotationPolicy"],
    target: createDeferredShape(() => managedHsmRotationPolicyShape),
  },
});

export interface ManagedHsmKeyReleasePolicy {
  /**
   * Content type and version of key release policy
   */
  contentType?: string;
  /**
   * Blob encoding the policy rules under which the key can be released.
   */
  data?: Uint8Array;
}

export interface ManagedHsmKeyReleasePolicyInput extends InputOf<ManagedHsmKeyReleasePolicy> {
  /**
   * Content type and version of key release policy
   */
  contentType?: ExpressionOrValue<string> | undefined;
  /**
   * Blob encoding the policy rules under which the key can be released.
   */
  data?: ExpressionOrValue<Uint8Array> | undefined;
}

export type ManagedHsmKeyReleasePolicyView = ManagedHsmKeyReleasePolicyInput;

export const managedHsmKeyReleasePolicyShape: FlatModelShape = createFlatModelShape({
  contentType: { armPath: ["contentType"] },
  data: {
    armPath: ["data"],
    encoding: { encoding: "base64url", wireKind: "string", sourceKind: "bytes" },
  },
});

export interface ManagedHsmKeyRotationPolicyAttributes {
  /**
   * Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  created?: number;
  /**
   * The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'.
   */
  expiryTime?: string;
  /**
   * Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  updated?: number;
}

export interface ManagedHsmKeyRotationPolicyAttributesInput extends InputOf<ManagedHsmKeyRotationPolicyAttributes> {
  /**
   * The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'.
   */
  expiryTime?: ExpressionOrValue<string> | undefined;
}

export interface ManagedHsmKeyRotationPolicyAttributesView extends InputOf<ManagedHsmKeyRotationPolicyAttributes> {
  /**
   * Read-only output: Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly created?: Expression<number> | undefined;
  /**
   * The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'.
   */
  expiryTime?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly updated?: Expression<number> | undefined;
}

export const managedHsmKeyRotationPolicyAttributesShape: FlatModelShape = createFlatModelShape({
  created: { armPath: ["created"], readOnly: true },
  expiryTime: { armPath: ["expiryTime"] },
  updated: { armPath: ["updated"], readOnly: true },
});

export interface ManagedHsmLifetimeAction {
  /**
   * The action of key rotation policy lifetimeAction.
   */
  action?: ManagedHsmAction;
  /**
   * The trigger of key rotation policy lifetimeAction.
   */
  trigger?: ManagedHsmTrigger;
}

export interface ManagedHsmLifetimeActionInput extends InputOf<ManagedHsmLifetimeAction> {
  /**
   * The action of key rotation policy lifetimeAction.
   */
  action?: ManagedHsmActionInput | undefined;
  /**
   * The trigger of key rotation policy lifetimeAction.
   */
  trigger?: ManagedHsmTriggerInput | undefined;
}

export type ManagedHsmLifetimeActionView = ManagedHsmLifetimeActionInput;

export const managedHsmLifetimeActionShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], target: createDeferredShape(() => managedHsmActionShape) },
  trigger: { armPath: ["trigger"], target: createDeferredShape(() => managedHsmTriggerShape) },
});

/**
 * Properties of the managed HSM Pool
 */
export interface ManagedHsmProperties {
  /**
   * The create mode to indicate whether the resource is being created or is being recovered from a deleted resource.
   */
  createMode?: CreateMode;
  /**
   * Property specifying whether protection against purge is enabled for this managed HSM pool. Setting this property to true activates protection against purge for this managed HSM pool and its content - only the Managed HSM service may initiate a hard, irrecoverable deletion. Enabling this functionality is irreversible.
   */
  enablePurgeProtection?: boolean;
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this managed HSM pool. Soft delete is enabled by default for all managed HSMs and is immutable.
   */
  enableSoftDelete?: boolean;
  /**
   * The URI of the managed hsm pool for performing operations on keys.
   */
  hsmUri?: string;
  /**
   * Array of initial administrators object ids for this managed hsm pool.
   */
  initialAdminObjectIds?: string[];
  /**
   * Rules governing the accessibility of the key vault from specific network locations.
   */
  networkAcls?: MhsmNetworkRuleSet;
  /**
   * List of private endpoint connections associated with the managed hsm pool.
   */
  privateEndpointConnections?: MhsmPrivateEndpointConnectionItem[];
  /**
   * Control permission to the managed HSM from public networks.
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /**
   * List of all regions associated with the managed hsm pool.
   */
  regions?: MhsmGeoReplicatedRegion[];
  /**
   * The scheduled purge date in UTC.
   */
  scheduledPurgeDate?: Date;
  /**
   * Managed HSM security domain properties.
   */
  securityDomainProperties?: ManagedHsmSecurityDomainProperties;
  /**
   * Soft deleted data retention days. When you delete an HSM or a key, it will remain recoverable for the configured retention period or for a default period of 90 days. It accepts values between 7 and 90.
   */
  softDeleteRetentionInDays?: number;
  /**
   * Resource Status Message.
   */
  statusMessage?: string;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the managed HSM pool.
   */
  tenantId?: string;
}

/**
 * Input type for Properties of the managed HSM Pool
 */
export interface ManagedHsmPropertiesInput extends InputOf<ManagedHsmProperties> {
  /**
   * The create mode to indicate whether the resource is being created or is being recovered from a deleted resource.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Property specifying whether protection against purge is enabled for this managed HSM pool. Setting this property to true activates protection against purge for this managed HSM pool and its content - only the Managed HSM service may initiate a hard, irrecoverable deletion. Enabling this functionality is irreversible.
   */
  enablePurgeProtection?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this managed HSM pool. Soft delete is enabled by default for all managed HSMs and is immutable.
   */
  enableSoftDelete?: ExpressionOrValue<boolean> | undefined;
  /**
   * Array of initial administrators object ids for this managed hsm pool.
   */
  initialAdminObjectIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Rules governing the accessibility of the key vault from specific network locations.
   */
  networkAcls?: MhsmNetworkRuleSetInput | undefined;
  /**
   * Control permission to the managed HSM from public networks.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * List of all regions associated with the managed hsm pool.
   */
  regions?: InputArray<MhsmGeoReplicatedRegionInput, MhsmGeoReplicatedRegion[]> | undefined;
  /**
   * Soft deleted data retention days. When you delete an HSM or a key, it will remain recoverable for the configured retention period or for a default period of 90 days. It accepts values between 7 and 90.
   */
  softDeleteRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the managed HSM pool.
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of the managed HSM Pool
 */
export interface ManagedHsmPropertiesView extends InputOf<ManagedHsmProperties> {
  /**
   * The create mode to indicate whether the resource is being created or is being recovered from a deleted resource.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Property specifying whether protection against purge is enabled for this managed HSM pool. Setting this property to true activates protection against purge for this managed HSM pool and its content - only the Managed HSM service may initiate a hard, irrecoverable deletion. Enabling this functionality is irreversible.
   */
  enablePurgeProtection?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this managed HSM pool. Soft delete is enabled by default for all managed HSMs and is immutable.
   */
  enableSoftDelete?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The URI of the managed hsm pool for performing operations on keys.
   */
  readonly hsmUri?: Expression<string> | undefined;
  /**
   * Array of initial administrators object ids for this managed hsm pool.
   */
  initialAdminObjectIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Rules governing the accessibility of the key vault from specific network locations.
   */
  networkAcls?: MhsmNetworkRuleSetView | undefined;
  /**
   * Read-only output: List of private endpoint connections associated with the managed hsm pool.
   */
  readonly privateEndpointConnections?: Expression<MhsmPrivateEndpointConnectionItem[]> | undefined;
  /**
   * Control permission to the managed HSM from public networks.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * List of all regions associated with the managed hsm pool.
   */
  regions?: InputArray<MhsmGeoReplicatedRegionView, MhsmGeoReplicatedRegion[]> | undefined;
  /**
   * Read-only output: The scheduled purge date in UTC.
   */
  readonly scheduledPurgeDate?: Expression<Date> | undefined;
  /**
   * Read-only output: Managed HSM security domain properties.
   */
  readonly securityDomainProperties?: Expression<ManagedHsmSecurityDomainProperties> | undefined;
  /**
   * Soft deleted data retention days. When you delete an HSM or a key, it will remain recoverable for the configured retention period or for a default period of 90 days. It accepts values between 7 and 90.
   */
  softDeleteRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Resource Status Message.
   */
  readonly statusMessage?: Expression<string> | undefined;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the managed HSM pool.
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

export const managedHsmPropertiesShape: FlatModelShape = createFlatModelShape({
  createMode: { armPath: ["createMode"] },
  enablePurgeProtection: { armPath: ["enablePurgeProtection"] },
  enableSoftDelete: { armPath: ["enableSoftDelete"] },
  hsmUri: { armPath: ["hsmUri"], readOnly: true },
  initialAdminObjectIds: { armPath: ["initialAdminObjectIds"] },
  networkAcls: {
    armPath: ["networkAcls"],
    target: createDeferredShape(() => mhsmNetworkRuleSetShape),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    target: createArrayShape(createDeferredShape(() => mhsmPrivateEndpointConnectionItemShape)),
    readOnly: true,
  },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"] },
  regions: {
    armPath: ["regions"],
    target: createArrayShape(createDeferredShape(() => mhsmGeoReplicatedRegionShape)),
  },
  scheduledPurgeDate: { armPath: ["scheduledPurgeDate"], readOnly: true },
  securityDomainProperties: {
    armPath: ["securityDomainProperties"],
    target: createDeferredShape(() => managedHsmSecurityDomainPropertiesShape),
    readOnly: true,
  },
  softDeleteRetentionInDays: { armPath: ["softDeleteRetentionInDays"] },
  statusMessage: { armPath: ["statusMessage"], readOnly: true },
  tenantId: { armPath: ["tenantId"] },
});

export interface ManagedHsmRotationPolicy {
  /**
   * The attributes of key rotation policy.
   */
  attributes?: ManagedHsmKeyRotationPolicyAttributes;
  /**
   * The lifetimeActions for key rotation action.
   */
  lifetimeActions?: ManagedHsmLifetimeAction[];
}

export interface ManagedHsmRotationPolicyInput extends InputOf<ManagedHsmRotationPolicy> {
  /**
   * The attributes of key rotation policy.
   */
  attributes?: ManagedHsmKeyRotationPolicyAttributesInput | undefined;
  /**
   * The lifetimeActions for key rotation action.
   */
  lifetimeActions?:
    InputArray<ManagedHsmLifetimeActionInput, ManagedHsmLifetimeAction[]> | undefined;
}

export interface ManagedHsmRotationPolicyView extends InputOf<ManagedHsmRotationPolicy> {
  /**
   * The attributes of key rotation policy.
   */
  attributes?: ManagedHsmKeyRotationPolicyAttributesView | undefined;
  /**
   * The lifetimeActions for key rotation action.
   */
  lifetimeActions?:
    InputArray<ManagedHsmLifetimeActionView, ManagedHsmLifetimeAction[]> | undefined;
}

export const managedHsmRotationPolicyShape: FlatModelShape = createFlatModelShape({
  attributes: {
    armPath: ["attributes"],
    target: createDeferredShape(() => managedHsmKeyRotationPolicyAttributesShape),
  },
  lifetimeActions: {
    armPath: ["lifetimeActions"],
    target: createArrayShape(createDeferredShape(() => managedHsmLifetimeActionShape)),
  },
});

/**
 * The security domain properties of the managed hsm.
 */
export interface ManagedHsmSecurityDomainProperties {
  /**
   * Activation Status
   */
  activationStatus?: ActivationStatus;
  /**
   * Activation Status Message.
   */
  activationStatusMessage?: string;
}

/**
 * Input type for The security domain properties of the managed hsm.
 */
export interface ManagedHsmSecurityDomainPropertiesInput extends InputOf<ManagedHsmSecurityDomainProperties> {}

/**
 * View type for The security domain properties of the managed hsm.
 */
export interface ManagedHsmSecurityDomainPropertiesView extends InputOf<ManagedHsmSecurityDomainProperties> {
  /**
   * Read-only output: Activation Status
   */
  readonly activationStatus?: Expression<ActivationStatus> | undefined;
  /**
   * Read-only output: Activation Status Message.
   */
  readonly activationStatusMessage?: Expression<string> | undefined;
}

export const managedHsmSecurityDomainPropertiesShape: FlatModelShape = createFlatModelShape({
  activationStatus: { armPath: ["activationStatus"], readOnly: true },
  activationStatusMessage: { armPath: ["activationStatusMessage"], readOnly: true },
});

/**
 * SKU details
 */
export interface ManagedHsmSku {
  /**
   * SKU Family of the managed HSM Pool
   */
  family: ManagedHsmSkuFamily;
  /**
   * SKU of the managed HSM Pool
   */
  name: ManagedHsmSkuNameV2;
}

/**
 * Input type for SKU details
 */
export interface ManagedHsmSkuInput extends InputOf<ManagedHsmSku> {
  /**
   * SKU Family of the managed HSM Pool
   */
  family: ExpressionOrValue<ManagedHsmSkuFamily>;
  /**
   * SKU of the managed HSM Pool
   */
  name: ExpressionOrValue<ManagedHsmSkuNameV2>;
}

/**
 * View type for SKU details
 */
export type ManagedHsmSkuView = ManagedHsmSkuInput;

export const managedHsmSkuShape: FlatModelShape = createFlatModelShape({
  family: { armPath: ["family"] },
  name: { armPath: ["name"] },
});

export interface ManagedHsmTrigger {
  /**
   * The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeAfterCreate?: string;
  /**
   * The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeBeforeExpiry?: string;
}

export interface ManagedHsmTriggerInput extends InputOf<ManagedHsmTrigger> {
  /**
   * The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeAfterCreate?: ExpressionOrValue<string> | undefined;
  /**
   * The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeBeforeExpiry?: ExpressionOrValue<string> | undefined;
}

export type ManagedHsmTriggerView = ManagedHsmTriggerInput;

export const managedHsmTriggerShape: FlatModelShape = createFlatModelShape({
  timeAfterCreate: { armPath: ["timeAfterCreate"] },
  timeBeforeExpiry: { armPath: ["timeBeforeExpiry"] },
});

/**
 * Managed service identity (system assigned and/or user assigned identities)
 */
export interface ManagedServiceIdentity {
  /**
   * The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  principalId?: string;
  /**
   * The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  tenantId?: string;
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ManagedServiceIdentityType;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

/**
 * Input type for Managed service identity (system assigned and/or user assigned identities)
 */
export interface ManagedServiceIdentityInput extends InputOf<ManagedServiceIdentity> {
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ExpressionOrValue<ManagedServiceIdentityType>;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?:
    | InputRecord<
        UserAssignedIdentityInput | ExpressionOrValue<null>,
        Record<string, UserAssignedIdentity | null>
      >
    | undefined;
}

/**
 * View type for Managed service identity (system assigned and/or user assigned identities)
 */
export interface ManagedServiceIdentityView extends InputOf<ManagedServiceIdentity> {
  /**
   * Read-only output: The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ExpressionOrValue<ManagedServiceIdentityType>;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?:
    | InputRecord<
        UserAssignedIdentityView | ExpressionOrValue<null>,
        Record<string, UserAssignedIdentity | null>
      >
    | undefined;
}

export const managedServiceIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], readOnly: true },
  tenantId: { armPath: ["tenantId"], readOnly: true },
  type: { armPath: ["type"] },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    target: createRecordShape(createDeferredShape(() => userAssignedIdentityShape)),
  },
});

/**
 * A region that this managed HSM Pool has been extended to.
 */
export interface MhsmGeoReplicatedRegion {
  /**
   * A boolean value that indicates whether the region is the primary region or a secondary region.
   */
  isPrimary?: boolean;
  /**
   * Name of the geo replicated region.
   */
  name?: string;
}

/**
 * Input type for A region that this managed HSM Pool has been extended to.
 */
export interface MhsmGeoReplicatedRegionInput extends InputOf<MhsmGeoReplicatedRegion> {
  /**
   * A boolean value that indicates whether the region is the primary region or a secondary region.
   */
  isPrimary?: ExpressionOrValue<boolean> | undefined;
  /**
   * Name of the geo replicated region.
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for A region that this managed HSM Pool has been extended to.
 */
export type MhsmGeoReplicatedRegionView = MhsmGeoReplicatedRegionInput;

export const mhsmGeoReplicatedRegionShape: FlatModelShape = createFlatModelShape({
  isPrimary: { armPath: ["isPrimary"] },
  name: { armPath: ["name"] },
});

/**
 * A rule governing the accessibility of a managed HSM pool from a specific IP address or IP range.
 */
export interface MhsmipRule {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: string;
}

/**
 * Input type for A rule governing the accessibility of a managed HSM pool from a specific IP address or IP range.
 */
export interface MhsmipRuleInput extends InputOf<MhsmipRule> {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: ExpressionOrValue<string>;
}

/**
 * View type for A rule governing the accessibility of a managed HSM pool from a specific IP address or IP range.
 */
export type MhsmipRuleView = MhsmipRuleInput;

export const mhsmipRuleShape: FlatModelShape = createFlatModelShape({
  value: { armPath: ["value"] },
});

/**
 * A set of rules governing the network accessibility of a managed hsm pool.
 */
export interface MhsmNetworkRuleSet {
  /**
   * Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'. If not specified the default is 'AzureServices'.
   */
  bypass?: NetworkRuleBypassOptions;
  /**
   * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
   */
  defaultAction?: NetworkRuleAction;
  /**
   * The list of IP address rules.
   */
  ipRules?: MhsmipRule[];
  /**
   * The list of service tags.
   */
  serviceTags?: MhsmServiceTagRule[];
  /**
   * The list of virtual network rules.
   */
  virtualNetworkRules?: MhsmVirtualNetworkRule[];
}

/**
 * Input type for A set of rules governing the network accessibility of a managed hsm pool.
 */
export interface MhsmNetworkRuleSetInput extends InputOf<MhsmNetworkRuleSet> {
  /**
   * Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'. If not specified the default is 'AzureServices'.
   */
  bypass?: ExpressionOrValue<NetworkRuleBypassOptions> | undefined;
  /**
   * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
   */
  defaultAction?: ExpressionOrValue<NetworkRuleAction> | undefined;
  /**
   * The list of IP address rules.
   */
  ipRules?: InputArray<MhsmipRuleInput, MhsmipRule[]> | undefined;
  /**
   * The list of service tags.
   */
  serviceTags?: InputArray<MhsmServiceTagRuleInput, MhsmServiceTagRule[]> | undefined;
  /**
   * The list of virtual network rules.
   */
  virtualNetworkRules?:
    InputArray<MhsmVirtualNetworkRuleInput, MhsmVirtualNetworkRule[]> | undefined;
}

/**
 * View type for A set of rules governing the network accessibility of a managed hsm pool.
 */
export type MhsmNetworkRuleSetView = MhsmNetworkRuleSetInput;

export const mhsmNetworkRuleSetShape: FlatModelShape = createFlatModelShape({
  bypass: { armPath: ["bypass"] },
  defaultAction: { armPath: ["defaultAction"] },
  ipRules: {
    armPath: ["ipRules"],
    target: createArrayShape(createDeferredShape(() => mhsmipRuleShape)),
  },
  serviceTags: {
    armPath: ["serviceTags"],
    target: createArrayShape(createDeferredShape(() => mhsmServiceTagRuleShape)),
  },
  virtualNetworkRules: {
    armPath: ["virtualNetworkRules"],
    target: createArrayShape(createDeferredShape(() => mhsmVirtualNetworkRuleShape)),
  },
});

/**
 * Private endpoint object properties.
 */
export interface MhsmPrivateEndpoint {}

/**
 * Input type for Private endpoint object properties.
 */
export interface MhsmPrivateEndpointInput extends InputOf<MhsmPrivateEndpoint> {}

/**
 * View type for Private endpoint object properties.
 */
export type MhsmPrivateEndpointView = MhsmPrivateEndpointInput;

export const mhsmPrivateEndpointShape: FlatModelShape = createFlatModelShape({});

/**
 * Private endpoint connection item.
 */
export interface MhsmPrivateEndpointConnectionItem {
  /**
   * Private endpoint connection properties.
   */
  properties?: MhsmPrivateEndpointConnectionProperties;
}

/**
 * Input type for Private endpoint connection item.
 */
export interface MhsmPrivateEndpointConnectionItemInput extends InputOf<MhsmPrivateEndpointConnectionItem> {}

/**
 * View type for Private endpoint connection item.
 */
export interface MhsmPrivateEndpointConnectionItemView extends InputOf<MhsmPrivateEndpointConnectionItem> {
  /**
   * Read-only output: Private endpoint connection properties.
   */
  readonly properties?: Expression<MhsmPrivateEndpointConnectionProperties> | undefined;
}

export const mhsmPrivateEndpointConnectionItemShape: FlatModelShape = createFlatModelShape({
  properties: {
    armPath: ["properties"],
    target: createDeferredShape(() => mhsmPrivateEndpointConnectionPropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of the private endpoint connection resource.
 */
export interface MhsmPrivateEndpointConnectionProperties {
  /**
   * Properties of the private endpoint object.
   */
  privateEndpoint?: MhsmPrivateEndpoint;
  /**
   * Approval state of the private link connection.
   */
  privateLinkServiceConnectionState?: MhsmPrivateLinkServiceConnectionState;
}

/**
 * Input type for Properties of the private endpoint connection resource.
 */
export interface MhsmPrivateEndpointConnectionPropertiesInput extends InputOf<MhsmPrivateEndpointConnectionProperties> {
  /**
   * Properties of the private endpoint object.
   */
  privateEndpoint?: MhsmPrivateEndpointInput | undefined;
  /**
   * Approval state of the private link connection.
   */
  privateLinkServiceConnectionState?: MhsmPrivateLinkServiceConnectionStateInput | undefined;
}

/**
 * View type for Properties of the private endpoint connection resource.
 */
export type MhsmPrivateEndpointConnectionPropertiesView =
  MhsmPrivateEndpointConnectionPropertiesInput;

export const mhsmPrivateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    target: createDeferredShape(() => mhsmPrivateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    target: createDeferredShape(() => mhsmPrivateLinkServiceConnectionStateShape),
  },
});

/**
 * An object that represents the approval state of the private link connection.
 */
export interface MhsmPrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ActionsRequired;
  /**
   * The reason for approval or rejection.
   */
  description?: string;
  /**
   * Indicates whether the connection has been approved, rejected or removed by the key vault owner.
   */
  status?: PrivateEndpointServiceConnectionStatus;
}

/**
 * Input type for An object that represents the approval state of the private link connection.
 */
export interface MhsmPrivateLinkServiceConnectionStateInput extends InputOf<MhsmPrivateLinkServiceConnectionState> {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ExpressionOrValue<ActionsRequired> | undefined;
  /**
   * The reason for approval or rejection.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the connection has been approved, rejected or removed by the key vault owner.
   */
  status?: ExpressionOrValue<PrivateEndpointServiceConnectionStatus> | undefined;
}

/**
 * View type for An object that represents the approval state of the private link connection.
 */
export type MhsmPrivateLinkServiceConnectionStateView = MhsmPrivateLinkServiceConnectionStateInput;

export const mhsmPrivateLinkServiceConnectionStateShape: FlatModelShape = createFlatModelShape({
  actionsRequired: { armPath: ["actionsRequired"] },
  description: { armPath: ["description"] },
  status: { armPath: ["status"] },
});

/**
 * A rule governing the accessibility of a managed hsm pool from a specific service tags.
 */
export interface MhsmServiceTagRule {
  /**
   * Name of the service tag.
   */
  tag: string;
}

/**
 * Input type for A rule governing the accessibility of a managed hsm pool from a specific service tags.
 */
export interface MhsmServiceTagRuleInput extends InputOf<MhsmServiceTagRule> {
  /**
   * Name of the service tag.
   */
  tag: ExpressionOrValue<string>;
}

/**
 * View type for A rule governing the accessibility of a managed hsm pool from a specific service tags.
 */
export type MhsmServiceTagRuleView = MhsmServiceTagRuleInput;

export const mhsmServiceTagRuleShape: FlatModelShape = createFlatModelShape({
  tag: { armPath: ["tag"] },
});

/**
 * A rule governing the accessibility of a managed hsm pool from a specific virtual network.
 */
export interface MhsmVirtualNetworkRule {
  /**
   * Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'.
   */
  id: string;
}

/**
 * Input type for A rule governing the accessibility of a managed hsm pool from a specific virtual network.
 */
export interface MhsmVirtualNetworkRuleInput extends InputOf<MhsmVirtualNetworkRule> {
  /**
   * Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'.
   */
  id: ExpressionOrValue<string>;
}

/**
 * View type for A rule governing the accessibility of a managed hsm pool from a specific virtual network.
 */
export type MhsmVirtualNetworkRuleView = MhsmVirtualNetworkRuleInput;

export const mhsmVirtualNetworkRuleShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"] },
});

/**
 * A set of rules governing the network accessibility of a vault.
 */
export interface NetworkRuleSet {
  /**
   * Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'. If not specified the default is 'AzureServices'.
   */
  bypass?: NetworkRuleBypassOptions;
  /**
   * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
   */
  defaultAction?: NetworkRuleAction;
  /**
   * The list of IP address rules.
   */
  ipRules?: IpRule[];
  /**
   * The list of virtual network rules.
   */
  virtualNetworkRules?: VirtualNetworkRule[];
}

/**
 * Input type for A set of rules governing the network accessibility of a vault.
 */
export interface NetworkRuleSetInput extends InputOf<NetworkRuleSet> {
  /**
   * Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'. If not specified the default is 'AzureServices'.
   */
  bypass?: ExpressionOrValue<NetworkRuleBypassOptions> | undefined;
  /**
   * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
   */
  defaultAction?: ExpressionOrValue<NetworkRuleAction> | undefined;
  /**
   * The list of IP address rules.
   */
  ipRules?: InputArray<IpRuleInput, IpRule[]> | undefined;
  /**
   * The list of virtual network rules.
   */
  virtualNetworkRules?: InputArray<VirtualNetworkRuleInput, VirtualNetworkRule[]> | undefined;
}

/**
 * View type for A set of rules governing the network accessibility of a vault.
 */
export type NetworkRuleSetView = NetworkRuleSetInput;

export const networkRuleSetShape: FlatModelShape = createFlatModelShape({
  bypass: { armPath: ["bypass"] },
  defaultAction: { armPath: ["defaultAction"] },
  ipRules: {
    armPath: ["ipRules"],
    target: createArrayShape(createDeferredShape(() => ipRuleShape)),
  },
  virtualNetworkRules: {
    armPath: ["virtualNetworkRules"],
    target: createArrayShape(createDeferredShape(() => virtualNetworkRuleShape)),
  },
});

/**
 * Permissions the identity has for keys, secrets, certificates and storage.
 */
export interface Permissions {
  /**
   * Permissions to certificates
   */
  certificates?: CertificatePermissions[];
  /**
   * Permissions to keys
   */
  keys?: KeyPermissions[];
  /**
   * Permissions to secrets
   */
  secrets?: SecretPermissions[];
  /**
   * Permissions to storage accounts
   */
  storage?: StoragePermissions[];
}

/**
 * Input type for Permissions the identity has for keys, secrets, certificates and storage.
 */
export interface PermissionsInput extends InputOf<Permissions> {
  /**
   * Permissions to certificates
   */
  certificates?:
    InputArray<ExpressionOrValue<CertificatePermissions>, CertificatePermissions[]> | undefined;
  /**
   * Permissions to keys
   */
  keys?: InputArray<ExpressionOrValue<KeyPermissions>, KeyPermissions[]> | undefined;
  /**
   * Permissions to secrets
   */
  secrets?: InputArray<ExpressionOrValue<SecretPermissions>, SecretPermissions[]> | undefined;
  /**
   * Permissions to storage accounts
   */
  storage?: InputArray<ExpressionOrValue<StoragePermissions>, StoragePermissions[]> | undefined;
}

/**
 * View type for Permissions the identity has for keys, secrets, certificates and storage.
 */
export type PermissionsView = PermissionsInput;

export const permissionsShape: FlatModelShape = createFlatModelShape({
  certificates: { armPath: ["certificates"] },
  keys: { armPath: ["keys"] },
  secrets: { armPath: ["secrets"] },
  storage: { armPath: ["storage"] },
});

/**
 * Private endpoint object properties.
 */
export interface PrivateEndpoint {}

/**
 * Input type for Private endpoint object properties.
 */
export interface PrivateEndpointInput extends InputOf<PrivateEndpoint> {}

/**
 * View type for Private endpoint object properties.
 */
export type PrivateEndpointView = PrivateEndpointInput;

export const privateEndpointShape: FlatModelShape = createFlatModelShape({});

/**
 * Private endpoint connection item.
 */
export interface PrivateEndpointConnectionItem {
  /**
   * Private endpoint connection properties.
   */
  properties?: PrivateEndpointConnectionProperties;
}

/**
 * Input type for Private endpoint connection item.
 */
export interface PrivateEndpointConnectionItemInput extends InputOf<PrivateEndpointConnectionItem> {}

/**
 * View type for Private endpoint connection item.
 */
export interface PrivateEndpointConnectionItemView extends InputOf<PrivateEndpointConnectionItem> {
  /**
   * Read-only output: Private endpoint connection properties.
   */
  readonly properties?: Expression<PrivateEndpointConnectionProperties> | undefined;
}

export const privateEndpointConnectionItemShape: FlatModelShape = createFlatModelShape({
  properties: {
    armPath: ["properties"],
    target: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of the private endpoint connection resource.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * Properties of the private endpoint object.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * Approval state of the private link connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

/**
 * Input type for Properties of the private endpoint connection resource.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * Properties of the private endpoint object.
   */
  privateEndpoint?: PrivateEndpointInput | undefined;
  /**
   * Approval state of the private link connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateInput | undefined;
}

/**
 * View type for Properties of the private endpoint connection resource.
 */
export type PrivateEndpointConnectionPropertiesView = PrivateEndpointConnectionPropertiesInput;

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    target: createDeferredShape(() => privateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    target: createDeferredShape(() => privateLinkServiceConnectionStateShape),
  },
});

/**
 * An object that represents the approval state of the private link connection.
 */
export interface PrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ActionsRequired;
  /**
   * The reason for approval or rejection.
   */
  description?: string;
  /**
   * Indicates whether the connection has been approved, rejected or removed by the key vault owner.
   */
  status?: PrivateEndpointServiceConnectionStatus;
}

/**
 * Input type for An object that represents the approval state of the private link connection.
 */
export interface PrivateLinkServiceConnectionStateInput extends InputOf<PrivateLinkServiceConnectionState> {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ExpressionOrValue<ActionsRequired> | undefined;
  /**
   * The reason for approval or rejection.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the connection has been approved, rejected or removed by the key vault owner.
   */
  status?: ExpressionOrValue<PrivateEndpointServiceConnectionStatus> | undefined;
}

/**
 * View type for An object that represents the approval state of the private link connection.
 */
export type PrivateLinkServiceConnectionStateView = PrivateLinkServiceConnectionStateInput;

export const privateLinkServiceConnectionStateShape: FlatModelShape = createFlatModelShape({
  actionsRequired: { armPath: ["actionsRequired"] },
  description: { armPath: ["description"] },
  status: { armPath: ["status"] },
});

export interface RotationPolicy {
  /**
   * The attributes of key rotation policy.
   */
  attributes?: KeyRotationPolicyAttributes;
  /**
   * The lifetimeActions for key rotation action.
   */
  lifetimeActions?: LifetimeAction[];
}

export interface RotationPolicyInput extends InputOf<RotationPolicy> {
  /**
   * The attributes of key rotation policy.
   */
  attributes?: KeyRotationPolicyAttributesInput | undefined;
  /**
   * The lifetimeActions for key rotation action.
   */
  lifetimeActions?: InputArray<LifetimeActionInput, LifetimeAction[]> | undefined;
}

export interface RotationPolicyView extends InputOf<RotationPolicy> {
  /**
   * The attributes of key rotation policy.
   */
  attributes?: KeyRotationPolicyAttributesView | undefined;
  /**
   * The lifetimeActions for key rotation action.
   */
  lifetimeActions?: InputArray<LifetimeActionView, LifetimeAction[]> | undefined;
}

export const rotationPolicyShape: FlatModelShape = createFlatModelShape({
  attributes: {
    armPath: ["attributes"],
    target: createDeferredShape(() => keyRotationPolicyAttributesShape),
  },
  lifetimeActions: {
    armPath: ["lifetimeActions"],
    target: createArrayShape(createDeferredShape(() => lifetimeActionShape)),
  },
});

/**
 * The secret management attributes.
 */
export interface SecretAttributes {
  /**
   * Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  created?: Date;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: Date;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: Date;
  /**
   * Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  updated?: Date;
}

/**
 * Input type for The secret management attributes.
 */
export interface SecretAttributesInput extends InputOf<SecretAttributes> {
  /**
   * Determines whether the object is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: ExpressionOrValue<Date> | undefined;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: ExpressionOrValue<Date> | undefined;
}

/**
 * View type for The secret management attributes.
 */
export interface SecretAttributesView extends InputOf<SecretAttributes> {
  /**
   * Read-only output: Creation time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly created?: Expression<Date> | undefined;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  expires?: ExpressionOrValue<Date> | undefined;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  notBefore?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Last updated time in seconds since 1970-01-01T00:00:00Z.
   */
  readonly updated?: Expression<Date> | undefined;
}

export const secretAttributesShape: FlatModelShape = createFlatModelShape({
  created: {
    armPath: ["created"],
    encoding: { encoding: "unixTimestamp", wireKind: "int", sourceKind: "utcDateTime" },
    readOnly: true,
  },
  enabled: { armPath: ["enabled"] },
  expires: {
    armPath: ["exp"],
    encoding: { encoding: "unixTimestamp", wireKind: "int", sourceKind: "utcDateTime" },
  },
  notBefore: {
    armPath: ["nbf"],
    encoding: { encoding: "unixTimestamp", wireKind: "int", sourceKind: "utcDateTime" },
  },
  updated: {
    armPath: ["updated"],
    encoding: { encoding: "unixTimestamp", wireKind: "int", sourceKind: "utcDateTime" },
    readOnly: true,
  },
});

/**
 * Properties of the secret
 */
export interface SecretProperties {
  /**
   * The attributes of the secret.
   */
  attributes?: SecretAttributes;
  /**
   * The content type of the secret.
   */
  contentType?: string;
  /**
   * The URI to retrieve the current version of the secret.
   */
  secretUri?: string;
  /**
   * The URI to retrieve the specific version of the secret.
   */
  secretUriWithVersion?: string;
  /**
   * The value of the secret. NOTE: 'value' will never be returned from the service, as APIs using this model are is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
   */
  value?: string;
}

/**
 * Input type for Properties of the secret
 */
export interface SecretPropertiesInput extends InputOf<SecretProperties> {
  /**
   * The attributes of the secret.
   */
  attributes?: SecretAttributesInput | undefined;
  /**
   * The content type of the secret.
   */
  contentType?: ExpressionOrValue<string> | undefined;
  /**
   * The value of the secret. NOTE: 'value' will never be returned from the service, as APIs using this model are is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
   */
  value?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of the secret
 */
export interface SecretPropertiesView extends InputOf<SecretProperties> {
  /**
   * The attributes of the secret.
   */
  attributes?: SecretAttributesView | undefined;
  /**
   * The content type of the secret.
   */
  contentType?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The URI to retrieve the current version of the secret.
   */
  readonly secretUri?: Expression<string> | undefined;
  /**
   * Read-only output: The URI to retrieve the specific version of the secret.
   */
  readonly secretUriWithVersion?: Expression<string> | undefined;
  /**
   * The value of the secret. NOTE: 'value' will never be returned from the service, as APIs using this model are is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
   */
  value?: ExpressionOrValue<string> | undefined;
}

export const secretPropertiesShape: FlatModelShape = createFlatModelShape({
  attributes: { armPath: ["attributes"], target: createDeferredShape(() => secretAttributesShape) },
  contentType: { armPath: ["contentType"] },
  secretUri: { armPath: ["secretUri"], readOnly: true },
  secretUriWithVersion: { armPath: ["secretUriWithVersion"], readOnly: true },
  value: { armPath: ["value"] },
});

/**
 * SKU details
 */
export interface Sku {
  /**
   * SKU family name
   */
  family: SkuFamily;
  /**
   * SKU name to specify whether the key vault is a standard vault or a premium vault.
   */
  name: SkuName;
}

/**
 * Input type for SKU details
 */
export interface SkuInput extends InputOf<Sku> {
  /**
   * SKU family name
   */
  family: ExpressionOrValue<SkuFamily>;
  /**
   * SKU name to specify whether the key vault is a standard vault or a premium vault.
   */
  name: ExpressionOrValue<SkuName>;
}

/**
 * View type for SKU details
 */
export type SkuView = SkuInput;

export const skuShape: FlatModelShape = createFlatModelShape({
  family: { armPath: ["family"] },
  name: { armPath: ["name"] },
});

/**
 * Configuration for Token Binding for Entra tokens
 */
export interface TokenBindingParameters {
  /**
   * Must be one of the following values "NoValidation", "Unattested", "AttestedTrustedLaunch", "AttestedConfidential". Strength of the token binding increases with each value in that order.
   */
  minimumTokenBindingStrength?: TokenBindingStrength;
  /**
   * This specifies whether token binding is disabled, enabled or enforced.
   */
  mode?: TokenBindingMode;
}

/**
 * Input type for Configuration for Token Binding for Entra tokens
 */
export interface TokenBindingParametersInput extends InputOf<TokenBindingParameters> {
  /**
   * Must be one of the following values "NoValidation", "Unattested", "AttestedTrustedLaunch", "AttestedConfidential". Strength of the token binding increases with each value in that order.
   */
  minimumTokenBindingStrength?: ExpressionOrValue<TokenBindingStrength> | undefined;
  /**
   * This specifies whether token binding is disabled, enabled or enforced.
   */
  mode?: ExpressionOrValue<TokenBindingMode> | undefined;
}

/**
 * View type for Configuration for Token Binding for Entra tokens
 */
export type TokenBindingParametersView = TokenBindingParametersInput;

export const tokenBindingParametersShape: FlatModelShape = createFlatModelShape({
  minimumTokenBindingStrength: { armPath: ["minimumTokenBindingStrength"] },
  mode: { armPath: ["mode"] },
});

export interface Trigger {
  /**
   * The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeAfterCreate?: string;
  /**
   * The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeBeforeExpiry?: string;
}

export interface TriggerInput extends InputOf<Trigger> {
  /**
   * The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeAfterCreate?: ExpressionOrValue<string> | undefined;
  /**
   * The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeBeforeExpiry?: ExpressionOrValue<string> | undefined;
}

export type TriggerView = TriggerInput;

export const triggerShape: FlatModelShape = createFlatModelShape({
  timeAfterCreate: { armPath: ["timeAfterCreate"] },
  timeBeforeExpiry: { armPath: ["timeBeforeExpiry"] },
});

/**
 * User assigned identity properties
 */
export interface UserAssignedIdentity {
  /**
   * The client ID of the assigned identity.
   */
  clientId?: string;
  /**
   * The principal ID of the assigned identity.
   */
  principalId?: string;
}

/**
 * Input type for User assigned identity properties
 */
export interface UserAssignedIdentityInput extends InputOf<UserAssignedIdentity> {}

/**
 * View type for User assigned identity properties
 */
export interface UserAssignedIdentityView extends InputOf<UserAssignedIdentity> {
  /**
   * Read-only output: The client ID of the assigned identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal ID of the assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userAssignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], readOnly: true },
  principalId: { armPath: ["principalId"], readOnly: true },
});

/**
 * Properties of the vault access policy
 */
export interface VaultAccessPolicyProperties {
  /**
   * An array of 0 to 16 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID.
   */
  accessPolicies: AccessPolicyEntry[];
}

/**
 * Input type for Properties of the vault access policy
 */
export interface VaultAccessPolicyPropertiesInput extends InputOf<VaultAccessPolicyProperties> {
  /**
   * An array of 0 to 16 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID.
   */
  accessPolicies: InputArray<AccessPolicyEntryInput, AccessPolicyEntry[]>;
}

/**
 * View type for Properties of the vault access policy
 */
export type VaultAccessPolicyPropertiesView = VaultAccessPolicyPropertiesInput;

export const vaultAccessPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  accessPolicies: {
    armPath: ["accessPolicies"],
    target: createArrayShape(createDeferredShape(() => accessPolicyEntryShape)),
  },
});

/**
 * Properties of the vault
 */
export interface VaultProperties {
  /**
   * An array of 0 to 1024 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. When `createMode` is set to `recover`, access policies are not required. Otherwise, access policies are required.
   */
  accessPolicies?: AccessPolicyEntry[];
  /**
   * The vault's create mode to indicate whether the vault need to be recovered or not.
   */
  createMode?: CreateMode;
  /**
   * Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.
   */
  enabledForDeployment?: boolean;
  /**
   * Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.
   */
  enabledForDiskEncryption?: boolean;
  /**
   * Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault.
   */
  enabledForTemplateDeployment?: boolean;
  /**
   * Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value.
   */
  enablePurgeProtection?: boolean;
  /**
   * Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value of false. Note that management actions are always authorized with RBAC.
   */
  enableRbacAuthorization?: boolean;
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this key vault. If it's not set to any value(true or false) when creating new key vault, it will be set to true by default. Once set to true, it cannot be reverted to false.
   */
  enableSoftDelete?: boolean;
  /**
   * The resource id of HSM Pool.
   */
  hsmPoolResourceId?: string;
  /**
   * Rules governing the accessibility of the key vault from specific network locations.
   */
  networkAcls?: NetworkRuleSet;
  /**
   * List of private endpoint connections associated with the key vault.
   */
  privateEndpointConnections?: PrivateEndpointConnectionItem[];
  /**
   * Property to specify whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. This will override the set firewall rules, meaning that even if the firewall rules are present we will not honor the rules.
   */
  publicNetworkAccess?: string;
  /**
   * SKU details
   */
  sku: Sku;
  /**
   * softDelete data retention days. It accepts \>=7 and \<=90.
   */
  softDeleteRetentionInDays?: number;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: string;
  /**
   * Configuration for Token Binding for Entra tokens
   */
  tokenBindingParameters?: TokenBindingParameters;
  /**
   * The URI of the vault for performing operations on keys and secrets.
   */
  vaultUri?: string;
}

/**
 * Input type for Properties of the vault
 */
export interface VaultPropertiesInput extends InputOf<VaultProperties> {
  /**
   * An array of 0 to 1024 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. When `createMode` is set to `recover`, access policies are not required. Otherwise, access policies are required.
   */
  accessPolicies?: InputArray<AccessPolicyEntryInput, AccessPolicyEntry[]> | undefined;
  /**
   * The vault's create mode to indicate whether the vault need to be recovered or not.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.
   */
  enabledForDeployment?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.
   */
  enabledForDiskEncryption?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault.
   */
  enabledForTemplateDeployment?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value.
   */
  enablePurgeProtection?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value of false. Note that management actions are always authorized with RBAC.
   */
  enableRbacAuthorization?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this key vault. If it's not set to any value(true or false) when creating new key vault, it will be set to true by default. Once set to true, it cannot be reverted to false.
   */
  enableSoftDelete?: ExpressionOrValue<boolean> | undefined;
  /**
   * Rules governing the accessibility of the key vault from specific network locations.
   */
  networkAcls?: NetworkRuleSetInput | undefined;
  /**
   * Property to specify whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. This will override the set firewall rules, meaning that even if the firewall rules are present we will not honor the rules.
   */
  publicNetworkAccess?: ExpressionOrValue<string> | undefined;
  /**
   * SKU details
   */
  sku: SkuInput;
  /**
   * softDelete data retention days. It accepts \>=7 and \<=90.
   */
  softDeleteRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: ExpressionOrValue<string>;
  /**
   * Configuration for Token Binding for Entra tokens
   */
  tokenBindingParameters?: TokenBindingParametersInput | undefined;
  /**
   * The URI of the vault for performing operations on keys and secrets.
   */
  vaultUri?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of the vault
 */
export interface VaultPropertiesView extends InputOf<VaultProperties> {
  /**
   * An array of 0 to 1024 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. When `createMode` is set to `recover`, access policies are not required. Otherwise, access policies are required.
   */
  accessPolicies?: InputArray<AccessPolicyEntryView, AccessPolicyEntry[]> | undefined;
  /**
   * The vault's create mode to indicate whether the vault need to be recovered or not.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.
   */
  enabledForDeployment?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.
   */
  enabledForDiskEncryption?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault.
   */
  enabledForTemplateDeployment?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value.
   */
  enablePurgeProtection?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value of false. Note that management actions are always authorized with RBAC.
   */
  enableRbacAuthorization?: ExpressionOrValue<boolean> | undefined;
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this key vault. If it's not set to any value(true or false) when creating new key vault, it will be set to true by default. Once set to true, it cannot be reverted to false.
   */
  enableSoftDelete?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The resource id of HSM Pool.
   */
  readonly hsmPoolResourceId?: Expression<string> | undefined;
  /**
   * Rules governing the accessibility of the key vault from specific network locations.
   */
  networkAcls?: NetworkRuleSetView | undefined;
  /**
   * Read-only output: List of private endpoint connections associated with the key vault.
   */
  readonly privateEndpointConnections?: Expression<PrivateEndpointConnectionItem[]> | undefined;
  /**
   * Property to specify whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. This will override the set firewall rules, meaning that even if the firewall rules are present we will not honor the rules.
   */
  publicNetworkAccess?: ExpressionOrValue<string> | undefined;
  /**
   * SKU details
   */
  sku: SkuView;
  /**
   * softDelete data retention days. It accepts \>=7 and \<=90.
   */
  softDeleteRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: ExpressionOrValue<string>;
  /**
   * Configuration for Token Binding for Entra tokens
   */
  tokenBindingParameters?: TokenBindingParametersView | undefined;
  /**
   * The URI of the vault for performing operations on keys and secrets.
   */
  vaultUri?: ExpressionOrValue<string> | undefined;
}

export const vaultPropertiesShape: FlatModelShape = createFlatModelShape({
  accessPolicies: {
    armPath: ["accessPolicies"],
    target: createArrayShape(createDeferredShape(() => accessPolicyEntryShape)),
  },
  createMode: { armPath: ["createMode"] },
  enabledForDeployment: { armPath: ["enabledForDeployment"] },
  enabledForDiskEncryption: { armPath: ["enabledForDiskEncryption"] },
  enabledForTemplateDeployment: { armPath: ["enabledForTemplateDeployment"] },
  enablePurgeProtection: { armPath: ["enablePurgeProtection"] },
  enableRbacAuthorization: { armPath: ["enableRbacAuthorization"] },
  enableSoftDelete: { armPath: ["enableSoftDelete"] },
  hsmPoolResourceId: { armPath: ["hsmPoolResourceId"], readOnly: true },
  networkAcls: { armPath: ["networkAcls"], target: createDeferredShape(() => networkRuleSetShape) },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    target: createArrayShape(createDeferredShape(() => privateEndpointConnectionItemShape)),
    readOnly: true,
  },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"] },
  sku: { armPath: ["sku"], target: createDeferredShape(() => skuShape) },
  softDeleteRetentionInDays: { armPath: ["softDeleteRetentionInDays"] },
  tenantId: { armPath: ["tenantId"] },
  tokenBindingParameters: {
    armPath: ["tokenBindingParameters"],
    target: createDeferredShape(() => tokenBindingParametersShape),
  },
  vaultUri: { armPath: ["vaultUri"] },
});

/**
 * A rule governing the accessibility of a vault from a specific virtual network.
 */
export interface VirtualNetworkRule {
  /**
   * Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'.
   */
  id: string;
  /**
   * Property to specify whether NRP will ignore the check if parent subnet has serviceEndpoints configured.
   */
  ignoreMissingVnetServiceEndpoint?: boolean;
}

/**
 * Input type for A rule governing the accessibility of a vault from a specific virtual network.
 */
export interface VirtualNetworkRuleInput extends InputOf<VirtualNetworkRule> {
  /**
   * Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'.
   */
  id: ExpressionOrValue<string>;
  /**
   * Property to specify whether NRP will ignore the check if parent subnet has serviceEndpoints configured.
   */
  ignoreMissingVnetServiceEndpoint?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for A rule governing the accessibility of a vault from a specific virtual network.
 */
export type VirtualNetworkRuleView = VirtualNetworkRuleInput;

export const virtualNetworkRuleShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"] },
  ignoreMissingVnetServiceEndpoint: { armPath: ["ignoreMissingVnetServiceEndpoint"] },
});

/**
 * A message indicating if changes on the service provider require any updates on the consumer.
 *
 * Known values:
 *
 * - `"None"`
 */
export type ActionsRequired = string;

/**
 * Activation Status
 *
 * Known values:
 *
 * - `"Active"`: The managed HSM Pool is active.
 *
 * - `"NotActivated"`: The managed HSM Pool is not yet activated.
 *
 * - `"Unknown"`: An unknown error occurred while activating managed hsm.
 *
 * - `"Failed"`: Failed to activate managed hsm.
 */
export type ActivationStatus = string;

/**
 * Known values:
 *
 * - `"all"`
 *
 * - `"get"`
 *
 * - `"list"`
 *
 * - `"delete"`
 *
 * - `"create"`
 *
 * - `"import"`
 *
 * - `"update"`
 *
 * - `"managecontacts"`
 *
 * - `"getissuers"`
 *
 * - `"listissuers"`
 *
 * - `"setissuers"`
 *
 * - `"deleteissuers"`
 *
 * - `"manageissuers"`
 *
 * - `"recover"`
 *
 * - `"purge"`
 *
 * - `"backup"`
 *
 * - `"restore"`
 */
export type CertificatePermissions = string;

/**
 * The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval.
 *
 * Known values:
 *
 * - `"Purgeable"`
 *
 * - `"Recoverable+Purgeable"`
 *
 * - `"Recoverable"`
 *
 * - `"Recoverable+ProtectedSubscription"`
 */
export type DeletionRecoveryLevel = string;

/**
 * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256
 *
 * Known values:
 *
 * - `"P-256"`
 *
 * - `"P-384"`
 *
 * - `"P-521"`
 *
 * - `"P-256K"`
 */
export type JsonWebKeyCurveName = string;

/**
 * The permitted JSON web key operations of the key. For more information, see JsonWebKeyOperation.
 *
 * Known values:
 *
 * - `"encrypt"`
 *
 * - `"decrypt"`
 *
 * - `"sign"`
 *
 * - `"verify"`
 *
 * - `"wrapKey"`
 *
 * - `"unwrapKey"`
 *
 * - `"import"`
 *
 * - `"release"`
 */
export type JsonWebKeyOperation = string;

/**
 * The type of the key. For valid values, see JsonWebKeyType.
 *
 * Known values:
 *
 * - `"EC"`
 *
 * - `"EC-HSM"`
 *
 * - `"RSA"`
 *
 * - `"RSA-HSM"`
 *
 * - `"oct-HSM"`
 */
export type JsonWebKeyType = string;

/**
 * Known values:
 *
 * - `"all"`
 *
 * - `"encrypt"`
 *
 * - `"decrypt"`
 *
 * - `"wrapKey"`
 *
 * - `"unwrapKey"`
 *
 * - `"sign"`
 *
 * - `"verify"`
 *
 * - `"get"`
 *
 * - `"list"`
 *
 * - `"create"`
 *
 * - `"update"`
 *
 * - `"import"`
 *
 * - `"delete"`
 *
 * - `"backup"`
 *
 * - `"restore"`
 *
 * - `"recover"`
 *
 * - `"purge"`
 *
 * - `"release"`
 *
 * - `"rotate"`
 *
 * - `"getrotationpolicy"`
 *
 * - `"setrotationpolicy"`
 */
export type KeyPermissions = string;

/**
 * SKU Family of the managed HSM Pool
 *
 * Known values:
 *
 * - `"B"`
 *
 * - `"C"`
 */
export type ManagedHsmSkuFamily = string;

/**
 * SKU of the managed HSM Pool
 *
 * Known values:
 *
 * - `"Standard_B1"`: Standard_B1 SKU
 *
 * - `"Custom_B32"`: Custom_B32 SKU
 *
 * - `"Custom_B6"`: Custom_B6 SKU
 *
 * - `"Custom_C42"`: Custom_C42 SKU
 *
 * - `"Custom_C10"`: Custom_C10 SKU
 */
export type ManagedHsmSkuNameV2 = string;

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed).
 *
 * Known values:
 *
 * - `"None"`: No managed identity.
 *
 * - `"SystemAssigned"`: System assigned managed identity.
 *
 * - `"UserAssigned"`: User assigned managed identity.
 *
 * - `"SystemAssigned,UserAssigned"`: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/**
 * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
 *
 * Known values:
 *
 * - `"Allow"`
 *
 * - `"Deny"`
 */
export type NetworkRuleAction = string;

/**
 * Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'. If not specified the default is 'AzureServices'.
 *
 * Known values:
 *
 * - `"AzureServices"`
 *
 * - `"None"`
 */
export type NetworkRuleBypassOptions = string;

/**
 * The private endpoint connection status.
 *
 * Known values:
 *
 * - `"Pending"`
 *
 * - `"Approved"`
 *
 * - `"Rejected"`
 *
 * - `"Disconnected"`
 */
export type PrivateEndpointServiceConnectionStatus = string;

/**
 * Control permission to the managed HSM from public networks.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 */
export type PublicNetworkAccess = string;

/**
 * Known values:
 *
 * - `"all"`
 *
 * - `"get"`
 *
 * - `"list"`
 *
 * - `"set"`
 *
 * - `"delete"`
 *
 * - `"backup"`
 *
 * - `"restore"`
 *
 * - `"recover"`
 *
 * - `"purge"`
 */
export type SecretPermissions = string;

/**
 * SKU family name
 *
 * Known values:
 *
 * - `"A"`
 */
export type SkuFamily = string;

/**
 * Known values:
 *
 * - `"all"`
 *
 * - `"get"`
 *
 * - `"list"`
 *
 * - `"delete"`
 *
 * - `"set"`
 *
 * - `"update"`
 *
 * - `"regeneratekey"`
 *
 * - `"recover"`
 *
 * - `"purge"`
 *
 * - `"backup"`
 *
 * - `"restore"`
 *
 * - `"setsas"`
 *
 * - `"listsas"`
 *
 * - `"getsas"`
 *
 * - `"deletesas"`
 */
export type StoragePermissions = string;

/**
 * This specifies whether token binding is disabled, enabled or enforced.
 *
 * Known values:
 *
 * - `"Enforced"`: Token binding is enforced for the vault. Only bounded tokens will be accepted. Bearer tokens will be rejected.
 *
 * - `"NotEnforced"`: Token binding is not enforced for the vault. Bounded tokens will be rejected.
 */
export type TokenBindingMode = string;

/**
 * Must be one of the following values "NoValidation", "Unattested", "AttestedTrustedLaunch", "AttestedConfidential". Strength of the token binding increases with each value in that order.
 *
 * Known values:
 *
 * - `"NoValidation"`: This is default when token binding is not enabled.
 *
 * - `"Unattested"`: No attestation proof is required for the bounded token.
 *
 * - `"AttestedTrustedLaunch"`: Bounded Entra token must originate from a trusted launch VM with attestation proof from the attestation authority like Microsoft Azure Attestation.
 *
 * - `"AttestedConfidential"`: Bounded Entra token must originate from a confidential VM with attestation proof from the attestation authority like Microsoft Azure Attestation.
 */
export type TokenBindingStrength = string;
