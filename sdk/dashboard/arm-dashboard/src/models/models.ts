// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
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
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The private endpoint connection group ids. */
  groupIds?: string[];
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

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

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
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
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    provisioningState: item["provisioningState"],
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

/** Known values of {@link ProvisioningState} that the service accepts. */
export enum KnownProvisioningState {
  Accepted = "Accepted",
  Creating = "Creating",
  Updating = "Updating",
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
  Deleted = "Deleted",
  NotSpecified = "NotSpecified",
}

/** Type of ProvisioningState */
export type ProvisioningState = string;

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

/** The integration fabric resource type. */
export interface IntegrationFabric extends TrackedResource {
  properties?: IntegrationFabricProperties;
}

export function integrationFabricSerializer(item: IntegrationFabric): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : integrationFabricPropertiesSerializer(item["properties"]),
  };
}

export function integrationFabricDeserializer(item: any): IntegrationFabric {
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
      : integrationFabricPropertiesDeserializer(item["properties"]),
  };
}

/** model interface IntegrationFabricProperties */
export interface IntegrationFabricProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource Id of the Azure resource being integrated with Azure Managed Grafana. E.g., an Azure Kubernetes Service cluster. */
  targetResourceId?: string;
  /** The resource Id of the Azure resource which is used to configure Grafana data source. E.g., an Azure Monitor Workspace, an Azure Data Explorer cluster, etc. */
  dataSourceResourceId?: string;
  /** A list of integration scenarios covered by this integration fabric */
  scenarios?: string[];
}

export function integrationFabricPropertiesSerializer(item: IntegrationFabricProperties): any {
  return {
    targetResourceId: item["targetResourceId"],
    dataSourceResourceId: item["dataSourceResourceId"],
    scenarios: !item["scenarios"]
      ? item["scenarios"]
      : item["scenarios"].map((p: any) => {
          return p;
        }),
  };
}

export function integrationFabricPropertiesDeserializer(item: any): IntegrationFabricProperties {
  return {
    provisioningState: item["provisioningState"],
    targetResourceId: item["targetResourceId"],
    dataSourceResourceId: item["dataSourceResourceId"],
    scenarios: !item["scenarios"]
      ? item["scenarios"]
      : item["scenarios"].map((p: any) => {
          return p;
        }),
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
    tags: item["tags"],
    location: item["location"],
  };
}

/** The parameters for a PATCH request to a Integration Fabric resource. */
export interface IntegrationFabricUpdateParameters {
  /** The new tags of the Integration Fabric resource. */
  tags?: Record<string, string>;
  /** The new properties of this Integration Fabric resource */
  properties?: IntegrationFabricPropertiesUpdateParameters;
}

export function integrationFabricUpdateParametersSerializer(
  item: IntegrationFabricUpdateParameters,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : integrationFabricPropertiesUpdateParametersSerializer(item["properties"]),
  };
}

/** model interface IntegrationFabricPropertiesUpdateParameters */
export interface IntegrationFabricPropertiesUpdateParameters {
  /** The new integration scenarios covered by this integration fabric. */
  scenarios?: string[];
}

export function integrationFabricPropertiesUpdateParametersSerializer(
  item: IntegrationFabricPropertiesUpdateParameters,
): any {
  return {
    scenarios: !item["scenarios"]
      ? item["scenarios"]
      : item["scenarios"].map((p: any) => {
          return p;
        }),
  };
}

