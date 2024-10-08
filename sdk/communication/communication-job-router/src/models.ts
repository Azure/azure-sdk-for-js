// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ScoringRuleParameterSelector,
  ExpressionRouterRuleLanguage,
  RouterWorkerSelectorStatus,
  JobMatchModeType,
  RouterWorkerState,
  RouterJobStatus,
  LabelOperator,
  RouterRule,
  DirectMapRouterRule,
  FunctionRouterRule,
  WebhookRouterRule,
  ScheduleAndSuspendMode,
  ChannelConfiguration,
  RouterJobOffer,
  RouterWorkerAssignment,
  RouterJobAssignment,
  ExceptionAction,
  CancelExceptionAction,
  ExceptionTriggerUnion,
  DistributionMode,
  QueueSelectorAttachment,
  WorkerSelectorAttachment,
  LongestIdleMode,
  RoundRobinMode,
} from "./generated/src";

/** Safe type instead of 'any'. */
export type JSONValue = boolean | number | string | JSONArray | JSONObject;

/** Safe type for objects. */
export interface JSONObject {
  [key: string]: JSONValue;
}

/** Safe type for arrays. */
export interface JSONArray extends ArrayLike<JSONValue> {}

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
export interface QueueAndMatchMode {}

/** Suspend job matching mode type. */
export interface SuspendMode {}

/** Queue and match job matching mode. */
export interface RouterJobMatchingMode {
  /** Type of matching mode. */
  modeType?: JobMatchModeType;
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

/** Paged instance of ExceptionPolicy */
export interface ExceptionPolicyItem {
  /** A policy that defines actions to execute when exception are triggered. */
  exceptionPolicy?: ExceptionPolicy;
  /** (Optional) The Concurrency Token. */
  etag?: string;
}

/** A container for the rules that govern how jobs are classified. */
export interface ClassificationPolicy {
  /**
   * Unique identifier of this policy.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /** Friendly name of this policy. */
  name?: string;
  /** The fallback queue to select if the queue selector doesn't find a match. */
  fallbackQueueId?: string;
  /** The queue selectors to resolve a queue for a given job. */
  queueSelectors?: QueueSelectorAttachmentUnion[];
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
   * DirectMapRule:  A rule that return the same labels as the input labels.
   * ExpressionRule: A rule providing inline expression rules.
   * AzureFunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
   * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
   */
  prioritizationRule?: RouterRuleUnion;
  /** The worker label selectors to attach to a given job. */
  workerSelectors?: WorkerSelectorAttachmentUnion[];
}

/** Paged instance of ClassificationPolicy */
export interface ClassificationPolicyItem {
  /** A container for the rules that govern how jobs are classified. */
  classificationPolicy?: ClassificationPolicy;
  /** (Optional) The Concurrency Token. */
  etag?: string;
}

/** Policy governing how jobs are distributed to workers */
export interface DistributionPolicy {
  /**
   * The unique identifier of the policy.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /** The human readable name of the policy. */
  name?: string;
  /** The number of seconds after which any offers created under this policy will be expired. */
  offerExpiresAfterSeconds?: number;
  /** Abstract base class for defining a distribution mode */
  mode?: DistributionModeUnion;
}

/** Paged instance of DistributionPolicy */
export interface DistributionPolicyItem {
  /** Policy governing how jobs are distributed to workers */
  distributionPolicy?: DistributionPolicy;
  /** (Optional) The Concurrency Token. */
  etag?: string;
}

/** Arguments for retrieving the next page of search results. */
export interface ListPageSettings {
  /** A token used for retrieving the next page of results when the server enforces pagination. */
  continuationToken?: string;
}

/** Jobs are distributed to the worker with the strongest abilities available. */
export interface BestWorkerMode extends DistributionMode {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "best-worker";
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
   * DirectMapRule:  A rule that return the same labels as the input labels.
   * ExpressionRule: A rule providing inline expression rules.
   * AzureFunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
   * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
   */
  scoringRule?: RouterRuleUnion;
  /** Encapsulates all options that can be passed as parameters for scoring rule with BestWorkerMode */
  scoringRuleOptions?: ScoringRuleOptions;
}

/** Describes a set of queue selectors that will be attached if the given condition resolves to true */
export interface ConditionalQueueSelectorAttachment extends QueueSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "conditional";
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
   * DirectMapRule:  A rule that return the same labels as the input labels.
   * ExpressionRule: A rule providing inline expression rules.
   * AzureFunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
   * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
   */
  condition: RouterRuleUnion;
  /** The queue selectors to attach */
  queueSelectors: RouterQueueSelector[];
}

