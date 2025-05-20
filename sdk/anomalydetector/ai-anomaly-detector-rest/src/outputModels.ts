// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Response of the entire anomaly detection. */
export interface UnivariateEntireDetectionResultOutput {
  /**
   * Frequency extracted from the series. Zero means no recurrent pattern has been
   * found.
   */
  period: number;
  /**
   * Expected value for each input point. The index of the
   * array is consistent with the input series.
   */
  expectedValues: number[];
  /**
   * Upper margin of each input point. UpperMargin is used to
   * calculate upperBoundary, which is equal to expectedValue + (100 -
   * marginScale)*upperMargin. Anomalies in the response can be filtered by
   * upperBoundary and lowerBoundary. Adjusting the marginScale value can help filter less
   * significant anomalies on the client side. The index of the array is
   * consistent with the input series.
   */
  upperMargins: number[];
  /**
   * Lower margin of each input point. LowerMargin is used to
   * calculate lowerBoundary, which is equal to expectedValue - (100 -
   * marginScale)*lowerMargin. Points between the boundary can be marked as normal
   * ones on the client side. The index of the array is consistent with the input
   * series.
   */
  lowerMargins: number[];
  /**
   * Anomaly properties for each input point. True means an
   * anomaly (either negative or positive) has been detected. The index of the array
   * is consistent with the input series.
   */
  isAnomaly: boolean[];
  /**
   * Anomaly status in a negative direction for each input
   * point. True means a negative anomaly has been detected. A negative anomaly
   * means the point is detected as an anomaly and its real value is smaller than
   * the expected one. The index of the array is consistent with the input series.
   */
  isNegativeAnomaly: boolean[];
  /**
   * Anomaly status in a positive direction for each input
   * point. True means a positive anomaly has been detected. A positive anomaly
   * means the point is detected as an anomaly and its real value is larger than the
   * expected one. The index of the array is consistent with the input series.
   */
  isPositiveAnomaly: boolean[];
  /**
   * Severity score for each input point. The larger the value is, the more
   * severe the anomaly is. For normal points, the severity is always 0.
   */
  severity?: number[];
}

/** Error information that the API returned. */
export interface AnomalyDetectorErrorOutput {
  /**
   * Error code.
   *
   * Possible values: "InvalidCustomInterval", "BadArgument", "InvalidGranularity", "InvalidPeriod", "InvalidModelArgument", "InvalidSeries", "InvalidJsonFormat", "RequiredGranularity", "RequiredSeries", "InvalidImputeMode", "InvalidImputeFixedValue"
   */
  code: AnomalyDetectorErrorCodesOutput;
  /** Message that explains the error that the service reported. */
  message: string;
}

/** Response of the last anomaly detection. */
export interface UnivariateLastDetectionResultOutput {
  /**
   * Frequency extracted from the series. Zero means no recurrent pattern has been
   * found.
   */
  period: number;
  /** Suggested input series points needed for detecting the latest point. */
  suggestedWindow: number;
  /** Expected value of the latest point. */
  expectedValue: number;
  /**
   * Upper margin of the latest point. UpperMargin is used to calculate
   * upperBoundary, which is equal to expectedValue + (100 - marginScale)*upperMargin.
   * If the value of latest point is between upperBoundary and lowerBoundary, it
   * should be treated as a normal value. Adjusting the marginScale value enables the anomaly
   * status of the latest point to be changed.
   */
  upperMargin: number;
  /**
   * Lower margin of the latest point. LowerMargin is used to calculate
   * lowerBoundary, which is equal to expectedValue - (100 - marginScale)*lowerMargin.
   */
  lowerMargin: number;
  /**
   * Anomaly status of the latest point. True means the latest point is an anomaly,
   * either in the negative direction or in the positive direction.
   */
  isAnomaly: boolean;
  /**
   * Anomaly status of the latest point in a negative direction. True means the latest
   * point is an anomaly and its real value is smaller than the expected one.
   */
  isNegativeAnomaly: boolean;
  /**
   * Anomaly status of the latest point in a positive direction. True means the latest
   * point is an anomaly and its real value is larger than the expected one.
   */
  isPositiveAnomaly: boolean;
  /**
   * Severity score for the last input point. The larger the value is, the more
   * severe the anomaly is. For normal points, the severity is always 0.
   */
  severity?: number;
}

