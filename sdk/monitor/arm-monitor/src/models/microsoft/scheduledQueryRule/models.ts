// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";
import type { CriterionType, Identity } from "../common/models.js";
import { identitySerializer, identityDeserializer } from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The scheduled query rule resource. */
export interface ScheduledQueryRuleResource extends ProxyResource {
  /** The identity of the resource. */
  identity?: Identity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
  /** Indicates the type of scheduled query rule. The default is LogAlert. */
  kind?: Kind;
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** The api-version used when creating this alert rule */
  readonly createdWithApiVersion?: string;
  /** True if alert rule is legacy Log Analytic rule */
  readonly isLegacyLogAnalyticsRule?: boolean;
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
  criteria?: ScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: Actions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: RuleResolveConfiguration;
}

export function scheduledQueryRuleResourceSerializer(item: ScheduledQueryRuleResource): any {
  return {
    properties: _scheduledQueryRuleResourcePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
  };
}

export function scheduledQueryRuleResourceDeserializer(item: any): ScheduledQueryRuleResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._scheduledQueryRuleResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** scheduled query rule Definition */
export interface ScheduledQueryRuleProperties {
  /** The api-version used when creating this alert rule */
  readonly createdWithApiVersion?: string;
  /** True if alert rule is legacy Log Analytic rule */
  readonly isLegacyLogAnalyticsRule?: boolean;
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
  criteria?: ScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: Actions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: RuleResolveConfiguration;
}

export function scheduledQueryRulePropertiesSerializer(item: ScheduledQueryRuleProperties): any {
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
      : scheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"] ? item["actions"] : actionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : ruleResolveConfigurationSerializer(item["resolveConfiguration"]),
  };
}

export function scheduledQueryRulePropertiesDeserializer(item: any): ScheduledQueryRuleProperties {
  return {
    createdWithApiVersion: item["createdWithApiVersion"],
    isLegacyLogAnalyticsRule: item["isLegacyLogAnalyticsRule"],
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
      : scheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"] ? item["actions"] : actionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : ruleResolveConfigurationDeserializer(item["resolveConfiguration"]),
  };
}

/** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
export enum KnownAlertSeverity {
  /** 0 */
  Zero = 0,
  /** 1 */
  One = 1,
  /** 2 */
  Two = 2,
  /** 3 */
  Three = 3,
  /** 4 */
  Four = 4,
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
export interface ScheduledQueryRuleCriteria {
  /** A list of conditions to evaluate against the specified scopes */
  allOf?: Condition[];
}

export function scheduledQueryRuleCriteriaSerializer(item: ScheduledQueryRuleCriteria): any {
  return { allOf: !item["allOf"] ? item["allOf"] : conditionArraySerializer(item["allOf"]) };
}

