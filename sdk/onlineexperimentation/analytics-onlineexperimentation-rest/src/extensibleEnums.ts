// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Desired direction for an experiment metric value.
 */
export enum KnownDesiredDirection {
  /**
   * An increase to the metric value is desired. E.g., Success rate, Total revenue.
   */
  Increase = "Increase",

  /**
   * A decrease to the metric value is desired. E.g., Error rate, Latency.
   */
  Decrease = "Decrease",

  /**
   * Neither an increase nor a decrease to the metric value is desired, or the desired direction depends on other factors. E.g., Number of video play attempts, Number of user feedbacks
   */
  Neutral = "Neutral",
}

/**
 * How the metric definition calculates metric values from event data.
 */
export enum KnownExperimentMetricType {
  /**
   * Counts the occurrences of an event. Experiment analysis accounts for unequal traffic allocation.
   */
  EventCount = "EventCount",

  /**
   * Counts the number of unique users who encounter an event. Experiment analysis accounts for unequal traffic allocation.
   */
  UserCount = "UserCount",

  /**
   * Calculates the percentage of events that satisfy a specified condition.
   */
  EventRate = "EventRate",

  /**
   * Calculates the percentage of users who encounter a start event and subsequently encounter an end event. Users must encounter the start event before the end event to be counted.
   */
  UserRate = "UserRate",

  /**
   * Calculates the sum of a specified event property. Experiment analysis accounts for unequal traffic allocation.
   */
  Sum = "Sum",

  /**
   * Calculates the average value of a specified event property.
   */
  Average = "Average",

  /**
   * Calculates a specified percentile of an event property.
   */
  Percentile = "Percentile",
}

/**
 * Lifecycle stages of an experiment metric, determining whether the metric is included in experiment analysis.
 */
export enum KnownLifecycleStage {
  /**
   * The metric is included in experiment analysis.
   */
  Active = "Active",

  /**
   * The metric is excluded from experiment analysis but remains available for future use.
   */
  Inactive = "Inactive",
}

/**
 * The diagnostic error codes.
 */
export enum KnownDiagnosticCode {
  /**
   * The metric definition does not conform to the JSON schema.
   */
  FailedSchemaValidation = "FailedSchemaValidation",

  /**
   * The event filter condition is invalid.
   */
  InvalidEventCondition = "InvalidEventCondition",

  /**
   * Event filter condition has valid syntax but is not currently supported.
   */
  UnsupportedEventCondition = "UnsupportedEventCondition",

  /**
   * The provided experiment metric definition is invalid.
   * For example, defining a metric to calculate the average of a numeric property but
   * including a filter condition that compares it to a string value creates a type mismatch.
   */
  InvalidExperimentMetricDefinition = "InvalidExperimentMetricDefinition",
}

/**
 * The result of validating an experiment metric.
 */
export enum KnownValidationResult {
  /**
   * The experiment metric is valid.
   */
  Valid = "Valid",

  /**
   * The experiment metric is invalid.
   */
  Invalid = "Invalid",
}
