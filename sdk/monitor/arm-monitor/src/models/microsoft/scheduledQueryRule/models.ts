// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ErrorResponse, ProxyResource } from "../../models.js";
import { systemDataDeserializer, errorResponseDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The scheduled query rule resource. */
export interface MicrosoftScheduledQueryRuleScheduledQueryRuleResource extends ProxyResource {
  /** The identity of the resource. */
  identity?: MicrosoftScheduledQueryRuleIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
  /** Indicates the type of scheduled query rule. The default is LogAlert. */
  kind?: MicrosoftScheduledQueryRuleKind;
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
  severity?: MicrosoftScheduledQueryRuleAlertSeverity;
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
  criteria?: MicrosoftScheduledQueryRuleScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: MicrosoftScheduledQueryRuleActions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: MicrosoftScheduledQueryRuleRuleResolveConfiguration;
}

export function microsoftScheduledQueryRuleScheduledQueryRuleResourceSerializer(
  item: MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
): any {
  return {
    properties: _scheduledQueryRuleResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftScheduledQueryRuleIdentitySerializer(item["identity"]),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
  };
}

export function microsoftScheduledQueryRuleScheduledQueryRuleResourceDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleScheduledQueryRuleResource {
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
      : microsoftScheduledQueryRuleIdentityDeserializer(item["identity"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** scheduled query rule Definition */
export interface MicrosoftScheduledQueryRuleScheduledQueryRuleProperties {
  /** The api-version used when creating this alert rule */
  readonly createdWithApiVersion?: string;
  /** True if alert rule is legacy Log Analytic rule */
  readonly isLegacyLogAnalyticsRule?: boolean;
  /** The description of the scheduled query rule. */
  description?: string;
  /** The display name of the alert rule */
  displayName?: string;
  /** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
  severity?: MicrosoftScheduledQueryRuleAlertSeverity;
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
  criteria?: MicrosoftScheduledQueryRuleScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: MicrosoftScheduledQueryRuleActions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: MicrosoftScheduledQueryRuleRuleResolveConfiguration;
}

export function microsoftScheduledQueryRuleScheduledQueryRulePropertiesSerializer(
  item: MicrosoftScheduledQueryRuleScheduledQueryRuleProperties,
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
      : microsoftScheduledQueryRuleScheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : microsoftScheduledQueryRuleActionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftScheduledQueryRuleRuleResolveConfigurationSerializer(item["resolveConfiguration"]),
  };
}

export function microsoftScheduledQueryRuleScheduledQueryRulePropertiesDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleScheduledQueryRuleProperties {
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
      : microsoftScheduledQueryRuleScheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : microsoftScheduledQueryRuleActionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftScheduledQueryRuleRuleResolveConfigurationDeserializer(
          item["resolveConfiguration"],
        ),
  };
}

/** Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. */
export enum KnownMicrosoftScheduledQueryRuleAlertSeverity {
  /** 0 */
  AlertSeverity0 = 0,
  /** 1 */
  AlertSeverity1 = 1,
  /** 2 */
  AlertSeverity2 = 2,
  /** 3 */
  AlertSeverity3 = 3,
  /** 4 */
  AlertSeverity4 = 4,
}

/**
 * Severity of the alert. Should be an integer between [0-4]. Value of 0 is severest. Relevant and required only for rules of the kind LogAlert. \
 * {@link KnownMicrosoftScheduledQueryRuleAlertSeverity} can be used interchangeably with MicrosoftScheduledQueryRuleAlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **0**: 0 \
 * **1**: 1 \
 * **2**: 2 \
 * **3**: 3 \
 * **4**: 4
 */
export type MicrosoftScheduledQueryRuleAlertSeverity = number;

/** The rule criteria that defines the conditions of the scheduled query rule. */
export interface MicrosoftScheduledQueryRuleScheduledQueryRuleCriteria {
  /** A list of conditions to evaluate against the specified scopes */
  allOf?: MicrosoftScheduledQueryRuleCondition[];
}

export function microsoftScheduledQueryRuleScheduledQueryRuleCriteriaSerializer(
  item: MicrosoftScheduledQueryRuleScheduledQueryRuleCriteria,
): any {
  return {
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftScheduledQueryRuleConditionArraySerializer(item["allOf"]),
  };
}

export function microsoftScheduledQueryRuleScheduledQueryRuleCriteriaDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleScheduledQueryRuleCriteria {
  return {
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftScheduledQueryRuleConditionArrayDeserializer(item["allOf"]),
  };
}

export function microsoftScheduledQueryRuleConditionArraySerializer(
  result: Array<MicrosoftScheduledQueryRuleCondition>,
): any[] {
  return result.map((item) => {
    return microsoftScheduledQueryRuleConditionSerializer(item);
  });
}

export function microsoftScheduledQueryRuleConditionArrayDeserializer(
  result: Array<MicrosoftScheduledQueryRuleCondition>,
): any[] {
  return result.map((item) => {
    return microsoftScheduledQueryRuleConditionDeserializer(item);
  });
}

/** A condition of the scheduled query rule. */
export interface MicrosoftScheduledQueryRuleCondition {
  /** Specifies the type of threshold criteria */
  criterionType?: MicrosoftScheduledQueryRuleCriterionType;
  /** Log query alert */
  query?: string;
  /** Aggregation type. Relevant and required only for rules of the kind LogAlert. */
  timeAggregation?: MicrosoftScheduledQueryRuleTimeAggregation;
  /** The column containing the metric measure number. Relevant only for rules of the kind LogAlert. */
  metricMeasureColumn?: string;
  /** The column containing the resource id. The content of the column must be a uri formatted as resource id. Relevant only for rules of the kind LogAlert. */
  resourceIdColumn?: string;
  /** List of Dimensions conditions */
  dimensions?: MicrosoftScheduledQueryRuleDimension[];
  /** The criteria operator. Relevant and required only for rules of the kind LogAlert. */
  operator?: MicrosoftScheduledQueryRuleConditionOperator;
  /** the criteria threshold value that activates the alert. Relevant and required only for static threshold rules of the kind LogAlert. */
  threshold?: number;
  /** The extent of deviation required to trigger an alert. Allowed values are 'Low', 'Medium' and 'High'. This will affect how tight the threshold is to the metric series pattern. Relevant only for dynamic threshold rules of the kind LogAlert. */
  alertSensitivity?: string;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format). Relevant only for dynamic threshold rules of the kind LogAlert. */
  ignoreDataBefore?: Date;
  /** The minimum number of violations required within the selected lookback time window required to raise an alert. Relevant only for rules of the kind LogAlert. */
  failingPeriods?: MicrosoftScheduledQueryRuleConditionFailingPeriods;
  /** The name of the metric to be sent. Relevant and required only for rules of the kind LogToMetric. */
  metricName?: string;
  /** The minimum results count that should be found for triggering an alert. Relevant only for rules of the kind SimpleLogAlert. */
  minRecurrenceCount?: number;
}

export function microsoftScheduledQueryRuleConditionSerializer(
  item: MicrosoftScheduledQueryRuleCondition,
): any {
  return {
    criterionType: item["criterionType"],
    query: item["query"],
    timeAggregation: item["timeAggregation"],
    metricMeasureColumn: item["metricMeasureColumn"],
    resourceIdColumn: item["resourceIdColumn"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : microsoftScheduledQueryRuleDimensionArraySerializer(item["dimensions"]),
    operator: item["operator"],
    threshold: item["threshold"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : microsoftScheduledQueryRuleConditionFailingPeriodsSerializer(item["failingPeriods"]),
    metricName: item["metricName"],
    minRecurrenceCount: item["minRecurrenceCount"],
  };
}

export function microsoftScheduledQueryRuleConditionDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleCondition {
  return {
    criterionType: item["criterionType"],
    query: item["query"],
    timeAggregation: item["timeAggregation"],
    metricMeasureColumn: item["metricMeasureColumn"],
    resourceIdColumn: item["resourceIdColumn"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : microsoftScheduledQueryRuleDimensionArrayDeserializer(item["dimensions"]),
    operator: item["operator"],
    threshold: item["threshold"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : new Date(item["ignoreDataBefore"]),
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : microsoftScheduledQueryRuleConditionFailingPeriodsDeserializer(item["failingPeriods"]),
    metricName: item["metricName"],
    minRecurrenceCount: item["minRecurrenceCount"],
  };
}

/** Specifies the type of threshold criteria */
export enum KnownMicrosoftScheduledQueryRuleCriterionType {
  /** StaticThresholdCriterion */
  StaticThresholdCriterion = "StaticThresholdCriterion",
  /** DynamicThresholdCriterion */
  DynamicThresholdCriterion = "DynamicThresholdCriterion",
}

/**
 * Specifies the type of threshold criteria \
 * {@link KnownMicrosoftScheduledQueryRuleCriterionType} can be used interchangeably with MicrosoftScheduledQueryRuleCriterionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StaticThresholdCriterion**: StaticThresholdCriterion \
 * **DynamicThresholdCriterion**: DynamicThresholdCriterion
 */
export type MicrosoftScheduledQueryRuleCriterionType = string;

/** Aggregation type. Relevant and required only for rules of the kind LogAlert. */
export enum KnownMicrosoftScheduledQueryRuleTimeAggregation {
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
 * {@link KnownMicrosoftScheduledQueryRuleTimeAggregation} can be used interchangeably with MicrosoftScheduledQueryRuleTimeAggregation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**: Count \
 * **Average**: Average \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type MicrosoftScheduledQueryRuleTimeAggregation = string;

export function microsoftScheduledQueryRuleDimensionArraySerializer(
  result: Array<MicrosoftScheduledQueryRuleDimension>,
): any[] {
  return result.map((item) => {
    return microsoftScheduledQueryRuleDimensionSerializer(item);
  });
}

export function microsoftScheduledQueryRuleDimensionArrayDeserializer(
  result: Array<MicrosoftScheduledQueryRuleDimension>,
): any[] {
  return result.map((item) => {
    return microsoftScheduledQueryRuleDimensionDeserializer(item);
  });
}

/** Dimension splitting and filtering definition */
export interface MicrosoftScheduledQueryRuleDimension {
  /** Name of the dimension */
  name: string;
  /** Operator for dimension values */
  operator: MicrosoftScheduledQueryRuleDimensionOperator;
  /** List of dimension values */
  values: string[];
}

export function microsoftScheduledQueryRuleDimensionSerializer(
  item: MicrosoftScheduledQueryRuleDimension,
): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function microsoftScheduledQueryRuleDimensionDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleDimension {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Operator for dimension values */
export enum KnownMicrosoftScheduledQueryRuleDimensionOperator {
  /** Include */
  Include = "Include",
  /** Exclude */
  Exclude = "Exclude",
}

/**
 * Operator for dimension values \
 * {@link KnownMicrosoftScheduledQueryRuleDimensionOperator} can be used interchangeably with MicrosoftScheduledQueryRuleDimensionOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Include**: Include \
 * **Exclude**: Exclude
 */
export type MicrosoftScheduledQueryRuleDimensionOperator = string;

/** The criteria operator. Relevant and required only for rules of the kind LogAlert. */
export enum KnownMicrosoftScheduledQueryRuleConditionOperator {
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
 * {@link KnownMicrosoftScheduledQueryRuleConditionOperator} can be used interchangeably with MicrosoftScheduledQueryRuleConditionOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **GreaterThan**: GreaterThan \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **LessThan**: LessThan \
 * **LessThanOrEqual**: LessThanOrEqual \
 * **GreaterOrLessThan**: GreaterOrLessThan
 */
export type MicrosoftScheduledQueryRuleConditionOperator = string;

/** The minimum number of violations required within the selected lookback time window required to raise an alert. Relevant only for rules of the kind LogAlert. */
export interface MicrosoftScheduledQueryRuleConditionFailingPeriods {
  /** The number of aggregated lookback points. The lookback time window is calculated based on the aggregation granularity (windowSize) and the selected number of aggregated points. Default value is 1 */
  numberOfEvaluationPeriods?: number;
  /** The number of violations to trigger an alert. Should be smaller or equal to numberOfEvaluationPeriods. Default value is 1 */
  minFailingPeriodsToAlert?: number;
}

export function microsoftScheduledQueryRuleConditionFailingPeriodsSerializer(
  item: MicrosoftScheduledQueryRuleConditionFailingPeriods,
): any {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

export function microsoftScheduledQueryRuleConditionFailingPeriodsDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleConditionFailingPeriods {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

/** Actions to invoke when the alert fires. */
export interface MicrosoftScheduledQueryRuleActions {
  /** Action Group resource Ids to invoke when the alert fires. */
  actionGroups?: string[];
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function microsoftScheduledQueryRuleActionsSerializer(
  item: MicrosoftScheduledQueryRuleActions,
): any {
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

export function microsoftScheduledQueryRuleActionsDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleActions {
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
export interface MicrosoftScheduledQueryRuleRuleResolveConfiguration {
  /** The flag that indicates whether or not to auto resolve a fired alert. */
  autoResolved?: boolean;
  /** The duration a rule must evaluate as healthy before the fired alert is automatically resolved represented in ISO 8601 duration format. */
  timeToResolve?: string;
}

export function microsoftScheduledQueryRuleRuleResolveConfigurationSerializer(
  item: MicrosoftScheduledQueryRuleRuleResolveConfiguration,
): any {
  return { autoResolved: item["autoResolved"], timeToResolve: item["timeToResolve"] };
}

export function microsoftScheduledQueryRuleRuleResolveConfigurationDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleRuleResolveConfiguration {
  return {
    autoResolved: item["autoResolved"],
    timeToResolve: item["timeToResolve"],
  };
}

/** Identity for the resource. */
export interface MicrosoftScheduledQueryRuleIdentity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** Type of managed service identity. */
  type: MicrosoftScheduledQueryRuleIdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, MicrosoftScheduledQueryRuleUserIdentityProperties>;
}

export function microsoftScheduledQueryRuleIdentitySerializer(
  item: MicrosoftScheduledQueryRuleIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : microsoftScheduledQueryRuleUserIdentityPropertiesRecordSerializer(
          item["userAssignedIdentities"],
        ),
  };
}

export function microsoftScheduledQueryRuleIdentityDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : microsoftScheduledQueryRuleUserIdentityPropertiesRecordDeserializer(
          item["userAssignedIdentities"],
        ),
  };
}

/** Type of managed service identity. */
export type MicrosoftScheduledQueryRuleIdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function microsoftScheduledQueryRuleUserIdentityPropertiesRecordSerializer(
  item: Record<string, MicrosoftScheduledQueryRuleUserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftScheduledQueryRuleUserIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function microsoftScheduledQueryRuleUserIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, MicrosoftScheduledQueryRuleUserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftScheduledQueryRuleUserIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties. */
export interface MicrosoftScheduledQueryRuleUserIdentityProperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function microsoftScheduledQueryRuleUserIdentityPropertiesSerializer(
  _item: MicrosoftScheduledQueryRuleUserIdentityProperties,
): any {
  return {};
}

export function microsoftScheduledQueryRuleUserIdentityPropertiesDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleUserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Indicates the type of scheduled query rule. The default is LogAlert. */
export enum KnownMicrosoftScheduledQueryRuleKind {
  /** LogAlert */
  LogAlert = "LogAlert",
  /** SimpleLogAlert */
  SimpleLogAlert = "SimpleLogAlert",
  /** LogToMetric */
  LogToMetric = "LogToMetric",
}

/**
 * Indicates the type of scheduled query rule. The default is LogAlert. \
 * {@link KnownMicrosoftScheduledQueryRuleKind} can be used interchangeably with MicrosoftScheduledQueryRuleKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogAlert**: LogAlert \
 * **SimpleLogAlert**: SimpleLogAlert \
 * **LogToMetric**: LogToMetric
 */
export type MicrosoftScheduledQueryRuleKind = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface MicrosoftScheduledQueryRuleErrorContract {
  /** The error object. */
  error?: ErrorResponse;
}

export function microsoftScheduledQueryRuleErrorContractDeserializer(
  item: any,
): MicrosoftScheduledQueryRuleErrorContract {
  return {
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** The scheduled query rule resource for patch operations. */
export interface MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch {
  /** The identity of the resource. */
  identity?: MicrosoftScheduledQueryRuleIdentity;
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
  severity?: MicrosoftScheduledQueryRuleAlertSeverity;
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
  criteria?: MicrosoftScheduledQueryRuleScheduledQueryRuleCriteria;
  /** Mute actions for the chosen period of time (in ISO 8601 duration format) after the alert is fired. Relevant only for rules of the kind LogAlert. */
  muteActionsDuration?: string;
  /** Actions to invoke when the alert fires. */
  actions?: MicrosoftScheduledQueryRuleActions;
  /** The flag which indicates whether this scheduled query rule has been configured to be stored in the customer's storage. The default is false. */
  readonly isWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether this scheduled query rule should be stored in the customer's storage. The default is false. Relevant only for rules of the kind LogAlert. */
  checkWorkspaceAlertsStorageConfigured?: boolean;
  /** The flag which indicates whether the provided query should be validated or not. The default is false. Relevant only for rules of the kind LogAlert. */
  skipQueryValidation?: boolean;
  /** The flag that indicates whether the alert should be automatically resolved or not. The default is true. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  autoMitigate?: boolean;
  /** Defines the configuration for resolving fired alerts. Relevant only for rules of kinds LogAlert and SimpleLogAlert. */
  resolveConfiguration?: MicrosoftScheduledQueryRuleRuleResolveConfiguration;
}

export function microsoftScheduledQueryRuleScheduledQueryRuleResourcePatchSerializer(
  item: MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : microsoftScheduledQueryRuleIdentitySerializer(item["identity"]),
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
export interface _MicrosoftScheduledQueryRuleScheduledQueryRuleResourceCollection {
  /** The ScheduledQueryRuleResource items on this page */
  value: MicrosoftScheduledQueryRuleScheduledQueryRuleResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _microsoftScheduledQueryRuleScheduledQueryRuleResourceCollectionDeserializer(
  item: any,
): _MicrosoftScheduledQueryRuleScheduledQueryRuleResourceCollection {
  return {
    value: microsoftScheduledQueryRuleScheduledQueryRuleResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftScheduledQueryRuleScheduledQueryRuleResourceArraySerializer(
  result: Array<MicrosoftScheduledQueryRuleScheduledQueryRuleResource>,
): any[] {
  return result.map((item) => {
    return microsoftScheduledQueryRuleScheduledQueryRuleResourceSerializer(item);
  });
}

export function microsoftScheduledQueryRuleScheduledQueryRuleResourceArrayDeserializer(
  result: Array<MicrosoftScheduledQueryRuleScheduledQueryRuleResource>,
): any[] {
  return result.map((item) => {
    return microsoftScheduledQueryRuleScheduledQueryRuleResourceDeserializer(item);
  });
}

export function _scheduledQueryRuleResourcePropertiesSerializer(
  item: MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
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
      : microsoftScheduledQueryRuleScheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : microsoftScheduledQueryRuleActionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftScheduledQueryRuleRuleResolveConfigurationSerializer(item["resolveConfiguration"]),
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
      : microsoftScheduledQueryRuleScheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : microsoftScheduledQueryRuleActionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftScheduledQueryRuleRuleResolveConfigurationDeserializer(
          item["resolveConfiguration"],
        ),
  };
}

export function _scheduledQueryRuleResourcePatchPropertiesSerializer(
  item: MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
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
      : microsoftScheduledQueryRuleScheduledQueryRuleCriteriaSerializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : microsoftScheduledQueryRuleActionsSerializer(item["actions"]),
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftScheduledQueryRuleRuleResolveConfigurationSerializer(item["resolveConfiguration"]),
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
      : microsoftScheduledQueryRuleScheduledQueryRuleCriteriaDeserializer(item["criteria"]),
    muteActionsDuration: item["muteActionsDuration"],
    actions: !item["actions"]
      ? item["actions"]
      : microsoftScheduledQueryRuleActionsDeserializer(item["actions"]),
    isWorkspaceAlertsStorageConfigured: item["isWorkspaceAlertsStorageConfigured"],
    checkWorkspaceAlertsStorageConfigured: item["checkWorkspaceAlertsStorageConfigured"],
    skipQueryValidation: item["skipQueryValidation"],
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftScheduledQueryRuleRuleResolveConfigurationDeserializer(
          item["resolveConfiguration"],
        ),
  };
}
