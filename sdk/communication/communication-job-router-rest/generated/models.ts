// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A container for the rules that govern how jobs are classified. */
export interface ClassificationPolicy {
  /** Friendly name of this policy. */
  name?: string;
  /** Id of a fallback queue to select if queue selector attachments doesn't find a match. */
  fallbackQueueId?: string;
  /** Queue selector attachments used to resolve a queue for a job. */
  queueSelectorAttachments?: Array<QueueSelectorAttachment>;
  /** A rule to determine a priority score for a job. */
  prioritizationRule?: RouterRule;
  /** Worker selector attachments used to attach worker selectors to a job. */
  workerSelectorAttachments?: Array<WorkerSelectorAttachment>;
}

/** An attachment of queue selectors to resolve a queue to a job from a classification policy. */
export interface QueueSelectorAttachmentParent {
  kind: QueueSelectorAttachmentKind;
}

/** Describes a set of queue selectors that will be attached if the given condition resolves to true. */
export interface ConditionalQueueSelectorAttachment
  extends QueueSelectorAttachmentParent {
  /** The condition that must be true for the queue selectors to be attached. */
  condition: RouterRule;
  /** The queue selectors to attach. */
  queueSelectors: Array<RouterQueueSelector>;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "conditional";
}

/**
 * A rule of one of the following types:
 * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
 * DirectMapRule:  A rule that return the same labels as the input labels.
 * ExpressionRule: A rule providing inline expression rules.
 * FunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
 * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
 */
export interface RouterRuleParent {
  kind: RouterRuleKind;
}

/** A rule that return the same labels as the input labels. */
export interface DirectMapRouterRule extends RouterRuleParent {
  /** The type discriminator describing a sub-type of Rule. */
  kind: "directMap";
}

/** A rule providing inline expression rules. */
export interface ExpressionRouterRule extends RouterRuleParent {
  /**
   * The expression language to compile to and execute.
   *
   * Possible values: "powerFx"
   */
  language?: ExpressionRouterRuleLanguage;
  /** An expression to evaluate. Should contain return statement with calculated values. */
  expression: string;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "expression";
}

/** A rule providing a binding to an HTTP Triggered Azure Function. */
export interface FunctionRouterRule extends RouterRuleParent {
  /** URL for Azure Function. */
  functionUri: string;
  /** Credentials used to access Azure function rule. */
  credential?: FunctionRouterRuleCredential;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "function";
}

/** Credentials used to access Azure function rule. */
export interface FunctionRouterRuleCredential {
  /** Access key scoped to a particular function. */
  functionKey?: string;
  /** Access key scoped to a Azure Function app. This key grants access to all functions under the app. */
  appKey?: string;
  /** Client id, when AppKey is provided In context of Azure function, this is usually the name of the key. */
  clientId?: string;
}

/** A rule providing static rules that always return the same result, regardless of input. */
export interface StaticRouterRule extends RouterRuleParent {
  /** The static value this rule always returns. Values must be primitive values - number, string, boolean. */
  value?: unknown;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "static";
}

/** A rule providing a binding to an external web server. */
export interface WebhookRouterRule extends RouterRuleParent {
  /** Uri for Authorization Server. */
  authorizationServerUri?: string;
  /** OAuth2.0 Credentials used to Contoso's Authorization server. Reference: https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/ */
  clientCredential?: OAuth2WebhookClientCredential;
  /** Uri for Contoso's Web Server. */
  webhookUri?: string;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "webhook";
}

/** OAuth2.0 Credentials used to Contoso's Authorization server. Reference: https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/ */
export interface OAuth2WebhookClientCredential {
  /** ClientId for Contoso Authorization server. */
  clientId?: string;
  /** Client secret for Contoso Authorization server. */
  clientSecret?: string;
}

/** Describes a condition that must be met against a set of labels for queue selection. */
export interface RouterQueueSelector {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value defined on the label selector.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperator;
  /** The value to compare against the actual label value with the given operator. Values must be primitive values - number, string, boolean. */
  value?: unknown;
}

