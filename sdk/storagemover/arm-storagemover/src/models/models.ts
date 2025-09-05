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

/** The Storage Mover resource, which is a container for a group of Agents, Projects, and Endpoints. */
export interface StorageMover extends TrackedResource {
  /** The resource specific properties for the Storage Mover resource. */
  properties?: StorageMoverProperties;
}

export function storageMoverSerializer(item: StorageMover): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageMoverPropertiesSerializer(item["properties"]),
  };
}

export function storageMoverDeserializer(item: any): StorageMover {
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
      : storageMoverPropertiesDeserializer(item["properties"]),
  };
}

/** The resource specific properties for the Storage Mover resource. */
export interface StorageMoverProperties {
  /** A description for the Storage Mover. */
  description?: string;
  /** The provisioning state of this resource. */
  readonly provisioningState?: ProvisioningState;
}

export function storageMoverPropertiesSerializer(item: StorageMoverProperties): any {
  return { description: item["description"] };
}

export function storageMoverPropertiesDeserializer(item: any): StorageMoverProperties {
  return {
    description: item["description"],
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning state of a resource. */
export enum KnownProvisioningState {
  Succeeded = "Succeeded",
  Canceled = "Canceled",
  Failed = "Failed",
  Deleting = "Deleting",
}

/**
 * The provisioning state of a resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Canceled** \
 * **Failed** \
 * **Deleting**
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

/** The Storage Mover resource. */
export interface StorageMoverUpdateParameters {
  /** The resource specific properties for the Storage Mover resource. */
  properties?: StorageMoverUpdateProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function storageMoverUpdateParametersSerializer(item: StorageMoverUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : storageMoverUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** The resource specific properties for the Storage Mover resource. */
export interface StorageMoverUpdateProperties {
  /** A description for the Storage Mover. */
  description?: string;
}

export function storageMoverUpdatePropertiesSerializer(item: StorageMoverUpdateProperties): any {
  return { description: item["description"] };
}

/** List of Storage Movers. */
export interface _StorageMoverList {
  /** The StorageMover items on this page */
  readonly value: StorageMover[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageMoverListDeserializer(item: any): _StorageMoverList {
  return {
    value: storageMoverArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageMoverArraySerializer(result: Array<StorageMover>): any[] {
  return result.map((item) => {
    return storageMoverSerializer(item);
  });
}

export function storageMoverArrayDeserializer(result: Array<StorageMover>): any[] {
  return result.map((item) => {
    return storageMoverDeserializer(item);
  });
}

/** The Agent resource. */
export interface Agent extends ProxyResource {
  properties: AgentProperties;
}

export function agentSerializer(item: Agent): any {
  return { properties: agentPropertiesSerializer(item["properties"]) };
}

export function agentDeserializer(item: any): Agent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: agentPropertiesDeserializer(item["properties"]),
  };
}

/** model interface AgentProperties */
export interface AgentProperties {
  /** A description for the Agent. */
  description?: string;
  /** The Agent version. */
  readonly agentVersion?: string;
  /** The fully qualified resource ID of the Hybrid Compute resource for the Agent. */
  arcResourceId: string;
  /** The VM UUID of the Hybrid Compute resource for the Agent. */
  arcVmUuid: string;
  /** The Agent status. */
  readonly agentStatus?: AgentStatus;
  /** The last updated time of the Agent status. */
  readonly lastStatusUpdate?: Date;
  /** Local IP address reported by the Agent. */
  readonly localIPAddress?: string;
  /** Available memory reported by the Agent, in MB. */
  readonly memoryInMB?: number;
  /** Available compute cores reported by the Agent. */
  readonly numberOfCores?: number;
  /** Uptime of the Agent in seconds. */
  readonly uptimeInSeconds?: number;
  /** The agent's local time zone represented in Windows format. */
  readonly timeZone?: string;
  /** The WAN-link upload limit schedule that applies to any Job Run the agent executes. Data plane operations (migrating files) are affected. Control plane operations ensure seamless migration functionality and are not limited by this schedule. The schedule is interpreted with the agent's local time. */
  uploadLimitSchedule?: UploadLimitSchedule;
  readonly errorDetails?: AgentPropertiesErrorDetails;
  /** The provisioning state of this resource. */
  readonly provisioningState?: ProvisioningState;
}

export function agentPropertiesSerializer(item: AgentProperties): any {
  return {
    description: item["description"],
    arcResourceId: item["arcResourceId"],
    arcVmUuid: item["arcVmUuid"],
    uploadLimitSchedule: !item["uploadLimitSchedule"]
      ? item["uploadLimitSchedule"]
      : uploadLimitScheduleSerializer(item["uploadLimitSchedule"]),
  };
}

export function agentPropertiesDeserializer(item: any): AgentProperties {
  return {
    description: item["description"],
    agentVersion: item["agentVersion"],
    arcResourceId: item["arcResourceId"],
    arcVmUuid: item["arcVmUuid"],
    agentStatus: item["agentStatus"],
    lastStatusUpdate: !item["lastStatusUpdate"]
      ? item["lastStatusUpdate"]
      : new Date(item["lastStatusUpdate"]),
    localIPAddress: item["localIPAddress"],
    memoryInMB: item["memoryInMB"],
    numberOfCores: item["numberOfCores"],
    uptimeInSeconds: item["uptimeInSeconds"],
    timeZone: item["timeZone"],
    uploadLimitSchedule: !item["uploadLimitSchedule"]
      ? item["uploadLimitSchedule"]
      : uploadLimitScheduleDeserializer(item["uploadLimitSchedule"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : agentPropertiesErrorDetailsDeserializer(item["errorDetails"]),
    provisioningState: item["provisioningState"],
  };
}

/** The Agent status. */
export enum KnownAgentStatus {
  Registering = "Registering",
  Offline = "Offline",
  Online = "Online",
  Executing = "Executing",
  RequiresAttention = "RequiresAttention",
  Unregistering = "Unregistering",
}

/**
 * The Agent status. \
 * {@link KnownAgentStatus} can be used interchangeably with AgentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Registering** \
 * **Offline** \
 * **Online** \
 * **Executing** \
 * **RequiresAttention** \
 * **Unregistering**
 */
export type AgentStatus = string;

/** The WAN-link upload limit schedule. Overlapping recurrences are not allowed. */
export interface UploadLimitSchedule {
  /** The set of weekly repeating recurrences of the WAN-link upload limit schedule. */
  weeklyRecurrences?: UploadLimitWeeklyRecurrence[];
}

export function uploadLimitScheduleSerializer(item: UploadLimitSchedule): any {
  return {
    weeklyRecurrences: !item["weeklyRecurrences"]
      ? item["weeklyRecurrences"]
      : uploadLimitWeeklyRecurrenceArraySerializer(item["weeklyRecurrences"]),
  };
}

export function uploadLimitScheduleDeserializer(item: any): UploadLimitSchedule {
  return {
    weeklyRecurrences: !item["weeklyRecurrences"]
      ? item["weeklyRecurrences"]
      : uploadLimitWeeklyRecurrenceArrayDeserializer(item["weeklyRecurrences"]),
  };
}

export function uploadLimitWeeklyRecurrenceArraySerializer(
  result: Array<UploadLimitWeeklyRecurrence>,
): any[] {
  return result.map((item) => {
    return uploadLimitWeeklyRecurrenceSerializer(item);
  });
}

export function uploadLimitWeeklyRecurrenceArrayDeserializer(
  result: Array<UploadLimitWeeklyRecurrence>,
): any[] {
  return result.map((item) => {
    return uploadLimitWeeklyRecurrenceDeserializer(item);
  });
}

/** The weekly recurrence of the WAN-link upload limit schedule. The start time must be earlier in the day than the end time. The recurrence must not span across multiple days. */
export interface UploadLimitWeeklyRecurrence extends WeeklyRecurrence {
  /** The WAN-link upload bandwidth (maximum data transfer rate) in megabits per second. Value of 0 indicates no throughput is allowed and any running migration job is effectively paused for the duration of this recurrence. Only data plane operations are governed by this limit. Control plane operations ensure seamless functionality. The agent may exceed this limit with control messages, if necessary. */
  limitInMbps: number;
}

export function uploadLimitWeeklyRecurrenceSerializer(item: UploadLimitWeeklyRecurrence): any {
  return {
    days: item["days"].map((p: any) => {
      return p;
    }),
    startTime: timeSerializer(item["startTime"]),
    endTime: timeSerializer(item["endTime"]),
    limitInMbps: item["limitInMbps"],
  };
}

export function uploadLimitWeeklyRecurrenceDeserializer(item: any): UploadLimitWeeklyRecurrence {
  return {
    days: item["days"].map((p: any) => {
      return p;
    }),
    startTime: timeDeserializer(item["startTime"]),
    endTime: timeDeserializer(item["endTime"]),
    limitInMbps: item["limitInMbps"],
  };
}

/** model interface AgentPropertiesErrorDetails */
export interface AgentPropertiesErrorDetails {
  /** Error code reported by Agent */
  code?: string;
  /** Expanded description of reported error code */
  message?: string;
}

export function agentPropertiesErrorDetailsDeserializer(item: any): AgentPropertiesErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The weekly recurrence of the schedule. */
export interface WeeklyRecurrence extends Recurrence {
  /** The set of days of week for the schedule recurrence. A day must not be specified more than once in a recurrence. */
  days: DayOfWeek[];
}

export function weeklyRecurrenceSerializer(item: WeeklyRecurrence): any {
  return {
    startTime: timeSerializer(item["startTime"]),
    endTime: timeSerializer(item["endTime"]),
    days: item["days"].map((p: any) => {
      return p;
    }),
  };
}

export function weeklyRecurrenceDeserializer(item: any): WeeklyRecurrence {
  return {
    startTime: timeDeserializer(item["startTime"]),
    endTime: timeDeserializer(item["endTime"]),
    days: item["days"].map((p: any) => {
      return p;
    }),
  };
}

/** The day of week. */
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** The schedule recurrence. */
export interface Recurrence {
  /** The start time of the schedule recurrence. Full hour and 30-minute intervals are supported. */
  startTime: Time;
  /** The end time of the schedule recurrence. Full hour and 30-minute intervals are supported. */
  endTime: Time;
}

export function recurrenceSerializer(item: Recurrence): any {
  return {
    startTime: timeSerializer(item["startTime"]),
    endTime: timeSerializer(item["endTime"]),
  };
}

export function recurrenceDeserializer(item: any): Recurrence {
  return {
    startTime: timeDeserializer(item["startTime"]),
    endTime: timeDeserializer(item["endTime"]),
  };
}

/** The time of day. */
export interface Time {
  /** The hour element of the time. Allowed values range from 0 (start of the selected day) to 24 (end of the selected day). Hour value 24 cannot be combined with any other minute value but 0. */
  hour: number;
  /** The minute element of the time. Allowed values are 0 and 30. If not specified, its value defaults to 0. */
  minute?: Minute;
}

export function timeSerializer(item: Time): any {
  return { hour: item["hour"], minute: item["minute"] };
}

export function timeDeserializer(item: any): Time {
  return {
    hour: item["hour"],
    minute: item["minute"],
  };
}

/** The minute element of the time. Allowed values are 0 and 30. If not specified, its value defaults to 0. */
export enum KnownMinute {
  Zero = 0,
  Thirty = 30,
}

/**
 * The minute element of the time. Allowed values are 0 and 30. If not specified, its value defaults to 0. \
 * {@link KnownMinute} can be used interchangeably with Minute,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **0** \
 * **30**
 */
export type Minute = number;

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

/** The Agent resource. */
export interface AgentUpdateParameters {
  properties?: AgentUpdateProperties;
}

export function agentUpdateParametersSerializer(item: AgentUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : agentUpdatePropertiesSerializer(item["properties"]),
  };
}

/** model interface AgentUpdateProperties */
export interface AgentUpdateProperties {
  /** A description for the Agent. */
  description?: string;
  /** The WAN-link upload limit schedule that applies to any Job Run the agent executes. Data plane operations (migrating files) are affected. Control plane operations ensure seamless migration functionality and are not limited by this schedule. The schedule is interpreted with the agent's local time. */
  uploadLimitSchedule?: UploadLimitSchedule;
}

export function agentUpdatePropertiesSerializer(item: AgentUpdateProperties): any {
  return {
    description: item["description"],
    uploadLimitSchedule: !item["uploadLimitSchedule"]
      ? item["uploadLimitSchedule"]
      : uploadLimitScheduleSerializer(item["uploadLimitSchedule"]),
  };
}

/** List of Agents. */
export interface _AgentList {
  /** The Agent items on this page */
  readonly value: Agent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentListDeserializer(item: any): _AgentList {
  return {
    value: agentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentArraySerializer(result: Array<Agent>): any[] {
  return result.map((item) => {
    return agentSerializer(item);
  });
}

export function agentArrayDeserializer(result: Array<Agent>): any[] {
  return result.map((item) => {
    return agentDeserializer(item);
  });
}

/** The Endpoint resource, which contains information about file sources and targets. */
export interface Endpoint extends ProxyResource {
  /** The resource specific properties for the Storage Mover resource. */
  properties: EndpointBasePropertiesUnion;
  /** The managed service identity of the resource. This property is only available on the latest version. */
  identity?: ManagedServiceIdentity;
}

export function endpointSerializer(item: Endpoint): any {
  return {
    properties: endpointBasePropertiesUnionSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function endpointDeserializer(item: any): Endpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: endpointBasePropertiesUnionDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The resource specific properties for the Storage Mover resource. */
export interface EndpointBaseProperties {
  /** The Endpoint resource type. */
  /** The discriminator possible values: AzureStorageBlobContainer, NfsMount, AzureStorageSmbFileShare, SmbMount, AzureStorageNfsFileShare, AzureMultiCloudConnector */
  endpointType: EndpointType;
  /** A description for the Endpoint. */
  description?: string;
  /** The provisioning state of this resource. */
  readonly provisioningState?: ProvisioningState;
}

export function endpointBasePropertiesSerializer(item: EndpointBaseProperties): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
  };
}

export function endpointBasePropertiesDeserializer(item: any): EndpointBaseProperties {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for EndpointBasePropertiesUnion */
export type EndpointBasePropertiesUnion =
  | AzureStorageBlobContainerEndpointProperties
  | NfsMountEndpointProperties
  | AzureStorageSmbFileShareEndpointProperties
  | SmbMountEndpointProperties
  | AzureStorageNfsFileShareEndpointProperties
  | AzureMultiCloudConnectorEndpointProperties
  | EndpointBaseProperties;

export function endpointBasePropertiesUnionSerializer(item: EndpointBasePropertiesUnion): any {
  switch (item.endpointType) {
    case "AzureStorageBlobContainer":
      return azureStorageBlobContainerEndpointPropertiesSerializer(
        item as AzureStorageBlobContainerEndpointProperties,
      );

    case "NfsMount":
      return nfsMountEndpointPropertiesSerializer(item as NfsMountEndpointProperties);

    case "AzureStorageSmbFileShare":
      return azureStorageSmbFileShareEndpointPropertiesSerializer(
        item as AzureStorageSmbFileShareEndpointProperties,
      );

    case "SmbMount":
      return smbMountEndpointPropertiesSerializer(item as SmbMountEndpointProperties);

    case "AzureStorageNfsFileShare":
      return azureStorageNfsFileShareEndpointPropertiesSerializer(
        item as AzureStorageNfsFileShareEndpointProperties,
      );

    case "AzureMultiCloudConnector":
      return azureMultiCloudConnectorEndpointPropertiesSerializer(
        item as AzureMultiCloudConnectorEndpointProperties,
      );

    default:
      return endpointBasePropertiesSerializer(item);
  }
}

export function endpointBasePropertiesUnionDeserializer(item: any): EndpointBasePropertiesUnion {
  switch (item.endpointType) {
    case "AzureStorageBlobContainer":
      return azureStorageBlobContainerEndpointPropertiesDeserializer(
        item as AzureStorageBlobContainerEndpointProperties,
      );

    case "NfsMount":
      return nfsMountEndpointPropertiesDeserializer(item as NfsMountEndpointProperties);

    case "AzureStorageSmbFileShare":
      return azureStorageSmbFileShareEndpointPropertiesDeserializer(
        item as AzureStorageSmbFileShareEndpointProperties,
      );

    case "SmbMount":
      return smbMountEndpointPropertiesDeserializer(item as SmbMountEndpointProperties);

    case "AzureStorageNfsFileShare":
      return azureStorageNfsFileShareEndpointPropertiesDeserializer(
        item as AzureStorageNfsFileShareEndpointProperties,
      );

    case "AzureMultiCloudConnector":
      return azureMultiCloudConnectorEndpointPropertiesDeserializer(
        item as AzureMultiCloudConnectorEndpointProperties,
      );

    default:
      return endpointBasePropertiesDeserializer(item);
  }
}

/** The Endpoint resource type. */
export enum KnownEndpointType {
  AzureStorageBlobContainer = "AzureStorageBlobContainer",
  NfsMount = "NfsMount",
  AzureStorageSmbFileShare = "AzureStorageSmbFileShare",
  SmbMount = "SmbMount",
  AzureMultiCloudConnector = "AzureMultiCloudConnector",
  AzureStorageNfsFileShare = "AzureStorageNfsFileShare",
}

/**
 * The Endpoint resource type. \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureStorageBlobContainer** \
 * **NfsMount** \
 * **AzureStorageSmbFileShare** \
 * **SmbMount** \
 * **AzureMultiCloudConnector** \
 * **AzureStorageNfsFileShare**
 */
export type EndpointType = string;

/** The properties of Azure Storage blob container endpoint. */
export interface AzureStorageBlobContainerEndpointProperties extends EndpointBaseProperties {
  /** The Azure Resource ID of the storage account that is the target destination. */
  storageAccountResourceId: string;
  /** The name of the Storage blob container that is the target destination. */
  blobContainerName: string;
  /** The Endpoint resource type. */
  endpointType: "AzureStorageBlobContainer";
}

export function azureStorageBlobContainerEndpointPropertiesSerializer(
  item: AzureStorageBlobContainerEndpointProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainerName: item["blobContainerName"],
  };
}

export function azureStorageBlobContainerEndpointPropertiesDeserializer(
  item: any,
): AzureStorageBlobContainerEndpointProperties {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    provisioningState: item["provisioningState"],
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainerName: item["blobContainerName"],
  };
}

/** The properties of NFS share endpoint. */
export interface NfsMountEndpointProperties extends EndpointBaseProperties {
  /** The host name or IP address of the server exporting the file system. */
  host: string;
  /** The NFS protocol version. */
  nfsVersion?: NfsVersion;
  /** The directory being exported from the server. */
  export: string;
  /** The Endpoint resource type. */
  endpointType: "NfsMount";
}

export function nfsMountEndpointPropertiesSerializer(item: NfsMountEndpointProperties): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    host: item["host"],
    nfsVersion: item["nfsVersion"],
    export: item["export"],
  };
}

export function nfsMountEndpointPropertiesDeserializer(item: any): NfsMountEndpointProperties {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    provisioningState: item["provisioningState"],
    host: item["host"],
    nfsVersion: item["nfsVersion"],
    export: item["export"],
  };
}

/** The NFS protocol version. */
export enum KnownNfsVersion {
  NFSauto = "NFSauto",
  NFSv3 = "NFSv3",
  NFSv4 = "NFSv4",
}

/**
 * The NFS protocol version. \
 * {@link KnownNfsVersion} can be used interchangeably with NfsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NFSauto** \
 * **NFSv3** \
 * **NFSv4**
 */
export type NfsVersion = string;

/** The properties of Azure Storage SMB file share endpoint. */
export interface AzureStorageSmbFileShareEndpointProperties extends EndpointBaseProperties {
  /** The Azure Resource ID of the storage account. */
  storageAccountResourceId: string;
  /** The name of the Azure Storage file share. */
  fileShareName: string;
  /** The Endpoint resource type. */
  endpointType: "AzureStorageSmbFileShare";
}

export function azureStorageSmbFileShareEndpointPropertiesSerializer(
  item: AzureStorageSmbFileShareEndpointProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    storageAccountResourceId: item["storageAccountResourceId"],
    fileShareName: item["fileShareName"],
  };
}

export function azureStorageSmbFileShareEndpointPropertiesDeserializer(
  item: any,
): AzureStorageSmbFileShareEndpointProperties {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    provisioningState: item["provisioningState"],
    storageAccountResourceId: item["storageAccountResourceId"],
    fileShareName: item["fileShareName"],
  };
}

/** The properties of SMB share endpoint. */
export interface SmbMountEndpointProperties extends EndpointBaseProperties {
  /** The host name or IP address of the server exporting the file system. */
  host: string;
  /** The name of the SMB share being exported from the server. */
  shareName: string;
  /** The Azure Key Vault secret URIs which store the required credentials to access the SMB share. */
  credentials?: AzureKeyVaultSmbCredentials;
  /** The Endpoint resource type. */
  endpointType: "SmbMount";
}

export function smbMountEndpointPropertiesSerializer(item: SmbMountEndpointProperties): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    host: item["host"],
    shareName: item["shareName"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : azureKeyVaultSmbCredentialsSerializer(item["credentials"]),
  };
}

export function smbMountEndpointPropertiesDeserializer(item: any): SmbMountEndpointProperties {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    provisioningState: item["provisioningState"],
    host: item["host"],
    shareName: item["shareName"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : azureKeyVaultSmbCredentialsDeserializer(item["credentials"]),
  };
}

/** The Azure Key Vault secret URIs which store the credentials. */
export interface AzureKeyVaultSmbCredentials extends Credentials {
  /** The Azure Key Vault secret URI which stores the username. Use empty string to clean-up existing value. */
  usernameUri?: string;
  /** The Azure Key Vault secret URI which stores the password. Use empty string to clean-up existing value. */
  passwordUri?: string;
  /** The Credentials type. */
  type: "AzureKeyVaultSmb";
}

export function azureKeyVaultSmbCredentialsSerializer(item: AzureKeyVaultSmbCredentials): any {
  return {
    type: item["type"],
    usernameUri: item["usernameUri"],
    passwordUri: item["passwordUri"],
  };
}

export function azureKeyVaultSmbCredentialsDeserializer(item: any): AzureKeyVaultSmbCredentials {
  return {
    type: item["type"],
    usernameUri: item["usernameUri"],
    passwordUri: item["passwordUri"],
  };
}

/** The properties of Azure Storage NFS file share endpoint. */
export interface AzureStorageNfsFileShareEndpointProperties extends EndpointBaseProperties {
  /** The Azure Resource ID of the storage account. */
  storageAccountResourceId: string;
  /** The name of the Azure Storage NFS file share. */
  fileShareName: string;
  /** The Endpoint resource type. */
  endpointType: "AzureStorageNfsFileShare";
}

export function azureStorageNfsFileShareEndpointPropertiesSerializer(
  item: AzureStorageNfsFileShareEndpointProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    storageAccountResourceId: item["storageAccountResourceId"],
    fileShareName: item["fileShareName"],
  };
}

export function azureStorageNfsFileShareEndpointPropertiesDeserializer(
  item: any,
): AzureStorageNfsFileShareEndpointProperties {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    provisioningState: item["provisioningState"],
    storageAccountResourceId: item["storageAccountResourceId"],
    fileShareName: item["fileShareName"],
  };
}

/** The properties of Azure MultiCloudConnector endpoint. */
export interface AzureMultiCloudConnectorEndpointProperties extends EndpointBaseProperties {
  /** The Azure Resource ID of the MultiCloud Connector resource. */
  multiCloudConnectorId: string;
  /** The AWS S3 bucket ARM resource Id. */
  awsS3BucketId: string;
  /** The Endpoint resource type. */
  endpointType: "AzureMultiCloudConnector";
}

export function azureMultiCloudConnectorEndpointPropertiesSerializer(
  item: AzureMultiCloudConnectorEndpointProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    multiCloudConnectorId: item["multiCloudConnectorId"],
    awsS3BucketId: item["awsS3BucketId"],
  };
}

