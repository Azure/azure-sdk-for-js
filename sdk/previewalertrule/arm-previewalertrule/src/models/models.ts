// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** model interface PreviewAlertRuleRequest */
export interface PreviewAlertRuleRequest {
  /** The location of the rule resource. */
  location: string;
  properties: PreviewAlertRuleRequestProperties;
}

export function previewAlertRuleRequestSerializer(item: PreviewAlertRuleRequest): any {
  return {
    location: item["location"],
    properties: previewAlertRuleRequestPropertiesSerializer(item["properties"]),
  };
}

/** model interface PreviewAlertRuleRequestProperties */
export interface PreviewAlertRuleRequestProperties {
  /** Specifies the timespan of the preview in ISO 8601 duration format. */
  timespan: string;
  /** The properties of the alert rule to preview. */
  scheduledQueryRuleProperties?: LogAlertRuleResource;
}

export function previewAlertRuleRequestPropertiesSerializer(
  item: PreviewAlertRuleRequestProperties,
): any {
  return {
    timespan: item["timespan"],
    scheduledQueryRuleProperties: !item["scheduledQueryRuleProperties"]
      ? item["scheduledQueryRuleProperties"]
      : logAlertRuleResourceSerializer(item["scheduledQueryRuleProperties"]),
  };
}

/** The scheduled query rule resource. */
export interface LogAlertRuleResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
  /** Indicates the type of scheduled query rule. The default is LogAlert. */
  kind?: Kind;
  /** The description of the scheduled query rule. */
  description?: string;
  /** The display name of the alert rule */
  displayName?: string;
  /** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
  severity?: AlertSeverity;
  /** The flag which indicates whether this scheduled query rule is enabled. Value should be true or false */
  enabled?: boolean;
  /** The list of resource id's that this scheduled query rule is scoped to. */
  scopes?: string[];
  /** How often the scheduled query rule is evaluated represented in ISO 8601 duration format. Relevant and required only for rules of the kind LogAlert. */
  evaluationFrequency?: string;
  /** The period of time (in ISO 8601 duration format) on which the Alert query will be executed (bin size). Relevant and required only for rules of the kind LogAlert. */
  windowSize?: string;
  /** If specified then overrides the query time range (default is WindowSize*NumberOfEvaluationPeriods). Relevant only for rules of the kind LogAlert. */
  overrideQueryTimeRange?: string;
  /** List of resource type of the target resource(s) on which the alert is created/updated. For example if the scope is a resource group and targetResourceTypes is Microsoft.Compute/virtualMachines, then a different alert will be fired for each virtual machine in the resource group which meet the alert criteria. Relevant only for rules of the kind LogAlert */
  targetResourceTypes?: string[];
  /** The rule criteria that defines the conditions of the scheduled query rule. */
  criteria?: LogAlertRuleCriteria;
}

export function logAlertRuleResourceSerializer(item: LogAlertRuleResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
    properties: _logAlertRuleResourcePropertiesSerializer(item),
  };
}

/** Indicates the type of scheduled query rule. The default is LogAlert. */
export enum KnownKind {
  /** LogAlert */
  LogAlert = "LogAlert",
  /** EventLogAlert */
  EventLogAlert = "EventLogAlert",
  /** LogToMetric */
  LogToMetric = "LogToMetric",
}

/**
 * Indicates the type of scheduled query rule. The default is LogAlert. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogAlert**: LogAlert \
 * **EventLogAlert**: EventLogAlert \
 * **LogToMetric**: LogToMetric
 */
export type Kind = string;

/** scheduled query rule Definition */
export interface LogAlertRuleProperties {
  /** The description of the scheduled query rule. */
  description?: string;
  /** The display name of the alert rule */
  displayName?: string;
  /** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
  severity?: AlertSeverity;
  /** The flag which indicates whether this scheduled query rule is enabled. Value should be true or false */
  enabled?: boolean;
  /** The list of resource id's that this scheduled query rule is scoped to. */
  scopes?: string[];
  /** How often the scheduled query rule is evaluated represented in ISO 8601 duration format. Relevant and required only for rules of the kind LogAlert. */
  evaluationFrequency?: string;
  /** The period of time (in ISO 8601 duration format) on which the Alert query will be executed (bin size). Relevant and required only for rules of the kind LogAlert. */
  windowSize?: string;
  /** If specified then overrides the query time range (default is WindowSize*NumberOfEvaluationPeriods). Relevant only for rules of the kind LogAlert. */
  overrideQueryTimeRange?: string;
  /** List of resource type of the target resource(s) on which the alert is created/updated. For example if the scope is a resource group and targetResourceTypes is Microsoft.Compute/virtualMachines, then a different alert will be fired for each virtual machine in the resource group which meet the alert criteria. Relevant only for rules of the kind LogAlert */
  targetResourceTypes?: string[];
  /** The rule criteria that defines the conditions of the scheduled query rule. */
  criteria?: LogAlertRuleCriteria;
}

