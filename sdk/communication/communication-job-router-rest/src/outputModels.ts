// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** A container for the rules that govern how jobs are classified. */
export interface ClassificationPolicyOutput {
  /** Unique identifier of this policy. */
  readonly id: string;
  /** Friendly name of this policy. */
  name?: string;
  /** The fallback queue to select if the queue selector doesn't find a match. */
  fallbackQueueId?: string;
  /** The queue selectors to resolve a queue for a given job. */
  queueSelectors?: Array<QueueSelectorAttachmentOutput>;
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule
   * providing static rules that always return the same result, regardless of
   * input.
   * DirectMapRule:  A rule that return the same labels as the input
   * labels.
   * ExpressionRule: A rule providing inline expression
   * rules.
   * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
   * Function.
   * WebhookRule: A rule providing a binding to a webserver following
   * OAuth2.0 authentication protocol.
   */
  prioritizationRule?: RouterRuleOutput;
  /** The worker label selectors to attach to a given job. */
  workerSelectors?: Array<WorkerSelectorAttachmentOutput>;
}

/**
 * An attachment of queue selectors to resolve a queue to a job from a
 * classification policy
 */
export interface QueueSelectorAttachmentOutputParent {
  kind: string;
}

/**
 * Describes a set of queue selectors that will be attached if the given condition
 * resolves to true
 */
export interface ConditionalQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule
   * providing static rules that always return the same result, regardless of
   * input.
   * DirectMapRule:  A rule that return the same labels as the input
   * labels.
   * ExpressionRule: A rule providing inline expression
   * rules.
   * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
   * Function.
   * WebhookRule: A rule providing a binding to a webserver following
   * OAuth2.0 authentication protocol.
   */
  condition: RouterRuleOutput;
  /** The queue selectors to attach */
  queueSelectors: Array<RouterQueueSelectorOutput>;
  /** The type discriminator describing the type of queue selector attachment */
  kind: "conditional";
}

/**
 * A rule of one of the following types:
 *
 * StaticRule:  A rule
 * providing static rules that always return the same result, regardless of
 * input.
 * DirectMapRule:  A rule that return the same labels as the input
 * labels.
 * ExpressionRule: A rule providing inline expression
 * rules.
 * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
 * Function.
 * WebhookRule: A rule providing a binding to a webserver following
 * OAuth2.0 authentication protocol.
 */
export interface RouterRuleOutputParent {
  kind: string;
}

/** A rule that return the same labels as the input labels. */
export interface DirectMapRouterRuleOutput extends RouterRuleOutputParent {
  /** The type discriminator describing a sub-type of Rule */
  kind: "direct-map-rule";
}

/** A rule providing inline expression rules. */
export interface ExpressionRouterRuleOutput extends RouterRuleOutputParent {
  /**
   * The expression language to compile to and execute
   *
   * Possible values: powerFx
   */
  language?: string;
  /**
   * The string containing the expression to evaluate. Should contain return
   * statement with calculated values.
   */
  expression: string;
  /** The type discriminator describing a sub-type of Rule */
  kind: "expression-rule";
}

/** A rule providing a binding to an HTTP Triggered Azure Function. */
export interface FunctionRouterRuleOutput extends RouterRuleOutputParent {
  /** URL for Azure Function */
  functionUri: string;
  /** Credentials used to access Azure function rule */
  credential?: FunctionRouterRuleCredentialOutput;
  /** The type discriminator describing a sub-type of Rule */
  kind: "azure-function-rule";
}

/** Credentials used to access Azure function rule */
export interface FunctionRouterRuleCredentialOutput {
  /** (Optional) Access key scoped to a particular function */
  functionKey?: string;
  /**
   * (Optional) Access key scoped to a Azure Function app.
   * This key grants access to
   * all functions under the app.
   */
  appKey?: string;
  /**
   * (Optional) Client id, when AppKey is provided
   * In context of Azure function,
   * this is usually the name of the key
   */
  clientId?: string;
}

