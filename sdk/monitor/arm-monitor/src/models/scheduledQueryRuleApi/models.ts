// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type {
  MicrosoftCommonCriterionType,
  MicrosoftCommonIdentity,
} from "../microsoft/common/models.js";
import {
  microsoftCommonIdentitySerializer,
  microsoftCommonIdentityDeserializer,
} from "../microsoft/common/models.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The scheduled query rule resource. */
export interface ScheduledQueryRuleApiScheduledQueryRuleResource extends ProxyResource {
  /** The identity of the resource. */
  identity?: MicrosoftCommonIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
  /** Indicates the type of scheduled query rule. The default is LogAlert. */
  kind?: ScheduledQueryRuleApiKind;
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
  severity?: ScheduledQueryRuleApiAlertSeverity;
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
  criteria?: ScheduledQueryRuleApiScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: ScheduledQueryRuleApiActions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: ScheduledQueryRuleApiRuleResolveConfiguration;
}

export function scheduledQueryRuleApiScheduledQueryRuleResourceSerializer(
  item: ScheduledQueryRuleApiScheduledQueryRuleResource,
): any {
  return {
    properties: _scheduledQueryRuleResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftCommonIdentitySerializer(item["identity"]),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
  };
}

export function scheduledQueryRuleApiScheduledQueryRuleResourceDeserializer(
  item: any,
): ScheduledQueryRuleApiScheduledQueryRuleResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._scheduledQueryRuleResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftCommonIdentityDeserializer(item["identity"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** scheduled query rule Definition */
export interface ScheduledQueryRuleApiScheduledQueryRuleProperties {
  /** The api-version used when creating this alert rule */
  readonly createdWithApiVersion?: string;
  /** True if alert rule is legacy Log Analytic rule */
  readonly isLegacyLogAnalyticsRule?: boolean;
  /** The description of the scheduled query rule. */
  description?: string;
  /** The display name of the alert rule */
  displayName?: string;
  /** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
  severity?: ScheduledQueryRuleApiAlertSeverity;
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
  criteria?: ScheduledQueryRuleApiScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: ScheduledQueryRuleApiActions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: ScheduledQueryRuleApiRuleResolveConfiguration;
}

export function scheduledQueryRuleApiScheduledQueryRulePropertiesSerializer(
  item: ScheduledQueryRuleApiScheduledQueryRuleProperties,
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
      : scheduledQueryRuleApiScheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : scheduledQueryRuleApiActionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : scheduledQueryRuleApiRuleResolveConfigurationSerializer(item["resolveConfiguration"]),
  };
}

export function scheduledQueryRuleApiScheduledQueryRulePropertiesDeserializer(
  item: any,
): ScheduledQueryRuleApiScheduledQueryRuleProperties {
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
      : scheduledQueryRuleApiScheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : scheduledQueryRuleApiActionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : scheduledQueryRuleApiRuleResolveConfigurationDeserializer(item["resolveConfiguration"]),
  };
}

/** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
export enum KnownScheduledQueryRuleApiAlertSeverity {
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
 * {@link KnownScheduledQueryRuleApiAlertSeverity} can be used interchangeably with ScheduledQueryRuleApiAlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **0**: 0 \
 * **1**: 1 \
 * **2**: 2 \
 * **3**: 3 \
 * **4**: 4
 */
export type ScheduledQueryRuleApiAlertSeverity = number;

/** The rule criteria that defines the conditions of the scheduled query rule. */
export interface ScheduledQueryRuleApiScheduledQueryRuleCriteria {
  /** A list of conditions to evaluate against the specified scopes */
  allOf?: ScheduledQueryRuleApiCondition[];
}

export function scheduledQueryRuleApiScheduledQueryRuleCriteriaSerializer(
  item: ScheduledQueryRuleApiScheduledQueryRuleCriteria,
): any {
  return {
    allOf: !item["allOf"]
      ? item["allOf"]
      : scheduledQueryRuleApiConditionArraySerializer(item["allOf"]),
  };
}

export function scheduledQueryRuleApiScheduledQueryRuleCriteriaDeserializer(
  item: any,
): ScheduledQueryRuleApiScheduledQueryRuleCriteria {
  return {
    allOf: !item["allOf"]
      ? item["allOf"]
      : scheduledQueryRuleApiConditionArrayDeserializer(item["allOf"]),
  };
}

export function scheduledQueryRuleApiConditionArraySerializer(
  result: Array<ScheduledQueryRuleApiCondition>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleApiConditionSerializer(item);
  });
}

export function scheduledQueryRuleApiConditionArrayDeserializer(
  result: Array<ScheduledQueryRuleApiCondition>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleApiConditionDeserializer(item);
  });
}

