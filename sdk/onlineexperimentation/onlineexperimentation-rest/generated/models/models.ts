// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Defines experiment metric metadata and computation details. */
export interface ExperimentMetric {
  /** Identifier for this experiment metric. Must start with a lowercase letter and contain only lowercase letters, numbers, and underscores. */
  readonly id: string;
  /** Determines whether it is included in experiment analysis. */
  lifecycle: LifecycleStage;
  /** A user-friendly display name for the experiment metric shown in reports and dashboards. */
  displayName: string;
  /** A detailed description of the experiment metric. */
  description: string;
  /** Categories associated with the experiment metric. Used for organizing and filtering metrics. */
  categories: string[];
  /** The desired direction for changes in the metric value. */
  desiredDirection: DesiredDirection;
  /** The metric definition specifying how the metric value is calculated from event data. */
  definition: ExperimentMetricDefinitionUnion;
  /** ETag of the experiment metric. */
  readonly eTag: string;
  /** The timestamp (UTC) of the last modification to the experiment metric resource. */
  readonly lastModifiedAt: Date;
}

export function experimentMetricSerializer(item: ExperimentMetric): any {
  return {
    lifecycle: item["lifecycle"],
    displayName: item["displayName"],
    description: item["description"],
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    desiredDirection: item["desiredDirection"],
    definition: experimentMetricDefinitionUnionSerializer(item["definition"]),
  };
}

export function experimentMetricDeserializer(item: any): ExperimentMetric {
  return {
    id: item["id"],
    lifecycle: item["lifecycle"],
    displayName: item["displayName"],
    description: item["description"],
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    desiredDirection: item["desiredDirection"],
    definition: experimentMetricDefinitionUnionDeserializer(item["definition"]),
    eTag: item["eTag"],
    lastModifiedAt: new Date(item["lastModifiedAt"]),
  };
}

/** Lifecycle stages of an experiment metric, determining whether the metric is included in experiment analysis. */
export type LifecycleStage = "Active" | "Inactive";
/** Desired direction for an experiment metric value. */
export type DesiredDirection = "Increase" | "Decrease" | "Neutral";

/** The metric definition, which determines how the metric value is calculated from event data. */
export interface ExperimentMetricDefinition {
  /** Discriminator property for ExperimentMetricDefinition. */
  /** The discriminator possible values: EventCount, UserCount, EventRate, UserRate, Sum, Average, Percentile */
  type: ExperimentMetricType;
}

export function experimentMetricDefinitionSerializer(item: ExperimentMetricDefinition): any {
  return { type: item["type"] };
}

export function experimentMetricDefinitionDeserializer(item: any): ExperimentMetricDefinition {
  return {
    type: item["type"],
  };
}

/** Alias for ExperimentMetricDefinitionUnion */
export type ExperimentMetricDefinitionUnion =
  | EventCountMetricDefinition
  | UserCountMetricDefinition
  | EventRateMetricDefinition
  | UserRateMetricDefinition
  | SumMetricDefinition
  | AverageMetricDefinition
  | PercentileMetricDefinition
  | ExperimentMetricDefinition;

export function experimentMetricDefinitionUnionSerializer(
  item: ExperimentMetricDefinitionUnion,
): any {
  switch (item.type) {
    case "EventCount":
      return eventCountMetricDefinitionSerializer(item as EventCountMetricDefinition);

    case "UserCount":
      return userCountMetricDefinitionSerializer(item as UserCountMetricDefinition);

    case "EventRate":
      return eventRateMetricDefinitionSerializer(item as EventRateMetricDefinition);

    case "UserRate":
      return userRateMetricDefinitionSerializer(item as UserRateMetricDefinition);

    case "Sum":
      return sumMetricDefinitionSerializer(item as SumMetricDefinition);

    case "Average":
      return averageMetricDefinitionSerializer(item as AverageMetricDefinition);

    case "Percentile":
      return percentileMetricDefinitionSerializer(item as PercentileMetricDefinition);

    default:
      return experimentMetricDefinitionSerializer(item);
  }
}

export function experimentMetricDefinitionUnionDeserializer(
  item: any,
): ExperimentMetricDefinitionUnion {
  switch (item["type"]) {
    case "EventCount":
      return eventCountMetricDefinitionDeserializer(item as EventCountMetricDefinition);

    case "UserCount":
      return userCountMetricDefinitionDeserializer(item as UserCountMetricDefinition);

    case "EventRate":
      return eventRateMetricDefinitionDeserializer(item as EventRateMetricDefinition);

    case "UserRate":
      return userRateMetricDefinitionDeserializer(item as UserRateMetricDefinition);

    case "Sum":
      return sumMetricDefinitionDeserializer(item as SumMetricDefinition);

    case "Average":
      return averageMetricDefinitionDeserializer(item as AverageMetricDefinition);

    case "Percentile":
      return percentileMetricDefinitionDeserializer(item as PercentileMetricDefinition);

    default:
      return experimentMetricDefinitionDeserializer(item);
  }
}

