// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchJobSchedule,
  JobScheduleState,
  Schedule,
  JobSpecification,
  JobScheduleExecutionInformation,
  MetadataItem,
  JobScheduleStatistics,
  BatchJobScheduleListResult,
} from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface JobSchedulejobScheduleExistsOptions
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

/** Checks the specified Job Schedule exists. */
export async function jobScheduleExists(
  context: Client,
  jobScheduleId: string,
  options: JobSchedulejobScheduleExistsOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}", jobScheduleId)
    .head({
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

export interface JobScheduledeleteJobScheduleOptions
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
 * When you delete a Job Schedule, this also deletes all Jobs and Tasks under that
 * schedule. When Tasks are deleted, all the files in their working directories on
 * the Compute Nodes are also deleted (the retention period is ignored). The Job
 * Schedule statistics are no longer accessible once the Job Schedule is deleted,
 * though they are still counted towards Account lifetime statistics.
 */
export async function deleteJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JobScheduledeleteJobScheduleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}", jobScheduleId)
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

export interface JobSchedulegetJobScheduleOptions
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

/** Gets information about the specified Job Schedule. */
export async function getJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JobSchedulegetJobScheduleOptions = { requestOptions: {} }
): Promise<BatchJobSchedule> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}", jobScheduleId)
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
    state: result.body["state"],
    stateTransitionTime: new Date(result.body["stateTransitionTime"] ?? ""),
    previousState: result.body["previousState"],
    previousStateTransitionTime: new Date(
      result.body["previousStateTransitionTime"] ?? ""
    ),
    schedule: !result.body.schedule
      ? undefined
      : {
          doNotRunUntil: new Date(
            result.body.schedule?.["doNotRunUntil"] ?? ""
          ),
          doNotRunAfter: new Date(
            result.body.schedule?.["doNotRunAfter"] ?? ""
          ),
          startWindow: result.body.schedule?.["startWindow"],
          recurrenceInterval: result.body.schedule?.["recurrenceInterval"],
        },
    jobSpecification: !result.body.jobSpecification
      ? undefined
      : {
          priority: result.body.jobSpecification?.["priority"],
          allowTaskPreemption:
            result.body.jobSpecification?.["allowTaskPreemption"],
          maxParallelTasks: result.body.jobSpecification?.["maxParallelTasks"],
          displayName: result.body.jobSpecification?.["displayName"],
          usesTaskDependencies:
            result.body.jobSpecification?.["usesTaskDependencies"],
          onAllTasksComplete:
            result.body.jobSpecification?.["onAllTasksComplete"],
          onTaskFailure: result.body.jobSpecification?.["onTaskFailure"],
          networkConfiguration: !result.body.jobSpecification
            ?.networkConfiguration
            ? undefined
            : {
                subnetId:
                  result.body.jobSpecification?.networkConfiguration?.[
                    "subnetId"
                  ],
              },
          constraints: !result.body.jobSpecification?.constraints
            ? undefined
            : {
                maxWallClockTime:
                  result.body.jobSpecification?.constraints?.[
                    "maxWallClockTime"
                  ],
                maxTaskRetryCount:
                  result.body.jobSpecification?.constraints?.[
                    "maxTaskRetryCount"
                  ],
              },
          jobManagerTask: !result.body.jobSpecification?.jobManagerTask
            ? undefined
            : {
                id: result.body.jobSpecification?.jobManagerTask?.["id"],
                displayName:
                  result.body.jobSpecification?.jobManagerTask?.["displayName"],
                commandLine:
                  result.body.jobSpecification?.jobManagerTask?.["commandLine"],
                containerSettings: !result.body.jobSpecification?.jobManagerTask
                  ?.containerSettings
                  ? undefined
                  : {
                      containerRunOptions:
                        result.body.jobSpecification?.jobManagerTask
                          ?.containerSettings?.["containerRunOptions"],
                      imageName:
                        result.body.jobSpecification?.jobManagerTask
                          ?.containerSettings?.["imageName"],
                      registry: !result.body.jobSpecification?.jobManagerTask
                        ?.containerSettings?.registry
                        ? undefined
                        : {
                            username:
                              result.body.jobSpecification?.jobManagerTask
                                ?.containerSettings?.registry?.["username"],
                            password:
                              result.body.jobSpecification?.jobManagerTask
                                ?.containerSettings?.registry?.["password"],
                            registryServer:
                              result.body.jobSpecification?.jobManagerTask
                                ?.containerSettings?.registry?.[
                                "registryServer"
                              ],
                            identityReference: !result.body.jobSpecification
                              ?.jobManagerTask?.containerSettings?.registry
                              ?.identityReference
                              ? undefined
                              : {
                                  resourceId:
                                    result.body.jobSpecification?.jobManagerTask
                                      ?.containerSettings?.registry
                                      ?.identityReference?.["resourceId"],
                                },
                          },
                      workingDirectory:
                        result.body.jobSpecification?.jobManagerTask
                          ?.containerSettings?.["workingDirectory"],
                    },
                resourceFiles: (
                  result.body.jobSpecification?.jobManagerTask?.[
                    "resourceFiles"
                  ] ?? []
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
                outputFiles: (
                  result.body.jobSpecification?.jobManagerTask?.[
                    "outputFiles"
                  ] ?? []
                ).map((p) => ({
                  filePattern: p["filePattern"],
                  destination: {
                    container: !p.destination.container
                      ? undefined
                      : {
                          path: p.destination.container?.["path"],
                          containerUrl:
                            p.destination.container?.["containerUrl"],
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
                          ).map((p) => ({
                            name: p["name"],
                            value: p["value"],
                          })),
                        },
                  },
                  uploadOptions: {
                    uploadCondition: p.uploadOptions["uploadCondition"],
                  },
                })),
                environmentSettings: (
                  result.body.jobSpecification?.jobManagerTask?.[
                    "environmentSettings"
                  ] ?? []
                ).map((p) => ({ name: p["name"], value: p["value"] })),
                constraints: !result.body.jobSpecification?.jobManagerTask
                  ?.constraints
                  ? undefined
                  : {
                      maxWallClockTime:
                        result.body.jobSpecification?.jobManagerTask
                          ?.constraints?.["maxWallClockTime"],
                      retentionTime:
                        result.body.jobSpecification?.jobManagerTask
                          ?.constraints?.["retentionTime"],
                      maxTaskRetryCount:
                        result.body.jobSpecification?.jobManagerTask
                          ?.constraints?.["maxTaskRetryCount"],
                    },
                requiredSlots:
                  result.body.jobSpecification?.jobManagerTask?.[
                    "requiredSlots"
                  ],
                killJobOnCompletion:
                  result.body.jobSpecification?.jobManagerTask?.[
                    "killJobOnCompletion"
                  ],
                userIdentity: !result.body.jobSpecification?.jobManagerTask
                  ?.userIdentity
                  ? undefined
                  : {
                      username:
                        result.body.jobSpecification?.jobManagerTask
                          ?.userIdentity?.["username"],
                      autoUser: !result.body.jobSpecification?.jobManagerTask
                        ?.userIdentity?.autoUser
                        ? undefined
                        : {
                            scope:
                              result.body.jobSpecification?.jobManagerTask
                                ?.userIdentity?.autoUser?.["scope"],
                            elevationLevel:
                              result.body.jobSpecification?.jobManagerTask
                                ?.userIdentity?.autoUser?.["elevationLevel"],
                          },
                    },
                runExclusive:
                  result.body.jobSpecification?.jobManagerTask?.[
                    "runExclusive"
                  ],
                applicationPackageReferences: (
                  result.body.jobSpecification?.jobManagerTask?.[
                    "applicationPackageReferences"
                  ] ?? []
                ).map((p) => ({
                  applicationId: p["applicationId"],
                  version: p["version"],
                })),
                authenticationTokenSettings: !result.body.jobSpecification
                  ?.jobManagerTask?.authenticationTokenSettings
                  ? undefined
                  : {
                      access:
                        result.body.jobSpecification?.jobManagerTask
                          ?.authenticationTokenSettings?.["access"],
                    },
                allowLowPriorityNode:
                  result.body.jobSpecification?.jobManagerTask?.[
                    "allowLowPriorityNode"
                  ],
              },
          jobPreparationTask: !result.body.jobSpecification?.jobPreparationTask
            ? undefined
            : {
                id: result.body.jobSpecification?.jobPreparationTask?.["id"],
                commandLine:
                  result.body.jobSpecification?.jobPreparationTask?.[
                    "commandLine"
                  ],
                containerSettings: !result.body.jobSpecification
                  ?.jobPreparationTask?.containerSettings
                  ? undefined
                  : {
                      containerRunOptions:
                        result.body.jobSpecification?.jobPreparationTask
                          ?.containerSettings?.["containerRunOptions"],
                      imageName:
                        result.body.jobSpecification?.jobPreparationTask
                          ?.containerSettings?.["imageName"],
                      registry: !result.body.jobSpecification
                        ?.jobPreparationTask?.containerSettings?.registry
                        ? undefined
                        : {
                            username:
                              result.body.jobSpecification?.jobPreparationTask
                                ?.containerSettings?.registry?.["username"],
                            password:
                              result.body.jobSpecification?.jobPreparationTask
                                ?.containerSettings?.registry?.["password"],
                            registryServer:
                              result.body.jobSpecification?.jobPreparationTask
                                ?.containerSettings?.registry?.[
                                "registryServer"
                              ],
                            identityReference: !result.body.jobSpecification
                              ?.jobPreparationTask?.containerSettings?.registry
                              ?.identityReference
                              ? undefined
                              : {
                                  resourceId:
                                    result.body.jobSpecification
                                      ?.jobPreparationTask?.containerSettings
                                      ?.registry?.identityReference?.[
                                      "resourceId"
                                    ],
                                },
                          },
                      workingDirectory:
                        result.body.jobSpecification?.jobPreparationTask
                          ?.containerSettings?.["workingDirectory"],
                    },
                resourceFiles: (
                  result.body.jobSpecification?.jobPreparationTask?.[
                    "resourceFiles"
                  ] ?? []
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
                  result.body.jobSpecification?.jobPreparationTask?.[
                    "environmentSettings"
                  ] ?? []
                ).map((p) => ({ name: p["name"], value: p["value"] })),
                constraints: !result.body.jobSpecification?.jobPreparationTask
                  ?.constraints
                  ? undefined
                  : {
                      maxWallClockTime:
                        result.body.jobSpecification?.jobPreparationTask
                          ?.constraints?.["maxWallClockTime"],
                      retentionTime:
                        result.body.jobSpecification?.jobPreparationTask
                          ?.constraints?.["retentionTime"],
                      maxTaskRetryCount:
                        result.body.jobSpecification?.jobPreparationTask
                          ?.constraints?.["maxTaskRetryCount"],
                    },
                waitForSuccess:
                  result.body.jobSpecification?.jobPreparationTask?.[
                    "waitForSuccess"
                  ],
                userIdentity: !result.body.jobSpecification?.jobPreparationTask
                  ?.userIdentity
                  ? undefined
                  : {
                      username:
                        result.body.jobSpecification?.jobPreparationTask
                          ?.userIdentity?.["username"],
                      autoUser: !result.body.jobSpecification
                        ?.jobPreparationTask?.userIdentity?.autoUser
                        ? undefined
                        : {
                            scope:
                              result.body.jobSpecification?.jobPreparationTask
                                ?.userIdentity?.autoUser?.["scope"],
                            elevationLevel:
                              result.body.jobSpecification?.jobPreparationTask
                                ?.userIdentity?.autoUser?.["elevationLevel"],
                          },
                    },
                rerunOnNodeRebootAfterSuccess:
                  result.body.jobSpecification?.jobPreparationTask?.[
                    "rerunOnNodeRebootAfterSuccess"
                  ],
              },
          jobReleaseTask: !result.body.jobSpecification?.jobReleaseTask
            ? undefined
            : {
                id: result.body.jobSpecification?.jobReleaseTask?.["id"],
                commandLine:
                  result.body.jobSpecification?.jobReleaseTask?.["commandLine"],
                containerSettings: !result.body.jobSpecification?.jobReleaseTask
                  ?.containerSettings
                  ? undefined
                  : {
                      containerRunOptions:
                        result.body.jobSpecification?.jobReleaseTask
                          ?.containerSettings?.["containerRunOptions"],
                      imageName:
                        result.body.jobSpecification?.jobReleaseTask
                          ?.containerSettings?.["imageName"],
                      registry: !result.body.jobSpecification?.jobReleaseTask
                        ?.containerSettings?.registry
                        ? undefined
                        : {
                            username:
                              result.body.jobSpecification?.jobReleaseTask
                                ?.containerSettings?.registry?.["username"],
                            password:
                              result.body.jobSpecification?.jobReleaseTask
                                ?.containerSettings?.registry?.["password"],
                            registryServer:
                              result.body.jobSpecification?.jobReleaseTask
                                ?.containerSettings?.registry?.[
                                "registryServer"
                              ],
                            identityReference: !result.body.jobSpecification
                              ?.jobReleaseTask?.containerSettings?.registry
                              ?.identityReference
                              ? undefined
                              : {
                                  resourceId:
                                    result.body.jobSpecification?.jobReleaseTask
                                      ?.containerSettings?.registry
                                      ?.identityReference?.["resourceId"],
                                },
                          },
                      workingDirectory:
                        result.body.jobSpecification?.jobReleaseTask
                          ?.containerSettings?.["workingDirectory"],
                    },
                resourceFiles: (
                  result.body.jobSpecification?.jobReleaseTask?.[
                    "resourceFiles"
                  ] ?? []
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
                  result.body.jobSpecification?.jobReleaseTask?.[
                    "environmentSettings"
                  ] ?? []
                ).map((p) => ({ name: p["name"], value: p["value"] })),
                maxWallClockTime:
                  result.body.jobSpecification?.jobReleaseTask?.[
                    "maxWallClockTime"
                  ],
                retentionTime:
                  result.body.jobSpecification?.jobReleaseTask?.[
                    "retentionTime"
                  ],
                userIdentity: !result.body.jobSpecification?.jobReleaseTask
                  ?.userIdentity
                  ? undefined
                  : {
                      username:
                        result.body.jobSpecification?.jobReleaseTask
                          ?.userIdentity?.["username"],
                      autoUser: !result.body.jobSpecification?.jobReleaseTask
                        ?.userIdentity?.autoUser
                        ? undefined
                        : {
                            scope:
                              result.body.jobSpecification?.jobReleaseTask
                                ?.userIdentity?.autoUser?.["scope"],
                            elevationLevel:
                              result.body.jobSpecification?.jobReleaseTask
                                ?.userIdentity?.autoUser?.["elevationLevel"],
                          },
                    },
              },
          commonEnvironmentSettings: (
            result.body.jobSpecification?.["commonEnvironmentSettings"] ?? []
          ).map((p) => ({ name: p["name"], value: p["value"] })),
          poolInfo: {
            poolId: result.body.jobSpecification?.poolInfo["poolId"],
            autoPoolSpecification: !result.body.jobSpecification?.poolInfo
              .autoPoolSpecification
              ? undefined
              : {
                  autoPoolIdPrefix:
                    result.body.jobSpecification?.poolInfo
                      .autoPoolSpecification?.["autoPoolIdPrefix"],
                  poolLifetimeOption:
                    result.body.jobSpecification?.poolInfo
                      .autoPoolSpecification?.["poolLifetimeOption"],
                  keepAlive:
                    result.body.jobSpecification?.poolInfo
                      .autoPoolSpecification?.["keepAlive"],
                  pool: !result.body.jobSpecification?.poolInfo
                    .autoPoolSpecification?.pool
                    ? undefined
                    : {
                        displayName:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["displayName"],
                        vmSize:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["vmSize"],
                        cloudServiceConfiguration: !result.body.jobSpecification
                          ?.poolInfo.autoPoolSpecification?.pool
                          ?.cloudServiceConfiguration
                          ? undefined
                          : {
                              osFamily:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.cloudServiceConfiguration?.["osFamily"],
                              osVersion:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.cloudServiceConfiguration?.["osVersion"],
                            },
                        virtualMachineConfiguration: !result.body
                          .jobSpecification?.poolInfo.autoPoolSpecification
                          ?.pool?.virtualMachineConfiguration
                          ? undefined
                          : {
                              imageReference: {
                                publisher:
                                  result.body.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["publisher"],
                                offer:
                                  result.body.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["offer"],
                                sku: result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.imageReference[
                                  "sku"
                                ],
                                version:
                                  result.body.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["version"],
                                virtualMachineImageId:
                                  result.body.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["virtualMachineImageId"],
                                exactVersion:
                                  result.body.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["exactVersion"],
                              },
                              nodeAgentSKUId:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "nodeAgentSKUId"
                                ],
                              windowsConfiguration: !result.body
                                .jobSpecification?.poolInfo
                                .autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.windowsConfiguration
                                ? undefined
                                : {
                                    enableAutomaticUpdates:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.windowsConfiguration?.[
                                        "enableAutomaticUpdates"
                                      ],
                                  },
                              dataDisks: (
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
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
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.[
                                  "licenseType"
                                ],
                              containerConfiguration: !result.body
                                .jobSpecification?.poolInfo
                                .autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.containerConfiguration
                                ? undefined
                                : {
                                    type: result.body.jobSpecification?.poolInfo
                                      .autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration
                                      ?.containerConfiguration?.["type"],
                                    containerImageNames:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.containerConfiguration?.[
                                        "containerImageNames"
                                      ],
                                    containerRegistries: (
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
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
                              diskEncryptionConfiguration: !result.body
                                .jobSpecification?.poolInfo
                                .autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.diskEncryptionConfiguration
                                ? undefined
                                : {
                                    targets:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.diskEncryptionConfiguration?.[
                                        "targets"
                                      ],
                                  },
                              nodePlacementConfiguration: !result.body
                                .jobSpecification?.poolInfo
                                .autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration
                                ?.nodePlacementConfiguration
                                ? undefined
                                : {
                                    policy:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.nodePlacementConfiguration?.[
                                        "policy"
                                      ],
                                  },
                              extensions: (
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
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
                              osDisk: !result.body.jobSpecification?.poolInfo
                                .autoPoolSpecification?.pool
                                ?.virtualMachineConfiguration?.osDisk
                                ? undefined
                                : {
                                    ephemeralOSDiskSettings: !result.body
                                      .jobSpecification?.poolInfo
                                      .autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration?.osDisk
                                      ?.ephemeralOSDiskSettings
                                      ? undefined
                                      : {
                                          placement:
                                            result.body.jobSpecification
                                              ?.poolInfo.autoPoolSpecification
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
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["taskSlotsPerNode"],
                        taskSchedulingPolicy: !result.body.jobSpecification
                          ?.poolInfo.autoPoolSpecification?.pool
                          ?.taskSchedulingPolicy
                          ? undefined
                          : {
                              nodeFillType:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.taskSchedulingPolicy?.["nodeFillType"],
                            },
                        resizeTimeout:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["resizeTimeout"],
                        targetDedicatedNodes:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
                            "targetDedicatedNodes"
                          ],
                        targetLowPriorityNodes:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
                            "targetLowPriorityNodes"
                          ],
                        enableAutoScale:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["enableAutoScale"],
                        autoScaleFormula:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["autoScaleFormula"],
                        autoScaleEvaluationInterval:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
                            "autoScaleEvaluationInterval"
                          ],
                        enableInterNodeCommunication:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
                            "enableInterNodeCommunication"
                          ],
                        networkConfiguration: !result.body.jobSpecification
                          ?.poolInfo.autoPoolSpecification?.pool
                          ?.networkConfiguration
                          ? undefined
                          : {
                              subnetId:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.networkConfiguration?.["subnetId"],
                              dynamicVNetAssignmentScope:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.networkConfiguration?.[
                                  "dynamicVNetAssignmentScope"
                                ],
                              endpointConfiguration: !result.body
                                .jobSpecification?.poolInfo
                                .autoPoolSpecification?.pool
                                ?.networkConfiguration?.endpointConfiguration
                                ? undefined
                                : {
                                    inboundNATPools: (
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
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
                              publicIPAddressConfiguration: !result.body
                                .jobSpecification?.poolInfo
                                .autoPoolSpecification?.pool
                                ?.networkConfiguration
                                ?.publicIPAddressConfiguration
                                ? undefined
                                : {
                                    provision:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.publicIPAddressConfiguration?.[
                                        "provision"
                                      ],
                                    ipAddressIds:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.networkConfiguration
                                        ?.publicIPAddressConfiguration?.[
                                        "ipAddressIds"
                                      ],
                                  },
                            },
                        startTask: !result.body.jobSpecification?.poolInfo
                          .autoPoolSpecification?.pool?.startTask
                          ? undefined
                          : {
                              commandLine:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool?.startTask?.[
                                  "commandLine"
                                ],
                              containerSettings: !result.body.jobSpecification
                                ?.poolInfo.autoPoolSpecification?.pool
                                ?.startTask?.containerSettings
                                ? undefined
                                : {
                                    containerRunOptions:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool?.startTask
                                        ?.containerSettings?.[
                                        "containerRunOptions"
                                      ],
                                    imageName:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool?.startTask
                                        ?.containerSettings?.["imageName"],
                                    registry: !result.body.jobSpecification
                                      ?.poolInfo.autoPoolSpecification?.pool
                                      ?.startTask?.containerSettings?.registry
                                      ? undefined
                                      : {
                                          username:
                                            result.body.jobSpecification
                                              ?.poolInfo.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "username"
                                            ],
                                          password:
                                            result.body.jobSpecification
                                              ?.poolInfo.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "password"
                                            ],
                                          registryServer:
                                            result.body.jobSpecification
                                              ?.poolInfo.autoPoolSpecification
                                              ?.pool?.startTask
                                              ?.containerSettings?.registry?.[
                                              "registryServer"
                                            ],
                                          identityReference: !result.body
                                            .jobSpecification?.poolInfo
                                            .autoPoolSpecification?.pool
                                            ?.startTask?.containerSettings
                                            ?.registry?.identityReference
                                            ? undefined
                                            : {
                                                resourceId:
                                                  result.body.jobSpecification
                                                    ?.poolInfo
                                                    .autoPoolSpecification?.pool
                                                    ?.startTask
                                                    ?.containerSettings
                                                    ?.registry
                                                    ?.identityReference?.[
                                                    "resourceId"
                                                  ],
                                              },
                                        },
                                    workingDirectory:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool?.startTask
                                        ?.containerSettings?.[
                                        "workingDirectory"
                                      ],
                                  },
                              resourceFiles: (
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool?.startTask?.[
                                  "resourceFiles"
                                ] ?? []
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
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool?.startTask?.[
                                  "environmentSettings"
                                ] ?? []
                              ).map((p) => ({
                                name: p["name"],
                                value: p["value"],
                              })),
                              userIdentity: !result.body.jobSpecification
                                ?.poolInfo.autoPoolSpecification?.pool
                                ?.startTask?.userIdentity
                                ? undefined
                                : {
                                    username:
                                      result.body.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool?.startTask
                                        ?.userIdentity?.["username"],
                                    autoUser: !result.body.jobSpecification
                                      ?.poolInfo.autoPoolSpecification?.pool
                                      ?.startTask?.userIdentity?.autoUser
                                      ? undefined
                                      : {
                                          scope:
                                            result.body.jobSpecification
                                              ?.poolInfo.autoPoolSpecification
                                              ?.pool?.startTask?.userIdentity
                                              ?.autoUser?.["scope"],
                                          elevationLevel:
                                            result.body.jobSpecification
                                              ?.poolInfo.autoPoolSpecification
                                              ?.pool?.startTask?.userIdentity
                                              ?.autoUser?.["elevationLevel"],
                                        },
                                  },
                              maxTaskRetryCount:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool?.startTask?.[
                                  "maxTaskRetryCount"
                                ],
                              waitForSuccess:
                                result.body.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool?.startTask?.[
                                  "waitForSuccess"
                                ],
                            },
                        certificateReferences: (
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
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
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
                            "applicationPackageReferences"
                          ] ?? []
                        ).map((p) => ({
                          applicationId: p["applicationId"],
                          version: p["version"],
                        })),
                        applicationLicenses:
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
                            "applicationLicenses"
                          ],
                        userAccounts: (
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["userAccounts"] ?? []
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
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.["metadata"] ?? []
                        ).map((p) => ({ name: p["name"], value: p["value"] })),
                        mountConfiguration: (
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
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
                          result.body.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.[
                            "targetNodeCommunicationMode"
                          ],
                      },
                },
          },
          metadata: (result.body.jobSpecification?.["metadata"] ?? []).map(
            (p) => ({ name: p["name"], value: p["value"] })
          ),
        },
    executionInfo: !result.body.executionInfo
      ? undefined
      : {
          nextRunTime: new Date(
            result.body.executionInfo?.["nextRunTime"] ?? ""
          ),
          recentJob: !result.body.executionInfo?.recentJob
            ? undefined
            : {
                id: result.body.executionInfo?.recentJob?.["id"],
                url: result.body.executionInfo?.recentJob?.["url"],
              },
          endTime: new Date(result.body.executionInfo?.["endTime"] ?? ""),
        },
    metadata: (result.body["metadata"] ?? []).map((p) => ({
      name: p["name"],
      value: p["value"],
    })),
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

export interface JobScheduleupdateJobScheduleOptions
  extends RequestParametersCommon {
  /** A string that uniquely identifies the schedule within the Account. */
  id?: string;
  /** The display name for the schedule. */
  displayName?: string;
  /** The URL of the Job Schedule. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Job Schedule has
   * changed between requests. In particular, you can be pass the ETag with an
   * Update Job Schedule request to specify that your changes should take effect
   * only if nobody else has modified the schedule in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the schedule level data, such as the Job
   * specification or recurrence information, changed. It does not factor in
   * job-level changes such as new Jobs being created or Jobs changing state.
   */
  lastModified?: Date;
  /** The creation time of the Job Schedule. */
  creationTime?: Date;
  /** The state of the Job Schedule. */
  state?: JobScheduleState;
  /** The time at which the Job Schedule entered the current state. */
  stateTransitionTime?: Date;
  /** This property is not present if the Job Schedule is in its initial active state. */
  previousState?: JobScheduleState;
  /** This property is not present if the Job Schedule is in its initial active state. */
  previousStateTransitionTime?: Date;
  /**
   * All times are fixed respective to UTC and are not impacted by daylight saving
   * time.
   */
  schedule?: Schedule;
  /** Specifies details of the Jobs to be created on a schedule. */
  jobSpecification?: JobSpecification;
  /**
   * Contains information about Jobs that have been and will be run under a Job
   * Schedule.
   */
  executionInfo?: JobScheduleExecutionInformation;
  /**
   * The Batch service does not assign any meaning to metadata; it is solely for the
   * use of user code.
   */
  metadata?: MetadataItem[];
  /** Resource usage statistics for a Job Schedule. */
  stats?: JobScheduleStatistics;
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
 * This replaces only the Job Schedule properties specified in the request. For
 * example, if the schedule property is not specified with this request, then the
 * Batch service will keep the existing schedule. Changes to a Job Schedule only
 * impact Jobs created by the schedule after the update has taken place; currently
 * running Jobs are unaffected.
 */
export async function updateJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JobScheduleupdateJobScheduleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}", jobScheduleId)
    .patch({
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
        ...(options.schedule && { schedule: options.schedule }),
        ...(options.jobSpecification && {
          jobSpecification: options.jobSpecification,
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

export interface JobSchedulereplaceJobScheduleOptions
  extends RequestParametersCommon {
  /** A string that uniquely identifies the schedule within the Account. */
  id?: string;
  /** The display name for the schedule. */
  displayName?: string;
  /** The URL of the Job Schedule. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Job Schedule has
   * changed between requests. In particular, you can be pass the ETag with an
   * Update Job Schedule request to specify that your changes should take effect
   * only if nobody else has modified the schedule in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the schedule level data, such as the Job
   * specification or recurrence information, changed. It does not factor in
   * job-level changes such as new Jobs being created or Jobs changing state.
   */
  lastModified?: Date;
  /** The creation time of the Job Schedule. */
  creationTime?: Date;
  /** The state of the Job Schedule. */
  state?: JobScheduleState;
  /** The time at which the Job Schedule entered the current state. */
  stateTransitionTime?: Date;
  /** This property is not present if the Job Schedule is in its initial active state. */
  previousState?: JobScheduleState;
  /** This property is not present if the Job Schedule is in its initial active state. */
  previousStateTransitionTime?: Date;
  /**
   * All times are fixed respective to UTC and are not impacted by daylight saving
   * time.
   */
  schedule?: Schedule;
  /** Specifies details of the Jobs to be created on a schedule. */
  jobSpecification?: JobSpecification;
  /**
   * Contains information about Jobs that have been and will be run under a Job
   * Schedule.
   */
  executionInfo?: JobScheduleExecutionInformation;
  /**
   * The Batch service does not assign any meaning to metadata; it is solely for the
   * use of user code.
   */
  metadata?: MetadataItem[];
  /** Resource usage statistics for a Job Schedule. */
  stats?: JobScheduleStatistics;
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
 * This fully replaces all the updatable properties of the Job Schedule. For
 * example, if the schedule property is not specified with this request, then the
 * Batch service will remove the existing schedule. Changes to a Job Schedule only
 * impact Jobs created by the schedule after the update has taken place; currently
 * running Jobs are unaffected.
 */
export async function replaceJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JobSchedulereplaceJobScheduleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}", jobScheduleId)
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
        ...(options.schedule && { schedule: options.schedule }),
        ...(options.jobSpecification && {
          jobSpecification: options.jobSpecification,
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

export interface JobScheduledisableJobScheduleOptions
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

/** No new Jobs will be created until the Job Schedule is enabled again. */
export async function disableJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JobScheduledisableJobScheduleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}/disable", jobScheduleId)
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

export interface JobScheduleenableJobScheduleOptions
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

/** Enables a Job Schedule. */
export async function enableJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JobScheduleenableJobScheduleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}/enable", jobScheduleId)
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

export interface JobScheduleterminateJobScheduleOptions
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

/** Terminates a Job Schedule. */
export async function terminateJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: JobScheduleterminateJobScheduleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/jobschedules/{jobScheduleId}/terminate", jobScheduleId)
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

export interface JobScheduleaddJobScheduleOptions
  extends RequestParametersCommon {
  /** A string that uniquely identifies the schedule within the Account. */
  id?: string;
  /** The display name for the schedule. */
  displayName?: string;
  /** The URL of the Job Schedule. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Job Schedule has
   * changed between requests. In particular, you can be pass the ETag with an
   * Update Job Schedule request to specify that your changes should take effect
   * only if nobody else has modified the schedule in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the schedule level data, such as the Job
   * specification or recurrence information, changed. It does not factor in
   * job-level changes such as new Jobs being created or Jobs changing state.
   */
  lastModified?: Date;
  /** The creation time of the Job Schedule. */
  creationTime?: Date;
  /** The state of the Job Schedule. */
  state?: JobScheduleState;
  /** The time at which the Job Schedule entered the current state. */
  stateTransitionTime?: Date;
  /** This property is not present if the Job Schedule is in its initial active state. */
  previousState?: JobScheduleState;
  /** This property is not present if the Job Schedule is in its initial active state. */
  previousStateTransitionTime?: Date;
  /**
   * All times are fixed respective to UTC and are not impacted by daylight saving
   * time.
   */
  schedule?: Schedule;
  /** Specifies details of the Jobs to be created on a schedule. */
  jobSpecification?: JobSpecification;
  /**
   * Contains information about Jobs that have been and will be run under a Job
   * Schedule.
   */
  executionInfo?: JobScheduleExecutionInformation;
  /**
   * The Batch service does not assign any meaning to metadata; it is solely for the
   * use of user code.
   */
  metadata?: MetadataItem[];
  /** Resource usage statistics for a Job Schedule. */
  stats?: JobScheduleStatistics;
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

/** Adds a Job Schedule to the specified Account. */
export async function addJobSchedule(
  context: Client,
  options: JobScheduleaddJobScheduleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/jobschedules").post({
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
      ...(options.schedule && { schedule: options.schedule }),
      ...(options.jobSpecification && {
        jobSpecification: options.jobSpecification,
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

export interface JobSchedulelistJobSchedulesOptions
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
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-job-schedules.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

/** Lists all of the Job Schedules in the specified Account. */
export async function listJobSchedules(
  context: Client,
  options: JobSchedulelistJobSchedulesOptions = { requestOptions: {} }
): Promise<BatchJobScheduleListResult> {
  const result = await context.path("/jobschedules").get({
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
      state: p["state"],
      stateTransitionTime: new Date(p["stateTransitionTime"] ?? ""),
      previousState: p["previousState"],
      previousStateTransitionTime: new Date(
        p["previousStateTransitionTime"] ?? ""
      ),
      schedule: !p.schedule
        ? undefined
        : {
            doNotRunUntil: new Date(p.schedule?.["doNotRunUntil"] ?? ""),
            doNotRunAfter: new Date(p.schedule?.["doNotRunAfter"] ?? ""),
            startWindow: p.schedule?.["startWindow"],
            recurrenceInterval: p.schedule?.["recurrenceInterval"],
          },
      jobSpecification: !p.jobSpecification
        ? undefined
        : {
            priority: p.jobSpecification?.["priority"],
            allowTaskPreemption: p.jobSpecification?.["allowTaskPreemption"],
            maxParallelTasks: p.jobSpecification?.["maxParallelTasks"],
            displayName: p.jobSpecification?.["displayName"],
            usesTaskDependencies: p.jobSpecification?.["usesTaskDependencies"],
            onAllTasksComplete: p.jobSpecification?.["onAllTasksComplete"],
            onTaskFailure: p.jobSpecification?.["onTaskFailure"],
            networkConfiguration: !p.jobSpecification?.networkConfiguration
              ? undefined
              : {
                  subnetId:
                    p.jobSpecification?.networkConfiguration?.["subnetId"],
                },
            constraints: !p.jobSpecification?.constraints
              ? undefined
              : {
                  maxWallClockTime:
                    p.jobSpecification?.constraints?.["maxWallClockTime"],
                  maxTaskRetryCount:
                    p.jobSpecification?.constraints?.["maxTaskRetryCount"],
                },
            jobManagerTask: !p.jobSpecification?.jobManagerTask
              ? undefined
              : {
                  id: p.jobSpecification?.jobManagerTask?.["id"],
                  displayName:
                    p.jobSpecification?.jobManagerTask?.["displayName"],
                  commandLine:
                    p.jobSpecification?.jobManagerTask?.["commandLine"],
                  containerSettings: !p.jobSpecification?.jobManagerTask
                    ?.containerSettings
                    ? undefined
                    : {
                        containerRunOptions:
                          p.jobSpecification?.jobManagerTask
                            ?.containerSettings?.["containerRunOptions"],
                        imageName:
                          p.jobSpecification?.jobManagerTask
                            ?.containerSettings?.["imageName"],
                        registry: !p.jobSpecification?.jobManagerTask
                          ?.containerSettings?.registry
                          ? undefined
                          : {
                              username:
                                p.jobSpecification?.jobManagerTask
                                  ?.containerSettings?.registry?.["username"],
                              password:
                                p.jobSpecification?.jobManagerTask
                                  ?.containerSettings?.registry?.["password"],
                              registryServer:
                                p.jobSpecification?.jobManagerTask
                                  ?.containerSettings?.registry?.[
                                  "registryServer"
                                ],
                              identityReference: !p.jobSpecification
                                ?.jobManagerTask?.containerSettings?.registry
                                ?.identityReference
                                ? undefined
                                : {
                                    resourceId:
                                      p.jobSpecification?.jobManagerTask
                                        ?.containerSettings?.registry
                                        ?.identityReference?.["resourceId"],
                                  },
                            },
                        workingDirectory:
                          p.jobSpecification?.jobManagerTask
                            ?.containerSettings?.["workingDirectory"],
                      },
                  resourceFiles: (
                    p.jobSpecification?.jobManagerTask?.["resourceFiles"] ?? []
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
                  outputFiles: (
                    p.jobSpecification?.jobManagerTask?.["outputFiles"] ?? []
                  ).map((p) => ({
                    filePattern: p["filePattern"],
                    destination: {
                      container: !p.destination.container
                        ? undefined
                        : {
                            path: p.destination.container?.["path"],
                            containerUrl:
                              p.destination.container?.["containerUrl"],
                            identityReference: !p.destination.container
                              ?.identityReference
                              ? undefined
                              : {
                                  resourceId:
                                    p.destination.container
                                      ?.identityReference?.["resourceId"],
                                },
                            uploadHeaders: (
                              p.destination.container?.["uploadHeaders"] ?? []
                            ).map((p) => ({
                              name: p["name"],
                              value: p["value"],
                            })),
                          },
                    },
                    uploadOptions: {
                      uploadCondition: p.uploadOptions["uploadCondition"],
                    },
                  })),
                  environmentSettings: (
                    p.jobSpecification?.jobManagerTask?.[
                      "environmentSettings"
                    ] ?? []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                  constraints: !p.jobSpecification?.jobManagerTask?.constraints
                    ? undefined
                    : {
                        maxWallClockTime:
                          p.jobSpecification?.jobManagerTask?.constraints?.[
                            "maxWallClockTime"
                          ],
                        retentionTime:
                          p.jobSpecification?.jobManagerTask?.constraints?.[
                            "retentionTime"
                          ],
                        maxTaskRetryCount:
                          p.jobSpecification?.jobManagerTask?.constraints?.[
                            "maxTaskRetryCount"
                          ],
                      },
                  requiredSlots:
                    p.jobSpecification?.jobManagerTask?.["requiredSlots"],
                  killJobOnCompletion:
                    p.jobSpecification?.jobManagerTask?.["killJobOnCompletion"],
                  userIdentity: !p.jobSpecification?.jobManagerTask
                    ?.userIdentity
                    ? undefined
                    : {
                        username:
                          p.jobSpecification?.jobManagerTask?.userIdentity?.[
                            "username"
                          ],
                        autoUser: !p.jobSpecification?.jobManagerTask
                          ?.userIdentity?.autoUser
                          ? undefined
                          : {
                              scope:
                                p.jobSpecification?.jobManagerTask?.userIdentity
                                  ?.autoUser?.["scope"],
                              elevationLevel:
                                p.jobSpecification?.jobManagerTask?.userIdentity
                                  ?.autoUser?.["elevationLevel"],
                            },
                      },
                  runExclusive:
                    p.jobSpecification?.jobManagerTask?.["runExclusive"],
                  applicationPackageReferences: (
                    p.jobSpecification?.jobManagerTask?.[
                      "applicationPackageReferences"
                    ] ?? []
                  ).map((p) => ({
                    applicationId: p["applicationId"],
                    version: p["version"],
                  })),
                  authenticationTokenSettings: !p.jobSpecification
                    ?.jobManagerTask?.authenticationTokenSettings
                    ? undefined
                    : {
                        access:
                          p.jobSpecification?.jobManagerTask
                            ?.authenticationTokenSettings?.["access"],
                      },
                  allowLowPriorityNode:
                    p.jobSpecification?.jobManagerTask?.[
                      "allowLowPriorityNode"
                    ],
                },
            jobPreparationTask: !p.jobSpecification?.jobPreparationTask
              ? undefined
              : {
                  id: p.jobSpecification?.jobPreparationTask?.["id"],
                  commandLine:
                    p.jobSpecification?.jobPreparationTask?.["commandLine"],
                  containerSettings: !p.jobSpecification?.jobPreparationTask
                    ?.containerSettings
                    ? undefined
                    : {
                        containerRunOptions:
                          p.jobSpecification?.jobPreparationTask
                            ?.containerSettings?.["containerRunOptions"],
                        imageName:
                          p.jobSpecification?.jobPreparationTask
                            ?.containerSettings?.["imageName"],
                        registry: !p.jobSpecification?.jobPreparationTask
                          ?.containerSettings?.registry
                          ? undefined
                          : {
                              username:
                                p.jobSpecification?.jobPreparationTask
                                  ?.containerSettings?.registry?.["username"],
                              password:
                                p.jobSpecification?.jobPreparationTask
                                  ?.containerSettings?.registry?.["password"],
                              registryServer:
                                p.jobSpecification?.jobPreparationTask
                                  ?.containerSettings?.registry?.[
                                  "registryServer"
                                ],
                              identityReference: !p.jobSpecification
                                ?.jobPreparationTask?.containerSettings
                                ?.registry?.identityReference
                                ? undefined
                                : {
                                    resourceId:
                                      p.jobSpecification?.jobPreparationTask
                                        ?.containerSettings?.registry
                                        ?.identityReference?.["resourceId"],
                                  },
                            },
                        workingDirectory:
                          p.jobSpecification?.jobPreparationTask
                            ?.containerSettings?.["workingDirectory"],
                      },
                  resourceFiles: (
                    p.jobSpecification?.jobPreparationTask?.["resourceFiles"] ??
                    []
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
                    p.jobSpecification?.jobPreparationTask?.[
                      "environmentSettings"
                    ] ?? []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                  constraints: !p.jobSpecification?.jobPreparationTask
                    ?.constraints
                    ? undefined
                    : {
                        maxWallClockTime:
                          p.jobSpecification?.jobPreparationTask?.constraints?.[
                            "maxWallClockTime"
                          ],
                        retentionTime:
                          p.jobSpecification?.jobPreparationTask?.constraints?.[
                            "retentionTime"
                          ],
                        maxTaskRetryCount:
                          p.jobSpecification?.jobPreparationTask?.constraints?.[
                            "maxTaskRetryCount"
                          ],
                      },
                  waitForSuccess:
                    p.jobSpecification?.jobPreparationTask?.["waitForSuccess"],
                  userIdentity: !p.jobSpecification?.jobPreparationTask
                    ?.userIdentity
                    ? undefined
                    : {
                        username:
                          p.jobSpecification?.jobPreparationTask
                            ?.userIdentity?.["username"],
                        autoUser: !p.jobSpecification?.jobPreparationTask
                          ?.userIdentity?.autoUser
                          ? undefined
                          : {
                              scope:
                                p.jobSpecification?.jobPreparationTask
                                  ?.userIdentity?.autoUser?.["scope"],
                              elevationLevel:
                                p.jobSpecification?.jobPreparationTask
                                  ?.userIdentity?.autoUser?.["elevationLevel"],
                            },
                      },
                  rerunOnNodeRebootAfterSuccess:
                    p.jobSpecification?.jobPreparationTask?.[
                      "rerunOnNodeRebootAfterSuccess"
                    ],
                },
            jobReleaseTask: !p.jobSpecification?.jobReleaseTask
              ? undefined
              : {
                  id: p.jobSpecification?.jobReleaseTask?.["id"],
                  commandLine:
                    p.jobSpecification?.jobReleaseTask?.["commandLine"],
                  containerSettings: !p.jobSpecification?.jobReleaseTask
                    ?.containerSettings
                    ? undefined
                    : {
                        containerRunOptions:
                          p.jobSpecification?.jobReleaseTask
                            ?.containerSettings?.["containerRunOptions"],
                        imageName:
                          p.jobSpecification?.jobReleaseTask
                            ?.containerSettings?.["imageName"],
                        registry: !p.jobSpecification?.jobReleaseTask
                          ?.containerSettings?.registry
                          ? undefined
                          : {
                              username:
                                p.jobSpecification?.jobReleaseTask
                                  ?.containerSettings?.registry?.["username"],
                              password:
                                p.jobSpecification?.jobReleaseTask
                                  ?.containerSettings?.registry?.["password"],
                              registryServer:
                                p.jobSpecification?.jobReleaseTask
                                  ?.containerSettings?.registry?.[
                                  "registryServer"
                                ],
                              identityReference: !p.jobSpecification
                                ?.jobReleaseTask?.containerSettings?.registry
                                ?.identityReference
                                ? undefined
                                : {
                                    resourceId:
                                      p.jobSpecification?.jobReleaseTask
                                        ?.containerSettings?.registry
                                        ?.identityReference?.["resourceId"],
                                  },
                            },
                        workingDirectory:
                          p.jobSpecification?.jobReleaseTask
                            ?.containerSettings?.["workingDirectory"],
                      },
                  resourceFiles: (
                    p.jobSpecification?.jobReleaseTask?.["resourceFiles"] ?? []
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
                    p.jobSpecification?.jobReleaseTask?.[
                      "environmentSettings"
                    ] ?? []
                  ).map((p) => ({ name: p["name"], value: p["value"] })),
                  maxWallClockTime:
                    p.jobSpecification?.jobReleaseTask?.["maxWallClockTime"],
                  retentionTime:
                    p.jobSpecification?.jobReleaseTask?.["retentionTime"],
                  userIdentity: !p.jobSpecification?.jobReleaseTask
                    ?.userIdentity
                    ? undefined
                    : {
                        username:
                          p.jobSpecification?.jobReleaseTask?.userIdentity?.[
                            "username"
                          ],
                        autoUser: !p.jobSpecification?.jobReleaseTask
                          ?.userIdentity?.autoUser
                          ? undefined
                          : {
                              scope:
                                p.jobSpecification?.jobReleaseTask?.userIdentity
                                  ?.autoUser?.["scope"],
                              elevationLevel:
                                p.jobSpecification?.jobReleaseTask?.userIdentity
                                  ?.autoUser?.["elevationLevel"],
                            },
                      },
                },
            commonEnvironmentSettings: (
              p.jobSpecification?.["commonEnvironmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            poolInfo: {
              poolId: p.jobSpecification?.poolInfo["poolId"],
              autoPoolSpecification: !p.jobSpecification?.poolInfo
                .autoPoolSpecification
                ? undefined
                : {
                    autoPoolIdPrefix:
                      p.jobSpecification?.poolInfo.autoPoolSpecification?.[
                        "autoPoolIdPrefix"
                      ],
                    poolLifetimeOption:
                      p.jobSpecification?.poolInfo.autoPoolSpecification?.[
                        "poolLifetimeOption"
                      ],
                    keepAlive:
                      p.jobSpecification?.poolInfo.autoPoolSpecification?.[
                        "keepAlive"
                      ],
                    pool: !p.jobSpecification?.poolInfo.autoPoolSpecification
                      ?.pool
                      ? undefined
                      : {
                          displayName:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["displayName"],
                          vmSize:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["vmSize"],
                          cloudServiceConfiguration: !p.jobSpecification
                            ?.poolInfo.autoPoolSpecification?.pool
                            ?.cloudServiceConfiguration
                            ? undefined
                            : {
                                osFamily:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.cloudServiceConfiguration?.["osFamily"],
                                osVersion:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.cloudServiceConfiguration?.["osVersion"],
                              },
                          virtualMachineConfiguration: !p.jobSpecification
                            ?.poolInfo.autoPoolSpecification?.pool
                            ?.virtualMachineConfiguration
                            ? undefined
                            : {
                                imageReference: {
                                  publisher:
                                    p.jobSpecification?.poolInfo
                                      .autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration
                                      ?.imageReference["publisher"],
                                  offer:
                                    p.jobSpecification?.poolInfo
                                      .autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration
                                      ?.imageReference["offer"],
                                  sku: p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration
                                    ?.imageReference["sku"],
                                  version:
                                    p.jobSpecification?.poolInfo
                                      .autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration
                                      ?.imageReference["version"],
                                  virtualMachineImageId:
                                    p.jobSpecification?.poolInfo
                                      .autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration
                                      ?.imageReference["virtualMachineImageId"],
                                  exactVersion:
                                    p.jobSpecification?.poolInfo
                                      .autoPoolSpecification?.pool
                                      ?.virtualMachineConfiguration
                                      ?.imageReference["exactVersion"],
                                },
                                nodeAgentSKUId:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration?.[
                                    "nodeAgentSKUId"
                                  ],
                                windowsConfiguration: !p.jobSpecification
                                  ?.poolInfo.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration
                                  ?.windowsConfiguration
                                  ? undefined
                                  : {
                                      enableAutomaticUpdates:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.virtualMachineConfiguration
                                          ?.windowsConfiguration?.[
                                          "enableAutomaticUpdates"
                                        ],
                                    },
                                dataDisks: (
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
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
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.virtualMachineConfiguration?.[
                                    "licenseType"
                                  ],
                                containerConfiguration: !p.jobSpecification
                                  ?.poolInfo.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration
                                  ?.containerConfiguration
                                  ? undefined
                                  : {
                                      type: p.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration
                                        ?.containerConfiguration?.["type"],
                                      containerImageNames:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.virtualMachineConfiguration
                                          ?.containerConfiguration?.[
                                          "containerImageNames"
                                        ],
                                      containerRegistries: (
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
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
                                diskEncryptionConfiguration: !p.jobSpecification
                                  ?.poolInfo.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration
                                  ?.diskEncryptionConfiguration
                                  ? undefined
                                  : {
                                      targets:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.virtualMachineConfiguration
                                          ?.diskEncryptionConfiguration?.[
                                          "targets"
                                        ],
                                    },
                                nodePlacementConfiguration: !p.jobSpecification
                                  ?.poolInfo.autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration
                                  ?.nodePlacementConfiguration
                                  ? undefined
                                  : {
                                      policy:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.virtualMachineConfiguration
                                          ?.nodePlacementConfiguration?.[
                                          "policy"
                                        ],
                                    },
                                extensions: (
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
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
                                osDisk: !p.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.virtualMachineConfiguration?.osDisk
                                  ? undefined
                                  : {
                                      ephemeralOSDiskSettings: !p
                                        .jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool
                                        ?.virtualMachineConfiguration?.osDisk
                                        ?.ephemeralOSDiskSettings
                                        ? undefined
                                        : {
                                            placement:
                                              p.jobSpecification?.poolInfo
                                                .autoPoolSpecification?.pool
                                                ?.virtualMachineConfiguration
                                                ?.osDisk
                                                ?.ephemeralOSDiskSettings?.[
                                                "placement"
                                              ],
                                          },
                                    },
                              },
                          taskSlotsPerNode:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["taskSlotsPerNode"],
                          taskSchedulingPolicy: !p.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.taskSchedulingPolicy
                            ? undefined
                            : {
                                nodeFillType:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.taskSchedulingPolicy?.["nodeFillType"],
                              },
                          resizeTimeout:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["resizeTimeout"],
                          targetDedicatedNodes:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["targetDedicatedNodes"],
                          targetLowPriorityNodes:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["targetLowPriorityNodes"],
                          enableAutoScale:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["enableAutoScale"],
                          autoScaleFormula:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["autoScaleFormula"],
                          autoScaleEvaluationInterval:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["autoScaleEvaluationInterval"],
                          enableInterNodeCommunication:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["enableInterNodeCommunication"],
                          networkConfiguration: !p.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.networkConfiguration
                            ? undefined
                            : {
                                subnetId:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.networkConfiguration?.["subnetId"],
                                dynamicVNetAssignmentScope:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool
                                    ?.networkConfiguration?.[
                                    "dynamicVNetAssignmentScope"
                                  ],
                                endpointConfiguration: !p.jobSpecification
                                  ?.poolInfo.autoPoolSpecification?.pool
                                  ?.networkConfiguration?.endpointConfiguration
                                  ? undefined
                                  : {
                                      inboundNATPools: (
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
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
                                          sourcePortRanges:
                                            p["sourcePortRanges"],
                                        })),
                                      })),
                                    },
                                publicIPAddressConfiguration: !p
                                  .jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool
                                  ?.networkConfiguration
                                  ?.publicIPAddressConfiguration
                                  ? undefined
                                  : {
                                      provision:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.networkConfiguration
                                          ?.publicIPAddressConfiguration?.[
                                          "provision"
                                        ],
                                      ipAddressIds:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.networkConfiguration
                                          ?.publicIPAddressConfiguration?.[
                                          "ipAddressIds"
                                        ],
                                    },
                              },
                          startTask: !p.jobSpecification?.poolInfo
                            .autoPoolSpecification?.pool?.startTask
                            ? undefined
                            : {
                                commandLine:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool?.startTask?.[
                                    "commandLine"
                                  ],
                                containerSettings: !p.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool?.startTask
                                  ?.containerSettings
                                  ? undefined
                                  : {
                                      containerRunOptions:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.startTask?.containerSettings?.[
                                          "containerRunOptions"
                                        ],
                                      imageName:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.startTask?.containerSettings?.[
                                          "imageName"
                                        ],
                                      registry: !p.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool?.startTask
                                        ?.containerSettings?.registry
                                        ? undefined
                                        : {
                                            username:
                                              p.jobSpecification?.poolInfo
                                                .autoPoolSpecification?.pool
                                                ?.startTask?.containerSettings
                                                ?.registry?.["username"],
                                            password:
                                              p.jobSpecification?.poolInfo
                                                .autoPoolSpecification?.pool
                                                ?.startTask?.containerSettings
                                                ?.registry?.["password"],
                                            registryServer:
                                              p.jobSpecification?.poolInfo
                                                .autoPoolSpecification?.pool
                                                ?.startTask?.containerSettings
                                                ?.registry?.["registryServer"],
                                            identityReference: !p
                                              .jobSpecification?.poolInfo
                                              .autoPoolSpecification?.pool
                                              ?.startTask?.containerSettings
                                              ?.registry?.identityReference
                                              ? undefined
                                              : {
                                                  resourceId:
                                                    p.jobSpecification?.poolInfo
                                                      .autoPoolSpecification
                                                      ?.pool?.startTask
                                                      ?.containerSettings
                                                      ?.registry
                                                      ?.identityReference?.[
                                                      "resourceId"
                                                    ],
                                                },
                                          },
                                      workingDirectory:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.startTask?.containerSettings?.[
                                          "workingDirectory"
                                        ],
                                    },
                                resourceFiles: (
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool?.startTask?.[
                                    "resourceFiles"
                                  ] ?? []
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
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool?.startTask?.[
                                    "environmentSettings"
                                  ] ?? []
                                ).map((p) => ({
                                  name: p["name"],
                                  value: p["value"],
                                })),
                                userIdentity: !p.jobSpecification?.poolInfo
                                  .autoPoolSpecification?.pool?.startTask
                                  ?.userIdentity
                                  ? undefined
                                  : {
                                      username:
                                        p.jobSpecification?.poolInfo
                                          .autoPoolSpecification?.pool
                                          ?.startTask?.userIdentity?.[
                                          "username"
                                        ],
                                      autoUser: !p.jobSpecification?.poolInfo
                                        .autoPoolSpecification?.pool?.startTask
                                        ?.userIdentity?.autoUser
                                        ? undefined
                                        : {
                                            scope:
                                              p.jobSpecification?.poolInfo
                                                .autoPoolSpecification?.pool
                                                ?.startTask?.userIdentity
                                                ?.autoUser?.["scope"],
                                            elevationLevel:
                                              p.jobSpecification?.poolInfo
                                                .autoPoolSpecification?.pool
                                                ?.startTask?.userIdentity
                                                ?.autoUser?.["elevationLevel"],
                                          },
                                    },
                                maxTaskRetryCount:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool?.startTask?.[
                                    "maxTaskRetryCount"
                                  ],
                                waitForSuccess:
                                  p.jobSpecification?.poolInfo
                                    .autoPoolSpecification?.pool?.startTask?.[
                                    "waitForSuccess"
                                  ],
                              },
                          certificateReferences: (
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["certificateReferences"] ?? []
                          ).map((p) => ({
                            thumbprint: p["thumbprint"],
                            thumbprintAlgorithm: p["thumbprintAlgorithm"],
                            storeLocation: p["storeLocation"],
                            storeName: p["storeName"],
                            visibility: p["visibility"],
                          })),
                          applicationPackageReferences: (
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["applicationPackageReferences"] ?? []
                          ).map((p) => ({
                            applicationId: p["applicationId"],
                            version: p["version"],
                          })),
                          applicationLicenses:
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["applicationLicenses"],
                          userAccounts: (
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["userAccounts"] ?? []
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
                            windowsUserConfiguration:
                              !p.windowsUserConfiguration
                                ? undefined
                                : {
                                    loginMode:
                                      p.windowsUserConfiguration?.["loginMode"],
                                  },
                          })),
                          metadata: (
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["metadata"] ?? []
                          ).map((p) => ({
                            name: p["name"],
                            value: p["value"],
                          })),
                          mountConfiguration: (
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["mountConfiguration"] ?? []
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
                                              ?.identityReference?.[
                                              "resourceId"
                                            ],
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
                            p.jobSpecification?.poolInfo.autoPoolSpecification
                              ?.pool?.["targetNodeCommunicationMode"],
                        },
                  },
            },
            metadata: (p.jobSpecification?.["metadata"] ?? []).map((p) => ({
              name: p["name"],
              value: p["value"],
            })),
          },
      executionInfo: !p.executionInfo
        ? undefined
        : {
            nextRunTime: new Date(p.executionInfo?.["nextRunTime"] ?? ""),
            recentJob: !p.executionInfo?.recentJob
              ? undefined
              : {
                  id: p.executionInfo?.recentJob?.["id"],
                  url: p.executionInfo?.recentJob?.["url"],
                },
            endTime: new Date(p.executionInfo?.["endTime"] ?? ""),
          },
      metadata: (p["metadata"] ?? []).map((p) => ({
        name: p["name"],
        value: p["value"],
      })),
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
