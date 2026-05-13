// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
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

/** An Azure Monitor Workspace definition */
export interface AzureMonitorWorkspaceResource extends TrackedResource {
  /** Resource properties */
  properties?: AzureMonitorWorkspace;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function azureMonitorWorkspaceResourceSerializer(item: AzureMonitorWorkspaceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : azureMonitorWorkspaceSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function azureMonitorWorkspaceResourceDeserializer(
  item: any,
): AzureMonitorWorkspaceResource {
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
      : azureMonitorWorkspaceDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of an Azure Monitor Workspace */
export interface AzureMonitorWorkspace {
  /** The immutable Id of the Azure Monitor Workspace. This property is read-only. */
  readonly accountId?: string;
  /** Properties related to the metrics container in the Azure Monitor Workspace */
  metrics?: AzureMonitorWorkspaceMetrics;
  /** The provisioning state of the Azure Monitor Workspace. Set to Succeeded if everything is healthy. */
  readonly provisioningState?: ResourceProvisioningState;
  /** The Data Collection Rule and Endpoint used for ingestion by default. */
  readonly defaultIngestionSettings?: AzureMonitorWorkspaceDefaultIngestionSettings;
  /** List of private endpoint connections */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Gets or sets allow or disallow public network access to Azure Monitor Workspace */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function azureMonitorWorkspaceSerializer(item: AzureMonitorWorkspace): any {
  return {
    metrics: !item["metrics"]
      ? item["metrics"]
      : azureMonitorWorkspaceMetricsSerializer(item["metrics"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function azureMonitorWorkspaceDeserializer(item: any): AzureMonitorWorkspace {
  return {
    accountId: item["accountId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : azureMonitorWorkspaceMetricsDeserializer(item["metrics"]),
    provisioningState: item["provisioningState"],
    defaultIngestionSettings: !item["defaultIngestionSettings"]
      ? item["defaultIngestionSettings"]
      : azureMonitorWorkspaceDefaultIngestionSettingsDeserializer(item["defaultIngestionSettings"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Properties related to the metrics container in the Azure Monitor Workspace */
export interface AzureMonitorWorkspaceMetrics {
  /** The Prometheus query endpoint for the Azure Monitor Workspace */
  readonly prometheusQueryEndpoint?: string;
  /** An internal identifier for the metrics container. Only to be used by the system. */
  readonly internalId?: string;
  /** Flag that indicates whether to enable access using resource permissions. */
  enableAccessUsingResourcePermissions?: boolean;
}

export function azureMonitorWorkspaceMetricsSerializer(item: AzureMonitorWorkspaceMetrics): any {
  return { enableAccessUsingResourcePermissions: item["enableAccessUsingResourcePermissions"] };
}

export function azureMonitorWorkspaceMetricsDeserializer(item: any): AzureMonitorWorkspaceMetrics {
  return {
    prometheusQueryEndpoint: item["prometheusQueryEndpoint"],
    internalId: item["internalId"],
    enableAccessUsingResourcePermissions: item["enableAccessUsingResourcePermissions"],
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

/** The Data Collection Rule and Endpoint used for ingestion by default. */
export interface AzureMonitorWorkspaceDefaultIngestionSettings {
  /** The Azure resource Id of the default data collection rule for this Azure Monitor Workspace. */
  readonly dataCollectionRuleResourceId?: string;
  /** The Azure resource Id of the default data collection endpoint for this Azure Monitor Workspace. */
  readonly dataCollectionEndpointResourceId?: string;
  /** The immutable Id of the default data collection rule for this Azure Monitor Workspace. */
  readonly dataCollectionRuleImmutableId?: string;
  /** The ingestion endpoints for this Azure Monitor Workspace. */
  readonly ingestionEndpoints?: IngestionEndpoints;
}

export function azureMonitorWorkspaceDefaultIngestionSettingsDeserializer(
  item: any,
): AzureMonitorWorkspaceDefaultIngestionSettings {
  return {
    dataCollectionRuleResourceId: item["dataCollectionRuleResourceId"],
    dataCollectionEndpointResourceId: item["dataCollectionEndpointResourceId"],
    dataCollectionRuleImmutableId: item["dataCollectionRuleImmutableId"],
    ingestionEndpoints: !item["ingestionEndpoints"]
      ? item["ingestionEndpoints"]
      : ingestionEndpointsDeserializer(item["ingestionEndpoints"]),
  };
}

/** The ingestion endpoints for an Azure Monitor Workspace. */
export interface IngestionEndpoints {
  /** The metrics ingestion endpoint for this Azure Monitor Workspace. */
  readonly metrics?: string;
}

export function ingestionEndpointsDeserializer(item: any): IngestionEndpoints {
  return {
    metrics: item["metrics"],
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

/** Gets or sets allow or disallow public network access to Azure Monitor Workspace */
export enum KnownPublicNetworkAccess {
  /** Public network access is enabled. */
  Enabled = "Enabled",
  /** Public network access is disabled. */
  Disabled = "Disabled",
}

/**
 * Gets or sets allow or disallow public network access to Azure Monitor Workspace \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Public network access is enabled. \
 * **Disabled**: Public network access is disabled.
 */
export type PublicNetworkAccess = string;

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

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
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

/** The type used for updating an Azure Monitor Workspace */
export interface AzureMonitorWorkspaceResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource properties */
  properties?: AzureMonitorWorkspace;
}

export function azureMonitorWorkspaceResourceUpdateSerializer(
  item: AzureMonitorWorkspaceResourceUpdate,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : azureMonitorWorkspaceSerializer(item["properties"]),
  };
}

/** The response of a AzureMonitorWorkspaceResource list operation. */
export interface _AzureMonitorWorkspaceResourceListResult {
  /** The AzureMonitorWorkspaceResource items on this page */
  value: AzureMonitorWorkspaceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _azureMonitorWorkspaceResourceListResultDeserializer(
  item: any,
): _AzureMonitorWorkspaceResourceListResult {
  return {
    value: azureMonitorWorkspaceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureMonitorWorkspaceResourceArraySerializer(
  result: Array<AzureMonitorWorkspaceResource>,
): any[] {
  return result.map((item) => {
    return azureMonitorWorkspaceResourceSerializer(item);
  });
}

export function azureMonitorWorkspaceResourceArrayDeserializer(
  result: Array<AzureMonitorWorkspaceResource>,
): any[] {
  return result.map((item) => {
    return azureMonitorWorkspaceResourceDeserializer(item);
  });
}

/** Issue resource for create/update operations. */
export interface IssueResourceCreate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: IssuePayloadCreate;
}

export function issueResourceCreateSerializer(item: IssueResourceCreate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : issuePayloadCreateSerializer(item["properties"]),
  };
}

/** Issue properties for create/update operations, omitting server-side read-only fields (investigations, investigationsCount, provisioningState). */
export interface IssuePayloadCreate {
  /** The issue title */
  title: string;
  /** The issue status */
  status: Status;
  /** The issue severity */
  severity: string;
  /** The issue impact time (in UTC) */
  impactTime: Date;
  /** The issue background information */
  background?: Background;
}

export function issuePayloadCreateSerializer(item: IssuePayloadCreate): any {
  return {
    title: item["title"],
    status: item["status"],
    severity: item["severity"],
    impactTime: item["impactTime"].toISOString(),
    background: !item["background"] ? item["background"] : backgroundSerializer(item["background"]),
  };
}

/** The issue status */
export enum KnownStatus {
  /** The issue is new */
  New = "New",
  /** The issue is in progress */
  InProgress = "InProgress",
  /** The issue is mitigated */
  Mitigated = "Mitigated",
  /** The issue is closed */
  Closed = "Closed",
  /** The issue is canceled */
  Canceled = "Canceled",
}

/**
 * The issue status \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: The issue is new \
 * **InProgress**: The issue is in progress \
 * **Mitigated**: The issue is mitigated \
 * **Closed**: The issue is closed \
 * **Canceled**: The issue is canceled
 */
export type Status = string;

/** The issue background information */
export interface Background {
  /** The background type */
  type?: string;
  /** The background text */
  text?: string;
  /** The background details */
  details?: BackgroundDetails[];
}

export function backgroundSerializer(item: Background): any {
  return {
    type: item["type"],
    text: item["text"],
    details: !item["details"] ? item["details"] : backgroundDetailsArraySerializer(item["details"]),
  };
}

export function backgroundDeserializer(item: any): Background {
  return {
    type: item["type"],
    text: item["text"],
    details: !item["details"]
      ? item["details"]
      : backgroundDetailsArrayDeserializer(item["details"]),
  };
}

export function backgroundDetailsArraySerializer(result: Array<BackgroundDetails>): any[] {
  return result.map((item) => {
    return backgroundDetailsSerializer(item);
  });
}

export function backgroundDetailsArrayDeserializer(result: Array<BackgroundDetails>): any[] {
  return result.map((item) => {
    return backgroundDetailsDeserializer(item);
  });
}

/** A background details element */
export interface BackgroundDetails {
  /** The background details name */
  name: string;
  /** The background details value */
  value: string;
}

export function backgroundDetailsSerializer(item: BackgroundDetails): any {
  return { name: item["name"], value: item["value"] };
}

export function backgroundDetailsDeserializer(item: any): BackgroundDetails {
  return {
    name: item["name"],
    value: item["value"],
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

/** The Issue resource */
export interface IssueResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: IssueProperties;
}

export function issueResourceDeserializer(item: any): IssueResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : issuePropertiesDeserializer(item["properties"]),
  };
}

/** The issue properties */
export interface IssueProperties {
  /** The issue title */
  title: string;
  /** The issue status */
  status: Status;
  /** The issue severity */
  severity: string;
  /** The list of investigations in the issue */
  readonly investigations: InvestigationMetadata[];
  /** The issue impact time (in UTC) */
  impactTime: Date;
  /** The number of investigations in the issue */
  readonly investigationsCount: number;
  /** The issue background information */
  background?: Background;
  /** The issue notification settings */
  notifications?: Notifications;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function issuePropertiesDeserializer(item: any): IssueProperties {
  return {
    title: item["title"],
    status: item["status"],
    severity: item["severity"],
    investigations: investigationMetadataArrayDeserializer(item["investigations"]),
    impactTime: new Date(item["impactTime"]),
    investigationsCount: item["investigationsCount"],
    background: !item["background"]
      ? item["background"]
      : backgroundDeserializer(item["background"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationsDeserializer(item["notifications"]),
    provisioningState: item["provisioningState"],
  };
}

export function investigationMetadataArrayDeserializer(
  result: Array<InvestigationMetadata>,
): any[] {
  return result.map((item) => {
    return investigationMetadataDeserializer(item);
  });
}

/** Properties of the current investigation */
export interface InvestigationMetadata {
  /** The unique identifier of the investigation */
  id: string;
  /** The creation time of the investigation (in UTC) */
  createdAt: Date;
}

export function investigationMetadataDeserializer(item: any): InvestigationMetadata {
  return {
    id: item["id"],
    createdAt: new Date(item["createdAt"]),
  };
}

/** Issue notification settings */
export interface Notifications {
  /** The types of updates that trigger notifications */
  updateTypes?: IssueNotificationTypeUnion[];
  /** The action group IDs to notify */
  actionGroupIds?: string[];
  /** Whether to exclude default action groups from notifications */
  excludeDefaultActionGroups?: boolean;
}

export function notificationsSerializer(item: Notifications): any {
  return {
    updateTypes: !item["updateTypes"]
      ? item["updateTypes"]
      : issueNotificationTypeUnionArraySerializer(item["updateTypes"]),
    actionGroupIds: !item["actionGroupIds"]
      ? item["actionGroupIds"]
      : item["actionGroupIds"].map((p: any) => {
          return p;
        }),
    excludeDefaultActionGroups: item["excludeDefaultActionGroups"],
  };
}

export function notificationsDeserializer(item: any): Notifications {
  return {
    updateTypes: !item["updateTypes"]
      ? item["updateTypes"]
      : issueNotificationTypeUnionArrayDeserializer(item["updateTypes"]),
    actionGroupIds: !item["actionGroupIds"]
      ? item["actionGroupIds"]
      : item["actionGroupIds"].map((p: any) => {
          return p;
        }),
    excludeDefaultActionGroups: item["excludeDefaultActionGroups"],
  };
}

export function issueNotificationTypeUnionArraySerializer(
  result: Array<IssueNotificationTypeUnion>,
): any[] {
  return result.map((item) => {
    return issueNotificationTypeUnionSerializer(item);
  });
}

export function issueNotificationTypeUnionArrayDeserializer(
  result: Array<IssueNotificationTypeUnion>,
): any[] {
  return result.map((item) => {
    return issueNotificationTypeUnionDeserializer(item);
  });
}

/** Base properties for an issue notification type */
export interface IssueNotificationType {
  /** The type of update that triggers the notification */
  /** The discriminator possible values: IssueCreation, OnChange, TimeBased */
  updateType: UpdateType;
}

export function issueNotificationTypeSerializer(item: IssueNotificationType): any {
  return { updateType: item["updateType"] };
}

export function issueNotificationTypeDeserializer(item: any): IssueNotificationType {
  return {
    updateType: item["updateType"],
  };
}

/** Alias for IssueNotificationTypeUnion */
export type IssueNotificationTypeUnion =
  | IssueCreationNotificationType
  | OnChangeNotificationType
  | TimeBasedUpdatesNotificationType
  | IssueNotificationType;

export function issueNotificationTypeUnionSerializer(item: IssueNotificationTypeUnion): any {
  switch (item.updateType) {
    case "IssueCreation":
      return issueCreationNotificationTypeSerializer(item as IssueCreationNotificationType);

    case "OnChange":
      return onChangeNotificationTypeSerializer(item as OnChangeNotificationType);

    case "TimeBased":
      return timeBasedUpdatesNotificationTypeSerializer(item as TimeBasedUpdatesNotificationType);

    default:
      return issueNotificationTypeSerializer(item);
  }
}

export function issueNotificationTypeUnionDeserializer(item: any): IssueNotificationTypeUnion {
  switch (item["updateType"]) {
    case "IssueCreation":
      return issueCreationNotificationTypeDeserializer(item as IssueCreationNotificationType);

    case "OnChange":
      return onChangeNotificationTypeDeserializer(item as OnChangeNotificationType);

    case "TimeBased":
      return timeBasedUpdatesNotificationTypeDeserializer(item as TimeBasedUpdatesNotificationType);

    default:
      return issueNotificationTypeDeserializer(item);
  }
}

/** The type of update that triggers a notification */
export enum KnownUpdateType {
  /** Notification sent when an issue is created */
  IssueCreation = "IssueCreation",
  /** Notification sent based on time intervals */
  TimeBased = "TimeBased",
  /** Notification sent when the issue changes */
  OnChange = "OnChange",
}

/**
 * The type of update that triggers a notification \
 * {@link KnownUpdateType} can be used interchangeably with UpdateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IssueCreation**: Notification sent when an issue is created \
 * **TimeBased**: Notification sent based on time intervals \
 * **OnChange**: Notification sent when the issue changes
 */
export type UpdateType = string;

/** Notification type for issue creation events */
export interface IssueCreationNotificationType extends IssueNotificationType {
  /** The type of update that triggers the notification */
  updateType: "IssueCreation";
}

export function issueCreationNotificationTypeSerializer(item: IssueCreationNotificationType): any {
  return { updateType: item["updateType"] };
}

export function issueCreationNotificationTypeDeserializer(
  item: any,
): IssueCreationNotificationType {
  return {
    updateType: item["updateType"],
  };
}

/** Notification type for on-change events */
export interface OnChangeNotificationType extends IssueNotificationType {
  /** The type of update that triggers the notification */
  updateType: "OnChange";
}

export function onChangeNotificationTypeSerializer(item: OnChangeNotificationType): any {
  return { updateType: item["updateType"] };
}

export function onChangeNotificationTypeDeserializer(item: any): OnChangeNotificationType {
  return {
    updateType: item["updateType"],
  };
}

/** Notification type for time-based updates */
export interface TimeBasedUpdatesNotificationType extends IssueNotificationType {
  /** The type of update that triggers the notification */
  updateType: "TimeBased";
  /** The interval between time-based updates */
  updateInterval: string;
}

export function timeBasedUpdatesNotificationTypeSerializer(
  item: TimeBasedUpdatesNotificationType,
): any {
  return { updateType: item["updateType"], updateInterval: item["updateInterval"] };
}

export function timeBasedUpdatesNotificationTypeDeserializer(
  item: any,
): TimeBasedUpdatesNotificationType {
  return {
    updateType: item["updateType"],
    updateInterval: item["updateInterval"],
  };
}

/** The Issue resource update */
export interface IssueResourceUpdate {
  /** The resource-specific properties for this resource. */
  properties?: IssuePropertiesUpdate;
}

export function issueResourceUpdateSerializer(item: IssueResourceUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : issuePropertiesUpdateSerializer(item["properties"]),
  };
}

/** The issue properties for update */
export interface IssuePropertiesUpdate {
  /** The issue title */
  title?: string;
  /** The issue status */
  status?: Status;
  /** The issue severity */
  severity?: string;
  /** The issue impact time (in UTC) */
  impactTime?: Date;
  /** The issue background information */
  background?: Background;
  /** The issue notification settings */
  notifications?: Notifications;
}

export function issuePropertiesUpdateSerializer(item: IssuePropertiesUpdate): any {
  return {
    title: item["title"],
    status: item["status"],
    severity: item["severity"],
    impactTime: !item["impactTime"] ? item["impactTime"] : item["impactTime"].toISOString(),
    background: !item["background"] ? item["background"] : backgroundSerializer(item["background"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationsSerializer(item["notifications"]),
  };
}

/** The response of a IssueResource list operation. */
export interface _IssueResourceListResult {
  /** The IssueResource items on this page */
  value: IssueResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _issueResourceListResultDeserializer(item: any): _IssueResourceListResult {
  return {
    value: issueResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function issueResourceArrayDeserializer(result: Array<IssueResource>): any[] {
  return result.map((item) => {
    return issueResourceDeserializer(item);
  });
}

/** Details about the investigation result */
export interface InvestigationResult {
  /** The identifier of the investigation */
  id: string;
  /** The origin of the investigation */
  origin?: Origin_1;
  /** The creation time of the investigation (in UTC) */
  createdAt?: Date;
  /** The last update time of the investigation (in UTC) */
  lastModifiedAt?: Date;
  /** The result of this investigation */
  result: string;
}

export function investigationResultSerializer(item: InvestigationResult): any {
  return {
    id: item["id"],
    origin: !item["origin"] ? item["origin"] : originSerializer(item["origin"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : item["createdAt"].toISOString(),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : item["lastModifiedAt"].toISOString(),
    result: item["result"],
  };
}

export function investigationResultDeserializer(item: any): InvestigationResult {
  return {
    id: item["id"],
    origin: !item["origin"] ? item["origin"] : originDeserializer(item["origin"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    result: item["result"],
  };
}

/** Details about the origin of the entity - the source that added it to the issue */
export interface Origin_1 {
  /** The ID of the origin - for example, in case of 'Manual', the user ID/app ID, and in case of 'Automatic', the name of the automatic system */
  addedBy: string;
  /** The source of the origin - Manual or Automatic */
  addedByType: AddedByType;
}

export function originSerializer(item: Origin_1): any {
  return { addedBy: item["addedBy"], addedByType: item["addedByType"] };
}

export function originDeserializer(item: any): Origin_1 {
  return {
    addedBy: item["addedBy"],
    addedByType: item["addedByType"],
  };
}

/** The type of entity that added data to the issue */
export enum KnownAddedByType {
  /** The data was added manually by a user */
  Manual = "Manual",
  /** The data was added automatically */
  Automatic = "Automatic",
}

/**
 * The type of entity that added data to the issue \
 * {@link KnownAddedByType} can be used interchangeably with AddedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: The data was added manually by a user \
 * **Automatic**: The data was added automatically
 */
export type AddedByType = string;

/** Parameters provided to get the investigation result */
export interface FetchInvestigationResultParameters {
  /** The unique identifier of the investigation */
  investigationId: string;
}

export function fetchInvestigationResultParametersSerializer(
  item: FetchInvestigationResultParameters,
): any {
  return { investigationId: item["investigationId"] };
}

/** Parameters for listing related entities */
export interface ListParameter {
  /** The filter to apply on the operation. For example, to filter by relevance, use "$filter=relevance eq 'Relevant'". Note: this property is currently a placeholder and is not in use. */
  filter?: string;
}

export function listParameterSerializer(item: ListParameter): any {
  return { filter: item["filter"] };
}

/** Paged collection of RelatedAlert items */
export interface PagedRelatedAlert {
  /** The RelatedAlert items on this page */
  value: RelatedAlert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function pagedRelatedAlertDeserializer(item: any): PagedRelatedAlert {
  return {
    value: relatedAlertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function relatedAlertArrayDeserializer(result: Array<RelatedAlert>): any[] {
  return result.map((item) => {
    return relatedAlertDeserializer(item);
  });
}

/** Properties of an alert which is related to the issue */
export interface RelatedAlert {
  /** The alert ID */
  id: string;
  /** The alerts's relevance status */
  relevance: Relevance;
  /** The source that related the alert to the issue */
  readonly origin: Origin_1;
  /** The time this relation was added to the issue (in UTC) */
  readonly addedAt: Date;
  /** The last update time of this relation (in UTC) */
  readonly lastModifiedAt: Date;
}

export function relatedAlertDeserializer(item: any): RelatedAlert {
  return {
    id: item["id"],
    relevance: item["relevance"],
    origin: originDeserializer(item["origin"]),
    addedAt: new Date(item["addedAt"]),
    lastModifiedAt: new Date(item["lastModifiedAt"]),
  };
}

/** The relevance status of the resource */
export enum KnownRelevance {
  /** No relevance status for the resource */
  None = "None",
  /** The resource is relevant to the issue */
  Relevant = "Relevant",
  /** The resource is irrelevant to the issue */
  Irrelevant = "Irrelevant",
}

/**
 * The relevance status of the resource \
 * {@link KnownRelevance} can be used interchangeably with Relevance,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No relevance status for the resource \
 * **Relevant**: The resource is relevant to the issue \
 * **Irrelevant**: The resource is irrelevant to the issue
 */
export type Relevance = string;

/** A list of related alerts for write operations. */
export interface RelatedAlertsCreate {
  /** A list of related alerts */
  value: RelatedAlertCreate[];
}

export function relatedAlertsCreateSerializer(item: RelatedAlertsCreate): any {
  return { value: relatedAlertCreateArraySerializer(item["value"]) };
}

export function relatedAlertCreateArraySerializer(result: Array<RelatedAlertCreate>): any[] {
  return result.map((item) => {
    return relatedAlertCreateSerializer(item);
  });
}

/** Properties of an alert related to the issue for write operations, omitting server-side read-only fields (origin, addedAt, lastModifiedAt). */
export interface RelatedAlertCreate {
  /** The alert ID */
  id: string;
  /** The alerts's relevance status */
  relevance: Relevance;
}

export function relatedAlertCreateSerializer(item: RelatedAlertCreate): any {
  return { id: item["id"], relevance: item["relevance"] };
}

/** A list of related alerts */
export interface RelatedAlerts {
  /** A list of related alerts */
  value: RelatedAlert[];
}

export function relatedAlertsDeserializer(item: any): RelatedAlerts {
  return {
    value: relatedAlertArrayDeserializer(item["value"]),
  };
}

/** Paged collection of RelatedResource items */
export interface PagedRelatedResource {
  /** The RelatedResource items on this page */
  value: RelatedResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function pagedRelatedResourceDeserializer(item: any): PagedRelatedResource {
  return {
    value: relatedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function relatedResourceArrayDeserializer(result: Array<RelatedResource>): any[] {
  return result.map((item) => {
    return relatedResourceDeserializer(item);
  });
}

/** Properties of a resource which is related to the issue */
export interface RelatedResource {
  /** The resource ID */
  id: string;
  /** The resource's relevance status */
  relevance: Relevance;
  /** The source that related the resource to the issue */
  readonly origin: Origin_1;
  /** The time this relation was added to the issue (in UTC) */
  readonly addedAt: Date;
  /** The last update time of this relation (in UTC) */
  readonly lastModifiedAt: Date;
}

export function relatedResourceDeserializer(item: any): RelatedResource {
  return {
    id: item["id"],
    relevance: item["relevance"],
    origin: originDeserializer(item["origin"]),
    addedAt: new Date(item["addedAt"]),
    lastModifiedAt: new Date(item["lastModifiedAt"]),
  };
}

/** A list of related resources for write operations. */
export interface RelatedResourcesCreate {
  /** A list of related resources */
  value: RelatedResourceCreate[];
}

export function relatedResourcesCreateSerializer(item: RelatedResourcesCreate): any {
  return { value: relatedResourceCreateArraySerializer(item["value"]) };
}

export function relatedResourceCreateArraySerializer(result: Array<RelatedResourceCreate>): any[] {
  return result.map((item) => {
    return relatedResourceCreateSerializer(item);
  });
}

/** Properties of a resource related to the issue for write operations, omitting server-side read-only fields (origin, addedAt, lastModifiedAt). */
export interface RelatedResourceCreate {
  /** The resource ID */
  id: string;
  /** The resource's relevance status */
  relevance: Relevance;
}

export function relatedResourceCreateSerializer(item: RelatedResourceCreate): any {
  return { id: item["id"], relevance: item["relevance"] };
}

/** A list of related resources */
export interface RelatedResources {
  /** A list of related resources */
  value: RelatedResource[];
}

export function relatedResourcesDeserializer(item: any): RelatedResources {
  return {
    value: relatedResourceArrayDeserializer(item["value"]),
  };
}

/** The issue background visualization */
export interface BackgroundVisualization {
  /** The background visualization content, in Adaptive Card format */
  visualization: string;
  /** The background visualization origin */
  readonly origin: Origin_1;
}

export function backgroundVisualizationDeserializer(item: any): BackgroundVisualization {
  return {
    visualization: item["visualization"],
    origin: originDeserializer(item["origin"]),
  };
}

/** Background visualization for write operations, omitting the server-side read-only 'origin' field. */
export interface BackgroundVisualizationCreate {
  /** The background visualization content, in Adaptive Card format */
  visualization: string;
}

export function backgroundVisualizationCreateSerializer(item: BackgroundVisualizationCreate): any {
  return { visualization: item["visualization"] };
}

/** Metrics container resource for an Azure Monitor Workspace. */
export interface MetricsContainerResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MetricsContainer;
}

export function metricsContainerResourceSerializer(item: MetricsContainerResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : metricsContainerSerializer(item["properties"]),
  };
}

export function metricsContainerResourceDeserializer(item: any): MetricsContainerResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : metricsContainerDeserializer(item["properties"]),
  };
}

/** Properties of a metrics container. */
export interface MetricsContainer {
  /** The provisioning state of the metrics container. */
  readonly provisioningState?: ResourceProvisioningState;
  /** The version of Metrics Query Service that this AMW will use for all metric queries. */
  version?: string;
}

export function metricsContainerSerializer(item: MetricsContainer): any {
  return { version: item["version"] };
}

export function metricsContainerDeserializer(item: any): MetricsContainer {
  return {
    provisioningState: item["provisioningState"],
    version: item["version"],
  };
}

/** The response of a MetricsContainerResource list operation. */
export interface _MetricsContainerResourceListResult {
  /** The MetricsContainerResource items on this page */
  value: MetricsContainerResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricsContainerResourceListResultDeserializer(
  item: any,
): _MetricsContainerResourceListResult {
  return {
    value: metricsContainerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricsContainerResourceArraySerializer(
  result: Array<MetricsContainerResource>,
): any[] {
  return result.map((item) => {
    return metricsContainerResourceSerializer(item);
  });
}

export function metricsContainerResourceArrayDeserializer(
  result: Array<MetricsContainerResource>,
): any[] {
  return result.map((item) => {
    return metricsContainerResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** API Version 2025-10-03 */
  V20251003Stable = "2025-10-03",
}
