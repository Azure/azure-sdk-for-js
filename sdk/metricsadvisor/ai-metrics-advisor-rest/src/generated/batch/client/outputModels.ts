// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface UsageStatsOutput {
  /** The timestamp of the stats */
  timestamp?: string;
  /** The active series count */
  activeSeriesCount?: number;
  /** All series count under non deleted data feed */
  allSeriesCount?: number;
  /** The metrics count under non deleted data feed */
  metricsCount?: number;
  /** The count of non deleted data feed */
  dataFeedCount?: number;
}

export interface ErrorCodeOutput {
  message?: string;
  code?: string;
}

export interface AlertResultListOutput {
  "@nextLink"?: string;
  value: Array<AlertResultOutput>;
}

export interface AlertResultOutput {
  /** alert id */
  alertId?: string;
  /** anomaly time */
  timestamp?: string;
  /** created time */
  createdTime?: string;
  /** modified time */
  modifiedTime?: string;
}

export interface AnomalyResultListOutput {
  "@nextLink"?: string;
  value: Array<AnomalyResultOutput>;
}

export interface AnomalyResultOutput {
  /**
   * data feed unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  dataFeedId?: string;
  /**
   * metric unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  /** anomaly time */
  timestamp: string;
  /**
   * created time
   *
   * only return for alerting result
   */
  createdTime?: string;
  /**
   * modified time
   *
   * only return for alerting result
   */
  modifiedTime?: string;
  /** dimension specified for series */
  dimension: Record<string, string>;
  property: AnomalyPropertyOutput;
}

export interface AnomalyPropertyOutput {
  /** anomaly severity */
  anomalySeverity: "Low" | "Medium" | "High";
  /**
   * anomaly status
   *
   * only return for alerting anomaly result
   */
  anomalyStatus?: "Active" | "Resolved";
  /** value of the anomaly */
  value?: number;
  /** expected value of the anomaly given by smart detector */
  expectedValue?: number;
}

export interface IncidentResultListOutput {
  "@nextLink"?: string;
  value: Array<IncidentResultOutput>;
}

export interface IncidentResultOutput {
  /**
   * data feed unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  dataFeedId?: string;
  /**
   * metric unique id
   *
   * only return for alerting incident result
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   *
   * only return for alerting incident result
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  /** incident id */
  incidentId: string;
  /** incident start time */
  startTime: string;
  /** incident last time */
  lastTime: string;
  rootNode: SeriesIdentityOutput;
  property: IncidentPropertyOutput;
}

export interface SeriesIdentityOutput {
  /** dimension specified for series */
  dimension: Record<string, string>;
}

export interface IncidentPropertyOutput {
  /** max severity of latest anomalies in the incident */
  maxSeverity: "Low" | "Medium" | "High";
  /**
   * incident status
   *
   * only return for alerting incident result
   */
  incidentStatus?: "Active" | "Resolved";
  /** value of the root node */
  valueOfRootNode?: number;
  /** expected value of the root node given by smart detector */
  expectedValueOfRootNode?: number;
}

export interface SeriesResultListOutput {
  value: Array<SeriesResultOutput>;
}

export interface SeriesResultOutput {
  series: SeriesIdentityOutput;
  /** timestamps of the series */
  timestampList: Array<string>;
  /** values of the series */
  valueList: Array<number>;
  /** whether points of the series are anomalies */
  isAnomalyList: Array<boolean>;
  /** period calculated on each point of the series */
  periodList: Array<number>;
  /** expected values of the series given by smart detector */
  expectedValueList: Array<number>;
  /** lower boundary list of the series given by smart detector */
  lowerBoundaryList: Array<number>;
  /** upper boundary list of the series given by smart detector */
  upperBoundaryList: Array<number>;
}

export interface DimensionGroupIdentityOutput {
  /** dimension specified for series group */
  dimension: Record<string, string>;
}

export interface AnomalyDimensionListOutput {
  "@nextLink"?: string;
  value: Array<string>;
}

export interface RootCauseListOutput {
  value: Array<RootCauseOutput>;
}

export interface RootCauseOutput {
  rootCause: DimensionGroupIdentityOutput;
  /** drilling down path from query anomaly to root cause */
  path: Array<string>;
  /** score of the root cause */
  score: number;
  /** description of the root cause */
  description: string;
}

export interface MetricFeedbackOutputBase {
  /**
   * feedback unique id
   *
   * Value may contain a UUID
   */
  feedbackId?: string;
  /** feedback created time */
  createdTime?: string;
  /** user who gives this feedback */
  userPrincipal?: string;
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId: string;
  dimensionFilter: FeedbackDimensionFilterOutput;
  feedbackType: "Anomaly" | "ChangePoint" | "Comment" | "Period";
}

export interface FeedbackDimensionFilterOutput {
  /** metric dimension filter */
  dimension: Record<string, string>;
}

