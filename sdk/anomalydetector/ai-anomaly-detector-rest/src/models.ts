// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Request of the entire or last anomaly detection. */
export interface UnivariateDetectionOptions {
  /**
   * Time series data points. Points should be sorted by time stamp in ascending
   * order to match the anomaly detection result. If the data is not sorted
   * correctly or there's a duplicated time stamp, the API won't work. In such
   * a case, an error message is returned.
   */
  series: Array<TimeSeriesPoint>;
  /**
   * Argument that indicates time granularity. If granularity is not present, the value
   * is none by default. If granularity is none, the time stamp property in the time
   * series point can be absent.
   *
   * Possible values: "yearly", "monthly", "weekly", "daily", "hourly", "minutely", "secondly", "microsecond", "none"
   */
  granularity?: TimeGranularity;
  /**
   * A custom interval is used to set a nonstandard time interval. For example, if the
   * series is 5 minutes, the request can be set as {"granularity":"minutely",
   * "customInterval":5}.
   */
  customInterval?: number;
  /**
   * Argument that indicates the periodic value of a time series. If the value is null or
   * is not present, the API determines the period automatically.
   */
  period?: number;
  /** Argument that indicates an advanced model parameter. It's the maximum anomaly ratio in a time series. */
  maxAnomalyRatio?: number;
  /**
   * Argument that indicates an advanced model parameter between 0 and 99. The lower the value
   * is, the larger the margin value is, which means fewer anomalies will be
   * accepted.
   */
  sensitivity?: number;
  /**
   * Specifies how to deal with missing values in the input series. It's used
   * when granularity is not "none".
   *
   * Possible values: "auto", "previous", "linear", "fixed", "zero", "notFill"
   */
  imputeMode?: ImputeMode;
  /**
   * Specifies the value to fill. It's used when granularity is not "none"
   * and imputeMode is "fixed".
   */
  imputeFixedValue?: number;
}

/** Definition of input time series points. */
export interface TimeSeriesPoint {
  /** Argument that indicates the time stamp of a data point (ISO8601 format). */
  timestamp?: Date | string;
  /** Measurement of that point. */
  value: number;
}

/** Request of change point detection. */
export interface UnivariateChangePointDetectionOptions {
  /**
   * Time series data points. Points should be sorted by time stamp in ascending
   * order to match the change point detection result.
   */
  series: Array<TimeSeriesPoint>;
  /**
   * Granularity is used to verify whether the input series is valid.
   *
   * Possible values: "yearly", "monthly", "weekly", "daily", "hourly", "minutely", "secondly", "microsecond", "none"
   */
  granularity: TimeGranularity;
  /**
   * A custom interval is used to set a nonstandard time interval. For example, if the
   * series is 5 minutes, the request can be set as {"granularity":"minutely",
   * "customInterval":5}.
   */
  customInterval?: number;
  /**
   * Argument that indicates the periodic value of a time series. If the value is null or
   * not present, the API will determine the period automatically.
   */
  period?: number;
  /**
   * Argument that indicates an advanced model parameter. A default stableTrendWindow value will
   * be used in detection.
   */
  stableTrendWindow?: number;
  /**
   * Argument that indicates an advanced model parameter between 0.0 and 1.0. The lower the
   * value is, the larger the trend error is, which means less change point will
   * be accepted.
   */
  threshold?: number;
}

/** Error information that the API returned. */
export interface ErrorResponse {
  /** Error code. */
  code: string;
  /** Message that explains the error that the service reported. */
  message: string;
}

/** Variable status. */
export interface VariableState {
  /** Variable name in variable states. */
  variable?: string;
  /** Proportion of missing values that need to be filled by fillNAMethod. */
  filledNARatio?: number;
  /** Number of effective data points before fillNAMethod is applied. */
  effectiveCount?: number;
  /** First valid time stamp with a value of input data. */
  firstTimestamp?: Date | string;
  /** Last valid time stamp with a value of input data. */
  lastTimestamp?: Date | string;
}

/**
 * Detection request for batch inference. This is an asynchronous inference that
 * will need another API to get detection results.
 */
export interface MultivariateBatchDetectionOptions {
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
  startTime: Date | string;
  /**
   * End date/time of data for detection, which should
   * be in ISO 8601 format.
   */
  endTime: Date | string;
}

/**
 * Training result of a model, including its status, errors, and diagnostics
 * information.
 */
export interface ModelInfo {
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
  dataSchema?: DataSchema;
  /**
   * Start date/time of training data, which should be
   * in ISO 8601 format.
   */
  startTime: Date | string;
  /**
   * End date/time of training data, which should be
   * in ISO 8601 format.
   */
  endTime: Date | string;
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
  alignPolicy?: AlignPolicy;
}

/** Manner of aligning multiple variables. */
export interface AlignPolicy {
  /**
   * Field that indicates how to align different variables to the same
   * time range.
   *
   * Possible values: "Inner", "Outer"
   */
  alignMode?: AlignMode;
  /**
   * Field that indicates how missing values will be filled.
   *
   * Possible values: "Previous", "Subsequent", "Linear", "Zero", "Fixed"
   */
  fillNAMethod?: FillNAMethod;
  /** Field that's required when fillNAMethod is Fixed. */
  paddingValue?: number;
}

/** Diagnostics information to help inspect the states of a model or variable. */
export interface DiagnosticsInfo {
  /** Model status. */
  modelState?: ModelState;
  /** Variable status. */
  variableStates?: Array<VariableState>;
}

/** Model status. */
export interface ModelState {
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

/** Request of the last detection. */
export interface MultivariateLastDetectionOptions {
  /**
   * Contains the inference data, including the name, time stamps (ISO 8601), and
   * values of variables.
   */
  variables: Array<VariableValues>;
  /**
   * Number of top contributed
   * variables for one anomalous time stamp in the response. The default is
   * 10.
   */
  topContributorCount?: number;
}

/** Variable values. */
export interface VariableValues {
  /** Variable name of the last detection request. */
  variable: string;
  /** Time stamps of the last detection request. */
  timestamps: string[];
  /** Values of variables. */
  values: number[];
}

/** Alias for TimeGranularity */
export type TimeGranularity = string;
/** Alias for ImputeMode */
export type ImputeMode = string;
/** Alias for DataSchema */
export type DataSchema = string;
/** Alias for AlignMode */
export type AlignMode = string;
/** Alias for FillNAMethod */
export type FillNAMethod = string;
/** Alias for ModelStatus */
export type ModelStatus = string;
/** Alias for APIVersion */
export type APIVersion = "v1.1";
