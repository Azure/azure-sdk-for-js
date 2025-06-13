// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Defines experiment metric metadata and computation details. */
export interface ExperimentMetricOutput {
  /** Identifier for this experiment metric. Must start with a lowercase letter and contain only lowercase letters, numbers, and underscores. */
  readonly id: string;
  /**
   * Determines whether it is included in experiment analysis.
   *
   * Possible values: "Active", "Inactive"
   */
  lifecycle: LifecycleStageOutput;
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
  desiredDirection: DesiredDirectionOutput;
  /** The metric definition specifying how the metric value is calculated from event data. */
  definition: ExperimentMetricDefinitionOutput;
  /** ETag of the experiment metric. */
  readonly eTag: string;
  /** The timestamp (UTC) of the last modification to the experiment metric resource. */
  readonly lastModifiedAt: string;
}

/** The metric definition, which determines how the metric value is calculated from event data. */
export interface ExperimentMetricDefinitionOutputParent {
  type: string;
}

/** The definition of an EventCount metric definition. Counts the occurrences of a specified event. */
export interface EventCountMetricDefinitionOutput extends ExperimentMetricDefinitionOutputParent {
  /** The type of metric. */
  type: "EventCount";
  /** Event to observe. */
  event: ObservedEventOutput;
}

/** An event observed by a metric. */
export interface ObservedEventOutput {
  /** The name of the event. */
  eventName: string;
  /** [Optional] A condition to filter events. */
  filter?: string;
}

/** The definition of a UserCount metric definition. Counts unique users who encounter a specified event. */
export interface UserCountMetricDefinitionOutput extends ExperimentMetricDefinitionOutputParent {
  /** The type of metric. */
  type: "UserCount";
  /** Event to observe. */
  event: ObservedEventOutput;
}

/** The definition of an EventRate metric definition. Calculates the percentage of events satisfying a specified condition. */
export interface EventRateMetricDefinitionOutput extends ExperimentMetricDefinitionOutputParent {
  /** The type of metric. */
  type: "EventRate";
  /** Event to observe as the rate denominator. */
  event: ObservedEventOutput;
  /** The event contributes to the rate numerator if it satisfies this condition. */
  rateCondition: string;
}

/** The definition of a UserRate metric definition. Calculates the percentage of users who encounter a start event and subsequently an end event. Users must encounter events in the specified order. */
export interface UserRateMetricDefinitionOutput extends ExperimentMetricDefinitionOutputParent {
  /** The type of metric. */
  type: "UserRate";
  /** The start event to observe as the rate denominator. */
  startEvent: ObservedEventOutput;
  /** The end event to observe, which is a condition for the rate numerator. */
  endEvent: ObservedEventOutput;
}

/** The definition of a Sum metric definition. Calculates the sum of a specified event property. Experiment analysis accounts for unequal traffic allocation. */
export interface SumMetricDefinitionOutput extends ExperimentMetricDefinitionOutputParent {
  /** The type of metric. */
  type: "Sum";
  /** The value to aggregate. */
  value: AggregatedValueOutput;
}

/** An event property value aggregated by a metric. */
export interface AggregatedValueOutput {
  /** The name of the event. */
  eventName: string;
  /** [Optional] A condition to filter events. */
  filter?: string;
  /** The key of the event property to aggregate. */
  eventProperty: string;
}

/** The definition of an Average metric definition. Calculates the average value of a specified event property. */
export interface AverageMetricDefinitionOutput extends ExperimentMetricDefinitionOutputParent {
  /** The type of metric. */
  type: "Average";
  /** The value to aggregate. */
  value: AggregatedValueOutput;
}

/** The definition of a Percentile metric definition. Calculates a specified percentile of an event property. */
export interface PercentileMetricDefinitionOutput extends ExperimentMetricDefinitionOutputParent {
  /** The type of metric. */
  type: "Percentile";
  /** The value to aggregate, including the event name and property to measure. */
  value: AggregatedValueOutput;
  /** The percentile to measure. */
  percentile: number;
}

/** The result of validating an experiment metric. */
export interface ExperimentMetricValidationResultOutput {
  /** Indicates whether the experiment metric is valid. */
  isValid: boolean;
  /** Diagnostic details from the validation process. */
  readonly diagnostics: Array<DiagnosticDetailOutput>;
}

/** Diagnostic details for validation errors. */
export interface DiagnosticDetailOutput {
  /** A human-readable error message. */
  readonly message: string;
  /**
   * The diagnostic error code.
   *
   * Possible values: "FailedSchemaValidation", "InvalidEventCondition", "UnsupportedEventCondition", "InvalidExperimentMetricDefinition"
   */
  readonly code: DiagnosticCodeOutput;
}

/** Paged collection of ExperimentMetric items */
export interface PagedExperimentMetricOutput {
  /** The ExperimentMetric items on this page */
  value: Array<ExperimentMetricOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** The metric definition, which determines how the metric value is calculated from event data. */
export type ExperimentMetricDefinitionOutput =
  | ExperimentMetricDefinitionOutputParent
  | EventCountMetricDefinitionOutput
  | UserCountMetricDefinitionOutput
  | EventRateMetricDefinitionOutput
  | UserRateMetricDefinitionOutput
  | SumMetricDefinitionOutput
  | AverageMetricDefinitionOutput
  | PercentileMetricDefinitionOutput;
/** Alias for LifecycleStageOutput */
export type LifecycleStageOutput = string;
/** Alias for DesiredDirectionOutput */
export type DesiredDirectionOutput = string;
/** Alias for DiagnosticCodeOutput */
export type DiagnosticCodeOutput = string;
