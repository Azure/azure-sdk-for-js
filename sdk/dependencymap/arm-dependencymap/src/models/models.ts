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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
}

/** A Maps resource */
export interface MapsResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: MapsResourceProperties;
}

export function mapsResourceSerializer(item: MapsResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : mapsResourcePropertiesSerializer(item["properties"]),
  };
}

export function mapsResourceDeserializer(item: any): MapsResource {
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
      : mapsResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Maps resource */
export interface MapsResourceProperties {
  /** Provisioning state of Maps resource. */
  readonly provisioningState?: ProvisioningState;
}

export function mapsResourcePropertiesSerializer(item: MapsResourceProperties): any {
  return item;
}

export function mapsResourcePropertiesDeserializer(item: any): MapsResourceProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the resource */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** This state indicates that the resource is being provisioned. */
  Provisioning = "Provisioning",
  /** This state indicates that the resource is being updated. */
  Updating = "Updating",
  /** This state indicates that the resource is being deleted. */
  Deleting = "Deleting",
  /** This state indicates that the operation on the resource has been accepted. */
  Accepted = "Accepted",
}

/**
 * Provisioning state of the resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: This state indicates that the resource is being provisioned. \
 * **Updating**: This state indicates that the resource is being updated. \
 * **Deleting**: This state indicates that the resource is being deleted. \
 * **Accepted**: This state indicates that the operation on the resource has been accepted.
 */
export type ProvisioningState = string;

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

/** The type used for updating tags in MapsResource resources. */
export interface MapsResourceTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function mapsResourceTagsUpdateSerializer(item: MapsResourceTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a MapsResource list operation. */
export interface _MapsResourceListResult {
  /** The MapsResource items on this page */
  value: MapsResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _mapsResourceListResultDeserializer(item: any): _MapsResourceListResult {
  return {
    value: mapsResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mapsResourceArraySerializer(result: Array<MapsResource>): any[] {
  return result.map((item) => {
    return mapsResourceSerializer(item);
  });
}

export function mapsResourceArrayDeserializer(result: Array<MapsResource>): any[] {
  return result.map((item) => {
    return mapsResourceDeserializer(item);
  });
}

/** GetDependencyViewForFocusedMachine request model */
export interface GetDependencyViewForFocusedMachineRequest {
  /** Machine arm id */
  focusedMachineId: string;
  /** Filters for GetSingleMachineDependencyView */
  filters?: DependencyMapVisualizationFilter;
}

export function getDependencyViewForFocusedMachineRequestSerializer(
  item: GetDependencyViewForFocusedMachineRequest,
): any {
  return {
    focusedMachineId: item["focusedMachineId"],
    filters: !item["filters"]
      ? item["filters"]
      : dependencyMapVisualizationFilterSerializer(item["filters"]),
  };
}

/** Filters for dependency map visualization apis */
export interface DependencyMapVisualizationFilter {
  /** DateTime filter */
  dateTime?: DateTimeFilter;
  /** Process name filter */
  processNameFilter?: ProcessNameFilter;
}

export function dependencyMapVisualizationFilterSerializer(
  item: DependencyMapVisualizationFilter,
): any {
  return {
    dateTime: !item["dateTime"] ? item["dateTime"] : dateTimeFilterSerializer(item["dateTime"]),
    processNameFilter: !item["processNameFilter"]
      ? item["processNameFilter"]
      : processNameFilterSerializer(item["processNameFilter"]),
  };
}

/** UTC DateTime filter for dependency map visualization apis */
export interface DateTimeFilter {
  /** Start date time for dependency map visualization query */
  startDateTimeUtc?: Date;
  /** End date time for dependency map visualization query */
  endDateTimeUtc?: Date;
}

export function dateTimeFilterSerializer(item: DateTimeFilter): any {
  return {
    startDateTimeUtc: !item["startDateTimeUtc"]
      ? item["startDateTimeUtc"]
      : item["startDateTimeUtc"].toISOString(),
    endDateTimeUtc: !item["endDateTimeUtc"]
      ? item["endDateTimeUtc"]
      : item["endDateTimeUtc"].toISOString(),
  };
}

/** Process name filter for dependency map visualization apis */
export interface ProcessNameFilter {
  /** Operator for process name filter */
  operator: ProcessNameFilterOperator;
  /** List of process names on which the operator should be applied */
  processNames: string[];
}

export function processNameFilterSerializer(item: ProcessNameFilter): any {
  return {
    operator: item["operator"],
    processNames: item["processNames"].map((p: any) => {
      return p;
    }),
  };
}

/** Operator enum for process name filter */
export enum KnownProcessNameFilterOperator {
  /** Operator to include items in the result */
  Contains = "contains",
  /** Operator to exclude items in the result */
  NotContains = "notContains",
}

/**
 * Operator enum for process name filter \
 * {@link KnownProcessNameFilterOperator} can be used interchangeably with ProcessNameFilterOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **contains**: Operator to include items in the result \
 * **notContains**: Operator to exclude items in the result
 */
export type ProcessNameFilterOperator = string;

/** GetConnectionsWithConnectedMachineForFocusedMachine request model */
export interface GetConnectionsWithConnectedMachineForFocusedMachineRequest {
  /** Source machine arm id */
  focusedMachineId: string;
  /** Destination machine arm id */
  connectedMachineId: string;
  /** Filters for GetNetworkConnectionsBetweenMachines */
  filters?: DependencyMapVisualizationFilter;
}

export function getConnectionsWithConnectedMachineForFocusedMachineRequestSerializer(
  item: GetConnectionsWithConnectedMachineForFocusedMachineRequest,
): any {
  return {
    focusedMachineId: item["focusedMachineId"],
    connectedMachineId: item["connectedMachineId"],
    filters: !item["filters"]
      ? item["filters"]
      : dependencyMapVisualizationFilterSerializer(item["filters"]),
  };
}

/** GetConnectionsForProcessOnFocusedMachine request model */
export interface GetConnectionsForProcessOnFocusedMachineRequest {
  /** Machine arm id */
  focusedMachineId: string;
  /** Process id */
  processIdOnFocusedMachine: string;
  /** Filters for GetProcessNetworkConnections */
  filters?: DependencyMapVisualizationFilter;
}

export function getConnectionsForProcessOnFocusedMachineRequestSerializer(
  item: GetConnectionsForProcessOnFocusedMachineRequest,
): any {
  return {
    focusedMachineId: item["focusedMachineId"],
    processIdOnFocusedMachine: item["processIdOnFocusedMachine"],
    filters: !item["filters"]
      ? item["filters"]
      : dependencyMapVisualizationFilterSerializer(item["filters"]),
  };
}

/** ExportDependencies request model */
export interface ExportDependenciesRequest {
  /** Machine arm id */
  focusedMachineId: string;
  /** Filters for ExportDependencies */
  filters?: DependencyMapVisualizationFilter;
}

export function exportDependenciesRequestSerializer(item: ExportDependenciesRequest): any {
  return {
    focusedMachineId: item["focusedMachineId"],
    filters: !item["filters"]
      ? item["filters"]
      : dependencyMapVisualizationFilterSerializer(item["filters"]),
  };
}

/** A Discovery Source resource */
export interface DiscoverySourceResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DiscoverySourceResourcePropertiesUnion;
}

export function discoverySourceResourceSerializer(item: DiscoverySourceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : discoverySourceResourcePropertiesUnionSerializer(item["properties"]),
  };
}

export function discoverySourceResourceDeserializer(item: any): DiscoverySourceResource {
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
      : discoverySourceResourcePropertiesUnionDeserializer(item["properties"]),
  };
}

/** The properties of Discovery Source resource */
export interface DiscoverySourceResourceProperties {
  /** Provisioning state of Discovery Source resource. */
  readonly provisioningState?: ProvisioningState;
  /** Source type of Discovery Source resource. */
  /** The discriminator possible values: OffAzure */
  sourceType: SourceType;
  /** Source ArmId of Discovery Source resource */
  sourceId: string;
}

export function discoverySourceResourcePropertiesSerializer(
  item: DiscoverySourceResourceProperties,
): any {
  return { sourceType: item["sourceType"], sourceId: item["sourceId"] };
}

export function discoverySourceResourcePropertiesDeserializer(
  item: any,
): DiscoverySourceResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    sourceType: item["sourceType"],
    sourceId: item["sourceId"],
  };
}

