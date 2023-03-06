// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ExitConditions,
  TaskState,
  TaskContainerSettings,
  ResourceFile,
  OutputFile,
  EnvironmentSetting,
  AffinityInformation,
  TaskConstraints,
  UserIdentity,
  TaskExecutionInformation,
  ComputeNodeInformation,
  MultiInstanceSettings,
  TaskStatistics,
  TaskDependencies,
  ApplicationPackageReference,
  AuthenticationTokenSettings,
  BatchTaskListResult,
  BatchTask,
  TaskAddCollectionResult,
  BatchTaskListSubtasksResult,
} from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TaskaddTaskOptions extends RequestParametersCommon {
  /**
   * The ID can contain any combination of alphanumeric characters including hyphens
   * and underscores, and cannot contain more than 64 characters.
   */
  id?: string;
  /**
   * The display name need not be unique and can contain any Unicode characters up
   * to a maximum length of 1024.
   */
  displayName?: string;
  /** The URL of the Task. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Task has changed
   * between requests. In particular, you can be pass the ETag when updating a Task
   * to specify that your changes should take effect only if nobody else has
   * modified the Task in the meantime.
   */
  eTag?: string;
  /** The last modified time of the Task. */
  lastModified?: Date;
  /** The creation time of the Task. */
  creationTime?: Date;
  /** How the Batch service should respond when the Task completes. */
  exitConditions?: ExitConditions;
  /** The state of the Task. */
  state?: TaskState;
  /** The time at which the Task entered its current state. */
  stateTransitionTime?: Date;
  /** This property is not set if the Task is in its initial Active state. */
  previousState?: TaskState;
  /** This property is not set if the Task is in its initial Active state. */
  previousStateTransitionTime?: Date;
  /**
   * For multi-instance Tasks, the command line is executed as the primary Task,
   * after the primary Task and all subtasks have finished executing the
   * coordination command line. The command line does not run under a shell, and
   * therefore cannot take advantage of shell features such as environment variable
   * expansion. If you want to take advantage of such features, you should invoke
   * the shell in the command line, for example using "cmd /c MyCommand" in
   * Windows or "/bin/sh -c MyCommand" in Linux. If the command line refers to
   * file paths, it should use a relative path (relative to the Task working
   * directory), or use the Batch provided environment variable
   * (https://docs.microsoft.com/en-us/azure/batch/batch-compute-node-environment-variables).
   */
  commandLine?: string;
  /**
   * If the Pool that will run this Task has containerConfiguration set, this must
   * be set as well. If the Pool that will run this Task doesn't have
   * containerConfiguration set, this must not be set. When this is specified, all
   * directories recursively below the AZ_BATCH_NODE_ROOT_DIR (the root of Azure
   * Batch directories on the node) are mapped into the container, all Task
   * environment variables are mapped into the container, and the Task command line
   * is executed in the container. Files produced in the container outside of
   * AZ_BATCH_NODE_ROOT_DIR might not be reflected to the host disk, meaning that
   * Batch file APIs will not be able to access those files.
   */
  containerSettings?: TaskContainerSettings;
  /**
   * For multi-instance Tasks, the resource files will only be downloaded to the
   * Compute Node on which the primary Task is executed. There is a maximum size for
   * the list of resource files.  When the max size is exceeded, the request will
   * fail and the response error code will be RequestEntityTooLarge. If this occurs,
   * the collection of ResourceFiles must be reduced in size. This can be achieved
   * using .zip files, Application Packages, or Docker Containers.
   */
  resourceFiles?: ResourceFile[];
  /**
   * For multi-instance Tasks, the files will only be uploaded from the Compute Node
   * on which the primary Task is executed.
   */
  outputFiles?: OutputFile[];
  /** A list of environment variable settings for the Task. */
  environmentSettings?: EnvironmentSetting[];
  /**
   * A locality hint that can be used by the Batch service to select a Compute Node
   * on which to start a Task.
   */
  affinityInfo?: AffinityInformation;
  /** Execution constraints to apply to a Task. */
  constraints?: TaskConstraints;
  /**
   * The default is 1. A Task can only be scheduled to run on a compute node if the
   * node has enough free scheduling slots available. For multi-instance Tasks, this
   * must be 1.
   */
  requiredSlots?: number;
  /** If omitted, the Task runs as a non-administrative user unique to the Task. */
  userIdentity?: UserIdentity;
  /** Information about the execution of a Task. */
  executionInfo?: TaskExecutionInformation;
  /** Information about the Compute Node on which a Task ran. */
  nodeInfo?: ComputeNodeInformation;
  /**
   * Multi-instance Tasks are commonly used to support MPI Tasks. In the MPI case,
   * if any of the subtasks fail (for example due to exiting with a non-zero exit
   * code) the entire multi-instance Task fails. The multi-instance Task is then
   * terminated and retried, up to its retry limit.
   */
  multiInstanceSettings?: MultiInstanceSettings;
  /** Resource usage statistics for a Task. */
  stats?: TaskStatistics;
  /**
   * This Task will not be scheduled until all Tasks that it depends on have
   * completed successfully. If any of those Tasks fail and exhaust their retry
   * counts, this Task will never be scheduled.
   */
  dependsOn?: TaskDependencies;
  /**
   * Application packages are downloaded and deployed to a shared directory, not the
   * Task working directory. Therefore, if a referenced package is already on the
   * Node, and is up to date, then it is not re-downloaded; the existing copy on the
   * Compute Node is used. If a referenced Package cannot be installed, for example
   * because the package has been deleted or because download failed, the Task
   * fails.
   */
  applicationPackageReferences?: ApplicationPackageReference[];
  /**
   * If this property is set, the Batch service provides the Task with an
   * authentication token which can be used to authenticate Batch service operations
   * without requiring an Account access key. The token is provided via the
   * AZ_BATCH_AUTHENTICATION_TOKEN environment variable. The operations that the
   * Task can carry out using the token depend on the settings. For example, a Task
   * can request Job permissions in order to add other Tasks to the Job, or check
   * the status of the Job or of other Tasks under the Job.
   */
  authenticationTokenSettings?: AuthenticationTokenSettings;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/**
 * The maximum lifetime of a Task from addition to completion is 180 days. If a
 * Task has not completed within 180 days of being added it will be terminated by
 * the Batch service and left in whatever state it was in at that time.
 */
export async function addTask(
  context: Client,
  jobId: string,
  options: TaskaddTaskOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs/{jobId}/tasks", jobId).post({
    headers: {
      ...(options.clientRequestId && {
        "client-request-id": options.clientRequestId,
      }),
      ...(options.returnClientRequestId && {
        "return-client-request-id": options.returnClientRequestId,
      }),
      ...(options.ocpDate && { "ocp-date": options.ocpDate }),
      ...(options.content_type && { "Content-Type": options.content_type }),
      ...options.requestOptions?.customHeaders,
    },
    queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
    body: {
      ...(options.id && { id: options.id }),
      ...(options.displayName && { displayName: options.displayName }),
      ...(options.exitConditions && { exitConditions: options.exitConditions }),
      ...(options.commandLine && { commandLine: options.commandLine }),
      ...(options.containerSettings && {
        containerSettings: options.containerSettings,
      }),
      ...(options.resourceFiles && { resourceFiles: options.resourceFiles }),
      ...(options.outputFiles && { outputFiles: options.outputFiles }),
      ...(options.environmentSettings && {
        environmentSettings: options.environmentSettings,
      }),
      ...(options.affinityInfo && { affinityInfo: options.affinityInfo }),
      ...(options.constraints && { constraints: options.constraints }),
      ...(options.requiredSlots && { requiredSlots: options.requiredSlots }),
      ...(options.userIdentity && { userIdentity: options.userIdentity }),
      ...(options.multiInstanceSettings && {
        multiInstanceSettings: options.multiInstanceSettings,
      }),
      ...(options.dependsOn && { dependsOn: options.dependsOn }),
      ...(options.applicationPackageReferences && {
        applicationPackageReferences: options.applicationPackageReferences,
      }),
      ...(options.authenticationTokenSettings && {
        authenticationTokenSettings: options.authenticationTokenSettings,
      }),
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TasklistTasksOptions extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-tasks.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

/**
 * For multi-instance Tasks, information such as affinityId, executionInfo and
 * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
 * information about subtasks.
 */
export async function listTasks(
  context: Client,
  jobId: string,
  options: TasklistTasksOptions = { requestOptions: {} }
): Promise<BatchTaskListResult> {
  const result = await context.path("/jobs/{jobId}/tasks", jobId).get({
    headers: {
      ...(options.ocpDate && { "ocp-date": options.ocpDate }),
      ...(options.clientRequestId && {
        "client-request-id": options.clientRequestId,
      }),
      ...(options.returnClientRequestId && {
        "return-client-request-id": options.returnClientRequestId,
      }),
      Accept: "application/json",
      ...options.requestOptions?.customHeaders,
    },
    queryParameters: {
      ...(options.maxresults && { maxresults: options.maxresults }),
      ...(options.timeOut && { timeOut: options.timeOut }),
      ...(options.$filter && { $filter: options.$filter }),
      ...(options.$select && { $select: options.$select }),
      ...(options.$expand && { $expand: options.$expand }),
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      id: p["id"],
      displayName: p["displayName"],
      url: p["url"],
      eTag: p["eTag"],
      lastModified: new Date(p["lastModified"] ?? ""),
      creationTime: new Date(p["creationTime"] ?? ""),
      exitConditions: !p.exitConditions
        ? undefined
        : {
            exitCodes: (p.exitConditions?.["exitCodes"] ?? []).map((p) => ({
              code: p["code"],
              exitOptions: {
                jobAction: p.exitOptions["jobAction"],
                dependencyAction: p.exitOptions["dependencyAction"],
              },
            })),
            exitCodeRanges: (p.exitConditions?.["exitCodeRanges"] ?? []).map(
              (p) => ({
                start: p["start"],
                end: p["end"],
                exitOptions: {
                  jobAction: p.exitOptions["jobAction"],
                  dependencyAction: p.exitOptions["dependencyAction"],
                },
              })
            ),
            preProcessingError: !p.exitConditions?.preProcessingError
              ? undefined
              : {
                  jobAction:
                    p.exitConditions?.preProcessingError?.["jobAction"],
                  dependencyAction:
                    p.exitConditions?.preProcessingError?.["dependencyAction"],
                },
            fileUploadError: !p.exitConditions?.fileUploadError
              ? undefined
              : {
                  jobAction: p.exitConditions?.fileUploadError?.["jobAction"],
                  dependencyAction:
                    p.exitConditions?.fileUploadError?.["dependencyAction"],
                },
            default: !p.exitConditions?.default
              ? undefined
              : {
                  jobAction: p.exitConditions?.default?.["jobAction"],
                  dependencyAction:
                    p.exitConditions?.default?.["dependencyAction"],
                },
          },
      state: p["state"],
      stateTransitionTime: new Date(p["stateTransitionTime"] ?? ""),
      previousState: p["previousState"],
      previousStateTransitionTime: new Date(
        p["previousStateTransitionTime"] ?? ""
      ),
      commandLine: p["commandLine"],
      containerSettings: !p.containerSettings
        ? undefined
        : {
            containerRunOptions: p.containerSettings?.["containerRunOptions"],
            imageName: p.containerSettings?.["imageName"],
            registry: !p.containerSettings?.registry
              ? undefined
              : {
                  username: p.containerSettings?.registry?.["username"],
                  password: p.containerSettings?.registry?.["password"],
                  registryServer:
                    p.containerSettings?.registry?.["registryServer"],
                  identityReference: !p.containerSettings?.registry
                    ?.identityReference
                    ? undefined
                    : {
                        resourceId:
                          p.containerSettings?.registry?.identityReference?.[
                            "resourceId"
                          ],
                      },
                },
            workingDirectory: p.containerSettings?.["workingDirectory"],
          },
      resourceFiles: (p["resourceFiles"] ?? []).map((p) => ({
        autoStorageContainerName: p["autoStorageContainerName"],
        storageContainerUrl: p["storageContainerUrl"],
        httpUrl: p["httpUrl"],
        blobPrefix: p["blobPrefix"],
        filePath: p["filePath"],
        fileMode: p["fileMode"],
        identityReference: !p.identityReference
          ? undefined
          : { resourceId: p.identityReference?.["resourceId"] },
      })),
      outputFiles: (p["outputFiles"] ?? []).map((p) => ({
        filePattern: p["filePattern"],
        destination: {
          container: !p.destination.container
            ? undefined
            : {
                path: p.destination.container?.["path"],
                containerUrl: p.destination.container?.["containerUrl"],
                identityReference: !p.destination.container?.identityReference
                  ? undefined
                  : {
                      resourceId:
                        p.destination.container?.identityReference?.[
                          "resourceId"
                        ],
                    },
                uploadHeaders: (
                  p.destination.container?.["uploadHeaders"] ?? []
                ).map((p) => ({ name: p["name"], value: p["value"] })),
              },
        },
        uploadOptions: { uploadCondition: p.uploadOptions["uploadCondition"] },
      })),
      environmentSettings: (p["environmentSettings"] ?? []).map((p) => ({
        name: p["name"],
        value: p["value"],
      })),
      affinityInfo: !p.affinityInfo
        ? undefined
        : { affinityId: p.affinityInfo?.["affinityId"] },
      constraints: !p.constraints
        ? undefined
        : {
            maxWallClockTime: p.constraints?.["maxWallClockTime"],
            retentionTime: p.constraints?.["retentionTime"],
            maxTaskRetryCount: p.constraints?.["maxTaskRetryCount"],
          },
      requiredSlots: p["requiredSlots"],
      userIdentity: !p.userIdentity
        ? undefined
        : {
            username: p.userIdentity?.["username"],
            autoUser: !p.userIdentity?.autoUser
              ? undefined
              : {
                  scope: p.userIdentity?.autoUser?.["scope"],
                  elevationLevel: p.userIdentity?.autoUser?.["elevationLevel"],
                },
          },
      executionInfo: !p.executionInfo
        ? undefined
        : {
            startTime: new Date(p.executionInfo?.["startTime"] ?? ""),
            endTime: new Date(p.executionInfo?.["endTime"] ?? ""),
            exitCode: p.executionInfo?.["exitCode"],
            containerInfo: !p.executionInfo?.containerInfo
              ? undefined
              : {
                  containerId: p.executionInfo?.containerInfo?.["containerId"],
                  state: p.executionInfo?.containerInfo?.["state"],
                  error: p.executionInfo?.containerInfo?.["error"],
                },
            failureInfo: !p.executionInfo?.failureInfo
              ? undefined
              : {
                  category: p.executionInfo?.failureInfo?.["category"],
                  code: p.executionInfo?.failureInfo?.["code"],
                  message: p.executionInfo?.failureInfo?.["message"],
                  details: (
                    p.executionInfo?.failureInfo?.["details"] ?? []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                },
            retryCount: p.executionInfo?.["retryCount"],
            lastRetryTime: new Date(p.executionInfo?.["lastRetryTime"] ?? ""),
            requeueCount: p.executionInfo?.["requeueCount"],
            lastRequeueTime: new Date(
              p.executionInfo?.["lastRequeueTime"] ?? ""
            ),
            result: p.executionInfo?.["result"],
          },
      nodeInfo: !p.nodeInfo
        ? undefined
        : {
            affinityId: p.nodeInfo?.["affinityId"],
            nodeUrl: p.nodeInfo?.["nodeUrl"],
            poolId: p.nodeInfo?.["poolId"],
            nodeId: p.nodeInfo?.["nodeId"],
            taskRootDirectory: p.nodeInfo?.["taskRootDirectory"],
            taskRootDirectoryUrl: p.nodeInfo?.["taskRootDirectoryUrl"],
          },
      multiInstanceSettings: !p.multiInstanceSettings
        ? undefined
        : {
            numberOfInstances: p.multiInstanceSettings?.["numberOfInstances"],
            coordinationCommandLine:
              p.multiInstanceSettings?.["coordinationCommandLine"],
            commonResourceFiles: (
              p.multiInstanceSettings?.["commonResourceFiles"] ?? []
            ).map((p) => ({
              autoStorageContainerName: p["autoStorageContainerName"],
              storageContainerUrl: p["storageContainerUrl"],
              httpUrl: p["httpUrl"],
              blobPrefix: p["blobPrefix"],
              filePath: p["filePath"],
              fileMode: p["fileMode"],
              identityReference: !p.identityReference
                ? undefined
                : { resourceId: p.identityReference?.["resourceId"] },
            })),
          },
      stats: !p.stats
        ? undefined
        : {
            url: p.stats?.["url"],
            startTime: new Date(p.stats?.["startTime"] ?? ""),
            lastUpdateTime: new Date(p.stats?.["lastUpdateTime"] ?? ""),
            userCPUTime: p.stats?.["userCPUTime"],
            kernelCPUTime: p.stats?.["kernelCPUTime"],
            wallClockTime: p.stats?.["wallClockTime"],
            readIOps: p.stats?.["readIOps"],
            writeIOps: p.stats?.["writeIOps"],
            readIOGiB: p.stats?.["readIOGiB"],
            writeIOGiB: p.stats?.["writeIOGiB"],
            waitTime: p.stats?.["waitTime"],
          },
      dependsOn: !p.dependsOn
        ? undefined
        : {
            taskIds: p.dependsOn?.["taskIds"],
            taskIdRanges: (p.dependsOn?.["taskIdRanges"] ?? []).map((p) => ({
              start: p["start"],
              end: p["end"],
            })),
          },
      applicationPackageReferences: (
        p["applicationPackageReferences"] ?? []
      ).map((p) => ({
        applicationId: p["applicationId"],
        version: p["version"],
      })),
      authenticationTokenSettings: !p.authenticationTokenSettings
        ? undefined
        : { access: p.authenticationTokenSettings?.["access"] },
    })),
    nextLink: result.body["odata.nextLink"],
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TaskaddCollectionOptions extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

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
export async function addCollection(
  context: Client,
  value: BatchTask[],
  jobId: string,
  options: TaskaddCollectionOptions = { requestOptions: {} }
): Promise<TaskAddCollectionResult> {
  const result = await context
    .path("/jobs/{jobId}/addtaskcollection", jobId)
    .post({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        Accept: "application/json",
        ...(options.content_type && { "Content-Type": options.content_type }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
      body: { value: value },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      status: p["status"],
      taskId: p["taskId"],
      eTag: p["eTag"],
      lastModified: new Date(p["lastModified"] ?? ""),
      location: p["location"],
      error: !p.error
        ? undefined
        : {
            code: p.error?.["code"],
            message: !p.error?.message
              ? undefined
              : {
                  lang: p.error?.message?.["lang"],
                  value: p.error?.message?.["value"],
                },
            values: (p.error?.["values"] ?? []).map((p) => ({
              key: p["key"],
              value: p["value"],
            })),
          },
    })),
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TaskdeleteTaskOptions extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  ifMatch?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  ifNoneMatch?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  ifModifiedSince?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  ifUnmodifiedSince?: string;
}

/**
 * When a Task is deleted, all of the files in its directory on the Compute Node
 * where it ran are also deleted (regardless of the retention time). For
 * multi-instance Tasks, the delete Task operation applies synchronously to the
 * primary task; subtasks and their files are then deleted asynchronously in the
 * background.
 */
export async function deleteTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: TaskdeleteTaskOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskId)
    .delete({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...(options.ifMatch && { "if-match": options.ifMatch }),
        ...(options.ifNoneMatch && { "if-none-match": options.ifNoneMatch }),
        ...(options.ifModifiedSince && {
          "if-modified-since": options.ifModifiedSince,
        }),
        ...(options.ifUnmodifiedSince && {
          "if-unmodified-since": options.ifUnmodifiedSince,
        }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TaskgetTaskOptions extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  ifMatch?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  ifNoneMatch?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  ifModifiedSince?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  ifUnmodifiedSince?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

/**
 * For multi-instance Tasks, information such as affinityId, executionInfo and
 * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
 * information about subtasks.
 */
export async function getTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: TaskgetTaskOptions = { requestOptions: {} }
): Promise<BatchTask> {
  const result = await context
    .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskId)
    .get({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...(options.ifMatch && { "if-match": options.ifMatch }),
        ...(options.ifNoneMatch && { "if-none-match": options.ifNoneMatch }),
        ...(options.ifModifiedSince && {
          "if-modified-since": options.ifModifiedSince,
        }),
        ...(options.ifUnmodifiedSince && {
          "if-unmodified-since": options.ifUnmodifiedSince,
        }),
        Accept: "application/json",
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: {
        ...(options.timeOut && { timeOut: options.timeOut }),
        ...(options.$select && { $select: options.$select }),
        ...(options.$expand && { $expand: options.$expand }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    id: result.body["id"],
    displayName: result.body["displayName"],
    url: result.body["url"],
    eTag: result.body["eTag"],
    lastModified: new Date(result.body["lastModified"] ?? ""),
    creationTime: new Date(result.body["creationTime"] ?? ""),
    exitConditions: !result.body.exitConditions
      ? undefined
      : {
          exitCodes: (result.body.exitConditions?.["exitCodes"] ?? []).map(
            (p) => ({
              code: p["code"],
              exitOptions: {
                jobAction: p.exitOptions["jobAction"],
                dependencyAction: p.exitOptions["dependencyAction"],
              },
            })
          ),
          exitCodeRanges: (
            result.body.exitConditions?.["exitCodeRanges"] ?? []
          ).map((p) => ({
            start: p["start"],
            end: p["end"],
            exitOptions: {
              jobAction: p.exitOptions["jobAction"],
              dependencyAction: p.exitOptions["dependencyAction"],
            },
          })),
          preProcessingError: !result.body.exitConditions?.preProcessingError
            ? undefined
            : {
                jobAction:
                  result.body.exitConditions?.preProcessingError?.["jobAction"],
                dependencyAction:
                  result.body.exitConditions?.preProcessingError?.[
                    "dependencyAction"
                  ],
              },
          fileUploadError: !result.body.exitConditions?.fileUploadError
            ? undefined
            : {
                jobAction:
                  result.body.exitConditions?.fileUploadError?.["jobAction"],
                dependencyAction:
                  result.body.exitConditions?.fileUploadError?.[
                    "dependencyAction"
                  ],
              },
          default: !result.body.exitConditions?.default
            ? undefined
            : {
                jobAction: result.body.exitConditions?.default?.["jobAction"],
                dependencyAction:
                  result.body.exitConditions?.default?.["dependencyAction"],
              },
        },
    state: result.body["state"],
    stateTransitionTime: new Date(result.body["stateTransitionTime"] ?? ""),
    previousState: result.body["previousState"],
    previousStateTransitionTime: new Date(
      result.body["previousStateTransitionTime"] ?? ""
    ),
    commandLine: result.body["commandLine"],
    containerSettings: !result.body.containerSettings
      ? undefined
      : {
          containerRunOptions:
            result.body.containerSettings?.["containerRunOptions"],
          imageName: result.body.containerSettings?.["imageName"],
          registry: !result.body.containerSettings?.registry
            ? undefined
            : {
                username: result.body.containerSettings?.registry?.["username"],
                password: result.body.containerSettings?.registry?.["password"],
                registryServer:
                  result.body.containerSettings?.registry?.["registryServer"],
                identityReference: !result.body.containerSettings?.registry
                  ?.identityReference
                  ? undefined
                  : {
                      resourceId:
                        result.body.containerSettings?.registry
                          ?.identityReference?.["resourceId"],
                    },
              },
          workingDirectory: result.body.containerSettings?.["workingDirectory"],
        },
    resourceFiles: (result.body["resourceFiles"] ?? []).map((p) => ({
      autoStorageContainerName: p["autoStorageContainerName"],
      storageContainerUrl: p["storageContainerUrl"],
      httpUrl: p["httpUrl"],
      blobPrefix: p["blobPrefix"],
      filePath: p["filePath"],
      fileMode: p["fileMode"],
      identityReference: !p.identityReference
        ? undefined
        : { resourceId: p.identityReference?.["resourceId"] },
    })),
    outputFiles: (result.body["outputFiles"] ?? []).map((p) => ({
      filePattern: p["filePattern"],
      destination: {
        container: !p.destination.container
          ? undefined
          : {
              path: p.destination.container?.["path"],
              containerUrl: p.destination.container?.["containerUrl"],
              identityReference: !p.destination.container?.identityReference
                ? undefined
                : {
                    resourceId:
                      p.destination.container?.identityReference?.[
                        "resourceId"
                      ],
                  },
              uploadHeaders: (
                p.destination.container?.["uploadHeaders"] ?? []
              ).map((p) => ({ name: p["name"], value: p["value"] })),
            },
      },
      uploadOptions: { uploadCondition: p.uploadOptions["uploadCondition"] },
    })),
    environmentSettings: (result.body["environmentSettings"] ?? []).map(
      (p) => ({ name: p["name"], value: p["value"] })
    ),
    affinityInfo: !result.body.affinityInfo
      ? undefined
      : { affinityId: result.body.affinityInfo?.["affinityId"] },
    constraints: !result.body.constraints
      ? undefined
      : {
          maxWallClockTime: result.body.constraints?.["maxWallClockTime"],
          retentionTime: result.body.constraints?.["retentionTime"],
          maxTaskRetryCount: result.body.constraints?.["maxTaskRetryCount"],
        },
    requiredSlots: result.body["requiredSlots"],
    userIdentity: !result.body.userIdentity
      ? undefined
      : {
          username: result.body.userIdentity?.["username"],
          autoUser: !result.body.userIdentity?.autoUser
            ? undefined
            : {
                scope: result.body.userIdentity?.autoUser?.["scope"],
                elevationLevel:
                  result.body.userIdentity?.autoUser?.["elevationLevel"],
              },
        },
    executionInfo: !result.body.executionInfo
      ? undefined
      : {
          startTime: new Date(result.body.executionInfo?.["startTime"] ?? ""),
          endTime: new Date(result.body.executionInfo?.["endTime"] ?? ""),
          exitCode: result.body.executionInfo?.["exitCode"],
          containerInfo: !result.body.executionInfo?.containerInfo
            ? undefined
            : {
                containerId:
                  result.body.executionInfo?.containerInfo?.["containerId"],
                state: result.body.executionInfo?.containerInfo?.["state"],
                error: result.body.executionInfo?.containerInfo?.["error"],
              },
          failureInfo: !result.body.executionInfo?.failureInfo
            ? undefined
            : {
                category: result.body.executionInfo?.failureInfo?.["category"],
                code: result.body.executionInfo?.failureInfo?.["code"],
                message: result.body.executionInfo?.failureInfo?.["message"],
                details: (
                  result.body.executionInfo?.failureInfo?.["details"] ?? []
                ).map((p) => ({ name: p["name"], value: p["value"] })),
              },
          retryCount: result.body.executionInfo?.["retryCount"],
          lastRetryTime: new Date(
            result.body.executionInfo?.["lastRetryTime"] ?? ""
          ),
          requeueCount: result.body.executionInfo?.["requeueCount"],
          lastRequeueTime: new Date(
            result.body.executionInfo?.["lastRequeueTime"] ?? ""
          ),
          result: result.body.executionInfo?.["result"],
        },
    nodeInfo: !result.body.nodeInfo
      ? undefined
      : {
          affinityId: result.body.nodeInfo?.["affinityId"],
          nodeUrl: result.body.nodeInfo?.["nodeUrl"],
          poolId: result.body.nodeInfo?.["poolId"],
          nodeId: result.body.nodeInfo?.["nodeId"],
          taskRootDirectory: result.body.nodeInfo?.["taskRootDirectory"],
          taskRootDirectoryUrl: result.body.nodeInfo?.["taskRootDirectoryUrl"],
        },
    multiInstanceSettings: !result.body.multiInstanceSettings
      ? undefined
      : {
          numberOfInstances:
            result.body.multiInstanceSettings?.["numberOfInstances"],
          coordinationCommandLine:
            result.body.multiInstanceSettings?.["coordinationCommandLine"],
          commonResourceFiles: (
            result.body.multiInstanceSettings?.["commonResourceFiles"] ?? []
          ).map((p) => ({
            autoStorageContainerName: p["autoStorageContainerName"],
            storageContainerUrl: p["storageContainerUrl"],
            httpUrl: p["httpUrl"],
            blobPrefix: p["blobPrefix"],
            filePath: p["filePath"],
            fileMode: p["fileMode"],
            identityReference: !p.identityReference
              ? undefined
              : { resourceId: p.identityReference?.["resourceId"] },
          })),
        },
    stats: !result.body.stats
      ? undefined
      : {
          url: result.body.stats?.["url"],
          startTime: new Date(result.body.stats?.["startTime"] ?? ""),
          lastUpdateTime: new Date(result.body.stats?.["lastUpdateTime"] ?? ""),
          userCPUTime: result.body.stats?.["userCPUTime"],
          kernelCPUTime: result.body.stats?.["kernelCPUTime"],
          wallClockTime: result.body.stats?.["wallClockTime"],
          readIOps: result.body.stats?.["readIOps"],
          writeIOps: result.body.stats?.["writeIOps"],
          readIOGiB: result.body.stats?.["readIOGiB"],
          writeIOGiB: result.body.stats?.["writeIOGiB"],
          waitTime: result.body.stats?.["waitTime"],
        },
    dependsOn: !result.body.dependsOn
      ? undefined
      : {
          taskIds: result.body.dependsOn?.["taskIds"],
          taskIdRanges: (result.body.dependsOn?.["taskIdRanges"] ?? []).map(
            (p) => ({ start: p["start"], end: p["end"] })
          ),
        },
    applicationPackageReferences: (
      result.body["applicationPackageReferences"] ?? []
    ).map((p) => ({
      applicationId: p["applicationId"],
      version: p["version"],
    })),
    authenticationTokenSettings: !result.body.authenticationTokenSettings
      ? undefined
      : { access: result.body.authenticationTokenSettings?.["access"] },
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TaskupdateTaskOptions extends RequestParametersCommon {
  /**
   * The ID can contain any combination of alphanumeric characters including hyphens
   * and underscores, and cannot contain more than 64 characters.
   */
  id?: string;
  /**
   * The display name need not be unique and can contain any Unicode characters up
   * to a maximum length of 1024.
   */
  displayName?: string;
  /** The URL of the Task. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Task has changed
   * between requests. In particular, you can be pass the ETag when updating a Task
   * to specify that your changes should take effect only if nobody else has
   * modified the Task in the meantime.
   */
  eTag?: string;
  /** The last modified time of the Task. */
  lastModified?: Date;
  /** The creation time of the Task. */
  creationTime?: Date;
  /** How the Batch service should respond when the Task completes. */
  exitConditions?: ExitConditions;
  /** The state of the Task. */
  state?: TaskState;
  /** The time at which the Task entered its current state. */
  stateTransitionTime?: Date;
  /** This property is not set if the Task is in its initial Active state. */
  previousState?: TaskState;
  /** This property is not set if the Task is in its initial Active state. */
  previousStateTransitionTime?: Date;
  /**
   * For multi-instance Tasks, the command line is executed as the primary Task,
   * after the primary Task and all subtasks have finished executing the
   * coordination command line. The command line does not run under a shell, and
   * therefore cannot take advantage of shell features such as environment variable
   * expansion. If you want to take advantage of such features, you should invoke
   * the shell in the command line, for example using "cmd /c MyCommand" in
   * Windows or "/bin/sh -c MyCommand" in Linux. If the command line refers to
   * file paths, it should use a relative path (relative to the Task working
   * directory), or use the Batch provided environment variable
   * (https://docs.microsoft.com/en-us/azure/batch/batch-compute-node-environment-variables).
   */
  commandLine?: string;
  /**
   * If the Pool that will run this Task has containerConfiguration set, this must
   * be set as well. If the Pool that will run this Task doesn't have
   * containerConfiguration set, this must not be set. When this is specified, all
   * directories recursively below the AZ_BATCH_NODE_ROOT_DIR (the root of Azure
   * Batch directories on the node) are mapped into the container, all Task
   * environment variables are mapped into the container, and the Task command line
   * is executed in the container. Files produced in the container outside of
   * AZ_BATCH_NODE_ROOT_DIR might not be reflected to the host disk, meaning that
   * Batch file APIs will not be able to access those files.
   */
  containerSettings?: TaskContainerSettings;
  /**
   * For multi-instance Tasks, the resource files will only be downloaded to the
   * Compute Node on which the primary Task is executed. There is a maximum size for
   * the list of resource files.  When the max size is exceeded, the request will
   * fail and the response error code will be RequestEntityTooLarge. If this occurs,
   * the collection of ResourceFiles must be reduced in size. This can be achieved
   * using .zip files, Application Packages, or Docker Containers.
   */
  resourceFiles?: ResourceFile[];
  /**
   * For multi-instance Tasks, the files will only be uploaded from the Compute Node
   * on which the primary Task is executed.
   */
  outputFiles?: OutputFile[];
  /** A list of environment variable settings for the Task. */
  environmentSettings?: EnvironmentSetting[];
  /**
   * A locality hint that can be used by the Batch service to select a Compute Node
   * on which to start a Task.
   */
  affinityInfo?: AffinityInformation;
  /** Execution constraints to apply to a Task. */
  constraints?: TaskConstraints;
  /**
   * The default is 1. A Task can only be scheduled to run on a compute node if the
   * node has enough free scheduling slots available. For multi-instance Tasks, this
   * must be 1.
   */
  requiredSlots?: number;
  /** If omitted, the Task runs as a non-administrative user unique to the Task. */
  userIdentity?: UserIdentity;
  /** Information about the execution of a Task. */
  executionInfo?: TaskExecutionInformation;
  /** Information about the Compute Node on which a Task ran. */
  nodeInfo?: ComputeNodeInformation;
  /**
   * Multi-instance Tasks are commonly used to support MPI Tasks. In the MPI case,
   * if any of the subtasks fail (for example due to exiting with a non-zero exit
   * code) the entire multi-instance Task fails. The multi-instance Task is then
   * terminated and retried, up to its retry limit.
   */
  multiInstanceSettings?: MultiInstanceSettings;
  /** Resource usage statistics for a Task. */
  stats?: TaskStatistics;
  /**
   * This Task will not be scheduled until all Tasks that it depends on have
   * completed successfully. If any of those Tasks fail and exhaust their retry
   * counts, this Task will never be scheduled.
   */
  dependsOn?: TaskDependencies;
  /**
   * Application packages are downloaded and deployed to a shared directory, not the
   * Task working directory. Therefore, if a referenced package is already on the
   * Node, and is up to date, then it is not re-downloaded; the existing copy on the
   * Compute Node is used. If a referenced Package cannot be installed, for example
   * because the package has been deleted or because download failed, the Task
   * fails.
   */
  applicationPackageReferences?: ApplicationPackageReference[];
  /**
   * If this property is set, the Batch service provides the Task with an
   * authentication token which can be used to authenticate Batch service operations
   * without requiring an Account access key. The token is provided via the
   * AZ_BATCH_AUTHENTICATION_TOKEN environment variable. The operations that the
   * Task can carry out using the token depend on the settings. For example, a Task
   * can request Job permissions in order to add other Tasks to the Job, or check
   * the status of the Job or of other Tasks under the Job.
   */
  authenticationTokenSettings?: AuthenticationTokenSettings;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  ifMatch?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  ifNoneMatch?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  ifModifiedSince?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  ifUnmodifiedSince?: string;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/** Updates the properties of the specified Task. */
export async function updateTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: TaskupdateTaskOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskId)
    .put({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...(options.ifMatch && { "if-match": options.ifMatch }),
        ...(options.ifNoneMatch && { "if-none-match": options.ifNoneMatch }),
        ...(options.ifModifiedSince && {
          "if-modified-since": options.ifModifiedSince,
        }),
        ...(options.ifUnmodifiedSince && {
          "if-unmodified-since": options.ifUnmodifiedSince,
        }),
        ...(options.content_type && { "Content-Type": options.content_type }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
      body: {
        ...(options.id && { id: options.id }),
        ...(options.displayName && { displayName: options.displayName }),
        ...(options.exitConditions && {
          exitConditions: options.exitConditions,
        }),
        ...(options.commandLine && { commandLine: options.commandLine }),
        ...(options.containerSettings && {
          containerSettings: options.containerSettings,
        }),
        ...(options.resourceFiles && { resourceFiles: options.resourceFiles }),
        ...(options.outputFiles && { outputFiles: options.outputFiles }),
        ...(options.environmentSettings && {
          environmentSettings: options.environmentSettings,
        }),
        ...(options.affinityInfo && { affinityInfo: options.affinityInfo }),
        ...(options.constraints && { constraints: options.constraints }),
        ...(options.requiredSlots && { requiredSlots: options.requiredSlots }),
        ...(options.userIdentity && { userIdentity: options.userIdentity }),
        ...(options.multiInstanceSettings && {
          multiInstanceSettings: options.multiInstanceSettings,
        }),
        ...(options.dependsOn && { dependsOn: options.dependsOn }),
        ...(options.applicationPackageReferences && {
          applicationPackageReferences: options.applicationPackageReferences,
        }),
        ...(options.authenticationTokenSettings && {
          authenticationTokenSettings: options.authenticationTokenSettings,
        }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TasklistSubtasksOptions extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /** An OData $select clause. */
  $select?: string;
}

/** If the Task is not a multi-instance Task then this returns an empty collection. */
export async function listSubtasks(
  context: Client,
  jobId: string,
  taskId: string,
  options: TasklistSubtasksOptions = { requestOptions: {} }
): Promise<BatchTaskListSubtasksResult> {
  const result = await context
    .path("/jobs/{jobId}/tasks/{taskId}/subtasksinfo", jobId, taskId)
    .get({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        Accept: "application/json",
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: {
        ...(options.timeOut && { timeOut: options.timeOut }),
        ...(options.$select && { $select: options.$select }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      id: p["id"],
      nodeInfo: !p.nodeInfo
        ? undefined
        : {
            affinityId: p.nodeInfo?.["affinityId"],
            nodeUrl: p.nodeInfo?.["nodeUrl"],
            poolId: p.nodeInfo?.["poolId"],
            nodeId: p.nodeInfo?.["nodeId"],
            taskRootDirectory: p.nodeInfo?.["taskRootDirectory"],
            taskRootDirectoryUrl: p.nodeInfo?.["taskRootDirectoryUrl"],
          },
      startTime: new Date(p["startTime"] ?? ""),
      endTime: new Date(p["endTime"] ?? ""),
      exitCode: p["exitCode"],
      containerInfo: !p.containerInfo
        ? undefined
        : {
            containerId: p.containerInfo?.["containerId"],
            state: p.containerInfo?.["state"],
            error: p.containerInfo?.["error"],
          },
      failureInfo: !p.failureInfo
        ? undefined
        : {
            category: p.failureInfo?.["category"],
            code: p.failureInfo?.["code"],
            message: p.failureInfo?.["message"],
            details: (p.failureInfo?.["details"] ?? []).map((p) => ({
              name: p["name"],
              value: p["value"],
            })),
          },
      state: p["state"],
      stateTransitionTime: new Date(p["stateTransitionTime"] ?? ""),
      previousState: p["previousState"],
      previousStateTransitionTime: new Date(
        p["previousStateTransitionTime"] ?? ""
      ),
      result: p["result"],
    })),
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TaskterminateTaskOptions extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  ifMatch?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  ifNoneMatch?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  ifModifiedSince?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  ifUnmodifiedSince?: string;
}

/**
 * When the Task has been terminated, it moves to the completed state. For
 * multi-instance Tasks, the terminate Task operation applies synchronously to the
 * primary task; subtasks are then terminated asynchronously in the background.
 */
export async function terminateTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: TaskterminateTaskOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobs/{jobId}/tasks/{taskId}/terminate", jobId, taskId)
    .post({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...(options.ifMatch && { "if-match": options.ifMatch }),
        ...(options.ifNoneMatch && { "if-none-match": options.ifNoneMatch }),
        ...(options.ifModifiedSince && {
          "if-modified-since": options.ifModifiedSince,
        }),
        ...(options.ifUnmodifiedSince && {
          "if-unmodified-since": options.ifUnmodifiedSince,
        }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface TaskreactivateTaskOptions extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  ifMatch?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  ifNoneMatch?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  ifModifiedSince?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  ifUnmodifiedSince?: string;
}

/**
 * Reactivation makes a Task eligible to be retried again up to its maximum retry
 * count. The Task's state is changed to active. As the Task is no longer in the
 * completed state, any previous exit code or failure information is no longer
 * available after reactivation. Each time a Task is reactivated, its retry count
 * is reset to 0. Reactivation will fail for Tasks that are not completed or that
 * previously completed successfully (with an exit code of 0). Additionally, it
 * will fail if the Job has completed (or is terminating or deleting).
 */
export async function reactivateTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: TaskreactivateTaskOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobs/{jobId}/tasks/{taskId}/reactivate", jobId, taskId)
    .post({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...(options.ifMatch && { "if-match": options.ifMatch }),
        ...(options.ifNoneMatch && { "if-none-match": options.ifNoneMatch }),
        ...(options.ifModifiedSince && {
          "if-modified-since": options.ifModifiedSince,
        }),
        ...(options.ifUnmodifiedSince && {
          "if-unmodified-since": options.ifUnmodifiedSince,
        }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}
