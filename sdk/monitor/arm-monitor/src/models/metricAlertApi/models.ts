// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import type {
  MicrosoftCommonCriterionType,
  MicrosoftCommonIdentity,
  MicrosoftCommonErrorResponseError,
} from "../microsoft/common/models.js";
import {
  microsoftCommonIdentitySerializer,
  microsoftCommonIdentityDeserializer,
  microsoftCommonErrorResponseErrorDeserializer,
} from "../microsoft/common/models.js";
import type { TrackedResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The metric alert resource. */
export interface MetricAlertApiMetricAlertResource extends TrackedResource {
  /** The identity of the resource. */
  identity?: MicrosoftCommonIdentity;
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
  criteria: MetricAlertApiMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MetricAlertApiResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertApiMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertApiMetricAlertResourceSerializer(
  item: MetricAlertApiMetricAlertResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _metricAlertResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftCommonIdentitySerializer(item["identity"]),
  };
}

export function metricAlertApiMetricAlertResourceDeserializer(
  item: any,
): MetricAlertApiMetricAlertResource {
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
    identity: !item["identity"]
      ? item["identity"]
      : microsoftCommonIdentityDeserializer(item["identity"]),
  };
}

/** An alert rule. */
export interface MetricAlertApiMetricAlertProperties {
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
  criteria: MetricAlertApiMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MetricAlertApiResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertApiMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertApiMetricAlertPropertiesSerializer(
  item: MetricAlertApiMetricAlertProperties,
): any {
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
    criteria: metricAlertApiMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : metricAlertApiResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertApiMetricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function metricAlertApiMetricAlertPropertiesDeserializer(
  item: any,
): MetricAlertApiMetricAlertProperties {
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
    criteria: metricAlertApiMetricAlertCriteriaUnionDeserializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : metricAlertApiResolveConfigurationDeserializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertApiMetricAlertActionArrayDeserializer(item["actions"]),
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
export interface MetricAlertApiMetricAlertCriteria {
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria, Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria, Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria, Microsoft.Azure.Monitor.PromQLCriteria */
  odataType: MetricAlertApiOdatatype;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function metricAlertApiMetricAlertCriteriaSerializer(
  item: MetricAlertApiMetricAlertCriteria,
): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), "odata.type": item["odataType"] };
}

export function metricAlertApiMetricAlertCriteriaDeserializer(
  item: any,
): MetricAlertApiMetricAlertCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type"]),
    odataType: item["odata.type"],
  };
}

/** Alias for MetricAlertApiMetricAlertCriteriaUnion */
export type MetricAlertApiMetricAlertCriteriaUnion =
  | MetricAlertApiMetricAlertSingleResourceMultipleMetricCriteria
  | MetricAlertApiWebtestLocationAvailabilityCriteria
  | MetricAlertApiMetricAlertMultipleResourceMultipleMetricCriteria
  | MetricAlertApiPromQLCriteria
  | MetricAlertApiMetricAlertCriteria;