/** How the metric definition calculates metric values from event data. */
export type ExperimentMetricType =
  | "EventCount"
  | "UserCount"
  | "EventRate"
  | "UserRate"
  | "Sum"
  | "Average"
  | "Percentile";

/** The definition of an EventCount metric definition. Counts the occurrences of a specified event. */
export interface EventCountMetricDefinition extends ExperimentMetricDefinition {
  /** The type of metric. */
  type: "EventCount";
  /** Event to observe. */
  event: ObservedEvent;
}

export function eventCountMetricDefinitionSerializer(item: EventCountMetricDefinition): any {
  return { type: item["type"], event: observedEventSerializer(item["event"]) };
}

export function eventCountMetricDefinitionDeserializer(item: any): EventCountMetricDefinition {
  return {
    type: item["type"],
    event: observedEventDeserializer(item["event"]),
  };
}

/** An event observed by a metric. */
export interface ObservedEvent {
  /** The name of the event. */
  eventName: string;
  /** [Optional] A condition to filter events. */
  filter?: string;
}

export function observedEventSerializer(item: ObservedEvent): any {
  return { eventName: item["eventName"], filter: item["filter"] };
}

export function observedEventDeserializer(item: any): ObservedEvent {
  return {
    eventName: item["eventName"],
    filter: item["filter"],
  };
}

/** The definition of a UserCount metric definition. Counts unique users who encounter a specified event. */
export interface UserCountMetricDefinition extends ExperimentMetricDefinition {
  /** The type of metric. */
  type: "UserCount";
  /** Event to observe. */
  event: ObservedEvent;
}

export function userCountMetricDefinitionSerializer(item: UserCountMetricDefinition): any {
  return { type: item["type"], event: observedEventSerializer(item["event"]) };
}

export function userCountMetricDefinitionDeserializer(item: any): UserCountMetricDefinition {
  return {
    type: item["type"],
    event: observedEventDeserializer(item["event"]),
  };
}

/** The definition of an EventRate metric definition. Calculates the percentage of events satisfying a specified condition. */
export interface EventRateMetricDefinition extends ExperimentMetricDefinition {
  /** The type of metric. */
  type: "EventRate";
  /** Event to observe as the rate denominator. */
  event: ObservedEvent;
  /** The event contributes to the rate numerator if it satisfies this condition. */
  rateCondition: string;
}

export function eventRateMetricDefinitionSerializer(item: EventRateMetricDefinition): any {
  return {
    type: item["type"],
    event: observedEventSerializer(item["event"]),
    rateCondition: item["rateCondition"],
  };
}

export function eventRateMetricDefinitionDeserializer(item: any): EventRateMetricDefinition {
  return {
    type: item["type"],
    event: observedEventDeserializer(item["event"]),
    rateCondition: item["rateCondition"],
  };
}

/** The definition of a UserRate metric definition. Calculates the percentage of users who encounter a start event and subsequently an end event. Users must encounter events in the specified order. */
export interface UserRateMetricDefinition extends ExperimentMetricDefinition {
  /** The type of metric. */
  type: "UserRate";
  /** The start event to observe as the rate denominator. */
  startEvent: ObservedEvent;
  /** The end event to observe, which is a condition for the rate numerator. */
  endEvent: ObservedEvent;
}

export function userRateMetricDefinitionSerializer(item: UserRateMetricDefinition): any {
  return {
    type: item["type"],
    startEvent: observedEventSerializer(item["startEvent"]),
    endEvent: observedEventSerializer(item["endEvent"]),
  };
}

export function userRateMetricDefinitionDeserializer(item: any): UserRateMetricDefinition {
  return {
    type: item["type"],
    startEvent: observedEventDeserializer(item["startEvent"]),
    endEvent: observedEventDeserializer(item["endEvent"]),
  };
}

/** The definition of a Sum metric definition. Calculates the sum of a specified event property. Experiment analysis accounts for unequal traffic allocation. */
export interface SumMetricDefinition extends ExperimentMetricDefinition {
  /** The type of metric. */
  type: "Sum";
  /** The value to aggregate. */
  value: AggregatedValue;
}

