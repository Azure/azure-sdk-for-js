// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ApplicationsListApplicationsParameters,
  ApplicationsGetApplicationParameters,
  PoolListUsageMetricsParameters,
  PoolGetAllPoolLifetimeStatisticsParameters,
  PoolAddPoolParameters,
  PoolListPoolsParameters,
  PoolDeletePoolParameters,
  PoolPoolExistsParameters,
  PoolGetPoolParameters,
  PoolUpdatePoolParameters,
  PoolDisableAutoScaleParameters,
  PoolEnableAutoScaleParameters,
  PoolEvaluateAutoScaleParameters,
  PoolResizePoolParameters,
  PoolStopResizePoolParameters,
  PoolUpdatePoolPropertiesParameters,
  PoolRemovePoolNodesParameters,
  AccountListSupportedImagesParameters,
  AccountListPoolNodeCountsParameters,
  JobGetAllLifetimeStatisticsParameters,
  JobDeleteJobParameters,
  JobGetJobParameters,
  JobUpdateJobParameters,
  JobReplaceJobParameters,
  JobDisableJobParameters,
  JobEnableJobParameters,
  JobTerminateJobParameters,
  JobAddJobParameters,
  JobListJobsParameters,
  JobListFromJobScheduleParameters,
  JobListPreparationAndReleaseTaskStatusParameters,
  JobGetTaskCountsParameters,
  CertificatesAddCertificateParameters,
  CertificatesListCertificatesParameters,
  CertificatesCancelCertificateDeletionParameters,
  CertificatesDeleteCertificateParameters,
  CertificatesGetCertificateParameters,
  FileDeleteFileFromTaskParameters,
  FileGetFileFromTaskParameters,
  FileGetFilePropertiesFromTaskParameters,
  FileDeleteFromComputeNodeParameters,
  FileGetFileFromComputeNodeParameters,
  FileGetFilePropertiesFromComputeNodeParameters,
  FileListFilesFromTaskParameters,
  FileListFilesFromComputeNodeParameters,
  JobScheduleJobScheduleExistsParameters,
  JobScheduleDeleteJobScheduleParameters,
  JobScheduleGetJobScheduleParameters,
  JobScheduleUpdateJobScheduleParameters,
  JobScheduleReplaceJobScheduleParameters,
  JobScheduleDisableJobScheduleParameters,
  JobScheduleEnableJobScheduleParameters,
  JobScheduleTerminateJobScheduleParameters,
  JobScheduleAddJobScheduleParameters,
  JobScheduleListJobSchedulesParameters,
  TaskAddTaskParameters,
  TaskListTasksParameters,
  TaskAddCollectionParameters,
  TaskDeleteTaskParameters,
  TaskGetTaskParameters,
  TaskUpdateTaskParameters,
  TaskListSubtasksParameters,
  TaskTerminateTaskParameters,
  TaskReactivateTaskParameters,
  ComputeNodesAddUserParameters,
  ComputeNodesDeleteUserParameters,
  ComputeNodesUpdateUserParameters,
  ComputeNodesGetNodeParameters,
  ComputeNodesRebootNodeParameters,
  ComputeNodesReimageNodeParameters,
  ComputeNodesDisableSchedulingParameters,
  ComputeNodesEnableSchedulingParameters,
  ComputeNodesGetRemoteLoginSettingsParameters,
  ComputeNodesGetRemoteDesktopParameters,
  ComputeNodesUploadBatchServiceLogsParameters,
  ComputeNodesListNodesParameters,
  ComputeNodeExtensionsGetExtensionParameters,
  ComputeNodeExtensionsListExtensionsParameters,
} from "./parameters.js";
import {
  ApplicationsListApplications200Response,
  ApplicationsListApplicationsDefaultResponse,
  ApplicationsGetApplication200Response,
  ApplicationsGetApplicationDefaultResponse,
  PoolListUsageMetrics200Response,
  PoolListUsageMetricsDefaultResponse,
  PoolGetAllPoolLifetimeStatistics200Response,
  PoolGetAllPoolLifetimeStatisticsDefaultResponse,
  PoolAddPool201Response,
  PoolAddPoolDefaultResponse,
  PoolListPools200Response,
  PoolListPoolsDefaultResponse,
  PoolDeletePool202Response,
  PoolDeletePoolDefaultResponse,
  PoolPoolExists200Response,
  PoolPoolExists404Response,
  PoolPoolExistsDefaultResponse,
  PoolGetPool200Response,
  PoolGetPoolDefaultResponse,
  PoolUpdatePool200Response,
  PoolUpdatePoolDefaultResponse,
  PoolDisableAutoScale200Response,
  PoolDisableAutoScaleDefaultResponse,
  PoolEnableAutoScale200Response,
  PoolEnableAutoScaleDefaultResponse,
  PoolEvaluateAutoScale200Response,
  PoolEvaluateAutoScaleDefaultResponse,
  PoolResizePool202Response,
  PoolResizePoolDefaultResponse,
  PoolStopResizePool202Response,
  PoolStopResizePoolDefaultResponse,
  PoolUpdatePoolProperties204Response,
  PoolUpdatePoolPropertiesDefaultResponse,
  PoolRemovePoolNodes202Response,
  PoolRemovePoolNodesDefaultResponse,
  AccountListSupportedImages200Response,
  AccountListSupportedImagesDefaultResponse,
  AccountListPoolNodeCounts200Response,
  AccountListPoolNodeCountsDefaultResponse,
  JobGetAllLifetimeStatistics200Response,
  JobGetAllLifetimeStatisticsDefaultResponse,
  JobDeleteJob202Response,
  JobDeleteJobDefaultResponse,
  JobGetJob200Response,
  JobGetJobDefaultResponse,
  JobUpdateJob200Response,
  JobUpdateJobDefaultResponse,
  JobReplaceJob200Response,
  JobReplaceJobDefaultResponse,
  JobDisableJob202Response,
  JobDisableJobDefaultResponse,
  JobEnableJob202Response,
  JobEnableJobDefaultResponse,
  JobTerminateJob202Response,
  JobTerminateJobDefaultResponse,
  JobAddJob201Response,
  JobAddJobDefaultResponse,
  JobListJobs200Response,
  JobListJobsDefaultResponse,
  JobListFromJobSchedule200Response,
  JobListFromJobScheduleDefaultResponse,
  JobListPreparationAndReleaseTaskStatus200Response,
  JobListPreparationAndReleaseTaskStatusDefaultResponse,
  JobGetTaskCounts200Response,
  JobGetTaskCountsDefaultResponse,
  CertificatesAddCertificate201Response,
  CertificatesAddCertificateDefaultResponse,
  CertificatesListCertificates200Response,
  CertificatesListCertificatesDefaultResponse,
  CertificatesCancelCertificateDeletion204Response,
  CertificatesCancelCertificateDeletionDefaultResponse,
  CertificatesDeleteCertificate202Response,
  CertificatesDeleteCertificateDefaultResponse,
  CertificatesGetCertificate200Response,
  CertificatesGetCertificateDefaultResponse,
  FileDeleteFileFromTask200Response,
  FileDeleteFileFromTaskDefaultResponse,
  FileGetFileFromTask200Response,
  FileGetFileFromTaskDefaultResponse,
  FileGetFilePropertiesFromTask200Response,
  FileGetFilePropertiesFromTaskDefaultResponse,
  FileDeleteFromComputeNode200Response,
  FileDeleteFromComputeNodeDefaultResponse,
  FileGetFileFromComputeNode200Response,
  FileGetFileFromComputeNodeDefaultResponse,
  FileGetFilePropertiesFromComputeNode200Response,
  FileGetFilePropertiesFromComputeNodeDefaultResponse,
  FileListFilesFromTask200Response,
  FileListFilesFromTaskDefaultResponse,
  FileListFilesFromComputeNode200Response,
  FileListFilesFromComputeNodeDefaultResponse,
  JobScheduleJobScheduleExists200Response,
  JobScheduleJobScheduleExists404Response,
  JobScheduleJobScheduleExistsDefaultResponse,
  JobScheduleDeleteJobSchedule202Response,
  JobScheduleDeleteJobScheduleDefaultResponse,
  JobScheduleGetJobSchedule200Response,
  JobScheduleGetJobScheduleDefaultResponse,
  JobScheduleUpdateJobSchedule200Response,
  JobScheduleUpdateJobScheduleDefaultResponse,
  JobScheduleReplaceJobSchedule200Response,
  JobScheduleReplaceJobScheduleDefaultResponse,
  JobScheduleDisableJobSchedule204Response,
  JobScheduleDisableJobScheduleDefaultResponse,
  JobScheduleEnableJobSchedule204Response,
  JobScheduleEnableJobScheduleDefaultResponse,
  JobScheduleTerminateJobSchedule202Response,
  JobScheduleTerminateJobScheduleDefaultResponse,
  JobScheduleAddJobSchedule201Response,
  JobScheduleAddJobScheduleDefaultResponse,
  JobScheduleListJobSchedules200Response,
  JobScheduleListJobSchedulesDefaultResponse,
  TaskAddTask201Response,
  TaskAddTaskDefaultResponse,
  TaskListTasks200Response,
  TaskListTasksDefaultResponse,
  TaskAddCollection200Response,
  TaskAddCollectionDefaultResponse,
  TaskDeleteTask200Response,
  TaskDeleteTaskDefaultResponse,
  TaskGetTask200Response,
  TaskGetTaskDefaultResponse,
  TaskUpdateTask200Response,
  TaskUpdateTaskDefaultResponse,
  TaskListSubtasks200Response,
  TaskListSubtasksDefaultResponse,
  TaskTerminateTask204Response,
  TaskTerminateTaskDefaultResponse,
  TaskReactivateTask204Response,
  TaskReactivateTaskDefaultResponse,
  ComputeNodesAddUser201Response,
  ComputeNodesAddUserDefaultResponse,
  ComputeNodesDeleteUser200Response,
  ComputeNodesDeleteUserDefaultResponse,
  ComputeNodesUpdateUser200Response,
  ComputeNodesUpdateUserDefaultResponse,
  ComputeNodesGetNode200Response,
  ComputeNodesGetNodeDefaultResponse,
  ComputeNodesRebootNode202Response,
  ComputeNodesRebootNodeDefaultResponse,
  ComputeNodesReimageNode202Response,
  ComputeNodesReimageNodeDefaultResponse,
  ComputeNodesDisableScheduling200Response,
  ComputeNodesDisableSchedulingDefaultResponse,
  ComputeNodesEnableScheduling200Response,
  ComputeNodesEnableSchedulingDefaultResponse,
  ComputeNodesGetRemoteLoginSettings200Response,
  ComputeNodesGetRemoteLoginSettingsDefaultResponse,
  ComputeNodesGetRemoteDesktop200Response,
  ComputeNodesGetRemoteDesktopDefaultResponse,
  ComputeNodesUploadBatchServiceLogs200Response,
  ComputeNodesUploadBatchServiceLogsDefaultResponse,
  ComputeNodesListNodes200Response,
  ComputeNodesListNodesDefaultResponse,
  ComputeNodeExtensionsGetExtension200Response,
  ComputeNodeExtensionsGetExtensionDefaultResponse,
  ComputeNodeExtensionsListExtensions200Response,
  ComputeNodeExtensionsListExtensionsDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ApplicationsListApplications {
  /**
   * This operation returns only Applications and versions that are available for
   * use on Compute Nodes; that is, that can be used in an Package reference. For
   * administrator information about applications and versions that are not yet
   * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
   * API.
   */
  get(
    options?: ApplicationsListApplicationsParameters
  ): StreamableMethod<
    | ApplicationsListApplications200Response
    | ApplicationsListApplicationsDefaultResponse
  >;
}

export interface ApplicationsGetApplication {
  /**
   * This operation returns only Applications and versions that are available for
   * use on Compute Nodes; that is, that can be used in an Package reference. For
   * administrator information about Applications and versions that are not yet
   * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
   * API.
   */
  get(
    options?: ApplicationsGetApplicationParameters
  ): StreamableMethod<
    | ApplicationsGetApplication200Response
    | ApplicationsGetApplicationDefaultResponse
  >;
}

export interface PoolListUsageMetrics {
  /**
   * If you do not specify a $filter clause including a poolId, the response
   * includes all Pools that existed in the Account in the time range of the
   * returned aggregation intervals. If you do not specify a $filter clause
   * including a startTime or endTime these filters default to the start and end
   * times of the last aggregation interval currently available; that is, only the
   * last aggregation interval is returned.
   */
  get(
    options?: PoolListUsageMetricsParameters
  ): StreamableMethod<
    PoolListUsageMetrics200Response | PoolListUsageMetricsDefaultResponse
  >;
}

export interface PoolGetAllPoolLifetimeStatistics {
  /**
   * Statistics are aggregated across all Pools that have ever existed in the
   * Account, from Account creation to the last update time of the statistics. The
   * statistics may not be immediately available. The Batch service performs
   * periodic roll-up of statistics. The typical delay is about 30 minutes.
   */
  get(
    options?: PoolGetAllPoolLifetimeStatisticsParameters
  ): StreamableMethod<
    | PoolGetAllPoolLifetimeStatistics200Response
    | PoolGetAllPoolLifetimeStatisticsDefaultResponse
  >;
}

export interface PoolAddPool {
  /**
   * When naming Pools, avoid including sensitive information such as user names or
   * secret project names. This information may appear in telemetry logs accessible
   * to Microsoft Support engineers.
   */
  post(
    options: PoolAddPoolParameters
  ): StreamableMethod<PoolAddPool201Response | PoolAddPoolDefaultResponse>;
  /** Lists all of the Pools in the specified Account. */
  get(
    options?: PoolListPoolsParameters
  ): StreamableMethod<PoolListPools200Response | PoolListPoolsDefaultResponse>;
}

export interface PoolDeletePool {
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
    options?: PoolDeletePoolParameters
  ): StreamableMethod<
    PoolDeletePool202Response | PoolDeletePoolDefaultResponse
  >;
  /** Gets basic properties of a Pool. */
  head(
    options?: PoolPoolExistsParameters
  ): StreamableMethod<
    | PoolPoolExists200Response
    | PoolPoolExists404Response
    | PoolPoolExistsDefaultResponse
  >;
  /** Gets information about the specified Pool. */
  get(
    options?: PoolGetPoolParameters
  ): StreamableMethod<PoolGetPool200Response | PoolGetPoolDefaultResponse>;
  /**
   * This only replaces the Pool properties specified in the request. For example,
   * if the Pool has a StartTask associated with it, and a request does not specify
   * a StartTask element, then the Pool keeps the existing StartTask.
   */
  patch(
    options: PoolUpdatePoolParameters
  ): StreamableMethod<
    PoolUpdatePool200Response | PoolUpdatePoolDefaultResponse
  >;
}

