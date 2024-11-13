// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A container for the rules that govern how jobs are classified. */
export interface ClassificationPolicyOutput {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a classification policy. */
  readonly id: string;
  /** Friendly name of this policy. */
  name?: string;
  /** Id of a fallback queue to select if queue selector attachments doesn't find a match. */
  fallbackQueueId?: string;
  /** Queue selector attachments used to resolve a queue for a job. */
  queueSelectorAttachments?: Array<QueueSelectorAttachmentOutput>;
  /** A rule to determine a priority score for a job. */
  prioritizationRule?: RouterRuleOutput;
  /** Worker selector attachments used to attach worker selectors to a job. */
  workerSelectorAttachments?: Array<WorkerSelectorAttachmentOutput>;
}

/** An attachment of queue selectors to resolve a queue to a job from a classification policy. */
export interface QueueSelectorAttachmentOutputParent {
  kind: QueueSelectorAttachmentKindOutput;
}

/** Describes a set of queue selectors that will be attached if the given condition resolves to true. */
export interface ConditionalQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /** The condition that must be true for the queue selectors to be attached. */
  condition: RouterRuleOutput;
  /** The queue selectors to attach. */
  queueSelectors: Array<RouterQueueSelectorOutput>;
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
export interface RouterRuleOutputParent {
  kind: RouterRuleKindOutput;
}

/** A rule that return the same labels as the input labels. */
export interface DirectMapRouterRuleOutput extends RouterRuleOutputParent {
  /** The type discriminator describing a sub-type of Rule. */
  kind: "directMap";
}

/** A rule providing inline expression rules. */
export interface ExpressionRouterRuleOutput extends RouterRuleOutputParent {
  /**
   * The expression language to compile to and execute.
   *
   * Possible values: "powerFx"
   */
  language?: ExpressionRouterRuleLanguageOutput;
  /** An expression to evaluate. Should contain return statement with calculated values. */
  expression: string;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "expression";
}

/** A rule providing a binding to an HTTP Triggered Azure Function. */
export interface FunctionRouterRuleOutput extends RouterRuleOutputParent {
  /** URL for Azure Function. */
  functionUri: string;
  /** Credentials used to access Azure function rule. */
  credential?: FunctionRouterRuleCredentialOutput;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "function";
}

/** Credentials used to access Azure function rule. */
export interface FunctionRouterRuleCredentialOutput {
  /** Access key scoped to a particular function. */
  functionKey?: string;
  /** Access key scoped to a Azure Function app. This key grants access to all functions under the app. */
  appKey?: string;
  /** Client id, when AppKey is provided In context of Azure function, this is usually the name of the key. */
  clientId?: string;
}

/** A rule providing static rules that always return the same result, regardless of input. */
export interface StaticRouterRuleOutput extends RouterRuleOutputParent {
  /** The static value this rule always returns. Values must be primitive values - number, string, boolean. */
  value?: any;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "static";
}

/** A rule providing a binding to an external web server. */
export interface WebhookRouterRuleOutput extends RouterRuleOutputParent {
  /** Uri for Authorization Server. */
  authorizationServerUri?: string;
  /** OAuth2.0 Credentials used to Contoso's Authorization server. Reference: https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/ */
  clientCredential?: OAuth2WebhookClientCredentialOutput;
  /** Uri for Contoso's Web Server. */
  webhookUri?: string;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "webhook";
}

/** OAuth2.0 Credentials used to Contoso's Authorization server. Reference: https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/ */
export interface OAuth2WebhookClientCredentialOutput {
  /** ClientId for Contoso Authorization server. */
  clientId?: string;
  /** Client secret for Contoso Authorization server. */
  clientSecret?: string;
}

/** Describes a condition that must be met against a set of labels for queue selection. */
export interface RouterQueueSelectorOutput {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value defined on the label selector.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperatorOutput;
  /** The value to compare against the actual label value with the given operator. Values must be primitive values - number, string, boolean. */
  value?: any;
}