/**
 * A rule providing static rules that always return the same result, regardless of
 * input.
 */
export interface StaticRouterRuleOutput extends RouterRuleOutputParent {
  /** The static value this rule always returns. */
  value?: any;
  /** The type discriminator describing a sub-type of Rule */
  kind: "static-rule";
}

/** A rule providing a binding to an external web server. */
export interface WebhookRouterRuleOutput extends RouterRuleOutputParent {
  /** Uri for Authorization Server. */
  authorizationServerUri?: string;
  /**
   * OAuth2.0 Credentials used to Contoso's Authorization server.
   * Reference:
   * https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/
   */
  clientCredential?: Oauth2ClientCredentialOutput;
  /** Uri for Contoso's Web Server. */
  webhookUri?: string;
  /** The type discriminator describing a sub-type of Rule */
  kind: "webhook-rule";
}

/**
 * OAuth2.0 Credentials used to Contoso's Authorization server.
 * Reference:
 * https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/
 */
export interface Oauth2ClientCredentialOutput {
  /** ClientId for Contoso Authorization server. */
  clientId?: string;
  /** Client secret for Contoso Authorization server. */
  clientSecret?: string;
}

/**
 * Describes a condition that must be met against a set of labels for queue
 * selection
 */
export interface RouterQueueSelectorOutput {
  /** The label key to query against */
  key: string;
  /**
   * Describes how the value of the label is compared to the value defined on the
   * label selector
   *
   * Possible values: equal, notEqual, lessThan, lessThanEqual, greaterThan, greaterThanEqual
   */
  labelOperator: string;
  /** The value to compare against the actual label value with the given operator */
  value?: any;
}

/**
 * Attaches a queue selector where the value is passed through from the job label
 * with the same key
 */
export interface PassThroughQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /** The label key to query against */
  key: string;
  /**
   * Describes how the value of the label is compared to the value pass through
   *
   * Possible values: equal, notEqual, lessThan, lessThanEqual, greaterThan, greaterThanEqual
   */
  labelOperator: string;
  /** The type discriminator describing the type of queue selector attachment */
  kind: "pass-through";
}

/** Attaches queue selectors to a job when the RouterRule is resolved */
export interface RuleEngineQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule
   * providing static rules that always return the same result, regardless of
   * input.
   * DirectMapRule:  A rule that return the same labels as the input
   * labels.
   * ExpressionRule: A rule providing inline expression
   * rules.
   * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
   * Function.
   * WebhookRule: A rule providing a binding to a webserver following
   * OAuth2.0 authentication protocol.
   */
  rule: RouterRuleOutput;
  /** The type discriminator describing the type of queue selector attachment */
  kind: "rule-engine";
}

/** Describes a queue selector that will be attached to the job */
export interface StaticQueueSelectorAttachmentOutput extends QueueSelectorAttachmentOutputParent {
  /**
   * Describes a condition that must be met against a set of labels for queue
   * selection
   */
  queueSelector: RouterQueueSelectorOutput;
  /** The type discriminator describing the type of queue selector attachment */
  kind: "static";
}

/**
 * Describes multiple sets of queue selectors, of which one will be selected and
 * attached according to a weighting
 */
export interface WeightedAllocationQueueSelectorAttachmentOutput
  extends QueueSelectorAttachmentOutputParent {
  /** A collection of percentage based weighted allocations. */
  allocations: Array<QueueWeightedAllocationOutput>;
  /** The type discriminator describing the type of queue selector attachment */
  kind: "weighted-allocation-queue-selector";
}

/**
 * Contains the weight percentage and queue selectors to be applied if selected
 * for weighted distributions.
 */
export interface QueueWeightedAllocationOutput {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /**
   * A collection of queue selectors that will be applied if this allocation is
   * selected.
   */
  queueSelectors: Array<RouterQueueSelectorOutput>;
}

/** An attachment which attaches worker selectors to a job */
export interface WorkerSelectorAttachmentOutputParent {
  kind: string;
}