export function sumMetricDefinitionSerializer(item: SumMetricDefinition): any {
  return { type: item["type"], value: aggregatedValueSerializer(item["value"]) };
}

export function sumMetricDefinitionDeserializer(item: any): SumMetricDefinition {
  return {
    type: item["type"],
    value: aggregatedValueDeserializer(item["value"]),
  };
}

/** An event property value aggregated by a metric. */
export interface AggregatedValue {
  /** The name of the event. */
  eventName: string;
  /** [Optional] A condition to filter events. */
  filter?: string;
  /** The key of the event property to aggregate. */
  eventProperty: string;
}

export function aggregatedValueSerializer(item: AggregatedValue): any {
  return {
    eventName: item["eventName"],
    filter: item["filter"],
    eventProperty: item["eventProperty"],
  };
}

export function aggregatedValueDeserializer(item: any): AggregatedValue {
  return {
    eventName: item["eventName"],
    filter: item["filter"],
    eventProperty: item["eventProperty"],
  };
}

/** The definition of an Average metric definition. Calculates the average value of a specified event property. */
export interface AverageMetricDefinition extends ExperimentMetricDefinition {
  /** The type of metric. */
  type: "Average";
  /** The value to aggregate. */
  value: AggregatedValue;
}

export function averageMetricDefinitionSerializer(item: AverageMetricDefinition): any {
  return { type: item["type"], value: aggregatedValueSerializer(item["value"]) };
}

export function averageMetricDefinitionDeserializer(item: any): AverageMetricDefinition {
  return {
    type: item["type"],
    value: aggregatedValueDeserializer(item["value"]),
  };
}

/** The definition of a Percentile metric definition. Calculates a specified percentile of an event property. */
export interface PercentileMetricDefinition extends ExperimentMetricDefinition {
  /** The type of metric. */
  type: "Percentile";
  /** The value to aggregate, including the event name and property to measure. */
  value: AggregatedValue;
  /** The percentile to measure. */
  percentile: number;
}

export function percentileMetricDefinitionSerializer(item: PercentileMetricDefinition): any {
  return {
    type: item["type"],
    value: aggregatedValueSerializer(item["value"]),
    percentile: item["percentile"],
  };
}

export function percentileMetricDefinitionDeserializer(item: any): PercentileMetricDefinition {
  return {
    type: item["type"],
    value: aggregatedValueDeserializer(item["value"]),
    percentile: item["percentile"],
  };
}

/** The result of validating an experiment metric. */
export interface ExperimentMetricValidationResult {
  /** Indicates whether the experiment metric is valid. */
  isValid: boolean;
  /** Diagnostic details from the validation process. */
  readonly diagnostics: DiagnosticDetail[];
}

export function experimentMetricValidationResultDeserializer(
  item: any,
): ExperimentMetricValidationResult {
  return {
    isValid: item["isValid"],
    diagnostics: diagnosticDetailArrayDeserializer(item["diagnostics"]),
  };
}

export function diagnosticDetailArrayDeserializer(result: Array<DiagnosticDetail>): any[] {
  return result.map((item) => {
    return diagnosticDetailDeserializer(item);
  });
}

/** Diagnostic details for validation errors. */
export interface DiagnosticDetail {
  /** A human-readable error message. */
  readonly message: string;
  /** The diagnostic error code. */
  readonly code: DiagnosticCode;
}

export function diagnosticDetailDeserializer(item: any): DiagnosticDetail {
  return {
    message: item["message"],
    code: item["code"],
  };
}

/** The diagnostic error codes. */
export type DiagnosticCode =
  | "FailedSchemaValidation"
  | "InvalidEventCondition"
  | "UnsupportedEventCondition"
  | "InvalidExperimentMetricDefinition";

/** Paged collection of ExperimentMetric items */
export interface _PagedExperimentMetric {
  /** The ExperimentMetric items on this page */
  value: ExperimentMetric[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedExperimentMetricDeserializer(item: any): _PagedExperimentMetric {
  return {
    value: experimentMetricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function experimentMetricArraySerializer(result: Array<ExperimentMetric>): any[] {
  return result.map((item) => {
    return experimentMetricSerializer(item);
  });
}

export function experimentMetricArrayDeserializer(result: Array<ExperimentMetric>): any[] {
  return result.map((item) => {
    return experimentMetricDeserializer(item);
  });
}

/** The Azure Online Experimentation service versions. */
export enum KnownVersions {
  /** The 2025-05-31-preview version of the Azure Online Experimentation service. */
  V20250531Preview = "2025-05-31-preview",
}
