// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  JobMatchModeType as RouterJobMatchModeType,
  RouterRule,
  DirectMapRouterRule,
  ExpressionRouterRule,
  FunctionRouterRule,
  WebhookRouterRule,
  ScheduleAndSuspendMode,
  RouterWorkerState,
  ChannelConfiguration,
  RouterJobOffer,
  RouterWorkerAssignment,
  RouterJobStatus,
  RouterJobAssignment,
  LabelOperator,
  RouterWorkerSelectorStatus,
  ExceptionAction,
  CancelExceptionAction,
  ManualReclassifyExceptionAction,
  ExceptionTriggerUnion,
} from "../generated/src";

/** Safe type instead of 'any'. */
export type JSONValue = boolean | number | string | null | JSONArray | JSONObject;

/** Safe type for objects. */
export interface JSONObject {
  [key: string]: JSONValue;
}

/** Safe type for arrays. */
export interface JSONArray extends ArrayLike<JSONValue> { }

/**
 * Note with timestamp for a router job.
 */
export interface RouterJobNote {
  /** Timestamp in UTC of when the note was recorded. */
  addedAt: Date;
  /** The content of the note. */
  message: string;
}

/** Queue and match job matching mode type. */
export interface QueueAndMatchMode { }

/** Suspend job matching mode type. */
export interface SuspendMode { }

/** Queue and match job matching mode. */
export interface RouterJobMatchingMode {
  /** Type of matching mode. */
  modeType?: RouterJobMatchModeType;
  /** (Optional) Options for when match mode is queue and match. */
  queueAndMatchMode?: QueueAndMatchMode;
  /** (Optional) Options for when match mode is schedule and suspend. */
  scheduleAndSuspendMode?: ScheduleAndSuspendMode;
  /** (Optional) Options for when match mode is suspend. */
  suspendMode?: SuspendMode;
}

/** A unit of work to be routed. */
export interface RouterJob {
  /**
   * The id of the job.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /** Reference to an external parent context, eg. call id. */
  channelReference?: string;
  /**
   * The status of the Job.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: RouterJobStatus;
  /**
   * The time a job was queued in UTC.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly enqueuedAt?: Date;
  /** The channel identifier. eg. voice, chat, etc. */
  channelId?: string;
  /** The Id of the Classification policy used for classifying a job. */
  classificationPolicyId?: string;
  /** The Id of the Queue that this job is queued to. */
  queueId?: string;
  /** The priority of this job. */
  priority?: number;
  /** Reason code for cancelled or closed jobs. */
  dispositionCode?: string;
  /** A collection of manually specified label selectors, which a worker must satisfy in order to process this job. */
  requestedWorkerSelectors?: RouterWorkerSelector[];
  /**
   * A collection of label selectors attached by a classification policy, which a worker must satisfy in order to process this job.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly attachedWorkerSelectors?: RouterWorkerSelector[];
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /**
   * A collection of the assignments of the job.
   * Key is AssignmentId.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assignments?: { [propertyName: string]: RouterJobAssignment };
  /** A set of non-identifying attributes attached to this job */
  tags?: JSONObject;
  /** Notes attached to a job, sorted by timestamp */
  notes?: RouterJobNote[];
  /**
   * If set, job will be scheduled to be enqueued at a given time
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly scheduledAt?: Date;
  /** The mode the job is matched as. */
  matchingMode?: RouterJobMatchingMode;
}

/** An entity for jobs to be routed to. */
export interface RouterWorker {
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly id?: string;
  /**
   * The current state of the worker.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly state?: RouterWorkerState;
  /** The queue(s) that this worker can receive work from. */
  queueAssignments?: JSONObject;
  /** The total capacity score this worker has to manage multiple concurrent jobs. */
  totalCapacity?: number;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this worker. */
  tags?: JSONObject;
  /** The channel(s) this worker can handle and their impact on the workers capacity. */
  channelConfigurations?: { [propertyName: string]: ChannelConfiguration };
  /**
   * A list of active offers issued to this worker.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly offers?: RouterJobOffer[];
  /**
   * A list of assigned jobs attached to this worker.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assignedJobs?: RouterWorkerAssignment[];
  /**
   * A value indicating the workers capacity. A value of '1' means all capacity is consumed. A value of '0' means no capacity is currently consumed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly loadRatio?: number;
  /** A flag indicating this worker is open to receive offers or not. */
  availableForOffers?: boolean;
}

