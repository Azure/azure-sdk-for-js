// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../../../static-helpers/serialization/serialize-record.js";
import type { TrackedResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";
import type { CriterionType, Identity, ErrorResponseError } from "../common/models.js";
import {
  identitySerializer,
  identityDeserializer,
  errorResponseErrorDeserializer,
} from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The metric alert resource. */
export interface MetricAlertResource extends TrackedResource {
  /** The identity of the resource. */
  identity?: Identity;
  /** The description of the metric alert that will be included in the alert email. */
  description?: string;
  /** Alert severity {0, 1, 2, 3, 4} */
  severity: number;
  /** The flag that indicates whether the metric alert is enabled. */
  enabled: boolean;
  /** The list of resource id's that this metric alert is scoped to. You cannot change the scope of a metric rule based on logs. */
  scopes: string[];
  /** How often the metric alert is evaluated represented in ISO 8601 duration format. */
  evaluationFrequency: string;
  /** The period of time (in ISO 8601 duration format) that is used to monitor alert activity based on the threshold. */
  windowSize?: string;
  /** The resource type of the target resource(s) on which the alert is created/updated. Mandatory if the scope contains a subscription, resource group, or more than one resource. */
  targetResourceType?: string;
  /** The region of the target resource(s) on which the alert is created/updated. Mandatory if the scope contains a subscription, resource group, or more than one resource. */
  targetResourceRegion?: string;
  /** Defines the specific alert criteria information. */
  criteria: MetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: ResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertResourceSerializer(item: MetricAlertResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _metricAlertResourcePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function metricAlertResourceDeserializer(item: any): MetricAlertResource {
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
    ..._metricAlertResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** An alert rule. */
export interface MetricAlertProperties {
  /** The description of the metric alert that will be included in the alert email. */
  description?: string;
  /** Alert severity {0, 1, 2, 3, 4} */
  severity: number;
  /** The flag that indicates whether the metric alert is enabled. */
  enabled: boolean;
  /** The list of resource id's that this metric alert is scoped to. You cannot change the scope of a metric rule based on logs. */
  scopes: string[];
  /** How often the metric alert is evaluated represented in ISO 8601 duration format. */
  evaluationFrequency: string;
  /** The period of time (in ISO 8601 duration format) that is used to monitor alert activity based on the threshold. */
  windowSize?: string;
  /** The resource type of the target resource(s) on which the alert is created/updated. Mandatory if the scope contains a subscription, resource group, or more than one resource. */
  targetResourceType?: string;
  /** The region of the target resource(s) on which the alert is created/updated. Mandatory if the scope contains a subscription, resource group, or more than one resource. */
  targetResourceRegion?: string;
  /** Defines the specific alert criteria information. */
  criteria: MetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: ResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertPropertiesSerializer(item: MetricAlertProperties): any {
  return {
    description: item["description"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    targetResourceType: item["targetResourceType"],
    targetResourceRegion: item["targetResourceRegion"],
    criteria: metricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : resolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"] ? item["actions"] : metricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function metricAlertPropertiesDeserializer(item: any): MetricAlertProperties {
  return {
    description: item["description"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    targetResourceType: item["targetResourceType"],
    targetResourceRegion: item["targetResourceRegion"],
    criteria: metricAlertCriteriaUnionDeserializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : resolveConfigurationDeserializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertActionArrayDeserializer(item["actions"]),
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    isMigrated: item["isMigrated"],
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

/** The rule criteria that defines the conditions of the alert rule. */
export interface MetricAlertCriteria {
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria, Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria, Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria, Microsoft.Azure.Monitor.PromQLCriteria */
  odataType: Odatatype;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function metricAlertCriteriaSerializer(item: MetricAlertCriteria): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), "odata.type": item["odataType"] };
}

export function metricAlertCriteriaDeserializer(item: any): MetricAlertCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type"]),
    odataType: item["odata.type"],
  };
}

/** Alias for MetricAlertCriteriaUnion */
export type MetricAlertCriteriaUnion =
  | MetricAlertSingleResourceMultipleMetricCriteria
  | WebtestLocationAvailabilityCriteria
  | MetricAlertMultipleResourceMultipleMetricCriteria
  | PromQLCriteria
  | MetricAlertCriteria;

export function metricAlertCriteriaUnionSerializer(item: MetricAlertCriteriaUnion): any {
  switch (item.odataType) {
    case "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria":
      return metricAlertSingleResourceMultipleMetricCriteriaSerializer(
        item as MetricAlertSingleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria":
      return webtestLocationAvailabilityCriteriaSerializer(
        item as WebtestLocationAvailabilityCriteria,
      );

    case "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria":
      return metricAlertMultipleResourceMultipleMetricCriteriaSerializer(
        item as MetricAlertMultipleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.PromQLCriteria":
      return promQLCriteriaSerializer(item as PromQLCriteria);

    default:
      return metricAlertCriteriaSerializer(item);
  }
}

export function metricAlertCriteriaUnionDeserializer(item: any): MetricAlertCriteriaUnion {
  switch (item["odata.type"]) {
    case "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria":
      return metricAlertSingleResourceMultipleMetricCriteriaDeserializer(
        item as MetricAlertSingleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria":
      return webtestLocationAvailabilityCriteriaDeserializer(
        item as WebtestLocationAvailabilityCriteria,
      );

    case "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria":
      return metricAlertMultipleResourceMultipleMetricCriteriaDeserializer(
        item as MetricAlertMultipleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.PromQLCriteria":
      return promQLCriteriaDeserializer(item as PromQLCriteria);

    default:
      return metricAlertCriteriaDeserializer(item);
  }
}

/** Specifies the type of the alert criteria. Previously undocumented values might be returned */
export enum KnownOdatatype {
  /** Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria */
  MicrosoftAzureMonitorSingleResourceMultipleMetricCriteria = "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria",
  /** Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria */
  MicrosoftAzureMonitorMultipleResourceMultipleMetricCriteria = "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
  /** Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria */
  MicrosoftAzureMonitorWebtestLocationAvailabilityCriteria = "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria",
  /** Microsoft.Azure.Monitor.PromQLCriteria */
  MicrosoftAzureMonitorPromQLCriteria = "Microsoft.Azure.Monitor.PromQLCriteria",
}

/**
 * Specifies the type of the alert criteria. Previously undocumented values might be returned \
 * {@link KnownOdatatype} can be used interchangeably with Odatatype,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria**: Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria \
 * **Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria**: Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria \
 * **Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria**: Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria \
 * **Microsoft.Azure.Monitor.PromQLCriteria**: Microsoft.Azure.Monitor.PromQLCriteria
 */
export type Odatatype = string;

/** Specifies the metric alert criteria for a single resource that has multiple metric criteria. */
export interface MetricAlertSingleResourceMultipleMetricCriteria extends MetricAlertCriteria {
  /** The list of metric criteria for this 'all of' operation. */
  allOf?: MetricCriteria[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria";
}

export function metricAlertSingleResourceMultipleMetricCriteriaSerializer(
  item: MetricAlertSingleResourceMultipleMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    allOf: !item["allOf"] ? item["allOf"] : metricCriteriaArraySerializer(item["allOf"]),
  };
}

export function metricAlertSingleResourceMultipleMetricCriteriaDeserializer(
  item: any,
): MetricAlertSingleResourceMultipleMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "allOf"]),
    odataType: item["odata.type"],
    allOf: !item["allOf"] ? item["allOf"] : metricCriteriaArrayDeserializer(item["allOf"]),
  };
}

export function metricCriteriaArraySerializer(result: Array<MetricCriteria>): any[] {
  return result.map((item) => {
    return metricCriteriaSerializer(item);
  });
}

export function metricCriteriaArrayDeserializer(result: Array<MetricCriteria>): any[] {
  return result.map((item) => {
    return metricCriteriaDeserializer(item);
  });
}

/** Criterion to filter metrics. */
export interface MetricCriteria extends MultiMetricCriteria {
  /** The criteria operator. Previously undocumented values might be returned */
  operator: Operator;
  /** The criteria threshold value that activates the alert. */
  threshold: number;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "StaticThresholdCriterion";
}

export function metricCriteriaSerializer(item: MetricCriteria): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

export function metricCriteriaDeserializer(item: any): MetricCriteria {
  return {
    additionalProperties: serializeRecord(item, [
      "criterionType",
      "name",
      "metricName",
      "metricNamespace",
      "timeAggregation",
      "dimensions",
      "skipMetricValidation",
      "operator",
      "threshold",
    ]),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

/** The criteria operator. Previously undocumented values might be returned */
export enum KnownOperator {
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
}

/**
 * The criteria operator. Previously undocumented values might be returned \
 * {@link KnownOperator} can be used interchangeably with Operator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **GreaterThan**: GreaterThan \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **LessThan**: LessThan \
 * **LessThanOrEqual**: LessThanOrEqual
 */
export type Operator = string;

/** Specifies the metric alert rule criteria for a web test resource. */
export interface WebtestLocationAvailabilityCriteria extends MetricAlertCriteria {
  /** The Application Insights web test Id. */
  webTestId: string;
  /** The Application Insights resource Id. */
  componentId: string;
  /** The number of failed locations. */
  failedLocationCount: number;
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria";
}

export function webtestLocationAvailabilityCriteriaSerializer(
  item: WebtestLocationAvailabilityCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    webTestId: item["webTestId"],
    componentId: item["componentId"],
    failedLocationCount: item["failedLocationCount"],
  };
}

export function webtestLocationAvailabilityCriteriaDeserializer(
  item: any,
): WebtestLocationAvailabilityCriteria {
  return {
    additionalProperties: serializeRecord(item, [
      "odata.type",
      "webTestId",
      "componentId",
      "failedLocationCount",
    ]),
    odataType: item["odata.type"],
    webTestId: item["webTestId"],
    componentId: item["componentId"],
    failedLocationCount: item["failedLocationCount"],
  };
}

/** Specifies the metric alert criteria for multiple resource that has multiple metric criteria. */
export interface MetricAlertMultipleResourceMultipleMetricCriteria extends MetricAlertCriteria {
  /** The list of multiple metric criteria for this 'all of' operation. */
  allOf?: MultiMetricCriteriaUnion[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria";
}

export function metricAlertMultipleResourceMultipleMetricCriteriaSerializer(
  item: MetricAlertMultipleResourceMultipleMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    allOf: !item["allOf"] ? item["allOf"] : multiMetricCriteriaUnionArraySerializer(item["allOf"]),
  };
}

export function metricAlertMultipleResourceMultipleMetricCriteriaDeserializer(
  item: any,
): MetricAlertMultipleResourceMultipleMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "allOf"]),
    odataType: item["odata.type"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : multiMetricCriteriaUnionArrayDeserializer(item["allOf"]),
  };
}

export function multiMetricCriteriaUnionArraySerializer(
  result: Array<MultiMetricCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return multiMetricCriteriaUnionSerializer(item);
  });
}

export function multiMetricCriteriaUnionArrayDeserializer(
  result: Array<MultiMetricCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return multiMetricCriteriaUnionDeserializer(item);
  });
}

