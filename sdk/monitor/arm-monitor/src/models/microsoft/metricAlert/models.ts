// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../../../static-helpers/serialization/serialize-record.js";
import type { TrackedResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The metric alert resource. */
export interface MicrosoftMetricAlertMetricAlertResource extends TrackedResource {
  /** The identity of the resource. */
  identity?: MicrosoftMetricAlertIdentity;
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
  criteria: MicrosoftMetricAlertMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MicrosoftMetricAlertResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MicrosoftMetricAlertMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function microsoftMetricAlertMetricAlertResourceSerializer(
  item: MicrosoftMetricAlertMetricAlertResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _metricAlertResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftMetricAlertIdentitySerializer(item["identity"]),
  };
}

export function microsoftMetricAlertMetricAlertResourceDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertResource {
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
      : microsoftMetricAlertIdentityDeserializer(item["identity"]),
  };
}

/** An alert rule. */
export interface MicrosoftMetricAlertMetricAlertProperties {
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
  criteria: MicrosoftMetricAlertMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MicrosoftMetricAlertResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MicrosoftMetricAlertMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function microsoftMetricAlertMetricAlertPropertiesSerializer(
  item: MicrosoftMetricAlertMetricAlertProperties,
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
    criteria: microsoftMetricAlertMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftMetricAlertResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftMetricAlertMetricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function microsoftMetricAlertMetricAlertPropertiesDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertProperties {
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
    criteria: microsoftMetricAlertMetricAlertCriteriaUnionDeserializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftMetricAlertResolveConfigurationDeserializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftMetricAlertMetricAlertActionArrayDeserializer(item["actions"]),
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
export interface MicrosoftMetricAlertMetricAlertCriteria {
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria, Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria, Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria, Microsoft.Azure.Monitor.PromQLCriteria */
  odataType: MicrosoftMetricAlertOdatatype;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function microsoftMetricAlertMetricAlertCriteriaSerializer(
  item: MicrosoftMetricAlertMetricAlertCriteria,
): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), "odata.type": item["odataType"] };
}

export function microsoftMetricAlertMetricAlertCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type"]),
    odataType: item["odata.type"],
  };
}

/** Alias for MicrosoftMetricAlertMetricAlertCriteriaUnion */
export type MicrosoftMetricAlertMetricAlertCriteriaUnion =
  | MicrosoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteria
  | MicrosoftMetricAlertWebtestLocationAvailabilityCriteria
  | MicrosoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteria
  | MicrosoftMetricAlertPromQLCriteria
  | MicrosoftMetricAlertMetricAlertCriteria;

export function microsoftMetricAlertMetricAlertCriteriaUnionSerializer(
  item: MicrosoftMetricAlertMetricAlertCriteriaUnion,
): any {
  switch (item.odataType) {
    case "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria":
      return microsoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteriaSerializer(
        item as MicrosoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria":
      return microsoftMetricAlertWebtestLocationAvailabilityCriteriaSerializer(
        item as MicrosoftMetricAlertWebtestLocationAvailabilityCriteria,
      );

    case "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria":
      return microsoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteriaSerializer(
        item as MicrosoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.PromQLCriteria":
      return microsoftMetricAlertPromQLCriteriaSerializer(
        item as MicrosoftMetricAlertPromQLCriteria,
      );

    default:
      return microsoftMetricAlertMetricAlertCriteriaSerializer(item);
  }
}

export function microsoftMetricAlertMetricAlertCriteriaUnionDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertCriteriaUnion {
  switch (item["odata.type"]) {
    case "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria":
      return microsoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteriaDeserializer(
        item as MicrosoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria":
      return microsoftMetricAlertWebtestLocationAvailabilityCriteriaDeserializer(
        item as MicrosoftMetricAlertWebtestLocationAvailabilityCriteria,
      );

    case "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria":
      return microsoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteriaDeserializer(
        item as MicrosoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteria,
      );

    case "Microsoft.Azure.Monitor.PromQLCriteria":
      return microsoftMetricAlertPromQLCriteriaDeserializer(
        item as MicrosoftMetricAlertPromQLCriteria,
      );

    default:
      return microsoftMetricAlertMetricAlertCriteriaDeserializer(item);
  }
}

/** Specifies the type of the alert criteria. Previously undocumented values might be returned */
export enum KnownMicrosoftMetricAlertOdatatype {
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
 * {@link KnownMicrosoftMetricAlertOdatatype} can be used interchangeably with MicrosoftMetricAlertOdatatype,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria**: Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria \
 * **Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria**: Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria \
 * **Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria**: Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria \
 * **Microsoft.Azure.Monitor.PromQLCriteria**: Microsoft.Azure.Monitor.PromQLCriteria
 */
export type MicrosoftMetricAlertOdatatype = string;

/** Specifies the metric alert criteria for a single resource that has multiple metric criteria. */
export interface MicrosoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteria extends MicrosoftMetricAlertMetricAlertCriteria {
  /** The list of metric criteria for this 'all of' operation. */
  allOf?: MicrosoftMetricAlertMetricCriteria[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria";
}

export function microsoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteriaSerializer(
  item: MicrosoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftMetricAlertMetricCriteriaArraySerializer(item["allOf"]),
  };
}

export function microsoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertSingleResourceMultipleMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "allOf"]),
    odataType: item["odata.type"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftMetricAlertMetricCriteriaArrayDeserializer(item["allOf"]),
  };
}

export function microsoftMetricAlertMetricCriteriaArraySerializer(
  result: Array<MicrosoftMetricAlertMetricCriteria>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricCriteriaSerializer(item);
  });
}