/**
 * Describes a set of worker selectors that will be attached if the given
 * condition resolves to true
 */
export interface ConditionalWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule
   * providing static rules that always return the same result, regardless of
   * input.
   * DirectMapRule:  A rule that return the same labels as the input
   * labels.
   * ExpressionRule: A rule providing inline expression
   * rules.
   * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
   * Function.
   * WebhookRule: A rule providing a binding to a webserver following
   * OAuth2.0 authentication protocol.
   */
  condition: RouterRuleOutput;
  /** The worker selectors to attach */
  workerSelectors: Array<RouterWorkerSelectorOutput>;
  /** The type discriminator describing the type of worker selector attachment */
  kind: "conditional";
}

/**
 * Describes a condition that must be met against a set of labels for worker
 * selection
 */
export interface RouterWorkerSelectorOutput {
  /** The label key to query against */
  key: string;
  /**
   * Describes how the value of the label is compared to the value defined on the
   * label selector
   *
   * Possible values: equal, notEqual, lessThan, lessThanEqual, greaterThan, greaterThanEqual
   */
  labelOperator: string;
  /** The value to compare against the actual label value with the given operator */
  value?: any;
  /** Describes how long this label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** Pushes the job to the front of the queue as long as this selector is active. */
  expedite?: boolean;
  /**
   * The status of the worker selector.
   *
   * Possible values: active, expired
   */
  readonly status?: string;
  /** The time at which this worker selector expires in UTC */
  readonly expiresAt?: string;
}

/**
 * Attaches a worker selector where the value is passed through from the job label
 * with the same key
 */
export interface PassThroughWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /** The label key to query against */
  key: string;
  /**
   * Describes how the value of the label is compared to the value pass through
   *
   * Possible values: equal, notEqual, lessThan, lessThanEqual, greaterThan, greaterThanEqual
   */
  labelOperator: string;
  /** Describes how long the attached label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** The type discriminator describing the type of worker selector attachment */
  kind: "pass-through";
}

/** Attaches worker selectors to a job when a RouterRule is resolved */
export interface RuleEngineWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule
   * providing static rules that always return the same result, regardless of
   * input.
   * DirectMapRule:  A rule that return the same labels as the input
   * labels.
   * ExpressionRule: A rule providing inline expression
   * rules.
   * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
   * Function.
   * WebhookRule: A rule providing a binding to a webserver following
   * OAuth2.0 authentication protocol.
   */
  rule: RouterRuleOutput;
  /** The type discriminator describing the type of worker selector attachment */
  kind: "rule-engine";
}

/** Describes a worker selector that will be attached to the job */
export interface StaticWorkerSelectorAttachmentOutput extends WorkerSelectorAttachmentOutputParent {
  /**
   * Describes a condition that must be met against a set of labels for worker
   * selection
   */
  workerSelector: RouterWorkerSelectorOutput;
  /** The type discriminator describing the type of worker selector attachment */
  kind: "static";
}

/**
 * Describes multiple sets of worker selectors, of which one will be selected and
 * attached according to a weighting
 */
export interface WeightedAllocationWorkerSelectorAttachmentOutput
  extends WorkerSelectorAttachmentOutputParent {
  /** A collection of percentage based weighted allocations. */
  allocations: Array<WorkerWeightedAllocationOutput>;
  /** The type discriminator describing the type of worker selector attachment */
  kind: "weighted-allocation-worker-selector";
}

/**
 * Contains the weight percentage and worker selectors to be applied if selected
 * for weighted distributions.
 */
export interface WorkerWeightedAllocationOutput {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /**
   * A collection of worker selectors that will be applied if this allocation is
   * selected.
   */
  workerSelectors: Array<RouterWorkerSelectorOutput>;
}

/** Provides the 'If-*' headers to enable conditional (cached) responses for JobRouter. */
export interface RouterConditionalRequestHeadersOutput {}