/** The types of conditions for a multi resource alert. */
export interface MultiMetricCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: StaticThresholdCriterion, DynamicThresholdCriterion */
  criterionType: CriterionType;
  /** Name of the criteria. */
  name: string;
  /** Name of the metric. */
  metricName: string;
  /** Namespace of the metric. */
  metricNamespace?: string;
  /** The criteria time aggregation types. Previously undocumented values might be returned */
  timeAggregation: AggregationTypeEnum;
  /** List of dimension conditions. */
  dimensions?: MetricDimension[];
  /** Allows creating an alert rule on a custom metric that isn't yet emitted, by causing the metric validation to be skipped. */
  skipMetricValidation?: boolean;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function multiMetricCriteriaSerializer(item: MultiMetricCriteria): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
  };
}

export function multiMetricCriteriaDeserializer(item: any): MultiMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, [
      "criterionType",
      "name",
      "metricName",
      "metricNamespace",
      "timeAggregation",
      "dimensions",
      "skipMetricValidation",
    ]),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
  };
}

/** Alias for MultiMetricCriteriaUnion */
export type MultiMetricCriteriaUnion = MetricCriteria | DynamicMetricCriteria | MultiMetricCriteria;

export function multiMetricCriteriaUnionSerializer(item: MultiMetricCriteriaUnion): any {
  switch (item.criterionType) {
    case "StaticThresholdCriterion":
      return metricCriteriaSerializer(item as MetricCriteria);

    case "DynamicThresholdCriterion":
      return dynamicMetricCriteriaSerializer(item as DynamicMetricCriteria);

    default:
      return multiMetricCriteriaSerializer(item);
  }
}