export function microsoftMetricAlertMetricCriteriaArrayDeserializer(
  result: Array<MicrosoftMetricAlertMetricCriteria>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricCriteriaDeserializer(item);
  });
}

/** Criterion to filter metrics. */
export interface MicrosoftMetricAlertMetricCriteria extends MicrosoftMetricAlertMultiMetricCriteria {
  /** The criteria operator. Previously undocumented values might be returned */
  operator: MicrosoftMetricAlertOperator;
  /** The criteria threshold value that activates the alert. */
  threshold: number;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "StaticThresholdCriterion";
}

export function microsoftMetricAlertMetricCriteriaSerializer(
  item: MicrosoftMetricAlertMetricCriteria,
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
      : microsoftMetricAlertMetricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

export function microsoftMetricAlertMetricCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertMetricCriteria {
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
      : microsoftMetricAlertMetricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    threshold: item["threshold"],
  };
}

/** The criteria operator. Previously undocumented values might be returned */
export enum KnownMicrosoftMetricAlertOperator {
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
 * {@link KnownMicrosoftMetricAlertOperator} can be used interchangeably with MicrosoftMetricAlertOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **GreaterThan**: GreaterThan \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **LessThan**: LessThan \
 * **LessThanOrEqual**: LessThanOrEqual
 */
export type MicrosoftMetricAlertOperator = string;

/** Specifies the metric alert rule criteria for a web test resource. */
export interface MicrosoftMetricAlertWebtestLocationAvailabilityCriteria extends MicrosoftMetricAlertMetricAlertCriteria {
  /** The Application Insights web test Id. */
  webTestId: string;
  /** The Application Insights resource Id. */
  componentId: string;
  /** The number of failed locations. */
  failedLocationCount: number;
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria";
}

export function microsoftMetricAlertWebtestLocationAvailabilityCriteriaSerializer(
  item: MicrosoftMetricAlertWebtestLocationAvailabilityCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    webTestId: item["webTestId"],
    componentId: item["componentId"],
    failedLocationCount: item["failedLocationCount"],
  };
}

export function microsoftMetricAlertWebtestLocationAvailabilityCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertWebtestLocationAvailabilityCriteria {
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
export interface MicrosoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteria extends MicrosoftMetricAlertMetricAlertCriteria {
  /** The list of multiple metric criteria for this 'all of' operation. */
  allOf?: MicrosoftMetricAlertMultiMetricCriteriaUnion[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria";
}

export function microsoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteriaSerializer(
  item: MicrosoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftMetricAlertMultiMetricCriteriaUnionArraySerializer(item["allOf"]),
  };
}

export function microsoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertMultipleResourceMultipleMetricCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "allOf"]),
    odataType: item["odata.type"],
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftMetricAlertMultiMetricCriteriaUnionArrayDeserializer(item["allOf"]),
  };
}

export function microsoftMetricAlertMultiMetricCriteriaUnionArraySerializer(
  result: Array<MicrosoftMetricAlertMultiMetricCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMultiMetricCriteriaUnionSerializer(item);
  });
}

export function microsoftMetricAlertMultiMetricCriteriaUnionArrayDeserializer(
  result: Array<MicrosoftMetricAlertMultiMetricCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMultiMetricCriteriaUnionDeserializer(item);
  });
}