export interface PoolDisableAutoScale {
  /** Disables automatic scaling for a Pool. */
  post(
    options?: PoolDisableAutoScaleParameters
  ): StreamableMethod<
    PoolDisableAutoScale200Response | PoolDisableAutoScaleDefaultResponse
  >;
}

export interface PoolEnableAutoScale {
  /**
   * You cannot enable automatic scaling on a Pool if a resize operation is in
   * progress on the Pool. If automatic scaling of the Pool is currently disabled,
   * you must specify a valid autoscale formula as part of the request. If automatic
   * scaling of the Pool is already enabled, you may specify a new autoscale formula
   * and/or a new evaluation interval. You cannot call this API for the same Pool
   * more than once every 30 seconds.
   */
  post(
    options: PoolEnableAutoScaleParameters
  ): StreamableMethod<
    PoolEnableAutoScale200Response | PoolEnableAutoScaleDefaultResponse
  >;
}

export interface PoolEvaluateAutoScale {
  /**
   * This API is primarily for validating an autoscale formula, as it simply returns
   * the result without applying the formula to the Pool. The Pool must have auto
   * scaling enabled in order to evaluate a formula.
   */
  post(
    options: PoolEvaluateAutoScaleParameters
  ): StreamableMethod<
    PoolEvaluateAutoScale200Response | PoolEvaluateAutoScaleDefaultResponse
  >;
}