/** Paged collection of IntegrationFabric items */
export interface _IntegrationFabricListResponse {
  /** The IntegrationFabric items on this page */
  value: IntegrationFabric[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _integrationFabricListResponseDeserializer(
  item: any,
): _IntegrationFabricListResponse {
  return {
    value: integrationFabricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function integrationFabricArraySerializer(result: Array<IntegrationFabric>): any[] {
  return result.map((item) => {
    return integrationFabricSerializer(item);
  });
}

export function integrationFabricArrayDeserializer(result: Array<IntegrationFabric>): any[] {
  return result.map((item) => {
    return integrationFabricDeserializer(item);
  });
}

/** The managed dashboard resource type. */
export interface ManagedDashboard extends TrackedResource {
  /** Properties specific to the managed dashboard resource. */
  properties?: ManagedDashboardProperties;
}

export function managedDashboardSerializer(item: ManagedDashboard): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : managedDashboardPropertiesSerializer(item["properties"]),
  };
}

export function managedDashboardDeserializer(item: any): ManagedDashboard {
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
      : managedDashboardPropertiesDeserializer(item["properties"]),
  };
}

/** Properties specific to the grafana resource. */
export interface ManagedDashboardProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function managedDashboardPropertiesSerializer(item: ManagedDashboardProperties): any {
  return item;
}

export function managedDashboardPropertiesDeserializer(item: any): ManagedDashboardProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The parameters for a PATCH request to a managed dashboard resource. */
export interface ManagedDashboardUpdateParameters {
  /** The new tags of the managed dashboard resource. */
  tags?: Record<string, string>;
}

export function managedDashboardUpdateParametersSerializer(
  item: ManagedDashboardUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** Paged collection of ManagedDashboard items */
export interface _ManagedDashboardListResponse {
  /** The ManagedDashboard items on this page */
  value: ManagedDashboard[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedDashboardListResponseDeserializer(
  item: any,
): _ManagedDashboardListResponse {
  return {
    value: managedDashboardArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedDashboardArraySerializer(result: Array<ManagedDashboard>): any[] {
  return result.map((item) => {
    return managedDashboardSerializer(item);
  });
}

export function managedDashboardArrayDeserializer(result: Array<ManagedDashboard>): any[] {
  return result.map((item) => {
    return managedDashboardDeserializer(item);
  });
}

/** The grafana resource type. */
export interface ManagedGrafana extends ProxyResource {
  /** Properties specific to the grafana resource. */
  properties?: ManagedGrafanaProperties;
  /** The Sku of the grafana resource. */
  sku?: ResourceSku;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function managedGrafanaSerializer(item: ManagedGrafana): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : managedGrafanaPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function managedGrafanaDeserializer(item: any): ManagedGrafana {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : managedGrafanaPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties specific to the grafana resource. */
export interface ManagedGrafanaProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The Grafana software version. */
  readonly grafanaVersion?: string;
  /** The endpoint of the Grafana instance. */
  readonly endpoint?: string;
  /** Indicate the state for enable or disable traffic over the public interface. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The zone redundancy setting of the Grafana instance. */
  zoneRedundancy?: ZoneRedundancy;
  /** The api key setting of the Grafana instance. */
  apiKey?: ApiKey;
  /** Whether a Grafana instance uses deterministic outbound IPs. */
  deterministicOutboundIP?: DeterministicOutboundIP;
  /** List of outbound IPs if deterministicOutboundIP is enabled. */
  readonly outboundIPs?: string[];
  /** The private endpoint connections of the Grafana instance. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Scope for dns deterministic name hash calculation. */
  autoGeneratedDomainNameLabelScope?: AutoGeneratedDomainNameLabelScope;
  /** GrafanaIntegrations is a bundled observability experience (e.g. pre-configured data source, tailored Grafana dashboards, alerting defaults) for common monitoring scenarios. */
  grafanaIntegrations?: GrafanaIntegrations;
  /** Enterprise settings of a Grafana instance */
  enterpriseConfigurations?: EnterpriseConfigurations;
  /** Server configurations of a Grafana instance */
  grafanaConfigurations?: GrafanaConfigurations;
  /** Installed plugin list of the Grafana instance. Key is plugin id, value is plugin definition. */
  grafanaPlugins?: Record<string, GrafanaPlugin>;
  /** The major Grafana software version to target. */
  grafanaMajorVersion?: string;
}

export function managedGrafanaPropertiesSerializer(item: ManagedGrafanaProperties): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    zoneRedundancy: item["zoneRedundancy"],
    apiKey: item["apiKey"],
    deterministicOutboundIP: item["deterministicOutboundIP"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    grafanaIntegrations: !item["grafanaIntegrations"]
      ? item["grafanaIntegrations"]
      : grafanaIntegrationsSerializer(item["grafanaIntegrations"]),
    enterpriseConfigurations: !item["enterpriseConfigurations"]
      ? item["enterpriseConfigurations"]
      : enterpriseConfigurationsSerializer(item["enterpriseConfigurations"]),
    grafanaConfigurations: !item["grafanaConfigurations"]
      ? item["grafanaConfigurations"]
      : grafanaConfigurationsSerializer(item["grafanaConfigurations"]),
    grafanaPlugins: !item["grafanaPlugins"]
      ? item["grafanaPlugins"]
      : grafanaPluginRecordSerializer(item["grafanaPlugins"]),
    grafanaMajorVersion: item["grafanaMajorVersion"],
  };
}

export function managedGrafanaPropertiesDeserializer(item: any): ManagedGrafanaProperties {
  return {
    provisioningState: item["provisioningState"],
    grafanaVersion: item["grafanaVersion"],
    endpoint: item["endpoint"],
    publicNetworkAccess: item["publicNetworkAccess"],
    zoneRedundancy: item["zoneRedundancy"],
    apiKey: item["apiKey"],
    deterministicOutboundIP: item["deterministicOutboundIP"],
    outboundIPs: !item["outboundIPs"]
      ? item["outboundIPs"]
      : item["outboundIPs"].map((p: any) => {
          return p;
        }),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    grafanaIntegrations: !item["grafanaIntegrations"]
      ? item["grafanaIntegrations"]
      : grafanaIntegrationsDeserializer(item["grafanaIntegrations"]),
    enterpriseConfigurations: !item["enterpriseConfigurations"]
      ? item["enterpriseConfigurations"]
      : enterpriseConfigurationsDeserializer(item["enterpriseConfigurations"]),
    grafanaConfigurations: !item["grafanaConfigurations"]
      ? item["grafanaConfigurations"]
      : grafanaConfigurationsDeserializer(item["grafanaConfigurations"]),
    grafanaPlugins: !item["grafanaPlugins"]
      ? item["grafanaPlugins"]
      : grafanaPluginRecordDeserializer(item["grafanaPlugins"]),
    grafanaMajorVersion: item["grafanaMajorVersion"],
  };
}

/** Indicate the state for enable or disable traffic over the public interface. */
export enum KnownPublicNetworkAccess {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Indicate the state for enable or disable traffic over the public interface. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** Known values of {@link ZoneRedundancy} that the service accepts. */
export enum KnownZoneRedundancy {
  Disabled = "Disabled",
  Enabled = "Enabled",
}

/** Type of ZoneRedundancy */
export type ZoneRedundancy = string;

/** Known values of {@link ApiKey} that the service accepts. */
export enum KnownApiKey {
  Disabled = "Disabled",
  Enabled = "Enabled",
}

/** Type of ApiKey */
export type ApiKey = string;

/** Known values of {@link DeterministicOutboundIP} that the service accepts. */
export enum KnownDeterministicOutboundIP {
  Disabled = "Disabled",
  Enabled = "Enabled",
}

/** Type of DeterministicOutboundIP */
export type DeterministicOutboundIP = string;

/** Scope for dns deterministic name hash calculation */
export enum KnownAutoGeneratedDomainNameLabelScope {
  TenantReuse = "TenantReuse",
}

/**
 * Scope for dns deterministic name hash calculation \
 * {@link KnownAutoGeneratedDomainNameLabelScope} can be used interchangeably with AutoGeneratedDomainNameLabelScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TenantReuse**
 */
export type AutoGeneratedDomainNameLabelScope = string;

/** GrafanaIntegrations is a bundled observability experience (e.g. pre-configured data source, tailored Grafana dashboards, alerting defaults) for common monitoring scenarios. */
export interface GrafanaIntegrations {
  azureMonitorWorkspaceIntegrations?: AzureMonitorWorkspaceIntegration[];
}

export function grafanaIntegrationsSerializer(item: GrafanaIntegrations): any {
  return {
    azureMonitorWorkspaceIntegrations: !item["azureMonitorWorkspaceIntegrations"]
      ? item["azureMonitorWorkspaceIntegrations"]
      : azureMonitorWorkspaceIntegrationArraySerializer(item["azureMonitorWorkspaceIntegrations"]),
  };
}

export function grafanaIntegrationsDeserializer(item: any): GrafanaIntegrations {
  return {
    azureMonitorWorkspaceIntegrations: !item["azureMonitorWorkspaceIntegrations"]
      ? item["azureMonitorWorkspaceIntegrations"]
      : azureMonitorWorkspaceIntegrationArrayDeserializer(
          item["azureMonitorWorkspaceIntegrations"],
        ),
  };
}

export function azureMonitorWorkspaceIntegrationArraySerializer(
  result: Array<AzureMonitorWorkspaceIntegration>,
): any[] {
  return result.map((item) => {
    return azureMonitorWorkspaceIntegrationSerializer(item);
  });
}

export function azureMonitorWorkspaceIntegrationArrayDeserializer(
  result: Array<AzureMonitorWorkspaceIntegration>,
): any[] {
  return result.map((item) => {
    return azureMonitorWorkspaceIntegrationDeserializer(item);
  });
}

/** Integrations for Azure Monitor Workspace. */
export interface AzureMonitorWorkspaceIntegration {
  /** The resource Id of the connected Azure Monitor Workspace. */
  azureMonitorWorkspaceResourceId?: string;
}

export function azureMonitorWorkspaceIntegrationSerializer(
  item: AzureMonitorWorkspaceIntegration,
): any {
  return {
    azureMonitorWorkspaceResourceId: item["azureMonitorWorkspaceResourceId"],
  };
}

export function azureMonitorWorkspaceIntegrationDeserializer(
  item: any,
): AzureMonitorWorkspaceIntegration {
  return {
    azureMonitorWorkspaceResourceId: item["azureMonitorWorkspaceResourceId"],
  };
}

/** Enterprise settings of a Grafana instance */
export interface EnterpriseConfigurations {
  /** The Plan Id of the Azure Marketplace subscription for the Enterprise plugins */
  marketplacePlanId?: string;
  /** The AutoRenew setting of the Enterprise subscription */
  marketplaceAutoRenew?: MarketplaceAutoRenew;
}

export function enterpriseConfigurationsSerializer(item: EnterpriseConfigurations): any {
  return {
    marketplacePlanId: item["marketplacePlanId"],
    marketplaceAutoRenew: item["marketplaceAutoRenew"],
  };
}

export function enterpriseConfigurationsDeserializer(item: any): EnterpriseConfigurations {
  return {
    marketplacePlanId: item["marketplacePlanId"],
    marketplaceAutoRenew: item["marketplaceAutoRenew"],
  };
}

/** The AutoRenew setting of the Enterprise subscription */
export enum KnownMarketplaceAutoRenew {
  Disabled = "Disabled",
  Enabled = "Enabled",
}

/**
 * The AutoRenew setting of the Enterprise subscription \
 * {@link KnownMarketplaceAutoRenew} can be used interchangeably with MarketplaceAutoRenew,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type MarketplaceAutoRenew = string;

/** Server configurations of a Grafana instance */
export interface GrafanaConfigurations {
  /**
   * Email server settings.
   * https://grafana.com/docs/grafana/v9.0/setup-grafana/configure-grafana/#smtp
   */
  smtp?: Smtp;
  /** Grafana Snapshots settings */
  snapshots?: Snapshots;
  /** Grafana users settings */
  users?: Users;
  /** Grafana security settings */
  security?: Security;
  /** Grafana Unified Alerting Screenshots settings */
  unifiedAlertingScreenshots?: UnifiedAlertingScreenshots;
}

export function grafanaConfigurationsSerializer(item: GrafanaConfigurations): any {
  return {
    smtp: !item["smtp"] ? item["smtp"] : smtpSerializer(item["smtp"]),
    snapshots: !item["snapshots"] ? item["snapshots"] : snapshotsSerializer(item["snapshots"]),
    users: !item["users"] ? item["users"] : usersSerializer(item["users"]),
    security: !item["security"] ? item["security"] : securitySerializer(item["security"]),
    unifiedAlertingScreenshots: !item["unifiedAlertingScreenshots"]
      ? item["unifiedAlertingScreenshots"]
      : unifiedAlertingScreenshotsSerializer(item["unifiedAlertingScreenshots"]),
  };
}

export function grafanaConfigurationsDeserializer(item: any): GrafanaConfigurations {
  return {
    smtp: !item["smtp"] ? item["smtp"] : smtpDeserializer(item["smtp"]),
    snapshots: !item["snapshots"] ? item["snapshots"] : snapshotsDeserializer(item["snapshots"]),
    users: !item["users"] ? item["users"] : usersDeserializer(item["users"]),
    security: !item["security"] ? item["security"] : securityDeserializer(item["security"]),
    unifiedAlertingScreenshots: !item["unifiedAlertingScreenshots"]
      ? item["unifiedAlertingScreenshots"]
      : unifiedAlertingScreenshotsDeserializer(item["unifiedAlertingScreenshots"]),
  };
}

/**
 * Email server settings.
 * https://grafana.com/docs/grafana/v9.0/setup-grafana/configure-grafana/#smtp
 */
export interface Smtp {
  /** Enable this to allow Grafana to send email. Default is false */
  enabled?: boolean;
  /** SMTP server hostname with port, e.g. test.email.net:587 */
  host?: string;
  /** User of SMTP auth */
  user?: string;
  /** Password of SMTP auth. If the password contains # or ;, then you have to wrap it with triple quotes */
  password?: string;
  /**
   * Address used when sending out emails
   * https://pkg.go.dev/net/mail#Address
   */
  fromAddress?: string;
  /**
   * Name to be used when sending out emails. Default is "Azure Managed Grafana Notification"
   * https://pkg.go.dev/net/mail#Address
   */
  fromName?: string;
  /**
   * The StartTLSPolicy setting of the SMTP configuration
   * https://pkg.go.dev/github.com/go-mail/mail#StartTLSPolicy
   */
  startTLSPolicy?: StartTLSPolicy;
  /**
   * Verify SSL for SMTP server. Default is false
   * https://pkg.go.dev/crypto/tls#Config
   */
  skipVerify?: boolean;
}

export function smtpSerializer(item: Smtp): any {
  return {
    enabled: item["enabled"],
    host: item["host"],
    user: item["user"],
    password: item["password"],
    fromAddress: item["fromAddress"],
    fromName: item["fromName"],
    startTLSPolicy: item["startTLSPolicy"],
    skipVerify: item["skipVerify"],
  };
}

export function smtpDeserializer(item: any): Smtp {
  return {
    enabled: item["enabled"],
    host: item["host"],
    user: item["user"],
    password: item["password"],
    fromAddress: item["fromAddress"],
    fromName: item["fromName"],
    startTLSPolicy: item["startTLSPolicy"],
    skipVerify: item["skipVerify"],
  };
}

/**
 * The StartTLSPolicy setting of the SMTP configuration
 * https://pkg.go.dev/github.com/go-mail/mail#StartTLSPolicy
 */
export enum KnownStartTLSPolicy {
  OpportunisticStartTLS = "OpportunisticStartTLS",
  MandatoryStartTLS = "MandatoryStartTLS",
  NoStartTLS = "NoStartTLS",
}

/**
 * The StartTLSPolicy setting of the SMTP configuration
 * https://pkg.go.dev/github.com/go-mail/mail#StartTLSPolicy \
 * {@link KnownStartTLSPolicy} can be used interchangeably with StartTLSPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OpportunisticStartTLS** \
 * **MandatoryStartTLS** \
 * **NoStartTLS**
 */
export type StartTLSPolicy = string;

/** Grafana Snapshots settings */
export interface Snapshots {
  /** Set to false to disable external snapshot publish endpoint */
  externalEnabled?: boolean;
}

export function snapshotsSerializer(item: Snapshots): any {
  return { externalEnabled: item["externalEnabled"] };
}

export function snapshotsDeserializer(item: any): Snapshots {
  return {
    externalEnabled: item["externalEnabled"],
  };
}

/** Grafana users settings */
export interface Users {
  /** Set to true so viewers can access and use explore and perform temporary edits on panels in dashboards they have access to. They cannot save their changes. */
  viewersCanEdit?: boolean;
  /** Set to true so editors can administrate dashboards, folders and teams they create. */
  editorsCanAdmin?: boolean;
}

export function usersSerializer(item: Users): any {
  return {
    viewersCanEdit: item["viewersCanEdit"],
    editorsCanAdmin: item["editorsCanAdmin"],
  };
}

export function usersDeserializer(item: any): Users {
  return {
    viewersCanEdit: item["viewersCanEdit"],
    editorsCanAdmin: item["editorsCanAdmin"],
  };
}

/** Grafana security settings */
export interface Security {
  /** Set to true to execute the CSRF check even if the login cookie is not in a request (default false). */
  csrfAlwaysCheck?: boolean;
}

export function securitySerializer(item: Security): any {
  return { csrfAlwaysCheck: item["csrfAlwaysCheck"] };
}

export function securityDeserializer(item: any): Security {
  return {
    csrfAlwaysCheck: item["csrfAlwaysCheck"],
  };
}

/** Grafana Unified Alerting Screenshots settings */
export interface UnifiedAlertingScreenshots {
  /** Set to false to disable capture screenshot in Unified Alert due to performance issue. */
  captureEnabled?: boolean;
}

export function unifiedAlertingScreenshotsSerializer(item: UnifiedAlertingScreenshots): any {
  return { captureEnabled: item["captureEnabled"] };
}

export function unifiedAlertingScreenshotsDeserializer(item: any): UnifiedAlertingScreenshots {
  return {
    captureEnabled: item["captureEnabled"],
  };
}

export function grafanaPluginRecordSerializer(
  item: Record<string, GrafanaPlugin>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : grafanaPluginSerializer(item[key]);
  });
  return result;
}

export function grafanaPluginRecordDeserializer(
  item: Record<string, any>,
): Record<string, GrafanaPlugin> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : grafanaPluginDeserializer(item[key]);
  });
  return result;
}

/** Plugin of Grafana */
export interface GrafanaPlugin {
  /** Grafana plugin id */
  readonly pluginId?: string;
}

export function grafanaPluginSerializer(item: GrafanaPlugin): any {
  return item;
}

export function grafanaPluginDeserializer(item: any): GrafanaPlugin {
  return {
    pluginId: item["pluginId"],
  };
}

/** Represents the SKU of a resource. */
export interface ResourceSku {
  /** The name of the SKU. */
  name: string;
}

export function resourceSkuSerializer(item: ResourceSku): any {
  return { name: item["name"] };
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    name: item["name"],
  };
}

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
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
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

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

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

/** The parameters for a PATCH request to a grafana resource. */
export interface ManagedGrafanaUpdateParameters {
  sku?: ResourceSku;
  /** The managed identity of the grafana resource. */
  identity?: ManagedServiceIdentity;
  /** The new tags of the grafana resource. */
  tags?: Record<string, string>;
  /** Properties specific to the managed grafana resource. */
  properties?: ManagedGrafanaPropertiesUpdateParameters;
}

export function managedGrafanaUpdateParametersSerializer(
  item: ManagedGrafanaUpdateParameters,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : managedGrafanaPropertiesUpdateParametersSerializer(item["properties"]),
  };
}

