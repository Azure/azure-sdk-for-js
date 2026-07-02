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

/** A HealthModel resource */
export interface HealthModel extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: HealthModelProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function healthModelSerializer(item: HealthModel): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : healthModelPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function healthModelDeserializer(item: any): HealthModel {
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
      : healthModelPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** HealthModel properties */
export interface HealthModelProperties {
  /** The status of the last operation. */
  readonly provisioningState?: HealthModelProvisioningState;
}

export function healthModelPropertiesSerializer(_item: HealthModelProperties): any {
  return {};
}

export function healthModelPropertiesDeserializer(item: any): HealthModelProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** Health Model provisioning states */
export enum KnownHealthModelProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Health Model provisioning states \
 * {@link KnownHealthModelProvisioningState} can be used interchangeably with HealthModelProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating** \
 * **Deleting**
 */
export type HealthModelProvisioningState = string;

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

/** The type used for update operations of the HealthModel. */
export interface HealthModelUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function healthModelUpdateSerializer(item: HealthModelUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** The response of a HealthModel list operation. */
export interface _HealthModelListResult {
  /** The HealthModel items on this page */
  value: HealthModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _healthModelListResultDeserializer(item: any): _HealthModelListResult {
  return {
    value: healthModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function healthModelArraySerializer(result: Array<HealthModel>): any[] {
  return result.map((item) => {
    return healthModelSerializer(item);
  });
}

export function healthModelArrayDeserializer(result: Array<HealthModel>): any[] {
  return result.map((item) => {
    return healthModelDeserializer(item);
  });
}

/** A signal definition in a health model */
export interface SignalDefinition extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SignalDefinitionPropertiesUnion;
}

export function signalDefinitionSerializer(item: SignalDefinition): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : signalDefinitionPropertiesUnionSerializer(item["properties"]),
  };
}

export function signalDefinitionDeserializer(item: any): SignalDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : signalDefinitionPropertiesUnionDeserializer(item["properties"]),
  };
}

/** SignalDefinition properties */
export interface SignalDefinitionProperties {
  /** The status of the last operation. */
  readonly provisioningState?: HealthModelProvisioningState;
  /** Display name */
  displayName?: string;
  /** Kind of the signal definition */
  /** The discriminator possible values: AzureResourceMetric, LogAnalyticsQuery, PrometheusMetricsQuery */
  signalKind: SignalKind;
  /** Interval in which the signal is being evaluated. Defaults to PT1M (1 minute). */
  refreshInterval?: RefreshInterval;
  /** Optional set of tags (key-value pairs) */
  tags?: Record<string, string>;
  /** Unit of the signal result (e.g. Bytes, MilliSeconds, Percent, Count)) */
  dataUnit?: string;
  /** Evaluation rules for the signal definition */
  evaluationRules: EvaluationRule;
}

export function signalDefinitionPropertiesSerializer(item: SignalDefinitionProperties): any {
  return {
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: item["tags"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleSerializer(item["evaluationRules"]),
  };
}

export function signalDefinitionPropertiesDeserializer(item: any): SignalDefinitionProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
  };
}

/** Alias for SignalDefinitionPropertiesUnion */
export type SignalDefinitionPropertiesUnion =
  | ResourceMetricSignalDefinitionProperties
  | LogAnalyticsQuerySignalDefinitionProperties
  | PrometheusMetricsSignalDefinitionProperties
  | SignalDefinitionProperties;

export function signalDefinitionPropertiesUnionSerializer(
  item: SignalDefinitionPropertiesUnion,
): any {
  switch (item.signalKind) {
    case "AzureResourceMetric":
      return resourceMetricSignalDefinitionPropertiesSerializer(
        item as ResourceMetricSignalDefinitionProperties,
      );

    case "LogAnalyticsQuery":
      return logAnalyticsQuerySignalDefinitionPropertiesSerializer(
        item as LogAnalyticsQuerySignalDefinitionProperties,
      );

    case "PrometheusMetricsQuery":
      return prometheusMetricsSignalDefinitionPropertiesSerializer(
        item as PrometheusMetricsSignalDefinitionProperties,
      );

    default:
      return signalDefinitionPropertiesSerializer(item);
  }
}

export function signalDefinitionPropertiesUnionDeserializer(
  item: any,
): SignalDefinitionPropertiesUnion {
  switch (item["signalKind"]) {
    case "AzureResourceMetric":
      return resourceMetricSignalDefinitionPropertiesDeserializer(
        item as ResourceMetricSignalDefinitionProperties,
      );

    case "LogAnalyticsQuery":
      return logAnalyticsQuerySignalDefinitionPropertiesDeserializer(
        item as LogAnalyticsQuerySignalDefinitionProperties,
      );

    case "PrometheusMetricsQuery":
      return prometheusMetricsSignalDefinitionPropertiesDeserializer(
        item as PrometheusMetricsSignalDefinitionProperties,
      );

    default:
      return signalDefinitionPropertiesDeserializer(item);
  }
}

/** Supported signal kinds as discriminator */
export enum KnownSignalKind {
  /** AzureResourceMetric */
  AzureResourceMetric = "AzureResourceMetric",
  /** LogAnalyticsQuery */
  LogAnalyticsQuery = "LogAnalyticsQuery",
  /** PrometheusMetricsQuery */
  PrometheusMetricsQuery = "PrometheusMetricsQuery",
  /** External */
  ExternalSignal = "External",
}

/**
 * Supported signal kinds as discriminator \
 * {@link KnownSignalKind} can be used interchangeably with SignalKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureResourceMetric** \
 * **LogAnalyticsQuery** \
 * **PrometheusMetricsQuery** \
 * **External**
 */
export type SignalKind = string;

/** Refresh interval in ISO duration format */
export enum KnownRefreshInterval {
  /** One Minute */
  PT1M = "PT1M",
  /** Five Minutes */
  PT5M = "PT5M",
  /** Ten Minutes */
  PT10M = "PT10M",
  /** Thirty Minutes */
  PT30M = "PT30M",
  /** One Hour */
  PT1H = "PT1H",
  /** Two Hours */
  PT2H = "PT2H",
}

/**
 * Refresh interval in ISO duration format \
 * {@link KnownRefreshInterval} can be used interchangeably with RefreshInterval,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PT1M**: One Minute \
 * **PT5M**: Five Minutes \
 * **PT10M**: Ten Minutes \
 * **PT30M**: Thirty Minutes \
 * **PT1H**: One Hour \
 * **PT2H**: Two Hours
 */
export type RefreshInterval = string;

/** Evaluation rule for a signal definition */
export interface EvaluationRule {
  /** Degraded rule with static threshold. */
  degradedRule?: ThresholdRuleV2;
  /** Unhealthy rule with static threshold. */
  unhealthyRule: ThresholdRuleV2;
}

export function evaluationRuleSerializer(item: EvaluationRule): any {
  return {
    degradedRule: !item["degradedRule"]
      ? item["degradedRule"]
      : thresholdRuleV2Serializer(item["degradedRule"]),
    unhealthyRule: thresholdRuleV2Serializer(item["unhealthyRule"]),
  };
}

export function evaluationRuleDeserializer(item: any): EvaluationRule {
  return {
    degradedRule: !item["degradedRule"]
      ? item["degradedRule"]
      : thresholdRuleV2Deserializer(item["degradedRule"]),
    unhealthyRule: thresholdRuleV2Deserializer(item["unhealthyRule"]),
  };
}

/** Threshold-based evaluation rule for a signal definition */
export interface ThresholdRuleV2 {
  /** Operator how to compare the signal value with the threshold */
  operator: SignalOperator;
  /** Threshold value */
  threshold: number;
}