/** Attaches a queue selector where the value is passed through from a job's label with the same key. */
export interface PassThroughQueueSelectorAttachment
  extends QueueSelectorAttachmentParent {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value pass through.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperator;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "passThrough";
}

/** Attaches queue selectors to a job when the RouterRule is resolved. */
export interface RuleEngineQueueSelectorAttachment
  extends QueueSelectorAttachmentParent {
  /** A RouterRule that resolves a collection of queue selectors to attach. */
  rule: RouterRule;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "ruleEngine";
}

/** Describes a queue selector that will be attached to a job. */
export interface StaticQueueSelectorAttachment
  extends QueueSelectorAttachmentParent {
  /** The queue selector to attach. */
  queueSelector: RouterQueueSelector;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "static";
}

/** Describes multiple sets of queue selectors, of which one will be selected and attached according to a weighting. */
export interface WeightedAllocationQueueSelectorAttachment
  extends QueueSelectorAttachmentParent {
  /** A collection of percentage based weighted allocations. */
  allocations: Array<QueueWeightedAllocation>;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "weightedAllocation";
}

/** Contains the weight percentage and queue selectors to be applied if selected for weighted distributions. */
export interface QueueWeightedAllocation {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of queue selectors that will be applied if this allocation is selected. */
  queueSelectors: Array<RouterQueueSelector>;
}

/** An attachment which attaches worker selectors to a job. */
export interface WorkerSelectorAttachmentParent {
  kind: WorkerSelectorAttachmentKind;
}

/** Describes a set of worker selectors that will be attached if the given condition resolves to true. */
export interface ConditionalWorkerSelectorAttachment
  extends WorkerSelectorAttachmentParent {
  /** The condition that must be true for the worker selectors to be attached. */
  condition: RouterRule;
  /** The worker selectors to attach. */
  workerSelectors: Array<RouterWorkerSelector>;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "conditional";
}

/** Describes a condition that must be met against a set of labels for worker selection. */
export interface RouterWorkerSelector {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value defined on the worker selector.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperator;
  /** The value to compare against the actual label value with the given operator. Values must be primitive values - number, string, boolean. */
  value?: unknown;
  /** Describes how long this label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** Pushes a job to the front of the queue as long as this selector is active. */
  expedite?: boolean;
}

