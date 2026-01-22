// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The configuration store along with all resource properties. The Configuration Store will have all information to begin utilizing it. */
export interface ConfigurationStore extends TrackedResource {
  /** The managed identity information, if configured. */
  identity?: ResourceIdentity;
  /** The sku of the configuration store. */
  sku: Sku;
  /** The provisioning state of the configuration store. */
  readonly provisioningState?: ProvisioningState;
  /** The creation date of configuration store. */
  readonly creationDate?: Date;
  /** The DNS endpoint where the configuration store API will be available. */
  readonly endpoint?: string;
  /** The encryption settings of the configuration store. */
  encryption?: EncryptionProperties;
  /** The list of private endpoint connections that are set up for this resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionReference[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Disables all authentication methods other than AAD authentication. */
  disableLocalAuth?: boolean;
  /** The amount of time in days that the configuration store will be retained when it is soft deleted. */
  softDeleteRetentionInDays?: number;
  /** The duration in seconds to retain new key value revisions. Defaults to 604800 (7 days) for Free SKU stores and 2592000 (30 days) for Standard SKU stores and Premium SKU stores. */
  defaultKeyValueRevisionRetentionPeriodInSeconds?: number;
  /** Property specifying whether protection against purge is enabled for this configuration store. */
  enablePurgeProtection?: boolean;
  /** Property specifying the configuration of data plane proxy for Azure Resource Manager (ARM). */
  dataPlaneProxy?: DataPlaneProxyProperties;
  /** Indicates whether the configuration store need to be recovered. */
  createMode?: CreateMode;
  /** Property specifying the configuration of telemetry for this configuration store */
  telemetry?: TelemetryProperties;
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
  /** Property specifying the configuration of Azure Front Door for this configuration store */
  azureFrontDoor?: AzureFrontDoorProperties;
}

export function configurationStoreSerializer(item: ConfigurationStore): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "encryption",
      "publicNetworkAccess",
      "disableLocalAuth",
      "softDeleteRetentionInDays",
      "defaultKeyValueRevisionRetentionPeriodInSeconds",
      "enablePurgeProtection",
      "dataPlaneProxy",
      "createMode",
      "telemetry",
      "azureFrontDoor",
    ])
      ? undefined
      : _configurationStorePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
    sku: skuSerializer(item["sku"]),
  };
}

export function configurationStoreDeserializer(item: any): ConfigurationStore {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _configurationStorePropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : resourceIdentityDeserializer(item["identity"]),
    sku: skuDeserializer(item["sku"]),
  };
}

/** The properties of a configuration store. */
export interface ConfigurationStoreProperties {
  /** The provisioning state of the configuration store. */
  readonly provisioningState?: ProvisioningState;
  /** The creation date of configuration store. */
  readonly creationDate?: Date;
  /** The DNS endpoint where the configuration store API will be available. */
  readonly endpoint?: string;
  /** The encryption settings of the configuration store. */
  encryption?: EncryptionProperties;
  /** The list of private endpoint connections that are set up for this resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionReference[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Disables all authentication methods other than AAD authentication. */
  disableLocalAuth?: boolean;
  /** The amount of time in days that the configuration store will be retained when it is soft deleted. */
  softDeleteRetentionInDays?: number;
  /** The duration in seconds to retain new key value revisions. Defaults to 604800 (7 days) for Free SKU stores and 2592000 (30 days) for Standard SKU stores and Premium SKU stores. */
  defaultKeyValueRevisionRetentionPeriodInSeconds?: number;
  /** Property specifying whether protection against purge is enabled for this configuration store. */
  enablePurgeProtection?: boolean;
  /** Property specifying the configuration of data plane proxy for Azure Resource Manager (ARM). */
  dataPlaneProxy?: DataPlaneProxyProperties;
  /** Indicates whether the configuration store need to be recovered. */
  createMode?: CreateMode;
  /** Property specifying the configuration of telemetry for this configuration store */
  telemetry?: TelemetryProperties;
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
  /** Property specifying the configuration of Azure Front Door for this configuration store */
  azureFrontDoor?: AzureFrontDoorProperties;
}

export function configurationStorePropertiesSerializer(item: ConfigurationStoreProperties): any {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    defaultKeyValueRevisionRetentionPeriodInSeconds:
      item["defaultKeyValueRevisionRetentionPeriodInSeconds"],
    enablePurgeProtection: item["enablePurgeProtection"],
    dataPlaneProxy: !item["dataPlaneProxy"]
      ? item["dataPlaneProxy"]
      : dataPlaneProxyPropertiesSerializer(item["dataPlaneProxy"]),
    createMode: item["createMode"],
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : telemetryPropertiesSerializer(item["telemetry"]),
    azureFrontDoor: !item["azureFrontDoor"]
      ? item["azureFrontDoor"]
      : azureFrontDoorPropertiesSerializer(item["azureFrontDoor"]),
  };
}