/** Paged instance of ClassificationPolicy */
export interface ClassificationPolicyItemOutput {
  /** A container for the rules that govern how jobs are classified. */
  classificationPolicy: ClassificationPolicyOutput;
  /** (Optional) The Concurrency Token. */
  etag: string;
}

/** Policy governing how jobs are distributed to workers */
export interface DistributionPolicyOutput {
  /** The unique identifier of the policy. */
  readonly id: string;
  /** The human readable name of the policy. */
  name?: string;
  /**
   * The number of seconds after which any offers created under this policy will be
   * expired.
   */
  offerExpiresAfterSeconds?: number;
  /** Abstract base class for defining a distribution mode */
  mode?: DistributionModeOutput;
}

/** Abstract base class for defining a distribution mode */
export interface DistributionModeOutputParent {
  /** Governs the minimum desired number of active concurrent offers a job can have. */
  minConcurrentOffers?: number;
  /** Governs the maximum number of active concurrent offers a job can have. */
  maxConcurrentOffers?: number;
  /**
   * (Optional)
   * If set to true, then router will match workers to jobs even if they
   * don't match label selectors.
   * Warning: You may get workers that are not
   * qualified for the job they are matched with if you set this
   * variable to true.
   * This flag is intended more for temporary usage.
   * By default, set to false.
   */
  bypassSelectors?: boolean;
  kind: string;
}

/** Jobs are distributed to the worker with the strongest abilities available. */
export interface BestWorkerModeOutput extends DistributionModeOutputParent {
  /**
   * A rule of one of the following types:
   *
   * StaticRule:  A rule
   * providing static rules that always return the same result, regardless of
   * input.
   * DirectMapRule:  A rule that return the same labels as the input
   * labels.
   * ExpressionRule: A rule providing inline expression
   * rules.
   * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
   * Function.
   * WebhookRule: A rule providing a binding to a webserver following
   * OAuth2.0 authentication protocol.
   */
  scoringRule?: RouterRuleOutput;
  /**
   * Encapsulates all options that can be passed as parameters for scoring rule with
   * BestWorkerMode
   */
  scoringRuleOptions?: ScoringRuleOptionsOutput;
  /** The type discriminator describing a sub-type of Mode */
  kind: "best-worker";
}

/**
 * Encapsulates all options that can be passed as parameters for scoring rule with
 * BestWorkerMode
 */
export interface ScoringRuleOptionsOutput {
  /**
   * (Optional) Set batch size when AllowScoringBatchOfWorkers is set to true.
   * Defaults to 20 if not configured.
   */
  batchSize?: number;
  /**
   * (Optional) List of extra parameters from the job that will be sent as part of
   * the payload to scoring rule.
   * If not set, the job's labels (sent in the payload
   * as `job`) and the job's worker selectors (sent in the payload as
   * `selectors`)
   * are added to the payload of the scoring rule by default.
   * Note:
   * Worker labels are always sent with scoring payload.
   */
  scoringParameters?: string[];
  /**
   * (Optional)
   * If set to true, will score workers in batches, and the parameter
   * name of the worker labels will be sent as `workers`.
   * By default, set to false
   * and the parameter name for the worker labels will be sent as `worker`.
   * Note: If
   * enabled, use BatchSize to set batch size.
   */
  allowScoringBatchOfWorkers?: boolean;
  /**
   * (Optional)
   * If false, will sort scores by ascending order. By default, set to
   * true.
   */
  descendingOrder?: boolean;
}

/** Jobs are directed to the worker who has been idle longest. */
export interface LongestIdleModeOutput extends DistributionModeOutputParent {
  /** The type discriminator describing a sub-type of Mode */
  kind: "longest-idle";
}

/**
 * Jobs are distributed in order to workers, starting with the worker that is
 * after the last worker to receive a job.
 */
export interface RoundRobinModeOutput extends DistributionModeOutputParent {
  /** The type discriminator describing a sub-type of Mode */
  kind: "round-robin";
}