export function logAlertRulePropertiesSerializer(item: LogAlertRuleProperties): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    overrideQueryTimeRange: item["overrideQueryTimeRange"],
    targetResourceTypes: !item["targetResourceTypes"]
      ? item["targetResourceTypes"]
      : item["targetResourceTypes"].map((p: any) => {
          return p;
        }),
    criteria: !item["criteria"]
      ? item["criteria"]
      : logAlertRuleCriteriaSerializer(item["criteria"]),
  };
}

/** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
export enum KnownAlertSeverity {
  /** 0 */
  _0 = 0,
  /** 1 */
  _1 = 1,
  /** 2 */
  _2 = 2,
  /** 3 */
  _3 = 3,
  /** 4 */
  _4 = 4,
}

/**
 * Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. \
 * {@link KnownAlertSeverity} can be used interchangeably with AlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **0**: 0 \
 * **1**: 1 \
 * **2**: 2 \
 * **3**: 3 \
 * **4**: 4
 */
export type AlertSeverity = number;

/** The rule criteria that defines the conditions of the scheduled query rule. */
export interface LogAlertRuleCriteria {
  /** A list of conditions to evaluate against the specified scopes */
  allOf?: LogAlertRuleCondition[];
}

export function logAlertRuleCriteriaSerializer(item: LogAlertRuleCriteria): any {
  return {
    allOf: !item["allOf"] ? item["allOf"] : logAlertRuleConditionArraySerializer(item["allOf"]),
  };
}

export function logAlertRuleConditionArraySerializer(result: Array<LogAlertRuleCondition>): any[] {
  return result.map((item) => {
    return logAlertRuleConditionSerializer(item);
  });
}

/** A condition of the scheduled query rule. */
export interface LogAlertRuleCondition {
  /** Specifies the type of threshold criteria */
  criterionType?: CriterionType;
  /** KQL log query alert */
  query?: string;
  /** Aggregation type. Relevant and required only for rules of the kind LogAlert. */
  timeAggregation?: TimeAggregation;
  /** The column containing the metric measure number. Relevant only for rules of the kind LogAlert. */
  metricMeasureColumn?: string;
  /** The column containing the resource id. The content of the column must be a uri formatted as resource id. Relevant only for rules of the kind LogAlert. */
  resourceIdColumn?: string;
  /** List of Dimensions conditions */
  dimensions?: LogAlertRuleDimension[];
  /** The criteria operator. Relevant and required only for rules of the kind LogAlert. */
  operator?: ConditionOperator;
  /** the criteria threshold value that activates the alert. Relevant and required only for static threshold rules of the kind LogAlert. */
  threshold?: number;
  /** The extent of deviation required to trigger an alert. Allowed values are 'Low', 'Medium' and 'High'. This will affect how tight the threshold is to the metric series pattern. Relevant and required only for dynamic threshold rules of the kind LogAlert. */
  alertSensitivity?: string;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format). Relevant only for dynamic threshold rules of the kind LogAlert. */
  ignoreDataBefore?: Date;
  /** The minimum number of violations required within the selected lookback time window required to raise an alert. Relevant only for rules of the kind LogAlert. */
  failingPeriods?: LogAlertRuleConditionFailingPeriods;
  /** The name of the metric to be sent. Relevant and required only for rules of the kind LogToMetric. */
  metricName?: string;
}

