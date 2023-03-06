// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createBatchServiceClient, { BatchServiceClient } from "./rest/index.js";
import "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import {
  AccountlistSupportedImagesOptions,
  listSupportedImages,
  AccountlistPoolNodeCountsOptions,
  listPoolNodeCounts,
} from "./api/Account.js";
import {
  ApplicationslistApplicationsOptions,
  listApplications,
  ApplicationsgetApplicationOptions,
  getApplication,
} from "./api/Applications.js";
import {
  CertificatesaddCertificateOptions,
  addCertificate,
  CertificateslistCertificatesOptions,
  listCertificates,
  CertificatescancelCertificateDeletionOptions,
  cancelCertificateDeletion,
  CertificatesdeleteCertificateOptions,
  deleteCertificate,
  CertificatesgetCertificateOptions,
  getCertificate,
} from "./api/Certificates.js";
import {
  ComputeNodeExtensionsgetExtensionOptions,
  getExtension,
  ComputeNodeExtensionslistExtensionsOptions,
  listExtensions,
} from "./api/ComputeNodeExtensions.js";
import {
  ComputeNodesaddUserOptions,
  addUser,
  ComputeNodesdeleteUserOptions,
  deleteUser,
  ComputeNodesupdateUserOptions,
  updateUser,
  ComputeNodesgetNodeOptions,
  getNode,
  ComputeNodesrebootNodeOptions,
  rebootNode,
  ComputeNodesreimageNodeOptions,
  reimageNode,
  ComputeNodesdisableSchedulingOptions,
  disableScheduling,
  ComputeNodesenableSchedulingOptions,
  enableScheduling,
  ComputeNodesgetRemoteLoginSettingsOptions,
  getRemoteLoginSettings,
  ComputeNodesgetRemoteDesktopOptions,
  getRemoteDesktop,
  ComputeNodesuploadBatchServiceLogsOptions,
  uploadBatchServiceLogs,
  ComputeNodeslistNodesOptions,
  listNodes,
} from "./api/ComputeNodes.js";
import {
  FiledeleteFileFromTaskOptions,
  deleteFileFromTask,
  FilegetFileFromTaskOptions,
  getFileFromTask,
  FilegetFilePropertiesFromTaskOptions,
  getFilePropertiesFromTask,
  FiledeleteFromComputeNodeOptions,
  deleteFromComputeNode,
  FilegetFileFromComputeNodeOptions,
  getFileFromComputeNode,
  FilegetFilePropertiesFromComputeNodeOptions,
  getFilePropertiesFromComputeNode,
  FilelistFilesFromTaskOptions,
  listFilesFromTask,
  FilelistFilesFromComputeNodeOptions,
  listFilesFromComputeNode,
} from "./api/File.js";
import {
  JobgetAllLifetimeStatisticsOptions,
  getAllLifetimeStatistics,
  JobdeleteJobOptions,
  deleteJob,
  JobgetJobOptions,
  getJob,
  JobupdateJobOptions,
  updateJob,
  JobreplaceJobOptions,
  replaceJob,
  JobdisableJobOptions,
  disableJob,
  JobenableJobOptions,
  enableJob,
  JobterminateJobOptions,
  terminateJob,
  JobaddJobOptions,
  addJob,
  JoblistJobsOptions,
  listJobs,
  JoblistFromJobScheduleOptions,
  listFromJobSchedule,
  JoblistPreparationAndReleaseTaskStatusOptions,
  listPreparationAndReleaseTaskStatus,
  JobgetTaskCountsOptions,
  getTaskCounts,
} from "./api/Job.js";
import {
  JobSchedulejobScheduleExistsOptions,
  jobScheduleExists,
  JobScheduledeleteJobScheduleOptions,
  deleteJobSchedule,
  JobSchedulegetJobScheduleOptions,
  getJobSchedule,
  JobScheduleupdateJobScheduleOptions,
  updateJobSchedule,
  JobSchedulereplaceJobScheduleOptions,
  replaceJobSchedule,
  JobScheduledisableJobScheduleOptions,
  disableJobSchedule,
  JobScheduleenableJobScheduleOptions,
  enableJobSchedule,
  JobScheduleterminateJobScheduleOptions,
  terminateJobSchedule,
  JobScheduleaddJobScheduleOptions,
  addJobSchedule,
  JobSchedulelistJobSchedulesOptions,
  listJobSchedules,
} from "./api/JobSchedule.js";
import {
  ApplicationListResult,
  Application,
  CustomPagePoolUsageMetrics,
  PoolStatistics,
  BatchPoolListResult,
  BatchPool,
  AutoScaleRun,
  AccountListSupportedImagesResult,
  JobStatistics,
  BatchJob,
  DisableJobOption,
  BatchJobListResult,
  BatchJobListPreparationAndReleaseTaskStatusResult,
  TaskCountsResult,
  CertificateListResult,
  Certificate,
  NodeFileListResult,
  BatchJobSchedule,
  BatchJobScheduleListResult,
  BatchTaskListResult,
  BatchTask,
  TaskAddCollectionResult,
  BatchTaskListSubtasksResult,
  ComputeNode,
  ComputeNodeGetRemoteLoginSettingsResult,
  UploadBatchServiceLogsResult,
  ComputeNodeListResult,
  NodeVMExtension,
  NodeVMExtensionList,
  PoolNodeCounts,
} from "./api/models.js";
import {
  PoollistUsageMetricsOptions,
  listUsageMetrics,
  PoolgetAllPoolLifetimeStatisticsOptions,
  getAllPoolLifetimeStatistics,
  PooladdPoolOptions,
  addPool,
  PoollistPoolsOptions,
  listPools,
  PooldeletePoolOptions,
  deletePool,
  PoolpoolExistsOptions,
  poolExists,
  PoolgetPoolOptions,
  getPool,
  PoolupdatePoolOptions,
  updatePool,
  PooldisableAutoScaleOptions,
  disableAutoScale,
  PoolenableAutoScaleOptions,
  enableAutoScale,
  PoolevaluateAutoScaleOptions,
  evaluateAutoScale,
  PoolresizePoolOptions,
  resizePool,
  PoolstopResizePoolOptions,
  stopResizePool,
  PoolupdatePoolPropertiesOptions,
  updatePoolProperties,
  PoolremovePoolNodesOptions,
  removePoolNodes,
} from "./api/Pool.js";
import {
  TaskaddTaskOptions,
  addTask,
  TasklistTasksOptions,
  listTasks,
  TaskaddCollectionOptions,
  addCollection,
  TaskdeleteTaskOptions,
  deleteTask,
  TaskgetTaskOptions,
  getTask,
  TaskupdateTaskOptions,
  updateTask,
  TasklistSubtasksOptions,
  listSubtasks,
  TaskterminateTaskOptions,
  terminateTask,
  TaskreactivateTaskOptions,
  reactivateTask,
} from "./api/Task.js";
import { ClientOptions } from "@azure-rest/core-client";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class BatchServiceClientClient {
  private _client: BatchServiceClient;

  /** A client for issuing REST requests to the Azure Batch service. */
  constructor(endpoint: string, credential: TokenCredential, options: ClientOptions = {}) {
    this._client = createBatchServiceClient(endpoint, credential, options);
  }

  applications = {
    listApplications: (
      options: ApplicationslistApplicationsOptions = { requestOptions: {} }
    ): Promise<ApplicationListResult> => {
      return listApplications(this._client, options);
    },
    getApplication: (
      applicationId: string,
      options: ApplicationsgetApplicationOptions = { requestOptions: {} }
    ): Promise<Application> => {
      return getApplication(this._client, applicationId, options);
    },
  };
  pool = {
    listUsageMetrics: (
      options: PoollistUsageMetricsOptions = { requestOptions: {} }
    ): Promise<CustomPagePoolUsageMetrics> => {
      return listUsageMetrics(this._client, options);
    },
    getAllPoolLifetimeStatistics: (
      options: PoolgetAllPoolLifetimeStatisticsOptions = { requestOptions: {} }
    ): Promise<PoolStatistics> => {
      return getAllPoolLifetimeStatistics(this._client, options);
    },
    addPool: (options: PooladdPoolOptions = { requestOptions: {} }): Promise<void> => {
      return addPool(this._client, options);
    },
    listPools: (
      options: PoollistPoolsOptions = { requestOptions: {} }
    ): Promise<BatchPoolListResult> => {
      return listPools(this._client, options);
    },
    deletePool: (
      poolId: string,
      options: PooldeletePoolOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deletePool(this._client, poolId, options);
    },
    poolExists: (
      poolId: string,
      options: PoolpoolExistsOptions = { requestOptions: {} }
    ): Promise<void> => {
      return poolExists(this._client, poolId, options);
    },
    getPool: (
      poolId: string,
      options: PoolgetPoolOptions = { requestOptions: {} }
    ): Promise<BatchPool> => {
      return getPool(this._client, poolId, options);
    },
    updatePool: (
      poolId: string,
      options: PoolupdatePoolOptions = { requestOptions: {} }
    ): Promise<void> => {
      return updatePool(this._client, poolId, options);
    },
    disableAutoScale: (
      poolId: string,
      options: PooldisableAutoScaleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return disableAutoScale(this._client, poolId, options);
    },
    enableAutoScale: (
      poolId: string,
      options: PoolenableAutoScaleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return enableAutoScale(this._client, poolId, options);
    },
    evaluateAutoScale: (
      autoScaleFormula: string,
      poolId: string,
      options: PoolevaluateAutoScaleOptions = { requestOptions: {} }
    ): Promise<AutoScaleRun> => {
      return evaluateAutoScale(this._client, autoScaleFormula, poolId, options);
    },
    resizePool: (
      poolId: string,
      options: PoolresizePoolOptions = { requestOptions: {} }
    ): Promise<void> => {
      return resizePool(this._client, poolId, options);
    },
    stopResizePool: (
      poolId: string,
      options: PoolstopResizePoolOptions = { requestOptions: {} }
    ): Promise<void> => {
      return stopResizePool(this._client, poolId, options);
    },
    updatePoolProperties: (
      poolId: string,
      options: PoolupdatePoolPropertiesOptions = { requestOptions: {} }
    ): Promise<void> => {
      return updatePoolProperties(this._client, poolId, options);
    },
    removePoolNodes: (
      nodeList: string[],
      poolId: string,
      options: PoolremovePoolNodesOptions = { requestOptions: {} }
    ): Promise<void> => {
      return removePoolNodes(this._client, nodeList, poolId, options);
    },
  };
  account = {
    listSupportedImages: (
      options: AccountlistSupportedImagesOptions = { requestOptions: {} }
    ): Promise<AccountListSupportedImagesResult> => {
      return listSupportedImages(this._client, options);
    },
    listPoolNodeCounts: (
      options: AccountlistPoolNodeCountsOptions = { requestOptions: {} }
    ): Promise<PagedAsyncIterableIterator<PoolNodeCounts>> => {
      return listPoolNodeCounts(this._client, options);
    },
  };
  job = {
    getAllLifetimeStatistics: (
      options: JobgetAllLifetimeStatisticsOptions = { requestOptions: {} }
    ): Promise<JobStatistics> => {
      return getAllLifetimeStatistics(this._client, options);
    },
    deleteJob: (
      jobId: string,
      options: JobdeleteJobOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deleteJob(this._client, jobId, options);
    },
    getJob: (
      jobId: string,
      options: JobgetJobOptions = { requestOptions: {} }
    ): Promise<BatchJob> => {
      return getJob(this._client, jobId, options);
    },
    updateJob: (
      jobId: string,
      options: JobupdateJobOptions = { requestOptions: {} }
    ): Promise<void> => {
      return updateJob(this._client, jobId, options);
    },
    replaceJob: (
      jobId: string,
      options: JobreplaceJobOptions = { requestOptions: {} }
    ): Promise<void> => {
      return replaceJob(this._client, jobId, options);
    },
    disableJob: (
      disableTasks: DisableJobOption,
      jobId: string,
      options: JobdisableJobOptions = { requestOptions: {} }
    ): Promise<void> => {
      return disableJob(this._client, disableTasks, jobId, options);
    },
    enableJob: (
      jobId: string,
      options: JobenableJobOptions = { requestOptions: {} }
    ): Promise<void> => {
      return enableJob(this._client, jobId, options);
    },
    terminateJob: (
      jobId: string,
      options: JobterminateJobOptions = { requestOptions: {} }
    ): Promise<void> => {
      return terminateJob(this._client, jobId, options);
    },
    addJob: (options: JobaddJobOptions = { requestOptions: {} }): Promise<void> => {
      return addJob(this._client, options);
    },
    listJobs: (
      options: JoblistJobsOptions = { requestOptions: {} }
    ): Promise<BatchJobListResult> => {
      return listJobs(this._client, options);
    },
    listFromJobSchedule: (
      jobScheduleId: string,
      options: JoblistFromJobScheduleOptions = { requestOptions: {} }
    ): Promise<BatchJobListResult> => {
      return listFromJobSchedule(this._client, jobScheduleId, options);
    },
    listPreparationAndReleaseTaskStatus: (
      jobId: string,
      options: JoblistPreparationAndReleaseTaskStatusOptions = {
        requestOptions: {},
      }
    ): Promise<BatchJobListPreparationAndReleaseTaskStatusResult> => {
      return listPreparationAndReleaseTaskStatus(this._client, jobId, options);
    },
    getTaskCounts: (
      jobId: string,
      options: JobgetTaskCountsOptions = { requestOptions: {} }
    ): Promise<TaskCountsResult> => {
      return getTaskCounts(this._client, jobId, options);
    },
  };
  certificates = {
    addCertificate: (
      options: CertificatesaddCertificateOptions = { requestOptions: {} }
    ): Promise<void> => {
      return addCertificate(this._client, options);
    },
    listCertificates: (
      options: CertificateslistCertificatesOptions = { requestOptions: {} }
    ): Promise<CertificateListResult> => {
      return listCertificates(this._client, options);
    },
    cancelCertificateDeletion: (
      thumbprintAlgorithm: string,
      thumbprint: string,
      options: CertificatescancelCertificateDeletionOptions = {
        requestOptions: {},
      }
    ): Promise<void> => {
      return cancelCertificateDeletion(this._client, thumbprintAlgorithm, thumbprint, options);
    },
    deleteCertificate: (
      thumbprintAlgorithm: string,
      thumbprint: string,
      options: CertificatesdeleteCertificateOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deleteCertificate(this._client, thumbprintAlgorithm, thumbprint, options);
    },
    getCertificate: (
      thumbprintAlgorithm: string,
      thumbprint: string,
      options: CertificatesgetCertificateOptions = { requestOptions: {} }
    ): Promise<Certificate> => {
      return getCertificate(this._client, thumbprintAlgorithm, thumbprint, options);
    },
  };
  file = {
    deleteFileFromTask: (
      jobId: string,
      taskId: string,
      filePath: string,
      options: FiledeleteFileFromTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deleteFileFromTask(this._client, jobId, taskId, filePath, options);
    },
    getFileFromTask: (
      jobId: string,
      taskId: string,
      filePath: string,
      options: FilegetFileFromTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return getFileFromTask(this._client, jobId, taskId, filePath, options);
    },
    getFilePropertiesFromTask: (
      jobId: string,
      taskId: string,
      filePath: string,
      options: FilegetFilePropertiesFromTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return getFilePropertiesFromTask(this._client, jobId, taskId, filePath, options);
    },
    deleteFromComputeNode: (
      poolId: string,
      nodeId: string,
      filePath: string,
      options: FiledeleteFromComputeNodeOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deleteFromComputeNode(this._client, poolId, nodeId, filePath, options);
    },
    getFileFromComputeNode: (
      poolId: string,
      nodeId: string,
      filePath: string,
      options: FilegetFileFromComputeNodeOptions = { requestOptions: {} }
    ): Promise<void> => {
      return getFileFromComputeNode(this._client, poolId, nodeId, filePath, options);
    },
    getFilePropertiesFromComputeNode: (
      poolId: string,
      nodeId: string,
      filePath: string,
      options: FilegetFilePropertiesFromComputeNodeOptions = {
        requestOptions: {},
      }
    ): Promise<void> => {
      return getFilePropertiesFromComputeNode(this._client, poolId, nodeId, filePath, options);
    },
    listFilesFromTask: (
      jobId: string,
      taskId: string,
      options: FilelistFilesFromTaskOptions = { requestOptions: {} }
    ): Promise<NodeFileListResult> => {
      return listFilesFromTask(this._client, jobId, taskId, options);
    },
    listFilesFromComputeNode: (
      poolId: string,
      nodeId: string,
      options: FilelistFilesFromComputeNodeOptions = { requestOptions: {} }
    ): Promise<NodeFileListResult> => {
      return listFilesFromComputeNode(this._client, poolId, nodeId, options);
    },
  };
  jobSchedule = {
    jobScheduleExists: (
      jobScheduleId: string,
      options: JobSchedulejobScheduleExistsOptions = { requestOptions: {} }
    ): Promise<void> => {
      return jobScheduleExists(this._client, jobScheduleId, options);
    },
    deleteJobSchedule: (
      jobScheduleId: string,
      options: JobScheduledeleteJobScheduleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deleteJobSchedule(this._client, jobScheduleId, options);
    },
    getJobSchedule: (
      jobScheduleId: string,
      options: JobSchedulegetJobScheduleOptions = { requestOptions: {} }
    ): Promise<BatchJobSchedule> => {
      return getJobSchedule(this._client, jobScheduleId, options);
    },
    updateJobSchedule: (
      jobScheduleId: string,
      options: JobScheduleupdateJobScheduleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return updateJobSchedule(this._client, jobScheduleId, options);
    },
    replaceJobSchedule: (
      jobScheduleId: string,
      options: JobSchedulereplaceJobScheduleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return replaceJobSchedule(this._client, jobScheduleId, options);
    },
    disableJobSchedule: (
      jobScheduleId: string,
      options: JobScheduledisableJobScheduleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return disableJobSchedule(this._client, jobScheduleId, options);
    },
    enableJobSchedule: (
      jobScheduleId: string,
      options: JobScheduleenableJobScheduleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return enableJobSchedule(this._client, jobScheduleId, options);
    },
    terminateJobSchedule: (
      jobScheduleId: string,
      options: JobScheduleterminateJobScheduleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return terminateJobSchedule(this._client, jobScheduleId, options);
    },
    addJobSchedule: (
      options: JobScheduleaddJobScheduleOptions = { requestOptions: {} }
    ): Promise<void> => {
      return addJobSchedule(this._client, options);
    },
    listJobSchedules: (
      options: JobSchedulelistJobSchedulesOptions = { requestOptions: {} }
    ): Promise<BatchJobScheduleListResult> => {
      return listJobSchedules(this._client, options);
    },
  };
  task = {
    addTask: (
      jobId: string,
      options: TaskaddTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return addTask(this._client, jobId, options);
    },
    listTasks: (
      jobId: string,
      options: TasklistTasksOptions = { requestOptions: {} }
    ): Promise<BatchTaskListResult> => {
      return listTasks(this._client, jobId, options);
    },
    addCollection: (
      value: BatchTask[],
      jobId: string,
      options: TaskaddCollectionOptions = { requestOptions: {} }
    ): Promise<TaskAddCollectionResult> => {
      return addCollection(this._client, value, jobId, options);
    },
    deleteTask: (
      jobId: string,
      taskId: string,
      options: TaskdeleteTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deleteTask(this._client, jobId, taskId, options);
    },
    getTask: (
      jobId: string,
      taskId: string,
      options: TaskgetTaskOptions = { requestOptions: {} }
    ): Promise<BatchTask> => {
      return getTask(this._client, jobId, taskId, options);
    },
    updateTask: (
      jobId: string,
      taskId: string,
      options: TaskupdateTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return updateTask(this._client, jobId, taskId, options);
    },
    listSubtasks: (
      jobId: string,
      taskId: string,
      options: TasklistSubtasksOptions = { requestOptions: {} }
    ): Promise<BatchTaskListSubtasksResult> => {
      return listSubtasks(this._client, jobId, taskId, options);
    },
    terminateTask: (
      jobId: string,
      taskId: string,
      options: TaskterminateTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return terminateTask(this._client, jobId, taskId, options);
    },
    reactivateTask: (
      jobId: string,
      taskId: string,
      options: TaskreactivateTaskOptions = { requestOptions: {} }
    ): Promise<void> => {
      return reactivateTask(this._client, jobId, taskId, options);
    },
  };
  computeNodes = {
    addUser: (
      name: string,
      poolId: string,
      nodeId: string,
      options: ComputeNodesaddUserOptions = { requestOptions: {} }
    ): Promise<void> => {
      return addUser(this._client, name, poolId, nodeId, options);
    },
    deleteUser: (
      poolId: string,
      nodeId: string,
      userName: string,
      options: ComputeNodesdeleteUserOptions = { requestOptions: {} }
    ): Promise<void> => {
      return deleteUser(this._client, poolId, nodeId, userName, options);
    },
    updateUser: (
      poolId: string,
      nodeId: string,
      userName: string,
      options: ComputeNodesupdateUserOptions = { requestOptions: {} }
    ): Promise<void> => {
      return updateUser(this._client, poolId, nodeId, userName, options);
    },
    getNode: (
      poolId: string,
      nodeId: string,
      options: ComputeNodesgetNodeOptions = { requestOptions: {} }
    ): Promise<ComputeNode> => {
      return getNode(this._client, poolId, nodeId, options);
    },
    rebootNode: (
      poolId: string,
      nodeId: string,
      options: ComputeNodesrebootNodeOptions = { requestOptions: {} }
    ): Promise<void> => {
      return rebootNode(this._client, poolId, nodeId, options);
    },
    reimageNode: (
      poolId: string,
      nodeId: string,
      options: ComputeNodesreimageNodeOptions = { requestOptions: {} }
    ): Promise<void> => {
      return reimageNode(this._client, poolId, nodeId, options);
    },
    disableScheduling: (
      poolId: string,
      nodeId: string,
      options: ComputeNodesdisableSchedulingOptions = { requestOptions: {} }
    ): Promise<void> => {
      return disableScheduling(this._client, poolId, nodeId, options);
    },
    enableScheduling: (
      poolId: string,
      nodeId: string,
      options: ComputeNodesenableSchedulingOptions = { requestOptions: {} }
    ): Promise<void> => {
      return enableScheduling(this._client, poolId, nodeId, options);
    },
    getRemoteLoginSettings: (
      poolId: string,
      nodeId: string,
      options: ComputeNodesgetRemoteLoginSettingsOptions = {
        requestOptions: {},
      }
    ): Promise<ComputeNodeGetRemoteLoginSettingsResult> => {
      return getRemoteLoginSettings(this._client, poolId, nodeId, options);
    },
    getRemoteDesktop: (
      poolId: string,
      nodeId: string,
      options: ComputeNodesgetRemoteDesktopOptions = { requestOptions: {} }
    ): Promise<void> => {
      return getRemoteDesktop(this._client, poolId, nodeId, options);
    },
    uploadBatchServiceLogs: (
      containerUrl: string,
      startTime: Date,
      poolId: string,
      nodeId: string,
      options: ComputeNodesuploadBatchServiceLogsOptions = {
        requestOptions: {},
      }
    ): Promise<UploadBatchServiceLogsResult> => {
      return uploadBatchServiceLogs(this._client, containerUrl, startTime, poolId, nodeId, options);
    },
    listNodes: (
      poolId: string,
      options: ComputeNodeslistNodesOptions = { requestOptions: {} }
    ): Promise<ComputeNodeListResult> => {
      return listNodes(this._client, poolId, options);
    },
  };
  computeNodeExtensions = {
    getExtension: (
      poolId: string,
      nodeId: string,
      extensionName: string,
      options: ComputeNodeExtensionsgetExtensionOptions = { requestOptions: {} }
    ): Promise<NodeVMExtension> => {
      return getExtension(this._client, poolId, nodeId, extensionName, options);
    },
    listExtensions: (
      poolId: string,
      nodeId: string,
      options: ComputeNodeExtensionslistExtensionsOptions = {
        requestOptions: {},
      }
    ): Promise<NodeVMExtensionList> => {
      return listExtensions(this._client, poolId, nodeId, options);
    },
  };
}
