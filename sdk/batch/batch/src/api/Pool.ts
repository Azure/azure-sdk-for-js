// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CustomPagePoolUsageMetrics,
  PoolStatistics,
  PoolState,
  AllocationState,
  CloudServiceConfiguration,
  VirtualMachineConfiguration,
  ResizeError,
  AutoScaleRun,
  NetworkConfiguration,
  StartTask,
  CertificateReference,
  ApplicationPackageReference,
  TaskSchedulingPolicy,
  UserAccount,
  MetadataItem,
  MountConfiguration,
  BatchPoolIdentity,
  NodeCommunicationMode,
  BatchPoolListResult,
  BatchPool,
  ComputeNodeDeallocationOption,
} from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface PoollistUsageMetricsOptions extends RequestParametersCommon {}

/**
 * If you do not specify a $filter clause including a poolId, the response
 * includes all Pools that existed in the Account in the time range of the
 * returned aggregation intervals. If you do not specify a $filter clause
 * including a startTime or endTime these filters default to the start and end
 * times of the last aggregation interval currently available; that is, only the
 * last aggregation interval is returned.
 */
export async function listUsageMetrics(
  context: Client,
  options: PoollistUsageMetricsOptions = { requestOptions: {} }
): Promise<CustomPagePoolUsageMetrics> {
  const result = await context.path("/poolusagemetrics").get({
    headers: {
      Accept: "application/json",
      ...options.requestOptions?.customHeaders,
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      poolId: p["poolId"],
      startTime: new Date(p["startTime"] ?? ""),
      endTime: new Date(p["endTime"] ?? ""),
      vmSize: p["vmSize"],
      totalCoreHours: p["totalCoreHours"],
    })),
    nextLink: result.body["nextLink"],
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface PoolgetAllPoolLifetimeStatisticsOptions
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
 * Statistics are aggregated across all Pools that have ever existed in the
 * Account, from Account creation to the last update time of the statistics. The
 * statistics may not be immediately available. The Batch service performs
 * periodic roll-up of statistics. The typical delay is about 30 minutes.
 */
export async function getAllPoolLifetimeStatistics(
  context: Client,
  options: PoolgetAllPoolLifetimeStatisticsOptions = { requestOptions: {} }
): Promise<PoolStatistics> {
  const result = await context.path("/lifetimepoolstats").get({
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
    usageStats: !result.body.usageStats
      ? undefined
      : {
          startTime: new Date(result.body.usageStats?.["startTime"] ?? ""),
          lastUpdateTime: new Date(
            result.body.usageStats?.["lastUpdateTime"] ?? ""
          ),
          dedicatedCoreTime: result.body.usageStats?.["dedicatedCoreTime"],
        },
    resourceStats: !result.body.resourceStats
      ? undefined
      : {
          startTime: new Date(result.body.resourceStats?.["startTime"] ?? ""),
          lastUpdateTime: new Date(
            result.body.resourceStats?.["lastUpdateTime"] ?? ""
          ),
          avgCPUPercentage: result.body.resourceStats?.["avgCPUPercentage"],
          avgMemoryGiB: result.body.resourceStats?.["avgMemoryGiB"],
          peakMemoryGiB: result.body.resourceStats?.["peakMemoryGiB"],
          avgDiskGiB: result.body.resourceStats?.["avgDiskGiB"],
          peakDiskGiB: result.body.resourceStats?.["peakDiskGiB"],
          diskReadIOps: result.body.resourceStats?.["diskReadIOps"],
          diskWriteIOps: result.body.resourceStats?.["diskWriteIOps"],
          diskReadGiB: result.body.resourceStats?.["diskReadGiB"],
          diskWriteGiB: result.body.resourceStats?.["diskWriteGiB"],
          networkReadGiB: result.body.resourceStats?.["networkReadGiB"],
          networkWriteGiB: result.body.resourceStats?.["networkWriteGiB"],
        },
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface PooladdPoolOptions extends RequestParametersCommon {
  /**
   * The ID can contain any combination of alphanumeric characters including hyphens
   * and underscores, and cannot contain more than 64 characters. The ID is
   * case-preserving and case-insensitive (that is, you may not have two IDs within
   * an Account that differ only by case).
   */
  id?: string;
  /**
   * The display name need not be unique and can contain any Unicode characters up
   * to a maximum length of 1024.
   */
  displayName?: string;
  /** The URL of the Pool. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Pool has changed
   * between requests. In particular, you can be pass the ETag when updating a Pool
   * to specify that your changes should take effect only if nobody else has
   * modified the Pool in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the Pool level data, such as the
   * targetDedicatedNodes or enableAutoscale settings, changed. It does not factor
   * in node-level changes such as a Compute Node changing state.
   */
  lastModified?: Date;
  /** The creation time of the Pool. */
  creationTime?: Date;
  /** The current state of the Pool. */
  state?: PoolState;
  /** The time at which the Pool entered its current state. */
  stateTransitionTime?: Date;
  /** Whether the Pool is resizing. */
  allocationState?: AllocationState;
  /** The time at which the Pool entered its current allocation state. */
  allocationStateTransitionTime?: Date;
  /**
   * For information about available sizes of virtual machines in Pools, see Choose
   * a VM size for Compute Nodes in an Azure Batch Pool
   * (https://docs.microsoft.com/azure/batch/batch-pool-vm-sizes).
   */
  vmSize?: string;
  /**
   * This property and virtualMachineConfiguration are mutually exclusive and one of
   * the properties must be specified. This property cannot be specified if the
   * Batch Account was created with its poolAllocationMode property set to
   * 'UserSubscription'.
   */
  cloudServiceConfiguration?: CloudServiceConfiguration;
  /**
   * This property and cloudServiceConfiguration are mutually exclusive and one of
   * the properties must be specified.
   */
  virtualMachineConfiguration?: VirtualMachineConfiguration;
  /**
   * This is the timeout for the most recent resize operation. (The initial sizing
   * when the Pool is created counts as a resize.) The default value is 15 minutes.
   */
  resizeTimeout?: string;
  /**
   * This property is set only if one or more errors occurred during the last Pool
   * resize, and only when the Pool allocationState is Steady.
   */
  resizeErrors?: ResizeError[];
  /** The number of dedicated Compute Nodes currently in the Pool. */
  currentDedicatedNodes?: number;
  /**
   * Spot/Low-priority Compute Nodes which have been preempted are included in this
   * count.
   */
  currentLowPriorityNodes?: number;
  /** The desired number of dedicated Compute Nodes in the Pool. */
  targetDedicatedNodes?: number;
  /** The desired number of Spot/Low-priority Compute Nodes in the Pool. */
  targetLowPriorityNodes?: number;
  /**
   * If false, at least one of targetDedicatedNodes and targetLowPriorityNodes must
   * be specified. If true, the autoScaleFormula property is required and the Pool
   * automatically resizes according to the formula. The default value is false.
   */
  enableAutoScale?: boolean;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleFormula?: string;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleEvaluationInterval?: string;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleRun?: AutoScaleRun;
  /**
   * This imposes restrictions on which Compute Nodes can be assigned to the Pool.
   * Specifying this value can reduce the chance of the requested number of Compute
   * Nodes to be allocated in the Pool.
   */
  enableInterNodeCommunication?: boolean;
  /** The network configuration for a Pool. */
  networkConfiguration?: NetworkConfiguration;
  /**
   * Batch will retry Tasks when a recovery operation is triggered on a Node.
   * Examples of recovery operations include (but are not limited to) when an
   * unhealthy Node is rebooted or a Compute Node disappeared due to host failure.
   * Retries due to recovery operations are independent of and are not counted
   * against the maxTaskRetryCount. Even if the maxTaskRetryCount is 0, an internal
   * retry due to a recovery operation may occur. Because of this, all Tasks should
   * be idempotent. This means Tasks need to tolerate being interrupted and
   * restarted without causing any corruption or duplicate data. The best practice
   * for long running Tasks is to use some form of checkpointing. In some cases the
   * StartTask may be re-run even though the Compute Node was not rebooted. Special
   * care should be taken to avoid StartTasks which create breakaway process or
   * install/launch services from the StartTask working directory, as this will
   * block Batch from being able to re-run the StartTask.
   */
  startTask?: StartTask;
  /**
   * For Windows Nodes, the Batch service installs the Certificates to the specified
   * Certificate store and location. For Linux Compute Nodes, the Certificates are
   * stored in a directory inside the Task working directory and an environment
   * variable AZ_BATCH_CERTIFICATES_DIR is supplied to the Task to query for this
   * location. For Certificates with visibility of 'remoteUser', a 'certs' directory
   * is created in the user's home directory (e.g., /home/{user-name}/certs) and
   * Certificates are placed in that directory.
   */
  certificateReferences?: CertificateReference[];
  /**
   * Changes to Package references affect all new Nodes joining the Pool, but do not
   * affect Compute Nodes that are already in the Pool until they are rebooted or
   * reimaged. There is a maximum of 10 Package references on any given Pool.
   */
  applicationPackageReferences?: ApplicationPackageReference[];
  /**
   * The list of application licenses must be a subset of available Batch service
   * application licenses. If a license is requested which is not supported, Pool
   * creation will fail.
   */
  applicationLicenses?: string[];
  /**
   * The default value is 1. The maximum value is the smaller of 4 times the number
   * of cores of the vmSize of the pool or 256.
   */
  taskSlotsPerNode?: number;
  /** If not specified, the default is spread. */
  taskSchedulingPolicy?: TaskSchedulingPolicy;
  /** The list of user Accounts to be created on each Compute Node in the Pool. */
  userAccounts?: UserAccount[];
  /** A list of name-value pairs associated with the Pool as metadata. */
  metadata?: MetadataItem[];
  /**
   * This property is populated only if the CloudPool was retrieved with an expand
   * clause including the 'stats' attribute; otherwise it is null. The statistics
   * may not be immediately available. The Batch service performs periodic roll-up
   * of statistics. The typical delay is about 30 minutes.
   */
  stats?: PoolStatistics;
  /** This supports Azure Files, NFS, CIFS/SMB, and Blobfuse. */
  mountConfiguration?: MountConfiguration[];
  /**
   * The list of user identities associated with the Batch pool. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  identity?: BatchPoolIdentity;
  /** If omitted, the default value is Default. */
  targetNodeCommunicationMode?: NodeCommunicationMode;
  /** Determines how a pool communicates with the Batch service. */
  currentNodeCommunicationMode?: NodeCommunicationMode;
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
 * When naming Pools, avoid including sensitive information such as user names or
 * secret project names. This information may appear in telemetry logs accessible
 * to Microsoft Support engineers.
 */
export async function addPool(
  context: Client,
  options: PooladdPoolOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/pools").post({
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
      ...(options.startTask && { startTask: options.startTask }),
      ...(options.certificateReferences && {
        certificateReferences: options.certificateReferences,
      }),
      ...(options.applicationPackageReferences && {
        applicationPackageReferences: options.applicationPackageReferences,
      }),
      ...(options.metadata && { metadata: options.metadata }),
      ...(options.targetNodeCommunicationMode && {
        targetNodeCommunicationMode: options.targetNodeCommunicationMode,
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

export interface PoollistPoolsOptions extends RequestParametersCommon {
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
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-pools.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

/** Lists all of the Pools in the specified Account. */
export async function listPools(
  context: Client,
  options: PoollistPoolsOptions = { requestOptions: {} }
): Promise<BatchPoolListResult> {
  const result = await context.path("/pools").get({
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
      allocationState: p["allocationState"],
      allocationStateTransitionTime: new Date(
        p["allocationStateTransitionTime"] ?? ""
      ),
      vmSize: p["vmSize"],
      cloudServiceConfiguration: !p.cloudServiceConfiguration
        ? undefined
        : {
            osFamily: p.cloudServiceConfiguration?.["osFamily"],
            osVersion: p.cloudServiceConfiguration?.["osVersion"],
          },
      virtualMachineConfiguration: !p.virtualMachineConfiguration
        ? undefined
        : {
            imageReference: {
              publisher:
                p.virtualMachineConfiguration?.imageReference["publisher"],
              offer: p.virtualMachineConfiguration?.imageReference["offer"],
              sku: p.virtualMachineConfiguration?.imageReference["sku"],
              version: p.virtualMachineConfiguration?.imageReference["version"],
              virtualMachineImageId:
                p.virtualMachineConfiguration?.imageReference[
                  "virtualMachineImageId"
                ],
              exactVersion:
                p.virtualMachineConfiguration?.imageReference["exactVersion"],
            },
            nodeAgentSKUId: p.virtualMachineConfiguration?.["nodeAgentSKUId"],
            windowsConfiguration: !p.virtualMachineConfiguration
              ?.windowsConfiguration
              ? undefined
              : {
                  enableAutomaticUpdates:
                    p.virtualMachineConfiguration?.windowsConfiguration?.[
                      "enableAutomaticUpdates"
                    ],
                },
            dataDisks: (p.virtualMachineConfiguration?.["dataDisks"] ?? []).map(
              (p) => ({
                lun: p["lun"],
                caching: p["caching"],
                diskSizeGB: p["diskSizeGB"],
                storageAccountType: p["storageAccountType"],
              })
            ),
            licenseType: p.virtualMachineConfiguration?.["licenseType"],
            containerConfiguration: !p.virtualMachineConfiguration
              ?.containerConfiguration
              ? undefined
              : {
                  type: p.virtualMachineConfiguration?.containerConfiguration?.[
                    "type"
                  ],
                  containerImageNames:
                    p.virtualMachineConfiguration?.containerConfiguration?.[
                      "containerImageNames"
                    ],
                  containerRegistries: (
                    p.virtualMachineConfiguration?.containerConfiguration?.[
                      "containerRegistries"
                    ] ?? []
                  ).map((p) => ({
                    username: p["username"],
                    password: p["password"],
                    registryServer: p["registryServer"],
                    identityReference: !p.identityReference
                      ? undefined
                      : { resourceId: p.identityReference?.["resourceId"] },
                  })),
                },
            diskEncryptionConfiguration: !p.virtualMachineConfiguration
              ?.diskEncryptionConfiguration
              ? undefined
              : {
                  targets:
                    p.virtualMachineConfiguration
                      ?.diskEncryptionConfiguration?.["targets"],
                },
            nodePlacementConfiguration: !p.virtualMachineConfiguration
              ?.nodePlacementConfiguration
              ? undefined
              : {
                  policy:
                    p.virtualMachineConfiguration?.nodePlacementConfiguration?.[
                      "policy"
                    ],
                },
            extensions: (
              p.virtualMachineConfiguration?.["extensions"] ?? []
            ).map((p) => ({
              name: p["name"],
              publisher: p["publisher"],
              type: p["type"],
              typeHandlerVersion: p["typeHandlerVersion"],
              autoUpgradeMinorVersion: p["autoUpgradeMinorVersion"],
              settings: !p.settings ? undefined : {},
              protectedSettings: !p.protectedSettings ? undefined : {},
              provisionAfterExtensions: p["provisionAfterExtensions"],
            })),
            osDisk: !p.virtualMachineConfiguration?.osDisk
              ? undefined
              : {
                  ephemeralOSDiskSettings: !p.virtualMachineConfiguration
                    ?.osDisk?.ephemeralOSDiskSettings
                    ? undefined
                    : {
                        placement:
                          p.virtualMachineConfiguration?.osDisk
                            ?.ephemeralOSDiskSettings?.["placement"],
                      },
                },
          },
      resizeTimeout: p["resizeTimeout"],
      resizeErrors: (p["resizeErrors"] ?? []).map((p) => ({
        code: p["code"],
        message: p["message"],
        values: (p["values"] ?? []).map((p) => ({
          name: p["name"],
          value: p["value"],
        })),
      })),
      currentDedicatedNodes: p["currentDedicatedNodes"],
      currentLowPriorityNodes: p["currentLowPriorityNodes"],
      targetDedicatedNodes: p["targetDedicatedNodes"],
      targetLowPriorityNodes: p["targetLowPriorityNodes"],
      enableAutoScale: p["enableAutoScale"],
      autoScaleFormula: p["autoScaleFormula"],
      autoScaleEvaluationInterval: p["autoScaleEvaluationInterval"],
      autoScaleRun: !p.autoScaleRun
        ? undefined
        : {
            timestamp: new Date(p.autoScaleRun?.["timestamp"] ?? ""),
            results: p.autoScaleRun?.["results"],
            error: !p.autoScaleRun?.error
              ? undefined
              : {
                  code: p.autoScaleRun?.error?.["code"],
                  message: p.autoScaleRun?.error?.["message"],
                  values: (p.autoScaleRun?.error?.["values"] ?? []).map(
                    (p) => ({ name: p["name"], value: p["value"] })
                  ),
                },
          },
      enableInterNodeCommunication: p["enableInterNodeCommunication"],
      networkConfiguration: !p.networkConfiguration
        ? undefined
        : {
            subnetId: p.networkConfiguration?.["subnetId"],
            dynamicVNetAssignmentScope:
              p.networkConfiguration?.["dynamicVNetAssignmentScope"],
            endpointConfiguration: !p.networkConfiguration
              ?.endpointConfiguration
              ? undefined
              : {
                  inboundNATPools: (
                    p.networkConfiguration?.endpointConfiguration?.[
                      "inboundNATPools"
                    ] ?? []
                  ).map((p) => ({
                    name: p["name"],
                    protocol: p["protocol"],
                    backendPort: p["backendPort"],
                    frontendPortRangeStart: p["frontendPortRangeStart"],
                    frontendPortRangeEnd: p["frontendPortRangeEnd"],
                    networkSecurityGroupRules: (
                      p["networkSecurityGroupRules"] ?? []
                    ).map((p) => ({
                      priority: p["priority"],
                      access: p["access"],
                      sourceAddressPrefix: p["sourceAddressPrefix"],
                      sourcePortRanges: p["sourcePortRanges"],
                    })),
                  })),
                },
            publicIPAddressConfiguration: !p.networkConfiguration
              ?.publicIPAddressConfiguration
              ? undefined
              : {
                  provision:
                    p.networkConfiguration?.publicIPAddressConfiguration?.[
                      "provision"
                    ],
                  ipAddressIds:
                    p.networkConfiguration?.publicIPAddressConfiguration?.[
                      "ipAddressIds"
                    ],
                },
          },
      startTask: !p.startTask
        ? undefined
        : {
            commandLine: p.startTask?.["commandLine"],
            containerSettings: !p.startTask?.containerSettings
              ? undefined
              : {
                  containerRunOptions:
                    p.startTask?.containerSettings?.["containerRunOptions"],
                  imageName: p.startTask?.containerSettings?.["imageName"],
                  registry: !p.startTask?.containerSettings?.registry
                    ? undefined
                    : {
                        username:
                          p.startTask?.containerSettings?.registry?.[
                            "username"
                          ],
                        password:
                          p.startTask?.containerSettings?.registry?.[
                            "password"
                          ],
                        registryServer:
                          p.startTask?.containerSettings?.registry?.[
                            "registryServer"
                          ],
                        identityReference: !p.startTask?.containerSettings
                          ?.registry?.identityReference
                          ? undefined
                          : {
                              resourceId:
                                p.startTask?.containerSettings?.registry
                                  ?.identityReference?.["resourceId"],
                            },
                      },
                  workingDirectory:
                    p.startTask?.containerSettings?.["workingDirectory"],
                },
            resourceFiles: (p.startTask?.["resourceFiles"] ?? []).map((p) => ({
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
              p.startTask?.["environmentSettings"] ?? []
            ).map((p) => ({ name: p["name"], value: p["value"] })),
            userIdentity: !p.startTask?.userIdentity
              ? undefined
              : {
                  username: p.startTask?.userIdentity?.["username"],
                  autoUser: !p.startTask?.userIdentity?.autoUser
                    ? undefined
                    : {
                        scope: p.startTask?.userIdentity?.autoUser?.["scope"],
                        elevationLevel:
                          p.startTask?.userIdentity?.autoUser?.[
                            "elevationLevel"
                          ],
                      },
                },
            maxTaskRetryCount: p.startTask?.["maxTaskRetryCount"],
            waitForSuccess: p.startTask?.["waitForSuccess"],
          },
      certificateReferences: (p["certificateReferences"] ?? []).map((p) => ({
        thumbprint: p["thumbprint"],
        thumbprintAlgorithm: p["thumbprintAlgorithm"],
        storeLocation: p["storeLocation"],
        storeName: p["storeName"],
        visibility: p["visibility"],
      })),
      applicationPackageReferences: (
        p["applicationPackageReferences"] ?? []
      ).map((p) => ({
        applicationId: p["applicationId"],
        version: p["version"],
      })),
      applicationLicenses: p["applicationLicenses"],
      taskSlotsPerNode: p["taskSlotsPerNode"],
      taskSchedulingPolicy: !p.taskSchedulingPolicy
        ? undefined
        : { nodeFillType: p.taskSchedulingPolicy?.["nodeFillType"] },
      userAccounts: (p["userAccounts"] ?? []).map((p) => ({
        name: p["name"],
        password: p["password"],
        elevationLevel: p["elevationLevel"],
        linuxUserConfiguration: !p.linuxUserConfiguration
          ? undefined
          : {
              uid: p.linuxUserConfiguration?.["uid"],
              gid: p.linuxUserConfiguration?.["gid"],
              sshPrivateKey: p.linuxUserConfiguration?.["sshPrivateKey"],
            },
        windowsUserConfiguration: !p.windowsUserConfiguration
          ? undefined
          : { loginMode: p.windowsUserConfiguration?.["loginMode"] },
      })),
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
            usageStats: !p.stats?.usageStats
              ? undefined
              : {
                  startTime: new Date(p.stats?.usageStats?.["startTime"] ?? ""),
                  lastUpdateTime: new Date(
                    p.stats?.usageStats?.["lastUpdateTime"] ?? ""
                  ),
                  dedicatedCoreTime: p.stats?.usageStats?.["dedicatedCoreTime"],
                },
            resourceStats: !p.stats?.resourceStats
              ? undefined
              : {
                  startTime: new Date(
                    p.stats?.resourceStats?.["startTime"] ?? ""
                  ),
                  lastUpdateTime: new Date(
                    p.stats?.resourceStats?.["lastUpdateTime"] ?? ""
                  ),
                  avgCPUPercentage:
                    p.stats?.resourceStats?.["avgCPUPercentage"],
                  avgMemoryGiB: p.stats?.resourceStats?.["avgMemoryGiB"],
                  peakMemoryGiB: p.stats?.resourceStats?.["peakMemoryGiB"],
                  avgDiskGiB: p.stats?.resourceStats?.["avgDiskGiB"],
                  peakDiskGiB: p.stats?.resourceStats?.["peakDiskGiB"],
                  diskReadIOps: p.stats?.resourceStats?.["diskReadIOps"],
                  diskWriteIOps: p.stats?.resourceStats?.["diskWriteIOps"],
                  diskReadGiB: p.stats?.resourceStats?.["diskReadGiB"],
                  diskWriteGiB: p.stats?.resourceStats?.["diskWriteGiB"],
                  networkReadGiB: p.stats?.resourceStats?.["networkReadGiB"],
                  networkWriteGiB: p.stats?.resourceStats?.["networkWriteGiB"],
                },
          },
      mountConfiguration: (p["mountConfiguration"] ?? []).map((p) => ({
        azureBlobFileSystemConfiguration: !p.azureBlobFileSystemConfiguration
          ? undefined
          : {
              accountName: p.azureBlobFileSystemConfiguration?.["accountName"],
              containerName:
                p.azureBlobFileSystemConfiguration?.["containerName"],
              accountKey: p.azureBlobFileSystemConfiguration?.["accountKey"],
              sasKey: p.azureBlobFileSystemConfiguration?.["sasKey"],
              blobfuseOptions:
                p.azureBlobFileSystemConfiguration?.["blobfuseOptions"],
              relativeMountPath:
                p.azureBlobFileSystemConfiguration?.["relativeMountPath"],
              identityReference: !p.azureBlobFileSystemConfiguration
                ?.identityReference
                ? undefined
                : {
                    resourceId:
                      p.azureBlobFileSystemConfiguration?.identityReference?.[
                        "resourceId"
                      ],
                  },
            },
        nfsMountConfiguration: !p.nfsMountConfiguration
          ? undefined
          : {
              source: p.nfsMountConfiguration?.["source"],
              relativeMountPath: p.nfsMountConfiguration?.["relativeMountPath"],
              mountOptions: p.nfsMountConfiguration?.["mountOptions"],
            },
        cifsMountConfiguration: !p.cifsMountConfiguration
          ? undefined
          : {
              username: p.cifsMountConfiguration?.["username"],
              source: p.cifsMountConfiguration?.["source"],
              relativeMountPath:
                p.cifsMountConfiguration?.["relativeMountPath"],
              mountOptions: p.cifsMountConfiguration?.["mountOptions"],
              password: p.cifsMountConfiguration?.["password"],
            },
        azureFileShareConfiguration: !p.azureFileShareConfiguration
          ? undefined
          : {
              accountName: p.azureFileShareConfiguration?.["accountName"],
              azureFileUrl: p.azureFileShareConfiguration?.["azureFileUrl"],
              accountKey: p.azureFileShareConfiguration?.["accountKey"],
              relativeMountPath:
                p.azureFileShareConfiguration?.["relativeMountPath"],
              mountOptions: p.azureFileShareConfiguration?.["mountOptions"],
            },
      })),
      identity: !p.identity
        ? undefined
        : {
            type: p.identity?.["type"],
            userAssignedIdentities: (
              p.identity?.["userAssignedIdentities"] ?? []
            ).map((p) => ({
              resourceId: p["resourceId"],
              clientId: p["clientId"],
              principalId: p["principalId"],
            })),
          },
      targetNodeCommunicationMode: p["targetNodeCommunicationMode"],
      currentNodeCommunicationMode: p["currentNodeCommunicationMode"],
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

export interface PooldeletePoolOptions extends RequestParametersCommon {
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
export async function deletePool(
  context: Client,
  poolId: string,
  options: PooldeletePoolOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/pools/{poolId}", poolId).delete({
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

export interface PoolpoolExistsOptions extends RequestParametersCommon {
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

/** Gets basic properties of a Pool. */
export async function poolExists(
  context: Client,
  poolId: string,
  options: PoolpoolExistsOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/pools/{poolId}", poolId).head({
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

export interface PoolgetPoolOptions extends RequestParametersCommon {
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

/** Gets information about the specified Pool. */
export async function getPool(
  context: Client,
  poolId: string,
  options: PoolgetPoolOptions = { requestOptions: {} }
): Promise<BatchPool> {
  const result = await context.path("/pools/{poolId}", poolId).get({
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
    allocationState: result.body["allocationState"],
    allocationStateTransitionTime: new Date(
      result.body["allocationStateTransitionTime"] ?? ""
    ),
    vmSize: result.body["vmSize"],
    cloudServiceConfiguration: !result.body.cloudServiceConfiguration
      ? undefined
      : {
          osFamily: result.body.cloudServiceConfiguration?.["osFamily"],
          osVersion: result.body.cloudServiceConfiguration?.["osVersion"],
        },
    virtualMachineConfiguration: !result.body.virtualMachineConfiguration
      ? undefined
      : {
          imageReference: {
            publisher:
              result.body.virtualMachineConfiguration?.imageReference[
                "publisher"
              ],
            offer:
              result.body.virtualMachineConfiguration?.imageReference["offer"],
            sku: result.body.virtualMachineConfiguration?.imageReference["sku"],
            version:
              result.body.virtualMachineConfiguration?.imageReference[
                "version"
              ],
            virtualMachineImageId:
              result.body.virtualMachineConfiguration?.imageReference[
                "virtualMachineImageId"
              ],
            exactVersion:
              result.body.virtualMachineConfiguration?.imageReference[
                "exactVersion"
              ],
          },
          nodeAgentSKUId:
            result.body.virtualMachineConfiguration?.["nodeAgentSKUId"],
          windowsConfiguration: !result.body.virtualMachineConfiguration
            ?.windowsConfiguration
            ? undefined
            : {
                enableAutomaticUpdates:
                  result.body.virtualMachineConfiguration
                    ?.windowsConfiguration?.["enableAutomaticUpdates"],
              },
          dataDisks: (
            result.body.virtualMachineConfiguration?.["dataDisks"] ?? []
          ).map((p) => ({
            lun: p["lun"],
            caching: p["caching"],
            diskSizeGB: p["diskSizeGB"],
            storageAccountType: p["storageAccountType"],
          })),
          licenseType: result.body.virtualMachineConfiguration?.["licenseType"],
          containerConfiguration: !result.body.virtualMachineConfiguration
            ?.containerConfiguration
            ? undefined
            : {
                type: result.body.virtualMachineConfiguration
                  ?.containerConfiguration?.["type"],
                containerImageNames:
                  result.body.virtualMachineConfiguration
                    ?.containerConfiguration?.["containerImageNames"],
                containerRegistries: (
                  result.body.virtualMachineConfiguration
                    ?.containerConfiguration?.["containerRegistries"] ?? []
                ).map((p) => ({
                  username: p["username"],
                  password: p["password"],
                  registryServer: p["registryServer"],
                  identityReference: !p.identityReference
                    ? undefined
                    : { resourceId: p.identityReference?.["resourceId"] },
                })),
              },
          diskEncryptionConfiguration: !result.body.virtualMachineConfiguration
            ?.diskEncryptionConfiguration
            ? undefined
            : {
                targets:
                  result.body.virtualMachineConfiguration
                    ?.diskEncryptionConfiguration?.["targets"],
              },
          nodePlacementConfiguration: !result.body.virtualMachineConfiguration
            ?.nodePlacementConfiguration
            ? undefined
            : {
                policy:
                  result.body.virtualMachineConfiguration
                    ?.nodePlacementConfiguration?.["policy"],
              },
          extensions: (
            result.body.virtualMachineConfiguration?.["extensions"] ?? []
          ).map((p) => ({
            name: p["name"],
            publisher: p["publisher"],
            type: p["type"],
            typeHandlerVersion: p["typeHandlerVersion"],
            autoUpgradeMinorVersion: p["autoUpgradeMinorVersion"],
            settings: !p.settings ? undefined : {},
            protectedSettings: !p.protectedSettings ? undefined : {},
            provisionAfterExtensions: p["provisionAfterExtensions"],
          })),
          osDisk: !result.body.virtualMachineConfiguration?.osDisk
            ? undefined
            : {
                ephemeralOSDiskSettings: !result.body
                  .virtualMachineConfiguration?.osDisk?.ephemeralOSDiskSettings
                  ? undefined
                  : {
                      placement:
                        result.body.virtualMachineConfiguration?.osDisk
                          ?.ephemeralOSDiskSettings?.["placement"],
                    },
              },
        },
    resizeTimeout: result.body["resizeTimeout"],
    resizeErrors: (result.body["resizeErrors"] ?? []).map((p) => ({
      code: p["code"],
      message: p["message"],
      values: (p["values"] ?? []).map((p) => ({
        name: p["name"],
        value: p["value"],
      })),
    })),
    currentDedicatedNodes: result.body["currentDedicatedNodes"],
    currentLowPriorityNodes: result.body["currentLowPriorityNodes"],
    targetDedicatedNodes: result.body["targetDedicatedNodes"],
    targetLowPriorityNodes: result.body["targetLowPriorityNodes"],
    enableAutoScale: result.body["enableAutoScale"],
    autoScaleFormula: result.body["autoScaleFormula"],
    autoScaleEvaluationInterval: result.body["autoScaleEvaluationInterval"],
    autoScaleRun: !result.body.autoScaleRun
      ? undefined
      : {
          timestamp: new Date(result.body.autoScaleRun?.["timestamp"] ?? ""),
          results: result.body.autoScaleRun?.["results"],
          error: !result.body.autoScaleRun?.error
            ? undefined
            : {
                code: result.body.autoScaleRun?.error?.["code"],
                message: result.body.autoScaleRun?.error?.["message"],
                values: (result.body.autoScaleRun?.error?.["values"] ?? []).map(
                  (p) => ({ name: p["name"], value: p["value"] })
                ),
              },
        },
    enableInterNodeCommunication: result.body["enableInterNodeCommunication"],
    networkConfiguration: !result.body.networkConfiguration
      ? undefined
      : {
          subnetId: result.body.networkConfiguration?.["subnetId"],
          dynamicVNetAssignmentScope:
            result.body.networkConfiguration?.["dynamicVNetAssignmentScope"],
          endpointConfiguration: !result.body.networkConfiguration
            ?.endpointConfiguration
            ? undefined
            : {
                inboundNATPools: (
                  result.body.networkConfiguration?.endpointConfiguration?.[
                    "inboundNATPools"
                  ] ?? []
                ).map((p) => ({
                  name: p["name"],
                  protocol: p["protocol"],
                  backendPort: p["backendPort"],
                  frontendPortRangeStart: p["frontendPortRangeStart"],
                  frontendPortRangeEnd: p["frontendPortRangeEnd"],
                  networkSecurityGroupRules: (
                    p["networkSecurityGroupRules"] ?? []
                  ).map((p) => ({
                    priority: p["priority"],
                    access: p["access"],
                    sourceAddressPrefix: p["sourceAddressPrefix"],
                    sourcePortRanges: p["sourcePortRanges"],
                  })),
                })),
              },
          publicIPAddressConfiguration: !result.body.networkConfiguration
            ?.publicIPAddressConfiguration
            ? undefined
            : {
                provision:
                  result.body.networkConfiguration
                    ?.publicIPAddressConfiguration?.["provision"],
                ipAddressIds:
                  result.body.networkConfiguration
                    ?.publicIPAddressConfiguration?.["ipAddressIds"],
              },
        },
    startTask: !result.body.startTask
      ? undefined
      : {
          commandLine: result.body.startTask?.["commandLine"],
          containerSettings: !result.body.startTask?.containerSettings
            ? undefined
            : {
                containerRunOptions:
                  result.body.startTask?.containerSettings?.[
                    "containerRunOptions"
                  ],
                imageName:
                  result.body.startTask?.containerSettings?.["imageName"],
                registry: !result.body.startTask?.containerSettings?.registry
                  ? undefined
                  : {
                      username:
                        result.body.startTask?.containerSettings?.registry?.[
                          "username"
                        ],
                      password:
                        result.body.startTask?.containerSettings?.registry?.[
                          "password"
                        ],
                      registryServer:
                        result.body.startTask?.containerSettings?.registry?.[
                          "registryServer"
                        ],
                      identityReference: !result.body.startTask
                        ?.containerSettings?.registry?.identityReference
                        ? undefined
                        : {
                            resourceId:
                              result.body.startTask?.containerSettings?.registry
                                ?.identityReference?.["resourceId"],
                          },
                    },
                workingDirectory:
                  result.body.startTask?.containerSettings?.[
                    "workingDirectory"
                  ],
              },
          resourceFiles: (result.body.startTask?.["resourceFiles"] ?? []).map(
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
            result.body.startTask?.["environmentSettings"] ?? []
          ).map((p) => ({ name: p["name"], value: p["value"] })),
          userIdentity: !result.body.startTask?.userIdentity
            ? undefined
            : {
                username: result.body.startTask?.userIdentity?.["username"],
                autoUser: !result.body.startTask?.userIdentity?.autoUser
                  ? undefined
                  : {
                      scope:
                        result.body.startTask?.userIdentity?.autoUser?.[
                          "scope"
                        ],
                      elevationLevel:
                        result.body.startTask?.userIdentity?.autoUser?.[
                          "elevationLevel"
                        ],
                    },
              },
          maxTaskRetryCount: result.body.startTask?.["maxTaskRetryCount"],
          waitForSuccess: result.body.startTask?.["waitForSuccess"],
        },
    certificateReferences: (result.body["certificateReferences"] ?? []).map(
      (p) => ({
        thumbprint: p["thumbprint"],
        thumbprintAlgorithm: p["thumbprintAlgorithm"],
        storeLocation: p["storeLocation"],
        storeName: p["storeName"],
        visibility: p["visibility"],
      })
    ),
    applicationPackageReferences: (
      result.body["applicationPackageReferences"] ?? []
    ).map((p) => ({
      applicationId: p["applicationId"],
      version: p["version"],
    })),
    applicationLicenses: result.body["applicationLicenses"],
    taskSlotsPerNode: result.body["taskSlotsPerNode"],
    taskSchedulingPolicy: !result.body.taskSchedulingPolicy
      ? undefined
      : { nodeFillType: result.body.taskSchedulingPolicy?.["nodeFillType"] },
    userAccounts: (result.body["userAccounts"] ?? []).map((p) => ({
      name: p["name"],
      password: p["password"],
      elevationLevel: p["elevationLevel"],
      linuxUserConfiguration: !p.linuxUserConfiguration
        ? undefined
        : {
            uid: p.linuxUserConfiguration?.["uid"],
            gid: p.linuxUserConfiguration?.["gid"],
            sshPrivateKey: p.linuxUserConfiguration?.["sshPrivateKey"],
          },
      windowsUserConfiguration: !p.windowsUserConfiguration
        ? undefined
        : { loginMode: p.windowsUserConfiguration?.["loginMode"] },
    })),
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
          usageStats: !result.body.stats?.usageStats
            ? undefined
            : {
                startTime: new Date(
                  result.body.stats?.usageStats?.["startTime"] ?? ""
                ),
                lastUpdateTime: new Date(
                  result.body.stats?.usageStats?.["lastUpdateTime"] ?? ""
                ),
                dedicatedCoreTime:
                  result.body.stats?.usageStats?.["dedicatedCoreTime"],
              },
          resourceStats: !result.body.stats?.resourceStats
            ? undefined
            : {
                startTime: new Date(
                  result.body.stats?.resourceStats?.["startTime"] ?? ""
                ),
                lastUpdateTime: new Date(
                  result.body.stats?.resourceStats?.["lastUpdateTime"] ?? ""
                ),
                avgCPUPercentage:
                  result.body.stats?.resourceStats?.["avgCPUPercentage"],
                avgMemoryGiB:
                  result.body.stats?.resourceStats?.["avgMemoryGiB"],
                peakMemoryGiB:
                  result.body.stats?.resourceStats?.["peakMemoryGiB"],
                avgDiskGiB: result.body.stats?.resourceStats?.["avgDiskGiB"],
                peakDiskGiB: result.body.stats?.resourceStats?.["peakDiskGiB"],
                diskReadIOps:
                  result.body.stats?.resourceStats?.["diskReadIOps"],
                diskWriteIOps:
                  result.body.stats?.resourceStats?.["diskWriteIOps"],
                diskReadGiB: result.body.stats?.resourceStats?.["diskReadGiB"],
                diskWriteGiB:
                  result.body.stats?.resourceStats?.["diskWriteGiB"],
                networkReadGiB:
                  result.body.stats?.resourceStats?.["networkReadGiB"],
                networkWriteGiB:
                  result.body.stats?.resourceStats?.["networkWriteGiB"],
              },
        },
    mountConfiguration: (result.body["mountConfiguration"] ?? []).map((p) => ({
      azureBlobFileSystemConfiguration: !p.azureBlobFileSystemConfiguration
        ? undefined
        : {
            accountName: p.azureBlobFileSystemConfiguration?.["accountName"],
            containerName:
              p.azureBlobFileSystemConfiguration?.["containerName"],
            accountKey: p.azureBlobFileSystemConfiguration?.["accountKey"],
            sasKey: p.azureBlobFileSystemConfiguration?.["sasKey"],
            blobfuseOptions:
              p.azureBlobFileSystemConfiguration?.["blobfuseOptions"],
            relativeMountPath:
              p.azureBlobFileSystemConfiguration?.["relativeMountPath"],
            identityReference: !p.azureBlobFileSystemConfiguration
              ?.identityReference
              ? undefined
              : {
                  resourceId:
                    p.azureBlobFileSystemConfiguration?.identityReference?.[
                      "resourceId"
                    ],
                },
          },
      nfsMountConfiguration: !p.nfsMountConfiguration
        ? undefined
        : {
            source: p.nfsMountConfiguration?.["source"],
            relativeMountPath: p.nfsMountConfiguration?.["relativeMountPath"],
            mountOptions: p.nfsMountConfiguration?.["mountOptions"],
          },
      cifsMountConfiguration: !p.cifsMountConfiguration
        ? undefined
        : {
            username: p.cifsMountConfiguration?.["username"],
            source: p.cifsMountConfiguration?.["source"],
            relativeMountPath: p.cifsMountConfiguration?.["relativeMountPath"],
            mountOptions: p.cifsMountConfiguration?.["mountOptions"],
            password: p.cifsMountConfiguration?.["password"],
          },
      azureFileShareConfiguration: !p.azureFileShareConfiguration
        ? undefined
        : {
            accountName: p.azureFileShareConfiguration?.["accountName"],
            azureFileUrl: p.azureFileShareConfiguration?.["azureFileUrl"],
            accountKey: p.azureFileShareConfiguration?.["accountKey"],
            relativeMountPath:
              p.azureFileShareConfiguration?.["relativeMountPath"],
            mountOptions: p.azureFileShareConfiguration?.["mountOptions"],
          },
    })),
    identity: !result.body.identity
      ? undefined
      : {
          type: result.body.identity?.["type"],
          userAssignedIdentities: (
            result.body.identity?.["userAssignedIdentities"] ?? []
          ).map((p) => ({
            resourceId: p["resourceId"],
            clientId: p["clientId"],
            principalId: p["principalId"],
          })),
        },
    targetNodeCommunicationMode: result.body["targetNodeCommunicationMode"],
    currentNodeCommunicationMode: result.body["currentNodeCommunicationMode"],
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface PoolupdatePoolOptions extends RequestParametersCommon {
  /**
   * The ID can contain any combination of alphanumeric characters including hyphens
   * and underscores, and cannot contain more than 64 characters. The ID is
   * case-preserving and case-insensitive (that is, you may not have two IDs within
   * an Account that differ only by case).
   */
  id?: string;
  /**
   * The display name need not be unique and can contain any Unicode characters up
   * to a maximum length of 1024.
   */
  displayName?: string;
  /** The URL of the Pool. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Pool has changed
   * between requests. In particular, you can be pass the ETag when updating a Pool
   * to specify that your changes should take effect only if nobody else has
   * modified the Pool in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the Pool level data, such as the
   * targetDedicatedNodes or enableAutoscale settings, changed. It does not factor
   * in node-level changes such as a Compute Node changing state.
   */
  lastModified?: Date;
  /** The creation time of the Pool. */
  creationTime?: Date;
  /** The current state of the Pool. */
  state?: PoolState;
  /** The time at which the Pool entered its current state. */
  stateTransitionTime?: Date;
  /** Whether the Pool is resizing. */
  allocationState?: AllocationState;
  /** The time at which the Pool entered its current allocation state. */
  allocationStateTransitionTime?: Date;
  /**
   * For information about available sizes of virtual machines in Pools, see Choose
   * a VM size for Compute Nodes in an Azure Batch Pool
   * (https://docs.microsoft.com/azure/batch/batch-pool-vm-sizes).
   */
  vmSize?: string;
  /**
   * This property and virtualMachineConfiguration are mutually exclusive and one of
   * the properties must be specified. This property cannot be specified if the
   * Batch Account was created with its poolAllocationMode property set to
   * 'UserSubscription'.
   */
  cloudServiceConfiguration?: CloudServiceConfiguration;
  /**
   * This property and cloudServiceConfiguration are mutually exclusive and one of
   * the properties must be specified.
   */
  virtualMachineConfiguration?: VirtualMachineConfiguration;
  /**
   * This is the timeout for the most recent resize operation. (The initial sizing
   * when the Pool is created counts as a resize.) The default value is 15 minutes.
   */
  resizeTimeout?: string;
  /**
   * This property is set only if one or more errors occurred during the last Pool
   * resize, and only when the Pool allocationState is Steady.
   */
  resizeErrors?: ResizeError[];
  /** The number of dedicated Compute Nodes currently in the Pool. */
  currentDedicatedNodes?: number;
  /**
   * Spot/Low-priority Compute Nodes which have been preempted are included in this
   * count.
   */
  currentLowPriorityNodes?: number;
  /** The desired number of dedicated Compute Nodes in the Pool. */
  targetDedicatedNodes?: number;
  /** The desired number of Spot/Low-priority Compute Nodes in the Pool. */
  targetLowPriorityNodes?: number;
  /**
   * If false, at least one of targetDedicatedNodes and targetLowPriorityNodes must
   * be specified. If true, the autoScaleFormula property is required and the Pool
   * automatically resizes according to the formula. The default value is false.
   */
  enableAutoScale?: boolean;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleFormula?: string;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleEvaluationInterval?: string;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleRun?: AutoScaleRun;
  /**
   * This imposes restrictions on which Compute Nodes can be assigned to the Pool.
   * Specifying this value can reduce the chance of the requested number of Compute
   * Nodes to be allocated in the Pool.
   */
  enableInterNodeCommunication?: boolean;
  /** The network configuration for a Pool. */
  networkConfiguration?: NetworkConfiguration;
  /**
   * Batch will retry Tasks when a recovery operation is triggered on a Node.
   * Examples of recovery operations include (but are not limited to) when an
   * unhealthy Node is rebooted or a Compute Node disappeared due to host failure.
   * Retries due to recovery operations are independent of and are not counted
   * against the maxTaskRetryCount. Even if the maxTaskRetryCount is 0, an internal
   * retry due to a recovery operation may occur. Because of this, all Tasks should
   * be idempotent. This means Tasks need to tolerate being interrupted and
   * restarted without causing any corruption or duplicate data. The best practice
   * for long running Tasks is to use some form of checkpointing. In some cases the
   * StartTask may be re-run even though the Compute Node was not rebooted. Special
   * care should be taken to avoid StartTasks which create breakaway process or
   * install/launch services from the StartTask working directory, as this will
   * block Batch from being able to re-run the StartTask.
   */
  startTask?: StartTask;
  /**
   * For Windows Nodes, the Batch service installs the Certificates to the specified
   * Certificate store and location. For Linux Compute Nodes, the Certificates are
   * stored in a directory inside the Task working directory and an environment
   * variable AZ_BATCH_CERTIFICATES_DIR is supplied to the Task to query for this
   * location. For Certificates with visibility of 'remoteUser', a 'certs' directory
   * is created in the user's home directory (e.g., /home/{user-name}/certs) and
   * Certificates are placed in that directory.
   */
  certificateReferences?: CertificateReference[];
  /**
   * Changes to Package references affect all new Nodes joining the Pool, but do not
   * affect Compute Nodes that are already in the Pool until they are rebooted or
   * reimaged. There is a maximum of 10 Package references on any given Pool.
   */
  applicationPackageReferences?: ApplicationPackageReference[];
  /**
   * The list of application licenses must be a subset of available Batch service
   * application licenses. If a license is requested which is not supported, Pool
   * creation will fail.
   */
  applicationLicenses?: string[];
  /**
   * The default value is 1. The maximum value is the smaller of 4 times the number
   * of cores of the vmSize of the pool or 256.
   */
  taskSlotsPerNode?: number;
  /** If not specified, the default is spread. */
  taskSchedulingPolicy?: TaskSchedulingPolicy;
  /** The list of user Accounts to be created on each Compute Node in the Pool. */
  userAccounts?: UserAccount[];
  /** A list of name-value pairs associated with the Pool as metadata. */
  metadata?: MetadataItem[];
  /**
   * This property is populated only if the CloudPool was retrieved with an expand
   * clause including the 'stats' attribute; otherwise it is null. The statistics
   * may not be immediately available. The Batch service performs periodic roll-up
   * of statistics. The typical delay is about 30 minutes.
   */
  stats?: PoolStatistics;
  /** This supports Azure Files, NFS, CIFS/SMB, and Blobfuse. */
  mountConfiguration?: MountConfiguration[];
  /**
   * The list of user identities associated with the Batch pool. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  identity?: BatchPoolIdentity;
  /** If omitted, the default value is Default. */
  targetNodeCommunicationMode?: NodeCommunicationMode;
  /** Determines how a pool communicates with the Batch service. */
  currentNodeCommunicationMode?: NodeCommunicationMode;
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
 * This only replaces the Pool properties specified in the request. For example,
 * if the Pool has a StartTask associated with it, and a request does not specify
 * a StartTask element, then the Pool keeps the existing StartTask.
 */
export async function updatePool(
  context: Client,
  poolId: string,
  options: PoolupdatePoolOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/pools/{poolId}", poolId).patch({
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
      ...(options.startTask && { startTask: options.startTask }),
      ...(options.certificateReferences && {
        certificateReferences: options.certificateReferences,
      }),
      ...(options.applicationPackageReferences && {
        applicationPackageReferences: options.applicationPackageReferences,
      }),
      ...(options.metadata && { metadata: options.metadata }),
      ...(options.targetNodeCommunicationMode && {
        targetNodeCommunicationMode: options.targetNodeCommunicationMode,
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

export interface PooldisableAutoScaleOptions extends RequestParametersCommon {
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

/** Disables automatic scaling for a Pool. */
export async function disableAutoScale(
  context: Client,
  poolId: string,
  options: PooldisableAutoScaleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/pools/{poolId}/disableautoscale", poolId)
    .post({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
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

export interface PoolenableAutoScaleOptions extends RequestParametersCommon {
  /**
   * The formula is checked for validity before it is applied to the Pool. If the
   * formula is not valid, the Batch service rejects the request with detailed error
   * information. For more information about specifying this formula, see
   * Automatically scale Compute Nodes in an Azure Batch Pool
   * (https://azure.microsoft.com/en-us/documentation/articles/batch-automatic-scaling).
   */
  autoScaleFormula?: string;
  /**
   * The default value is 15 minutes. The minimum and maximum value are 5 minutes
   * and 168 hours respectively. If you specify a value less than 5 minutes or
   * greater than 168 hours, the Batch service rejects the request with an invalid
   * property value error; if you are calling the REST API directly, the HTTP status
   * code is 400 (Bad Request). If you specify a new interval, then the existing
   * autoscale evaluation schedule will be stopped and a new autoscale evaluation
   * schedule will be started, with its starting time being the time when this
   * request was issued.
   */
  autoScaleEvaluationInterval?: string;
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
 * You cannot enable automatic scaling on a Pool if a resize operation is in
 * progress on the Pool. If automatic scaling of the Pool is currently disabled,
 * you must specify a valid autoscale formula as part of the request. If automatic
 * scaling of the Pool is already enabled, you may specify a new autoscale formula
 * and/or a new evaluation interval. You cannot call this API for the same Pool
 * more than once every 30 seconds.
 */
export async function enableAutoScale(
  context: Client,
  poolId: string,
  options: PoolenableAutoScaleOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/pools/{poolId}/enableautoscale", poolId)
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
        ...(options.content_type && { "Content-Type": options.content_type }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
      body: {
        ...(options.autoScaleFormula && {
          autoScaleFormula: options.autoScaleFormula,
        }),
        ...(options.autoScaleEvaluationInterval && {
          autoScaleEvaluationInterval: options.autoScaleEvaluationInterval,
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

export interface PoolevaluateAutoScaleOptions extends RequestParametersCommon {
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
 * This API is primarily for validating an autoscale formula, as it simply returns
 * the result without applying the formula to the Pool. The Pool must have auto
 * scaling enabled in order to evaluate a formula.
 */
export async function evaluateAutoScale(
  context: Client,
  autoScaleFormula: string,
  poolId: string,
  options: PoolevaluateAutoScaleOptions = { requestOptions: {} }
): Promise<AutoScaleRun> {
  const result = await context
    .path("/pools/{poolId}/evaluateautoscale", poolId)
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
      body: { autoScaleFormula: autoScaleFormula },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    timestamp: new Date(result.body["timestamp"] ?? ""),
    results: result.body["results"],
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          values: (result.body.error?.["values"] ?? []).map((p) => ({
            name: p["name"],
            value: p["value"],
          })),
        },
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface PoolresizePoolOptions extends RequestParametersCommon {
  /** The desired number of dedicated Compute Nodes in the Pool. */
  targetDedicatedNodes?: number;
  /** The desired number of Spot/Low-priority Compute Nodes in the Pool. */
  targetLowPriorityNodes?: number;
  /**
   * The default value is 15 minutes. The minimum value is 5 minutes. If you specify
   * a value less than 5 minutes, the Batch service returns an error; if you are
   * calling the REST API directly, the HTTP status code is 400 (Bad Request).
   */
  resizeTimeout?: string;
  /** The default value is requeue. */
  nodeDeallocationOption?: ComputeNodeDeallocationOption;
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
 * You can only resize a Pool when its allocation state is steady. If the Pool is
 * already resizing, the request fails with status code 409. When you resize a
 * Pool, the Pool's allocation state changes from steady to resizing. You cannot
 * resize Pools which are configured for automatic scaling. If you try to do this,
 * the Batch service returns an error 409. If you resize a Pool downwards, the
 * Batch service chooses which Compute Nodes to remove. To remove specific Compute
 * Nodes, use the Pool remove Compute Nodes API instead.
 */
export async function resizePool(
  context: Client,
  poolId: string,
  options: PoolresizePoolOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/pools/{poolId}/resize", poolId).post({
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
      ...(options.targetDedicatedNodes && {
        targetDedicatedNodes: options.targetDedicatedNodes,
      }),
      ...(options.targetLowPriorityNodes && {
        targetLowPriorityNodes: options.targetLowPriorityNodes,
      }),
      ...(options.resizeTimeout && { resizeTimeout: options.resizeTimeout }),
      ...(options.nodeDeallocationOption && {
        nodeDeallocationOption: options.nodeDeallocationOption,
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

export interface PoolstopResizePoolOptions extends RequestParametersCommon {
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
 * This does not restore the Pool to its previous state before the resize
 * operation: it only stops any further changes being made, and the Pool maintains
 * its current state. After stopping, the Pool stabilizes at the number of Compute
 * Nodes it was at when the stop operation was done. During the stop operation,
 * the Pool allocation state changes first to stopping and then to steady. A
 * resize operation need not be an explicit resize Pool request; this API can also
 * be used to halt the initial sizing of the Pool when it is created.
 */
export async function stopResizePool(
  context: Client,
  poolId: string,
  options: PoolstopResizePoolOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/pools/{poolId}/stopresize", poolId).post({
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

export interface PoolupdatePoolPropertiesOptions
  extends RequestParametersCommon {
  /**
   * The ID can contain any combination of alphanumeric characters including hyphens
   * and underscores, and cannot contain more than 64 characters. The ID is
   * case-preserving and case-insensitive (that is, you may not have two IDs within
   * an Account that differ only by case).
   */
  id?: string;
  /**
   * The display name need not be unique and can contain any Unicode characters up
   * to a maximum length of 1024.
   */
  displayName?: string;
  /** The URL of the Pool. */
  url?: string;
  /**
   * This is an opaque string. You can use it to detect whether the Pool has changed
   * between requests. In particular, you can be pass the ETag when updating a Pool
   * to specify that your changes should take effect only if nobody else has
   * modified the Pool in the meantime.
   */
  eTag?: string;
  /**
   * This is the last time at which the Pool level data, such as the
   * targetDedicatedNodes or enableAutoscale settings, changed. It does not factor
   * in node-level changes such as a Compute Node changing state.
   */
  lastModified?: Date;
  /** The creation time of the Pool. */
  creationTime?: Date;
  /** The current state of the Pool. */
  state?: PoolState;
  /** The time at which the Pool entered its current state. */
  stateTransitionTime?: Date;
  /** Whether the Pool is resizing. */
  allocationState?: AllocationState;
  /** The time at which the Pool entered its current allocation state. */
  allocationStateTransitionTime?: Date;
  /**
   * For information about available sizes of virtual machines in Pools, see Choose
   * a VM size for Compute Nodes in an Azure Batch Pool
   * (https://docs.microsoft.com/azure/batch/batch-pool-vm-sizes).
   */
  vmSize?: string;
  /**
   * This property and virtualMachineConfiguration are mutually exclusive and one of
   * the properties must be specified. This property cannot be specified if the
   * Batch Account was created with its poolAllocationMode property set to
   * 'UserSubscription'.
   */
  cloudServiceConfiguration?: CloudServiceConfiguration;
  /**
   * This property and cloudServiceConfiguration are mutually exclusive and one of
   * the properties must be specified.
   */
  virtualMachineConfiguration?: VirtualMachineConfiguration;
  /**
   * This is the timeout for the most recent resize operation. (The initial sizing
   * when the Pool is created counts as a resize.) The default value is 15 minutes.
   */
  resizeTimeout?: string;
  /**
   * This property is set only if one or more errors occurred during the last Pool
   * resize, and only when the Pool allocationState is Steady.
   */
  resizeErrors?: ResizeError[];
  /** The number of dedicated Compute Nodes currently in the Pool. */
  currentDedicatedNodes?: number;
  /**
   * Spot/Low-priority Compute Nodes which have been preempted are included in this
   * count.
   */
  currentLowPriorityNodes?: number;
  /** The desired number of dedicated Compute Nodes in the Pool. */
  targetDedicatedNodes?: number;
  /** The desired number of Spot/Low-priority Compute Nodes in the Pool. */
  targetLowPriorityNodes?: number;
  /**
   * If false, at least one of targetDedicatedNodes and targetLowPriorityNodes must
   * be specified. If true, the autoScaleFormula property is required and the Pool
   * automatically resizes according to the formula. The default value is false.
   */
  enableAutoScale?: boolean;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleFormula?: string;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleEvaluationInterval?: string;
  /**
   * This property is set only if the Pool automatically scales, i.e.
   * enableAutoScale is true.
   */
  autoScaleRun?: AutoScaleRun;
  /**
   * This imposes restrictions on which Compute Nodes can be assigned to the Pool.
   * Specifying this value can reduce the chance of the requested number of Compute
   * Nodes to be allocated in the Pool.
   */
  enableInterNodeCommunication?: boolean;
  /** The network configuration for a Pool. */
  networkConfiguration?: NetworkConfiguration;
  /**
   * Batch will retry Tasks when a recovery operation is triggered on a Node.
   * Examples of recovery operations include (but are not limited to) when an
   * unhealthy Node is rebooted or a Compute Node disappeared due to host failure.
   * Retries due to recovery operations are independent of and are not counted
   * against the maxTaskRetryCount. Even if the maxTaskRetryCount is 0, an internal
   * retry due to a recovery operation may occur. Because of this, all Tasks should
   * be idempotent. This means Tasks need to tolerate being interrupted and
   * restarted without causing any corruption or duplicate data. The best practice
   * for long running Tasks is to use some form of checkpointing. In some cases the
   * StartTask may be re-run even though the Compute Node was not rebooted. Special
   * care should be taken to avoid StartTasks which create breakaway process or
   * install/launch services from the StartTask working directory, as this will
   * block Batch from being able to re-run the StartTask.
   */
  startTask?: StartTask;
  /**
   * For Windows Nodes, the Batch service installs the Certificates to the specified
   * Certificate store and location. For Linux Compute Nodes, the Certificates are
   * stored in a directory inside the Task working directory and an environment
   * variable AZ_BATCH_CERTIFICATES_DIR is supplied to the Task to query for this
   * location. For Certificates with visibility of 'remoteUser', a 'certs' directory
   * is created in the user's home directory (e.g., /home/{user-name}/certs) and
   * Certificates are placed in that directory.
   */
  certificateReferences?: CertificateReference[];
  /**
   * Changes to Package references affect all new Nodes joining the Pool, but do not
   * affect Compute Nodes that are already in the Pool until they are rebooted or
   * reimaged. There is a maximum of 10 Package references on any given Pool.
   */
  applicationPackageReferences?: ApplicationPackageReference[];
  /**
   * The list of application licenses must be a subset of available Batch service
   * application licenses. If a license is requested which is not supported, Pool
   * creation will fail.
   */
  applicationLicenses?: string[];
  /**
   * The default value is 1. The maximum value is the smaller of 4 times the number
   * of cores of the vmSize of the pool or 256.
   */
  taskSlotsPerNode?: number;
  /** If not specified, the default is spread. */
  taskSchedulingPolicy?: TaskSchedulingPolicy;
  /** The list of user Accounts to be created on each Compute Node in the Pool. */
  userAccounts?: UserAccount[];
  /** A list of name-value pairs associated with the Pool as metadata. */
  metadata?: MetadataItem[];
  /**
   * This property is populated only if the CloudPool was retrieved with an expand
   * clause including the 'stats' attribute; otherwise it is null. The statistics
   * may not be immediately available. The Batch service performs periodic roll-up
   * of statistics. The typical delay is about 30 minutes.
   */
  stats?: PoolStatistics;
  /** This supports Azure Files, NFS, CIFS/SMB, and Blobfuse. */
  mountConfiguration?: MountConfiguration[];
  /**
   * The list of user identities associated with the Batch pool. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  identity?: BatchPoolIdentity;
  /** If omitted, the default value is Default. */
  targetNodeCommunicationMode?: NodeCommunicationMode;
  /** Determines how a pool communicates with the Batch service. */
  currentNodeCommunicationMode?: NodeCommunicationMode;
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
 * This fully replaces all the updatable properties of the Pool. For example, if
 * the Pool has a StartTask associated with it and if StartTask is not specified
 * with this request, then the Batch service will remove the existing StartTask.
 */
export async function updatePoolProperties(
  context: Client,
  poolId: string,
  options: PoolupdatePoolPropertiesOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/pools/{poolId}/updateproperties", poolId)
    .post({
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
        ...(options.startTask && { startTask: options.startTask }),
        ...(options.certificateReferences && {
          certificateReferences: options.certificateReferences,
        }),
        ...(options.applicationPackageReferences && {
          applicationPackageReferences: options.applicationPackageReferences,
        }),
        ...(options.metadata && { metadata: options.metadata }),
        ...(options.targetNodeCommunicationMode && {
          targetNodeCommunicationMode: options.targetNodeCommunicationMode,
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

export interface PoolremovePoolNodesOptions extends RequestParametersCommon {
  /**
   * The default value is 15 minutes. The minimum value is 5 minutes. If you specify
   * a value less than 5 minutes, the Batch service returns an error; if you are
   * calling the REST API directly, the HTTP status code is 400 (Bad Request).
   */
  resizeTimeout?: string;
  /** The default value is requeue. */
  nodeDeallocationOption?: ComputeNodeDeallocationOption;
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
 * This operation can only run when the allocation state of the Pool is steady.
 * When this operation runs, the allocation state changes from steady to resizing.
 * Each request may remove up to 100 nodes.
 */
export async function removePoolNodes(
  context: Client,
  nodeList: string[],
  poolId: string,
  options: PoolremovePoolNodesOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path("/pools/{poolId}/removenodes", poolId)
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
        ...(options.content_type && { "Content-Type": options.content_type }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
      body: {
        nodeList: nodeList,
        ...(options.resizeTimeout && { resizeTimeout: options.resizeTimeout }),
        ...(options.nodeDeallocationOption && {
          nodeDeallocationOption: options.nodeDeallocationOption,
        }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}