export function logAlertRuleConditionSerializer(item: LogAlertRuleCondition): any {
  return {
    criterionType: item["criterionType"],
    query: item["query"],
    timeAggregation: item["timeAggregation"],
    metricMeasureColumn: item["metricMeasureColumn"],
    resourceIdColumn: item["resourceIdColumn"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : logAlertRuleDimensionArraySerializer(item["dimensions"]),
    operator: item["operator"],
    threshold: item["threshold"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : logAlertRuleConditionFailingPeriodsSerializer(item["failingPeriods"]),
    metricName: item["metricName"],
  };
}

/** Specifies the type of threshold criteria */
export enum KnownCriterionType {
  /** StaticThresholdCriterion */
  StaticThresholdCriterion = "StaticThresholdCriterion",
  /** DynamicThresholdCriterion */
  DynamicThresholdCriterion = "DynamicThresholdCriterion",
}

/**
 * Specifies the type of threshold criteria \
 * {@link KnownCriterionType} can be used interchangeably with CriterionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StaticThresholdCriterion**: StaticThresholdCriterion \
 * **DynamicThresholdCriterion**: DynamicThresholdCriterion
 */
export type CriterionType = string;

/** Aggregation type. Relevant and required only for rules of the kind LogAlert. */
export enum KnownTimeAggregation {
  /** Count */
  Count = "Count",
  /** Average */
  Average = "Average",
  /** Minimum */
  Minimum = "Minimum",
  /** Maximum */
  Maximum = "Maximum",
  /** Total */
  Total = "Total",
}

/**
 * Aggregation type. Relevant and required only for rules of the kind LogAlert. \
 * {@link KnownTimeAggregation} can be used interchangeably with TimeAggregation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**: Count \
 * **Average**: Average \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type TimeAggregation = string;

export function logAlertRuleDimensionArraySerializer(result: Array<LogAlertRuleDimension>): any[] {
  return result.map((item) => {
    return logAlertRuleDimensionSerializer(item);
  });
}

/** Dimension splitting and filtering definition */
export interface LogAlertRuleDimension {
  /** Name of the dimension */
  name: string;
  /** Operator for dimension values */
  operator: DimensionOperator;
  /** List of dimension values */
  values: string[];
}

export function logAlertRuleDimensionSerializer(item: LogAlertRuleDimension): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Operator for dimension values */
export enum KnownDimensionOperator {
  /** Include */
  Include = "Include",
  /** Exclude */
  Exclude = "Exclude",
}

/**
 * Operator for dimension values \
 * {@link KnownDimensionOperator} can be used interchangeably with DimensionOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Include**: Include \
 * **Exclude**: Exclude
 */
export type DimensionOperator = string;

/** The criteria operator. Relevant and required only for rules of the kind LogAlert. */
export enum KnownConditionOperator {
  /** Equals */
  Equals = "Equals",
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** GreaterThanOrEqual */
  GreaterThanOrEqual = "GreaterThanOrEqual",
  /** LessThan */
  LessThan = "LessThan",
  /** LessThanOrEqual */
  LessThanOrEqual = "LessThanOrEqual",
  /** GreaterOrLessThan */
  GreaterOrLessThan = "GreaterOrLessThan",
}

/**
 * The criteria operator. Relevant and required only for rules of the kind LogAlert. \
 * {@link KnownConditionOperator} can be used interchangeably with ConditionOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **GreaterThan**: GreaterThan \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **LessThan**: LessThan \
 * **LessThanOrEqual**: LessThanOrEqual \
 * **GreaterOrLessThan**: GreaterOrLessThan
 */
export type ConditionOperator = string;

/** The minimum number of violations required within the selected lookback time window required to raise an alert. Relevant only for rules of the kind LogAlert. */
export interface LogAlertRuleConditionFailingPeriods {
  /** The number of aggregated lookback points. The lookback time window is calculated based on the aggregation granularity (windowSize) and the selected number of aggregated points. Default value is 1 */
  numberOfEvaluationPeriods?: number;
  /** The number of violations to trigger an alert. Should be smaller or equal to numberOfEvaluationPeriods. Default value is 1 */
  minFailingPeriodsToAlert?: number;
}

export function logAlertRuleConditionFailingPeriodsSerializer(
  item: LogAlertRuleConditionFailingPeriods,
): any {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

/** model interface PreviewAlertRuleResponse */
export interface PreviewAlertRuleResponse {
  /** An array of rule preview results. */
  rulePreviewResults?: RulePreviewResult[];
}

export function previewAlertRuleResponseDeserializer(item: any): PreviewAlertRuleResponse {
  return {
    rulePreviewResults: !item["rulePreviewResults"]
      ? item["rulePreviewResults"]
      : rulePreviewResultArrayDeserializer(item["rulePreviewResults"]),
  };
}

export function rulePreviewResultArrayDeserializer(result: Array<RulePreviewResult>): any[] {
  return result.map((item) => {
    return rulePreviewResultDeserializer(item);
  });
}

/** A rule preview result containing a dimension combination and an array of evaluations. */
export interface RulePreviewResult {
  /** The list of dimensions for the evaluation. */
  dimensionCombination?: DimensionNameAndValue[];
  /** An array of evaluations. */
  evaluations?: Evaluation[];
}

export function rulePreviewResultDeserializer(item: any): RulePreviewResult {
  return {
    dimensionCombination: !item["dimensionCombination"]
      ? item["dimensionCombination"]
      : dimensionNameAndValueArrayDeserializer(item["dimensionCombination"]),
    evaluations: !item["evaluations"]
      ? item["evaluations"]
      : evaluationArrayDeserializer(item["evaluations"]),
  };
}

export function dimensionNameAndValueArrayDeserializer(
  result: Array<DimensionNameAndValue>,
): any[] {
  return result.map((item) => {
    return dimensionNameAndValueDeserializer(item);
  });
}

/** Dimension name and value */
export interface DimensionNameAndValue {
  /** Name of the dimension */
  name: string;
  /** Value of the dimension */
  value: string;
}

export function dimensionNameAndValueDeserializer(item: any): DimensionNameAndValue {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function evaluationArrayDeserializer(result: Array<Evaluation>): any[] {
  return result.map((item) => {
    return evaluationDeserializer(item);
  });
}

/** An evaluation of the alert rule. */
export interface Evaluation {
  /** The time when the evaluation was performed. */
  evaluationTime?: Date;
  /** The state of the alert after the evaluation. */
  alertState?: AlertState;
  /** An array of evaluated periods. */
  evaluatedPeriods?: EvaluatedPeriod[];
  /** Indicates whether the threshold was met for this evaluation. */
  thresholdMet?: boolean;
}

export function evaluationDeserializer(item: any): Evaluation {
  return {
    evaluationTime: !item["evaluationTime"]
      ? item["evaluationTime"]
      : new Date(item["evaluationTime"]),
    alertState: item["alertState"],
    evaluatedPeriods: !item["evaluatedPeriods"]
      ? item["evaluatedPeriods"]
      : evaluatedPeriodArrayDeserializer(item["evaluatedPeriods"]),
    thresholdMet: item["thresholdMet"],
  };
}

/** The state of the alert after the evaluation. */
export enum KnownAlertState {
  /** NoAlert */
  NoAlert = "NoAlert",
  /** Fired */
  Fired = "Fired",
  /** Firing */
  Firing = "Firing",
  /** Resolving */
  Resolving = "Resolving",
  /** Resolved */
  Resolved = "Resolved",
}

/**
 * The state of the alert after the evaluation. \
 * {@link KnownAlertState} can be used interchangeably with AlertState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoAlert**: NoAlert \
 * **Fired**: Fired \
 * **Firing**: Firing \
 * **Resolving**: Resolving \
 * **Resolved**: Resolved
 */
export type AlertState = string;

export function evaluatedPeriodArrayDeserializer(result: Array<EvaluatedPeriod>): any[] {
  return result.map((item) => {
    return evaluatedPeriodDeserializer(item);
  });
}

/** Details of the evaluated period. */
export interface EvaluatedPeriod {
  /** The timestamp of the evaluated period. */
  timestamp?: Date;
  /** The high threshold value for the evaluation period. */
  highThreshold?: number;
  /** The low threshold value for the evaluation period. */
  lowThreshold?: number;
  /** The metric value for the evaluation period. */
  metricValue?: number;
  /** Indicates whether the threshold was met during the evaluation period. */
  thresholdMet?: boolean;
}

export function evaluatedPeriodDeserializer(item: any): EvaluatedPeriod {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    highThreshold: item["highThreshold"],
    lowThreshold: item["lowThreshold"],
    metricValue: item["metricValue"],
    thresholdMet: item["thresholdMet"],
  };
}

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

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-01-preview API version. */
  V20250701Preview = "2025-07-01-preview",
}

export function _logAlertRuleResourcePropertiesSerializer(item: LogAlertRuleResource): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    overrideQueryTimeRange: item["overrideQueryTimeRange"],
    targetResourceTypes: !item["targetResourceTypes"]
      ? item["targetResourceTypes"]
      : item["targetResourceTypes"].map((p: any) => {
          return p;
        }),
    criteria: !item["criteria"]
      ? item["criteria"]
      : logAlertRuleCriteriaSerializer(item["criteria"]),
  };
}