export function multiMetricCriteriaUnionDeserializer(item: any): MultiMetricCriteriaUnion {
  switch (item["criterionType"]) {
    case "StaticThresholdCriterion":
      return metricCriteriaDeserializer(item as MetricCriteria);

    case "DynamicThresholdCriterion":
      return dynamicMetricCriteriaDeserializer(item as DynamicMetricCriteria);

    default:
      return multiMetricCriteriaDeserializer(item);
  }
}

/** The criteria time aggregation types. Previously undocumented values might be returned */
export enum KnownAggregationTypeEnum {
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
 * The criteria time aggregation types. Previously undocumented values might be returned \
 * {@link KnownAggregationTypeEnum} can be used interchangeably with AggregationTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Average**: Average \
 * **Count**: Count \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type AggregationTypeEnum = string;

export function metricDimensionArraySerializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionSerializer(item);
  });
}

export function metricDimensionArrayDeserializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionDeserializer(item);
  });
}

/** Specifies a metric dimension. */
export interface MetricDimension {
  /** Name of the dimension. */
  name: string;
  /** The dimension operator. Only 'Include' and 'Exclude' are supported */
  operator: string;
  /** List of dimension values. */
  values: string[];
}

export function metricDimensionSerializer(item: MetricDimension): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function metricDimensionDeserializer(item: any): MetricDimension {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Criterion for dynamic threshold. */
export interface DynamicMetricCriteria extends MultiMetricCriteria {
  /** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
  operator: DynamicThresholdOperator;
  /** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
  alertSensitivity: DynamicThresholdSensitivity;
  /** The minimum number of violations required within the selected lookback time window required to raise an alert. */
  failingPeriods: DynamicThresholdFailingPeriods;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format) */
  ignoreDataBefore?: Date;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "DynamicThresholdCriterion";
}

