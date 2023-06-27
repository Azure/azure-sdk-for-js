// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RouterJob as RouterJobGenerated,
  WorkerSelector as WorkerSelectorGenerated,
  JobQueue as JobQueueGenerated,
  RouterWorker as RouterWorkerGenerated,
  QueueSelector as QueueSelectorGenerated,
  StaticRule as StaticRuleGenerated,
  ReclassifyExceptionAction as ReclassifyExceptionActionGenerated,
  JobRouterReclassifyJobActionOptionalParams as JobRouterReclassifyJobActionOptionalParamsGenerated,
} from "../generated/src/models";

/* Safer types to use instead of any */
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

/** Describes a condition that must be met against a set of labels for worker selection */
export interface WorkerSelector extends Omit<WorkerSelectorGenerated, "value"> {
  /** The value to compare against the actual label value with the given operator */
  value?: JSONValue;
}

/** A queue that can contain jobs to be routed. */
export interface JobQueue extends Omit<JobQueueGenerated, "labels"> {
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
export interface QueueSelector extends Omit<QueueSelectorGenerated, "value"> {
  /** The value to compare against the actual label value with the given operator */
  value?: JSONValue;
}

/** A rule providing static rules that always return the same result, regardless of input. */
export interface StaticRule extends Omit<StaticRuleGenerated, "value"> {
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
  JobAssignment,
  ChannelConfiguration,
  WorkerAssignment,
  JobOffer,
  RouterWorkerState,
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
  QueueSelectorAttachmentUnion,
  QueueSelectorAttachment,
  QueueWeightedAllocation,
  WorkerWeightedAllocation,
  ScoringRuleOptions,
  RouterRuleUnion,
  RouterRule,
  DirectMapRule,
  ExpressionRule,
  WebhookRule,
  Oauth2ClientCredential,
  FunctionRule,
  FunctionRuleCredential,
  JobExceptionTriggerUnion,
  JobExceptionTrigger,
  QueueLengthExceptionTrigger,
  WaitTimeExceptionTrigger,
  ExceptionAction,
  CancelExceptionAction,
  ManualReclassifyExceptionAction,
  ExceptionActionUnion,
  ScoringRuleParameterSelector,
  JobRouterUpsertJobOptionalParams,
  JobRouterUpsertWorkerOptionalParams,
  JobRouterDeclineJobActionOptionalParams,
  DeclineJobOfferRequest,
  ClassificationPolicyItem,
  DistributionPolicyItem,
  ExceptionPolicyItem,
  JobQueueItem,
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
  RouterJobStatus,
  WorkerSelectorState,
  ConditionalWorkerSelectorAttachment,
  PassThroughWorkerSelectorAttachment,
  RuleEngineWorkerSelectorAttachment,
  StaticWorkerSelectorAttachment,
  WeightedAllocationWorkerSelectorAttachment,
  QueueStatistics,
} from "../generated/src/models";