export function thresholdRuleV2Serializer(item: ThresholdRuleV2): any {
  return { operator: item["operator"], threshold: item["threshold"] };
}

export function thresholdRuleV2Deserializer(item: any): ThresholdRuleV2 {
  return {
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

/** Signal operator */
export enum KnownSignalOperator {
  /** Greater than */
  GreaterThan = "GreaterThan",
  /** Less than */
  LessThan = "LessThan",
  /** Less than or equal to */
  LessThanOrEqual = "LessThanOrEqual",
  /** Greater than or equal to */
  GreaterThanOrEqual = "GreaterThanOrEqual",
  /** Equal to */
  Equal = "Equal",
  /** Not equal to */
  NotEqual = "NotEqual",
}

/**
 * Signal operator \
 * {@link KnownSignalOperator} can be used interchangeably with SignalOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GreaterThan**: Greater than \
 * **LessThan**: Less than \
 * **LessThanOrEqual**: Less than or equal to \
 * **GreaterThanOrEqual**: Greater than or equal to \
 * **Equal**: Equal to \
 * **NotEqual**: Not equal to
 */
export type SignalOperator = string;

/** Azure Resource Metric Signal Definition properties */
export interface ResourceMetricSignalDefinitionProperties extends SignalDefinitionProperties {
  /** Kind of the signal definition */
  signalKind: "AzureResourceMetric";
  /** Metric namespace */
  metricNamespace: string;
  /** Name of the metric */
  metricName: string;
  /** Time range of signal. ISO duration format like PT10M. */
  timeGrain: string;
  /** Type of aggregation to apply to the metric */
  aggregationType: MetricAggregationType;
  /** Optional: Dimension to split by */
  dimension?: string;
  /** Optional: Dimension filter to apply to the dimension. Must only be set if also Dimension is set. */
  dimensionFilter?: string;
}

export function resourceMetricSignalDefinitionPropertiesSerializer(
  item: ResourceMetricSignalDefinitionProperties,
): any {
  return {
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: item["tags"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleSerializer(item["evaluationRules"]),
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    timeGrain: item["timeGrain"],
    aggregationType: item["aggregationType"],
    dimension: item["dimension"],
    dimensionFilter: item["dimensionFilter"],
  };
}

export function resourceMetricSignalDefinitionPropertiesDeserializer(
  item: any,
): ResourceMetricSignalDefinitionProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    timeGrain: item["timeGrain"],
    aggregationType: item["aggregationType"],
    dimension: item["dimension"],
    dimensionFilter: item["dimensionFilter"],
  };
}

/** Metric aggregation type */
export enum KnownMetricAggregationType {
  /** None */
  None = "None",
  /** Average */
  Average = "Average",
  /** Count */
  Count = "Count",
  /** Minimum */
  Minimum = "Minimum",
  /** Maximum */
  Maximum = "Maximum",
  /** Total */
  Total = "Total",
}

/**
 * Metric aggregation type \
 * {@link KnownMetricAggregationType} can be used interchangeably with MetricAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Average** \
 * **Count** \
 * **Minimum** \
 * **Maximum** \
 * **Total**
 */
export type MetricAggregationType = string;

/** Log Analytics Query Signal Definition properties */
export interface LogAnalyticsQuerySignalDefinitionProperties extends SignalDefinitionProperties {
  /** Kind of the signal definition */
  signalKind: "LogAnalyticsQuery";
  /** Query text in KQL syntax */
  queryText: string;
  /** Time range of signal. ISO duration format like PT10M. If not specified, the KQL query must define a time range. */
  timeGrain?: string;
  /** Name of the column in the result set to evaluate against the thresholds. Defaults to the first column in the result set if not specified. The column must be numeric. */
  valueColumnName?: string;
}

export function logAnalyticsQuerySignalDefinitionPropertiesSerializer(
  item: LogAnalyticsQuerySignalDefinitionProperties,
): any {
  return {
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: item["tags"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleSerializer(item["evaluationRules"]),
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
    valueColumnName: item["valueColumnName"],
  };
}

export function logAnalyticsQuerySignalDefinitionPropertiesDeserializer(
  item: any,
): LogAnalyticsQuerySignalDefinitionProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
    valueColumnName: item["valueColumnName"],
  };
}

/** Prometheus Metrics Signal Definition properties */
export interface PrometheusMetricsSignalDefinitionProperties extends SignalDefinitionProperties {
  /** Kind of the signal definition */
  signalKind: "PrometheusMetricsQuery";
  /** Query text in PromQL syntax */
  queryText: string;
  /** Time range of signal. ISO duration format like PT10M. */
  timeGrain?: string;
}

export function prometheusMetricsSignalDefinitionPropertiesSerializer(
  item: PrometheusMetricsSignalDefinitionProperties,
): any {
  return {
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: item["tags"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleSerializer(item["evaluationRules"]),
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
  };
}

export function prometheusMetricsSignalDefinitionPropertiesDeserializer(
  item: any,
): PrometheusMetricsSignalDefinitionProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
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

/** The response of a SignalDefinition list operation. */
export interface _SignalDefinitionListResult {
  /** The SignalDefinition items on this page */
  value: SignalDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _signalDefinitionListResultDeserializer(item: any): _SignalDefinitionListResult {
  return {
    value: signalDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function signalDefinitionArraySerializer(result: Array<SignalDefinition>): any[] {
  return result.map((item) => {
    return signalDefinitionSerializer(item);
  });
}

export function signalDefinitionArrayDeserializer(result: Array<SignalDefinition>): any[] {
  return result.map((item) => {
    return signalDefinitionDeserializer(item);
  });
}

/** An authentication setting in a health model */
export interface AuthenticationSetting extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AuthenticationSettingPropertiesUnion;
}

export function authenticationSettingSerializer(item: AuthenticationSetting): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : authenticationSettingPropertiesUnionSerializer(item["properties"]),
  };
}

export function authenticationSettingDeserializer(item: any): AuthenticationSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : authenticationSettingPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Authentication setting properties */
export interface AuthenticationSettingProperties {
  /** The status of the last operation. */
  readonly provisioningState?: HealthModelProvisioningState;
  /** Display name */
  displayName?: string;
  /** Kind of the authentication setting */
  /** The discriminator possible values: ManagedIdentity */
  authenticationKind: AuthenticationKind;
}

export function authenticationSettingPropertiesSerializer(
  item: AuthenticationSettingProperties,
): any {
  return { displayName: item["displayName"], authenticationKind: item["authenticationKind"] };
}

export function authenticationSettingPropertiesDeserializer(
  item: any,
): AuthenticationSettingProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    authenticationKind: item["authenticationKind"],
  };
}

/** Alias for AuthenticationSettingPropertiesUnion */
export type AuthenticationSettingPropertiesUnion =
  ManagedIdentityAuthenticationSettingProperties | AuthenticationSettingProperties;

export function authenticationSettingPropertiesUnionSerializer(
  item: AuthenticationSettingPropertiesUnion,
): any {
  switch (item.authenticationKind) {
    case "ManagedIdentity":
      return managedIdentityAuthenticationSettingPropertiesSerializer(
        item as ManagedIdentityAuthenticationSettingProperties,
      );

    default:
      return authenticationSettingPropertiesSerializer(item);
  }
}

export function authenticationSettingPropertiesUnionDeserializer(
  item: any,
): AuthenticationSettingPropertiesUnion {
  switch (item["authenticationKind"]) {
    case "ManagedIdentity":
      return managedIdentityAuthenticationSettingPropertiesDeserializer(
        item as ManagedIdentityAuthenticationSettingProperties,
      );

    default:
      return authenticationSettingPropertiesDeserializer(item);
  }
}

