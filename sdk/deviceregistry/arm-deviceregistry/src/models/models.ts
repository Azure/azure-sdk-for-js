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

/** Asset definition. */
export interface Asset extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AssetProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function assetSerializer(item: Asset): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : assetPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function assetDeserializer(item: any): Asset {
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
      : assetPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the asset properties. */
export interface AssetProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Enabled/Disabled status of the asset. */
  enabled?: boolean;
  /** Asset id provided by the customer. */
  externalAssetId?: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the asset. */
  description?: string;
  /** A reference to the asset endpoint profile (connection information) used by brokers to connect to an endpoint that provides data points for this asset. Must provide asset endpoint profile name. */
  assetEndpointProfileRef: string;
  /** An integer that is incremented each time the resource is modified. */
  readonly version?: number;
  /** Asset manufacturer name. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model name. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Revision number of the hardware. */
  hardwareRevision?: string;
  /** Revision number of the software. */
  softwareRevision?: string;
  /** Reference to the documentation. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Reference to a list of discovered assets. Populated only if the asset has been created from discovery flow. Discovered asset names must be provided. */
  discoveredAssetRefs?: string[];
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Object that describes the default topic information for the asset. */
  defaultTopic?: Topic;
  /** Array of datasets that are part of the asset. Each dataset describes the data points that make up the set. */
  datasets?: Dataset[];
  /** Array of events that are part of the asset. Each event can have per-event configuration. */
  events?: Event[];
  /** Read only object to reflect changes that have occurred on the Edge. Similar to Kubernetes status property for custom resources. */
  readonly status?: AssetStatus;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function assetPropertiesSerializer(item: AssetProperties): any {
  return {
    enabled: item["enabled"],
    externalAssetId: item["externalAssetId"],
    displayName: item["displayName"],
    description: item["description"],
    assetEndpointProfileRef: item["assetEndpointProfileRef"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    discoveredAssetRefs: !item["discoveredAssetRefs"]
      ? item["discoveredAssetRefs"]
      : item["discoveredAssetRefs"].map((p: any) => {
          return p;
        }),
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicSerializer(item["defaultTopic"]),
    datasets: !item["datasets"] ? item["datasets"] : datasetArraySerializer(item["datasets"]),
    events: !item["events"] ? item["events"] : eventArraySerializer(item["events"]),
  };
}

export function assetPropertiesDeserializer(item: any): AssetProperties {
  return {
    uuid: item["uuid"],
    enabled: item["enabled"],
    externalAssetId: item["externalAssetId"],
    displayName: item["displayName"],
    description: item["description"],
    assetEndpointProfileRef: item["assetEndpointProfileRef"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    discoveredAssetRefs: !item["discoveredAssetRefs"]
      ? item["discoveredAssetRefs"]
      : item["discoveredAssetRefs"].map((p: any) => {
          return p;
        }),
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicDeserializer(item["defaultTopic"]),
    datasets: !item["datasets"] ? item["datasets"] : datasetArrayDeserializer(item["datasets"]),
    events: !item["events"] ? item["events"] : eventArrayDeserializer(item["events"]),
    status: !item["status"] ? item["status"] : assetStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Object that describes the topic information. */
export interface Topic {
  /** The topic path for messages published to an MQTT broker. */
  path: string;
  /** When set to 'Keep', messages published to an MQTT broker will have the retain flag set. Default: 'Never'. */
  retain?: TopicRetainType;
}

export function topicSerializer(item: Topic): any {
  return { path: item["path"], retain: item["retain"] };
}

export function topicDeserializer(item: any): Topic {
  return {
    path: item["path"],
    retain: item["retain"],
  };
}

/** Topic retain types. */
export enum KnownTopicRetainType {
  /** Retain the messages. */
  Keep = "Keep",
  /** Never retain messages. */
  Never = "Never",
}

/**
 * Topic retain types. \
 * {@link KnownTopicRetainType} can be used interchangeably with TopicRetainType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Keep**: Retain the messages. \
 * **Never**: Never retain messages.
 */
export type TopicRetainType = string;

export function datasetArraySerializer(result: Array<Dataset>): any[] {
  return result.map((item) => {
    return datasetSerializer(item);
  });
}

export function datasetArrayDeserializer(result: Array<Dataset>): any[] {
  return result.map((item) => {
    return datasetDeserializer(item);
  });
}

/** Defines the dataset properties. */
export interface Dataset {
  /** Name of the dataset. */
  name: string;
  /** Stringified JSON that contains connector-specific JSON string that describes configuration for the specific dataset. */
  datasetConfiguration?: string;
  /** Object that describes the topic information for the specific dataset. */
  topic?: Topic;
  /** Array of data points that are part of the dataset. Each data point can have per-data point configuration. */
  dataPoints?: DataPoint[];
}

export function datasetSerializer(item: Dataset): any {
  return {
    name: item["name"],
    datasetConfiguration: item["datasetConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : dataPointArraySerializer(item["dataPoints"]),
  };
}

export function datasetDeserializer(item: any): Dataset {
  return {
    name: item["name"],
    datasetConfiguration: item["datasetConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : dataPointArrayDeserializer(item["dataPoints"]),
  };
}

export function dataPointArraySerializer(result: Array<DataPoint>): any[] {
  return result.map((item) => {
    return dataPointSerializer(item);
  });
}

export function dataPointArrayDeserializer(result: Array<DataPoint>): any[] {
  return result.map((item) => {
    return dataPointDeserializer(item);
  });
}

/** Defines the data point properties. */
export interface DataPoint extends DataPointBase {
  /** An indication of how the data point should be mapped to OpenTelemetry. */
  observabilityMode?: DataPointObservabilityMode;
}

export function dataPointSerializer(item: DataPoint): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    observabilityMode: item["observabilityMode"],
  };
}

export function dataPointDeserializer(item: any): DataPoint {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    observabilityMode: item["observabilityMode"],
  };
}

/** Defines the data point observability mode. */
export enum KnownDataPointObservabilityMode {
  /** No mapping to OpenTelemetry. */
  None = "None",
  /** Map as counter to OpenTelemetry. */
  Counter = "Counter",
  /** Map as gauge to OpenTelemetry. */
  Gauge = "Gauge",
  /** Map as histogram to OpenTelemetry. */
  Histogram = "Histogram",
  /** Map as log to OpenTelemetry. */
  Log = "Log",
}

/**
 * Defines the data point observability mode. \
 * {@link KnownDataPointObservabilityMode} can be used interchangeably with DataPointObservabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No mapping to OpenTelemetry. \
 * **Counter**: Map as counter to OpenTelemetry. \
 * **Gauge**: Map as gauge to OpenTelemetry. \
 * **Histogram**: Map as histogram to OpenTelemetry. \
 * **Log**: Map as log to OpenTelemetry.
 */
export type DataPointObservabilityMode = string;

export function eventArraySerializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventSerializer(item);
  });
}

export function eventArrayDeserializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventDeserializer(item);
  });
}

/** Defines the event properties. */
export interface Event extends EventBase {
  /** An indication of how the event should be mapped to OpenTelemetry. */
  observabilityMode?: EventObservabilityMode;
}

export function eventSerializer(item: Event): any {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
    observabilityMode: item["observabilityMode"],
  };
}

export function eventDeserializer(item: any): Event {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
    observabilityMode: item["observabilityMode"],
  };
}

/** Defines the event observability mode. */
export enum KnownEventObservabilityMode {
  /** No mapping to OpenTelemetry. */
  None = "None",
  /** Map as log to OpenTelemetry. */
  Log = "Log",
}

/**
 * Defines the event observability mode. \
 * {@link KnownEventObservabilityMode} can be used interchangeably with EventObservabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No mapping to OpenTelemetry. \
 * **Log**: Map as log to OpenTelemetry.
 */
export type EventObservabilityMode = string;

/** Defines the asset status properties. */
export interface AssetStatus {
  /** Array object to transfer and persist errors that originate from the Edge. */
  readonly errors?: AssetStatusError[];
  /** A read only incremental counter indicating the number of times the configuration has been modified from the perspective of the current actual (Edge) state of the Asset. Edge would be the only writer of this value and would sync back up to the cloud. In steady state, this should equal version. */
  readonly version?: number;
  /** Array of dataset statuses that describe the status of each dataset. */
  readonly datasets?: AssetStatusDataset[];
  /** Array of event statuses that describe the status of each event. */
  readonly events?: AssetStatusEvent[];
}

export function assetStatusDeserializer(item: any): AssetStatus {
  return {
    errors: !item["errors"] ? item["errors"] : assetStatusErrorArrayDeserializer(item["errors"]),
    version: item["version"],
    datasets: !item["datasets"]
      ? item["datasets"]
      : assetStatusDatasetArrayDeserializer(item["datasets"]),
    events: !item["events"] ? item["events"] : assetStatusEventArrayDeserializer(item["events"]),
  };
}

export function assetStatusErrorArrayDeserializer(result: Array<AssetStatusError>): any[] {
  return result.map((item) => {
    return assetStatusErrorDeserializer(item);
  });
}

/** Defines the asset status error properties. */
export interface AssetStatusError {
  /** Error code for classification of errors (ex: 400, 404, 500, etc.). */
  readonly code?: number;
  /** Human readable helpful error message to provide additional context for error (ex: “capability Id 'foo' does not exist”). */
  readonly message?: string;
}

export function assetStatusErrorDeserializer(item: any): AssetStatusError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function assetStatusDatasetArrayDeserializer(result: Array<AssetStatusDataset>): any[] {
  return result.map((item) => {
    return assetStatusDatasetDeserializer(item);
  });
}

/** Defines the asset status dataset properties. */
export interface AssetStatusDataset {
  /** The name of the dataset. Must be unique within the status.datasets array. This name is used to correlate between the spec and status dataset information. */
  readonly name: string;
  /** The message schema reference object. */
  readonly messageSchemaReference?: MessageSchemaReference;
}

export function assetStatusDatasetDeserializer(item: any): AssetStatusDataset {
  return {
    name: item["name"],
    messageSchemaReference: !item["messageSchemaReference"]
      ? item["messageSchemaReference"]
      : messageSchemaReferenceDeserializer(item["messageSchemaReference"]),
  };
}

/** Defines the message schema reference properties. */
export interface MessageSchemaReference {
  /** The message schema registry namespace. */
  readonly schemaRegistryNamespace: string;
  /** The message schema name. */
  readonly schemaName: string;
  /** The message schema version. */
  readonly schemaVersion: string;
}

export function messageSchemaReferenceDeserializer(item: any): MessageSchemaReference {
  return {
    schemaRegistryNamespace: item["schemaRegistryNamespace"],
    schemaName: item["schemaName"],
    schemaVersion: item["schemaVersion"],
  };
}

export function assetStatusEventArrayDeserializer(result: Array<AssetStatusEvent>): any[] {
  return result.map((item) => {
    return assetStatusEventDeserializer(item);
  });
}

/** Defines the asset status event properties. */
export interface AssetStatusEvent {
  /** The name of the event. Must be unique within the status.events array. This name is used to correlate between the spec and status event information. */
  readonly name: string;
  /** The message schema reference object. */
  readonly messageSchemaReference?: MessageSchemaReference;
}

export function assetStatusEventDeserializer(item: any): AssetStatusEvent {
  return {
    name: item["name"],
    messageSchemaReference: !item["messageSchemaReference"]
      ? item["messageSchemaReference"]
      : messageSchemaReferenceDeserializer(item["messageSchemaReference"]),
  };
}

/** The provisioning status of the resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource has been accepted by the server. */
  Accepted = "Accepted",
  /** Resource is deleting. */
  Deleting = "Deleting",
}

/**
 * The provisioning status of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Resource has been accepted by the server. \
 * **Deleting**: Resource is deleting.
 */
export type ProvisioningState = string;