export function configurationStorePropertiesDeserializer(item: any): ConfigurationStoreProperties {
  return {
    provisioningState: item["provisioningState"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    endpoint: item["endpoint"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDeserializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionReferenceArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    defaultKeyValueRevisionRetentionPeriodInSeconds:
      item["defaultKeyValueRevisionRetentionPeriodInSeconds"],
    enablePurgeProtection: item["enablePurgeProtection"],
    dataPlaneProxy: !item["dataPlaneProxy"]
      ? item["dataPlaneProxy"]
      : dataPlaneProxyPropertiesDeserializer(item["dataPlaneProxy"]),
    createMode: item["createMode"],
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : telemetryPropertiesDeserializer(item["telemetry"]),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    azureFrontDoor: !item["azureFrontDoor"]
      ? item["azureFrontDoor"]
      : azureFrontDoorPropertiesDeserializer(item["azureFrontDoor"]),
  };
}

/** The provisioning state of the configuration store. */
export enum KnownProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the configuration store. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** The encryption settings for a configuration store. */
export interface EncryptionProperties {
  /** Key vault properties. */
  keyVaultProperties?: KeyVaultProperties;
}

export function encryptionPropertiesSerializer(item: EncryptionProperties): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function encryptionPropertiesDeserializer(item: any): EncryptionProperties {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
  };
}

/** Settings concerning key vault encryption for a configuration store. */
export interface KeyVaultProperties {
  /** The URI of the key vault key used to encrypt data. */
  keyIdentifier?: string;
  /** The client id of the identity which will be used to access key vault. */
  identityClientId?: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return { keyIdentifier: item["keyIdentifier"], identityClientId: item["identityClientId"] };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyIdentifier: item["keyIdentifier"],
    identityClientId: item["identityClientId"],
  };
}

export function privateEndpointConnectionReferenceArrayDeserializer(
  result: Array<PrivateEndpointConnectionReference>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionReferenceDeserializer(item);
  });
}