/** Supported kinds of authentication settings as discriminator */
export enum KnownAuthenticationKind {
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
}

/**
 * Supported kinds of authentication settings as discriminator \
 * {@link KnownAuthenticationKind} can be used interchangeably with AuthenticationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ManagedIdentity**
 */
export type AuthenticationKind = string;

/** Authentication setting properties for Azure Managed Identity */
export interface ManagedIdentityAuthenticationSettingProperties extends AuthenticationSettingProperties {
  /** Kind of the authentication setting */
  authenticationKind: "ManagedIdentity";
  /** Name of the managed identity to use. Either 'SystemAssigned' or the resourceId of a user-assigned identity. */
  managedIdentityName: string;
}

export function managedIdentityAuthenticationSettingPropertiesSerializer(
  item: ManagedIdentityAuthenticationSettingProperties,
): any {
  return {
    displayName: item["displayName"],
    authenticationKind: item["authenticationKind"],
    managedIdentityName: item["managedIdentityName"],
  };
}

export function managedIdentityAuthenticationSettingPropertiesDeserializer(
  item: any,
): ManagedIdentityAuthenticationSettingProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    authenticationKind: item["authenticationKind"],
    managedIdentityName: item["managedIdentityName"],
  };
}

/** The response of a AuthenticationSetting list operation. */
export interface _AuthenticationSettingListResult {
  /** The AuthenticationSetting items on this page */
  value: AuthenticationSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _authenticationSettingListResultDeserializer(
  item: any,
): _AuthenticationSettingListResult {
  return {
    value: authenticationSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function authenticationSettingArraySerializer(result: Array<AuthenticationSetting>): any[] {
  return result.map((item) => {
    return authenticationSettingSerializer(item);
  });
}

export function authenticationSettingArrayDeserializer(
  result: Array<AuthenticationSetting>,
): any[] {
  return result.map((item) => {
    return authenticationSettingDeserializer(item);
  });
}

/** An entity (aka node) of a health model */
export interface Entity extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EntityProperties;
}

export function entitySerializer(item: Entity): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : entityPropertiesSerializer(item["properties"]),
  };
}

export function entityDeserializer(item: any): Entity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : entityPropertiesDeserializer(item["properties"]),
  };
}

/** Properties which are common across all kinds of entities */
export interface EntityProperties {
  /** The status of the last operation. */
  readonly provisioningState?: HealthModelProvisioningState;
  /** Display name */
  displayName?: string;
  /** Positioning of the entity on the model canvas */
  canvasPosition?: EntityCoordinates;
  /** Visual icon definition. If not set, a default icon is used. */
  icon?: IconDefinition;
  /** Health objective as a percentage of time the entity should be healthy. */
  healthObjective?: number;
  /** Impact of the entity in health state propagation */
  impact?: EntityImpact;
  /** Optional set of tags (key-value pairs) */
  tags?: Record<string, string>;
  /** Signal groups which are assigned to this entity */
  signalGroups?: SignalGroups;
  /** Discovered by which discovery rule. If set, the entity cannot be deleted manually. */
  readonly discoveredBy?: string;
  /** Health state of this entity */
  readonly healthState?: HealthState;
  /** Alert configuration for this entity */
  alerts?: EntityAlerts;
}

export function entityPropertiesSerializer(item: EntityProperties): any {
  return {
    displayName: item["displayName"],
    canvasPosition: !item["canvasPosition"]
      ? item["canvasPosition"]
      : entityCoordinatesSerializer(item["canvasPosition"]),
    icon: !item["icon"] ? item["icon"] : iconDefinitionSerializer(item["icon"]),
    healthObjective: item["healthObjective"],
    impact: item["impact"],
    tags: item["tags"],
    signalGroups: !item["signalGroups"]
      ? item["signalGroups"]
      : signalGroupsSerializer(item["signalGroups"]),
    alerts: !item["alerts"] ? item["alerts"] : entityAlertsSerializer(item["alerts"]),
  };
}

export function entityPropertiesDeserializer(item: any): EntityProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    canvasPosition: !item["canvasPosition"]
      ? item["canvasPosition"]
      : entityCoordinatesDeserializer(item["canvasPosition"]),
    icon: !item["icon"] ? item["icon"] : iconDefinitionDeserializer(item["icon"]),
    healthObjective: item["healthObjective"],
    impact: item["impact"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    signalGroups: !item["signalGroups"]
      ? item["signalGroups"]
      : signalGroupsDeserializer(item["signalGroups"]),
    discoveredBy: item["discoveredBy"],
    healthState: item["healthState"],
    alerts: !item["alerts"] ? item["alerts"] : entityAlertsDeserializer(item["alerts"]),
  };
}

/** Visual position of the entity */
export interface EntityCoordinates {
  /** X Coordinate */
  x: number;
  /** Y Coordinate */
  y: number;
}

export function entityCoordinatesSerializer(item: EntityCoordinates): any {
  return { x: item["x"], y: item["y"] };
}

export function entityCoordinatesDeserializer(item: any): EntityCoordinates {
  return {
    x: item["x"],
    y: item["y"],
  };
}

/** Visual icon definition of an entity */
export interface IconDefinition {
  /** Name of the built-in icon, or 'Custom' to use customData */
  iconName: string;
  /** Custom data. Base64-encoded SVG data. If set, this overrides the built-in icon. */
  customData?: string;
}

export function iconDefinitionSerializer(item: IconDefinition): any {
  return { iconName: item["iconName"], customData: item["customData"] };
}

export function iconDefinitionDeserializer(item: any): IconDefinition {
  return {
    iconName: item["iconName"],
    customData: item["customData"],
  };
}

/** Type of impact an entity has on health state propagation */
export enum KnownEntityImpact {
  /** Standard impact */
  Standard = "Standard",
  /** Limited impact */
  Limited = "Limited",
  /** Suppressed impact */
  Suppressed = "Suppressed",
}

/**
 * Type of impact an entity has on health state propagation \
 * {@link KnownEntityImpact} can be used interchangeably with EntityImpact,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard impact \
 * **Limited**: Limited impact \
 * **Suppressed**: Suppressed impact
 */
export type EntityImpact = string;

/** Contains various signal groups that can be assigned to an entity */
export interface SignalGroups {
  /** Azure Resource Signal Group */
  azureResource?: AzureResourceSignals;
  /** Log Analytics Signal Group */
  azureLogAnalytics?: LogAnalyticsSignals;
  /** Azure Monitor Workspace Signal Group */
  azureMonitorWorkspace?: AzureMonitorWorkspaceSignals;
  /** Settings for dependency signals to control how the health state of child entities influences the health state of the parent entity. */
  dependencies?: DependenciesSignalGroupV2;
  /** List of signals which have been externally submitted for this entity. */
  readonly external?: ExternalSignalGroup;
}

