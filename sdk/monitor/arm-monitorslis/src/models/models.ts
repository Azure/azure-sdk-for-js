// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents an SLI resource within the ProviderHub. */
export interface Sli extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SliResource;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function sliSerializer(item: Sli): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sliResourceSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function sliDeserializer(item: any): Sli {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sliResourceDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Defines the root level properties of an SLI resource. */
export interface SliResource {
  /** Indicates the provisioning status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** A user-provided description of the SLI, with a maximum length of 1000 characters. */
  description: string;
  /** Specifies the category of the SLI, used to classify signals such as Availability and Latency. */
  category: Category;
  /** Determines how the SLI is evaluated—either based on request counts or time windows. */
  evaluationType: EvaluationType;
  /** Indicates the current execution status of the SLI resource in ARM responses. */
  readonly executionState?: ExecutionState;
  /** Destination AMW accounts. */
  destinationAmwAccounts: AmwAccount[];
  /** The destination Azure Monitor Workspace (AMW) accounts where the SLI emits metrics. */
  readonly destinationMetrics?: Metric[];
  /** Defines the SLO baseline associated with the SLI. */
  baselineProperties: BaselineProperties;
  /** The streaming rule Id associated with the Sli resource. */
  readonly streamingRuleId?: string;
  /** The streaming rule last updated timestamp associated with the Sli resource. */
  readonly streamingRuleLastUpdatedTimestamp?: Date;
  /** A flag to determine whether alert is enabled. */
  enableAlert: boolean;
  /** Defines the SLI properties associated with the SLI. */
  sliProperties: SliProperties;
}

export function sliResourceSerializer(item: SliResource): any {
  return {
    description: item["description"],
    category: item["category"],
    evaluationType: item["evaluationType"],
    destinationAmwAccounts: amwAccountArraySerializer(item["destinationAmwAccounts"]),
    baselineProperties: baselinePropertiesSerializer(item["baselineProperties"]),
    enableAlert: item["enableAlert"],
    sliProperties: sliPropertiesSerializer(item["sliProperties"]),
  };
}

export function sliResourceDeserializer(item: any): SliResource {
  return {
    provisioningState: item["provisioningState"],
    description: item["description"],
    category: item["category"],
    evaluationType: item["evaluationType"],
    executionState: !item["executionState"]
      ? item["executionState"]
      : executionStateDeserializer(item["executionState"]),
    destinationAmwAccounts: amwAccountArrayDeserializer(item["destinationAmwAccounts"]),
    destinationMetrics: !item["destinationMetrics"]
      ? item["destinationMetrics"]
      : metricArrayDeserializer(item["destinationMetrics"]),
    baselineProperties: baselinePropertiesDeserializer(item["baselineProperties"]),
    streamingRuleId: item["streamingRuleId"],
    streamingRuleLastUpdatedTimestamp: !item["streamingRuleLastUpdatedTimestamp"]
      ? item["streamingRuleLastUpdatedTimestamp"]
      : new Date(item["streamingRuleLastUpdatedTimestamp"]),
    enableAlert: item["enableAlert"],
    sliProperties: sliPropertiesDeserializer(item["sliProperties"]),
  };
}

/** Represents the provisioning state of the SLI resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * Represents the provisioning state of the SLI resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ProvisioningState = string;

/** Defines the category of an SLI */
export enum KnownCategory {
  /** Indicates availability-related metrics. */
  Availability = "Availability",
  /** Indicates latency-related metrics. */
  Latency = "Latency",
}

/**
 * Defines the category of an SLI \
 * {@link KnownCategory} can be used interchangeably with Category,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Availability**: Indicates availability-related metrics. \
 * **Latency**: Indicates latency-related metrics.
 */
export type Category = string;

/** Specifies how the SLI is evaluated. */
export enum KnownEvaluationType {
  /** Evaluates SLI based on time windows. */
  WindowBased = "WindowBased",
  /** Evaluates SLI based on request counts. */
  RequestBased = "RequestBased",
}

/**
 * Specifies how the SLI is evaluated. \
 * {@link KnownEvaluationType} can be used interchangeably with EvaluationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WindowBased**: Evaluates SLI based on time windows. \
 * **RequestBased**: Evaluates SLI based on request counts.
 */
export type EvaluationType = string;

/** Represents the current execution state of an SLI. */
export interface ExecutionState {
  /** The execution state value. */
  state: string;
  /** A descriptive message related to the execution state. */
  message?: string;
}

export function executionStateDeserializer(item: any): ExecutionState {
  return {
    state: item["state"],
    message: item["message"],
  };
}

export function amwAccountArraySerializer(result: Array<AmwAccount>): any[] {
  return result.map((item) => {
    return amwAccountSerializer(item);
  });
}

export function amwAccountArrayDeserializer(result: Array<AmwAccount>): any[] {
  return result.map((item) => {
    return amwAccountDeserializer(item);
  });
}

/** Represents an Azure Monitor Workspace (AMW) account used for emitting metrics. */
export interface AmwAccount {
  /** The ARM resource ID of the account where metrics are emitted. */
  resourceId: string;
  /** The ARM resource ID of the managed identity with access to the source account. */
  identity: string;
}

export function amwAccountSerializer(item: AmwAccount): any {
  return { resourceId: item["resourceId"], identity: item["identity"] };
}

export function amwAccountDeserializer(item: any): AmwAccount {
  return {
    resourceId: item["resourceId"],
    identity: item["identity"],
  };
}

export function metricArrayDeserializer(result: Array<Metric>): any[] {
  return result.map((item) => {
    return metricDeserializer(item);
  });
}

/** Defines a metric in the destination AMW account. */
export interface Metric {
  /** The namespace of the metric. */
  metricNamespace: string;
  /** The name of the metric. */
  metricName: string;
}

export function metricDeserializer(item: any): Metric {
  return {
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
  };
}

/** Defines the properties of a baseline. */
export interface BaselineProperties {
  /** Defines the baseline target, which is compared against the SLI value to determine compliance. */
  baseline: Baseline;
}

export function baselinePropertiesSerializer(item: BaselineProperties): any {
  return { baseline: baselineSerializer(item["baseline"]) };
}

export function baselinePropertiesDeserializer(item: any): BaselineProperties {
  return {
    baseline: baselineDeserializer(item["baseline"]),
  };
}

/** Defines the target parameters for a Slo baseline. */
export interface Baseline {
  /** The user-defined or Azure-defined target value used for comparison against the SLI value. */
  value: number;
  /** The time frame (in days) used for SLI evaluation. */
  evaluationPeriodDays: number;
  /** Specifies how evaluation is calculated, either based on calendar days or a rolling window. */
  evaluationCalculationType: EvaluationCalculationType;
}

export function baselineSerializer(item: Baseline): any {
  return {
    value: item["value"],
    evaluationPeriodDays: item["evaluationPeriodDays"],
    evaluationCalculationType: item["evaluationCalculationType"],
  };
}

export function baselineDeserializer(item: any): Baseline {
  return {
    value: item["value"],
    evaluationPeriodDays: item["evaluationPeriodDays"],
    evaluationCalculationType: item["evaluationCalculationType"],
  };
}

/** Specifies the method for evaluation calculation. */
export enum KnownEvaluationCalculationType {
  /** Calculates evaluation based on a fixed calendar period. */
  CalendarDays = "CalendarDays",
  /** Calculates evaluation using a rolling time window. */
  RollingDays = "RollingDays",
}

/**
 * Specifies the method for evaluation calculation. \
 * {@link KnownEvaluationCalculationType} can be used interchangeably with EvaluationCalculationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CalendarDays**: Calculates evaluation based on a fixed calendar period. \
 * **RollingDays**: Calculates evaluation using a rolling time window.
 */
export type EvaluationCalculationType = string;

/** Defines the properties of an SLI. */
export interface SliProperties {
  /** Represents good signals used in request-based SLI calculations. */
  goodSignals?: Signal;
  /** Represents total signals used in request-based SLI calculations. */
  totalSignals?: Signal;
  /** Signals used for window-based SLI calculations. */
  signals?: Signal;
  /** Defines the uptime criteria for window-based SLIs. */
  windowUptimeCriteria?: WindowUptimeCriteria;
}

export function sliPropertiesSerializer(item: SliProperties): any {
  return {
    goodSignals: !item["goodSignals"] ? item["goodSignals"] : signalSerializer(item["goodSignals"]),
    totalSignals: !item["totalSignals"]
      ? item["totalSignals"]
      : signalSerializer(item["totalSignals"]),
    signals: !item["signals"] ? item["signals"] : signalSerializer(item["signals"]),
    windowUptimeCriteria: !item["windowUptimeCriteria"]
      ? item["windowUptimeCriteria"]
      : windowUptimeCriteriaSerializer(item["windowUptimeCriteria"]),
  };
}

export function sliPropertiesDeserializer(item: any): SliProperties {
  return {
    goodSignals: !item["goodSignals"]
      ? item["goodSignals"]
      : signalDeserializer(item["goodSignals"]),
    totalSignals: !item["totalSignals"]
      ? item["totalSignals"]
      : signalDeserializer(item["totalSignals"]),
    signals: !item["signals"] ? item["signals"] : signalDeserializer(item["signals"]),
    windowUptimeCriteria: !item["windowUptimeCriteria"]
      ? item["windowUptimeCriteria"]
      : windowUptimeCriteriaDeserializer(item["windowUptimeCriteria"]),
  };
}

/** Represents a signal model used in SLI calculations. */
export interface Signal {
  /** Sources of metrics used for SLIs. */
  signalSources: SignalSource[];
  /** Mathematical formula used to combine multiple metrics. */
  signalFormula: string;
}

export function signalSerializer(item: Signal): any {
  return {
    signalSources: signalSourceArraySerializer(item["signalSources"]),
    signalFormula: item["signalFormula"],
  };
}

export function signalDeserializer(item: any): Signal {
  return {
    signalSources: signalSourceArrayDeserializer(item["signalSources"]),
    signalFormula: item["signalFormula"],
  };
}

export function signalSourceArraySerializer(result: Array<SignalSource>): any[] {
  return result.map((item) => {
    return signalSourceSerializer(item);
  });
}

export function signalSourceArrayDeserializer(result: Array<SignalSource>): any[] {
  return result.map((item) => {
    return signalSourceDeserializer(item);
  });
}

/** Represents a signal source used in SLIs. */
export interface SignalSource {
  /** Unique identifier for the signal source. */
  signalSourceId: string;
  /** Managed identity for authenticating the signal source. */
  sourceAmwAccountManagedIdentity: string;
  /** Resource ID of the source AMW account. */
  sourceAmwAccountResourceId: string;
  /** Namespace of the metric. */
  metricNamespace: string;
  /** Name of the metric. */
  metricName: string;
  /** Filters applied to modify signal values. */
  filters: Condition[];
  /** Defines how measurements are aggregated across multiple time series. */
  spatialAggregation: SpatialAggregation;
  /** Defines how measurements are aggregated over a specific time window within the same time series. */
  temporalAggregation: TemporalAggregation;
}

export function signalSourceSerializer(item: SignalSource): any {
  return {
    signalSourceId: item["signalSourceId"],
    sourceAmwAccountManagedIdentity: item["sourceAmwAccountManagedIdentity"],
    sourceAmwAccountResourceId: item["sourceAmwAccountResourceId"],
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    filters: conditionArraySerializer(item["filters"]),
    spatialAggregation: spatialAggregationSerializer(item["spatialAggregation"]),
    temporalAggregation: temporalAggregationSerializer(item["temporalAggregation"]),
  };
}

export function signalSourceDeserializer(item: any): SignalSource {
  return {
    signalSourceId: item["signalSourceId"],
    sourceAmwAccountManagedIdentity: item["sourceAmwAccountManagedIdentity"],
    sourceAmwAccountResourceId: item["sourceAmwAccountResourceId"],
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    filters: conditionArrayDeserializer(item["filters"]),
    spatialAggregation: spatialAggregationDeserializer(item["spatialAggregation"]),
    temporalAggregation: temporalAggregationDeserializer(item["temporalAggregation"]),
  };
}

export function conditionArraySerializer(result: Array<Condition>): any[] {
  return result.map((item) => {
    return conditionSerializer(item);
  });
}

export function conditionArrayDeserializer(result: Array<Condition>): any[] {
  return result.map((item) => {
    return conditionDeserializer(item);
  });
}

/** Represents a filtering condition. */
export interface Condition {
  /** Dimension name used in filtering. */
  dimensionName?: string;
  /** Scalar function applied for filtering. */
  scalarFunction?: ScalarFunction;
  /** Defines the sampling type. */
  samplingType?: SamplingType;
  /** Operator used in the filtering condition. */
  operator: ConditionOperator;
  /** Value used in filtering. */
  value: string;
}

export function conditionSerializer(item: Condition): any {
  return {
    dimensionName: item["dimensionName"],
    scalarFunction: item["scalarFunction"],
    samplingType: item["samplingType"],
    operator: item["operator"],
    value: item["value"],
  };
}

export function conditionDeserializer(item: any): Condition {
  return {
    dimensionName: item["dimensionName"],
    scalarFunction: item["scalarFunction"],
    samplingType: item["samplingType"],
    operator: item["operator"],
    value: item["value"],
  };
}

/** Defines scalar functions used in filtering. */
export enum KnownScalarFunction {
  /** Maximum value. */
  Max = "max",
  /** Minimum value. */
  Min = "min",
  /** Average value. */
  Avg = "avg",
  /** Summation. */
  Sum = "sum",
}

/**
 * Defines scalar functions used in filtering. \
 * {@link KnownScalarFunction} can be used interchangeably with ScalarFunction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **max**: Maximum value. \
 * **min**: Minimum value. \
 * **avg**: Average value. \
 * **sum**: Summation.
 */
export type ScalarFunction = string;

/** Defines the available sampling types. */
export enum KnownSamplingType {
  /** Maximum value. */
  Max = "max",
  /** Minimum value. */
  Min = "min",
  /** Average value. */
  Avg = "avg",
  /** Summation. */
  Sum = "sum",
}

/**
 * Defines the available sampling types. \
 * {@link KnownSamplingType} can be used interchangeably with SamplingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **max**: Maximum value. \
 * **min**: Minimum value. \
 * **avg**: Average value. \
 * **sum**: Summation.
 */
export type SamplingType = string;

/** Defines operators used in filter conditions. */
export enum KnownConditionOperator {
  /** Equal to. */
  Equal = "==",
  /** Not equal to. */
  NotEqual = "!=",
  /** Less than. */
  LessThan = "<",
  /** Less than or equal to. */
  LessThanOrEqual = "<=",
  /** Greater than. */
  GreaterThan = ">",
  /** Greater than or equal to. */
  GreaterThanOrEqual = ">=",
  /** In operator. */
  In = "@in",
  /** Not in. */
  NotIn = "!in",
  /** Starts with. */
  StartsWith = "startswith",
  /** Does not start with. */
  NotStartsWith = "!startswith",
  /** Contains the value. */
  Contains = "contains",
  /** Does not contain the value. */
  NotContains = "!contains",
}

/**
 * Defines operators used in filter conditions. \
 * {@link KnownConditionOperator} can be used interchangeably with ConditionOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **==**: Equal to. \
 * **!=**: Not equal to. \
 * **<**: Less than. \
 * **<=**: Less than or equal to. \
 * **>**: Greater than. \
 * **>=**: Greater than or equal to. \
 * **@in**: In operator. \
 * **!in**: Not in. \
 * **startswith**: Starts with. \
 * **!startswith**: Does not start with. \
 * **contains**: Contains the value. \
 * **!contains**: Does not contain the value.
 */
export type ConditionOperator = string;

/** Represents the spatial aggregation model. */
export interface SpatialAggregation {
  /** Type of spatial aggregation. */
  type: SpatialAggregationType;
  /** Dimensions considered for spatial aggregation. */
  dimensions: string[];
}

export function spatialAggregationSerializer(item: SpatialAggregation): any {
  return {
    type: item["type"],
    dimensions: item["dimensions"].map((p: any) => {
      return p;
    }),
  };
}

export function spatialAggregationDeserializer(item: any): SpatialAggregation {
  return {
    type: item["type"],
    dimensions: item["dimensions"].map((p: any) => {
      return p;
    }),
  };
}

/** Defines the available spatial aggregation types for aggregating measurements across multiple time series. */
export enum KnownSpatialAggregationType {
  /** Average value. */
  Average = "Average",
  /** Minimum value. */
  Min = "Min",
  /** Maximum value. */
  Max = "Max",
  /** Summation. */
  Sum = "Sum",
  /** Count of occurrences. */
  Count = "Count",
}

/**
 * Defines the available spatial aggregation types for aggregating measurements across multiple time series. \
 * {@link KnownSpatialAggregationType} can be used interchangeably with SpatialAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Average**: Average value. \
 * **Min**: Minimum value. \
 * **Max**: Maximum value. \
 * **Sum**: Summation. \
 * **Count**: Count of occurrences.
 */
export type SpatialAggregationType = string;

/** Represents temporal aggregation settings. */
export interface TemporalAggregation {
  /** Type of temporal aggregation. */
  type: TemporalAggregationType;
  /** Time window size for aggregation, in minutes. */
  windowSizeMinutes?: number;
}

export function temporalAggregationSerializer(item: TemporalAggregation): any {
  return { type: item["type"], windowSizeMinutes: item["windowSizeMinutes"] };
}

export function temporalAggregationDeserializer(item: any): TemporalAggregation {
  return {
    type: item["type"],
    windowSizeMinutes: item["windowSizeMinutes"],
  };
}

/** Defines the available temporal aggregation types for aggregating measurements over a specific time window within the same time series. */
export enum KnownTemporalAggregationType {
  /** Average value. */
  Average = "Average",
  /** Minimum value. */
  Min = "Min",
  /** Maximum value. */
  Max = "Max",
  /** Summation. */
  Sum = "Sum",
  /** Rate over time. */
  Rate = "Rate",
  /** Instance rate. */
  IRate = "IRate",
  /** Delta over time. */
  Delta = "Delta",
  /** Instance delta. */
  IDelta = "IDelta",
  /** Increase over time. */
  Increase = "Increase",
}

/**
 * Defines the available temporal aggregation types for aggregating measurements over a specific time window within the same time series. \
 * {@link KnownTemporalAggregationType} can be used interchangeably with TemporalAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Average**: Average value. \
 * **Min**: Minimum value. \
 * **Max**: Maximum value. \
 * **Sum**: Summation. \
 * **Rate**: Rate over time. \
 * **IRate**: Instance rate. \
 * **Delta**: Delta over time. \
 * **IDelta**: Instance delta. \
 * **Increase**: Increase over time.
 */
export type TemporalAggregationType = string;

/** Represents criteria for determining uptime in window-based SLIs. */
export interface WindowUptimeCriteria {
  /** Threshold value used to determine uptime. */
  target: number;
  /** Comparison operator used for uptime evaluation. */
  comparator: WindowUptimeCriteriaComparator;
}

export function windowUptimeCriteriaSerializer(item: WindowUptimeCriteria): any {
  return { target: item["target"], comparator: item["comparator"] };
}

export function windowUptimeCriteriaDeserializer(item: any): WindowUptimeCriteria {
  return {
    target: item["target"],
    comparator: item["comparator"],
  };
}

/** Defines comparison operators for window uptime criteria. */
export enum KnownWindowUptimeCriteriaComparator {
  /** Less than the target value. */
  LessThan = "<",
  /** Greater than the target value. */
  GreaterThan = ">",
  /** Less than or equal to the target value. */
  LessThanOrEqual = "<=",
  /** Greater than or equal to the target value. */
  GreaterThanOrEqual = ">=",
}

/**
 * Defines comparison operators for window uptime criteria. \
 * {@link KnownWindowUptimeCriteriaComparator} can be used interchangeably with WindowUptimeCriteriaComparator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **<**: Less than the target value. \
 * **>**: Greater than the target value. \
 * **<=**: Less than or equal to the target value. \
 * **>=**: Greater than or equal to the target value.
 */
export type WindowUptimeCriteriaComparator = string;

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

/** The response of a Sli list operation. */
export interface _SliListResult {
  /** The Sli items on this page */
  value: Sli[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sliListResultDeserializer(item: any): _SliListResult {
  return {
    value: sliArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sliArraySerializer(result: Array<Sli>): any[] {
  return result.map((item) => {
    return sliSerializer(item);
  });
}

export function sliArrayDeserializer(result: Array<Sli>): any[] {
  return result.map((item) => {
    return sliDeserializer(item);
  });
}

/** Known values of {@link Versions} that the service accepts. */
export enum KnownVersions {
  /** API Version 2025-03-01-preview */
  V20250301Preview = "2025-03-01-preview",
}