/** A reference to a related private endpoint connection. */
export interface PrivateEndpointConnectionReference {
  /** The resource ID. */
  readonly id?: string;
  /** The name of the resource. */
  readonly name?: string;
  /** The type of the resource. */
  readonly type?: string;
  /** The provisioning status of the private endpoint connection. */
  readonly provisioningState?: ProvisioningState;
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionReferenceDeserializer(
  item: any,
): PrivateEndpointConnectionReference {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionReferencePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The provisioning status of the private endpoint connection. */
  readonly provisioningState?: ProvisioningState;
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

/** Private endpoint which a connection belongs to. */
export interface PrivateEndpoint {
  /** The resource Id for private endpoint */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The state of a private link service connection. */
export interface PrivateLinkServiceConnectionState {
  /** The private link service connection status. */
  status?: ConnectionStatus;
  /** The private link service connection description. */
  description?: string;
  /** Any action that is required beyond basic workflow (approve/ reject/ disconnect) */
  readonly actionsRequired?: ActionsRequired;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return { status: item["status"], description: item["description"] };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private link service connection status. */
export enum KnownConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The private link service connection status. \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type ConnectionStatus = string;

/** Any action that is required beyond basic workflow (approve/ reject/ disconnect) */
export enum KnownActionsRequired {
  /** None */
  None = "None",
  /** Recreate */
  Recreate = "Recreate",
}

/**
 * Any action that is required beyond basic workflow (approve/ reject/ disconnect) \
 * {@link KnownActionsRequired} can be used interchangeably with ActionsRequired,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Recreate**
 */
export type ActionsRequired = string;

/** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Control permission for data plane traffic coming from public networks while private endpoint is enabled. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** The data plane proxy settings for a configuration store. */
export interface DataPlaneProxyProperties {
  /** The data plane proxy authentication mode. This property manages the authentication mode of request to the data plane resources. */
  authenticationMode?: AuthenticationMode;
  /** The data plane proxy private link delegation. This property manages if a request from delegated ARM private link is allowed when the data plane resource requires private link. */
  privateLinkDelegation?: PrivateLinkDelegation;
}

export function dataPlaneProxyPropertiesSerializer(item: DataPlaneProxyProperties): any {
  return {
    authenticationMode: item["authenticationMode"],
    privateLinkDelegation: item["privateLinkDelegation"],
  };
}

export function dataPlaneProxyPropertiesDeserializer(item: any): DataPlaneProxyProperties {
  return {
    authenticationMode: item["authenticationMode"],
    privateLinkDelegation: item["privateLinkDelegation"],
  };
}

/** The data plane proxy authentication mode. This property manages the authentication mode of request to the data plane resources. */
export enum KnownAuthenticationMode {
  /** The local authentication mode. Users are not required to have data plane permissions if local authentication is not disabled. */
  Local = "Local",
  /** The pass-through authentication mode. User identity will be passed through from ARM, requiring user to have data plane action permissions (Available via App Configuration Data Owner/ App Configuration Data Reader). */
  PassThrough = "Pass-through",
}

/**
 * The data plane proxy authentication mode. This property manages the authentication mode of request to the data plane resources. \
 * {@link KnownAuthenticationMode} can be used interchangeably with AuthenticationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local**: The local authentication mode. Users are not required to have data plane permissions if local authentication is not disabled. \
 * **Pass-through**: The pass-through authentication mode. User identity will be passed through from ARM, requiring user to have data plane action permissions (Available via App Configuration Data Owner\/ App Configuration Data Reader).
 */
export type AuthenticationMode = string;

/** The data plane proxy private link delegation. This property manages if a request from delegated ARM private link is allowed when the data plane resource requires private link. */
export enum KnownPrivateLinkDelegation {
  /** ARM private endpoint is required if the resource requires private link. */
  Enabled = "Enabled",
  /** Request is denied if the resource requires private link. */
  Disabled = "Disabled",
}

/**
 * The data plane proxy private link delegation. This property manages if a request from delegated ARM private link is allowed when the data plane resource requires private link. \
 * {@link KnownPrivateLinkDelegation} can be used interchangeably with PrivateLinkDelegation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: ARM private endpoint is required if the resource requires private link. \
 * **Disabled**: Request is denied if the resource requires private link.
 */
export type PrivateLinkDelegation = string;
/** Indicates whether the configuration store need to be recovered. */
export type CreateMode = "Recover" | "Default";

/** Telemetry settings */
export interface TelemetryProperties {
  /** Resource ID of a resource enabling telemetry collection */
  resourceId?: string;
}

export function telemetryPropertiesSerializer(item: TelemetryProperties): any {
  return { resourceId: item["resourceId"] };
}

export function telemetryPropertiesDeserializer(item: any): TelemetryProperties {
  return {
    resourceId: item["resourceId"],
  };
}

/** Managed-On-Behalf-Of configuration properties. This configuration exists for the resources where a resource provider manages those resources on behalf of the resource owner. */
export interface ManagedOnBehalfOfConfiguration {
  /** Managed-On-Behalf-Of broker resources */
  readonly moboBrokerResources?: MoboBrokerResource[];
}

export function managedOnBehalfOfConfigurationDeserializer(
  item: any,
): ManagedOnBehalfOfConfiguration {
  return {
    moboBrokerResources: !item["moboBrokerResources"]
      ? item["moboBrokerResources"]
      : moboBrokerResourceArrayDeserializer(item["moboBrokerResources"]),
  };
}

export function moboBrokerResourceArrayDeserializer(result: Array<MoboBrokerResource>): any[] {
  return result.map((item) => {
    return moboBrokerResourceDeserializer(item);
  });
}

/** Managed-On-Behalf-Of broker resource. This resource is created by the Resource Provider to manage some resources on behalf of the user. */
export interface MoboBrokerResource {
  /** Resource identifier of a Managed-On-Behalf-Of broker resource */
  id?: string;
}

export function moboBrokerResourceDeserializer(item: any): MoboBrokerResource {
  return {
    id: item["id"],
  };
}

/** Azure Front Door settings */
export interface AzureFrontDoorProperties {
  /** Resource ID of an Azure Front Door profile */
  resourceId?: string;
}

export function azureFrontDoorPropertiesSerializer(item: AzureFrontDoorProperties): any {
  return { resourceId: item["resourceId"] };
}

export function azureFrontDoorPropertiesDeserializer(item: any): AzureFrontDoorProperties {
  return {
    resourceId: item["resourceId"],
  };
}

/** An identity that can be associated with a resource. */
export interface ResourceIdentity {
  /** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identities. */
  type?: IdentityType;
  /** The list of user-assigned identities associated with the resource. The user-assigned identity dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserIdentity>;
  /** The principal id of the identity. This property will only be provided for a system-assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the resource's identity. This property will only be provided for a system-assigned identity. */
  readonly tenantId?: string;
}

export function resourceIdentitySerializer(item: ResourceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function resourceIdentityDeserializer(item: any): ResourceIdentity {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityRecordDeserializer(item["userAssignedIdentities"]),
    principalId: item["principalId"],
    tenantId: item["tenantId"],
  };
}

/** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identities. */
export enum KnownIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned, UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identities. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned, UserAssigned**
 */
export type IdentityType = string;

export function userIdentityRecordSerializer(
  item: Record<string, UserIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentitySerializer(item[key]);
  });
  return result;
}

export function userIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityDeserializer(item[key]);
  });
  return result;
}

/** A resource identity that is managed by the user of the service. */
export interface UserIdentity {
  /** The principal ID of the user-assigned identity. */
  readonly principalId?: string;
  /** The client ID of the user-assigned identity. */
  readonly clientId?: string;
}

export function userIdentitySerializer(item: UserIdentity): any {
  return item;
}

export function userIdentityDeserializer(item: any): UserIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Describes a configuration store SKU. */
export interface Sku {
  /** The SKU name of the configuration store. */
  name: string;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The parameters for updating a configuration store. */
export interface ConfigurationStoreUpdateParameters {
  /** The managed identity information for the configuration store. */
  identity?: ResourceIdentity;
  /** The SKU of the configuration store. */
  sku?: Sku;
  /** The ARM resource tags. */
  tags?: Record<string, string>;
  /** The encryption settings of the configuration store. */
  encryption?: EncryptionProperties;
  /** Disables all authentication methods other than AAD authentication. */
  disableLocalAuth?: boolean;
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Property specifying whether protection against purge is enabled for this configuration store. */
  enablePurgeProtection?: boolean;
  /** Property specifying the configuration of data plane proxy for Azure Resource Manager (ARM). */
  dataPlaneProxy?: DataPlaneProxyProperties;
  /** The duration in seconds to retain new key value revisions. Defaults to 604800 (7 days) for Free SKU stores and 2592000 (30 days) for Standard SKU stores and Premium SKU stores. */
  defaultKeyValueRevisionRetentionPeriodInSeconds?: number;
  /** Property specifying the configuration of telemetry to update for this configuration store */
  telemetry?: TelemetryProperties;
  /** Property specifying the configuration of Azure Front Door for this configuration store */
  azureFrontDoor?: AzureFrontDoorProperties;
}

export function configurationStoreUpdateParametersSerializer(
  item: ConfigurationStoreUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "encryption",
      "disableLocalAuth",
      "publicNetworkAccess",
      "enablePurgeProtection",
      "dataPlaneProxy",
      "defaultKeyValueRevisionRetentionPeriodInSeconds",
      "telemetry",
      "azureFrontDoor",
    ])
      ? undefined
      : _configurationStoreUpdateParametersPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** The properties for updating a configuration store. */
