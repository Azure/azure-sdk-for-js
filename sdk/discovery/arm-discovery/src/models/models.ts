// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** Bookshelf tracked resource */
export interface Bookshelf extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: BookshelfProperties;
}

export function bookshelfSerializer(item: Bookshelf): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : bookshelfPropertiesSerializer(item["properties"]),
  };
}

export function bookshelfDeserializer(item: any): Bookshelf {
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
      : bookshelfPropertiesDeserializer(item["properties"]),
  };
}

/** Bookshelf properties */
export interface BookshelfProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** User assigned identity IDs to be used by knowledgebase workloads. The key value must be the resource ID of the identity resource. */
  workloadIdentities?: Record<string, UserAssignedIdentity>;
  /** Whether or not to use a customer managed key when encrypting data at rest */
  customerManagedKeys?: CustomerManagedKeys;
  /** The key to use for encrypting data at rest when customer managed keys are enabled. Required if Customer Managed Keys is enabled. */
  keyVaultProperties?: BookshelfKeyVaultProperties;
  /** The Log Analytics Cluster to use for debug logs. This is required when Customer Managed Keys are enabled. */
  logAnalyticsClusterId?: string;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Whether or not public network access is allowed for this resource. For security reasons, it is recommended to disable it whenever possible. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Private Endpoint Subnet ID for private endpoint connections. */
  privateEndpointSubnetId?: string;
  /** Search Subnet ID for search resources. */
  searchSubnetId?: string;
  /** The resource group for resources managed on behalf of customer. */
  readonly managedResourceGroup?: string;
  /** Managed-On-Behalf-Of configuration properties. This configuration exists for the resources where a resource provider manages those resources on behalf of the resource owner. */
  readonly managedOnBehalfOfConfiguration?: WithMoboBrokerResources;
  /** The bookshelf data plane API URI */
  readonly bookshelfUri?: string;
}

export function bookshelfPropertiesSerializer(item: BookshelfProperties): any {
  return {
    workloadIdentities: item["workloadIdentities"],
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : bookshelfKeyVaultPropertiesSerializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    searchSubnetId: item["searchSubnetId"],
  };
}

export function bookshelfPropertiesDeserializer(item: any): BookshelfProperties {
  return {
    provisioningState: item["provisioningState"],
    workloadIdentities: !item["workloadIdentities"]
      ? item["workloadIdentities"]
      : Object.fromEntries(
          Object.entries(item["workloadIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : bookshelfKeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    searchSubnetId: item["searchSubnetId"],
    managedResourceGroup: item["managedResourceGroup"],
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : withMoboBrokerResourcesDeserializer(item["managedOnBehalfOfConfiguration"]),
    bookshelfUri: item["bookshelfUri"],
  };
}

/** The resource provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource create request has been accepted */
  Accepted = "Accepted",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** The resource is being deleted */
  Deleting = "Deleting",
}

/**
 * The resource provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: The resource create request has been accepted \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Deleting**: The resource is being deleted
 */
export type ProvisioningState = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** State of customer managed key usage. */
export enum KnownCustomerManagedKeys {
  /** Customer managed keys are enabled. */
  Enabled = "Enabled",
  /** Customer managed keys are disabled. */
  Disabled = "Disabled",
}

/**
 * State of customer managed key usage. \
 * {@link KnownCustomerManagedKeys} can be used interchangeably with CustomerManagedKeys,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Customer managed keys are enabled. \
 * **Disabled**: Customer managed keys are disabled.
 */
export type CustomerManagedKeys = string;

/** Key Vault Properties with clientId selection */
export interface BookshelfKeyVaultProperties {
  /** The Key Vault URI */
  keyVaultUri: string;
  /** The Key Name in Key Vault */
  keyName: string;
  /** The Key Version in Key Vault */
  keyVersion?: string;
  /** The client ID of the identity to use for accessing the Key Vault. Must be a workload identity assigned to the Bookshelf resource. */
  identityClientId: string;
}

export function bookshelfKeyVaultPropertiesSerializer(item: BookshelfKeyVaultProperties): any {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    identityClientId: item["identityClientId"],
  };
}

export function bookshelfKeyVaultPropertiesDeserializer(item: any): BookshelfKeyVaultProperties {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    identityClientId: item["identityClientId"],
  };
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
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

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
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

/** State of public network access. */
export enum KnownPublicNetworkAccess {
  /** Public network access is enabled. */
  Enabled = "Enabled",
  /** Public network access is disabled. */
  Disabled = "Disabled",
}

/**
 * State of public network access. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Public network access is enabled. \
 * **Disabled**: Public network access is disabled.
 */
export type PublicNetworkAccess = string;

/** For tracking mobo resources */
export interface WithMoboBrokerResources {
  /** Managed-On-Behalf-Of broker resources */
  readonly moboBrokerResources?: MoboBrokerResource[];
}

export function withMoboBrokerResourcesDeserializer(item: any): WithMoboBrokerResources {
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** The response of a Bookshelf list operation. */
export interface _BookshelfListResult {
  /** The Bookshelf items on this page */
  value: Bookshelf[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bookshelfListResultDeserializer(item: any): _BookshelfListResult {
  return {
    value: bookshelfArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bookshelfArraySerializer(result: Array<Bookshelf>): any[] {
  return result.map((item) => {
    return bookshelfSerializer(item);
  });
}

export function bookshelfArrayDeserializer(result: Array<Bookshelf>): any[] {
  return result.map((item) => {
    return bookshelfDeserializer(item);
  });
}

/** The Private Endpoint Connection resource for Bookshelf. */
export interface BookshelfPrivateEndpointConnection extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionProperties;
}

export function bookshelfPrivateEndpointConnectionSerializer(
  item: BookshelfPrivateEndpointConnection,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function bookshelfPrivateEndpointConnectionDeserializer(
  item: any,
): BookshelfPrivateEndpointConnection {
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

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

/** The response of a BookshelfPrivateEndpointConnection list operation. */
export interface _BookshelfPrivateEndpointConnectionListResult {
  /** The BookshelfPrivateEndpointConnection items on this page */
  value: BookshelfPrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bookshelfPrivateEndpointConnectionListResultDeserializer(
  item: any,
): _BookshelfPrivateEndpointConnectionListResult {
  return {
    value: bookshelfPrivateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bookshelfPrivateEndpointConnectionArraySerializer(
  result: Array<BookshelfPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return bookshelfPrivateEndpointConnectionSerializer(item);
  });
}

export function bookshelfPrivateEndpointConnectionArrayDeserializer(
  result: Array<BookshelfPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return bookshelfPrivateEndpointConnectionDeserializer(item);
  });
}

/** A private link resource for Bookshelf. */
export interface BookshelfPrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

export function bookshelfPrivateLinkResourceDeserializer(item: any): BookshelfPrivateLinkResource {
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

/** The response of a BookshelfPrivateLinkResource list operation. */
export interface _BookshelfPrivateLinkResourceListResult {
  /** The BookshelfPrivateLinkResource items on this page */
  value: BookshelfPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bookshelfPrivateLinkResourceListResultDeserializer(
  item: any,
): _BookshelfPrivateLinkResourceListResult {
  return {
    value: bookshelfPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bookshelfPrivateLinkResourceArrayDeserializer(
  result: Array<BookshelfPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return bookshelfPrivateLinkResourceDeserializer(item);
  });
}

/** Tool tracked resource */
export interface Tool extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ToolProperties;
}

export function toolSerializer(item: Tool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : toolPropertiesSerializer(item["properties"]),
  };
}

export function toolDeserializer(item: any): Tool {
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
      : toolPropertiesDeserializer(item["properties"]),
  };
}

/** Discovery Tool list item properties */
export interface ToolProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** The version of a resource definition */
  version: string;
  /** Environment variables to make available */
  environmentVariables?: Record<string, string>;
  /** The JSON content for defining a resource */
  definitionContent: Record<string, any>;
}

export function toolPropertiesSerializer(item: ToolProperties): any {
  return {
    version: item["version"],
    environmentVariables: item["environmentVariables"],
    definitionContent: item["definitionContent"],
  };
}

export function toolPropertiesDeserializer(item: any): ToolProperties {
  return {
    provisioningState: item["provisioningState"],
    version: item["version"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    definitionContent: Object.fromEntries(
      Object.entries(item["definitionContent"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The response of a Tool list operation. */
export interface _ToolListResult {
  /** The Tool items on this page */
  value: Tool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _toolListResultDeserializer(item: any): _ToolListResult {
  return {
    value: toolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function toolArraySerializer(result: Array<Tool>): any[] {
  return result.map((item) => {
    return toolSerializer(item);
  });
}

export function toolArrayDeserializer(result: Array<Tool>): any[] {
  return result.map((item) => {
    return toolDeserializer(item);
  });
}

/** Project tracked resource */
export interface Project extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ProjectProperties;
}

export function projectSerializer(item: Project): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesSerializer(item["properties"]),
  };
}

export function projectDeserializer(item: any): Project {
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
      : projectPropertiesDeserializer(item["properties"]),
  };
}

/** Project properties */
export interface ProjectProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Foundry project endpoint URI. */
  readonly foundryProjectEndpoint?: string;
  /** Allowed StorageContainers (Control plane resource references). */
  storageContainerIds?: string[];
  /** Settings for the project. */
  settings?: ProjectSettings;
}

export function projectPropertiesSerializer(item: ProjectProperties): any {
  return {
    storageContainerIds: !item["storageContainerIds"]
      ? item["storageContainerIds"]
      : item["storageContainerIds"].map((p: any) => {
          return p;
        }),
    settings: !item["settings"] ? item["settings"] : projectSettingsSerializer(item["settings"]),
  };
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    provisioningState: item["provisioningState"],
    foundryProjectEndpoint: item["foundryProjectEndpoint"],
    storageContainerIds: !item["storageContainerIds"]
      ? item["storageContainerIds"]
      : item["storageContainerIds"].map((p: any) => {
          return p;
        }),
    settings: !item["settings"] ? item["settings"] : projectSettingsDeserializer(item["settings"]),
  };
}

/** Settings schema for the project */
export interface ProjectSettings {
  /** Default preferences to guide AI behaviors in this project. */
  behaviorPreferences?: string;
}

export function projectSettingsSerializer(item: ProjectSettings): any {
  return { behaviorPreferences: item["behaviorPreferences"] };
}

export function projectSettingsDeserializer(item: any): ProjectSettings {
  return {
    behaviorPreferences: item["behaviorPreferences"],
  };
}

/** The response of a Project list operation. */
export interface _ProjectListResult {
  /** The Project items on this page */
  value: Project[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _projectListResultDeserializer(item: any): _ProjectListResult {
  return {
    value: projectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectArraySerializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectSerializer(item);
  });
}

export function projectArrayDeserializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectDeserializer(item);
  });
}

/** Workspace tracked resource */
export interface Workspace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceProperties;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesSerializer(item["properties"]),
  };
}

export function workspaceDeserializer(item: any): Workspace {
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
      : workspacePropertiesDeserializer(item["properties"]),
  };
}

/** Workspace properties */
export interface WorkspaceProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** List of linked SuperComputers. */
  supercomputerIds?: string[];
  /** workspace API endpoint Uri. */
  readonly workspaceApiUri?: string;
  /** workspace User Interface Uri. */
  readonly workspaceUiUri?: string;
  /** Identity IDs used for leveraging Workspace resources. */
  workspaceIdentity: Identity;
  /** Whether or not to use a customer managed key when encrypting data at rest */
  customerManagedKeys?: CustomerManagedKeys;
  /** The key to use for encrypting data at rest when customer managed keys are enabled. */
  keyVaultProperties?: KeyVaultProperties;
  /** The Log Analytics Cluster to use for debug logs. This is required when Customer Managed Keys are enabled. */
  logAnalyticsClusterId?: string;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Whether or not public network access is allowed for this resource. For security reasons, it is recommended to disable it whenever possible. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Agent Subnet ID for agent resources. */
  agentSubnetId?: string;
  /** Private Endpoint Subnet ID for private endpoint connections. */
  privateEndpointSubnetId?: string;
  /** Function Subnet ID for workspace resources. */
  workspaceSubnetId?: string;
  /** The resource group for resources managed on behalf of customer. */
  readonly managedResourceGroup?: string;
  /** Managed-On-Behalf-Of configuration properties. This configuration exists for the resources where a resource provider manages those resources on behalf of the resource owner. */
  readonly managedOnBehalfOfConfiguration?: WithMoboBrokerResources;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    supercomputerIds: !item["supercomputerIds"]
      ? item["supercomputerIds"]
      : item["supercomputerIds"].map((p: any) => {
          return p;
        }),
    workspaceIdentity: identitySerializer(item["workspaceIdentity"]),
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    agentSubnetId: item["agentSubnetId"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    workspaceSubnetId: item["workspaceSubnetId"],
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    provisioningState: item["provisioningState"],
    supercomputerIds: !item["supercomputerIds"]
      ? item["supercomputerIds"]
      : item["supercomputerIds"].map((p: any) => {
          return p;
        }),
    workspaceApiUri: item["workspaceApiUri"],
    workspaceUiUri: item["workspaceUiUri"],
    workspaceIdentity: identityDeserializer(item["workspaceIdentity"]),
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    agentSubnetId: item["agentSubnetId"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    workspaceSubnetId: item["workspaceSubnetId"],
    managedResourceGroup: item["managedResourceGroup"],
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : withMoboBrokerResourcesDeserializer(item["managedOnBehalfOfConfiguration"]),
  };
}

/** For user assigned identity resource property. */
export interface Identity {
  /** The resource ID of the user assigned identity. */
  id: string;
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function identitySerializer(item: Identity): any {
  return { id: item["id"] };
}

export function identityDeserializer(item: any): Identity {
  return {
    id: item["id"],
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** For Key Vault Key references */
export interface KeyVaultProperties {
  /** The Key Vault URI */
  keyVaultUri: string;
  /** The Key Name in Key Vault */
  keyName: string;
  /** The Key Version in Key Vault */
  keyVersion?: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** The response of a Workspace list operation. */
export interface _WorkspaceListResult {
  /** The Workspace items on this page */
  value: Workspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceListResultDeserializer(item: any): _WorkspaceListResult {
  return {
    value: workspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceArraySerializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceSerializer(item);
  });
}

export function workspaceArrayDeserializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceDeserializer(item);
  });
}

/** The Private Endpoint Connection resource for Workspace. */
export interface WorkspacePrivateEndpointConnection extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionProperties;
}

export function workspacePrivateEndpointConnectionSerializer(
  item: WorkspacePrivateEndpointConnection,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function workspacePrivateEndpointConnectionDeserializer(
  item: any,
): WorkspacePrivateEndpointConnection {
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

/** The response of a WorkspacePrivateEndpointConnection list operation. */
export interface _WorkspacePrivateEndpointConnectionListResult {
  /** The WorkspacePrivateEndpointConnection items on this page */
  value: WorkspacePrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspacePrivateEndpointConnectionListResultDeserializer(
  item: any,
): _WorkspacePrivateEndpointConnectionListResult {
  return {
    value: workspacePrivateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspacePrivateEndpointConnectionArraySerializer(
  result: Array<WorkspacePrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return workspacePrivateEndpointConnectionSerializer(item);
  });
}

export function workspacePrivateEndpointConnectionArrayDeserializer(
  result: Array<WorkspacePrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return workspacePrivateEndpointConnectionDeserializer(item);
  });
}

/** Represents a deployment that ties a specific model family to a user defined deployment name used when invoking the chat model. */
export interface ChatModelDeployment extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ChatModelDeploymentProperties;
}

export function chatModelDeploymentSerializer(item: ChatModelDeployment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : chatModelDeploymentPropertiesSerializer(item["properties"]),
  };
}

export function chatModelDeploymentDeserializer(item: any): ChatModelDeployment {
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
      : chatModelDeploymentPropertiesDeserializer(item["properties"]),
  };
}