export function metricAlertApiMetricAlertCriteriaUnionSerializer(
  item: MetricAlertApiMetricAlertCriteriaUnion,
): any {
  switch (item.odataType) {
    case "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria":
      return metricAlertApiMetricAlertSingleResourceMultipleMetricCriteriaSerializer(
        item as MetricAlertApiMetricAlertSingleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria":
      return metricAlertApiWebtestLocationAvailabilityCriteriaSerializer(
        item as MetricAlertApiWebtestLocationAvailabilityCriteria,
      );

    case "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria":
      return metricAlertApiMetricAlertMultipleResourceMultipleMetricCriteriaSerializer(
        item as MetricAlertApiMetricAlertMultipleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.PromQLCriteria":
      return metricAlertApiPromQLCriteriaSerializer(item as MetricAlertApiPromQLCriteria);

    default:
      return metricAlertApiMetricAlertCriteriaSerializer(item);
  }
}

export function metricAlertApiMetricAlertCriteriaUnionDeserializer(
  item: any,
): MetricAlertApiMetricAlertCriteriaUnion {
  switch (item["odata.type"]) {
    case "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria":
      return metricAlertApiMetricAlertSingleResourceMultipleMetricCriteriaDeserializer(
        item as MetricAlertApiMetricAlertSingleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria":
      return metricAlertApiWebtestLocationAvailabilityCriteriaDeserializer(
        item as MetricAlertApiWebtestLocationAvailabilityCriteria,
      );

    case "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria":
      return metricAlertApiMetricAlertMultipleResourceMultipleMetricCriteriaDeserializer(
        item as MetricAlertApiMetricAlertMultipleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.PromQLCriteria":
      return metricAlertApiPromQLCriteriaDeserializer(item as MetricAlertApiPromQLCriteria);

    default:
      return metricAlertApiMetricAlertCriteriaDeserializer(item);
  }
}

/** Specifies the type of the alert criteria. Previously undocumented values might be returned */
export enum KnownMetricAlertApiOdatatype {
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
 * {@link KnownMetricAlertApiOdatatype} can be used interchangeably with MetricAlertApiOdatatype,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria**: Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria \
 * **Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria**: Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria \
 * **Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria**: Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria \
 * **Microsoft.Azure.Monitor.PromQLCriteria**: Microsoft.Azure.Monitor.PromQLCriteria
 */
export type MetricAlertApiOdatatype = string;

/** Specifies the metric alert criteria for a single resource that has multiple metric criteria. */
export interface MetricAlertApiMetricAlertSingleResourceMultipleMetricCriteria extends MetricAlertApiMetricAlertCriteria {
  /** The list of metric criteria for this 'all of' operation. */
  allOf?: MetricAlertApiMetricCriteria[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria";
}

export function metricAlertApiMetricAlertSingleResourceMultipleMetricCriteriaSerializer(
  item: MetricAlertApiMetricAlertSingleResourceMultipleMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : metricAlertApiMetricCriteriaArraySerializer(item["allOf"]),
  };
}

export function metricAlertApiMetricAlertSingleResourceMultipleMetricCriteriaDeserializer(
  item: any,
): MetricAlertApiMetricAlertSingleResourceMultipleMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "allOf"]),
    odataType: item["odata.type"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : metricAlertApiMetricCriteriaArrayDeserializer(item["allOf"]),
  };
}

export function metricAlertApiMetricCriteriaArraySerializer(
  result: Array<MetricAlertApiMetricCriteria>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricCriteriaSerializer(item);
  });
}

export function metricAlertApiMetricCriteriaArrayDeserializer(
  result: Array<MetricAlertApiMetricCriteria>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricCriteriaDeserializer(item);
  });
}

/** Criterion to filter metrics. */
export interface MetricAlertApiMetricCriteria extends MetricAlertApiMultiMetricCriteria {
  /** The criteria operator. Previously undocumented values might be returned */
  operator: MetricAlertApiOperator;
  /** The criteria threshold value that activates the alert. */
  threshold: number;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "StaticThresholdCriterion";
}

export function metricAlertApiMetricCriteriaSerializer(item: MetricAlertApiMetricCriteria): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricAlertApiMetricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