export function signalGroupsSerializer(item: SignalGroups): any {
  return {
    azureResource: !item["azureResource"]
      ? item["azureResource"]
      : azureResourceSignalsSerializer(item["azureResource"]),
    azureLogAnalytics: !item["azureLogAnalytics"]
      ? item["azureLogAnalytics"]
      : logAnalyticsSignalsSerializer(item["azureLogAnalytics"]),
    azureMonitorWorkspace: !item["azureMonitorWorkspace"]
      ? item["azureMonitorWorkspace"]
      : azureMonitorWorkspaceSignalsSerializer(item["azureMonitorWorkspace"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : dependenciesSignalGroupV2Serializer(item["dependencies"]),
  };
}

export function signalGroupsDeserializer(item: any): SignalGroups {
  return {
    azureResource: !item["azureResource"]
      ? item["azureResource"]
      : azureResourceSignalsDeserializer(item["azureResource"]),
    azureLogAnalytics: !item["azureLogAnalytics"]
      ? item["azureLogAnalytics"]
      : logAnalyticsSignalsDeserializer(item["azureLogAnalytics"]),
    azureMonitorWorkspace: !item["azureMonitorWorkspace"]
      ? item["azureMonitorWorkspace"]
      : azureMonitorWorkspaceSignalsDeserializer(item["azureMonitorWorkspace"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : dependenciesSignalGroupV2Deserializer(item["dependencies"]),
    external: !item["external"]
      ? item["external"]
      : externalSignalGroupDeserializer(item["external"]),
  };
}

/** A grouping of Azure resource signals */
export interface AzureResourceSignals {
  /** Reference to the name of the authentication setting which is used for querying the data source. */
  authenticationSetting: string;
  /** Azure resource ID */
  azureResourceId: string;
  /** Azure resource kind (e.g., 'functionapp'). Populated by the UI for icon rendering. Can be null if not populated. */
  azureResourceKind?: string;
  /** Signals assigned to this group. */
  signals?: AzureResourceSignal[];
}

export function azureResourceSignalsSerializer(item: AzureResourceSignals): any {
  return {
    authenticationSetting: item["authenticationSetting"],
    azureResourceId: item["azureResourceId"],
    azureResourceKind: item["azureResourceKind"],
    signals: !item["signals"]
      ? item["signals"]
      : azureResourceSignalArraySerializer(item["signals"]),
  };
}

export function azureResourceSignalsDeserializer(item: any): AzureResourceSignals {
  return {
    authenticationSetting: item["authenticationSetting"],
    azureResourceId: item["azureResourceId"],
    azureResourceKind: item["azureResourceKind"],
    signals: !item["signals"]
      ? item["signals"]
      : azureResourceSignalArrayDeserializer(item["signals"]),
  };
}

export function azureResourceSignalArraySerializer(result: Array<AzureResourceSignal>): any[] {
  return result.map((item) => {
    return azureResourceSignalSerializer(item);
  });
}

export function azureResourceSignalArrayDeserializer(result: Array<AzureResourceSignal>): any[] {
  return result.map((item) => {
    return azureResourceSignalDeserializer(item);
  });
}

/** An Azure Resource Metric signal instance assigned to an entity. */
export interface AzureResourceSignal extends SignalInstanceProperties {
  /** Kind of the signal instance */
  signalKind: "AzureResourceMetric";
  /** Metric namespace */
  metricNamespace?: string;
  /** Name of the metric */
  metricName?: string;
  /** Time range of signal. ISO duration format like PT10M. */
  timeGrain?: string;
  /** Type of aggregation to apply to the metric */
  aggregationType?: MetricAggregationType;
  /** Optional: Dimension to split by */
  dimension?: string;
  /** Optional: Dimension filter to apply to the dimension. Must only be set if also Dimension is set. */
  dimensionFilter?: string;
  /** Display name */
  displayName?: string;
  /** Interval in which the signal is being evaluated. Defaults to PT1M (1 minute). */
  refreshInterval?: RefreshInterval;
  /** Unit of the signal result (e.g. Bytes, MilliSeconds, Percent, Count)) */
  dataUnit?: string;
  /** Evaluation rules for the signal definition */
  evaluationRules?: EvaluationRule;
}

export function azureResourceSignalSerializer(item: AzureResourceSignal): any {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    timeGrain: item["timeGrain"],
    aggregationType: item["aggregationType"],
    dimension: item["dimension"],
    dimensionFilter: item["dimensionFilter"],
    displayName: item["displayName"],
    refreshInterval: item["refreshInterval"],
    dataUnit: item["dataUnit"],
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : evaluationRuleSerializer(item["evaluationRules"]),
  };
}

export function azureResourceSignalDeserializer(item: any): AzureResourceSignal {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    status: !item["status"] ? item["status"] : signalStatusDeserializer(item["status"]),
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    timeGrain: item["timeGrain"],
    aggregationType: item["aggregationType"],
    dimension: item["dimension"],
    dimensionFilter: item["dimensionFilter"],
    displayName: item["displayName"],
    refreshInterval: item["refreshInterval"],
    dataUnit: item["dataUnit"],
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : evaluationRuleDeserializer(item["evaluationRules"]),
  };
}

/** A grouping of Log Analytics workspace signals. */
export interface LogAnalyticsSignals {
  /** Reference to the name of the authentication setting which is used for querying the data source. */
  authenticationSetting: string;
  /** Log Analytics workspace resource ID. */
  logAnalyticsWorkspaceResourceId: string;
  /** Signals assigned to this group. */
  signals?: LogAnalyticsSignal[];
}

export function logAnalyticsSignalsSerializer(item: LogAnalyticsSignals): any {
  return {
    authenticationSetting: item["authenticationSetting"],
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    signals: !item["signals"]
      ? item["signals"]
      : logAnalyticsSignalArraySerializer(item["signals"]),
  };
}

export function logAnalyticsSignalsDeserializer(item: any): LogAnalyticsSignals {
  return {
    authenticationSetting: item["authenticationSetting"],
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    signals: !item["signals"]
      ? item["signals"]
      : logAnalyticsSignalArrayDeserializer(item["signals"]),
  };
}

export function logAnalyticsSignalArraySerializer(result: Array<LogAnalyticsSignal>): any[] {
  return result.map((item) => {
    return logAnalyticsSignalSerializer(item);
  });
}

export function logAnalyticsSignalArrayDeserializer(result: Array<LogAnalyticsSignal>): any[] {
  return result.map((item) => {
    return logAnalyticsSignalDeserializer(item);
  });
}

/** A Log Analytics Query signal instance assigned to an entity. */
export interface LogAnalyticsSignal extends SignalInstanceProperties {
  /** Kind of the signal instance */
  signalKind: "LogAnalyticsQuery";
  /** Query text in KQL syntax */
  queryText?: string;
  /** Time range of signal. ISO duration format like PT10M. If not specified, the KQL query must define a time range. */
  timeGrain?: string;
  /** Name of the column in the result set to evaluate against the thresholds. Defaults to the first column in the result set if not specified. The column must be numeric. */
  valueColumnName?: string;
  /** Display name */
  displayName?: string;
  /** Interval in which the signal is being evaluated. Defaults to PT1M (1 minute). */
  refreshInterval?: RefreshInterval;
  /** Unit of the signal result (e.g. Bytes, MilliSeconds, Percent, Count)) */
  dataUnit?: string;
  /** Evaluation rules for the signal definition */
  evaluationRules?: EvaluationRule;
}

export function logAnalyticsSignalSerializer(item: LogAnalyticsSignal): any {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
    valueColumnName: item["valueColumnName"],
    displayName: item["displayName"],
    refreshInterval: item["refreshInterval"],
    dataUnit: item["dataUnit"],
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : evaluationRuleSerializer(item["evaluationRules"]),
  };
}

export function logAnalyticsSignalDeserializer(item: any): LogAnalyticsSignal {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    status: !item["status"] ? item["status"] : signalStatusDeserializer(item["status"]),
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
    valueColumnName: item["valueColumnName"],
    displayName: item["displayName"],
    refreshInterval: item["refreshInterval"],
    dataUnit: item["dataUnit"],
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : evaluationRuleDeserializer(item["evaluationRules"]),
  };
}

/** A grouping of Azure Monitor workspace signals. */
export interface AzureMonitorWorkspaceSignals {
  /** Reference to the name of the authentication setting which is used for querying the data source. */
  authenticationSetting: string;
  /** Azure Monitor workspace resource ID. */
  azureMonitorWorkspaceResourceId: string;
  /** Signals assigned to this signal group. */
  signals?: PrometheusMetricsSignal[];
}