/** Attaches a queue selector where the value is passed through from a job's label with the same key. */
export interface PassThroughQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value pass through.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperatorOutput;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "passThrough";
}

/** Attaches queue selectors to a job when the RouterRule is resolved. */
export interface RuleEngineQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /** A RouterRule that resolves a collection of queue selectors to attach. */
  rule: RouterRuleOutput;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "ruleEngine";
}

/** Describes a queue selector that will be attached to a job. */
export interface StaticQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /** The queue selector to attach. */
  queueSelector: RouterQueueSelectorOutput;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "static";
}

/** Describes multiple sets of queue selectors, of which one will be selected and attached according to a weighting. */
export interface WeightedAllocationQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /** A collection of percentage based weighted allocations. */
  allocations: Array<QueueWeightedAllocationOutput>;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "weightedAllocation";
}

/** Contains the weight percentage and queue selectors to be applied if selected for weighted distributions. */
export interface QueueWeightedAllocationOutput {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of queue selectors that will be applied if this allocation is selected. */
  queueSelectors: Array<RouterQueueSelectorOutput>;
}

/** An attachment which attaches worker selectors to a job. */
export interface WorkerSelectorAttachmentOutputParent {
  kind: WorkerSelectorAttachmentKindOutput;
}

/** Describes a set of worker selectors that will be attached if the given condition resolves to true. */
export interface ConditionalWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /** The condition that must be true for the worker selectors to be attached. */
  condition: RouterRuleOutput;
  /** The worker selectors to attach. */
  workerSelectors: Array<RouterWorkerSelectorOutput>;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "conditional";
}

/** Describes a condition that must be met against a set of labels for worker selection. */
export interface RouterWorkerSelectorOutput {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value defined on the worker selector.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperatorOutput;
  /** The value to compare against the actual label value with the given operator. Values must be primitive values - number, string, boolean. */
  value?: any;
  /** Describes how long this label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** Pushes a job to the front of the queue as long as this selector is active. */
  expedite?: boolean;
  /**
   * Status of the worker selector.
   *
   * Possible values: "active", "expired"
   */
  readonly status?: RouterWorkerSelectorStatusOutput;
  /** The time at which this worker selector expires in UTC. */
  readonly expiresAt?: string;
}

/** Attaches a worker selector where the value is passed through from a job's label with the same key. */
export interface PassThroughWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /** The label key to query against. */
  key: string;
  /**
   * Describes how the value of the label is compared to the value pass through.
   *
   * Possible values: "equal", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"
   */
  labelOperator: LabelOperatorOutput;
  /** Describes how long the attached label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "passThrough";
}

/** Attaches worker selectors to a job when a RouterRule is resolved. */
export interface RuleEngineWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /** A RouterRule that resolves a collection of worker selectors to attach. */
  rule: RouterRuleOutput;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "ruleEngine";
}

/** Describes a worker selector that will be attached to a job. */
export interface StaticWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /** The worker selector to attach. */
  workerSelector: RouterWorkerSelectorOutput;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "static";
}

/** Describes multiple sets of worker selectors, of which one will be selected and attached according to a weighting. */
export interface WeightedAllocationWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /** A collection of percentage based weighted allocations. */
  allocations: Array<WorkerWeightedAllocationOutput>;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "weightedAllocation";
}

/** Contains the weight percentage and worker selectors to be applied if selected for weighted distributions. */
export interface WorkerWeightedAllocationOutput {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of worker selectors that will be applied if this allocation is selected. */
  workerSelectors: Array<RouterWorkerSelectorOutput>;
}