export function metricAlertApiMetricCriteriaDeserializer(item: any): MetricAlertApiMetricCriteria {
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
      : metricAlertApiMetricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

/** The criteria operator. Previously undocumented values might be returned */
export enum KnownMetricAlertApiOperator {
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
 * {@link KnownMetricAlertApiOperator} can be used interchangeably with MetricAlertApiOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **GreaterThan**: GreaterThan \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **LessThan**: LessThan \
 * **LessThanOrEqual**: LessThanOrEqual
 */
export type MetricAlertApiOperator = string;

/** Specifies the metric alert rule criteria for a web test resource. */
export interface MetricAlertApiWebtestLocationAvailabilityCriteria extends MetricAlertApiMetricAlertCriteria {
  /** The Application Insights web test Id. */
  webTestId: string;
  /** The Application Insights resource Id. */
  componentId: string;
  /** The number of failed locations. */
  failedLocationCount: number;
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria";
}

export function metricAlertApiWebtestLocationAvailabilityCriteriaSerializer(
  item: MetricAlertApiWebtestLocationAvailabilityCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    webTestId: item["webTestId"],
    componentId: item["componentId"],
    failedLocationCount: item["failedLocationCount"],
  };
}

export function metricAlertApiWebtestLocationAvailabilityCriteriaDeserializer(
  item: any,
): MetricAlertApiWebtestLocationAvailabilityCriteria {
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
export interface MetricAlertApiMetricAlertMultipleResourceMultipleMetricCriteria extends MetricAlertApiMetricAlertCriteria {
  /** The list of multiple metric criteria for this 'all of' operation. */
  allOf?: MetricAlertApiMultiMetricCriteriaUnion[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria";
}

export function metricAlertApiMetricAlertMultipleResourceMultipleMetricCriteriaSerializer(
  item: MetricAlertApiMetricAlertMultipleResourceMultipleMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : metricAlertApiMultiMetricCriteriaUnionArraySerializer(item["allOf"]),
  };
}

export function metricAlertApiMetricAlertMultipleResourceMultipleMetricCriteriaDeserializer(
  item: any,
): MetricAlertApiMetricAlertMultipleResourceMultipleMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "allOf"]),
    odataType: item["odata.type"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : metricAlertApiMultiMetricCriteriaUnionArrayDeserializer(item["allOf"]),
  };
}

export function metricAlertApiMultiMetricCriteriaUnionArraySerializer(
  result: Array<MetricAlertApiMultiMetricCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMultiMetricCriteriaUnionSerializer(item);
  });
}

export function metricAlertApiMultiMetricCriteriaUnionArrayDeserializer(
  result: Array<MetricAlertApiMultiMetricCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMultiMetricCriteriaUnionDeserializer(item);
  });
}

/** The types of conditions for a multi resource alert. */
export interface MetricAlertApiMultiMetricCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: StaticThresholdCriterion, DynamicThresholdCriterion */
  criterionType: MicrosoftCommonCriterionType;
  /** Name of the criteria. */
  name: string;
  /** Name of the metric. */
  metricName: string;
  /** Namespace of the metric. */
  metricNamespace?: string;
  /** The criteria time aggregation types. Previously undocumented values might be returned */
  timeAggregation: MetricAlertApiAggregationTypeEnum;
  /** List of dimension conditions. */
  dimensions?: MetricAlertApiMetricDimension[];
  /** Allows creating an alert rule on a custom metric that isn't yet emitted, by causing the metric validation to be skipped. */
  skipMetricValidation?: boolean;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function metricAlertApiMultiMetricCriteriaSerializer(
  item: MetricAlertApiMultiMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricAlertApiMetricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
  };
}

export function metricAlertApiMultiMetricCriteriaDeserializer(
  item: any,
): MetricAlertApiMultiMetricCriteria {
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
      : metricAlertApiMetricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
  };
}

/** Alias for MetricAlertApiMultiMetricCriteriaUnion */
export type MetricAlertApiMultiMetricCriteriaUnion =
  | MetricAlertApiMetricCriteria
  | MetricAlertApiDynamicMetricCriteria
  | MetricAlertApiMultiMetricCriteria;

export function metricAlertApiMultiMetricCriteriaUnionSerializer(
  item: MetricAlertApiMultiMetricCriteriaUnion,
): any {
  switch (item.criterionType) {
    case "StaticThresholdCriterion":
      return metricAlertApiMetricCriteriaSerializer(item as MetricAlertApiMetricCriteria);

    case "DynamicThresholdCriterion":
      return metricAlertApiDynamicMetricCriteriaSerializer(
        item as MetricAlertApiDynamicMetricCriteria,
      );

    default:
      return metricAlertApiMultiMetricCriteriaSerializer(item);
  }
}

export function metricAlertApiMultiMetricCriteriaUnionDeserializer(
  item: any,
): MetricAlertApiMultiMetricCriteriaUnion {
  switch (item["criterionType"]) {
    case "StaticThresholdCriterion":
      return metricAlertApiMetricCriteriaDeserializer(item as MetricAlertApiMetricCriteria);

    case "DynamicThresholdCriterion":
      return metricAlertApiDynamicMetricCriteriaDeserializer(
        item as MetricAlertApiDynamicMetricCriteria,
      );

    default:
      return metricAlertApiMultiMetricCriteriaDeserializer(item);
  }
}