export interface PoolResizePool {
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
    options: PoolResizePoolParameters
  ): StreamableMethod<
    PoolResizePool202Response | PoolResizePoolDefaultResponse
  >;
}

export interface PoolStopResizePool {
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
    options?: PoolStopResizePoolParameters
  ): StreamableMethod<
    PoolStopResizePool202Response | PoolStopResizePoolDefaultResponse
  >;
}

export interface PoolUpdatePoolProperties {
  /**
   * This fully replaces all the updatable properties of the Pool. For example, if
   * the Pool has a StartTask associated with it and if StartTask is not specified
   * with this request, then the Batch service will remove the existing StartTask.
   */
  post(
    options: PoolUpdatePoolPropertiesParameters
  ): StreamableMethod<
    | PoolUpdatePoolProperties204Response
    | PoolUpdatePoolPropertiesDefaultResponse
  >;
}

export interface PoolRemovePoolNodes {
  /**
   * This operation can only run when the allocation state of the Pool is steady.
   * When this operation runs, the allocation state changes from steady to resizing.
   * Each request may remove up to 100 nodes.
   */
  post(
    options: PoolRemovePoolNodesParameters
  ): StreamableMethod<
    PoolRemovePoolNodes202Response | PoolRemovePoolNodesDefaultResponse
  >;
}

export interface AccountListSupportedImages {
  /** Lists all Virtual Machine Images supported by the Azure Batch service. */
  get(
    options?: AccountListSupportedImagesParameters
  ): StreamableMethod<
    | AccountListSupportedImages200Response
    | AccountListSupportedImagesDefaultResponse
  >;
}

export interface AccountListPoolNodeCounts {
  /**
   * Gets the number of Compute Nodes in each state, grouped by Pool. Note that the
   * numbers returned may not always be up to date. If you need exact node counts,
   * use a list query.
   */
  get(
    options?: AccountListPoolNodeCountsParameters
  ): StreamableMethod<
    | AccountListPoolNodeCounts200Response
    | AccountListPoolNodeCountsDefaultResponse
  >;
}

