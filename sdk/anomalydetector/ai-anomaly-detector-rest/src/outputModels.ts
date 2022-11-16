// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The response of entire anomaly detection. */
export interface EntireDetectResponseOutput {
  /**
   * Frequency extracted from the series, zero means no recurrent pattern has been
   * found.
   */
  period: number;
  /**
   * ExpectedValues contain expected value for each input point. The index of the
   * array is consistent with the input series.
   */
  expectedValues: number[];
  /**
   * UpperMargins contain upper margin of each input point. UpperMargin is used to
   * calculate upperBoundary, which equals to expectedValue + (100 -
   * marginScale)*upperMargin. Anomalies in response can be filtered by
   * upperBoundary and lowerBoundary. By adjusting marginScale value, less
   * significant anomalies can be filtered in client side. The index of the array is
   * consistent with the input series.
   */
  upperMargins: number[];
  /**
   * LowerMargins contain lower margin of each input point. LowerMargin is used to
   * calculate lowerBoundary, which equals to expectedValue - (100 -
   * marginScale)*lowerMargin. Points between the boundary can be marked as normal
   * ones in client side. The index of the array is consistent with the input
   * series.
   */
  lowerMargins: number[];
  /**
   * IsAnomaly contains anomaly properties for each input point. True means an
   * anomaly either negative or positive has been detected. The index of the array
   * is consistent with the input series.
   */
  isAnomaly: boolean[];
  /**
   * IsNegativeAnomaly contains anomaly status in negative direction for each input
   * point. True means a negative anomaly has been detected. A negative anomaly
   * means the point is detected as an anomaly and its real value is smaller than
   * the expected one. The index of the array is consistent with the input series.
   */
  isNegativeAnomaly: boolean[];
  /**
   * IsPositiveAnomaly contain anomaly status in positive direction for each input
   * point. True means a positive anomaly has been detected. A positive anomaly
   * means the point is detected as an anomaly and its real value is larger than the
   * expected one. The index of the array is consistent with the input series.
   */
  isPositiveAnomaly: boolean[];
  /**
   * The severity score for each input point. The larger the value is, the more
   * sever the anomaly is. For normal points, the "severity" is always 0.
   */
  severity?: number[];
}

/** Error information returned by the API. */
export interface AnomalyDetectorErrorOutput {
  /**
   * The error code.
   *
   * Possible values: InvalidCustomInterval, BadArgument, InvalidGranularity, InvalidPeriod, InvalidModelArgument, InvalidSeries, InvalidJsonFormat, RequiredGranularity, RequiredSeries, InvalidImputeMode, InvalidImputeFixedValue
   */
  code?: string;
  /** A message explaining the error reported by the service. */
  message?: string;
}

/** The response of last anomaly detection. */
export interface LastDetectResponseOutput {
  /**
   * Frequency extracted from the series, zero means no recurrent pattern has been
   * found.
   */
  period: number;
  /** Suggested input series points needed for detecting the latest point. */
  suggestedWindow: number;
  /** Expected value of the latest point. */
  expectedValue: number;
  /**
   * Upper margin of the latest point. UpperMargin is used to calculate
   * upperBoundary, which equals to expectedValue + (100 - marginScale)*upperMargin.
   * If the value of latest point is between upperBoundary and lowerBoundary, it
   * should be treated as normal value. By adjusting marginScale value, anomaly
   * status of latest point can be changed.
   */
  upperMargin: number;
  /**
   * Lower margin of the latest point. LowerMargin is used to calculate
   * lowerBoundary, which equals to expectedValue - (100 - marginScale)*lowerMargin.
   *
   */
  lowerMargin: number;
  /**
   * Anomaly status of the latest point, true means the latest point is an anomaly
   * either in negative direction or positive direction.
   */
  isAnomaly: boolean;
  /**
   * Anomaly status in negative direction of the latest point. True means the latest
   * point is an anomaly and its real value is smaller than the expected one.
   */
  isNegativeAnomaly: boolean;
  /**
   * Anomaly status in positive direction of the latest point. True means the latest
   * point is an anomaly and its real value is larger than the expected one.
   */
  isPositiveAnomaly: boolean;
  /**
   * The severity score for the last input point. The larger the value is, the more
   * sever the anomaly is. For normal points, the "severity" is always 0.
   */
  severity?: number;
}