export function azureMultiCloudConnectorEndpointPropertiesDeserializer(
  item: any,
): AzureMultiCloudConnectorEndpointProperties {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    provisioningState: item["provisioningState"],
    multiCloudConnectorId: item["multiCloudConnectorId"],
    awsS3BucketId: item["awsS3BucketId"],
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

/** The Credentials. */
export interface Credentials {
  /** The Credentials type. */
  /** The discriminator possible values: AzureKeyVaultSmb */
  type: CredentialType;
}

export function credentialsSerializer(item: Credentials): any {
  return { type: item["type"] };
}

export function credentialsDeserializer(item: any): Credentials {
  return {
    type: item["type"],
  };
}

/** Alias for CredentialsUnion */
export type CredentialsUnion = AzureKeyVaultSmbCredentials | Credentials;

export function credentialsUnionSerializer(item: CredentialsUnion): any {
  switch (item.type) {
    case "AzureKeyVaultSmb":
      return azureKeyVaultSmbCredentialsSerializer(item as AzureKeyVaultSmbCredentials);

    default:
      return credentialsSerializer(item);
  }
}

export function credentialsUnionDeserializer(item: any): CredentialsUnion {
  switch (item.type) {
    case "AzureKeyVaultSmb":
      return azureKeyVaultSmbCredentialsDeserializer(item as AzureKeyVaultSmbCredentials);

    default:
      return credentialsDeserializer(item);
  }
}

/** The Credentials type. */
export enum KnownCredentialType {
  AzureKeyVaultSmb = "AzureKeyVaultSmb",
}

/**
 * The Credentials type. \
 * {@link KnownCredentialType} can be used interchangeably with CredentialType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureKeyVaultSmb**
 */
export type CredentialType = string;

/** The Endpoint resource. */
export interface EndpointBaseUpdateParameters {
  /** The Endpoint resource, which contains information about file sources and targets. */
  properties?: EndpointBaseUpdatePropertiesUnion;
  /** The managed system identity assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function endpointBaseUpdateParametersSerializer(item: EndpointBaseUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : endpointBaseUpdatePropertiesUnionSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The Endpoint resource, which contains information about file sources and targets. */
export interface EndpointBaseUpdateProperties {
  /** The Endpoint resource type. */
  /** The discriminator possible values: AzureStorageBlobContainer, NfsMount, AzureStorageSmbFileShare, AzureStorageNfsFileShare, AzureMultiCloudConnector, SmbMount */
  endpointType: EndpointType;
  /** A description for the Endpoint. */
  description?: string;
}

export function endpointBaseUpdatePropertiesSerializer(item: EndpointBaseUpdateProperties): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
  };
}