export function azureMonitorWorkspaceSignalsSerializer(item: AzureMonitorWorkspaceSignals): any {
  return {
    authenticationSetting: item["authenticationSetting"],
    azureMonitorWorkspaceResourceId: item["azureMonitorWorkspaceResourceId"],
    signals: !item["signals"]
      ? item["signals"]
      : prometheusMetricsSignalArraySerializer(item["signals"]),
  };
}

export function azureMonitorWorkspaceSignalsDeserializer(item: any): AzureMonitorWorkspaceSignals {
  return {
    authenticationSetting: item["authenticationSetting"],
    azureMonitorWorkspaceResourceId: item["azureMonitorWorkspaceResourceId"],
    signals: !item["signals"]
      ? item["signals"]
      : prometheusMetricsSignalArrayDeserializer(item["signals"]),
  };
}

export function prometheusMetricsSignalArraySerializer(
  result: Array<PrometheusMetricsSignal>,
): any[] {
  return result.map((item) => {
    return prometheusMetricsSignalSerializer(item);
  });
}

export function prometheusMetricsSignalArrayDeserializer(
  result: Array<PrometheusMetricsSignal>,
): any[] {
  return result.map((item) => {
    return prometheusMetricsSignalDeserializer(item);
  });
}

/** A Prometheus Metrics Query signal instance assigned to an entity. */
export interface PrometheusMetricsSignal extends SignalInstanceProperties {
  /** Kind of the signal instance */
  signalKind: "PrometheusMetricsQuery";
  /** Query text in PromQL syntax */
  queryText?: string;
  /** Time range of signal. ISO duration format like PT10M. */
  timeGrain?: string;
  /** Display name */
  displayName?: string;
  /** Interval in which the signal is being evaluated. Defaults to PT1M (1 minute). */
  refreshInterval?: RefreshInterval;
  /** Unit of the signal result (e.g. Bytes, MilliSeconds, Percent, Count)) */
  dataUnit?: string;
  /** Evaluation rules for the signal definition */
  evaluationRules?: EvaluationRule;
}

export function prometheusMetricsSignalSerializer(item: PrometheusMetricsSignal): any {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
    displayName: item["displayName"],
    refreshInterval: item["refreshInterval"],
    dataUnit: item["dataUnit"],
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : evaluationRuleSerializer(item["evaluationRules"]),
  };
}

export function prometheusMetricsSignalDeserializer(item: any): PrometheusMetricsSignal {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    status: !item["status"] ? item["status"] : signalStatusDeserializer(item["status"]),
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
    displayName: item["displayName"],
    refreshInterval: item["refreshInterval"],
    dataUnit: item["dataUnit"],
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : evaluationRuleDeserializer(item["evaluationRules"]),
  };
}

/** Properties for dependent entities, i.e. child entities */
export interface DependenciesSignalGroupV2 {
  /** Aggregation type for child dependencies. */
  aggregationType: DependenciesAggregationType;
  /** Degraded threshold for aggregation. For MinHealthy: parent is degraded when healthy count/percentage falls to or below this value. For MaxNotHealthy: parent is degraded when not-healthy count/percentage reaches or exceeds this value. Optional — if not set, there is no degraded state (transitions directly from Healthy to Unhealthy). */
  degradedThreshold?: number;
  /** Unhealthy threshold for aggregation. For MinHealthy: parent is unhealthy when healthy count/percentage falls to or below this value. For MaxNotHealthy: parent is unhealthy when not-healthy count/percentage reaches or exceeds this value. Required when aggregationType is MinHealthy or MaxNotHealthy. */
  unhealthyThreshold?: number;
  /** Unit type for the aggregation thresholds. Required when aggregationType is MinHealthy or MaxNotHealthy. */
  unit?: DependenciesAggregationUnit;
  /** If true, children with Unknown health state are excluded from aggregation calculations. Defaults to true. */
  ignoreUnknown?: boolean;
}

export function dependenciesSignalGroupV2Serializer(item: DependenciesSignalGroupV2): any {
  return {
    aggregationType: item["aggregationType"],
    degradedThreshold: item["degradedThreshold"],
    unhealthyThreshold: item["unhealthyThreshold"],
    unit: item["unit"],
    ignoreUnknown: item["ignoreUnknown"],
  };
}

export function dependenciesSignalGroupV2Deserializer(item: any): DependenciesSignalGroupV2 {
  return {
    aggregationType: item["aggregationType"],
    degradedThreshold: item["degradedThreshold"],
    unhealthyThreshold: item["unhealthyThreshold"],
    unit: item["unit"],
    ignoreUnknown: item["ignoreUnknown"],
  };
}

/** Aggregation type for child dependencies. */
export enum KnownDependenciesAggregationType {
  /** Default behavior: Worst child health state is propagated. */
  WorstOf = "WorstOf",
  /** Healthy if the count/percentage of healthy children meets the threshold. */
  MinHealthy = "MinHealthy",
  /** Healthy if the count/percentage of not-healthy children stays below the threshold. */
  MaxNotHealthy = "MaxNotHealthy",
}

/**
 * Aggregation type for child dependencies. \
 * {@link KnownDependenciesAggregationType} can be used interchangeably with DependenciesAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorstOf**: Default behavior: Worst child health state is propagated. \
 * **MinHealthy**: Healthy if the count\/percentage of healthy children meets the threshold. \
 * **MaxNotHealthy**: Healthy if the count\/percentage of not-healthy children stays below the threshold.
 */
export type DependenciesAggregationType = string;

/** Unit type for dependency aggregation thresholds. */
export enum KnownDependenciesAggregationUnit {
  /** Threshold is an absolute count of entities. */
  Absolute = "Absolute",
  /** Threshold is a percentage of entities (0-100). */
  Percentage = "Percentage",
}

/**
 * Unit type for dependency aggregation thresholds. \
 * {@link KnownDependenciesAggregationUnit} can be used interchangeably with DependenciesAggregationUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Absolute**: Threshold is an absolute count of entities. \
 * **Percentage**: Threshold is a percentage of entities (0-100).
 */
export type DependenciesAggregationUnit = string;

/** A grouping of externally submitted signals. */
export interface ExternalSignalGroup {
  /** Signals assigned to this signal group. */
  readonly signals?: ExternalSignal[];
}

export function externalSignalGroupDeserializer(item: any): ExternalSignalGroup {
  return {
    signals: !item["signals"] ? item["signals"] : externalSignalArrayDeserializer(item["signals"]),
  };
}

export function externalSignalArrayDeserializer(result: Array<ExternalSignal>): any[] {
  return result.map((item) => {
    return externalSignalDeserializer(item);
  });
}

/** An externally submitted signal instance assigned to an entity. */
export interface ExternalSignal extends SignalInstanceProperties {
  /** Kind of the signal instance */
  signalKind: "External";
  /** Evaluation rules for the external signal as submitted. */
  evaluationRules?: EvaluationRule;
}

export function externalSignalDeserializer(item: any): ExternalSignal {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    status: !item["status"] ? item["status"] : signalStatusDeserializer(item["status"]),
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : evaluationRuleDeserializer(item["evaluationRules"]),
  };
}

/** Health state of an entity */
export enum KnownHealthState {
  /** Healthy status */
  Healthy = "Healthy",
  /** Degraded status */
  Degraded = "Degraded",
  /** Unhealthy status */
  Unhealthy = "Unhealthy",
  /** Unknown status */
  Unknown = "Unknown",
  /** Deleted status */
  Deleted = "Deleted",
}