/** The types of conditions for a multi resource alert. */
export interface MicrosoftMetricAlertMultiMetricCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: StaticThresholdCriterion, DynamicThresholdCriterion */
  criterionType: MicrosoftMetricAlertCriterionType;
  /** Name of the criteria. */
  name: string;
  /** Name of the metric. */
  metricName: string;
  /** Namespace of the metric. */
  metricNamespace?: string;
  /** The criteria time aggregation types. Previously undocumented values might be returned */
  timeAggregation: MicrosoftMetricAlertAggregationTypeEnum;
  /** List of dimension conditions. */
  dimensions?: MicrosoftMetricAlertMetricDimension[];
  /** Allows creating an alert rule on a custom metric that isn't yet emitted, by causing the metric validation to be skipped. */
  skipMetricValidation?: boolean;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function microsoftMetricAlertMultiMetricCriteriaSerializer(
  item: MicrosoftMetricAlertMultiMetricCriteria,
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
      : microsoftMetricAlertMetricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
  };
}

export function microsoftMetricAlertMultiMetricCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertMultiMetricCriteria {
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
      : microsoftMetricAlertMetricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
  };
}

/** Alias for MicrosoftMetricAlertMultiMetricCriteriaUnion */
export type MicrosoftMetricAlertMultiMetricCriteriaUnion =
  | MicrosoftMetricAlertMetricCriteria
  | MicrosoftMetricAlertDynamicMetricCriteria
  | MicrosoftMetricAlertMultiMetricCriteria;

export function microsoftMetricAlertMultiMetricCriteriaUnionSerializer(
  item: MicrosoftMetricAlertMultiMetricCriteriaUnion,
): any {
  switch (item.criterionType) {
    case "StaticThresholdCriterion":
      return microsoftMetricAlertMetricCriteriaSerializer(
        item as MicrosoftMetricAlertMetricCriteria,
      );

    case "DynamicThresholdCriterion":
      return microsoftMetricAlertDynamicMetricCriteriaSerializer(
        item as MicrosoftMetricAlertDynamicMetricCriteria,
      );

    default:
      return microsoftMetricAlertMultiMetricCriteriaSerializer(item);
  }
}

export function microsoftMetricAlertMultiMetricCriteriaUnionDeserializer(
  item: any,
): MicrosoftMetricAlertMultiMetricCriteriaUnion {
  switch (item["criterionType"]) {
    case "StaticThresholdCriterion":
      return microsoftMetricAlertMetricCriteriaDeserializer(
        item as MicrosoftMetricAlertMetricCriteria,
      );

    case "DynamicThresholdCriterion":
      return microsoftMetricAlertDynamicMetricCriteriaDeserializer(
        item as MicrosoftMetricAlertDynamicMetricCriteria,
      );

    default:
      return microsoftMetricAlertMultiMetricCriteriaDeserializer(item);
  }
}

/** Specifies the type of threshold criteria. Previously undocumented values might be returned */
export enum KnownMicrosoftMetricAlertCriterionType {
  /** StaticThresholdCriterion */
  StaticThresholdCriterion = "StaticThresholdCriterion",
  /** DynamicThresholdCriterion */
  DynamicThresholdCriterion = "DynamicThresholdCriterion",
}

/**
 * Specifies the type of threshold criteria. Previously undocumented values might be returned \
 * {@link KnownMicrosoftMetricAlertCriterionType} can be used interchangeably with MicrosoftMetricAlertCriterionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StaticThresholdCriterion**: StaticThresholdCriterion \
 * **DynamicThresholdCriterion**: DynamicThresholdCriterion
 */
export type MicrosoftMetricAlertCriterionType = string;

/** The criteria time aggregation types. Previously undocumented values might be returned */
export enum KnownMicrosoftMetricAlertAggregationTypeEnum {
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
 * {@link KnownMicrosoftMetricAlertAggregationTypeEnum} can be used interchangeably with MicrosoftMetricAlertAggregationTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Average**: Average \
 * **Count**: Count \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type MicrosoftMetricAlertAggregationTypeEnum = string;

export function microsoftMetricAlertMetricDimensionArraySerializer(
  result: Array<MicrosoftMetricAlertMetricDimension>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricDimensionSerializer(item);
  });
}

export function microsoftMetricAlertMetricDimensionArrayDeserializer(
  result: Array<MicrosoftMetricAlertMetricDimension>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricDimensionDeserializer(item);
  });
}

/** Specifies a metric dimension. */
export interface MicrosoftMetricAlertMetricDimension {
  /** Name of the dimension. */
  name: string;
  /** The dimension operator. Only 'Include' and 'Exclude' are supported */
  operator: string;
  /** List of dimension values. */
  values: string[];
}