/** The properties parameters for a PATCH request to a grafana resource. */
export interface ManagedGrafanaPropertiesUpdateParameters {
  /** The zone redundancy setting of the Grafana instance. */
  zoneRedundancy?: ZoneRedundancy;
  /** The api key setting of the Grafana instance. */
  apiKey?: ApiKey;
  /** Whether a Grafana instance uses deterministic outbound IPs. */
  deterministicOutboundIP?: DeterministicOutboundIP;
  /** Indicate the state for enable or disable traffic over the public interface. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** GrafanaIntegrations is a bundled observability experience (e.g. pre-configured data source, tailored Grafana dashboards, alerting defaults) for common monitoring scenarios. */
  grafanaIntegrations?: GrafanaIntegrations;
  /** Enterprise settings of a Grafana instance */
  enterpriseConfigurations?: EnterpriseConfigurations;
  /** Server configurations of a Grafana instance */
  grafanaConfigurations?: GrafanaConfigurations;
  /** Update of Grafana plugin. Key is plugin id, value is plugin definition. If plugin definition is null, plugin with given plugin id will be removed. Otherwise, given plugin will be installed. */
  grafanaPlugins?: Record<string, GrafanaPlugin>;
  /** The major Grafana software version to target. */
  grafanaMajorVersion?: string;
}