export interface JobGetAllLifetimeStatistics {
  /**
   * Statistics are aggregated across all Jobs that have ever existed in the
   * Account, from Account creation to the last update time of the statistics. The
   * statistics may not be immediately available. The Batch service performs
   * periodic roll-up of statistics. The typical delay is about 30 minutes.
   */
  get(
    options?: JobGetAllLifetimeStatisticsParameters
  ): StreamableMethod<
    | JobGetAllLifetimeStatistics200Response
    | JobGetAllLifetimeStatisticsDefaultResponse
  >;
}

export interface JobDeleteJob {
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
    options?: JobDeleteJobParameters
  ): StreamableMethod<JobDeleteJob202Response | JobDeleteJobDefaultResponse>;
  /** Gets information about the specified Job. */
  get(
    options?: JobGetJobParameters
  ): StreamableMethod<JobGetJob200Response | JobGetJobDefaultResponse>;
  /**
   * This replaces only the Job properties specified in the request. For example, if
   * the Job has constraints, and a request does not specify the constraints
   * element, then the Job keeps the existing constraints.
   */
  patch(
    options: JobUpdateJobParameters
  ): StreamableMethod<JobUpdateJob200Response | JobUpdateJobDefaultResponse>;
  /**
   * This fully replaces all the updatable properties of the Job. For example, if
   * the Job has constraints associated with it and if constraints is not specified
   * with this request, then the Batch service will remove the existing constraints.
   */
  put(
    options: JobReplaceJobParameters
  ): StreamableMethod<JobReplaceJob200Response | JobReplaceJobDefaultResponse>;
}

export interface JobDisableJob {
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
    options: JobDisableJobParameters
  ): StreamableMethod<JobDisableJob202Response | JobDisableJobDefaultResponse>;
}

export interface JobEnableJob {
  /**
   * When you call this API, the Batch service sets a disabled Job to the enabling
   * state. After the this operation is completed, the Job moves to the active
   * state, and scheduling of new Tasks under the Job resumes. The Batch service
   * does not allow a Task to remain in the active state for more than 180 days.
   * Therefore, if you enable a Job containing active Tasks which were added more
   * than 180 days ago, those Tasks will not run.
   */
  post(
    options?: JobEnableJobParameters
  ): StreamableMethod<JobEnableJob202Response | JobEnableJobDefaultResponse>;
}

export interface JobTerminateJob {
  /**
   * When a Terminate Job request is received, the Batch service sets the Job to the
   * terminating state. The Batch service then terminates any running Tasks
   * associated with the Job and runs any required Job release Tasks. Then the Job
   * moves into the completed state. If there are any Tasks in the Job in the active
   * state, they will remain in the active state. Once a Job is terminated, new
   * Tasks cannot be added and any remaining active Tasks will not be scheduled.
   */
  post(
    options?: JobTerminateJobParameters
  ): StreamableMethod<
    JobTerminateJob202Response | JobTerminateJobDefaultResponse
  >;
}

export interface JobAddJob {
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
    options: JobAddJobParameters
  ): StreamableMethod<JobAddJob201Response | JobAddJobDefaultResponse>;
  /** Lists all of the Jobs in the specified Account. */
  get(
    options?: JobListJobsParameters
  ): StreamableMethod<JobListJobs200Response | JobListJobsDefaultResponse>;
}

export interface JobListFromJobSchedule {
  /** Lists the Jobs that have been created under the specified Job Schedule. */
  get(
    options?: JobListFromJobScheduleParameters
  ): StreamableMethod<
    JobListFromJobSchedule200Response | JobListFromJobScheduleDefaultResponse
  >;
}

export interface JobListPreparationAndReleaseTaskStatus {
  /**
   * This API returns the Job Preparation and Job Release Task status on all Compute
   * Nodes that have run the Job Preparation or Job Release Task. This includes
   * Compute Nodes which have since been removed from the Pool. If this API is
   * invoked on a Job which has no Job Preparation or Job Release Task, the Batch
   * service returns HTTP status code 409 (Conflict) with an error code of
   * JobPreparationTaskNotSpecified.
   */
  get(
    options?: JobListPreparationAndReleaseTaskStatusParameters
  ): StreamableMethod<
    | JobListPreparationAndReleaseTaskStatus200Response
    | JobListPreparationAndReleaseTaskStatusDefaultResponse
  >;
}

export interface JobGetTaskCounts {
  /**
   * Task counts provide a count of the Tasks by active, running or completed Task
   * state, and a count of Tasks which succeeded or failed. Tasks in the preparing
   * state are counted as running. Note that the numbers returned may not always be
   * up to date. If you need exact task counts, use a list query.
   */
  get(
    options?: JobGetTaskCountsParameters
  ): StreamableMethod<
    JobGetTaskCounts200Response | JobGetTaskCountsDefaultResponse
  >;
}

export interface CertificatesAddCertificate {
  /** Adds a Certificate to the specified Account. */
  post(
    options: CertificatesAddCertificateParameters
  ): StreamableMethod<
    | CertificatesAddCertificate201Response
    | CertificatesAddCertificateDefaultResponse
  >;
  /** Lists all of the Certificates that have been added to the specified Account. */
  get(
    options?: CertificatesListCertificatesParameters
  ): StreamableMethod<
    | CertificatesListCertificates200Response
    | CertificatesListCertificatesDefaultResponse
  >;
}

export interface CertificatesCancelCertificateDeletion {
  /**
   * If you try to delete a Certificate that is being used by a Pool or Compute
   * Node, the status of the Certificate changes to deleteFailed. If you decide that
   * you want to continue using the Certificate, you can use this operation to set
   * the status of the Certificate back to active. If you intend to delete the
   * Certificate, you do not need to run this operation after the deletion failed.
   * You must make sure that the Certificate is not being used by any resources, and
   * then you can try again to delete the Certificate.
   */
  post(
    options?: CertificatesCancelCertificateDeletionParameters
  ): StreamableMethod<
    | CertificatesCancelCertificateDeletion204Response
    | CertificatesCancelCertificateDeletionDefaultResponse
  >;
}