export function dynamicMetricCriteriaSerializer(item: DynamicMetricCriteria): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    failingPeriods: dynamicThresholdFailingPeriodsSerializer(item["failingPeriods"]),
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
  };
}

export function dynamicMetricCriteriaDeserializer(item: any): DynamicMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, [
      "criterionType",
      "name",
      "metricName",
      "metricNamespace",
      "timeAggregation",
      "dimensions",
      "skipMetricValidation",
      "operator",
      "alertSensitivity",
      "failingPeriods",
      "ignoreDataBefore",
    ]),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    failingPeriods: dynamicThresholdFailingPeriodsDeserializer(item["failingPeriods"]),
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : new Date(item["ignoreDataBefore"]),
  };
}

/** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
export enum KnownDynamicThresholdOperator {
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** LessThan */
  LessThan = "LessThan",
  /** GreaterOrLessThan */
  GreaterOrLessThan = "GreaterOrLessThan",
}

/**
 * The operator used to compare the metric value against the threshold. Previously undocumented values might be returned \
 * {@link KnownDynamicThresholdOperator} can be used interchangeably with DynamicThresholdOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GreaterThan**: GreaterThan \
 * **LessThan**: LessThan \
 * **GreaterOrLessThan**: GreaterOrLessThan
 */
export type DynamicThresholdOperator = string;

/** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
export enum KnownDynamicThresholdSensitivity {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned \
 * {@link KnownDynamicThresholdSensitivity} can be used interchangeably with DynamicThresholdSensitivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type DynamicThresholdSensitivity = string;

/** The minimum number of violations required within the selected lookback time window required to raise an alert. */
export interface DynamicThresholdFailingPeriods {
  /** The number of aggregated lookback points. The lookback time window is calculated based on the aggregation granularity (windowSize) and the selected number of aggregated points. */
  numberOfEvaluationPeriods: number;
  /** The number of violations to trigger an alert. Should be smaller or equal to numberOfEvaluationPeriods. */
  minFailingPeriodsToAlert: number;
}