/** Alias for DiscoverySourceResourcePropertiesUnion */
export type DiscoverySourceResourcePropertiesUnion =
  | OffAzureDiscoverySourceResourceProperties
  | DiscoverySourceResourceProperties;

export function discoverySourceResourcePropertiesUnionSerializer(
  item: DiscoverySourceResourcePropertiesUnion,
): any {
  switch (item.sourceType) {
    case "OffAzure":
      return offAzureDiscoverySourceResourcePropertiesSerializer(
        item as OffAzureDiscoverySourceResourceProperties,
      );

    default:
      return discoverySourceResourcePropertiesSerializer(item);
  }
}

export function discoverySourceResourcePropertiesUnionDeserializer(
  item: any,
): DiscoverySourceResourcePropertiesUnion {
  switch (item.sourceType) {
    case "OffAzure":
      return offAzureDiscoverySourceResourcePropertiesDeserializer(
        item as OffAzureDiscoverySourceResourceProperties,
      );

    default:
      return discoverySourceResourcePropertiesDeserializer(item);
  }
}

/** Source type of the discoverySource */
export enum KnownSourceType {
  /** OffAzure source type */
  OffAzure = "OffAzure",
}

/**
 * Source type of the discoverySource \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OffAzure**: OffAzure source type
 */
export type SourceType = string;

/** OffAzure discovery source resource properties */
export interface OffAzureDiscoverySourceResourceProperties
  extends DiscoverySourceResourceProperties {
  /** OffAzure discovery source type */
  sourceType: "OffAzure";
}

export function offAzureDiscoverySourceResourcePropertiesSerializer(
  item: OffAzureDiscoverySourceResourceProperties,
): any {
  return { sourceType: item["sourceType"], sourceId: item["sourceId"] };
}

export function offAzureDiscoverySourceResourcePropertiesDeserializer(
  item: any,
): OffAzureDiscoverySourceResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    sourceType: item["sourceType"],
    sourceId: item["sourceId"],
  };
}

/** The type used for updating tags in DiscoverySourceResource resources. */
export interface DiscoverySourceResourceTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function discoverySourceResourceTagsUpdateSerializer(
  item: DiscoverySourceResourceTagsUpdate,
): any {
  return { tags: item["tags"] };
}

/** The response of a DiscoverySourceResource list operation. */
export interface _DiscoverySourceResourceListResult {
  /** The DiscoverySourceResource items on this page */
  value: DiscoverySourceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _discoverySourceResourceListResultDeserializer(
  item: any,
): _DiscoverySourceResourceListResult {
  return {
    value: discoverySourceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function discoverySourceResourceArraySerializer(
  result: Array<DiscoverySourceResource>,
): any[] {
  return result.map((item) => {
    return discoverySourceResourceSerializer(item);
  });
}

export function discoverySourceResourceArrayDeserializer(
  result: Array<DiscoverySourceResource>,
): any[] {
  return result.map((item) => {
    return discoverySourceResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** 2025-01-31-preview version */
  V20250131Preview = "2025-01-31-preview",
}