/** Describes a set of worker selectors that will be attached if the given condition resolves to true */
export interface ConditionalWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "conditional";
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
   * DirectMapRule:  A rule that return the same labels as the input labels.
   * ExpressionRule: A rule providing inline expression rules.
   * AzureFunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
   * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
   */
  condition: RouterRuleUnion;
  /** The worker selectors to attach */
  workerSelectors: RouterWorkerSelector[];
}

/** Attaches queue selectors to a job when the RouterRule is resolved */
export interface RuleEngineQueueSelectorAttachment extends QueueSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "rule-engine";
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
   * DirectMapRule:  A rule that return the same labels as the input labels.
   * ExpressionRule: A rule providing inline expression rules.
   * AzureFunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
   * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
   */
  rule: RouterRuleUnion;
}

/** A rule providing inline expression rules. */
export interface ExpressionRouterRule extends RouterRule {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "expression-rule";
  /** The expression language to compile to and execute */
  language?: ExpressionRouterRuleLanguage;
  /** The string containing the expression to evaluate. Should contain return statement with calculated values. */
  expression: string;
}

/** Contains the weight percentage and queue selectors to be applied if selected for weighted distributions. */
export interface QueueWeightedAllocation {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of queue selectors that will be applied if this allocation is selected. */
  queueSelectors: RouterQueueSelector[];
}

/** Attaches queue selectors to a job when the RouterRule is resolved */
export interface RuleEngineQueueSelectorAttachment extends QueueSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "rule-engine";
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
   * DirectMapRule:  A rule that return the same labels as the input labels.
   * ExpressionRule: A rule providing inline expression rules.
   * AzureFunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
   * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
   */
  rule: RouterRuleUnion;
}

/** An action that manually reclassifies a job by providing the queue, priority and worker selectors. */
export interface ManualReclassifyExceptionAction extends ExceptionAction {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "manual-reclassify";
  /** Updated QueueId. */
  queueId?: string;
  /** Updated Priority. */
  priority?: number;
  /** Updated WorkerSelectors. */
  workerSelectors?: RouterWorkerSelector[];
}

/** Attaches worker selectors to a job when a RouterRule is resolved */
export interface RuleEngineWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "rule-engine";
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
   * DirectMapRule:  A rule that return the same labels as the input labels.
   * ExpressionRule: A rule providing inline expression rules.
   * AzureFunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
   * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
   */
  rule: RouterRuleUnion;
}

/** Describes a queue selector that will be attached to the job */
export interface StaticQueueSelectorAttachment extends QueueSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "static";
  /** Describes a condition that must be met against a set of labels for queue selection */
  queueSelector: RouterQueueSelector;
}

/** Describes multiple sets of queue selectors, of which one will be selected and attached according to a weighting */
export interface WeightedAllocationQueueSelectorAttachment extends QueueSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "weighted-allocation-queue-selector";
  /** A collection of percentage based weighted allocations. */
  allocations: QueueWeightedAllocation[];
}

/** Describes a worker selector that will be attached to the job */
export interface StaticWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "static";
  /** Describes a condition that must be met against a set of labels for worker selection */
  workerSelector: RouterWorkerSelector;
}

/** Attaches a worker selector where the value is passed through from the job label with the same key */
export interface PassThroughWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "pass-through";
  /** The label key to query against */
  key: string;
  /** Describes how the value of the label is compared to the value pass through */
  labelOperator: LabelOperator;
  /** Describes how long the attached label selector is valid in seconds. */
  expiresAfterSeconds?: number;
}