/** The criteria time aggregation types. Previously undocumented values might be returned */
export enum KnownMetricAlertApiAggregationTypeEnum {
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
 * {@link KnownMetricAlertApiAggregationTypeEnum} can be used interchangeably with MetricAlertApiAggregationTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Average**: Average \
 * **Count**: Count \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type MetricAlertApiAggregationTypeEnum = string;

export function metricAlertApiMetricDimensionArraySerializer(
  result: Array<MetricAlertApiMetricDimension>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricDimensionSerializer(item);
  });
}

export function metricAlertApiMetricDimensionArrayDeserializer(
  result: Array<MetricAlertApiMetricDimension>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricDimensionDeserializer(item);
  });
}

/** Specifies a metric dimension. */
export interface MetricAlertApiMetricDimension {
  /** Name of the dimension. */
  name: string;
  /** The dimension operator. Only 'Include' and 'Exclude' are supported */
  operator: string;
  /** List of dimension values. */
  values: string[];
}

export function metricAlertApiMetricDimensionSerializer(item: MetricAlertApiMetricDimension): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function metricAlertApiMetricDimensionDeserializer(
  item: any,
): MetricAlertApiMetricDimension {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Criterion for dynamic threshold. */
export interface MetricAlertApiDynamicMetricCriteria extends MetricAlertApiMultiMetricCriteria {
  /** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
  operator: MetricAlertApiDynamicThresholdOperator;
  /** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
  alertSensitivity: MetricAlertApiDynamicThresholdSensitivity;
  /** The minimum number of violations required within the selected lookback time window required to raise an alert. */
  failingPeriods: MetricAlertApiDynamicThresholdFailingPeriods;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format) */
  ignoreDataBefore?: Date;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "DynamicThresholdCriterion";
}

export function metricAlertApiDynamicMetricCriteriaSerializer(
  item: MetricAlertApiDynamicMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    criterionType: item["criterionType"],
    name: item["name"],
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    timeAggregation: item["timeAggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricAlertApiMetricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    failingPeriods: metricAlertApiDynamicThresholdFailingPeriodsSerializer(item["failingPeriods"]),
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
  };
}

export function metricAlertApiDynamicMetricCriteriaDeserializer(
  item: any,
): MetricAlertApiDynamicMetricCriteria {
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
      : metricAlertApiMetricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    failingPeriods: metricAlertApiDynamicThresholdFailingPeriodsDeserializer(
      item["failingPeriods"],
    ),
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : new Date(item["ignoreDataBefore"]),
  };
}

/** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
export enum KnownMetricAlertApiDynamicThresholdOperator {
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** LessThan */
  LessThan = "LessThan",
  /** GreaterOrLessThan */
  GreaterOrLessThan = "GreaterOrLessThan",
}

/**
 * The operator used to compare the metric value against the threshold. Previously undocumented values might be returned \
 * {@link KnownMetricAlertApiDynamicThresholdOperator} can be used interchangeably with MetricAlertApiDynamicThresholdOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GreaterThan**: GreaterThan \
 * **LessThan**: LessThan \
 * **GreaterOrLessThan**: GreaterOrLessThan
 */
export type MetricAlertApiDynamicThresholdOperator = string;

/** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
export enum KnownMetricAlertApiDynamicThresholdSensitivity {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned \
 * {@link KnownMetricAlertApiDynamicThresholdSensitivity} can be used interchangeably with MetricAlertApiDynamicThresholdSensitivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type MetricAlertApiDynamicThresholdSensitivity = string;

/** The minimum number of violations required within the selected lookback time window required to raise an alert. */
export interface MetricAlertApiDynamicThresholdFailingPeriods {
  /** The number of aggregated lookback points. The lookback time window is calculated based on the aggregation granularity (windowSize) and the selected number of aggregated points. */
  numberOfEvaluationPeriods: number;
  /** The number of violations to trigger an alert. Should be smaller or equal to numberOfEvaluationPeriods. */
  minFailingPeriodsToAlert: number;
}

