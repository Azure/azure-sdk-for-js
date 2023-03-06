// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  JobStatistics,
  BatchJob,
  JobState,
  JobConstraints,
  JobManagerTask,
  JobPreparationTask,
  JobReleaseTask,
  EnvironmentSetting,
  PoolInformation,
  OnAllTasksComplete,
  OnTaskFailure,
  JobNetworkConfiguration,
  MetadataItem,
  JobExecutionInformation,
  DisableJobOption,
  BatchJobListResult,
  BatchJobListPreparationAndReleaseTaskStatusResult,
  TaskCountsResult,
} from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface JobgetAllLifetimeStatisticsOptions
  extends RequestParametersCommon {
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
}

/**
 * Statistics are aggregated across all Jobs that have ever existed in the
 * Account, from Account creation to the last update time of the statistics. The
 * statistics may not be immediately available. The Batch service performs
 * periodic roll-up of statistics. The typical delay is about 30 minutes.
 */
export async function getAllLifetimeStatistics(
  context: Client,
  options: JobgetAllLifetimeStatisticsOptions = { requestOptions: {} }
): Promise<JobStatistics> {
  const result = await context.path("/lifetimejobstats").get({
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
    queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    url: result.body["url"],
    startTime: new Date(result.body["startTime"] ?? ""),
    lastUpdateTime: new Date(result.body["lastUpdateTime"] ?? ""),
    userCPUTime: result.body["userCPUTime"],
    kernelCPUTime: result.body["kernelCPUTime"],
    wallClockTime: result.body["wallClockTime"],
    readIOps: result.body["readIOps"],
    writeIOps: result.body["writeIOps"],
    readIOGiB: result.body["readIOGiB"],
    writeIOGiB: result.body["writeIOGiB"],
    numSucceededTasks: result.body["numSucceededTasks"],
    numFailedTasks: result.body["numFailedTasks"],
    numTaskRetries: result.body["numTaskRetries"],
    waitTime: result.body["waitTime"],
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface JobdeleteJobOptions extends RequestParametersCommon {
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
 * Deleting a Job also deletes all Tasks that are part of that Job, and all Job
 * statistics. This also overrides the retention period for Task data; that is, if
 * the Job contains Tasks which are still retained on Compute Nodes, the Batch
 * services deletes those Tasks' working directories and all their contents.  When
 * a Delete Job request is received, the Batch service sets the Job to the
 * deleting state. All update operations on a Job that is in deleting state will
 * fail with status code 409 (Conflict), with additional information indicating
 * that the Job is being deleted.
 */
export async function deleteJob(
  context: Client,
  jobId: string,
  options: JobdeleteJobOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs/{jobId}", jobId).delete({
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

export interface JobgetJobOptions extends RequestParametersCommon {
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

/** Gets information about the specified Job. */
export async function getJob(
  context: Client,
  jobId: string,
  options: JobgetJobOptions = { requestOptions: {} }
): Promise<BatchJob> {
  const result = await context.path("/jobs/{jobId}", jobId).get({
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
    usesTaskDependencies: result.body["usesTaskDependencies"],
    url: result.body["url"],
    eTag: result.body["eTag"],
    lastModified: new Date(result.body["lastModified"] ?? ""),
    creationTime: new Date(result.body["creationTime"] ?? ""),
    state: result.body["state"],
    stateTransitionTime: new Date(result.body["stateTransitionTime"] ?? ""),
    previousState: result.body["previousState"],
    previousStateTransitionTime: new Date(
      result.body["previousStateTransitionTime"] ?? ""
    ),
    priority: result.body["priority"],
    allowTaskPreemption: result.body["allowTaskPreemption"],
    maxParallelTasks: result.body["maxParallelTasks"],
    constraints: !result.body.constraints
      ? undefined
      : {
          maxWallClockTime: result.body.constraints?.["maxWallClockTime"],
          maxTaskRetryCount: result.body.constraints?.["maxTaskRetryCount"],
        },
    jobManagerTask: !result.body.jobManagerTask
      ? undefined
      : {
          id: result.body.jobManagerTask?.["id"],
          displayName: result.body.jobManagerTask?.["displayName"],
          commandLine: result.body.jobManagerTask?.["commandLine"],
          containerSettings: !result.body.jobManagerTask?.containerSettings
            ? undefined
            : {
                containerRunOptions:
                  result.body.jobManagerTask?.containerSettings?.[
                    "containerRunOptions"
                  ],
                imageName:
                  result.body.jobManagerTask?.containerSettings?.["imageName"],
                registry: !result.body.jobManagerTask?.containerSettings
                  ?.registry
                  ? undefined
                  : {
                      username:
                        result.body.jobManagerTask?.containerSettings
                          ?.registry?.["username"],
                      password:
                        result.body.jobManagerTask?.containerSettings
                          ?.registry?.["password"],
                      registryServer:
                        result.body.jobManagerTask?.containerSettings
                          ?.registry?.["registryServer"],
                      identityReference: !result.body.jobManagerTask
                        ?.containerSettings?.registry?.identityReference
                        ? undefined
                        : {
                            resourceId:
                              result.body.jobManagerTask?.containerSettings
                                ?.registry?.identityReference?.["resourceId"],
                          },
                    },
                workingDirectory:
                  result.body.jobManagerTask?.containerSettings?.[
                    "workingDirectory"
                  ],
              },
          resourceFiles: (
            result.body.jobManagerTask?.["resourceFiles"] ?? []
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
          outputFiles: (result.body.jobManagerTask?.["outputFiles"] ?? []).map(
            (p) => ({
              filePattern: p["filePattern"],
              destination: {
                container: !p.destination.container
                  ? undefined
                  : {
                      path: p.destination.container?.["path"],
                      containerUrl: p.destination.container?.["containerUrl"],
                      identityReference: !p.destination.container
                        ?.identityReference
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
              uploadOptions: {
                uploadCondition: p.uploadOptions["uploadCondition"],
              },
            })
          ),
          environmentSettings: (
            result.body.jobManagerTask?.["environmentSettings"] ?? []
          ).map((p) => ({ name: p["name"], value: p["value"] })),
          constraints: !result.body.jobManagerTask?.constraints
            ? undefined
            : {
                maxWallClockTime:
                  result.body.jobManagerTask?.constraints?.["maxWallClockTime"],
                retentionTime:
                  result.body.jobManagerTask?.constraints?.["retentionTime"],
                maxTaskRetryCount:
                  result.body.jobManagerTask?.constraints?.[
                    "maxTaskRetryCount"
                  ],
              },
          requiredSlots: result.body.jobManagerTask?.["requiredSlots"],
          killJobOnCompletion:
            result.body.jobManagerTask?.["killJobOnCompletion"],
          userIdentity: !result.body.jobManagerTask?.userIdentity
            ? undefined
            : {
                username:
                  result.body.jobManagerTask?.userIdentity?.["username"],
                autoUser: !result.body.jobManagerTask?.userIdentity?.autoUser
                  ? undefined
                  : {
                      scope:
                        result.body.jobManagerTask?.userIdentity?.autoUser?.[
                          "scope"
                        ],
                      elevationLevel:
                        result.body.jobManagerTask?.userIdentity?.autoUser?.[
                          "elevationLevel"
                        ],
                    },
              },
          runExclusive: result.body.jobManagerTask?.["runExclusive"],
          applicationPackageReferences: (
            result.body.jobManagerTask?.["applicationPackageReferences"] ?? []
          ).map((p) => ({
            applicationId: p["applicationId"],
            version: p["version"],
          })),
          authenticationTokenSettings: !result.body.jobManagerTask
            ?.authenticationTokenSettings
            ? undefined
            : {
                access:
                  result.body.jobManagerTask?.authenticationTokenSettings?.[
                    "access"
                  ],
              },
          allowLowPriorityNode:
            result.body.jobManagerTask?.["allowLowPriorityNode"],
        },
    jobPreparationTask: !result.body.jobPreparationTask
      ? undefined
      : {
          id: result.body.jobPreparationTask?.["id"],
          commandLine: result.body.jobPreparationTask?.["commandLine"],
          containerSettings: !result.body.jobPreparationTask?.containerSettings
            ? undefined
            : {
                containerRunOptions:
                  result.body.jobPreparationTask?.containerSettings?.[
                    "containerRunOptions"
                  ],
                imageName:
                  result.body.jobPreparationTask?.containerSettings?.[
                    "imageName"
                  ],
                registry: !result.body.jobPreparationTask?.containerSettings
                  ?.registry
                  ? undefined
                  : {
                      username:
                        result.body.jobPreparationTask?.containerSettings
                          ?.registry?.["username"],
                      password:
                        result.body.jobPreparationTask?.containerSettings
                          ?.registry?.["password"],
                      registryServer:
                        result.body.jobPreparationTask?.containerSettings
                          ?.registry?.["registryServer"],
                      identityReference: !result.body.jobPreparationTask
                        ?.containerSettings?.registry?.identityReference
                        ? undefined
                        : {
                            resourceId:
                              result.body.jobPreparationTask?.containerSettings
                                ?.registry?.identityReference?.["resourceId"],
                          },
                    },
                workingDirectory:
                  result.body.jobPreparationTask?.containerSettings?.[
                    "workingDirectory"
                  ],
              },
          resourceFiles: (
            result.body.jobPreparationTask?.["resourceFiles"] ?? []
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
          environmentSettings: (
            result.body.jobPreparationTask?.["environmentSettings"] ?? []
          ).map((p) => ({ name: p["name"], value: p["value"] })),
          constraints: !result.body.jobPreparationTask?.constraints
            ? undefined
            : {
                maxWallClockTime:
                  result.body.jobPreparationTask?.constraints?.[
                    "maxWallClockTime"
                  ],
                retentionTime:
                  result.body.jobPreparationTask?.constraints?.[
                    "retentionTime"
                  ],
                maxTaskRetryCount:
                  result.body.jobPreparationTask?.constraints?.[
                    "maxTaskRetryCount"
                  ],
              },
          waitForSuccess: result.body.jobPreparationTask?.["waitForSuccess"],
          userIdentity: !result.body.jobPreparationTask?.userIdentity
            ? undefined
            : {
                username:
                  result.body.jobPreparationTask?.userIdentity?.["username"],
                autoUser: !result.body.jobPreparationTask?.userIdentity
                  ?.autoUser
                  ? undefined
                  : {
                      scope:
                        result.body.jobPreparationTask?.userIdentity
                          ?.autoUser?.["scope"],
                      elevationLevel:
                        result.body.jobPreparationTask?.userIdentity
                          ?.autoUser?.["elevationLevel"],
                    },
              },
          rerunOnNodeRebootAfterSuccess:
            result.body.jobPreparationTask?.["rerunOnNodeRebootAfterSuccess"],
        },
    jobReleaseTask: !result.body.jobReleaseTask
      ? undefined
      : {
          id: result.body.jobReleaseTask?.["id"],
          commandLine: result.body.jobReleaseTask?.["commandLine"],
          containerSettings: !result.body.jobReleaseTask?.containerSettings
            ? undefined
            : {
                containerRunOptions:
                  result.body.jobReleaseTask?.containerSettings?.[
                    "containerRunOptions"
                  ],
                imageName:
                  result.body.jobReleaseTask?.containerSettings?.["imageName"],
                registry: !result.body.jobReleaseTask?.containerSettings
                  ?.registry
                  ? undefined
                  : {
                      username:
                        result.body.jobReleaseTask?.containerSettings
                          ?.registry?.["username"],
                      password:
                        result.body.jobReleaseTask?.containerSettings
                          ?.registry?.["password"],
                      registryServer:
                        result.body.jobReleaseTask?.containerSettings
                          ?.registry?.["registryServer"],
                      identityReference: !result.body.jobReleaseTask
                        ?.containerSettings?.registry?.identityReference
                        ? undefined
                        : {
                            resourceId:
                              result.body.jobReleaseTask?.containerSettings
                                ?.registry?.identityReference?.["resourceId"],
                          },
                    },
                workingDirectory:
                  result.body.jobReleaseTask?.containerSettings?.[
                    "workingDirectory"
                  ],
              },
          resourceFiles: (
            result.body.jobReleaseTask?.["resourceFiles"] ?? []
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
          environmentSettings: (
            result.body.jobReleaseTask?.["environmentSettings"] ?? []
          ).map((p) => ({ name: p["name"], value: p["value"] })),
          maxWallClockTime: result.body.jobReleaseTask?.["maxWallClockTime"],
          retentionTime: result.body.jobReleaseTask?.["retentionTime"],
          userIdentity: !result.body.jobReleaseTask?.userIdentity
            ? undefined
            : {
                username:
                  result.body.jobReleaseTask?.userIdentity?.["username"],
                autoUser: !result.body.jobReleaseTask?.userIdentity?.autoUser
                  ? undefined
                  : {
                      scope:
                        result.body.jobReleaseTask?.userIdentity?.autoUser?.[
                          "scope"
                        ],
                      elevationLevel:
                        result.body.jobReleaseTask?.userIdentity?.autoUser?.[
                          "elevationLevel"
                        ],
                    },
              },
        },
    commonEnvironmentSettings: (
      result.body["commonEnvironmentSettings"] ?? []
    ).map((p) => ({ name: p["name"], value: p["value"] })),
    poolInfo: !result.body.poolInfo
      ? undefined
      : {
          poolId: result.body.poolInfo?.["poolId"],
          autoPoolSpecification: !result.body.poolInfo?.autoPoolSpecification
            ? undefined
            : {
                autoPoolIdPrefix:
                  result.body.poolInfo?.autoPoolSpecification?.[
                    "autoPoolIdPrefix"
                  ],
                poolLifetimeOption:
                  result.body.poolInfo?.autoPoolSpecification?.[
                    "poolLifetimeOption"
                  ],
                keepAlive:
                  result.body.poolInfo?.autoPoolSpecification?.["keepAlive"],
                pool: !result.body.poolInfo?.autoPoolSpecification?.pool
                  ? undefined
                  : {
                      displayName:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "displayName"
                        ],
                      vmSize:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "vmSize"
                        ],
                      cloudServiceConfiguration: !result.body.poolInfo
                        ?.autoPoolSpecification?.pool?.cloudServiceConfiguration
                        ? undefined
                        : {
                            osFamily:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.cloudServiceConfiguration?.["osFamily"],
                            osVersion:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.cloudServiceConfiguration?.["osVersion"],
                          },
                      virtualMachineConfiguration: !result.body.poolInfo
                        ?.autoPoolSpecification?.pool
                        ?.virtualMachineConfiguration
                        ? undefined
                        : {
                            imageReference: {
                              publisher:
                                result.body.poolInfo?.autoPoolSpecification
                                  ?.pool?.virtualMachineConfiguration
                                  ?.imageReference["publisher"],
                              offer:
                                result.body.poolInfo?.autoPoolSpecification
                                  ?.pool?.virtualMachineConfiguration
                                  ?.imageReference["offer"],
                              sku: result.body.poolInfo?.autoPoolSpecification
                                ?.pool?.virtualMachineConfiguration
                                ?.imageReference["sku"],
                              version:
                                result.body.poolInfo?.autoPoolSpecification
                                  ?.pool?.virtualMachineConfiguration
                                  ?.imageReference["version"],
                              virtualMachineImageId:
                                result.body.poolInfo?.autoPoolSpecification
                                  ?.pool?.virtualMachineConfiguration
                                  ?.imageReference["virtualMachineImageId"],
                              exactVersion:
                                result.body.poolInfo?.autoPoolSpecification
                                  ?.pool?.virtualMachineConfiguration
                                  ?.imageReference["exactVersion"],
                            },
                            nodeAgentSKUId:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration?.[
                                "nodeAgentSKUId"
                              ],
                            windowsConfiguration: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool
                              ?.virtualMachineConfiguration
                              ?.windowsConfiguration
                              ? undefined
                              : {
                                  enableAutomaticUpdates:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.virtualMachineConfiguration
                                      ?.windowsConfiguration?.[
                                      "enableAutomaticUpdates"
                                    ],
                                },
                            dataDisks: (
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration?.["dataDisks"] ??
                              []
                            ).map((p) => ({
                              lun: p["lun"],
                              caching: p["caching"],
                              diskSizeGB: p["diskSizeGB"],
                              storageAccountType: p["storageAccountType"],
                            })),
                            licenseType:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration?.["licenseType"],
                            containerConfiguration: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool
                              ?.virtualMachineConfiguration
                              ?.containerConfiguration
                              ? undefined
                              : {
                                  type: result.body.poolInfo
                                    ?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.containerConfiguration?.["type"],
                                  containerImageNames:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.virtualMachineConfiguration
                                      ?.containerConfiguration?.[
                                      "containerImageNames"
                                    ],
                                  containerRegistries: (
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.virtualMachineConfiguration
                                      ?.containerConfiguration?.[
                                      "containerRegistries"
                                    ] ?? []
                                  ).map((p) => ({
                                    username: p["username"],
                                    password: p["password"],
                                    registryServer: p["registryServer"],
                                    identityReference: !p.identityReference
                                      ? undefined
                                      : {
                                          resourceId:
                                            p.identityReference?.["resourceId"],
                                        },
                                  })),
                                },
                            diskEncryptionConfiguration: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool
                              ?.virtualMachineConfiguration
                              ?.diskEncryptionConfiguration
                              ? undefined
                              : {
                                  targets:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.virtualMachineConfiguration
                                      ?.diskEncryptionConfiguration?.[
                                      "targets"
                                    ],
                                },
                            nodePlacementConfiguration: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool
                              ?.virtualMachineConfiguration
                              ?.nodePlacementConfiguration
                              ? undefined
                              : {
                                  policy:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.virtualMachineConfiguration
                                      ?.nodePlacementConfiguration?.["policy"],
                                },
                            extensions: (
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration?.["extensions"] ??
                              []
                            ).map((p) => ({
                              name: p["name"],
                              publisher: p["publisher"],
                              type: p["type"],
                              typeHandlerVersion: p["typeHandlerVersion"],
                              autoUpgradeMinorVersion:
                                p["autoUpgradeMinorVersion"],
                              settings: !p.settings ? undefined : {},
                              protectedSettings: !p.protectedSettings
                                ? undefined
                                : {},
                              provisionAfterExtensions:
                                p["provisionAfterExtensions"],
                            })),
                            osDisk: !result.body.poolInfo?.autoPoolSpecification
                              ?.pool?.virtualMachineConfiguration?.osDisk
                              ? undefined
                              : {
                                  ephemeralOSDiskSettings: !result.body.poolInfo
                                    ?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration?.osDisk
                                    ?.ephemeralOSDiskSettings
                                    ? undefined
                                    : {
                                        placement:
                                          result.body.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.virtualMachineConfiguration
                                            ?.osDisk?.ephemeralOSDiskSettings?.[
                                            "placement"
                                          ],
                                      },
                                },
                          },
                      taskSlotsPerNode:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "taskSlotsPerNode"
                        ],
                      taskSchedulingPolicy: !result.body.poolInfo
                        ?.autoPoolSpecification?.pool?.taskSchedulingPolicy
                        ? undefined
                        : {
                            nodeFillType:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.taskSchedulingPolicy?.["nodeFillType"],
                          },
                      resizeTimeout:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "resizeTimeout"
                        ],
                      targetDedicatedNodes:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "targetDedicatedNodes"
                        ],
                      targetLowPriorityNodes:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "targetLowPriorityNodes"
                        ],
                      enableAutoScale:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "enableAutoScale"
                        ],
                      autoScaleFormula:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "autoScaleFormula"
                        ],
                      autoScaleEvaluationInterval:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "autoScaleEvaluationInterval"
                        ],
                      enableInterNodeCommunication:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "enableInterNodeCommunication"
                        ],
                      networkConfiguration: !result.body.poolInfo
                        ?.autoPoolSpecification?.pool?.networkConfiguration
                        ? undefined
                        : {
                            subnetId:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.networkConfiguration?.["subnetId"],
                            dynamicVNetAssignmentScope:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.networkConfiguration?.[
                                "dynamicVNetAssignmentScope"
                              ],
                            endpointConfiguration: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool
                              ?.networkConfiguration?.endpointConfiguration
                              ? undefined
                              : {
                                  inboundNATPools: (
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.networkConfiguration
                                      ?.endpointConfiguration?.[
                                      "inboundNATPools"
                                    ] ?? []
                                  ).map((p) => ({
                                    name: p["name"],
                                    protocol: p["protocol"],
                                    backendPort: p["backendPort"],
                                    frontendPortRangeStart:
                                      p["frontendPortRangeStart"],
                                    frontendPortRangeEnd:
                                      p["frontendPortRangeEnd"],
                                    networkSecurityGroupRules: (
                                      p["networkSecurityGroupRules"] ?? []
                                    ).map((p) => ({
                                      priority: p["priority"],
                                      access: p["access"],
                                      sourceAddressPrefix:
                                        p["sourceAddressPrefix"],
                                      sourcePortRanges: p["sourcePortRanges"],
                                    })),
                                  })),
                                },
                            publicIPAddressConfiguration: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool
                              ?.networkConfiguration
                              ?.publicIPAddressConfiguration
                              ? undefined
                              : {
                                  provision:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.networkConfiguration
                                      ?.publicIPAddressConfiguration?.[
                                      "provision"
                                    ],
                                  ipAddressIds:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.networkConfiguration
                                      ?.publicIPAddressConfiguration?.[
                                      "ipAddressIds"
                                    ],
                                },
                          },
                      startTask: !result.body.poolInfo?.autoPoolSpecification
                        ?.pool?.startTask
                        ? undefined
                        : {
                            commandLine:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.startTask?.["commandLine"],
                            containerSettings: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool?.startTask
                              ?.containerSettings
                              ? undefined
                              : {
                                  containerRunOptions:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.containerSettings?.[
                                      "containerRunOptions"
                                    ],
                                  imageName:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.containerSettings?.[
                                      "imageName"
                                    ],
                                  registry: !result.body.poolInfo
                                    ?.autoPoolSpecification?.pool?.startTask
                                    ?.containerSettings?.registry
                                    ? undefined
                                    : {
                                        username:
                                          result.body.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.startTask?.containerSettings
                                            ?.registry?.["username"],
                                        password:
                                          result.body.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.startTask?.containerSettings
                                            ?.registry?.["password"],
                                        registryServer:
                                          result.body.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.startTask?.containerSettings
                                            ?.registry?.["registryServer"],
                                        identityReference: !result.body.poolInfo
                                          ?.autoPoolSpecification?.pool
                                          ?.startTask?.containerSettings
                                          ?.registry?.identityReference
                                          ? undefined
                                          : {
                                              resourceId:
                                                result.body.poolInfo
                                                  ?.autoPoolSpecification?.pool
                                                  ?.startTask?.containerSettings
                                                  ?.registry
                                                  ?.identityReference?.[
                                                  "resourceId"
                                                ],
                                            },
                                      },
                                  workingDirectory:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.containerSettings?.[
                                      "workingDirectory"
                                    ],
                                },
                            resourceFiles: (
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.startTask?.["resourceFiles"] ?? []
                            ).map((p) => ({
                              autoStorageContainerName:
                                p["autoStorageContainerName"],
                              storageContainerUrl: p["storageContainerUrl"],
                              httpUrl: p["httpUrl"],
                              blobPrefix: p["blobPrefix"],
                              filePath: p["filePath"],
                              fileMode: p["fileMode"],
                              identityReference: !p.identityReference
                                ? undefined
                                : {
                                    resourceId:
                                      p.identityReference?.["resourceId"],
                                  },
                            })),
                            environmentSettings: (
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.startTask?.["environmentSettings"] ?? []
                            ).map((p) => ({
                              name: p["name"],
                              value: p["value"],
                            })),
                            userIdentity: !result.body.poolInfo
                              ?.autoPoolSpecification?.pool?.startTask
                              ?.userIdentity
                              ? undefined
                              : {
                                  username:
                                    result.body.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.userIdentity?.[
                                      "username"
                                    ],
                                  autoUser: !result.body.poolInfo
                                    ?.autoPoolSpecification?.pool?.startTask
                                    ?.userIdentity?.autoUser
                                    ? undefined
                                    : {
                                        scope:
                                          result.body.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.startTask?.userIdentity
                                            ?.autoUser?.["scope"],
                                        elevationLevel:
                                          result.body.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.startTask?.userIdentity
                                            ?.autoUser?.["elevationLevel"],
                                      },
                                },
                            maxTaskRetryCount:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.startTask?.["maxTaskRetryCount"],
                            waitForSuccess:
                              result.body.poolInfo?.autoPoolSpecification?.pool
                                ?.startTask?.["waitForSuccess"],
                          },
                      certificateReferences: (
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "certificateReferences"
                        ] ?? []
                      ).map((p) => ({
                        thumbprint: p["thumbprint"],
                        thumbprintAlgorithm: p["thumbprintAlgorithm"],
                        storeLocation: p["storeLocation"],
                        storeName: p["storeName"],
                        visibility: p["visibility"],
                      })),
                      applicationPackageReferences: (
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "applicationPackageReferences"
                        ] ?? []
                      ).map((p) => ({
                        applicationId: p["applicationId"],
                        version: p["version"],
                      })),
                      applicationLicenses:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "applicationLicenses"
                        ],
                      userAccounts: (
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "userAccounts"
                        ] ?? []
                      ).map((p) => ({
                        name: p["name"],
                        password: p["password"],
                        elevationLevel: p["elevationLevel"],
                        linuxUserConfiguration: !p.linuxUserConfiguration
                          ? undefined
                          : {
                              uid: p.linuxUserConfiguration?.["uid"],
                              gid: p.linuxUserConfiguration?.["gid"],
                              sshPrivateKey:
                                p.linuxUserConfiguration?.["sshPrivateKey"],
                            },
                        windowsUserConfiguration: !p.windowsUserConfiguration
                          ? undefined
                          : {
                              loginMode:
                                p.windowsUserConfiguration?.["loginMode"],
                            },
                      })),
                      metadata: (
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "metadata"
                        ] ?? []
                      ).map((p) => ({ name: p["name"], value: p["value"] })),
                      mountConfiguration: (
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "mountConfiguration"
                        ] ?? []
                      ).map((p) => ({
                        azureBlobFileSystemConfiguration:
                          !p.azureBlobFileSystemConfiguration
                            ? undefined
                            : {
                                accountName:
                                  p.azureBlobFileSystemConfiguration?.[
                                    "accountName"
                                  ],
                                containerName:
                                  p.azureBlobFileSystemConfiguration?.[
                                    "containerName"
                                  ],
                                accountKey:
                                  p.azureBlobFileSystemConfiguration?.[
                                    "accountKey"
                                  ],
                                sasKey:
                                  p.azureBlobFileSystemConfiguration?.[
                                    "sasKey"
                                  ],
                                blobfuseOptions:
                                  p.azureBlobFileSystemConfiguration?.[
                                    "blobfuseOptions"
                                  ],
                                relativeMountPath:
                                  p.azureBlobFileSystemConfiguration?.[
                                    "relativeMountPath"
                                  ],
                                identityReference: !p
                                  .azureBlobFileSystemConfiguration
                                  ?.identityReference
                                  ? undefined
                                  : {
                                      resourceId:
                                        p.azureBlobFileSystemConfiguration
                                          ?.identityReference?.["resourceId"],
                                    },
                              },
                        nfsMountConfiguration: !p.nfsMountConfiguration
                          ? undefined
                          : {
                              source: p.nfsMountConfiguration?.["source"],
                              relativeMountPath:
                                p.nfsMountConfiguration?.["relativeMountPath"],
                              mountOptions:
                                p.nfsMountConfiguration?.["mountOptions"],
                            },
                        cifsMountConfiguration: !p.cifsMountConfiguration
                          ? undefined
                          : {
                              username: p.cifsMountConfiguration?.["username"],
                              source: p.cifsMountConfiguration?.["source"],
                              relativeMountPath:
                                p.cifsMountConfiguration?.["relativeMountPath"],
                              mountOptions:
                                p.cifsMountConfiguration?.["mountOptions"],
                              password: p.cifsMountConfiguration?.["password"],
                            },
                        azureFileShareConfiguration:
                          !p.azureFileShareConfiguration
                            ? undefined
                            : {
                                accountName:
                                  p.azureFileShareConfiguration?.[
                                    "accountName"
                                  ],
                                azureFileUrl:
                                  p.azureFileShareConfiguration?.[
                                    "azureFileUrl"
                                  ],
                                accountKey:
                                  p.azureFileShareConfiguration?.["accountKey"],
                                relativeMountPath:
                                  p.azureFileShareConfiguration?.[
                                    "relativeMountPath"
                                  ],
                                mountOptions:
                                  p.azureFileShareConfiguration?.[
                                    "mountOptions"
                                  ],
                              },
                      })),
                      targetNodeCommunicationMode:
                        result.body.poolInfo?.autoPoolSpecification?.pool?.[
                          "targetNodeCommunicationMode"
                        ],
                    },
              },
        },
    onAllTasksComplete: result.body["onAllTasksComplete"],
    onTaskFailure: result.body["onTaskFailure"],
    networkConfiguration: !result.body.networkConfiguration
      ? undefined
      : { subnetId: result.body.networkConfiguration?.["subnetId"] },
    metadata: (result.body["metadata"] ?? []).map((p) => ({
      name: p["name"],
      value: p["value"],
    })),
    executionInfo: !result.body.executionInfo
      ? undefined
      : {
          startTime: new Date(result.body.executionInfo?.["startTime"] ?? ""),
          endTime: new Date(result.body.executionInfo?.["endTime"] ?? ""),
          poolId: result.body.executionInfo?.["poolId"],
          schedulingError: !result.body.executionInfo?.schedulingError
            ? undefined
            : {
                category:
                  result.body.executionInfo?.schedulingError?.["category"],
                code: result.body.executionInfo?.schedulingError?.["code"],
                message:
                  result.body.executionInfo?.schedulingError?.["message"],
                details: (
                  result.body.executionInfo?.schedulingError?.["details"] ?? []
                ).map((p) => ({ name: p["name"], value: p["value"] })),
              },
          terminateReason: result.body.executionInfo?.["terminateReason"],
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
          numSucceededTasks: result.body.stats?.["numSucceededTasks"],
          numFailedTasks: result.body.stats?.["numFailedTasks"],
          numTaskRetries: result.body.stats?.["numTaskRetries"],
          waitTime: result.body.stats?.["waitTime"],
        },
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface JobupdateJobOptions extends RequestParametersCommon {
  /**
   * The ID is case-preserving and case-insensitive (that is, you may not have two
   * IDs within an Account that differ only by case).
   */
  id?: string;
  /** The display name for the Job. */
  displayName?: string;
  /**
   * Whether Tasks in the Job can define dependencies on each other. The default is
   * false.
   */
  usesTaskDependencies?: boolean;
  /** The URL of the Job. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Job has changed
   * between requests. In particular, you can be pass the ETag when updating a Job
   * to specify that your changes should take effect only if nobody else has
   * modified the Job in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the Job level data, such as the Job state or
   * priority, changed. It does not factor in task-level changes such as adding new
   * Tasks or Tasks changing state.
   */
  lastModified?: Date;
  /** The creation time of the Job. */
  creationTime?: Date;
  /** The state of the Job. */
  state?: JobState;
  /** The time at which the Job entered its current state. */
  stateTransitionTime?: Date;
  /** This property is not set if the Job is in its initial Active state. */
  previousState?: JobState;
  /** This property is not set if the Job is in its initial Active state. */
  previousStateTransitionTime?: Date;
  /**
   * Priority values can range from -1000 to 1000, with -1000 being the lowest
   * priority and 1000 being the highest priority. The default value is 0.
   */
  priority?: number;
  /**
   * If the value is set to True, other high priority jobs submitted to the system
   * will take precedence and will be able requeue tasks from this job. You can
   * update a job's allowTaskPreemption after it has been created using the update
   * job API.
   */
  allowTaskPreemption?: boolean;
  /**
   * The value of maxParallelTasks must be -1 or greater than 0 if specified. If not
   * specified, the default value is -1, which means there's no limit to the number
   * of tasks that can be run at once. You can update a job's maxParallelTasks after
   * it has been created using the update job API.
   */
  maxParallelTasks?: number;
  /** The execution constraints for a Job. */
  constraints?: JobConstraints;
  /**
   * The Job Manager Task is automatically started when the Job is created. The
   * Batch service tries to schedule the Job Manager Task before any other Tasks in
   * the Job. When shrinking a Pool, the Batch service tries to preserve Nodes where
   * Job Manager Tasks are running for as long as possible (that is, Compute Nodes
   * running 'normal' Tasks are removed before Compute Nodes running Job Manager
   * Tasks). When a Job Manager Task fails and needs to be restarted, the system
   * tries to schedule it at the highest priority. If there are no idle Compute
   * Nodes available, the system may terminate one of the running Tasks in the Pool
   * and return it to the queue in order to make room for the Job Manager Task to
   * restart. Note that a Job Manager Task in one Job does not have priority over
   * Tasks in other Jobs. Across Jobs, only Job level priorities are observed. For
   * example, if a Job Manager in a priority 0 Job needs to be restarted, it will
   * not displace Tasks of a priority 1 Job. Batch will retry Tasks when a recovery
   * operation is triggered on a Node. Examples of recovery operations include (but
   * are not limited to) when an unhealthy Node is rebooted or a Compute Node
   * disappeared due to host failure. Retries due to recovery operations are
   * independent of and are not counted against the maxTaskRetryCount. Even if the
   * maxTaskRetryCount is 0, an internal retry due to a recovery operation may
   * occur. Because of this, all Tasks should be idempotent. This means Tasks need
   * to tolerate being interrupted and restarted without causing any corruption or
   * duplicate data. The best practice for long running Tasks is to use some form of
   * checkpointing.
   */
  jobManagerTask?: JobManagerTask;
  /**
   * The Job Preparation Task is a special Task run on each Compute Node before any
   * other Task of the Job.
   */
  jobPreparationTask?: JobPreparationTask;
  /**
   * The Job Release Task is a special Task run at the end of the Job on each
   * Compute Node that has run any other Task of the Job.
   */
  jobReleaseTask?: JobReleaseTask;
  /**
   * Individual Tasks can override an environment setting specified here by
   * specifying the same setting name with a different value.
   */
  commonEnvironmentSettings?: EnvironmentSetting[];
  /** Specifies how a Job should be assigned to a Pool. */
  poolInfo?: PoolInformation;
  /** The default is noaction. */
  onAllTasksComplete?: OnAllTasksComplete;
  /**
   * A Task is considered to have failed if has a failureInfo. A failureInfo is set
   * if the Task completes with a non-zero exit code after exhausting its retry
   * count, or if there was an error starting the Task, for example due to a
   * resource file download error. The default is noaction.
   */
  onTaskFailure?: OnTaskFailure;
  /** The network configuration for the Job. */
  networkConfiguration?: JobNetworkConfiguration;
  /**
   * The Batch service does not assign any meaning to metadata; it is solely for the
   * use of user code.
   */
  metadata?: MetadataItem[];
  /** Contains information about the execution of a Job in the Azure Batch service. */
  executionInfo?: JobExecutionInformation;
  /**
   * This property is populated only if the CloudJob was retrieved with an expand
   * clause including the 'stats' attribute; otherwise it is null. The statistics
   * may not be immediately available. The Batch service performs periodic roll-up
   * of statistics. The typical delay is about 30 minutes.
   */
  stats?: JobStatistics;
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

/**
 * This replaces only the Job properties specified in the request. For example, if
 * the Job has constraints, and a request does not specify the constraints
 * element, then the Job keeps the existing constraints.
 */
export async function updateJob(
  context: Client,
  jobId: string,
  options: JobupdateJobOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs/{jobId}", jobId).patch({
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
      ...(options.priority && { priority: options.priority }),
      ...(options.allowTaskPreemption && {
        allowTaskPreemption: options.allowTaskPreemption,
      }),
      ...(options.maxParallelTasks && {
        maxParallelTasks: options.maxParallelTasks,
      }),
      ...(options.constraints && { constraints: options.constraints }),
      ...(options.poolInfo && { poolInfo: options.poolInfo }),
      ...(options.onAllTasksComplete && {
        onAllTasksComplete: options.onAllTasksComplete,
      }),
      ...(options.metadata && { metadata: options.metadata }),
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

export interface JobreplaceJobOptions extends RequestParametersCommon {
  /**
   * The ID is case-preserving and case-insensitive (that is, you may not have two
   * IDs within an Account that differ only by case).
   */
  id?: string;
  /** The display name for the Job. */
  displayName?: string;
  /**
   * Whether Tasks in the Job can define dependencies on each other. The default is
   * false.
   */
  usesTaskDependencies?: boolean;
  /** The URL of the Job. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Job has changed
   * between requests. In particular, you can be pass the ETag when updating a Job
   * to specify that your changes should take effect only if nobody else has
   * modified the Job in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the Job level data, such as the Job state or
   * priority, changed. It does not factor in task-level changes such as adding new
   * Tasks or Tasks changing state.
   */
  lastModified?: Date;
  /** The creation time of the Job. */
  creationTime?: Date;
  /** The state of the Job. */
  state?: JobState;
  /** The time at which the Job entered its current state. */
  stateTransitionTime?: Date;
  /** This property is not set if the Job is in its initial Active state. */
  previousState?: JobState;
  /** This property is not set if the Job is in its initial Active state. */
  previousStateTransitionTime?: Date;
  /**
   * Priority values can range from -1000 to 1000, with -1000 being the lowest
   * priority and 1000 being the highest priority. The default value is 0.
   */
  priority?: number;
  /**
   * If the value is set to True, other high priority jobs submitted to the system
   * will take precedence and will be able requeue tasks from this job. You can
   * update a job's allowTaskPreemption after it has been created using the update
   * job API.
   */
  allowTaskPreemption?: boolean;
  /**
   * The value of maxParallelTasks must be -1 or greater than 0 if specified. If not
   * specified, the default value is -1, which means there's no limit to the number
   * of tasks that can be run at once. You can update a job's maxParallelTasks after
   * it has been created using the update job API.
   */
  maxParallelTasks?: number;
  /** The execution constraints for a Job. */
  constraints?: JobConstraints;
  /**
   * The Job Manager Task is automatically started when the Job is created. The
   * Batch service tries to schedule the Job Manager Task before any other Tasks in
   * the Job. When shrinking a Pool, the Batch service tries to preserve Nodes where
   * Job Manager Tasks are running for as long as possible (that is, Compute Nodes
   * running 'normal' Tasks are removed before Compute Nodes running Job Manager
   * Tasks). When a Job Manager Task fails and needs to be restarted, the system
   * tries to schedule it at the highest priority. If there are no idle Compute
   * Nodes available, the system may terminate one of the running Tasks in the Pool
   * and return it to the queue in order to make room for the Job Manager Task to
   * restart. Note that a Job Manager Task in one Job does not have priority over
   * Tasks in other Jobs. Across Jobs, only Job level priorities are observed. For
   * example, if a Job Manager in a priority 0 Job needs to be restarted, it will
   * not displace Tasks of a priority 1 Job. Batch will retry Tasks when a recovery
   * operation is triggered on a Node. Examples of recovery operations include (but
   * are not limited to) when an unhealthy Node is rebooted or a Compute Node
   * disappeared due to host failure. Retries due to recovery operations are
   * independent of and are not counted against the maxTaskRetryCount. Even if the
   * maxTaskRetryCount is 0, an internal retry due to a recovery operation may
   * occur. Because of this, all Tasks should be idempotent. This means Tasks need
   * to tolerate being interrupted and restarted without causing any corruption or
   * duplicate data. The best practice for long running Tasks is to use some form of
   * checkpointing.
   */
  jobManagerTask?: JobManagerTask;
  /**
   * The Job Preparation Task is a special Task run on each Compute Node before any
   * other Task of the Job.
   */
  jobPreparationTask?: JobPreparationTask;
  /**
   * The Job Release Task is a special Task run at the end of the Job on each
   * Compute Node that has run any other Task of the Job.
   */
  jobReleaseTask?: JobReleaseTask;
  /**
   * Individual Tasks can override an environment setting specified here by
   * specifying the same setting name with a different value.
   */
  commonEnvironmentSettings?: EnvironmentSetting[];
  /** Specifies how a Job should be assigned to a Pool. */
  poolInfo?: PoolInformation;
  /** The default is noaction. */
  onAllTasksComplete?: OnAllTasksComplete;
  /**
   * A Task is considered to have failed if has a failureInfo. A failureInfo is set
   * if the Task completes with a non-zero exit code after exhausting its retry
   * count, or if there was an error starting the Task, for example due to a
   * resource file download error. The default is noaction.
   */
  onTaskFailure?: OnTaskFailure;
  /** The network configuration for the Job. */
  networkConfiguration?: JobNetworkConfiguration;
  /**
   * The Batch service does not assign any meaning to metadata; it is solely for the
   * use of user code.
   */
  metadata?: MetadataItem[];
  /** Contains information about the execution of a Job in the Azure Batch service. */
  executionInfo?: JobExecutionInformation;
  /**
   * This property is populated only if the CloudJob was retrieved with an expand
   * clause including the 'stats' attribute; otherwise it is null. The statistics
   * may not be immediately available. The Batch service performs periodic roll-up
   * of statistics. The typical delay is about 30 minutes.
   */
  stats?: JobStatistics;
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

/**
 * This fully replaces all the updatable properties of the Job. For example, if
 * the Job has constraints associated with it and if constraints is not specified
 * with this request, then the Batch service will remove the existing constraints.
 */
export async function replaceJob(
  context: Client,
  jobId: string,
  options: JobreplaceJobOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs/{jobId}", jobId).put({
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
      ...(options.priority && { priority: options.priority }),
      ...(options.allowTaskPreemption && {
        allowTaskPreemption: options.allowTaskPreemption,
      }),
      ...(options.maxParallelTasks && {
        maxParallelTasks: options.maxParallelTasks,
      }),
      ...(options.constraints && { constraints: options.constraints }),
      ...(options.poolInfo && { poolInfo: options.poolInfo }),
      ...(options.onAllTasksComplete && {
        onAllTasksComplete: options.onAllTasksComplete,
      }),
      ...(options.metadata && { metadata: options.metadata }),
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

export interface JobdisableJobOptions extends RequestParametersCommon {
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
export async function disableJob(
  context: Client,
  disableTasks: DisableJobOption,
  jobId: string,
  options: JobdisableJobOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs/{jobId}/disable", jobId).post({
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
    body: { disableTasks: disableTasks },
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

export interface JobenableJobOptions extends RequestParametersCommon {
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
 * When you call this API, the Batch service sets a disabled Job to the enabling
 * state. After the this operation is completed, the Job moves to the active
 * state, and scheduling of new Tasks under the Job resumes. The Batch service
 * does not allow a Task to remain in the active state for more than 180 days.
 * Therefore, if you enable a Job containing active Tasks which were added more
 * than 180 days ago, those Tasks will not run.
 */
export async function enableJob(
  context: Client,
  jobId: string,
  options: JobenableJobOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs/{jobId}/enable", jobId).post({
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

export interface JobterminateJobOptions extends RequestParametersCommon {
  /**
   * The text you want to appear as the Job's TerminateReason. The default is
   * 'UserTerminate'.
   */
  terminateReason?: string;
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

/**
 * When a Terminate Job request is received, the Batch service sets the Job to the
 * terminating state. The Batch service then terminates any running Tasks
 * associated with the Job and runs any required Job release Tasks. Then the Job
 * moves into the completed state. If there are any Tasks in the Job in the active
 * state, they will remain in the active state. Once a Job is terminated, new
 * Tasks cannot be added and any remaining active Tasks will not be scheduled.
 */
export async function terminateJob(
  context: Client,
  jobId: string,
  options: JobterminateJobOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs/{jobId}/terminate", jobId).post({
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
      ...(options.terminateReason && {
        terminateReason: options.terminateReason,
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

export interface JobaddJobOptions extends RequestParametersCommon {
  /**
   * The ID is case-preserving and case-insensitive (that is, you may not have two
   * IDs within an Account that differ only by case).
   */
  id?: string;
  /** The display name for the Job. */
  displayName?: string;
  /**
   * Whether Tasks in the Job can define dependencies on each other. The default is
   * false.
   */
  usesTaskDependencies?: boolean;
  /** The URL of the Job. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Job has changed
   * between requests. In particular, you can be pass the ETag when updating a Job
   * to specify that your changes should take effect only if nobody else has
   * modified the Job in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the Job level data, such as the Job state or
   * priority, changed. It does not factor in task-level changes such as adding new
   * Tasks or Tasks changing state.
   */
  lastModified?: Date;
  /** The creation time of the Job. */
  creationTime?: Date;
  /** The state of the Job. */
  state?: JobState;
  /** The time at which the Job entered its current state. */
  stateTransitionTime?: Date;
  /** This property is not set if the Job is in its initial Active state. */
  previousState?: JobState;
  /** This property is not set if the Job is in its initial Active state. */
  previousStateTransitionTime?: Date;
  /**
   * Priority values can range from -1000 to 1000, with -1000 being the lowest
   * priority and 1000 being the highest priority. The default value is 0.
   */
  priority?: number;
  /**
   * If the value is set to True, other high priority jobs submitted to the system
   * will take precedence and will be able requeue tasks from this job. You can
   * update a job's allowTaskPreemption after it has been created using the update
   * job API.
   */
  allowTaskPreemption?: boolean;
  /**
   * The value of maxParallelTasks must be -1 or greater than 0 if specified. If not
   * specified, the default value is -1, which means there's no limit to the number
   * of tasks that can be run at once. You can update a job's maxParallelTasks after
   * it has been created using the update job API.
   */
  maxParallelTasks?: number;
  /** The execution constraints for a Job. */
  constraints?: JobConstraints;
  /**
   * The Job Manager Task is automatically started when the Job is created. The
   * Batch service tries to schedule the Job Manager Task before any other Tasks in
   * the Job. When shrinking a Pool, the Batch service tries to preserve Nodes where
   * Job Manager Tasks are running for as long as possible (that is, Compute Nodes
   * running 'normal' Tasks are removed before Compute Nodes running Job Manager
   * Tasks). When a Job Manager Task fails and needs to be restarted, the system
   * tries to schedule it at the highest priority. If there are no idle Compute
   * Nodes available, the system may terminate one of the running Tasks in the Pool
   * and return it to the queue in order to make room for the Job Manager Task to
   * restart. Note that a Job Manager Task in one Job does not have priority over
   * Tasks in other Jobs. Across Jobs, only Job level priorities are observed. For
   * example, if a Job Manager in a priority 0 Job needs to be restarted, it will
   * not displace Tasks of a priority 1 Job. Batch will retry Tasks when a recovery
   * operation is triggered on a Node. Examples of recovery operations include (but
   * are not limited to) when an unhealthy Node is rebooted or a Compute Node
   * disappeared due to host failure. Retries due to recovery operations are
   * independent of and are not counted against the maxTaskRetryCount. Even if the
   * maxTaskRetryCount is 0, an internal retry due to a recovery operation may
   * occur. Because of this, all Tasks should be idempotent. This means Tasks need
   * to tolerate being interrupted and restarted without causing any corruption or
   * duplicate data. The best practice for long running Tasks is to use some form of
   * checkpointing.
   */
  jobManagerTask?: JobManagerTask;
  /**
   * The Job Preparation Task is a special Task run on each Compute Node before any
   * other Task of the Job.
   */
  jobPreparationTask?: JobPreparationTask;
  /**
   * The Job Release Task is a special Task run at the end of the Job on each
   * Compute Node that has run any other Task of the Job.
   */
  jobReleaseTask?: JobReleaseTask;
  /**
   * Individual Tasks can override an environment setting specified here by
   * specifying the same setting name with a different value.
   */
  commonEnvironmentSettings?: EnvironmentSetting[];
  /** Specifies how a Job should be assigned to a Pool. */
  poolInfo?: PoolInformation;
  /** The default is noaction. */
  onAllTasksComplete?: OnAllTasksComplete;
  /**
   * A Task is considered to have failed if has a failureInfo. A failureInfo is set
   * if the Task completes with a non-zero exit code after exhausting its retry
   * count, or if there was an error starting the Task, for example due to a
   * resource file download error. The default is noaction.
   */
  onTaskFailure?: OnTaskFailure;
  /** The network configuration for the Job. */
  networkConfiguration?: JobNetworkConfiguration;
  /**
   * The Batch service does not assign any meaning to metadata; it is solely for the
   * use of user code.
   */
  metadata?: MetadataItem[];
  /** Contains information about the execution of a Job in the Azure Batch service. */
  executionInfo?: JobExecutionInformation;
  /**
   * This property is populated only if the CloudJob was retrieved with an expand
   * clause including the 'stats' attribute; otherwise it is null. The statistics
   * may not be immediately available. The Batch service performs periodic roll-up
   * of statistics. The typical delay is about 30 minutes.
   */
  stats?: JobStatistics;
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
export async function addJob(
  context: Client,
  options: JobaddJobOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobs").post({
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
      ...(options.priority && { priority: options.priority }),
      ...(options.allowTaskPreemption && {
        allowTaskPreemption: options.allowTaskPreemption,
      }),
      ...(options.maxParallelTasks && {
        maxParallelTasks: options.maxParallelTasks,
      }),
      ...(options.constraints && { constraints: options.constraints }),
      ...(options.poolInfo && { poolInfo: options.poolInfo }),
      ...(options.onAllTasksComplete && {
        onAllTasksComplete: options.onAllTasksComplete,
      }),
      ...(options.metadata && { metadata: options.metadata }),
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

export interface JoblistJobsOptions extends RequestParametersCommon {
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
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-jobs.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

/** Lists all of the Jobs in the specified Account. */
export async function listJobs(
  context: Client,
  options: JoblistJobsOptions = { requestOptions: {} }
): Promise<BatchJobListResult> {
  const result = await context.path("/jobs").get({
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
      usesTaskDependencies: p["usesTaskDependencies"],
      url: p["url"],
      eTag: p["eTag"],
      lastModified: new Date(p["lastModified"] ?? ""),
      creationTime: new Date(p["creationTime"] ?? ""),
      state: p["state"],
      stateTransitionTime: new Date(p["stateTransitionTime"] ?? ""),
      previousState: p["previousState"],
      previousStateTransitionTime: new Date(
        p["previousStateTransitionTime"] ?? ""
      ),
      priority: p["priority"],
      allowTaskPreemption: p["allowTaskPreemption"],
      maxParallelTasks: p["maxParallelTasks"],
      constraints: !p.constraints
        ? undefined
        : {
            maxWallClockTime: p.constraints?.["maxWallClockTime"],
            maxTaskRetryCount: p.constraints?.["maxTaskRetryCount"],
          },
      jobManagerTask: !p.jobManagerTask
        ? undefined
        : {
            id: p.jobManagerTask?.["id"],
            displayName: p.jobManagerTask?.["displayName"],
            commandLine: p.jobManagerTask?.["commandLine"],
            containerSettings: !p.jobManagerTask?.containerSettings
              ? undefined
              : {
                  containerRunOptions:
                    p.jobManagerTask?.containerSettings?.[
                      "containerRunOptions"
                    ],
                  imageName: p.jobManagerTask?.containerSettings?.["imageName"],
                  registry: !p.jobManagerTask?.containerSettings?.registry
                    ? undefined
                    : {
                        username:
                          p.jobManagerTask?.containerSettings?.registry?.[
                            "username"
                          ],
                        password:
                          p.jobManagerTask?.containerSettings?.registry?.[
                            "password"
                          ],
                        registryServer:
                          p.jobManagerTask?.containerSettings?.registry?.[
                            "registryServer"
                          ],
                        identityReference: !p.jobManagerTask?.containerSettings
                          ?.registry?.identityReference
                          ? undefined
                          : {
                              resourceId:
                                p.jobManagerTask?.containerSettings?.registry
                                  ?.identityReference?.["resourceId"],
                            },
                      },
                  workingDirectory:
                    p.jobManagerTask?.containerSettings?.["workingDirectory"],
                },
            resourceFiles: (p.jobManagerTask?.["resourceFiles"] ?? []).map(
              (p) => ({
                autoStorageContainerName: p["autoStorageContainerName"],
                storageContainerUrl: p["storageContainerUrl"],
                httpUrl: p["httpUrl"],
                blobPrefix: p["blobPrefix"],
                filePath: p["filePath"],
                fileMode: p["fileMode"],
                identityReference: !p.identityReference
                  ? undefined
                  : { resourceId: p.identityReference?.["resourceId"] },
              })
            ),
            outputFiles: (p.jobManagerTask?.["outputFiles"] ?? []).map((p) => ({
              filePattern: p["filePattern"],
              destination: {
                container: !p.destination.container
                  ? undefined
                  : {
                      path: p.destination.container?.["path"],
                      containerUrl: p.destination.container?.["containerUrl"],
                      identityReference: !p.destination.container
                        ?.identityReference
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
              uploadOptions: {
                uploadCondition: p.uploadOptions["uploadCondition"],
              },
            })),
            environmentSettings: (
              p.jobManagerTask?.["environmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            constraints: !p.jobManagerTask?.constraints
              ? undefined
              : {
                  maxWallClockTime:
                    p.jobManagerTask?.constraints?.["maxWallClockTime"],
                  retentionTime:
                    p.jobManagerTask?.constraints?.["retentionTime"],
                  maxTaskRetryCount:
                    p.jobManagerTask?.constraints?.["maxTaskRetryCount"],
                },
            requiredSlots: p.jobManagerTask?.["requiredSlots"],
            killJobOnCompletion: p.jobManagerTask?.["killJobOnCompletion"],
            userIdentity: !p.jobManagerTask?.userIdentity
              ? undefined
              : {
                  username: p.jobManagerTask?.userIdentity?.["username"],
                  autoUser: !p.jobManagerTask?.userIdentity?.autoUser
                    ? undefined
                    : {
                        scope:
                          p.jobManagerTask?.userIdentity?.autoUser?.["scope"],
                        elevationLevel:
                          p.jobManagerTask?.userIdentity?.autoUser?.[
                            "elevationLevel"
                          ],
                      },
                },
            runExclusive: p.jobManagerTask?.["runExclusive"],
            applicationPackageReferences: (
              p.jobManagerTask?.["applicationPackageReferences"] ?? []
            ).map((p) => ({
              applicationId: p["applicationId"],
              version: p["version"],
            })),
            authenticationTokenSettings: !p.jobManagerTask
              ?.authenticationTokenSettings
              ? undefined
              : {
                  access:
                    p.jobManagerTask?.authenticationTokenSettings?.["access"],
                },
            allowLowPriorityNode: p.jobManagerTask?.["allowLowPriorityNode"],
          },
      jobPreparationTask: !p.jobPreparationTask
        ? undefined
        : {
            id: p.jobPreparationTask?.["id"],
            commandLine: p.jobPreparationTask?.["commandLine"],
            containerSettings: !p.jobPreparationTask?.containerSettings
              ? undefined
              : {
                  containerRunOptions:
                    p.jobPreparationTask?.containerSettings?.[
                      "containerRunOptions"
                    ],
                  imageName:
                    p.jobPreparationTask?.containerSettings?.["imageName"],
                  registry: !p.jobPreparationTask?.containerSettings?.registry
                    ? undefined
                    : {
                        username:
                          p.jobPreparationTask?.containerSettings?.registry?.[
                            "username"
                          ],
                        password:
                          p.jobPreparationTask?.containerSettings?.registry?.[
                            "password"
                          ],
                        registryServer:
                          p.jobPreparationTask?.containerSettings?.registry?.[
                            "registryServer"
                          ],
                        identityReference: !p.jobPreparationTask
                          ?.containerSettings?.registry?.identityReference
                          ? undefined
                          : {
                              resourceId:
                                p.jobPreparationTask?.containerSettings
                                  ?.registry?.identityReference?.["resourceId"],
                            },
                      },
                  workingDirectory:
                    p.jobPreparationTask?.containerSettings?.[
                      "workingDirectory"
                    ],
                },
            resourceFiles: (p.jobPreparationTask?.["resourceFiles"] ?? []).map(
              (p) => ({
                autoStorageContainerName: p["autoStorageContainerName"],
                storageContainerUrl: p["storageContainerUrl"],
                httpUrl: p["httpUrl"],
                blobPrefix: p["blobPrefix"],
                filePath: p["filePath"],
                fileMode: p["fileMode"],
                identityReference: !p.identityReference
                  ? undefined
                  : { resourceId: p.identityReference?.["resourceId"] },
              })
            ),
            environmentSettings: (
              p.jobPreparationTask?.["environmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            constraints: !p.jobPreparationTask?.constraints
              ? undefined
              : {
                  maxWallClockTime:
                    p.jobPreparationTask?.constraints?.["maxWallClockTime"],
                  retentionTime:
                    p.jobPreparationTask?.constraints?.["retentionTime"],
                  maxTaskRetryCount:
                    p.jobPreparationTask?.constraints?.["maxTaskRetryCount"],
                },
            waitForSuccess: p.jobPreparationTask?.["waitForSuccess"],
            userIdentity: !p.jobPreparationTask?.userIdentity
              ? undefined
              : {
                  username: p.jobPreparationTask?.userIdentity?.["username"],
                  autoUser: !p.jobPreparationTask?.userIdentity?.autoUser
                    ? undefined
                    : {
                        scope:
                          p.jobPreparationTask?.userIdentity?.autoUser?.[
                            "scope"
                          ],
                        elevationLevel:
                          p.jobPreparationTask?.userIdentity?.autoUser?.[
                            "elevationLevel"
                          ],
                      },
                },
            rerunOnNodeRebootAfterSuccess:
              p.jobPreparationTask?.["rerunOnNodeRebootAfterSuccess"],
          },
      jobReleaseTask: !p.jobReleaseTask
        ? undefined
        : {
            id: p.jobReleaseTask?.["id"],
            commandLine: p.jobReleaseTask?.["commandLine"],
            containerSettings: !p.jobReleaseTask?.containerSettings
              ? undefined
              : {
                  containerRunOptions:
                    p.jobReleaseTask?.containerSettings?.[
                      "containerRunOptions"
                    ],
                  imageName: p.jobReleaseTask?.containerSettings?.["imageName"],
                  registry: !p.jobReleaseTask?.containerSettings?.registry
                    ? undefined
                    : {
                        username:
                          p.jobReleaseTask?.containerSettings?.registry?.[
                            "username"
                          ],
                        password:
                          p.jobReleaseTask?.containerSettings?.registry?.[
                            "password"
                          ],
                        registryServer:
                          p.jobReleaseTask?.containerSettings?.registry?.[
                            "registryServer"
                          ],
                        identityReference: !p.jobReleaseTask?.containerSettings
                          ?.registry?.identityReference
                          ? undefined
                          : {
                              resourceId:
                                p.jobReleaseTask?.containerSettings?.registry
                                  ?.identityReference?.["resourceId"],
                            },
                      },
                  workingDirectory:
                    p.jobReleaseTask?.containerSettings?.["workingDirectory"],
                },
            resourceFiles: (p.jobReleaseTask?.["resourceFiles"] ?? []).map(
              (p) => ({
                autoStorageContainerName: p["autoStorageContainerName"],
                storageContainerUrl: p["storageContainerUrl"],
                httpUrl: p["httpUrl"],
                blobPrefix: p["blobPrefix"],
                filePath: p["filePath"],
                fileMode: p["fileMode"],
                identityReference: !p.identityReference
                  ? undefined
                  : { resourceId: p.identityReference?.["resourceId"] },
              })
            ),
            environmentSettings: (
              p.jobReleaseTask?.["environmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            maxWallClockTime: p.jobReleaseTask?.["maxWallClockTime"],
            retentionTime: p.jobReleaseTask?.["retentionTime"],
            userIdentity: !p.jobReleaseTask?.userIdentity
              ? undefined
              : {
                  username: p.jobReleaseTask?.userIdentity?.["username"],
                  autoUser: !p.jobReleaseTask?.userIdentity?.autoUser
                    ? undefined
                    : {
                        scope:
                          p.jobReleaseTask?.userIdentity?.autoUser?.["scope"],
                        elevationLevel:
                          p.jobReleaseTask?.userIdentity?.autoUser?.[
                            "elevationLevel"
                          ],
                      },
                },
          },
      commonEnvironmentSettings: (p["commonEnvironmentSettings"] ?? []).map(
        (p) => ({ name: p["name"], value: p["value"] })
      ),
      poolInfo: !p.poolInfo
        ? undefined
        : {
            poolId: p.poolInfo?.["poolId"],
            autoPoolSpecification: !p.poolInfo?.autoPoolSpecification
              ? undefined
              : {
                  autoPoolIdPrefix:
                    p.poolInfo?.autoPoolSpecification?.["autoPoolIdPrefix"],
                  poolLifetimeOption:
                    p.poolInfo?.autoPoolSpecification?.["poolLifetimeOption"],
                  keepAlive: p.poolInfo?.autoPoolSpecification?.["keepAlive"],
                  pool: !p.poolInfo?.autoPoolSpecification?.pool
                    ? undefined
                    : {
                        displayName:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "displayName"
                          ],
                        vmSize:
                          p.poolInfo?.autoPoolSpecification?.pool?.["vmSize"],
                        cloudServiceConfiguration: !p.poolInfo
                          ?.autoPoolSpecification?.pool
                          ?.cloudServiceConfiguration
                          ? undefined
                          : {
                              osFamily:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.cloudServiceConfiguration?.["osFamily"],
                              osVersion:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.cloudServiceConfiguration?.["osVersion"],
                            },
                        virtualMachineConfiguration: !p.poolInfo
                          ?.autoPoolSpecification?.pool
                          ?.virtualMachineConfiguration
                          ? undefined
                          : {
                              imageReference: {
                                publisher:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["publisher"],
                                offer:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["offer"],
                                sku: p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.imageReference[
                                  "sku"
                                ],
                                version:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["version"],
                                virtualMachineImageId:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["virtualMachineImageId"],
                                exactVersion:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["exactVersion"],
                              },
                              nodeAgentSKUId:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "nodeAgentSKUId"
                                ],
                              windowsConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.windowsConfiguration
                                ? undefined
                                : {
                                    enableAutomaticUpdates:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.windowsConfiguration?.[
                                        "enableAutomaticUpdates"
                                      ],
                                  },
                              dataDisks: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "dataDisks"
                                ] ?? []
                              ).map((p) => ({
                                lun: p["lun"],
                                caching: p["caching"],
                                diskSizeGB: p["diskSizeGB"],
                                storageAccountType: p["storageAccountType"],
                              })),
                              licenseType:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "licenseType"
                                ],
                              containerConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.containerConfiguration
                                ? undefined
                                : {
                                    type: p.poolInfo?.autoPoolSpecification
                                      ?.pool?.virtualMachineConfiguration
                                      ?.containerConfiguration?.["type"],
                                    containerImageNames:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.containerConfiguration?.[
                                        "containerImageNames"
                                      ],
                                    containerRegistries: (
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.containerConfiguration?.[
                                        "containerRegistries"
                                      ] ?? []
                                    ).map((p) => ({
                                      username: p["username"],
                                      password: p["password"],
                                      registryServer: p["registryServer"],
                                      identityReference: !p.identityReference
                                        ? undefined
                                        : {
                                            resourceId:
                                              p.identityReference?.[
                                                "resourceId"
                                              ],
                                          },
                                    })),
                                  },
                              diskEncryptionConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.diskEncryptionConfiguration
                                ? undefined
                                : {
                                    targets:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.diskEncryptionConfiguration?.[
                                        "targets"
                                      ],
                                  },
                              nodePlacementConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.nodePlacementConfiguration
                                ? undefined
                                : {
                                    policy:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.nodePlacementConfiguration?.[
                                        "policy"
                                      ],
                                  },
                              extensions: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "extensions"
                                ] ?? []
                              ).map((p) => ({
                                name: p["name"],
                                publisher: p["publisher"],
                                type: p["type"],
                                typeHandlerVersion: p["typeHandlerVersion"],
                                autoUpgradeMinorVersion:
                                  p["autoUpgradeMinorVersion"],
                                settings: !p.settings ? undefined : {},
                                protectedSettings: !p.protectedSettings
                                  ? undefined
                                  : {},
                                provisionAfterExtensions:
                                  p["provisionAfterExtensions"],
                              })),
                              osDisk: !p.poolInfo?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration?.osDisk
                                ? undefined
                                : {
                                    ephemeralOSDiskSettings: !p.poolInfo
                                      ?.autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration?.osDisk
                                      ?.ephemeralOSDiskSettings
                                      ? undefined
                                      : {
                                          placement:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool
                                              ?.virtualMachineConfiguration
                                              ?.osDisk
                                              ?.ephemeralOSDiskSettings?.[
                                              "placement"
                                            ],
                                        },
                                  },
                            },
                        taskSlotsPerNode:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "taskSlotsPerNode"
                          ],
                        taskSchedulingPolicy: !p.poolInfo?.autoPoolSpecification
                          ?.pool?.taskSchedulingPolicy
                          ? undefined
                          : {
                              nodeFillType:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.taskSchedulingPolicy?.["nodeFillType"],
                            },
                        resizeTimeout:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "resizeTimeout"
                          ],
                        targetDedicatedNodes:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "targetDedicatedNodes"
                          ],
                        targetLowPriorityNodes:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "targetLowPriorityNodes"
                          ],
                        enableAutoScale:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "enableAutoScale"
                          ],
                        autoScaleFormula:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "autoScaleFormula"
                          ],
                        autoScaleEvaluationInterval:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "autoScaleEvaluationInterval"
                          ],
                        enableInterNodeCommunication:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "enableInterNodeCommunication"
                          ],
                        networkConfiguration: !p.poolInfo?.autoPoolSpecification
                          ?.pool?.networkConfiguration
                          ? undefined
                          : {
                              subnetId:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.networkConfiguration?.["subnetId"],
                              dynamicVNetAssignmentScope:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.networkConfiguration?.[
                                  "dynamicVNetAssignmentScope"
                                ],
                              endpointConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.networkConfiguration?.endpointConfiguration
                                ? undefined
                                : {
                                    inboundNATPools: (
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.endpointConfiguration?.[
                                        "inboundNATPools"
                                      ] ?? []
                                    ).map((p) => ({
                                      name: p["name"],
                                      protocol: p["protocol"],
                                      backendPort: p["backendPort"],
                                      frontendPortRangeStart:
                                        p["frontendPortRangeStart"],
                                      frontendPortRangeEnd:
                                        p["frontendPortRangeEnd"],
                                      networkSecurityGroupRules: (
                                        p["networkSecurityGroupRules"] ?? []
                                      ).map((p) => ({
                                        priority: p["priority"],
                                        access: p["access"],
                                        sourceAddressPrefix:
                                          p["sourceAddressPrefix"],
                                        sourcePortRanges: p["sourcePortRanges"],
                                      })),
                                    })),
                                  },
                              publicIPAddressConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.networkConfiguration
                                ?.publicIPAddressConfiguration
                                ? undefined
                                : {
                                    provision:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.publicIPAddressConfiguration?.[
                                        "provision"
                                      ],
                                    ipAddressIds:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.publicIPAddressConfiguration?.[
                                        "ipAddressIds"
                                      ],
                                  },
                            },
                        startTask: !p.poolInfo?.autoPoolSpecification?.pool
                          ?.startTask
                          ? undefined
                          : {
                              commandLine:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["commandLine"],
                              containerSettings: !p.poolInfo
                                ?.autoPoolSpecification?.pool?.startTask
                                ?.containerSettings
                                ? undefined
                                : {
                                    containerRunOptions:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.containerSettings?.[
                                        "containerRunOptions"
                                      ],
                                    imageName:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.containerSettings?.[
                                        "imageName"
                                      ],
                                    registry: !p.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.containerSettings
                                      ?.registry
                                      ? undefined
                                      : {
                                          username:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "username"
                                            ],
                                          password:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "password"
                                            ],
                                          registryServer:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "registryServer"
                                            ],
                                          identityReference: !p.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.startTask?.containerSettings
                                            ?.registry?.identityReference
                                            ? undefined
                                            : {
                                                resourceId:
                                                  p.poolInfo
                                                    ?.autoPoolSpecification
                                                    ?.pool?.startTask
                                                    ?.containerSettings
                                                    ?.registry
                                                    ?.identityReference?.[
                                                    "resourceId"
                                                  ],
                                              },
                                        },
                                    workingDirectory:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.containerSettings?.[
                                        "workingDirectory"
                                      ],
                                  },
                              resourceFiles: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["resourceFiles"] ?? []
                              ).map((p) => ({
                                autoStorageContainerName:
                                  p["autoStorageContainerName"],
                                storageContainerUrl: p["storageContainerUrl"],
                                httpUrl: p["httpUrl"],
                                blobPrefix: p["blobPrefix"],
                                filePath: p["filePath"],
                                fileMode: p["fileMode"],
                                identityReference: !p.identityReference
                                  ? undefined
                                  : {
                                      resourceId:
                                        p.identityReference?.["resourceId"],
                                    },
                              })),
                              environmentSettings: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["environmentSettings"] ?? []
                              ).map((p) => ({
                                name: p["name"],
                                value: p["value"],
                              })),
                              userIdentity: !p.poolInfo?.autoPoolSpecification
                                ?.pool?.startTask?.userIdentity
                                ? undefined
                                : {
                                    username:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.userIdentity?.["username"],
                                    autoUser: !p.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.userIdentity?.autoUser
                                      ? undefined
                                      : {
                                          scope:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask?.userIdentity
                                              ?.autoUser?.["scope"],
                                          elevationLevel:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask?.userIdentity
                                              ?.autoUser?.["elevationLevel"],
                                        },
                                  },
                              maxTaskRetryCount:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["maxTaskRetryCount"],
                              waitForSuccess:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["waitForSuccess"],
                            },
                        certificateReferences: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "certificateReferences"
                          ] ?? []
                        ).map((p) => ({
                          thumbprint: p["thumbprint"],
                          thumbprintAlgorithm: p["thumbprintAlgorithm"],
                          storeLocation: p["storeLocation"],
                          storeName: p["storeName"],
                          visibility: p["visibility"],
                        })),
                        applicationPackageReferences: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "applicationPackageReferences"
                          ] ?? []
                        ).map((p) => ({
                          applicationId: p["applicationId"],
                          version: p["version"],
                        })),
                        applicationLicenses:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "applicationLicenses"
                          ],
                        userAccounts: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "userAccounts"
                          ] ?? []
                        ).map((p) => ({
                          name: p["name"],
                          password: p["password"],
                          elevationLevel: p["elevationLevel"],
                          linuxUserConfiguration: !p.linuxUserConfiguration
                            ? undefined
                            : {
                                uid: p.linuxUserConfiguration?.["uid"],
                                gid: p.linuxUserConfiguration?.["gid"],
                                sshPrivateKey:
                                  p.linuxUserConfiguration?.["sshPrivateKey"],
                              },
                          windowsUserConfiguration: !p.windowsUserConfiguration
                            ? undefined
                            : {
                                loginMode:
                                  p.windowsUserConfiguration?.["loginMode"],
                              },
                        })),
                        metadata: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "metadata"
                          ] ?? []
                        ).map((p) => ({ name: p["name"], value: p["value"] })),
                        mountConfiguration: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "mountConfiguration"
                          ] ?? []
                        ).map((p) => ({
                          azureBlobFileSystemConfiguration:
                            !p.azureBlobFileSystemConfiguration
                              ? undefined
                              : {
                                  accountName:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "accountName"
                                    ],
                                  containerName:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "containerName"
                                    ],
                                  accountKey:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "accountKey"
                                    ],
                                  sasKey:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "sasKey"
                                    ],
                                  blobfuseOptions:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "blobfuseOptions"
                                    ],
                                  relativeMountPath:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "relativeMountPath"
                                    ],
                                  identityReference: !p
                                    .azureBlobFileSystemConfiguration
                                    ?.identityReference
                                    ? undefined
                                    : {
                                        resourceId:
                                          p.azureBlobFileSystemConfiguration
                                            ?.identityReference?.["resourceId"],
                                      },
                                },
                          nfsMountConfiguration: !p.nfsMountConfiguration
                            ? undefined
                            : {
                                source: p.nfsMountConfiguration?.["source"],
                                relativeMountPath:
                                  p.nfsMountConfiguration?.[
                                    "relativeMountPath"
                                  ],
                                mountOptions:
                                  p.nfsMountConfiguration?.["mountOptions"],
                              },
                          cifsMountConfiguration: !p.cifsMountConfiguration
                            ? undefined
                            : {
                                username:
                                  p.cifsMountConfiguration?.["username"],
                                source: p.cifsMountConfiguration?.["source"],
                                relativeMountPath:
                                  p.cifsMountConfiguration?.[
                                    "relativeMountPath"
                                  ],
                                mountOptions:
                                  p.cifsMountConfiguration?.["mountOptions"],
                                password:
                                  p.cifsMountConfiguration?.["password"],
                              },
                          azureFileShareConfiguration:
                            !p.azureFileShareConfiguration
                              ? undefined
                              : {
                                  accountName:
                                    p.azureFileShareConfiguration?.[
                                      "accountName"
                                    ],
                                  azureFileUrl:
                                    p.azureFileShareConfiguration?.[
                                      "azureFileUrl"
                                    ],
                                  accountKey:
                                    p.azureFileShareConfiguration?.[
                                      "accountKey"
                                    ],
                                  relativeMountPath:
                                    p.azureFileShareConfiguration?.[
                                      "relativeMountPath"
                                    ],
                                  mountOptions:
                                    p.azureFileShareConfiguration?.[
                                      "mountOptions"
                                    ],
                                },
                        })),
                        targetNodeCommunicationMode:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "targetNodeCommunicationMode"
                          ],
                      },
                },
          },
      onAllTasksComplete: p["onAllTasksComplete"],
      onTaskFailure: p["onTaskFailure"],
      networkConfiguration: !p.networkConfiguration
        ? undefined
        : { subnetId: p.networkConfiguration?.["subnetId"] },
      metadata: (p["metadata"] ?? []).map((p) => ({
        name: p["name"],
        value: p["value"],
      })),
      executionInfo: !p.executionInfo
        ? undefined
        : {
            startTime: new Date(p.executionInfo?.["startTime"] ?? ""),
            endTime: new Date(p.executionInfo?.["endTime"] ?? ""),
            poolId: p.executionInfo?.["poolId"],
            schedulingError: !p.executionInfo?.schedulingError
              ? undefined
              : {
                  category: p.executionInfo?.schedulingError?.["category"],
                  code: p.executionInfo?.schedulingError?.["code"],
                  message: p.executionInfo?.schedulingError?.["message"],
                  details: (
                    p.executionInfo?.schedulingError?.["details"] ?? []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                },
            terminateReason: p.executionInfo?.["terminateReason"],
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
            numSucceededTasks: p.stats?.["numSucceededTasks"],
            numFailedTasks: p.stats?.["numFailedTasks"],
            numTaskRetries: p.stats?.["numTaskRetries"],
            waitTime: p.stats?.["waitTime"],
          },
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

export interface JoblistFromJobScheduleOptions extends RequestParametersCommon {
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
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-jobs-in-a-job-schedule.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

/** Lists the Jobs that have been created under the specified Job Schedule. */
export async function listFromJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JoblistFromJobScheduleOptions = { requestOptions: {} }
): Promise<BatchJobListResult> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}/jobs", jobScheduleId)
    .get({
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
      usesTaskDependencies: p["usesTaskDependencies"],
      url: p["url"],
      eTag: p["eTag"],
      lastModified: new Date(p["lastModified"] ?? ""),
      creationTime: new Date(p["creationTime"] ?? ""),
      state: p["state"],
      stateTransitionTime: new Date(p["stateTransitionTime"] ?? ""),
      previousState: p["previousState"],
      previousStateTransitionTime: new Date(
        p["previousStateTransitionTime"] ?? ""
      ),
      priority: p["priority"],
      allowTaskPreemption: p["allowTaskPreemption"],
      maxParallelTasks: p["maxParallelTasks"],
      constraints: !p.constraints
        ? undefined
        : {
            maxWallClockTime: p.constraints?.["maxWallClockTime"],
            maxTaskRetryCount: p.constraints?.["maxTaskRetryCount"],
          },
      jobManagerTask: !p.jobManagerTask
        ? undefined
        : {
            id: p.jobManagerTask?.["id"],
            displayName: p.jobManagerTask?.["displayName"],
            commandLine: p.jobManagerTask?.["commandLine"],
            containerSettings: !p.jobManagerTask?.containerSettings
              ? undefined
              : {
                  containerRunOptions:
                    p.jobManagerTask?.containerSettings?.[
                      "containerRunOptions"
                    ],
                  imageName: p.jobManagerTask?.containerSettings?.["imageName"],
                  registry: !p.jobManagerTask?.containerSettings?.registry
                    ? undefined
                    : {
                        username:
                          p.jobManagerTask?.containerSettings?.registry?.[
                            "username"
                          ],
                        password:
                          p.jobManagerTask?.containerSettings?.registry?.[
                            "password"
                          ],
                        registryServer:
                          p.jobManagerTask?.containerSettings?.registry?.[
                            "registryServer"
                          ],
                        identityReference: !p.jobManagerTask?.containerSettings
                          ?.registry?.identityReference
                          ? undefined
                          : {
                              resourceId:
                                p.jobManagerTask?.containerSettings?.registry
                                  ?.identityReference?.["resourceId"],
                            },
                      },
                  workingDirectory:
                    p.jobManagerTask?.containerSettings?.["workingDirectory"],
                },
            resourceFiles: (p.jobManagerTask?.["resourceFiles"] ?? []).map(
              (p) => ({
                autoStorageContainerName: p["autoStorageContainerName"],
                storageContainerUrl: p["storageContainerUrl"],
                httpUrl: p["httpUrl"],
                blobPrefix: p["blobPrefix"],
                filePath: p["filePath"],
                fileMode: p["fileMode"],
                identityReference: !p.identityReference
                  ? undefined
                  : { resourceId: p.identityReference?.["resourceId"] },
              })
            ),
            outputFiles: (p.jobManagerTask?.["outputFiles"] ?? []).map((p) => ({
              filePattern: p["filePattern"],
              destination: {
                container: !p.destination.container
                  ? undefined
                  : {
                      path: p.destination.container?.["path"],
                      containerUrl: p.destination.container?.["containerUrl"],
                      identityReference: !p.destination.container
                        ?.identityReference
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
              uploadOptions: {
                uploadCondition: p.uploadOptions["uploadCondition"],
              },
            })),
            environmentSettings: (
              p.jobManagerTask?.["environmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            constraints: !p.jobManagerTask?.constraints
              ? undefined
              : {
                  maxWallClockTime:
                    p.jobManagerTask?.constraints?.["maxWallClockTime"],
                  retentionTime:
                    p.jobManagerTask?.constraints?.["retentionTime"],
                  maxTaskRetryCount:
                    p.jobManagerTask?.constraints?.["maxTaskRetryCount"],
                },
            requiredSlots: p.jobManagerTask?.["requiredSlots"],
            killJobOnCompletion: p.jobManagerTask?.["killJobOnCompletion"],
            userIdentity: !p.jobManagerTask?.userIdentity
              ? undefined
              : {
                  username: p.jobManagerTask?.userIdentity?.["username"],
                  autoUser: !p.jobManagerTask?.userIdentity?.autoUser
                    ? undefined
                    : {
                        scope:
                          p.jobManagerTask?.userIdentity?.autoUser?.["scope"],
                        elevationLevel:
                          p.jobManagerTask?.userIdentity?.autoUser?.[
                            "elevationLevel"
                          ],
                      },
                },
            runExclusive: p.jobManagerTask?.["runExclusive"],
            applicationPackageReferences: (
              p.jobManagerTask?.["applicationPackageReferences"] ?? []
            ).map((p) => ({
              applicationId: p["applicationId"],
              version: p["version"],
            })),
            authenticationTokenSettings: !p.jobManagerTask
              ?.authenticationTokenSettings
              ? undefined
              : {
                  access:
                    p.jobManagerTask?.authenticationTokenSettings?.["access"],
                },
            allowLowPriorityNode: p.jobManagerTask?.["allowLowPriorityNode"],
          },
      jobPreparationTask: !p.jobPreparationTask
        ? undefined
        : {
            id: p.jobPreparationTask?.["id"],
            commandLine: p.jobPreparationTask?.["commandLine"],
            containerSettings: !p.jobPreparationTask?.containerSettings
              ? undefined
              : {
                  containerRunOptions:
                    p.jobPreparationTask?.containerSettings?.[
                      "containerRunOptions"
                    ],
                  imageName:
                    p.jobPreparationTask?.containerSettings?.["imageName"],
                  registry: !p.jobPreparationTask?.containerSettings?.registry
                    ? undefined
                    : {
                        username:
                          p.jobPreparationTask?.containerSettings?.registry?.[
                            "username"
                          ],
                        password:
                          p.jobPreparationTask?.containerSettings?.registry?.[
                            "password"
                          ],
                        registryServer:
                          p.jobPreparationTask?.containerSettings?.registry?.[
                            "registryServer"
                          ],
                        identityReference: !p.jobPreparationTask
                          ?.containerSettings?.registry?.identityReference
                          ? undefined
                          : {
                              resourceId:
                                p.jobPreparationTask?.containerSettings
                                  ?.registry?.identityReference?.["resourceId"],
                            },
                      },
                  workingDirectory:
                    p.jobPreparationTask?.containerSettings?.[
                      "workingDirectory"
                    ],
                },
            resourceFiles: (p.jobPreparationTask?.["resourceFiles"] ?? []).map(
              (p) => ({
                autoStorageContainerName: p["autoStorageContainerName"],
                storageContainerUrl: p["storageContainerUrl"],
                httpUrl: p["httpUrl"],
                blobPrefix: p["blobPrefix"],
                filePath: p["filePath"],
                fileMode: p["fileMode"],
                identityReference: !p.identityReference
                  ? undefined
                  : { resourceId: p.identityReference?.["resourceId"] },
              })
            ),
            environmentSettings: (
              p.jobPreparationTask?.["environmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            constraints: !p.jobPreparationTask?.constraints
              ? undefined
              : {
                  maxWallClockTime:
                    p.jobPreparationTask?.constraints?.["maxWallClockTime"],
                  retentionTime:
                    p.jobPreparationTask?.constraints?.["retentionTime"],
                  maxTaskRetryCount:
                    p.jobPreparationTask?.constraints?.["maxTaskRetryCount"],
                },
            waitForSuccess: p.jobPreparationTask?.["waitForSuccess"],
            userIdentity: !p.jobPreparationTask?.userIdentity
              ? undefined
              : {
                  username: p.jobPreparationTask?.userIdentity?.["username"],
                  autoUser: !p.jobPreparationTask?.userIdentity?.autoUser
                    ? undefined
                    : {
                        scope:
                          p.jobPreparationTask?.userIdentity?.autoUser?.[
                            "scope"
                          ],
                        elevationLevel:
                          p.jobPreparationTask?.userIdentity?.autoUser?.[
                            "elevationLevel"
                          ],
                      },
                },
            rerunOnNodeRebootAfterSuccess:
              p.jobPreparationTask?.["rerunOnNodeRebootAfterSuccess"],
          },
      jobReleaseTask: !p.jobReleaseTask
        ? undefined
        : {
            id: p.jobReleaseTask?.["id"],
            commandLine: p.jobReleaseTask?.["commandLine"],
            containerSettings: !p.jobReleaseTask?.containerSettings
              ? undefined
              : {
                  containerRunOptions:
                    p.jobReleaseTask?.containerSettings?.[
                      "containerRunOptions"
                    ],
                  imageName: p.jobReleaseTask?.containerSettings?.["imageName"],
                  registry: !p.jobReleaseTask?.containerSettings?.registry
                    ? undefined
                    : {
                        username:
                          p.jobReleaseTask?.containerSettings?.registry?.[
                            "username"
                          ],
                        password:
                          p.jobReleaseTask?.containerSettings?.registry?.[
                            "password"
                          ],
                        registryServer:
                          p.jobReleaseTask?.containerSettings?.registry?.[
                            "registryServer"
                          ],
                        identityReference: !p.jobReleaseTask?.containerSettings
                          ?.registry?.identityReference
                          ? undefined
                          : {
                              resourceId:
                                p.jobReleaseTask?.containerSettings?.registry
                                  ?.identityReference?.["resourceId"],
                            },
                      },
                  workingDirectory:
                    p.jobReleaseTask?.containerSettings?.["workingDirectory"],
                },
            resourceFiles: (p.jobReleaseTask?.["resourceFiles"] ?? []).map(
              (p) => ({
                autoStorageContainerName: p["autoStorageContainerName"],
                storageContainerUrl: p["storageContainerUrl"],
                httpUrl: p["httpUrl"],
                blobPrefix: p["blobPrefix"],
                filePath: p["filePath"],
                fileMode: p["fileMode"],
                identityReference: !p.identityReference
                  ? undefined
                  : { resourceId: p.identityReference?.["resourceId"] },
              })
            ),
            environmentSettings: (
              p.jobReleaseTask?.["environmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            maxWallClockTime: p.jobReleaseTask?.["maxWallClockTime"],
            retentionTime: p.jobReleaseTask?.["retentionTime"],
            userIdentity: !p.jobReleaseTask?.userIdentity
              ? undefined
              : {
                  username: p.jobReleaseTask?.userIdentity?.["username"],
                  autoUser: !p.jobReleaseTask?.userIdentity?.autoUser
                    ? undefined
                    : {
                        scope:
                          p.jobReleaseTask?.userIdentity?.autoUser?.["scope"],
                        elevationLevel:
                          p.jobReleaseTask?.userIdentity?.autoUser?.[
                            "elevationLevel"
                          ],
                      },
                },
          },
      commonEnvironmentSettings: (p["commonEnvironmentSettings"] ?? []).map(
        (p) => ({ name: p["name"], value: p["value"] })
      ),
      poolInfo: !p.poolInfo
        ? undefined
        : {
            poolId: p.poolInfo?.["poolId"],
            autoPoolSpecification: !p.poolInfo?.autoPoolSpecification
              ? undefined
              : {
                  autoPoolIdPrefix:
                    p.poolInfo?.autoPoolSpecification?.["autoPoolIdPrefix"],
                  poolLifetimeOption:
                    p.poolInfo?.autoPoolSpecification?.["poolLifetimeOption"],
                  keepAlive: p.poolInfo?.autoPoolSpecification?.["keepAlive"],
                  pool: !p.poolInfo?.autoPoolSpecification?.pool
                    ? undefined
                    : {
                        displayName:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "displayName"
                          ],
                        vmSize:
                          p.poolInfo?.autoPoolSpecification?.pool?.["vmSize"],
                        cloudServiceConfiguration: !p.poolInfo
                          ?.autoPoolSpecification?.pool
                          ?.cloudServiceConfiguration
                          ? undefined
                          : {
                              osFamily:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.cloudServiceConfiguration?.["osFamily"],
                              osVersion:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.cloudServiceConfiguration?.["osVersion"],
                            },
                        virtualMachineConfiguration: !p.poolInfo
                          ?.autoPoolSpecification?.pool
                          ?.virtualMachineConfiguration
                          ? undefined
                          : {
                              imageReference: {
                                publisher:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["publisher"],
                                offer:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["offer"],
                                sku: p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.imageReference[
                                  "sku"
                                ],
                                version:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["version"],
                                virtualMachineImageId:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["virtualMachineImageId"],
                                exactVersion:
                                  p.poolInfo?.autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["exactVersion"],
                              },
                              nodeAgentSKUId:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "nodeAgentSKUId"
                                ],
                              windowsConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.windowsConfiguration
                                ? undefined
                                : {
                                    enableAutomaticUpdates:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.windowsConfiguration?.[
                                        "enableAutomaticUpdates"
                                      ],
                                  },
                              dataDisks: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "dataDisks"
                                ] ?? []
                              ).map((p) => ({
                                lun: p["lun"],
                                caching: p["caching"],
                                diskSizeGB: p["diskSizeGB"],
                                storageAccountType: p["storageAccountType"],
                              })),
                              licenseType:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "licenseType"
                                ],
                              containerConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.containerConfiguration
                                ? undefined
                                : {
                                    type: p.poolInfo?.autoPoolSpecification
                                      ?.pool?.virtualMachineConfiguration
                                      ?.containerConfiguration?.["type"],
                                    containerImageNames:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.containerConfiguration?.[
                                        "containerImageNames"
                                      ],
                                    containerRegistries: (
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.containerConfiguration?.[
                                        "containerRegistries"
                                      ] ?? []
                                    ).map((p) => ({
                                      username: p["username"],
                                      password: p["password"],
                                      registryServer: p["registryServer"],
                                      identityReference: !p.identityReference
                                        ? undefined
                                        : {
                                            resourceId:
                                              p.identityReference?.[
                                                "resourceId"
                                              ],
                                          },
                                    })),
                                  },
                              diskEncryptionConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.diskEncryptionConfiguration
                                ? undefined
                                : {
                                    targets:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.diskEncryptionConfiguration?.[
                                        "targets"
                                      ],
                                  },
                              nodePlacementConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.nodePlacementConfiguration
                                ? undefined
                                : {
                                    policy:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.nodePlacementConfiguration?.[
                                        "policy"
                                      ],
                                  },
                              extensions: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "extensions"
                                ] ?? []
                              ).map((p) => ({
                                name: p["name"],
                                publisher: p["publisher"],
                                type: p["type"],
                                typeHandlerVersion: p["typeHandlerVersion"],
                                autoUpgradeMinorVersion:
                                  p["autoUpgradeMinorVersion"],
                                settings: !p.settings ? undefined : {},
                                protectedSettings: !p.protectedSettings
                                  ? undefined
                                  : {},
                                provisionAfterExtensions:
                                  p["provisionAfterExtensions"],
                              })),
                              osDisk: !p.poolInfo?.autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration?.osDisk
                                ? undefined
                                : {
                                    ephemeralOSDiskSettings: !p.poolInfo
                                      ?.autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration?.osDisk
                                      ?.ephemeralOSDiskSettings
                                      ? undefined
                                      : {
                                          placement:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool
                                              ?.virtualMachineConfiguration
                                              ?.osDisk
                                              ?.ephemeralOSDiskSettings?.[
                                              "placement"
                                            ],
                                        },
                                  },
                            },
                        taskSlotsPerNode:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "taskSlotsPerNode"
                          ],
                        taskSchedulingPolicy: !p.poolInfo?.autoPoolSpecification
                          ?.pool?.taskSchedulingPolicy
                          ? undefined
                          : {
                              nodeFillType:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.taskSchedulingPolicy?.["nodeFillType"],
                            },
                        resizeTimeout:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "resizeTimeout"
                          ],
                        targetDedicatedNodes:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "targetDedicatedNodes"
                          ],
                        targetLowPriorityNodes:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "targetLowPriorityNodes"
                          ],
                        enableAutoScale:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "enableAutoScale"
                          ],
                        autoScaleFormula:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "autoScaleFormula"
                          ],
                        autoScaleEvaluationInterval:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "autoScaleEvaluationInterval"
                          ],
                        enableInterNodeCommunication:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "enableInterNodeCommunication"
                          ],
                        networkConfiguration: !p.poolInfo?.autoPoolSpecification
                          ?.pool?.networkConfiguration
                          ? undefined
                          : {
                              subnetId:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.networkConfiguration?.["subnetId"],
                              dynamicVNetAssignmentScope:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.networkConfiguration?.[
                                  "dynamicVNetAssignmentScope"
                                ],
                              endpointConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.networkConfiguration?.endpointConfiguration
                                ? undefined
                                : {
                                    inboundNATPools: (
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.endpointConfiguration?.[
                                        "inboundNATPools"
                                      ] ?? []
                                    ).map((p) => ({
                                      name: p["name"],
                                      protocol: p["protocol"],
                                      backendPort: p["backendPort"],
                                      frontendPortRangeStart:
                                        p["frontendPortRangeStart"],
                                      frontendPortRangeEnd:
                                        p["frontendPortRangeEnd"],
                                      networkSecurityGroupRules: (
                                        p["networkSecurityGroupRules"] ?? []
                                      ).map((p) => ({
                                        priority: p["priority"],
                                        access: p["access"],
                                        sourceAddressPrefix:
                                          p["sourceAddressPrefix"],
                                        sourcePortRanges: p["sourcePortRanges"],
                                      })),
                                    })),
                                  },
                              publicIPAddressConfiguration: !p.poolInfo
                                ?.autoPoolSpecification?.pool
                                ?.networkConfiguration
                                ?.publicIPAddressConfiguration
                                ? undefined
                                : {
                                    provision:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.publicIPAddressConfiguration?.[
                                        "provision"
                                      ],
                                    ipAddressIds:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.publicIPAddressConfiguration?.[
                                        "ipAddressIds"
                                      ],
                                  },
                            },
                        startTask: !p.poolInfo?.autoPoolSpecification?.pool
                          ?.startTask
                          ? undefined
                          : {
                              commandLine:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["commandLine"],
                              containerSettings: !p.poolInfo
                                ?.autoPoolSpecification?.pool?.startTask
                                ?.containerSettings
                                ? undefined
                                : {
                                    containerRunOptions:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.containerSettings?.[
                                        "containerRunOptions"
                                      ],
                                    imageName:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.containerSettings?.[
                                        "imageName"
                                      ],
                                    registry: !p.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.containerSettings
                                      ?.registry
                                      ? undefined
                                      : {
                                          username:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "username"
                                            ],
                                          password:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "password"
                                            ],
                                          registryServer:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "registryServer"
                                            ],
                                          identityReference: !p.poolInfo
                                            ?.autoPoolSpecification?.pool
                                            ?.startTask?.containerSettings
                                            ?.registry?.identityReference
                                            ? undefined
                                            : {
                                                resourceId:
                                                  p.poolInfo
                                                    ?.autoPoolSpecification
                                                    ?.pool?.startTask
                                                    ?.containerSettings
                                                    ?.registry
                                                    ?.identityReference?.[
                                                    "resourceId"
                                                  ],
                                              },
                                        },
                                    workingDirectory:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.containerSettings?.[
                                        "workingDirectory"
                                      ],
                                  },
                              resourceFiles: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["resourceFiles"] ?? []
                              ).map((p) => ({
                                autoStorageContainerName:
                                  p["autoStorageContainerName"],
                                storageContainerUrl: p["storageContainerUrl"],
                                httpUrl: p["httpUrl"],
                                blobPrefix: p["blobPrefix"],
                                filePath: p["filePath"],
                                fileMode: p["fileMode"],
                                identityReference: !p.identityReference
                                  ? undefined
                                  : {
                                      resourceId:
                                        p.identityReference?.["resourceId"],
                                    },
                              })),
                              environmentSettings: (
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["environmentSettings"] ?? []
                              ).map((p) => ({
                                name: p["name"],
                                value: p["value"],
                              })),
                              userIdentity: !p.poolInfo?.autoPoolSpecification
                                ?.pool?.startTask?.userIdentity
                                ? undefined
                                : {
                                    username:
                                      p.poolInfo?.autoPoolSpecification?.pool
                                        ?.startTask?.userIdentity?.["username"],
                                    autoUser: !p.poolInfo?.autoPoolSpecification
                                      ?.pool?.startTask?.userIdentity?.autoUser
                                      ? undefined
                                      : {
                                          scope:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask?.userIdentity
                                              ?.autoUser?.["scope"],
                                          elevationLevel:
                                            p.poolInfo?.autoPoolSpecification
                                              ?.pool?.startTask?.userIdentity
                                              ?.autoUser?.["elevationLevel"],
                                        },
                                  },
                              maxTaskRetryCount:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["maxTaskRetryCount"],
                              waitForSuccess:
                                p.poolInfo?.autoPoolSpecification?.pool
                                  ?.startTask?.["waitForSuccess"],
                            },
                        certificateReferences: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "certificateReferences"
                          ] ?? []
                        ).map((p) => ({
                          thumbprint: p["thumbprint"],
                          thumbprintAlgorithm: p["thumbprintAlgorithm"],
                          storeLocation: p["storeLocation"],
                          storeName: p["storeName"],
                          visibility: p["visibility"],
                        })),
                        applicationPackageReferences: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "applicationPackageReferences"
                          ] ?? []
                        ).map((p) => ({
                          applicationId: p["applicationId"],
                          version: p["version"],
                        })),
                        applicationLicenses:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "applicationLicenses"
                          ],
                        userAccounts: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "userAccounts"
                          ] ?? []
                        ).map((p) => ({
                          name: p["name"],
                          password: p["password"],
                          elevationLevel: p["elevationLevel"],
                          linuxUserConfiguration: !p.linuxUserConfiguration
                            ? undefined
                            : {
                                uid: p.linuxUserConfiguration?.["uid"],
                                gid: p.linuxUserConfiguration?.["gid"],
                                sshPrivateKey:
                                  p.linuxUserConfiguration?.["sshPrivateKey"],
                              },
                          windowsUserConfiguration: !p.windowsUserConfiguration
                            ? undefined
                            : {
                                loginMode:
                                  p.windowsUserConfiguration?.["loginMode"],
                              },
                        })),
                        metadata: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "metadata"
                          ] ?? []
                        ).map((p) => ({ name: p["name"], value: p["value"] })),
                        mountConfiguration: (
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "mountConfiguration"
                          ] ?? []
                        ).map((p) => ({
                          azureBlobFileSystemConfiguration:
                            !p.azureBlobFileSystemConfiguration
                              ? undefined
                              : {
                                  accountName:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "accountName"
                                    ],
                                  containerName:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "containerName"
                                    ],
                                  accountKey:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "accountKey"
                                    ],
                                  sasKey:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "sasKey"
                                    ],
                                  blobfuseOptions:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "blobfuseOptions"
                                    ],
                                  relativeMountPath:
                                    p.azureBlobFileSystemConfiguration?.[
                                      "relativeMountPath"
                                    ],
                                  identityReference: !p
                                    .azureBlobFileSystemConfiguration
                                    ?.identityReference
                                    ? undefined
                                    : {
                                        resourceId:
                                          p.azureBlobFileSystemConfiguration
                                            ?.identityReference?.["resourceId"],
                                      },
                                },
                          nfsMountConfiguration: !p.nfsMountConfiguration
                            ? undefined
                            : {
                                source: p.nfsMountConfiguration?.["source"],
                                relativeMountPath:
                                  p.nfsMountConfiguration?.[
                                    "relativeMountPath"
                                  ],
                                mountOptions:
                                  p.nfsMountConfiguration?.["mountOptions"],
                              },
                          cifsMountConfiguration: !p.cifsMountConfiguration
                            ? undefined
                            : {
                                username:
                                  p.cifsMountConfiguration?.["username"],
                                source: p.cifsMountConfiguration?.["source"],
                                relativeMountPath:
                                  p.cifsMountConfiguration?.[
                                    "relativeMountPath"
                                  ],
                                mountOptions:
                                  p.cifsMountConfiguration?.["mountOptions"],
                                password:
                                  p.cifsMountConfiguration?.["password"],
                              },
                          azureFileShareConfiguration:
                            !p.azureFileShareConfiguration
                              ? undefined
                              : {
                                  accountName:
                                    p.azureFileShareConfiguration?.[
                                      "accountName"
                                    ],
                                  azureFileUrl:
                                    p.azureFileShareConfiguration?.[
                                      "azureFileUrl"
                                    ],
                                  accountKey:
                                    p.azureFileShareConfiguration?.[
                                      "accountKey"
                                    ],
                                  relativeMountPath:
                                    p.azureFileShareConfiguration?.[
                                      "relativeMountPath"
                                    ],
                                  mountOptions:
                                    p.azureFileShareConfiguration?.[
                                      "mountOptions"
                                    ],
                                },
                        })),
                        targetNodeCommunicationMode:
                          p.poolInfo?.autoPoolSpecification?.pool?.[
                            "targetNodeCommunicationMode"
                          ],
                      },
                },
          },
      onAllTasksComplete: p["onAllTasksComplete"],
      onTaskFailure: p["onTaskFailure"],
      networkConfiguration: !p.networkConfiguration
        ? undefined
        : { subnetId: p.networkConfiguration?.["subnetId"] },
      metadata: (p["metadata"] ?? []).map((p) => ({
        name: p["name"],
        value: p["value"],
      })),
      executionInfo: !p.executionInfo
        ? undefined
        : {
            startTime: new Date(p.executionInfo?.["startTime"] ?? ""),
            endTime: new Date(p.executionInfo?.["endTime"] ?? ""),
            poolId: p.executionInfo?.["poolId"],
            schedulingError: !p.executionInfo?.schedulingError
              ? undefined
              : {
                  category: p.executionInfo?.schedulingError?.["category"],
                  code: p.executionInfo?.schedulingError?.["code"],
                  message: p.executionInfo?.schedulingError?.["message"],
                  details: (
                    p.executionInfo?.schedulingError?.["details"] ?? []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                },
            terminateReason: p.executionInfo?.["terminateReason"],
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
            numSucceededTasks: p.stats?.["numSucceededTasks"],
            numFailedTasks: p.stats?.["numFailedTasks"],
            numTaskRetries: p.stats?.["numTaskRetries"],
            waitTime: p.stats?.["waitTime"],
          },
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

export interface JoblistPreparationAndReleaseTaskStatusOptions
  extends RequestParametersCommon {
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
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-job-preparation-and-release-status.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
}

/**
 * This API returns the Job Preparation and Job Release Task status on all Compute
 * Nodes that have run the Job Preparation or Job Release Task. This includes
 * Compute Nodes which have since been removed from the Pool. If this API is
 * invoked on a Job which has no Job Preparation or Job Release Task, the Batch
 * service returns HTTP status code 409 (Conflict) with an error code of
 * JobPreparationTaskNotSpecified.
 */
export async function listPreparationAndReleaseTaskStatus(
  context: Client,
  jobId: string,
  options: JoblistPreparationAndReleaseTaskStatusOptions = {
    requestOptions: {},
  }
): Promise<BatchJobListPreparationAndReleaseTaskStatusResult> {
  const result = await context
    .path("/jobs/{jobId}/jobpreparationandreleasetaskstatus", jobId)
    .get({
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
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      poolId: p["poolId"],
      nodeId: p["nodeId"],
      nodeUrl: p["nodeUrl"],
      jobPreparationTaskExecutionInfo: !p.jobPreparationTaskExecutionInfo
        ? undefined
        : {
            startTime: new Date(
              p.jobPreparationTaskExecutionInfo?.["startTime"] ?? ""
            ),
            endTime: new Date(
              p.jobPreparationTaskExecutionInfo?.["endTime"] ?? ""
            ),
            state: p.jobPreparationTaskExecutionInfo?.["state"],
            taskRootDirectory:
              p.jobPreparationTaskExecutionInfo?.["taskRootDirectory"],
            taskRootDirectoryUrl:
              p.jobPreparationTaskExecutionInfo?.["taskRootDirectoryUrl"],
            exitCode: p.jobPreparationTaskExecutionInfo?.["exitCode"],
            containerInfo: !p.jobPreparationTaskExecutionInfo?.containerInfo
              ? undefined
              : {
                  containerId:
                    p.jobPreparationTaskExecutionInfo?.containerInfo?.[
                      "containerId"
                    ],
                  state:
                    p.jobPreparationTaskExecutionInfo?.containerInfo?.["state"],
                  error:
                    p.jobPreparationTaskExecutionInfo?.containerInfo?.["error"],
                },
            failureInfo: !p.jobPreparationTaskExecutionInfo?.failureInfo
              ? undefined
              : {
                  category:
                    p.jobPreparationTaskExecutionInfo?.failureInfo?.[
                      "category"
                    ],
                  code: p.jobPreparationTaskExecutionInfo?.failureInfo?.[
                    "code"
                  ],
                  message:
                    p.jobPreparationTaskExecutionInfo?.failureInfo?.["message"],
                  details: (
                    p.jobPreparationTaskExecutionInfo?.failureInfo?.[
                      "details"
                    ] ?? []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                },
            retryCount: p.jobPreparationTaskExecutionInfo?.["retryCount"],
            lastRetryTime: new Date(
              p.jobPreparationTaskExecutionInfo?.["lastRetryTime"] ?? ""
            ),
            result: p.jobPreparationTaskExecutionInfo?.["result"],
          },
      jobReleaseTaskExecutionInfo: !p.jobReleaseTaskExecutionInfo
        ? undefined
        : {
            startTime: new Date(
              p.jobReleaseTaskExecutionInfo?.["startTime"] ?? ""
            ),
            endTime: new Date(p.jobReleaseTaskExecutionInfo?.["endTime"] ?? ""),
            state: p.jobReleaseTaskExecutionInfo?.["state"],
            taskRootDirectory:
              p.jobReleaseTaskExecutionInfo?.["taskRootDirectory"],
            taskRootDirectoryUrl:
              p.jobReleaseTaskExecutionInfo?.["taskRootDirectoryUrl"],
            exitCode: p.jobReleaseTaskExecutionInfo?.["exitCode"],
            containerInfo: !p.jobReleaseTaskExecutionInfo?.containerInfo
              ? undefined
              : {
                  containerId:
                    p.jobReleaseTaskExecutionInfo?.containerInfo?.[
                      "containerId"
                    ],
                  state:
                    p.jobReleaseTaskExecutionInfo?.containerInfo?.["state"],
                  error:
                    p.jobReleaseTaskExecutionInfo?.containerInfo?.["error"],
                },
            failureInfo: !p.jobReleaseTaskExecutionInfo?.failureInfo
              ? undefined
              : {
                  category:
                    p.jobReleaseTaskExecutionInfo?.failureInfo?.["category"],
                  code: p.jobReleaseTaskExecutionInfo?.failureInfo?.["code"],
                  message:
                    p.jobReleaseTaskExecutionInfo?.failureInfo?.["message"],
                  details: (
                    p.jobReleaseTaskExecutionInfo?.failureInfo?.["details"] ??
                    []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                },
            result: p.jobReleaseTaskExecutionInfo?.["result"],
          },
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

export interface JobgetTaskCountsOptions extends RequestParametersCommon {
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
}

/**
 * Task counts provide a count of the Tasks by active, running or completed Task
 * state, and a count of Tasks which succeeded or failed. Tasks in the preparing
 * state are counted as running. Note that the numbers returned may not always be
 * up to date. If you need exact task counts, use a list query.
 */
export async function getTaskCounts(
  context: Client,
  jobId: string,
  options: JobgetTaskCountsOptions = { requestOptions: {} }
): Promise<TaskCountsResult> {
  const result = await context.path("/jobs/{jobId}/taskcounts", jobId).get({
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
    queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    taskCounts: {
      active: result.body.taskCounts["active"],
      running: result.body.taskCounts["running"],
      completed: result.body.taskCounts["completed"],
      succeeded: result.body.taskCounts["succeeded"],
      failed: result.body.taskCounts["failed"],
    },
    taskSlotCounts: {
      active: result.body.taskSlotCounts["active"],
      running: result.body.taskSlotCounts["running"],
      completed: result.body.taskSlotCounts["completed"],
      succeeded: result.body.taskSlotCounts["succeeded"],
      failed: result.body.taskSlotCounts["failed"],
    },
  };
}
