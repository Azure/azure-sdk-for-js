// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * The agentpool that has the ARM resource and properties.
 * The agentpool will have all information to create an agent pool.
 */
export interface AgentPool extends TrackedResource {
  /** The properties associated with the agent pool */
  properties?: AgentPoolProperties;
}

export function agentPoolSerializer(item: AgentPool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : agentPoolPropertiesSerializer(item["properties"]),
  };
}

export function agentPoolDeserializer(item: any): AgentPool {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : agentPoolPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of agent pool. */
export interface AgentPoolProperties {
  /** The count of agent machine */
  count?: number;
  /** The Tier of agent machine */
  tier?: string;
  /** The OS of agent machine */
  os?: OS;
  /** The Virtual Network Subnet Resource Id of the agent machine */
  virtualNetworkSubnetResourceId?: string;
  /** The provisioning state of this agent pool */
  readonly provisioningState?: ProvisioningState;
}

export function agentPoolPropertiesSerializer(item: AgentPoolProperties): any {
  return {
    count: item["count"],
    tier: item["tier"],
    os: item["os"],
    virtualNetworkSubnetResourceId: item["virtualNetworkSubnetResourceId"],
  };
}

export function agentPoolPropertiesDeserializer(item: any): AgentPoolProperties {
  return {
    count: item["count"],
    tier: item["tier"],
    os: item["os"],
    virtualNetworkSubnetResourceId: item["virtualNetworkSubnetResourceId"],
    provisioningState: item["provisioningState"],
  };
}

/** The OS of agent machine */
export enum KnownOS {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
}

/**
 * The OS of agent machine \
 * {@link KnownOS} can be used interchangeably with OS,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows** \
 * **Linux**
 */
export type OS = string;

/** The provisioning state of this agent pool */
export enum KnownProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of this agent pool \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The parameters for updating an agent pool. */
export interface AgentPoolUpdateParameters {
  /** The ARM resource tags. */
  tags?: Record<string, string>;
  /** The count of agent machine */
  count?: number;
}

export function agentPoolUpdateParametersSerializer(item: AgentPoolUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["count"])
      ? undefined
      : _agentPoolUpdateParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** model interface AgentPoolPropertiesUpdateParameters */
export interface AgentPoolPropertiesUpdateParameters {
  /** The count of agent machine */
  count?: number;
}

export function agentPoolPropertiesUpdateParametersSerializer(
  item: AgentPoolPropertiesUpdateParameters,
): any {
  return { count: item["count"] };
}

/** The collection of agent pools. */
export interface _AgentPoolListResult {
  /** The collection value. */
  value?: AgentPool[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _agentPoolListResultDeserializer(item: any): _AgentPoolListResult {
  return {
    value: !item["value"] ? item["value"] : agentPoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentPoolArraySerializer(result: Array<AgentPool>): any[] {
  return result.map((item) => {
    return agentPoolSerializer(item);
  });
}

export function agentPoolArrayDeserializer(result: Array<AgentPool>): any[] {
  return result.map((item) => {
    return agentPoolDeserializer(item);
  });
}

/** The QueueStatus of Agent Pool */
export interface AgentPoolQueueStatus {
  /** The number of pending runs in the queue */
  count?: number;
}

export function agentPoolQueueStatusDeserializer(item: any): AgentPoolQueueStatus {
  return {
    count: item["count"],
  };
}

/** Run resource properties */
export interface Run extends ProxyResource {
  /** The properties of a run. */
  properties?: RunProperties;
}

export function runDeserializer(item: any): Run {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : runPropertiesDeserializer(item["properties"]),
  };
}

/** The properties for a run. */
export interface RunProperties {
  /** The unique identifier for the run. */
  runId?: string;
  /** The current status of the run. */
  status?: RunStatus;
  /** The last updated time for the run. */
  lastUpdatedTime?: Date;
  /** The type of run. */
  runType?: RunType;
  /** The dedicated agent pool for the run. */
  agentPoolName?: string;
  /** The time the run was scheduled. */
  createTime?: Date;
  /** The time the run started. */
  startTime?: Date;
  /** The time the run finished. */
  finishTime?: Date;
  /** The list of all images that were generated from the run. This is applicable if the run generates base image dependencies. */
  outputImages?: ImageDescriptor[];
  /** The task against which run was scheduled. */
  task?: string;
  /** The image update trigger that caused the run. This is applicable if the task has base image trigger configured. */
  imageUpdateTrigger?: ImageUpdateTrigger;
  /** The source trigger that caused the run. */
  sourceTrigger?: SourceTriggerDescriptor;
  /** The timer trigger that caused the run. */
  timerTrigger?: TimerTriggerDescriptor;
  /** The platform properties against which the run will happen. */
  platform?: PlatformProperties;
  /** The machine configuration of the run agent. */
  agentConfiguration?: AgentProperties;
  /** The scope of the credentials that were used to login to the source registry during this run. */
  sourceRegistryAuth?: string;
  /** The list of custom registries that were logged in during this run. */
  customRegistries?: string[];
  /** The error message received from backend systems after the run is scheduled. */
  readonly runErrorMessage?: string;
  /** The update trigger token passed for the Run. */
  updateTriggerToken?: string;
  /** The image description for the log artifact. */
  readonly logArtifact?: ImageDescriptor;
  /** The provisioning state of a run. */
  provisioningState?: ProvisioningState;
  /** The value that indicates whether archiving is enabled or not. */
  isArchiveEnabled?: boolean;
}

export function runPropertiesDeserializer(item: any): RunProperties {
  return {
    runId: item["runId"],
    status: item["status"],
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    runType: item["runType"],
    agentPoolName: item["agentPoolName"],
    createTime: !item["createTime"] ? item["createTime"] : new Date(item["createTime"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    finishTime: !item["finishTime"] ? item["finishTime"] : new Date(item["finishTime"]),
    outputImages: !item["outputImages"]
      ? item["outputImages"]
      : imageDescriptorArrayDeserializer(item["outputImages"]),
    task: item["task"],
    imageUpdateTrigger: !item["imageUpdateTrigger"]
      ? item["imageUpdateTrigger"]
      : imageUpdateTriggerDeserializer(item["imageUpdateTrigger"]),
    sourceTrigger: !item["sourceTrigger"]
      ? item["sourceTrigger"]
      : sourceTriggerDescriptorDeserializer(item["sourceTrigger"]),
    timerTrigger: !item["timerTrigger"]
      ? item["timerTrigger"]
      : timerTriggerDescriptorDeserializer(item["timerTrigger"]),
    platform: !item["platform"]
      ? item["platform"]
      : platformPropertiesDeserializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesDeserializer(item["agentConfiguration"]),
    sourceRegistryAuth: item["sourceRegistryAuth"],
    customRegistries: !item["customRegistries"]
      ? item["customRegistries"]
      : item["customRegistries"].map((p: any) => {
          return p;
        }),
    runErrorMessage: item["runErrorMessage"],
    updateTriggerToken: item["updateTriggerToken"],
    logArtifact: !item["logArtifact"]
      ? item["logArtifact"]
      : imageDescriptorDeserializer(item["logArtifact"]),
    provisioningState: item["provisioningState"],
    isArchiveEnabled: item["isArchiveEnabled"],
  };
}

/** The current status of the run. */
export enum KnownRunStatus {
  /** Queued */
  Queued = "Queued",
  /** Started */
  Started = "Started",
  /** Running */
  Running = "Running",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Error */
  Error = "Error",
  /** Timeout */
  Timeout = "Timeout",
}

/**
 * The current status of the run. \
 * {@link KnownRunStatus} can be used interchangeably with RunStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queued** \
 * **Started** \
 * **Running** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Error** \
 * **Timeout**
 */
export type RunStatus = string;

/** The type of run. */
export enum KnownRunType {
  /** QuickBuild */
  QuickBuild = "QuickBuild",
  /** QuickRun */
  QuickRun = "QuickRun",
  /** AutoBuild */
  AutoBuild = "AutoBuild",
  /** AutoRun */
  AutoRun = "AutoRun",
}

/**
 * The type of run. \
 * {@link KnownRunType} can be used interchangeably with RunType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **QuickBuild** \
 * **QuickRun** \
 * **AutoBuild** \
 * **AutoRun**
 */
export type RunType = string;

export function imageDescriptorArrayDeserializer(result: Array<ImageDescriptor>): any[] {
  return result.map((item) => {
    return imageDescriptorDeserializer(item);
  });
}

/** Properties for a registry image. */
export interface ImageDescriptor {
  /** The registry login server. */
  registry?: string;
  /** The repository name. */
  repository?: string;
  /** The tag name. */
  tag?: string;
  /** The sha256-based digest of the image manifest. */
  digest?: string;
}

export function imageDescriptorDeserializer(item: any): ImageDescriptor {
  return {
    registry: item["registry"],
    repository: item["repository"],
    tag: item["tag"],
    digest: item["digest"],
  };
}

/** The image update trigger that caused a build. */
export interface ImageUpdateTrigger {
  /** The unique ID of the trigger. */
  id?: string;
  /** The timestamp when the image update happened. */
  timestamp?: Date;
  /** The list of image updates that caused the build. */
  images?: ImageDescriptor[];
}

export function imageUpdateTriggerDeserializer(item: any): ImageUpdateTrigger {
  return {
    id: item["id"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    images: !item["images"] ? item["images"] : imageDescriptorArrayDeserializer(item["images"]),
  };
}

/** The source trigger that caused a run. */
export interface SourceTriggerDescriptor {
  /** The unique ID of the trigger. */
  id?: string;
  /** The event type of the trigger. */
  eventType?: string;
  /** The unique ID that identifies a commit. */
  commitId?: string;
  /** The unique ID that identifies pull request. */
  pullRequestId?: string;
  /** The repository URL. */
  repositoryUrl?: string;
  /** The branch name in the repository. */
  branchName?: string;
  /** The source control provider type. */
  providerType?: string;
}

export function sourceTriggerDescriptorDeserializer(item: any): SourceTriggerDescriptor {
  return {
    id: item["id"],
    eventType: item["eventType"],
    commitId: item["commitId"],
    pullRequestId: item["pullRequestId"],
    repositoryUrl: item["repositoryUrl"],
    branchName: item["branchName"],
    providerType: item["providerType"],
  };
}

/** model interface TimerTriggerDescriptor */
export interface TimerTriggerDescriptor {
  /** The timer trigger name that caused the run. */
  timerTriggerName?: string;
  /** The occurrence that triggered the run. */
  scheduleOccurrence?: string;
}

export function timerTriggerDescriptorDeserializer(item: any): TimerTriggerDescriptor {
  return {
    timerTriggerName: item["timerTriggerName"],
    scheduleOccurrence: item["scheduleOccurrence"],
  };
}

/** The platform properties against which the run has to happen. */
export interface PlatformProperties {
  /** The operating system type required for the run. */
  os: OS;
  /** The OS architecture. */
  architecture?: Architecture;
  /** Variant of the CPU. */
  variant?: Variant;
}

export function platformPropertiesSerializer(item: PlatformProperties): any {
  return { os: item["os"], architecture: item["architecture"], variant: item["variant"] };
}

export function platformPropertiesDeserializer(item: any): PlatformProperties {
  return {
    os: item["os"],
    architecture: item["architecture"],
    variant: item["variant"],
  };
}

/** The OS architecture. */
export enum KnownArchitecture {
  /** amd64 */
  Amd64 = "amd64",
  /** x86 */
  X86 = "x86",
  /** 386 */
  ThreeHundredEightySix = "386",
  /** arm */
  Arm = "arm",
  /** arm64 */
  Arm64 = "arm64",
}

/**
 * The OS architecture. \
 * {@link KnownArchitecture} can be used interchangeably with Architecture,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **amd64** \
 * **x86** \
 * **386** \
 * **arm** \
 * **arm64**
 */
export type Architecture = string;

/** Variant of the CPU. */
export enum KnownVariant {
  /** v6 */
  V6 = "v6",
  /** v7 */
  V7 = "v7",
  /** v8 */
  V8 = "v8",
}

/**
 * Variant of the CPU. \
 * {@link KnownVariant} can be used interchangeably with Variant,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **v6** \
 * **v7** \
 * **v8**
 */
export type Variant = string;

/** The properties that determine the run agent configuration. */
export interface AgentProperties {
  /** The CPU configuration in terms of number of cores required for the run. */
  cpu?: number;
}

export function agentPropertiesSerializer(item: AgentProperties): any {
  return { cpu: item["cpu"] };
}

export function agentPropertiesDeserializer(item: any): AgentProperties {
  return {
    cpu: item["cpu"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The set of run properties that can be updated. */
export interface RunUpdateParameters {
  /** The value that indicates whether archiving is enabled or not. */
  isArchiveEnabled?: boolean;
}

export function runUpdateParametersSerializer(item: RunUpdateParameters): any {
  return { isArchiveEnabled: item["isArchiveEnabled"] };
}

/** The collection of runs. */
export interface _RunListResult {
  /** The collection value. */
  value?: Run[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _runListResultDeserializer(item: any): _RunListResult {
  return {
    value: !item["value"] ? item["value"] : runArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runArrayDeserializer(result: Array<Run>): any[] {
  return result.map((item) => {
    return runDeserializer(item);
  });
}

/** The result of get log link operation. */
export interface RunGetLogResult {
  /** The link to logs for a run on a azure container registry. */
  logLink?: string;
  /** The link to logs in registry for a run on a azure container registry. */
  logArtifactLink?: string;
}

export function runGetLogResultDeserializer(item: any): RunGetLogResult {
  return {
    logLink: item["logLink"],
    logArtifactLink: item["logArtifactLink"],
  };
}

/**
 * The task run that has the ARM resource and properties.
 * The task run will have the information of request and result of a run.
 */
export interface TaskRun extends ProxyResource {
  /** The properties associated with the task run, i.e., request and result of the run */
  properties?: TaskRunProperties;
  /** Identity for the resource. */
  identity?: IdentityProperties;
  /** The location of the resource */
  location?: string;
}

export function taskRunSerializer(item: TaskRun): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : taskRunPropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    location: item["location"],
  };
}

export function taskRunDeserializer(item: any): TaskRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : taskRunPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
    location: item["location"],
  };
}

/** The properties of task run. */
export interface TaskRunProperties {
  /** The provisioning state of this task run */
  readonly provisioningState?: ProvisioningState;
  /** The request (parameters) for the run */
  runRequest?: RunRequestUnion;
  /** The result of this task run */
  readonly runResult?: Run;
  /** How the run should be forced to rerun even if the run request configuration has not changed */
  forceUpdateTag?: string;
}

export function taskRunPropertiesSerializer(item: TaskRunProperties): any {
  return {
    runRequest: !item["runRequest"]
      ? item["runRequest"]
      : runRequestUnionSerializer(item["runRequest"]),
    forceUpdateTag: item["forceUpdateTag"],
  };
}

export function taskRunPropertiesDeserializer(item: any): TaskRunProperties {
  return {
    provisioningState: item["provisioningState"],
    runRequest: !item["runRequest"]
      ? item["runRequest"]
      : runRequestUnionDeserializer(item["runRequest"]),
    runResult: !item["runResult"] ? item["runResult"] : runDeserializer(item["runResult"]),
    forceUpdateTag: item["forceUpdateTag"],
  };
}

/** The request parameters for scheduling a run. */
export interface RunRequest {
  /** The type of the run request. */
  /** The discriminator possible values: DockerBuildRequest, FileTaskRunRequest, TaskRunRequest, EncodedTaskRunRequest */
  type: string;
  /** The value that indicates whether archiving is enabled for the run or not. */
  isArchiveEnabled?: boolean;
  /** The dedicated agent pool for the run. */
  agentPoolName?: string;
  /** The template that describes the repository and tag information for run log artifact. */
  logTemplate?: string;
}

export function runRequestSerializer(item: RunRequest): any {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
  };
}

export function runRequestDeserializer(item: any): RunRequest {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
  };
}

/** Alias for RunRequestUnion */
export type RunRequestUnion =
  | DockerBuildRequest
  | FileTaskRunRequest
  | TaskRunRequest
  | EncodedTaskRunRequest
  | RunRequest;

export function runRequestUnionSerializer(item: RunRequestUnion): any {
  switch (item.type) {
    case "DockerBuildRequest":
      return dockerBuildRequestSerializer(item as DockerBuildRequest);

    case "FileTaskRunRequest":
      return fileTaskRunRequestSerializer(item as FileTaskRunRequest);

    case "TaskRunRequest":
      return taskRunRequestSerializer(item as TaskRunRequest);

    case "EncodedTaskRunRequest":
      return encodedTaskRunRequestSerializer(item as EncodedTaskRunRequest);

    default:
      return runRequestSerializer(item);
  }
}

export function runRequestUnionDeserializer(item: any): RunRequestUnion {
  switch (item.type) {
    case "DockerBuildRequest":
      return dockerBuildRequestDeserializer(item as DockerBuildRequest);

    case "FileTaskRunRequest":
      return fileTaskRunRequestDeserializer(item as FileTaskRunRequest);

    case "TaskRunRequest":
      return taskRunRequestDeserializer(item as TaskRunRequest);

    case "EncodedTaskRunRequest":
      return encodedTaskRunRequestDeserializer(item as EncodedTaskRunRequest);

    default:
      return runRequestDeserializer(item);
  }
}

/** The parameters for a docker quick build. */
export interface DockerBuildRequest extends RunRequest {
  /** The fully qualified image names including the repository and tag. */
  imageNames?: string[];
  /** The value of this property indicates whether the image built should be pushed to the registry or not. */
  isPushEnabled?: boolean;
  /** The value of this property indicates whether the image cache is enabled or not. */
  noCache?: boolean;
  /** The Docker file path relative to the source location. */
  dockerFilePath: string;
  /** The name of the target build stage for the docker build. */
  target?: string;
  /** The collection of override arguments to be used when executing the run. */
  arguments?: Argument[];
  /** Run timeout in seconds. */
  timeout?: number;
  /** The platform properties against which the run has to happen. */
  platform: PlatformProperties;
  /** The machine configuration of the run agent. */
  agentConfiguration?: AgentProperties;
  /**
   * The URL(absolute or relative) of the source context. It can be an URL to a tar or git repository.
   * If it is relative URL, the relative path should be obtained from calling listBuildSourceUploadUrl API.
   */
  sourceLocation?: string;
  /** The properties that describes a set of credentials that will be used when this run is invoked. */
  credentials?: Credentials;
  /** The type of the run request. */
  type: "DockerBuildRequest";
}

export function dockerBuildRequestSerializer(item: DockerBuildRequest): any {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    imageNames: !item["imageNames"]
      ? item["imageNames"]
      : item["imageNames"].map((p: any) => {
          return p;
        }),
    isPushEnabled: item["isPushEnabled"],
    noCache: item["noCache"],
    dockerFilePath: item["dockerFilePath"],
    target: item["target"],
    arguments: !item["arguments"] ? item["arguments"] : argumentArraySerializer(item["arguments"]),
    timeout: item["timeout"],
    platform: platformPropertiesSerializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesSerializer(item["agentConfiguration"]),
    sourceLocation: item["sourceLocation"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
  };
}

export function dockerBuildRequestDeserializer(item: any): DockerBuildRequest {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    imageNames: !item["imageNames"]
      ? item["imageNames"]
      : item["imageNames"].map((p: any) => {
          return p;
        }),
    isPushEnabled: item["isPushEnabled"],
    noCache: item["noCache"],
    dockerFilePath: item["dockerFilePath"],
    target: item["target"],
    arguments: !item["arguments"]
      ? item["arguments"]
      : argumentArrayDeserializer(item["arguments"]),
    timeout: item["timeout"],
    platform: platformPropertiesDeserializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesDeserializer(item["agentConfiguration"]),
    sourceLocation: item["sourceLocation"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsDeserializer(item["credentials"]),
  };
}

export function argumentArraySerializer(result: Array<Argument>): any[] {
  return result.map((item) => {
    return argumentSerializer(item);
  });
}

export function argumentArrayDeserializer(result: Array<Argument>): any[] {
  return result.map((item) => {
    return argumentDeserializer(item);
  });
}

/** The properties of a run argument. */
export interface Argument {
  /** The name of the argument. */
  name: string;
  /** The value of the argument. */
  value: string;
  /** Flag to indicate whether the argument represents a secret and want to be removed from build logs. */
  isSecret?: boolean;
}

export function argumentSerializer(item: Argument): any {
  return { name: item["name"], value: item["value"], isSecret: item["isSecret"] };
}

export function argumentDeserializer(item: any): Argument {
  return {
    name: item["name"],
    value: item["value"],
    isSecret: item["isSecret"],
  };
}

/** The parameters that describes a set of credentials that will be used when a run is invoked. */
export interface Credentials {
  /** Describes the credential parameters for accessing the source registry. */
  sourceRegistry?: SourceRegistryCredentials;
  /**
   * Describes the credential parameters for accessing other custom registries. The key
   * for the dictionary item will be the registry login server (myregistry.azurecr.io) and
   * the value of the item will be the registry credentials for accessing the registry.
   */
  customRegistries?: Record<string, CustomRegistryCredentials>;
}

export function credentialsSerializer(item: Credentials): any {
  return {
    sourceRegistry: !item["sourceRegistry"]
      ? item["sourceRegistry"]
      : sourceRegistryCredentialsSerializer(item["sourceRegistry"]),
    customRegistries: !item["customRegistries"]
      ? item["customRegistries"]
      : customRegistryCredentialsRecordSerializer(item["customRegistries"]),
  };
}

export function credentialsDeserializer(item: any): Credentials {
  return {
    sourceRegistry: !item["sourceRegistry"]
      ? item["sourceRegistry"]
      : sourceRegistryCredentialsDeserializer(item["sourceRegistry"]),
    customRegistries: !item["customRegistries"]
      ? item["customRegistries"]
      : customRegistryCredentialsRecordDeserializer(item["customRegistries"]),
  };
}

/** Describes the credential parameters for accessing the source registry. */
export interface SourceRegistryCredentials {
  /**
   * The Entra identity used for source registry login.
   * The value is `[system]` for system-assigned managed identity, `[caller]` for caller identity,
   * and client ID for user-assigned managed identity.
   */
  identity?: string;
  /**
   * The authentication mode which determines the source registry login scope. The credentials for the source registry
   * will be generated using the given scope. These credentials will be used to login to
   * the source registry during the run.
   */
  loginMode?: SourceRegistryLoginMode;
}

export function sourceRegistryCredentialsSerializer(item: SourceRegistryCredentials): any {
  return { identity: item["identity"], loginMode: item["loginMode"] };
}

export function sourceRegistryCredentialsDeserializer(item: any): SourceRegistryCredentials {
  return {
    identity: item["identity"],
    loginMode: item["loginMode"],
  };
}

/**
 * The authentication mode which determines the source registry login scope. The credentials for the source registry
 * will be generated using the given scope. These credentials will be used to login to
 * the source registry during the run.
 */
export enum KnownSourceRegistryLoginMode {
  /** None */
  None = "None",
  /** Default */
  Default = "Default",
}

/**
 * The authentication mode which determines the source registry login scope. The credentials for the source registry
 * will be generated using the given scope. These credentials will be used to login to
 * the source registry during the run. \
 * {@link KnownSourceRegistryLoginMode} can be used interchangeably with SourceRegistryLoginMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Default**
 */
export type SourceRegistryLoginMode = string;

export function customRegistryCredentialsRecordSerializer(
  item: Record<string, CustomRegistryCredentials>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : customRegistryCredentialsSerializer(item[key]);
  });
  return result;
}

export function customRegistryCredentialsRecordDeserializer(
  item: Record<string, any>,
): Record<string, CustomRegistryCredentials> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : customRegistryCredentialsDeserializer(item[key]);
  });
  return result;
}

/** Describes the credentials that will be used to access a custom registry during a run. */
export interface CustomRegistryCredentials {
  /** The username for logging into the custom registry. */
  userName?: SecretObject;
  /**
   * The password for logging into the custom registry. The password is a secret
   * object that allows multiple ways of providing the value for it.
   */
  password?: SecretObject;
  /**
   * Indicates the managed identity assigned to the custom credential. If a user-assigned identity
   * this value is the Client ID. If a system-assigned identity, the value will be `system`. In
   * the case of a system-assigned identity, the Client ID will be determined by the runner. This
   * identity may be used to authenticate to key vault to retrieve credentials or it may be the only
   * source of authentication used for accessing the registry.
   */
  identity?: string;
}

export function customRegistryCredentialsSerializer(item: CustomRegistryCredentials): any {
  return {
    userName: !item["userName"] ? item["userName"] : secretObjectSerializer(item["userName"]),
    password: !item["password"] ? item["password"] : secretObjectSerializer(item["password"]),
    identity: item["identity"],
  };
}

export function customRegistryCredentialsDeserializer(item: any): CustomRegistryCredentials {
  return {
    userName: !item["userName"] ? item["userName"] : secretObjectDeserializer(item["userName"]),
    password: !item["password"] ? item["password"] : secretObjectDeserializer(item["password"]),
    identity: item["identity"],
  };
}

/** Describes the properties of a secret object value. */
export interface SecretObject {
  /**
   * The value of the secret. The format of this value will be determined
   * based on the type of the secret object. If the type is Opaque, the value will be
   * used as is without any modification.
   */
  value?: string;
  /**
   * The type of the secret object which determines how the value of the secret object has to be
   * interpreted.
   */
  type?: SecretObjectType;
}

export function secretObjectSerializer(item: SecretObject): any {
  return { value: item["value"], type: item["type"] };
}

export function secretObjectDeserializer(item: any): SecretObject {
  return {
    value: item["value"],
    type: item["type"],
  };
}

/**
 * The type of the secret object which determines how the value of the secret object has to be
 * interpreted.
 */
export enum KnownSecretObjectType {
  /** Opaque */
  Opaque = "Opaque",
  /** Vaultsecret */
  Vaultsecret = "Vaultsecret",
}

/**
 * The type of the secret object which determines how the value of the secret object has to be
 * interpreted. \
 * {@link KnownSecretObjectType} can be used interchangeably with SecretObjectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Opaque** \
 * **Vaultsecret**
 */
export type SecretObjectType = string;

/** The request parameters for a scheduling run against a task file. */
export interface FileTaskRunRequest extends RunRequest {
  /** The template/definition file path relative to the source. */
  taskFilePath: string;
  /** The values/parameters file path relative to the source. */
  valuesFilePath?: string;
  /** The collection of overridable values that can be passed when running a task. */
  values?: SetValue[];
  /** Run timeout in seconds. */
  timeout?: number;
  /** The platform properties against which the run has to happen. */
  platform: PlatformProperties;
  /** The machine configuration of the run agent. */
  agentConfiguration?: AgentProperties;
  /**
   * The URL(absolute or relative) of the source context. It can be an URL to a tar or git repository.
   * If it is relative URL, the relative path should be obtained from calling listBuildSourceUploadUrl API.
   */
  sourceLocation?: string;
  /** The properties that describes a set of credentials that will be used when this run is invoked. */
  credentials?: Credentials;
  /** The type of the run request. */
  type: "FileTaskRunRequest";
}

export function fileTaskRunRequestSerializer(item: FileTaskRunRequest): any {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    taskFilePath: item["taskFilePath"],
    valuesFilePath: item["valuesFilePath"],
    values: !item["values"] ? item["values"] : setValueArraySerializer(item["values"]),
    timeout: item["timeout"],
    platform: platformPropertiesSerializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesSerializer(item["agentConfiguration"]),
    sourceLocation: item["sourceLocation"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
  };
}

export function fileTaskRunRequestDeserializer(item: any): FileTaskRunRequest {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    taskFilePath: item["taskFilePath"],
    valuesFilePath: item["valuesFilePath"],
    values: !item["values"] ? item["values"] : setValueArrayDeserializer(item["values"]),
    timeout: item["timeout"],
    platform: platformPropertiesDeserializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesDeserializer(item["agentConfiguration"]),
    sourceLocation: item["sourceLocation"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsDeserializer(item["credentials"]),
  };
}

export function setValueArraySerializer(result: Array<SetValue>): any[] {
  return result.map((item) => {
    return setValueSerializer(item);
  });
}

export function setValueArrayDeserializer(result: Array<SetValue>): any[] {
  return result.map((item) => {
    return setValueDeserializer(item);
  });
}

/** The properties of a overridable value that can be passed to a task template. */
export interface SetValue {
  /** The name of the overridable value. */
  name: string;
  /** The overridable value. */
  value: string;
  /** Flag to indicate whether the value represents a secret or not. */
  isSecret?: boolean;
}

export function setValueSerializer(item: SetValue): any {
  return { name: item["name"], value: item["value"], isSecret: item["isSecret"] };
}

export function setValueDeserializer(item: any): SetValue {
  return {
    name: item["name"],
    value: item["value"],
    isSecret: item["isSecret"],
  };
}

/** The parameters for a task run request. */
export interface TaskRunRequest extends RunRequest {
  /** The resource ID of task against which run has to be queued. */
  taskId: string;
  /** Set of overridable parameters that can be passed when running a Task. */
  overrideTaskStepProperties?: OverrideTaskStepProperties;
  /** The type of the run request. */
  type: "TaskRunRequest";
}

export function taskRunRequestSerializer(item: TaskRunRequest): any {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    taskId: item["taskId"],
    overrideTaskStepProperties: !item["overrideTaskStepProperties"]
      ? item["overrideTaskStepProperties"]
      : overrideTaskStepPropertiesSerializer(item["overrideTaskStepProperties"]),
  };
}

export function taskRunRequestDeserializer(item: any): TaskRunRequest {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    taskId: item["taskId"],
    overrideTaskStepProperties: !item["overrideTaskStepProperties"]
      ? item["overrideTaskStepProperties"]
      : overrideTaskStepPropertiesDeserializer(item["overrideTaskStepProperties"]),
  };
}

/** model interface OverrideTaskStepProperties */
export interface OverrideTaskStepProperties {
  /** The source context against which run has to be queued. */
  contextPath?: string;
  /** The file against which run has to be queued. */
  file?: string;
  /**
   * Gets or sets the collection of override arguments to be used when
   * executing a build step.
   */
  arguments?: Argument[];
  /** The name of the target build stage for the docker build. */
  target?: string;
  /** The collection of overridable values that can be passed when running a Task. */
  values?: SetValue[];
  /** Base64 encoded update trigger token that will be attached with the base image trigger webhook. */
  updateTriggerToken?: string;
}

export function overrideTaskStepPropertiesSerializer(item: OverrideTaskStepProperties): any {
  return {
    contextPath: item["contextPath"],
    file: item["file"],
    arguments: !item["arguments"] ? item["arguments"] : argumentArraySerializer(item["arguments"]),
    target: item["target"],
    values: !item["values"] ? item["values"] : setValueArraySerializer(item["values"]),
    updateTriggerToken: item["updateTriggerToken"],
  };
}

export function overrideTaskStepPropertiesDeserializer(item: any): OverrideTaskStepProperties {
  return {
    contextPath: item["contextPath"],
    file: item["file"],
    arguments: !item["arguments"]
      ? item["arguments"]
      : argumentArrayDeserializer(item["arguments"]),
    target: item["target"],
    values: !item["values"] ? item["values"] : setValueArrayDeserializer(item["values"]),
    updateTriggerToken: item["updateTriggerToken"],
  };
}

/** The parameters for a quick task run request. */
export interface EncodedTaskRunRequest extends RunRequest {
  /** Base64 encoded value of the template/definition file content. */
  encodedTaskContent: string;
  /** Base64 encoded value of the parameters/values file content. */
  encodedValuesContent?: string;
  /** The collection of overridable values that can be passed when running a task. */
  values?: SetValue[];
  /** Run timeout in seconds. */
  timeout?: number;
  /** The platform properties against which the run has to happen. */
  platform: PlatformProperties;
  /** The machine configuration of the run agent. */
  agentConfiguration?: AgentProperties;
  /**
   * The URL(absolute or relative) of the source context. It can be an URL to a tar or git repository.
   * If it is relative URL, the relative path should be obtained from calling listBuildSourceUploadUrl API.
   */
  sourceLocation?: string;
  /** The properties that describes a set of credentials that will be used when this run is invoked. */
  credentials?: Credentials;
  /** The type of the run request. */
  type: "EncodedTaskRunRequest";
}

export function encodedTaskRunRequestSerializer(item: EncodedTaskRunRequest): any {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    encodedTaskContent: item["encodedTaskContent"],
    encodedValuesContent: item["encodedValuesContent"],
    values: !item["values"] ? item["values"] : setValueArraySerializer(item["values"]),
    timeout: item["timeout"],
    platform: platformPropertiesSerializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesSerializer(item["agentConfiguration"]),
    sourceLocation: item["sourceLocation"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
  };
}

export function encodedTaskRunRequestDeserializer(item: any): EncodedTaskRunRequest {
  return {
    type: item["type"],
    isArchiveEnabled: item["isArchiveEnabled"],
    agentPoolName: item["agentPoolName"],
    logTemplate: item["logTemplate"],
    encodedTaskContent: item["encodedTaskContent"],
    encodedValuesContent: item["encodedValuesContent"],
    values: !item["values"] ? item["values"] : setValueArrayDeserializer(item["values"]),
    timeout: item["timeout"],
    platform: platformPropertiesDeserializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesDeserializer(item["agentConfiguration"]),
    sourceLocation: item["sourceLocation"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsDeserializer(item["credentials"]),
  };
}

/** Managed identity for the resource. */
export interface IdentityProperties {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: ResourceIdentityType;
  /**
   * The list of user identities associated with the resource. The user identity
   * dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/
   * providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

export function identityPropertiesSerializer(item: IdentityProperties): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityPropertiesDeserializer(item: any): IdentityProperties {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function userIdentityPropertiesRecordSerializer(
  item: Record<string, UserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function userIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** model interface UserIdentityProperties */
export interface UserIdentityProperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userIdentityPropertiesSerializer(item: UserIdentityProperties): any {
  return item;
}

export function userIdentityPropertiesDeserializer(item: any): UserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The parameters for updating a task run. */
export interface TaskRunUpdateParameters {
  /** Identity for the resource. */
  identity?: IdentityProperties;
  /** The location of the resource */
  location?: string;
  /** The ARM resource tags. */
  tags?: Record<string, string>;
  /** The request (parameters) for the new run */
  runRequest?: RunRequestUnion;
  /** How the run should be forced to rerun even if the run request configuration has not changed */
  forceUpdateTag?: string;
}

export function taskRunUpdateParametersSerializer(item: TaskRunUpdateParameters): any {
  return {
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    properties: areAllPropsUndefined(item, ["runRequest", "forceUpdateTag"])
      ? undefined
      : _taskRunUpdateParametersPropertiesSerializer(item),
    location: item["location"],
    tags: item["tags"],
  };
}

/** The properties of a task run update parameters. */
export interface TaskRunPropertiesUpdateParameters {
  /** The request (parameters) for the new run */
  runRequest?: RunRequestUnion;
  /** How the run should be forced to rerun even if the run request configuration has not changed */
  forceUpdateTag?: string;
}

export function taskRunPropertiesUpdateParametersSerializer(
  item: TaskRunPropertiesUpdateParameters,
): any {
  return {
    runRequest: !item["runRequest"]
      ? item["runRequest"]
      : runRequestUnionSerializer(item["runRequest"]),
    forceUpdateTag: item["forceUpdateTag"],
  };
}

/** The collection of task runs. */
export interface _TaskRunListResult {
  /** The collection value. */
  value?: TaskRun[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _taskRunListResultDeserializer(item: any): _TaskRunListResult {
  return {
    value: !item["value"] ? item["value"] : taskRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function taskRunArraySerializer(result: Array<TaskRun>): any[] {
  return result.map((item) => {
    return taskRunSerializer(item);
  });
}

export function taskRunArrayDeserializer(result: Array<TaskRun>): any[] {
  return result.map((item) => {
    return taskRunDeserializer(item);
  });
}

/**
 * The task that has the ARM resource and task properties.
 * The task will have all information to schedule a run against it.
 */
export interface Task extends TrackedResource {
  /** The properties of a task. */
  properties?: TaskProperties;
  /** Identity for the resource. */
  identity?: IdentityProperties;
}

export function taskSerializer(item: Task): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : taskPropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function taskDeserializer(item: any): Task {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : taskPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** The properties of a task. */
export interface TaskProperties {
  /** The provisioning state of the task. */
  readonly provisioningState?: ProvisioningState;
  /** The creation date of task. */
  readonly creationDate?: Date;
  /** The current status of task. */
  status?: TaskStatus;
  /** The platform properties against which the run has to happen. */
  platform?: PlatformProperties;
  /** The machine configuration of the run agent. */
  agentConfiguration?: AgentProperties;
  /** The dedicated agent pool for the task. */
  agentPoolName?: string;
  /** Run timeout in seconds. */
  timeout?: number;
  /** The properties of a task step. */
  step?: TaskStepPropertiesUnion;
  /** The properties that describe all triggers for the task. */
  trigger?: TriggerProperties;
  /** The properties that describes a set of credentials that will be used when this run is invoked. */
  credentials?: Credentials;
  /** The template that describes the repository and tag information for run log artifact. */
  logTemplate?: string;
  /** The value of this property indicates whether the task resource is system task or not. */
  isSystemTask?: boolean;
}

export function taskPropertiesSerializer(item: TaskProperties): any {
  return {
    status: item["status"],
    platform: !item["platform"] ? item["platform"] : platformPropertiesSerializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesSerializer(item["agentConfiguration"]),
    agentPoolName: item["agentPoolName"],
    timeout: item["timeout"],
    step: !item["step"] ? item["step"] : taskStepPropertiesUnionSerializer(item["step"]),
    trigger: !item["trigger"] ? item["trigger"] : triggerPropertiesSerializer(item["trigger"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
    logTemplate: item["logTemplate"],
    isSystemTask: item["isSystemTask"],
  };
}

export function taskPropertiesDeserializer(item: any): TaskProperties {
  return {
    provisioningState: item["provisioningState"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    status: item["status"],
    platform: !item["platform"]
      ? item["platform"]
      : platformPropertiesDeserializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesDeserializer(item["agentConfiguration"]),
    agentPoolName: item["agentPoolName"],
    timeout: item["timeout"],
    step: !item["step"] ? item["step"] : taskStepPropertiesUnionDeserializer(item["step"]),
    trigger: !item["trigger"] ? item["trigger"] : triggerPropertiesDeserializer(item["trigger"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsDeserializer(item["credentials"]),
    logTemplate: item["logTemplate"],
    isSystemTask: item["isSystemTask"],
  };
}

/** The current status of task. */
export enum KnownTaskStatus {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * The current status of task. \
 * {@link KnownTaskStatus} can be used interchangeably with TaskStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type TaskStatus = string;

/** Base properties for any task step. */
export interface TaskStepProperties {
  /** The type of the step. */
  /** The discriminator possible values: Docker, FileTask, EncodedTask */
  type: StepType;
  /** List of base image dependencies for a step. */
  readonly baseImageDependencies?: BaseImageDependency[];
  /** The URL(absolute or relative) of the source context for the task step. */
  contextPath?: string;
  /** The token (git PAT or SAS token of storage account blob) associated with the context for a step. */
  contextAccessToken?: string;
}

export function taskStepPropertiesSerializer(item: TaskStepProperties): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
  };
}

export function taskStepPropertiesDeserializer(item: any): TaskStepProperties {
  return {
    type: item["type"],
    baseImageDependencies: !item["baseImageDependencies"]
      ? item["baseImageDependencies"]
      : baseImageDependencyArrayDeserializer(item["baseImageDependencies"]),
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
  };
}

/** Alias for TaskStepPropertiesUnion */
export type TaskStepPropertiesUnion =
  | DockerBuildStep
  | FileTaskStep
  | EncodedTaskStep
  | TaskStepProperties;

export function taskStepPropertiesUnionSerializer(item: TaskStepPropertiesUnion): any {
  switch (item.type) {
    case "Docker":
      return dockerBuildStepSerializer(item as DockerBuildStep);

    case "FileTask":
      return fileTaskStepSerializer(item as FileTaskStep);

    case "EncodedTask":
      return encodedTaskStepSerializer(item as EncodedTaskStep);

    default:
      return taskStepPropertiesSerializer(item);
  }
}

export function taskStepPropertiesUnionDeserializer(item: any): TaskStepPropertiesUnion {
  switch (item.type) {
    case "Docker":
      return dockerBuildStepDeserializer(item as DockerBuildStep);

    case "FileTask":
      return fileTaskStepDeserializer(item as FileTaskStep);

    case "EncodedTask":
      return encodedTaskStepDeserializer(item as EncodedTaskStep);

    default:
      return taskStepPropertiesDeserializer(item);
  }
}

/** The type of the step. */
export enum KnownStepType {
  /** Docker */
  Docker = "Docker",
  /** FileTask */
  FileTask = "FileTask",
  /** EncodedTask */
  EncodedTask = "EncodedTask",
}

/**
 * The type of the step. \
 * {@link KnownStepType} can be used interchangeably with StepType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Docker** \
 * **FileTask** \
 * **EncodedTask**
 */
export type StepType = string;

export function baseImageDependencyArrayDeserializer(result: Array<BaseImageDependency>): any[] {
  return result.map((item) => {
    return baseImageDependencyDeserializer(item);
  });
}

/** Properties that describe a base image dependency. */
export interface BaseImageDependency {
  /** The type of the base image dependency. */
  type?: BaseImageDependencyType;
  /** The registry login server. */
  registry?: string;
  /** The repository name. */
  repository?: string;
  /** The tag name. */
  tag?: string;
  /** The sha256-based digest of the image manifest. */
  digest?: string;
}

export function baseImageDependencyDeserializer(item: any): BaseImageDependency {
  return {
    type: item["type"],
    registry: item["registry"],
    repository: item["repository"],
    tag: item["tag"],
    digest: item["digest"],
  };
}

/** The type of the base image dependency. */
export enum KnownBaseImageDependencyType {
  /** BuildTime */
  BuildTime = "BuildTime",
  /** RunTime */
  RunTime = "RunTime",
}

/**
 * The type of the base image dependency. \
 * {@link KnownBaseImageDependencyType} can be used interchangeably with BaseImageDependencyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BuildTime** \
 * **RunTime**
 */
export type BaseImageDependencyType = string;

/** The Docker build step. */
export interface DockerBuildStep extends TaskStepProperties {
  /** The fully qualified image names including the repository and tag. */
  imageNames?: string[];
  /** The value of this property indicates whether the image built should be pushed to the registry or not. */
  isPushEnabled?: boolean;
  /** The value of this property indicates whether the image cache is enabled or not. */
  noCache?: boolean;
  /** The Docker file path relative to the source context. */
  dockerFilePath: string;
  /** The name of the target build stage for the docker build. */
  target?: string;
  /** The collection of override arguments to be used when executing this build step. */
  arguments?: Argument[];
  /** The type of the step. */
  type: "Docker";
}

export function dockerBuildStepSerializer(item: DockerBuildStep): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    imageNames: !item["imageNames"]
      ? item["imageNames"]
      : item["imageNames"].map((p: any) => {
          return p;
        }),
    isPushEnabled: item["isPushEnabled"],
    noCache: item["noCache"],
    dockerFilePath: item["dockerFilePath"],
    target: item["target"],
    arguments: !item["arguments"] ? item["arguments"] : argumentArraySerializer(item["arguments"]),
  };
}

export function dockerBuildStepDeserializer(item: any): DockerBuildStep {
  return {
    type: item["type"],
    baseImageDependencies: !item["baseImageDependencies"]
      ? item["baseImageDependencies"]
      : baseImageDependencyArrayDeserializer(item["baseImageDependencies"]),
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    imageNames: !item["imageNames"]
      ? item["imageNames"]
      : item["imageNames"].map((p: any) => {
          return p;
        }),
    isPushEnabled: item["isPushEnabled"],
    noCache: item["noCache"],
    dockerFilePath: item["dockerFilePath"],
    target: item["target"],
    arguments: !item["arguments"]
      ? item["arguments"]
      : argumentArrayDeserializer(item["arguments"]),
  };
}

/** The properties of a task step. */
export interface FileTaskStep extends TaskStepProperties {
  /** The task template/definition file path relative to the source context. */
  taskFilePath: string;
  /** The task values/parameters file path relative to the source context. */
  valuesFilePath?: string;
  /** The collection of overridable values that can be passed when running a task. */
  values?: SetValue[];
  /** The type of the step. */
  type: "FileTask";
}

export function fileTaskStepSerializer(item: FileTaskStep): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    taskFilePath: item["taskFilePath"],
    valuesFilePath: item["valuesFilePath"],
    values: !item["values"] ? item["values"] : setValueArraySerializer(item["values"]),
  };
}

export function fileTaskStepDeserializer(item: any): FileTaskStep {
  return {
    type: item["type"],
    baseImageDependencies: !item["baseImageDependencies"]
      ? item["baseImageDependencies"]
      : baseImageDependencyArrayDeserializer(item["baseImageDependencies"]),
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    taskFilePath: item["taskFilePath"],
    valuesFilePath: item["valuesFilePath"],
    values: !item["values"] ? item["values"] : setValueArrayDeserializer(item["values"]),
  };
}

/** The properties of a encoded task step. */
export interface EncodedTaskStep extends TaskStepProperties {
  /** Base64 encoded value of the template/definition file content. */
  encodedTaskContent: string;
  /** Base64 encoded value of the parameters/values file content. */
  encodedValuesContent?: string;
  /** The collection of overridable values that can be passed when running a task. */
  values?: SetValue[];
  /** The type of the step. */
  type: "EncodedTask";
}

export function encodedTaskStepSerializer(item: EncodedTaskStep): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    encodedTaskContent: item["encodedTaskContent"],
    encodedValuesContent: item["encodedValuesContent"],
    values: !item["values"] ? item["values"] : setValueArraySerializer(item["values"]),
  };
}

export function encodedTaskStepDeserializer(item: any): EncodedTaskStep {
  return {
    type: item["type"],
    baseImageDependencies: !item["baseImageDependencies"]
      ? item["baseImageDependencies"]
      : baseImageDependencyArrayDeserializer(item["baseImageDependencies"]),
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    encodedTaskContent: item["encodedTaskContent"],
    encodedValuesContent: item["encodedValuesContent"],
    values: !item["values"] ? item["values"] : setValueArrayDeserializer(item["values"]),
  };
}

/** The properties of a trigger. */
export interface TriggerProperties {
  /** The collection of timer triggers. */
  timerTriggers?: TimerTrigger[];
  /** The collection of triggers based on source code repository. */
  sourceTriggers?: SourceTrigger[];
  /** The trigger based on base image dependencies. */
  baseImageTrigger?: BaseImageTrigger;
}

export function triggerPropertiesSerializer(item: TriggerProperties): any {
  return {
    timerTriggers: !item["timerTriggers"]
      ? item["timerTriggers"]
      : timerTriggerArraySerializer(item["timerTriggers"]),
    sourceTriggers: !item["sourceTriggers"]
      ? item["sourceTriggers"]
      : sourceTriggerArraySerializer(item["sourceTriggers"]),
    baseImageTrigger: !item["baseImageTrigger"]
      ? item["baseImageTrigger"]
      : baseImageTriggerSerializer(item["baseImageTrigger"]),
  };
}

export function triggerPropertiesDeserializer(item: any): TriggerProperties {
  return {
    timerTriggers: !item["timerTriggers"]
      ? item["timerTriggers"]
      : timerTriggerArrayDeserializer(item["timerTriggers"]),
    sourceTriggers: !item["sourceTriggers"]
      ? item["sourceTriggers"]
      : sourceTriggerArrayDeserializer(item["sourceTriggers"]),
    baseImageTrigger: !item["baseImageTrigger"]
      ? item["baseImageTrigger"]
      : baseImageTriggerDeserializer(item["baseImageTrigger"]),
  };
}

export function timerTriggerArraySerializer(result: Array<TimerTrigger>): any[] {
  return result.map((item) => {
    return timerTriggerSerializer(item);
  });
}

export function timerTriggerArrayDeserializer(result: Array<TimerTrigger>): any[] {
  return result.map((item) => {
    return timerTriggerDeserializer(item);
  });
}

/** The properties of a timer trigger. */
export interface TimerTrigger {
  /** The CRON expression for the task schedule */
  schedule: string;
  /** The current status of trigger. */
  status?: TriggerStatus;
  /** The name of the trigger. */
  name: string;
}

export function timerTriggerSerializer(item: TimerTrigger): any {
  return { schedule: item["schedule"], status: item["status"], name: item["name"] };
}

export function timerTriggerDeserializer(item: any): TimerTrigger {
  return {
    schedule: item["schedule"],
    status: item["status"],
    name: item["name"],
  };
}

/** The current status of trigger. */
export enum KnownTriggerStatus {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * The current status of trigger. \
 * {@link KnownTriggerStatus} can be used interchangeably with TriggerStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type TriggerStatus = string;

export function sourceTriggerArraySerializer(result: Array<SourceTrigger>): any[] {
  return result.map((item) => {
    return sourceTriggerSerializer(item);
  });
}

export function sourceTriggerArrayDeserializer(result: Array<SourceTrigger>): any[] {
  return result.map((item) => {
    return sourceTriggerDeserializer(item);
  });
}

/** The properties of a source based trigger. */
export interface SourceTrigger {
  /** The properties that describes the source(code) for the task. */
  sourceRepository: SourceProperties;
  /** The source event corresponding to the trigger. */
  sourceTriggerEvents: SourceTriggerEvent[];
  /** The current status of trigger. */
  status?: TriggerStatus;
  /** The name of the trigger. */
  name: string;
}

export function sourceTriggerSerializer(item: SourceTrigger): any {
  return {
    sourceRepository: sourcePropertiesSerializer(item["sourceRepository"]),
    sourceTriggerEvents: item["sourceTriggerEvents"].map((p: any) => {
      return p;
    }),
    status: item["status"],
    name: item["name"],
  };
}

export function sourceTriggerDeserializer(item: any): SourceTrigger {
  return {
    sourceRepository: sourcePropertiesDeserializer(item["sourceRepository"]),
    sourceTriggerEvents: item["sourceTriggerEvents"].map((p: any) => {
      return p;
    }),
    status: item["status"],
    name: item["name"],
  };
}

/** The properties of the source code repository. */
export interface SourceProperties {
  /** The type of source control service. */
  sourceControlType: SourceControlType;
  /** The full URL to the source code repository */
  repositoryUrl: string;
  /** The branch name of the source code. */
  branch?: string;
  /**
   * The authorization properties for accessing the source code repository and to set up
   * webhooks for notifications.
   */
  sourceControlAuthProperties?: AuthInfo;
}

export function sourcePropertiesSerializer(item: SourceProperties): any {
  return {
    sourceControlType: item["sourceControlType"],
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    sourceControlAuthProperties: !item["sourceControlAuthProperties"]
      ? item["sourceControlAuthProperties"]
      : authInfoSerializer(item["sourceControlAuthProperties"]),
  };
}

export function sourcePropertiesDeserializer(item: any): SourceProperties {
  return {
    sourceControlType: item["sourceControlType"],
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    sourceControlAuthProperties: !item["sourceControlAuthProperties"]
      ? item["sourceControlAuthProperties"]
      : authInfoDeserializer(item["sourceControlAuthProperties"]),
  };
}

/** The type of source control service. */
export enum KnownSourceControlType {
  /** Github */
  Github = "Github",
  /** VisualStudioTeamService */
  VisualStudioTeamService = "VisualStudioTeamService",
}

/**
 * The type of source control service. \
 * {@link KnownSourceControlType} can be used interchangeably with SourceControlType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Github** \
 * **VisualStudioTeamService**
 */
export type SourceControlType = string;

/** The authorization properties for accessing the source code repository. */
export interface AuthInfo {
  /** The type of Auth token. */
  tokenType: TokenType;
  /** The access token used to access the source control provider. */
  token: string;
  /** The refresh token used to refresh the access token. */
  refreshToken?: string;
  /** The scope of the access token. */
  scope?: string;
  /** Time in seconds that the token remains valid */
  expiresIn?: number;
}

export function authInfoSerializer(item: AuthInfo): any {
  return {
    tokenType: item["tokenType"],
    token: item["token"],
    refreshToken: item["refreshToken"],
    scope: item["scope"],
    expiresIn: item["expiresIn"],
  };
}

export function authInfoDeserializer(item: any): AuthInfo {
  return {
    tokenType: item["tokenType"],
    token: item["token"],
    refreshToken: item["refreshToken"],
    scope: item["scope"],
    expiresIn: item["expiresIn"],
  };
}

/** The type of Auth token. */
export enum KnownTokenType {
  /** PAT */
  PAT = "PAT",
  /** OAuth */
  OAuth = "OAuth",
}

/**
 * The type of Auth token. \
 * {@link KnownTokenType} can be used interchangeably with TokenType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PAT** \
 * **OAuth**
 */
export type TokenType = string;

/** Known values of {@link SourceTriggerEvent} that the service accepts. */
export enum KnownSourceTriggerEvent {
  /** commit */
  Commit = "commit",
  /** pullrequest */
  Pullrequest = "pullrequest",
}

/** Type of SourceTriggerEvent */
export type SourceTriggerEvent = string;

/** The trigger based on base image dependency. */
export interface BaseImageTrigger {
  /** The type of the auto trigger for base image dependency updates. */
  baseImageTriggerType: BaseImageTriggerType;
  /** The endpoint URL for receiving update triggers. */
  updateTriggerEndpoint?: string;
  /** Type of Payload body for Base image update triggers. */
  updateTriggerPayloadType?: UpdateTriggerPayloadType;
  /** The current status of trigger. */
  status?: TriggerStatus;
  /** The name of the trigger. */
  name: string;
}

export function baseImageTriggerSerializer(item: BaseImageTrigger): any {
  return {
    baseImageTriggerType: item["baseImageTriggerType"],
    updateTriggerEndpoint: item["updateTriggerEndpoint"],
    updateTriggerPayloadType: item["updateTriggerPayloadType"],
    status: item["status"],
    name: item["name"],
  };
}

export function baseImageTriggerDeserializer(item: any): BaseImageTrigger {
  return {
    baseImageTriggerType: item["baseImageTriggerType"],
    updateTriggerEndpoint: item["updateTriggerEndpoint"],
    updateTriggerPayloadType: item["updateTriggerPayloadType"],
    status: item["status"],
    name: item["name"],
  };
}

/** The type of the auto trigger for base image dependency updates. */
export enum KnownBaseImageTriggerType {
  /** All */
  All = "All",
  /** Runtime */
  Runtime = "Runtime",
}

/**
 * The type of the auto trigger for base image dependency updates. \
 * {@link KnownBaseImageTriggerType} can be used interchangeably with BaseImageTriggerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All** \
 * **Runtime**
 */
export type BaseImageTriggerType = string;

/** Type of Payload body for Base image update triggers. */
export enum KnownUpdateTriggerPayloadType {
  /** Default */
  Default = "Default",
  /** Token */
  Token = "Token",
}

/**
 * Type of Payload body for Base image update triggers. \
 * {@link KnownUpdateTriggerPayloadType} can be used interchangeably with UpdateTriggerPayloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Token**
 */
export type UpdateTriggerPayloadType = string;

/** The parameters for updating a task. */
export interface TaskUpdateParameters {
  /** Identity for the resource. */
  identity?: IdentityProperties;
  /** The ARM resource tags. */
  tags?: Record<string, string>;
  /** The current status of task. */
  status?: TaskStatus;
  /** The platform properties against which the run has to happen. */
  platform?: PlatformUpdateParameters;
  /** The machine configuration of the run agent. */
  agentConfiguration?: AgentProperties;
  /** The dedicated agent pool for the task. */
  agentPoolName?: string;
  /** Run timeout in seconds. */
  timeout?: number;
  /** The properties for updating a task step. */
  step?: TaskStepUpdateParametersUnion;
  /** The properties for updating trigger properties. */
  trigger?: TriggerUpdateParameters;
  /** The parameters that describes a set of credentials that will be used when this run is invoked. */
  credentials?: Credentials;
  /** The template that describes the repository and tag information for run log artifact. */
  logTemplate?: string;
}

export function taskUpdateParametersSerializer(item: TaskUpdateParameters): any {
  return {
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "status",
      "platform",
      "agentConfiguration",
      "agentPoolName",
      "timeout",
      "step",
      "trigger",
      "credentials",
      "logTemplate",
    ])
      ? undefined
      : _taskUpdateParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The properties for updating a task. */
export interface TaskPropertiesUpdateParameters {
  /** The current status of task. */
  status?: TaskStatus;
  /** The platform properties against which the run has to happen. */
  platform?: PlatformUpdateParameters;
  /** The machine configuration of the run agent. */
  agentConfiguration?: AgentProperties;
  /** The dedicated agent pool for the task. */
  agentPoolName?: string;
  /** Run timeout in seconds. */
  timeout?: number;
  /** The properties for updating a task step. */
  step?: TaskStepUpdateParametersUnion;
  /** The properties for updating trigger properties. */
  trigger?: TriggerUpdateParameters;
  /** The parameters that describes a set of credentials that will be used when this run is invoked. */
  credentials?: Credentials;
  /** The template that describes the repository and tag information for run log artifact. */
  logTemplate?: string;
}

export function taskPropertiesUpdateParametersSerializer(
  item: TaskPropertiesUpdateParameters,
): any {
  return {
    status: item["status"],
    platform: !item["platform"]
      ? item["platform"]
      : platformUpdateParametersSerializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesSerializer(item["agentConfiguration"]),
    agentPoolName: item["agentPoolName"],
    timeout: item["timeout"],
    step: !item["step"] ? item["step"] : taskStepUpdateParametersUnionSerializer(item["step"]),
    trigger: !item["trigger"]
      ? item["trigger"]
      : triggerUpdateParametersSerializer(item["trigger"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
    logTemplate: item["logTemplate"],
  };
}

/** The properties for updating the platform configuration. */
export interface PlatformUpdateParameters {
  /** The operating system type required for the run. */
  os?: OS;
  /** The OS architecture. */
  architecture?: Architecture;
  /** Variant of the CPU. */
  variant?: Variant;
}

export function platformUpdateParametersSerializer(item: PlatformUpdateParameters): any {
  return { os: item["os"], architecture: item["architecture"], variant: item["variant"] };
}

/** Base properties for updating any task step. */
export interface TaskStepUpdateParameters {
  /** The type of the step. */
  /** The discriminator possible values: Docker, FileTask, EncodedTask */
  type: StepType;
  /** The URL(absolute or relative) of the source context for the task step. */
  contextPath?: string;
  /** The token (git PAT or SAS token of storage account blob) associated with the context for a step. */
  contextAccessToken?: string;
}

export function taskStepUpdateParametersSerializer(item: TaskStepUpdateParameters): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
  };
}

/** Alias for TaskStepUpdateParametersUnion */
export type TaskStepUpdateParametersUnion =
  | DockerBuildStepUpdateParameters
  | FileTaskStepUpdateParameters
  | EncodedTaskStepUpdateParameters
  | TaskStepUpdateParameters;

export function taskStepUpdateParametersUnionSerializer(item: TaskStepUpdateParametersUnion): any {
  switch (item.type) {
    case "Docker":
      return dockerBuildStepUpdateParametersSerializer(item as DockerBuildStepUpdateParameters);

    case "FileTask":
      return fileTaskStepUpdateParametersSerializer(item as FileTaskStepUpdateParameters);

    case "EncodedTask":
      return encodedTaskStepUpdateParametersSerializer(item as EncodedTaskStepUpdateParameters);

    default:
      return taskStepUpdateParametersSerializer(item);
  }
}

/** The properties for updating a docker build step. */
export interface DockerBuildStepUpdateParameters extends TaskStepUpdateParameters {
  /** The fully qualified image names including the repository and tag. */
  imageNames?: string[];
  /** The value of this property indicates whether the image built should be pushed to the registry or not. */
  isPushEnabled?: boolean;
  /** The value of this property indicates whether the image cache is enabled or not. */
  noCache?: boolean;
  /** The Docker file path relative to the source context. */
  dockerFilePath?: string;
  /** The collection of override arguments to be used when executing this build step. */
  arguments?: Argument[];
  /** The name of the target build stage for the docker build. */
  target?: string;
  /** The type of the step. */
  type: "Docker";
}

export function dockerBuildStepUpdateParametersSerializer(
  item: DockerBuildStepUpdateParameters,
): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    imageNames: !item["imageNames"]
      ? item["imageNames"]
      : item["imageNames"].map((p: any) => {
          return p;
        }),
    isPushEnabled: item["isPushEnabled"],
    noCache: item["noCache"],
    dockerFilePath: item["dockerFilePath"],
    arguments: !item["arguments"] ? item["arguments"] : argumentArraySerializer(item["arguments"]),
    target: item["target"],
  };
}

/** The properties of updating a task step. */
export interface FileTaskStepUpdateParameters extends TaskStepUpdateParameters {
  /** The task template/definition file path relative to the source context. */
  taskFilePath?: string;
  /** The values/parameters file path relative to the source context. */
  valuesFilePath?: string;
  /** The collection of overridable values that can be passed when running a task. */
  values?: SetValue[];
  /** The type of the step. */
  type: "FileTask";
}

export function fileTaskStepUpdateParametersSerializer(item: FileTaskStepUpdateParameters): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    taskFilePath: item["taskFilePath"],
    valuesFilePath: item["valuesFilePath"],
    values: !item["values"] ? item["values"] : setValueArraySerializer(item["values"]),
  };
}

/** The properties for updating encoded task step. */
export interface EncodedTaskStepUpdateParameters extends TaskStepUpdateParameters {
  /** Base64 encoded value of the template/definition file content. */
  encodedTaskContent?: string;
  /** Base64 encoded value of the parameters/values file content. */
  encodedValuesContent?: string;
  /** The collection of overridable values that can be passed when running a task. */
  values?: SetValue[];
  /** The type of the step. */
  type: "EncodedTask";
}

export function encodedTaskStepUpdateParametersSerializer(
  item: EncodedTaskStepUpdateParameters,
): any {
  return {
    type: item["type"],
    contextPath: item["contextPath"],
    contextAccessToken: item["contextAccessToken"],
    encodedTaskContent: item["encodedTaskContent"],
    encodedValuesContent: item["encodedValuesContent"],
    values: !item["values"] ? item["values"] : setValueArraySerializer(item["values"]),
  };
}

/** The properties for updating triggers. */
export interface TriggerUpdateParameters {
  /** The collection of timer triggers. */
  timerTriggers?: TimerTriggerUpdateParameters[];
  /** The collection of triggers based on source code repository. */
  sourceTriggers?: SourceTriggerUpdateParameters[];
  /** The trigger based on base image dependencies. */
  baseImageTrigger?: BaseImageTriggerUpdateParameters;
}

export function triggerUpdateParametersSerializer(item: TriggerUpdateParameters): any {
  return {
    timerTriggers: !item["timerTriggers"]
      ? item["timerTriggers"]
      : timerTriggerUpdateParametersArraySerializer(item["timerTriggers"]),
    sourceTriggers: !item["sourceTriggers"]
      ? item["sourceTriggers"]
      : sourceTriggerUpdateParametersArraySerializer(item["sourceTriggers"]),
    baseImageTrigger: !item["baseImageTrigger"]
      ? item["baseImageTrigger"]
      : baseImageTriggerUpdateParametersSerializer(item["baseImageTrigger"]),
  };
}

export function timerTriggerUpdateParametersArraySerializer(
  result: Array<TimerTriggerUpdateParameters>,
): any[] {
  return result.map((item) => {
    return timerTriggerUpdateParametersSerializer(item);
  });
}

/** The properties for updating a timer trigger. */
export interface TimerTriggerUpdateParameters {
  /** The CRON expression for the task schedule */
  schedule?: string;
  /** The current status of trigger. */
  status?: TriggerStatus;
  /** The name of the trigger. */
  name: string;
}

export function timerTriggerUpdateParametersSerializer(item: TimerTriggerUpdateParameters): any {
  return { schedule: item["schedule"], status: item["status"], name: item["name"] };
}

export function sourceTriggerUpdateParametersArraySerializer(
  result: Array<SourceTriggerUpdateParameters>,
): any[] {
  return result.map((item) => {
    return sourceTriggerUpdateParametersSerializer(item);
  });
}

/** The properties for updating a source based trigger. */
export interface SourceTriggerUpdateParameters {
  /** The properties that describes the source(code) for the task. */
  sourceRepository?: SourceUpdateParameters;
  /** The source event corresponding to the trigger. */
  sourceTriggerEvents?: SourceTriggerEvent[];
  /** The current status of trigger. */
  status?: TriggerStatus;
  /** The name of the trigger. */
  name: string;
}

export function sourceTriggerUpdateParametersSerializer(item: SourceTriggerUpdateParameters): any {
  return {
    sourceRepository: !item["sourceRepository"]
      ? item["sourceRepository"]
      : sourceUpdateParametersSerializer(item["sourceRepository"]),
    sourceTriggerEvents: !item["sourceTriggerEvents"]
      ? item["sourceTriggerEvents"]
      : item["sourceTriggerEvents"].map((p: any) => {
          return p;
        }),
    status: item["status"],
    name: item["name"],
  };
}

/** The properties for updating the source code repository. */
export interface SourceUpdateParameters {
  /** The type of source control service. */
  sourceControlType?: SourceControlType;
  /** The full URL to the source code repository */
  repositoryUrl?: string;
  /** The branch name of the source code. */
  branch?: string;
  /**
   * The authorization properties for accessing the source code repository and to set up
   * webhooks for notifications.
   */
  sourceControlAuthProperties?: AuthInfoUpdateParameters;
}

export function sourceUpdateParametersSerializer(item: SourceUpdateParameters): any {
  return {
    sourceControlType: item["sourceControlType"],
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    sourceControlAuthProperties: !item["sourceControlAuthProperties"]
      ? item["sourceControlAuthProperties"]
      : authInfoUpdateParametersSerializer(item["sourceControlAuthProperties"]),
  };
}

/** The authorization properties for accessing the source code repository. */
export interface AuthInfoUpdateParameters {
  /** The type of Auth token. */
  tokenType?: TokenType;
  /** The access token used to access the source control provider. */
  token?: string;
  /** The refresh token used to refresh the access token. */
  refreshToken?: string;
  /** The scope of the access token. */
  scope?: string;
  /** Time in seconds that the token remains valid */
  expiresIn?: number;
}

export function authInfoUpdateParametersSerializer(item: AuthInfoUpdateParameters): any {
  return {
    tokenType: item["tokenType"],
    token: item["token"],
    refreshToken: item["refreshToken"],
    scope: item["scope"],
    expiresIn: item["expiresIn"],
  };
}

/** The properties for updating base image dependency trigger. */
export interface BaseImageTriggerUpdateParameters {
  /** The type of the auto trigger for base image dependency updates. */
  baseImageTriggerType?: BaseImageTriggerType;
  /** The endpoint URL for receiving update triggers. */
  updateTriggerEndpoint?: string;
  /** Type of Payload body for Base image update triggers. */
  updateTriggerPayloadType?: UpdateTriggerPayloadType;
  /** The current status of trigger. */
  status?: TriggerStatus;
  /** The name of the trigger. */
  name: string;
}

export function baseImageTriggerUpdateParametersSerializer(
  item: BaseImageTriggerUpdateParameters,
): any {
  return {
    baseImageTriggerType: item["baseImageTriggerType"],
    updateTriggerEndpoint: item["updateTriggerEndpoint"],
    updateTriggerPayloadType: item["updateTriggerPayloadType"],
    status: item["status"],
    name: item["name"],
  };
}

/** The collection of tasks. */
export interface _TaskListResult {
  /** The collection value. */
  value?: Task[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _taskListResultDeserializer(item: any): _TaskListResult {
  return {
    value: !item["value"] ? item["value"] : taskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function taskArraySerializer(result: Array<Task>): any[] {
  return result.map((item) => {
    return taskSerializer(item);
  });
}

export function taskArrayDeserializer(result: Array<Task>): any[] {
  return result.map((item) => {
    return taskDeserializer(item);
  });
}

/** The properties of a response to source upload request. */
export interface SourceUploadDefinition {
  /** The URL where the client can upload the source. */
  uploadUrl?: string;
  /** The relative path to the source. This is used to submit the subsequent queue build request. */
  relativePath?: string;
}

export function sourceUploadDefinitionDeserializer(item: any): SourceUploadDefinition {
  return {
    uploadUrl: item["uploadUrl"],
    relativePath: item["relativePath"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-01-preview API version. */
  V20250301Preview = "2025-03-01-preview",
}

export function _agentPoolUpdateParametersPropertiesSerializer(
  item: AgentPoolUpdateParameters,
): any {
  return { count: item["count"] };
}

export function _taskRunUpdateParametersPropertiesSerializer(item: TaskRunUpdateParameters): any {
  return {
    runRequest: !item["runRequest"]
      ? item["runRequest"]
      : runRequestUnionSerializer(item["runRequest"]),
    forceUpdateTag: item["forceUpdateTag"],
  };
}

export function _taskUpdateParametersPropertiesSerializer(item: TaskUpdateParameters): any {
  return {
    status: item["status"],
    platform: !item["platform"]
      ? item["platform"]
      : platformUpdateParametersSerializer(item["platform"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentPropertiesSerializer(item["agentConfiguration"]),
    agentPoolName: item["agentPoolName"],
    timeout: item["timeout"],
    step: !item["step"] ? item["step"] : taskStepUpdateParametersUnionSerializer(item["step"]),
    trigger: !item["trigger"]
      ? item["trigger"]
      : triggerUpdateParametersSerializer(item["trigger"]),
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
    logTemplate: item["logTemplate"],
  };
}
