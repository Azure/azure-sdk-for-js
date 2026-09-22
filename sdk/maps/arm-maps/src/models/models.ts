// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An Azure resource which represents access to a suite of Maps REST APIs. */
export interface MapsAccount extends TrackedResource {
  /** The map account properties. */
  properties?: MapsAccountProperties;
  /** The SKU of this account. */
  sku: Sku;
  /** Get or Set Kind property. */
  kind?: Kind;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function mapsAccountSerializer(item: MapsAccount): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : mapsAccountPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function mapsAccountDeserializer(item: any): MapsAccount {
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
    properties: !item["properties"]
      ? item["properties"]
      : mapsAccountPropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Additional Maps account properties */
export interface MapsAccountProperties {
  /** A unique identifier for the Maps Account */
  readonly uniqueId?: string;
  /** Allows toggle functionality on Azure Policy to disable Azure Maps local authentication support. This will disable Shared Keys and Shared Access Signature Token authentication from any usage. */
  disableLocalAuth?: boolean;
  /** The provisioning state of the Maps account resource, Account updates can only be performed on terminal states. Terminal states: `Succeeded` and `Failed` */
  readonly provisioningState?: string;
  /** The array of associated resources to the Maps account. Linked resource in the array cannot individually update, you must update all linked resources in the array together. These resources may be used on operations on the Azure Maps REST API. Access is controlled by the Maps Account Managed Identity(s) permissions to those resource(s). */
  linkedResources?: LinkedResource[];
  /** Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service. */
  cors?: CorsRules;
  /** All encryption configuration for a resource. */
  encryption?: Encryption;
  /** List of additional data processing regions for the Maps Account, which may result in requests being processed in another geography. Some features or results may be restricted to specific regions. By default, Maps REST APIs process requests according to the account location or the [geographic scope](https://learn.microsoft.com/azure/azure-maps/geographic-scope). */
  locations?: LocationsItem[];
  /** List of private endpoint connections associated with the Maps Account. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Property to specify whether the Maps Account will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function mapsAccountPropertiesSerializer(item: MapsAccountProperties): any {
  return {
    disableLocalAuth: item["disableLocalAuth"],
    linkedResources: !item["linkedResources"]
      ? item["linkedResources"]
      : linkedResourceArraySerializer(item["linkedResources"]),
    cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    locations: !item["locations"]
      ? item["locations"]
      : locationsItemArraySerializer(item["locations"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function mapsAccountPropertiesDeserializer(item: any): MapsAccountProperties {
  return {
    uniqueId: item["uniqueId"],
    disableLocalAuth: item["disableLocalAuth"],
    provisioningState: item["provisioningState"],
    linkedResources: !item["linkedResources"]
      ? item["linkedResources"]
      : linkedResourceArrayDeserializer(item["linkedResources"]),
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    locations: !item["locations"]
      ? item["locations"]
      : locationsItemArrayDeserializer(item["locations"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function linkedResourceArraySerializer(result: Array<LinkedResource>): any[] {
  return result.map((item) => {
    return linkedResourceSerializer(item);
  });
}

export function linkedResourceArrayDeserializer(result: Array<LinkedResource>): any[] {
  return result.map((item) => {
    return linkedResourceDeserializer(item);
  });
}

/** Linked resource is reference to a resource deployed in an Azure subscription, add the linked resource `uniqueName` value as an optional parameter for operations on Azure Maps Geospatial REST APIs. */
export interface LinkedResource {
  /** A provided name which uniquely identifies the linked resource. */
  uniqueName: string;
  /** ARM resource id in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/accounts/{storageName}'. */
  id: string;
}

export function linkedResourceSerializer(item: LinkedResource): any {
  return { uniqueName: item["uniqueName"], id: item["id"] };
}

export function linkedResourceDeserializer(item: any): LinkedResource {
  return {
    uniqueName: item["uniqueName"],
    id: item["id"],
  };
}

/** Sets the CORS rules. You can include up to five CorsRule elements in the request. */
export interface CorsRules {
  /** The list of CORS rules. You can include up to five CorsRule elements in the request. */
  corsRules?: CorsRule[];
}

export function corsRulesSerializer(item: CorsRules): any {
  return {
    corsRules: !item["corsRules"] ? item["corsRules"] : corsRuleArraySerializer(item["corsRules"]),
  };
}

export function corsRulesDeserializer(item: any): CorsRules {
  return {
    corsRules: !item["corsRules"]
      ? item["corsRules"]
      : corsRuleArrayDeserializer(item["corsRules"]),
  };
}

export function corsRuleArraySerializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleSerializer(item);
  });
}