/** Paged collection of ClassificationPolicy items */
export interface PagedClassificationPolicyOutput {
  /** The ClassificationPolicy items on this page */
  value: Array<ClassificationPolicyOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Policy governing how jobs are distributed to workers */
export interface DistributionPolicyOutput {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a distribution policy. */
  readonly id: string;
  /** Friendly name of this policy. */
  name?: string;
  /** Number of seconds after which any offers created under this policy will be expired. */
  offerExpiresAfterSeconds?: number;
  /** Mode governing the specific distribution method. */
  mode?: DistributionModeOutput;
}

/** Abstract base class for defining a distribution mode. */
export interface DistributionModeOutputParent {
  /** Governs the minimum desired number of active concurrent offers a job can have. */
  minConcurrentOffers?: number;
  /** Governs the maximum number of active concurrent offers a job can have. */
  maxConcurrentOffers?: number;
  /** If set to true, then router will match workers to jobs even if they don't match label selectors. Warning: You may get workers that are not qualified for a job they are matched with if you set this variable to true. This flag is intended more for temporary usage. By default, set to false. */
  bypassSelectors?: boolean;
  kind: DistributionModeKindOutput;
}

/** Jobs are distributed to the worker with the strongest abilities available. */
export interface BestWorkerModeOutput extends DistributionModeOutputParent {
  /** Define a scoring rule to use, when calculating a score to determine the best worker. If not set, will use a default scoring formula that uses the number of job labels that the worker labels match, as well as the number of label selectors the worker labels match and/or exceed using a logistic function (https://en.wikipedia.org/wiki/Logistic_function). */
  scoringRule?: RouterRuleOutput;
  /** Options to configure 'scoringRule'. If not set, default values are used. */
  scoringRuleOptions?: ScoringRuleOptionsOutput;
  /** The type discriminator describing a sub-type of Mode */
  kind: "bestWorker";
}

/** Encapsulates all options that can be passed as parameters for scoring rule with BestWorkerMode. */
export interface ScoringRuleOptionsOutput {
  /** Set batch size when 'isBatchScoringEnabled' is set to true. Defaults to 20 if not configured. */
  batchSize?: number;
  /** List of extra parameters from a job that will be sent as part of the payload to scoring rule. If not set, a job's labels (sent in the payload as `job`) and a job's worker selectors (sent in the payload as `selectors`) are added to the payload of the scoring rule by default. Note: Worker labels are always sent with scoring payload. */
  scoringParameters?: ScoringRuleParameterSelectorOutput[];
  /** If set to true, will score workers in batches, and the parameter name of the worker labels will be sent as `workers`. By default, set to false and the parameter name for the worker labels will be sent as `worker`. Note: If enabled, use 'batchSize' to set batch size. */
  isBatchScoringEnabled?: boolean;
  /** If false, will sort scores by ascending order. By default, set to true. */
  descendingOrder?: boolean;
}

/** Jobs are directed to the worker who has been idle longest. */
export interface LongestIdleModeOutput extends DistributionModeOutputParent {
  /** The type discriminator describing a sub-type of Mode. */
  kind: "longestIdle";
}

/** Jobs are distributed in order to workers, starting with the worker that is after the last worker to receive a job. */
export interface RoundRobinModeOutput extends DistributionModeOutputParent {
  /** The type discriminator describing a sub-type of Mode. */
  kind: "roundRobin";
}

/** Paged collection of DistributionPolicy items */
export interface PagedDistributionPolicyOutput {
  /** The DistributionPolicy items on this page */
  value: Array<DistributionPolicyOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A policy that defines actions to execute when exception are triggered. */
export interface ExceptionPolicyOutput {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of an exception policy. */
  readonly id: string;
  /** Friendly name of this policy. */
  name?: string;
  /** A collection of exception rules on the exception policy. */
  exceptionRules?: Array<ExceptionRuleOutput>;
}

/** A rule that defines actions to execute upon a specific trigger. */
export interface ExceptionRuleOutput {
  /** Id of an exception rule. */
  id: string;
  /** The trigger for this exception rule. */
  trigger: ExceptionTriggerOutput;
  /** A collection of actions to perform once the exception is triggered. */
  actions: Array<ExceptionActionOutput>;
}

/** Abstract base class for defining a trigger for exception rules. */
export interface ExceptionTriggerOutputParent {
  kind: ExceptionTriggerKindOutput;
}

/** Trigger for an exception action on exceeding queue length. */
export interface QueueLengthExceptionTriggerOutput
  extends ExceptionTriggerOutputParent {
  /** Threshold of number of jobs ahead in the queue to for this trigger to fire. */
  threshold: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger. */
  kind: "queueLength";
}

/** Trigger for an exception action on exceeding wait time. */
export interface WaitTimeExceptionTriggerOutput
  extends ExceptionTriggerOutputParent {
  /** Threshold for wait time for this trigger. */
  thresholdSeconds: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger. */
  kind: "waitTime";
}

/** The action to take when the exception is triggered. */
export interface ExceptionActionOutputParent {
  /** Unique Id of the exception action. */
  id?: string;
  kind: ExceptionActionKindOutput;
}

/** An action that marks a job as cancelled. */
export interface CancelExceptionActionOutput
  extends ExceptionActionOutputParent {
  /** A note that will be appended to a job's notes collection with the current timestamp. */
  note?: string;
  /** Indicates the outcome of a job, populate this field with your own custom values. */
  dispositionCode?: string;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "cancel";
}

/** An action that manually reclassifies a job by providing the queue, priority and worker selectors. */
export interface ManualReclassifyExceptionActionOutput
  extends ExceptionActionOutputParent {
  /** Updated QueueId. */
  queueId?: string;
  /** Updated Priority. */
  priority?: number;
  /** Updated WorkerSelectors. */
  workerSelectors?: Array<RouterWorkerSelectorOutput>;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "manualReclassify";
}

/** An action that modifies labels on a job and then reclassifies it. */
export interface ReclassifyExceptionActionOutput
  extends ExceptionActionOutputParent {
  /** The new classification policy that will determine queue, priority and worker selectors. */
  classificationPolicyId?: string;
  /** Dictionary containing the labels to update (or add if not existing) in key-value pairs.  Values must be primitive values - number, string, boolean. */
  labelsToUpsert?: Record<string, any>;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "reclassify";
}

/** Paged collection of ExceptionPolicy items */
export interface PagedExceptionPolicyOutput {
  /** The ExceptionPolicy items on this page */
  value: Array<ExceptionPolicyOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A queue that can contain jobs to be routed. */
export interface RouterQueueOutput {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a queue. */
  readonly id: string;
  /** Friendly name of this queue. */
  name?: string;
  /** Id of a distribution policy that will determine how a job is distributed to workers. */
  distributionPolicyId?: string;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, any>;
  /** Id of an exception policy that determines various job escalation rules. */
  exceptionPolicyId?: string;
}

/** Paged collection of RouterQueue items */
export interface PagedRouterQueueOutput {
  /** The RouterQueue items on this page */
  value: Array<RouterQueueOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A unit of work to be routed */
export interface RouterJobOutput {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a job. */
  readonly id: string;
  /** Reference to an external parent context, eg. call ID. */
  channelReference?: string;
  /**
   * The status of the job.
   *
   * Possible values: "pendingClassification", "queued", "assigned", "completed", "closed", "cancelled", "classificationFailed", "created", "pendingSchedule", "scheduled", "scheduleFailed", "waitingForActivation"
   */
  readonly status?: RouterJobStatusOutput;
  /** Timestamp a job was queued in UTC. */
  readonly enqueuedAt?: string;
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
  requestedWorkerSelectors?: Array<RouterWorkerSelectorOutput>;
  /** A collection of worker selectors attached by a classification policy, which a worker must satisfy in order to process this job. */
  readonly attachedWorkerSelectors?: Array<RouterWorkerSelectorOutput>;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, any>;
  /** A collection of the assignments of the job. Key is AssignmentId. */
  readonly assignments?: Record<string, RouterJobAssignmentOutput>;
  /** A set of non-identifying attributes attached to this job. Values must be primitive values - number, string, boolean. */
  tags?: Record<string, any>;
  /** Notes attached to a job, sorted by timestamp. */
  notes?: Array<RouterJobNoteOutput>;
  /** If set, job will be scheduled to be enqueued at a given time. */
  readonly scheduledAt?: string;
  /** If provided, will determine how job matching will be carried out. Default mode: QueueAndMatchMode. */
  matchingMode?: JobMatchingModeOutput;
}

/** Assignment details of a job to a worker. */
export interface RouterJobAssignmentOutput {
  /** Id of a job assignment. */
  readonly assignmentId: string;
  /** Id of the Worker assigned to the job. */
  workerId?: string;
  /** Timestamp when the job was assigned to a worker in UTC. */
  assignedAt: string;
  /** Timestamp when the job was marked as completed after being assigned in UTC. */
  completedAt?: string;
  /** Timestamp when the job was marked as closed after being completed in UTC. */
  closedAt?: string;
}

/** A note attached to a job. */
export interface RouterJobNoteOutput {
  /** The message contained in the note. */
  message: string;
  /** The time at which the note was added in UTC. If not provided, will default to the current time. */
  addedAt?: string;
}

/**
 * A matching mode of one of the following types:
 * QueueAndMatchMode: Used when matching worker to a job is required to be done right after job is queued.
 * ScheduleAndSuspendMode: Used for scheduling jobs to be queued at a future time. At specified time, matching of a worker to the job will not start automatically.
 * SuspendMode: Used when matching workers to a job needs to be suspended.
 */
export interface JobMatchingModeOutputParent {
  kind: JobMatchingModeKindOutput;
}

/** Describes a matching mode used for scheduling jobs to be queued at a future time. At the specified time, matching worker to a job will not start automatically. */
export interface ScheduleAndSuspendModeOutput
  extends JobMatchingModeOutputParent {
  /** Requested schedule time. */
  scheduleAt: string;
  /** The type discriminator describing ScheduleAndSuspendMode */
  kind: "scheduleAndSuspend";
}

/** Describes a matching mode where matching worker to a job is automatically started after job is queued successfully. */
export interface QueueAndMatchModeOutput extends JobMatchingModeOutputParent {
  /** The type discriminator describing QueueAndMatchMode */
  kind: "queueAndMatch";
}

/** Describes a matching mode where matching worker to a job is suspended. */
export interface SuspendModeOutput extends JobMatchingModeOutputParent {
  /** The type discriminator describing SuspendMode */
  kind: "suspend";
}

/** Response payload from reclassifying a job. */
export interface ReclassifyJobResultOutput {}

/** Response payload from cancelling a job. */
export interface CancelJobResultOutput {}

/** Response payload from completing a job. */
export interface CompleteJobResultOutput {}

/** Response payload from closing a job. */
export interface CloseJobResultOutput {}

/** Paged collection of RouterJob items */
export interface PagedRouterJobOutput {
  /** The RouterJob items on this page */
  value: Array<RouterJobOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Position and estimated wait time for a job. */
export interface RouterJobPositionDetailsOutput {
  /** Id of the job these details are about. */
  jobId: string;
  /** Position of the job in question within that queue. */
  position: number;
  /** Id of the queue this job is enqueued in. */
  queueId: string;
  /** Length of the queue: total number of enqueued jobs. */
  queueLength: number;
  /** Estimated wait time of the job rounded up to the nearest minute. */
  estimatedWaitTimeMinutes: number;
}

/** Response payload after a job has been successfully unassigned. */
export interface UnassignJobResultOutput {
  /** Id of an unassigned job. */
  jobId: string;
  /** The number of times a job is unassigned. At a maximum 3. */
  unassignmentCount: number;
}

/** Response containing ids for the worker, job, and assignment from an accepted offer. */
export interface AcceptJobOfferResultOutput {
  /** Id of job assignment that assigns a worker that has accepted an offer to a job. */
  assignmentId: string;
  /** Id of the job assigned. */
  jobId: string;
  /** Id of the worker that has been assigned this job. */
  workerId: string;
}

/** Response payload from declining a job. */
export interface DeclineJobOfferResultOutput {}

/** Statistics for the queue. */
export interface RouterQueueStatisticsOutput {
  /** Id of the queue these details are about. */
  queueId: string;
  /** Length of the queue: total number of enqueued jobs. */
  length: number;
  /** The estimated wait time of this queue rounded up to the nearest minute, grouped by job priority. */
  estimatedWaitTimeMinutes?: Record<string, number>;
  /** The wait time of the job that has been enqueued in this queue for the longest. */
  longestJobWaitTimeMinutes?: number;
}

/** An entity for jobs to be routed to. */
export interface RouterWorkerOutput {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a worker. */
  readonly id: string;
  /**
   * Current state of a worker.
   *
   * Possible values: "active", "draining", "inactive"
   */
  readonly state?: RouterWorkerStateOutput;
  /** Collection of queue(s) that this worker can receive work from. */
  queues?: string[];
  /** The total capacity score this worker has to manage multiple concurrent jobs. */
  capacity?: number;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, any>;
  /** A set of non-identifying attributes attached to this worker. Values must be primitive values - number, string, boolean. */
  tags?: Record<string, any>;
  /** Collection of channel(s) this worker can handle and their impact on the workers capacity. */
  channels?: Array<RouterChannelOutput>;
  /** A list of active offers issued to this worker. */
  readonly offers?: Array<RouterJobOfferOutput>;
  /** A list of assigned jobs attached to this worker. */
  readonly assignedJobs?: Array<RouterWorkerAssignmentOutput>;
  /** A value indicating the workers capacity. A value of '1' means all capacity is consumed. A value of '0' means no capacity is currently consumed. */
  readonly loadRatio?: number;
  /** A flag indicating this worker is open to receive offers or not. */
  availableForOffers?: boolean;
  /** If this is set, the worker will only receive up to this many new offers at a time. */
  maxConcurrentOffers?: number;
}

/** Represents the capacity a job in this channel will consume from a worker. */
export interface RouterChannelOutput {
  /** Id of a channel. */
  channelId: string;
  /** The amount of capacity that an instance of a job of this channel will consume of the total worker capacity. */
  capacityCostPerJob: number;
  /** The maximum number of jobs that can be supported concurrently for this channel. Value must be greater than zero. */
  maxNumberOfJobs?: number;
}

/** An offer of a job to a worker. */
export interface RouterJobOfferOutput {
  /** Id of an offer. */
  readonly offerId: string;
  /** Id of the job. */
  jobId: string;
  /** The capacity cost consumed by the job offer. */
  capacityCost: number;
  /** Timestamp when the offer was created in UTC. */
  offeredAt?: string;
  /** Timestamp when the offer will expire in UTC. */
  expiresAt?: string;
}

/** The assignment for a worker to a job. */
export interface RouterWorkerAssignmentOutput {
  /** Id of the assignment. */
  assignmentId: string;
  /** Id of the job assigned. */
  jobId: string;
  /** The amount of capacity this assignment has consumed on the worker. */
  capacityCost: number;
  /** The assignment time of the job in UTC. */
  assignedAt: string;
}

/** Paged collection of RouterWorker items */
export interface PagedRouterWorkerOutput {
  /** The RouterWorker items on this page */
  value: Array<RouterWorkerOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** An attachment of queue selectors to resolve a queue to a job from a classification policy. */
export type QueueSelectorAttachmentOutput =
  | QueueSelectorAttachmentOutputParent
  | ConditionalQueueSelectorAttachmentOutput
  | PassThroughQueueSelectorAttachmentOutput
  | RuleEngineQueueSelectorAttachmentOutput
  | StaticQueueSelectorAttachmentOutput
  | WeightedAllocationQueueSelectorAttachmentOutput;
/**
 * A rule of one of the following types:
 * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
 * DirectMapRule:  A rule that return the same labels as the input labels.
 * ExpressionRule: A rule providing inline expression rules.
 * FunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
 * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
 */
export type RouterRuleOutput =
  | RouterRuleOutputParent
  | DirectMapRouterRuleOutput
  | ExpressionRouterRuleOutput
  | FunctionRouterRuleOutput
  | StaticRouterRuleOutput
  | WebhookRouterRuleOutput;
/** An attachment which attaches worker selectors to a job. */
export type WorkerSelectorAttachmentOutput =
  | WorkerSelectorAttachmentOutputParent
  | ConditionalWorkerSelectorAttachmentOutput
  | PassThroughWorkerSelectorAttachmentOutput
  | RuleEngineWorkerSelectorAttachmentOutput
  | StaticWorkerSelectorAttachmentOutput
  | WeightedAllocationWorkerSelectorAttachmentOutput;
/** Abstract base class for defining a distribution mode. */
export type DistributionModeOutput =
  | DistributionModeOutputParent
  | BestWorkerModeOutput
  | LongestIdleModeOutput
  | RoundRobinModeOutput;
/** Abstract base class for defining a trigger for exception rules. */
export type ExceptionTriggerOutput =
  | ExceptionTriggerOutputParent
  | QueueLengthExceptionTriggerOutput
  | WaitTimeExceptionTriggerOutput;
/** The action to take when the exception is triggered. */
export type ExceptionActionOutput =
  | ExceptionActionOutputParent
  | CancelExceptionActionOutput
  | ManualReclassifyExceptionActionOutput
  | ReclassifyExceptionActionOutput;
/**
 * A matching mode of one of the following types:
 * QueueAndMatchMode: Used when matching worker to a job is required to be done right after job is queued.
 * ScheduleAndSuspendMode: Used for scheduling jobs to be queued at a future time. At specified time, matching of a worker to the job will not start automatically.
 * SuspendMode: Used when matching workers to a job needs to be suspended.
 */
export type JobMatchingModeOutput =
  | JobMatchingModeOutputParent
  | ScheduleAndSuspendModeOutput
  | QueueAndMatchModeOutput
  | SuspendModeOutput;
/** Alias for QueueSelectorAttachmentKindOutput */
export type QueueSelectorAttachmentKindOutput = string;
/** Alias for RouterRuleKindOutput */
export type RouterRuleKindOutput = string;
/** Alias for ExpressionRouterRuleLanguageOutput */
export type ExpressionRouterRuleLanguageOutput = string;
/** Alias for LabelOperatorOutput */
export type LabelOperatorOutput = string;
/** Alias for WorkerSelectorAttachmentKindOutput */
export type WorkerSelectorAttachmentKindOutput = string;
/** Alias for RouterWorkerSelectorStatusOutput */
export type RouterWorkerSelectorStatusOutput = string;
/** Alias for DistributionModeKindOutput */
export type DistributionModeKindOutput = string;
/** Alias for ScoringRuleParameterSelectorOutput */
export type ScoringRuleParameterSelectorOutput = string;
/** Alias for ExceptionTriggerKindOutput */
export type ExceptionTriggerKindOutput = string;
/** Alias for ExceptionActionKindOutput */
export type ExceptionActionKindOutput = string;
/** Alias for RouterJobStatusOutput */
export type RouterJobStatusOutput = string;
/** Alias for JobMatchingModeKindOutput */
export type JobMatchingModeKindOutput = string;
/** Alias for RouterWorkerStateOutput */
export type RouterWorkerStateOutput = string;
