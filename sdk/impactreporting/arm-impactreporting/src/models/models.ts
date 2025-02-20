// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A connector is a resource that can be used to proactively report impacts against workloads in Azure to Microsoft. */
export interface Connector extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ConnectorProperties;
}

export function connectorSerializer(item: Connector): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectorPropertiesSerializer(item["properties"]),
  };
}

export function connectorDeserializer(item: any): Connector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : connectorPropertiesDeserializer(item["properties"]),
  };
}

/** Details of the Connector. */
export interface ConnectorProperties {
  /** Resource provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** unique id of the connector. */
  readonly connectorId: string;
  /** tenant id of this connector */
  readonly tenantId: string;
  /** connector type */
  connectorType: Platform;
  /** last run time stamp of this connector in UTC time zone */
  readonly lastRunTimeStamp: Date;
}

export function connectorPropertiesSerializer(item: ConnectorProperties): any {
  return { connectorType: item["connectorType"] };
}

export function connectorPropertiesDeserializer(item: any): ConnectorProperties {
  return {
    provisioningState: item["provisioningState"],
    connectorId: item["connectorId"],
    tenantId: item["tenantId"],
    connectorType: item["connectorType"],
    lastRunTimeStamp: new Date(item["lastRunTimeStamp"]),
  };
}

/** Provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Provisioning Succeeded */
  Succeeded = "Succeeded",
  /** Provisioning Failed */
  Failed = "Failed",
  /** Provisioning Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Provisioning Succeeded \
 * **Failed**: Provisioning Failed \
 * **Canceled**: Provisioning Canceled
 */
export type ProvisioningState = string;

/** Enum for connector types */
export enum KnownPlatform {
  /** Type of Azure Monitor */
  AzureMonitor = "AzureMonitor",
}

/**
 * Enum for connector types \
 * {@link KnownPlatform} can be used interchangeably with Platform,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureMonitor**: Type of Azure Monitor
 */
export type Platform = string;

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

/** The type used for update operations of the Connector. */
export interface ConnectorUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ConnectorUpdateProperties;
}

export function connectorUpdateSerializer(item: ConnectorUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectorUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Connector. */
export interface ConnectorUpdateProperties {
  /** connector type */
  connectorType?: Platform;
}

export function connectorUpdatePropertiesSerializer(item: ConnectorUpdateProperties): any {
  return { connectorType: item["connectorType"] };
}

/** The response of a Connector list operation. */
export interface _ConnectorListResult {
  /** The Connector items on this page */
  value: Connector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectorListResultDeserializer(item: any): _ConnectorListResult {
  return {
    value: connectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectorArraySerializer(result: Array<Connector>): any[] {
  return result.map((item) => {
    return connectorSerializer(item);
  });
}

export function connectorArrayDeserializer(result: Array<Connector>): any[] {
  return result.map((item) => {
    return connectorDeserializer(item);
  });
}

/** Insight resource */
export interface Insight extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: InsightProperties;
}

export function insightSerializer(item: Insight): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : insightPropertiesSerializer(item["properties"]),
  };
}

export function insightDeserializer(item: any): Insight {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : insightPropertiesDeserializer(item["properties"]),
  };
}

/** Impact category properties. */
export interface InsightProperties {
  /** Resource provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** category of the insight. */
  category: string;
  /** status of the insight. example resolved, repaired, other. */
  status?: string;
  /** Identifier of the event that has been correlated with this insight. This can be used to aggregate insights for the same event. */
  eventId?: string;
  /** Identifier that can be used to group similar insights. */
  groupId?: string;
  /** Contains title & description for the insight */
  content: Content;
  /** Time of the event, which has been correlated the impact. */
  eventTime?: Date;
  /** unique id of the insight. */
  insightUniqueId: string;
  /** details of of the impact for which insight has been generated. */
  impact: ImpactDetails;
  /** additional details of the insight. */
  additionalDetails?: Record<string, any>;
}