/** Paged instance of DistributionPolicy */
export interface DistributionPolicyItemOutput {
  /** Policy governing how jobs are distributed to workers */
  distributionPolicy: DistributionPolicyOutput;
  /** (Optional) The Concurrency Token. */
  etag: string;
}

/** A policy that defines actions to execute when exception are triggered. */
export interface ExceptionPolicyOutput {
  /** The Id of the exception policy */
  readonly id: string;
  /** (Optional) The name of the exception policy. */
  name?: string;
  /**
   * (Optional) A dictionary collection of exception rules on the exception policy.
   * Key is the Id of each exception rule.
   */
  exceptionRules?: Record<string, ExceptionRuleOutput>;
}

/** A rule that defines actions to execute upon a specific trigger. */
export interface ExceptionRuleOutput {
  /** The trigger for this exception rule */
  trigger: ExceptionTriggerOutput;
  /**
   * A dictionary collection of actions to perform once the exception is triggered.
   * Key is the Id of each exception action.
   */
  actions: Record<string, ExceptionActionOutput>;
}

/** The trigger for this exception rule */
export interface ExceptionTriggerOutputParent {
  kind: string;
}

/** Trigger for an exception action on exceeding queue length */
export interface QueueLengthExceptionTriggerOutput extends ExceptionTriggerOutputParent {
  /** Threshold of number of jobs ahead in the queue to for this trigger to fire. */
  threshold: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger */
  kind: "queue-length";
}

/** Trigger for an exception action on exceeding wait time */
export interface WaitTimeExceptionTriggerOutput extends ExceptionTriggerOutputParent {
  /** Threshold for wait time for this trigger. */
  thresholdSeconds: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger */
  kind: "wait-time";
}

/** The action to take when the exception is triggered */
export interface ExceptionActionOutputParent {
  kind: string;
}

/** An action that marks a job as cancelled */
export interface CancelExceptionActionOutput extends ExceptionActionOutputParent {
  /**
   * (Optional) A note that will be appended to the jobs' Notes collection with the
   * current timestamp.
   */
  note?: string;
  /**
   * (Optional) Indicates the outcome of the job, populate this field with your own
   * custom values.
   */
  dispositionCode?: string;
  /** The type discriminator describing a sub-type of ExceptionAction */
  kind: "cancel";
}

/**
 * An action that manually reclassifies a job by providing the queue, priority and
 * worker selectors.
 */
export interface ManualReclassifyExceptionActionOutput extends ExceptionActionOutputParent {
  /** Updated QueueId. */
  queueId?: string;
  /** Updated Priority. */
  priority?: number;
  /** Updated WorkerSelectors. */
  workerSelectors?: Array<RouterWorkerSelectorOutput>;
  /** The type discriminator describing a sub-type of ExceptionAction */
  kind: "manual-reclassify";
}

/** An action that modifies labels on a job and then reclassifies it */
export interface ReclassifyExceptionActionOutput extends ExceptionActionOutputParent {
  /**
   * (optional) The new classification policy that will determine queue, priority
   * and worker selectors.
   */
  classificationPolicyId?: string;
  /**
   * (optional) Dictionary containing the labels to update (or add if not existing)
   * in key-value pairs
   */
  labelsToUpsert?: Record<string, any>;
  /** The type discriminator describing a sub-type of ExceptionAction */
  kind: "reclassify";
}

/** Paged instance of ExceptionPolicy */
export interface ExceptionPolicyItemOutput {
  /** A policy that defines actions to execute when exception are triggered. */
  exceptionPolicy: ExceptionPolicyOutput;
  /** (Optional) The Concurrency Token. */
  etag: string;
}

/** A queue that can contain jobs to be routed. */
export interface RouterQueueOutput {
  /** The Id of this queue */
  readonly id: string;
  /** The name of this queue. */
  name?: string;
  /**
   * The ID of the distribution policy that will determine how a job is distributed
   * to workers.
   */
  distributionPolicyId?: string;
  /**
   * A set of key/value pairs that are identifying attributes used by the rules
   * engines to make decisions.
   */
  labels?: Record<string, any>;
  /**
   * (Optional) The ID of the exception policy that determines various job
   * escalation rules.
   */
  exceptionPolicyId?: string;
}