/** Alias for EndpointBaseUpdatePropertiesUnion */
export type EndpointBaseUpdatePropertiesUnion =
  | AzureStorageBlobContainerEndpointUpdateProperties
  | NfsMountEndpointUpdateProperties
  | AzureStorageSmbFileShareEndpointUpdateProperties
  | AzureStorageNfsFileShareEndpointUpdateProperties
  | AzureMultiCloudConnectorEndpointUpdateProperties
  | SmbMountEndpointUpdateProperties
  | EndpointBaseUpdateProperties;

export function endpointBaseUpdatePropertiesUnionSerializer(
  item: EndpointBaseUpdatePropertiesUnion,
): any {
  switch (item.endpointType) {
    case "AzureStorageBlobContainer":
      return azureStorageBlobContainerEndpointUpdatePropertiesSerializer(
        item as AzureStorageBlobContainerEndpointUpdateProperties,
      );

    case "NfsMount":
      return nfsMountEndpointUpdatePropertiesSerializer(item as NfsMountEndpointUpdateProperties);

    case "AzureStorageSmbFileShare":
      return azureStorageSmbFileShareEndpointUpdatePropertiesSerializer(
        item as AzureStorageSmbFileShareEndpointUpdateProperties,
      );

    case "AzureStorageNfsFileShare":
      return azureStorageNfsFileShareEndpointUpdatePropertiesSerializer(
        item as AzureStorageNfsFileShareEndpointUpdateProperties,
      );

    case "AzureMultiCloudConnector":
      return azureMultiCloudConnectorEndpointUpdatePropertiesSerializer(
        item as AzureMultiCloudConnectorEndpointUpdateProperties,
      );

    case "SmbMount":
      return smbMountEndpointUpdatePropertiesSerializer(item as SmbMountEndpointUpdateProperties);

    default:
      return endpointBaseUpdatePropertiesSerializer(item);
  }
}