/**
 * Health state of an entity \
 * {@link KnownHealthState} can be used interchangeably with HealthState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: Healthy status \
 * **Degraded**: Degraded status \
 * **Unhealthy**: Unhealthy status \
 * **Unknown**: Unknown status \
 * **Deleted**: Deleted status
 */
export type HealthState = string;

/** Alert configuration for an entity */
export interface EntityAlerts {
  /** Alert to be triggered on state change to unhealthy */
  unhealthy?: AlertConfiguration;
  /** Alert to be triggered on state change to degraded */
  degraded?: AlertConfiguration;
}

export function entityAlertsSerializer(item: EntityAlerts): any {
  return {
    unhealthy: !item["unhealthy"]
      ? item["unhealthy"]
      : alertConfigurationSerializer(item["unhealthy"]),
    degraded: !item["degraded"] ? item["degraded"] : alertConfigurationSerializer(item["degraded"]),
  };
}

export function entityAlertsDeserializer(item: any): EntityAlerts {
  return {
    unhealthy: !item["unhealthy"]
      ? item["unhealthy"]
      : alertConfigurationDeserializer(item["unhealthy"]),
    degraded: !item["degraded"]
      ? item["degraded"]
      : alertConfigurationDeserializer(item["degraded"]),
  };
}

/** Alert configuration details */
export interface AlertConfiguration {
  /** The severity of triggered alert. */
  severity: AlertSeverity;
  /** The alert rule description. */
  description?: string;
  /** Optional list of action group resource IDs to be notified when the alert is triggered. */
  actionGroupIds?: string[];
}

export function alertConfigurationSerializer(item: AlertConfiguration): any {
  return {
    severity: item["severity"],
    description: item["description"],
    actionGroupIds: !item["actionGroupIds"]
      ? item["actionGroupIds"]
      : item["actionGroupIds"].map((p: any) => {
          return p;
        }),
  };
}

export function alertConfigurationDeserializer(item: any): AlertConfiguration {
  return {
    severity: item["severity"],
    description: item["description"],
    actionGroupIds: !item["actionGroupIds"]
      ? item["actionGroupIds"]
      : item["actionGroupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Severity of an alert */
export enum KnownAlertSeverity {
  /** Critical */
  Sev0 = "Sev0",
  /** Error */
  Sev1 = "Sev1",
  /** Warning */
  Sev2 = "Sev2",
  /** Informational */
  Sev3 = "Sev3",
  /** Verbose */
  Sev4 = "Sev4",
}

/**
 * Severity of an alert \
 * {@link KnownAlertSeverity} can be used interchangeably with AlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sev0**: Critical \
 * **Sev1**: Error \
 * **Sev2**: Warning \
 * **Sev3**: Informational \
 * **Sev4**: Verbose
 */
export type AlertSeverity = string;

/** Additional properties for signal instances assigned to an entity */
export interface SignalInstanceProperties {
  /** Kind of the signal instance */
  /** The discriminator possible values: AzureResourceMetric, LogAnalyticsQuery, PrometheusMetricsQuery, External */
  signalKind: SignalKind;
  /** Unique name of the signal within the entity. */
  name: string;
  /** Optional reference to a signal definition that provides default values. */
  signalDefinitionName?: string;
  /** Current status of the signal. */
  readonly status?: SignalStatus;
}

export function signalInstancePropertiesSerializer(item: SignalInstanceProperties): any {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
  };
}

export function signalInstancePropertiesDeserializer(item: any): SignalInstanceProperties {
  return {
    signalKind: item["signalKind"],
    name: item["name"],
    signalDefinitionName: item["signalDefinitionName"],
    status: !item["status"] ? item["status"] : signalStatusDeserializer(item["status"]),
  };
}

/** Alias for SignalInstancePropertiesUnion */
export type SignalInstancePropertiesUnion =
  | AzureResourceSignal
  | LogAnalyticsSignal
  | PrometheusMetricsSignal
  | ExternalSignal
  | SignalInstanceProperties;

export function signalInstancePropertiesUnionSerializer(item: SignalInstancePropertiesUnion): any {
  switch (item.signalKind) {
    case "AzureResourceMetric":
      return azureResourceSignalSerializer(item as AzureResourceSignal);

    case "LogAnalyticsQuery":
      return logAnalyticsSignalSerializer(item as LogAnalyticsSignal);

    case "PrometheusMetricsQuery":
      return prometheusMetricsSignalSerializer(item as PrometheusMetricsSignal);

    default:
      return signalInstancePropertiesSerializer(item);
  }
}

export function signalInstancePropertiesUnionDeserializer(
  item: any,
): SignalInstancePropertiesUnion {
  switch (item["signalKind"]) {
    case "AzureResourceMetric":
      return azureResourceSignalDeserializer(item as AzureResourceSignal);

    case "LogAnalyticsQuery":
      return logAnalyticsSignalDeserializer(item as LogAnalyticsSignal);

    case "PrometheusMetricsQuery":
      return prometheusMetricsSignalDeserializer(item as PrometheusMetricsSignal);

    case "External":
      return externalSignalDeserializer(item as ExternalSignal);

    default:
      return signalInstancePropertiesDeserializer(item);
  }
}

/** Status of a signal */
export interface SignalStatus {
  /** Health state of this signal */
  readonly healthState?: HealthState;
  /** Reported value of the signal */
  readonly value?: number;
  /** Timestamp when the value was reported */
  readonly reportedAt?: Date;
  /** Error message if the signal status cannot be retrieved */
  readonly error?: string;
}

export function signalStatusDeserializer(item: any): SignalStatus {
  return {
    healthState: item["healthState"],
    value: item["value"],
    reportedAt: !item["reportedAt"] ? item["reportedAt"] : new Date(item["reportedAt"]),
    error: item["error"],
  };
}

/** The response of a Entity list operation. */
export interface _EntityListResult {
  /** The Entity items on this page */
  value: Entity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _entityListResultDeserializer(item: any): _EntityListResult {
  return {
    value: entityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function entityArraySerializer(result: Array<Entity>): any[] {
  return result.map((item) => {
    return entitySerializer(item);
  });
}

export function entityArrayDeserializer(result: Array<Entity>): any[] {
  return result.map((item) => {
    return entityDeserializer(item);
  });
}

/** Request body for getting entity health history */
export interface EntityHistoryRequest {
  /** Start time for the history query. Defaults to 24 hours ago if not specified. */
  startAt?: Date;
  /** End time for the history query. Defaults to now if not specified. */
  endAt?: Date;
}

export function entityHistoryRequestSerializer(item: EntityHistoryRequest): any {
  return {
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
  };
}

/** Response containing entity health state transitions */
export interface EntityHistoryResponse {
  /** Name of the entity */
  entityName: string;
  /** List of health state transitions */
  history: HealthStateTransition[];
}

export function entityHistoryResponseDeserializer(item: any): EntityHistoryResponse {
  return {
    entityName: item["entityName"],
    history: healthStateTransitionArrayDeserializer(item["history"]),
  };
}

export function healthStateTransitionArrayDeserializer(
  result: Array<HealthStateTransition>,
): any[] {
  return result.map((item) => {
    return healthStateTransitionDeserializer(item);
  });
}

/** A health state transition record */
export interface HealthStateTransition {
  /** Previous health state before the transition */
  previousState: HealthState;
  /** New health state after the transition */
  newState: HealthState;
  /** Timestamp when the transition occurred */
  occurredAt: Date;
  /** Reason of the transition */
  reason?: string;
}

export function healthStateTransitionDeserializer(item: any): HealthStateTransition {
  return {
    previousState: item["previousState"],
    newState: item["newState"],
    occurredAt: new Date(item["occurredAt"]),
    reason: item["reason"],
  };
}

/** Request body for getting signal history */
export interface SignalHistoryRequest {
  /** Name of the signal to get history for */
  signalName: string;
  /** Start time for the history query. Defaults to 24 hours ago if not specified. */
  startAt?: Date;
  /** End time for the history query. Defaults to now if not specified. */
  endAt?: Date;
}

export function signalHistoryRequestSerializer(item: SignalHistoryRequest): any {
  return {
    signalName: item["signalName"],
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
  };
}

/** Response containing signal history */
export interface SignalHistoryResponse {
  /** Name of the entity */
  entityName: string;
  /** Name of the signal */
  signalName: string;
  /** Signal history data points */
  history: SignalHistoryDataPoint[];
}

export function signalHistoryResponseDeserializer(item: any): SignalHistoryResponse {
  return {
    entityName: item["entityName"],
    signalName: item["signalName"],
    history: signalHistoryDataPointArrayDeserializer(item["history"]),
  };
}

export function signalHistoryDataPointArrayDeserializer(
  result: Array<SignalHistoryDataPoint>,
): any[] {
  return result.map((item) => {
    return signalHistoryDataPointDeserializer(item);
  });
}

/** A data point in the signal time series */
export interface SignalHistoryDataPoint {
  /** Timestamp of the data point */
  occurredAt: Date;
  /** Signal value at this point in time */
  value?: number;
  /** Health state at this point in time */
  healthState: HealthState;
  /** Additional context as provided by the submitter */
  additionalContext?: string;
}

export function signalHistoryDataPointDeserializer(item: any): SignalHistoryDataPoint {
  return {
    occurredAt: new Date(item["occurredAt"]),
    value: item["value"],
    healthState: item["healthState"],
    additionalContext: item["additionalContext"],
  };
}

/** Health report that's submitted for a specific signal */
export interface HealthReportRequest {
  /** Name of the entity signal to report health for */
  signalName: string;
  /** Health state to report for the signal */
  healthState: HealthState;
  /** Reported value of the signal */
  value?: number;
  /** Evaluation rules that were used to determine the reported health state */
  evaluationRules?: HealthReportEvaluationRule;
  /** Number of minutes until the health report expires. Defaults to 60 (1 hour) if not specified. */
  expiresInMinutes?: number;
  /** Optional additional context or description for the health report */
  additionalContext?: string;
}

export function healthReportRequestSerializer(item: HealthReportRequest): any {
  return {
    signalName: item["signalName"],
    healthState: item["healthState"],
    value: item["value"],
    evaluationRules: !item["evaluationRules"]
      ? item["evaluationRules"]
      : healthReportEvaluationRuleSerializer(item["evaluationRules"]),
    expiresInMinutes: item["expiresInMinutes"],
    additionalContext: item["additionalContext"],
  };
}

/** Evaluation rules for the health report */
export interface HealthReportEvaluationRule {
  /** Degraded rule with static threshold. */
  degradedRule?: ThresholdRuleV2;
  /** Unhealthy rule with static threshold. */
  unhealthyRule: ThresholdRuleV2;
}

export function healthReportEvaluationRuleSerializer(item: HealthReportEvaluationRule): any {
  return {
    degradedRule: !item["degradedRule"]
      ? item["degradedRule"]
      : thresholdRuleV2Serializer(item["degradedRule"]),
    unhealthyRule: thresholdRuleV2Serializer(item["unhealthyRule"]),
  };
}

/** A relationship (aka edge) between two entities in a health model */
export interface Relationship extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RelationshipProperties;
}

export function relationshipSerializer(item: Relationship): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : relationshipPropertiesSerializer(item["properties"]),
  };
}

export function relationshipDeserializer(item: any): Relationship {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : relationshipPropertiesDeserializer(item["properties"]),
  };
}

/** Relationship properties */
export interface RelationshipProperties {
  /** The status of the last operation. */
  readonly provisioningState?: HealthModelProvisioningState;
  /** Display name */
  displayName?: string;
  /** Resource name of the parent entity */
  parentEntityName: string;
  /** Resource name of the child entity */
  childEntityName: string;
  /** Optional set of tags (key-value pairs) */
  tags?: Record<string, string>;
  /** Discovered by which discovery rule. If set, the relationship cannot be deleted manually. */
  readonly discoveredBy?: string;
}

export function relationshipPropertiesSerializer(item: RelationshipProperties): any {
  return {
    displayName: item["displayName"],
    parentEntityName: item["parentEntityName"],
    childEntityName: item["childEntityName"],
    tags: item["tags"],
  };
}

export function relationshipPropertiesDeserializer(item: any): RelationshipProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    parentEntityName: item["parentEntityName"],
    childEntityName: item["childEntityName"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    discoveredBy: item["discoveredBy"],
  };
}

