// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RouterJob as RouterJobGenerated,
  RouterWorkerSelector as RouterWorkerSelectorGenerated,
  RouterQueue as RouterQueueGenerated,
  RouterWorker as RouterWorkerGenerated,
  RouterQueueSelector as RouterQueueSelectorGenerated,
  StaticRouterRule as StaticRouterRuleGenerated,
  ReclassifyExceptionAction as ReclassifyExceptionActionGenerated,
  JobRouterReclassifyJobActionOptionalParams as JobRouterReclassifyJobActionOptionalParamsGenerated,
} from "../generated/src/models";

/**  Safer types to use instead of 'any'. */
export type JSONValue = boolean | number | string | null | JSONArray | JSONObject;
export interface JSONObject {
  [key: string]: JSONValue;
}
export interface JSONArray extends ArrayLike<JSONValue> {}

/** A unit of work to be routed */
export interface RouterJob extends Omit<RouterJobGenerated, "labels" | "tags"> {
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this job */
  tags?: JSONObject;
}

/** Describes a condition that must be met against a set of labels for worker selection. */
export interface RouterWorkerSelector extends Omit<RouterWorkerSelectorGenerated, "value"> {
  /** The value to compare against the actual label value with the given operator. */
  value?: JSONValue;
}

/** A queue that can contain jobs to be routed. */
export interface RouterQueue extends Omit<RouterQueueGenerated, "labels"> {
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
}

/** An entity for jobs to be routed to */
export interface RouterWorker
  extends Omit<RouterWorkerGenerated, "queueAssignments" | "labels" | "tags"> {
  /** The queue(s) that this worker can receive work from. */
  queueAssignments?: JSONObject;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this job */
  tags?: JSONObject;
}

/** Describes a condition that must be met against a set of labels for queue selection */
export interface RouterQueueSelector extends Omit<RouterQueueSelectorGenerated, "value"> {
  /** The value to compare against the actual label value with the given operator */
  value?: JSONValue;
}

/** A rule providing static rules that always return the same result, regardless of input. */
export interface StaticRouterRule extends Omit<StaticRouterRuleGenerated, "value"> {
  /** The static value this rule always returns. */
  value?: JSONValue;
}

/** An action that modifies labels on a job and then reclassifies it */
export interface ReclassifyExceptionAction
  extends Omit<ReclassifyExceptionActionGenerated, "labelsToUpsert"> {
  /** (optional) Dictionary containing the labels to update (or add if not existing) in key-value pairs */
  lablabelsToUpsertels?: JSONObject;
}

/** Contains response data for the reclassifyJobAction operation. */
export interface JobRouterReclassifyJobActionOptionalParams
  extends Omit<JobRouterReclassifyJobActionOptionalParamsGenerated, "body"> {
  /** The parsed response body. */
  body?: JSONValue;
}

/** Arguments for retrieving the next page of search results. */
export interface ListPageSettings {
  /** A token used for retrieving the next page of results when the server enforces pagination. */
  continuationToken?: string | null;
}

export {
  DistributionPolicy,
  ExceptionPolicy,
  ClassificationPolicy,
  ExceptionRule,
  RouterJobAssignment,
  ChannelConfiguration,
  RouterWorkerAssignment,
  RouterJobOffer,
  KnownExpressionRouterRuleLanguage as ExpressionRouterRuleLanguage,
  KnownRouterWorkerState as RouterWorkerState,
  RouterJobPositionDetails,
  KnownRouterWorkerStateSelector as RouterWorkerStateSelector,
  KnownRouterJobStatusSelector as RouterJobStatusSelector,
  KnownRouterWorkerSelectorStatus as RouterWorkerSelectorStatus,
  KnownLabelOperator as LabelOperator,
  DistributionModeUnion,
  DistributionMode,
  BestWorkerMode,
  LongestIdleMode,
  RoundRobinMode,
  WorkerSelectorAttachmentUnion,
  WorkerSelectorAttachment,
  QueueSelectorAttachmentUnion,
  QueueSelectorAttachment,
  QueueWeightedAllocation,
  WorkerWeightedAllocation,
  ScoringRuleOptions,
  RouterRuleUnion,
  RouterRule,
  DirectMapRouterRule,
  ExpressionRouterRule,
  WebhookRouterRule,
  Oauth2ClientCredential,
  FunctionRouterRule,
  FunctionRouterRuleCredential,
  ExceptionTriggerUnion,
  ExceptionTrigger,
  QueueLengthExceptionTrigger,
  WaitTimeExceptionTrigger,
  ExceptionAction,
  CancelExceptionAction,
  ManualReclassifyExceptionAction,
  ExceptionActionUnion,
  KnownScoringRuleParameterSelector as ScoringRuleParameterSelector,
  JobRouterUpsertJobOptionalParams,
  JobRouterUpsertWorkerOptionalParams,
  JobRouterDeclineJobActionOptionalParams,
  DeclineJobOfferRequest,
  ClassificationPolicyItem,
  DistributionPolicyItem,
  ExceptionPolicyItem,
  RouterQueueItem,
  RouterJobItem,
  RouterWorkerItem,
  JobRouterCancelJobActionOptionalParams,
  JobRouterCloseJobActionOptionalParams,
  JobRouterCompleteJobActionOptionalParams,
  JobRouterAdministrationUpsertClassificationPolicyOptionalParams,
  JobRouterAdministrationUpsertDistributionPolicyOptionalParams,
  JobRouterAdministrationUpsertExceptionPolicyOptionalParams,
  JobRouterAdministrationUpsertQueueOptionalParams,
  ConditionalQueueSelectorAttachment,
  PassThroughQueueSelectorAttachment,
  RuleEngineQueueSelectorAttachment,
  StaticQueueSelectorAttachment,
  WeightedAllocationQueueSelectorAttachment,
  AcceptJobOfferResult,
  UnassignJobResult,
  KnownRouterJobStatus as RouterJobStatus,
  ConditionalWorkerSelectorAttachment,
  PassThroughWorkerSelectorAttachment,
  RuleEngineWorkerSelectorAttachment,
  StaticWorkerSelectorAttachment,
  WeightedAllocationWorkerSelectorAttachment,
  RouterQueueStatistics,
  JobMatchingMode,
  KnownJobMatchModeType as JobMatchModeType,
} from "../generated/src/models";