export function microsoftMetricAlertMetricDimensionSerializer(
  item: MicrosoftMetricAlertMetricDimension,
): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function microsoftMetricAlertMetricDimensionDeserializer(
  item: any,
): MicrosoftMetricAlertMetricDimension {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Criterion for dynamic threshold. */
export interface MicrosoftMetricAlertDynamicMetricCriteria extends MicrosoftMetricAlertMultiMetricCriteria {
  /** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
  operator: MicrosoftMetricAlertDynamicThresholdOperator;
  /** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
  alertSensitivity: MicrosoftMetricAlertDynamicThresholdSensitivity;
  /** The minimum number of violations required within the selected lookback time window required to raise an alert. */
  failingPeriods: MicrosoftMetricAlertDynamicThresholdFailingPeriods;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format) */
  ignoreDataBefore?: Date;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "DynamicThresholdCriterion";
}

export function microsoftMetricAlertDynamicMetricCriteriaSerializer(
  item: MicrosoftMetricAlertDynamicMetricCriteria,
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
      : microsoftMetricAlertMetricDimensionArraySerializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    failingPeriods: microsoftMetricAlertDynamicThresholdFailingPeriodsSerializer(
      item["failingPeriods"],
    ),
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : item["ignoreDataBefore"].toISOString(),
  };
}

export function microsoftMetricAlertDynamicMetricCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertDynamicMetricCriteria {
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
      : microsoftMetricAlertMetricDimensionArrayDeserializer(item["dimensions"]),
    skipMetricValidation: item["skipMetricValidation"],
    operator: item["operator"],
    alertSensitivity: item["alertSensitivity"],
    failingPeriods: microsoftMetricAlertDynamicThresholdFailingPeriodsDeserializer(
      item["failingPeriods"],
    ),
    ignoreDataBefore: !item["ignoreDataBefore"]
      ? item["ignoreDataBefore"]
      : new Date(item["ignoreDataBefore"]),
  };
}

/** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
export enum KnownMicrosoftMetricAlertDynamicThresholdOperator {
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** LessThan */
  LessThan = "LessThan",
  /** GreaterOrLessThan */
  GreaterOrLessThan = "GreaterOrLessThan",
}

/**
 * The operator used to compare the metric value against the threshold. Previously undocumented values might be returned \
 * {@link KnownMicrosoftMetricAlertDynamicThresholdOperator} can be used interchangeably with MicrosoftMetricAlertDynamicThresholdOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GreaterThan**: GreaterThan \
 * **LessThan**: LessThan \
 * **GreaterOrLessThan**: GreaterOrLessThan
 */
export type MicrosoftMetricAlertDynamicThresholdOperator = string;

/** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
export enum KnownMicrosoftMetricAlertDynamicThresholdSensitivity {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned \
 * {@link KnownMicrosoftMetricAlertDynamicThresholdSensitivity} can be used interchangeably with MicrosoftMetricAlertDynamicThresholdSensitivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type MicrosoftMetricAlertDynamicThresholdSensitivity = string;

/** The minimum number of violations required within the selected lookback time window required to raise an alert. */
export interface MicrosoftMetricAlertDynamicThresholdFailingPeriods {
  /** The number of aggregated lookback points. The lookback time window is calculated based on the aggregation granularity (windowSize) and the selected number of aggregated points. */
  numberOfEvaluationPeriods: number;
  /** The number of violations to trigger an alert. Should be smaller or equal to numberOfEvaluationPeriods. */
  minFailingPeriodsToAlert: number;
}

export function microsoftMetricAlertDynamicThresholdFailingPeriodsSerializer(
  item: MicrosoftMetricAlertDynamicThresholdFailingPeriods,
): any {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

export function microsoftMetricAlertDynamicThresholdFailingPeriodsDeserializer(
  item: any,
): MicrosoftMetricAlertDynamicThresholdFailingPeriods {
  return {
    numberOfEvaluationPeriods: item["numberOfEvaluationPeriods"],
    minFailingPeriodsToAlert: item["minFailingPeriodsToAlert"],
  };
}

/** Specifies the PromQL criteria for the metric alert resource. */
export interface MicrosoftMetricAlertPromQLCriteria extends MicrosoftMetricAlertMetricAlertCriteria {
  /** Configuration for failing periods in query-based alerts. */
  failingPeriods?: MicrosoftMetricAlertQueryFailingPeriods;
  /** The list of promQL criteria. Alert will be raised when all conditions are met. */
  allOf?: MicrosoftMetricAlertMultiPromQLCriteriaUnion[];
  /** Specifies the type of the alert criteria. Previously undocumented values might be returned */
  odataType: "Microsoft.Azure.Monitor.PromQLCriteria";
}

export function microsoftMetricAlertPromQLCriteriaSerializer(
  item: MicrosoftMetricAlertPromQLCriteria,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    "odata.type": item["odataType"],
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : microsoftMetricAlertQueryFailingPeriodsSerializer(item["failingPeriods"]),
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftMetricAlertMultiPromQLCriteriaUnionArraySerializer(item["allOf"]),
  };
}

export function microsoftMetricAlertPromQLCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertPromQLCriteria {
  return {
    additionalProperties: serializeRecord(item, ["odata.type", "failingPeriods", "allOf"]),
    odataType: item["odata.type"],
    failingPeriods: !item["failingPeriods"]
      ? item["failingPeriods"]
      : microsoftMetricAlertQueryFailingPeriodsDeserializer(item["failingPeriods"]),
    allOf: !item["allOf"]
      ? item["allOf"]
      : microsoftMetricAlertMultiPromQLCriteriaUnionArrayDeserializer(item["allOf"]),
  };
}

/** Configuration for failing periods in query-based alerts. */
export interface MicrosoftMetricAlertQueryFailingPeriods {
  /** The amount of time (in ISO 8601 duration format) alert must be active before firing. */
  for: string;
}

export function microsoftMetricAlertQueryFailingPeriodsSerializer(
  item: MicrosoftMetricAlertQueryFailingPeriods,
): any {
  return { for: item["for"] };
}

export function microsoftMetricAlertQueryFailingPeriodsDeserializer(
  item: any,
): MicrosoftMetricAlertQueryFailingPeriods {
  return {
    for: item["for"],
  };
}

export function microsoftMetricAlertMultiPromQLCriteriaUnionArraySerializer(
  result: Array<MicrosoftMetricAlertMultiPromQLCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMultiPromQLCriteriaUnionSerializer(item);
  });
}

export function microsoftMetricAlertMultiPromQLCriteriaUnionArrayDeserializer(
  result: Array<MicrosoftMetricAlertMultiPromQLCriteriaUnion>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMultiPromQLCriteriaUnionDeserializer(item);
  });
}

/** The types of conditions for a multi query metric alert. */
export interface MicrosoftMetricAlertMultiPromQLCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  /** The discriminator possible values: StaticThresholdCriterion, DynamicThresholdCriterion */
  criterionType: MicrosoftMetricAlertCriterionType;
  /** Name of the criteria. */
  name: string;
  /** The query used to evaluate the alert rule */
  query: string;
}

export function microsoftMetricAlertMultiPromQLCriteriaSerializer(
  item: MicrosoftMetricAlertMultiPromQLCriteria,
): any {
  return { criterionType: item["criterionType"], name: item["name"], query: item["query"] };
}

export function microsoftMetricAlertMultiPromQLCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertMultiPromQLCriteria {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
  };
}

/** Alias for MicrosoftMetricAlertMultiPromQLCriteriaUnion */
export type MicrosoftMetricAlertMultiPromQLCriteriaUnion =
  | MicrosoftMetricAlertStaticPromQLCriteria
  | MicrosoftMetricAlertDynamicPromQLCriteria
  | MicrosoftMetricAlertMultiPromQLCriteria;

export function microsoftMetricAlertMultiPromQLCriteriaUnionSerializer(
  item: MicrosoftMetricAlertMultiPromQLCriteriaUnion,
): any {
  switch (item.criterionType) {
    case "StaticThresholdCriterion":
      return microsoftMetricAlertStaticPromQLCriteriaSerializer(
        item as MicrosoftMetricAlertStaticPromQLCriteria,
      );

    case "DynamicThresholdCriterion":
      return microsoftMetricAlertDynamicPromQLCriteriaSerializer(
        item as MicrosoftMetricAlertDynamicPromQLCriteria,
      );

    default:
      return microsoftMetricAlertMultiPromQLCriteriaSerializer(item);
  }
}

export function microsoftMetricAlertMultiPromQLCriteriaUnionDeserializer(
  item: any,
): MicrosoftMetricAlertMultiPromQLCriteriaUnion {
  switch (item["criterionType"]) {
    case "StaticThresholdCriterion":
      return microsoftMetricAlertStaticPromQLCriteriaDeserializer(
        item as MicrosoftMetricAlertStaticPromQLCriteria,
      );

    case "DynamicThresholdCriterion":
      return microsoftMetricAlertDynamicPromQLCriteriaDeserializer(
        item as MicrosoftMetricAlertDynamicPromQLCriteria,
      );

    default:
      return microsoftMetricAlertMultiPromQLCriteriaDeserializer(item);
  }
}