/** Paged instance of RouterQueue */
export interface RouterQueueItemOutput {
  /** A queue that can contain jobs to be routed. */
  queue: RouterQueueOutput;
  /** (Optional) The Concurrency Token. */
  etag: string;
}

/** A unit of work to be routed */
export interface RouterJobOutput {
  /** The id of the job. */
  readonly id: string;
  /** Reference to an external parent context, eg. call ID. */
  channelReference?: string;
  /**
   * The status of the Job.
   *
   * Possible values: pendingClassification, queued, assigned, completed, closed, cancelled, classificationFailed, created, pendingSchedule, scheduled, scheduleFailed, waitingForActivation
   */
  readonly status?: string;
  /** The time a job was queued in UTC. */
  readonly enqueuedAt?: string;
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
  /**
   * A collection of manually specified label selectors, which a worker must satisfy
   * in order to process this job.
   */
  requestedWorkerSelectors?: Array<RouterWorkerSelectorOutput>;
  /**
   * A collection of label selectors attached by a classification policy, which a
   * worker must satisfy in order to process this job.
   */
  readonly attachedWorkerSelectors?: Array<RouterWorkerSelectorOutput>;
  /**
   * A set of key/value pairs that are identifying attributes used by the rules
   * engines to make decisions.
   */
  labels?: Record<string, any>;
  /**
   * A collection of the assignments of the job.
   * Key is AssignmentId.
   */
  readonly assignments?: Record<string, RouterJobAssignmentOutput>;
  /** A set of non-identifying attributes attached to this job */
  tags?: Record<string, any>;
  /** Notes attached to a job, sorted by timestamp */
  notes?: Record<string, string>;
  /** If set, job will be scheduled to be enqueued at a given time */
  readonly scheduledAt?: string;
  /**
   * The matching mode to be applied to this job.
   *
   * Supported types:
   *
   *
   * QueueAndMatchMode: Used when matching worker to a job is required to be
   * done right after job is queued.
   * ScheduleAndSuspendMode: Used for scheduling
   * jobs to be queued at a future time. At specified time, matching of a worker to
   * the job will not start automatically.
   * SuspendMode: Used when matching workers
   * to a job needs to be suspended.
   */
  matchingMode?: JobMatchingModeOutput;
}

/** Assignment details of a job to a worker */
export interface RouterJobAssignmentOutput {
  /** The Id of the job assignment. */
  assignmentId: string;
  /** The Id of the Worker assigned to the job. */
  workerId?: string;
  /** The assignment time of the job in UTC. */
  assignedAt: string;
  /** The time the job was marked as completed after being assigned in UTC. */
  completedAt?: string;
  /** The time the job was marked as closed after being completed in UTC. */
  closedAt?: string;
}

/**
 * The matching mode to be applied to this job.
 *
 * Supported types:
 *
 *
 * QueueAndMatchMode: Used when matching worker to a job is required to be
 * done right after job is queued.
 * ScheduleAndSuspendMode: Used for scheduling
 * jobs to be queued at a future time. At specified time, matching of a worker to
 * the job will not start automatically.
 * SuspendMode: Used when matching workers
 * to a job needs to be suspended.
 */
export interface JobMatchingModeOutput {
  /**
   * Discriminator value used to differentiate between supported matching mode types.
   *
   * Possible values: queueAndMatchMode, scheduleAndSuspendMode, suspendMode
   */
  modeType?: string;
  /**
   * Describes a matching mode where matching worker to a job is automatically
   * started after job is queued successfully.
   */
  queueAndMatchMode?: QueueAndMatchModeOutput;
  /**
   * Describes a matching mode used for scheduling jobs to be queued at a future
   * time.
   * At the specified time, matching worker to a job will not start
   * automatically.
   */
  scheduleAndSuspendMode?: ScheduleAndSuspendModeOutput;
  /** Describes a matching mode where matching worker to a job is suspended. */
  suspendMode?: SuspendModeOutput;
}