export interface CertificatesDeleteCertificate {
  /**
   * You cannot delete a Certificate if a resource (Pool or Compute Node) is using
   * it. Before you can delete a Certificate, you must therefore make sure that the
   * Certificate is not associated with any existing Pools, the Certificate is not
   * installed on any Nodes (even if you remove a Certificate from a Pool, it is not
   * removed from existing Compute Nodes in that Pool until they restart), and no
   * running Tasks depend on the Certificate. If you try to delete a Certificate
   * that is in use, the deletion fails. The Certificate status changes to
   * deleteFailed. You can use Cancel Delete Certificate to set the status back to
   * active if you decide that you want to continue using the Certificate.
   */
  delete(
    options?: CertificatesDeleteCertificateParameters
  ): StreamableMethod<
    | CertificatesDeleteCertificate202Response
    | CertificatesDeleteCertificateDefaultResponse
  >;
  /** Gets information about the specified Certificate. */
  get(
    options?: CertificatesGetCertificateParameters
  ): StreamableMethod<
    | CertificatesGetCertificate200Response
    | CertificatesGetCertificateDefaultResponse
  >;
}

export interface FileDeleteFileFromTask {
  /** Deletes the specified Task file from the Compute Node where the Task ran. */
  delete(
    options?: FileDeleteFileFromTaskParameters
  ): StreamableMethod<
    FileDeleteFileFromTask200Response | FileDeleteFileFromTaskDefaultResponse
  >;
  /** Returns the content of the specified Task file. */
  get(
    options?: FileGetFileFromTaskParameters
  ): StreamableMethod<
    FileGetFileFromTask200Response | FileGetFileFromTaskDefaultResponse
  >;
  /** Gets the properties of the specified Task file. */
  head(
    options?: FileGetFilePropertiesFromTaskParameters
  ): StreamableMethod<
    | FileGetFilePropertiesFromTask200Response
    | FileGetFilePropertiesFromTaskDefaultResponse
  >;
}

export interface FileDeleteFromComputeNode {
  /** Deletes the specified file from the Compute Node. */
  delete(
    options?: FileDeleteFromComputeNodeParameters
  ): StreamableMethod<
    | FileDeleteFromComputeNode200Response
    | FileDeleteFromComputeNodeDefaultResponse
  >;
  /** Returns the content of the specified Compute Node file. */
  get(
    options?: FileGetFileFromComputeNodeParameters
  ): StreamableMethod<
    | FileGetFileFromComputeNode200Response
    | FileGetFileFromComputeNodeDefaultResponse
  >;
  /** Gets the properties of the specified Compute Node file. */
  head(
    options?: FileGetFilePropertiesFromComputeNodeParameters
  ): StreamableMethod<
    | FileGetFilePropertiesFromComputeNode200Response
    | FileGetFilePropertiesFromComputeNodeDefaultResponse
  >;
}

export interface FileListFilesFromTask {
  /** Lists the files in a Task's directory on its Compute Node. */
  get(
    options?: FileListFilesFromTaskParameters
  ): StreamableMethod<
    FileListFilesFromTask200Response | FileListFilesFromTaskDefaultResponse
  >;
}

export interface FileListFilesFromComputeNode {
  /** Lists all of the files in Task directories on the specified Compute Node. */
  get(
    options?: FileListFilesFromComputeNodeParameters
  ): StreamableMethod<
    | FileListFilesFromComputeNode200Response
    | FileListFilesFromComputeNodeDefaultResponse
  >;
}

