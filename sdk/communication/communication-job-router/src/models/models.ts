// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RouterJob as RouterJobGenerated,
  RouterQueue as RouterQueueGenerated,
  RouterQueueSelector as RouterQueueSelectorGenerated,
  RouterWorker as RouterWorkerGenerated,
  RouterWorkerSelector as RouterWorkerSelectorGenerated,
  StaticRouterRule as StaticRouterRuleGenerated,
  ReclassifyExceptionAction as ReclassifyExceptionActionGenerated,
  JobMatchingMode as JobMatchingModeGenerated,
  JobMatchModeType,
  ScheduleAndSuspendMode,
} from "../generated/src";

/**  Safer type to use instead of 'any'. */
export type JSONValue = boolean | number | string | null | JSONArray | JSONObject;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface JSONArray extends ArrayLike<JSONValue> {}

/**
 * Message with timestamp on a router job.
 */
export interface RouterJobNote {
  /** Timestamp of when the note was recorded */
  time: Date;
  /** Content of the note */
  message: string;
}

/** A unit of work to be routed */
export interface RouterJob extends Omit<RouterJobGenerated, "labels" | "tags"> {
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this job */
  tags?: JSONObject;
}

export interface QueueAndMatchMode {}

export interface SuspendMode {}

export interface RouterJobMatchingMode extends JobMatchingModeGenerated {
  modeType?: JobMatchModeType;
  queueAndMatchMode?: QueueAndMatchMode;
  scheduleAndSuspendMode?: ScheduleAndSuspendMode;
  suspendMode?: SuspendMode;
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
  labelsToUpsert?: JSONObject;
}

/** Arguments for retrieving the next page of search results. */
export interface ListPageSettings {
  /** A token used for retrieving the next page of results when the server enforces pagination. */
  continuationToken?: string | null;
}

export {
  RouterJob as RouterJobGenerated,
  RouterQueue as RouterQueueGenerated,
  RouterQueueSelector as RouterQueueSelectorGenerated,
  RouterWorker as RouterWorkerGenerated,
  RouterWorkerSelector as RouterWorkerSelectorGenerated,
  StaticRouterRule as StaticRouterRuleGenerated,
  ReclassifyExceptionAction as ReclassifyExceptionActionGenerated,
  JobMatchingMode as JobMatchingModeGenerated,
  Oauth2ClientCredential,
  ClassificationPolicy,
  DistributionPolicy,
  ExceptionPolicy,
  ChannelConfiguration,
  RouterQueueStatistics,
  RouterJobOffer,
  RouterJobPositionDetails,
  RouterJobAssignment,
  RouterWorkerAssignment,
  ClassificationPolicyItem,
  DistributionPolicyItem,
  ExceptionPolicyItem,
  RouterWorkerItem,
  RouterQueueItem,
  RouterJobItem,
  ScheduleAndSuspendMode,
  DistributionMode,
  LongestIdleMode,
  BestWorkerMode,
  ScoringRuleOptions,
  RoundRobinMode,
  WorkerWeightedAllocation,
  QueueWeightedAllocation,
  ExceptionRule,
  QueueLengthExceptionTrigger,
  WaitTimeExceptionTrigger,
  ExceptionTrigger,
  ManualReclassifyExceptionAction,
  CancelExceptionAction,
  ExceptionAction,
  FunctionRouterRuleCredential,
  ExpressionRouterRule,
  DirectMapRouterRule,
  FunctionRouterRule,
  WebhookRouterRule,
  RouterRule,
  WorkerSelectorAttachmentUnion,
  QueueSelectorAttachmentUnion,
  ExceptionTriggerUnion,
  DistributionModeUnion,
  ExceptionActionUnion,
  RouterRuleUnion,
  WeightedAllocationWorkerSelectorAttachment,
  WeightedAllocationQueueSelectorAttachment,
  ConditionalWorkerSelectorAttachment,
  PassThroughWorkerSelectorAttachment,
  ConditionalQueueSelectorAttachment,
  PassThroughQueueSelectorAttachment,
  RuleEngineWorkerSelectorAttachment,
  RuleEngineQueueSelectorAttachment,
  StaticWorkerSelectorAttachment,
  StaticQueueSelectorAttachment,
  WorkerSelectorAttachment,
  QueueSelectorAttachment,
  KnownExpressionRouterRuleLanguage,
  ExpressionRouterRuleLanguage,
  KnownScoringRuleParameterSelector,
  ScoringRuleParameterSelector,
  KnownRouterWorkerSelectorStatus,
  RouterWorkerSelectorStatus,
  KnownRouterWorkerStateSelector,
  RouterWorkerStateSelector,
  KnownRouterJobStatusSelector,
  RouterJobStatusSelector,
  KnownRouterWorkerState,
  RouterWorkerState,
  KnownJobMatchModeType,
  JobMatchModeType,
  KnownRouterJobStatus,
  RouterJobStatus,
  KnownLabelOperator,
  LabelOperator,
} from "../generated/src";