/** A condition of the scheduled query rule. */
export interface ScheduledQueryRuleApiCondition {
  /** Specifies the type of threshold criteria */
  criterionType?: MicrosoftCommonCriterionType;
  /** Log query alert */
  query?: string;
  /** Aggregation type. Relevant and required only for rules of the kind LogAlert. */
  timeAggregation?: ScheduledQueryRuleApiTimeAggregation;
  /** The column containing the metric measure number. Relevant only for rules of the kind LogAlert. */
  metricMeasureColumn?: string;
  /** The column containing the resource id. The content of the column must be a uri formatted as resource id. Relevant only for rules of the kind LogAlert. */
  resourceIdColumn?: string;
  /** List of Dimensions conditions */
  dimensions?: ScheduledQueryRuleApiDimension[];
  /** The criteria operator. Relevant and required only for rules of the kind LogAlert. */
  operator?: ScheduledQueryRuleApiConditionOperator;
  /** the criteria threshold value that activates the alert. Relevant and required only for static threshold rules of the kind LogAlert. */
  threshold?: number;
  /** The extent of deviation required to trigger an alert. Allowed values are 'Low', 'Medium' and 'High'. This will affect how tight the threshold is to the metric series pattern. Relevant only for dynamic threshold rules of the kind LogAlert. */
  alertSensitivity?: string;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format). Relevant only for dynamic threshold rules of the kind LogAlert. */
  ignoreDataBefore?: Date;
  /** The minimum number of violations required within the selected lookback time window required to raise an alert. Relevant only for rules of the kind LogAlert. */
  failingPeriods?: ScheduledQueryRuleApiConditionFailingPeriods;
  /** The name of the metric to be sent. Relevant and required only for rules of the kind LogToMetric. */
  metricName?: string;
  /** The minimum results count that should be found for triggering an alert. Relevant only for rules of the kind SimpleLogAlert. */
  minRecurrenceCount?: number;
}