/** The response of change point detection. */
export interface ChangePointDetectResponseOutput {
  /**
   * Frequency extracted from the series, zero means no recurrent pattern has been
   * found.
   */
  readonly period?: number;
  /**
   * isChangePoint contains change point properties for each input point. True means
   * an anomaly either negative or positive has been detected. The index of the
   * array is consistent with the input series.
   */
  isChangePoint?: boolean[];
  /** the change point confidence of each point */
  confidenceScores?: number[];
}

/** Detection results for the given resultId. */
export interface DetectionResultOutput {
  /** Result identifier, which is used to fetch the results of an inference call. */
  resultId: string;
  /** Multivariate anomaly detection status. */
  summary: DetectionResultSummaryOutput;
  /** Detection result for each timestamp. */
  results: Array<AnomalyStateOutput>;
}

/** Multivariate anomaly detection status. */
export interface DetectionResultSummaryOutput {
  /** Status of detection results. One of CREATED, RUNNING, READY, and FAILED. */
  status: "CREATED" | "RUNNING" | "READY" | "FAILED";
  /** Error message when detection is failed. */
  errors?: Array<ErrorResponseOutput>;
  variableStates?: Array<VariableStateOutput>;
  /**
   * Detection request for batch inference. This is an asynchronous inference which
   * will need another API to get detection results.
   */
  setupInfo: DetectionRequestOutput;
}

export interface ErrorResponseOutput {
  /** The error code. */
  code: string;
  /** The message explaining the error reported by the service. */
  message: string;
}

export interface VariableStateOutput {
  /** Variable name in variable states. */
  variable?: string;
  /** Proportion of missing values that need to be filled by fillNAMethod. */
  filledNARatio?: number;
  /** Number of effective data points before applying fillNAMethod. */
  effectiveCount?: number;
  /** First valid timestamp with value of input data. */
  firstTimestamp?: string;
  /** Last valid timestamp with value of input data. */
  lastTimestamp?: string;
}

/**
 * Detection request for batch inference. This is an asynchronous inference which
 * will need another API to get detection results.
 */
export interface DetectionRequestOutput {
  /**
   * Source link to the input data to indicate an accessible Azure storage Uri,
   * either pointed to an Azure blob storage folder, or pointed to a CSV file in
   * Azure blob storage based on you data schema selection. The data schema should
   * be exactly the same with those used in the training phase.
   */
  dataSource: string;
  /**
   * An optional field, which is used to specify the number of top contributed
   * variables for one anomalous timestamp in the response. The default number is
   * 10.
   */
  topContributorCount: number;
  /**
   * A required field, indicating the start time of data for detection, which should
   * be date-time of ISO 8601 format.
   */
  startTime: string;
  /**
   * A required field, indicating the end time of data for detection, which should
   * be date-time of ISO 8601 format.
   */
  endTime: string;
}

export interface AnomalyStateOutput {
  /** The timestamp for this anomaly. */
  timestamp: string;
  value?: AnomalyValueOutput;
  /** Error message for the current timestamp. */
  errors?: Array<ErrorResponseOutput>;
}

export interface AnomalyValueOutput {
  /** True if an anomaly is detected at the current timestamp. */
  isAnomaly: boolean;
  /**
   * Indicates the significance of the anomaly. The higher the severity, the more
   * significant the anomaly is.
   */
  severity: number;
  /**
   * Raw anomaly score of severity, will help indicate the degree of abnormality as
   * well.
   */
  score: number;
  interpretation?: Array<AnomalyInterpretationOutput>;
}

export interface AnomalyInterpretationOutput {
  /** Variable. */
  variable?: string;
  /**
   * This score shows the percentage contributing to the anomalous timestamp. A
   * number between 0 and 1.
   */
  contributionScore?: number;
  correlationChanges?: CorrelationChangesOutput;
}