export function scheduledQueryRuleCriteriaDeserializer(item: any): ScheduledQueryRuleCriteria {
  return {
    allOf: !item["allOf"] ? item["allOf"] : conditionArrayDeserializer(item["allOf"]),
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

/** A condition of the scheduled query rule. */
export interface Condition {
  /** Specifies the type of threshold criteria */
  criterionType?: CriterionType;
  /** Log query alert */
  query?: string;
  /** Aggregation type. Relevant and required only for rules of the kind LogAlert. */
  timeAggregation?: TimeAggregation;
  /** The column containing the metric measure number. Relevant only for rules of the kind LogAlert. */
  metricMeasureColumn?: string;
  /** The column containing the resource id. The content of the column must be a uri formatted as resource id. Relevant only for rules of the kind LogAlert. */
  resourceIdColumn?: string;
  /** List of Dimensions conditions */
  dimensions?: Dimension[];
  /** The criteria operator. Relevant and required only for rules of the kind LogAlert. */
  operator?: ConditionOperator;
  /** the criteria threshold value that activates the alert. Relevant and required only for static threshold rules of the kind LogAlert. */
  threshold?: number;
  /** The extent of deviation required to trigger an alert. Allowed values are 'Low', 'Medium' and 'High'. This will affect how tight the threshold is to the metric series pattern. Relevant only for dynamic threshold rules of the kind LogAlert. */
  alertSensitivity?: string;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format). Relevant only for dynamic threshold rules of the kind LogAlert. */
  ignoreDataBefore?: Date;
  /** The minimum number of violations required within the selected lookback time window required to raise an alert. Relevant only for rules of the kind LogAlert. */
  failingPeriods?: ConditionFailingPeriods;
  /** The name of the metric to be sent. Relevant and required only for rules of the kind LogToMetric. */
  metricName?: string;
  /** The minimum results count that should be found for triggering an alert. Relevant only for rules of the kind SimpleLogAlert. */
  minRecurrenceCount?: number;
}

export function conditionSerializer(item: Condition): any {
  return {
    criterionType: item["criterionType"],
    query: item["query"],
    timeAggregation: item["timeAggregation"],
    metricMeasureColumn: item["metricMeasureColumn"],
    resourceIdColumn: item["resourceIdColumn"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArraySerializer(item["dimensions"]),
    operator: item["operator"],
    threshold: item["threshold"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : conditionFailingPeriodsSerializer(item["failingPeriods"]),
    metricName: item["metricName"],
    minRecurrenceCount: item["minRecurrenceCount"],
  };
}

export function conditionDeserializer(item: any): Condition {
  return {
    criterionType: item["criterionType"],
    query: item["query"],
    timeAggregation: item["timeAggregation"],
    metricMeasureColumn: item["metricMeasureColumn"],
    resourceIdColumn: item["resourceIdColumn"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
    operator: item["operator"],
    threshold: item["threshold"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : new Date(item["ignoreDataBefore"]),
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : conditionFailingPeriodsDeserializer(item["failingPeriods"]),
    metricName: item["metricName"],
    minRecurrenceCount: item["minRecurrenceCount"],
  };
}

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

export function dimensionArraySerializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionSerializer(item);
  });
}

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/** Dimension splitting and filtering definition */
export interface Dimension {
  /** Name of the dimension */
  name: string;
  /** Operator for dimension values */
  operator: DimensionOperator;
  /** List of dimension values */
  values: string[];
}

export function dimensionSerializer(item: Dimension): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function dimensionDeserializer(item: any): Dimension {
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
export interface ConditionFailingPeriods {
  /** The number of aggregated lookback points. The lookback time window is calculated based on the aggregation granularity (windowSize) and the selected number of aggregated points. Default value is 1 */
  numberOfEvaluationPeriods?: number;
  /** The number of violations to trigger an alert. Should be smaller or equal to numberOfEvaluationPeriods. Default value is 1 */
  minFailingPeriodsToAlert?: number;
}

export function conditionFailingPeriodsSerializer(item: ConditionFailingPeriods): any {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

export function conditionFailingPeriodsDeserializer(item: any): ConditionFailingPeriods {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

/** Actions to invoke when the alert fires. */
export interface Actions {
  /** Action Group resource Ids to invoke when the alert fires. */
  actionGroups?: string[];
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function actionsSerializer(item: Actions): any {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : item["actionGroups"].map((p: any) => {
          return p;
        }),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function actionsDeserializer(item: any): Actions {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : item["actionGroups"].map((p: any) => {
          return p;
        }),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : Object.fromEntries(
          Object.entries(item["customProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    actionProperties: !item["actionProperties"]
      ? item["actionProperties"]
      : Object.fromEntries(
          Object.entries(item["actionProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** TBD. Relevant only for rules of the kind LogAlert. */
export interface RuleResolveConfiguration {
  /** The flag that indicates whether or not to auto resolve a fired alert. */
  autoResolved?: boolean;
  /** The duration a rule must evaluate as healthy before the fired alert is automatically resolved represented in ISO 8601 duration format. */
  timeToResolve?: string;
}

export function ruleResolveConfigurationSerializer(item: RuleResolveConfiguration): any {
  return { autoResolved: item["autoResolved"], timeToResolve: item["timeToResolve"] };
}

export function ruleResolveConfigurationDeserializer(item: any): RuleResolveConfiguration {
  return {
    autoResolved: item["autoResolved"],
    timeToResolve: item["timeToResolve"],
  };
}

/** Indicates the type of scheduled query rule. The default is LogAlert. */
export enum KnownKind {
  /** LogAlert */
  LogAlert = "LogAlert",
  /** SimpleLogAlert */
  SimpleLogAlert = "SimpleLogAlert",
  /** LogToMetric */
  LogToMetric = "LogToMetric",
}

/**
 * Indicates the type of scheduled query rule. The default is LogAlert. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogAlert**: LogAlert \
 * **SimpleLogAlert**: SimpleLogAlert \
 * **LogToMetric**: LogToMetric
 */
export type Kind = string;

/** The scheduled query rule resource for patch operations. */
export interface ScheduledQueryRuleResourcePatch {
  /** The identity of the resource. */
  identity?: Identity;
  /** Resource tags */
  tags?: Record<string, string>;
  /** The api-version used when creating this alert rule */
  readonly createdWithApiVersion?: string;
  /** True if alert rule is legacy Log Analytic rule */
  readonly isLegacyLogAnalyticsRule?: boolean;
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
  criteria?: ScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: Actions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: RuleResolveConfiguration;
}

export function scheduledQueryRuleResourcePatchSerializer(
  item: ScheduledQueryRuleResourcePatch,
): any {
  return {
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "description",
      "displayName",
      "severity",
      "enabled",
      "scopes",
      "evaluationFrequency",
      "windowSize",
      "overrideQueryTimeRange",
      "targetResourceTypes",
      "criteria",
      "muteActionsDuration",
      "actions",
      "checkWorkspaceAlertsStorageConfigured",
      "skipQueryValidation",
      "autoMitigate",
      "resolveConfiguration",
    ])
      ? undefined
      : _scheduledQueryRuleResourcePatchPropertiesSerializer(item),
  };
}

/** Represents a collection of scheduled query rule resources. */
export interface _ScheduledQueryRuleResourceCollection {
  /** The ScheduledQueryRuleResource items on this page */
  value: ScheduledQueryRuleResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scheduledQueryRuleResourceCollectionDeserializer(
  item: any,
): _ScheduledQueryRuleResourceCollection {
  return {
    value: scheduledQueryRuleResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduledQueryRuleResourceArraySerializer(
  result: Array<ScheduledQueryRuleResource>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleResourceSerializer(item);
  });
}

export function scheduledQueryRuleResourceArrayDeserializer(
  result: Array<ScheduledQueryRuleResource>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleResourceDeserializer(item);
  });
}

export function _scheduledQueryRuleResourcePropertiesSerializer(
  item: ScheduledQueryRuleResource,
): any {
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
      : scheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"] ? item["actions"] : actionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : ruleResolveConfigurationSerializer(item["resolveConfiguration"]),
  };
}

export function _scheduledQueryRuleResourcePropertiesDeserializer(item: any) {
  return {
    createdWithApiVersion: item["createdWithApiVersion"],
    isLegacyLogAnalyticsRule: item["isLegacyLogAnalyticsRule"],
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
      : scheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"] ? item["actions"] : actionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : ruleResolveConfigurationDeserializer(item["resolveConfiguration"]),
  };
}

export function _scheduledQueryRuleResourcePatchPropertiesSerializer(
  item: ScheduledQueryRuleResourcePatch,
): any {
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
      : scheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"] ? item["actions"] : actionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : ruleResolveConfigurationSerializer(item["resolveConfiguration"]),
  };
}

export function _scheduledQueryRuleResourcePatchPropertiesDeserializer(item: any) {
  return {
    createdWithApiVersion: item["createdWithApiVersion"],
    isLegacyLogAnalyticsRule: item["isLegacyLogAnalyticsRule"],
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
      : scheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"] ? item["actions"] : actionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : ruleResolveConfigurationDeserializer(item["resolveConfiguration"]),
  };
}