export function corsRuleArrayDeserializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleDeserializer(item);
  });
}

/** Specifies a CORS rule for the Map Account. */
export interface CorsRule {
  /** Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains */
  allowedOrigins: string[];
}

export function corsRuleSerializer(item: CorsRule): any {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
  };
}

export function corsRuleDeserializer(item: any): CorsRule {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
  };
}

/** (Optional) Discouraged to include in resource definition. Only needed where it is possible to disable platform (AKA infrastructure) encryption. Azure SQL TDE is an example of this. Values are enabled and disabled. */
export interface Encryption {
  /** Values are enabled and disabled. */
  infrastructureEncryption?: InfrastructureEncryption;
  /** All Customer-managed key encryption properties for the resource. */
  customerManagedKeyEncryption?: CustomerManagedKeyEncryption;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    infrastructureEncryption: item["infrastructureEncryption"],
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionSerializer(item["customerManagedKeyEncryption"]),
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    infrastructureEncryption: item["infrastructureEncryption"],
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionDeserializer(item["customerManagedKeyEncryption"]),
  };
}

/** (Optional) Discouraged to include in resource definition. Only needed where it is possible to disable platform (AKA infrastructure) encryption. Azure SQL TDE is an example of this. Values are enabled and disabled. */
export enum KnownInfrastructureEncryption {
  /** Encryption is enabled */
  Enabled = "enabled",
  /** Encryption is disabled */
  Disabled = "disabled",
}

/**
 * (Optional) Discouraged to include in resource definition. Only needed where it is possible to disable platform (AKA infrastructure) encryption. Azure SQL TDE is an example of this. Values are enabled and disabled. \
 * {@link KnownInfrastructureEncryption} can be used interchangeably with InfrastructureEncryption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: Encryption is enabled \
 * **disabled**: Encryption is disabled
 */
export type InfrastructureEncryption = string;

/** Customer-managed key encryption properties for the resource. */
export interface CustomerManagedKeyEncryption {
  /** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
  keyEncryptionKeyIdentity?: CustomerManagedKeyEncryptionKeyIdentity;
  /** key encryption key Url, versioned or non-versioned. Ex: https://contosovault.vault.azure.net/keys/contosokek/562a4bb76b524a1493a6afe8e536ee78 or https://contosovault.vault.azure.net/keys/contosokek. */
  keyEncryptionKeyUrl?: string;
}

export function customerManagedKeyEncryptionSerializer(item: CustomerManagedKeyEncryption): any {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : customerManagedKeyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

export function customerManagedKeyEncryptionDeserializer(item: any): CustomerManagedKeyEncryption {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : customerManagedKeyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

/** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
export interface CustomerManagedKeyEncryptionKeyIdentity {
  /** The type of identity to use. Values can be systemAssignedIdentity, userAssignedIdentity, or delegatedResourceIdentity. */
  identityType?: IdentityType;
  /** User assigned identity to use for accessing key encryption key Url. Ex: /subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/<resource group>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId. Mutually exclusive with identityType systemAssignedIdentity. */
  userAssignedIdentityResourceId?: string;
  /** application client identity to use for accessing key encryption key Url in a different tenant. Ex: f83c6b1b-4d34-47e4-bb34-9d83df58b540 */
  federatedClientId?: string;
  /** delegated identity to use for accessing key encryption key Url. Ex: /subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/<resource group>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId. Mutually exclusive with identityType systemAssignedIdentity and userAssignedIdentity - internal use only. */
  delegatedIdentityClientId?: string;
}

export function customerManagedKeyEncryptionKeyIdentitySerializer(
  item: CustomerManagedKeyEncryptionKeyIdentity,
): any {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    federatedClientId: item["federatedClientId"],
    delegatedIdentityClientId: item["delegatedIdentityClientId"],
  };
}

export function customerManagedKeyEncryptionKeyIdentityDeserializer(
  item: any,
): CustomerManagedKeyEncryptionKeyIdentity {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    federatedClientId: item["federatedClientId"],
    delegatedIdentityClientId: item["delegatedIdentityClientId"],
  };
}

/** The type of identity to use. */
export enum KnownIdentityType {
  /** System assigned identity */
  SystemAssignedIdentity = "systemAssignedIdentity",
  /** User assigned identity */
  UserAssignedIdentity = "userAssignedIdentity",
  /** Delegated identity */
  DelegatedResourceIdentity = "delegatedResourceIdentity",
}

/**
 * The type of identity to use. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **systemAssignedIdentity**: System assigned identity \
 * **userAssignedIdentity**: User assigned identity \
 * **delegatedResourceIdentity**: Delegated identity
 */
export type IdentityType = string;