export function insightPropertiesSerializer(item: InsightProperties): any {
  return {
    category: item["category"],
    status: item["status"],
    eventId: item["eventId"],
    groupId: item["groupId"],
    content: contentSerializer(item["content"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : item["eventTime"].toISOString(),
    insightUniqueId: item["insightUniqueId"],
    impact: impactDetailsSerializer(item["impact"]),
    additionalDetails: !item["additionalDetails"]
      ? item["additionalDetails"]
      : _insightPropertiesAdditionalDetailsSerializer(item["additionalDetails"]),
  };
}

export function insightPropertiesDeserializer(item: any): InsightProperties {
  return {
    provisioningState: item["provisioningState"],
    category: item["category"],
    status: item["status"],
    eventId: item["eventId"],
    groupId: item["groupId"],
    content: contentDeserializer(item["content"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    insightUniqueId: item["insightUniqueId"],
    impact: impactDetailsDeserializer(item["impact"]),
    additionalDetails: !item["additionalDetails"]
      ? item["additionalDetails"]
      : _insightPropertiesAdditionalDetailsDeserializer(item["additionalDetails"]),
  };
}

/** Article details of the insight like title, description etc */
export interface Content {
  /** Title of the insight */
  title: string;
  /** Description of the insight */
  description: string;
}

export function contentSerializer(item: Content): any {
  return { title: item["title"], description: item["description"] };
}

export function contentDeserializer(item: any): Content {
  return {
    title: item["title"],
    description: item["description"],
  };
}

/** details of of the impact for which insight has been generated. */
export interface ImpactDetails {
  /** List of impacted Azure resources. */
  impactedResourceId: string;
  /** Time at which impact was started according to reported impact. */
  startTime: Date;
  /** Time at which impact was ended according to reported impact. */
  endTime?: Date;
  /** Azure Id of the impact. */
  impactId: string;
}

export function impactDetailsSerializer(item: ImpactDetails): any {
  return {
    impactedResourceId: item["impactedResourceId"],
    startTime: item["startTime"].toISOString(),
    endTime: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    impactId: item["impactId"],
  };
}

export function impactDetailsDeserializer(item: any): ImpactDetails {
  return {
    impactedResourceId: item["impactedResourceId"],
    startTime: new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    impactId: item["impactId"],
  };
}

/** model interface _InsightPropertiesAdditionalDetails */
export interface _InsightPropertiesAdditionalDetails {}

export function _insightPropertiesAdditionalDetailsSerializer(
  item: _InsightPropertiesAdditionalDetails,
): any {
  return item;
}

export function _insightPropertiesAdditionalDetailsDeserializer(
  item: any,
): _InsightPropertiesAdditionalDetails {
  return item;
}

/** The response of a Insight list operation. */
export interface _InsightListResult {
  /** The Insight items on this page */
  value: Insight[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _insightListResultDeserializer(item: any): _InsightListResult {
  return {
    value: insightArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function insightArraySerializer(result: Array<Insight>): any[] {
  return result.map((item) => {
    return insightSerializer(item);
  });
}

export function insightArrayDeserializer(result: Array<Insight>): any[] {
  return result.map((item) => {
    return insightDeserializer(item);
  });
}

/** ImpactCategory resource */
export interface ImpactCategory extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ImpactCategoryProperties;
}

export function impactCategoryDeserializer(item: any): ImpactCategory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : impactCategoryPropertiesDeserializer(item["properties"]),
  };
}

/** Impact category properties. */
export interface ImpactCategoryProperties {
  /** Resource provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Unique ID of the category */
  categoryId: string;
  /** Unique ID of the parent category */
  parentCategoryId?: string;
  /** Description of the category */
  description?: string;
  /** The workloadImpact properties which are required when reporting with the impact category */
  requiredImpactProperties?: RequiredImpactProperties[];
}

export function impactCategoryPropertiesDeserializer(item: any): ImpactCategoryProperties {
  return {
    provisioningState: item["provisioningState"],
    categoryId: item["categoryId"],
    parentCategoryId: item["parentCategoryId"],
    description: item["description"],
    requiredImpactProperties: !item["requiredImpactProperties"]
      ? item["requiredImpactProperties"]
      : requiredImpactPropertiesArrayDeserializer(item["requiredImpactProperties"]),
  };
}

export function requiredImpactPropertiesArrayDeserializer(
  result: Array<RequiredImpactProperties>,
): any[] {
  return result.map((item) => {
    return requiredImpactPropertiesDeserializer(item);
  });
}

/** Required impact properties */
export interface RequiredImpactProperties {
  /** Name of the property */
  name: string;
  /** Allowed values values for the property */
  allowedValues?: string[];
}

export function requiredImpactPropertiesDeserializer(item: any): RequiredImpactProperties {
  return {
    name: item["name"],
    allowedValues: !item["allowedValues"]
      ? item["allowedValues"]
      : item["allowedValues"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a ImpactCategory list operation. */
export interface _ImpactCategoryListResult {
  /** The ImpactCategory items on this page */
  value: ImpactCategory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _impactCategoryListResultDeserializer(item: any): _ImpactCategoryListResult {
  return {
    value: impactCategoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function impactCategoryArrayDeserializer(result: Array<ImpactCategory>): any[] {
  return result.map((item) => {
    return impactCategoryDeserializer(item);
  });
}

/** Workload Impact properties */
export interface WorkloadImpact extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadImpactProperties;
}

export function workloadImpactSerializer(item: WorkloadImpact): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadImpactPropertiesSerializer(item["properties"]),
  };
}

export function workloadImpactDeserializer(item: any): WorkloadImpact {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadImpactPropertiesDeserializer(item["properties"]),
  };
}

/** Workload impact properties */
export interface WorkloadImpactProperties {
  /** Resource provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Time at which impact was observed */
  startDateTime: Date;
  /** Time at which impact has ended */
  endDateTime?: Date;
  /** Azure resource id of the impacted resource */
  impactedResourceId: string;
  /** Unique ID of the impact (UUID) */
  readonly impactUniqueId?: string;
  /** Time at which impact is reported */
  readonly reportedTimeUtc?: Date;
  /** Category of the impact,  details can found from /impactCategories API */
  impactCategory: string;
  /** A detailed description of the impact */
  impactDescription?: string;
  /** The ARM correlation ids, this is important field for control plane related impacts */
  armCorrelationIds?: string[];
  /** Details about performance issue. Applicable for performance impacts. */
  performance?: Performance[];
  /** Details about connectivity issue. Applicable when root resource causing the issue is not identified. For example, when a VM is impacted due to a network issue, the impacted resource is identified as the VM, but the root cause is the network. In such cases, the connectivity field will have the details about the network issue */
  connectivity?: Connectivity;
  /** Additional fields related to impact, applicable fields per resource type are list under /impactCategories API */
  additionalProperties?: Record<string, any>;
  /** ARM error code and error message associated with the impact */
  errorDetails?: ErrorDetailProperties;
  /** Information about the impacted workload */
  workload?: Workload;
  /** Use this field to group impacts */
  impactGroupId?: string;
  /** Degree of confidence on the impact being a platform issue */
  confidenceLevel?: ConfidenceLevel;
  /** Client incident details ex: incidentId , incident source */
  clientIncidentDetails?: ClientIncidentDetails;
}

export function workloadImpactPropertiesSerializer(item: WorkloadImpactProperties): any {
  return {
    startDateTime: item["startDateTime"].toISOString(),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : item["endDateTime"].toISOString(),
    impactedResourceId: item["impactedResourceId"],
    impactCategory: item["impactCategory"],
    impactDescription: item["impactDescription"],
    armCorrelationIds: !item["armCorrelationIds"]
      ? item["armCorrelationIds"]
      : item["armCorrelationIds"].map((p: any) => {
          return p;
        }),
    performance: !item["performance"]
      ? item["performance"]
      : performanceArraySerializer(item["performance"]),
    connectivity: !item["connectivity"]
      ? item["connectivity"]
      : connectivitySerializer(item["connectivity"]),
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : _workloadImpactPropertiesAdditionalPropertiesSerializer(item["additionalProperties"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailPropertiesSerializer(item["errorDetails"]),
    workload: !item["workload"] ? item["workload"] : workloadSerializer(item["workload"]),
    impactGroupId: item["impactGroupId"],
    confidenceLevel: item["confidenceLevel"],
    clientIncidentDetails: !item["clientIncidentDetails"]
      ? item["clientIncidentDetails"]
      : clientIncidentDetailsSerializer(item["clientIncidentDetails"]),
  };
}

export function workloadImpactPropertiesDeserializer(item: any): WorkloadImpactProperties {
  return {
    provisioningState: item["provisioningState"],
    startDateTime: new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    impactedResourceId: item["impactedResourceId"],
    impactUniqueId: item["impactUniqueId"],
    reportedTimeUtc: !item["reportedTimeUtc"]
      ? item["reportedTimeUtc"]
      : new Date(item["reportedTimeUtc"]),
    impactCategory: item["impactCategory"],
    impactDescription: item["impactDescription"],
    armCorrelationIds: !item["armCorrelationIds"]
      ? item["armCorrelationIds"]
      : item["armCorrelationIds"].map((p: any) => {
          return p;
        }),
    performance: !item["performance"]
      ? item["performance"]
      : performanceArrayDeserializer(item["performance"]),
    connectivity: !item["connectivity"]
      ? item["connectivity"]
      : connectivityDeserializer(item["connectivity"]),
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : _workloadImpactPropertiesAdditionalPropertiesDeserializer(item["additionalProperties"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailPropertiesDeserializer(item["errorDetails"]),
    workload: !item["workload"] ? item["workload"] : workloadDeserializer(item["workload"]),
    impactGroupId: item["impactGroupId"],
    confidenceLevel: item["confidenceLevel"],
    clientIncidentDetails: !item["clientIncidentDetails"]
      ? item["clientIncidentDetails"]
      : clientIncidentDetailsDeserializer(item["clientIncidentDetails"]),
  };
}

export function performanceArraySerializer(result: Array<Performance>): any[] {
  return result.map((item) => {
    return performanceSerializer(item);
  });
}

export function performanceArrayDeserializer(result: Array<Performance>): any[] {
  return result.map((item) => {
    return performanceDeserializer(item);
  });
}

/** Details about impacted performance metrics. Applicable for performance related impact */
export interface Performance {
  /** Name of the Metric examples:  Disk, IOPs, CPU, GPU, Memory, details can be found from /impactCategories API */
  metricName?: string;
  /** Threshold value for the metric */
  expected?: number;
  /** Observed value for the metric */
  actual?: number;
  /** Max and Min Threshold values for the metric */
  expectedValueRange?: ExpectedValueRange;
  /** Unit of the metric ex: Bytes, Percentage, Count, Seconds, Milliseconds, Bytes/Second, Count/Second, etc.., Other */
  unit?: MetricUnit;
}

export function performanceSerializer(item: Performance): any {
  return {
    metricName: item["metricName"],
    expected: item["expected"],
    actual: item["actual"],
    expectedValueRange: !item["expectedValueRange"]
      ? item["expectedValueRange"]
      : expectedValueRangeSerializer(item["expectedValueRange"]),
    unit: item["unit"],
  };
}

export function performanceDeserializer(item: any): Performance {
  return {
    metricName: item["metricName"],
    expected: item["expected"],
    actual: item["actual"],
    expectedValueRange: !item["expectedValueRange"]
      ? item["expectedValueRange"]
      : expectedValueRangeDeserializer(item["expectedValueRange"]),
    unit: item["unit"],
  };
}

/** Max and Min Threshold values for the metric */
export interface ExpectedValueRange {
  /** Min threshold value for the metric */
  min: number;
  /** Max threshold value for the metric */
  max: number;
}

export function expectedValueRangeSerializer(item: ExpectedValueRange): any {
  return { min: item["min"], max: item["max"] };
}

export function expectedValueRangeDeserializer(item: any): ExpectedValueRange {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** List of unit of the metric. */
export enum KnownMetricUnit {
  /** When measurement is in ByteSeconds */
  ByteSeconds = "ByteSeconds",
  /** When measurement is in Bytes */
  Bytes = "Bytes",
  /** When measurement is in BytesPerSecond */
  BytesPerSecond = "BytesPerSecond",
  /** When measurement is in Cores */
  Cores = "Cores",
  /** When measurement is in Count */
  Count = "Count",
  /** When measurement is in CountPerSecond */
  CountPerSecond = "CountPerSecond",
  /** When measurement is in MilliCores */
  MilliCores = "MilliCores",
  /** When measurement is in MilliSeconds */
  MilliSeconds = "MilliSeconds",
  /** When measurement is in NanoCores */
  NanoCores = "NanoCores",
  /** When measurement is in Percent */
  Percent = "Percent",
  /** When measurement is in Seconds */
  Seconds = "Seconds",
  /** When measurement is in Other than listed */
  Other = "Other",
}

/**
 * List of unit of the metric. \
 * {@link KnownMetricUnit} can be used interchangeably with MetricUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ByteSeconds**: When measurement is in ByteSeconds \
 * **Bytes**: When measurement is in Bytes \
 * **BytesPerSecond**: When measurement is in BytesPerSecond \
 * **Cores**: When measurement is in Cores \
 * **Count**: When measurement is in Count \
 * **CountPerSecond**: When measurement is in CountPerSecond \
 * **MilliCores**: When measurement is in MilliCores \
 * **MilliSeconds**: When measurement is in MilliSeconds \
 * **NanoCores**: When measurement is in NanoCores \
 * **Percent**: When measurement is in Percent \
 * **Seconds**: When measurement is in Seconds \
 * **Other**: When measurement is in Other than listed
 */
export type MetricUnit = string;

/** Details about connectivity issue. Applicable when root resource causing the issue is not identified. For example, when a VM is impacted due to a network issue, the impacted resource could be VM or the network. In such cases, the connectivity field will have the details about both VM and network. */
export interface Connectivity {
  /** Protocol used for the connection */
  protocol?: Protocol;
  /** Port number for the connection */
  port?: number;
  /** Source from which the connection was attempted */
  source?: SourceOrTarget;
  /** target which connection was attempted */
  target?: SourceOrTarget;
}

export function connectivitySerializer(item: Connectivity): any {
  return {
    protocol: item["protocol"],
    port: item["port"],
    source: !item["source"] ? item["source"] : sourceOrTargetSerializer(item["source"]),
    target: !item["target"] ? item["target"] : sourceOrTargetSerializer(item["target"]),
  };
}

export function connectivityDeserializer(item: any): Connectivity {
  return {
    protocol: item["protocol"],
    port: item["port"],
    source: !item["source"] ? item["source"] : sourceOrTargetDeserializer(item["source"]),
    target: !item["target"] ? item["target"] : sourceOrTargetDeserializer(item["target"]),
  };
}

/** List of protocols */
export enum KnownProtocol {
  /** When communication protocol is TCP */
  TCP = "TCP",
  /** When communication protocol is UDP */
  UDP = "UDP",
  /** When communication protocol is HTTP */
  HTTP = "HTTP",
  /** When communication protocol is HTTPS */
  HTTPS = "HTTPS",
  /** When communication protocol is RDP */
  RDP = "RDP",
  /** When communication protocol is FTP */
  FTP = "FTP",
  /** When communication protocol is SSH */
  SSH = "SSH",
  /** When communication protocol is Other */
  Other = "Other",
}

/**
 * List of protocols \
 * {@link KnownProtocol} can be used interchangeably with Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP**: When communication protocol is TCP \
 * **UDP**: When communication protocol is UDP \
 * **HTTP**: When communication protocol is HTTP \
 * **HTTPS**: When communication protocol is HTTPS \
 * **RDP**: When communication protocol is RDP \
 * **FTP**: When communication protocol is FTP \
 * **SSH**: When communication protocol is SSH \
 * **Other**: When communication protocol is Other
 */
export type Protocol = string;

/** Resource details */
export interface SourceOrTarget {
  /** Azure resource id, example /subscription/{subscription}/resourceGroup/{rg}/Microsoft.compute/virtualMachine/{vmName} */
  azureResourceId?: string;
}

export function sourceOrTargetSerializer(item: SourceOrTarget): any {
  return { azureResourceId: item["azureResourceId"] };
}

export function sourceOrTargetDeserializer(item: any): SourceOrTarget {
  return {
    azureResourceId: item["azureResourceId"],
  };
}

/** model interface _WorkloadImpactPropertiesAdditionalProperties */
export interface _WorkloadImpactPropertiesAdditionalProperties {}

export function _workloadImpactPropertiesAdditionalPropertiesSerializer(
  item: _WorkloadImpactPropertiesAdditionalProperties,
): any {
  return item;
}

export function _workloadImpactPropertiesAdditionalPropertiesDeserializer(
  item: any,
): _WorkloadImpactPropertiesAdditionalProperties {
  return item;
}

/** ARM error code and error message associated with the impact */
export interface ErrorDetailProperties {
  /** ARM Error code associated with the impact. */
  errorCode?: string;
  /** ARM Error Message associated with the impact */
  errorMessage?: string;
}

export function errorDetailPropertiesSerializer(item: ErrorDetailProperties): any {
  return { errorCode: item["errorCode"], errorMessage: item["errorMessage"] };
}

export function errorDetailPropertiesDeserializer(item: any): ErrorDetailProperties {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** Information about the impacted workload */
export interface Workload {
  /** the scenario for the workload */
  context?: string;
  /** Tool used to interact with Azure. SDK, AzPortal, etc.., Other */
  toolset?: Toolset;
}

export function workloadSerializer(item: Workload): any {
  return { context: item["context"], toolset: item["toolset"] };
}

export function workloadDeserializer(item: any): Workload {
  return {
    context: item["context"],
    toolset: item["toolset"],
  };
}

/** List of azure interfaces. */
export enum KnownToolset {
  /** If communication toolset is Terraform */
  Terraform = "Terraform",
  /** If communication toolset is Puppet */
  Puppet = "Puppet",
  /** If communication toolset is Chef */
  Chef = "Chef",
  /** If communication toolset is SDK */
  SDK = "SDK",
  /** If communication toolset is Ansible */
  Ansible = "Ansible",
  /** If communication toolset is ARM */
  ARM = "ARM",
  /** If communication toolset is Portal */
  Portal = "Portal",
  /** If communication toolset is Shell */
  Shell = "Shell",
  /** If communication toolset is Other */
  Other = "Other",
}

/**
 * List of azure interfaces. \
 * {@link KnownToolset} can be used interchangeably with Toolset,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Terraform**: If communication toolset is Terraform \
 * **Puppet**: If communication toolset is Puppet \
 * **Chef**: If communication toolset is Chef \
 * **SDK**: If communication toolset is SDK \
 * **Ansible**: If communication toolset is Ansible \
 * **ARM**: If communication toolset is ARM \
 * **Portal**: If communication toolset is Portal \
 * **Shell**: If communication toolset is Shell \
 * **Other**: If communication toolset is Other
 */
export type Toolset = string;

/** Degree of confidence on the impact being a platform issue. */
export enum KnownConfidenceLevel {
  /** Low confidence on azure being the source of impact */
  Low = "Low",
  /** Medium confidence on azure being the source of impact */
  Medium = "Medium",
  /** High confidence on azure being the source of impact */
  High = "High",
}

/**
 * Degree of confidence on the impact being a platform issue. \
 * {@link KnownConfidenceLevel} can be used interchangeably with ConfidenceLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low confidence on azure being the source of impact \
 * **Medium**: Medium confidence on azure being the source of impact \
 * **High**: High confidence on azure being the source of impact
 */
export type ConfidenceLevel = string;

/** Client incident details ex: incidentId , incident source */
export interface ClientIncidentDetails {
  /** Client incident id. ex : id of the incident created to investigate and address the impact if any. */
  clientIncidentId?: string;
  /** Client incident source. ex : source system name where the incident is created */
  clientIncidentSource?: IncidentSource;
}

export function clientIncidentDetailsSerializer(item: ClientIncidentDetails): any {
  return {
    clientIncidentId: item["clientIncidentId"],
    clientIncidentSource: item["clientIncidentSource"],
  };
}

export function clientIncidentDetailsDeserializer(item: any): ClientIncidentDetails {
  return {
    clientIncidentId: item["clientIncidentId"],
    clientIncidentSource: item["clientIncidentSource"],
  };
}

/** List of incident interfaces. */
export enum KnownIncidentSource {
  /** When source of Incident is AzureDevops */
  AzureDevops = "AzureDevops",
  /** When source of Incident is Microsoft ICM */
  ICM = "ICM",
  /** When source of Incident is Jira */
  Jira = "Jira",
  /** When source of Incident is ServiceNow */
  ServiceNow = "ServiceNow",
  /** When source of Incident is Other */
  Other = "Other",
}

/**
 * List of incident interfaces. \
 * {@link KnownIncidentSource} can be used interchangeably with IncidentSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureDevops**: When source of Incident is AzureDevops \
 * **ICM**: When source of Incident is Microsoft ICM \
 * **Jira**: When source of Incident is Jira \
 * **ServiceNow**: When source of Incident is ServiceNow \
 * **Other**: When source of Incident is Other
 */
export type IncidentSource = string;

/** The response of a WorkloadImpact list operation. */
export interface _WorkloadImpactListResult {
  /** The WorkloadImpact items on this page */
  value: WorkloadImpact[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadImpactListResultDeserializer(item: any): _WorkloadImpactListResult {
  return {
    value: workloadImpactArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadImpactArraySerializer(result: Array<WorkloadImpact>): any[] {
  return result.map((item) => {
    return workloadImpactSerializer(item);
  });
}

export function workloadImpactArrayDeserializer(result: Array<WorkloadImpact>): any[] {
  return result.map((item) => {
    return workloadImpactDeserializer(item);
  });
}

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
  user = "user",
  /** Indicates the operation is initiated by a system. */
  system = "system",
  /** Indicates the operation is initiated by a user or system. */
  "user,system" = "user,system",
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

/** API Versions */
export enum KnownVersions {
  /** May 01, 2024 Preview API Version */
  v2024_05_01_preview = "2024-05-01-preview",
}
