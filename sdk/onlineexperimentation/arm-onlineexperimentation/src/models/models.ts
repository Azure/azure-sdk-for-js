// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(
  item: any,
): _OperationListResult {
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
    display: !item["display"]
      ? item["display"]
      : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for and operation. */
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

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
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
    details: !item["details"]
      ? item["details"]
      : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(
  result: Array<ErrorDetail>,
): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(
  result: Array<ErrorAdditionalInfo>,
): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(
  item: any,
): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(
  item: any,
): _ErrorAdditionalInfoInfo {
  return item;
}

/** An online experimentation workspace resource. */
export interface OnlineExperimentationWorkspace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: OnlineExperimentationWorkspaceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: OnlineExperimentationWorkspaceSku;
}

export function onlineExperimentationWorkspaceSerializer(
  item: OnlineExperimentationWorkspace,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : onlineExperimentationWorkspacePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"]
      ? item["sku"]
      : onlineExperimentationWorkspaceSkuSerializer(item["sku"]),
  };
}

export function onlineExperimentationWorkspaceDeserializer(
  item: any,
): OnlineExperimentationWorkspace {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : onlineExperimentationWorkspacePropertiesDeserializer(
          item["properties"],
        ),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"]
      ? item["sku"]
      : onlineExperimentationWorkspaceSkuDeserializer(item["sku"]),
  };
}