export function managedGrafanaPropertiesUpdateParametersSerializer(
  item: ManagedGrafanaPropertiesUpdateParameters,
): any {
  return {
    zoneRedundancy: item["zoneRedundancy"],
    apiKey: item["apiKey"],
    deterministicOutboundIP: item["deterministicOutboundIP"],
    publicNetworkAccess: item["publicNetworkAccess"],
    grafanaIntegrations: !item["grafanaIntegrations"]
      ? item["grafanaIntegrations"]
      : grafanaIntegrationsSerializer(item["grafanaIntegrations"]),
    enterpriseConfigurations: !item["enterpriseConfigurations"]
      ? item["enterpriseConfigurations"]
      : enterpriseConfigurationsSerializer(item["enterpriseConfigurations"]),
    grafanaConfigurations: !item["grafanaConfigurations"]
      ? item["grafanaConfigurations"]
      : grafanaConfigurationsSerializer(item["grafanaConfigurations"]),
    grafanaPlugins: !item["grafanaPlugins"]
      ? item["grafanaPlugins"]
      : grafanaPluginRecordSerializer(item["grafanaPlugins"]),
    grafanaMajorVersion: item["grafanaMajorVersion"],
  };
}

/** Paged collection of ManagedGrafana items */
export interface _ManagedGrafanaListResponse {
  /** The ManagedGrafana items on this page */
  value: ManagedGrafana[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedGrafanaListResponseDeserializer(item: any): _ManagedGrafanaListResponse {
  return {
    value: managedGrafanaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedGrafanaArraySerializer(result: Array<ManagedGrafana>): any[] {
  return result.map((item) => {
    return managedGrafanaSerializer(item);
  });
}

export function managedGrafanaArrayDeserializer(result: Array<ManagedGrafana>): any[] {
  return result.map((item) => {
    return managedGrafanaDeserializer(item);
  });
}

/** Enterprise details of a Grafana instance */
export interface EnterpriseDetails {
  /** SaaS subscription details of a Grafana instance */
  saasSubscriptionDetails?: SaasSubscriptionDetails;
  /** The allocation details of the per subscription free trial slot of the subscription. */
  marketplaceTrialQuota?: MarketplaceTrialQuota;
}

export function enterpriseDetailsDeserializer(item: any): EnterpriseDetails {
  return {
    saasSubscriptionDetails: !item["saasSubscriptionDetails"]
      ? item["saasSubscriptionDetails"]
      : saasSubscriptionDetailsDeserializer(item["saasSubscriptionDetails"]),
    marketplaceTrialQuota: !item["marketplaceTrialQuota"]
      ? item["marketplaceTrialQuota"]
      : marketplaceTrialQuotaDeserializer(item["marketplaceTrialQuota"]),
  };
}

/** SaaS subscription details of a Grafana instance */
export interface SaasSubscriptionDetails {
  /** The plan Id of the SaaS subscription. */
  planId?: string;
  /** The offer Id of the SaaS subscription. */
  offerId?: string;
  /** The publisher Id of the SaaS subscription. */
  publisherId?: string;
  /** The billing term of the SaaS Subscription. */
  term?: SubscriptionTerm;
}

export function saasSubscriptionDetailsDeserializer(item: any): SaasSubscriptionDetails {
  return {
    planId: item["planId"],
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    term: !item["term"] ? item["term"] : subscriptionTermDeserializer(item["term"]),
  };
}

/** The current billing term of the SaaS Subscription. */
export interface SubscriptionTerm {
  /** The unit of the billing term. */
  termUnit?: string;
  /** The date and time in UTC of when the billing term starts. */
  startDate?: Date;
  /** The date and time in UTC of when the billing term ends. */
  endDate?: Date;
}

export function subscriptionTermDeserializer(item: any): SubscriptionTerm {
  return {
    termUnit: item["termUnit"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
  };
}

/** The allocation details of the per subscription free trial slot of the subscription. */
export interface MarketplaceTrialQuota {
  /** Available enterprise promotion for the subscription */
  availablePromotion?: AvailablePromotion;
  /** Resource Id of the Grafana resource which is doing the trial. */
  grafanaResourceId?: string;
  /** The date and time in UTC of when the trial starts. */
  trialStartAt?: Date;
  /** The date and time in UTC of when the trial ends. */
  trialEndAt?: Date;
}

export function marketplaceTrialQuotaDeserializer(item: any): MarketplaceTrialQuota {
  return {
    availablePromotion: item["availablePromotion"],
    grafanaResourceId: item["grafanaResourceId"],
    trialStartAt: !item["trialStartAt"] ? item["trialStartAt"] : new Date(item["trialStartAt"]),
    trialEndAt: !item["trialEndAt"] ? item["trialEndAt"] : new Date(item["trialEndAt"]),
  };
}

/** Known values of {@link AvailablePromotion} that the service accepts. */
export enum KnownAvailablePromotion {
  None = "None",
  FreeTrial = "FreeTrial",
}

/** Type of AvailablePromotion */
export type AvailablePromotion = string;

/** model interface GrafanaAvailablePluginListResponse */
export interface GrafanaAvailablePluginListResponse {
  value?: GrafanaAvailablePlugin[];
  nextLink?: string;
}

export function grafanaAvailablePluginListResponseDeserializer(
  item: any,
): GrafanaAvailablePluginListResponse {
  return {
    value: !item["value"] ? item["value"] : grafanaAvailablePluginArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function grafanaAvailablePluginArrayDeserializer(
  result: Array<GrafanaAvailablePlugin>,
): any[] {
  return result.map((item) => {
    return grafanaAvailablePluginDeserializer(item);
  });
}

/** Available plugins of grafana */
export interface GrafanaAvailablePlugin {
  /** Grafana plugin id */
  readonly pluginId?: string;
  /** Grafana plugin display name */
  readonly name?: string;
}

export function grafanaAvailablePluginDeserializer(item: any): GrafanaAvailablePlugin {
  return {
    pluginId: item["pluginId"],
    name: item["name"],
  };
}

/** The managed private endpoint resource type. */
export interface ManagedPrivateEndpointModel extends TrackedResource {
  /** Resource properties. */
  properties?: ManagedPrivateEndpointModelProperties;
}

export function managedPrivateEndpointModelSerializer(item: ManagedPrivateEndpointModel): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : managedPrivateEndpointModelPropertiesSerializer(item["properties"]),
  };
}

export function managedPrivateEndpointModelDeserializer(item: any): ManagedPrivateEndpointModel {
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
      : managedPrivateEndpointModelPropertiesDeserializer(item["properties"]),
  };
}

/** Properties specific to the managed private endpoint. */
export interface ManagedPrivateEndpointModelProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The ARM resource ID of the resource for which the managed private endpoint is pointing to. */
  privateLinkResourceId?: string;
  /** The region of the resource to which the managed private endpoint is pointing to. */
  privateLinkResourceRegion?: string;
  /** The group Ids of the managed private endpoint. */
  groupIds?: string[];
  /** User input request message of the managed private endpoint. */
  requestMessage?: string;
  /** The state of managed private endpoint connection. */
  readonly connectionState?: ManagedPrivateEndpointConnectionState;
  /** The URL of the data store behind the private link service. It would be the URL in the Grafana data source configuration page without the protocol and port. */
  privateLinkServiceUrl?: string;
  /** The private IP of private endpoint after approval. This property is empty before connection is approved. */
  readonly privateLinkServicePrivateIP?: string;
}

export function managedPrivateEndpointModelPropertiesSerializer(
  item: ManagedPrivateEndpointModelProperties,
): any {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkResourceRegion: item["privateLinkResourceRegion"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
    privateLinkServiceUrl: item["privateLinkServiceUrl"],
  };
}

export function managedPrivateEndpointModelPropertiesDeserializer(
  item: any,
): ManagedPrivateEndpointModelProperties {
  return {
    provisioningState: item["provisioningState"],
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkResourceRegion: item["privateLinkResourceRegion"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
    connectionState: !item["connectionState"]
      ? item["connectionState"]
      : managedPrivateEndpointConnectionStateDeserializer(item["connectionState"]),
    privateLinkServiceUrl: item["privateLinkServiceUrl"],
    privateLinkServicePrivateIP: item["privateLinkServicePrivateIP"],
  };
}

/** The state of managed private endpoint connection. */
export interface ManagedPrivateEndpointConnectionState {
  /** The approval/rejection status of managed private endpoint connection. */
  readonly status?: ManagedPrivateEndpointConnectionStatus;
  /** Gets or sets the reason for approval/rejection of the connection. */
  readonly description?: string;
}

export function managedPrivateEndpointConnectionStateDeserializer(
  item: any,
): ManagedPrivateEndpointConnectionState {
  return {
    status: item["status"],
    description: item["description"],
  };
}

/** The approval/rejection status of managed private endpoint connection. */
export enum KnownManagedPrivateEndpointConnectionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Disconnected = "Disconnected",
}

/**
 * The approval/rejection status of managed private endpoint connection. \
 * {@link KnownManagedPrivateEndpointConnectionStatus} can be used interchangeably with ManagedPrivateEndpointConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type ManagedPrivateEndpointConnectionStatus = string;

/** The parameters for a PATCH request to a managed private endpoint. */
export interface ManagedPrivateEndpointUpdateParameters {
  /** The new tags of the managed private endpoint. */
  tags?: Record<string, string>;
}

export function managedPrivateEndpointUpdateParametersSerializer(
  item: ManagedPrivateEndpointUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** The list of managed private endpoints of a grafana resource */
export interface _ManagedPrivateEndpointModelListResponse {
  /** The ManagedPrivateEndpointModel items on this page */
  value: ManagedPrivateEndpointModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedPrivateEndpointModelListResponseDeserializer(
  item: any,
): _ManagedPrivateEndpointModelListResponse {
  return {
    value: managedPrivateEndpointModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedPrivateEndpointModelArraySerializer(
  result: Array<ManagedPrivateEndpointModel>,
): any[] {
  return result.map((item) => {
    return managedPrivateEndpointModelSerializer(item);
  });
}

export function managedPrivateEndpointModelArrayDeserializer(
  result: Array<ManagedPrivateEndpointModel>,
): any[] {
  return result.map((item) => {
    return managedPrivateEndpointModelDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01-preview API version. */
  V20241101Preview = "2024-11-01-preview",
}