export function metricAlertApiDynamicThresholdFailingPeriodsSerializer(
  item: MetricAlertApiDynamicThresholdFailingPeriods,
): any {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

export function metricAlertApiDynamicThresholdFailingPeriodsDeserializer(
  item: any,
): MetricAlertApiDynamicThresholdFailingPeriods {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

/** Specifies the PromQL criteria for the metric alert resource. */
export interface MetricAlertApiPromQLCriteria extends MetricAlertApiMetricAlertCriteria {
  /** Configuration for failing periods in query-based alerts. */
  failingPeriods?: MetricAlertApiQueryFailingPeriods;
  /** The list of promQL criteria. Alert will be raised when all conditions are met. */
  allOf?: MetricAlertApiMultiPromQLCriteriaUnion[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.PromQLCriteria";
}

export function metricAlertApiPromQLCriteriaSerializer(item: MetricAlertApiPromQLCriteria): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : metricAlertApiQueryFailingPeriodsSerializer(item["failingPeriods"]),
    allOf: !item["allOf"]
      ? item["allOf"]
      : metricAlertApiMultiPromQLCriteriaUnionArraySerializer(item["allOf"]),
  };
}

export function metricAlertApiPromQLCriteriaDeserializer(item: any): MetricAlertApiPromQLCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "failingPeriods", "allOf"]),
    odataType: item["odata.type"],
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : metricAlertApiQueryFailingPeriodsDeserializer(item["failingPeriods"]),
    allOf: !item["allOf"]
      ? item["allOf"]
      : metricAlertApiMultiPromQLCriteriaUnionArrayDeserializer(item["allOf"]),
  };
}

/** Configuration for failing periods in query-based alerts. */
export interface MetricAlertApiQueryFailingPeriods {
  /** The amount of time (in ISO 8601 duration format) alert must be active before firing. */
  for: string;
}

export function metricAlertApiQueryFailingPeriodsSerializer(
  item: MetricAlertApiQueryFailingPeriods,
): any {
  return { for: item["for"] };
}

export function metricAlertApiQueryFailingPeriodsDeserializer(
  item: any,
): MetricAlertApiQueryFailingPeriods {
  return {
    for: item["for"],
  };
}

export function metricAlertApiMultiPromQLCriteriaUnionArraySerializer(
  result: Array<MetricAlertApiMultiPromQLCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMultiPromQLCriteriaUnionSerializer(item);
  });
}

export function metricAlertApiMultiPromQLCriteriaUnionArrayDeserializer(
  result: Array<MetricAlertApiMultiPromQLCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMultiPromQLCriteriaUnionDeserializer(item);
  });
}

/** The types of conditions for a multi query metric alert. */
export interface MetricAlertApiMultiPromQLCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: StaticThresholdCriterion, DynamicThresholdCriterion */
  criterionType: MicrosoftCommonCriterionType;
  /** Name of the criteria. */
  name: string;
  /** The query used to evaluate the alert rule */
  query: string;
}

export function metricAlertApiMultiPromQLCriteriaSerializer(
  item: MetricAlertApiMultiPromQLCriteria,
): any {
  return { criterionType: item["criterionType"], name: item["name"], query: item["query"] };
}

export function metricAlertApiMultiPromQLCriteriaDeserializer(
  item: any,
): MetricAlertApiMultiPromQLCriteria {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
  };
}

/** Alias for MetricAlertApiMultiPromQLCriteriaUnion */
export type MetricAlertApiMultiPromQLCriteriaUnion =
  | MetricAlertApiStaticPromQLCriteria
  | MetricAlertApiDynamicPromQLCriteria
  | MetricAlertApiMultiPromQLCriteria;

export function metricAlertApiMultiPromQLCriteriaUnionSerializer(
  item: MetricAlertApiMultiPromQLCriteriaUnion,
): any {
  switch (item.criterionType) {
    case "StaticThresholdCriterion":
      return metricAlertApiStaticPromQLCriteriaSerializer(
        item as MetricAlertApiStaticPromQLCriteria,
      );

    case "DynamicThresholdCriterion":
      return metricAlertApiDynamicPromQLCriteriaSerializer(
        item as MetricAlertApiDynamicPromQLCriteria,
      );

    default:
      return metricAlertApiMultiPromQLCriteriaSerializer(item);
  }
}