export interface MetricFeedbackListOutput {
  "@nextLink"?: string;
  value?: Array<MetricFeedbackOutput>;
}

export interface MetricDataListOutput {
  value?: Array<MetricDataItemOutput>;
}

export interface MetricDataItemOutput {
  id?: MetricSeriesItemOutput;
  /** timestamps of the data related to this time series */
  timestampList?: Array<string>;
  /** values of the data related to this time series */
  valueList?: Array<number>;
}

export interface MetricSeriesItemOutput {
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /** dimension name and value pair */
  dimension?: Record<string, string>;
}

export interface MetricSeriesListOutput {
  "@nextLink"?: string;
  value?: Array<MetricSeriesItemOutput>;
}

export interface MetricDimensionListOutput {
  "@nextLink"?: string;
  value?: Array<string>;
}

export interface EnrichmentStatusListOutput {
  "@nextLink"?: string;
  value?: Array<EnrichmentStatusOutput>;
}

export interface EnrichmentStatusOutput {
  /** data slice timestamp. */
  timestamp?: string;
  /** latest enrichment status for this data slice. */
  status?: string;
  /** the trimmed message describes details of the enrichment status. */
  message?: string;
}

export interface SuppressConditionOutput {
  /** min point number, value range : [1, +∞) */
  minNumber: number;
  /** min point ratio, value range : (0, 100] */
  minRatio: number;
}

export interface SmartDetectionConditionOutput {
  /** sensitivity, value range : (0, 100] */
  sensitivity: number;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  suppressCondition: SuppressConditionOutput;
}

export interface HardThresholdConditionOutput {
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
  suppressCondition: SuppressConditionOutput;
}

export interface ChangeThresholdConditionOutput {
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
  suppressCondition: SuppressConditionOutput;
}

export interface WholeMetricConfigurationOutput {
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionConditionOutput;
  hardThresholdCondition?: HardThresholdConditionOutput;
  changeThresholdCondition?: ChangeThresholdConditionOutput;
}

export interface DimensionGroupConfigurationOutput {
  group: DimensionGroupIdentityOutput;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionConditionOutput;
  hardThresholdCondition?: HardThresholdConditionOutput;
  changeThresholdCondition?: ChangeThresholdConditionOutput;
}

export interface SeriesConfigurationOutput {
  series: SeriesIdentityOutput;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionConditionOutput;
  hardThresholdCondition?: HardThresholdConditionOutput;
  changeThresholdCondition?: ChangeThresholdConditionOutput;
}

export interface AnomalyDetectionConfigurationOutput {
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
  wholeMetricConfiguration: WholeMetricConfigurationOutput;
  /** detection configuration for series group */
  dimensionGroupOverrideConfigurations?: Array<
    DimensionGroupConfigurationOutput
  >;
  /** detection configuration for specific series */
  seriesOverrideConfigurations?: Array<SeriesConfigurationOutput>;
}

export interface AnomalyFeedbackValueOutput {
  anomalyValue: "AutoDetect" | "Anomaly" | "NotAnomaly";
}

export interface AnomalyFeedbackOutput extends MetricFeedbackOutputBase {
  /** the start timestamp of feedback time range */
  startTime: string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: string;
  value: AnomalyFeedbackValueOutput;
  /**
   * the corresponding anomaly detection configuration of this feedback
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  anomalyDetectionConfigurationSnapshot?: AnomalyDetectionConfigurationOutput;
  feedbackType: "Anomaly";
}

export interface ChangePointFeedbackValueOutput {
  changePointValue: "AutoDetect" | "ChangePoint" | "NotChangePoint";
}

export interface ChangePointFeedbackOutput extends MetricFeedbackOutputBase {
  /** the start timestamp of feedback time range */
  startTime: string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: string;
  value: ChangePointFeedbackValueOutput;
  feedbackType: "ChangePoint";
}

export interface CommentFeedbackValueOutput {
  /** the comment string */
  commentValue: string;
}

export interface CommentFeedbackOutput extends MetricFeedbackOutputBase {
  /** the start timestamp of feedback time range */
  startTime?: string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime?: string;
  value: CommentFeedbackValueOutput;
  feedbackType: "Comment";
}

export interface PeriodFeedbackValueOutput {
  /** the type of setting period */
  periodType: "AutoDetect" | "AssignValue";
  /** the number of intervals a period contains, when no period set to 0 */
  periodValue: number;
}

export interface PeriodFeedbackOutput extends MetricFeedbackOutputBase {
  value: PeriodFeedbackValueOutput;
  feedbackType: "Period";
}

export type MetricFeedbackOutput =
  | AnomalyFeedbackOutput
  | ChangePointFeedbackOutput
  | CommentFeedbackOutput
  | PeriodFeedbackOutput;