/** Defines a deployment binding a specific model family to a user-defined deployment name for chat inference. */
export interface ChatModelDeploymentProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Model format as published by the provider. Verify supported formats per region using the Model Catalog API. */
  modelFormat: string;
  /** Canonical provider model name available in the selected region. Verify supported values per region using the Model Catalog API. */
  modelName: string;
  /** Provider-published version of the selected model. */
  modelVersion?: string;
  /** SKU tier used by this chat model deployment. */
  skuName?: string;
  /** Provisioned SKU capacity units for this chat model deployment. */
  capacity?: number;
}

export function chatModelDeploymentPropertiesSerializer(item: ChatModelDeploymentProperties): any {
  return {
    modelFormat: item["modelFormat"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
    skuName: item["skuName"],
    capacity: item["capacity"],
  };
}

export function chatModelDeploymentPropertiesDeserializer(
  item: any,
): ChatModelDeploymentProperties {
  return {
    provisioningState: item["provisioningState"],
    modelFormat: item["modelFormat"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
    skuName: item["skuName"],
    capacity: item["capacity"],
  };
}

/** The response of a ChatModelDeployment list operation. */
export interface _ChatModelDeploymentListResult {
  /** The ChatModelDeployment items on this page */
  value: ChatModelDeployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _chatModelDeploymentListResultDeserializer(
  item: any,
): _ChatModelDeploymentListResult {
  return {
    value: chatModelDeploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function chatModelDeploymentArraySerializer(result: Array<ChatModelDeployment>): any[] {
  return result.map((item) => {
    return chatModelDeploymentSerializer(item);
  });
}

export function chatModelDeploymentArrayDeserializer(result: Array<ChatModelDeployment>): any[] {
  return result.map((item) => {
    return chatModelDeploymentDeserializer(item);
  });
}

/** A private link resource for Workspace. */
export interface WorkspacePrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

export function workspacePrivateLinkResourceDeserializer(item: any): WorkspacePrivateLinkResource {
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

/** The response of a WorkspacePrivateLinkResource list operation. */
export interface _WorkspacePrivateLinkResourceListResult {
  /** The WorkspacePrivateLinkResource items on this page */
  value: WorkspacePrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspacePrivateLinkResourceListResultDeserializer(
  item: any,
): _WorkspacePrivateLinkResourceListResult {
  return {
    value: workspacePrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspacePrivateLinkResourceArrayDeserializer(
  result: Array<WorkspacePrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return workspacePrivateLinkResourceDeserializer(item);
  });
}

/** NodePool tracked resource */
export interface NodePool extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NodePoolProperties;
}

export function nodePoolSerializer(item: NodePool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : nodePoolPropertiesSerializer(item["properties"]),
  };
}

export function nodePoolDeserializer(item: any): NodePool {
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
      : nodePoolPropertiesDeserializer(item["properties"]),
  };
}

/** NodePool properties */
export interface NodePoolProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** The node pool subnet. */
  subnetId: string;
  /** The size of the underlying Azure VM. */
  vmSize: VmSize;
  /** The maximum number of nodes. */
  maxNodeCount: number;
  /** The minimum number of nodes. */
  minNodeCount?: number;
  /** The Virtual Machine Scale Set priority. If not specified, the default is 'Regular'. */
  scaleSetPriority?: ScaleSetPriority;
  /** The size of the OS disk in GB. If not specified, the default is 120 GB. */
  osDiskSizeGb?: number;
  /** The percent of disk usage before which image garbage collection is never run. This cannot be set higher than imageCacheUpperThreshold. The default is 40% */
  imageCacheLowerThreshold?: number;
  /** The percent of disk usage after which image garbage collection is guaranteed to run. The default is 60% */
  imageCacheUpperThreshold?: number;
}

export function nodePoolPropertiesSerializer(item: NodePoolProperties): any {
  return {
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
    maxNodeCount: item["maxNodeCount"],
    minNodeCount: item["minNodeCount"],
    scaleSetPriority: item["scaleSetPriority"],
    osDiskSizeGb: item["osDiskSizeGb"],
    imageCacheLowerThreshold: item["imageCacheLowerThreshold"],
    imageCacheUpperThreshold: item["imageCacheUpperThreshold"],
  };
}

export function nodePoolPropertiesDeserializer(item: any): NodePoolProperties {
  return {
    provisioningState: item["provisioningState"],
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
    maxNodeCount: item["maxNodeCount"],
    minNodeCount: item["minNodeCount"],
    scaleSetPriority: item["scaleSetPriority"],
    osDiskSizeGb: item["osDiskSizeGb"],
    imageCacheLowerThreshold: item["imageCacheLowerThreshold"],
    imageCacheUpperThreshold: item["imageCacheUpperThreshold"],
  };
}

/** Supported Azure VM Sizes. */
export enum KnownVmSize {
  /** Standard_NC24ads_A100_v4 GPU-optimized Azure VM Size */
  StandardNC24AdsA100V4 = "Standard_NC24ads_A100_v4",
  /** Standard_NC48ads_A100_v4 GPU-optimized Azure VM Size */
  StandardNC48AdsA100V4 = "Standard_NC48ads_A100_v4",
  /** Standard_NC96ads_A100_v4 GPU-optimized Azure VM Size */
  StandardNC96AdsA100V4 = "Standard_NC96ads_A100_v4",
  /** Standard_NC4as_T4_v3 GPU-optimized Azure VM Size */
  StandardNC4AsT4V3 = "Standard_NC4as_T4_v3",
  /** Standard_NC8as_T4_v3 GPU-optimized Azure VM Size */
  StandardNC8AsT4V3 = "Standard_NC8as_T4_v3",
  /** Standard_NC16as_T4_v3 GPU-optimized Azure VM Size */
  StandardNC16AsT4V3 = "Standard_NC16as_T4_v3",
  /** Standard_NC64as_T4_v3 GPU-optimized Azure VM Size */
  StandardNC64AsT4V3 = "Standard_NC64as_T4_v3",
  /** Standard_NV6ads_A10_v5 GPU-optimized Azure VM Size */
  StandardNV6AdsA10V5 = "Standard_NV6ads_A10_v5",
  /** Standard_NV12ads_A10_v5 GPU-optimized Azure VM Size */
  StandardNV12AdsA10V5 = "Standard_NV12ads_A10_v5",
  /** Standard_NV24ads_A10_v5 GPU-optimized Azure VM Size */
  StandardNV24AdsA10V5 = "Standard_NV24ads_A10_v5",
  /** Standard_NV36ads_A10_v5 GPU-optimized Azure VM Size */
  StandardNV36AdsA10V5 = "Standard_NV36ads_A10_v5",
  /** Standard_NV36ads_A10_v5 GPU-optimized Azure VM Size */
  StandardNV36AdmsA10V5 = "Standard_NV36adms_A10_v5",
  /** Standard_NV36ads_A10_v5 GPU-optimized Azure VM Size */
  StandardNV72AdsA10V5 = "Standard_NV72ads_A10_v5",
  /** Standard_ND40rs_v2 GPU-optimized Azure VM Size */
  StandardND40RsV2 = "Standard_ND40rs_v2",
}

/**
 * Supported Azure VM Sizes. \
 * {@link KnownVmSize} can be used interchangeably with VmSize,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_NC24ads_A100_v4**: Standard_NC24ads_A100_v4 GPU-optimized Azure VM Size \
 * **Standard_NC48ads_A100_v4**: Standard_NC48ads_A100_v4 GPU-optimized Azure VM Size \
 * **Standard_NC96ads_A100_v4**: Standard_NC96ads_A100_v4 GPU-optimized Azure VM Size \
 * **Standard_NC4as_T4_v3**: Standard_NC4as_T4_v3 GPU-optimized Azure VM Size \
 * **Standard_NC8as_T4_v3**: Standard_NC8as_T4_v3 GPU-optimized Azure VM Size \
 * **Standard_NC16as_T4_v3**: Standard_NC16as_T4_v3 GPU-optimized Azure VM Size \
 * **Standard_NC64as_T4_v3**: Standard_NC64as_T4_v3 GPU-optimized Azure VM Size \
 * **Standard_NV6ads_A10_v5**: Standard_NV6ads_A10_v5 GPU-optimized Azure VM Size \
 * **Standard_NV12ads_A10_v5**: Standard_NV12ads_A10_v5 GPU-optimized Azure VM Size \
 * **Standard_NV24ads_A10_v5**: Standard_NV24ads_A10_v5 GPU-optimized Azure VM Size \
 * **Standard_NV36ads_A10_v5**: Standard_NV36ads_A10_v5 GPU-optimized Azure VM Size \
 * **Standard_NV36adms_A10_v5**: Standard_NV36ads_A10_v5 GPU-optimized Azure VM Size \
 * **Standard_NV72ads_A10_v5**: Standard_NV36ads_A10_v5 GPU-optimized Azure VM Size \
 * **Standard_ND40rs_v2**: Standard_ND40rs_v2 GPU-optimized Azure VM Size
 */
export type VmSize = string;

/** Supported Virtual Machine Scale Set priorities. */
export enum KnownScaleSetPriority {
  /** Regular priority Virtual Machine Scale Set. */
  Regular = "Regular",
  /** Spot priority Virtual Machine Scale Set. */
  Spot = "Spot",
}

/**
 * Supported Virtual Machine Scale Set priorities. \
 * {@link KnownScaleSetPriority} can be used interchangeably with ScaleSetPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Regular priority Virtual Machine Scale Set. \
 * **Spot**: Spot priority Virtual Machine Scale Set.
 */
export type ScaleSetPriority = string;

/** The response of a NodePool list operation. */
export interface _NodePoolListResult {
  /** The NodePool items on this page */
  value: NodePool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nodePoolListResultDeserializer(item: any): _NodePoolListResult {
  return {
    value: nodePoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nodePoolArraySerializer(result: Array<NodePool>): any[] {
  return result.map((item) => {
    return nodePoolSerializer(item);
  });
}

export function nodePoolArrayDeserializer(result: Array<NodePool>): any[] {
  return result.map((item) => {
    return nodePoolDeserializer(item);
  });
}

/** Supercomputer tracked resource */
export interface Supercomputer extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SupercomputerProperties;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
}

export function supercomputerSerializer(item: Supercomputer): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : supercomputerPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

export function supercomputerDeserializer(item: any): Supercomputer {
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
      : supercomputerPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Supercomputer properties */
export interface SupercomputerProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /**
   * System Subnet ID associated with managed NodePool for system resources.
   *     It should have connectivity to the child NodePool subnets.
   */
  subnetId: string;
  /**
   * System Subnet ID associated with AKS apiserver. Must be delegated to Microsoft.ContainerService/managedClusters.
   *     It should have connectivity to the system subnet and nodepool subnets.
   */
  managementSubnetId?: string;
  /**
   * Network egress type provisioned for the supercomputer workloads.
   *     Defaults to LoadBalancer if not specified.
   *     If None is specified, the customer is responsible for providing outbound connectivity for Supercomputer functionality.
   */
  outboundType?: NetworkEgressType;
  /** The SKU to use for the system node pool. */
  systemSku?: SystemSku;
  /** Dictionary of identity properties. */
  identities: SupercomputerIdentities;
  /** Whether or not to use a customer managed key when encrypting data at rest */
  customerManagedKeys?: CustomerManagedKeys;
  /** Disk Encryption Set ID to use for Customer Managed Keys encryption. Required if Customer Managed Keys is enabled. */
  diskEncryptionSetId?: string;
  /** The Log Analytics Cluster to use for debug logs. This is required when Customer Managed Keys are enabled. */
  logAnalyticsClusterId?: string;
  /** The resource group for resources managed on behalf of customer. */
  readonly managedResourceGroup?: string;
  /** Managed-On-Behalf-Of configuration properties. This configuration exists for the resources where a resource provider manages those resources on behalf of the resource owner. */
  readonly managedOnBehalfOfConfiguration?: WithMoboBrokerResources;
}

export function supercomputerPropertiesSerializer(item: SupercomputerProperties): any {
  return {
    subnetId: item["subnetId"],
    managementSubnetId: item["managementSubnetId"],
    outboundType: item["outboundType"],
    systemSku: item["systemSku"],
    identities: supercomputerIdentitiesSerializer(item["identities"]),
    customerManagedKeys: item["customerManagedKeys"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
  };
}

export function supercomputerPropertiesDeserializer(item: any): SupercomputerProperties {
  return {
    provisioningState: item["provisioningState"],
    subnetId: item["subnetId"],
    managementSubnetId: item["managementSubnetId"],
    outboundType: item["outboundType"],
    systemSku: item["systemSku"],
    identities: supercomputerIdentitiesDeserializer(item["identities"]),
    customerManagedKeys: item["customerManagedKeys"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    managedResourceGroup: item["managedResourceGroup"],
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : withMoboBrokerResourcesDeserializer(item["managedOnBehalfOfConfiguration"]),
  };
}

/** Supported network egress types. */
export enum KnownNetworkEgressType {
  /** Public outbound network via load balancer (Default) */
  LoadBalancer = "LoadBalancer",
  /** No default outbound */
  None = "None",
}

/**
 * Supported network egress types. \
 * {@link KnownNetworkEgressType} can be used interchangeably with NetworkEgressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LoadBalancer**: Public outbound network via load balancer (Default) \
 * **None**: No default outbound
 */
export type NetworkEgressType = string;

/** Supported System SKU Sizes. */
export enum KnownSystemSku {
  /** Standard_D4s_v6 basic compute VM (default) */
  StandardD4SV6 = "Standard_D4s_v6",
  /** Standard_D4s_v5 SKU */
  StandardD4SV5 = "Standard_D4s_v5",
  /** Standard_D4s_v4 SKU */
  StandardD4SV4 = "Standard_D4s_v4",
}

/**
 * Supported System SKU Sizes. \
 * {@link KnownSystemSku} can be used interchangeably with SystemSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_D4s_v6**: Standard_D4s_v6 basic compute VM (default) \
 * **Standard_D4s_v5**: Standard_D4s_v5 SKU \
 * **Standard_D4s_v4**: Standard_D4s_v4 SKU
 */
export type SystemSku = string;

/** Dictionary of identity properties for the Supercomputer. */
export interface SupercomputerIdentities {
  /** Cluster identity ID. */
  clusterIdentity: Identity;
  /**
   * Kubelet identity ID used by the supercomputer.
   *       This identity is used by the supercomputer at node level to access Azure resources.
   *       This identity must have ManagedIdentityOperator role on the clusterIdentity.
   */
  kubeletIdentity: Identity;
  /** User assigned identity IDs to be used by workloads as federated credentials running on supercomputer. The key value must be the resource ID of the identity resource. */
  workloadIdentities?: Record<string, UserAssignedIdentity>;
}

export function supercomputerIdentitiesSerializer(item: SupercomputerIdentities): any {
  return {
    clusterIdentity: identitySerializer(item["clusterIdentity"]),
    kubeletIdentity: identitySerializer(item["kubeletIdentity"]),
    workloadIdentities: item["workloadIdentities"],
  };
}

export function supercomputerIdentitiesDeserializer(item: any): SupercomputerIdentities {
  return {
    clusterIdentity: identityDeserializer(item["clusterIdentity"]),
    kubeletIdentity: identityDeserializer(item["kubeletIdentity"]),
    workloadIdentities: !item["workloadIdentities"]
      ? item["workloadIdentities"]
      : Object.fromEntries(
          Object.entries(item["workloadIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Managed service identity (either system assigned, or none) */
export interface SystemAssignedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: SystemAssignedServiceIdentityType;
}

export function systemAssignedServiceIdentitySerializer(item: SystemAssignedServiceIdentity): any {
  return { type: item["type"] };
}

export function systemAssignedServiceIdentityDeserializer(
  item: any,
): SystemAssignedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Type of managed service identity (either system assigned, or none). */
export enum KnownSystemAssignedServiceIdentityType {
  /** No managed system identity. */
  None = "None",
  /** System assigned managed system identity. */
  SystemAssigned = "SystemAssigned",
}

/**
 * Type of managed service identity (either system assigned, or none). \
 * {@link KnownSystemAssignedServiceIdentityType} can be used interchangeably with SystemAssignedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed system identity. \
 * **SystemAssigned**: System assigned managed system identity.
 */
export type SystemAssignedServiceIdentityType = string;

/** The response of a Supercomputer list operation. */
export interface _SupercomputerListResult {
  /** The Supercomputer items on this page */
  value: Supercomputer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _supercomputerListResultDeserializer(item: any): _SupercomputerListResult {
  return {
    value: supercomputerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function supercomputerArraySerializer(result: Array<Supercomputer>): any[] {
  return result.map((item) => {
    return supercomputerSerializer(item);
  });
}

export function supercomputerArrayDeserializer(result: Array<Supercomputer>): any[] {
  return result.map((item) => {
    return supercomputerDeserializer(item);
  });
}

/** Storage Asset tracked resource */
export interface StorageAsset extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageAssetProperties;
}

export function storageAssetSerializer(item: StorageAsset): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageAssetPropertiesSerializer(item["properties"]),
  };
}

export function storageAssetDeserializer(item: any): StorageAsset {
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
      : storageAssetPropertiesDeserializer(item["properties"]),
  };
}

/** Storage Asset properties */
export interface StorageAssetProperties {
  /** The description */
  description: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** The path to the data within its parent container. This should be relative to the root of the parent container. */
  path?: string;
}

export function storageAssetPropertiesSerializer(item: StorageAssetProperties): any {
  return { description: item["description"], path: item["path"] };
}

export function storageAssetPropertiesDeserializer(item: any): StorageAssetProperties {
  return {
    description: item["description"],
    provisioningState: item["provisioningState"],
    path: item["path"],
  };
}

/** The response of a StorageAsset list operation. */
export interface _StorageAssetListResult {
  /** The StorageAsset items on this page */
  value: StorageAsset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageAssetListResultDeserializer(item: any): _StorageAssetListResult {
  return {
    value: storageAssetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageAssetArraySerializer(result: Array<StorageAsset>): any[] {
  return result.map((item) => {
    return storageAssetSerializer(item);
  });
}

export function storageAssetArrayDeserializer(result: Array<StorageAsset>): any[] {
  return result.map((item) => {
    return storageAssetDeserializer(item);
  });
}

/** Storage Container tracked resource */
export interface StorageContainer extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageContainerProperties;
}

export function storageContainerSerializer(item: StorageContainer): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageContainerPropertiesSerializer(item["properties"]),
  };
}

export function storageContainerDeserializer(item: any): StorageContainer {
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
      : storageContainerPropertiesDeserializer(item["properties"]),
  };
}

/** Storage Container properties */
export interface StorageContainerProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Storage store properties */
  storageStore: StorageStoreUnion;
}

export function storageContainerPropertiesSerializer(item: StorageContainerProperties): any {
  return { storageStore: storageStoreUnionSerializer(item["storageStore"]) };
}

export function storageContainerPropertiesDeserializer(item: any): StorageContainerProperties {
  return {
    provisioningState: item["provisioningState"],
    storageStore: storageStoreUnionDeserializer(item["storageStore"]),
  };
}

/** An abstract representation of storage store kind. */
export interface StorageStore {
  /** The storage store kind. */
  /** The discriminator possible values: AzureStorageBlob, AzureNetAppFiles */
  kind: StorageStoreType;
}

export function storageStoreSerializer(item: StorageStore): any {
  return { kind: item["kind"] };
}

export function storageStoreDeserializer(item: any): StorageStore {
  return {
    kind: item["kind"],
  };
}

/** Alias for StorageStoreUnion */
export type StorageStoreUnion = AzureStorageBlobStore | AzureNetAppFilesStore | StorageStore;

export function storageStoreUnionSerializer(item: StorageStoreUnion): any {
  switch (item.kind) {
    case "AzureStorageBlob":
      return azureStorageBlobStoreSerializer(item as AzureStorageBlobStore);

    case "AzureNetAppFiles":
      return azureNetAppFilesStoreSerializer(item as AzureNetAppFilesStore);

    default:
      return storageStoreSerializer(item);
  }
}

export function storageStoreUnionDeserializer(item: any): StorageStoreUnion {
  switch (item["kind"]) {
    case "AzureStorageBlob":
      return azureStorageBlobStoreDeserializer(item as AzureStorageBlobStore);

    case "AzureNetAppFiles":
      return azureNetAppFilesStoreDeserializer(item as AzureNetAppFilesStore);

    default:
      return storageStoreDeserializer(item);
  }
}

/** The kind of the backing storage store. */
export enum KnownStorageStoreType {
  /** The Azure storage blob kind. */
  AzureStorageBlob = "AzureStorageBlob",
  /** The Azure NetApp Files kind. */
  AzureNetAppFiles = "AzureNetAppFiles",
}

/**
 * The kind of the backing storage store. \
 * {@link KnownStorageStoreType} can be used interchangeably with StorageStoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureStorageBlob**: The Azure storage blob kind. \
 * **AzureNetAppFiles**: The Azure NetApp Files kind.
 */
export type StorageStoreType = string;

/** The Azure storage blob properties. */
export interface AzureStorageBlobStore extends StorageStore {
  /** Azure Storage Blob */
  kind: "AzureStorageBlob";
  /** The protocol to use for mounting the storage store. */
  mountProtocol?: BlobStorageMountProtocol;
  /** The associated Azure Storage Account ID. */
  storageAccountId: string;
}

export function azureStorageBlobStoreSerializer(item: AzureStorageBlobStore): any {
  return {
    kind: item["kind"],
    mountProtocol: item["mountProtocol"],
    storageAccountId: item["storageAccountId"],
  };
}

export function azureStorageBlobStoreDeserializer(item: any): AzureStorageBlobStore {
  return {
    kind: item["kind"],
    mountProtocol: item["mountProtocol"],
    storageAccountId: item["storageAccountId"],
  };
}

/** The protocol to use for mounting an Azure Storage Blob store. */
export enum KnownBlobStorageMountProtocol {
  /** NFS protocol. Version of NFS used may vary based on storage type */
  NFS = "NFS",
  /** Blobfuse in file cache mode. */
  BlobfuseCaching = "BlobfuseCaching",
}

/**
 * The protocol to use for mounting an Azure Storage Blob store. \
 * {@link KnownBlobStorageMountProtocol} can be used interchangeably with BlobStorageMountProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NFS**: NFS protocol. Version of NFS used may vary based on storage type \
 * **BlobfuseCaching**: Blobfuse in file cache mode.
 */
export type BlobStorageMountProtocol = string;

/** The Azure NetApp Files properties. */
export interface AzureNetAppFilesStore extends StorageStore {
  /** Azure NetApp Files */
  kind: "AzureNetAppFiles";
  /** The protocol to use for mounting the storage store. */
  mountProtocol?: NetAppMountProtocol;
  /** The associated Azure NetApp Files volume ID. */
  netAppVolumeId: string;
}

export function azureNetAppFilesStoreSerializer(item: AzureNetAppFilesStore): any {
  return {
    kind: item["kind"],
    mountProtocol: item["mountProtocol"],
    netAppVolumeId: item["netAppVolumeId"],
  };
}

export function azureNetAppFilesStoreDeserializer(item: any): AzureNetAppFilesStore {
  return {
    kind: item["kind"],
    mountProtocol: item["mountProtocol"],
    netAppVolumeId: item["netAppVolumeId"],
  };
}

/** The protocol to use for mounting an Azure NetApp Files store. */
export enum KnownNetAppMountProtocol {
  /** NFS protocol. Version of NFS used may vary based on storage type */
  NFS = "NFS",
}

/**
 * The protocol to use for mounting an Azure NetApp Files store. \
 * {@link KnownNetAppMountProtocol} can be used interchangeably with NetAppMountProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NFS**: NFS protocol. Version of NFS used may vary based on storage type
 */
export type NetAppMountProtocol = string;

/** The response of a StorageContainer list operation. */
export interface _StorageContainerListResult {
  /** The StorageContainer items on this page */
  value: StorageContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageContainerListResultDeserializer(item: any): _StorageContainerListResult {
  return {
    value: storageContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageContainerArraySerializer(result: Array<StorageContainer>): any[] {
  return result.map((item) => {
    return storageContainerSerializer(item);
  });
}

export function storageContainerArrayDeserializer(result: Array<StorageContainer>): any[] {
  return result.map((item) => {
    return storageContainerDeserializer(item);
  });
}

/** Storage Container tracked resource */
export interface StorageContainerCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageContainerPropertiesCreateOrUpdate;
}

export function storageContainerCreateOrUpdateSerializer(
  item: StorageContainerCreateOrUpdate,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageContainerPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function storageContainerCreateOrUpdateDeserializer(
  item: any,
): StorageContainerCreateOrUpdate {
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
      : storageContainerPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Storage Container properties */
export interface StorageContainerPropertiesCreateOrUpdate {
  /** Storage store properties */
  storageStore: StorageStoreUnion;
}

export function storageContainerPropertiesCreateOrUpdateSerializer(
  item: StorageContainerPropertiesCreateOrUpdate,
): any {
  return { storageStore: storageStoreUnionSerializer(item["storageStore"]) };
}

export function storageContainerPropertiesCreateOrUpdateDeserializer(
  item: any,
): StorageContainerPropertiesCreateOrUpdate {
  return {
    storageStore: storageStoreUnionDeserializer(item["storageStore"]),
  };
}

/** Storage Container tracked resource */
export interface StorageContainerUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageContainerPropertiesUpdate;
}

export function storageContainerUpdateSerializer(item: StorageContainerUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageContainerPropertiesUpdateSerializer(item["properties"]),
  };
}

export function storageContainerUpdateDeserializer(item: any): StorageContainerUpdate {
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
      : storageContainerPropertiesUpdateDeserializer(item["properties"]),
  };
}

/** Storage Container properties */
export interface StorageContainerPropertiesUpdate {}

export function storageContainerPropertiesUpdateSerializer(
  _item: StorageContainerPropertiesUpdate,
): any {
  return {};
}

export function storageContainerPropertiesUpdateDeserializer(
  item: any,
): StorageContainerPropertiesUpdate {
  return item;
}

/** Storage Asset tracked resource */
export interface StorageAssetCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageAssetPropertiesCreateOrUpdate;
}

export function storageAssetCreateOrUpdateSerializer(item: StorageAssetCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageAssetPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function storageAssetCreateOrUpdateDeserializer(item: any): StorageAssetCreateOrUpdate {
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
      : storageAssetPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Storage Asset properties */
export interface StorageAssetPropertiesCreateOrUpdate {
  /** The description */
  description: string;
  /** The path to the data within its parent container. This should be relative to the root of the parent container. */
  path?: string;
}

export function storageAssetPropertiesCreateOrUpdateSerializer(
  item: StorageAssetPropertiesCreateOrUpdate,
): any {
  return { description: item["description"], path: item["path"] };
}

export function storageAssetPropertiesCreateOrUpdateDeserializer(
  item: any,
): StorageAssetPropertiesCreateOrUpdate {
  return {
    description: item["description"],
    path: item["path"],
  };
}

/** Storage Asset tracked resource */
export interface StorageAssetUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageAssetPropertiesUpdate;
}

export function storageAssetUpdateSerializer(item: StorageAssetUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageAssetPropertiesUpdateSerializer(item["properties"]),
  };
}

export function storageAssetUpdateDeserializer(item: any): StorageAssetUpdate {
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
      : storageAssetPropertiesUpdateDeserializer(item["properties"]),
  };
}

/** Storage Asset properties */
export interface StorageAssetPropertiesUpdate {
  /** The description */
  description: string;
}

export function storageAssetPropertiesUpdateSerializer(item: StorageAssetPropertiesUpdate): any {
  return { description: item["description"] };
}

export function storageAssetPropertiesUpdateDeserializer(item: any): StorageAssetPropertiesUpdate {
  return {
    description: item["description"],
  };
}

/** Supercomputer tracked resource */
export interface SupercomputerCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SupercomputerPropertiesCreateOrUpdate;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentityCreateOrUpdate;
}

export function supercomputerCreateOrUpdateSerializer(item: SupercomputerCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : supercomputerPropertiesCreateOrUpdateSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityCreateOrUpdateSerializer(item["identity"]),
  };
}

export function supercomputerCreateOrUpdateDeserializer(item: any): SupercomputerCreateOrUpdate {
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
      : supercomputerPropertiesCreateOrUpdateDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityCreateOrUpdateDeserializer(item["identity"]),
  };
}

/** Supercomputer properties */
export interface SupercomputerPropertiesCreateOrUpdate {
  /**
   * System Subnet ID associated with managed NodePool for system resources.
   *     It should have connectivity to the child NodePool subnets.
   */
  subnetId: string;
  /**
   * System Subnet ID associated with AKS apiserver. Must be delegated to Microsoft.ContainerService/managedClusters.
   *     It should have connectivity to the system subnet and nodepool subnets.
   */
  managementSubnetId?: string;
  /**
   * Network egress type provisioned for the supercomputer workloads.
   *     Defaults to LoadBalancer if not specified.
   *     If None is specified, the customer is responsible for providing outbound connectivity for Supercomputer functionality.
   */
  outboundType?: NetworkEgressType;
  /** The SKU to use for the system node pool. */
  systemSku?: SystemSku;
  /** Dictionary of identity properties. */
  identities: SupercomputerIdentitiesCreateOrUpdate;
  /** Whether or not to use a customer managed key when encrypting data at rest */
  customerManagedKeys?: CustomerManagedKeys;
  /** Disk Encryption Set ID to use for Customer Managed Keys encryption. Required if Customer Managed Keys is enabled. */
  diskEncryptionSetId?: string;
  /** The Log Analytics Cluster to use for debug logs. This is required when Customer Managed Keys are enabled. */
  logAnalyticsClusterId?: string;
}

export function supercomputerPropertiesCreateOrUpdateSerializer(
  item: SupercomputerPropertiesCreateOrUpdate,
): any {
  return {
    subnetId: item["subnetId"],
    managementSubnetId: item["managementSubnetId"],
    outboundType: item["outboundType"],
    systemSku: item["systemSku"],
    identities: supercomputerIdentitiesCreateOrUpdateSerializer(item["identities"]),
    customerManagedKeys: item["customerManagedKeys"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
  };
}

export function supercomputerPropertiesCreateOrUpdateDeserializer(
  item: any,
): SupercomputerPropertiesCreateOrUpdate {
  return {
    subnetId: item["subnetId"],
    managementSubnetId: item["managementSubnetId"],
    outboundType: item["outboundType"],
    systemSku: item["systemSku"],
    identities: supercomputerIdentitiesCreateOrUpdateDeserializer(item["identities"]),
    customerManagedKeys: item["customerManagedKeys"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
  };
}

/** Dictionary of identity properties for the Supercomputer. */
export interface SupercomputerIdentitiesCreateOrUpdate {
  /** Cluster identity ID. */
  clusterIdentity: IdentityCreateOrUpdate;
  /**
   * Kubelet identity ID used by the supercomputer.
   *       This identity is used by the supercomputer at node level to access Azure resources.
   *       This identity must have ManagedIdentityOperator role on the clusterIdentity.
   */
  kubeletIdentity: IdentityCreateOrUpdate;
  /** User assigned identity IDs to be used by workloads as federated credentials running on supercomputer. The key value must be the resource ID of the identity resource. */
  workloadIdentities?: Record<string, UserAssignedIdentity>;
}

export function supercomputerIdentitiesCreateOrUpdateSerializer(
  item: SupercomputerIdentitiesCreateOrUpdate,
): any {
  return {
    clusterIdentity: identityCreateOrUpdateSerializer(item["clusterIdentity"]),
    kubeletIdentity: identityCreateOrUpdateSerializer(item["kubeletIdentity"]),
    workloadIdentities: item["workloadIdentities"],
  };
}

export function supercomputerIdentitiesCreateOrUpdateDeserializer(
  item: any,
): SupercomputerIdentitiesCreateOrUpdate {
  return {
    clusterIdentity: identityCreateOrUpdateDeserializer(item["clusterIdentity"]),
    kubeletIdentity: identityCreateOrUpdateDeserializer(item["kubeletIdentity"]),
    workloadIdentities: !item["workloadIdentities"]
      ? item["workloadIdentities"]
      : Object.fromEntries(
          Object.entries(item["workloadIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** For user assigned identity resource property. */
export interface IdentityCreateOrUpdate {
  /** The resource ID of the user assigned identity. */
  id: string;
}

export function identityCreateOrUpdateSerializer(item: IdentityCreateOrUpdate): any {
  return { id: item["id"] };
}

export function identityCreateOrUpdateDeserializer(item: any): IdentityCreateOrUpdate {
  return {
    id: item["id"],
  };
}

/** Managed service identity (either system assigned, or none) */
export interface SystemAssignedServiceIdentityCreateOrUpdate {
  /** The type of managed identity assigned to this resource. */
  type: SystemAssignedServiceIdentityType;
}

export function systemAssignedServiceIdentityCreateOrUpdateSerializer(
  item: SystemAssignedServiceIdentityCreateOrUpdate,
): any {
  return { type: item["type"] };
}

export function systemAssignedServiceIdentityCreateOrUpdateDeserializer(
  item: any,
): SystemAssignedServiceIdentityCreateOrUpdate {
  return {
    type: item["type"],
  };
}

/** Supercomputer tracked resource */
export interface SupercomputerUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SupercomputerPropertiesUpdate;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentityUpdate;
}

export function supercomputerUpdateSerializer(item: SupercomputerUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : supercomputerPropertiesUpdateSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityUpdateSerializer(item["identity"]),
  };
}

export function supercomputerUpdateDeserializer(item: any): SupercomputerUpdate {
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
      : supercomputerPropertiesUpdateDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityUpdateDeserializer(item["identity"]),
  };
}

/** Supercomputer properties */
export interface SupercomputerPropertiesUpdate {
  /** Dictionary of identity properties. */
  identities: SupercomputerIdentitiesUpdate;
}

export function supercomputerPropertiesUpdateSerializer(item: SupercomputerPropertiesUpdate): any {
  return { identities: supercomputerIdentitiesUpdateSerializer(item["identities"]) };
}

export function supercomputerPropertiesUpdateDeserializer(
  item: any,
): SupercomputerPropertiesUpdate {
  return {
    identities: supercomputerIdentitiesUpdateDeserializer(item["identities"]),
  };
}

/** Dictionary of identity properties for the Supercomputer. */
export interface SupercomputerIdentitiesUpdate {
  /** User assigned identity IDs to be used by workloads as federated credentials running on supercomputer. The key value must be the resource ID of the identity resource. */
  workloadIdentities?: Record<string, UserAssignedIdentity>;
}

export function supercomputerIdentitiesUpdateSerializer(item: SupercomputerIdentitiesUpdate): any {
  return { workloadIdentities: item["workloadIdentities"] };
}

export function supercomputerIdentitiesUpdateDeserializer(
  item: any,
): SupercomputerIdentitiesUpdate {
  return {
    workloadIdentities: !item["workloadIdentities"]
      ? item["workloadIdentities"]
      : Object.fromEntries(
          Object.entries(item["workloadIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Managed service identity (either system assigned, or none) */
export interface SystemAssignedServiceIdentityUpdate {
  /** The type of managed identity assigned to this resource. */
  type: SystemAssignedServiceIdentityType;
}

export function systemAssignedServiceIdentityUpdateSerializer(
  item: SystemAssignedServiceIdentityUpdate,
): any {
  return { type: item["type"] };
}

export function systemAssignedServiceIdentityUpdateDeserializer(
  item: any,
): SystemAssignedServiceIdentityUpdate {
  return {
    type: item["type"],
  };
}

/** NodePool tracked resource */
export interface NodePoolCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NodePoolPropertiesCreateOrUpdate;
}

export function nodePoolCreateOrUpdateSerializer(item: NodePoolCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : nodePoolPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function nodePoolCreateOrUpdateDeserializer(item: any): NodePoolCreateOrUpdate {
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
      : nodePoolPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** NodePool properties */
export interface NodePoolPropertiesCreateOrUpdate {
  /** The node pool subnet. */
  subnetId: string;
  /** The size of the underlying Azure VM. */
  vmSize: VmSize;
  /** The maximum number of nodes. */
  maxNodeCount: number;
  /** The minimum number of nodes. */
  minNodeCount?: number;
  /** The Virtual Machine Scale Set priority. If not specified, the default is 'Regular'. */
  scaleSetPriority?: ScaleSetPriority;
  /** The size of the OS disk in GB. If not specified, the default is 120 GB. */
  osDiskSizeGb?: number;
  /** The percent of disk usage before which image garbage collection is never run. This cannot be set higher than imageCacheUpperThreshold. The default is 40% */
  imageCacheLowerThreshold?: number;
  /** The percent of disk usage after which image garbage collection is guaranteed to run. The default is 60% */
  imageCacheUpperThreshold?: number;
}

export function nodePoolPropertiesCreateOrUpdateSerializer(
  item: NodePoolPropertiesCreateOrUpdate,
): any {
  return {
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
    maxNodeCount: item["maxNodeCount"],
    minNodeCount: item["minNodeCount"],
    scaleSetPriority: item["scaleSetPriority"],
    osDiskSizeGb: item["osDiskSizeGb"],
    imageCacheLowerThreshold: item["imageCacheLowerThreshold"],
    imageCacheUpperThreshold: item["imageCacheUpperThreshold"],
  };
}

export function nodePoolPropertiesCreateOrUpdateDeserializer(
  item: any,
): NodePoolPropertiesCreateOrUpdate {
  return {
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
    maxNodeCount: item["maxNodeCount"],
    minNodeCount: item["minNodeCount"],
    scaleSetPriority: item["scaleSetPriority"],
    osDiskSizeGb: item["osDiskSizeGb"],
    imageCacheLowerThreshold: item["imageCacheLowerThreshold"],
    imageCacheUpperThreshold: item["imageCacheUpperThreshold"],
  };
}

/** NodePool tracked resource */
export interface NodePoolUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NodePoolPropertiesUpdate;
}

export function nodePoolUpdateSerializer(item: NodePoolUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : nodePoolPropertiesUpdateSerializer(item["properties"]),
  };
}

export function nodePoolUpdateDeserializer(item: any): NodePoolUpdate {
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
      : nodePoolPropertiesUpdateDeserializer(item["properties"]),
  };
}

/** NodePool properties */
export interface NodePoolPropertiesUpdate {
  /** The maximum number of nodes. */
  maxNodeCount: number;
  /** The minimum number of nodes. */
  minNodeCount?: number;
}

export function nodePoolPropertiesUpdateSerializer(item: NodePoolPropertiesUpdate): any {
  return { maxNodeCount: item["maxNodeCount"], minNodeCount: item["minNodeCount"] };
}

export function nodePoolPropertiesUpdateDeserializer(item: any): NodePoolPropertiesUpdate {
  return {
    maxNodeCount: item["maxNodeCount"],
    minNodeCount: item["minNodeCount"],
  };
}

/** Represents a deployment that ties a specific model family to a user defined deployment name used when invoking the chat model. */
export interface ChatModelDeploymentCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ChatModelDeploymentPropertiesCreateOrUpdate;
}

export function chatModelDeploymentCreateOrUpdateSerializer(
  item: ChatModelDeploymentCreateOrUpdate,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : chatModelDeploymentPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function chatModelDeploymentCreateOrUpdateDeserializer(
  item: any,
): ChatModelDeploymentCreateOrUpdate {
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
      : chatModelDeploymentPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Defines a deployment binding a specific model family to a user-defined deployment name for chat inference. */
export interface ChatModelDeploymentPropertiesCreateOrUpdate {
  /** Model format as published by the provider. Verify supported formats per region using the Model Catalog API. */
  modelFormat: string;
  /** Canonical provider model name available in the selected region. Verify supported values per region using the Model Catalog API. */
  modelName: string;
  /** Provider-published version of the selected model. */
  modelVersion?: string;
  /** SKU tier used by this chat model deployment. */
  skuName?: string;
  /** Provisioned SKU capacity units for this chat model deployment. */
  capacity?: number;
}

export function chatModelDeploymentPropertiesCreateOrUpdateSerializer(
  item: ChatModelDeploymentPropertiesCreateOrUpdate,
): any {
  return {
    modelFormat: item["modelFormat"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
    skuName: item["skuName"],
    capacity: item["capacity"],
  };
}

export function chatModelDeploymentPropertiesCreateOrUpdateDeserializer(
  item: any,
): ChatModelDeploymentPropertiesCreateOrUpdate {
  return {
    modelFormat: item["modelFormat"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
    skuName: item["skuName"],
    capacity: item["capacity"],
  };
}

/** Represents a deployment that ties a specific model family to a user defined deployment name used when invoking the chat model. */
export interface ChatModelDeploymentUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ChatModelDeploymentPropertiesUpdate;
}

export function chatModelDeploymentUpdateSerializer(item: ChatModelDeploymentUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : chatModelDeploymentPropertiesUpdateSerializer(item["properties"]),
  };
}

export function chatModelDeploymentUpdateDeserializer(item: any): ChatModelDeploymentUpdate {
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
      : chatModelDeploymentPropertiesUpdateDeserializer(item["properties"]),
  };
}

/** Defines a deployment binding a specific model family to a user-defined deployment name for chat inference. */
export interface ChatModelDeploymentPropertiesUpdate {
  /** Provisioned SKU capacity units for this chat model deployment. */
  capacity?: number;
}

export function chatModelDeploymentPropertiesUpdateSerializer(
  item: ChatModelDeploymentPropertiesUpdate,
): any {
  return { capacity: item["capacity"] };
}

export function chatModelDeploymentPropertiesUpdateDeserializer(
  item: any,
): ChatModelDeploymentPropertiesUpdate {
  return {
    capacity: item["capacity"],
  };
}

/** The Private Endpoint Connection resource for Workspace. */
export interface WorkspacePrivateEndpointConnectionCreateOrUpdate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionPropertiesCreateOrUpdate;
}

export function workspacePrivateEndpointConnectionCreateOrUpdateSerializer(
  item: WorkspacePrivateEndpointConnectionCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function workspacePrivateEndpointConnectionCreateOrUpdateDeserializer(
  item: any,
): WorkspacePrivateEndpointConnectionCreateOrUpdate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionPropertiesCreateOrUpdate {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpointCreateOrUpdate;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesCreateOrUpdateSerializer(
  item: PrivateEndpointConnectionPropertiesCreateOrUpdate,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointCreateOrUpdateSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesCreateOrUpdateDeserializer(
  item: any,
): PrivateEndpointConnectionPropertiesCreateOrUpdate {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointCreateOrUpdateDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

/** The private endpoint resource. */
export interface PrivateEndpointCreateOrUpdate {}

export function privateEndpointCreateOrUpdateSerializer(_item: PrivateEndpointCreateOrUpdate): any {
  return {};
}

export function privateEndpointCreateOrUpdateDeserializer(
  item: any,
): PrivateEndpointCreateOrUpdate {
  return item;
}

/** Workspace tracked resource */
export interface WorkspaceCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspacePropertiesCreateOrUpdate;
}

export function workspaceCreateOrUpdateSerializer(item: WorkspaceCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function workspaceCreateOrUpdateDeserializer(item: any): WorkspaceCreateOrUpdate {
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
      : workspacePropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Workspace properties */
export interface WorkspacePropertiesCreateOrUpdate {
  /** List of linked SuperComputers. */
  supercomputerIds?: string[];
  /** Identity IDs used for leveraging Workspace resources. */
  workspaceIdentity: IdentityCreateOrUpdate;
  /** Whether or not to use a customer managed key when encrypting data at rest */
  customerManagedKeys?: CustomerManagedKeys;
  /** The key to use for encrypting data at rest when customer managed keys are enabled. */
  keyVaultProperties?: KeyVaultProperties;
  /** The Log Analytics Cluster to use for debug logs. This is required when Customer Managed Keys are enabled. */
  logAnalyticsClusterId?: string;
  /** Whether or not public network access is allowed for this resource. For security reasons, it is recommended to disable it whenever possible. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Agent Subnet ID for agent resources. */
  agentSubnetId?: string;
  /** Private Endpoint Subnet ID for private endpoint connections. */
  privateEndpointSubnetId?: string;
  /** Function Subnet ID for workspace resources. */
  workspaceSubnetId?: string;
}

export function workspacePropertiesCreateOrUpdateSerializer(
  item: WorkspacePropertiesCreateOrUpdate,
): any {
  return {
    supercomputerIds: !item["supercomputerIds"]
      ? item["supercomputerIds"]
      : item["supercomputerIds"].map((p: any) => {
          return p;
        }),
    workspaceIdentity: identityCreateOrUpdateSerializer(item["workspaceIdentity"]),
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    agentSubnetId: item["agentSubnetId"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    workspaceSubnetId: item["workspaceSubnetId"],
  };
}

export function workspacePropertiesCreateOrUpdateDeserializer(
  item: any,
): WorkspacePropertiesCreateOrUpdate {
  return {
    supercomputerIds: !item["supercomputerIds"]
      ? item["supercomputerIds"]
      : item["supercomputerIds"].map((p: any) => {
          return p;
        }),
    workspaceIdentity: identityCreateOrUpdateDeserializer(item["workspaceIdentity"]),
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    agentSubnetId: item["agentSubnetId"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    workspaceSubnetId: item["workspaceSubnetId"],
  };
}

/** Workspace tracked resource */
export interface WorkspaceUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspacePropertiesUpdate;
}

export function workspaceUpdateSerializer(item: WorkspaceUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesUpdateSerializer(item["properties"]),
  };
}

export function workspaceUpdateDeserializer(item: any): WorkspaceUpdate {
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
      : workspacePropertiesUpdateDeserializer(item["properties"]),
  };
}

/** Workspace properties */
export interface WorkspacePropertiesUpdate {
  /** List of linked SuperComputers. */
  supercomputerIds?: string[];
  /** The key to use for encrypting data at rest when customer managed keys are enabled. */
  keyVaultProperties?: KeyVaultPropertiesUpdate;
  /** Whether or not public network access is allowed for this resource. For security reasons, it is recommended to disable it whenever possible. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function workspacePropertiesUpdateSerializer(item: WorkspacePropertiesUpdate): any {
  return {
    supercomputerIds: !item["supercomputerIds"]
      ? item["supercomputerIds"]
      : item["supercomputerIds"].map((p: any) => {
          return p;
        }),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesUpdateSerializer(item["keyVaultProperties"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function workspacePropertiesUpdateDeserializer(item: any): WorkspacePropertiesUpdate {
  return {
    supercomputerIds: !item["supercomputerIds"]
      ? item["supercomputerIds"]
      : item["supercomputerIds"].map((p: any) => {
          return p;
        }),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesUpdateDeserializer(item["keyVaultProperties"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** For Key Vault Key references */
export interface KeyVaultPropertiesUpdate {
  /** The Key Name in Key Vault */
  keyName: string;
  /** The Key Version in Key Vault */
  keyVersion?: string;
}

export function keyVaultPropertiesUpdateSerializer(item: KeyVaultPropertiesUpdate): any {
  return { keyName: item["keyName"], keyVersion: item["keyVersion"] };
}

export function keyVaultPropertiesUpdateDeserializer(item: any): KeyVaultPropertiesUpdate {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** Project tracked resource */
export interface ProjectCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ProjectPropertiesCreateOrUpdate;
}

export function projectCreateOrUpdateSerializer(item: ProjectCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function projectCreateOrUpdateDeserializer(item: any): ProjectCreateOrUpdate {
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
      : projectPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Project properties */
export interface ProjectPropertiesCreateOrUpdate {
  /** Allowed StorageContainers (Control plane resource references). */
  storageContainerIds?: string[];
  /** Settings for the project. */
  settings?: ProjectSettings;
}

export function projectPropertiesCreateOrUpdateSerializer(
  item: ProjectPropertiesCreateOrUpdate,
): any {
  return {
    storageContainerIds: !item["storageContainerIds"]
      ? item["storageContainerIds"]
      : item["storageContainerIds"].map((p: any) => {
          return p;
        }),
    settings: !item["settings"] ? item["settings"] : projectSettingsSerializer(item["settings"]),
  };
}

export function projectPropertiesCreateOrUpdateDeserializer(
  item: any,
): ProjectPropertiesCreateOrUpdate {
  return {
    storageContainerIds: !item["storageContainerIds"]
      ? item["storageContainerIds"]
      : item["storageContainerIds"].map((p: any) => {
          return p;
        }),
    settings: !item["settings"] ? item["settings"] : projectSettingsDeserializer(item["settings"]),
  };
}

/** Project tracked resource */
export interface ProjectUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ProjectPropertiesUpdate;
}

export function projectUpdateSerializer(item: ProjectUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesUpdateSerializer(item["properties"]),
  };
}

export function projectUpdateDeserializer(item: any): ProjectUpdate {
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
      : projectPropertiesUpdateDeserializer(item["properties"]),
  };
}

/** Project properties */
export interface ProjectPropertiesUpdate {
  /** Settings for the project. */
  settings?: ProjectSettings;
}

export function projectPropertiesUpdateSerializer(item: ProjectPropertiesUpdate): any {
  return {
    settings: !item["settings"] ? item["settings"] : projectSettingsSerializer(item["settings"]),
  };
}

export function projectPropertiesUpdateDeserializer(item: any): ProjectPropertiesUpdate {
  return {
    settings: !item["settings"] ? item["settings"] : projectSettingsDeserializer(item["settings"]),
  };
}

/** Tool tracked resource */
export interface ToolCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ToolPropertiesCreateOrUpdate;
}

export function toolCreateOrUpdateSerializer(item: ToolCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : toolPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function toolCreateOrUpdateDeserializer(item: any): ToolCreateOrUpdate {
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
      : toolPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Discovery Tool list item properties */
export interface ToolPropertiesCreateOrUpdate {
  /** The version of a resource definition */
  version: string;
  /** Environment variables to make available */
  environmentVariables?: Record<string, string>;
  /** The JSON content for defining a resource */
  definitionContent: Record<string, any>;
}

export function toolPropertiesCreateOrUpdateSerializer(item: ToolPropertiesCreateOrUpdate): any {
  return {
    version: item["version"],
    environmentVariables: item["environmentVariables"],
    definitionContent: item["definitionContent"],
  };
}

export function toolPropertiesCreateOrUpdateDeserializer(item: any): ToolPropertiesCreateOrUpdate {
  return {
    version: item["version"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    definitionContent: Object.fromEntries(
      Object.entries(item["definitionContent"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** Tool tracked resource */
export interface ToolUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ToolPropertiesUpdate;
}

export function toolUpdateSerializer(item: ToolUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : toolPropertiesUpdateSerializer(item["properties"]),
  };
}

export function toolUpdateDeserializer(item: any): ToolUpdate {
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
      : toolPropertiesUpdateDeserializer(item["properties"]),
  };
}

/** Discovery Tool list item properties */
export interface ToolPropertiesUpdate {
  /** The version of a resource definition */
  version: string;
  /** Environment variables to make available */
  environmentVariables?: Record<string, string>;
  /** The JSON content for defining a resource */
  definitionContent: Record<string, any>;
}

export function toolPropertiesUpdateSerializer(item: ToolPropertiesUpdate): any {
  return {
    version: item["version"],
    environmentVariables: item["environmentVariables"],
    definitionContent: item["definitionContent"],
  };
}

export function toolPropertiesUpdateDeserializer(item: any): ToolPropertiesUpdate {
  return {
    version: item["version"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    definitionContent: Object.fromEntries(
      Object.entries(item["definitionContent"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The Private Endpoint Connection resource for Bookshelf. */
export interface BookshelfPrivateEndpointConnectionCreateOrUpdate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionPropertiesCreateOrUpdate;
}

export function bookshelfPrivateEndpointConnectionCreateOrUpdateSerializer(
  item: BookshelfPrivateEndpointConnectionCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function bookshelfPrivateEndpointConnectionCreateOrUpdateDeserializer(
  item: any,
): BookshelfPrivateEndpointConnectionCreateOrUpdate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Bookshelf tracked resource */
export interface BookshelfCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: BookshelfPropertiesCreateOrUpdate;
}

export function bookshelfCreateOrUpdateSerializer(item: BookshelfCreateOrUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : bookshelfPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function bookshelfCreateOrUpdateDeserializer(item: any): BookshelfCreateOrUpdate {
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
      : bookshelfPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** Bookshelf properties */
export interface BookshelfPropertiesCreateOrUpdate {
  /** User assigned identity IDs to be used by knowledgebase workloads. The key value must be the resource ID of the identity resource. */
  workloadIdentities?: Record<string, UserAssignedIdentity>;
  /** Whether or not to use a customer managed key when encrypting data at rest */
  customerManagedKeys?: CustomerManagedKeys;
  /** The key to use for encrypting data at rest when customer managed keys are enabled. Required if Customer Managed Keys is enabled. */
  keyVaultProperties?: BookshelfKeyVaultProperties;
  /** The Log Analytics Cluster to use for debug logs. This is required when Customer Managed Keys are enabled. */
  logAnalyticsClusterId?: string;
  /** Whether or not public network access is allowed for this resource. For security reasons, it is recommended to disable it whenever possible. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Private Endpoint Subnet ID for private endpoint connections. */
  privateEndpointSubnetId?: string;
  /** Search Subnet ID for search resources. */
  searchSubnetId?: string;
}

export function bookshelfPropertiesCreateOrUpdateSerializer(
  item: BookshelfPropertiesCreateOrUpdate,
): any {
  return {
    workloadIdentities: item["workloadIdentities"],
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : bookshelfKeyVaultPropertiesSerializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    searchSubnetId: item["searchSubnetId"],
  };
}

export function bookshelfPropertiesCreateOrUpdateDeserializer(
  item: any,
): BookshelfPropertiesCreateOrUpdate {
  return {
    workloadIdentities: !item["workloadIdentities"]
      ? item["workloadIdentities"]
      : Object.fromEntries(
          Object.entries(item["workloadIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
    customerManagedKeys: item["customerManagedKeys"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : bookshelfKeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    logAnalyticsClusterId: item["logAnalyticsClusterId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointSubnetId: item["privateEndpointSubnetId"],
    searchSubnetId: item["searchSubnetId"],
  };
}

/** Bookshelf tracked resource */
export interface BookshelfUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: BookshelfPropertiesUpdate;
}

export function bookshelfUpdateSerializer(item: BookshelfUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : bookshelfPropertiesUpdateSerializer(item["properties"]),
  };
}

export function bookshelfUpdateDeserializer(item: any): BookshelfUpdate {
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
      : bookshelfPropertiesUpdateDeserializer(item["properties"]),
  };
}

/** Bookshelf properties */
export interface BookshelfPropertiesUpdate {
  /** The key to use for encrypting data at rest when customer managed keys are enabled. Required if Customer Managed Keys is enabled. */
  keyVaultProperties?: BookshelfKeyVaultPropertiesUpdate;
  /** Whether or not public network access is allowed for this resource. For security reasons, it is recommended to disable it whenever possible. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function bookshelfPropertiesUpdateSerializer(item: BookshelfPropertiesUpdate): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : bookshelfKeyVaultPropertiesUpdateSerializer(item["keyVaultProperties"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function bookshelfPropertiesUpdateDeserializer(item: any): BookshelfPropertiesUpdate {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : bookshelfKeyVaultPropertiesUpdateDeserializer(item["keyVaultProperties"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Key Vault Properties with clientId selection */
export interface BookshelfKeyVaultPropertiesUpdate {
  /** The Key Name in Key Vault */
  keyName: string;
  /** The Key Version in Key Vault */
  keyVersion?: string;
}

export function bookshelfKeyVaultPropertiesUpdateSerializer(
  item: BookshelfKeyVaultPropertiesUpdate,
): any {
  return { keyName: item["keyName"], keyVersion: item["keyVersion"] };
}

export function bookshelfKeyVaultPropertiesUpdateDeserializer(
  item: any,
): BookshelfKeyVaultPropertiesUpdate {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** 2026-06-01 */
  V20260601 = "2026-06-01",
}
