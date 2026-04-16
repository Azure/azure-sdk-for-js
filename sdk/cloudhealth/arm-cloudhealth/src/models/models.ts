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
      : healthModelPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** HealthModel properties */
export interface HealthModelProperties {
  /** The data plane endpoint for interacting with health data */
  readonly dataplaneEndpoint?: string;
  /** The status of the last operation. */
  readonly provisioningState?: HealthModelProvisioningState;
  /** Configure to automatically discover entities from a given scope, such as a Service Group. The discovered entities will be linked to the root entity of the health model. */
  discovery?: ModelDiscoverySettings;
}

export function healthModelPropertiesSerializer(item: HealthModelProperties): any {
  return {
    discovery: !item["discovery"]
      ? item["discovery"]
      : modelDiscoverySettingsSerializer(item["discovery"]),
  };
}

export function healthModelPropertiesDeserializer(item: any): HealthModelProperties {
  return {
    dataplaneEndpoint: item["dataplaneEndpoint"],
    provisioningState: item["provisioningState"],
    discovery: !item["discovery"]
      ? item["discovery"]
      : modelDiscoverySettingsDeserializer(item["discovery"]),
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
  Creating = "Creating",
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

/** Settings for automatically discovering entities for the health model. */
export interface ModelDiscoverySettings {
  /** The scope from which entities should be automatically discovered. For example, the resource id of a Service Group. */
  scope: string;
  /** Whether to add all recommended signals to the discovered entities. */
  addRecommendedSignals: DiscoveryRuleRecommendedSignalsBehavior;
  /** Which Managed Identity of the health model to use for discovery. Defaults to SystemAssigned, if not set. Can be set to 'SystemAssigned' or to the resource id of a user-assigned managed identity which is linked to the health model. */
  identity?: string;
}

export function modelDiscoverySettingsSerializer(item: ModelDiscoverySettings): any {
  return {
    scope: item["scope"],
    addRecommendedSignals: item["addRecommendedSignals"],
    identity: item["identity"],
  };
}

export function modelDiscoverySettingsDeserializer(item: any): ModelDiscoverySettings {
  return {
    scope: item["scope"],
    addRecommendedSignals: item["addRecommendedSignals"],
    identity: item["identity"],
  };
}

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

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
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

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
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

/** The type used for update operations of the HealthModel. */
export interface HealthModelUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: HealthModelUpdateProperties;
}

export function healthModelUpdateSerializer(item: HealthModelUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : healthModelUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the HealthModel. */
export interface HealthModelUpdateProperties {
  /** Configure to automatically discover entities from a given scope, such as a Service Group. The discovered entities will be linked to the root entity of the health model. */
  discovery?: ModelDiscoverySettings;
}

export function healthModelUpdatePropertiesSerializer(item: HealthModelUpdateProperties): any {
  return {
    discovery: !item["discovery"]
      ? item["discovery"]
      : modelDiscoverySettingsSerializer(item["discovery"]),
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
  /** Optional set of labels (key-value pairs) */
  labels?: Record<string, string>;
  /** Unit of the signal result (e.g. Bytes, MilliSeconds, Percent, Count)) */
  dataUnit?: string;
  /** Evaluation rules for the signal definition */
  evaluationRules: EvaluationRule;
  /** Date when the signal definition was (soft-)deleted */
  readonly deletionDate?: Date;
}

export function signalDefinitionPropertiesSerializer(item: SignalDefinitionProperties): any {
  return {
    displayName: item["displayName"],
    signalKind: item["signalKind"],
    refreshInterval: item["refreshInterval"],
    labels: item["labels"],
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
    labels: item["labels"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
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
  switch (item.signalKind) {
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
  AzureResourceMetric = "AzureResourceMetric",
  LogAnalyticsQuery = "LogAnalyticsQuery",
  PrometheusMetricsQuery = "PrometheusMetricsQuery",
}

/**
 * Supported signal kinds as discriminator \
 * {@link KnownSignalKind} can be used interchangeably with SignalKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureResourceMetric** \
 * **LogAnalyticsQuery** \
 * **PrometheusMetricsQuery**
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
  /** Configure to use ML-based dynamic thresholds. When used, degradedRule and unhealthyRule must not be set. */
  dynamicDetectionRule?: DynamicDetectionRule;
  /** Degraded rule with static threshold. When used, dynamicDetectionRule must not be set. */
  degradedRule?: ThresholdRule;
  /** Unhealthy rule with static threshold. When used, dynamicDetectionRule must not be set. */
  unhealthyRule?: ThresholdRule;
}

export function evaluationRuleSerializer(item: EvaluationRule): any {
  return {
    dynamicDetectionRule: !item["dynamicDetectionRule"]
      ? item["dynamicDetectionRule"]
      : dynamicDetectionRuleSerializer(item["dynamicDetectionRule"]),
    degradedRule: !item["degradedRule"]
      ? item["degradedRule"]
      : thresholdRuleSerializer(item["degradedRule"]),
    unhealthyRule: !item["unhealthyRule"]
      ? item["unhealthyRule"]
      : thresholdRuleSerializer(item["unhealthyRule"]),
  };
}

export function evaluationRuleDeserializer(item: any): EvaluationRule {
  return {
    dynamicDetectionRule: !item["dynamicDetectionRule"]
      ? item["dynamicDetectionRule"]
      : dynamicDetectionRuleDeserializer(item["dynamicDetectionRule"]),
    degradedRule: !item["degradedRule"]
      ? item["degradedRule"]
      : thresholdRuleDeserializer(item["degradedRule"]),
    unhealthyRule: !item["unhealthyRule"]
      ? item["unhealthyRule"]
      : thresholdRuleDeserializer(item["unhealthyRule"]),
  };
}

/** ML-based evaluation rule for a signal definition */
export interface DynamicDetectionRule {
  /** ML model to use for dynamic thresholds */
  dynamicThresholdModel: DynamicThresholdModel;
  /** ML model sensitivity. Lowest value = high sensitivity. Supported step size = 0.5 */
  modelSensitivity: number;
  /** Threshold direction */
  dynamicThresholdDirection: DynamicThresholdDirection;
  /** Start time of the training in UTC. */
  trainingStartTime?: Date;
}

export function dynamicDetectionRuleSerializer(item: DynamicDetectionRule): any {
  return {
    dynamicThresholdModel: item["dynamicThresholdModel"],
    modelSensitivity: item["modelSensitivity"],
    dynamicThresholdDirection: item["dynamicThresholdDirection"],
    trainingStartTime: !item["trainingStartTime"]
      ? item["trainingStartTime"]
      : item["trainingStartTime"].toISOString(),
  };
}

export function dynamicDetectionRuleDeserializer(item: any): DynamicDetectionRule {
  return {
    dynamicThresholdModel: item["dynamicThresholdModel"],
    modelSensitivity: item["modelSensitivity"],
    dynamicThresholdDirection: item["dynamicThresholdDirection"],
    trainingStartTime: !item["trainingStartTime"]
      ? item["trainingStartTime"]
      : new Date(item["trainingStartTime"]),
  };
}

/** ML-based model variants */
export enum KnownDynamicThresholdModel {
  /** Anomaly detection model */
  AnomalyDetection = "AnomalyDetection",
}

/**
 * ML-based model variants \
 * {@link KnownDynamicThresholdModel} can be used interchangeably with DynamicThresholdModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AnomalyDetection**: Anomaly detection model
 */
export type DynamicThresholdModel = string;

/** Threshold direction for dynamic thresholds */
export enum KnownDynamicThresholdDirection {
  /** Lower than */
  LowerThan = "LowerThan",
  /** Greater than */
  GreaterThan = "GreaterThan",
  /** Greater or Lower Than */
  GreaterOrLowerThan = "GreaterOrLowerThan",
}

/**
 * Threshold direction for dynamic thresholds \
 * {@link KnownDynamicThresholdDirection} can be used interchangeably with DynamicThresholdDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowerThan**: Lower than \
 * **GreaterThan**: Greater than \
 * **GreaterOrLowerThan**: Greater or Lower Than
 */
export type DynamicThresholdDirection = string;

/** Threshold-based evaluation rule for a signal definition */
export interface ThresholdRule {
  /** Operator how to compare the signal value with the threshold */
  operator: SignalOperator;
  /** Threshold value */
  threshold: string;
}

export function thresholdRuleSerializer(item: ThresholdRule): any {
  return { operator: item["operator"], threshold: item["threshold"] };
}

export function thresholdRuleDeserializer(item: any): ThresholdRule {
  return {
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

/** Signal operator */
export enum KnownSignalOperator {
  /** Lower than */
  LowerThan = "LowerThan",
  /** Lower than or equal to */
  LowerOrEquals = "LowerOrEquals",
  /** Greater than */
  GreaterThan = "GreaterThan",
  /** Greater than or equal to */
  GreaterOrEquals = "GreaterOrEquals",
  /** Equal to */
  Equals = "Equals",
}

/**
 * Signal operator \
 * {@link KnownSignalOperator} can be used interchangeably with SignalOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowerThan**: Lower than \
 * **LowerOrEquals**: Lower than or equal to \
 * **GreaterThan**: Greater than \
 * **GreaterOrEquals**: Greater than or equal to \
 * **Equals**: Equal to
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
    labels: item["labels"],
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
    labels: item["labels"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
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
  None = "None",
  Average = "Average",
  Count = "Count",
  Minimum = "Minimum",
  Maximum = "Maximum",
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
    labels: item["labels"],
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
    labels: item["labels"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
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
    labels: item["labels"],
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
    labels: item["labels"],
    dataUnit: item["dataUnit"],
    evaluationRules: evaluationRuleDeserializer(item["evaluationRules"]),
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    queryText: item["queryText"],
    timeGrain: item["timeGrain"],
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
  return {
    displayName: item["displayName"],
    authenticationKind: item["authenticationKind"],
  };
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
  | ManagedIdentityAuthenticationSettingProperties
  | AuthenticationSettingProperties;

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
  switch (item.authenticationKind) {
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
  /** Entity kind */
  kind?: string;
  /** Positioning of the entity on the model canvas */
  canvasPosition?: EntityCoordinates;
  /** Visual icon definition. If not set, a default icon is used. */
  icon?: IconDefinition;
  /** Health objective as a percentage of time the entity should be healthy. */
  healthObjective?: number;
  /** Impact of the entity in health state propagation */
  impact?: EntityImpact;
  /** Optional set of labels (key-value pairs) */
  labels?: Record<string, string>;
  /** Signal groups which are assigned to this entity */
  signals?: SignalGroup;
  /** Discovered by which discovery rule. If set, the entity cannot be deleted manually. */
  readonly discoveredBy?: string;
  /** Date when the entity was (soft-)deleted */
  readonly deletionDate?: Date;
  /** Health state of this entity */
  readonly healthState?: HealthState;
  /** Alert configuration for this entity */
  alerts?: EntityAlerts;
}

export function entityPropertiesSerializer(item: EntityProperties): any {
  return {
    displayName: item["displayName"],
    kind: item["kind"],
    canvasPosition: !item["canvasPosition"]
      ? item["canvasPosition"]
      : entityCoordinatesSerializer(item["canvasPosition"]),
    icon: !item["icon"] ? item["icon"] : iconDefinitionSerializer(item["icon"]),
    healthObjective: item["healthObjective"],
    impact: item["impact"],
    labels: item["labels"],
    signals: !item["signals"] ? item["signals"] : signalGroupSerializer(item["signals"]),
    alerts: !item["alerts"] ? item["alerts"] : entityAlertsSerializer(item["alerts"]),
  };
}

export function entityPropertiesDeserializer(item: any): EntityProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    kind: item["kind"],
    canvasPosition: !item["canvasPosition"]
      ? item["canvasPosition"]
      : entityCoordinatesDeserializer(item["canvasPosition"]),
    icon: !item["icon"] ? item["icon"] : iconDefinitionDeserializer(item["icon"]),
    healthObjective: item["healthObjective"],
    impact: item["impact"],
    labels: item["labels"],
    signals: !item["signals"] ? item["signals"] : signalGroupDeserializer(item["signals"]),
    discoveredBy: item["discoveredBy"],
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
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
export interface SignalGroup {
  /** Azure Resource Signal Group */
  azureResource?: AzureResourceSignalGroup;
  /** Log Analytics Signal Group */
  azureLogAnalytics?: LogAnalyticsSignalGroup;
  /** Azure Monitor Workspace Signal Group */
  azureMonitorWorkspace?: AzureMonitorWorkspaceSignalGroup;
  /** Settings for dependency signals to control how the health state of child entities influences the health state of the parent entity. */
  dependencies?: DependenciesSignalGroup;
}

export function signalGroupSerializer(item: SignalGroup): any {
  return {
    azureResource: !item["azureResource"]
      ? item["azureResource"]
      : azureResourceSignalGroupSerializer(item["azureResource"]),
    azureLogAnalytics: !item["azureLogAnalytics"]
      ? item["azureLogAnalytics"]
      : logAnalyticsSignalGroupSerializer(item["azureLogAnalytics"]),
    azureMonitorWorkspace: !item["azureMonitorWorkspace"]
      ? item["azureMonitorWorkspace"]
      : azureMonitorWorkspaceSignalGroupSerializer(item["azureMonitorWorkspace"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : dependenciesSignalGroupSerializer(item["dependencies"]),
  };
}

export function signalGroupDeserializer(item: any): SignalGroup {
  return {
    azureResource: !item["azureResource"]
      ? item["azureResource"]
      : azureResourceSignalGroupDeserializer(item["azureResource"]),
    azureLogAnalytics: !item["azureLogAnalytics"]
      ? item["azureLogAnalytics"]
      : logAnalyticsSignalGroupDeserializer(item["azureLogAnalytics"]),
    azureMonitorWorkspace: !item["azureMonitorWorkspace"]
      ? item["azureMonitorWorkspace"]
      : azureMonitorWorkspaceSignalGroupDeserializer(item["azureMonitorWorkspace"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : dependenciesSignalGroupDeserializer(item["dependencies"]),
  };
}

/** A grouping of signal assignments for an Azure resource */
export interface AzureResourceSignalGroup {
  /** Signal definitions which are assigned to this signal group. All assignments are combined with an OR operator. */
  signalAssignments?: SignalAssignment[];
  /** Reference to the name of the authentication setting which is used for querying the data source */
  authenticationSetting: string;
  /** Azure resource ID */
  azureResourceId: string;
}

export function azureResourceSignalGroupSerializer(item: AzureResourceSignalGroup): any {
  return {
    signalAssignments: !item["signalAssignments"]
      ? item["signalAssignments"]
      : signalAssignmentArraySerializer(item["signalAssignments"]),
    authenticationSetting: item["authenticationSetting"],
    azureResourceId: item["azureResourceId"],
  };
}

export function azureResourceSignalGroupDeserializer(item: any): AzureResourceSignalGroup {
  return {
    signalAssignments: !item["signalAssignments"]
      ? item["signalAssignments"]
      : signalAssignmentArrayDeserializer(item["signalAssignments"]),
    authenticationSetting: item["authenticationSetting"],
    azureResourceId: item["azureResourceId"],
  };
}

export function signalAssignmentArraySerializer(result: Array<SignalAssignment>): any[] {
  return result.map((item) => {
    return signalAssignmentSerializer(item);
  });
}

export function signalAssignmentArrayDeserializer(result: Array<SignalAssignment>): any[] {
  return result.map((item) => {
    return signalAssignmentDeserializer(item);
  });
}

/** Group of signal definition assignments */
export interface SignalAssignment {
  /** Signal definitions referenced by their names. All definitions are combined with an AND operator. */
  signalDefinitions: string[];
}

export function signalAssignmentSerializer(item: SignalAssignment): any {
  return {
    signalDefinitions: item["signalDefinitions"].map((p: any) => {
      return p;
    }),
  };
}

export function signalAssignmentDeserializer(item: any): SignalAssignment {
  return {
    signalDefinitions: item["signalDefinitions"].map((p: any) => {
      return p;
    }),
  };
}

/** A grouping of signal assignments for a Log Analytics Workspace */
export interface LogAnalyticsSignalGroup {
  /** Signal definitions which are assigned to this signal group. All assignments are combined with an OR operator. */
  signalAssignments?: SignalAssignment[];
  /** Reference to the name of the authentication setting which is used for querying the data source */
  authenticationSetting: string;
  /** Log Analytics Workspace resource ID */
  logAnalyticsWorkspaceResourceId: string;
}

export function logAnalyticsSignalGroupSerializer(item: LogAnalyticsSignalGroup): any {
  return {
    signalAssignments: !item["signalAssignments"]
      ? item["signalAssignments"]
      : signalAssignmentArraySerializer(item["signalAssignments"]),
    authenticationSetting: item["authenticationSetting"],
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
  };
}

export function logAnalyticsSignalGroupDeserializer(item: any): LogAnalyticsSignalGroup {
  return {
    signalAssignments: !item["signalAssignments"]
      ? item["signalAssignments"]
      : signalAssignmentArrayDeserializer(item["signalAssignments"]),
    authenticationSetting: item["authenticationSetting"],
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
  };
}

/** A grouping of signal assignments for a Azure Monitor Workspace */
export interface AzureMonitorWorkspaceSignalGroup {
  /** Signal definitions which are assigned to this signal group. All assignments are combined with an OR operator. */
  signalAssignments?: SignalAssignment[];
  /** Reference to the name of the authentication setting which is used for querying the data source */
  authenticationSetting: string;
  /** Azure Monitor workspace resource ID */
  azureMonitorWorkspaceResourceId: string;
}

export function azureMonitorWorkspaceSignalGroupSerializer(
  item: AzureMonitorWorkspaceSignalGroup,
): any {
  return {
    signalAssignments: !item["signalAssignments"]
      ? item["signalAssignments"]
      : signalAssignmentArraySerializer(item["signalAssignments"]),
    authenticationSetting: item["authenticationSetting"],
    azureMonitorWorkspaceResourceId: item["azureMonitorWorkspaceResourceId"],
  };
}

export function azureMonitorWorkspaceSignalGroupDeserializer(
  item: any,
): AzureMonitorWorkspaceSignalGroup {
  return {
    signalAssignments: !item["signalAssignments"]
      ? item["signalAssignments"]
      : signalAssignmentArrayDeserializer(item["signalAssignments"]),
    authenticationSetting: item["authenticationSetting"],
    azureMonitorWorkspaceResourceId: item["azureMonitorWorkspaceResourceId"],
  };
}

/** Properties for dependent entities, i.e. child entities */
export interface DependenciesSignalGroup {
  /** Aggregation type for child dependencies. */
  aggregationType: DependenciesAggregationType;
  /** Degraded threshold for aggregating the propagated health state of child dependencies. Can be either an absolute number that is greater than 0, or a percentage between 1-100%. The entity will be considered degraded when the number of not healthy child dependents (unhealthy, degraded, unknown) is equal to or above the threshold value. Must only be set when AggregationType is 'Thresholds'. */
  degradedThreshold?: string;
  /** Unhealthy threshold for aggregating the propagated health state of child dependencies. Can be either an absolute number that is greater than 0, or a percentage between 1-100%. The entity will be considered unhealthy when the number of not healthy child dependents (unhealthy, degraded, unknown) is equal to or above the threshold value. Must only be set when AggregationType is 'Thresholds'. */
  unhealthyThreshold?: string;
}

export function dependenciesSignalGroupSerializer(item: DependenciesSignalGroup): any {
  return {
    aggregationType: item["aggregationType"],
    degradedThreshold: item["degradedThreshold"],
    unhealthyThreshold: item["unhealthyThreshold"],
  };
}

export function dependenciesSignalGroupDeserializer(item: any): DependenciesSignalGroup {
  return {
    aggregationType: item["aggregationType"],
    degradedThreshold: item["degradedThreshold"],
    unhealthyThreshold: item["unhealthyThreshold"],
  };
}

/** Aggregation type for child dependencies. */
export enum KnownDependenciesAggregationType {
  /** Default behavior: Worst child health state is propagated. */
  WorstOf = "WorstOf",
  /** Based on configurable thresholds. */
  Thresholds = "Thresholds",
}

/**
 * Aggregation type for child dependencies. \
 * {@link KnownDependenciesAggregationType} can be used interchangeably with DependenciesAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorstOf**: Default behavior: Worst child health state is propagated. \
 * **Thresholds**: Based on configurable thresholds.
 */
export type DependenciesAggregationType = string;

/** Health state of an entity */
export enum KnownHealthState {
  /** Healthy status */
  Healthy = "Healthy",
  /** Degraded status */
  Degraded = "Degraded",
  /** Error status (Unhealthy) */
  Error = "Error",
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
 * **Error**: Error status (Unhealthy) \
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
  /** Optional set of labels (key-value pairs) */
  labels?: Record<string, string>;
  /** Discovered by which discovery rule. If set, the relationship cannot be deleted manually. */
  readonly discoveredBy?: string;
  /** Date when the relationship was (soft-)deleted */
  readonly deletionDate?: Date;
}

export function relationshipPropertiesSerializer(item: RelationshipProperties): any {
  return {
    displayName: item["displayName"],
    parentEntityName: item["parentEntityName"],
    childEntityName: item["childEntityName"],
    labels: item["labels"],
  };
}

export function relationshipPropertiesDeserializer(item: any): RelationshipProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    parentEntityName: item["parentEntityName"],
    childEntityName: item["childEntityName"],
    labels: item["labels"],
    discoveredBy: item["discoveredBy"],
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
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

export function discoveryRuleSerializer(item: DiscoveryRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : discoveryRulePropertiesSerializer(item["properties"]),
  };
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
  /** Azure Resource Graph query text in KQL syntax. The query must return at least a column named 'id' which contains the resource ID of the discovered resources. */
  resourceGraphQuery: string;
  /** Reference to the name of the authentication setting which is used for querying Azure Resource Graph. The same authentication setting will also be assigned to any discovered entities. */
  authenticationSetting: string;
  /** Whether to create relationships between the discovered entities based on a set of built-in rules. These relationships cannot be manually deleted. */
  discoverRelationships: DiscoveryRuleRelationshipDiscoveryBehavior;
  /** Whether to add all recommended signals to the discovered entities. */
  addRecommendedSignals: DiscoveryRuleRecommendedSignalsBehavior;
  /** Date when the discovery rule was (soft-)deleted. */
  readonly deletionDate?: Date;
  /** Error message if the last discovery operation failed. */
  readonly errorMessage?: string;
  /** Number of discovered entities in the last discovery operation. */
  readonly numberOfDiscoveredEntities?: number;
  /** Name of the entity which represents the discovery rule. Note: It might take a few minutes after creating the discovery rule until the entity is created. */
  readonly entityName: string;
}

export function discoveryRulePropertiesSerializer(item: DiscoveryRuleProperties): any {
  return {
    displayName: item["displayName"],
    resourceGraphQuery: item["resourceGraphQuery"],
    authenticationSetting: item["authenticationSetting"],
    discoverRelationships: item["discoverRelationships"],
    addRecommendedSignals: item["addRecommendedSignals"],
  };
}

export function discoveryRulePropertiesDeserializer(item: any): DiscoveryRuleProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    resourceGraphQuery: item["resourceGraphQuery"],
    authenticationSetting: item["authenticationSetting"],
    discoverRelationships: item["discoverRelationships"],
    addRecommendedSignals: item["addRecommendedSignals"],
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    errorMessage: item["errorMessage"],
    numberOfDiscoveredEntities: item["numberOfDiscoveredEntities"],
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

export function discoveryRuleArraySerializer(result: Array<DiscoveryRule>): any[] {
  return result.map((item) => {
    return discoveryRuleSerializer(item);
  });
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
}