/** Describes a condition that must be met against a set of labels for worker selection. */
export interface RouterWorkerSelector {
  /** The label key to query against */
  key: string;
  /** Describes how the value of the label is compared to the value defined on the label selector */
  labelOperator: LabelOperator;
  /** The value to compare against the actual label value with the given operator */
  value?: JSONValue;
  /** Describes how long this label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** Pushes the job to the front of the queue as long as this selector is active. */
  expedite?: boolean;
  /**
   * The status of the worker selector.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: RouterWorkerSelectorStatus;
  /**
   * The time at which this worker selector expires in UTC
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly expiresAt?: Date;
}

/** A queue that can contain jobs to be routed. */
export interface RouterQueue {
  /**
   * The Id of this queue
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /** The name of this queue. */
  name?: string;
  /** The id of the distribution policy that will determine how a job is distributed to workers. */
  distributionPolicyId?: string;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** (Optional) The id of the exception policy that determines various job escalation rules. */
  exceptionPolicyId?: string;
}

/** Paged instance of RouterJob */
export interface RouterJobItem {
  /** A unit of work to be routed */
  job?: RouterJob;
  /** (Optional) The Concurrency Token. */
  etag?: string;
}

/** Paged instance of RouterWorker */
export interface RouterWorkerItem {
  /** An entity for jobs to be routed to */
  worker?: RouterWorker;
  /** (Optional) The Concurrency Token. */
  etag?: string;
}

/** Paged instance of RouterQueue */
export interface RouterQueueItem {
  /** A queue that can contain jobs to be routed. */
  queue?: RouterQueue;
  /** (Optional) The Concurrency Token. */
  etag?: string;
}

/** Describes a condition that must be met against a set of labels for queue selection. */
export interface RouterQueueSelector {
  /** The label key to query against. */
  key: string;
  /** Describes how the value of the label is compared to the value defined on the label selector. */
  labelOperator: LabelOperator;
  /** The value to compare against the actual label value with the given operator. */
  value?: JSONValue;
}

/** A rule providing static rules that always return the same result, regardless of input. */
export interface StaticRouterRule extends RouterRule {
  /** Polymorphic discriminator, which specifies the different types this object can be. */
  kind: "static-rule";
  /** The static value this rule always returns. */
  value?: JSONValue;
}

/** An action that modifies labels on a job and then reclassifies it */
export interface ReclassifyExceptionAction extends ExceptionAction {
  /** Polymorphic discriminator, which specifies the different types this object can be. */
  kind: "reclassify";
  /** (optional) The new classification policy that will determine queue, priority and worker selectors. */
  classificationPolicyId?: string;
  /** (optional) Dictionary containing the labels to update (or add if not existing) in key-value pairs. */
  labelsToUpsert?: JSONObject;
}

/** A rule that defines actions to execute upon a specific trigger. */
export interface ExceptionRule {
  /** The trigger for this exception rule */
  trigger: ExceptionTriggerUnion;
  /** A dictionary collection of actions to perform once the exception is triggered. Key is the Id of each exception action. */
  actions: { [propertyName: string]: ExceptionActionUnion };
}

/** A policy that defines actions to execute when exception are triggered. */
export interface ExceptionPolicy {
  /**
   * The Id of the exception policy
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /** (Optional) The name of the exception policy. */
  name?: string;
  /** (Optional) A dictionary collection of exception rules on the exception policy. Key is the Id of each exception rule. */
  exceptionRules?: { [propertyName: string]: ExceptionRule };
}

/** Arguments for retrieving the next page of search results. */
export interface ListPageSettings {
  /** A token used for retrieving the next page of results when the server enforces pagination. */
  continuationToken?: string | null;
}

export type RouterRuleUnion =
  | RouterRule
  | DirectMapRouterRule
  | ExpressionRouterRule
  | FunctionRouterRule
  | WebhookRouterRule
  | StaticRouterRule;

export type ExceptionActionUnion =
  | ExceptionAction
  | CancelExceptionAction
  | ManualReclassifyExceptionAction
  | ReclassifyExceptionAction;

export {
  Oauth2ClientCredential,
  ClassificationPolicy,
  DistributionPolicy,
  ChannelConfiguration,
  RouterQueueStatistics,
  RouterQueueStatistics,
  RouterJobOffer,
  RouterJobPositionDetails,
  RouterJobAssignment,
  RouterWorkerAssignment,
  ClassificationPolicyItem,
  DistributionPolicyItem,
  ExceptionPolicyItem,
  ScheduleAndSuspendMode,
  DistributionMode,
  LongestIdleMode,
  BestWorkerMode,
  ScoringRuleOptions,
  BestWorkerMode,
  ScoringRuleOptions,
  RoundRobinMode,
  WorkerWeightedAllocation,
  QueueWeightedAllocation,
  QueueLengthExceptionTrigger,
  WaitTimeExceptionTrigger,
  ExceptionTrigger,
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
  WeightedAllocationWorkerSelectorAttachment,
  WeightedAllocationQueueSelectorAttachment,
  ConditionalWorkerSelectorAttachment,
  PassThroughWorkerSelectorAttachment,
  ConditionalQueueSelectorAttachment,
  PassThroughQueueSelectorAttachment,
  ConditionalQueueSelectorAttachment,
  PassThroughQueueSelectorAttachment,
  RuleEngineWorkerSelectorAttachment,
  RuleEngineQueueSelectorAttachment,
  RuleEngineQueueSelectorAttachment,
  StaticWorkerSelectorAttachment,
  StaticQueueSelectorAttachment,
  WorkerSelectorAttachment,
  QueueSelectorAttachment,
  KnownExpressionRouterRuleLanguage as ExpressionRouterRuleLanguage,
  KnownScoringRuleParameterSelector as ScoringRuleParameterSelector,
  KnownRouterWorkerSelectorStatus as RouterWorkerSelectorStatus,
  KnownRouterWorkerStateSelector as RouterWorkerStateSelector,
  KnownRouterJobStatusSelector as RouterJobStatusSelector,
  KnownRouterWorkerState as RouterWorkerState,
  KnownJobMatchModeType as RouterJobMatchModeType,
  KnownRouterJobStatus as RouterJobStatus,
  KnownLabelOperator as LabelOperator,
} from "../generated/src";
