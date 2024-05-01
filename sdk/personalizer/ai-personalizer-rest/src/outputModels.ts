// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ServiceConfigurationOutput {
  /**
   * The time span waited until a request is marked with the default reward
   * and should be between 5 seconds and 2 days.
   * For example, PT5M (5 mins). For information about the time format,
   * see http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  rewardWaitTime: string;
  /** The reward given if a reward is not received within the specified wait time. */
  defaultReward: number;
  /** The function used to process rewards, if multiple reward scores are received before rewardWaitTime is over. */
  rewardAggregation: string;
  /** The percentage of rank responses that will use exploration. */
  explorationPercentage: number;
  /**
   * Personalizer will start using the most updated trained model for online ranks automatically every specified time period.
   * For example, PT5M (5 mins). For information about the time format,
   * see http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  modelExportFrequency: string;
  /** Flag indicates whether log mirroring is enabled. */
  logMirrorEnabled?: boolean;
  /** Azure storage account container SAS URI for log mirroring. */
  logMirrorSasUri?: string;
  /** Number of days historical logs are to be maintained. -1 implies the logs will never be deleted. */
  logRetentionDays: number;
  /** Last time model training configuration was updated */
  lastConfigurationEditDate?: string;
  /** Learning Modes for Personalizer */
  learningMode?: "Online" | "Apprentice" | "LoggingOnly";
  /** Flag indicating whether Personalizer will automatically optimize Learning Settings by running Offline Evaluations periodically. */
  isAutoOptimizationEnabled?: boolean;
  /**
   * Frequency of automatic optimization. Only relevant if IsAutoOptimizationEnabled is true.
   * For example, PT5M (5 mins). For information about the time format,
   * \r\nsee http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  autoOptimizationFrequency?: string;
  /** Date when the first automatic optimization evaluation must be performed. Only relevant if IsAutoOptimizationEnabled is true. */
  autoOptimizationStartDate?: string;
}

export interface ErrorResponseOutput {
  /** The error object. */
  error: PersonalizerErrorOutput;
}

export interface PersonalizerErrorOutput {
  /** Error Codes returned by Personalizer */
  code?:
    | "BadRequest"
    | "InvalidServiceConfiguration"
    | "InvalidLearningModeServiceConfiguration"
    | "InvalidPolicyConfiguration"
    | "InvalidPolicyContract"
    | "InvalidEvaluationContract"
    | "DuplicateCustomPolicyNames"
    | "NoLogsExistInDateRange"
    | "LogsSizeExceedAllowedLimit"
    | "InvalidRewardRequest"
    | "InvalidEventIdToActivate"
    | "InvalidRankRequest"
    | "InvalidExportLogsRequest"
    | "InvalidRequest"
    | "InvalidContainer"
    | "InvalidModelMetadata"
    | "ApprenticeModeNeverTurnedOn"
    | "MissingAppId"
    | "InvalidRewardWaitTime"
    | "InvalidLogRetentionDays"
    | "InvalidMultiSlotApiAccess"
    | "PayloadSizeExceeded"
    | "InvalidModelImportSignature"
    | "InvalidModelImportFormat"
    | "InvalidApiAccess"
    | "ModelFileAccessDenied"
    | "ProblemTypeIncompatibleWithAutoOptimization"
    | "ResourceNotFound"
    | "FrontEndNotFound"
    | "EvaluationNotFound"
    | "LearningSettingsNotFound"
    | "EvaluationModelNotFound"
    | "LogsPropertiesNotFound"
    | "ModelRankingError"
    | "InternalServerError"
    | "RankNullResponse"
    | "UpdateConfigurationFailed"
    | "ModelResetFailed"
    | "ModelPublishFailed"
    | "ModelMetadataUpdateFailed"
    | "OperationNotAllowed";
  /** A message explaining the error reported by the service. */
  message?: string;
  /** Error source element. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details?: Array<PersonalizerErrorOutput>;
  /** An object containing more specific information than the parent object about the error. */
  innerError?: InternalErrorOutput;
}

export interface InternalErrorOutput {
  /** Detailed error code. */
  code?: string;
  /** An object containing more specific information than the parent object about the error. */
  innererror?: InternalErrorOutput;
}