/** The response of a Relationship list operation. */
export interface _RelationshipListResult {
  /** The Relationship items on this page */
  value: Relationship[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _relationshipListResultDeserializer(item: any): _RelationshipListResult {
  return {
    value: relationshipArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function relationshipArraySerializer(result: Array<Relationship>): any[] {
  return result.map((item) => {
    return relationshipSerializer(item);
  });
}

export function relationshipArrayDeserializer(result: Array<Relationship>): any[] {
  return result.map((item) => {
    return relationshipDeserializer(item);
  });
}

/** A discovery rule which automatically finds entities and relationships in a health model based on an Azure Resource Graph query */
export interface DiscoveryRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DiscoveryRuleProperties;
}

export function discoveryRuleDeserializer(item: any): DiscoveryRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : discoveryRulePropertiesDeserializer(item["properties"]),
  };
}

/** Discovery rule properties */
export interface DiscoveryRuleProperties {
  /** The status of the last operation. */
  readonly provisioningState?: HealthModelProvisioningState;
  /** Display name */
  displayName?: string;
  /** Reference to the name of the authentication setting which is used for querying Azure Resource Graph. The same authentication setting will also be assigned to any discovered entities. */
  authenticationSetting: string;
  /** Whether to create relationships between the discovered entities based on a set of built-in rules. These relationships cannot be manually deleted. */
  discoverRelationships: DiscoveryRuleRelationshipDiscoveryBehavior;
  /** Whether to add all recommended signals to the discovered entities. */
  addRecommendedSignals: DiscoveryRuleRecommendedSignalsBehavior;
  /** Specification of the discovery rule defining how entities are discovered. */
  specification: DiscoveryRuleSpecificationUnion;
  /** Error details if the last discovery operation failed. */
  readonly error?: DiscoveryError;
  /** Name of the entity which represents the discovery rule. Note: It might take a few minutes after creating the discovery rule until the entity is created. */
  readonly entityName: string;
}

export function discoveryRulePropertiesDeserializer(item: any): DiscoveryRuleProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    authenticationSetting: item["authenticationSetting"],
    discoverRelationships: item["discoverRelationships"],
    addRecommendedSignals: item["addRecommendedSignals"],
    specification: discoveryRuleSpecificationUnionDeserializer(item["specification"]),
    error: !item["error"] ? item["error"] : discoveryErrorDeserializer(item["error"]),
    entityName: item["entityName"],
  };
}

/** Discovery rule relationship discovery behavior */
export enum KnownDiscoveryRuleRelationshipDiscoveryBehavior {
  /** Automatically attempt to discover relationships */
  Enabled = "Enabled",
  /** Do not automatically attempt to discover relationships */
  Disabled = "Disabled",
}

/**
 * Discovery rule relationship discovery behavior \
 * {@link KnownDiscoveryRuleRelationshipDiscoveryBehavior} can be used interchangeably with DiscoveryRuleRelationshipDiscoveryBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Automatically attempt to discover relationships \
 * **Disabled**: Do not automatically attempt to discover relationships
 */