export function dynamicThresholdFailingPeriodsSerializer(
  item: DynamicThresholdFailingPeriods,
): any {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

export function dynamicThresholdFailingPeriodsDeserializer(
  item: any,
): DynamicThresholdFailingPeriods {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

/** Specifies the PromQL criteria for the metric alert resource. */
export interface PromQLCriteria extends MetricAlertCriteria {
  /** Configuration for failing periods in query-based alerts. */
  failingPeriods?: QueryFailingPeriods;
  /** The list of promQL criteria. Alert will be raised when all conditions are met. */
  allOf?: MultiPromQLCriteriaUnion[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.PromQLCriteria";
}

export function promQLCriteriaSerializer(item: PromQLCriteria): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : queryFailingPeriodsSerializer(item["failingPeriods"]),
    allOf: !item["allOf"] ? item["allOf"] : multiPromQLCriteriaUnionArraySerializer(item["allOf"]),
  };
}

export function promQLCriteriaDeserializer(item: any): PromQLCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "failingPeriods", "allOf"]),
    odataType: item["odata.type"],
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : queryFailingPeriodsDeserializer(item["failingPeriods"]),
    allOf: !item["allOf"]
      ? item["allOf"]
      : multiPromQLCriteriaUnionArrayDeserializer(item["allOf"]),
  };
}

/** Configuration for failing periods in query-based alerts. */
export interface QueryFailingPeriods {
  /** The amount of time (in ISO 8601 duration format) alert must be active before firing. */
  for: string;
}

export function queryFailingPeriodsSerializer(item: QueryFailingPeriods): any {
  return { for: item["for"] };
}

export function queryFailingPeriodsDeserializer(item: any): QueryFailingPeriods {
  return {
    for: item["for"],
  };
}

export function multiPromQLCriteriaUnionArraySerializer(
  result: Array<MultiPromQLCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return multiPromQLCriteriaUnionSerializer(item);
  });
}

export function multiPromQLCriteriaUnionArrayDeserializer(
  result: Array<MultiPromQLCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return multiPromQLCriteriaUnionDeserializer(item);
  });
}

/** The types of conditions for a multi query metric alert. */
export interface MultiPromQLCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: StaticThresholdCriterion, DynamicThresholdCriterion */
  criterionType: CriterionType;
  /** Name of the criteria. */
  name: string;
  /** The query used to evaluate the alert rule */
  query: string;
}

export function multiPromQLCriteriaSerializer(item: MultiPromQLCriteria): any {
  return { criterionType: item["criterionType"], name: item["name"], query: item["query"] };
}

export function multiPromQLCriteriaDeserializer(item: any): MultiPromQLCriteria {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
  };
}

/** Alias for MultiPromQLCriteriaUnion */
export type MultiPromQLCriteriaUnion =
  | StaticPromQLCriteria
  | DynamicPromQLCriteria
  | MultiPromQLCriteria;

export function multiPromQLCriteriaUnionSerializer(item: MultiPromQLCriteriaUnion): any {
  switch (item.criterionType) {
    case "StaticThresholdCriterion":
      return staticPromQLCriteriaSerializer(item as StaticPromQLCriteria);

    case "DynamicThresholdCriterion":
      return dynamicPromQLCriteriaSerializer(item as DynamicPromQLCriteria);

    default:
      return multiPromQLCriteriaSerializer(item);
  }
}

export function multiPromQLCriteriaUnionDeserializer(item: any): MultiPromQLCriteriaUnion {
  switch (item["criterionType"]) {
    case "StaticThresholdCriterion":
      return staticPromQLCriteriaDeserializer(item as StaticPromQLCriteria);

    case "DynamicThresholdCriterion":
      return dynamicPromQLCriteriaDeserializer(item as DynamicPromQLCriteria);

    default:
      return multiPromQLCriteriaDeserializer(item);
  }
}

/** The criterion for static prom query. */
export interface StaticPromQLCriteria extends MultiPromQLCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "StaticThresholdCriterion";
}

export function staticPromQLCriteriaSerializer(item: StaticPromQLCriteria): any {
  return { criterionType: item["criterionType"], name: item["name"], query: item["query"] };
}

export function staticPromQLCriteriaDeserializer(item: any): StaticPromQLCriteria {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
  };
}

/** The criterion for dynamic prom query. */
export interface DynamicPromQLCriteria extends MultiPromQLCriteria {
  /** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
  operator: DynamicThresholdOperator;
  /** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
  alertSensitivity: DynamicThresholdSensitivity;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format) */
  ignoreDataBefore?: Date;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "DynamicThresholdCriterion";
}