/** model interface AzureStorageBlobContainerEndpointUpdateProperties */
export interface AzureStorageBlobContainerEndpointUpdateProperties
  extends EndpointBaseUpdateProperties {
  /** The Endpoint resource type. */
  endpointType: "AzureStorageBlobContainer";
}

export function azureStorageBlobContainerEndpointUpdatePropertiesSerializer(
  item: AzureStorageBlobContainerEndpointUpdateProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
  };
}

/** model interface NfsMountEndpointUpdateProperties */
export interface NfsMountEndpointUpdateProperties extends EndpointBaseUpdateProperties {
  /** The Endpoint resource type. */
  endpointType: "NfsMount";
}

export function nfsMountEndpointUpdatePropertiesSerializer(
  item: NfsMountEndpointUpdateProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
  };
}

/** The properties of Azure Storage SMB file share endpoint to update. */
export interface AzureStorageSmbFileShareEndpointUpdateProperties
  extends EndpointBaseUpdateProperties {
  /** The Endpoint resource type. */
  endpointType: "AzureStorageSmbFileShare";
}

export function azureStorageSmbFileShareEndpointUpdatePropertiesSerializer(
  item: AzureStorageSmbFileShareEndpointUpdateProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
  };
}

/** The properties of Azure Storage NFS file share endpoint to update. */
export interface AzureStorageNfsFileShareEndpointUpdateProperties
  extends EndpointBaseUpdateProperties {
  /** The Endpoint resource type. */
  endpointType: "AzureStorageNfsFileShare";
}