export interface JobScheduleJobScheduleExists {
  /** Checks the specified Job Schedule exists. */
  head(
    options?: JobScheduleJobScheduleExistsParameters
  ): StreamableMethod<
    | JobScheduleJobScheduleExists200Response
    | JobScheduleJobScheduleExists404Response
    | JobScheduleJobScheduleExistsDefaultResponse
  >;
  /**
   * When you delete a Job Schedule, this also deletes all Jobs and Tasks under that
   * schedule. When Tasks are deleted, all the files in their working directories on
   * the Compute Nodes are also deleted (the retention period is ignored). The Job
   * Schedule statistics are no longer accessible once the Job Schedule is deleted,
   * though they are still counted towards Account lifetime statistics.
   */
  delete(
    options?: JobScheduleDeleteJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleDeleteJobSchedule202Response
    | JobScheduleDeleteJobScheduleDefaultResponse
  >;
  /** Gets information about the specified Job Schedule. */
  get(
    options?: JobScheduleGetJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleGetJobSchedule200Response
    | JobScheduleGetJobScheduleDefaultResponse
  >;
  /**
   * This replaces only the Job Schedule properties specified in the request. For
   * example, if the schedule property is not specified with this request, then the
   * Batch service will keep the existing schedule. Changes to a Job Schedule only
   * impact Jobs created by the schedule after the update has taken place; currently
   * running Jobs are unaffected.
   */
  patch(
    options: JobScheduleUpdateJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleUpdateJobSchedule200Response
    | JobScheduleUpdateJobScheduleDefaultResponse
  >;
  /**
   * This fully replaces all the updatable properties of the Job Schedule. For
   * example, if the schedule property is not specified with this request, then the
   * Batch service will remove the existing schedule. Changes to a Job Schedule only
   * impact Jobs created by the schedule after the update has taken place; currently
   * running Jobs are unaffected.
   */
  put(
    options: JobScheduleReplaceJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleReplaceJobSchedule200Response
    | JobScheduleReplaceJobScheduleDefaultResponse
  >;
}

export interface JobScheduleDisableJobSchedule {
  /** No new Jobs will be created until the Job Schedule is enabled again. */
  post(
    options?: JobScheduleDisableJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleDisableJobSchedule204Response
    | JobScheduleDisableJobScheduleDefaultResponse
  >;
}

export interface JobScheduleEnableJobSchedule {
  /** Enables a Job Schedule. */
  post(
    options?: JobScheduleEnableJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleEnableJobSchedule204Response
    | JobScheduleEnableJobScheduleDefaultResponse
  >;
}

export interface JobScheduleTerminateJobSchedule {
  /** Terminates a Job Schedule. */
  post(
    options?: JobScheduleTerminateJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleTerminateJobSchedule202Response
    | JobScheduleTerminateJobScheduleDefaultResponse
  >;
}

export interface JobScheduleAddJobSchedule {
  /** Adds a Job Schedule to the specified Account. */
  post(
    options: JobScheduleAddJobScheduleParameters
  ): StreamableMethod<
    | JobScheduleAddJobSchedule201Response
    | JobScheduleAddJobScheduleDefaultResponse
  >;
  /** Lists all of the Job Schedules in the specified Account. */
  get(
    options?: JobScheduleListJobSchedulesParameters
  ): StreamableMethod<
    | JobScheduleListJobSchedules200Response
    | JobScheduleListJobSchedulesDefaultResponse
  >;
}

export interface TaskAddTask {
  /**
   * The maximum lifetime of a Task from addition to completion is 180 days. If a
   * Task has not completed within 180 days of being added it will be terminated by
   * the Batch service and left in whatever state it was in at that time.
   */
  post(
    options: TaskAddTaskParameters
  ): StreamableMethod<TaskAddTask201Response | TaskAddTaskDefaultResponse>;
  /**
   * For multi-instance Tasks, information such as affinityId, executionInfo and
   * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
   * information about subtasks.
   */
  get(
    options?: TaskListTasksParameters
  ): StreamableMethod<TaskListTasks200Response | TaskListTasksDefaultResponse>;
}

export interface TaskAddCollection {
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
    options: TaskAddCollectionParameters
  ): StreamableMethod<
    TaskAddCollection200Response | TaskAddCollectionDefaultResponse
  >;
}

export interface TaskDeleteTask {
  /**
   * When a Task is deleted, all of the files in its directory on the Compute Node
   * where it ran are also deleted (regardless of the retention time). For
   * multi-instance Tasks, the delete Task operation applies synchronously to the
   * primary task; subtasks and their files are then deleted asynchronously in the
   * background.
   */
  delete(
    options?: TaskDeleteTaskParameters
  ): StreamableMethod<
    TaskDeleteTask200Response | TaskDeleteTaskDefaultResponse
  >;
  /**
   * For multi-instance Tasks, information such as affinityId, executionInfo and
   * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
   * information about subtasks.
   */
  get(
    options?: TaskGetTaskParameters
  ): StreamableMethod<TaskGetTask200Response | TaskGetTaskDefaultResponse>;
  /** Updates the properties of the specified Task. */
  put(
    options: TaskUpdateTaskParameters
  ): StreamableMethod<
    TaskUpdateTask200Response | TaskUpdateTaskDefaultResponse
  >;
}

export interface TaskListSubtasks {
  /** If the Task is not a multi-instance Task then this returns an empty collection. */
  get(
    options?: TaskListSubtasksParameters
  ): StreamableMethod<
    TaskListSubtasks200Response | TaskListSubtasksDefaultResponse
  >;
}

export interface TaskTerminateTask {
  /**
   * When the Task has been terminated, it moves to the completed state. For
   * multi-instance Tasks, the terminate Task operation applies synchronously to the
   * primary task; subtasks are then terminated asynchronously in the background.
   */
  post(
    options?: TaskTerminateTaskParameters
  ): StreamableMethod<
    TaskTerminateTask204Response | TaskTerminateTaskDefaultResponse
  >;
}

export interface TaskReactivateTask {
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
    options?: TaskReactivateTaskParameters
  ): StreamableMethod<
    TaskReactivateTask204Response | TaskReactivateTaskDefaultResponse
  >;
}

export interface ComputeNodesAddUser {
  /**
   * You can add a user Account to a Compute Node only when it is in the idle or
   * running state.
   */
  post(
    options: ComputeNodesAddUserParameters
  ): StreamableMethod<
    ComputeNodesAddUser201Response | ComputeNodesAddUserDefaultResponse
  >;
}

export interface ComputeNodesDeleteUser {
  /**
   * You can delete a user Account to a Compute Node only when it is in the idle or
   * running state.
   */
  delete(
    options?: ComputeNodesDeleteUserParameters
  ): StreamableMethod<
    ComputeNodesDeleteUser200Response | ComputeNodesDeleteUserDefaultResponse
  >;
  /**
   * This operation replaces of all the updatable properties of the Account. For
   * example, if the expiryTime element is not specified, the current value is
   * replaced with the default value, not left unmodified. You can update a user
   * Account on a Compute Node only when it is in the idle or running state.
   */
  put(
    options: ComputeNodesUpdateUserParameters
  ): StreamableMethod<
    ComputeNodesUpdateUser200Response | ComputeNodesUpdateUserDefaultResponse
  >;
}

export interface ComputeNodesGetNode {
  /** Gets information about the specified Compute Node. */
  get(
    options?: ComputeNodesGetNodeParameters
  ): StreamableMethod<
    ComputeNodesGetNode200Response | ComputeNodesGetNodeDefaultResponse
  >;
}

export interface ComputeNodesRebootNode {
  /** You can restart a Compute Node only if it is in an idle or running state. */
  post(
    options?: ComputeNodesRebootNodeParameters
  ): StreamableMethod<
    ComputeNodesRebootNode202Response | ComputeNodesRebootNodeDefaultResponse
  >;
}

export interface ComputeNodesReimageNode {
  /**
   * You can reinstall the operating system on a Compute Node only if it is in an
   * idle or running state. This API can be invoked only on Pools created with the
   * cloud service configuration property.
   */
  post(
    options?: ComputeNodesReimageNodeParameters
  ): StreamableMethod<
    ComputeNodesReimageNode202Response | ComputeNodesReimageNodeDefaultResponse
  >;
}

export interface ComputeNodesDisableScheduling {
  /**
   * You can disable Task scheduling on a Compute Node only if its current
   * scheduling state is enabled.
   */
  post(
    options?: ComputeNodesDisableSchedulingParameters
  ): StreamableMethod<
    | ComputeNodesDisableScheduling200Response
    | ComputeNodesDisableSchedulingDefaultResponse
  >;
}

export interface ComputeNodesEnableScheduling {
  /**
   * You can enable Task scheduling on a Compute Node only if its current scheduling
   * state is disabled
   */
  post(
    options?: ComputeNodesEnableSchedulingParameters
  ): StreamableMethod<
    | ComputeNodesEnableScheduling200Response
    | ComputeNodesEnableSchedulingDefaultResponse
  >;
}

export interface ComputeNodesGetRemoteLoginSettings {
  /**
   * Before you can remotely login to a Compute Node using the remote login
   * settings, you must create a user Account on the Compute Node. This API can be
   * invoked only on Pools created with the virtual machine configuration property.
   * For Pools created with a cloud service configuration, see the GetRemoteDesktop
   * API.
   */
  get(
    options?: ComputeNodesGetRemoteLoginSettingsParameters
  ): StreamableMethod<
    | ComputeNodesGetRemoteLoginSettings200Response
    | ComputeNodesGetRemoteLoginSettingsDefaultResponse
  >;
}

export interface ComputeNodesGetRemoteDesktop {
  /**
   * Before you can access a Compute Node by using the RDP file, you must create a
   * user Account on the Compute Node. This API can only be invoked on Pools created
   * with a cloud service configuration. For Pools created with a virtual machine
   * configuration, see the GetRemoteLoginSettings API.
   */
  get(
    options?: ComputeNodesGetRemoteDesktopParameters
  ): StreamableMethod<
    | ComputeNodesGetRemoteDesktop200Response
    | ComputeNodesGetRemoteDesktopDefaultResponse
  >;
}

export interface ComputeNodesUploadBatchServiceLogs {
  /**
   * This is for gathering Azure Batch service log files in an automated fashion
   * from Compute Nodes if you are experiencing an error and wish to escalate to
   * Azure support. The Azure Batch service log files should be shared with Azure
   * support to aid in debugging issues with the Batch service.
   */
  post(
    options: ComputeNodesUploadBatchServiceLogsParameters
  ): StreamableMethod<
    | ComputeNodesUploadBatchServiceLogs200Response
    | ComputeNodesUploadBatchServiceLogsDefaultResponse
  >;
}

export interface ComputeNodesListNodes {
  /** Lists the Compute Nodes in the specified Pool. */
  get(
    options?: ComputeNodesListNodesParameters
  ): StreamableMethod<
    ComputeNodesListNodes200Response | ComputeNodesListNodesDefaultResponse
  >;
}

export interface ComputeNodeExtensionsGetExtension {
  /** Gets information about the specified Compute Node Extension. */
  get(
    options?: ComputeNodeExtensionsGetExtensionParameters
  ): StreamableMethod<
    | ComputeNodeExtensionsGetExtension200Response
    | ComputeNodeExtensionsGetExtensionDefaultResponse
  >;
}

export interface ComputeNodeExtensionsListExtensions {
  /** Lists the Compute Nodes Extensions in the specified Pool. */
  get(
    options?: ComputeNodeExtensionsListExtensionsParameters
  ): StreamableMethod<
    | ComputeNodeExtensionsListExtensions200Response
    | ComputeNodeExtensionsListExtensionsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/applications' has methods for the following verbs: get */
  (path: "/applications"): ApplicationsListApplications;
  /** Resource for '/applications/\{applicationId\}' has methods for the following verbs: get */
  (
    path: "/applications/{applicationId}",
    applicationId: string
  ): ApplicationsGetApplication;
  /** Resource for '/poolusagemetrics' has methods for the following verbs: get */
  (path: "/poolusagemetrics"): PoolListUsageMetrics;
  /** Resource for '/lifetimepoolstats' has methods for the following verbs: get */
  (path: "/lifetimepoolstats"): PoolGetAllPoolLifetimeStatistics;
  /** Resource for '/pools' has methods for the following verbs: post, get */
  (path: "/pools"): PoolAddPool;
  /** Resource for '/pools/\{poolId\}' has methods for the following verbs: delete, head, get, patch */
  (path: "/pools/{poolId}", poolId: string): PoolDeletePool;
  /** Resource for '/pools/\{poolId\}/disableautoscale' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/disableautoscale",
    poolId: string
  ): PoolDisableAutoScale;
  /** Resource for '/pools/\{poolId\}/enableautoscale' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/enableautoscale",
    poolId: string
  ): PoolEnableAutoScale;
  /** Resource for '/pools/\{poolId\}/evaluateautoscale' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/evaluateautoscale",
    poolId: string
  ): PoolEvaluateAutoScale;
  /** Resource for '/pools/\{poolId\}/resize' has methods for the following verbs: post */
  (path: "/pools/{poolId}/resize", poolId: string): PoolResizePool;
  /** Resource for '/pools/\{poolId\}/stopresize' has methods for the following verbs: post */
  (path: "/pools/{poolId}/stopresize", poolId: string): PoolStopResizePool;
  /** Resource for '/pools/\{poolId\}/updateproperties' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/updateproperties",
    poolId: string
  ): PoolUpdatePoolProperties;
  /** Resource for '/pools/\{poolId\}/removenodes' has methods for the following verbs: post */
  (path: "/pools/{poolId}/removenodes", poolId: string): PoolRemovePoolNodes;
  /** Resource for '/supportedimages' has methods for the following verbs: get */
  (path: "/supportedimages"): AccountListSupportedImages;
  /** Resource for '/nodecounts' has methods for the following verbs: get */
  (path: "/nodecounts"): AccountListPoolNodeCounts;
  /** Resource for '/lifetimejobstats' has methods for the following verbs: get */
  (path: "/lifetimejobstats"): JobGetAllLifetimeStatistics;
  /** Resource for '/jobs/\{jobId\}' has methods for the following verbs: delete, get, patch, put */
  (path: "/jobs/{jobId}", jobId: string): JobDeleteJob;
  /** Resource for '/jobs/\{jobId\}/disable' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/disable", jobId: string): JobDisableJob;
  /** Resource for '/jobs/\{jobId\}/enable' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/enable", jobId: string): JobEnableJob;
  /** Resource for '/jobs/\{jobId\}/terminate' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/terminate", jobId: string): JobTerminateJob;
  /** Resource for '/jobs' has methods for the following verbs: post, get */
  (path: "/jobs"): JobAddJob;
  /** Resource for '/jobschedules/\{jobScheduleId\}/jobs' has methods for the following verbs: get */
  (
    path: "/jobschedules/{jobScheduleId}/jobs",
    jobScheduleId: string
  ): JobListFromJobSchedule;
  /** Resource for '/jobs/\{jobId\}/jobpreparationandreleasetaskstatus' has methods for the following verbs: get */
  (
    path: "/jobs/{jobId}/jobpreparationandreleasetaskstatus",
    jobId: string
  ): JobListPreparationAndReleaseTaskStatus;
  /** Resource for '/jobs/\{jobId\}/taskcounts' has methods for the following verbs: get */
  (path: "/jobs/{jobId}/taskcounts", jobId: string): JobGetTaskCounts;
  /** Resource for '/certificates' has methods for the following verbs: post, get */
  (path: "/certificates"): CertificatesAddCertificate;
  /** Resource for '/certificates(thumbprintAlgorithm=\{thumbprintAlgorithm\},thumbprint=\{thumbprint\})/canceldelete' has methods for the following verbs: post */
  (
    path: "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})/canceldelete",
    thumbprintAlgorithm: string,
    thumbprint: string
  ): CertificatesCancelCertificateDeletion;
  /** Resource for '/certificates(thumbprintAlgorithm=\{thumbprintAlgorithm\},thumbprint=\{thumbprint\})' has methods for the following verbs: delete, get */
  (
    path: "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})",
    thumbprintAlgorithm: string,
    thumbprint: string
  ): CertificatesDeleteCertificate;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/files/\{filePath\}' has methods for the following verbs: delete, get, head */
  (
    path: "/jobs/{jobId}/tasks/{taskId}/files/{filePath}",
    jobId: string,
    taskId: string,
    filePath: string
  ): FileDeleteFileFromTask;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/files/\{filePath\}' has methods for the following verbs: delete, get, head */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/files/{filePath}",
    poolId: string,
    nodeId: string,
    filePath: string
  ): FileDeleteFromComputeNode;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/files' has methods for the following verbs: get */
  (
    path: "/jobs/{jobId}/tasks/{taskId}/files",
    jobId: string,
    taskId: string
  ): FileListFilesFromTask;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/files' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/files",
    poolId: string,
    nodeId: string
  ): FileListFilesFromComputeNode;
  /** Resource for '/jobschedules/\{jobScheduleId\}' has methods for the following verbs: head, delete, get, patch, put */
  (
    path: "/jobschedules/{jobScheduleId}",
    jobScheduleId: string
  ): JobScheduleJobScheduleExists;
  /** Resource for '/jobschedules/\{jobScheduleId\}/disable' has methods for the following verbs: post */
  (
    path: "/jobschedules/{jobScheduleId}/disable",
    jobScheduleId: string
  ): JobScheduleDisableJobSchedule;
  /** Resource for '/jobschedules/\{jobScheduleId\}/enable' has methods for the following verbs: post */
  (
    path: "/jobschedules/{jobScheduleId}/enable",
    jobScheduleId: string
  ): JobScheduleEnableJobSchedule;
  /** Resource for '/jobschedules/\{jobScheduleId\}/terminate' has methods for the following verbs: post */
  (
    path: "/jobschedules/{jobScheduleId}/terminate",
    jobScheduleId: string
  ): JobScheduleTerminateJobSchedule;
  /** Resource for '/jobschedules' has methods for the following verbs: post, get */
  (path: "/jobschedules"): JobScheduleAddJobSchedule;
  /** Resource for '/jobs/\{jobId\}/tasks' has methods for the following verbs: post, get */
  (path: "/jobs/{jobId}/tasks", jobId: string): TaskAddTask;
  /** Resource for '/jobs/\{jobId\}/addtaskcollection' has methods for the following verbs: post */
  (path: "/jobs/{jobId}/addtaskcollection", jobId: string): TaskAddCollection;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}' has methods for the following verbs: delete, get, put */
  (
    path: "/jobs/{jobId}/tasks/{taskId}",
    jobId: string,
    taskId: string
  ): TaskDeleteTask;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/subtasksinfo' has methods for the following verbs: get */
  (
    path: "/jobs/{jobId}/tasks/{taskId}/subtasksinfo",
    jobId: string,
    taskId: string
  ): TaskListSubtasks;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/terminate' has methods for the following verbs: post */
  (
    path: "/jobs/{jobId}/tasks/{taskId}/terminate",
    jobId: string,
    taskId: string
  ): TaskTerminateTask;
  /** Resource for '/jobs/\{jobId\}/tasks/\{taskId\}/reactivate' has methods for the following verbs: post */
  (
    path: "/jobs/{jobId}/tasks/{taskId}/reactivate",
    jobId: string,
    taskId: string
  ): TaskReactivateTask;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/users' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/users",
    poolId: string,
    nodeId: string
  ): ComputeNodesAddUser;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/users/\{userName\}' has methods for the following verbs: delete, put */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/users/{userName}",
    poolId: string,
    nodeId: string,
    userName: string
  ): ComputeNodesDeleteUser;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}",
    poolId: string,
    nodeId: string
  ): ComputeNodesGetNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/reboot' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/reboot",
    poolId: string,
    nodeId: string
  ): ComputeNodesRebootNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/reimage' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/reimage",
    poolId: string,
    nodeId: string
  ): ComputeNodesReimageNode;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/disablescheduling' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/disablescheduling",
    poolId: string,
    nodeId: string
  ): ComputeNodesDisableScheduling;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/enablescheduling' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/enablescheduling",
    poolId: string,
    nodeId: string
  ): ComputeNodesEnableScheduling;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/remoteloginsettings' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/remoteloginsettings",
    poolId: string,
    nodeId: string
  ): ComputeNodesGetRemoteLoginSettings;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/rdp' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/rdp",
    poolId: string,
    nodeId: string
  ): ComputeNodesGetRemoteDesktop;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/uploadbatchservicelogs' has methods for the following verbs: post */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/uploadbatchservicelogs",
    poolId: string,
    nodeId: string
  ): ComputeNodesUploadBatchServiceLogs;
  /** Resource for '/pools/\{poolId\}/nodes' has methods for the following verbs: get */
  (path: "/pools/{poolId}/nodes", poolId: string): ComputeNodesListNodes;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/extensions/\{extensionName\}' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/extensions/{extensionName}",
    poolId: string,
    nodeId: string,
    extensionName: string
  ): ComputeNodeExtensionsGetExtension;
  /** Resource for '/pools/\{poolId\}/nodes/\{nodeId\}/extensions' has methods for the following verbs: get */
  (
    path: "/pools/{poolId}/nodes/{nodeId}/extensions",
    poolId: string,
    nodeId: string
  ): ComputeNodeExtensionsListExtensions;
}

export type BatchServiceClient = Client & {
  path: Routes;
};
