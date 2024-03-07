// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface OperationOutput {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplayOutput;
  /**
   * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system"
   *
   * Possible values: "user", "system", "user,system"
   */
  readonly origin?: string;
  /**
   * Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs.
   *
   * Possible values: "Internal"
   */
  actionType?: string;
}

/** Localized display information for and operation. */
export interface OperationDisplayOutput {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  readonly additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** The data catalog resource. */
export interface DataProductsCatalogOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: DataProductsCatalogPropertiesOutput;
}

/** Details for data catalog properties. */
export interface DataProductsCatalogPropertiesOutput {
  /** The data catalog provisioning state. */
  readonly provisioningState?: ProvisioningStateOutput;
  /** The data product publisher information. */
  publishers: Array<PublisherInformationOutput>;
}

/** Details for Publisher Information. */
export interface PublisherInformationOutput {
  /** Name of the publisher. */
  publisherName: string;
  /** Data product information. */
  dataProducts: Array<DataProductInformationOutput>;
}

/** Data Product Information */
export interface DataProductInformationOutput {
  /** Name of data product. */
  dataProductName: string;
  /** Description about data product. */
  description: string;
  /** Version information of data product. */
  dataProductVersions: Array<DataProductVersionOutput>;
}

/** Data Product Version. */
export interface DataProductVersionOutput {
  /** Version of data product */
  version: string;
}

/** The base proxy resource. */
export interface ProxyResourceBaseOutput extends ArmResourceOutput {}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResourceOutput extends ArmResourceBaseOutput {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemDataOutput;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /**
   * The type of identity that created the resource.
   *
   * Possible values: "User", "Application", "ManagedIdentity", "Key"
   */
  readonly createdByType?: string;
  /** The type of identity that created the resource. */
  readonly createdAt?: string;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   *
   * Possible values: "User", "Application", "ManagedIdentity", "Key"
   */
  readonly lastModifiedByType?: string;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: string;
}

/** Base class used for type definitions */
export interface ArmResourceBaseOutput {}

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBaseOutput extends ArmResourceOutput {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The data product resource. */
export interface DataProductOutput extends TrackedResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: DataProductPropertiesOutput;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedIdentityPropertiesOutput;
}

/** The data product properties. */
export interface DataProductPropertiesOutput {
  /** The resource GUID property of the data product resource. */
  readonly resourceGuid?: string;
  /** Latest provisioning state  of data product. */
  readonly provisioningState?: ProvisioningStateOutput;
  /** Data product publisher name. */
  publisher: string;
  /** Product name of data product. */
  product: string;
  /** Major version of data product. */
  majorVersion: string;
  /** List of name or email associated with data product resource deployment. */
  owners?: string[];
  /** Flag to enable or disable redundancy for data product. */
  redundancy?: ControlStateOutput;
  /** Purview account url for data product to connect to. */
  purviewAccount?: string;
  /** Purview collection url for data product to connect to. */
  purviewCollection?: string;
  /** Flag to enable or disable private link for data product resource. */
  privateLinksEnabled?: ControlStateOutput;
  /** Flag to enable or disable public access of data product resource. */
  publicNetworkAccess?: ControlStateOutput;
  /** Flag to enable customer managed key encryption for data product. */
  customerManagedKeyEncryptionEnabled?: ControlStateOutput;
  /** Customer managed encryption key details for data product. */
  customerEncryptionKey?: EncryptionKeyDetailsOutput;
  /** Network rule set for data product. */
  networkacls?: DataProductNetworkAclsOutput;
  /** Managed resource group configuration. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfigurationOutput;
  /** List of available minor versions of the data product resource. */
  readonly availableMinorVersions?: string[];
  /** Current configured minor version of the data product resource. */
  currentMinorVersion?: string;
  /** Documentation link for the data product based on definition file. */
  readonly documentation?: string;
  /** Resource links which exposed to the customer to query the data. */
  readonly consumptionEndpoints?: ConsumptionEndpointsPropertiesOutput;
  /** Key vault url. */
  readonly keyVaultUrl?: string;
}

/** Encryption key details. */
export interface EncryptionKeyDetailsOutput {
  /** The Uri of the key vault. */
  keyVaultUri: string;
  /** The name of the key vault key. */
  keyName: string;
  /** The version of the key vault key. */
  keyVersion: string;
}

/** Data Product Network rule set */
export interface DataProductNetworkAclsOutput {
  /** Virtual Network Rule */
  virtualNetworkRule: Array<VirtualNetworkRuleOutput>;
  /** IP rule with specific IP or IP range in CIDR format. */
  ipRules: Array<IPRulesOutput>;
  /** The list of query ips in the format of CIDR allowed to connect to query/visualization endpoint. */
  allowedQueryIpRangeList: string[];
  /** Default Action */
  defaultAction: DefaultActionOutput;
}