/** Response of change point detection. */
export interface UnivariateChangePointDetectionResultOutput {
  /**
   * Frequency extracted from the series. Zero means no recurrent pattern has been
   * found.
   */
  readonly period?: number;
  /**
   * Change point properties for each input point. True means
   * an anomaly (either negative or positive) has been detected. The index of the
   * array is consistent with the input series.
   */
  isChangePoint?: boolean[];
  /** Change point confidence of each point. */
  confidenceScores?: number[];
}

/** Detection results for the resultId value. */
export interface MultivariateDetectionResultOutput {
  /** Result identifier that's used to fetch the results of an inference call. */
  resultId: string;
  /** Multivariate anomaly detection status. */
  summary: MultivariateBatchDetectionResultSummaryOutput;
  /** Detection result for each time stamp. */
  results: Array<AnomalyStateOutput>;
}

/** Multivariate anomaly detection status. */
export interface MultivariateBatchDetectionResultSummaryOutput {
  /**
   * Status of detection results.
   *
   * Possible values: "CREATED", "RUNNING", "READY", "FAILED"
   */
  status: MultivariateBatchDetectionStatusOutput;
  /** Error message when detection fails. */
  errors?: Array<ErrorResponseOutput>;
  /** Variable status. */
  variableStates?: Array<VariableStateOutput>;
  /**
   * Detection request for batch inference. This is an asynchronous inference that
   * will need another API to get detection results.
   */
  setupInfo: MultivariateBatchDetectionOptionsOutput;
}

/** Error information that the API returned. */
export interface ErrorResponseOutput {
  /** Error code. */
  code: string;
  /** Message that explains the error that the service reported. */
  message: string;
}

/** Variable status. */
export interface VariableStateOutput {
  /** Variable name in variable states. */
  variable?: string;
  /** Proportion of missing values that need to be filled by fillNAMethod. */
  filledNARatio?: number;
  /** Number of effective data points before fillNAMethod is applied. */
  effectiveCount?: number;
  /** First valid time stamp with a value of input data. */
  firstTimestamp?: string;
  /** Last valid time stamp with a value of input data. */
  lastTimestamp?: string;
}

/**
 * Detection request for batch inference. This is an asynchronous inference that
 * will need another API to get detection results.
 */
export interface MultivariateBatchDetectionOptionsOutput {
  /**
   * Source link to the input data to indicate an accessible Azure Storage URI.
   * It either points to an Azure Blob Storage folder or points to a CSV file in
   * Azure Blob Storage, based on your data schema selection. The data schema should
   * be exactly the same as those used in the training phase. The input data must
   * contain at least slidingWindow entries preceding the start time of the data
   * to be detected.
   */
  dataSource: string;
  /** Number of top contributed variables for one anomalous time stamp in the response. */
  topContributorCount?: number;
  /**
   * Start date/time of data for detection, which should
   * be in ISO 8601 format.
   */
  startTime: string;
  /**
   * End date/time of data for detection, which should
   * be in ISO 8601 format.
   */
  endTime: string;
}

/** Anomaly status and information. */
export interface AnomalyStateOutput {
  /** Time stamp for this anomaly. */
  timestamp: string;
  /** Detailed value of this anomalous time stamp. */
  value?: AnomalyValueOutput;
  /** Error message for the current time stamp. */
  errors?: Array<ErrorResponseOutput>;
}

/** Detailed information of the anomalous time stamp. */
export interface AnomalyValueOutput {
  /** True if an anomaly is detected at the current time stamp. */
  isAnomaly: boolean;
  /**
   * Indicates the significance of the anomaly. The higher the severity, the more
   * significant the anomaly is.
   */
  severity: number;
  /** Raw anomaly score of severity, to help indicate the degree of abnormality. */
  score: number;
  /** Interpretation of this anomalous time stamp. */
  interpretation?: Array<AnomalyInterpretationOutput>;
}

/** Interpretation of the anomalous time stamp. */
export interface AnomalyInterpretationOutput {
  /** Variable. */
  variable?: string;
  /**
   * This score shows the percentage that contributes to the anomalous time stamp. It's a
   * number between 0 and 1.
   */
  contributionScore?: number;
  /** Correlation changes among the anomalous variables. */
  correlationChanges?: CorrelationChangesOutput;
}