export function metricAlertApiMultiPromQLCriteriaUnionDeserializer(
  item: any,
): MetricAlertApiMultiPromQLCriteriaUnion {
  switch (item["criterionType"]) {
    case "StaticThresholdCriterion":
      return metricAlertApiStaticPromQLCriteriaDeserializer(
        item as MetricAlertApiStaticPromQLCriteria,
      );

    case "DynamicThresholdCriterion":
      return metricAlertApiDynamicPromQLCriteriaDeserializer(
        item as MetricAlertApiDynamicPromQLCriteria,
      );

    default:
      return metricAlertApiMultiPromQLCriteriaDeserializer(item);
  }
}

/** The criterion for static prom query. */
export interface MetricAlertApiStaticPromQLCriteria extends MetricAlertApiMultiPromQLCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "StaticThresholdCriterion";
}

export function metricAlertApiStaticPromQLCriteriaSerializer(
  item: MetricAlertApiStaticPromQLCriteria,
): any {
  return { criterionType: item["criterionType"], name: item["name"], query: item["query"] };
}

export function metricAlertApiStaticPromQLCriteriaDeserializer(
  item: any,
): MetricAlertApiStaticPromQLCriteria {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
  };
}

/** The criterion for dynamic prom query. */
export interface MetricAlertApiDynamicPromQLCriteria extends MetricAlertApiMultiPromQLCriteria {
  /** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
  operator: MetricAlertApiDynamicThresholdOperator;
  /** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
  alertSensitivity: MetricAlertApiDynamicThresholdSensitivity;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format) */
  ignoreDataBefore?: Date;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "DynamicThresholdCriterion";
}

export function metricAlertApiDynamicPromQLCriteriaSerializer(
  item: MetricAlertApiDynamicPromQLCriteria,
): any {
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

export function metricAlertApiDynamicPromQLCriteriaDeserializer(
  item: any,
): MetricAlertApiDynamicPromQLCriteria {
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

/** model interface MetricAlertApiResolveConfiguration */
export interface MetricAlertApiResolveConfiguration {
  /** Indicates whether the alert should be auto resolved */
  autoResolved: boolean;
  /** The time (in ISO 8601 duration format) after which the alert should be auto resolved */
  timeToResolve?: string;
}

export function metricAlertApiResolveConfigurationSerializer(
  item: MetricAlertApiResolveConfiguration,
): any {
  return { autoResolved: item["autoResolved"], timeToResolve: item["timeToResolve"] };
}

export function metricAlertApiResolveConfigurationDeserializer(
  item: any,
): MetricAlertApiResolveConfiguration {
  return {
    autoResolved: item["autoResolved"],
    timeToResolve: item["timeToResolve"],
  };
}

export function metricAlertApiMetricAlertActionArraySerializer(
  result: Array<MetricAlertApiMetricAlertAction>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricAlertActionSerializer(item);
  });
}

export function metricAlertApiMetricAlertActionArrayDeserializer(
  result: Array<MetricAlertApiMetricAlertAction>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricAlertActionDeserializer(item);
  });
}

/** An alert action. */
export interface MetricAlertApiMetricAlertAction {
  /** The id of the action group to use. */
  actionGroupId?: string;
  /** This field allows specifying custom properties, which would be appended to the alert payload sent as input to the webhook. */
  webHookProperties?: Record<string, string>;
}

export function metricAlertApiMetricAlertActionSerializer(
  item: MetricAlertApiMetricAlertAction,
): any {
  return { actionGroupId: item["actionGroupId"], webHookProperties: item["webHookProperties"] };
}