export interface ConfigurationStorePropertiesUpdateParameters {
  /** The encryption settings of the configuration store. */
  encryption?: EncryptionProperties;
  /** Disables all authentication methods other than AAD authentication. */
  disableLocalAuth?: boolean;
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Property specifying whether protection against purge is enabled for this configuration store. */
  enablePurgeProtection?: boolean;
  /** Property specifying the configuration of data plane proxy for Azure Resource Manager (ARM). */
  dataPlaneProxy?: DataPlaneProxyProperties;
  /** The duration in seconds to retain new key value revisions. Defaults to 604800 (7 days) for Free SKU stores and 2592000 (30 days) for Standard SKU stores and Premium SKU stores. */
  defaultKeyValueRevisionRetentionPeriodInSeconds?: number;
  /** Property specifying the configuration of telemetry to update for this configuration store */
  telemetry?: TelemetryProperties;
  /** Property specifying the configuration of Azure Front Door for this configuration store */
  azureFrontDoor?: AzureFrontDoorProperties;
}

export function configurationStorePropertiesUpdateParametersSerializer(
  item: ConfigurationStorePropertiesUpdateParameters,
): any {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    disableLocalAuth: item["disableLocalAuth"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enablePurgeProtection: item["enablePurgeProtection"],
    dataPlaneProxy: !item["dataPlaneProxy"]
      ? item["dataPlaneProxy"]
      : dataPlaneProxyPropertiesSerializer(item["dataPlaneProxy"]),
    defaultKeyValueRevisionRetentionPeriodInSeconds:
      item["defaultKeyValueRevisionRetentionPeriodInSeconds"],
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : telemetryPropertiesSerializer(item["telemetry"]),
    azureFrontDoor: !item["azureFrontDoor"]
      ? item["azureFrontDoor"]
      : azureFrontDoorPropertiesSerializer(item["azureFrontDoor"]),
  };
}