/** Describes multiple sets of worker selectors, of which one will be selected and attached according to a weighting */
export interface WeightedAllocationWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "weighted-allocation-worker-selector";
  /** A collection of percentage based weighted allocations. */
  allocations: WorkerWeightedAllocation[];
}

/** Attaches a queue selector where the value is passed through from the job label with the same key */
export interface PassThroughQueueSelectorAttachment extends QueueSelectorAttachment {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "pass-through";
  /** The label key to query against */
  key: string;
  /** Describes how the value of the label is compared to the value pass through */
  labelOperator: LabelOperator;
}

/** Contains the weight percentage and worker selectors to be applied if selected for weighted distributions. */
export interface WorkerWeightedAllocation {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of worker selectors that will be applied if this allocation is selected. */
  workerSelectors: RouterWorkerSelector[];
}

/** Encapsulates all options that can be passed as parameters for scoring rule with BestWorkerMode */
export interface ScoringRuleOptions {
  /** (Optional) Set batch size when AllowScoringBatchOfWorkers is set to true. Defaults to 20 if not configured. */
  batchSize?: number;
  /**
   * (Optional) List of extra parameters from the job that will be sent as part of the payload to scoring rule.
   * If not set, the job's labels (sent in the payload as `job`) and the job's worker selectors (sent in the payload as `selectors`)
   * are added to the payload of the scoring rule by default.
   * Note: Worker labels are always sent with scoring payload.
   */
  scoringParameters?: ScoringRuleParameterSelector[];
  /**
   * (Optional)
   * If set to true, will score workers in batches, and the parameter name of the worker labels will be sent as `workers`.
   * By default, set to false and the parameter name for the worker labels will be sent as `worker`.
   * Note: If enabled, use BatchSize to set batch size.
   */
  allowScoringBatchOfWorkers?: boolean;
  /**
   * (Optional)
   * If false, will sort scores by ascending order. By default, set to true.
   */
  descendingOrder?: boolean;
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

export type WorkerSelectorAttachmentUnion =
  | WorkerSelectorAttachment
  | ConditionalWorkerSelectorAttachment
  | PassThroughWorkerSelectorAttachment
  | RuleEngineWorkerSelectorAttachment
  | StaticWorkerSelectorAttachment
  | WeightedAllocationWorkerSelectorAttachment;

export type DistributionModeUnion =
  | DistributionMode
  | BestWorkerMode
  | LongestIdleMode
  | RoundRobinMode;

export type QueueSelectorAttachmentUnion =
  | QueueSelectorAttachment
  | ConditionalQueueSelectorAttachment
  | PassThroughQueueSelectorAttachment
  | RuleEngineQueueSelectorAttachment
  | StaticQueueSelectorAttachment
  | WeightedAllocationQueueSelectorAttachment;

export {
  Oauth2ClientCredential,
  ChannelConfiguration,
  RouterQueueStatistics,
  RouterJobOffer,
  RouterJobPositionDetails,
  RouterJobAssignment,
  RouterWorkerAssignment,
  ScheduleAndSuspendMode,
  DistributionMode,
  LongestIdleMode,
  RoundRobinMode,
  QueueLengthExceptionTrigger,
  WaitTimeExceptionTrigger,
  ExceptionTrigger,
  CancelExceptionAction,
  ExceptionAction,
  FunctionRouterRuleCredential,
  DirectMapRouterRule,
  FunctionRouterRule,
  WebhookRouterRule,
  RouterRule,
  ExceptionTriggerUnion,
  WorkerSelectorAttachment,
  QueueSelectorAttachment,
  ExpressionRouterRuleLanguage,
  ScoringRuleParameterSelector,
  RouterWorkerSelectorStatus,
  RouterWorkerStateSelector,
  RouterJobStatusSelector,
  JobMatchModeType,
  RouterWorkerState,
  RouterJobStatus,
  LabelOperator,
} from "./generated/src";