export function locationsItemArraySerializer(result: Array<LocationsItem>): any[] {
  return result.map((item) => {
    return locationsItemSerializer(item);
  });
}

export function locationsItemArrayDeserializer(result: Array<LocationsItem>): any[] {
  return result.map((item) => {
    return locationsItemDeserializer(item);
  });
}

/** Data processing location. */
export interface LocationsItem {
  /** The location name. */
  locationName: string;
}

export function locationsItemSerializer(item: LocationsItem): any {
  return { locationName: item["locationName"] };
}

export function locationsItemDeserializer(item: any): LocationsItem {
  return {
    locationName: item["locationName"],
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

/** The private endpoint connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
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

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
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

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Property to specify whether the Maps Account will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. */
export enum KnownPublicNetworkAccess {
  /** enabled */
  Enabled = "enabled",
  /** disabled */
  Disabled = "disabled",
}

/**
 * Property to specify whether the Maps Account will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: enabled \
 * **disabled**: disabled
 */
export type PublicNetworkAccess = string;

/** The SKU of the Maps Account. */
export interface Sku {
  /** The name of the SKU, in standard format (such as G2). */
  name: Name;
  /** Gets the sku tier. This is based on the SKU name. */
  readonly tier?: string;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The name of the SKU, in standard format (such as G2). */
export enum KnownName {
  /** G2 */
  G2 = "G2",
}

/**
 * The name of the SKU, in standard format (such as G2). \
 * {@link KnownName} can be used interchangeably with Name,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **G2**: G2
 */
export type Name = string;

/** The Kind of the Maps Account. */
export enum KnownKind {
  /** Gen2 */
  Gen2 = "Gen2",
}

/**
 * The Kind of the Maps Account. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Gen2**: Gen2
 */
export type Kind = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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

/** Parameters used to update an existing Maps Account. */
export interface MapsAccountUpdateParameters {
  /** Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. */
  tags?: Record<string, string>;
  /** Get or Set Kind property. */
  kind?: Kind;
  /** The SKU of this account. */
  sku?: Sku;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** A unique identifier for the Maps Account */
  readonly uniqueId?: string;
  /** Allows toggle functionality on Azure Policy to disable Azure Maps local authentication support. This will disable Shared Keys and Shared Access Signature Token authentication from any usage. */
  disableLocalAuth?: boolean;
  /** The provisioning state of the Maps account resource, Account updates can only be performed on terminal states. Terminal states: `Succeeded` and `Failed` */
  readonly provisioningState?: string;
  /** The array of associated resources to the Maps account. Linked resource in the array cannot individually update, you must update all linked resources in the array together. These resources may be used on operations on the Azure Maps REST API. Access is controlled by the Maps Account Managed Identity(s) permissions to those resource(s). */
  linkedResources?: LinkedResource[];
  /** Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service. */
  cors?: CorsRules;
  /** All encryption configuration for a resource. */
  encryption?: Encryption;
  /** List of additional data processing regions for the Maps Account, which may result in requests being processed in another geography. Some features or results may be restricted to specific regions. By default, Maps REST APIs process requests according to the account location or the [geographic scope](https://learn.microsoft.com/azure/azure-maps/geographic-scope). */
  locations?: LocationsItem[];
  /** List of private endpoint connections associated with the Maps Account. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Property to specify whether the Maps Account will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function mapsAccountUpdateParametersSerializer(item: MapsAccountUpdateParameters): any {
  return {
    tags: item["tags"],
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "disableLocalAuth",
      "linkedResources",
      "cors",
      "encryption",
      "locations",
      "publicNetworkAccess",
    ])
      ? undefined
      : _mapsAccountUpdateParametersPropertiesSerializer(item),
  };
}

/** A list of Maps Accounts. */
export interface _MapsAccounts {
  /** The MapsAccount items on this page */
  value: MapsAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _mapsAccountsDeserializer(item: any): _MapsAccounts {
  return {
    value: mapsAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mapsAccountArraySerializer(result: Array<MapsAccount>): any[] {
  return result.map((item) => {
    return mapsAccountSerializer(item);
  });
}

export function mapsAccountArrayDeserializer(result: Array<MapsAccount>): any[] {
  return result.map((item) => {
    return mapsAccountDeserializer(item);
  });
}

/** Parameters used to create an account Shared Access Signature (SAS) token. The REST API access control is provided by Azure Maps Role Based Access (RBAC) identity and access. */
export interface AccountSasParameters {
  /** The Maps account key to use for signing. Picking `primaryKey` or `secondaryKey` will use the Maps account Shared Keys, and using `managedIdentity` will use the auto-renewed private key to sign the SAS. */
  signingKey: SigningKey;
  /** The principal Id also known as the object Id of a User Assigned Managed Identity currently assigned to the Maps Account. To assign a Managed Identity of the account, use operation Create or Update an assign a User Assigned Identity resource Id. */
  principalId: string;
  /** Optional, allows control of which region locations are permitted access to Azure Maps REST APIs with the SAS token. Example: "eastus", "westus2". Omitting this parameter will allow all region locations to be accessible. */
  regions?: string[];
  /** Required parameter which represents the desired maximum request per second to allowed for the given SAS token. This does not guarantee perfect accuracy in measurements but provides application safe guards of abuse with eventual enforcement. */
  maxRatePerSecond: number;
  /** The date time offset of when the token validity begins. For example "2017-05-24T10:42:03.1567373Z". Maximum duration allowed is 24 hours between `start` and `expiry`. */
  start: string;
  /** The date time offset of when the token validity expires. For example "2017-05-24T10:42:03.1567373Z". Maximum duration allowed is 24 hours between `start` and `expiry`. */
  expiry: string;
}

export function accountSasParametersSerializer(item: AccountSasParameters): any {
  return {
    signingKey: item["signingKey"],
    principalId: item["principalId"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
    maxRatePerSecond: item["maxRatePerSecond"],
    start: item["start"],
    expiry: item["expiry"],
  };
}

/** The Maps account key to use for signing. Picking `primaryKey` or `secondaryKey` will use the Maps account Shared Keys, and using `managedIdentity` will use the auto-renewed private key to sign the SAS. */
export enum KnownSigningKey {
  /** primaryKey */
  PrimaryKey = "primaryKey",
  /** secondaryKey */
  SecondaryKey = "secondaryKey",
  /** managedIdentity */
  ManagedIdentity = "managedIdentity",
}

/**
 * The Maps account key to use for signing. Picking `primaryKey` or `secondaryKey` will use the Maps account Shared Keys, and using `managedIdentity` will use the auto-renewed private key to sign the SAS. \
 * {@link KnownSigningKey} can be used interchangeably with SigningKey,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **primaryKey**: primaryKey \
 * **secondaryKey**: secondaryKey \
 * **managedIdentity**: managedIdentity
 */
export type SigningKey = string;

/** A new Sas token which can be used to access the Maps REST APIs and is controlled by the specified Managed identity permissions on Azure (IAM) Role Based Access Control. */
export interface MapsAccountSasToken {
  /** The shared access signature access token. */
  readonly accountSasToken?: string;
}

export function mapsAccountSasTokenDeserializer(item: any): MapsAccountSasToken {
  return {
    accountSasToken: item["accountSasToken"],
  };
}

/** The set of keys which can be used to access the Maps REST APIs. Two keys are provided for key rotation without interruption. */
export interface MapsAccountKeys {
  /** The last updated date and time of the primary key. */
  readonly primaryKeyLastUpdated?: string;
  /** The primary key for accessing the Maps REST APIs. */
  readonly primaryKey?: string;
  /** The secondary key for accessing the Maps REST APIs. */
  readonly secondaryKey?: string;
  /** The last updated date and time of the secondary key. */
  readonly secondaryKeyLastUpdated?: string;
}

export function mapsAccountKeysDeserializer(item: any): MapsAccountKeys {
  return {
    primaryKeyLastUpdated: item["primaryKeyLastUpdated"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    secondaryKeyLastUpdated: item["secondaryKeyLastUpdated"],
  };
}

/** Whether the operation refers to the primary or secondary key. */
export interface MapsKeySpecification {
  /** Whether the operation refers to the primary or secondary key. */
  keyType: KeyType;
}

export function mapsKeySpecificationSerializer(item: MapsKeySpecification): any {
  return { keyType: item["keyType"] };
}

/** Whether the operation refers to the primary or secondary key. */
export enum KnownKeyType {
  /** primary */
  Primary = "primary",
  /** secondary */
  Secondary = "secondary",
}

/**
 * Whether the operation refers to the primary or secondary key. \
 * {@link KnownKeyType} can be used interchangeably with KeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **primary**: primary \
 * **secondary**: secondary
 */
export type KeyType = string;

/** An Azure resource which represents Maps Creator product and provides ability to manage private location data. */
export interface Creator extends TrackedResource {
  /** The Creator resource properties. */
  properties: CreatorProperties;
}

export function creatorSerializer(item: Creator): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: creatorPropertiesSerializer(item["properties"]),
  };
}

export function creatorDeserializer(item: any): Creator {
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
    properties: creatorPropertiesDeserializer(item["properties"]),
  };
}

/** Creator resource properties */
export interface CreatorProperties {
  /** The state of the resource provisioning, terminal states: Succeeded, Failed, Canceled */
  readonly provisioningState?: string;
  /** The storage units to be allocated. Integer values from 1 to 100, inclusive. */
  storageUnits: number;
  /** The total allocated storage unit size in bytes for the creator resource. */
  totalStorageUnitSizeInBytes?: number;
  /** The consumed storage unit size in bytes for the creator resource. */
  consumedStorageUnitSizeInBytes?: number;
}

export function creatorPropertiesSerializer(item: CreatorProperties): any {
  return {
    storageUnits: item["storageUnits"],
    totalStorageUnitSizeInBytes: item["totalStorageUnitSizeInBytes"],
    consumedStorageUnitSizeInBytes: item["consumedStorageUnitSizeInBytes"],
  };
}

export function creatorPropertiesDeserializer(item: any): CreatorProperties {
  return {
    provisioningState: item["provisioningState"],
    storageUnits: item["storageUnits"],
    totalStorageUnitSizeInBytes: item["totalStorageUnitSizeInBytes"],
    consumedStorageUnitSizeInBytes: item["consumedStorageUnitSizeInBytes"],
  };
}

/** Parameters used to update an existing Creator resource. */
export interface CreatorUpdateParameters {
  /** Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. */
  tags?: Record<string, string>;
  /** The state of the resource provisioning, terminal states: Succeeded, Failed, Canceled */
  readonly provisioningState?: string;
  /** The storage units to be allocated. Integer values from 1 to 100, inclusive. */
  storageUnits?: number;
  /** The total allocated storage unit size in bytes for the creator resource. */
  totalStorageUnitSizeInBytes?: number;
  /** The consumed storage unit size in bytes for the creator resource. */
  consumedStorageUnitSizeInBytes?: number;
}

export function creatorUpdateParametersSerializer(item: CreatorUpdateParameters): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "storageUnits",
      "totalStorageUnitSizeInBytes",
      "consumedStorageUnitSizeInBytes",
    ])
      ? undefined
      : _creatorUpdateParametersPropertiesSerializer(item),
  };
}

/** A list of Creator resources. */
export interface _CreatorList {
  /** The Creator items on this page */
  value: Creator[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _creatorListDeserializer(item: any): _CreatorList {
  return {
    value: creatorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function creatorArraySerializer(result: Array<Creator>): any[] {
  return result.map((item) => {
    return creatorSerializer(item);
  });
}

export function creatorArrayDeserializer(result: Array<Creator>): any[] {
  return result.map((item) => {
    return creatorDeserializer(item);
  });
}

/** A private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
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
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
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

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** A list of private link resources for a Maps Account resource type. */
export interface _PrivateLinkResourceList {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListDeserializer(item: any): _PrivateLinkResourceList {
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

/** A list of private endpoint connections */
export interface _PrivateEndpointConnectionList {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListDeserializer(
  item: any,
): _PrivateEndpointConnectionList {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-01-preview API version. */
  V20251001Preview = "2025-10-01-preview",
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _mapsAccountUpdateParametersPropertiesSerializer(
  item: MapsAccountUpdateParameters,
): any {
  return {
    disableLocalAuth: item["disableLocalAuth"],
    linkedResources: !item["linkedResources"]
      ? item["linkedResources"]
      : linkedResourceArraySerializer(item["linkedResources"]),
    cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    locations: !item["locations"]
      ? item["locations"]
      : locationsItemArraySerializer(item["locations"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _mapsAccountUpdateParametersPropertiesDeserializer(item: any) {
  return {
    uniqueId: item["uniqueId"],
    disableLocalAuth: item["disableLocalAuth"],
    provisioningState: item["provisioningState"],
    linkedResources: !item["linkedResources"]
      ? item["linkedResources"]
      : linkedResourceArrayDeserializer(item["linkedResources"]),
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    locations: !item["locations"]
      ? item["locations"]
      : locationsItemArrayDeserializer(item["locations"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _creatorUpdateParametersPropertiesSerializer(item: CreatorUpdateParameters): any {
  return {
    storageUnits: item["storageUnits"],
    totalStorageUnitSizeInBytes: item["totalStorageUnitSizeInBytes"],
    consumedStorageUnitSizeInBytes: item["consumedStorageUnitSizeInBytes"],
  };
}

export function _creatorUpdateParametersPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    storageUnits: item["storageUnits"],
    totalStorageUnitSizeInBytes: item["totalStorageUnitSizeInBytes"],
    consumedStorageUnitSizeInBytes: item["consumedStorageUnitSizeInBytes"],
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