export type DiscoveryRuleRelationshipDiscoveryBehavior = string;

/** Discovery rule recommended signal behavior */
export enum KnownDiscoveryRuleRecommendedSignalsBehavior {
  /** Automatically add recommended signals */
  Enabled = "Enabled",
  /** Do not automatically add recommended signals */
  Disabled = "Disabled",
}

/**
 * Discovery rule recommended signal behavior \
 * {@link KnownDiscoveryRuleRecommendedSignalsBehavior} can be used interchangeably with DiscoveryRuleRecommendedSignalsBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Automatically add recommended signals \
 * **Disabled**: Do not automatically add recommended signals
 */
export type DiscoveryRuleRecommendedSignalsBehavior = string;

/** Base model for discovery rule specifications */
export interface DiscoveryRuleSpecification {
  /** Kind of the discovery rule specification */
  /** The discriminator possible values: ResourceGraphQuery, ApplicationInsightsTopology */
  kind: DiscoveryRuleKind;
}

export function discoveryRuleSpecificationSerializer(item: DiscoveryRuleSpecification): any {
  return { kind: item["kind"] };
}

export function discoveryRuleSpecificationDeserializer(item: any): DiscoveryRuleSpecification {
  return {
    kind: item["kind"],
  };
}

/** Alias for DiscoveryRuleSpecificationUnion */
export type DiscoveryRuleSpecificationUnion =
  | ResourceGraphQuerySpecification
  | ApplicationInsightsTopologySpecification
  | DiscoveryRuleSpecification;

export function discoveryRuleSpecificationUnionSerializer(
  item: DiscoveryRuleSpecificationUnion,
): any {
  switch (item.kind) {
    case "ResourceGraphQuery":
      return resourceGraphQuerySpecificationSerializer(item as ResourceGraphQuerySpecification);

    case "ApplicationInsightsTopology":
      return applicationInsightsTopologySpecificationSerializer(
        item as ApplicationInsightsTopologySpecification,
      );

    default:
      return discoveryRuleSpecificationSerializer(item);
  }
}

export function discoveryRuleSpecificationUnionDeserializer(
  item: any,
): DiscoveryRuleSpecificationUnion {
  switch (item["kind"]) {
    case "ResourceGraphQuery":
      return resourceGraphQuerySpecificationDeserializer(item as ResourceGraphQuerySpecification);

    case "ApplicationInsightsTopology":
      return applicationInsightsTopologySpecificationDeserializer(
        item as ApplicationInsightsTopologySpecification,
      );

    default:
      return discoveryRuleSpecificationDeserializer(item);
  }
}

/** Discovery rule specification kind discriminator */
export enum KnownDiscoveryRuleKind {
  /** Azure Resource Graph query based discovery */
  ResourceGraphQuery = "ResourceGraphQuery",
  /** Application Insights topology based discovery */
  ApplicationInsightsTopology = "ApplicationInsightsTopology",
}

/**
 * Discovery rule specification kind discriminator \
 * {@link KnownDiscoveryRuleKind} can be used interchangeably with DiscoveryRuleKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ResourceGraphQuery**: Azure Resource Graph query based discovery \
 * **ApplicationInsightsTopology**: Application Insights topology based discovery
 */
export type DiscoveryRuleKind = string;

/** Discovery rule specification for an Azure Resource Graph query */
export interface ResourceGraphQuerySpecification extends DiscoveryRuleSpecification {
  /** Kind of the discovery rule specification */
  kind: "ResourceGraphQuery";
  /** Azure Resource Graph query text in KQL syntax. The query must return at least a column named 'id' which contains the resource ID of the discovered resources. */
  resourceGraphQuery: string;
}

export function resourceGraphQuerySpecificationSerializer(
  item: ResourceGraphQuerySpecification,
): any {
  return { kind: item["kind"], resourceGraphQuery: item["resourceGraphQuery"] };
}

export function resourceGraphQuerySpecificationDeserializer(
  item: any,
): ResourceGraphQuerySpecification {
  return {
    kind: item["kind"],
    resourceGraphQuery: item["resourceGraphQuery"],
  };
}

/** Discovery rule specification for an Application Insights topology query */
export interface ApplicationInsightsTopologySpecification extends DiscoveryRuleSpecification {
  /** Kind of the discovery rule specification */
  kind: "ApplicationInsightsTopology";
  /** Application Insights resource ID */
  applicationInsightsResourceId: string;
}

export function applicationInsightsTopologySpecificationSerializer(
  item: ApplicationInsightsTopologySpecification,
): any {
  return {
    kind: item["kind"],
    applicationInsightsResourceId: item["applicationInsightsResourceId"],
  };
}

export function applicationInsightsTopologySpecificationDeserializer(
  item: any,
): ApplicationInsightsTopologySpecification {
  return {
    kind: item["kind"],
    applicationInsightsResourceId: item["applicationInsightsResourceId"],
  };
}

/** Error details for a failed discovery operation */
export interface DiscoveryError {
  /** Error message */
  readonly message: string;
  /** Additional context information, like resource IDs or query details */
  readonly context?: string[];
}

export function discoveryErrorDeserializer(item: any): DiscoveryError {
  return {
    message: item["message"],
    context: !item["context"]
      ? item["context"]
      : item["context"].map((p: any) => {
          return p;
        }),
  };
}

/** Discovery rule resource for create/update operations. */
export interface DiscoveryRuleResourceCreate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DiscoveryRulePropertiesCreate;
}

export function discoveryRuleResourceCreateSerializer(item: DiscoveryRuleResourceCreate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : discoveryRulePropertiesCreateSerializer(item["properties"]),
  };
}

/** Discovery rule properties for create/update operations, omitting server-side read-only fields (entityName is required+read-only in the canonical model). */
export interface DiscoveryRulePropertiesCreate {
  /** Display name */
  displayName?: string;
  /** Reference to the name of the authentication setting which is used for querying Azure Resource Graph. The same authentication setting will also be assigned to any discovered entities. */
  authenticationSetting: string;
  /** Whether to create relationships between the discovered entities based on a set of built-in rules. These relationships cannot be manually deleted. */
  discoverRelationships: DiscoveryRuleRelationshipDiscoveryBehavior;
  /** Whether to add all recommended signals to the discovered entities. */
  addRecommendedSignals: DiscoveryRuleRecommendedSignalsBehavior;
  /** Specification of the discovery rule defining how entities are discovered. */
  specification: DiscoveryRuleSpecificationUnion;
}

export function discoveryRulePropertiesCreateSerializer(item: DiscoveryRulePropertiesCreate): any {
  return {
    displayName: item["displayName"],
    authenticationSetting: item["authenticationSetting"],
    discoverRelationships: item["discoverRelationships"],
    addRecommendedSignals: item["addRecommendedSignals"],
    specification: discoveryRuleSpecificationUnionSerializer(item["specification"]),
  };
}

/** The response of a DiscoveryRule list operation. */
export interface _DiscoveryRuleListResult {
  /** The DiscoveryRule items on this page */
  value: DiscoveryRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _discoveryRuleListResultDeserializer(item: any): _DiscoveryRuleListResult {
  return {
    value: discoveryRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function discoveryRuleArrayDeserializer(result: Array<DiscoveryRule>): any[] {
  return result.map((item) => {
    return discoveryRuleDeserializer(item);
  });
}

/** API Versions */
export enum KnownVersions {
  /** 2025-05-01-preview */
  V20250501Preview = "2025-05-01-preview",
  /** 2026-01-01-preview */
  V20260101Preview = "2026-01-01-preview",
}