/** Describes a matching mode where matching worker to a job is automatically started after job is queued successfully. */
export interface QueueAndMatchModeOutput {}

/**
 * Describes a matching mode used for scheduling jobs to be queued at a future
 * time.
 * At the specified time, matching worker to a job will not start
 * automatically.
 */
export interface ScheduleAndSuspendModeOutput {
  /** Scheduled time. */
  scheduleAt: string;
}

/** Describes a matching mode where matching worker to a job is suspended. */
export interface SuspendModeOutput {}

/** Paged instance of RouterJob */
export interface RouterJobItemOutput {
  /** A unit of work to be routed */
  job: RouterJobOutput;
  /** (Optional) The Concurrency Token. */
  etag: string;
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
  /** Estimated wait time of the job rounded up to the nearest minute */
  estimatedWaitTimeMinutes: number;
}

/** Response payload after a job has been successfully unassigned. */
export interface UnassignJobResultOutput {
  /** The Id of the job unassigned. */
  jobId: string;
  /** The number of times a job is unassigned. At a maximum 3. */
  unassignmentCount: number;
}

/**
 * Response containing Id's for the worker, job, and assignment from an accepted
 * offer
 */
export interface AcceptJobOfferResultOutput {
  /** The assignment Id that assigns a worker that has accepted an offer to a job. */
  assignmentId: string;
  /** The Id of the job assigned. */
  jobId: string;
  /** The Id of the worker that has been assigned this job. */
  workerId: string;
}

/** Statistics for the queue */
export interface RouterQueueStatisticsOutput {
  /** Id of the queue these details are about. */
  queueId: string;
  /** Length of the queue: total number of enqueued jobs. */
  length: number;
  /**
   * The estimated wait time of this queue rounded up to the nearest minute, grouped
   * by job priority
   */
  estimatedWaitTimeMinutes?: Record<string, number>;
  /** The wait time of the job that has been enqueued in this queue for the longest. */
  longestJobWaitTimeMinutes?: number;
}

/** An entity for jobs to be routed to */
export interface RouterWorkerOutput {
  /** Id of the worker. */
  readonly id: string;
  /**
   * The current state of the worker.
   *
   * Possible values: active, draining, inactive
   */
  readonly state?: string;
  /** The queue(s) that this worker can receive work from. */
  queueAssignments?: Record<string, RouterQueueAssignmentOutput>;
  /** The total capacity score this worker has to manage multiple concurrent jobs. */
  totalCapacity?: number;
  /**
   * A set of key/value pairs that are identifying attributes used by the rules
   * engines to make decisions.
   */
  labels?: Record<string, any>;
  /** A set of non-identifying attributes attached to this worker. */
  tags?: Record<string, any>;
  /** The channel(s) this worker can handle and their impact on the workers capacity. */
  channelConfigurations?: Record<string, ChannelConfigurationOutput>;
  /** A list of active offers issued to this worker. */
  readonly offers?: Array<RouterJobOfferOutput>;
  /** A list of assigned jobs attached to this worker. */
  readonly assignedJobs?: Array<RouterWorkerAssignmentOutput>;
  /**
   * A value indicating the workers capacity. A value of '1' means all capacity is
   * consumed. A value of '0' means no capacity is currently consumed.
   */
  readonly loadRatio?: number;
  /** A flag indicating this worker is open to receive offers or not. */
  availableForOffers?: boolean;
}

/** An assignment of a worker to a queue */
export interface RouterQueueAssignmentOutput {}

/** Represents the capacity a job in this channel will consume from a worker */
export interface ChannelConfigurationOutput {
  /**
   * The amount of capacity that an instance of a job of this channel will consume
   * of the total worker capacity.
   */
  capacityCostPerJob: number;
  /** The maximum number of jobs that can be supported concurrently for this channel. */
  maxNumberOfJobs?: number;
}