/** The response of a ConfigurationStore list operation. */
export interface _ConfigurationStoreListResult {
  /** The ConfigurationStore items on this page */
  value: ConfigurationStore[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configurationStoreListResultDeserializer(
  item: any,
): _ConfigurationStoreListResult {
  return {
    value: configurationStoreArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configurationStoreArraySerializer(result: Array<ConfigurationStore>): any[] {
  return result.map((item) => {
    return configurationStoreSerializer(item);
  });
}

export function configurationStoreArrayDeserializer(result: Array<ConfigurationStore>): any[] {
  return result.map((item) => {
    return configurationStoreDeserializer(item);
  });
}

/** The result of a request to list API keys. */
export interface _ApiKeyListResult {
  /** The ApiKey items on this page */
  value: ApiKey[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _apiKeyListResultDeserializer(item: any): _ApiKeyListResult {
  return {
    value: apiKeyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiKeyArrayDeserializer(result: Array<ApiKey>): any[] {
  return result.map((item) => {
    return apiKeyDeserializer(item);
  });
}

/** An API key used for authenticating with a configuration store endpoint. */
export interface ApiKey {
  /** The key ID. */
  readonly id?: string;
  /** A name for the key describing its usage. */
  readonly name?: string;
  /** The value of the key that is used for authentication purposes. */
  readonly value?: string;
  /** A connection string that can be used by supporting clients for authentication. */
  readonly connectionString?: string;
  /** The last time any of the key's properties were modified. */
  readonly lastModified?: Date;
  /** Whether this key can only be used for read operations. */
  readonly readOnly?: boolean;
}

export function apiKeyDeserializer(item: any): ApiKey {
  return {
    id: item["id"],
    name: item["name"],
    value: item["value"],
    connectionString: item["connectionString"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    readOnly: item["readOnly"],
  };
}

/** The parameters used to regenerate an API key. */
export interface RegenerateKeyParameters {
  /** The id of the key to regenerate. */
  id?: string;
}

export function regenerateKeyParametersSerializer(item: RegenerateKeyParameters): any {
  return { id: item["id"] };
}

/** Deleted configuration store information with extended details. */
export interface DeletedConfigurationStore extends ProxyResource {
  /** The resource id of the original configuration store. */
  readonly configurationStoreId?: string;
  /** The location of the original configuration store. */
  readonly location?: string;
  /** The deleted date. */
  readonly deletionDate?: Date;
  /** The scheduled purged date. */
  readonly scheduledPurgeDate?: Date;
  /** Tags of the original configuration store. */
  readonly tags?: Record<string, string>;
  /** Purge protection status of the original configuration store. */
  readonly purgeProtectionEnabled?: boolean;
}

export function deletedConfigurationStoreDeserializer(item: any): DeletedConfigurationStore {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deletedConfigurationStorePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the deleted configuration store. */
export interface DeletedConfigurationStoreProperties {
  /** The resource id of the original configuration store. */
  readonly configurationStoreId?: string;
  /** The location of the original configuration store. */
  readonly location?: string;
  /** The deleted date. */
  readonly deletionDate?: Date;
  /** The scheduled purged date. */
  readonly scheduledPurgeDate?: Date;
  /** Tags of the original configuration store. */
  readonly tags?: Record<string, string>;
  /** Purge protection status of the original configuration store. */
  readonly purgeProtectionEnabled?: boolean;
}

export function deletedConfigurationStorePropertiesDeserializer(
  item: any,
): DeletedConfigurationStoreProperties {
  return {
    configurationStoreId: item["configurationStoreId"],
    location: item["location"],
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    purgeProtectionEnabled: item["purgeProtectionEnabled"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a DeletedConfigurationStore list operation. */
export interface _DeletedConfigurationStoreListResult {
  /** The DeletedConfigurationStore items on this page */
  value: DeletedConfigurationStore[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedConfigurationStoreListResultDeserializer(
  item: any,
): _DeletedConfigurationStoreListResult {
  return {
    value: deletedConfigurationStoreArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedConfigurationStoreArrayDeserializer(
  result: Array<DeletedConfigurationStore>,
): any[] {
  return result.map((item) => {
    return deletedConfigurationStoreDeserializer(item);
  });
}

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The provisioning status of the private endpoint connection. */
  readonly provisioningState?: ProvisioningState;
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** A resource that supports private link capabilities. */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The list of required DNS zone names of the private link resource. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The list of required DNS zone names of the private link resource. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** The key-value resource along with all resource properties. */
export interface KeyValue extends ProxyResource {
  /**
   * The primary identifier of a key-value.
   * The key is used in unison with the label to uniquely identify a key-value.
   */
  readonly key?: string;
  /**
   * A value used to group key-values.
   * The label is used in unison with the key to uniquely identify a key-value.
   */
  readonly label?: string;
  /** The value of the key-value. */
  value?: string;
  /**
   * The content type of the key-value's value.
   * Providing a proper content-type can enable transformations of values when they are retrieved by applications.
   */
  contentType?: string;
  /** An ETag indicating the state of a key-value within a configuration store. */
  readonly eTag?: string;
  /** The last time a modifying operation was performed on the given key-value. */
  readonly lastModified?: Date;
  /**
   * A value indicating whether the key-value is locked.
   * A locked key-value may not be modified until it is unlocked.
   */
  readonly locked?: boolean;
  /** A dictionary of tags that can help identify what a key-value may be applicable for. */
  tags?: Record<string, string>;
}

export function keyValueSerializer(item: KeyValue): any {
  return {
    properties: areAllPropsUndefined(item, ["value", "contentType", "tags"])
      ? undefined
      : _keyValuePropertiesSerializer(item),
  };
}

export function keyValueDeserializer(item: any): KeyValue {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _keyValuePropertiesDeserializer(item["properties"])),
  };
}

/** All key-value properties. */
export interface KeyValueProperties {
  /**
   * The primary identifier of a key-value.
   * The key is used in unison with the label to uniquely identify a key-value.
   */
  readonly key?: string;
  /**
   * A value used to group key-values.
   * The label is used in unison with the key to uniquely identify a key-value.
   */
  readonly label?: string;
  /** The value of the key-value. */
  value?: string;
  /**
   * The content type of the key-value's value.
   * Providing a proper content-type can enable transformations of values when they are retrieved by applications.
   */
  contentType?: string;
  /** An ETag indicating the state of a key-value within a configuration store. */
  readonly eTag?: string;
  /** The last time a modifying operation was performed on the given key-value. */
  readonly lastModified?: Date;
  /**
   * A value indicating whether the key-value is locked.
   * A locked key-value may not be modified until it is unlocked.
   */
  readonly locked?: boolean;
  /** A dictionary of tags that can help identify what a key-value may be applicable for. */
  tags?: Record<string, string>;
}

export function keyValuePropertiesSerializer(item: KeyValueProperties): any {
  return { value: item["value"], contentType: item["contentType"], tags: item["tags"] };
}

export function keyValuePropertiesDeserializer(item: any): KeyValueProperties {
  return {
    key: item["key"],
    label: item["label"],
    value: item["value"],
    contentType: item["contentType"],
    eTag: item["eTag"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    locked: item["locked"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The replica resource. */
export interface Replica extends ProxyResource {
  /** The location of the replica. */
  location?: string;
  /** The URI of the replica where the replica API will be available. */
  readonly endpoint?: string;
  /** The provisioning state of the replica. */
  readonly provisioningState?: ReplicaProvisioningState;
}

export function replicaSerializer(item: Replica): any {
  return {
    properties: areAllPropsUndefined(item, []) ? undefined : _replicaPropertiesSerializer(item),
    location: item["location"],
  };
}

export function replicaDeserializer(item: any): Replica {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _replicaPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** All replica properties. */
export interface ReplicaProperties {
  /** The URI of the replica where the replica API will be available. */
  readonly endpoint?: string;
  /** The provisioning state of the replica. */
  readonly provisioningState?: ReplicaProvisioningState;
}

export function replicaPropertiesSerializer(item: ReplicaProperties): any {
  return item;
}

export function replicaPropertiesDeserializer(item: any): ReplicaProperties {
  return {
    endpoint: item["endpoint"],
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning state of the replica. */
export enum KnownReplicaProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the replica. \
 * {@link KnownReplicaProvisioningState} can be used interchangeably with ReplicaProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Succeeded** \
 * **Deleting** \
 * **Failed** \
 * **Canceled**
 */
export type ReplicaProvisioningState = string;

/** The response of a Replica list operation. */
export interface _ReplicaListResult {
  /** The Replica items on this page */
  value: Replica[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicaListResultDeserializer(item: any): _ReplicaListResult {
  return {
    value: replicaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicaArraySerializer(result: Array<Replica>): any[] {
  return result.map((item) => {
    return replicaSerializer(item);
  });
}

export function replicaArrayDeserializer(result: Array<Replica>): any[] {
  return result.map((item) => {
    return replicaDeserializer(item);
  });
}

/** The snapshot resource. */
export interface Snapshot extends ProxyResource {
  /** The provisioning state of the snapshot. */
  readonly provisioningState?: ProvisioningState;
  /** The current status of the snapshot. */
  readonly status?: SnapshotStatus;
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters?: KeyValueFilter[];
  /** The composition type describes how the key-values within the snapshot are composed. The 'key' composition type ensures there are no two key-values containing the same key. The 'key_label' composition type ensures there are no two key-values containing the same key and label. */
  compositionType?: CompositionType;
  /** The time that the snapshot was created. */
  readonly created?: Date;
  /** The time that the snapshot will expire. */
  readonly expires?: Date;
  /** The amount of time, in seconds, that a snapshot will remain in the archived state before expiring. This property is only writable during the creation of a snapshot. If not specified, the default lifetime of key-value revisions will be used. */
  retentionPeriod?: number;
  /** The size in bytes of the snapshot. */
  readonly size?: number;
  /** The amount of key-values in the snapshot. */
  readonly itemsCount?: number;
  /** The tags of the snapshot. NOTE: These are data plane tags, not ARM tags. */
  tags?: Record<string, string>;
  /** A value representing the current state of the snapshot. */
  readonly etag?: string;
}

export function snapshotSerializer(item: Snapshot): any {
  return {
    properties: areAllPropsUndefined(item, [
      "filters",
      "compositionType",
      "retentionPeriod",
      "tags",
    ])
      ? undefined
      : _snapshotPropertiesSerializer(item),
  };
}

export function snapshotDeserializer(item: any): Snapshot {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _snapshotPropertiesDeserializer(item["properties"])),
  };
}

/** All snapshot properties. */
export interface SnapshotProperties {
  /** The provisioning state of the snapshot. */
  readonly provisioningState?: ProvisioningState;
  /** The current status of the snapshot. */
  readonly status?: SnapshotStatus;
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters: KeyValueFilter[];
  /** The composition type describes how the key-values within the snapshot are composed. The 'key' composition type ensures there are no two key-values containing the same key. The 'key_label' composition type ensures there are no two key-values containing the same key and label. */
  compositionType?: CompositionType;
  /** The time that the snapshot was created. */
  readonly created?: Date;
  /** The time that the snapshot will expire. */
  readonly expires?: Date;
  /** The amount of time, in seconds, that a snapshot will remain in the archived state before expiring. This property is only writable during the creation of a snapshot. If not specified, the default lifetime of key-value revisions will be used. */
  retentionPeriod?: number;
  /** The size in bytes of the snapshot. */
  readonly size?: number;
  /** The amount of key-values in the snapshot. */
  readonly itemsCount?: number;
  /** The tags of the snapshot. NOTE: These are data plane tags, not ARM tags. */
  tags?: Record<string, string>;
  /** A value representing the current state of the snapshot. */
  readonly etag?: string;
}

export function snapshotPropertiesSerializer(item: SnapshotProperties): any {
  return {
    filters: keyValueFilterArraySerializer(item["filters"]),
    compositionType: item["compositionType"],
    retentionPeriod: item["retentionPeriod"],
    tags: item["tags"],
  };
}

export function snapshotPropertiesDeserializer(item: any): SnapshotProperties {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    filters: keyValueFilterArrayDeserializer(item["filters"]),
    compositionType: item["compositionType"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    expires: !item["expires"] ? item["expires"] : new Date(item["expires"]),
    retentionPeriod: item["retentionPeriod"],
    size: item["size"],
    itemsCount: item["itemsCount"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
  };
}

/** The current status of the snapshot. */
export enum KnownSnapshotStatus {
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Ready */
  Ready = "Ready",
  /** Archived */
  Archived = "Archived",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current status of the snapshot. \
 * {@link KnownSnapshotStatus} can be used interchangeably with SnapshotStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning** \
 * **Ready** \
 * **Archived** \
 * **Failed**
 */
export type SnapshotStatus = string;

export function keyValueFilterArraySerializer(result: Array<KeyValueFilter>): any[] {
  return result.map((item) => {
    return keyValueFilterSerializer(item);
  });
}

export function keyValueFilterArrayDeserializer(result: Array<KeyValueFilter>): any[] {
  return result.map((item) => {
    return keyValueFilterDeserializer(item);
  });
}

/** Enables filtering of key-values. */
export interface KeyValueFilter {
  /** Filters key-values by their key field. */
  key: string;
  /** Filters key-values by their label field. */
  label?: string;
}

export function keyValueFilterSerializer(item: KeyValueFilter): any {
  return { key: item["key"], label: item["label"] };
}

export function keyValueFilterDeserializer(item: any): KeyValueFilter {
  return {
    key: item["key"],
    label: item["label"],
  };
}

/** The composition type describes how the key-values within the snapshot are composed. The 'key' composition type ensures there are no two key-values containing the same key. The 'key_label' composition type ensures there are no two key-values containing the same key and label. */
export enum KnownCompositionType {
  /** Key */
  Key = "Key",
  /** Key_Label */
  KeyLabel = "Key_Label",
}

/**
 * The composition type describes how the key-values within the snapshot are composed. The 'key' composition type ensures there are no two key-values containing the same key. The 'key_label' composition type ensures there are no two key-values containing the same key and label. \
 * {@link KnownCompositionType} can be used interchangeably with CompositionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Key** \
 * **Key_Label**
 */
export type CompositionType = string;

/** The result of a request to list configuration store operations. */
export interface _OperationDefinitionListResult {
  /** The collection value. */
  value?: OperationDefinition[];
  /** The URI that can be used to request the next set of paged results. */
  readonly nextLink?: string;
}

export function _operationDefinitionListResultDeserializer(
  item: any,
): _OperationDefinitionListResult {
  return {
    value: !item["value"] ? item["value"] : operationDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationDefinitionArrayDeserializer(result: Array<OperationDefinition>): any[] {
  return result.map((item) => {
    return operationDefinitionDeserializer(item);
  });
}

/** The definition of a configuration store operation. */
export interface OperationDefinition {
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** The display information for the configuration store operation. */
  display?: OperationDefinitionDisplay;
  /** Origin of the operation */
  origin?: string;
  /** Properties of the operation */
  properties?: OperationProperties;
}

export function operationDefinitionDeserializer(item: any): OperationDefinition {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : operationDefinitionDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** The display information for a configuration store operation. */
export interface OperationDefinitionDisplay {
  /** The resource provider name: Microsoft App Configuration." */
  readonly provider?: string;
  /** The resource on which the operation is performed. */
  resource?: string;
  /** The operation that users can perform. */
  operation?: string;
  /** The description for the operation. */
  description?: string;
}

export function operationDefinitionDisplayDeserializer(item: any): OperationDefinitionDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Extra Operation properties */
export interface OperationProperties {
  /** Service specifications of the operation */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Service specification payload */
export interface ServiceSpecification {
  /** Specifications of the Log for Azure Monitoring */
  logSpecifications?: LogSpecification[];
  /** Specifications of the Metrics for Azure Monitoring */
  metricSpecifications?: MetricSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Specifications of the Log for Azure Monitoring */
export interface LogSpecification {
  /** Name of the log */
  name?: string;
  /** Localized friendly display name of the log */
  displayName?: string;
  /** Blob duration of the log */
  blobDuration?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Specifications of the Metrics for Azure Monitoring */
export interface MetricSpecification {
  /** Name of the metric */
  name?: string;
  /** Localized friendly display name of the metric */
  displayName?: string;
  /** Localized friendly description of the metric */
  displayDescription?: string;
  /** Unit that makes sense for the metric */
  unit?: string;
  /** Only provide one value for this field. Valid values: Average, Minimum, Maximum, Total, Count. */
  aggregationType?: string;
  /** Internal metric name. */
  internalMetricName?: string;
  /** Dimensions of the metric */
  dimensions?: MetricDimension[];
  /** Optional. If set to true, then zero will be returned for time duration where no metric is emitted/published. */
  fillGapWithZero?: boolean;
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    internalMetricName: item["internalMetricName"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArrayDeserializer(item["dimensions"]),
    fillGapWithZero: item["fillGapWithZero"],
  };
}

export function metricDimensionArrayDeserializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionDeserializer(item);
  });
}

/** Specifications of the Dimension of metrics */
export interface MetricDimension {
  /** Name of the dimension */
  name?: string;
  /** Localized friendly display name of the dimension */
  displayName?: string;
  /** Internal name of the dimension. */
  internalName?: string;
}

export function metricDimensionDeserializer(item: any): MetricDimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    internalName: item["internalName"],
  };
}

/** Parameters used for checking whether a resource name is available. */
export interface CheckNameAvailabilityParameters {
  /** The name to check for availability. */
  name: string;
  /** The resource type to check for name availability. */
  type: ConfigurationResourceType;
}

export function checkNameAvailabilityParametersSerializer(
  item: CheckNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The resource type to check for name availability. */
export enum KnownConfigurationResourceType {
  /** Microsoft.AppConfiguration/configurationStores */
  MicrosoftAppConfigurationConfigurationStores = "Microsoft.AppConfiguration/configurationStores",
}

/**
 * The resource type to check for name availability. \
 * {@link KnownConfigurationResourceType} can be used interchangeably with ConfigurationResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.AppConfiguration\/configurationStores**
 */
export type ConfigurationResourceType = string;

/** The result of a request to check the availability of a resource name. */
export interface NameAvailabilityStatus {
  /** The value indicating whether the resource name is available. */
  readonly nameAvailable?: boolean;
  /** If any, the error message that provides more detail for the reason that the name is not available. */
  readonly message?: string;
  /** If any, the reason that the name is not available. */
  readonly reason?: string;
}

export function nameAvailabilityStatusDeserializer(item: any): NameAvailabilityStatus {
  return {
    nameAvailable: item["nameAvailable"],
    message: item["message"],
    reason: item["reason"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-02-01-preview API version. */
  V20250201Preview = "2025-02-01-preview",
  /** The 2025-06-01-preview API version. */
  V20250601Preview = "2025-06-01-preview",
}

export function _privateEndpointConnectionReferencePropertiesSerializer(
  item: PrivateEndpointConnectionReference,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionReferencePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _configurationStorePropertiesSerializer(item: ConfigurationStore): any {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    defaultKeyValueRevisionRetentionPeriodInSeconds:
      item["defaultKeyValueRevisionRetentionPeriodInSeconds"],
    enablePurgeProtection: item["enablePurgeProtection"],
    dataPlaneProxy: !item["dataPlaneProxy"]
      ? item["dataPlaneProxy"]
      : dataPlaneProxyPropertiesSerializer(item["dataPlaneProxy"]),
    createMode: item["createMode"],
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : telemetryPropertiesSerializer(item["telemetry"]),
    azureFrontDoor: !item["azureFrontDoor"]
      ? item["azureFrontDoor"]
      : azureFrontDoorPropertiesSerializer(item["azureFrontDoor"]),
  };
}

export function _configurationStorePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    endpoint: item["endpoint"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDeserializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionReferenceArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    defaultKeyValueRevisionRetentionPeriodInSeconds:
      item["defaultKeyValueRevisionRetentionPeriodInSeconds"],
    enablePurgeProtection: item["enablePurgeProtection"],
    dataPlaneProxy: !item["dataPlaneProxy"]
      ? item["dataPlaneProxy"]
      : dataPlaneProxyPropertiesDeserializer(item["dataPlaneProxy"]),
    createMode: item["createMode"],
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : telemetryPropertiesDeserializer(item["telemetry"]),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    azureFrontDoor: !item["azureFrontDoor"]
      ? item["azureFrontDoor"]
      : azureFrontDoorPropertiesDeserializer(item["azureFrontDoor"]),
  };
}

export function _configurationStoreUpdateParametersPropertiesSerializer(
  item: ConfigurationStoreUpdateParameters,
): any {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    disableLocalAuth: item["disableLocalAuth"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enablePurgeProtection: item["enablePurgeProtection"],
    dataPlaneProxy: !item["dataPlaneProxy"]
      ? item["dataPlaneProxy"]
      : dataPlaneProxyPropertiesSerializer(item["dataPlaneProxy"]),
    defaultKeyValueRevisionRetentionPeriodInSeconds:
      item["defaultKeyValueRevisionRetentionPeriodInSeconds"],
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : telemetryPropertiesSerializer(item["telemetry"]),
    azureFrontDoor: !item["azureFrontDoor"]
      ? item["azureFrontDoor"]
      : azureFrontDoorPropertiesSerializer(item["azureFrontDoor"]),
  };
}

export function _deletedConfigurationStorePropertiesDeserializer(item: any) {
  return {
    configurationStoreId: item["configurationStoreId"],
    location: item["location"],
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    purgeProtectionEnabled: item["purgeProtectionEnabled"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _keyValuePropertiesSerializer(item: KeyValue): any {
  return { value: item["value"], contentType: item["contentType"], tags: item["tags"] };
}

export function _keyValuePropertiesDeserializer(item: any) {
  return {
    key: item["key"],
    label: item["label"],
    value: item["value"],
    contentType: item["contentType"],
    eTag: item["eTag"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    locked: item["locked"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _replicaPropertiesSerializer(item: Replica): any {
  return item;
}

export function _replicaPropertiesDeserializer(item: any) {
  return {
    endpoint: item["endpoint"],
    provisioningState: item["provisioningState"],
  };
}

export function _snapshotPropertiesSerializer(item: Snapshot): any {
  return {
    filters: !item["filters"] ? item["filters"] : keyValueFilterArraySerializer(item["filters"]),
    compositionType: item["compositionType"],
    retentionPeriod: item["retentionPeriod"],
    tags: item["tags"],
  };
}

export function _snapshotPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    filters: !item["filters"] ? item["filters"] : keyValueFilterArrayDeserializer(item["filters"]),
    compositionType: item["compositionType"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    expires: !item["expires"] ? item["expires"] : new Date(item["expires"]),
    retentionPeriod: item["retentionPeriod"],
    size: item["size"],
    itemsCount: item["itemsCount"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
  };
}