export function azureStorageNfsFileShareEndpointUpdatePropertiesSerializer(
  item: AzureStorageNfsFileShareEndpointUpdateProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
  };
}

/** The properties of Azure Storage NFS file share endpoint to update. */
export interface AzureMultiCloudConnectorEndpointUpdateProperties
  extends EndpointBaseUpdateProperties {
  /** The Endpoint resource type. */
  endpointType: "AzureMultiCloudConnector";
}

export function azureMultiCloudConnectorEndpointUpdatePropertiesSerializer(
  item: AzureMultiCloudConnectorEndpointUpdateProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
  };
}

/** The properties of SMB share endpoint to update. */
export interface SmbMountEndpointUpdateProperties extends EndpointBaseUpdateProperties {
  /** The Azure Key Vault secret URIs which store the required credentials to access the SMB share. */
  credentials?: AzureKeyVaultSmbCredentials;
  /** The Endpoint resource type. */
  endpointType: "SmbMount";
}

export function smbMountEndpointUpdatePropertiesSerializer(
  item: SmbMountEndpointUpdateProperties,
): any {
  return {
    endpointType: item["endpointType"],
    description: item["description"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : azureKeyVaultSmbCredentialsSerializer(item["credentials"]),
  };
}

/** List of Endpoints. */
export interface _EndpointList {
  /** The Endpoint items on this page */
  readonly value: Endpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _endpointListDeserializer(item: any): _EndpointList {
  return {
    value: endpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function endpointArraySerializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointSerializer(item);
  });
}

export function endpointArrayDeserializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointDeserializer(item);
  });
}