/** The properties of an online experimentation workspace. */
export interface OnlineExperimentationWorkspaceProperties {
  /** The Id of the workspace. */
  readonly workspaceId?: string;
  /** The provisioning state for the resource */
  readonly provisioningState?: ResourceProvisioningState;
  /** The resource identifier of the Log Analytics workspace which online experimentation workspace uses for generating experiment analysis results. */
  logAnalyticsWorkspaceResourceId: string;
  /** The resource identifier of storage account where logs are exported from Log Analytics workspace. online experimentation workspace uses it generating experiment analysis results. */
  logsExporterStorageAccountResourceId: string;
  /** The resource identifier of App Configuration with which this online experimentation workspace is tied for experimentation. This is a required field for creating an online experimentation workspace. */
  appConfigurationResourceId: string;
  /** The encryption configuration for the online experimentation workspace resource. */
  encryption?: ResourceEncryptionConfiguration;
  /** The data plane endpoint for the online experimentation workspace resource. */
  readonly endpoint?: string;
  /**
   * Public Network Access Control for the online experimentation resource. Defaults to Enabled if not set.
   * - Enabled: The resource can be accessed from the public internet.
   * - Disabled: The resource can only be accessed from a private endpoint.
   */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** The private endpoint connections associated with the online experimentation workspace resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function onlineExperimentationWorkspacePropertiesSerializer(
  item: OnlineExperimentationWorkspaceProperties,
): any {
  return {
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    logsExporterStorageAccountResourceId:
      item["logsExporterStorageAccountResourceId"],
    appConfigurationResourceId: item["appConfigurationResourceId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : resourceEncryptionConfigurationSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function onlineExperimentationWorkspacePropertiesDeserializer(
  item: any,
): OnlineExperimentationWorkspaceProperties {
  return {
    workspaceId: item["workspaceId"],
    provisioningState: item["provisioningState"],
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    logsExporterStorageAccountResourceId:
      item["logsExporterStorageAccountResourceId"],
    appConfigurationResourceId: item["appConfigurationResourceId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : resourceEncryptionConfigurationDeserializer(item["encryption"]),
    endpoint: item["endpoint"],
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
  };
}

/** The provisioning state of a resource type. */
export enum KnownResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;

/** The encryption configuration for the online experimentation workspace resource. */
export interface ResourceEncryptionConfiguration {
  /** All Customer-managed key encryption properties for the resource. */
  customerManagedKeyEncryption?: CustomerManagedKeyEncryption;
}

export function resourceEncryptionConfigurationSerializer(
  item: ResourceEncryptionConfiguration,
): any {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionSerializer(
          item["customerManagedKeyEncryption"],
        ),
  };
}

export function resourceEncryptionConfigurationDeserializer(
  item: any,
): ResourceEncryptionConfiguration {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionDeserializer(
          item["customerManagedKeyEncryption"],
        ),
  };
}

/** Customer-managed key encryption properties for the resource. */
export interface CustomerManagedKeyEncryption {
  /** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
  keyEncryptionKeyIdentity?: KeyEncryptionKeyIdentity;
  /** key encryption key Url, versioned or non-versioned. Ex: https://contosovault.vault.azure.net/keys/contosokek/562a4bb76b524a1493a6afe8e536ee78 or https://contosovault.vault.azure.net/keys/contosokek. */
  keyEncryptionKeyUrl?: string;
}

export function customerManagedKeyEncryptionSerializer(
  item: CustomerManagedKeyEncryption,
): any {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

export function customerManagedKeyEncryptionDeserializer(
  item: any,
): CustomerManagedKeyEncryption {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

/** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
export interface KeyEncryptionKeyIdentity {
  /** The type of identity to use. Values can be systemAssignedIdentity, userAssignedIdentity, or delegatedResourceIdentity. */
  identityType?: KeyEncryptionKeyIdentityType;
  /** User assigned identity to use for accessing key encryption key Url. Ex: /subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/<resource group>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId. Mutually exclusive with identityType systemAssignedIdentity. */
  userAssignedIdentityResourceId?: string;
  /** application client identity to use for accessing key encryption key Url in a different tenant. Ex: f83c6b1b-4d34-47e4-bb34-9d83df58b540 */
  federatedClientId?: string;
}

export function keyEncryptionKeyIdentitySerializer(
  item: KeyEncryptionKeyIdentity,
): any {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    federatedClientId: item["federatedClientId"],
  };
}

export function keyEncryptionKeyIdentityDeserializer(
  item: any,
): KeyEncryptionKeyIdentity {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    federatedClientId: item["federatedClientId"],
  };
}

/** The type of identity to use. */
export enum KnownKeyEncryptionKeyIdentityType {
  /** System assigned identity */
  SystemAssignedIdentity = "SystemAssignedIdentity",
  /** User assigned identity */
  UserAssignedIdentity = "UserAssignedIdentity",
}

/**
 * The type of identity to use. \
 * {@link KnownKeyEncryptionKeyIdentityType} can be used interchangeably with KeyEncryptionKeyIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssignedIdentity**: System assigned identity \
 * **UserAssignedIdentity**: User assigned identity
 */
export type KeyEncryptionKeyIdentityType = string;

/** The public network access type for an online experimentation resource. */
export enum KnownPublicNetworkAccessType {
  /** Enabled: The resource can be accessed from the public internet */
  Enabled = "Enabled",
  /** Disabled: The resource can only be accessed from a private endpoint. */
  Disabled = "Disabled",
}

/**
 * The public network access type for an online experimentation resource. \
 * {@link KnownPublicNetworkAccessType} can be used interchangeably with PublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled: The resource can be accessed from the public internet \
 * **Disabled**: Disabled: The resource can only be accessed from a private endpoint.
 */
export type PublicNetworkAccessType = string;

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

/** Private endpoint connection resource for an online experimentation workspace resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionDeserializer(
  item: any,
): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
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
    privateLinkServiceConnectionState:
      privateLinkServiceConnectionStateSerializer(
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
    privateLinkServiceConnectionState:
      privateLinkServiceConnectionStateDeserializer(
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

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(
  item: ManagedServiceIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(
  item: any,
): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

export function userAssignedIdentitySerializer(
  item: UserAssignedIdentity,
): any {
  return item;
}

export function userAssignedIdentityDeserializer(
  item: any,
): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The SKU (Stock Keeping Unit) assigned to this resource. */
export interface OnlineExperimentationWorkspaceSku {
  /** The name of the SKU. Ex - F0, P0. It is typically a letter+number code */
  name: OnlineExperimentationWorkspaceSkuName;
  /** The name of the SKU tier */
  readonly tier?: OnlineExperimentationWorkspaceSkuTier;
}

export function onlineExperimentationWorkspaceSkuSerializer(
  item: OnlineExperimentationWorkspaceSku,
): any {
  return { name: item["name"] };
}

export function onlineExperimentationWorkspaceSkuDeserializer(
  item: any,
): OnlineExperimentationWorkspaceSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The allowed SKU names for the online experimentation workspace. */
export enum KnownOnlineExperimentationWorkspaceSkuName {
  /** The Free service sku name. */
  F0 = "F0",
  /** The Standard service sku name. */
  S0 = "S0",
  /** The Premium service sku name. */
  P0 = "P0",
  /** The Developer service sku name. */
  D0 = "D0",
}

/**
 * The allowed SKU names for the online experimentation workspace. \
 * {@link KnownOnlineExperimentationWorkspaceSkuName} can be used interchangeably with OnlineExperimentationWorkspaceSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **F0**: The Free service sku name. \
 * **S0**: The Standard service sku name. \
 * **P0**: The Premium service sku name. \
 * **D0**: The Developer service sku name.
 */
export type OnlineExperimentationWorkspaceSkuName = string;

/** The allowed SKU tiers for the online experimentation workspace. */
export enum KnownOnlineExperimentationWorkspaceSkuTier {
  /** The Free service tier. */
  Free = "Free",
  /** The Standard service tier. */
  Standard = "Standard",
  /** The Premium service tier. */
  Premium = "Premium",
  /** The Developer service tier. */
  Developer = "Developer",
}

/**
 * The allowed SKU tiers for the online experimentation workspace. \
 * {@link KnownOnlineExperimentationWorkspaceSkuTier} can be used interchangeably with OnlineExperimentationWorkspaceSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free**: The Free service tier. \
 * **Standard**: The Standard service tier. \
 * **Premium**: The Premium service tier. \
 * **Developer**: The Developer service tier.
 */
export type OnlineExperimentationWorkspaceSkuTier = string;

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
    createdAt: !item["createdAt"]
      ? item["createdAt"]
      : new Date(item["createdAt"]),
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
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
    tags: item["tags"],
    location: item["location"],
  };
}

