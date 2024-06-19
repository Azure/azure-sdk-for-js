// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The data catalog resource. */
export interface DataProductsCatalog extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DataProductsCatalogProperties;
}

/** Details for data catalog properties. */
export interface DataProductsCatalogProperties {
  /** The data product publisher information. */
  publishers: Array<PublisherInformation>;
}

/** Details for Publisher Information. */
export interface PublisherInformation {
  /** Name of the publisher. */
  publisherName: string;
  /** Data product information. */
  dataProducts: Array<DataProductInformation>;
}

/** Data Product Information */
export interface DataProductInformation {
  /** Name of data product. */
  dataProductName: string;
  /** Description about data product. */
  description: string;
  /** Version information of data product. */
  dataProductVersions: Array<DataProductVersion>;
}

/** Data Product Version. */
export interface DataProductVersion {
  /** Version of data product */
  version: string;
}

/** The base proxy resource. */
export interface ProxyResource extends Resource {}

/** Common properties for all Azure Resource Manager resources. */
export interface Resource {}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The data product resource. */
export interface DataProduct extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DataProductProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

/** The data product properties. */
export interface DataProductProperties {
  /** Data product publisher name. */
  publisher: string;
  /** Product name of data product. */
  product: string;
  /** Major version of data product. */
  majorVersion: string;
  /** List of name or email associated with data product resource deployment. */
  owners?: string[];
  /** Flag to enable or disable redundancy for data product. */
  redundancy?: ControlState;
  /** Purview account url for data product to connect to. */
  purviewAccount?: string;
  /** Purview collection url for data product to connect to. */
  purviewCollection?: string;
  /** Flag to enable or disable private link for data product resource. */
  privateLinksEnabled?: ControlState;
  /** Flag to enable or disable public access of data product resource. */
  publicNetworkAccess?: ControlState;
  /** Flag to enable customer managed key encryption for data product. */
  customerManagedKeyEncryptionEnabled?: ControlState;
  /** Customer managed encryption key details for data product. */
  customerEncryptionKey?: EncryptionKeyDetails;
  /** Network rule set for data product. */
  networkacls?: DataProductNetworkAcls;
  /** Managed resource group configuration. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** Current configured minor version of the data product resource. */
  currentMinorVersion?: string;
}

/** Encryption key details. */
export interface EncryptionKeyDetails {
  /** The Uri of the key vault. */
  keyVaultUri: string;
  /** The name of the key vault key. */
  keyName: string;
  /** The version of the key vault key. */
  keyVersion: string;
}

/** Data Product Network rule set */
export interface DataProductNetworkAcls {
  /** Virtual Network Rule */
  virtualNetworkRule: Array<VirtualNetworkRule>;
  /** IP rule with specific IP or IP range in CIDR format. */
  ipRules: Array<IPRules>;
  /** The list of query ips in the format of CIDR allowed to connect to query/visualization endpoint. */
  allowedQueryIpRangeList: string[];
  /** Default Action */
  defaultAction: DefaultAction;
}

/** Virtual Network Rule */
export interface VirtualNetworkRule {
  /** Resource ID of a subnet */
  id: string;
  /** The action of virtual network rule. */
  action?: string;
  /** Gets the state of virtual network rule. */
  state?: string;
}

/** IP rule with specific IP or IP range in CIDR format. */
export interface IPRules {
  /** IP Rules Value */
  value?: string;
  /** The action of virtual network rule. */
  action: string;
}

/** ManagedResourceGroup related properties */
export interface ManagedResourceGroupConfiguration {
  /** Name of managed resource group */
  name: string;
  /** Managed Resource Group location */
  location: string;
}

/** Details of Consumption Properties */
export interface ConsumptionEndpointsProperties {}

/** The properties of the managed service identities assigned to this resource. */
export interface ManagedServiceIdentity {
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: UserAssignedIdentities;
}

/** The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests.", */
export interface UserAssignedIdentities
  extends Record<string, UserAssignedIdentity> {}

/** A managed identity assigned by the user. */
export interface UserAssignedIdentity {
  /** The active directory client identifier for this principal. */
  clientId?: string;
  /** The active directory identifier for this principal. */
  principalId?: string;
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

/** The resource model definition for an Azure Resource Manager resource with an etag. */
export interface AzureEntityResource extends Resource {}

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  provisioningState?: PrivateEndpointConnectionProvisioningState;
}