/** The Project resource. */
export interface Project extends ProxyResource {
  /** Project properties. */
  properties?: ProjectProperties;
}

export function projectSerializer(item: Project): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesSerializer(item["properties"]),
  };
}

export function projectDeserializer(item: any): Project {
  return {
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

/** Project properties. */
export interface ProjectProperties {
  /** A description for the Project. */
  description?: string;
  /** The provisioning state of this resource. */
  readonly provisioningState?: ProvisioningState;
}

export function projectPropertiesSerializer(item: ProjectProperties): any {
  return { description: item["description"] };
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    description: item["description"],
    provisioningState: item["provisioningState"],
  };
}

/** The Project resource. */
export interface ProjectUpdateParameters {
  /** Project properties. */
  properties?: ProjectUpdateProperties;
}

export function projectUpdateParametersSerializer(item: ProjectUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Project properties. */
export interface ProjectUpdateProperties {
  /** A description for the Project. */
  description?: string;
}

export function projectUpdatePropertiesSerializer(item: ProjectUpdateProperties): any {
  return { description: item["description"] };
}

/** List of Project resources. */
export interface _ProjectList {
  /** The Project items on this page */
  readonly value: Project[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _projectListDeserializer(item: any): _ProjectList {
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

/** The Job Definition resource. */
export interface JobDefinition extends ProxyResource {
  /** Job definition properties. */
  properties: JobDefinitionProperties;
}

export function jobDefinitionSerializer(item: JobDefinition): any {
  return { properties: jobDefinitionPropertiesSerializer(item["properties"]) };
}

export function jobDefinitionDeserializer(item: any): JobDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: jobDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** Job definition properties. */
export interface JobDefinitionProperties {
  /** A description for the Job Definition. OnPremToCloud is for migrating data from on-premises to cloud. CloudToCloud is for migrating data between cloud to cloud. */
  description?: string;
  /** The type of the Job. */
  jobType?: JobType;
  /** Strategy to use for copy. */
  copyMode: CopyMode;
  /** The name of the source Endpoint. */
  sourceName: string;
  /** Fully qualified resource ID of the source Endpoint. */
  readonly sourceResourceId?: string;
  /** The subpath to use when reading from the source Endpoint. */
  sourceSubpath?: string;
  /** The name of the target Endpoint. */
  targetName: string;
  /** Fully qualified resource ID of the target Endpoint. */
  readonly targetResourceId?: string;
  /** The subpath to use when writing to the target Endpoint. */
  targetSubpath?: string;
  /** The name of the Job Run in a non-terminal state, if exists. */
  readonly latestJobRunName?: string;
  /** The fully qualified resource ID of the Job Run in a non-terminal state, if exists. */
  readonly latestJobRunResourceId?: string;
  /** The current status of the Job Run in a non-terminal state, if exists. */
  readonly latestJobRunStatus?: JobRunStatus;
  /** Name of the Agent to assign for new Job Runs of this Job Definition. */
  agentName?: string;
  /** Fully qualified resource id of the Agent to assign for new Job Runs of this Job Definition. */
  readonly agentResourceId?: string;
  /** The list of cloud endpoints to migrate. */
  sourceTargetMap?: {
    value?: SourceTargetMap[];
  };
  /** The provisioning state of this resource. */
  readonly provisioningState?: ProvisioningState;
}

export function jobDefinitionPropertiesSerializer(item: JobDefinitionProperties): any {
  return {
    description: item["description"],
    jobType: item["jobType"],
    copyMode: item["copyMode"],
    sourceName: item["sourceName"],
    sourceSubpath: item["sourceSubpath"],
    targetName: item["targetName"],
    targetSubpath: item["targetSubpath"],
    agentName: item["agentName"],
    sourceTargetMap: !item["sourceTargetMap"]
      ? item["sourceTargetMap"]
      : _jobDefinitionPropertiesSourceTargetMapSerializer(item["sourceTargetMap"]),
  };
}

export function jobDefinitionPropertiesDeserializer(item: any): JobDefinitionProperties {
  return {
    description: item["description"],
    jobType: item["jobType"],
    copyMode: item["copyMode"],
    sourceName: item["sourceName"],
    sourceResourceId: item["sourceResourceId"],
    sourceSubpath: item["sourceSubpath"],
    targetName: item["targetName"],
    targetResourceId: item["targetResourceId"],
    targetSubpath: item["targetSubpath"],
    latestJobRunName: item["latestJobRunName"],
    latestJobRunResourceId: item["latestJobRunResourceId"],
    latestJobRunStatus: item["latestJobRunStatus"],
    agentName: item["agentName"],
    agentResourceId: item["agentResourceId"],
    sourceTargetMap: !item["sourceTargetMap"]
      ? item["sourceTargetMap"]
      : _jobDefinitionPropertiesSourceTargetMapDeserializer(item["sourceTargetMap"]),
    provisioningState: item["provisioningState"],
  };
}

/** The type of the Job. */
export enum KnownJobType {
  OnPremToCloud = "OnPremToCloud",
  CloudToCloud = "CloudToCloud",
}

/**
 * The type of the Job. \
 * {@link KnownJobType} can be used interchangeably with JobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnPremToCloud** \
 * **CloudToCloud**
 */
export type JobType = string;

/** Strategy to use for copy. */
export enum KnownCopyMode {
  Additive = "Additive",
  Mirror = "Mirror",
}

/**
 * Strategy to use for copy. \
 * {@link KnownCopyMode} can be used interchangeably with CopyMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Additive** \
 * **Mirror**
 */
export type CopyMode = string;

/** The current status of the Job Run in a non-terminal state, if exists. */
export enum KnownJobRunStatus {
  Queued = "Queued",
  Started = "Started",
  Running = "Running",
  CancelRequested = "CancelRequested",
  Canceling = "Canceling",
  Canceled = "Canceled",
  Failed = "Failed",
  Succeeded = "Succeeded",
  PausedByBandwidthManagement = "PausedByBandwidthManagement",
}

/**
 * The current status of the Job Run in a non-terminal state, if exists. \
 * {@link KnownJobRunStatus} can be used interchangeably with JobRunStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queued** \
 * **Started** \
 * **Running** \
 * **CancelRequested** \
 * **Canceling** \
 * **Canceled** \
 * **Failed** \
 * **Succeeded** \
 * **PausedByBandwidthManagement**
 */
export type JobRunStatus = string;

/** model interface _JobDefinitionPropertiesSourceTargetMap */
export interface _JobDefinitionPropertiesSourceTargetMap {
  readonly value?: SourceTargetMap[];
}

export function _jobDefinitionPropertiesSourceTargetMapSerializer(
  item: _JobDefinitionPropertiesSourceTargetMap,
): any {
  return item;
}

export function _jobDefinitionPropertiesSourceTargetMapDeserializer(
  item: any,
): _JobDefinitionPropertiesSourceTargetMap {
  return {
    value: !item["value"] ? item["value"] : sourceTargetMapArrayDeserializer(item["value"]),
  };
}

export function sourceTargetMapArrayDeserializer(result: Array<SourceTargetMap>): any[] {
  return result.map((item) => {
    return sourceTargetMapDeserializer(item);
  });
}

/** The properties of cloud endpoints to migrate. */
export interface SourceTargetMap {
  sourceEndpoint: SourceEndpoint;
  targetEndpoint: TargetEndpoint;
}

export function sourceTargetMapDeserializer(item: any): SourceTargetMap {
  return {
    sourceEndpoint: sourceEndpointDeserializer(item["sourceEndpoint"]),
    targetEndpoint: targetEndpointDeserializer(item["targetEndpoint"]),
  };
}

/** The source endpoint resource for source and target mapping. */
export interface SourceEndpoint {
  /** The properties of the cloud source endpoint to migrate. */
  properties?: SourceEndpointProperties;
}

export function sourceEndpointDeserializer(item: any): SourceEndpoint {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sourceEndpointPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the cloud source endpoint to migrate. */
export interface SourceEndpointProperties {
  /** The name of the cloud source endpoint to migrate. */
  name?: string;
  /** The fully qualified ARM resource ID of the cloud source endpoint to migrate. */
  sourceEndpointResourceId?: string;
  /** The fully qualified ARM resource ID of the AWS S3 bucket to migrate. */
  awsS3BucketId?: string;
}

export function sourceEndpointPropertiesDeserializer(item: any): SourceEndpointProperties {
  return {
    name: item["name"],
    sourceEndpointResourceId: item["sourceEndpointResourceId"],
    awsS3BucketId: item["awsS3BucketId"],
  };
}

/** The target endpoint resource for source and target mapping. */
export interface TargetEndpoint {
  /** The properties of the cloud target endpoint to migrate. */
  properties?: TargetEndpointProperties;
}

export function targetEndpointDeserializer(item: any): TargetEndpoint {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : targetEndpointPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the cloud target endpoint to migrate. */
export interface TargetEndpointProperties {
  /** The name of the cloud target endpoint to migrate. */
  name?: string;
  /** The fully qualified ARM resource ID of the cloud target endpoint to migrate. */
  targetEndpointResourceId?: string;
  /** The fully qualified ARM resource ID of the Azure Storage account. */
  azureStorageAccountResourceId?: string;
  /** The name of the Azure Storage blob container. */
  azureStorageBlobContainerName?: string;
}

export function targetEndpointPropertiesDeserializer(item: any): TargetEndpointProperties {
  return {
    name: item["name"],
    targetEndpointResourceId: item["targetEndpointResourceId"],
    azureStorageAccountResourceId: item["azureStorageAccountResourceId"],
    azureStorageBlobContainerName: item["azureStorageBlobContainerName"],
  };
}

/** The Job Definition resource. */
export interface JobDefinitionUpdateParameters {
  /** Job definition properties. */
  properties?: JobDefinitionUpdateProperties;
}

export function jobDefinitionUpdateParametersSerializer(item: JobDefinitionUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : jobDefinitionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Job definition properties. */
export interface JobDefinitionUpdateProperties {
  /** A description for the Job Definition. */
  description?: string;
  /** Strategy to use for copy. */
  copyMode?: CopyMode;
  /** Name of the Agent to assign for new Job Runs of this Job Definition. */
  agentName?: string;
}

export function jobDefinitionUpdatePropertiesSerializer(item: JobDefinitionUpdateProperties): any {
  return {
    description: item["description"],
    copyMode: item["copyMode"],
    agentName: item["agentName"],
  };
}

/** List of Job Definitions. */
export interface _JobDefinitionList {
  /** The JobDefinition items on this page */
  readonly value: JobDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobDefinitionListDeserializer(item: any): _JobDefinitionList {
  return {
    value: jobDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobDefinitionArraySerializer(result: Array<JobDefinition>): any[] {
  return result.map((item) => {
    return jobDefinitionSerializer(item);
  });
}

export function jobDefinitionArrayDeserializer(result: Array<JobDefinition>): any[] {
  return result.map((item) => {
    return jobDefinitionDeserializer(item);
  });
}

/** Response that identifies a Job Run. */
export interface JobRunResourceId {
  /** Fully qualified resource id of the Job Run. */
  readonly jobRunResourceId?: string;
}

export function jobRunResourceIdDeserializer(item: any): JobRunResourceId {
  return {
    jobRunResourceId: item["jobRunResourceId"],
  };
}

/** The Job Run resource. */
export interface JobRun extends ProxyResource {
  /** Job run properties. */
  properties?: JobRunProperties;
}

export function jobRunDeserializer(item: any): JobRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : jobRunPropertiesDeserializer(item["properties"]),
  };
}

/** Job run properties. */
export interface JobRunProperties {
  /** The state of the job execution. */
  readonly status?: JobRunStatus;
  /** The status of Agent's scanning of source. */
  readonly scanStatus?: JobRunScanStatus;
  /** Name of the Agent assigned to this run. */
  readonly agentName?: string;
  /** Fully qualified resource id of the Agent assigned to this run. */
  readonly agentResourceId?: string;
  /** Start time of the run. Null if no Agent reported that the job has started. */
  readonly executionStartTime?: Date;
  /** End time of the run. Null if Agent has not reported that the job has ended. */
  readonly executionEndTime?: Date;
  /** The last updated time of the Job Run. */
  readonly lastStatusUpdate?: Date;
  /** Number of items scanned so far in source. */
  readonly itemsScanned?: number;
  /** Number of items that will not be transferred, as they are excluded by user configuration. */
  readonly itemsExcluded?: number;
  /** Number of items that will not be transferred, as they are unsupported on target. */
  readonly itemsUnsupported?: number;
  /** Number of items that will not be transferred, as they are already found on target (e.g. mirror mode). */
  readonly itemsNoTransferNeeded?: number;
  /** Number of items that were attempted to transfer and failed. */
  readonly itemsFailed?: number;
  /** Number of items successfully transferred to target. */
  readonly itemsTransferred?: number;
  /** Bytes of data scanned so far in source. */
  readonly bytesScanned?: number;
  /** Bytes of data that will not be transferred, as they are excluded by user configuration. */
  readonly bytesExcluded?: number;
  /** Bytes of data that will not be transferred, as they are unsupported on target. */
  readonly bytesUnsupported?: number;
  /** Bytes of data that will not be transferred, as they are already found on target (e.g. mirror mode). */
  readonly bytesNoTransferNeeded?: number;
  /** Bytes of data that were attempted to transfer and failed. */
  readonly bytesFailed?: number;
  /** Bytes of data successfully transferred to target. */
  readonly bytesTransferred?: number;
  /** Name of source Endpoint resource. This resource may no longer exist. */
  readonly sourceName?: string;
  /** Fully qualified resource id of source Endpoint. This id may no longer exist. */
  readonly sourceResourceId?: string;
  /** Copy of source Endpoint resource's properties at time of Job Run creation. */
  readonly sourceProperties?: any;
  /** Name of target Endpoint resource. This resource may no longer exist. */
  readonly targetName?: string;
  /** Fully qualified resource id of of Endpoint. This id may no longer exist. */
  readonly targetResourceId?: string;
  /** Copy of Endpoint resource's properties at time of Job Run creation. */
  readonly targetProperties?: any;
  /** Copy of parent Job Definition's properties at time of Job Run creation. */
  readonly jobDefinitionProperties?: any;
  /** Error details. */
  readonly error?: JobRunError;
  /** The provisioning state of this resource. */
  readonly provisioningState?: ProvisioningState;
}

export function jobRunPropertiesDeserializer(item: any): JobRunProperties {
  return {
    status: item["status"],
    scanStatus: item["scanStatus"],
    agentName: item["agentName"],
    agentResourceId: item["agentResourceId"],
    executionStartTime: !item["executionStartTime"]
      ? item["executionStartTime"]
      : new Date(item["executionStartTime"]),
    executionEndTime: !item["executionEndTime"]
      ? item["executionEndTime"]
      : new Date(item["executionEndTime"]),
    lastStatusUpdate: !item["lastStatusUpdate"]
      ? item["lastStatusUpdate"]
      : new Date(item["lastStatusUpdate"]),
    itemsScanned: item["itemsScanned"],
    itemsExcluded: item["itemsExcluded"],
    itemsUnsupported: item["itemsUnsupported"],
    itemsNoTransferNeeded: item["itemsNoTransferNeeded"],
    itemsFailed: item["itemsFailed"],
    itemsTransferred: item["itemsTransferred"],
    bytesScanned: item["bytesScanned"],
    bytesExcluded: item["bytesExcluded"],
    bytesUnsupported: item["bytesUnsupported"],
    bytesNoTransferNeeded: item["bytesNoTransferNeeded"],
    bytesFailed: item["bytesFailed"],
    bytesTransferred: item["bytesTransferred"],
    sourceName: item["sourceName"],
    sourceResourceId: item["sourceResourceId"],
    sourceProperties: item["sourceProperties"],
    targetName: item["targetName"],
    targetResourceId: item["targetResourceId"],
    targetProperties: item["targetProperties"],
    jobDefinitionProperties: item["jobDefinitionProperties"],
    error: !item["error"] ? item["error"] : jobRunErrorDeserializer(item["error"]),
    provisioningState: item["provisioningState"],
  };
}

/** The status of Agent's scanning of source. */
export enum KnownJobRunScanStatus {
  NotStarted = "NotStarted",
  Scanning = "Scanning",
  Completed = "Completed",
}

/**
 * The status of Agent's scanning of source. \
 * {@link KnownJobRunScanStatus} can be used interchangeably with JobRunScanStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted** \
 * **Scanning** \
 * **Completed**
 */
export type JobRunScanStatus = string;

/** Error type */
export interface JobRunError {
  /** Error code of the given entry. */
  code?: string;
  /** Error message of the given entry. */
  message?: string;
  /** Target of the given error entry. */
  target?: string;
}

export function jobRunErrorDeserializer(item: any): JobRunError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** List of Job Runs. */
export interface _JobRunList {
  /** The JobRun items on this page */
  readonly value: JobRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobRunListDeserializer(item: any): _JobRunList {
  return {
    value: jobRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobRunArrayDeserializer(result: Array<JobRun>): any[] {
  return result.map((item) => {
    return jobRunDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-07-01 API version. */
  V20240701 = "2024-07-01",
  /** The 2025-07-01 API version. */
  V20250701 = "2025-07-01",
}