export function dynamicPromQLCriteriaSerializer(item: DynamicPromQLCriteria): any {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
  };
}

export function dynamicPromQLCriteriaDeserializer(item: any): DynamicPromQLCriteria {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : new Date(item["ignoreDataBefore"]),
  };
}

/** model interface ResolveConfiguration */
export interface ResolveConfiguration {
  /** Indicates whether the alert should be auto resolved */
  autoResolved: boolean;
  /** The time (in ISO 8601 duration format) after which the alert should be auto resolved */
  timeToResolve?: string;
}

export function resolveConfigurationSerializer(item: ResolveConfiguration): any {
  return { autoResolved: item["autoResolved"], timeToResolve: item["timeToResolve"] };
}

export function resolveConfigurationDeserializer(item: any): ResolveConfiguration {
  return {
    autoResolved: item["autoResolved"],
    timeToResolve: item["timeToResolve"],
  };
}

export function metricAlertActionArraySerializer(result: Array<MetricAlertAction>): any[] {
  return result.map((item) => {
    return metricAlertActionSerializer(item);
  });
}

export function metricAlertActionArrayDeserializer(result: Array<MetricAlertAction>): any[] {
  return result.map((item) => {
    return metricAlertActionDeserializer(item);
  });
}

/** An alert action. */
export interface MetricAlertAction {
  /** The id of the action group to use. */
  actionGroupId?: string;
  /** This field allows specifying custom properties, which would be appended to the alert payload sent as input to the webhook. */
  webHookProperties?: Record<string, string>;
}

export function metricAlertActionSerializer(item: MetricAlertAction): any {
  return { actionGroupId: item["actionGroupId"], webHookProperties: item["webHookProperties"] };
}

export function metricAlertActionDeserializer(item: any): MetricAlertAction {
  return {
    actionGroupId: item["actionGroupId"],
    webHookProperties: !item["webHookProperties"]
      ? item["webHookProperties"]
      : Object.fromEntries(
          Object.entries(item["webHookProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Describes the format of Error response. */
export interface MetricAlertErrorResponse {
  error?: ErrorResponseError;
}

export function metricAlertErrorResponseDeserializer(item: any): MetricAlertErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseErrorDeserializer(item["error"]),
  };
}

/** The metric alert resource for patch operations. */
export interface MetricAlertResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The identity of the resource. */
  identity?: Identity;
  /** The description of the metric alert that will be included in the alert email. */
  description?: string;
  /** Alert severity {0, 1, 2, 3, 4} */
  severity?: number;
  /** The flag that indicates whether the metric alert is enabled. */
  enabled?: boolean;
  /** The list of resource id's that this metric alert is scoped to. */
  scopes?: string[];
  /** How often the metric alert is evaluated represented in ISO 8601 duration format. */
  evaluationFrequency?: string;
  /** The period of time (in ISO 8601 duration format) that is used to monitor alert activity based on the threshold. */
  windowSize?: string;
  /** The resource type of the target resource(s) on which the alert is created/updated. Mandatory for MultipleResourceMultipleMetricCriteria. */
  targetResourceType?: string;
  /** The region of the target resource(s) on which the alert is created/updated. Mandatory for MultipleResourceMultipleMetricCriteria. */
  targetResourceRegion?: string;
  /** Defines the specific alert criteria information. */
  criteria?: MetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: ResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertResourcePatchSerializer(item: MetricAlertResourcePatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "description",
      "severity",
      "enabled",
      "scopes",
      "evaluationFrequency",
      "windowSize",
      "targetResourceType",
      "targetResourceRegion",
      "criteria",
      "autoMitigate",
      "resolveConfiguration",
      "actions",
      "customProperties",
      "actionProperties",
    ])
      ? undefined
      : _metricAlertResourcePatchPropertiesSerializer(item),
  };
}