/** Partial update of an online experimentation workspace resource. */
export interface OnlineExperimentationWorkspacePatch {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: OnlineExperimentationWorkspaceSku;
  /** Updatable properties of the online experimentation workspace resource. */
  properties?: {
    logAnalyticsWorkspaceResourceId?: string;
    logsExporterStorageAccountResourceId?: string;
    encryption?: ResourceEncryptionConfiguration;
    publicNetworkAccess?: PublicNetworkAccessType;
  };
}

export function onlineExperimentationWorkspacePatchSerializer(
  item: OnlineExperimentationWorkspacePatch,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    sku: !item["sku"]
      ? item["sku"]
      : onlineExperimentationWorkspaceSkuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : _onlineExperimentationWorkspacePatchPropertiesSerializer(
          item["properties"],
        ),
  };
}

/** model interface _OnlineExperimentationWorkspacePatchProperties */
export interface _OnlineExperimentationWorkspacePatchProperties {
  /** The resource identifier of the Log Analytics workspace which online experimentation workspace uses for generating experiment analysis results. */
  logAnalyticsWorkspaceResourceId?: string;
  /** The resource identifier of storage account where logs are exported from Log Analytics workspace. online experimentation workspace uses it generating experiment analysis results. */
  logsExporterStorageAccountResourceId?: string;
  /** The encryption configuration for the online experimentation workspace resource. */
  encryption?: ResourceEncryptionConfiguration;
  /**
   * Public Network Access Control for the online experimentation resource. Defaults to Enabled if set to null.
   * - Enabled: The resource can be accessed from the public internet.
   * - Disabled: The resource can only be accessed from a private endpoint.
   */
  publicNetworkAccess?: PublicNetworkAccessType;
}

export function _onlineExperimentationWorkspacePatchPropertiesSerializer(
  item: _OnlineExperimentationWorkspacePatchProperties,
): any {
  return {
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    logsExporterStorageAccountResourceId:
      item["logsExporterStorageAccountResourceId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : resourceEncryptionConfigurationSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The response of a OnlineExperimentationWorkspace list operation. */
export interface _OnlineExperimentationWorkspaceListResult {
  /** The OnlineExperimentationWorkspace items on this page */
  value: OnlineExperimentationWorkspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _onlineExperimentationWorkspaceListResultDeserializer(
  item: any,
): _OnlineExperimentationWorkspaceListResult {
  return {
    value: onlineExperimentationWorkspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function onlineExperimentationWorkspaceArraySerializer(
  result: Array<OnlineExperimentationWorkspace>,
): any[] {
  return result.map((item) => {
    return onlineExperimentationWorkspaceSerializer(item);
  });
}

export function onlineExperimentationWorkspaceArrayDeserializer(
  result: Array<OnlineExperimentationWorkspace>,
): any[] {
  return result.map((item) => {
    return onlineExperimentationWorkspaceDeserializer(item);
  });
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

/** A private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(
  item: any,
): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
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

export function privateLinkResourceArrayDeserializer(
  result: Array<PrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** 2025-05-31-preview version */
  V20250531Preview = "2025-05-31-preview",
  /** 2025-08-01-preview version */
  V20250801Preview = "2025-08-01-preview",
}