/** The criterion for static prom query. */
export interface MicrosoftMetricAlertStaticPromQLCriteria extends MicrosoftMetricAlertMultiPromQLCriteria {
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "StaticThresholdCriterion";
}

export function microsoftMetricAlertStaticPromQLCriteriaSerializer(
  item: MicrosoftMetricAlertStaticPromQLCriteria,
): any {
  return { criterionType: item["criterionType"], name: item["name"], query: item["query"] };
}

export function microsoftMetricAlertStaticPromQLCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertStaticPromQLCriteria {
  return {
    criterionType: item["criterionType"],
    name: item["name"],
    query: item["query"],
  };
}

/** The criterion for dynamic prom query. */
export interface MicrosoftMetricAlertDynamicPromQLCriteria extends MicrosoftMetricAlertMultiPromQLCriteria {
  /** The operator used to compare the metric value against the threshold. Previously undocumented values might be returned */
  operator: MicrosoftMetricAlertDynamicThresholdOperator;
  /** The extent of deviation required to trigger an alert. This will affect how tight the threshold is to the metric series pattern. Previously undocumented values might be returned */
  alertSensitivity: MicrosoftMetricAlertDynamicThresholdSensitivity;
  /** Use this option to set the date from which to start learning the metric historical data and calculate the dynamic thresholds (in ISO8601 format) */
  ignoreDataBefore?: Date;
  /** Specifies the type of threshold criteria. Previously undocumented values might be returned */
  criterionType: "DynamicThresholdCriterion";
}

export function microsoftMetricAlertDynamicPromQLCriteriaSerializer(
  item: MicrosoftMetricAlertDynamicPromQLCriteria,
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

export function microsoftMetricAlertDynamicPromQLCriteriaDeserializer(
  item: any,
): MicrosoftMetricAlertDynamicPromQLCriteria {
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

/** model interface MicrosoftMetricAlertResolveConfiguration */
export interface MicrosoftMetricAlertResolveConfiguration {
  /** Indicates whether the alert should be auto resolved */
  autoResolved: boolean;
  /** The time (in ISO 8601 duration format) after which the alert should be auto resolved */
  timeToResolve?: string;
}

export function microsoftMetricAlertResolveConfigurationSerializer(
  item: MicrosoftMetricAlertResolveConfiguration,
): any {
  return { autoResolved: item["autoResolved"], timeToResolve: item["timeToResolve"] };
}

export function microsoftMetricAlertResolveConfigurationDeserializer(
  item: any,
): MicrosoftMetricAlertResolveConfiguration {
  return {
    autoResolved: item["autoResolved"],
    timeToResolve: item["timeToResolve"],
  };
}

export function microsoftMetricAlertMetricAlertActionArraySerializer(
  result: Array<MicrosoftMetricAlertMetricAlertAction>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricAlertActionSerializer(item);
  });
}

export function microsoftMetricAlertMetricAlertActionArrayDeserializer(
  result: Array<MicrosoftMetricAlertMetricAlertAction>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricAlertActionDeserializer(item);
  });
}

/** An alert action. */
export interface MicrosoftMetricAlertMetricAlertAction {
  /** The id of the action group to use. */
  actionGroupId?: string;
  /** This field allows specifying custom properties, which would be appended to the alert payload sent as input to the webhook. */
  webHookProperties?: Record<string, string>;
}

export function microsoftMetricAlertMetricAlertActionSerializer(
  item: MicrosoftMetricAlertMetricAlertAction,
): any {
  return { actionGroupId: item["actionGroupId"], webHookProperties: item["webHookProperties"] };
}

export function microsoftMetricAlertMetricAlertActionDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertAction {
  return {
    actionGroupId: item["actionGroupId"],
    webHookProperties: !item["webHookProperties"]
      ? item["webHookProperties"]
      : Object.fromEntries(
          Object.entries(item["webHookProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Identity for the resource. */
export interface MicrosoftMetricAlertIdentity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** Type of managed service identity. Previously undocumented values might be returned */
  type: MicrosoftMetricAlertIdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be Azure resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, MicrosoftMetricAlertUserIdentityProperties>;
}

export function microsoftMetricAlertIdentitySerializer(item: MicrosoftMetricAlertIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : microsoftMetricAlertUserIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function microsoftMetricAlertIdentityDeserializer(item: any): MicrosoftMetricAlertIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : microsoftMetricAlertUserIdentityPropertiesRecordDeserializer(
          item["userAssignedIdentities"],
        ),
  };
}

/** Type of managed service identity. Previously undocumented values might be returned */
export type MicrosoftMetricAlertIdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function microsoftMetricAlertUserIdentityPropertiesRecordSerializer(
  item: Record<string, MicrosoftMetricAlertUserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftMetricAlertUserIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function microsoftMetricAlertUserIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, MicrosoftMetricAlertUserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftMetricAlertUserIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** Properties of the user assigned identity. */
export interface MicrosoftMetricAlertUserIdentityProperties {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The client ID of resource identity. */
  readonly clientId?: string;
}

export function microsoftMetricAlertUserIdentityPropertiesSerializer(
  _item: MicrosoftMetricAlertUserIdentityProperties,
): any {
  return {};
}

export function microsoftMetricAlertUserIdentityPropertiesDeserializer(
  item: any,
): MicrosoftMetricAlertUserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Describes the format of Error response. */
export interface MicrosoftMetricAlertErrorResponse {
  error?: MicrosoftMetricAlertErrorResponseError;
}

export function microsoftMetricAlertErrorResponseDeserializer(
  item: any,
): MicrosoftMetricAlertErrorResponse {
  return {
    error: !item["error"]
      ? item["error"]
      : microsoftMetricAlertErrorResponseErrorDeserializer(item["error"]),
  };
}

/** model interface MicrosoftMetricAlertErrorResponseError */
export interface MicrosoftMetricAlertErrorResponseError {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. If Accept-Language is set in the request, it must be localized to that language. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of additional nested error response info objects, as described by this contract. */
  details?: MicrosoftMetricAlertErrorDetail[];
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: MicrosoftMetricAlertErrorResponseErrorAdditionalInfoItem[];
}

export function microsoftMetricAlertErrorResponseErrorDeserializer(
  item: any,
): MicrosoftMetricAlertErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : microsoftMetricAlertErrorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : microsoftMetricAlertErrorResponseErrorAdditionalInfoItemArrayDeserializer(
          item["additionalInfo"],
        ),
  };
}

export function microsoftMetricAlertErrorDetailArrayDeserializer(
  result: Array<MicrosoftMetricAlertErrorDetail>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertErrorDetailDeserializer(item);
  });
}

/** Describes details of an error response. */
export interface MicrosoftMetricAlertErrorDetail {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: MicrosoftMetricAlertErrorDetailAdditionalInfoItem[];
}

export function microsoftMetricAlertErrorDetailDeserializer(
  item: any,
): MicrosoftMetricAlertErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : microsoftMetricAlertErrorDetailAdditionalInfoItemArrayDeserializer(item["additionalInfo"]),
  };
}

export function microsoftMetricAlertErrorDetailAdditionalInfoItemArrayDeserializer(
  result: Array<MicrosoftMetricAlertErrorDetailAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertErrorDetailAdditionalInfoItemDeserializer(item);
  });
}

/** model interface MicrosoftMetricAlertErrorDetailAdditionalInfoItem */
export interface MicrosoftMetricAlertErrorDetailAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function microsoftMetricAlertErrorDetailAdditionalInfoItemDeserializer(
  item: any,
): MicrosoftMetricAlertErrorDetailAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function microsoftMetricAlertErrorResponseErrorAdditionalInfoItemArrayDeserializer(
  result: Array<MicrosoftMetricAlertErrorResponseErrorAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertErrorResponseErrorAdditionalInfoItemDeserializer(item);
  });
}