/** Virtual Network Rule */
export interface VirtualNetworkRuleOutput {
  /** Resource ID of a subnet */
  id: string;
  /** The action of virtual network rule. */
  action?: string;
  /** Gets the state of virtual network rule. */
  state?: string;
}

/** IP rule with specific IP or IP range in CIDR format. */
export interface IPRulesOutput {
  /** IP Rules Value */
  value?: string;
  /** The action of virtual network rule. */
  action: string;
}

/** ManagedResourceGroup related properties */
export interface ManagedResourceGroupConfigurationOutput {
  /** Name of managed resource group */
  name: string;
  /** Managed Resource Group location */
  location: string;
}

/** Details of Consumption Properties */
export interface ConsumptionEndpointsPropertiesOutput {
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
export interface ManagedIdentityPropertiesOutput {
  /** The Active Directory tenant id of the principal. */
  readonly tenantId?: string;
  /** The active directory identifier of this principal. */
  readonly principalId?: string;
  /**
   * The type of managed identity assigned to this resource.
   *
   * Possible values: "None", "SystemAssigned", "UserAssigned", "SystemAssigned, UserAssigned"
   */
  type: string;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentityOutput>;
}

/** A managed identity assigned by the user. */
export interface UserAssignedIdentityOutput {
  /** The active directory client identifier for this principal. */
  clientId?: string;
  /** The active directory identifier for this principal. */
  principalId?: string;
}

/** The base extension resource. */
export interface ExtensionResourceBaseOutput extends ArmResourceOutput {}

/** The data type resource. */
export interface DataTypeOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: DataTypePropertiesOutput;
}

/** The data type properties */
export interface DataTypePropertiesOutput {
  /** Latest provisioning state  of data product. */
  readonly provisioningState?: ProvisioningStateOutput;
  /** State of data type. */
  state?: DataTypeStateOutput;
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

/** The private endpoint connection resource */
export interface PrivateEndpointConnectionOutput
  extends ProxyResourceBaseOutput {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionPropertiesOutput;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The group identifiers for the private endpoint resource */
  readonly groupIds?: string[];
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateOutput;
  /**
   * The provisioning state of the private endpoint connection resource.
   *
   * Possible values: "Succeeded", "Failed", "Canceled", "Creating", "Deleting"
   */
  provisioningState?: string;
}

/** The private endpoint resource */
export interface PrivateEndpointOutput {
  /** The resource identifier for private endpoint */
  id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionStateOutput {
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   *
   * Possible values: "Pending", "Approved", "Rejected"
   */
  status?: string;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export interface PrivateLinkResourceOutput extends ProxyResourceBaseOutput {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourcePropertiesOutput;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourcePropertiesOutput {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** Details of storage container account sas token . */
export interface ContainerSasTokenOutput {
  /** Field to specify storage container sas token. */
  storageContainerSasToken: string;
}

/** Details of storage account sas token . */
export interface AccountSasTokenOutput {
  /** Field to specify storage account sas token. */
  storageAccountSasToken: string;
}

/** The details for role assignment response. */
export interface RoleAssignmentDetailOutput {
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
  role: DataProductUserRoleOutput;
  /** Id of role assignment request */
  roleAssignmentId: string;
}

/** list role assignments. */
export interface ListRoleAssignmentsOutput {
  /** Count of role assignments. */
  count: number;
  /** list of role assignments */
  roleAssignmentResponse: Array<RoleAssignmentDetailOutput>;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export type PagedOperationOutput = Paged<OperationOutput>;
/** Alias for ProvisioningStateOutput */
export type ProvisioningStateOutput =
  | string
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Provisioning"
  | "Updating"
  | "Deleting"
  | "Accepted";
/** Alias for ControlStateOutput */
export type ControlStateOutput = string | "Enabled" | "Disabled";
/** Alias for DefaultActionOutput */
export type DefaultActionOutput = string | "Allow" | "Deny";
/** Alias for DataTypeStateOutput */
export type DataTypeStateOutput = string | "Stopped" | "Running";
/** The response of a DataProductsCatalog list operation. */
export type DataProductsCatalogListResultOutput =
  Paged<DataProductsCatalogOutput>;
/** The response of a DataType list operation. */
export type DataTypeListResultOutput = Paged<DataTypeOutput>;
/** Alias for DataProductUserRoleOutput */
export type DataProductUserRoleOutput = string | "Reader" | "SensitiveReader";
/** The response of a DataProduct list operation. */
export type DataProductListResultOutput = Paged<DataProductOutput>;