export function metricAlertApiMetricAlertActionDeserializer(
  item: any,
): MetricAlertApiMetricAlertAction {
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
export interface MetricAlertApiMetricAlertErrorResponse {
  error?: MicrosoftCommonErrorResponseError;
}

export function metricAlertApiMetricAlertErrorResponseDeserializer(
  item: any,
): MetricAlertApiMetricAlertErrorResponse {
  return {
    error: !item["error"]
      ? item["error"]
      : microsoftCommonErrorResponseErrorDeserializer(item["error"]),
  };
}

/** The metric alert resource for patch operations. */
export interface MetricAlertApiMetricAlertResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The identity of the resource. */
  identity?: MicrosoftCommonIdentity;
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
  criteria?: MetricAlertApiMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MetricAlertApiResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertApiMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertApiMetricAlertResourcePatchSerializer(
  item: MetricAlertApiMetricAlertResourcePatch,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : microsoftCommonIdentitySerializer(item["identity"]),
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
export interface MetricAlertApiMetricAlertPropertiesPatch {
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
  criteria?: MetricAlertApiMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MetricAlertApiResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MetricAlertApiMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function metricAlertApiMetricAlertPropertiesPatchSerializer(
  item: MetricAlertApiMetricAlertPropertiesPatch,
): any {
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
      : metricAlertApiMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : metricAlertApiResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertApiMetricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

/** Represents a collection of alert rule resources. */
export interface _MetricAlertApiMetricAlertResourceCollection {
  /** The values for the alert rule resources. */
  value?: MetricAlertApiMetricAlertResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _metricAlertApiMetricAlertResourceCollectionDeserializer(
  item: any,
): _MetricAlertApiMetricAlertResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : metricAlertApiMetricAlertResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricAlertApiMetricAlertResourceArraySerializer(
  result: Array<MetricAlertApiMetricAlertResource>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricAlertResourceSerializer(item);
  });
}

export function metricAlertApiMetricAlertResourceArrayDeserializer(
  result: Array<MetricAlertApiMetricAlertResource>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricAlertResourceDeserializer(item);
  });
}

/** Represents a collection of alert rule resources. */
export interface MetricAlertApiMetricAlertStatusCollection {
  /** The values for the alert rule resources. */
  value?: MetricAlertApiMetricAlertStatus[];
}

export function metricAlertApiMetricAlertStatusCollectionDeserializer(
  item: any,
): MetricAlertApiMetricAlertStatusCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : metricAlertApiMetricAlertStatusArrayDeserializer(item["value"]),
  };
}

export function metricAlertApiMetricAlertStatusArrayDeserializer(
  result: Array<MetricAlertApiMetricAlertStatus>,
): any[] {
  return result.map((item) => {
    return metricAlertApiMetricAlertStatusDeserializer(item);
  });
}

/** An alert status. */
export interface MetricAlertApiMetricAlertStatus {
  /** The status name. */
  name?: string;
  /** The alert rule arm id. */
  id?: string;
  /** The extended resource type name. */
  type?: string;
  /** The alert status properties of the metric alert status. */
  properties?: MetricAlertApiMetricAlertStatusProperties;
}

export function metricAlertApiMetricAlertStatusDeserializer(
  item: any,
): MetricAlertApiMetricAlertStatus {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : metricAlertApiMetricAlertStatusPropertiesDeserializer(item["properties"]),
  };
}

/** An alert status properties. */
export interface MetricAlertApiMetricAlertStatusProperties {
  /** An object describing the type of the dimensions. */
  dimensions?: Record<string, string>;
  /** Status value */
  status?: string;
  /** UTC time when the status was checked. */
  timestamp?: Date;
}

export function metricAlertApiMetricAlertStatusPropertiesDeserializer(
  item: any,
): MetricAlertApiMetricAlertStatusProperties {
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

export function _metricAlertResourcePropertiesSerializer(
  item: MetricAlertApiMetricAlertResource,
): any {
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
    criteria: metricAlertApiMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : metricAlertApiResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertApiMetricAlertActionArraySerializer(item["actions"]),
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
    criteria: metricAlertApiMetricAlertCriteriaUnionDeserializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : metricAlertApiResolveConfigurationDeserializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertApiMetricAlertActionArrayDeserializer(item["actions"]),
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

export function _metricAlertResourcePatchPropertiesSerializer(
  item: MetricAlertApiMetricAlertResourcePatch,
): any {
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
      : metricAlertApiMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : metricAlertApiResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : metricAlertApiMetricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}