/** Attaches a worker selector where the value is passed through from a job's label with the same key. */
export interface PassThroughWorkerSelectorAttachment
  extends WorkerSelectorAttachmentParent {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value pass through.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperator;
  /** Describes how long the attached label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "passThrough";
}

/** Attaches worker selectors to a job when a RouterRule is resolved. */
export interface RuleEngineWorkerSelectorAttachment
  extends WorkerSelectorAttachmentParent {
  /** A RouterRule that resolves a collection of worker selectors to attach. */
  rule: RouterRule;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "ruleEngine";
}

/** Describes a worker selector that will be attached to a job. */
export interface StaticWorkerSelectorAttachment
  extends WorkerSelectorAttachmentParent {
  /** The worker selector to attach. */
  workerSelector: RouterWorkerSelector;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "static";
}

/** Describes multiple sets of worker selectors, of which one will be selected and attached according to a weighting. */
export interface WeightedAllocationWorkerSelectorAttachment
  extends WorkerSelectorAttachmentParent {
  /** A collection of percentage based weighted allocations. */
  allocations: Array<WorkerWeightedAllocation>;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "weightedAllocation";
}

/** Contains the weight percentage and worker selectors to be applied if selected for weighted distributions. */
export interface WorkerWeightedAllocation {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of worker selectors that will be applied if this allocation is selected. */
  workerSelectors: Array<RouterWorkerSelector>;
}

/** Policy governing how jobs are distributed to workers */
export interface DistributionPolicy {
  /** Friendly name of this policy. */
  name?: string;
  /** Number of seconds after which any offers created under this policy will be expired. */
  offerExpiresAfterSeconds?: number;
  /** Mode governing the specific distribution method. */
  mode?: DistributionMode;
}

/** Abstract base class for defining a distribution mode. */
export interface DistributionModeParent {
  /** Governs the minimum desired number of active concurrent offers a job can have. */
  minConcurrentOffers?: number;
  /** Governs the maximum number of active concurrent offers a job can have. */
  maxConcurrentOffers?: number;
  /** If set to true, then router will match workers to jobs even if they don't match label selectors. Warning: You may get workers that are not qualified for a job they are matched with if you set this variable to true. This flag is intended more for temporary usage. By default, set to false. */
  bypassSelectors?: boolean;
  kind: DistributionModeKind;
}

/** Jobs are distributed to the worker with the strongest abilities available. */
export interface BestWorkerMode extends DistributionModeParent {
  /** Define a scoring rule to use, when calculating a score to determine the best worker. If not set, will use a default scoring formula that uses the number of job labels that the worker labels match, as well as the number of label selectors the worker labels match and/or exceed using a logistic function (https://en.wikipedia.org/wiki/Logistic_function). */
  scoringRule?: RouterRule;
  /** Options to configure 'scoringRule'. If not set, default values are used. */
  scoringRuleOptions?: ScoringRuleOptions;
  /** The type discriminator describing a sub-type of Mode */
  kind: "bestWorker";
}

/** Encapsulates all options that can be passed as parameters for scoring rule with BestWorkerMode. */
export interface ScoringRuleOptions {
  /** Set batch size when 'isBatchScoringEnabled' is set to true. Defaults to 20 if not configured. */
  batchSize?: number;
  /** List of extra parameters from a job that will be sent as part of the payload to scoring rule. If not set, a job's labels (sent in the payload as `job`) and a job's worker selectors (sent in the payload as `selectors`) are added to the payload of the scoring rule by default. Note: Worker labels are always sent with scoring payload. */
  scoringParameters?: ScoringRuleParameterSelector[];
  /** If set to true, will score workers in batches, and the parameter name of the worker labels will be sent as `workers`. By default, set to false and the parameter name for the worker labels will be sent as `worker`. Note: If enabled, use 'batchSize' to set batch size. */
  isBatchScoringEnabled?: boolean;
  /** If false, will sort scores by ascending order. By default, set to true. */
  descendingOrder?: boolean;
}

/** Jobs are directed to the worker who has been idle longest. */
export interface LongestIdleMode extends DistributionModeParent {
  /** The type discriminator describing a sub-type of Mode. */
  kind: "longestIdle";
}

/** Jobs are distributed in order to workers, starting with the worker that is after the last worker to receive a job. */
export interface RoundRobinMode extends DistributionModeParent {
  /** The type discriminator describing a sub-type of Mode. */
  kind: "roundRobin";
}

/** A policy that defines actions to execute when exception are triggered. */
export interface ExceptionPolicy {
  /** Friendly name of this policy. */
  name?: string;
  /** A collection of exception rules on the exception policy. */
  exceptionRules?: Array<ExceptionRule>;
}

/** A rule that defines actions to execute upon a specific trigger. */
export interface ExceptionRule {
  /** Id of an exception rule. */
  id: string;
  /** The trigger for this exception rule. */
  trigger: ExceptionTrigger;
  /** A collection of actions to perform once the exception is triggered. */
  actions: Array<ExceptionAction>;
}

/** Abstract base class for defining a trigger for exception rules. */
export interface ExceptionTriggerParent {
  kind: ExceptionTriggerKind;
}

/** Trigger for an exception action on exceeding queue length. */
export interface QueueLengthExceptionTrigger extends ExceptionTriggerParent {
  /** Threshold of number of jobs ahead in the queue to for this trigger to fire. */
  threshold: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger. */
  kind: "queueLength";
}

/** Trigger for an exception action on exceeding wait time. */
export interface WaitTimeExceptionTrigger extends ExceptionTriggerParent {
  /** Threshold for wait time for this trigger. */
  thresholdSeconds: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger. */
  kind: "waitTime";
}

/** The action to take when the exception is triggered. */
export interface ExceptionActionParent {
  /** Unique Id of the exception action. */
  id?: string;
  kind: ExceptionActionKind;
}

/** An action that marks a job as cancelled. */
export interface CancelExceptionAction extends ExceptionActionParent {
  /** A note that will be appended to a job's notes collection with the current timestamp. */
  note?: string;
  /** Indicates the outcome of a job, populate this field with your own custom values. */
  dispositionCode?: string;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "cancel";
}

/** An action that manually reclassifies a job by providing the queue, priority and worker selectors. */
export interface ManualReclassifyExceptionAction extends ExceptionActionParent {
  /** Updated QueueId. */
  queueId?: string;
  /** Updated Priority. */
  priority?: number;
  /** Updated WorkerSelectors. */
  workerSelectors?: Array<RouterWorkerSelector>;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "manualReclassify";
}

/** An action that modifies labels on a job and then reclassifies it. */
export interface ReclassifyExceptionAction extends ExceptionActionParent {
  /** The new classification policy that will determine queue, priority and worker selectors. */
  classificationPolicyId?: string;
  /** Dictionary containing the labels to update (or add if not existing) in key-value pairs.  Values must be primitive values - number, string, boolean. */
  labelsToUpsert?: Record<string, unknown>;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "reclassify";
}

/** A queue that can contain jobs to be routed. */
export interface RouterQueue {
  /** Friendly name of this queue. */
  name?: string;
  /** Id of a distribution policy that will determine how a job is distributed to workers. */
  distributionPolicyId?: string;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, unknown>;
  /** Id of an exception policy that determines various job escalation rules. */
  exceptionPolicyId?: string;
}

/** A unit of work to be routed */
export interface RouterJob {
  /** Reference to an external parent context, eg. call ID. */
  channelReference?: string;
  /** The channel identifier. eg. voice, chat, etc. */
  channelId?: string;
  /** Id of a classification policy used for classifying this job. */
  classificationPolicyId?: string;
  /** Id of a queue that this job is queued to. */
  queueId?: string;
  /** Priority of this job. Value must be between -100 to 100. */
  priority?: number;
  /** Reason code for cancelled or closed jobs. */
  dispositionCode?: string;
  /** A collection of manually specified worker selectors, which a worker must satisfy in order to process this job. */
  requestedWorkerSelectors?: Array<RouterWorkerSelector>;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, unknown>;
  /** A set of non-identifying attributes attached to this job. Values must be primitive values - number, string, boolean. */
  tags?: Record<string, unknown>;
  /** Notes attached to a job, sorted by timestamp. */
  notes?: Array<RouterJobNote>;
  /** If provided, will determine how job matching will be carried out. Default mode: QueueAndMatchMode. */
  matchingMode?: JobMatchingMode;
}

/** Assignment details of a job to a worker. */
export interface RouterJobAssignment {
  /** Id of the Worker assigned to the job. */
  workerId?: string;
  /** Timestamp when the job was assigned to a worker in UTC. */
  assignedAt: Date | string;
  /** Timestamp when the job was marked as completed after being assigned in UTC. */
  completedAt?: Date | string;
  /** Timestamp when the job was marked as closed after being completed in UTC. */
  closedAt?: Date | string;
}

/** A note attached to a job. */
export interface RouterJobNote {
  /** The message contained in the note. */
  message: string;
  /** The time at which the note was added in UTC. If not provided, will default to the current time. */
  addedAt?: Date | string;
}

/**
 * A matching mode of one of the following types:
 * QueueAndMatchMode: Used when matching worker to a job is required to be done right after job is queued.
 * ScheduleAndSuspendMode: Used for scheduling jobs to be queued at a future time. At specified time, matching of a worker to the job will not start automatically.
 * SuspendMode: Used when matching workers to a job needs to be suspended.
 */
export interface JobMatchingModeParent {
  kind: JobMatchingModeKind;
}

/** Describes a matching mode used for scheduling jobs to be queued at a future time. At the specified time, matching worker to a job will not start automatically. */
export interface ScheduleAndSuspendMode extends JobMatchingModeParent {
  /** Requested schedule time. */
  scheduleAt: Date | string;
  /** The type discriminator describing ScheduleAndSuspendMode */
  kind: "scheduleAndSuspend";
}

/** Describes a matching mode where matching worker to a job is automatically started after job is queued successfully. */
export interface QueueAndMatchMode extends JobMatchingModeParent {
  /** The type discriminator describing QueueAndMatchMode */
  kind: "queueAndMatch";
}

/** Describes a matching mode where matching worker to a job is suspended. */
export interface SuspendMode extends JobMatchingModeParent {
  /** The type discriminator describing SuspendMode */
  kind: "suspend";
}

/** Request payload for reclassifying jobs. */
export interface ReclassifyJobOptions {}

/** Request payload for cancelling a job. */
export interface CancelJobOptions {
  /** A note that will be appended to a job's Notes collection with the current timestamp. */
  note?: string;
  /** Indicates the outcome of a job, populate this field with your own custom values. If not provided, default value of "Cancelled" is set. */
  dispositionCode?: string;
}

/** Request payload for completing jobs. */
export interface CompleteJobOptions {
  /** A note that will be appended to a job's Notes collection with the current timestamp. */
  note?: string;
}

/** Request payload for closing jobs */
export interface CloseJobOptions {
  /** Indicates the outcome of a job, populate this field with your own custom values. */
  dispositionCode?: string;
  /** If not provided, worker capacity is released immediately along with a JobClosedEvent notification. If provided, worker capacity is released along with a JobClosedEvent notification at a future time in UTC. */
  closeAt?: Date | string;
  /** A note that will be appended to a job's Notes collection with the current timestamp. */
  note?: string;
}

/** Request payload for unassigning a job. */
export interface UnassignJobOptions {
  /** If SuspendMatching is true, then a job is not queued for re-matching with a worker. */
  suspendMatching?: boolean;
}

/** Request payload for declining offers. */
export interface DeclineJobOfferOptions {
  /** If the RetryOfferAt is not provided, then this job will not be offered again to the worker who declined this job unless the worker is de-registered and re-registered.  If a RetryOfferAt time is provided, then the job will be re-matched to eligible workers at the retry time in UTC.  The worker that declined the job will also be eligible for the job at that time. */
  retryOfferAt?: Date | string;
}

/** An entity for jobs to be routed to. */
export interface RouterWorker {
  /** Collection of queue(s) that this worker can receive work from. */
  queues?: string[];
  /** The total capacity score this worker has to manage multiple concurrent jobs. */
  capacity?: number;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, unknown>;
  /** A set of non-identifying attributes attached to this worker. Values must be primitive values - number, string, boolean. */
  tags?: Record<string, unknown>;
  /** Collection of channel(s) this worker can handle and their impact on the workers capacity. */
  channels?: Array<RouterChannel>;
  /** A flag indicating this worker is open to receive offers or not. */
  availableForOffers?: boolean;
  /** If this is set, the worker will only receive up to this many new offers at a time. */
  maxConcurrentOffers?: number;
}

/** Represents the capacity a job in this channel will consume from a worker. */
export interface RouterChannel {
  /** Id of a channel. */
  channelId: string;
  /** The amount of capacity that an instance of a job of this channel will consume of the total worker capacity. */
  capacityCostPerJob: number;
  /** The maximum number of jobs that can be supported concurrently for this channel. Value must be greater than zero. */
  maxNumberOfJobs?: number;
}

/** An offer of a job to a worker. */
export interface RouterJobOffer {
  /** Id of the job. */
  jobId: string;
  /** The capacity cost consumed by the job offer. */
  capacityCost: number;
  /** Timestamp when the offer was created in UTC. */
  offeredAt?: Date | string;
  /** Timestamp when the offer will expire in UTC. */
  expiresAt?: Date | string;
}

/** The assignment for a worker to a job. */
export interface RouterWorkerAssignment {
  /** Id of the assignment. */
  assignmentId: string;
  /** Id of the job assigned. */
  jobId: string;
  /** The amount of capacity this assignment has consumed on the worker. */
  capacityCost: number;
  /** The assignment time of the job in UTC. */
  assignedAt: Date | string;
}

/** An attachment of queue selectors to resolve a queue to a job from a classification policy. */
export type QueueSelectorAttachment =
  | QueueSelectorAttachmentParent
  | ConditionalQueueSelectorAttachment
  | PassThroughQueueSelectorAttachment
  | RuleEngineQueueSelectorAttachment
  | StaticQueueSelectorAttachment
  | WeightedAllocationQueueSelectorAttachment;
/**
 * A rule of one of the following types:
 * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
 * DirectMapRule:  A rule that return the same labels as the input labels.
 * ExpressionRule: A rule providing inline expression rules.
 * FunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
 * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
 */
export type RouterRule =
  | RouterRuleParent
  | DirectMapRouterRule
  | ExpressionRouterRule
  | FunctionRouterRule
  | StaticRouterRule
  | WebhookRouterRule;
/** An attachment which attaches worker selectors to a job. */
export type WorkerSelectorAttachment =
  | WorkerSelectorAttachmentParent
  | ConditionalWorkerSelectorAttachment
  | PassThroughWorkerSelectorAttachment
  | RuleEngineWorkerSelectorAttachment
  | StaticWorkerSelectorAttachment
  | WeightedAllocationWorkerSelectorAttachment;
/** Abstract base class for defining a distribution mode. */
export type DistributionMode =
  | DistributionModeParent
  | BestWorkerMode
  | LongestIdleMode
  | RoundRobinMode;
/** Abstract base class for defining a trigger for exception rules. */
export type ExceptionTrigger =
  | ExceptionTriggerParent
  | QueueLengthExceptionTrigger
  | WaitTimeExceptionTrigger;
/** The action to take when the exception is triggered. */
export type ExceptionAction =
  | ExceptionActionParent
  | CancelExceptionAction
  | ManualReclassifyExceptionAction
  | ReclassifyExceptionAction;
/**
 * A matching mode of one of the following types:
 * QueueAndMatchMode: Used when matching worker to a job is required to be done right after job is queued.
 * ScheduleAndSuspendMode: Used for scheduling jobs to be queued at a future time. At specified time, matching of a worker to the job will not start automatically.
 * SuspendMode: Used when matching workers to a job needs to be suspended.
 */
export type JobMatchingMode =
  | JobMatchingModeParent
  | ScheduleAndSuspendMode
  | QueueAndMatchMode
  | SuspendMode;
/** Alias for QueueSelectorAttachmentKind */
export type QueueSelectorAttachmentKind = string;
/** Alias for RouterRuleKind */
export type RouterRuleKind = string;
/** Alias for ExpressionRouterRuleLanguage */
export type ExpressionRouterRuleLanguage = string;
/** Alias for LabelOperator */
export type LabelOperator = string;
/** Alias for WorkerSelectorAttachmentKind */
export type WorkerSelectorAttachmentKind = string;
/** Alias for RouterWorkerSelectorStatus */
export type RouterWorkerSelectorStatus = string;
/** Alias for DistributionModeKind */
export type DistributionModeKind = string;
/** Alias for ScoringRuleParameterSelector */
export type ScoringRuleParameterSelector = string;
/** Alias for ExceptionTriggerKind */
export type ExceptionTriggerKind = string;
/** Alias for ExceptionActionKind */
export type ExceptionActionKind = string;
/** Alias for RouterJobStatus */
export type RouterJobStatus = string;
/** Alias for JobMatchingModeKind */
export type JobMatchingModeKind = string;
/** Alias for RouterJobStatusSelector */
export type RouterJobStatusSelector = string;
/** Alias for RouterWorkerState */
export type RouterWorkerState = string;
/** Alias for RouterWorkerStateSelector */
export type RouterWorkerStateSelector = string;