/** An alert rule properties for patch. */
export interface MetricAlertPropertiesPatch {
  /** The description of the metric alert that will be included in the alert email. */
  description?: string;
  /** Alert severity {0, 1, 2, 3, 4} */
  severity?: number;
  /** The flag that indicates whether the metric alert is enabled. */
  enabled?: boolean;
  /** The list of resource id's that this metric alert is scoped to. */
  scopes?: string[];
  /** How often the metric alert is evaluated represented in ISO 8601 duration format. */
  evaluationFrequency?: string;
  /** The period of time (in ISO 8601 duration format) that is used to monitor alert activity based on the threshold. */
  windowSize?: string;
  /** The resource type of the target resource(s) on which the alert is created/updated. Mandatory for MultipleResourceMultipleMetricCriteria. */
  targetResourceType?: string;
  /** The region of the target resource(s) on which the alert is created/updated. Mandatory for MultipleResourceMultipleMetricCriteria. */
  targetResourceRegion?: string;
  /** Defines the specific alert criteria information. */
  criteria?: MetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: ResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertPropertiesPatchSerializer(item: MetricAlertPropertiesPatch): any {
  return {
    description: item["description"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    targetResourceType: item["targetResourceType"],
    targetResourceRegion: item["targetResourceRegion"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : metricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : resolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"] ? item["actions"] : metricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

/** Represents a collection of alert rule resources. */
export interface _MetricAlertResourceCollection {
  /** The values for the alert rule resources. */
  value?: MetricAlertResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _metricAlertResourceCollectionDeserializer(
  item: any,
): _MetricAlertResourceCollection {
  return {
    value: !item["value"] ? item["value"] : metricAlertResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricAlertResourceArraySerializer(result: Array<MetricAlertResource>): any[] {
  return result.map((item) => {
    return metricAlertResourceSerializer(item);
  });
}

export function metricAlertResourceArrayDeserializer(result: Array<MetricAlertResource>): any[] {
  return result.map((item) => {
    return metricAlertResourceDeserializer(item);
  });
}

/** Represents a collection of alert rule resources. */
export interface _MetricAlertStatusCollection {
  /** The values for the alert rule resources. */
  value?: MetricAlertStatus[];
}

export function _metricAlertStatusCollectionDeserializer(item: any): _MetricAlertStatusCollection {
  return {
    value: !item["value"] ? item["value"] : metricAlertStatusArrayDeserializer(item["value"]),
  };
}

export function metricAlertStatusArrayDeserializer(result: Array<MetricAlertStatus>): any[] {
  return result.map((item) => {
    return metricAlertStatusDeserializer(item);
  });
}

/** An alert status. */
export interface MetricAlertStatus {
  /** The status name. */
  name?: string;
  /** The alert rule arm id. */
  id?: string;
  /** The extended resource type name. */
  type?: string;
  /** The alert status properties of the metric alert status. */
  properties?: MetricAlertStatusProperties;
}

export function metricAlertStatusDeserializer(item: any): MetricAlertStatus {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : metricAlertStatusPropertiesDeserializer(item["properties"]),
  };
}

/** An alert status properties. */
export interface MetricAlertStatusProperties {
  /** An object describing the type of the dimensions. */
  dimensions?: Record<string, string>;
  /** Status value */
  status?: string;
  /** UTC time when the status was checked. */
  timestamp?: Date;
}

export function metricAlertStatusPropertiesDeserializer(item: any): MetricAlertStatusProperties {
  return {
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : Object.fromEntries(
          Object.entries(item["dimensions"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    status: item["status"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

export function _metricAlertResourcePropertiesSerializer(item: MetricAlertResource): any {
  return {
    description: item["description"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    targetResourceType: item["targetResourceType"],
    targetResourceRegion: item["targetResourceRegion"],
    criteria: metricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : resolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"] ? item["actions"] : metricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function _metricAlertResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    targetResourceType: item["targetResourceType"],
    targetResourceRegion: item["targetResourceRegion"],
    criteria: metricAlertCriteriaUnionDeserializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : resolveConfigurationDeserializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertActionArrayDeserializer(item["actions"]),
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    isMigrated: item["isMigrated"],
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

export function _metricAlertResourcePatchPropertiesSerializer(item: MetricAlertResourcePatch): any {
  return {
    description: item["description"],
    severity: item["severity"],
    enabled: item["enabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    evaluationFrequency: item["evaluationFrequency"],
    windowSize: item["windowSize"],
    targetResourceType: item["targetResourceType"],
    targetResourceRegion: item["targetResourceRegion"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : metricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : resolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"] ? item["actions"] : metricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}