/** The private endpoint resource */
export interface PrivateEndpoint {
  /** The resource identifier for private endpoint */
  id?: string;
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

export interface PrivateLinkResource extends ProxyResource {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourceProperties;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** The data type resource. */
export interface DataType extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DataTypeProperties;
}

/** The data type properties */
export interface DataTypeProperties {
  /** State of data type. */
  state?: DataTypeState;
  /** Field for storage output retention in days. */
  storageOutputRetention?: number;
  /** Field for database cache retention in days. */
  databaseCacheRetention?: number;
  /** Field for database data retention in days. */
  databaseRetention?: number;
}

/** The type used for update operations of the DataType. */
export interface DataTypeUpdate {
  properties?: DataTypeUpdateProperties;
}

/** The updatable properties of the DataType. */
export interface DataTypeUpdateProperties {
  /** State of data type. */
  state?: DataTypeState;
  /** Field for storage output retention in days. */
  storageOutputRetention?: number;
  /** Field for database cache retention in days. */
  databaseCacheRetention?: number;
  /** Field for database data retention in days. */
  databaseRetention?: number;
}

/** The details for container sas creation. */
export interface ContainerSaS {
  /** Sas token start timestamp. */
  startTimeStamp: Date | string;
  /** Sas token expiry timestamp. */
  expiryTimeStamp: Date | string;
  /** Ip Address */
  ipAddress: string;
}

/** The type used for update operations of the DataProduct. */
export interface DataProductUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  properties?: DataProductUpdateProperties;
}

/** The updatable properties of the DataProduct. */
export interface DataProductUpdateProperties {
  /** List of name or email associated with data product resource deployment. */
  owners?: string[];
  /** Purview account url for data product to connect to. */
  purviewAccount?: string;
  /** Purview collection url for data product to connect to. */
  purviewCollection?: string;
  /** Flag to enable or disable private link for data product resource. */
  privateLinksEnabled?: ControlState;
  /** Current configured minor version of the data product resource. */
  currentMinorVersion?: string;
}

/** The details for storage account sas creation. */
export interface AccountSas {
  /** Sas token start timestamp. */
  startTimeStamp: Date | string;
  /** Sas token expiry timestamp. */
  expiryTimeStamp: Date | string;
  /** Ip Address */
  ipAddress: string;
}

/** Details for KeyVault. */
export interface KeyVaultInfo {
  /** key vault url. */
  keyVaultUrl: string;
}

/** The details for role assignment common properties. */
export interface RoleAssignmentCommonProperties {
  /** Role Id of the Built-In Role */
  roleId: string;
  /** Object ID of the AAD principal or security-group. */
  principalId: string;
  /** User name. */
  userName: string;
  /** Data Type Scope at which the role assignment is created. */
  dataTypeScope: string[];
  /** Type of the principal Id: User, Group or ServicePrincipal */
  principalType: string;
  /** Data Product role to be assigned to a user. */
  role: DataProductUserRole;
}

/** The details for role assignment response. */
export interface RoleAssignmentDetail {
  /** Role Id of the Built-In Role */
  roleId: string;
  /** Object ID of the AAD principal or security-group. */
  principalId: string;
  /** User name. */
  userName: string;
  /** Data Type Scope at which the role assignment is created. */
  dataTypeScope: string[];
  /** Type of the principal Id: User, Group or ServicePrincipal */
  principalType: string;
  /** Data Product role to be assigned to a user. */
  role: DataProductUserRole;
  /** Id of role assignment request */
  roleAssignmentId: string;
}

/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Provisioning"
  | "Updating"
  | "Deleting"
  | "Accepted";
/** Alias for CreatedByType */
export type CreatedByType =
  | "User"
  | "Application"
  | "ManagedIdentity"
  | "Key"
  | string;
/** Alias for ControlState */
export type ControlState = string | "Enabled" | "Disabled";
/** Alias for DefaultAction */
export type DefaultAction = string | "Allow" | "Deny";
/** Alias for ManagedServiceIdentityType */
export type ManagedServiceIdentityType =
  | "None"
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | string;
/** Alias for PrivateEndpointServiceConnectionStatus */
export type PrivateEndpointServiceConnectionStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | string;
/** Alias for ResourceProvisioningState */
export type ResourceProvisioningState =
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | string;
/** Alias for PrivateEndpointConnectionProvisioningState */
export type PrivateEndpointConnectionProvisioningState =
  | ResourceProvisioningState
  | "Creating"
  | "Deleting";
/** Alias for DataTypeState */
export type DataTypeState = string | "Stopped" | "Running";
/** Alias for DataProductUserRole */
export type DataProductUserRole = string | "Reader" | "SensitiveReader";