export interface PolicyContractOutput {
  /** Name of the learning settings. */
  name: string;
  /** Arguments of the learning settings. */
  arguments: string;
}

export interface EvaluationOutput {
  /** The ID of the evaluation. */
  id: string;
  /** The name of the evaluation. */
  name: string;
  /** The start time of the evaluation. */
  startTime: string;
  /** The end time of the evaluation. */
  endTime: string;
  /** The ID of the job processing the evaluation. */
  jobId: string;
  /** The status of the job processing the evaluation. */
  status:
    | "completed"
    | "pending"
    | "failed"
    | "notSubmitted"
    | "timeout"
    | "optimalPolicyApplied"
    | "onlinePolicyRetained";
  /** The results of the evaluation. */
  policyResults?: Array<PolicyResultOutput>;
  /** Feature Importance. */
  featureImportance?: Array<Array<string>>;
  /** Evaluation type (manual or through Automatic Optimization). */
  evaluationType: "Manual" | "Auto";
  /** Thr optimal policy. */
  optimalPolicy?: string;
  /** Creation time. */
  creationTime: string;
}

export interface PolicyResultOutput {
  /** The name of the Learning Settings. */
  name: string;
  /** The arguments of the Learning Settings. */
  arguments: string;
  /** The source of the Learning Settings. */
  policySource: "Online" | "Baseline" | "Random" | "Custom" | "OfflineExperimentation";
  /** The aggregate results of the Offline Evaluation. */
  summary: Array<PolicyResultSummaryOutput>;
  /** The aggregate total of the Offline Evaluation. */
  totalSummary: PolicyResultTotalSummaryOutput;
}

export interface PolicyResultSummaryOutput {
  /** Timestamp of the aggregation. */
  timeStamp: string;
  /** Numerator for IPS estimator. */
  ipsEstimatorNumerator: number;
  /** Denominator for IPS estimator. */
  ipsEstimatorDenominator: number;
  /** Denominator for SNIPS estimator. */
  snipsEstimatorDenominator: number;
  /**
   * Time window for aggregation.
   * For example, PT5M (5 mins). For information about the time format,
   * see http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  aggregateTimeWindow: string;
  /** Probability of non-zero values for the Policy evaluation. */
  nonZeroProbability?: number;
  /** Sum of Squares for the Policy evaluation results. */
  sumOfSquares?: number;
  /** Gaussian confidence interval for the Policy evaluation. */
  confidenceInterval?: number;
  /** Average reward. */
  averageReward: number;
}

export interface PolicyResultTotalSummaryOutput extends PolicyResultSummaryOutput {}

export interface LogsPropertiesOutput {
  /** Date range. */
  dateRange: LogsPropertiesDateRangeOutput;
}

export interface LogsPropertiesDateRangeOutput extends DateRangeOutput {}

export interface DateRangeOutput {
  /** Start date for the range. */
  from: string;
  /** End date for the range. */
  to: string;
}

export interface ModelPropertiesOutput {
  /** Creation time of the model. */
  creationTime: string;
  /** Last time the model was modified. */
  lastModifiedTime: string;
}

export interface MultiSlotRankResponseOutput {
  /** Each slot has a corresponding rewardActionID which is the action ID recommended by Personalizer. */
  slots: Array<SlotResponseOutput>;
  /** The eventId for the round trip from request to response. */
  eventId: string;
}

export interface SlotResponseOutput {
  /** Id is the slot ID. */
  id: string;
  /** RewardActionID is the action ID recommended by Personalizer. */
  rewardActionId: string;
}

export interface RankResponseOutput {
  /** The calculated ranking for the current request. */
  ranking: Array<RankedActionOutput>;
  /** The eventId for the round trip from request to response. */
  eventId: string;
  /**
   * The action chosen by the Personalizer service.
   * This is the action your application should display, and for which to report the reward.
   * This might not be the first found in 'ranking'.
   */
  rewardActionId: string;
}

export interface RankedActionOutput {
  /** Id of the action */
  id: string;
  /** Probability of the action */
  probability: number;
}