/** Correlation changes among the anomalous variables. */
export interface CorrelationChangesOutput {
  /** Correlated variables that have correlation changes under an anomaly. */
  changedVariables?: string[];
}

/** Error response. */
export interface ResponseErrorOutput {
  /** Error code. */
  code: string;
  /** Message that explains the error that the service reported. */
  message: string;
}

/**
 * Training result of a model, including its status, errors, and diagnostics
 * information.
 */
export interface ModelInfoOutput {
  /**
   * Source link to the input data to indicate an accessible Azure Storage URI.
   * It either points to an Azure Blob Storage folder or points to a CSV file in
   * Azure Blob Storage, based on your data schema selection.
   */
  dataSource: string;
  /**
   * Data schema of the input data source. The default
   * is OneTable.
   *
   * Possible values: "OneTable", "MultiTable"
   */
  dataSchema?: DataSchemaOutput;
  /**
   * Start date/time of training data, which should be
   * in ISO 8601 format.
   */
  startTime: string;
  /**
   * End date/time of training data, which should be
   * in ISO 8601 format.
   */
  endTime: string;
  /**
   * Display name of the model. Maximum length is 24
   * characters.
   */
  displayName?: string;
  /**
   * Number of previous time stamps that will be used to
   * detect whether the time stamp is an anomaly or not.
   */
  slidingWindow?: number;
  /** Manner of aligning multiple variables. */
  alignPolicy?: AlignPolicyOutput;
  /**
   * Model status.
   *
   * Possible values: "CREATED", "RUNNING", "READY", "FAILED"
   */
  readonly status?: ModelStatusOutput;
  /** Error messages after failure to create a model. */
  readonly errors?: Array<ErrorResponseOutput>;
  /** Diagnostics information to help inspect the states of a model or variable. */
  readonly diagnosticsInfo?: DiagnosticsInfoOutput;
}

/** Manner of aligning multiple variables. */
export interface AlignPolicyOutput {
  /**
   * Field that indicates how to align different variables to the same
   * time range.
   *
   * Possible values: "Inner", "Outer"
   */
  alignMode?: AlignModeOutput;
  /**
   * Field that indicates how missing values will be filled.
   *
   * Possible values: "Previous", "Subsequent", "Linear", "Zero", "Fixed"
   */
  fillNAMethod?: FillNAMethodOutput;
  /** Field that's required when fillNAMethod is Fixed. */
  paddingValue?: number;
}

/** Diagnostics information to help inspect the states of a model or variable. */
export interface DiagnosticsInfoOutput {
  /** Model status. */
  modelState?: ModelStateOutput;
  /** Variable status. */
  variableStates?: Array<VariableStateOutput>;
}

/** Model status. */
export interface ModelStateOutput {
  /**
   * Number of passes of the entire training dataset that the
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
export interface AnomalyDetectionModelOutput {
  /** Model identifier. */
  modelId: string;
  /** Date and time (UTC) when the model was created. */
  createdTime: string;
  /** Date and time (UTC) when the model was last updated. */
  lastUpdatedTime: string;
  /**
   * Training result of a model, including its status, errors, and diagnostics
   * information.
   */
  modelInfo?: ModelInfoOutput;
}

/** Response of listing models. */
export interface ModelListOutput {
  /** List of models. */
  models: Array<AnomalyDetectionModelOutput>;
  /** Number of trained multivariate models. */
  currentCount: number;
  /** Maximum number of models that can be trained for this Anomaly Detector resource. */
  maxCount: number;
  /** Link to fetch more models. */
  nextLink?: string;
}

/** Results of the last detection. */
export interface MultivariateLastDetectionResultOutput {
  /** Variable status. */
  variableStates?: Array<VariableStateOutput>;
  /** Anomaly status and information. */
  results?: Array<AnomalyStateOutput>;
}

/** Alias for AnomalyDetectorErrorCodesOutput */
export type AnomalyDetectorErrorCodesOutput = string;
/** Alias for MultivariateBatchDetectionStatusOutput */
export type MultivariateBatchDetectionStatusOutput = string;
/** Alias for DataSchemaOutput */
export type DataSchemaOutput = string;
/** Alias for AlignModeOutput */
export type AlignModeOutput = string;
/** Alias for FillNAMethodOutput */
export type FillNAMethodOutput = string;
/** Alias for ModelStatusOutput */
export type ModelStatusOutput = string;
