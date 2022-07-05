// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string | null;
}

export {
  DistributionPolicy,
  ExceptionPolicy,
  ClassificationPolicy,
  JobQueue,
  RouterWorker,
  RouterJob,
  ExceptionRule,
  JobAssignment,
  ChannelConfiguration,
  WorkerAssignment,
  JobOffer,
  RouterWorkerState,
  KnownRouterWorkerState,
  PagedWorkerState,
  KnownPagedWorkerState,
  JobStatus,
  WorkerSelector,
  JobPositionDetails,
  WorkerStateSelector,
  JobStateSelector,
  LabelOperator,
  DistributionModeUnion,
  DistributionMode,
  BestWorkerMode,
  LongestIdleMode,
  RoundRobinMode,
  WorkerSelectorAttachmentUnion,
  WorkerSelectorAttachment,
  ConditionalWorkerSelector,
  PassThroughWorkerSelector,
  RuleEngineWorkerSelector,
  StaticWorkerSelector,
  WeightedAllocationWorkerSelector,
  QueueSelectorAttachmentUnion,
  QueueSelectorAttachment,
  ConditionalQueueSelector,
  PassThroughQueueSelector,
  RuleEngineQueueSelector,
  StaticQueueSelector,
  WeightedAllocationQueueSelector,
  QueueSelector,
  QueueWeightedAllocation,
  AzureFunctionRuleCredential,
  WorkerWeightedAllocation,
  ScoringRuleOptions,
  RouterRuleUnion,
  RouterRule,
  AzureFunctionRule,
  DirectMapRule,
  ExpressionRule,
  StaticRule,
  JobExceptionTriggerUnion,
  JobExceptionTrigger,
  QueueLengthExceptionTrigger,
  WaitTimeExceptionTrigger,
  ScoringRuleParameterSelector,
  JobRouterUpsertClassificationPolicyOptionalParams,
  JobRouterUpsertDistributionPolicyOptionalParams,
  JobRouterUpsertExceptionPolicyOptionalParams,
  JobRouterUpsertJobOptionalParams,
  JobRouterUpsertQueueOptionalParams,
  JobRouterUpsertWorkerOptionalParams,
  JobRouterReclassifyJobActionOptionalParams,
  PagedExceptionPolicy,
  PagedClassificationPolicy,
  PagedDistributionPolicy,
  PagedJob,
  PagedQueue,
  PagedWorker
} from "../generated/src/models";