export interface CorrelationChangesOutput {
  /** The correlated variables that have correlation changes under an anomaly. */
  changedVariables?: string[];
}

/**
 * Training result of a model including its status, errors and diagnostics
 * information.
 */
export interface ModelInfoOutput {
  /**
   * Source link to the input data to indicate an accessible Azure storage Uri,
   * either pointed to an Azure blob storage folder, or pointed to a CSV file in
   * Azure blob storage based on you data schema selection.
   */
  dataSource: string;
  /**
   * Data schema of input data source: OneTable or MultiTable. The default
   * DataSchema is OneTable.
   */
  dataSchema?: "OneTable" | "MultiTable";
  /**
   * A required field, indicating the start time of training data, which should be
   * date-time of ISO 8601 format.
   */
  startTime: string;
  /**
   * A required field, indicating the end time of training data, which should be
   * date-time of ISO 8601 format.
   */
  endTime: string;
  /**
   * An optional field. The display name of the model whose maximum length is 24
   * characters.
   */
  displayName?: string;
  /**
   * An optional field, indicating how many previous timestamps will be used to
   * detect whether the timestamp is anomaly or not.
   */
  slidingWindow?: number;
  /** An optional field, indicating the manner to align multiple variables. */
  alignPolicy?: AlignPolicyOutput;
  /** Model status. One of CREATED, RUNNING, READY, and FAILED. */
  status?: "CREATED" | "RUNNING" | "READY" | "FAILED";
  /** Error messages when failed to create a model. */
  errors?: Array<ErrorResponseOutput>;
  /** Diagnostics information to help inspect the states of model or variable. */
  diagnosticsInfo?: DiagnosticsInfoOutput;
}

/** An optional field, indicating the manner to align multiple variables. */
export interface AlignPolicyOutput {
  /**
   * An optional field, indicating how to align different variables to the same
   * time-range. Either Inner or Outer.
   */
  alignMode?: "Inner" | "Outer";
  /**
   * An optional field, indicating how missing values will be filled. One of
   * Previous, Subsequent, Linear, Zero, Fixed.
   *
   * Possible values: Previous, Subsequent, Linear, Zero, Fixed
   */
  fillNAMethod?: string;
  /** An optional field. Required when fillNAMethod is Fixed. */
  paddingValue?: number;
}

/** Diagnostics information to help inspect the states of model or variable. */
export interface DiagnosticsInfoOutput {
  modelState?: ModelStateOutput;
  variableStates?: Array<VariableStateOutput>;
}

export interface ModelStateOutput {
  /**
   * This indicates the number of passes of the entire training dataset the
   * algorithm has completed.
   */
  epochIds?: number[];
  /**
   * List of metrics used to assess how the model fits the training data for each
   * epoch.
   */
  trainLosses?: number[];
  /**
   * List of metrics used to assess how the model fits the validation set for each
   * epoch.
   */
  validationLosses?: number[];
  /** Latency for each epoch. */
  latenciesInSeconds?: number[];
}

/** Response of getting a model. */
export interface ModelOutput {
  /** Model identifier. */
  modelId: string;
  /** Date and time (UTC) when the model was created. */
  createdTime: string;
  /** Date and time (UTC) when the model was last updated. */
  lastUpdatedTime: string;
  /**
   * Training result of a model including its status, errors and diagnostics
   * information.
   */
  modelInfo?: ModelInfoOutput;
}

/** Response of listing models. */
export interface ModelListOutput {
  /** List of models. */
  models: Array<ModelOutput>;
  /** Number of trained multivariate models. */
  currentCount: number;
  /** Maximum number of models that can be trained for this Anomaly Detector resource. */
  maxCount: number;
  /** The link to fetch more models. */
  nextLink?: string;
}

export interface LastDetectionResultOutput {
  variableStates?: Array<VariableStateOutput>;
  results?: Array<AnomalyStateOutput>;
}
