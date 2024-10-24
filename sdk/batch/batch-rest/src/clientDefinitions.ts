// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListApplicationsParameters,
  GetApplicationParameters,
  ListPoolUsageMetricsParameters,
  CreatePoolParameters,
  ListPoolsParameters,
  DeletePoolParameters,
  PoolExistsParameters,
  GetPoolParameters,
  UpdatePoolParameters,
  DisablePoolAutoScaleParameters,
  EnablePoolAutoScaleParameters,
  EvaluatePoolAutoScaleParameters,
  ResizePoolParameters,
  StopPoolResizeParameters,
  ReplacePoolPropertiesParameters,
  RemoveNodesParameters,
  ListSupportedImagesParameters,
  ListPoolNodeCountsParameters,
  DeleteJobParameters,
  GetJobParameters,
  UpdateJobParameters,
  ReplaceJobParameters,
  DisableJobParameters,
  EnableJobParameters,
  TerminateJobParameters,
  CreateJobParameters,
  ListJobsParameters,
  ListJobsFromScheduleParameters,
  ListJobPreparationAndReleaseTaskStatusParameters,
  GetJobTaskCountsParameters,
  JobScheduleExistsParameters,
  DeleteJobScheduleParameters,
  GetJobScheduleParameters,
  UpdateJobScheduleParameters,
  ReplaceJobScheduleParameters,
  DisableJobScheduleParameters,
  EnableJobScheduleParameters,
  TerminateJobScheduleParameters,
  CreateJobScheduleParameters,
  ListJobSchedulesParameters,
  CreateTaskParameters,
  ListTasksParameters,
  CreateTaskCollectionParameters,
  DeleteTaskParameters,
  GetTaskParameters,
  ReplaceTaskParameters,
  ListSubTasksParameters,
  TerminateTaskParameters,
  ReactivateTaskParameters,
  DeleteTaskFileParameters,
  GetTaskFileParameters,
  GetTaskFilePropertiesParameters,
  ListTaskFilesParameters,
  CreateNodeUserParameters,
  DeleteNodeUserParameters,
  ReplaceNodeUserParameters,
  GetNodeParameters,
  RebootNodeParameters,
  StartNodeParameters,
  DeallocateNodeParameters,
  ReimageNodeParameters,
  DisableNodeSchedulingParameters,
  EnableNodeSchedulingParameters,
  GetNodeRemoteLoginSettingsParameters,
  UploadNodeLogsParameters,
  ListNodesParameters,
  GetNodeExtensionParameters,
  ListNodeExtensionsParameters,
  DeleteNodeFileParameters,
  GetNodeFileParameters,
  GetNodeFilePropertiesParameters,
  ListNodeFilesParameters,
} from "./parameters.js";
import {
  ListApplications200Response,
  ListApplicationsDefaultResponse,
  GetApplication200Response,
  GetApplicationDefaultResponse,
  ListPoolUsageMetrics200Response,
  ListPoolUsageMetricsDefaultResponse,
  CreatePool201Response,
  CreatePoolDefaultResponse,
  ListPools200Response,
  ListPoolsDefaultResponse,
  DeletePool202Response,
  DeletePoolDefaultResponse,
  PoolExists200Response,
  PoolExists404Response,
  PoolExistsDefaultResponse,
  GetPool200Response,
  GetPoolDefaultResponse,
  UpdatePool200Response,
  UpdatePoolDefaultResponse,
  DisablePoolAutoScale200Response,
  DisablePoolAutoScaleDefaultResponse,
  EnablePoolAutoScale200Response,
  EnablePoolAutoScaleDefaultResponse,
  EvaluatePoolAutoScale200Response,
  EvaluatePoolAutoScaleDefaultResponse,
  ResizePool202Response,
  ResizePoolDefaultResponse,
  StopPoolResize202Response,
  StopPoolResizeDefaultResponse,
  ReplacePoolProperties204Response,
  ReplacePoolPropertiesDefaultResponse,
  RemoveNodes202Response,
  RemoveNodesDefaultResponse,
  ListSupportedImages200Response,
  ListSupportedImagesDefaultResponse,
  ListPoolNodeCounts200Response,
  ListPoolNodeCountsDefaultResponse,
  DeleteJob202Response,
  DeleteJobDefaultResponse,
  GetJob200Response,
  GetJobDefaultResponse,
  UpdateJob200Response,
  UpdateJobDefaultResponse,
  ReplaceJob200Response,
  ReplaceJobDefaultResponse,
  DisableJob202Response,
  DisableJobDefaultResponse,
  EnableJob202Response,
  EnableJobDefaultResponse,
  TerminateJob202Response,
  TerminateJobDefaultResponse,
  CreateJob201Response,
  CreateJobDefaultResponse,
  ListJobs200Response,
  ListJobsDefaultResponse,
  ListJobsFromSchedule200Response,
  ListJobsFromScheduleDefaultResponse,
  ListJobPreparationAndReleaseTaskStatus200Response,
  ListJobPreparationAndReleaseTaskStatusDefaultResponse,
  GetJobTaskCounts200Response,
  GetJobTaskCountsDefaultResponse,
  JobScheduleExists200Response,
  JobScheduleExists404Response,
  JobScheduleExistsDefaultResponse,
  DeleteJobSchedule202Response,
  DeleteJobScheduleDefaultResponse,
  GetJobSchedule200Response,
  GetJobScheduleDefaultResponse,
  UpdateJobSchedule200Response,
  UpdateJobScheduleDefaultResponse,
  ReplaceJobSchedule200Response,
  ReplaceJobScheduleDefaultResponse,
  DisableJobSchedule204Response,
  DisableJobScheduleDefaultResponse,
  EnableJobSchedule204Response,
  EnableJobScheduleDefaultResponse,
  TerminateJobSchedule202Response,
  TerminateJobScheduleDefaultResponse,
  CreateJobSchedule201Response,
  CreateJobScheduleDefaultResponse,
  ListJobSchedules200Response,
  ListJobSchedulesDefaultResponse,
  CreateTask201Response,
  CreateTaskDefaultResponse,
  ListTasks200Response,
  ListTasksDefaultResponse,
  CreateTaskCollection200Response,
  CreateTaskCollectionDefaultResponse,
  DeleteTask200Response,
  DeleteTaskDefaultResponse,
  GetTask200Response,
  GetTaskDefaultResponse,
  ReplaceTask200Response,
  ReplaceTaskDefaultResponse,
  ListSubTasks200Response,
  ListSubTasksDefaultResponse,
  TerminateTask204Response,
  TerminateTaskDefaultResponse,
  ReactivateTask204Response,
  ReactivateTaskDefaultResponse,
  DeleteTaskFile200Response,
  DeleteTaskFileDefaultResponse,
  GetTaskFile200Response,
  GetTaskFileDefaultResponse,
  GetTaskFileProperties200Response,
  GetTaskFilePropertiesDefaultResponse,
  ListTaskFiles200Response,
  ListTaskFilesDefaultResponse,
  CreateNodeUser201Response,
  CreateNodeUserDefaultResponse,
  DeleteNodeUser200Response,
  DeleteNodeUserDefaultResponse,
  ReplaceNodeUser200Response,
  ReplaceNodeUserDefaultResponse,
  GetNode200Response,
  GetNodeDefaultResponse,
  RebootNode202Response,
  RebootNodeDefaultResponse,
  StartNode202Response,
  StartNodeDefaultResponse,
  DeallocateNode202Response,
  DeallocateNodeDefaultResponse,
  ReimageNode202Response,
  ReimageNodeDefaultResponse,
  DisableNodeScheduling200Response,
  DisableNodeSchedulingDefaultResponse,
  EnableNodeScheduling200Response,
  EnableNodeSchedulingDefaultResponse,
  GetNodeRemoteLoginSettings200Response,
  GetNodeRemoteLoginSettingsDefaultResponse,
  UploadNodeLogs200Response,
  UploadNodeLogsDefaultResponse,
  ListNodes200Response,
  ListNodesDefaultResponse,
  GetNodeExtension200Response,
  GetNodeExtensionDefaultResponse,
  ListNodeExtensions200Response,
  ListNodeExtensionsDefaultResponse,
  DeleteNodeFile200Response,
  DeleteNodeFileDefaultResponse,
  GetNodeFile200Response,
  GetNodeFileDefaultResponse,
  GetNodeFileProperties200Response,
  GetNodeFilePropertiesDefaultResponse,
  ListNodeFiles200Response,
  ListNodeFilesDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListApplications {
  /**
   * This operation returns only Applications and versions that are available for
   * use on Compute Nodes; that is, that can be used in an Package reference. For
   * administrator information about applications and versions that are not yet
   * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
   * API.
   */
  get(
    options?: ListApplicationsParameters,
  ): StreamableMethod<ListApplications200Response | ListApplicationsDefaultResponse>;
}

export interface GetApplication {
  /**
   * This operation returns only Applications and versions that are available for
   * use on Compute Nodes; that is, that can be used in an Package reference. For
   * administrator information about Applications and versions that are not yet
   * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
   * API.
   */
  get(
    options?: GetApplicationParameters,
  ): StreamableMethod<GetApplication200Response | GetApplicationDefaultResponse>;
}

export interface ListPoolUsageMetrics {
  /**
   * If you do not specify a $filter clause including a poolId, the response
   * includes all Pools that existed in the Account in the time range of the
   * returned aggregation intervals. If you do not specify a $filter clause
   * including a startTime or endTime these filters default to the start and end
   * times of the last aggregation interval currently available; that is, only the
   * last aggregation interval is returned.
   */
  get(
    options?: ListPoolUsageMetricsParameters,
  ): StreamableMethod<ListPoolUsageMetrics200Response | ListPoolUsageMetricsDefaultResponse>;
}

export interface CreatePool {
  /**
   * When naming Pools, avoid including sensitive information such as user names or
   * secret project names. This information may appear in telemetry logs accessible
   * to Microsoft Support engineers.
   */
  post(
    options: CreatePoolParameters,
  ): StreamableMethod<CreatePool201Response | CreatePoolDefaultResponse>;
  /** Lists all of the Pools which be mounted. */
  get(
    options?: ListPoolsParameters,
  ): StreamableMethod<ListPools200Response | ListPoolsDefaultResponse>;
}

export interface DeletePool {
  /**
   * When you request that a Pool be deleted, the following actions occur: the Pool
   * state is set to deleting; any ongoing resize operation on the Pool are stopped;
   * the Batch service starts resizing the Pool to zero Compute Nodes; any Tasks
   * running on existing Compute Nodes are terminated and requeued (as if a resize
   * Pool operation had been requested with the default requeue option); finally,
   * the Pool is removed from the system. Because running Tasks are requeued, the
   * user can rerun these Tasks by updating their Job to target a different Pool.
   * The Tasks can then run on the new Pool. If you want to override the requeue
   * behavior, then you should call resize Pool explicitly to shrink the Pool to
   * zero size before deleting the Pool. If you call an Update, Patch or Delete API
   * on a Pool in the deleting state, it will fail with HTTP status code 409 with
   * error code PoolBeingDeleted.
   */
  delete(
    options?: DeletePoolParameters,
  ): StreamableMethod<DeletePool202Response | DeletePoolDefaultResponse>;
  /** Gets basic properties of a Pool. */
  head(
    options?: PoolExistsParameters,
  ): StreamableMethod<PoolExists200Response | PoolExists404Response | PoolExistsDefaultResponse>;
  /** Gets information about the specified Pool. */
  get(options?: GetPoolParameters): StreamableMethod<GetPool200Response | GetPoolDefaultResponse>;
  /**
   * This only replaces the Pool properties specified in the request. For example,
   * if the Pool has a StartTask associated with it, and a request does not specify
   * a StartTask element, then the Pool keeps the existing StartTask.
   */
  patch(
    options: UpdatePoolParameters,
  ): StreamableMethod<UpdatePool200Response | UpdatePoolDefaultResponse>;
}

export interface DisablePoolAutoScale {
  /** Disables automatic scaling for a Pool. */
  post(
    options?: DisablePoolAutoScaleParameters,
  ): StreamableMethod<DisablePoolAutoScale200Response | DisablePoolAutoScaleDefaultResponse>;
}

export interface EnablePoolAutoScale {
  /**
   * You cannot enable automatic scaling on a Pool if a resize operation is in
   * progress on the Pool. If automatic scaling of the Pool is currently disabled,
   * you must specify a valid autoscale formula as part of the request. If automatic
   * scaling of the Pool is already enabled, you may specify a new autoscale formula
   * and/or a new evaluation interval. You cannot call this API for the same Pool
   * more than once every 30 seconds.
   */
  post(
    options: EnablePoolAutoScaleParameters,
  ): StreamableMethod<EnablePoolAutoScale200Response | EnablePoolAutoScaleDefaultResponse>;
}

export interface EvaluatePoolAutoScale {
  /**
   * This API is primarily for validating an autoscale formula, as it simply returns
   * the result without applying the formula to the Pool. The Pool must have auto
   * scaling enabled in order to evaluate a formula.
   */
  post(
    options: EvaluatePoolAutoScaleParameters,
  ): StreamableMethod<EvaluatePoolAutoScale200Response | EvaluatePoolAutoScaleDefaultResponse>;
}

export interface ResizePool {
  /**
   * You can only resize a Pool when its allocation state is steady. If the Pool is
   * already resizing, the request fails with status code 409. When you resize a
   * Pool, the Pool's allocation state changes from steady to resizing. You cannot
   * resize Pools which are configured for automatic scaling. If you try to do this,
   * the Batch service returns an error 409. If you resize a Pool downwards, the
   * Batch service chooses which Compute Nodes to remove. To remove specific Compute
   * Nodes, use the Pool remove Compute Nodes API instead.
   */
  post(
    options: ResizePoolParameters,
  ): StreamableMethod<ResizePool202Response | ResizePoolDefaultResponse>;
}

export interface StopPoolResize {
  /**
   * This does not restore the Pool to its previous state before the resize
   * operation: it only stops any further changes being made, and the Pool maintains
   * its current state. After stopping, the Pool stabilizes at the number of Compute
   * Nodes it was at when the stop operation was done. During the stop operation,
   * the Pool allocation state changes first to stopping and then to steady. A
   * resize operation need not be an explicit resize Pool request; this API can also
   * be used to halt the initial sizing of the Pool when it is created.
   */
  post(
    options?: StopPoolResizeParameters,
  ): StreamableMethod<StopPoolResize202Response | StopPoolResizeDefaultResponse>;
}

export interface ReplacePoolProperties {
  /**
   * This fully replaces all the updatable properties of the Pool. For example, if
   * the Pool has a StartTask associated with it and if StartTask is not specified
   * with this request, then the Batch service will remove the existing StartTask.
   */
  post(
    options: ReplacePoolPropertiesParameters,
  ): StreamableMethod<ReplacePoolProperties204Response | ReplacePoolPropertiesDefaultResponse>;
}

export interface RemoveNodes {
  /**
   * This operation can only run when the allocation state of the Pool is steady.
   * When this operation runs, the allocation state changes from steady to resizing.
   * Each request may remove up to 100 nodes.
   */
  post(
    options: RemoveNodesParameters,
  ): StreamableMethod<RemoveNodes202Response | RemoveNodesDefaultResponse>;
}

export interface ListSupportedImages {
  /** Lists all Virtual Machine Images supported by the Azure Batch service. */
  get(
    options?: ListSupportedImagesParameters,
  ): StreamableMethod<ListSupportedImages200Response | ListSupportedImagesDefaultResponse>;
}

export interface ListPoolNodeCounts {
  /**
   * Gets the number of Compute Nodes in each state, grouped by Pool. Note that the
   * numbers returned may not always be up to date. If you need exact node counts,
   * use a list query.
   */
  get(
    options?: ListPoolNodeCountsParameters,
  ): StreamableMethod<ListPoolNodeCounts200Response | ListPoolNodeCountsDefaultResponse>;
}

export interface DeleteJob {
  /**
   * Deleting a Job also deletes all Tasks that are part of that Job, and all Job
   * statistics. This also overrides the retention period for Task data; that is, if
   * the Job contains Tasks which are still retained on Compute Nodes, the Batch
   * services deletes those Tasks' working directories and all their contents.  When
   * a Delete Job request is received, the Batch service sets the Job to the
   * deleting state. All update operations on a Job that is in deleting state will
   * fail with status code 409 (Conflict), with additional information indicating
   * that the Job is being deleted.
   */
  delete(
    options?: DeleteJobParameters,
  ): StreamableMethod<DeleteJob202Response | DeleteJobDefaultResponse>;
  /** Gets information about the specified Job. */
  get(options?: GetJobParameters): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
  /**
   * This replaces only the Job properties specified in the request. For example, if
   * the Job has constraints, and a request does not specify the constraints
   * element, then the Job keeps the existing constraints.
   */
  patch(
    options: UpdateJobParameters,
  ): StreamableMethod<UpdateJob200Response | UpdateJobDefaultResponse>;
  /**
   * This fully replaces all the updatable properties of the Job. For example, if
   * the Job has constraints associated with it and if constraints is not specified
   * with this request, then the Batch service will remove the existing constraints.
   */
  put(
    options: ReplaceJobParameters,
  ): StreamableMethod<ReplaceJob200Response | ReplaceJobDefaultResponse>;
}

export interface DisableJob {
  /**
   * The Batch Service immediately moves the Job to the disabling state. Batch then
   * uses the disableTasks parameter to determine what to do with the currently
   * running Tasks of the Job. The Job remains in the disabling state until the
   * disable operation is completed and all Tasks have been dealt with according to
   * the disableTasks option; the Job then moves to the disabled state. No new Tasks
   * are started under the Job until it moves back to active state. If you try to
   * disable a Job that is in any state other than active, disabling, or disabled,
   * the request fails with status code 409.
   */
  post(
    options: DisableJobParameters,
  ): StreamableMethod<DisableJob202Response | DisableJobDefaultResponse>;
}

export interface EnableJob {
  /**
   * When you call this API, the Batch service sets a disabled Job to the enabling
   * state. After the this operation is completed, the Job moves to the active
   * state, and scheduling of new Tasks under the Job resumes. The Batch service
   * does not allow a Task to remain in the active state for more than 180 days.
   * Therefore, if you enable a Job containing active Tasks which were added more
   * than 180 days ago, those Tasks will not run.
   */
  post(
    options?: EnableJobParameters,
  ): StreamableMethod<EnableJob202Response | EnableJobDefaultResponse>;
}

export interface TerminateJob {
  /**
   * When a Terminate Job request is received, the Batch service sets the Job to the
   * terminating state. The Batch service then terminates any running Tasks
   * associated with the Job and runs any required Job release Tasks. Then the Job
   * moves into the completed state. If there are any Tasks in the Job in the active
   * state, they will remain in the active state. Once a Job is terminated, new
   * Tasks cannot be added and any remaining active Tasks will not be scheduled.
   */
  post(
    options: TerminateJobParameters,
  ): StreamableMethod<TerminateJob202Response | TerminateJobDefaultResponse>;
}

export interface CreateJob {
  /**
   * The Batch service supports two ways to control the work done as part of a Job.
   * In the first approach, the user specifies a Job Manager Task. The Batch service
   * launches this Task when it is ready to start the Job. The Job Manager Task
   * controls all other Tasks that run under this Job, by using the Task APIs. In
   * the second approach, the user directly controls the execution of Tasks under an
   * active Job, by using the Task APIs. Also note: when naming Jobs, avoid
   * including sensitive information such as user names or secret project names.
   * This information may appear in telemetry logs accessible to Microsoft Support
   * engineers.
   */
  post(
    options: CreateJobParameters,
  ): StreamableMethod<CreateJob201Response | CreateJobDefaultResponse>;
  /** Lists all of the Jobs in the specified Account. */
  get(
    options?: ListJobsParameters,
  ): StreamableMethod<ListJobs200Response | ListJobsDefaultResponse>;
}

export interface ListJobsFromSchedule {
  /** Lists the Jobs that have been created under the specified Job Schedule. */
  get(
    options?: ListJobsFromScheduleParameters,
  ): StreamableMethod<ListJobsFromSchedule200Response | ListJobsFromScheduleDefaultResponse>;
}

export interface ListJobPreparationAndReleaseTaskStatus {
  /**
   * This API returns the Job Preparation and Job Release Task status on all Compute
   * Nodes that have run the Job Preparation or Job Release Task. This includes
   * Compute Nodes which have since been removed from the Pool. If this API is
   * invoked on a Job which has no Job Preparation or Job Release Task, the Batch
   * service returns HTTP status code 409 (Conflict) with an error code of
   * JobPreparationTaskNotSpecified.
   */
  get(
    options?: ListJobPreparationAndReleaseTaskStatusParameters,
  ): StreamableMethod<
    | ListJobPreparationAndReleaseTaskStatus200Response
    | ListJobPreparationAndReleaseTaskStatusDefaultResponse
  >;
}

export interface GetJobTaskCounts {
  /**
   * Task counts provide a count of the Tasks by active, running or completed Task
   * state, and a count of Tasks which succeeded or failed. Tasks in the preparing
   * state are counted as running. Note that the numbers returned may not always be
   * up to date. If you need exact task counts, use a list query.
   */
  get(
    options?: GetJobTaskCountsParameters,
  ): StreamableMethod<GetJobTaskCounts200Response | GetJobTaskCountsDefaultResponse>;
}

export interface JobScheduleExists {
  /** Checks the specified Job Schedule exists. */
  head(
    options?: JobScheduleExistsParameters,
  ): StreamableMethod<
    JobScheduleExists200Response | JobScheduleExists404Response | JobScheduleExistsDefaultResponse
  >;
  /**
   * When you delete a Job Schedule, this also deletes all Jobs and Tasks under that
   * schedule. When Tasks are deleted, all the files in their working directories on
   * the Compute Nodes are also deleted (the retention period is ignored). The Job
   * Schedule statistics are no longer accessible once the Job Schedule is deleted,
   * though they are still counted towards Account lifetime statistics.
   */
  delete(
    options?: DeleteJobScheduleParameters,
  ): StreamableMethod<DeleteJobSchedule202Response | DeleteJobScheduleDefaultResponse>;
  /** Gets information about the specified Job Schedule. */
  get(
    options?: GetJobScheduleParameters,
  ): StreamableMethod<GetJobSchedule200Response | GetJobScheduleDefaultResponse>;
  /**
   * This replaces only the Job Schedule properties specified in the request. For
   * example, if the schedule property is not specified with this request, then the
   * Batch service will keep the existing schedule. Changes to a Job Schedule only
   * impact Jobs created by the schedule after the update has taken place; currently
   * running Jobs are unaffected.
   */
  patch(
    options: UpdateJobScheduleParameters,
  ): StreamableMethod<UpdateJobSchedule200Response | UpdateJobScheduleDefaultResponse>;
  /**
   * This fully replaces all the updatable properties of the Job Schedule. For
   * example, if the schedule property is not specified with this request, then the
   * Batch service will remove the existing schedule. Changes to a Job Schedule only
   * impact Jobs created by the schedule after the update has taken place; currently
   * running Jobs are unaffected.
   */
  put(
    options: ReplaceJobScheduleParameters,
  ): StreamableMethod<ReplaceJobSchedule200Response | ReplaceJobScheduleDefaultResponse>;
}

export interface DisableJobSchedule {
  /** No new Jobs will be created until the Job Schedule is enabled again. */
  post(
    options?: DisableJobScheduleParameters,
  ): StreamableMethod<DisableJobSchedule204Response | DisableJobScheduleDefaultResponse>;
}

export interface EnableJobSchedule {
  /** Enables a Job Schedule. */
  post(
    options?: EnableJobScheduleParameters,
  ): StreamableMethod<EnableJobSchedule204Response | EnableJobScheduleDefaultResponse>;
}

export interface TerminateJobSchedule {
  /** Terminates a Job Schedule. */
  post(
    options?: TerminateJobScheduleParameters,
  ): StreamableMethod<TerminateJobSchedule202Response | TerminateJobScheduleDefaultResponse>;
}

export interface CreateJobSchedule {
  /** Creates a Job Schedule to the specified Account. */
  post(
    options: CreateJobScheduleParameters,
  ): StreamableMethod<CreateJobSchedule201Response | CreateJobScheduleDefaultResponse>;
  /** Lists all of the Job Schedules in the specified Account. */
  get(
    options?: ListJobSchedulesParameters,
  ): StreamableMethod<ListJobSchedules200Response | ListJobSchedulesDefaultResponse>;
}

export interface CreateTask {
  /**
   * The maximum lifetime of a Task from addition to completion is 180 days. If a
   * Task has not completed within 180 days of being added it will be terminated by
   * the Batch service and left in whatever state it was in at that time.
   */
  post(
    options: CreateTaskParameters,
  ): StreamableMethod<CreateTask201Response | CreateTaskDefaultResponse>;
  /**
   * For multi-instance Tasks, information such as affinityId, executionInfo and
   * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
   * information about subtasks.
   */
  get(
    options?: ListTasksParameters,
  ): StreamableMethod<ListTasks200Response | ListTasksDefaultResponse>;
}

export interface CreateTaskCollection {
  /**
   * Note that each Task must have a unique ID. The Batch service may not return the
   * results for each Task in the same order the Tasks were submitted in this
   * request. If the server times out or the connection is closed during the
   * request, the request may have been partially or fully processed, or not at all.
   * In such cases, the user should re-issue the request. Note that it is up to the
   * user to correctly handle failures when re-issuing a request. For example, you
   * should use the same Task IDs during a retry so that if the prior operation
   * succeeded, the retry will not create extra Tasks unexpectedly. If the response
   * contains any Tasks which failed to add, a client can retry the request. In a
   * retry, it is most efficient to resubmit only Tasks that failed to add, and to
   * omit Tasks that were successfully added on the first attempt. The maximum
   * lifetime of a Task from addition to completion is 180 days. If a Task has not
   * completed within 180 days of being added it will be terminated by the Batch
   * service and left in whatever state it was in at that time.
   */
  post(
    options: CreateTaskCollectionParameters,
  ): StreamableMethod<CreateTaskCollection200Response | CreateTaskCollectionDefaultResponse>;
}

export interface DeleteTask {
  /**
   * When a Task is deleted, all of the files in its directory on the Compute Node
   * where it ran are also deleted (regardless of the retention time). For
   * multi-instance Tasks, the delete Task operation applies synchronously to the
   * primary task; subtasks and their files are then deleted asynchronously in the
   * background.
   */
  delete(
    options?: DeleteTaskParameters,
  ): StreamableMethod<DeleteTask200Response | DeleteTaskDefaultResponse>;
  /**
   * For multi-instance Tasks, information such as affinityId, executionInfo and
   * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
   * information about subtasks.
   */
  get(options?: GetTaskParameters): StreamableMethod<GetTask200Response | GetTaskDefaultResponse>;
  /** Updates the properties of the specified Task. */
  put(
    options: ReplaceTaskParameters,
  ): StreamableMethod<ReplaceTask200Response | ReplaceTaskDefaultResponse>;
}

export interface ListSubTasks {
  /** If the Task is not a multi-instance Task then this returns an empty collection. */
  get(
    options?: ListSubTasksParameters,
  ): StreamableMethod<ListSubTasks200Response | ListSubTasksDefaultResponse>;
}

export interface TerminateTask {
  /**
   * When the Task has been terminated, it moves to the completed state. For
   * multi-instance Tasks, the terminate Task operation applies synchronously to the
   * primary task; subtasks are then terminated asynchronously in the background.
   */
  post(
    options?: TerminateTaskParameters,
  ): StreamableMethod<TerminateTask204Response | TerminateTaskDefaultResponse>;
}

export interface ReactivateTask {
  /**
   * Reactivation makes a Task eligible to be retried again up to its maximum retry
   * count. The Task's state is changed to active. As the Task is no longer in the
   * completed state, any previous exit code or failure information is no longer
   * available after reactivation. Each time a Task is reactivated, its retry count
   * is reset to 0. Reactivation will fail for Tasks that are not completed or that
   * previously completed successfully (with an exit code of 0). Additionally, it
   * will fail if the Job has completed (or is terminating or deleting).
   */
  post(
    options?: ReactivateTaskParameters,
  ): StreamableMethod<ReactivateTask204Response | ReactivateTaskDefaultResponse>;
}

export interface DeleteTaskFile {
  /** Deletes the specified Task file from the Compute Node where the Task ran. */
  delete(
    options?: DeleteTaskFileParameters,
  ): StreamableMethod<DeleteTaskFile200Response | DeleteTaskFileDefaultResponse>;
  /** Returns the content of the specified Task file. */
  get(
    options?: GetTaskFileParameters,
  ): StreamableMethod<GetTaskFile200Response | GetTaskFileDefaultResponse>;
  /** Gets the properties of the specified Task file. */
  head(
    options?: GetTaskFilePropertiesParameters,
  ): StreamableMethod<GetTaskFileProperties200Response | GetTaskFilePropertiesDefaultResponse>;
}

export interface ListTaskFiles {
  /** Lists the files in a Task's directory on its Compute Node. */
  get(
    options?: ListTaskFilesParameters,
  ): StreamableMethod<ListTaskFiles200Response | ListTaskFilesDefaultResponse>;
}

export interface CreateNodeUser {
  /**
   * You can add a user Account to a Compute Node only when it is in the idle or
   * running state.
   */
  post(
    options: CreateNodeUserParameters,
  ): StreamableMethod<CreateNodeUser201Response | CreateNodeUserDefaultResponse>;
}

export interface DeleteNodeUser {
  /**
   * You can delete a user Account to a Compute Node only when it is in the idle or
   * running state.
   */
  delete(
    options?: DeleteNodeUserParameters,
  ): StreamableMethod<DeleteNodeUser200Response | DeleteNodeUserDefaultResponse>;
  /**
   * This operation replaces of all the updatable properties of the Account. For
   * example, if the expiryTime element is not specified, the current value is
   * replaced with the default value, not left unmodified. You can update a user
   * Account on a Compute Node only when it is in the idle or running state.
   */
  put(
    options: ReplaceNodeUserParameters,
  ): StreamableMethod<ReplaceNodeUser200Response | ReplaceNodeUserDefaultResponse>;
}

export interface GetNode {
  /** Gets information about the specified Compute Node. */
  get(options?: GetNodeParameters): StreamableMethod<GetNode200Response | GetNodeDefaultResponse>;
}

export interface RebootNode {
  /** You can restart a Compute Node only if it is in an idle or running state. */
  post(
    options: RebootNodeParameters,
  ): StreamableMethod<RebootNode202Response | RebootNodeDefaultResponse>;
}

export interface StartNode {
  /** You can start a Compute Node only if it has been deallocated. */
  post(
    options?: StartNodeParameters,
  ): StreamableMethod<StartNode202Response | StartNodeDefaultResponse>;
}

export interface DeallocateNode {
  /** You can deallocate a Compute Node only if it is in an idle or running state. */
  post(
    options: DeallocateNodeParameters,
  ): StreamableMethod<DeallocateNode202Response | DeallocateNodeDefaultResponse>;
}

export interface ReimageNode {
  /**
   * You can reinstall the operating system on a Compute Node only if it is in an
   * idle or running state. This API can be invoked only on Pools created with the
   * cloud service configuration property.
   */
  post(
    options: ReimageNodeParameters,
  ): StreamableMethod<ReimageNode202Response | ReimageNodeDefaultResponse>;
}

export interface DisableNodeScheduling {
  /**
   * You can disable Task scheduling on a Compute Node only if its current
   * scheduling state is enabled.
   */
  post(
    options: DisableNodeSchedulingParameters,
  ): StreamableMethod<DisableNodeScheduling200Response | DisableNodeSchedulingDefaultResponse>;
}

export interface EnableNodeScheduling {
  /**
   * You can enable Task scheduling on a Compute Node only if its current scheduling
   * state is disabled
   */
  post(
    options?: EnableNodeSchedulingParameters,
  ): StreamableMethod<EnableNodeScheduling200Response | EnableNodeSchedulingDefaultResponse>;
}

export interface GetNodeRemoteLoginSettings {
  /**
   * Before you can remotely login to a Compute Node using the remote login settings,
   * you must create a user Account on the Compute Node.
   */
  get(
    options?: GetNodeRemoteLoginSettingsParameters,
  ): StreamableMethod<
    GetNodeRemoteLoginSettings200Response | GetNodeRemoteLoginSettingsDefaultResponse
  >;
}

export interface UploadNodeLogs {
  /**
   * This is for gathering Azure Batch service log files in an automated fashion
   * from Compute Nodes if you are experiencing an error and wish to escalate to
   * Azure support. The Azure Batch service log files should be shared with Azure
   * support to aid in debugging issues with the Batch service.
   */
  post(
    options: UploadNodeLogsParameters,
  ): StreamableMethod<UploadNodeLogs200Response | UploadNodeLogsDefaultResponse>;
}

export interface ListNodes {
  /** Lists the Compute Nodes in the specified Pool. */
  get(
    options?: ListNodesParameters,
  ): StreamableMethod<ListNodes200Response | ListNodesDefaultResponse>;
}

export interface GetNodeExtension {
  /** Gets information about the specified Compute Node Extension. */
  get(
    options?: GetNodeExtensionParameters,
  ): StreamableMethod<GetNodeExtension200Response | GetNodeExtensionDefaultResponse>;
}

export interface ListNodeExtensions {
  /** Lists the Compute Nodes Extensions in the specified Pool. */
  get(
    options?: ListNodeExtensionsParameters,
  ): StreamableMethod<ListNodeExtensions200Response | ListNodeExtensionsDefaultResponse>;
}

export interface DeleteNodeFile {
  /** Deletes the specified file from the Compute Node. */
  delete(
    options?: DeleteNodeFileParameters,
  ): StreamableMethod<DeleteNodeFile200Response | DeleteNodeFileDefaultResponse>;
  /** Returns the content of the specified Compute Node file. */
  get(
    options?: GetNodeFileParameters,
  ): StreamableMethod<GetNodeFile200Response | GetNodeFileDefaultResponse>;
  /** Gets the properties of the specified Compute Node file. */
  head(
    options?: GetNodeFilePropertiesParameters,
  ): StreamableMethod<GetNodeFileProperties200Response | GetNodeFilePropertiesDefaultResponse>;
}

export interface ListNodeFiles {
  /** Lists all of the files in Task directories on the specified Compute Node. */
  get(
    options?: ListNodeFilesParameters,
  ): StreamableMethod<ListNodeFiles200Response | ListNodeFilesDefaultResponse>;
}

export interface Routes {
  /** Resource for '/applications' has methods for the following verbs: get */
  (path: "/applications"): ListApplications;
  /** Resource for '/applications/\{applicationId\}' has methods for the following verbs: get */
  (path: "/applications/{applicationId}", applicationId: string): GetApplication;
  /** Resource for '/poolusagemetrics' has methods for the following verbs: get */
  (path: "/poolusagemetrics"): ListPoolUsageMetrics;
  /** Resource for '/pools' has methods for the following verbs: post, get */
  (path: "/pools"): CreatePool;
  /** Resource for '/pools/\{poolId\}' has methods for the following verbs: delete, head, get, patch */
  (path: "/pools/{poolId}", poolId: string): DeletePool;
  /** Resource for '/pools/\{poolId\}/disableautoscale' has methods for the following verbs: post */
  (path: "/pools/{poolId}/disableautoscale", poolId: string): DisablePoolAutoScale;
  /** Resource for '/pools/\{poolId\}/enableautoscale' has methods for the following verbs: post */
  (path: "/pools/{poolId}/enableautoscale", poolId: string): EnablePoolAutoScale;
  /** Resource for '/pools/\{poolId\}/evaluateautoscale' has methods for the following verbs: post */
  (path: "/pools/{poolId}/evaluateautoscale", poolId: string): EvaluatePoolAutoScale;
  /** Resource for '/pools/\{poolId\}/resize' has methods for the following verbs: post */
  (path: "/pools/{poolId}/resize", poolId: string): ResizePool;
  /** Resource for '/pools/\{poolId\}/stopresize' has methods for the following verbs: post */
  (path: "/pools/{poolId}/stopresize", poolId: string): StopPoolResize;
  /** Resource for '/pools/\{poolId\}/updateproperties' has methods for the following verbs: post */
  (path: "/pools/{poolId}/updateproperties", poolId: string): ReplacePoolProperties;
  /** Resource for '/pools/\{poolId\}/removenodes' has methods for the following verbs: post */
  (path: "/pools/{poolId}/removenodes", poolId: string): RemoveNodes;
  /** Resource for '/supportedimages' has methods for the following verbs: get */
  (path: "/supportedimages"): ListSupportedImages;
  /** Resource for '/nodecounts' has methods for the following verbs: get */
  (path: "/nodecounts"): ListPoolNodeCounts;
  /** Resource for '/jobs/\{jobId\}' has methods for the following verbs: delete, get, patch, put */
  (path: "/jobs/{jobId}", jobId: string): DeleteJob;
  /** Resource for '/jobs/\{jobId\}/disable' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/disable", jobId: string): DisableJob;
  /** Resource for '/jobs/\{jobId\}/enable' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/enable", jobId: string): EnableJob;
  /** Resource for '/jobs/\{jobId\}/terminate' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/terminate", jobId: string): TerminateJob;
  /** Resource for '/jobs' has methods for the following verbs: post, get */
  (path: "/jobs"): CreateJob;
  /** Resource for '/jobschedules/\{jobScheduleId\}/jobs' has methods for the following verbs: get */
  (path: "/jobschedules/{jobScheduleId}/jobs", jobScheduleId: string): ListJobsFromSchedule;
  /** Resource for '/jobs/\{jobId\}/jobpreparationandreleasetaskstatus' has methods for the following verbs: get */
  (
    path: "/jobs/{jobId}/jobpreparationandreleasetaskstatus",
    jobId: string,
  ): ListJobPreparationAndReleaseTaskStatus;
  /** Resource for '/jobs/\{jobId\}/taskcounts' has methods for the following verbs: get */
  (path: "/jobs/{jobId}/taskcounts", jobId: string): GetJobTaskCounts;
  /** Resource for '/jobschedules/\{jobScheduleId\}' has methods for the following verbs: head, delete, get, patch, put */
  (path: "/jobschedules/{jobScheduleId}", jobScheduleId: string): JobScheduleExists;
  /** Resource for '/jobschedules/\{jobScheduleId\}/disable' has methods for the following verbs: post */
  (path: "/jobschedules/{jobScheduleId}/disable", jobScheduleId: string): DisableJobSchedule;
  /** Resource for '/jobschedules/\{jobScheduleId\}/enable' has methods for the following verbs: post */
  (path: "/jobschedules/{jobScheduleId}/enable", jobScheduleId: string): EnableJobSchedule;
  /** Resource for '/jobschedules/\{jobScheduleId\}/terminate' has methods for the following verbs: post */
  (path: "/jobschedules/{jobScheduleId}/terminate", jobScheduleId: string): TerminateJobSchedule;
  /** Resource for '/jobschedules' has methods for the following verbs: post, get */
  (path: "/jobschedules"): CreateJobSchedule;
  /** Resource for '/jobs/\{jobId\}/tasks' has methods for the following verbs: post, get */
  (path: "/jobs/{jobId}/tasks", jobId: string): CreateTask;
  /** Resource for '/jobs/\{jobId\}/addtaskcollection' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/addtaskcollection", jobId: string): CreateTaskCollection;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}' has methods for the following verbs: delete, get, put */
  (path: "/jobs/{jobId}/tasks/{taskId}", jobId: string, taskId: string): DeleteTask;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/subtasksinfo' has methods for the following verbs: get */
  (path: "/jobs/{jobId}/tasks/{taskId}/subtasksinfo", jobId: string, taskId: string): ListSubTasks;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/terminate' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/tasks/{taskId}/terminate", jobId: string, taskId: string): TerminateTask;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/reactivate' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/tasks/{taskId}/reactivate", jobId: string, taskId: string): ReactivateTask;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/files/\{filePath\}' has methods for the following verbs: delete, get, head */
  (
    path: "/jobs/{jobId}/tasks/{taskId}/files/{filePath}",
    jobId: string,
    taskId: string,
    filePath: string,
  ): DeleteTaskFile;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/files' has methods for the following verbs: get */
  (path: "/jobs/{jobId}/tasks/{taskId}/files", jobId: string, taskId: string): ListTaskFiles;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/users' has methods for the following verbs: post */
  (path: "/pools/{poolId}/nodes/{nodeId}/users", poolId: string, nodeId: string): CreateNodeUser;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/users/\{userName\}' has methods for the following verbs: delete, put */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/users/{userName}",
    poolId: string,
    nodeId: string,
    userName: string,
  ): DeleteNodeUser;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}' has methods for the following verbs: get */
  (path: "/pools/{poolId}/nodes/{nodeId}", poolId: string, nodeId: string): GetNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/reboot' has methods for the following verbs: post */
  (path: "/pools/{poolId}/nodes/{nodeId}/reboot", poolId: string, nodeId: string): RebootNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/start' has methods for the following verbs: post */
  (path: "/pools/{poolId}/nodes/{nodeId}/start", poolId: string, nodeId: string): StartNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/deallocate' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/deallocate",
    poolId: string,
    nodeId: string,
  ): DeallocateNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/reimage' has methods for the following verbs: post */
  (path: "/pools/{poolId}/nodes/{nodeId}/reimage", poolId: string, nodeId: string): ReimageNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/disablescheduling' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/disablescheduling",
    poolId: string,
    nodeId: string,
  ): DisableNodeScheduling;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/enablescheduling' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/enablescheduling",
    poolId: string,
    nodeId: string,
  ): EnableNodeScheduling;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/remoteloginsettings' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/remoteloginsettings",
    poolId: string,
    nodeId: string,
  ): GetNodeRemoteLoginSettings;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/uploadbatchservicelogs' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/uploadbatchservicelogs",
    poolId: string,
    nodeId: string,
  ): UploadNodeLogs;
  /** Resource for '/pools/\{poolId\}/nodes' has methods for the following verbs: get */
  (path: "/pools/{poolId}/nodes", poolId: string): ListNodes;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/extensions/\{extensionName\}' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/extensions/{extensionName}",
    poolId: string,
    nodeId: string,
    extensionName: string,
  ): GetNodeExtension;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/extensions' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/extensions",
    poolId: string,
    nodeId: string,
  ): ListNodeExtensions;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/files/\{filePath\}' has methods for the following verbs: delete, get, head */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/files/{filePath}",
    poolId: string,
    nodeId: string,
    filePath: string,
  ): DeleteNodeFile;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/files' has methods for the following verbs: get */
  (path: "/pools/{poolId}/nodes/{nodeId}/files", poolId: string, nodeId: string): ListNodeFiles;
}

export type BatchClient = Client & {
  path: Routes;
};
