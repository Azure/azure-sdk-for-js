// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createEnumShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringShape,
  createUnionShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * The identity type.
 */
export type ResourceIdentityType =
  "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";

/**
 * The activation properties of the connected registry.
 */
export interface ActivationProperties {
  /**
   * The activation status of the connected registry.
   */
  status?: ActivationStatus;
}

/**
 * Input type for The activation properties of the connected registry.
 */
export interface ActivationPropertiesInput extends InputOf<ActivationProperties> {}

/**
 * View type for The activation properties of the connected registry.
 */
export interface ActivationPropertiesView extends InputOf<ActivationProperties> {
  /**
   * Read-only output: The activation status of the connected registry.
   */
  readonly status?: Expression<ActivationStatus> | undefined;
}

export const activationPropertiesShape: FlatModelShape = createFlatModelShape({
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * Authentication credential stored for an upstream.
 */
export interface AuthCredential {
  /**
   * This provides data pertaining to the health of the auth credential.
   */
  credentialHealth?: CredentialHealth;
  /**
   * The name of the credential.
   */
  name?: CredentialName;
  /**
   * KeyVault Secret URI for accessing the password.
   */
  passwordSecretIdentifier?: string;
  /**
   * KeyVault Secret URI for accessing the username.
   */
  usernameSecretIdentifier?: string;
}

/**
 * Input type for Authentication credential stored for an upstream.
 */
export interface AuthCredentialInput extends InputOf<AuthCredential> {
  /**
   * The name of the credential.
   */
  name?: ExpressionOrValue<CredentialName> | undefined;
  /**
   * KeyVault Secret URI for accessing the password.
   */
  passwordSecretIdentifier?: ExpressionOrValue<string> | undefined;
  /**
   * KeyVault Secret URI for accessing the username.
   */
  usernameSecretIdentifier?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Authentication credential stored for an upstream.
 */
export interface AuthCredentialView extends InputOf<AuthCredential> {
  /**
   * Read-only output: This provides data pertaining to the health of the auth credential.
   */
  readonly credentialHealth?: Expression<CredentialHealth> | undefined;
  /**
   * The name of the credential.
   */
  name?: ExpressionOrValue<CredentialName> | undefined;
  /**
   * KeyVault Secret URI for accessing the password.
   */
  passwordSecretIdentifier?: ExpressionOrValue<string> | undefined;
  /**
   * KeyVault Secret URI for accessing the username.
   */
  usernameSecretIdentifier?: ExpressionOrValue<string> | undefined;
}

export const authCredentialShape: FlatModelShape = createFlatModelShape({
  credentialHealth: {
    armPath: ["credentialHealth"],
    value: createDeferredShape(() => credentialHealthShape),
    readOnly: true,
  },
  name: { armPath: ["name"], value: createUnionShape() },
  passwordSecretIdentifier: { armPath: ["passwordSecretIdentifier"], value: createStringShape() },
  usernameSecretIdentifier: { armPath: ["usernameSecretIdentifier"], value: createStringShape() },
});

/**
 * The policy for using Azure Resource Manager audience token for a container registry.
 */
export interface AzureAdAuthenticationAsArmPolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: AzureAdAuthenticationAsArmPolicyStatus;
}

/**
 * Input type for The policy for using Azure Resource Manager audience token for a container registry.
 */
export interface AzureAdAuthenticationAsArmPolicyInput extends InputOf<AzureAdAuthenticationAsArmPolicy> {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: ExpressionOrValue<AzureAdAuthenticationAsArmPolicyStatus> | undefined;
}

/**
 * View type for The policy for using Azure Resource Manager audience token for a container registry.
 */
export type AzureAdAuthenticationAsArmPolicyView = AzureAdAuthenticationAsArmPolicyInput;

export const azureAdAuthenticationAsArmPolicyShape: FlatModelShape = createFlatModelShape({
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The properties of a cache rule.
 */
export interface CacheRuleProperties {
  /**
   * The creation date of the cache rule.
   */
  creationDate?: Date;
  /**
   * The ARM resource ID of the credential store which is associated with the cache rule.
   */
  credentialSetResourceId?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * Source repository pulled from upstream.
   */
  sourceRepository?: string;
  /**
   * Target repository specified in docker pull command.
   * Eg: docker pull myregistry.azurecr.io/{targetRepository}:{tag}
   */
  targetRepository?: string;
}

/**
 * Input type for The properties of a cache rule.
 */
export interface CacheRulePropertiesInput extends InputOf<CacheRuleProperties> {
  /**
   * The ARM resource ID of the credential store which is associated with the cache rule.
   */
  credentialSetResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Source repository pulled from upstream.
   */
  sourceRepository?: ExpressionOrValue<string> | undefined;
  /**
   * Target repository specified in docker pull command.
   * Eg: docker pull myregistry.azurecr.io/{targetRepository}:{tag}
   */
  targetRepository?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a cache rule.
 */
export interface CacheRulePropertiesView extends InputOf<CacheRuleProperties> {
  /**
   * Read-only output: The creation date of the cache rule.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * The ARM resource ID of the credential store which is associated with the cache rule.
   */
  credentialSetResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Source repository pulled from upstream.
   */
  sourceRepository?: ExpressionOrValue<string> | undefined;
  /**
   * Target repository specified in docker pull command.
   * Eg: docker pull myregistry.azurecr.io/{targetRepository}:{tag}
   */
  targetRepository?: ExpressionOrValue<string> | undefined;
}

export const cacheRulePropertiesShape: FlatModelShape = createFlatModelShape({
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  credentialSetResourceId: { armPath: ["credentialSetResourceId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  sourceRepository: { armPath: ["sourceRepository"], value: createStringShape() },
  targetRepository: { armPath: ["targetRepository"], value: createStringShape() },
});

/**
 * The properties of a connected registry.
 */
export interface ConnectedRegistryProperties {
  /**
   * The activation properties of the connected registry.
   */
  activation?: ActivationProperties;
  /**
   * The list of the ACR token resource IDs used to authenticate clients to the connected registry.
   */
  clientTokenIds?: string[];
  /**
   * The current connection state of the connected registry.
   */
  connectionState?: ConnectionState;
  /**
   * The garbage collection properties of the connected registry.
   */
  garbageCollection?: GarbageCollectionProperties;
  /**
   * The last activity time of the connected registry.
   */
  lastActivityTime?: Date;
  /**
   * The logging properties of the connected registry.
   */
  logging?: LoggingProperties;
  /**
   * The login server properties of the connected registry.
   */
  loginServer?: LoginServerProperties;
  /**
   * The mode of the connected registry resource that indicates the permissions of the registry.
   */
  mode: ConnectedRegistryMode;
  /**
   * The list of notifications subscription information for the connected registry.
   */
  notificationsList?: string[];
  /**
   * The parent of the connected registry.
   */
  parent: ParentProperties;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * The list of current statuses of the connected registry.
   */
  statusDetails?: StatusDetailProperties[];
  /**
   * The current version of ACR runtime on the connected registry.
   */
  version?: string;
}

/**
 * Input type for The properties of a connected registry.
 */
export interface ConnectedRegistryPropertiesInput extends InputOf<ConnectedRegistryProperties> {
  /**
   * The list of the ACR token resource IDs used to authenticate clients to the connected registry.
   */
  clientTokenIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The garbage collection properties of the connected registry.
   */
  garbageCollection?: GarbageCollectionPropertiesInput | undefined;
  /**
   * The logging properties of the connected registry.
   */
  logging?: LoggingPropertiesInput | undefined;
  /**
   * The login server properties of the connected registry.
   */
  loginServer?: LoginServerPropertiesInput | undefined;
  /**
   * The mode of the connected registry resource that indicates the permissions of the registry.
   */
  mode: ExpressionOrValue<ConnectedRegistryMode>;
  /**
   * The list of notifications subscription information for the connected registry.
   */
  notificationsList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The parent of the connected registry.
   */
  parent: ParentPropertiesInput;
}

/**
 * View type for The properties of a connected registry.
 */
export interface ConnectedRegistryPropertiesView extends InputOf<ConnectedRegistryProperties> {
  /**
   * Read-only output: The activation properties of the connected registry.
   */
  readonly activation?: Expression<ActivationProperties> | undefined;
  /**
   * The list of the ACR token resource IDs used to authenticate clients to the connected registry.
   */
  clientTokenIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Read-only output: The current connection state of the connected registry.
   */
  readonly connectionState?: Expression<ConnectionState> | undefined;
  /**
   * The garbage collection properties of the connected registry.
   */
  garbageCollection?: GarbageCollectionPropertiesView | undefined;
  /**
   * Read-only output: The last activity time of the connected registry.
   */
  readonly lastActivityTime?: Expression<Date> | undefined;
  /**
   * The logging properties of the connected registry.
   */
  logging?: LoggingPropertiesView | undefined;
  /**
   * The login server properties of the connected registry.
   */
  loginServer?: LoginServerPropertiesView | undefined;
  /**
   * The mode of the connected registry resource that indicates the permissions of the registry.
   */
  mode: ExpressionOrValue<ConnectedRegistryMode>;
  /**
   * The list of notifications subscription information for the connected registry.
   */
  notificationsList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The parent of the connected registry.
   */
  parent: ParentPropertiesView;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Read-only output: The list of current statuses of the connected registry.
   */
  readonly statusDetails?: Expression<StatusDetailProperties[]> | undefined;
  /**
   * Read-only output: The current version of ACR runtime on the connected registry.
   */
  readonly version?: Expression<string> | undefined;
}

export const connectedRegistryPropertiesShape: FlatModelShape = createFlatModelShape({
  activation: {
    armPath: ["activation"],
    value: createDeferredShape(() => activationPropertiesShape),
    readOnly: true,
  },
  clientTokenIds: { armPath: ["clientTokenIds"], value: createArrayShape(createStringShape()) },
  connectionState: { armPath: ["connectionState"], value: createUnionShape(), readOnly: true },
  garbageCollection: {
    armPath: ["garbageCollection"],
    value: createDeferredShape(() => garbageCollectionPropertiesShape),
  },
  lastActivityTime: {
    armPath: ["lastActivityTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  logging: { armPath: ["logging"], value: createDeferredShape(() => loggingPropertiesShape) },
  loginServer: {
    armPath: ["loginServer"],
    value: createDeferredShape(() => loginServerPropertiesShape),
  },
  mode: { armPath: ["mode"], value: createUnionShape() },
  notificationsList: {
    armPath: ["notificationsList"],
    value: createArrayShape(createStringShape()),
  },
  parent: { armPath: ["parent"], value: createDeferredShape(() => parentPropertiesShape) },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  statusDetails: {
    armPath: ["statusDetails"],
    value: createArrayShape(createDeferredShape(() => statusDetailPropertiesShape)),
    readOnly: true,
  },
  version: { armPath: ["version"], value: createStringShape(), readOnly: true },
});

/**
 * An object that represents a private endpoint connection for a container registry.
 */
export interface ContainerRegistryPrivateEndpointConnection {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The name of the private endpoint connection.
   */
  name?: string;
  /**
   * The properties of a private endpoint connection.
   */
  properties?: PrivateEndpointConnectionProperties;
  /**
   * Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  systemData?: SystemData;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  type?: string;
}

/**
 * Input type for An object that represents a private endpoint connection for a container registry.
 */
export interface ContainerRegistryPrivateEndpointConnectionInput extends InputOf<ContainerRegistryPrivateEndpointConnection> {
  /**
   * The properties of a private endpoint connection.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for An object that represents a private endpoint connection for a container registry.
 */
export interface ContainerRegistryPrivateEndpointConnectionView extends InputOf<ContainerRegistryPrivateEndpointConnection> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the private endpoint connection.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * The properties of a private endpoint connection.
   */
  properties?: PrivateEndpointConnectionPropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const containerRegistryPrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape(
  {
    id: { armPath: ["id"], value: createStringShape(), readOnly: true },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
    properties: {
      armPath: ["properties"],
      value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
    },
    systemData: {
      armPath: ["systemData"],
      value: createDeferredShape(() => systemDataShape),
      readOnly: true,
    },
    type: { armPath: ["type"], value: createStringShape(), readOnly: true },
  },
);

/**
 * The health of the auth credential.
 */
export interface CredentialHealth {
  /**
   * Error code representing the health check error.
   */
  errorCode?: string;
  /**
   * Descriptive message representing the health check error.
   */
  errorMessage?: string;
  /**
   * The health status of credential.
   */
  status?: CredentialHealthStatus;
}

/**
 * Input type for The health of the auth credential.
 */
export interface CredentialHealthInput extends InputOf<CredentialHealth> {}

/**
 * View type for The health of the auth credential.
 */
export interface CredentialHealthView extends InputOf<CredentialHealth> {
  /**
   * Read-only output: Error code representing the health check error.
   */
  readonly errorCode?: Expression<string> | undefined;
  /**
   * Read-only output: Descriptive message representing the health check error.
   */
  readonly errorMessage?: Expression<string> | undefined;
  /**
   * Read-only output: The health status of credential.
   */
  readonly status?: Expression<CredentialHealthStatus> | undefined;
}

export const credentialHealthShape: FlatModelShape = createFlatModelShape({
  errorCode: { armPath: ["errorCode"], value: createStringShape(), readOnly: true },
  errorMessage: { armPath: ["errorMessage"], value: createStringShape(), readOnly: true },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * The properties of a credential set resource.
 */
export interface CredentialSetProperties {
  /**
   * List of authentication credentials stored for an upstream.
   * Usually consists of a primary and an optional secondary credential.
   */
  authCredentials?: AuthCredential[];
  /**
   * The creation date of credential store resource.
   */
  creationDate?: Date;
  /**
   * The credentials are stored for this upstream or login server.
   */
  loginServer?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
}

/**
 * Input type for The properties of a credential set resource.
 */
export interface CredentialSetPropertiesInput extends InputOf<CredentialSetProperties> {
  /**
   * List of authentication credentials stored for an upstream.
   * Usually consists of a primary and an optional secondary credential.
   */
  authCredentials?: InputArray<AuthCredentialInput, AuthCredential[]> | undefined;
  /**
   * The credentials are stored for this upstream or login server.
   */
  loginServer?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a credential set resource.
 */
export interface CredentialSetPropertiesView extends InputOf<CredentialSetProperties> {
  /**
   * List of authentication credentials stored for an upstream.
   * Usually consists of a primary and an optional secondary credential.
   */
  authCredentials?: InputArray<AuthCredentialView, AuthCredential[]> | undefined;
  /**
   * Read-only output: The creation date of credential store resource.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * The credentials are stored for this upstream or login server.
   */
  loginServer?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
}

export const credentialSetPropertiesShape: FlatModelShape = createFlatModelShape({
  authCredentials: {
    armPath: ["authCredentials"],
    value: createArrayShape(createDeferredShape(() => authCredentialShape)),
  },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  loginServer: { armPath: ["loginServer"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

export interface EncryptionProperty {
  /**
   * Key vault properties.
   */
  keyVaultProperties?: KeyVaultProperties;
  /**
   * Indicates whether or not the encryption is enabled for container registry.
   */
  status?: EncryptionStatus;
}

export interface EncryptionPropertyInput extends InputOf<EncryptionProperty> {
  /**
   * Key vault properties.
   */
  keyVaultProperties?: KeyVaultPropertiesInput | undefined;
  /**
   * Indicates whether or not the encryption is enabled for container registry.
   */
  status?: ExpressionOrValue<EncryptionStatus> | undefined;
}

export interface EncryptionPropertyView extends InputOf<EncryptionProperty> {
  /**
   * Key vault properties.
   */
  keyVaultProperties?: KeyVaultPropertiesView | undefined;
  /**
   * Indicates whether or not the encryption is enabled for container registry.
   */
  status?: ExpressionOrValue<EncryptionStatus> | undefined;
}

export const encryptionPropertyShape: FlatModelShape = createFlatModelShape({
  keyVaultProperties: {
    armPath: ["keyVaultProperties"],
    value: createDeferredShape(() => keyVaultPropertiesShape),
  },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The export policy for a container registry.
 */
export interface ExportPolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: ExportPolicyStatus;
}

/**
 * Input type for The export policy for a container registry.
 */
export interface ExportPolicyInput extends InputOf<ExportPolicy> {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: ExpressionOrValue<ExportPolicyStatus> | undefined;
}

/**
 * View type for The export policy for a container registry.
 */
export type ExportPolicyView = ExportPolicyInput;

export const exportPolicyShape: FlatModelShape = createFlatModelShape({
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The garbage collection properties of the connected registry.
 */
export interface GarbageCollectionProperties {
  /**
   * Indicates whether garbage collection is enabled for the connected registry.
   */
  enabled?: boolean;
  /**
   * The cron expression indicating the schedule that the connected registry will run garbage collection.
   */
  schedule?: string;
}

/**
 * Input type for The garbage collection properties of the connected registry.
 */
export interface GarbageCollectionPropertiesInput extends InputOf<GarbageCollectionProperties> {
  /**
   * Indicates whether garbage collection is enabled for the connected registry.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The cron expression indicating the schedule that the connected registry will run garbage collection.
   */
  schedule?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The garbage collection properties of the connected registry.
 */
export type GarbageCollectionPropertiesView = GarbageCollectionPropertiesInput;

export const garbageCollectionPropertiesShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  schedule: { armPath: ["schedule"], value: createStringShape() },
});

/**
 * Managed identity for the resource.
 */
export interface IdentityProperties {
  /**
   * The principal ID of resource identity.
   */
  principalId?: string;
  /**
   * The tenant ID of resource.
   */
  tenantId?: string;
  /**
   * The identity type.
   */
  type?: ResourceIdentityType;
  /**
   * The list of user identities associated with the resource. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/
   * providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

/**
 * Input type for Managed identity for the resource.
 */
export interface IdentityPropertiesInput extends InputOf<IdentityProperties> {
  /**
   * The identity type.
   */
  type?: ExpressionOrValue<ResourceIdentityType> | undefined;
  /**
   * The list of user identities associated with the resource. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/
   * providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    InputRecord<UserIdentityPropertiesInput, Record<string, UserIdentityProperties>> | undefined;
}

/**
 * View type for Managed identity for the resource.
 */
export interface IdentityPropertiesView extends InputOf<IdentityProperties> {
  /**
   * Read-only output: The principal ID of resource identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of resource.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The identity type.
   */
  type?: ExpressionOrValue<ResourceIdentityType> | undefined;
  /**
   * The list of user identities associated with the resource. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/
   * providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    InputRecord<UserIdentityPropertiesView, Record<string, UserIdentityProperties>> | undefined;
}

export const identityPropertiesShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createEnumShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userIdentityPropertiesShape)),
  },
});

/**
 * IP rule with specific IP or IP range in CIDR format.
 */
export interface IpRule {
  /**
   * The action of IP ACL rule.
   */
  action?: Action;
  /**
   * Specifies the IP or IP range in CIDR format. Only IPV4 address is allowed.
   */
  iPAddressOrRange: string;
}

/**
 * Input type for IP rule with specific IP or IP range in CIDR format.
 */
export interface IpRuleInput extends InputOf<IpRule> {
  /**
   * The action of IP ACL rule.
   */
  action?: ExpressionOrValue<Action> | undefined;
  /**
   * Specifies the IP or IP range in CIDR format. Only IPV4 address is allowed.
   */
  iPAddressOrRange: ExpressionOrValue<string>;
}

/**
 * View type for IP rule with specific IP or IP range in CIDR format.
 */
export type IpRuleView = IpRuleInput;

export const ipRuleShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createUnionShape() },
  iPAddressOrRange: { armPath: ["value"], value: createStringShape() },
});

export interface KeyVaultProperties {
  /**
   * The client id of the identity which will be used to access key vault.
   */
  identity?: string;
  /**
   * Key vault uri to access the encryption key.
   */
  keyIdentifier?: string;
  /**
   * Auto key rotation status for a CMK enabled registry.
   */
  keyRotationEnabled?: boolean;
  /**
   * Timestamp of the last successful key rotation.
   */
  lastKeyRotationTimestamp?: Date;
  /**
   * The fully qualified key identifier that includes the version of the key that is actually used for encryption.
   */
  versionedKeyIdentifier?: string;
}

export interface KeyVaultPropertiesInput extends InputOf<KeyVaultProperties> {
  /**
   * The client id of the identity which will be used to access key vault.
   */
  identity?: ExpressionOrValue<string> | undefined;
  /**
   * Key vault uri to access the encryption key.
   */
  keyIdentifier?: ExpressionOrValue<string> | undefined;
}

export interface KeyVaultPropertiesView extends InputOf<KeyVaultProperties> {
  /**
   * The client id of the identity which will be used to access key vault.
   */
  identity?: ExpressionOrValue<string> | undefined;
  /**
   * Key vault uri to access the encryption key.
   */
  keyIdentifier?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Auto key rotation status for a CMK enabled registry.
   */
  readonly keyRotationEnabled?: Expression<boolean> | undefined;
  /**
   * Read-only output: Timestamp of the last successful key rotation.
   */
  readonly lastKeyRotationTimestamp?: Expression<Date> | undefined;
  /**
   * Read-only output: The fully qualified key identifier that includes the version of the key that is actually used for encryption.
   */
  readonly versionedKeyIdentifier?: Expression<string> | undefined;
}

export const keyVaultPropertiesShape: FlatModelShape = createFlatModelShape({
  identity: { armPath: ["identity"], value: createStringShape() },
  keyIdentifier: { armPath: ["keyIdentifier"], value: createStringShape() },
  keyRotationEnabled: {
    armPath: ["keyRotationEnabled"],
    value: createBooleanShape(),
    readOnly: true,
  },
  lastKeyRotationTimestamp: {
    armPath: ["lastKeyRotationTimestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  versionedKeyIdentifier: {
    armPath: ["versionedKeyIdentifier"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * The logging properties of the connected registry.
 */
export interface LoggingProperties {
  /**
   * Indicates whether audit logs are enabled on the connected registry.
   */
  auditLogStatus?: AuditLogStatus;
  /**
   * The verbosity of logs persisted on the connected registry.
   */
  logLevel?: LogLevel;
}

/**
 * Input type for The logging properties of the connected registry.
 */
export interface LoggingPropertiesInput extends InputOf<LoggingProperties> {
  /**
   * Indicates whether audit logs are enabled on the connected registry.
   */
  auditLogStatus?: ExpressionOrValue<AuditLogStatus> | undefined;
  /**
   * The verbosity of logs persisted on the connected registry.
   */
  logLevel?: ExpressionOrValue<LogLevel> | undefined;
}

/**
 * View type for The logging properties of the connected registry.
 */
export type LoggingPropertiesView = LoggingPropertiesInput;

export const loggingPropertiesShape: FlatModelShape = createFlatModelShape({
  auditLogStatus: { armPath: ["auditLogStatus"], value: createUnionShape() },
  logLevel: { armPath: ["logLevel"], value: createUnionShape() },
});

/**
 * The login server properties of the connected registry.
 */
export interface LoginServerProperties {
  /**
   * The host of the connected registry. Can be FQDN or IP.
   */
  host?: string;
  /**
   * The TLS properties of the connected registry login server.
   */
  tls?: TlsProperties;
}

/**
 * Input type for The login server properties of the connected registry.
 */
export interface LoginServerPropertiesInput extends InputOf<LoginServerProperties> {}

/**
 * View type for The login server properties of the connected registry.
 */
export interface LoginServerPropertiesView extends InputOf<LoginServerProperties> {
  /**
   * Read-only output: The host of the connected registry. Can be FQDN or IP.
   */
  readonly host?: Expression<string> | undefined;
  /**
   * Read-only output: The TLS properties of the connected registry login server.
   */
  readonly tls?: Expression<TlsProperties> | undefined;
}

export const loginServerPropertiesShape: FlatModelShape = createFlatModelShape({
  host: { armPath: ["host"], value: createStringShape(), readOnly: true },
  tls: { armPath: ["tls"], value: createDeferredShape(() => tlsPropertiesShape), readOnly: true },
});

/**
 * The network rule set for a container registry.
 */
export interface NetworkRuleSet {
  /**
   * The default action of allow or deny when no other rules match.
   */
  defaultAction: DefaultAction;
  /**
   * The IP ACL rules.
   */
  ipRules?: IpRule[];
}

/**
 * Input type for The network rule set for a container registry.
 */
export interface NetworkRuleSetInput extends InputOf<NetworkRuleSet> {
  /**
   * The default action of allow or deny when no other rules match.
   */
  defaultAction: ExpressionOrValue<DefaultAction>;
  /**
   * The IP ACL rules.
   */
  ipRules?: InputArray<IpRuleInput, IpRule[]> | undefined;
}

/**
 * View type for The network rule set for a container registry.
 */
export type NetworkRuleSetView = NetworkRuleSetInput;

export const networkRuleSetShape: FlatModelShape = createFlatModelShape({
  defaultAction: { armPath: ["defaultAction"], value: createUnionShape() },
  ipRules: {
    armPath: ["ipRules"],
    value: createArrayShape(createDeferredShape(() => ipRuleShape)),
  },
});

/**
 * The properties of the connected registry parent.
 */
export interface ParentProperties {
  /**
   * The resource ID of the parent to which the connected registry will be associated.
   */
  id?: string;
  /**
   * The sync properties of the connected registry with its parent.
   */
  syncProperties: SyncProperties;
}

/**
 * Input type for The properties of the connected registry parent.
 */
export interface ParentPropertiesInput extends InputOf<ParentProperties> {
  /**
   * The resource ID of the parent to which the connected registry will be associated.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * The sync properties of the connected registry with its parent.
   */
  syncProperties: SyncPropertiesInput;
}

/**
 * View type for The properties of the connected registry parent.
 */
export interface ParentPropertiesView extends InputOf<ParentProperties> {
  /**
   * The resource ID of the parent to which the connected registry will be associated.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * The sync properties of the connected registry with its parent.
   */
  syncProperties: SyncPropertiesView;
}

export const parentPropertiesShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
  syncProperties: {
    armPath: ["syncProperties"],
    value: createDeferredShape(() => syncPropertiesShape),
  },
});

/**
 * The policies for a container registry.
 */
export interface Policies {
  /**
   * The policy for using Azure Resource Manager audience token for a container registry.
   */
  azureAdAuthenticationAsArmPolicy?: AzureAdAuthenticationAsArmPolicy;
  /**
   * The export policy for a container registry.
   */
  exportPolicy?: ExportPolicy;
  /**
   * The quarantine policy for a container registry.
   */
  quarantinePolicy?: QuarantinePolicy;
  /**
   * The retention policy for a container registry.
   */
  retentionPolicy?: RetentionPolicy;
  /**
   * The content trust policy for a container registry.
   */
  trustPolicy?: TrustPolicy;
}

/**
 * Input type for The policies for a container registry.
 */
export interface PoliciesInput extends InputOf<Policies> {
  /**
   * The policy for using Azure Resource Manager audience token for a container registry.
   */
  azureAdAuthenticationAsArmPolicy?: AzureAdAuthenticationAsArmPolicyInput | undefined;
  /**
   * The export policy for a container registry.
   */
  exportPolicy?: ExportPolicyInput | undefined;
  /**
   * The quarantine policy for a container registry.
   */
  quarantinePolicy?: QuarantinePolicyInput | undefined;
  /**
   * The retention policy for a container registry.
   */
  retentionPolicy?: RetentionPolicyInput | undefined;
  /**
   * The content trust policy for a container registry.
   */
  trustPolicy?: TrustPolicyInput | undefined;
}

/**
 * View type for The policies for a container registry.
 */
export interface PoliciesView extends InputOf<Policies> {
  /**
   * The policy for using Azure Resource Manager audience token for a container registry.
   */
  azureAdAuthenticationAsArmPolicy?: AzureAdAuthenticationAsArmPolicyView | undefined;
  /**
   * The export policy for a container registry.
   */
  exportPolicy?: ExportPolicyView | undefined;
  /**
   * The quarantine policy for a container registry.
   */
  quarantinePolicy?: QuarantinePolicyView | undefined;
  /**
   * The retention policy for a container registry.
   */
  retentionPolicy?: RetentionPolicyView | undefined;
  /**
   * The content trust policy for a container registry.
   */
  trustPolicy?: TrustPolicyView | undefined;
}

export const policiesShape: FlatModelShape = createFlatModelShape({
  azureAdAuthenticationAsArmPolicy: {
    armPath: ["azureADAuthenticationAsArmPolicy"],
    value: createDeferredShape(() => azureAdAuthenticationAsArmPolicyShape),
  },
  exportPolicy: { armPath: ["exportPolicy"], value: createDeferredShape(() => exportPolicyShape) },
  quarantinePolicy: {
    armPath: ["quarantinePolicy"],
    value: createDeferredShape(() => quarantinePolicyShape),
  },
  retentionPolicy: {
    armPath: ["retentionPolicy"],
    value: createDeferredShape(() => retentionPolicyShape),
  },
  trustPolicy: { armPath: ["trustPolicy"], value: createDeferredShape(() => trustPolicyShape) },
});

/**
 * The Private Endpoint resource.
 */
export interface PrivateEndpoint {
  /**
   * This is private endpoint resource created with Microsoft.Network resource provider.
   */
  id?: string;
}

/**
 * Input type for The Private Endpoint resource.
 */
export interface PrivateEndpointInput extends InputOf<PrivateEndpoint> {
  /**
   * This is private endpoint resource created with Microsoft.Network resource provider.
   */
  id?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The Private Endpoint resource.
 */
export type PrivateEndpointView = PrivateEndpointInput;

export const privateEndpointShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * The properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * The resource of private endpoint.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /**
   * The provisioning state of private endpoint connection resource.
   */
  provisioningState?: ProvisioningState;
}

/**
 * Input type for The properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The resource of private endpoint.
   */
  privateEndpoint?: PrivateEndpointInput | undefined;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateInput | undefined;
}

/**
 * View type for The properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionPropertiesView extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The resource of private endpoint.
   */
  privateEndpoint?: PrivateEndpointView | undefined;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateView | undefined;
  /**
   * Read-only output: The provisioning state of private endpoint connection resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
}

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(() => privateLinkServiceConnectionStateShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of a private link resource.
 */
export interface PrivateLinkResourceProperties {
  /**
   * The private link resource group id.
   */
  groupId?: string;
  /**
   * The private link resource required member names.
   */
  requiredMembers?: string[];
  /**
   * The private link resource private link DNS zone name.
   */
  requiredZoneNames?: string[];
}

/**
 * Input type for Properties of a private link resource.
 */
export interface PrivateLinkResourcePropertiesInput extends InputOf<PrivateLinkResourceProperties> {}

/**
 * View type for Properties of a private link resource.
 */
export interface PrivateLinkResourcePropertiesView extends InputOf<PrivateLinkResourceProperties> {
  /**
   * Read-only output: The private link resource group id.
   */
  readonly groupId?: Expression<string> | undefined;
  /**
   * Read-only output: The private link resource required member names.
   */
  readonly requiredMembers?: Expression<string[]> | undefined;
  /**
   * Read-only output: The private link resource private link DNS zone name.
   */
  readonly requiredZoneNames?: Expression<string[]> | undefined;
}

export const privateLinkResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  groupId: { armPath: ["groupId"], value: createStringShape(), readOnly: true },
  requiredMembers: {
    armPath: ["requiredMembers"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  requiredZoneNames: {
    armPath: ["requiredZoneNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
});

/**
 * The state of a private link service connection.
 */
export interface PrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ActionsRequired;
  /**
   * The description for connection status. For example if connection is rejected it can indicate reason for rejection.
   */
  description?: string;
  /**
   * The private link service connection status.
   */
  status?: ConnectionStatus;
}

/**
 * Input type for The state of a private link service connection.
 */
export interface PrivateLinkServiceConnectionStateInput extends InputOf<PrivateLinkServiceConnectionState> {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ExpressionOrValue<ActionsRequired> | undefined;
  /**
   * The description for connection status. For example if connection is rejected it can indicate reason for rejection.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The private link service connection status.
   */
  status?: ExpressionOrValue<ConnectionStatus> | undefined;
}

/**
 * View type for The state of a private link service connection.
 */
export type PrivateLinkServiceConnectionStateView = PrivateLinkServiceConnectionStateInput;

export const privateLinkServiceConnectionStateShape: FlatModelShape = createFlatModelShape({
  actionsRequired: { armPath: ["actionsRequired"], value: createUnionShape() },
  description: { armPath: ["description"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The quarantine policy for a container registry.
 */
export interface QuarantinePolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: PolicyStatus;
}

/**
 * Input type for The quarantine policy for a container registry.
 */
export interface QuarantinePolicyInput extends InputOf<QuarantinePolicy> {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: ExpressionOrValue<PolicyStatus> | undefined;
}

/**
 * View type for The quarantine policy for a container registry.
 */
export type QuarantinePolicyView = QuarantinePolicyInput;

export const quarantinePolicyShape: FlatModelShape = createFlatModelShape({
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The properties of a container registry.
 */
export interface RegistryProperties {
  /**
   * The value that indicates whether the admin user is enabled.
   */
  adminUserEnabled?: boolean;
  /**
   * Enables registry-wide pull from unauthenticated clients.
   */
  anonymousPullEnabled?: boolean;
  /**
   * The creation date of the container registry in ISO8601 format.
   */
  creationDate?: Date;
  /**
   * Enable a single data endpoint per region for serving data.
   */
  dataEndpointEnabled?: boolean;
  /**
   * List of host names that will serve data when dataEndpointEnabled is true.
   */
  dataEndpointHostNames?: string[];
  /**
   * The encryption settings of container registry.
   */
  encryption?: EncryptionProperty;
  /**
   * The URL that can be used to log into the container registry.
   */
  loginServer?: string;
  /**
   * Whether or not Tasks allowed to bypass the network rules for this container registry.
   */
  networkRuleBypassAllowedForTasks?: boolean;
  /**
   * Whether to allow trusted Azure services to access a network restricted registry.
   */
  networkRuleBypassOptions?: NetworkRuleBypassOptions;
  /**
   * The network rule set for a container registry.
   */
  networkRuleSet?: NetworkRuleSet;
  /**
   * The policies for a container registry.
   */
  policies?: Policies;
  /**
   * List of private endpoint connections for a container registry.
   */
  privateEndpointConnections?: ContainerRegistryPrivateEndpointConnection[];
  /**
   * The provisioning state of the container registry at the time the operation was called.
   */
  provisioningState?: ProvisioningState;
  /**
   * Whether or not public network access is allowed for the container registry.
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /**
   * Determines registry role assignment mode.
   */
  roleAssignmentMode?: RoleAssignmentMode;
  /**
   * The status of the container registry at the time the operation was called.
   */
  status?: Status;
  /**
   * Whether or not zone redundancy is enabled for this container registry
   */
  zoneRedundancy?: ZoneRedundancy;
}

/**
 * Input type for The properties of a container registry.
 */
export interface RegistryPropertiesInput extends InputOf<RegistryProperties> {
  /**
   * The value that indicates whether the admin user is enabled.
   */
  adminUserEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables registry-wide pull from unauthenticated clients.
   */
  anonymousPullEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enable a single data endpoint per region for serving data.
   */
  dataEndpointEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The encryption settings of container registry.
   */
  encryption?: EncryptionPropertyInput | undefined;
  /**
   * Whether or not Tasks allowed to bypass the network rules for this container registry.
   */
  networkRuleBypassAllowedForTasks?: ExpressionOrValue<boolean> | undefined;
  /**
   * Whether to allow trusted Azure services to access a network restricted registry.
   */
  networkRuleBypassOptions?: ExpressionOrValue<NetworkRuleBypassOptions> | undefined;
  /**
   * The network rule set for a container registry.
   */
  networkRuleSet?: NetworkRuleSetInput | undefined;
  /**
   * The policies for a container registry.
   */
  policies?: PoliciesInput | undefined;
  /**
   * Whether or not public network access is allowed for the container registry.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Determines registry role assignment mode.
   */
  roleAssignmentMode?: ExpressionOrValue<RoleAssignmentMode> | undefined;
  /**
   * Whether or not zone redundancy is enabled for this container registry
   */
  zoneRedundancy?: ExpressionOrValue<ZoneRedundancy> | undefined;
}

/**
 * View type for The properties of a container registry.
 */
export interface RegistryPropertiesView extends InputOf<RegistryProperties> {
  /**
   * The value that indicates whether the admin user is enabled.
   */
  adminUserEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables registry-wide pull from unauthenticated clients.
   */
  anonymousPullEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The creation date of the container registry in ISO8601 format.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * Enable a single data endpoint per region for serving data.
   */
  dataEndpointEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: List of host names that will serve data when dataEndpointEnabled is true.
   */
  readonly dataEndpointHostNames?: Expression<string[]> | undefined;
  /**
   * The encryption settings of container registry.
   */
  encryption?: EncryptionPropertyView | undefined;
  /**
   * Read-only output: The URL that can be used to log into the container registry.
   */
  readonly loginServer?: Expression<string> | undefined;
  /**
   * Whether or not Tasks allowed to bypass the network rules for this container registry.
   */
  networkRuleBypassAllowedForTasks?: ExpressionOrValue<boolean> | undefined;
  /**
   * Whether to allow trusted Azure services to access a network restricted registry.
   */
  networkRuleBypassOptions?: ExpressionOrValue<NetworkRuleBypassOptions> | undefined;
  /**
   * The network rule set for a container registry.
   */
  networkRuleSet?: NetworkRuleSetView | undefined;
  /**
   * The policies for a container registry.
   */
  policies?: PoliciesView | undefined;
  /**
   * Read-only output: List of private endpoint connections for a container registry.
   */
  readonly privateEndpointConnections?:
    Expression<ContainerRegistryPrivateEndpointConnection[]> | undefined;
  /**
   * Read-only output: The provisioning state of the container registry at the time the operation was called.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Whether or not public network access is allowed for the container registry.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Determines registry role assignment mode.
   */
  roleAssignmentMode?: ExpressionOrValue<RoleAssignmentMode> | undefined;
  /**
   * Read-only output: The status of the container registry at the time the operation was called.
   */
  readonly status?: Expression<Status> | undefined;
  /**
   * Whether or not zone redundancy is enabled for this container registry
   */
  zoneRedundancy?: ExpressionOrValue<ZoneRedundancy> | undefined;
}

export const registryPropertiesShape: FlatModelShape = createFlatModelShape({
  adminUserEnabled: { armPath: ["adminUserEnabled"], value: createBooleanShape() },
  anonymousPullEnabled: { armPath: ["anonymousPullEnabled"], value: createBooleanShape() },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  dataEndpointEnabled: { armPath: ["dataEndpointEnabled"], value: createBooleanShape() },
  dataEndpointHostNames: {
    armPath: ["dataEndpointHostNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  encryption: {
    armPath: ["encryption"],
    value: createDeferredShape(() => encryptionPropertyShape),
  },
  loginServer: { armPath: ["loginServer"], value: createStringShape(), readOnly: true },
  networkRuleBypassAllowedForTasks: {
    armPath: ["networkRuleBypassAllowedForTasks"],
    value: createBooleanShape(),
  },
  networkRuleBypassOptions: { armPath: ["networkRuleBypassOptions"], value: createUnionShape() },
  networkRuleSet: {
    armPath: ["networkRuleSet"],
    value: createDeferredShape(() => networkRuleSetShape),
  },
  policies: { armPath: ["policies"], value: createDeferredShape(() => policiesShape) },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(
      createDeferredShape(() => containerRegistryPrivateEndpointConnectionShape),
    ),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  roleAssignmentMode: { armPath: ["roleAssignmentMode"], value: createUnionShape() },
  status: { armPath: ["status"], value: createDeferredShape(() => statusShape), readOnly: true },
  zoneRedundancy: { armPath: ["zoneRedundancy"], value: createUnionShape() },
});

/**
 * The properties of a replication.
 */
export interface ReplicationProperties {
  /**
   * The provisioning state of the replication at the time the operation was called.
   */
  provisioningState?: ProvisioningState;
  /**
   * Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications.
   */
  regionEndpointEnabled?: boolean;
  /**
   * The status of the replication at the time the operation was called.
   */
  status?: Status;
  /**
   * Whether or not zone redundancy is enabled for this container registry replication
   */
  zoneRedundancy?: ZoneRedundancy;
}

/**
 * Input type for The properties of a replication.
 */
export interface ReplicationPropertiesInput extends InputOf<ReplicationProperties> {
  /**
   * Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications.
   */
  regionEndpointEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Whether or not zone redundancy is enabled for this container registry replication
   */
  zoneRedundancy?: ExpressionOrValue<ZoneRedundancy> | undefined;
}

/**
 * View type for The properties of a replication.
 */
export interface ReplicationPropertiesView extends InputOf<ReplicationProperties> {
  /**
   * Read-only output: The provisioning state of the replication at the time the operation was called.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications.
   */
  regionEndpointEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The status of the replication at the time the operation was called.
   */
  readonly status?: Expression<Status> | undefined;
  /**
   * Whether or not zone redundancy is enabled for this container registry replication
   */
  zoneRedundancy?: ExpressionOrValue<ZoneRedundancy> | undefined;
}

export const replicationPropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  regionEndpointEnabled: { armPath: ["regionEndpointEnabled"], value: createBooleanShape() },
  status: { armPath: ["status"], value: createDeferredShape(() => statusShape), readOnly: true },
  zoneRedundancy: { armPath: ["zoneRedundancy"], value: createUnionShape() },
});

/**
 * The retention policy for a container registry.
 */
export interface RetentionPolicy {
  /**
   * The number of days to retain an untagged manifest after which it gets purged.
   */
  days?: number;
  /**
   * The timestamp when the policy was last updated.
   */
  lastUpdatedTime?: Date;
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: PolicyStatus;
}

/**
 * Input type for The retention policy for a container registry.
 */
export interface RetentionPolicyInput extends InputOf<RetentionPolicy> {
  /**
   * The number of days to retain an untagged manifest after which it gets purged.
   */
  days?: ExpressionOrValue<number> | undefined;
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: ExpressionOrValue<PolicyStatus> | undefined;
}

/**
 * View type for The retention policy for a container registry.
 */
export interface RetentionPolicyView extends InputOf<RetentionPolicy> {
  /**
   * The number of days to retain an untagged manifest after which it gets purged.
   */
  days?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The timestamp when the policy was last updated.
   */
  readonly lastUpdatedTime?: Expression<Date> | undefined;
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: ExpressionOrValue<PolicyStatus> | undefined;
}

export const retentionPolicyShape: FlatModelShape = createFlatModelShape({
  days: { armPath: ["days"], value: createNumberShape() },
  lastUpdatedTime: {
    armPath: ["lastUpdatedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The properties of a scope map.
 */
export interface ScopeMapProperties {
  /**
   * The list of scoped permissions for registry artifacts.
   * E.g. repositories/repository-name/content/read,
   * repositories/repository-name/metadata/write
   */
  actions: string[];
  /**
   * The creation date of scope map.
   */
  creationDate?: Date;
  /**
   * The user friendly description of the scope map.
   */
  description?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * The type of the scope map. E.g. BuildIn scope map.
   */
  type?: string;
}

/**
 * Input type for The properties of a scope map.
 */
export interface ScopeMapPropertiesInput extends InputOf<ScopeMapProperties> {
  /**
   * The list of scoped permissions for registry artifacts.
   * E.g. repositories/repository-name/content/read,
   * repositories/repository-name/metadata/write
   */
  actions: InputArray<ExpressionOrValue<string>, string[]>;
  /**
   * The user friendly description of the scope map.
   */
  description?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a scope map.
 */
export interface ScopeMapPropertiesView extends InputOf<ScopeMapProperties> {
  /**
   * The list of scoped permissions for registry artifacts.
   * E.g. repositories/repository-name/content/read,
   * repositories/repository-name/metadata/write
   */
  actions: InputArray<ExpressionOrValue<string>, string[]>;
  /**
   * Read-only output: The creation date of scope map.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * The user friendly description of the scope map.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Read-only output: The type of the scope map. E.g. BuildIn scope map.
   */
  readonly type?: Expression<string> | undefined;
}

export const scopeMapPropertiesShape: FlatModelShape = createFlatModelShape({
  actions: { armPath: ["actions"], value: createArrayShape(createStringShape()) },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  description: { armPath: ["description"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * The SKU of a container registry.
 */
export interface Sku {
  /**
   * The SKU name of the container registry. Required for registry creation.
   */
  name: SkuName;
  /**
   * The SKU tier based on the SKU name.
   */
  tier?: SkuTier;
}

/**
 * Input type for The SKU of a container registry.
 */
export interface SkuInput extends InputOf<Sku> {
  /**
   * The SKU name of the container registry. Required for registry creation.
   */
  name: ExpressionOrValue<SkuName>;
}

/**
 * View type for The SKU of a container registry.
 */
export interface SkuView extends InputOf<Sku> {
  /**
   * The SKU name of the container registry. Required for registry creation.
   */
  name: ExpressionOrValue<SkuName>;
  /**
   * Read-only output: The SKU tier based on the SKU name.
   */
  readonly tier?: Expression<SkuTier> | undefined;
}

export const skuShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createUnionShape() },
  tier: { armPath: ["tier"], value: createUnionShape(), readOnly: true },
});

/**
 * The status of an Azure resource at the time the operation was called.
 */
export interface Status {
  /**
   * The short label for the status.
   */
  displayStatus?: string;
  /**
   * The detailed message for the status, including alerts and error messages.
   */
  message?: string;
  /**
   * The timestamp when the status was changed to the current value.
   */
  timestamp?: Date;
}

/**
 * Input type for The status of an Azure resource at the time the operation was called.
 */
export interface StatusInput extends InputOf<Status> {}

/**
 * View type for The status of an Azure resource at the time the operation was called.
 */
export interface StatusView extends InputOf<Status> {
  /**
   * Read-only output: The short label for the status.
   */
  readonly displayStatus?: Expression<string> | undefined;
  /**
   * Read-only output: The detailed message for the status, including alerts and error messages.
   */
  readonly message?: Expression<string> | undefined;
  /**
   * Read-only output: The timestamp when the status was changed to the current value.
   */
  readonly timestamp?: Expression<Date> | undefined;
}

export const statusShape: FlatModelShape = createFlatModelShape({
  displayStatus: { armPath: ["displayStatus"], value: createStringShape(), readOnly: true },
  message: { armPath: ["message"], value: createStringShape(), readOnly: true },
  timestamp: {
    armPath: ["timestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * The status detail properties of the connected registry.
 */
export interface StatusDetailProperties {
  /**
   * The HTTP status code.
   */
  code?: string;
  /**
   * The correlation ID of the status.
   */
  correlationId?: string;
  /**
   * The description of the status.
   */
  description?: string;
  /**
   * The timestamp of the status.
   */
  timestamp?: Date;
  /**
   * The component of the connected registry corresponding to the status.
   */
  type?: string;
}

/**
 * Input type for The status detail properties of the connected registry.
 */
export interface StatusDetailPropertiesInput extends InputOf<StatusDetailProperties> {}

/**
 * View type for The status detail properties of the connected registry.
 */
export interface StatusDetailPropertiesView extends InputOf<StatusDetailProperties> {
  /**
   * Read-only output: The HTTP status code.
   */
  readonly code?: Expression<string> | undefined;
  /**
   * Read-only output: The correlation ID of the status.
   */
  readonly correlationId?: Expression<string> | undefined;
  /**
   * Read-only output: The description of the status.
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: The timestamp of the status.
   */
  readonly timestamp?: Expression<Date> | undefined;
  /**
   * Read-only output: The component of the connected registry corresponding to the status.
   */
  readonly type?: Expression<string> | undefined;
}

export const statusDetailPropertiesShape: FlatModelShape = createFlatModelShape({
  code: { armPath: ["code"], value: createStringShape(), readOnly: true },
  correlationId: { armPath: ["correlationId"], value: createStringShape(), readOnly: true },
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  timestamp: {
    armPath: ["timestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * The sync properties of the connected registry with its parent.
 */
export interface SyncProperties {
  /**
   * The gateway endpoint used by the connected registry to communicate with its parent.
   */
  gatewayEndpoint?: string;
  /**
   * The last time a sync occurred between the connected registry and its parent.
   */
  lastSyncTime?: Date;
  /**
   * The period of time for which a message is available to sync before it is expired. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  messageTtl: string;
  /**
   * The cron expression indicating the schedule that the connected registry will sync with its parent.
   */
  schedule?: string;
  /**
   * The time window during which sync is enabled for each schedule occurrence. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  syncWindow?: string;
  /**
   * The resource ID of the ACR token used to authenticate the connected registry to its parent during sync.
   */
  tokenId: string;
}

/**
 * Input type for The sync properties of the connected registry with its parent.
 */
export interface SyncPropertiesInput extends InputOf<SyncProperties> {
  /**
   * The period of time for which a message is available to sync before it is expired. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  messageTtl: ExpressionOrValue<string>;
  /**
   * The cron expression indicating the schedule that the connected registry will sync with its parent.
   */
  schedule?: ExpressionOrValue<string> | undefined;
  /**
   * The time window during which sync is enabled for each schedule occurrence. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  syncWindow?: ExpressionOrValue<string> | undefined;
  /**
   * The resource ID of the ACR token used to authenticate the connected registry to its parent during sync.
   */
  tokenId: ExpressionOrValue<string>;
}

/**
 * View type for The sync properties of the connected registry with its parent.
 */
export interface SyncPropertiesView extends InputOf<SyncProperties> {
  /**
   * Read-only output: The gateway endpoint used by the connected registry to communicate with its parent.
   */
  readonly gatewayEndpoint?: Expression<string> | undefined;
  /**
   * Read-only output: The last time a sync occurred between the connected registry and its parent.
   */
  readonly lastSyncTime?: Expression<Date> | undefined;
  /**
   * The period of time for which a message is available to sync before it is expired. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  messageTtl: ExpressionOrValue<string>;
  /**
   * The cron expression indicating the schedule that the connected registry will sync with its parent.
   */
  schedule?: ExpressionOrValue<string> | undefined;
  /**
   * The time window during which sync is enabled for each schedule occurrence. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  syncWindow?: ExpressionOrValue<string> | undefined;
  /**
   * The resource ID of the ACR token used to authenticate the connected registry to its parent during sync.
   */
  tokenId: ExpressionOrValue<string>;
}

export const syncPropertiesShape: FlatModelShape = createFlatModelShape({
  gatewayEndpoint: { armPath: ["gatewayEndpoint"], value: createStringShape(), readOnly: true },
  lastSyncTime: {
    armPath: ["lastSyncTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  messageTtl: {
    armPath: ["messageTtl"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  schedule: { armPath: ["schedule"], value: createStringShape() },
  syncWindow: {
    armPath: ["syncWindow"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  tokenId: { armPath: ["tokenId"], value: createStringShape() },
});

/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource.
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource last modification (UTC)
   */
  lastModifiedAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedByType?: CreatedByType;
}

/**
 * Input type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataInput extends InputOf<SystemData> {}

/**
 * View type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataView extends InputOf<SystemData> {
  /**
   * Read-only output: The timestamp of resource creation (UTC).
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that created the resource.
   */
  readonly createdBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that created the resource.
   */
  readonly createdByType?: Expression<CreatedByType> | undefined;
  /**
   * Read-only output: The timestamp of resource last modification (UTC)
   */
  readonly lastModifiedAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that last modified the resource.
   */
  readonly lastModifiedBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that last modified the resource.
   */
  readonly lastModifiedByType?: Expression<CreatedByType> | undefined;
}

export const systemDataShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  createdBy: { armPath: ["createdBy"], value: createStringShape(), readOnly: true },
  createdByType: { armPath: ["createdByType"], value: createUnionShape(), readOnly: true },
  lastModifiedAt: {
    armPath: ["lastModifiedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastModifiedBy: { armPath: ["lastModifiedBy"], value: createStringShape(), readOnly: true },
  lastModifiedByType: {
    armPath: ["lastModifiedByType"],
    value: createUnionShape(),
    readOnly: true,
  },
});

/**
 * The TLS certificate properties of the connected registry login server.
 */
export interface TlsCertificateProperties {
  /**
   * Indicates the location of the certificates.
   */
  location?: string;
  /**
   * The type of certificate location.
   */
  type?: CertificateType;
}

/**
 * Input type for The TLS certificate properties of the connected registry login server.
 */
export interface TlsCertificatePropertiesInput extends InputOf<TlsCertificateProperties> {}

/**
 * View type for The TLS certificate properties of the connected registry login server.
 */
export interface TlsCertificatePropertiesView extends InputOf<TlsCertificateProperties> {
  /**
   * Read-only output: Indicates the location of the certificates.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The type of certificate location.
   */
  readonly type?: Expression<CertificateType> | undefined;
}

export const tlsCertificatePropertiesShape: FlatModelShape = createFlatModelShape({
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape(), readOnly: true },
});

/**
 * The TLS properties of the connected registry login server.
 */
export interface TlsProperties {
  /**
   * The certificate used to configure HTTPS for the login server.
   */
  certificate?: TlsCertificateProperties;
  /**
   * Indicates whether HTTPS is enabled for the login server.
   */
  status?: TlsStatus;
}

/**
 * Input type for The TLS properties of the connected registry login server.
 */
export interface TlsPropertiesInput extends InputOf<TlsProperties> {}

/**
 * View type for The TLS properties of the connected registry login server.
 */
export interface TlsPropertiesView extends InputOf<TlsProperties> {
  /**
   * Read-only output: The certificate used to configure HTTPS for the login server.
   */
  readonly certificate?: Expression<TlsCertificateProperties> | undefined;
  /**
   * Read-only output: Indicates whether HTTPS is enabled for the login server.
   */
  readonly status?: Expression<TlsStatus> | undefined;
}

export const tlsPropertiesShape: FlatModelShape = createFlatModelShape({
  certificate: {
    armPath: ["certificate"],
    value: createDeferredShape(() => tlsCertificatePropertiesShape),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * The properties of a certificate used for authenticating a token.
 */
export interface TokenCertificate {
  /**
   * Base 64 encoded string of the public certificate1 in PEM format that will be used for authenticating the token.
   */
  encodedPemCertificate?: string;
  /**
   * The expiry datetime of the certificate.
   */
  expiry?: Date;
  name?: TokenCertificateName;
  /**
   * The thumbprint of the certificate.
   */
  thumbprint?: string;
}

/**
 * Input type for The properties of a certificate used for authenticating a token.
 */
export interface TokenCertificateInput extends InputOf<TokenCertificate> {
  /**
   * Base 64 encoded string of the public certificate1 in PEM format that will be used for authenticating the token.
   */
  encodedPemCertificate?: ExpressionOrValue<string> | undefined;
  /**
   * The expiry datetime of the certificate.
   */
  expiry?: ExpressionOrValue<Date> | undefined;
  name?: ExpressionOrValue<TokenCertificateName> | undefined;
  /**
   * The thumbprint of the certificate.
   */
  thumbprint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a certificate used for authenticating a token.
 */
export type TokenCertificateView = TokenCertificateInput;

export const tokenCertificateShape: FlatModelShape = createFlatModelShape({
  encodedPemCertificate: { armPath: ["encodedPemCertificate"], value: createStringShape() },
  expiry: {
    armPath: ["expiry"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  name: { armPath: ["name"], value: createUnionShape() },
  thumbprint: { armPath: ["thumbprint"], value: createStringShape() },
});

/**
 * The properties of the credentials that can be used for authenticating the token.
 */
export interface TokenCredentialsProperties {
  certificates?: TokenCertificate[];
  passwords?: TokenPassword[];
}

/**
 * Input type for The properties of the credentials that can be used for authenticating the token.
 */
export interface TokenCredentialsPropertiesInput extends InputOf<TokenCredentialsProperties> {
  certificates?: InputArray<TokenCertificateInput, TokenCertificate[]> | undefined;
  passwords?: InputArray<TokenPasswordInput, TokenPassword[]> | undefined;
}

/**
 * View type for The properties of the credentials that can be used for authenticating the token.
 */
export interface TokenCredentialsPropertiesView extends InputOf<TokenCredentialsProperties> {
  certificates?: InputArray<TokenCertificateView, TokenCertificate[]> | undefined;
  passwords?: InputArray<TokenPasswordView, TokenPassword[]> | undefined;
}

export const tokenCredentialsPropertiesShape: FlatModelShape = createFlatModelShape({
  certificates: {
    armPath: ["certificates"],
    value: createArrayShape(createDeferredShape(() => tokenCertificateShape)),
  },
  passwords: {
    armPath: ["passwords"],
    value: createArrayShape(createDeferredShape(() => tokenPasswordShape)),
  },
});

/**
 * The password that will be used for authenticating the token of a container registry.
 */
export interface TokenPassword {
  /**
   * The creation datetime of the password.
   */
  creationTime?: Date;
  /**
   * The expiry datetime of the password.
   */
  expiry?: Date;
  /**
   * The password name "password1" or "password2"
   */
  name?: TokenPasswordName;
  /**
   * The password value.
   */
  value?: string;
}

/**
 * Input type for The password that will be used for authenticating the token of a container registry.
 */
export interface TokenPasswordInput extends InputOf<TokenPassword> {
  /**
   * The creation datetime of the password.
   */
  creationTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The expiry datetime of the password.
   */
  expiry?: ExpressionOrValue<Date> | undefined;
  /**
   * The password name "password1" or "password2"
   */
  name?: ExpressionOrValue<TokenPasswordName> | undefined;
}

/**
 * View type for The password that will be used for authenticating the token of a container registry.
 */
export interface TokenPasswordView extends InputOf<TokenPassword> {
  /**
   * The creation datetime of the password.
   */
  creationTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The expiry datetime of the password.
   */
  expiry?: ExpressionOrValue<Date> | undefined;
  /**
   * The password name "password1" or "password2"
   */
  name?: ExpressionOrValue<TokenPasswordName> | undefined;
  /**
   * Read-only output: The password value.
   */
  readonly value?: Expression<string> | undefined;
}

export const tokenPasswordShape: FlatModelShape = createFlatModelShape({
  creationTime: {
    armPath: ["creationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  expiry: {
    armPath: ["expiry"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  name: { armPath: ["name"], value: createUnionShape() },
  value: { armPath: ["value"], value: createStringShape(), readOnly: true },
});

/**
 * The properties of a token.
 */
export interface TokenProperties {
  /**
   * The creation date of scope map.
   */
  creationDate?: Date;
  /**
   * The credentials that can be used for authenticating the token.
   */
  credentials?: TokenCredentialsProperties;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * The resource ID of the scope map to which the token will be associated with.
   */
  scopeMapId?: string;
  /**
   * The status of the token example enabled or disabled.
   */
  status?: TokenStatus;
}

/**
 * Input type for The properties of a token.
 */
export interface TokenPropertiesInput extends InputOf<TokenProperties> {
  /**
   * The credentials that can be used for authenticating the token.
   */
  credentials?: TokenCredentialsPropertiesInput | undefined;
  /**
   * The resource ID of the scope map to which the token will be associated with.
   */
  scopeMapId?: ExpressionOrValue<string> | undefined;
  /**
   * The status of the token example enabled or disabled.
   */
  status?: ExpressionOrValue<TokenStatus> | undefined;
}

/**
 * View type for The properties of a token.
 */
export interface TokenPropertiesView extends InputOf<TokenProperties> {
  /**
   * Read-only output: The creation date of scope map.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * The credentials that can be used for authenticating the token.
   */
  credentials?: TokenCredentialsPropertiesView | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * The resource ID of the scope map to which the token will be associated with.
   */
  scopeMapId?: ExpressionOrValue<string> | undefined;
  /**
   * The status of the token example enabled or disabled.
   */
  status?: ExpressionOrValue<TokenStatus> | undefined;
}

export const tokenPropertiesShape: FlatModelShape = createFlatModelShape({
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  credentials: {
    armPath: ["credentials"],
    value: createDeferredShape(() => tokenCredentialsPropertiesShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  scopeMapId: { armPath: ["scopeMapId"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The content trust policy for a container registry.
 */
export interface TrustPolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: PolicyStatus;
  /**
   * The type of trust policy.
   */
  type?: TrustPolicyType;
}

/**
 * Input type for The content trust policy for a container registry.
 */
export interface TrustPolicyInput extends InputOf<TrustPolicy> {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: ExpressionOrValue<PolicyStatus> | undefined;
  /**
   * The type of trust policy.
   */
  type?: ExpressionOrValue<TrustPolicyType> | undefined;
}

/**
 * View type for The content trust policy for a container registry.
 */
export type TrustPolicyView = TrustPolicyInput;

export const trustPolicyShape: FlatModelShape = createFlatModelShape({
  status: { armPath: ["status"], value: createUnionShape() },
  type: { armPath: ["type"], value: createUnionShape() },
});

export interface UserIdentityProperties {
  /**
   * The client id of user assigned identity.
   */
  clientId?: string;
  /**
   * The principal id of user assigned identity.
   */
  principalId?: string;
}

export interface UserIdentityPropertiesInput extends InputOf<UserIdentityProperties> {}

export interface UserIdentityPropertiesView extends InputOf<UserIdentityProperties> {
  /**
   * Read-only output: The client id of user assigned identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal id of user assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userIdentityPropertiesShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * The properties of a webhook.
 */
export interface WebhookProperties {
  /**
   * The list of actions that trigger the webhook to post notifications.
   */
  actions: WebhookAction[];
  /**
   * Custom headers that will be added to the webhook notifications.
   */
  customHeaders?: Record<string, string>;
  /**
   * The provisioning state of the webhook at the time the operation was called.
   */
  provisioningState?: ProvisioningState;
  /**
   * The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events.
   */
  scope?: string;
  /**
   * The service URI for the webhook to post notifications.
   */
  serviceUri: string;
  /**
   * The status of the webhook at the time the operation was called.
   */
  status?: WebhookStatus;
}

/**
 * Input type for The properties of a webhook.
 */
export interface WebhookPropertiesInput extends InputOf<WebhookProperties> {
  /**
   * The list of actions that trigger the webhook to post notifications.
   */
  actions: InputArray<ExpressionOrValue<WebhookAction>, WebhookAction[]>;
  /**
   * Custom headers that will be added to the webhook notifications.
   */
  customHeaders?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events.
   */
  scope?: ExpressionOrValue<string> | undefined;
  /**
   * The service URI for the webhook to post notifications.
   */
  serviceUri: ExpressionOrValue<string>;
  /**
   * The status of the webhook at the time the operation was called.
   */
  status?: ExpressionOrValue<WebhookStatus> | undefined;
}

/**
 * View type for The properties of a webhook.
 */
export interface WebhookPropertiesView extends InputOf<WebhookProperties> {
  /**
   * The list of actions that trigger the webhook to post notifications.
   */
  actions: InputArray<ExpressionOrValue<WebhookAction>, WebhookAction[]>;
  /**
   * Custom headers that will be added to the webhook notifications.
   */
  customHeaders?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Read-only output: The provisioning state of the webhook at the time the operation was called.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events.
   */
  scope?: ExpressionOrValue<string> | undefined;
  /**
   * The service URI for the webhook to post notifications.
   */
  serviceUri: ExpressionOrValue<string>;
  /**
   * The status of the webhook at the time the operation was called.
   */
  status?: ExpressionOrValue<WebhookStatus> | undefined;
}

export const webhookPropertiesShape: FlatModelShape = createFlatModelShape({
  actions: { armPath: ["actions"], value: createArrayShape(createUnionShape()) },
  customHeaders: { armPath: ["customHeaders"], value: createRecordShape(createStringShape()) },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  scope: { armPath: ["scope"], value: createStringShape() },
  serviceUri: { armPath: ["serviceUri"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * The action of IP ACL rule.
 *
 * Known values:
 *
 * - `"Allow"`
 */
export type Action = string;

/**
 * A message indicating if changes on the service provider require any updates on the consumer.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"Recreate"`
 */
export type ActionsRequired = string;

/**
 * The activation status of the connected registry.
 *
 * Known values:
 *
 * - `"Active"`
 *
 * - `"Inactive"`
 */
export type ActivationStatus = string;

/**
 * Indicates whether audit logs are enabled on the connected registry.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 */
export type AuditLogStatus = string;

/**
 * The value that indicates whether the policy is enabled or not.
 *
 * Known values:
 *
 * - `"enabled"`
 *
 * - `"disabled"`
 */
export type AzureAdAuthenticationAsArmPolicyStatus = string;

/**
 * The type of certificate location.
 *
 * Known values:
 *
 * - `"LocalDirectory"`
 */
export type CertificateType = string;

/**
 * The mode of the connected registry resource that indicates the permissions of the registry.
 *
 * Known values:
 *
 * - `"ReadWrite"`
 *
 * - `"ReadOnly"`
 *
 * - `"Registry"`
 *
 * - `"Mirror"`
 */
export type ConnectedRegistryMode = string;

/**
 * The current connection state of the connected registry.
 *
 * Known values:
 *
 * - `"Online"`
 *
 * - `"Offline"`
 *
 * - `"Syncing"`
 *
 * - `"Unhealthy"`
 */
export type ConnectionState = string;

/**
 * The private link service connection status.
 *
 * Known values:
 *
 * - `"Approved"`
 *
 * - `"Pending"`
 *
 * - `"Rejected"`
 *
 * - `"Disconnected"`
 */
export type ConnectionStatus = string;

/**
 * The kind of entity that created the resource.
 *
 * Known values:
 *
 * - `"User"`: The entity was created by a user.
 *
 * - `"Application"`: The entity was created by an application.
 *
 * - `"ManagedIdentity"`: The entity was created by a managed identity.
 *
 * - `"Key"`: The entity was created by a key.
 */
export type CreatedByType = string;

/**
 * The health status of credential.
 *
 * Known values:
 *
 * - `"Healthy"`
 *
 * - `"Unhealthy"`
 */
export type CredentialHealthStatus = string;

/**
 * The name of the credential.
 *
 * Known values:
 *
 * - `"Credential1"`
 */
export type CredentialName = string;

/**
 * The default action of allow or deny when no other rules match.
 *
 * Known values:
 *
 * - `"Allow"`
 *
 * - `"Deny"`
 */
export type DefaultAction = string;

/**
 * Indicates whether or not the encryption is enabled for container registry.
 *
 * Known values:
 *
 * - `"enabled"`
 *
 * - `"disabled"`
 */
export type EncryptionStatus = string;

/**
 * The value that indicates whether the policy is enabled or not.
 *
 * Known values:
 *
 * - `"enabled"`
 *
 * - `"disabled"`
 */
export type ExportPolicyStatus = string;

/**
 * The verbosity of logs persisted on the connected registry.
 *
 * Known values:
 *
 * - `"Debug"`
 *
 * - `"Information"`
 *
 * - `"Warning"`
 *
 * - `"Error"`
 *
 * - `"None"`
 */
export type LogLevel = string;

/**
 * Whether to allow trusted Azure services to access a network restricted registry.
 *
 * Known values:
 *
 * - `"AzureServices"`
 *
 * - `"None"`
 */
export type NetworkRuleBypassOptions = string;

/**
 * The value that indicates whether the policy is enabled or not.
 *
 * Known values:
 *
 * - `"enabled"`
 *
 * - `"disabled"`
 */
export type PolicyStatus = string;

/**
 * The provisioning state of the archive at the time the operation was called.
 *
 * Known values:
 *
 * - `"Creating"`
 *
 * - `"Updating"`
 *
 * - `"Deleting"`
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 *
 * - `"Canceled"`
 */
export type ProvisioningState = string;

/**
 * Whether or not public network access is allowed for the container registry.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 */
export type PublicNetworkAccess = string;

/**
 * Determines registry role assignment mode.
 *
 * Known values:
 *
 * - `"AbacRepositoryPermissions"`
 *
 * - `"LegacyRegistryPermissions"`
 */
export type RoleAssignmentMode = string;

/**
 * The SKU name of the container registry. Required for registry creation.
 *
 * Known values:
 *
 * - `"Classic"`
 *
 * - `"Basic"`
 *
 * - `"Standard"`
 *
 * - `"Premium"`
 */
export type SkuName = string;

/**
 * The SKU tier based on the SKU name.
 *
 * Known values:
 *
 * - `"Classic"`
 *
 * - `"Basic"`
 *
 * - `"Standard"`
 *
 * - `"Premium"`
 */
export type SkuTier = string;

/**
 * Indicates whether HTTPS is enabled for the login server.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 */
export type TlsStatus = string;

/**
 * Known values:
 *
 * - `"certificate1"`
 *
 * - `"certificate2"`
 */
export type TokenCertificateName = string;

/**
 * The password name "password1" or "password2"
 *
 * Known values:
 *
 * - `"password1"`
 *
 * - `"password2"`
 */
export type TokenPasswordName = string;

/**
 * The status of the token example enabled or disabled.
 *
 * Known values:
 *
 * - `"enabled"`
 *
 * - `"disabled"`
 */
export type TokenStatus = string;

/**
 * The type of trust policy.
 *
 * Known values:
 *
 * - `"Notary"`
 */
export type TrustPolicyType = string;

/**
 * Known values:
 *
 * - `"push"`
 *
 * - `"delete"`
 *
 * - `"quarantine"`
 *
 * - `"chart_push"`
 *
 * - `"chart_delete"`
 */
export type WebhookAction = string;

/**
 * The status of the webhook at the time the operation was called.
 *
 * Known values:
 *
 * - `"enabled"`
 *
 * - `"disabled"`
 */
export type WebhookStatus = string;

/**
 * Whether or not zone redundancy is enabled for this container registry
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 */
export type ZoneRedundancy = string;