/** model interface MicrosoftMetricAlertErrorResponseErrorAdditionalInfoItem */
export interface MicrosoftMetricAlertErrorResponseErrorAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function microsoftMetricAlertErrorResponseErrorAdditionalInfoItemDeserializer(
  item: any,
): MicrosoftMetricAlertErrorResponseErrorAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The metric alert resource for patch operations. */
export interface MicrosoftMetricAlertMetricAlertResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The identity of the resource. */
  identity?: MicrosoftMetricAlertIdentity;
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
  criteria?: MicrosoftMetricAlertMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MicrosoftMetricAlertResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MicrosoftMetricAlertMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function microsoftMetricAlertMetricAlertResourcePatchSerializer(
  item: MicrosoftMetricAlertMetricAlertResourcePatch,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : microsoftMetricAlertIdentitySerializer(item["identity"]),
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
export interface MicrosoftMetricAlertMetricAlertPropertiesPatch {
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
  criteria?: MicrosoftMetricAlertMetricAlertCriteriaUnion;
  /** The flag that indicates whether the alert should be auto resolved or not. The default is true. */
  autoMitigate?: boolean;
  /** The configuration for how the alert is resolved. Applicable for PromQLCriteria. */
  resolveConfiguration?: MicrosoftMetricAlertResolveConfiguration;
  /** The array of actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: MicrosoftMetricAlertMetricAlertAction[];
  /** Last time the rule was updated in ISO8601 format. */
  readonly lastUpdatedTime?: Date;
  /** The value indicating whether this alert rule is migrated. */
  readonly isMigrated?: boolean;
  /** The properties of an alert payload. */
  customProperties?: Record<string, string>;
  /** The properties of an action properties. */
  actionProperties?: Record<string, string>;
}

export function microsoftMetricAlertMetricAlertPropertiesPatchSerializer(
  item: MicrosoftMetricAlertMetricAlertPropertiesPatch,
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
      : microsoftMetricAlertMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftMetricAlertResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftMetricAlertMetricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}

/** Represents a collection of alert rule resources. */
export interface _MicrosoftMetricAlertMetricAlertResourceCollection {
  /** The values for the alert rule resources. */
  value?: MicrosoftMetricAlertMetricAlertResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _microsoftMetricAlertMetricAlertResourceCollectionDeserializer(
  item: any,
): _MicrosoftMetricAlertMetricAlertResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : microsoftMetricAlertMetricAlertResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftMetricAlertMetricAlertResourceArraySerializer(
  result: Array<MicrosoftMetricAlertMetricAlertResource>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricAlertResourceSerializer(item);
  });
}

export function microsoftMetricAlertMetricAlertResourceArrayDeserializer(
  result: Array<MicrosoftMetricAlertMetricAlertResource>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricAlertResourceDeserializer(item);
  });
}

/** Represents a collection of alert rule resources. */
export interface _MicrosoftMetricAlertMetricAlertStatusCollection {
  /** The values for the alert rule resources. */
  value?: MicrosoftMetricAlertMetricAlertStatus[];
}

export function _microsoftMetricAlertMetricAlertStatusCollectionDeserializer(
  item: any,
): _MicrosoftMetricAlertMetricAlertStatusCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : microsoftMetricAlertMetricAlertStatusArrayDeserializer(item["value"]),
  };
}

export function microsoftMetricAlertMetricAlertStatusArrayDeserializer(
  result: Array<MicrosoftMetricAlertMetricAlertStatus>,
): any[] {
  return result.map((item) => {
    return microsoftMetricAlertMetricAlertStatusDeserializer(item);
  });
}

/** An alert status. */
export interface MicrosoftMetricAlertMetricAlertStatus {
  /** The status name. */
  name?: string;
  /** The alert rule arm id. */
  id?: string;
  /** The extended resource type name. */
  type?: string;
  /** The alert status properties of the metric alert status. */
  properties?: MicrosoftMetricAlertMetricAlertStatusProperties;
}

export function microsoftMetricAlertMetricAlertStatusDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertStatus {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : microsoftMetricAlertMetricAlertStatusPropertiesDeserializer(item["properties"]),
  };
}

/** An alert status properties. */
export interface MicrosoftMetricAlertMetricAlertStatusProperties {
  /** An object describing the type of the dimensions. */
  dimensions?: Record<string, string>;
  /** Status value */
  status?: string;
  /** UTC time when the status was checked. */
  timestamp?: Date;
}

export function microsoftMetricAlertMetricAlertStatusPropertiesDeserializer(
  item: any,
): MicrosoftMetricAlertMetricAlertStatusProperties {
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
  item: MicrosoftMetricAlertMetricAlertResource,
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
    criteria: microsoftMetricAlertMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftMetricAlertResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftMetricAlertMetricAlertActionArraySerializer(item["actions"]),
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
    criteria: microsoftMetricAlertMetricAlertCriteriaUnionDeserializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftMetricAlertResolveConfigurationDeserializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftMetricAlertMetricAlertActionArrayDeserializer(item["actions"]),
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
  item: MicrosoftMetricAlertMetricAlertResourcePatch,
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
      : microsoftMetricAlertMetricAlertCriteriaUnionSerializer(item["criteria"]),
    autoMitigate: item["autoMitigate"],
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : microsoftMetricAlertResolveConfigurationSerializer(item["resolveConfiguration"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftMetricAlertMetricAlertActionArraySerializer(item["actions"]),
    customProperties: item["customProperties"],
    actionProperties: item["actionProperties"],
  };
}