/** An offer of a job to a worker */
export interface RouterJobOfferOutput {
  /** The Id of the offer. */
  offerId: string;
  /** The Id of the job. */
  jobId: string;
  /** The capacity cost consumed by the job offer. */
  capacityCost: number;
  /** The time the offer was created in UTC. */
  offeredAt?: string;
  /** The time that the offer will expire in UTC. */
  expiresAt?: string;
}

/** The assignment for a worker to a job */
export interface RouterWorkerAssignmentOutput {
  /** The Id of the assignment. */
  assignmentId: string;
  /** The Id of the Job assigned. */
  jobId: string;
  /** The amount of capacity this assignment has consumed on the worker. */
  capacityCost: number;
  /** The assignment time of the job in UTC. */
  assignedAt: string;
}

/** Paged instance of RouterWorker */
export interface RouterWorkerItemOutput {
  /** An entity for jobs to be routed to */
  worker: RouterWorkerOutput;
  /** (Optional) The Concurrency Token. */
  etag: string;
}

/**
 * An attachment of queue selectors to resolve a queue to a job from a
 * classification policy
 */
export type QueueSelectorAttachmentOutput =
  | ConditionalQueueSelectorAttachmentOutput
  | PassThroughQueueSelectorAttachmentOutput
  | RuleEngineQueueSelectorAttachmentOutput
  | StaticQueueSelectorAttachmentOutput
  | WeightedAllocationQueueSelectorAttachmentOutput;
/**
 * A rule of one of the following types:
 *
 * StaticRule:  A rule
 * providing static rules that always return the same result, regardless of
 * input.
 * DirectMapRule:  A rule that return the same labels as the input
 * labels.
 * ExpressionRule: A rule providing inline expression
 * rules.
 * FunctionRule: A rule providing a binding to an HTTP Triggered Azure
 * Function.
 * WebhookRule: A rule providing a binding to a webserver following
 * OAuth2.0 authentication protocol.
 */
export type RouterRuleOutput =
  | DirectMapRouterRuleOutput
  | ExpressionRouterRuleOutput
  | FunctionRouterRuleOutput
  | StaticRouterRuleOutput
  | WebhookRouterRuleOutput;
/** An attachment which attaches worker selectors to a job */
export type WorkerSelectorAttachmentOutput =
  | ConditionalWorkerSelectorAttachmentOutput
  | PassThroughWorkerSelectorAttachmentOutput
  | RuleEngineWorkerSelectorAttachmentOutput
  | StaticWorkerSelectorAttachmentOutput
  | WeightedAllocationWorkerSelectorAttachmentOutput;
/** Abstract base class for defining a distribution mode */
export type DistributionModeOutput =
  | BestWorkerModeOutput
  | LongestIdleModeOutput
  | RoundRobinModeOutput;
/** The trigger for this exception rule */
export type ExceptionTriggerOutput =
  | QueueLengthExceptionTriggerOutput
  | WaitTimeExceptionTriggerOutput;
/** The action to take when the exception is triggered */
export type ExceptionActionOutput =
  | CancelExceptionActionOutput
  | ManualReclassifyExceptionActionOutput
  | ReclassifyExceptionActionOutput;
/** A paged collection of classification policies. */
export type PagedClassificationPolicyItemOutput = Paged<ClassificationPolicyItemOutput>;
/** A paged collection of distribution policies. */
export type PagedDistributionPolicyItemOutput = Paged<DistributionPolicyItemOutput>;
/** A paged collection of exception policies. */
export type PagedExceptionPolicyItemOutput = Paged<ExceptionPolicyItemOutput>;
/** A paged collection of queues. */
export type PagedRouterQueueItemOutput = Paged<RouterQueueItemOutput>;
/** A paged collection of jobs. */
export type PagedRouterJobItemOutput = Paged<RouterJobItemOutput>;
/** A paged collection of workers. */
export type PagedRouterWorkerItemOutput = Paged<RouterWorkerItemOutput>;
