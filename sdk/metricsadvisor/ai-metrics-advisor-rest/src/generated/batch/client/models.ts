// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AlertingResultQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  /** time mode */
  timeMode: "AnomalyTime" | "CreatedTime" | "ModifiedTime";
}

export interface SeriesIdentity {
  /** dimension specified for series */
  dimension: Record<string, string>;
}

export interface DetectionSeriesQuery {
  /** This is inclusive. The maximum number of data points (series number * time range) is 10000. */
  startTime: Date | string;
  /** This is exclusive. The maximum number of data points (series number * time range) is 10000. */
  endTime: Date | string;
  /** The series to be queried. The identity must be able to define one single time series instead of a group of time series. The maximum number of series is 100. */
  series: Array<SeriesIdentity>;
}

export interface DetectionAnomalyResultQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  filter?: DetectionAnomalyFilterCondition;
}

export interface DetectionAnomalyFilterCondition {
  /** dimension filter */
  dimensionFilter?: Array<DimensionGroupIdentity>;
  severityFilter?: SeverityFilterCondition;
}

export interface DimensionGroupIdentity {
  /** dimension specified for series group */
  dimension: Record<string, string>;
}

export interface SeverityFilterCondition {
  /** min severity */
  min: "Low" | "Medium" | "High";
  /** max severity */
  max: "Low" | "Medium" | "High";
}

export interface AnomalyDimensionQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  /** dimension to query */
  dimensionName: string;
  dimensionFilter?: DimensionGroupIdentity;
}

export interface DetectionIncidentResultQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  filter?: DetectionIncidentFilterCondition;
}

export interface DetectionIncidentFilterCondition {
  /** dimension filter */
  dimensionFilter?: Array<DimensionGroupIdentity>;
}

export interface MetricFeedbackBase {
  /**
   * feedback unique id
   *
   * Value may contain a UUID
   */
  feedbackId?: string;
  /** feedback created time */
  createdTime?: Date | string;
  /** user who gives this feedback */
  userPrincipal?: string;
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId: string;
  dimensionFilter: FeedbackDimensionFilter;
  feedbackType: "Anomaly" | "ChangePoint" | "Comment" | "Period";
}

export interface FeedbackDimensionFilter {
  /** metric dimension filter */
  dimension: Record<string, string>;
}

export interface MetricFeedbackFilter {
  /**
   * filter feedbacks by metric id
   *
   * Value may contain a UUID
   */
  metricId: string;
  dimensionFilter?: FeedbackDimensionFilter;
  /** filter feedbacks by type */
  feedbackType?: "Anomaly" | "ChangePoint" | "Period" | "Comment";
  /** start time filter under chosen time mode */
  startTime?: Date | string;
  /** end time filter under chosen time mode */
  endTime?: Date | string;
  /** time mode to filter feedback */
  timeMode?: "MetricTimestamp" | "FeedbackCreatedTime";
}

export interface MetricDataQueryOptions {
  /** start time of query a time series data, and format should be yyyy-MM-ddThh:mm:ssZ. The maximum number of data points (series number * time range) is 10000. */
  startTime: Date | string;
  /** start time of query a time series data, and format should be yyyy-MM-ddThh:mm:ssZ. The maximum number of data points (series number * time range) is 10000. */
  endTime: Date | string;
  /** query specific series. The maximum number of series is 100. */
  series: Array<Record<string, string>>;
}

export interface MetricSeriesQueryOptions {
  /** query series ingested after this time, the format should be yyyy-MM-ddTHH:mm:ssZ */
  activeSince: Date | string;
  /** filter specific dimension name and values */
  dimensionFilter?: Record<string, Array<string>>;
}

export interface MetricDimensionQueryOptions {
  /** dimension name */
  dimensionName: string;
  /** dimension value to be filtered */
  dimensionValueFilter?: string;
}

export interface EnrichmentStatusQueryOption {
  /** the start point of time range to query anomaly detection status. */
  startTime: Date | string;
  /** the end point of time range to query anomaly detection status. */
  endTime: Date | string;
}

