// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Defines experiment metric metadata and computation details. */
export interface ExperimentMetric {
  /**
   * Determines whether it is included in experiment analysis.
   *
   * Possible values: "Active", "Inactive"
   */
  lifecycle: LifecycleStage;
  /** A user-friendly display name for the experiment metric shown in reports and dashboards. */
  displayName: string;
  /** A detailed description of the experiment metric. */
  description: string;
  /** Categories associated with the experiment metric. Used for organizing and filtering metrics. */
  categories: string[];
  /**
   * The desired direction for changes in the metric value.
   *
   * Possible values: "Increase", "Decrease", "Neutral"
   */
  desiredDirection: DesiredDirection;
  /** The metric definition specifying how the metric value is calculated from event data. */
  definition: ExperimentMetricDefinition;
}

/** The metric definition, which determines how the metric value is calculated from event data. */
export interface ExperimentMetricDefinitionParent {
  type: string;
}

/** The definition of an EventCount metric definition. Counts the occurrences of a specified event. */
export interface EventCountMetricDefinition
  extends ExperimentMetricDefinitionParent {
  /** The type of metric. */
  type: "EventCount";
  /** Event to observe. */
  event: ObservedEvent;
}

/** An event observed by a metric. */
export interface ObservedEvent {
  /** The name of the event. */
  eventName: string;
  /** [Optional] A condition to filter events. */
  filter?: string;
}

/** The definition of a UserCount metric definition. Counts unique users who encounter a specified event. */
export interface UserCountMetricDefinition
  extends ExperimentMetricDefinitionParent {
  /** The type of metric. */
  type: "UserCount";
  /** Event to observe. */
  event: ObservedEvent;
}

/** The definition of an EventRate metric definition. Calculates the percentage of events satisfying a specified condition. */
export interface EventRateMetricDefinition
  extends ExperimentMetricDefinitionParent {
  /** The type of metric. */
  type: "EventRate";
  /** Event to observe as the rate denominator. */
  event: ObservedEvent;
  /** The event contributes to the rate numerator if it satisfies this condition. */
  rateCondition: string;
}

/** The definition of a UserRate metric definition. Calculates the percentage of users who encounter a start event and subsequently an end event. Users must encounter events in the specified order. */
export interface UserRateMetricDefinition
  extends ExperimentMetricDefinitionParent {
  /** The type of metric. */
  type: "UserRate";
  /** The start event to observe as the rate denominator. */
  startEvent: ObservedEvent;
  /** The end event to observe, which is a condition for the rate numerator. */
  endEvent: ObservedEvent;
}

/** The definition of a Sum metric definition. Calculates the sum of a specified event property. Experiment analysis accounts for unequal traffic allocation. */
export interface SumMetricDefinition extends ExperimentMetricDefinitionParent {
  /** The type of metric. */
  type: "Sum";
  /** The value to aggregate. */
  value: AggregatedValue;
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

/** The definition of an Average metric definition. Calculates the average value of a specified event property. */
export interface AverageMetricDefinition
  extends ExperimentMetricDefinitionParent {
  /** The type of metric. */
  type: "Average";
  /** The value to aggregate. */
  value: AggregatedValue;
}

/** The definition of a Percentile metric definition. Calculates a specified percentile of an event property. */
export interface PercentileMetricDefinition
  extends ExperimentMetricDefinitionParent {
  /** The type of metric. */
  type: "Percentile";
  /** The value to aggregate, including the event name and property to measure. */
  value: AggregatedValue;
  /** The percentile to measure. */
  percentile: number;
}

/** The metric definition, which determines how the metric value is calculated from event data. */
export type ExperimentMetricDefinition =
  | ExperimentMetricDefinitionParent
  | EventCountMetricDefinition
  | UserCountMetricDefinition
  | EventRateMetricDefinition
  | UserRateMetricDefinition
  | SumMetricDefinition
  | AverageMetricDefinition
  | PercentileMetricDefinition;
/** Alias for LifecycleStage */
export type LifecycleStage = string;
/** Alias for DesiredDirection */
export type DesiredDirection = string;
