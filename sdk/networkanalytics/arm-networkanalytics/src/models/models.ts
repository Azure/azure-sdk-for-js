// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Base class used for type definitions */
export interface ArmResourceBase {}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResource extends ArmResourceBase {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The type of identity that created the resource. */
  readonly createdByType?: createdByType;
  /** The type of identity that created the resource. */
  readonly createdAt?: Date;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  readonly lastModifiedByType?: createdByType;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: Date;
}

/** The kind of entity that created the resource. */
/** "User", "Application", "ManagedIdentity", "Key" */
export type createdByType = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBase extends ArmResource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The data product resource. */
export interface DataProduct extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: DataProductProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedIdentityProperties;
}

/** The data product properties. */
export interface DataProductProperties {
  /** The resource GUID property of the data product resource. */
  readonly resourceGuid?: string;
  /** Latest provisioning state  of data product. */
  readonly provisioningState?: ProvisioningState;
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
  /** List of available minor versions of the data product resource. */
  readonly availableMinorVersions?: string[];
  /** Current configured minor version of the data product resource. */
  currentMinorVersion?: string;
  /** Documentation link for the data product based on definition file. */
  readonly documentation?: string;
  /** Resource links which exposed to the customer to query the data. */
  readonly consumptionEndpoints?: ConsumptionEndpointsProperties;
  /** Key vault url. */
  readonly keyVaultUrl?: string;
}

/** The status of the current operation. */
/** "Succeeded", "Failed", "Canceled", "Provisioning", "Updating", "Deleting", "Accepted" */
export type ProvisioningState = string;
/** The data type state */
/** "Enabled", "Disabled" */
export type ControlState = string;

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
  virtualNetworkRule: VirtualNetworkRule[];
  /** IP rule with specific IP or IP range in CIDR format. */
  ipRules: IPRules[];
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

/** Specifies the default action of allow or deny when no other rules match. */
/** "Allow", "Deny" */
export type DefaultAction = string;

/** ManagedResourceGroup related properties */
export interface ManagedResourceGroupConfiguration {
  /** Name of managed resource group */
  name: string;
  /** Managed Resource Group location */
  location: string;
}

/** Details of Consumption Properties */
export interface ConsumptionEndpointsProperties {
  /** Ingestion url to upload the data. */
  readonly ingestionUrl?: string;
  /** Resource Id of ingestion endpoint. */
  readonly ingestionResourceId?: string;
  /** Url to consume file type. */
  readonly fileAccessUrl?: string;
  /** Resource Id of file access endpoint. */
  readonly fileAccessResourceId?: string;
  /** Url to consume the processed data. */
  readonly queryUrl?: string;
  /** Resource Id of query endpoint. */
  readonly queryResourceId?: string;
}

/** The properties of the managed service identities assigned to this resource. */
export interface ManagedIdentityProperties {
  /** The Active Directory tenant id of the principal. */
  readonly tenantId?: string;
  /** The active directory identifier of this principal. */
  readonly principalId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

/** The kind of managed identity assigned to this resource. */
/** "None", "SystemAssigned", "UserAssigned", "SystemAssigned, UserAssigned" */
export type ManagedIdentityType = string;

/** A managed identity assigned by the user. */
export interface UserAssignedIdentity {
  /** The active directory client identifier for this principal. */
  clientId?: string;
  /** The active directory identifier for this principal. */
  principalId?: string;
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

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** The type used for update operations of the DataProduct. */
export interface DataProductUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedIdentityProperties;
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

/** The provisioning state of a resource type. */
/** "Succeeded", "Failed", "Canceled" */
export type ResourceProvisioningState = string;

/** The details for storage account sas creation. */
export interface AccountSas {
  /** Sas token start timestamp. */
  startTimeStamp: Date;
  /** Sas token expiry timestamp. */
  expiryTimeStamp: Date;
  /** Ip Address */
  ipAddress: string;
}

/** Details of storage account sas token . */
export interface AccountSasToken {
  /** Field to specify storage account sas token. */
  storageAccountSasToken: string;
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

/** The data type state */
/** "Reader", "SensitiveReader" */
export type DataProductUserRole = string;

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

/** list role assignments. */
export interface ListRoleAssignments {
  /** Count of role assignments. */
  count: number;
  /** list of role assignments */
  roleAssignmentResponse: RoleAssignmentDetail[];
}

/** The response of a DataProduct list operation. */
export interface DataProductListResult {
  /** The DataProduct items on this page */
  value: DataProduct[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** The base proxy resource. */
export interface ProxyResourceBase extends ArmResource {}

/** The data type resource. */
export interface DataType extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: DataTypeProperties;
}

/** The data type properties */
export interface DataTypeProperties {
  /** Latest provisioning state  of data product. */
  readonly provisioningState?: ProvisioningState;
  /** State of data type. */
  state?: DataTypeState;
  /** Reason for the state of data type. */
  readonly stateReason?: string;
  /** Field for storage output retention in days. */
  storageOutputRetention?: number;
  /** Field for database cache retention in days. */
  databaseCacheRetention?: number;
  /** Field for database data retention in days. */
  databaseRetention?: number;
  /** Url for data visualization. */
  readonly visualizationUrl?: string;
}

/** The data type state */
/** "Stopped", "Running" */
export type DataTypeState = string;

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
  startTimeStamp: Date;
  /** Sas token expiry timestamp. */
  expiryTimeStamp: Date;
  /** Ip Address */
  ipAddress: string;
}

/** Details of storage container account sas token . */
export interface ContainerSasToken {
  /** Field to specify storage container sas token. */
  storageContainerSasToken: string;
}

/** The response of a DataType list operation. */
export interface DataTypeListResult {
  /** The DataType items on this page */
  value: DataType[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** The data catalog resource. */
export interface DataProductsCatalog extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: DataProductsCatalogProperties;
}

/** Details for data catalog properties. */
export interface DataProductsCatalogProperties {
  /** The data catalog provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** The data product publisher information. */
  publishers: PublisherInformation[];
}

/** Details for Publisher Information. */
export interface PublisherInformation {
  /** Name of the publisher. */
  publisherName: string;
  /** Data product information. */
  dataProducts: DataProductInformation[];
}

/** Data Product Information */
export interface DataProductInformation {
  /** Name of data product. */
  dataProductName: string;
  /** Description about data product. */
  description: string;
  /** Version information of data product. */
  dataProductVersions: DataProductVersion[];
}

/** Data Product Version. */
export interface DataProductVersion {
  /** Version of data product */
  version: string;
}

/** The response of a DataProductsCatalog list operation. */
export interface DataProductsCatalogListResult {
  /** The DataProductsCatalog items on this page */
  value: DataProductsCatalog[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface PagedOperation {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
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
  /** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
/** "user", "system", "user,system" */
export type Origin = string;
/** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
/** "Internal" */
export type ActionType = string;