export function scheduledQueryRuleApiConditionSerializer(
  item: ScheduledQueryRuleApiCondition,
): any {
  return {
    criterionType: item["criterionType"],
    query: item["query"],
    timeAggregation: item["timeAggregation"],
    metricMeasureColumn: item["metricMeasureColumn"],
    resourceIdColumn: item["resourceIdColumn"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : scheduledQueryRuleApiDimensionArraySerializer(item["dimensions"]),
    operator: item["operator"],
    threshold: item["threshold"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : scheduledQueryRuleApiConditionFailingPeriodsSerializer(item["failingPeriods"]),
    metricName: item["metricName"],
    minRecurrenceCount: item["minRecurrenceCount"],
  };
}

export function scheduledQueryRuleApiConditionDeserializer(
  item: any,
): ScheduledQueryRuleApiCondition {
  return {
    criterionType: item["criterionType"],
    query: item["query"],
    timeAggregation: item["timeAggregation"],
    metricMeasureColumn: item["metricMeasureColumn"],
    resourceIdColumn: item["resourceIdColumn"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : scheduledQueryRuleApiDimensionArrayDeserializer(item["dimensions"]),
    operator: item["operator"],
    threshold: item["threshold"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : new Date(item["ignoreDataBefore"]),
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : scheduledQueryRuleApiConditionFailingPeriodsDeserializer(item["failingPeriods"]),
    metricName: item["metricName"],
    minRecurrenceCount: item["minRecurrenceCount"],
  };
}

/** Aggregation type. Relevant and required only for rules of the kind LogAlert. */
export enum KnownScheduledQueryRuleApiTimeAggregation {
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
 * {@link KnownScheduledQueryRuleApiTimeAggregation} can be used interchangeably with ScheduledQueryRuleApiTimeAggregation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**: Count \
 * **Average**: Average \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type ScheduledQueryRuleApiTimeAggregation = string;

export function scheduledQueryRuleApiDimensionArraySerializer(
  result: Array<ScheduledQueryRuleApiDimension>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleApiDimensionSerializer(item);
  });
}

export function scheduledQueryRuleApiDimensionArrayDeserializer(
  result: Array<ScheduledQueryRuleApiDimension>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleApiDimensionDeserializer(item);
  });
}

/** Dimension splitting and filtering definition */
export interface ScheduledQueryRuleApiDimension {
  /** Name of the dimension */
  name: string;
  /** Operator for dimension values */
  operator: ScheduledQueryRuleApiDimensionOperator;
  /** List of dimension values */
  values: string[];
}

export function scheduledQueryRuleApiDimensionSerializer(
  item: ScheduledQueryRuleApiDimension,
): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function scheduledQueryRuleApiDimensionDeserializer(
  item: any,
): ScheduledQueryRuleApiDimension {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Operator for dimension values */
export enum KnownScheduledQueryRuleApiDimensionOperator {
  /** Include */
  Include = "Include",
  /** Exclude */
  Exclude = "Exclude",
}

/**
 * Operator for dimension values \
 * {@link KnownScheduledQueryRuleApiDimensionOperator} can be used interchangeably with ScheduledQueryRuleApiDimensionOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Include**: Include \
 * **Exclude**: Exclude
 */
export type ScheduledQueryRuleApiDimensionOperator = string;

/** The criteria operator. Relevant and required only for rules of the kind LogAlert. */
export enum KnownScheduledQueryRuleApiConditionOperator {
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
 * {@link KnownScheduledQueryRuleApiConditionOperator} can be used interchangeably with ScheduledQueryRuleApiConditionOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **GreaterThan**: GreaterThan \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **LessThan**: LessThan \
 * **LessThanOrEqual**: LessThanOrEqual \
 * **GreaterOrLessThan**: GreaterOrLessThan
 */
export type ScheduledQueryRuleApiConditionOperator = string;

/** The minimum number of violations required within the selected lookback time window required to raise an alert. Relevant only for rules of the kind LogAlert. */
export interface ScheduledQueryRuleApiConditionFailingPeriods {
  /** The number of aggregated lookback points. The lookback time window is calculated based on the aggregation granularity (windowSize) and the selected number of aggregated points. Default value is 1 */
  numberOfEvaluationPeriods?: number;
  /** The number of violations to trigger an alert. Should be smaller or equal to numberOfEvaluationPeriods. Default value is 1 */
  minFailingPeriodsToAlert?: number;
}

export function scheduledQueryRuleApiConditionFailingPeriodsSerializer(
  item: ScheduledQueryRuleApiConditionFailingPeriods,
): any {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

export function scheduledQueryRuleApiConditionFailingPeriodsDeserializer(
  item: any,
): ScheduledQueryRuleApiConditionFailingPeriods {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

/** Actions to invoke when the alert fires. */
export interface ScheduledQueryRuleApiActions {
  /** Action Group resource Ids to invoke when the alert fires. */
  actionGroups?: string[];
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function scheduledQueryRuleApiActionsSerializer(item: ScheduledQueryRuleApiActions): any {
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

export function scheduledQueryRuleApiActionsDeserializer(item: any): ScheduledQueryRuleApiActions {
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
export interface ScheduledQueryRuleApiRuleResolveConfiguration {
  /** The flag that indicates whether or not to auto resolve a fired alert. */
  autoResolved?: boolean;
  /** The duration a rule must evaluate as healthy before the fired alert is automatically resolved represented in ISO 8601 duration format. */
  timeToResolve?: string;
}

export function scheduledQueryRuleApiRuleResolveConfigurationSerializer(
  item: ScheduledQueryRuleApiRuleResolveConfiguration,
): any {
  return { autoResolved: item["autoResolved"], timeToResolve: item["timeToResolve"] };
}

export function scheduledQueryRuleApiRuleResolveConfigurationDeserializer(
  item: any,
): ScheduledQueryRuleApiRuleResolveConfiguration {
  return {
    autoResolved: item["autoResolved"],
    timeToResolve: item["timeToResolve"],
  };
}

/** Indicates the type of scheduled query rule. The default is LogAlert. */
export enum KnownScheduledQueryRuleApiKind {
  /** LogAlert */
  LogAlert = "LogAlert",
  /** SimpleLogAlert */
  SimpleLogAlert = "SimpleLogAlert",
  /** LogToMetric */
  LogToMetric = "LogToMetric",
}

/**
 * Indicates the type of scheduled query rule. The default is LogAlert. \
 * {@link KnownScheduledQueryRuleApiKind} can be used interchangeably with ScheduledQueryRuleApiKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogAlert**: LogAlert \
 * **SimpleLogAlert**: SimpleLogAlert \
 * **LogToMetric**: LogToMetric
 */
export type ScheduledQueryRuleApiKind = string;

/** The scheduled query rule resource for patch operations. */
export interface ScheduledQueryRuleApiScheduledQueryRuleResourcePatch {
  /** The identity of the resource. */
  identity?: MicrosoftCommonIdentity;
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
  severity?: ScheduledQueryRuleApiAlertSeverity;
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
  criteria?: ScheduledQueryRuleApiScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: ScheduledQueryRuleApiActions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: ScheduledQueryRuleApiRuleResolveConfiguration;
}

export function scheduledQueryRuleApiScheduledQueryRuleResourcePatchSerializer(
  item: ScheduledQueryRuleApiScheduledQueryRuleResourcePatch,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : microsoftCommonIdentitySerializer(item["identity"]),
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
export interface _ScheduledQueryRuleApiScheduledQueryRuleResourceCollection {
  /** The ScheduledQueryRuleResource items on this page */
  value: ScheduledQueryRuleApiScheduledQueryRuleResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scheduledQueryRuleApiScheduledQueryRuleResourceCollectionDeserializer(
  item: any,
): _ScheduledQueryRuleApiScheduledQueryRuleResourceCollection {
  return {
    value: scheduledQueryRuleApiScheduledQueryRuleResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduledQueryRuleApiScheduledQueryRuleResourceArraySerializer(
  result: Array<ScheduledQueryRuleApiScheduledQueryRuleResource>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleApiScheduledQueryRuleResourceSerializer(item);
  });
}

export function scheduledQueryRuleApiScheduledQueryRuleResourceArrayDeserializer(
  result: Array<ScheduledQueryRuleApiScheduledQueryRuleResource>,
): any[] {
  return result.map((item) => {
    return scheduledQueryRuleApiScheduledQueryRuleResourceDeserializer(item);
  });
}

export function _scheduledQueryRuleResourcePropertiesSerializer(
  item: ScheduledQueryRuleApiScheduledQueryRuleResource,
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
      : scheduledQueryRuleApiScheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : scheduledQueryRuleApiActionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : scheduledQueryRuleApiRuleResolveConfigurationSerializer(item["resolveConfiguration"]),
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
      : scheduledQueryRuleApiScheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : scheduledQueryRuleApiActionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : scheduledQueryRuleApiRuleResolveConfigurationDeserializer(item["resolveConfiguration"]),
  };
}

export function _scheduledQueryRuleResourcePatchPropertiesSerializer(
  item: ScheduledQueryRuleApiScheduledQueryRuleResourcePatch,
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
      : scheduledQueryRuleApiScheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : scheduledQueryRuleApiActionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : scheduledQueryRuleApiRuleResolveConfigurationSerializer(item["resolveConfiguration"]),
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
      : scheduledQueryRuleApiScheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : scheduledQueryRuleApiActionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : scheduledQueryRuleApiRuleResolveConfigurationDeserializer(item["resolveConfiguration"]),
  };
}