/** The extended location. */
export interface ExtendedLocation {
  /** The extended location type. */
  type: string;
  /** The extended location name. */
  name: string;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { type: item["type"], name: item["name"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Defines the data point properties. */
export interface DataPointBase {
  /** The name of the data point. */
  name: string;
  /** The address of the source of the data in the asset (e.g. URL) so that a client can access the data source on the asset. */
  dataSource: string;
  /** Stringified JSON that contains connector-specific configuration for the data point. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  dataPointConfiguration?: string;
}

export function dataPointBaseSerializer(item: DataPointBase): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
  };
}

export function dataPointBaseDeserializer(item: any): DataPointBase {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
  };
}

/** Defines the event properties. */
export interface EventBase {
  /** The name of the event. */
  name: string;
  /** The address of the notifier of the event in the asset (e.g. URL) so that a client can access the event on the asset. */
  eventNotifier: string;
  /** Stringified JSON that contains connector-specific configuration for the event. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventConfiguration?: string;
  /** Object that describes the topic information for the specific event. */
  topic?: Topic;
}

export function eventBaseSerializer(item: EventBase): any {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
  };
}

export function eventBaseDeserializer(item: any): EventBase {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
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

/** The type used for update operations of the Asset. */
export interface AssetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AssetUpdateProperties;
}

export function assetUpdateSerializer(item: AssetUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : assetUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Asset. */
export interface AssetUpdateProperties {
  /** Enabled/Disabled status of the asset. */
  enabled?: boolean;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the asset. */
  description?: string;
  /** Asset manufacturer name. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model name. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Revision number of the hardware. */
  hardwareRevision?: string;
  /** Revision number of the software. */
  softwareRevision?: string;
  /** Reference to the documentation. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Object that describes the default topic information for the asset. */
  defaultTopic?: Topic;
  /** Array of datasets that are part of the asset. Each dataset describes the data points that make up the set. */
  datasets?: Dataset[];
  /** Array of events that are part of the asset. Each event can have per-event configuration. */
  events?: Event[];
}

export function assetUpdatePropertiesSerializer(item: AssetUpdateProperties): any {
  return {
    enabled: item["enabled"],
    displayName: item["displayName"],
    description: item["description"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicSerializer(item["defaultTopic"]),
    datasets: !item["datasets"] ? item["datasets"] : datasetArraySerializer(item["datasets"]),
    events: !item["events"] ? item["events"] : eventArraySerializer(item["events"]),
  };
}

/** The response of a Asset list operation. */
export interface _AssetListResult {
  /** The Asset items on this page */
  value: Asset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assetListResultDeserializer(item: any): _AssetListResult {
  return {
    value: assetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assetArraySerializer(result: Array<Asset>): any[] {
  return result.map((item) => {
    return assetSerializer(item);
  });
}

export function assetArrayDeserializer(result: Array<Asset>): any[] {
  return result.map((item) => {
    return assetDeserializer(item);
  });
}

/** Asset Endpoint Profile definition. */
export interface AssetEndpointProfile extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AssetEndpointProfileProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function assetEndpointProfileSerializer(item: AssetEndpointProfile): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : assetEndpointProfilePropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function assetEndpointProfileDeserializer(item: any): AssetEndpointProfile {
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
      : assetEndpointProfilePropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the Asset Endpoint Profile properties. */
export interface AssetEndpointProfileProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** The local valid URI specifying the network address/DNS name of a southbound device. The scheme part of the targetAddress URI specifies the type of the device. The additionalConfiguration field holds further connector type specific configuration. */
  targetAddress: string;
  /** Defines the configuration for the connector type that is being used with the endpoint profile. */
  endpointProfileType: string;
  /** Defines the client authentication mechanism to the server. */
  authentication?: Authentication;
  /** Stringified JSON that contains connectivity type specific further configuration (e.g. OPC UA, Modbus, ONVIF). */
  additionalConfiguration?: string;
  /** Reference to a discovered asset endpoint profile. Populated only if the asset endpoint profile has been created from discovery flow. Discovered asset endpoint profile name must be provided. */
  discoveredAssetEndpointProfileRef?: string;
  /** Read only object to reflect changes that have occurred on the Edge. Similar to Kubernetes status property for custom resources. */
  readonly status?: AssetEndpointProfileStatus;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function assetEndpointProfilePropertiesSerializer(
  item: AssetEndpointProfileProperties,
): any {
  return {
    targetAddress: item["targetAddress"],
    endpointProfileType: item["endpointProfileType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationSerializer(item["authentication"]),
    additionalConfiguration: item["additionalConfiguration"],
    discoveredAssetEndpointProfileRef: item["discoveredAssetEndpointProfileRef"],
  };
}

export function assetEndpointProfilePropertiesDeserializer(
  item: any,
): AssetEndpointProfileProperties {
  return {
    uuid: item["uuid"],
    targetAddress: item["targetAddress"],
    endpointProfileType: item["endpointProfileType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationDeserializer(item["authentication"]),
    additionalConfiguration: item["additionalConfiguration"],
    discoveredAssetEndpointProfileRef: item["discoveredAssetEndpointProfileRef"],
    status: !item["status"]
      ? item["status"]
      : assetEndpointProfileStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Definition of the client authentication mechanism to the server. */
export interface Authentication {
  /** Defines the method to authenticate the user of the client at the server. */
  method: AuthenticationMethod;
  /** Defines the username and password references when UsernamePassword user authentication mode is selected. */
  usernamePasswordCredentials?: UsernamePasswordCredentials;
  /** Defines the certificate reference when Certificate user authentication mode is selected. */
  x509Credentials?: X509Credentials;
}

export function authenticationSerializer(item: Authentication): any {
  return {
    method: item["method"],
    usernamePasswordCredentials: !item["usernamePasswordCredentials"]
      ? item["usernamePasswordCredentials"]
      : usernamePasswordCredentialsSerializer(item["usernamePasswordCredentials"]),
    x509Credentials: !item["x509Credentials"]
      ? item["x509Credentials"]
      : x509CredentialsSerializer(item["x509Credentials"]),
  };
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    method: item["method"],
    usernamePasswordCredentials: !item["usernamePasswordCredentials"]
      ? item["usernamePasswordCredentials"]
      : usernamePasswordCredentialsDeserializer(item["usernamePasswordCredentials"]),
    x509Credentials: !item["x509Credentials"]
      ? item["x509Credentials"]
      : x509CredentialsDeserializer(item["x509Credentials"]),
  };
}

/** The method to authenticate the user of the client at the server. */
export enum KnownAuthenticationMethod {
  /** The user authentication method is anonymous. */
  Anonymous = "Anonymous",
  /** The user authentication method is an x509 certificate. */
  Certificate = "Certificate",
  /** The user authentication method is a username and password. */
  UsernamePassword = "UsernamePassword",
}

/**
 * The method to authenticate the user of the client at the server. \
 * {@link KnownAuthenticationMethod} can be used interchangeably with AuthenticationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Anonymous**: The user authentication method is anonymous. \
 * **Certificate**: The user authentication method is an x509 certificate. \
 * **UsernamePassword**: The user authentication method is a username and password.
 */
export type AuthenticationMethod = string;

/** The credentials for authentication mode UsernamePassword. */
export interface UsernamePasswordCredentials {
  /** The name of the secret containing the username. */
  usernameSecretName: string;
  /** The name of the secret containing the password. */
  passwordSecretName: string;
}

export function usernamePasswordCredentialsSerializer(item: UsernamePasswordCredentials): any {
  return {
    usernameSecretName: item["usernameSecretName"],
    passwordSecretName: item["passwordSecretName"],
  };
}

export function usernamePasswordCredentialsDeserializer(item: any): UsernamePasswordCredentials {
  return {
    usernameSecretName: item["usernameSecretName"],
    passwordSecretName: item["passwordSecretName"],
  };
}

/** The x509 certificate for authentication mode Certificate. */
export interface X509Credentials {
  /** The name of the secret containing the certificate and private key (e.g. stored as .der/.pem or .der/.pfx). */
  certificateSecretName: string;
}

export function x509CredentialsSerializer(item: X509Credentials): any {
  return { certificateSecretName: item["certificateSecretName"] };
}

export function x509CredentialsDeserializer(item: any): X509Credentials {
  return {
    certificateSecretName: item["certificateSecretName"],
  };
}

/** Defines the asset endpoint profile status properties. */
export interface AssetEndpointProfileStatus {
  /** Array object to transfer and persist errors that originate from the Edge. */
  readonly errors?: AssetEndpointProfileStatusError[];
}

export function assetEndpointProfileStatusDeserializer(item: any): AssetEndpointProfileStatus {
  return {
    errors: !item["errors"]
      ? item["errors"]
      : assetEndpointProfileStatusErrorArrayDeserializer(item["errors"]),
  };
}

export function assetEndpointProfileStatusErrorArrayDeserializer(
  result: Array<AssetEndpointProfileStatusError>,
): any[] {
  return result.map((item) => {
    return assetEndpointProfileStatusErrorDeserializer(item);
  });
}

/** Defines the asset endpoint profile status error properties. */
export interface AssetEndpointProfileStatusError {
  /** Error code for classification of errors (ex: 400, 404, 500, etc.). */
  readonly code?: number;
  /** Human readable helpful error message to provide additional context for error (ex: “targetAddress 'foo' is not a valid url”). */
  readonly message?: string;
}

export function assetEndpointProfileStatusErrorDeserializer(
  item: any,
): AssetEndpointProfileStatusError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The type used for update operations of the AssetEndpointProfile. */
export interface AssetEndpointProfileUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AssetEndpointProfileUpdateProperties;
}

export function assetEndpointProfileUpdateSerializer(item: AssetEndpointProfileUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : assetEndpointProfileUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AssetEndpointProfile. */
export interface AssetEndpointProfileUpdateProperties {
  /** The local valid URI specifying the network address/DNS name of a southbound device. The scheme part of the targetAddress URI specifies the type of the device. The additionalConfiguration field holds further connector type specific configuration. */
  targetAddress?: string;
  /** Defines the configuration for the connector type that is being used with the endpoint profile. */
  endpointProfileType?: string;
  /** Defines the client authentication mechanism to the server. */
  authentication?: Authentication;
  /** Stringified JSON that contains connectivity type specific further configuration (e.g. OPC UA, Modbus, ONVIF). */
  additionalConfiguration?: string;
}

export function assetEndpointProfileUpdatePropertiesSerializer(
  item: AssetEndpointProfileUpdateProperties,
): any {
  return {
    targetAddress: item["targetAddress"],
    endpointProfileType: item["endpointProfileType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationSerializer(item["authentication"]),
    additionalConfiguration: item["additionalConfiguration"],
  };
}

/** The response of a AssetEndpointProfile list operation. */
export interface _AssetEndpointProfileListResult {
  /** The AssetEndpointProfile items on this page */
  value: AssetEndpointProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assetEndpointProfileListResultDeserializer(
  item: any,
): _AssetEndpointProfileListResult {
  return {
    value: assetEndpointProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assetEndpointProfileArraySerializer(result: Array<AssetEndpointProfile>): any[] {
  return result.map((item) => {
    return assetEndpointProfileSerializer(item);
  });
}

export function assetEndpointProfileArrayDeserializer(result: Array<AssetEndpointProfile>): any[] {
  return result.map((item) => {
    return assetEndpointProfileDeserializer(item);
  });
}

/** billingContainer Model as Azure resource whose sole purpose is to keep track of billables resources under a subscription. */
export interface BillingContainer extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BillingContainerProperties;
  /** Resource ETag */
  readonly etag?: string;
}

export function billingContainerDeserializer(item: any): BillingContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingContainerPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Defines the billingContainer properties. */
export interface BillingContainerProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function billingContainerPropertiesDeserializer(item: any): BillingContainerProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

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

/** The response of a BillingContainer list operation. */
export interface _BillingContainerListResult {
  /** The BillingContainer items on this page */
  value: BillingContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingContainerListResultDeserializer(item: any): _BillingContainerListResult {
  return {
    value: billingContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingContainerArrayDeserializer(result: Array<BillingContainer>): any[] {
  return result.map((item) => {
    return billingContainerDeserializer(item);
  });
}

/** Namespace definition. */
export interface Namespace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NamespaceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
}

export function namespaceSerializer(item: Namespace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : namespacePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

export function namespaceDeserializer(item: any): Namespace {
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
      : namespacePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The namespace properties model. */
export interface NamespaceProperties {
  /** Globally unique, immutable, non-reusable ID. */
  readonly uuid?: string;
  /** Assigned and unassigned messaging endpoints. */
  messaging?: Messaging;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function namespacePropertiesSerializer(item: NamespaceProperties): any {
  return {
    messaging: !item["messaging"] ? item["messaging"] : messagingSerializer(item["messaging"]),
  };
}

export function namespacePropertiesDeserializer(item: any): NamespaceProperties {
  return {
    uuid: item["uuid"],
    messaging: !item["messaging"] ? item["messaging"] : messagingDeserializer(item["messaging"]),
    provisioningState: item["provisioningState"],
  };
}

/** The namespace messaging endpoints model. */
export interface Messaging {
  /** Dictionary of messaging endpoints. */
  endpoints?: Record<string, MessagingEndpoint>;
}

export function messagingSerializer(item: Messaging): any {
  return {
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : messagingEndpointRecordSerializer(item["endpoints"]),
  };
}

export function messagingDeserializer(item: any): Messaging {
  return {
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : messagingEndpointRecordDeserializer(item["endpoints"]),
  };
}

export function messagingEndpointRecordSerializer(
  item: Record<string, MessagingEndpoint>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : messagingEndpointSerializer(item[key]);
  });
  return result;
}

export function messagingEndpointRecordDeserializer(
  item: Record<string, any>,
): Record<string, MessagingEndpoint> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : messagingEndpointDeserializer(item[key]);
  });
  return result;
}

/** Namespace messaging endpoint model used by a device to connect to a service. */
export interface MessagingEndpoint {
  /** Type of connection used for messaging endpoint. */
  endpointType?: string;
  /** The endpoint address to connect to. */
  address: string;
  /** The messaging endpoint Azure resource Id. */
  resourceId?: string;
}

export function messagingEndpointSerializer(item: MessagingEndpoint): any {
  return {
    endpointType: item["endpointType"],
    address: item["address"],
    resourceId: item["resourceId"],
  };
}

export function messagingEndpointDeserializer(item: any): MessagingEndpoint {
  return {
    endpointType: item["endpointType"],
    address: item["address"],
    resourceId: item["resourceId"],
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

/** The type used for update operations of the Namespace. */
export interface NamespaceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: NamespaceUpdateProperties;
}

export function namespaceUpdateSerializer(item: NamespaceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Namespace. */
export interface NamespaceUpdateProperties {
  /** Assigned and unassigned messaging endpoints. */
  messaging?: Messaging;
}

export function namespaceUpdatePropertiesSerializer(item: NamespaceUpdateProperties): any {
  return {
    messaging: !item["messaging"] ? item["messaging"] : messagingSerializer(item["messaging"]),
  };
}

/** The response of a Namespace list operation. */
export interface _NamespaceListResult {
  /** The Namespace items on this page */
  value: Namespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespaceListResultDeserializer(item: any): _NamespaceListResult {
  return {
    value: namespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceArraySerializer(result: Array<Namespace>): any[] {
  return result.map((item) => {
    return namespaceSerializer(item);
  });
}

export function namespaceArrayDeserializer(result: Array<Namespace>): any[] {
  return result.map((item) => {
    return namespaceDeserializer(item);
  });
}

/** Request body for the migrate resources operation in to Namespace resource. */
export interface NamespaceMigrateRequest {
  /** Scope of the migrate resources operation. */
  scope?: Scope;
  /** List of asset resources to be migrated. */
  resourceIds?: string[];
}

export function namespaceMigrateRequestSerializer(item: NamespaceMigrateRequest): any {
  return {
    scope: item["scope"],
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Scope of the migrate resources operation. */
export enum KnownScope {
  /** Scoping the migration to resourceIds provided */
  Resources = "Resources",
}

/**
 * Scope of the migrate resources operation. \
 * {@link KnownScope} can be used interchangeably with Scope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resources**: Scoping the migration to resourceIds provided
 */
export type Scope = string;

export function errorDetailsArrayDeserializer(result: Array<ErrorDetails>): any[] {
  return result.map((item) => {
    return errorDetailsDeserializer(item);
  });
}

/** Defines the error details properties. */
export interface ErrorDetails {
  /** Multi-part error code for classification and root causing of errors (ex: 400.200.100.432). */
  readonly code?: string;
  /** Human-readable helpful error message to provide additional context for error (ex: “Authentication method not supported”). */
  readonly message?: string;
  /** Human-readable helpful detailed text context for debugging (ex: “The following mechanisms are supported...”). */
  readonly info?: string;
  /** Unique identifier for the transaction to aid in debugging. */
  readonly correlationId?: string;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    info: item["info"],
    correlationId: item["correlationId"],
  };
}

/** Asset definition. */
export interface NamespaceAsset extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NamespaceAssetProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function namespaceAssetSerializer(item: NamespaceAsset): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceAssetPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function namespaceAssetDeserializer(item: any): NamespaceAsset {
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
      : namespaceAssetPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the asset properties. */
export interface NamespaceAssetProperties {
  /** Globally unique, immutable, non-reusable ID. */
  readonly uuid?: string;
  /** Enabled/disabled status of the asset. */
  enabled?: boolean;
  /** Asset ID provided by the customer. */
  externalAssetId?: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the asset. */
  description?: string;
  /** Reference to the device that provides data for this asset. Must provide device name & endpoint on the device to use. */
  deviceRef: DeviceRef;
  /** URIs or type definition IDs. */
  assetTypeRefs?: string[];
  /** An integer that is incremented each time the resource is modified. */
  readonly version?: number;
  /** A timestamp (in UTC) that is updated each time the resource is modified. */
  readonly lastTransitionTime?: Date;
  /** Asset manufacturer. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Asset hardware revision number. */
  hardwareRevision?: string;
  /** Asset software revision number. */
  softwareRevision?: string;
  /** Asset documentation reference. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Reference to a list of discovered assets. Populated only if the asset has been created from discovery flow. Discovered asset names must be provided. */
  discoveredAssetRefs?: string[];
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all streams. Each stream can have its own configuration that overrides the default settings here. */
  defaultStreamsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all management groups. Each management group can have its own configuration that overrides the default settings here. */
  defaultManagementGroupsConfiguration?: string;
  /** Default destinations for a dataset. */
  defaultDatasetsDestinations?: DatasetDestinationUnion[];
  /** Default destinations for an event. */
  defaultEventsDestinations?: EventDestinationUnion[];
  /** Default destinations for a stream. */
  defaultStreamsDestinations?: StreamDestinationUnion[];
  /** Array of datasets that are part of the asset. Each dataset describes the data points that make up the set. */
  datasets?: NamespaceDataset[];
  /** Array of event groups that are part of the asset. Each event group can have per-event group configuration. */
  eventGroups?: NamespaceEventGroup[];
  /** Array of streams that are part of the asset. Each stream can have a per-stream configuration. */
  streams?: NamespaceStream[];
  /** Array of management groups that are part of the asset. Each management group can have a per-group configuration. */
  managementGroups?: ManagementGroup[];
  /** Read only object to reflect changes that have occurred on the Edge. Similar to Kubernetes status property for custom resources. */
  readonly status?: NamespaceAssetStatus;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function namespaceAssetPropertiesSerializer(item: NamespaceAssetProperties): any {
  return {
    enabled: item["enabled"],
    externalAssetId: item["externalAssetId"],
    displayName: item["displayName"],
    description: item["description"],
    deviceRef: deviceRefSerializer(item["deviceRef"]),
    assetTypeRefs: !item["assetTypeRefs"]
      ? item["assetTypeRefs"]
      : item["assetTypeRefs"].map((p: any) => {
          return p;
        }),
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    discoveredAssetRefs: !item["discoveredAssetRefs"]
      ? item["discoveredAssetRefs"]
      : item["discoveredAssetRefs"].map((p: any) => {
          return p;
        }),
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultStreamsConfiguration: item["defaultStreamsConfiguration"],
    defaultManagementGroupsConfiguration: item["defaultManagementGroupsConfiguration"],
    defaultDatasetsDestinations: !item["defaultDatasetsDestinations"]
      ? item["defaultDatasetsDestinations"]
      : datasetDestinationUnionArraySerializer(item["defaultDatasetsDestinations"]),
    defaultEventsDestinations: !item["defaultEventsDestinations"]
      ? item["defaultEventsDestinations"]
      : eventDestinationUnionArraySerializer(item["defaultEventsDestinations"]),
    defaultStreamsDestinations: !item["defaultStreamsDestinations"]
      ? item["defaultStreamsDestinations"]
      : streamDestinationUnionArraySerializer(item["defaultStreamsDestinations"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : namespaceDatasetArraySerializer(item["datasets"]),
    eventGroups: !item["eventGroups"]
      ? item["eventGroups"]
      : namespaceEventGroupArraySerializer(item["eventGroups"]),
    streams: !item["streams"] ? item["streams"] : namespaceStreamArraySerializer(item["streams"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : managementGroupArraySerializer(item["managementGroups"]),
  };
}

export function namespaceAssetPropertiesDeserializer(item: any): NamespaceAssetProperties {
  return {
    uuid: item["uuid"],
    enabled: item["enabled"],
    externalAssetId: item["externalAssetId"],
    displayName: item["displayName"],
    description: item["description"],
    deviceRef: deviceRefDeserializer(item["deviceRef"]),
    assetTypeRefs: !item["assetTypeRefs"]
      ? item["assetTypeRefs"]
      : item["assetTypeRefs"].map((p: any) => {
          return p;
        }),
    version: item["version"],
    lastTransitionTime: !item["lastTransitionTime"]
      ? item["lastTransitionTime"]
      : new Date(item["lastTransitionTime"]),
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    discoveredAssetRefs: !item["discoveredAssetRefs"]
      ? item["discoveredAssetRefs"]
      : item["discoveredAssetRefs"].map((p: any) => {
          return p;
        }),
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultStreamsConfiguration: item["defaultStreamsConfiguration"],
    defaultManagementGroupsConfiguration: item["defaultManagementGroupsConfiguration"],
    defaultDatasetsDestinations: !item["defaultDatasetsDestinations"]
      ? item["defaultDatasetsDestinations"]
      : datasetDestinationUnionArrayDeserializer(item["defaultDatasetsDestinations"]),
    defaultEventsDestinations: !item["defaultEventsDestinations"]
      ? item["defaultEventsDestinations"]
      : eventDestinationUnionArrayDeserializer(item["defaultEventsDestinations"]),
    defaultStreamsDestinations: !item["defaultStreamsDestinations"]
      ? item["defaultStreamsDestinations"]
      : streamDestinationUnionArrayDeserializer(item["defaultStreamsDestinations"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : namespaceDatasetArrayDeserializer(item["datasets"]),
    eventGroups: !item["eventGroups"]
      ? item["eventGroups"]
      : namespaceEventGroupArrayDeserializer(item["eventGroups"]),
    streams: !item["streams"] ? item["streams"] : namespaceStreamArrayDeserializer(item["streams"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : managementGroupArrayDeserializer(item["managementGroups"]),
    status: !item["status"] ? item["status"] : namespaceAssetStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Defines which device and endpoint to use for this asset */
export interface DeviceRef {
  /** Name of the device resource */
  deviceName: string;
  /** The name of endpoint to use */
  endpointName: string;
}

export function deviceRefSerializer(item: DeviceRef): any {
  return { deviceName: item["deviceName"], endpointName: item["endpointName"] };
}

export function deviceRefDeserializer(item: any): DeviceRef {
  return {
    deviceName: item["deviceName"],
    endpointName: item["endpointName"],
  };
}

export function datasetDestinationUnionArraySerializer(
  result: Array<DatasetDestinationUnion>,
): any[] {
  return result.map((item) => {
    return datasetDestinationUnionSerializer(item);
  });
}

export function datasetDestinationUnionArrayDeserializer(
  result: Array<DatasetDestinationUnion>,
): any[] {
  return result.map((item) => {
    return datasetDestinationUnionDeserializer(item);
  });
}

/** The type of the destination. */
export interface DatasetDestination {
  /** Target destination. */
  /** The discriminator possible values: Mqtt, BrokerStateStore, Storage */
  target?: DatasetDestinationTarget;
}

export function datasetDestinationSerializer(item: DatasetDestination): any {
  return { target: item["target"] };
}

export function datasetDestinationDeserializer(item: any): DatasetDestination {
  return {
    target: item["target"],
  };
}

/** Alias for DatasetDestinationUnion */
export type DatasetDestinationUnion =
  | DatasetMqttDestination
  | DatasetBrokerStateStoreDestination
  | DatasetStorageDestination
  | DatasetDestination;

export function datasetDestinationUnionSerializer(item: DatasetDestinationUnion): any {
  switch (item.target) {
    case "Mqtt":
      return datasetMqttDestinationSerializer(item as DatasetMqttDestination);

    case "BrokerStateStore":
      return datasetBrokerStateStoreDestinationSerializer(
        item as DatasetBrokerStateStoreDestination,
      );

    case "Storage":
      return datasetStorageDestinationSerializer(item as DatasetStorageDestination);

    default:
      return datasetDestinationSerializer(item);
  }
}

export function datasetDestinationUnionDeserializer(item: any): DatasetDestinationUnion {
  switch (item.target) {
    case "Mqtt":
      return datasetMqttDestinationDeserializer(item as DatasetMqttDestination);

    case "BrokerStateStore":
      return datasetBrokerStateStoreDestinationDeserializer(
        item as DatasetBrokerStateStoreDestination,
      );

    case "Storage":
      return datasetStorageDestinationDeserializer(item as DatasetStorageDestination);

    default:
      return datasetDestinationDeserializer(item);
  }
}

/** The set of supported dataset destinations for an asset. */
export enum KnownDatasetDestinationTarget {
  /** MQTT target. */
  Mqtt = "Mqtt",
  /** Broker State Store target. */
  BrokerStateStore = "BrokerStateStore",
  /** Storage target. */
  Storage = "Storage",
}

/**
 * The set of supported dataset destinations for an asset. \
 * {@link KnownDatasetDestinationTarget} can be used interchangeably with DatasetDestinationTarget,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mqtt**: MQTT target. \
 * **BrokerStateStore**: Broker State Store target. \
 * **Storage**: Storage target.
 */
export type DatasetDestinationTarget = string;

/** The type for a MQTT destination. */
export interface DatasetMqttDestination extends DatasetDestination {
  /** The MQTT destination type. */
  target: "Mqtt";
  /** The MQTT destination configuration. */
  configuration: MqttDestinationConfiguration;
}

export function datasetMqttDestinationSerializer(item: DatasetMqttDestination): any {
  return {
    target: item["target"],
    configuration: mqttDestinationConfigurationSerializer(item["configuration"]),
  };
}

export function datasetMqttDestinationDeserializer(item: any): DatasetMqttDestination {
  return {
    target: item["target"],
    configuration: mqttDestinationConfigurationDeserializer(item["configuration"]),
  };
}

/** The configuration for a MQTT destination. */
export interface MqttDestinationConfiguration {
  /** The MQTT topic. */
  topic: string;
  /** When set to 'Keep', messages published to an MQTT broker will have the retain flag set. Default: 'Never'. */
  retain?: TopicRetainType;
  /** The MQTT QoS setting. Defaults to QoS 1. */
  qos?: MqttDestinationQos;
  /** The MQTT TTL setting. */
  ttl?: number;
}

export function mqttDestinationConfigurationSerializer(item: MqttDestinationConfiguration): any {
  return {
    topic: item["topic"],
    retain: item["retain"],
    qos: item["qos"],
    ttl: item["ttl"],
  };
}

export function mqttDestinationConfigurationDeserializer(item: any): MqttDestinationConfiguration {
  return {
    topic: item["topic"],
    retain: item["retain"],
    qos: item["qos"],
    ttl: item["ttl"],
  };
}

/** The set of supported QoS types for a MQTT destination. */
export enum KnownMqttDestinationQos {
  /** QoS 0. */
  Qos0 = "Qos0",
  /** QoS 1. */
  Qos1 = "Qos1",
}

/**
 * The set of supported QoS types for a MQTT destination. \
 * {@link KnownMqttDestinationQos} can be used interchangeably with MqttDestinationQos,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Qos0**: QoS 0. \
 * **Qos1**: QoS 1.
 */
export type MqttDestinationQos = string;

/** The type for a MQTT broker state store destination. */
export interface DatasetBrokerStateStoreDestination extends DatasetDestination {
  /** The MQTT broker state store destination target. */
  target: "BrokerStateStore";
  /** The MQTT broker state store destination configuration. */
  configuration: BrokerStateStoreDestinationConfiguration;
}

export function datasetBrokerStateStoreDestinationSerializer(
  item: DatasetBrokerStateStoreDestination,
): any {
  return {
    target: item["target"],
    configuration: brokerStateStoreDestinationConfigurationSerializer(item["configuration"]),
  };
}

export function datasetBrokerStateStoreDestinationDeserializer(
  item: any,
): DatasetBrokerStateStoreDestination {
  return {
    target: item["target"],
    configuration: brokerStateStoreDestinationConfigurationDeserializer(item["configuration"]),
  };
}

/** The configuration for a MQTT broker state store destination. */
export interface BrokerStateStoreDestinationConfiguration {
  /** The MQTT broker state store destination key. */
  key: string;
}

export function brokerStateStoreDestinationConfigurationSerializer(
  item: BrokerStateStoreDestinationConfiguration,
): any {
  return { key: item["key"] };
}

export function brokerStateStoreDestinationConfigurationDeserializer(
  item: any,
): BrokerStateStoreDestinationConfiguration {
  return {
    key: item["key"],
  };
}

/** The type for a storage destination. */
export interface DatasetStorageDestination extends DatasetDestination {
  /** The storage destination type. */
  target: "Storage";
  /** The storage destination configuration. */
  configuration: StorageDestinationConfiguration;
}

export function datasetStorageDestinationSerializer(item: DatasetStorageDestination): any {
  return {
    target: item["target"],
    configuration: storageDestinationConfigurationSerializer(item["configuration"]),
  };
}

export function datasetStorageDestinationDeserializer(item: any): DatasetStorageDestination {
  return {
    target: item["target"],
    configuration: storageDestinationConfigurationDeserializer(item["configuration"]),
  };
}

/** The configuration for a storage destination. */
export interface StorageDestinationConfiguration {
  /** The storage destination path. */
  path: string;
}

export function storageDestinationConfigurationSerializer(
  item: StorageDestinationConfiguration,
): any {
  return { path: item["path"] };
}

export function storageDestinationConfigurationDeserializer(
  item: any,
): StorageDestinationConfiguration {
  return {
    path: item["path"],
  };
}

export function eventDestinationUnionArraySerializer(result: Array<EventDestinationUnion>): any[] {
  return result.map((item) => {
    return eventDestinationUnionSerializer(item);
  });
}

export function eventDestinationUnionArrayDeserializer(
  result: Array<EventDestinationUnion>,
): any[] {
  return result.map((item) => {
    return eventDestinationUnionDeserializer(item);
  });
}

/** The type of the destination. */
export interface EventDestination {
  /** Target destination. */
  /** The discriminator possible values: Mqtt, Storage */
  target?: EventDestinationTarget;
}

export function eventDestinationSerializer(item: EventDestination): any {
  return { target: item["target"] };
}

export function eventDestinationDeserializer(item: any): EventDestination {
  return {
    target: item["target"],
  };
}

/** Alias for EventDestinationUnion */
export type EventDestinationUnion =
  | EventMqttDestination
  | EventStorageDestination
  | EventDestination;

export function eventDestinationUnionSerializer(item: EventDestinationUnion): any {
  switch (item.target) {
    case "Mqtt":
      return eventMqttDestinationSerializer(item as EventMqttDestination);

    case "Storage":
      return eventStorageDestinationSerializer(item as EventStorageDestination);

    default:
      return eventDestinationSerializer(item);
  }
}

export function eventDestinationUnionDeserializer(item: any): EventDestinationUnion {
  switch (item.target) {
    case "Mqtt":
      return eventMqttDestinationDeserializer(item as EventMqttDestination);

    case "Storage":
      return eventStorageDestinationDeserializer(item as EventStorageDestination);

    default:
      return eventDestinationDeserializer(item);
  }
}

/** The set of supported event destinations for an asset. */
export enum KnownEventDestinationTarget {
  /** MQTT target. */
  Mqtt = "Mqtt",
  /** Storage target. */
  Storage = "Storage",
}

/**
 * The set of supported event destinations for an asset. \
 * {@link KnownEventDestinationTarget} can be used interchangeably with EventDestinationTarget,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mqtt**: MQTT target. \
 * **Storage**: Storage target.
 */
export type EventDestinationTarget = string;

/** The type for a MQTT destination. */
export interface EventMqttDestination extends EventDestination {
  /** The MQTT destination type. */
  target: "Mqtt";
  /** The MQTT destination configuration. */
  configuration: MqttDestinationConfiguration;
}

export function eventMqttDestinationSerializer(item: EventMqttDestination): any {
  return {
    target: item["target"],
    configuration: mqttDestinationConfigurationSerializer(item["configuration"]),
  };
}

export function eventMqttDestinationDeserializer(item: any): EventMqttDestination {
  return {
    target: item["target"],
    configuration: mqttDestinationConfigurationDeserializer(item["configuration"]),
  };
}

/** The type for a storage destination. */
export interface EventStorageDestination extends EventDestination {
  /** The storage destination type. */
  target: "Storage";
  /** The storage destination configuration. */
  configuration: StorageDestinationConfiguration;
}

export function eventStorageDestinationSerializer(item: EventStorageDestination): any {
  return {
    target: item["target"],
    configuration: storageDestinationConfigurationSerializer(item["configuration"]),
  };
}

export function eventStorageDestinationDeserializer(item: any): EventStorageDestination {
  return {
    target: item["target"],
    configuration: storageDestinationConfigurationDeserializer(item["configuration"]),
  };
}

export function streamDestinationUnionArraySerializer(
  result: Array<StreamDestinationUnion>,
): any[] {
  return result.map((item) => {
    return streamDestinationUnionSerializer(item);
  });
}

export function streamDestinationUnionArrayDeserializer(
  result: Array<StreamDestinationUnion>,
): any[] {
  return result.map((item) => {
    return streamDestinationUnionDeserializer(item);
  });
}

/** The type of the destination. */
export interface StreamDestination {
  /** Target destination. */
  /** The discriminator possible values: Mqtt, Storage */
  target?: StreamDestinationTarget;
}

export function streamDestinationSerializer(item: StreamDestination): any {
  return { target: item["target"] };
}

export function streamDestinationDeserializer(item: any): StreamDestination {
  return {
    target: item["target"],
  };
}

/** Alias for StreamDestinationUnion */
export type StreamDestinationUnion =
  | StreamMqttDestination
  | StreamStorageDestination
  | StreamDestination;

export function streamDestinationUnionSerializer(item: StreamDestinationUnion): any {
  switch (item.target) {
    case "Mqtt":
      return streamMqttDestinationSerializer(item as StreamMqttDestination);

    case "Storage":
      return streamStorageDestinationSerializer(item as StreamStorageDestination);

    default:
      return streamDestinationSerializer(item);
  }
}

export function streamDestinationUnionDeserializer(item: any): StreamDestinationUnion {
  switch (item.target) {
    case "Mqtt":
      return streamMqttDestinationDeserializer(item as StreamMqttDestination);

    case "Storage":
      return streamStorageDestinationDeserializer(item as StreamStorageDestination);

    default:
      return streamDestinationDeserializer(item);
  }
}

/** The set of supported stream destinations for an asset. */
export enum KnownStreamDestinationTarget {
  /** MQTT target. */
  Mqtt = "Mqtt",
  /** Storage target. */
  Storage = "Storage",
}

/**
 * The set of supported stream destinations for an asset. \
 * {@link KnownStreamDestinationTarget} can be used interchangeably with StreamDestinationTarget,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mqtt**: MQTT target. \
 * **Storage**: Storage target.
 */
export type StreamDestinationTarget = string;

/** The type for a MQTT destination. */
export interface StreamMqttDestination extends StreamDestination {
  /** The MQTT destination type. */
  target: "Mqtt";
  /** The MQTT destination configuration. */
  configuration: MqttDestinationConfiguration;
}

export function streamMqttDestinationSerializer(item: StreamMqttDestination): any {
  return {
    target: item["target"],
    configuration: mqttDestinationConfigurationSerializer(item["configuration"]),
  };
}

export function streamMqttDestinationDeserializer(item: any): StreamMqttDestination {
  return {
    target: item["target"],
    configuration: mqttDestinationConfigurationDeserializer(item["configuration"]),
  };
}

/** The type for a storage destination. */
export interface StreamStorageDestination extends StreamDestination {
  /** The storage destination type. */
  target: "Storage";
  /** The storage destination configuration. */
  configuration: StorageDestinationConfiguration;
}

export function streamStorageDestinationSerializer(item: StreamStorageDestination): any {
  return {
    target: item["target"],
    configuration: storageDestinationConfigurationSerializer(item["configuration"]),
  };
}

export function streamStorageDestinationDeserializer(item: any): StreamStorageDestination {
  return {
    target: item["target"],
    configuration: storageDestinationConfigurationDeserializer(item["configuration"]),
  };
}

export function namespaceDatasetArraySerializer(result: Array<NamespaceDataset>): any[] {
  return result.map((item) => {
    return namespaceDatasetSerializer(item);
  });
}

export function namespaceDatasetArrayDeserializer(result: Array<NamespaceDataset>): any[] {
  return result.map((item) => {
    return namespaceDatasetDeserializer(item);
  });
}

/** Defines the dataset properties. */
export interface NamespaceDataset {
  /** Name of the dataset. */
  name: string;
  /** Reference to a data source for a given dataset. */
  dataSource?: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** Stringified JSON that contains connector-specific JSON string that describes configuration for the specific dataset. */
  datasetConfiguration?: string;
  /** Destinations for a dataset. */
  destinations?: DatasetDestinationUnion[];
  /** Array of data points that are part of the dataset. Each data point can have per-data point configuration. */
  dataPoints?: NamespaceDatasetDataPoint[];
}

export function namespaceDatasetSerializer(item: NamespaceDataset): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    typeRef: item["typeRef"],
    datasetConfiguration: item["datasetConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : datasetDestinationUnionArraySerializer(item["destinations"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : namespaceDatasetDataPointArraySerializer(item["dataPoints"]),
  };
}

export function namespaceDatasetDeserializer(item: any): NamespaceDataset {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    typeRef: item["typeRef"],
    datasetConfiguration: item["datasetConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : datasetDestinationUnionArrayDeserializer(item["destinations"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : namespaceDatasetDataPointArrayDeserializer(item["dataPoints"]),
  };
}

export function namespaceDatasetDataPointArraySerializer(
  result: Array<NamespaceDatasetDataPoint>,
): any[] {
  return result.map((item) => {
    return namespaceDatasetDataPointSerializer(item);
  });
}

export function namespaceDatasetDataPointArrayDeserializer(
  result: Array<NamespaceDatasetDataPoint>,
): any[] {
  return result.map((item) => {
    return namespaceDatasetDataPointDeserializer(item);
  });
}

/** Defines the dataset data point properties. */
export interface NamespaceDatasetDataPoint {
  /** The name of the data point. */
  name: string;
  /** The address of the source of the data in the asset (e.g. URL) so that a client can access the data source on the asset. */
  dataSource: string;
  /** Stringified JSON that contains connector-specific configuration for the data point. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  dataPointConfiguration?: string;
  /** URI or type definition ID. */
  typeRef?: string;
}

export function namespaceDatasetDataPointSerializer(item: NamespaceDatasetDataPoint): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    typeRef: item["typeRef"],
  };
}

export function namespaceDatasetDataPointDeserializer(item: any): NamespaceDatasetDataPoint {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    typeRef: item["typeRef"],
  };
}

export function namespaceEventGroupArraySerializer(result: Array<NamespaceEventGroup>): any[] {
  return result.map((item) => {
    return namespaceEventGroupSerializer(item);
  });
}

export function namespaceEventGroupArrayDeserializer(result: Array<NamespaceEventGroup>): any[] {
  return result.map((item) => {
    return namespaceEventGroupDeserializer(item);
  });
}

/** Defines the event group properties. */
export interface NamespaceEventGroup {
  /** The name of the event group. */
  name: string;
  /** The address of the notifier of the event group in the asset (e.g. URL) so that a client can access the event group on the asset. */
  dataSource?: string;
  /** Stringified JSON that contains connector-specific configuration for the event group. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventGroupConfiguration?: string;
  /** Destinations for events. Default destinations when destinations is not defined at the event level. */
  defaultDestinations?: EventDestinationUnion[];
  /** URI or type definition ID. */
  typeRef?: string;
  /** Array of events that are part of the event group. */
  events?: NamespaceEvent[];
}

export function namespaceEventGroupSerializer(item: NamespaceEventGroup): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventGroupConfiguration: item["eventGroupConfiguration"],
    defaultDestinations: !item["defaultDestinations"]
      ? item["defaultDestinations"]
      : eventDestinationUnionArraySerializer(item["defaultDestinations"]),
    typeRef: item["typeRef"],
    events: !item["events"] ? item["events"] : namespaceEventArraySerializer(item["events"]),
  };
}

export function namespaceEventGroupDeserializer(item: any): NamespaceEventGroup {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventGroupConfiguration: item["eventGroupConfiguration"],
    defaultDestinations: !item["defaultDestinations"]
      ? item["defaultDestinations"]
      : eventDestinationUnionArrayDeserializer(item["defaultDestinations"]),
    typeRef: item["typeRef"],
    events: !item["events"] ? item["events"] : namespaceEventArrayDeserializer(item["events"]),
  };
}

export function namespaceEventArraySerializer(result: Array<NamespaceEvent>): any[] {
  return result.map((item) => {
    return namespaceEventSerializer(item);
  });
}

export function namespaceEventArrayDeserializer(result: Array<NamespaceEvent>): any[] {
  return result.map((item) => {
    return namespaceEventDeserializer(item);
  });
}

/** Defines the event properties. */
export interface NamespaceEvent {
  /** The name of the event. */
  name: string;
  /** Reference to a data source for a given event. */
  dataSource?: string;
  /** Stringified JSON that contains connector-specific configuration for the event. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventConfiguration?: string;
  /** Destinations for an event. */
  destinations?: EventDestinationUnion[];
  /** URI or type definition ID. */
  typeRef?: string;
}

export function namespaceEventSerializer(item: NamespaceEvent): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventConfiguration: item["eventConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : eventDestinationUnionArraySerializer(item["destinations"]),
    typeRef: item["typeRef"],
  };
}

export function namespaceEventDeserializer(item: any): NamespaceEvent {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventConfiguration: item["eventConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : eventDestinationUnionArrayDeserializer(item["destinations"]),
    typeRef: item["typeRef"],
  };
}

export function namespaceStreamArraySerializer(result: Array<NamespaceStream>): any[] {
  return result.map((item) => {
    return namespaceStreamSerializer(item);
  });
}

export function namespaceStreamArrayDeserializer(result: Array<NamespaceStream>): any[] {
  return result.map((item) => {
    return namespaceStreamDeserializer(item);
  });
}

/** Defines the stream properties. */
export interface NamespaceStream {
  /** Name of the stream definition. */
  name: string;
  /** Stringified JSON that contains connector-specific configuration for the specific stream. */
  streamConfiguration?: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** Destinations for a stream. */
  destinations?: StreamDestinationUnion[];
}

export function namespaceStreamSerializer(item: NamespaceStream): any {
  return {
    name: item["name"],
    streamConfiguration: item["streamConfiguration"],
    typeRef: item["typeRef"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : streamDestinationUnionArraySerializer(item["destinations"]),
  };
}

export function namespaceStreamDeserializer(item: any): NamespaceStream {
  return {
    name: item["name"],
    streamConfiguration: item["streamConfiguration"],
    typeRef: item["typeRef"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : streamDestinationUnionArrayDeserializer(item["destinations"]),
  };
}

export function managementGroupArraySerializer(result: Array<ManagementGroup>): any[] {
  return result.map((item) => {
    return managementGroupSerializer(item);
  });
}

export function managementGroupArrayDeserializer(result: Array<ManagementGroup>): any[] {
  return result.map((item) => {
    return managementGroupDeserializer(item);
  });
}

/** Defines the management group properties. */
export interface ManagementGroup {
  /** Name of the management group. */
  name: string;
  /** Reference to a data source for a given management group. */
  dataSource?: string;
  /** Stringified JSON that contains connector-specific configuration for the management group. */
  managementGroupConfiguration?: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** Default MQTT topic path on which a client will receive the request for all actions that are part of the management group. */
  defaultTopic?: string;
  /** Default response timeout for all actions that are part of the management group. */
  defaultTimeoutInSeconds?: number;
  /** Array of actions that are part of the management group. Each action can have an individual configuration. */
  actions?: ManagementAction[];
}

export function managementGroupSerializer(item: ManagementGroup): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    managementGroupConfiguration: item["managementGroupConfiguration"],
    typeRef: item["typeRef"],
    defaultTopic: item["defaultTopic"],
    defaultTimeoutInSeconds: item["defaultTimeoutInSeconds"],
    actions: !item["actions"] ? item["actions"] : managementActionArraySerializer(item["actions"]),
  };
}

export function managementGroupDeserializer(item: any): ManagementGroup {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    managementGroupConfiguration: item["managementGroupConfiguration"],
    typeRef: item["typeRef"],
    defaultTopic: item["defaultTopic"],
    defaultTimeoutInSeconds: item["defaultTimeoutInSeconds"],
    actions: !item["actions"]
      ? item["actions"]
      : managementActionArrayDeserializer(item["actions"]),
  };
}

export function managementActionArraySerializer(result: Array<ManagementAction>): any[] {
  return result.map((item) => {
    return managementActionSerializer(item);
  });
}

export function managementActionArrayDeserializer(result: Array<ManagementAction>): any[] {
  return result.map((item) => {
    return managementActionDeserializer(item);
  });
}

/** Defines the action properties. */
export interface ManagementAction {
  /** Name of the action. */
  name: string;
  /** Stringified JSON that contains connector-specific configuration for the action. */
  actionConfiguration?: string;
  /** The target URI on which a client can invoke the specific action. */
  targetUri: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** The MQTT topic path on which a client will receive the request for the action. */
  topic?: string;
  /** The type of the action. */
  actionType?: ManagementActionType;
  /** Response timeout for the action. */
  timeoutInSeconds?: number;
}

export function managementActionSerializer(item: ManagementAction): any {
  return {
    name: item["name"],
    actionConfiguration: item["actionConfiguration"],
    targetUri: item["targetUri"],
    typeRef: item["typeRef"],
    topic: item["topic"],
    actionType: item["actionType"],
    timeoutInSeconds: item["timeoutInSeconds"],
  };
}

export function managementActionDeserializer(item: any): ManagementAction {
  return {
    name: item["name"],
    actionConfiguration: item["actionConfiguration"],
    targetUri: item["targetUri"],
    typeRef: item["typeRef"],
    topic: item["topic"],
    actionType: item["actionType"],
    timeoutInSeconds: item["timeoutInSeconds"],
  };
}

/** Defines the ManagementAction's type. */
export enum KnownManagementActionType {
  /** Call action type. */
  Call = "Call",
  /** Read action type. */
  Read = "Read",
  /** Write action type. */
  Write = "Write",
}

/**
 * Defines the ManagementAction's type. \
 * {@link KnownManagementActionType} can be used interchangeably with ManagementActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Call**: Call action type. \
 * **Read**: Read action type. \
 * **Write**: Write action type.
 */
export type ManagementActionType = string;

/** Defines the asset status properties. */
export interface NamespaceAssetStatus {
  /** Defines the asset status config properties. */
  readonly config?: StatusConfig;
  /** Array of dataset statuses that describe the status of each dataset. */
  readonly datasets?: NamespaceAssetStatusDataset[];
  /** Array of event group statuses that describe the status of each event group. */
  readonly eventGroups?: NamespaceAssetStatusEventGroup[];
  /** Array of stream statuses that describe the status of each stream. */
  readonly streams?: NamespaceAssetStatusStream[];
  /** Array of management group statuses that describe the status of each management group. */
  readonly managementGroups?: NamespaceAssetStatusManagementGroup[];
}

export function namespaceAssetStatusDeserializer(item: any): NamespaceAssetStatus {
  return {
    config: !item["config"] ? item["config"] : statusConfigDeserializer(item["config"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : namespaceAssetStatusDatasetArrayDeserializer(item["datasets"]),
    eventGroups: !item["eventGroups"]
      ? item["eventGroups"]
      : namespaceAssetStatusEventGroupArrayDeserializer(item["eventGroups"]),
    streams: !item["streams"]
      ? item["streams"]
      : namespaceAssetStatusStreamArrayDeserializer(item["streams"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : namespaceAssetStatusManagementGroupArrayDeserializer(item["managementGroups"]),
  };
}

/** Defines the status config properties. */
export interface StatusConfig {
  /** A read-only incremental counter indicating the number of times the configuration has been modified from the perspective of the current actual (edge) state of the CRD. Edge would be the only writer of this value and would sync back up to the cloud. In steady state, this should equal version. */
  readonly version?: number;
  /** A read-only timestamp indicating the last time the configuration has been modified from the perspective of the current actual (edge) state of the CRD. Edge would be the only writer of this value and would sync back up to the cloud. */
  readonly lastTransitionTime?: Date;
  /** Object to transfer and persist errors that originate from the edge. */
  readonly error?: StatusError;
}

export function statusConfigDeserializer(item: any): StatusConfig {
  return {
    version: item["version"],
    lastTransitionTime: !item["lastTransitionTime"]
      ? item["lastTransitionTime"]
      : new Date(item["lastTransitionTime"]),
    error: !item["error"] ? item["error"] : statusErrorDeserializer(item["error"]),
  };
}

/** Defines the status config error properties. */
export interface StatusError {
  /** Error code for classification of errors (ex: '400', '404', '500', etc.). */
  readonly code?: string;
  /** Human-readable helpful error message to provide additional context for error (e.g.,: “Capability ID 'foo' does not exist”). */
  readonly message?: string;
  /** Array of error details that describe the status of each error. */
  readonly details?: ErrorDetails[];
}

export function statusErrorDeserializer(item: any): StatusError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : errorDetailsArrayDeserializer(item["details"]),
  };
}

export function namespaceAssetStatusDatasetArrayDeserializer(
  result: Array<NamespaceAssetStatusDataset>,
): any[] {
  return result.map((item) => {
    return namespaceAssetStatusDatasetDeserializer(item);
  });
}

/** Defines the asset status dataset properties. */
export interface NamespaceAssetStatusDataset {
  /** The name of the dataset. Must be unique within the status.datasets array. This name is used to correlate between the spec and status dataset information. */
  readonly name: string;
  /** The message schema reference object. */
  readonly messageSchemaReference?: NamespaceMessageSchemaReference;
  /** Object to transfer and persist errors that originate from the edge. */
  readonly error?: StatusError;
}

export function namespaceAssetStatusDatasetDeserializer(item: any): NamespaceAssetStatusDataset {
  return {
    name: item["name"],
    messageSchemaReference: !item["messageSchemaReference"]
      ? item["messageSchemaReference"]
      : namespaceMessageSchemaReferenceDeserializer(item["messageSchemaReference"]),
    error: !item["error"] ? item["error"] : statusErrorDeserializer(item["error"]),
  };
}

/** Defines the message schema reference properties. */
export interface NamespaceMessageSchemaReference {
  /** The message schema registry namespace. */
  readonly schemaRegistryNamespace: string;
  /** The message schema name. */
  readonly schemaName: string;
  /** The message schema version. */
  readonly schemaVersion: string;
}

export function namespaceMessageSchemaReferenceDeserializer(
  item: any,
): NamespaceMessageSchemaReference {
  return {
    schemaRegistryNamespace: item["schemaRegistryNamespace"],
    schemaName: item["schemaName"],
    schemaVersion: item["schemaVersion"],
  };
}

export function namespaceAssetStatusEventGroupArrayDeserializer(
  result: Array<NamespaceAssetStatusEventGroup>,
): any[] {
  return result.map((item) => {
    return namespaceAssetStatusEventGroupDeserializer(item);
  });
}

/** Defines the asset status event group properties. */
export interface NamespaceAssetStatusEventGroup {
  /** The name of the event group. Must be unique within the status.eventGroups array. This name is used to correlate between the spec and status event group information. */
  readonly name: string;
  /** Array of event statuses that describe the status of each event in the event group. */
  readonly events?: NamespaceAssetStatusEvent[];
}

export function namespaceAssetStatusEventGroupDeserializer(
  item: any,
): NamespaceAssetStatusEventGroup {
  return {
    name: item["name"],
    events: !item["events"]
      ? item["events"]
      : namespaceAssetStatusEventArrayDeserializer(item["events"]),
  };
}

export function namespaceAssetStatusEventArrayDeserializer(
  result: Array<NamespaceAssetStatusEvent>,
): any[] {
  return result.map((item) => {
    return namespaceAssetStatusEventDeserializer(item);
  });
}

/** Defines the asset status event properties. */
export interface NamespaceAssetStatusEvent {
  /** The name of the event. Must be unique within the status.events array. This name is used to correlate between the spec and status event information. */
  readonly name: string;
  /** The message schema reference object. */
  readonly messageSchemaReference?: NamespaceMessageSchemaReference;
  /** Object to transfer and persist errors that originate from the edge. */
  readonly error?: StatusError;
}

export function namespaceAssetStatusEventDeserializer(item: any): NamespaceAssetStatusEvent {
  return {
    name: item["name"],
    messageSchemaReference: !item["messageSchemaReference"]
      ? item["messageSchemaReference"]
      : namespaceMessageSchemaReferenceDeserializer(item["messageSchemaReference"]),
    error: !item["error"] ? item["error"] : statusErrorDeserializer(item["error"]),
  };
}

export function namespaceAssetStatusStreamArrayDeserializer(
  result: Array<NamespaceAssetStatusStream>,
): any[] {
  return result.map((item) => {
    return namespaceAssetStatusStreamDeserializer(item);
  });
}

/** Defines the asset status stream properties. */
export interface NamespaceAssetStatusStream {
  /** The name of the stream. Must be unique within the status.streams array. This name is used to correlate between the spec and status event information. */
  readonly name: string;
  /** The message schema reference object. */
  readonly messageSchemaReference?: NamespaceMessageSchemaReference;
  /** Object to transfer and persist errors that originate from the edge. */
  readonly error?: StatusError;
}

export function namespaceAssetStatusStreamDeserializer(item: any): NamespaceAssetStatusStream {
  return {
    name: item["name"],
    messageSchemaReference: !item["messageSchemaReference"]
      ? item["messageSchemaReference"]
      : namespaceMessageSchemaReferenceDeserializer(item["messageSchemaReference"]),
    error: !item["error"] ? item["error"] : statusErrorDeserializer(item["error"]),
  };
}

export function namespaceAssetStatusManagementGroupArrayDeserializer(
  result: Array<NamespaceAssetStatusManagementGroup>,
): any[] {
  return result.map((item) => {
    return namespaceAssetStatusManagementGroupDeserializer(item);
  });
}

/** Defines the asset status management group properties. */
export interface NamespaceAssetStatusManagementGroup {
  /** The name of the management group. Must be unique within the status.managementGroups array. This name is used to correlate between the spec and status event information. */
  readonly name: string;
  /** Array of action statuses that describe the status of each action. */
  readonly actions?: NamespaceAssetStatusManagementAction[];
}

export function namespaceAssetStatusManagementGroupDeserializer(
  item: any,
): NamespaceAssetStatusManagementGroup {
  return {
    name: item["name"],
    actions: !item["actions"]
      ? item["actions"]
      : namespaceAssetStatusManagementActionArrayDeserializer(item["actions"]),
  };
}

export function namespaceAssetStatusManagementActionArrayDeserializer(
  result: Array<NamespaceAssetStatusManagementAction>,
): any[] {
  return result.map((item) => {
    return namespaceAssetStatusManagementActionDeserializer(item);
  });
}

/** Defines the asset status action properties. */
export interface NamespaceAssetStatusManagementAction {
  /** The name of the action. Must be unique within the status.actions array. This name is used to correlate between the spec and status event information. */
  readonly name: string;
  /** The request message schema reference object for the action. */
  readonly requestMessageSchemaReference?: NamespaceMessageSchemaReference;
  /** The response message schema reference object for the action. */
  readonly responseMessageSchemaReference?: NamespaceMessageSchemaReference;
  /** Object to transfer and persist errors that originate from the edge. */
  readonly error?: StatusError;
}

export function namespaceAssetStatusManagementActionDeserializer(
  item: any,
): NamespaceAssetStatusManagementAction {
  return {
    name: item["name"],
    requestMessageSchemaReference: !item["requestMessageSchemaReference"]
      ? item["requestMessageSchemaReference"]
      : namespaceMessageSchemaReferenceDeserializer(item["requestMessageSchemaReference"]),
    responseMessageSchemaReference: !item["responseMessageSchemaReference"]
      ? item["responseMessageSchemaReference"]
      : namespaceMessageSchemaReferenceDeserializer(item["responseMessageSchemaReference"]),
    error: !item["error"] ? item["error"] : statusErrorDeserializer(item["error"]),
  };
}

/** The type used for update operations of the NamespaceAsset. */
export interface NamespaceAssetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: NamespaceAssetUpdateProperties;
}

export function namespaceAssetUpdateSerializer(item: NamespaceAssetUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceAssetUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the NamespaceAsset. */
export interface NamespaceAssetUpdateProperties {
  /** Enabled/disabled status of the asset. */
  enabled?: boolean;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the asset. */
  description?: string;
  /** URIs or type definition IDs. */
  assetTypeRefs?: string[];
  /** Asset manufacturer. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Asset hardware revision number. */
  hardwareRevision?: string;
  /** Asset software revision number. */
  softwareRevision?: string;
  /** Asset documentation reference. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all streams. Each stream can have its own configuration that overrides the default settings here. */
  defaultStreamsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all management groups. Each management group can have its own configuration that overrides the default settings here. */
  defaultManagementGroupsConfiguration?: string;
  /** Default destinations for a dataset. */
  defaultDatasetsDestinations?: DatasetDestinationUnion[];
  /** Default destinations for an event. */
  defaultEventsDestinations?: EventDestinationUnion[];
  /** Default destinations for a stream. */
  defaultStreamsDestinations?: StreamDestinationUnion[];
  /** Array of datasets that are part of the asset. Each dataset describes the data points that make up the set. */
  datasets?: NamespaceDataset[];
  /** Array of event groups that are part of the asset. Each event group can have per-event group configuration. */
  eventGroups?: NamespaceEventGroup[];
  /** Array of streams that are part of the asset. Each stream can have a per-stream configuration. */
  streams?: NamespaceStream[];
  /** Array of management groups that are part of the asset. Each management group can have a per-group configuration. */
  managementGroups?: ManagementGroup[];
}

export function namespaceAssetUpdatePropertiesSerializer(
  item: NamespaceAssetUpdateProperties,
): any {
  return {
    enabled: item["enabled"],
    displayName: item["displayName"],
    description: item["description"],
    assetTypeRefs: !item["assetTypeRefs"]
      ? item["assetTypeRefs"]
      : item["assetTypeRefs"].map((p: any) => {
          return p;
        }),
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultStreamsConfiguration: item["defaultStreamsConfiguration"],
    defaultManagementGroupsConfiguration: item["defaultManagementGroupsConfiguration"],
    defaultDatasetsDestinations: !item["defaultDatasetsDestinations"]
      ? item["defaultDatasetsDestinations"]
      : datasetDestinationUnionArraySerializer(item["defaultDatasetsDestinations"]),
    defaultEventsDestinations: !item["defaultEventsDestinations"]
      ? item["defaultEventsDestinations"]
      : eventDestinationUnionArraySerializer(item["defaultEventsDestinations"]),
    defaultStreamsDestinations: !item["defaultStreamsDestinations"]
      ? item["defaultStreamsDestinations"]
      : streamDestinationUnionArraySerializer(item["defaultStreamsDestinations"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : namespaceDatasetArraySerializer(item["datasets"]),
    eventGroups: !item["eventGroups"]
      ? item["eventGroups"]
      : namespaceEventGroupArraySerializer(item["eventGroups"]),
    streams: !item["streams"] ? item["streams"] : namespaceStreamArraySerializer(item["streams"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : managementGroupArraySerializer(item["managementGroups"]),
  };
}

/** The response of a NamespaceAsset list operation. */
export interface _NamespaceAssetListResult {
  /** The NamespaceAsset items on this page */
  value: NamespaceAsset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespaceAssetListResultDeserializer(item: any): _NamespaceAssetListResult {
  return {
    value: namespaceAssetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceAssetArraySerializer(result: Array<NamespaceAsset>): any[] {
  return result.map((item) => {
    return namespaceAssetSerializer(item);
  });
}

export function namespaceAssetArrayDeserializer(result: Array<NamespaceAsset>): any[] {
  return result.map((item) => {
    return namespaceAssetDeserializer(item);
  });
}

/** Device definition. */
export interface NamespaceDevice extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NamespaceDeviceProperties;
  /** Resource Tag. */
  readonly etag?: string;
  /** The extended location. */
  extendedLocation?: ExtendedLocation;
}

export function namespaceDeviceSerializer(item: NamespaceDevice): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceDevicePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function namespaceDeviceDeserializer(item: any): NamespaceDevice {
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
      : namespaceDevicePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the device properties. */
export interface NamespaceDeviceProperties {
  /** A unique identifier for the device. */
  readonly uuid?: string;
  /** Indicates if the resource is enabled or not. */
  enabled?: boolean;
  /** The Device ID provided by the customer. */
  externalDeviceId?: string;
  /** Reference to a device. Populated only if the device had been created from discovery flow. Discovered device name must be provided. */
  discoveredDeviceRef?: string;
  /** Device manufacturer. */
  manufacturer?: string;
  /** Device model. */
  model?: string;
  /** Device operating system. */
  operatingSystem?: string;
  /** Device operating system version. */
  operatingSystemVersion?: string;
  /** Property bag containing the device's unassigned and assigned endpoints. */
  endpoints?: MessagingEndpoints;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Device status updates. */
  readonly status?: DeviceStatus;
  /** An integer that is incremented each time the resource is modified. */
  readonly version?: number;
  /** A timestamp (in UTC) that is updated each time the resource is modified. */
  readonly lastTransitionTime?: Date;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function namespaceDevicePropertiesSerializer(item: NamespaceDeviceProperties): any {
  return {
    enabled: item["enabled"],
    externalDeviceId: item["externalDeviceId"],
    discoveredDeviceRef: item["discoveredDeviceRef"],
    manufacturer: item["manufacturer"],
    model: item["model"],
    operatingSystem: item["operatingSystem"],
    operatingSystemVersion: item["operatingSystemVersion"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : messagingEndpointsSerializer(item["endpoints"]),
    attributes: item["attributes"],
  };
}

export function namespaceDevicePropertiesDeserializer(item: any): NamespaceDeviceProperties {
  return {
    uuid: item["uuid"],
    enabled: item["enabled"],
    externalDeviceId: item["externalDeviceId"],
    discoveredDeviceRef: item["discoveredDeviceRef"],
    manufacturer: item["manufacturer"],
    model: item["model"],
    operatingSystem: item["operatingSystem"],
    operatingSystemVersion: item["operatingSystemVersion"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : messagingEndpointsDeserializer(item["endpoints"]),
    attributes: item["attributes"],
    status: !item["status"] ? item["status"] : deviceStatusDeserializer(item["status"]),
    version: item["version"],
    lastTransitionTime: !item["lastTransitionTime"]
      ? item["lastTransitionTime"]
      : new Date(item["lastTransitionTime"]),
    provisioningState: item["provisioningState"],
  };
}

/** Connection endpoint URL a device can use to connect to a service. */
export interface MessagingEndpoints {
  /** Set of endpoints to connect to the device. */
  inbound?: Record<string, InboundEndpoints>;
  /** Set of endpoints a device can connect to. */
  outbound?: OutboundEndpoints;
}

export function messagingEndpointsSerializer(item: MessagingEndpoints): any {
  return {
    inbound: !item["inbound"] ? item["inbound"] : inboundEndpointsRecordSerializer(item["inbound"]),
    outbound: !item["outbound"] ? item["outbound"] : outboundEndpointsSerializer(item["outbound"]),
  };
}

export function messagingEndpointsDeserializer(item: any): MessagingEndpoints {
  return {
    inbound: !item["inbound"]
      ? item["inbound"]
      : inboundEndpointsRecordDeserializer(item["inbound"]),
    outbound: !item["outbound"]
      ? item["outbound"]
      : outboundEndpointsDeserializer(item["outbound"]),
  };
}

export function inboundEndpointsRecordSerializer(
  item: Record<string, InboundEndpoints>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : inboundEndpointsSerializer(item[key]);
  });
  return result;
}

export function inboundEndpointsRecordDeserializer(
  item: Record<string, any>,
): Record<string, InboundEndpoints> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : inboundEndpointsDeserializer(item[key]);
  });
  return result;
}

/** An endpoint to connect to the device. */
export interface InboundEndpoints {
  /** Type of connection endpoint. */
  endpointType: string;
  /** The endpoint address & port. This can be either an IP address (e.g., 192.168.1.1) or a fully qualified domain name (FQDN, e.g., server.example.com). */
  address: string;
  /** Protocol version associated with the endpoint e.g. 1 or 2 for endpointType Microsoft.HTTP, and 3.5 or 5.0 for endpointType Microsoft.Mqtt etc. */
  version?: string;
  /** Defines the client authentication mechanism to the server. */
  authentication?: HostAuthentication;
  /** Defines server trust settings for the endpoint. */
  trustSettings?: TrustSettings;
  /** Stringified JSON that contains configuration to be used by the connector (e.g., OPC UA, ONVIF). */
  additionalConfiguration?: string;
}

export function inboundEndpointsSerializer(item: InboundEndpoints): any {
  return {
    endpointType: item["endpointType"],
    address: item["address"],
    version: item["version"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : hostAuthenticationSerializer(item["authentication"]),
    trustSettings: !item["trustSettings"]
      ? item["trustSettings"]
      : trustSettingsSerializer(item["trustSettings"]),
    additionalConfiguration: item["additionalConfiguration"],
  };
}

export function inboundEndpointsDeserializer(item: any): InboundEndpoints {
  return {
    endpointType: item["endpointType"],
    address: item["address"],
    version: item["version"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : hostAuthenticationDeserializer(item["authentication"]),
    trustSettings: !item["trustSettings"]
      ? item["trustSettings"]
      : trustSettingsDeserializer(item["trustSettings"]),
    additionalConfiguration: item["additionalConfiguration"],
  };
}

/** Definition of the client authentication mechanism to the host. */
export interface HostAuthentication {
  /** Defines the method to authenticate the user of the client at the server. */
  method: AuthenticationMethod;
  /** Defines the username and password references when UsernamePassword user authentication mode is selected. */
  usernamePasswordCredentials?: UsernamePasswordCredentials;
  /** Defines the certificate reference when Certificate user authentication mode is selected. */
  x509Credentials?: X509CertificateCredentials;
}

export function hostAuthenticationSerializer(item: HostAuthentication): any {
  return {
    method: item["method"],
    usernamePasswordCredentials: !item["usernamePasswordCredentials"]
      ? item["usernamePasswordCredentials"]
      : usernamePasswordCredentialsSerializer(item["usernamePasswordCredentials"]),
    x509Credentials: !item["x509Credentials"]
      ? item["x509Credentials"]
      : x509CertificateCredentialsSerializer(item["x509Credentials"]),
  };
}

export function hostAuthenticationDeserializer(item: any): HostAuthentication {
  return {
    method: item["method"],
    usernamePasswordCredentials: !item["usernamePasswordCredentials"]
      ? item["usernamePasswordCredentials"]
      : usernamePasswordCredentialsDeserializer(item["usernamePasswordCredentials"]),
    x509Credentials: !item["x509Credentials"]
      ? item["x509Credentials"]
      : x509CertificateCredentialsDeserializer(item["x509Credentials"]),
  };
}

/** The x509 certificate for authentication mode Certificate. */
export interface X509CertificateCredentials {
  /** The name of the secret containing the certificate and private key (e.g. stored as .der/.pem or .der/.pfx). */
  certificateSecretName: string;
  /** The name of the secret containing the certificate private key in PEM or DER format. */
  keySecretName?: string;
  /** The name of the secret containing the combined intermediate certificates in PEM format. */
  intermediateCertificatesSecretName?: string;
}

export function x509CertificateCredentialsSerializer(item: X509CertificateCredentials): any {
  return {
    certificateSecretName: item["certificateSecretName"],
    keySecretName: item["keySecretName"],
    intermediateCertificatesSecretName: item["intermediateCertificatesSecretName"],
  };
}

export function x509CertificateCredentialsDeserializer(item: any): X509CertificateCredentials {
  return {
    certificateSecretName: item["certificateSecretName"],
    keySecretName: item["keySecretName"],
    intermediateCertificatesSecretName: item["intermediateCertificatesSecretName"],
  };
}

/** Defines server trust settings for an endpoint. */
export interface TrustSettings {
  /** Defines a secret reference for certificates to trust. */
  trustList?: string;
}

export function trustSettingsSerializer(item: TrustSettings): any {
  return { trustList: item["trustList"] };
}

export function trustSettingsDeserializer(item: any): TrustSettings {
  return {
    trustList: item["trustList"],
  };
}

/** Property bag contains the device's outbound endpoints */
export interface OutboundEndpoints {
  /** Endpoints the device can connect to. */
  assigned: Record<string, DeviceMessagingEndpoint>;
  /** Set of most recently removed endpoints. */
  unassigned?: Record<string, DeviceMessagingEndpoint>;
}

export function outboundEndpointsSerializer(item: OutboundEndpoints): any {
  return {
    assigned: deviceMessagingEndpointRecordSerializer(item["assigned"]),
    unassigned: !item["unassigned"]
      ? item["unassigned"]
      : deviceMessagingEndpointRecordSerializer(item["unassigned"]),
  };
}

export function outboundEndpointsDeserializer(item: any): OutboundEndpoints {
  return {
    assigned: deviceMessagingEndpointRecordDeserializer(item["assigned"]),
    unassigned: !item["unassigned"]
      ? item["unassigned"]
      : deviceMessagingEndpointRecordDeserializer(item["unassigned"]),
  };
}

export function deviceMessagingEndpointRecordSerializer(
  item: Record<string, DeviceMessagingEndpoint>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deviceMessagingEndpointSerializer(item[key]);
  });
  return result;
}

export function deviceMessagingEndpointRecordDeserializer(
  item: Record<string, any>,
): Record<string, DeviceMessagingEndpoint> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deviceMessagingEndpointDeserializer(item[key]);
  });
  return result;
}

/** Device messaging endpoint model. */
export interface DeviceMessagingEndpoint {
  /** Type of connection used for the messaging endpoint. */
  endpointType?: string;
  /** The endpoint address to connect to. */
  address: string;
}

export function deviceMessagingEndpointSerializer(item: DeviceMessagingEndpoint): any {
  return { endpointType: item["endpointType"], address: item["address"] };
}

export function deviceMessagingEndpointDeserializer(item: any): DeviceMessagingEndpoint {
  return {
    endpointType: item["endpointType"],
    address: item["address"],
  };
}

/** Defines the device status properties. */
export interface DeviceStatus {
  /** Defines the device status config properties. */
  readonly config?: StatusConfig;
  /** Defines the device status for inbound/outbound endpoints. */
  readonly endpoints?: DeviceStatusEndpoints;
}

export function deviceStatusDeserializer(item: any): DeviceStatus {
  return {
    config: !item["config"] ? item["config"] : statusConfigDeserializer(item["config"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : deviceStatusEndpointsDeserializer(item["endpoints"]),
  };
}

/** Defines the device status for inbound/outbound endpoints. */
export interface DeviceStatusEndpoints {
  /** KeyValue pair representing status of inbound endpoints. */
  readonly inbound?: Record<string, DeviceStatusEndpoint>;
}

export function deviceStatusEndpointsDeserializer(item: any): DeviceStatusEndpoints {
  return {
    inbound: !item["inbound"]
      ? item["inbound"]
      : deviceStatusEndpointRecordDeserializer(item["inbound"]),
  };
}

export function deviceStatusEndpointRecordDeserializer(
  item: Record<string, any>,
): Record<string, DeviceStatusEndpoint> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deviceStatusEndpointDeserializer(item[key]);
  });
  return result;
}

/** Defines the device status properties. */
export interface DeviceStatusEndpoint {
  /** Defines the error related to this endpoint. */
  readonly error?: StatusError;
}

export function deviceStatusEndpointDeserializer(item: any): DeviceStatusEndpoint {
  return {
    error: !item["error"] ? item["error"] : statusErrorDeserializer(item["error"]),
  };
}

/** The type used for update operations of the NamespaceDevice. */
export interface NamespaceDeviceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: NamespaceDeviceUpdateProperties;
}

export function namespaceDeviceUpdateSerializer(item: NamespaceDeviceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceDeviceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the NamespaceDevice. */
export interface NamespaceDeviceUpdateProperties {
  /** Device operating system version. */
  operatingSystemVersion?: string;
  /** Property bag containing the device's unassigned and assigned endpoints. */
  endpoints?: MessagingEndpoints;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Indicates if the resource and identity are enabled or not. A disabled device cannot authenticate with Microsoft Entra ID. */
  enabled?: boolean;
}

export function namespaceDeviceUpdatePropertiesSerializer(
  item: NamespaceDeviceUpdateProperties,
): any {
  return {
    operatingSystemVersion: item["operatingSystemVersion"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : messagingEndpointsSerializer(item["endpoints"]),
    attributes: item["attributes"],
    enabled: item["enabled"],
  };
}

/** The response of a NamespaceDevice list operation. */
export interface _NamespaceDeviceListResult {
  /** The NamespaceDevice items on this page */
  value: NamespaceDevice[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespaceDeviceListResultDeserializer(item: any): _NamespaceDeviceListResult {
  return {
    value: namespaceDeviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceDeviceArraySerializer(result: Array<NamespaceDevice>): any[] {
  return result.map((item) => {
    return namespaceDeviceSerializer(item);
  });
}

export function namespaceDeviceArrayDeserializer(result: Array<NamespaceDevice>): any[] {
  return result.map((item) => {
    return namespaceDeviceDeserializer(item);
  });
}

/** Discovered asset definition. */
export interface NamespaceDiscoveredAsset extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NamespaceDiscoveredAssetProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function namespaceDiscoveredAssetSerializer(item: NamespaceDiscoveredAsset): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceDiscoveredAssetPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function namespaceDiscoveredAssetDeserializer(item: any): NamespaceDiscoveredAsset {
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
      : namespaceDiscoveredAssetPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the discovered asset properties. */
export interface NamespaceDiscoveredAssetProperties {
  /** Reference to the device that provides data for this asset. Must provide device name & endpoint on the device to use. */
  deviceRef: DeviceRef;
  /** Human-readable display name. */
  displayName?: string;
  /** URIs or type definition IDs. */
  assetTypeRefs?: string[];
  /** Human-readable description of the asset. */
  description?: string;
  /** Identifier used to detect changes in the asset. */
  discoveryId: string;
  /** Asset ID provided by the customer. */
  externalAssetId?: string;
  /** An integer that is incremented each time the resource is modified. */
  version: number;
  /** Asset manufacturer. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Asset hardware revision number. */
  hardwareRevision?: string;
  /** Asset software revision number. */
  softwareRevision?: string;
  /** Asset documentation reference. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes. */
  attributes?: Record<string, any>;
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all streams. Each stream can have its own configuration that overrides the default settings here. */
  defaultStreamsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all management groups. Each management group can have its own configuration that overrides the default settings here. */
  defaultManagementGroupsConfiguration?: string;
  /** Default destinations for a dataset. */
  defaultDatasetsDestinations?: DatasetDestinationUnion[];
  /** Default destinations for an event. */
  defaultEventsDestinations?: EventDestinationUnion[];
  /** Default destinations for a stream. */
  defaultStreamsDestinations?: StreamDestinationUnion[];
  /** Array of datasets that are part of the asset. Each dataset spec describes the data points that make up the set. */
  datasets?: NamespaceDiscoveredDataset[];
  /** Array of event groups that are part of the asset. Each event group can have per-event group configuration. */
  eventGroups?: NamespaceDiscoveredEventGroup[];
  /** Array of streams that are part of the asset. Each stream can have a per-stream configuration. */
  streams?: NamespaceDiscoveredStream[];
  /** Array of management groups that are part of the asset. Each management group can have a per-group configuration. */
  managementGroups?: NamespaceDiscoveredManagementGroup[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function namespaceDiscoveredAssetPropertiesSerializer(
  item: NamespaceDiscoveredAssetProperties,
): any {
  return {
    deviceRef: deviceRefSerializer(item["deviceRef"]),
    displayName: item["displayName"],
    assetTypeRefs: !item["assetTypeRefs"]
      ? item["assetTypeRefs"]
      : item["assetTypeRefs"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    discoveryId: item["discoveryId"],
    externalAssetId: item["externalAssetId"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultStreamsConfiguration: item["defaultStreamsConfiguration"],
    defaultManagementGroupsConfiguration: item["defaultManagementGroupsConfiguration"],
    defaultDatasetsDestinations: !item["defaultDatasetsDestinations"]
      ? item["defaultDatasetsDestinations"]
      : datasetDestinationUnionArraySerializer(item["defaultDatasetsDestinations"]),
    defaultEventsDestinations: !item["defaultEventsDestinations"]
      ? item["defaultEventsDestinations"]
      : eventDestinationUnionArraySerializer(item["defaultEventsDestinations"]),
    defaultStreamsDestinations: !item["defaultStreamsDestinations"]
      ? item["defaultStreamsDestinations"]
      : streamDestinationUnionArraySerializer(item["defaultStreamsDestinations"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : namespaceDiscoveredDatasetArraySerializer(item["datasets"]),
    eventGroups: !item["eventGroups"]
      ? item["eventGroups"]
      : namespaceDiscoveredEventGroupArraySerializer(item["eventGroups"]),
    streams: !item["streams"]
      ? item["streams"]
      : namespaceDiscoveredStreamArraySerializer(item["streams"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : namespaceDiscoveredManagementGroupArraySerializer(item["managementGroups"]),
  };
}

export function namespaceDiscoveredAssetPropertiesDeserializer(
  item: any,
): NamespaceDiscoveredAssetProperties {
  return {
    deviceRef: deviceRefDeserializer(item["deviceRef"]),
    displayName: item["displayName"],
    assetTypeRefs: !item["assetTypeRefs"]
      ? item["assetTypeRefs"]
      : item["assetTypeRefs"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    discoveryId: item["discoveryId"],
    externalAssetId: item["externalAssetId"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultStreamsConfiguration: item["defaultStreamsConfiguration"],
    defaultManagementGroupsConfiguration: item["defaultManagementGroupsConfiguration"],
    defaultDatasetsDestinations: !item["defaultDatasetsDestinations"]
      ? item["defaultDatasetsDestinations"]
      : datasetDestinationUnionArrayDeserializer(item["defaultDatasetsDestinations"]),
    defaultEventsDestinations: !item["defaultEventsDestinations"]
      ? item["defaultEventsDestinations"]
      : eventDestinationUnionArrayDeserializer(item["defaultEventsDestinations"]),
    defaultStreamsDestinations: !item["defaultStreamsDestinations"]
      ? item["defaultStreamsDestinations"]
      : streamDestinationUnionArrayDeserializer(item["defaultStreamsDestinations"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : namespaceDiscoveredDatasetArrayDeserializer(item["datasets"]),
    eventGroups: !item["eventGroups"]
      ? item["eventGroups"]
      : namespaceDiscoveredEventGroupArrayDeserializer(item["eventGroups"]),
    streams: !item["streams"]
      ? item["streams"]
      : namespaceDiscoveredStreamArrayDeserializer(item["streams"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : namespaceDiscoveredManagementGroupArrayDeserializer(item["managementGroups"]),
    provisioningState: item["provisioningState"],
  };
}

export function namespaceDiscoveredDatasetArraySerializer(
  result: Array<NamespaceDiscoveredDataset>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredDatasetSerializer(item);
  });
}

export function namespaceDiscoveredDatasetArrayDeserializer(
  result: Array<NamespaceDiscoveredDataset>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredDatasetDeserializer(item);
  });
}

/** Defines the dataset properties. */
export interface NamespaceDiscoveredDataset {
  /** Name of the dataset. */
  name: string;
  /** Reference to a data source for a given dataset. */
  dataSource?: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** Stringified JSON that contains connector-specific properties that describes configuration for the specific dataset. */
  datasetConfiguration?: string;
  /** Destinations for a dataset. */
  destinations?: DatasetDestinationUnion[];
  /** Array of data points that are part of the dataset. Each data point can have per-data point configuration. */
  dataPoints?: NamespaceDiscoveredDatasetDataPoint[];
  /** Timestamp (in UTC) indicating when the dataset was added or modified. */
  lastUpdatedOn?: Date;
}

export function namespaceDiscoveredDatasetSerializer(item: NamespaceDiscoveredDataset): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    typeRef: item["typeRef"],
    datasetConfiguration: item["datasetConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : datasetDestinationUnionArraySerializer(item["destinations"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : namespaceDiscoveredDatasetDataPointArraySerializer(item["dataPoints"]),
    lastUpdatedOn: !item["lastUpdatedOn"]
      ? item["lastUpdatedOn"]
      : item["lastUpdatedOn"].toISOString(),
  };
}

export function namespaceDiscoveredDatasetDeserializer(item: any): NamespaceDiscoveredDataset {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    typeRef: item["typeRef"],
    datasetConfiguration: item["datasetConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : datasetDestinationUnionArrayDeserializer(item["destinations"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : namespaceDiscoveredDatasetDataPointArrayDeserializer(item["dataPoints"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

export function namespaceDiscoveredDatasetDataPointArraySerializer(
  result: Array<NamespaceDiscoveredDatasetDataPoint>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredDatasetDataPointSerializer(item);
  });
}

export function namespaceDiscoveredDatasetDataPointArrayDeserializer(
  result: Array<NamespaceDiscoveredDatasetDataPoint>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredDatasetDataPointDeserializer(item);
  });
}

/** Defines the discovered dataset data point properties. */
export interface NamespaceDiscoveredDatasetDataPoint {
  /** The name of the data point. */
  name: string;
  /** The address of the source of the data in the asset (e.g. URL) so that a client can access the data source on the asset. */
  dataSource: string;
  /** Stringified JSON that contains connector-specific configuration for the data point. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  dataPointConfiguration?: string;
  /** UTC timestamp indicating when the data point was added or modified. */
  lastUpdatedOn?: Date;
  /** URI or type definition ID. */
  typeRef?: string;
}

export function namespaceDiscoveredDatasetDataPointSerializer(
  item: NamespaceDiscoveredDatasetDataPoint,
): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    lastUpdatedOn: !item["lastUpdatedOn"]
      ? item["lastUpdatedOn"]
      : item["lastUpdatedOn"].toISOString(),
    typeRef: item["typeRef"],
  };
}

export function namespaceDiscoveredDatasetDataPointDeserializer(
  item: any,
): NamespaceDiscoveredDatasetDataPoint {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
    typeRef: item["typeRef"],
  };
}

export function namespaceDiscoveredEventGroupArraySerializer(
  result: Array<NamespaceDiscoveredEventGroup>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredEventGroupSerializer(item);
  });
}

export function namespaceDiscoveredEventGroupArrayDeserializer(
  result: Array<NamespaceDiscoveredEventGroup>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredEventGroupDeserializer(item);
  });
}

/** Defines the discovered event group properties. */
export interface NamespaceDiscoveredEventGroup {
  /** The name of the event group. */
  name: string;
  /** The address of the notifier of the event group in the asset (e.g. URL) so that a client can access the event group on the asset. */
  dataSource?: string;
  /** Stringified JSON that contains connector-specific configuration for the event group. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventGroupConfiguration?: string;
  /** Destinations for events. Default destinations when destinations is not defined at the event level. */
  defaultDestinations?: EventDestinationUnion[];
  /** URI or type definition ID. */
  typeRef?: string;
  /** Array of events that are part of the event group. */
  events?: NamespaceDiscoveredEvent[];
}

export function namespaceDiscoveredEventGroupSerializer(item: NamespaceDiscoveredEventGroup): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventGroupConfiguration: item["eventGroupConfiguration"],
    defaultDestinations: !item["defaultDestinations"]
      ? item["defaultDestinations"]
      : eventDestinationUnionArraySerializer(item["defaultDestinations"]),
    typeRef: item["typeRef"],
    events: !item["events"]
      ? item["events"]
      : namespaceDiscoveredEventArraySerializer(item["events"]),
  };
}

export function namespaceDiscoveredEventGroupDeserializer(
  item: any,
): NamespaceDiscoveredEventGroup {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventGroupConfiguration: item["eventGroupConfiguration"],
    defaultDestinations: !item["defaultDestinations"]
      ? item["defaultDestinations"]
      : eventDestinationUnionArrayDeserializer(item["defaultDestinations"]),
    typeRef: item["typeRef"],
    events: !item["events"]
      ? item["events"]
      : namespaceDiscoveredEventArrayDeserializer(item["events"]),
  };
}

export function namespaceDiscoveredEventArraySerializer(
  result: Array<NamespaceDiscoveredEvent>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredEventSerializer(item);
  });
}

export function namespaceDiscoveredEventArrayDeserializer(
  result: Array<NamespaceDiscoveredEvent>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredEventDeserializer(item);
  });
}

/** Defines the event properties. */
export interface NamespaceDiscoveredEvent {
  /** The name of the event. */
  name: string;
  /** Reference to a data source for a given event. */
  dataSource?: string;
  /** Stringified JSON that contains connector-specific configuration for the event. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventConfiguration?: string;
  /** Destinations for an event. */
  destinations?: EventDestinationUnion[];
  /** URI or type definition ID. */
  typeRef?: string;
  /** UTC timestamp indicating when the event was added or modified. */
  lastUpdatedOn?: Date;
}

export function namespaceDiscoveredEventSerializer(item: NamespaceDiscoveredEvent): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventConfiguration: item["eventConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : eventDestinationUnionArraySerializer(item["destinations"]),
    typeRef: item["typeRef"],
    lastUpdatedOn: !item["lastUpdatedOn"]
      ? item["lastUpdatedOn"]
      : item["lastUpdatedOn"].toISOString(),
  };
}

export function namespaceDiscoveredEventDeserializer(item: any): NamespaceDiscoveredEvent {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    eventConfiguration: item["eventConfiguration"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : eventDestinationUnionArrayDeserializer(item["destinations"]),
    typeRef: item["typeRef"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

export function namespaceDiscoveredStreamArraySerializer(
  result: Array<NamespaceDiscoveredStream>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredStreamSerializer(item);
  });
}

export function namespaceDiscoveredStreamArrayDeserializer(
  result: Array<NamespaceDiscoveredStream>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredStreamDeserializer(item);
  });
}

/** Defines the stream properties. */
export interface NamespaceDiscoveredStream {
  /** Name of the stream definition. */
  name: string;
  /** Stringified JSON that contains connector-specific configuration for the specific stream. */
  streamConfiguration?: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** Destinations for a stream. */
  destinations?: StreamDestinationUnion[];
  /** Timestamp (in UTC) indicating when the stream was added or modified. */
  lastUpdatedOn?: Date;
}

export function namespaceDiscoveredStreamSerializer(item: NamespaceDiscoveredStream): any {
  return {
    name: item["name"],
    streamConfiguration: item["streamConfiguration"],
    typeRef: item["typeRef"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : streamDestinationUnionArraySerializer(item["destinations"]),
    lastUpdatedOn: !item["lastUpdatedOn"]
      ? item["lastUpdatedOn"]
      : item["lastUpdatedOn"].toISOString(),
  };
}

export function namespaceDiscoveredStreamDeserializer(item: any): NamespaceDiscoveredStream {
  return {
    name: item["name"],
    streamConfiguration: item["streamConfiguration"],
    typeRef: item["typeRef"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : streamDestinationUnionArrayDeserializer(item["destinations"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

export function namespaceDiscoveredManagementGroupArraySerializer(
  result: Array<NamespaceDiscoveredManagementGroup>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredManagementGroupSerializer(item);
  });
}

export function namespaceDiscoveredManagementGroupArrayDeserializer(
  result: Array<NamespaceDiscoveredManagementGroup>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredManagementGroupDeserializer(item);
  });
}

/** Defines the management group properties. */
export interface NamespaceDiscoveredManagementGroup {
  /** Name of the management group. */
  name: string;
  /** Stringified JSON that contains connector-specific configuration for the management group. */
  managementGroupConfiguration?: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** Reference to a data source for a given management group. */
  dataSource?: string;
  /** Default MQTT topic path on which a client will receive the request for all actions that are part of the management group. */
  defaultTopic?: string;
  /** Default response timeout for all actions that are part of the management group. */
  defaultTimeoutInSeconds?: number;
  /** Array of actions that are part of the management group. Each action can have an individual configuration. */
  actions?: NamespaceDiscoveredManagementAction[];
  /** Timestamp (in UTC) indicating when the management group was added or modified. */
  lastUpdatedOn?: Date;
}

export function namespaceDiscoveredManagementGroupSerializer(
  item: NamespaceDiscoveredManagementGroup,
): any {
  return {
    name: item["name"],
    managementGroupConfiguration: item["managementGroupConfiguration"],
    typeRef: item["typeRef"],
    dataSource: item["dataSource"],
    defaultTopic: item["defaultTopic"],
    defaultTimeoutInSeconds: item["defaultTimeoutInSeconds"],
    actions: !item["actions"]
      ? item["actions"]
      : namespaceDiscoveredManagementActionArraySerializer(item["actions"]),
    lastUpdatedOn: !item["lastUpdatedOn"]
      ? item["lastUpdatedOn"]
      : item["lastUpdatedOn"].toISOString(),
  };
}

export function namespaceDiscoveredManagementGroupDeserializer(
  item: any,
): NamespaceDiscoveredManagementGroup {
  return {
    name: item["name"],
    managementGroupConfiguration: item["managementGroupConfiguration"],
    typeRef: item["typeRef"],
    dataSource: item["dataSource"],
    defaultTopic: item["defaultTopic"],
    defaultTimeoutInSeconds: item["defaultTimeoutInSeconds"],
    actions: !item["actions"]
      ? item["actions"]
      : namespaceDiscoveredManagementActionArrayDeserializer(item["actions"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

export function namespaceDiscoveredManagementActionArraySerializer(
  result: Array<NamespaceDiscoveredManagementAction>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredManagementActionSerializer(item);
  });
}

export function namespaceDiscoveredManagementActionArrayDeserializer(
  result: Array<NamespaceDiscoveredManagementAction>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredManagementActionDeserializer(item);
  });
}

/** Defines the action properties. */
export interface NamespaceDiscoveredManagementAction {
  /** Name of the action. */
  name: string;
  /** Stringified JSON that contains connector-specific configuration for the action. */
  actionConfiguration?: string;
  /** The target URI on which a client can invoke the specific action. */
  targetUri: string;
  /** URI or type definition ID. */
  typeRef?: string;
  /** The MQTT topic path on which a client will receive the request for the action. */
  topic?: string;
  /** The type of the action. */
  actionType?: NamespaceDiscoveredManagementActionType;
  /** Response timeout for the action. */
  timeoutInSeconds?: number;
  /** Timestamp (in UTC) indicating when the management action was added or modified. */
  lastUpdatedOn?: Date;
}

export function namespaceDiscoveredManagementActionSerializer(
  item: NamespaceDiscoveredManagementAction,
): any {
  return {
    name: item["name"],
    actionConfiguration: item["actionConfiguration"],
    targetUri: item["targetUri"],
    typeRef: item["typeRef"],
    topic: item["topic"],
    actionType: item["actionType"],
    timeoutInSeconds: item["timeoutInSeconds"],
    lastUpdatedOn: !item["lastUpdatedOn"]
      ? item["lastUpdatedOn"]
      : item["lastUpdatedOn"].toISOString(),
  };
}

export function namespaceDiscoveredManagementActionDeserializer(
  item: any,
): NamespaceDiscoveredManagementAction {
  return {
    name: item["name"],
    actionConfiguration: item["actionConfiguration"],
    targetUri: item["targetUri"],
    typeRef: item["typeRef"],
    topic: item["topic"],
    actionType: item["actionType"],
    timeoutInSeconds: item["timeoutInSeconds"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** Defines the ManagementAction's type. */
export enum KnownNamespaceDiscoveredManagementActionType {
  /** Call action type. */
  Call = "Call",
  /** Read action type. */
  Read = "Read",
  /** Write action type. */
  Write = "Write",
}

/**
 * Defines the ManagementAction's type. \
 * {@link KnownNamespaceDiscoveredManagementActionType} can be used interchangeably with NamespaceDiscoveredManagementActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Call**: Call action type. \
 * **Read**: Read action type. \
 * **Write**: Write action type.
 */
export type NamespaceDiscoveredManagementActionType = string;

/** The type used for update operations of the NamespaceDiscoveredAsset. */
export interface NamespaceDiscoveredAssetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: NamespaceDiscoveredAssetUpdateProperties;
}

export function namespaceDiscoveredAssetUpdateSerializer(
  item: NamespaceDiscoveredAssetUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceDiscoveredAssetUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the NamespaceDiscoveredAsset. */
export interface NamespaceDiscoveredAssetUpdateProperties {
  /** Reference to the device that provides data for this asset. Must provide device name & endpoint on the device to use. */
  deviceRef?: DeviceRef;
  /** Human-readable display name. */
  displayName?: string;
  /** URIs or type definition IDs. */
  assetTypeRefs?: string[];
  /** Human-readable description of the asset. */
  description?: string;
  /** Identifier used to detect changes in the asset. */
  discoveryId?: string;
  /** An integer that is incremented each time the resource is modified. */
  version?: number;
  /** Asset manufacturer. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Asset hardware revision number. */
  hardwareRevision?: string;
  /** Asset software revision number. */
  softwareRevision?: string;
  /** Asset documentation reference. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes. */
  attributes?: Record<string, any>;
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all streams. Each stream can have its own configuration that overrides the default settings here. */
  defaultStreamsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all management groups. Each management group can have its own configuration that overrides the default settings here. */
  defaultManagementGroupsConfiguration?: string;
  /** Default destinations for a dataset. */
  defaultDatasetsDestinations?: DatasetDestinationUnion[];
  /** Default destinations for an event. */
  defaultEventsDestinations?: EventDestinationUnion[];
  /** Default destinations for a stream. */
  defaultStreamsDestinations?: StreamDestinationUnion[];
  /** Array of datasets that are part of the asset. Each dataset spec describes the data points that make up the set. */
  datasets?: NamespaceDiscoveredDataset[];
  /** Array of event groups that are part of the asset. Each event group can have per-event group configuration. */
  eventGroups?: NamespaceDiscoveredEventGroup[];
  /** Array of streams that are part of the asset. Each stream can have a per-stream configuration. */
  streams?: NamespaceDiscoveredStream[];
  /** Array of management groups that are part of the asset. Each management group can have a per-group configuration. */
  managementGroups?: NamespaceDiscoveredManagementGroup[];
}

export function namespaceDiscoveredAssetUpdatePropertiesSerializer(
  item: NamespaceDiscoveredAssetUpdateProperties,
): any {
  return {
    deviceRef: !item["deviceRef"] ? item["deviceRef"] : deviceRefSerializer(item["deviceRef"]),
    displayName: item["displayName"],
    assetTypeRefs: !item["assetTypeRefs"]
      ? item["assetTypeRefs"]
      : item["assetTypeRefs"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    discoveryId: item["discoveryId"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultStreamsConfiguration: item["defaultStreamsConfiguration"],
    defaultManagementGroupsConfiguration: item["defaultManagementGroupsConfiguration"],
    defaultDatasetsDestinations: !item["defaultDatasetsDestinations"]
      ? item["defaultDatasetsDestinations"]
      : datasetDestinationUnionArraySerializer(item["defaultDatasetsDestinations"]),
    defaultEventsDestinations: !item["defaultEventsDestinations"]
      ? item["defaultEventsDestinations"]
      : eventDestinationUnionArraySerializer(item["defaultEventsDestinations"]),
    defaultStreamsDestinations: !item["defaultStreamsDestinations"]
      ? item["defaultStreamsDestinations"]
      : streamDestinationUnionArraySerializer(item["defaultStreamsDestinations"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : namespaceDiscoveredDatasetArraySerializer(item["datasets"]),
    eventGroups: !item["eventGroups"]
      ? item["eventGroups"]
      : namespaceDiscoveredEventGroupArraySerializer(item["eventGroups"]),
    streams: !item["streams"]
      ? item["streams"]
      : namespaceDiscoveredStreamArraySerializer(item["streams"]),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : namespaceDiscoveredManagementGroupArraySerializer(item["managementGroups"]),
  };
}

/** The response of a NamespaceDiscoveredAsset list operation. */
export interface _NamespaceDiscoveredAssetListResult {
  /** The NamespaceDiscoveredAsset items on this page */
  value: NamespaceDiscoveredAsset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespaceDiscoveredAssetListResultDeserializer(
  item: any,
): _NamespaceDiscoveredAssetListResult {
  return {
    value: namespaceDiscoveredAssetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceDiscoveredAssetArraySerializer(
  result: Array<NamespaceDiscoveredAsset>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredAssetSerializer(item);
  });
}

export function namespaceDiscoveredAssetArrayDeserializer(
  result: Array<NamespaceDiscoveredAsset>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredAssetDeserializer(item);
  });
}

/** Discovered device definition. */
export interface NamespaceDiscoveredDevice extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NamespaceDiscoveredDeviceProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function namespaceDiscoveredDeviceSerializer(item: NamespaceDiscoveredDevice): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceDiscoveredDevicePropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function namespaceDiscoveredDeviceDeserializer(item: any): NamespaceDiscoveredDevice {
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
      : namespaceDiscoveredDevicePropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the discovered device properties. */
export interface NamespaceDiscoveredDeviceProperties {
  /** A device ID that represents the device in a system external to Azure. Unique within scope of an Azure tenant. */
  externalDeviceId?: string;
  /** Endpoints for discovered devices. */
  endpoints?: DiscoveredMessagingEndpoints;
  /** Device manufacturer. */
  manufacturer?: string;
  /** Device model. */
  model?: string;
  /** Device operating system name. */
  operatingSystem?: string;
  /** Device operating system version. */
  operatingSystemVersion?: string;
  /** A set of key-value pairs that contain custom attributes. */
  attributes?: Record<string, any>;
  /** Identifier used to detect changes in the discovered device. */
  discoveryId: string;
  /** An integer that is incremented each time the resource is modified. */
  version: number;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function namespaceDiscoveredDevicePropertiesSerializer(
  item: NamespaceDiscoveredDeviceProperties,
): any {
  return {
    externalDeviceId: item["externalDeviceId"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : discoveredMessagingEndpointsSerializer(item["endpoints"]),
    manufacturer: item["manufacturer"],
    model: item["model"],
    operatingSystem: item["operatingSystem"],
    operatingSystemVersion: item["operatingSystemVersion"],
    attributes: item["attributes"],
    discoveryId: item["discoveryId"],
    version: item["version"],
  };
}

export function namespaceDiscoveredDevicePropertiesDeserializer(
  item: any,
): NamespaceDiscoveredDeviceProperties {
  return {
    externalDeviceId: item["externalDeviceId"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : discoveredMessagingEndpointsDeserializer(item["endpoints"]),
    manufacturer: item["manufacturer"],
    model: item["model"],
    operatingSystem: item["operatingSystem"],
    operatingSystemVersion: item["operatingSystemVersion"],
    attributes: item["attributes"],
    discoveryId: item["discoveryId"],
    version: item["version"],
    provisioningState: item["provisioningState"],
  };
}

/** Connection endpoint URL a device can use to connect to a service. */
export interface DiscoveredMessagingEndpoints {
  /** Set of endpoints to connect to the device. */
  inbound?: Record<string, DiscoveredInboundEndpoints>;
  /** Set of endpoints a device can connect to. */
  outbound?: DiscoveredOutboundEndpoints;
}

export function discoveredMessagingEndpointsSerializer(item: DiscoveredMessagingEndpoints): any {
  return {
    inbound: !item["inbound"]
      ? item["inbound"]
      : discoveredInboundEndpointsRecordSerializer(item["inbound"]),
    outbound: !item["outbound"]
      ? item["outbound"]
      : discoveredOutboundEndpointsSerializer(item["outbound"]),
  };
}

export function discoveredMessagingEndpointsDeserializer(item: any): DiscoveredMessagingEndpoints {
  return {
    inbound: !item["inbound"]
      ? item["inbound"]
      : discoveredInboundEndpointsRecordDeserializer(item["inbound"]),
    outbound: !item["outbound"]
      ? item["outbound"]
      : discoveredOutboundEndpointsDeserializer(item["outbound"]),
  };
}

export function discoveredInboundEndpointsRecordSerializer(
  item: Record<string, DiscoveredInboundEndpoints>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : discoveredInboundEndpointsSerializer(item[key]);
  });
  return result;
}

export function discoveredInboundEndpointsRecordDeserializer(
  item: Record<string, any>,
): Record<string, DiscoveredInboundEndpoints> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : discoveredInboundEndpointsDeserializer(item[key]);
  });
  return result;
}

/** An endpoint to connect to the device. */
export interface DiscoveredInboundEndpoints {
  /** Type of connection endpoint. */
  endpointType: string;
  /** The endpoint address & port. This can be either an IP address (e.g., 192.168.1.1) or a fully qualified domain name (FQDN, e.g., server.example.com). */
  address: string;
  /** Protocol version associated with the endpoint e.g. 1 or 2 for endpointType Microsoft.HTTP, and 3.5 or 5.0 for endpointType Microsoft.Mqtt etc. */
  version?: string;
  /** List of supported authentication methods supported by device for Inbound connections. */
  supportedAuthenticationMethods?: AuthenticationMethod[];
  /** Stringified JSON that contains configuration to be used by the connector (e.g., OPC UA, ONVIF). */
  additionalConfiguration?: string;
  /** The timestamp (in UTC) when the endpoint was discovered. */
  lastUpdatedOn?: Date;
}

export function discoveredInboundEndpointsSerializer(item: DiscoveredInboundEndpoints): any {
  return {
    endpointType: item["endpointType"],
    address: item["address"],
    version: item["version"],
    supportedAuthenticationMethods: !item["supportedAuthenticationMethods"]
      ? item["supportedAuthenticationMethods"]
      : item["supportedAuthenticationMethods"].map((p: any) => {
          return p;
        }),
    additionalConfiguration: item["additionalConfiguration"],
    lastUpdatedOn: !item["lastUpdatedOn"]
      ? item["lastUpdatedOn"]
      : item["lastUpdatedOn"].toISOString(),
  };
}

export function discoveredInboundEndpointsDeserializer(item: any): DiscoveredInboundEndpoints {
  return {
    endpointType: item["endpointType"],
    address: item["address"],
    version: item["version"],
    supportedAuthenticationMethods: !item["supportedAuthenticationMethods"]
      ? item["supportedAuthenticationMethods"]
      : item["supportedAuthenticationMethods"].map((p: any) => {
          return p;
        }),
    additionalConfiguration: item["additionalConfiguration"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** Property bag contains the device's outbound endpoints */
export interface DiscoveredOutboundEndpoints {
  /** Endpoints the device can connect to. */
  assigned: Record<string, DeviceMessagingEndpoint>;
}

export function discoveredOutboundEndpointsSerializer(item: DiscoveredOutboundEndpoints): any {
  return {
    assigned: deviceMessagingEndpointRecordSerializer(item["assigned"]),
  };
}

export function discoveredOutboundEndpointsDeserializer(item: any): DiscoveredOutboundEndpoints {
  return {
    assigned: deviceMessagingEndpointRecordDeserializer(item["assigned"]),
  };
}

/** The type used for update operations of the NamespaceDiscoveredDevice. */
export interface NamespaceDiscoveredDeviceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: NamespaceDiscoveredDeviceUpdateProperties;
}

export function namespaceDiscoveredDeviceUpdateSerializer(
  item: NamespaceDiscoveredDeviceUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : namespaceDiscoveredDeviceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the NamespaceDiscoveredDevice. */
export interface NamespaceDiscoveredDeviceUpdateProperties {
  /** A device ID that represents the device in a system external to Azure. Unique within scope of an Azure tenant. */
  externalDeviceId?: string;
  /** Endpoints for discovered devices. */
  endpoints?: DiscoveredMessagingEndpoints;
  /** Device operating system version. */
  operatingSystemVersion?: string;
  /** A set of key-value pairs that contain custom attributes. */
  attributes?: Record<string, any>;
  /** Identifier used to detect changes in the discovered device. */
  discoveryId?: string;
  /** An integer that is incremented each time the resource is modified. */
  version?: number;
}

export function namespaceDiscoveredDeviceUpdatePropertiesSerializer(
  item: NamespaceDiscoveredDeviceUpdateProperties,
): any {
  return {
    externalDeviceId: item["externalDeviceId"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : discoveredMessagingEndpointsSerializer(item["endpoints"]),
    operatingSystemVersion: item["operatingSystemVersion"],
    attributes: item["attributes"],
    discoveryId: item["discoveryId"],
    version: item["version"],
  };
}

/** The response of a NamespaceDiscoveredDevice list operation. */
export interface _NamespaceDiscoveredDeviceListResult {
  /** The NamespaceDiscoveredDevice items on this page */
  value: NamespaceDiscoveredDevice[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespaceDiscoveredDeviceListResultDeserializer(
  item: any,
): _NamespaceDiscoveredDeviceListResult {
  return {
    value: namespaceDiscoveredDeviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceDiscoveredDeviceArraySerializer(
  result: Array<NamespaceDiscoveredDevice>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredDeviceSerializer(item);
  });
}

export function namespaceDiscoveredDeviceArrayDeserializer(
  result: Array<NamespaceDiscoveredDevice>,
): any[] {
  return result.map((item) => {
    return namespaceDiscoveredDeviceDeserializer(item);
  });
}

/** Schema registry definition. */
export interface SchemaRegistry extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaRegistryProperties;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
}

export function schemaRegistrySerializer(item: SchemaRegistry): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : schemaRegistryPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

export function schemaRegistryDeserializer(item: any): SchemaRegistry {
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
      : schemaRegistryPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Defines the schema registry properties. */
export interface SchemaRegistryProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Schema registry namespace. Uniquely identifies a schema registry within a tenant. */
  namespace: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the schema registry. */
  description?: string;
  /** The Storage Account's Container URL where schemas will be stored. */
  storageAccountContainerUrl: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function schemaRegistryPropertiesSerializer(item: SchemaRegistryProperties): any {
  return {
    namespace: item["namespace"],
    displayName: item["displayName"],
    description: item["description"],
    storageAccountContainerUrl: item["storageAccountContainerUrl"],
  };
}

export function schemaRegistryPropertiesDeserializer(item: any): SchemaRegistryProperties {
  return {
    uuid: item["uuid"],
    namespace: item["namespace"],
    displayName: item["displayName"],
    description: item["description"],
    storageAccountContainerUrl: item["storageAccountContainerUrl"],
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the SchemaRegistry. */
export interface SchemaRegistryUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: SchemaRegistryUpdateProperties;
}

export function schemaRegistryUpdateSerializer(item: SchemaRegistryUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : schemaRegistryUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the SchemaRegistry. */
export interface SchemaRegistryUpdateProperties {
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the schema registry. */
  description?: string;
}

export function schemaRegistryUpdatePropertiesSerializer(
  item: SchemaRegistryUpdateProperties,
): any {
  return { displayName: item["displayName"], description: item["description"] };
}

/** The response of a SchemaRegistry list operation. */
export interface _SchemaRegistryListResult {
  /** The SchemaRegistry items on this page */
  value: SchemaRegistry[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaRegistryListResultDeserializer(item: any): _SchemaRegistryListResult {
  return {
    value: schemaRegistryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaRegistryArraySerializer(result: Array<SchemaRegistry>): any[] {
  return result.map((item) => {
    return schemaRegistrySerializer(item);
  });
}

export function schemaRegistryArrayDeserializer(result: Array<SchemaRegistry>): any[] {
  return result.map((item) => {
    return schemaRegistryDeserializer(item);
  });
}

/** Schema definition. */
export interface Schema extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaProperties;
}

export function schemaSerializer(item: Schema): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schemaPropertiesSerializer(item["properties"]),
  };
}

export function schemaDeserializer(item: any): Schema {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schemaPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the schema properties. */
export interface SchemaProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the schema. */
  description?: string;
  /** Format of the schema. */
  format: Format;
  /** Type of the schema. */
  schemaType: SchemaType;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Schema tags. */
  tags?: Record<string, string>;
}

export function schemaPropertiesSerializer(item: SchemaProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    format: item["format"],
    schemaType: item["schemaType"],
    tags: item["tags"],
  };
}

export function schemaPropertiesDeserializer(item: any): SchemaProperties {
  return {
    uuid: item["uuid"],
    displayName: item["displayName"],
    description: item["description"],
    format: item["format"],
    schemaType: item["schemaType"],
    provisioningState: item["provisioningState"],
    tags: item["tags"],
  };
}

/** Defines the schema format. */
export enum KnownFormat {
  /** JSON Schema version draft 7 format */
  JsonSchemaDraft7 = "JsonSchema/draft-07",
  /** Delta format */
  Delta10 = "Delta/1.0",
}

/**
 * Defines the schema format. \
 * {@link KnownFormat} can be used interchangeably with Format,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **JsonSchema\/draft-07**: JSON Schema version draft 7 format \
 * **Delta\/1.0**: Delta format
 */
export type Format = string;

/** Defines the schema type. */
export enum KnownSchemaType {
  /** Message Schema schema type */
  MessageSchema = "MessageSchema",
}

/**
 * Defines the schema type. \
 * {@link KnownSchemaType} can be used interchangeably with SchemaType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MessageSchema**: Message Schema schema type
 */
export type SchemaType = string;

/** The response of a Schema list operation. */
export interface _SchemaListResult {
  /** The Schema items on this page */
  value: Schema[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaListResultDeserializer(item: any): _SchemaListResult {
  return {
    value: schemaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaArraySerializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaSerializer(item);
  });
}

export function schemaArrayDeserializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaDeserializer(item);
  });
}

/** Schema version's definition. */
export interface SchemaVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaVersionProperties;
}

export function schemaVersionSerializer(item: SchemaVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesSerializer(item["properties"]),
  };
}

export function schemaVersionDeserializer(item: any): SchemaVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the schema version properties. */
export interface SchemaVersionProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Human-readable description of the schema. */
  description?: string;
  /** Schema content. */
  schemaContent: string;
  /** Hash of the schema content. */
  readonly hash?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function schemaVersionPropertiesSerializer(item: SchemaVersionProperties): any {
  return {
    description: item["description"],
    schemaContent: item["schemaContent"],
  };
}

export function schemaVersionPropertiesDeserializer(item: any): SchemaVersionProperties {
  return {
    uuid: item["uuid"],
    description: item["description"],
    schemaContent: item["schemaContent"],
    hash: item["hash"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a SchemaVersion list operation. */
export interface _SchemaVersionListResult {
  /** The SchemaVersion items on this page */
  value: SchemaVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaVersionListResultDeserializer(item: any): _SchemaVersionListResult {
  return {
    value: schemaVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaVersionArraySerializer(result: Array<SchemaVersion>): any[] {
  return result.map((item) => {
    return schemaVersionSerializer(item);
  });
}

export function schemaVersionArrayDeserializer(result: Array<SchemaVersion>): any[] {
  return result.map((item) => {
    return schemaVersionDeserializer(item);
  });
}

/** Microsoft.DeviceRegistry Resource Provider supported API versions. */
export enum KnownVersions {
  /** Microsoft.DeviceRegistry Resource Provider management API version 2024-11-01. */
  V20241101 = "2024-11-01",
  /** Microsoft.DeviceRegistry Resource Provider management API version 2025-10-01. */
  V20251001 = "2025-10-01",
}