export interface SuppressCondition {
  /** min point number, value range : [1, +∞) */
  minNumber: number;
  /** min point ratio, value range : (0, 100] */
  minRatio: number;
}

export interface SmartDetectionCondition {
  /** sensitivity, value range : (0, 100] */
  sensitivity: number;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  suppressCondition: SuppressCondition;
}

export interface HardThresholdCondition {
  /**
   * lower bound
   *
   * should be specified when anomalyDetectorDirection is Both or Down
   */
  lowerBound?: number;
  /**
   * upper bound
   *
   * should be specified when anomalyDetectorDirection is Both or Up
   */
  upperBound?: number;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  suppressCondition: SuppressCondition;
}

export interface ChangeThresholdCondition {
  /** change percentage, value range : [0, +∞) */
  changePercentage: number;
  /** shift point, value range : [1, +∞) */
  shiftPoint: number;
  /**
   * if the withinRange = true, detected data is abnormal when the value falls in the range, in this case anomalyDetectorDirection must be Both
   * if the withinRange = false, detected data is abnormal when the value falls out of the range
   */
  withinRange: boolean;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  suppressCondition: SuppressCondition;
}

export interface WholeMetricConfiguration {
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionCondition;
  hardThresholdCondition?: HardThresholdCondition;
  changeThresholdCondition?: ChangeThresholdCondition;
}

export interface DimensionGroupConfiguration {
  group: DimensionGroupIdentity;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionCondition;
  hardThresholdCondition?: HardThresholdCondition;
  changeThresholdCondition?: ChangeThresholdCondition;
}

export interface SeriesConfiguration {
  series: SeriesIdentity;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionCondition;
  hardThresholdCondition?: HardThresholdCondition;
  changeThresholdCondition?: ChangeThresholdCondition;
}

export interface AnomalyDetectionConfiguration {
  /**
   * anomaly detection configuration unique id
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  /** anomaly detection configuration name */
  name: string;
  /** anomaly detection configuration description */
  description?: string;
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId: string;
  wholeMetricConfiguration: WholeMetricConfiguration;
  /** detection configuration for series group */
  dimensionGroupOverrideConfigurations?: Array<DimensionGroupConfiguration>;
  /** detection configuration for specific series */
  seriesOverrideConfigurations?: Array<SeriesConfiguration>;
}

export interface AnomalyFeedbackValue {
  anomalyValue: "AutoDetect" | "Anomaly" | "NotAnomaly";
}

export interface AnomalyFeedback extends MetricFeedbackBase {
  /** the start timestamp of feedback time range */
  startTime: Date | string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: Date | string;
  value: AnomalyFeedbackValue;
  /**
   * the corresponding anomaly detection configuration of this feedback
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  anomalyDetectionConfigurationSnapshot?: AnomalyDetectionConfiguration;
  feedbackType: "Anomaly";
}

export interface ChangePointFeedbackValue {
  changePointValue: "AutoDetect" | "ChangePoint" | "NotChangePoint";
}

export interface ChangePointFeedback extends MetricFeedbackBase {
  /** the start timestamp of feedback time range */
  startTime: Date | string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: Date | string;
  value: ChangePointFeedbackValue;
  feedbackType: "ChangePoint";
}

export interface CommentFeedbackValue {
  /** the comment string */
  commentValue: string;
}

export interface CommentFeedback extends MetricFeedbackBase {
  /** the start timestamp of feedback time range */
  startTime?: Date | string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime?: Date | string;
  value: CommentFeedbackValue;
  feedbackType: "Comment";
}

export interface PeriodFeedbackValue {
  /** the type of setting period */
  periodType: "AutoDetect" | "AssignValue";
  /** the number of intervals a period contains, when no period set to 0 */
  periodValue: number;
}

export interface PeriodFeedback extends MetricFeedbackBase {
  value: PeriodFeedbackValue;
  feedbackType: "Period";
}

export type MetricFeedback =
  | AnomalyFeedback
  | ChangePointFeedback
  | CommentFeedback
  | PeriodFeedback;
