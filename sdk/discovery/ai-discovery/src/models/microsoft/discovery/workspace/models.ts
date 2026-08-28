// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OperationState } from "../../../models.js";
import { ByType, tagArraySerializer, tagArrayDeserializer, Tag } from "../common/models.js";
import { ErrorModel } from "@azure-rest/core-client";

/** A investigation list item. */
export interface Investigation {
  /** The investigation name. */
  readonly name: string;
  /** The parent project name. */
  readonly projectName: string;
  /** The timestamp when the resource was created */
  readonly createdAt?: Date;
  /** The ID of the user who created this resource. */
  readonly createdBy?: string;
  /** The type of user who created this resource. */
  readonly createdByType?: ByType;
  /** The timestamp when the resource was last updated */
  readonly lastModifiedAt?: Date;
  /** The ID of the user who updated this resource. */
  readonly lastModifiedBy?: string;
  /** The type of user who updated this resource. */
  readonly lastModifiedByType?: ByType;
  /** The status */
  readonly status?: InvestigationStatus;
  /** The description */
  description?: string;
  /** The tags */
  tags?: Tag[];
  /** The title */
  displayName?: string;
}

export function investigationSerializer(item: Investigation): any {
  return {
    description: item["description"],
    tags: !item["tags"] ? item["tags"] : tagArraySerializer(item["tags"]),
    displayName: item["displayName"],
  };
}

export function investigationDeserializer(item: any): Investigation {
  return {
    name: item["name"],
    projectName: item["projectName"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    status: item["status"],
    description: item["description"],
    tags: !item["tags"] ? item["tags"] : tagArrayDeserializer(item["tags"]),
    displayName: item["displayName"],
  };
}

/** Status */
export enum KnownInvestigationStatus {
  /** Investigation Created */
  Created = "Created",
  /** Investigation Validated */
  Validated = "Validated",
  /** Investigation Failed */
  Failed = "Failed",
}

/**
 * Status \
 * {@link KnownInvestigationStatus} can be used interchangeably with InvestigationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Investigation Created \
 * **Validated**: Investigation Validated \
 * **Failed**: Investigation Failed
 */
export type InvestigationStatus = string;

/** The status of a long-running Investigation operation. */
export interface InvestigationOperationStatus {
  /** The unique ID of the operation. */
  id: string;
  /** The status of the operation */
  status: OperationState;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: Investigation;
}

export function investigationOperationStatusDeserializer(item: any): InvestigationOperationStatus {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    result: !item["result"] ? item["result"] : investigationDeserializer(item["result"]),
  };
}

export function investigationArraySerializer(result: Array<Investigation>): any[] {
  return result.map((item) => {
    return investigationSerializer(item);
  });
}

export function investigationArrayDeserializer(result: Array<Investigation>): any[] {
  return result.map((item) => {
    return investigationDeserializer(item);
  });
}

/** Discovery engine instance. */
export interface DiscoveryEngine {
  /** The Discovery Engine status. */
  discoveryEngineStatus: DiscoveryEngineStatus;
  /** The system prompt. */
  systemPrompt?: string;
  /** The Discovery Engine configuration. */
  configuration?: Record<string, any>;
  /** The timestamp when the resource was created. */
  createdAt?: Date;
  /** The ID of the user who created this resource. */
  createdBy?: string;
  /** The type of user who created this resource. */
  createdByType?: ByType;
  /** The timestamp when the resource was last updated */
  lastModifiedAt?: Date;
  /** The ID of the user who updated this resource. */
  lastModifiedBy?: string;
  /** The type of user who updated this resource. */
  lastModifiedByType?: ByType;
}

export function discoveryEngineDeserializer(item: any): DiscoveryEngine {
  return {
    discoveryEngineStatus: item["discoveryEngineStatus"],
    systemPrompt: item["systemPrompt"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : Object.fromEntries(
          Object.entries(item["configuration"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
  };
}

/** Discovery Engine Status */
export enum KnownDiscoveryEngineStatus {
  /** Discovery Engine Inactive */
  Inactive = "Inactive",
  /** Discovery Engine Active */
  Active = "Active",
}

/**
 * Discovery Engine Status \
 * {@link KnownDiscoveryEngineStatus} can be used interchangeably with DiscoveryEngineStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive**: Discovery Engine Inactive \
 * **Active**: Discovery Engine Active
 */
export type DiscoveryEngineStatus = string;

export function workingMemoryEntryArrayDeserializer(result: Array<WorkingMemoryEntry>): any[] {
  return result.map((item) => {
    return workingMemoryEntryDeserializer(item);
  });
}

/** Working memory entry. */
export interface WorkingMemoryEntry {
  /** The content of the working memory entry. */
  content: string;
  /** The type of the working memory entry. */
  type: WorkingMemoryEntryType;
  /** The timestamp when the resource was created. */
  createdAt?: Date;
}

export function workingMemoryEntryDeserializer(item: any): WorkingMemoryEntry {
  return {
    content: item["content"],
    type: item["type"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
  };
}

/** Working memory entry type. */
export enum KnownWorkingMemoryEntryType {
  /** Thought */
  Thought = "Thought",
}

/**
 * Working memory entry type. \
 * {@link KnownWorkingMemoryEntryType} can be used interchangeably with WorkingMemoryEntryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Thought**: Thought
 */
export type WorkingMemoryEntryType = string;

/** Discovery Engine Update Request. This will create the discovery engine if it does not already exist. */
export interface DiscoveryEngineUpdate {
  /** The system prompt. */
  systemPrompt?: string;
  /** The Discovery Engine configuration. */
  configuration?: Record<string, any>;
}

export function discoveryEngineUpdateSerializer(item: DiscoveryEngineUpdate): any {
  return { systemPrompt: item["systemPrompt"], configuration: item["configuration"] };
}

/** A conversation. */
export interface Conversation {
  /** The conversation name. */
  readonly name: string;
  /** The timestamp when the resource was created. */
  createdAt?: Date;
  /** The ID of the user who created this resource. */
  createdBy?: string;
  /** The type of user who created this resource. */
  createdByType?: ByType;
  /** The timestamp when the resource was last updated */
  lastModifiedAt?: Date;
  /** The ID of the user who updated this resource. */
  lastModifiedBy?: string;
  /** The type of user who updated this resource. */
  lastModifiedByType?: ByType;
  /** The title */
  displayName?: string;
  /** The Name of the associated Investigation */
  investigationName?: string;
  /** The name of the associated Project */
  projectName?: string;
}

export function conversationSerializer(item: Conversation): any {
  return {
    createdAt: !item["createdAt"] ? item["createdAt"] : item["createdAt"].toISOString(),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : item["lastModifiedAt"].toISOString(),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    displayName: item["displayName"],
    investigationName: item["investigationName"],
    projectName: item["projectName"],
  };
}

export function conversationDeserializer(item: any): Conversation {
  return {
    name: item["name"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    displayName: item["displayName"],
    investigationName: item["investigationName"],
    projectName: item["projectName"],
  };
}

export function conversationArraySerializer(result: Array<Conversation>): any[] {
  return result.map((item) => {
    return conversationSerializer(item);
  });
}

export function conversationArrayDeserializer(result: Array<Conversation>): any[] {
  return result.map((item) => {
    return conversationDeserializer(item);
  });
}

/** Run result */
export interface RunResult {
  /** Status of the run. */
  status?: string;
  /** Human-readable details about the run status. */
  runtimeDetails: string;
  /** The timestamp when the resource was created */
  readonly createdAt?: Date;
  /** The time the run completed. */
  readonly completedAt?: Date;
  /** The user that started the tool run. */
  createdBy?: string;
  /** Details provided by the tool (rather than the platform). */
  toolReport?: {
    percentageComplete: number;
    statusInformation?: Record<string, any>;
    logs?: string;
  };
  /** Output data URIs. */
  outputData: OutputDataUri[];
  /** Debugging information. */
  debugInfo: string;
}

export function runResultDeserializer(item: any): RunResult {
  return {
    status: item["status"],
    runtimeDetails: item["runtimeDetails"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    createdBy: item["createdBy"],
    toolReport: !item["toolReport"]
      ? item["toolReport"]
      : _runResultToolReportDeserializer(item["toolReport"]),
    outputData: outputDataUriArrayDeserializer(item["outputData"]),
    debugInfo: item["debugInfo"],
  };
}

/** model interface _RunResultToolReport */
export interface _RunResultToolReport {
  /** Percentage compete */
  percentageComplete: number;
  statusInformation?: Record<string, any>;
  /** Logs from the tool. */
  logs?: string;
}

export function _runResultToolReportDeserializer(item: any): _RunResultToolReport {
  return {
    percentageComplete: item["percentageComplete"],
    statusInformation: !item["statusInformation"]
      ? item["statusInformation"]
      : _runResultToolReportStatusInformationDeserializer(item["statusInformation"]),
    logs: item["logs"],
  };
}

/** model interface _RunResultToolReportStatusInformation */
export interface _RunResultToolReportStatusInformation {}

export function _runResultToolReportStatusInformationDeserializer(
  item: any,
): _RunResultToolReportStatusInformation {
  return item;
}

export function outputDataUriArrayDeserializer(result: Array<OutputDataUri>): any[] {
  return result.map((item) => {
    return outputDataUriDeserializer(item);
  });
}

/** Model for providing the URI of the output collected from a specific container path. */
export interface OutputDataUri {
  /** The URI of the output data. */
  storageUri: string;
  /** The path within the container from which the output was collected. */
  mountPath: string;
}

export function outputDataUriDeserializer(item: any): OutputDataUri {
  return {
    storageUri: item["storageUri"],
    mountPath: item["mountPath"],
  };
}

export function inlineFileArraySerializer(result: Array<InlineFile>): any[] {
  return result.map((item) => {
    return inlineFileSerializer(item);
  });
}

/** A file to be included in the input data for a tool run and the path where it will be mounted, relative to the working directory. */
export interface InlineFile {
  /** Absolute path within the container at which to mount this file. */
  mountPath: string;
  /** File contents: Compressed using .gz then base64-encoded. */
  encodedFile: string;
}

export function inlineFileSerializer(item: InlineFile): any {
  return { mountPath: item["mountPath"], encodedFile: item["encodedFile"] };
}

export function inputDataMountArraySerializer(result: Array<InputDataMount>): any[] {
  return result.map((item) => {
    return inputDataMountSerializer(item);
  });
}

/** Data URI and path where it will be mounted in the tool container. */
export interface InputDataMount {
  /** URI of input data to mount. */
  storageUri: string;
  /** Absolute path within the container at which to mount this input. */
  mountPath: string;
  /** The protocol to use for mounting this storage. Overrides any value specified on the storage container. */
  mountProtocol?: StorageMountProtocol;
}

export function inputDataMountSerializer(item: InputDataMount): any {
  return {
    storageUri: item["storageUri"],
    mountPath: item["mountPath"],
    mountProtocol: item["mountProtocol"],
  };
}

/** The protocol to use for mounting an storage container. */
export enum KnownStorageMountProtocol {
  /** NFS protocol. Version of NFS used may vary based on storage type */
  NFS = "NFS",
  /** Blobfuse in file cache mode. */
  BlobfuseCaching = "BlobfuseCaching",
}

/**
 * The protocol to use for mounting an storage container. \
 * {@link KnownStorageMountProtocol} can be used interchangeably with StorageMountProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NFS**: NFS protocol. Version of NFS used may vary based on storage type \
 * **BlobfuseCaching**: Blobfuse in file cache mode.
 */
export type StorageMountProtocol = string;

export function outputDataMountArraySerializer(result: Array<OutputDataMount>): any[] {
  return result.map((item) => {
    return outputDataMountSerializer(item);
  });
}

/** Definition of a mount for collecting tool output data. */
export interface OutputDataMount {
  /** URI of location to persist output to. */
  storageUri: string;
  /** Absolute path within the container from which to collect output data. */
  mountPath: string;
  /** The protocol to use for mounting this storage. Overrides any value specified on the storage container. */
  mountProtocol?: StorageMountProtocol;
}

export function outputDataMountSerializer(item: OutputDataMount): any {
  return {
    storageUri: item["storageUri"],
    mountPath: item["mountPath"],
    mountProtocol: item["mountProtocol"],
  };
}

/** Explicitly set tool run requirements - overrides the tool definition. */
export interface InfraOverrides {
  /** Override CPU requirements (e.g. 1, or 500m for 500 milli-CPUs) */
  cpu?: string;
  /** Override RAM requirements (e.g. 500Mi or 1Gi). */
  ram?: string;
  /** Override GPU count requirements. */
  gpu?: string;
  /** Override the number of replicas of the tool image to run. */
  replicaCount?: number;
  /** Override the image to use for this tool run. */
  imageUri?: string;
  /** Override the maximum CPU allowed for the tool run (e.g. 1, or 500m for 500 milli-CPUs) */
  maxCpu?: string;
  /** Override the maximum RAM allowed for the tool run (e.g. 500Mi or 1Gi) */
  maxRam?: string;
  /** Override the maximum GPU count allowed for the tool run */
  maxGpu?: string;
}

export function infraOverridesSerializer(item: InfraOverrides): any {
  return {
    cpu: item["cpu"],
    ram: item["ram"],
    gpu: item["gpu"],
    replicaCount: item["replicaCount"],
    imageUri: item["imageUri"],
    maxCpu: item["maxCpu"],
    maxRam: item["maxRam"],
    maxGpu: item["maxGpu"],
  };
}

export function _runRequestEnvironmentVariableArraySerializer(
  result: Array<_RunRequestEnvironmentVariable>,
): any[] {
  return result.map((item) => {
    return _runRequestEnvironmentVariableSerializer(item);
  });
}

/** model interface _RunRequestEnvironmentVariable */
export interface _RunRequestEnvironmentVariable {
  /** Name of the environment variable. This must not contain any secrets. */
  name: string;
  /** Value of the environment variable. This must not contain any secrets. */
  value?: string;
}

export function _runRequestEnvironmentVariableSerializer(
  item: _RunRequestEnvironmentVariable,
): any {
  return { name: item["name"], value: item["value"] };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Summary information for an operation. */
export interface Operation {
  /** Operation id. */
  id: string;
  /** The nodepool the operation targets. */
  nodepoolId: string;
  /** Current status of the operation. */
  status: RunStatus;
  /** Human-readable details about the run status. */
  runtimeDetails: string;
  /** When the operation was submitted. */
  createdAt: Date;
  /** When the operation completed. */
  completedAt?: Date;
  /** The user who created the operation. */
  createdBy?: string;
}

export function operationDeserializer(item: any): Operation {
  return {
    id: item["id"],
    nodepoolId: item["nodepoolId"],
    status: item["status"],
    runtimeDetails: item["runtimeDetails"],
    createdAt: new Date(item["createdAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    createdBy: item["createdBy"],
  };
}

/** Enum for run status */
export enum KnownRunStatus {
  /** Not Started */
  NotStarted = "NotStarted",
  /** Running */
  Running = "Running",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Enum for run status \
 * {@link KnownRunStatus} can be used interchangeably with RunStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Not Started \
 * **Running**: Running \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type RunStatus = string;

/** Overview of compute usage for a project. */
export interface ComputeUsage {
  /**
   * Index of information for each supercomputer in the workspace of a project.
   * Indexed by the (short) name of the supercomputer.
   */
  supercomputers: Record<string, SupercomputerUsage>;
}

export function computeUsageDeserializer(item: any): ComputeUsage {
  return {
    supercomputers: supercomputerUsageRecordDeserializer(item["supercomputers"]),
  };
}

export function supercomputerUsageRecordDeserializer(
  item: Record<string, any>,
): Record<string, SupercomputerUsage> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : supercomputerUsageDeserializer(item[key]);
  });
  return result;
}

/** Overview of compute usage for a supercomputer. */
export interface SupercomputerUsage {
  /** Number of active jobs on the supercomputer. */
  activeJobs: number;
  /** Number of pending jobs on the supercomputer. */
  pendingJobs: number;
  /** Nodepool utilization for each nodepool for a supercomputer. */
  nodepools: Record<string, NodepoolUsage>;
}

export function supercomputerUsageDeserializer(item: any): SupercomputerUsage {
  return {
    activeJobs: item["activeJobs"],
    pendingJobs: item["pendingJobs"],
    nodepools: nodepoolUsageRecordDeserializer(item["nodepools"]),
  };
}

export function nodepoolUsageRecordDeserializer(
  item: Record<string, any>,
): Record<string, NodepoolUsage> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : nodepoolUsageDeserializer(item[key]);
  });
  return result;
}

/** Overview of compute usage for a nodepool. */
export interface NodepoolUsage {
  /**
   * CPUs in use (e.g. 1, or 500m for 500 milli-CPUs)
   * across all nodes in the nodepool.
   */
  reservedCPUs: string;
  /**
   * CPUs which are free to use (e.g. 1, or 500m for 500 milli-CPUs)
   * across all nodes in the nodepool.
   */
  allocatableCPUs: string;
  /** Memory which is in use (e.g. 500Mi or 1Gi). */
  reservedMemory: string;
  /** Memory which is free to use (e.g. 500Mi or 1Gi). */
  allocatableMemory: string;
  /** GPUs which are in use. */
  reservedGPUs: string;
  /** GPUs which are free to use. */
  allocatableGPUs: string;
}

export function nodepoolUsageDeserializer(item: any): NodepoolUsage {
  return {
    reservedCPUs: item["reservedCPUs"],
    allocatableCPUs: item["allocatableCPUs"],
    reservedMemory: item["reservedMemory"],
    allocatableMemory: item["allocatableMemory"],
    reservedGPUs: item["reservedGPUs"],
    allocatableGPUs: item["allocatableGPUs"],
  };
}

/** Task resource. */
export interface Task {
  /** The unique identifier of the task. */
  readonly name: string;
  /** The title of the task. */
  title?: string;
  /** The priority of the task. */
  priority?: TaskPriority;
  /** The description of the task. */
  description?: string;
  /** Array of validation requirements for the task. */
  validationRequirements?: string[];
  /** ID of the parent task if this is a subtask. */
  parentId?: string;
  /** IDs of tasks that must complete before this task can be executed. */
  dependsOn?: string[];
  /** IDs of tasks that are related to this task. */
  relatedTo?: string[];
  /** Application or user assigned to this task. */
  assignedTo?: TaskAssignee;
  /** Comments or notes about the task. */
  comments?: TaskComment[];
  /** The current status of the task. */
  status?: TaskStatus;
  /** The timestamp when the resource was created */
  readonly createdAt?: Date;
  /** The ID of the user who created this resource. */
  readonly createdBy?: string;
  /** Type of entity that created the resource (User, Application, System, or custom type). */
  createdByType?: ByType;
  /** The timestamp when the resource was last updated */
  readonly lastModifiedAt?: Date;
  /** The ID of the user who updated this resource. */
  readonly lastModifiedBy?: string;
  /** The type of user who updated this resource. */
  readonly lastModifiedByType?: ByType;
  /** History of execution events for this task. */
  readonly executionHistory?: ExecutionHistoryEntry[];
  /** The investigation identifier associated with the task. */
  investigationId?: string;
  /** Task execution result with text and storage assets. */
  taskResult?: TaskResult;
  /** List of storage assets related to the task. */
  storageAssetIds?: string[];
}

export function taskSerializer(item: Task): any {
  return {
    title: item["title"],
    priority: item["priority"],
    description: item["description"],
    validationRequirements: !item["validationRequirements"]
      ? item["validationRequirements"]
      : item["validationRequirements"].map((p: any) => {
          return p;
        }),
    parentId: item["parentId"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    relatedTo: !item["relatedTo"]
      ? item["relatedTo"]
      : item["relatedTo"].map((p: any) => {
          return p;
        }),
    assignedTo: !item["assignedTo"]
      ? item["assignedTo"]
      : taskAssigneeSerializer(item["assignedTo"]),
    comments: !item["comments"] ? item["comments"] : taskCommentArraySerializer(item["comments"]),
    status: item["status"],
    createdByType: item["createdByType"],
    investigationId: item["investigationId"],
    taskResult: !item["taskResult"] ? item["taskResult"] : taskResultSerializer(item["taskResult"]),
    storageAssetIds: !item["storageAssetIds"]
      ? item["storageAssetIds"]
      : item["storageAssetIds"].map((p: any) => {
          return p;
        }),
  };
}

export function taskDeserializer(item: any): Task {
  return {
    name: item["name"],
    title: item["title"],
    priority: item["priority"],
    description: item["description"],
    validationRequirements: !item["validationRequirements"]
      ? item["validationRequirements"]
      : item["validationRequirements"].map((p: any) => {
          return p;
        }),
    parentId: item["parentId"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    relatedTo: !item["relatedTo"]
      ? item["relatedTo"]
      : item["relatedTo"].map((p: any) => {
          return p;
        }),
    assignedTo: !item["assignedTo"]
      ? item["assignedTo"]
      : taskAssigneeDeserializer(item["assignedTo"]),
    comments: !item["comments"] ? item["comments"] : taskCommentArrayDeserializer(item["comments"]),
    status: item["status"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    executionHistory: !item["executionHistory"]
      ? item["executionHistory"]
      : executionHistoryEntryArrayDeserializer(item["executionHistory"]),
    investigationId: item["investigationId"],
    taskResult: !item["taskResult"]
      ? item["taskResult"]
      : taskResultDeserializer(item["taskResult"]),
    storageAssetIds: !item["storageAssetIds"]
      ? item["storageAssetIds"]
      : item["storageAssetIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Task priority level. */
export enum KnownTaskPriority {
  /** Low priority */
  Low = "Low",
  /** Medium priority */
  Medium = "Medium",
  /** High priority */
  High = "High",
}

/**
 * Task priority level. \
 * {@link KnownTaskPriority} can be used interchangeably with TaskPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low priority \
 * **Medium**: Medium priority \
 * **High**: High priority
 */
export type TaskPriority = string;

/** Task assignee information. */
export interface TaskAssignee {
  /** The unique identifier of the assignee. */
  id: string;
  /** Type of assignee (User, Application, System, or custom type). */
  type: ByType;
}

export function taskAssigneeSerializer(item: TaskAssignee): any {
  return { id: item["id"], type: item["type"] };
}

export function taskAssigneeDeserializer(item: any): TaskAssignee {
  return {
    id: item["id"],
    type: item["type"],
  };
}

export function taskCommentArraySerializer(result: Array<TaskComment>): any[] {
  return result.map((item) => {
    return taskCommentSerializer(item);
  });
}

export function taskCommentArrayDeserializer(result: Array<TaskComment>): any[] {
  return result.map((item) => {
    return taskCommentDeserializer(item);
  });
}

/** Task comment. */
export interface TaskComment {
  /** When the comment was created. */
  timestamp?: Date;
  /** ID of the user or application who created the comment. */
  createdBy: string;
  /** Type of creator (User, Application, System, or custom type). */
  createdByType: ByType;
  /** The comment text content. */
  text: string;
}

export function taskCommentSerializer(item: TaskComment): any {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : item["timestamp"].toISOString(),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    text: item["text"],
  };
}

export function taskCommentDeserializer(item: any): TaskComment {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    text: item["text"],
  };
}

/** Task status enumeration. */
export enum KnownTaskStatus {
  /** The task is newly created */
  New = "New",
  /** The task is on hold */
  OnHold = "OnHold",
  /** The task has been completed */
  Complete = "Complete",
  /** The task has been removed */
  Removed = "Removed",
  /** The task has been flagged for human review */
  FlaggedHuman = "FlaggedHuman",
  /** The task has been flagged for AI review */
  FlaggedAi = "FlaggedAi",
  /** The task is currently executing */
  Executing = "Executing",
  /** The task execution is done */
  ExecutionDone = "ExecutionDone",
  /** The task has become stale */
  Stale = "Stale",
  /** The task has failed */
  Failed = "Failed",
  /** The task is incomplete */
  Incomplete = "Incomplete",
}

/**
 * Task status enumeration. \
 * {@link KnownTaskStatus} can be used interchangeably with TaskStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: The task is newly created \
 * **OnHold**: The task is on hold \
 * **Complete**: The task has been completed \
 * **Removed**: The task has been removed \
 * **FlaggedHuman**: The task has been flagged for human review \
 * **FlaggedAi**: The task has been flagged for AI review \
 * **Executing**: The task is currently executing \
 * **ExecutionDone**: The task execution is done \
 * **Stale**: The task has become stale \
 * **Failed**: The task has failed \
 * **Incomplete**: The task is incomplete
 */
export type TaskStatus = string;

export function executionHistoryEntryArraySerializer(result: Array<ExecutionHistoryEntry>): any[] {
  return result.map((item) => {
    return executionHistoryEntrySerializer(item);
  });
}

export function executionHistoryEntryArrayDeserializer(
  result: Array<ExecutionHistoryEntry>,
): any[] {
  return result.map((item) => {
    return executionHistoryEntryDeserializer(item);
  });
}

/** Execution history entry for a task. */
export interface ExecutionHistoryEntry {
  /** Timestamp when the entry was created (ISO 8601 UTC format). */
  createdAt: Date;
  /** The action that was performed (controlled vocabulary; semi-open). */
  action: string;
  /** Identifier of who created this entry (GUID for user | resourceId for application | arbitrary string for other types). */
  createdBy: string;
  /** Type of entity that created this entry (User, Application, System, or custom type). */
  createdByType: ByType;
  /** Brief summary of the execution event. */
  summary?: string;
  /** Detailed completion message. */
  responseMessageText?: string;
  /** Run or message ID for full details. */
  responseMessageId?: string;
  /** Freeform key-value pairs for additional details. */
  additionalDetails?: Record<string, any>;
}

export function executionHistoryEntrySerializer(item: ExecutionHistoryEntry): any {
  return {
    createdAt: item["createdAt"].toISOString(),
    action: item["action"],
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    summary: item["summary"],
    responseMessageText: item["responseMessageText"],
    responseMessageId: item["responseMessageId"],
    additionalDetails: item["additionalDetails"],
  };
}

export function executionHistoryEntryDeserializer(item: any): ExecutionHistoryEntry {
  return {
    createdAt: new Date(item["createdAt"]),
    action: item["action"],
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    summary: item["summary"],
    responseMessageText: item["responseMessageText"],
    responseMessageId: item["responseMessageId"],
    additionalDetails: !item["additionalDetails"]
      ? item["additionalDetails"]
      : Object.fromEntries(
          Object.entries(item["additionalDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Task execution result. */
export interface TaskResult {
  /** The text content of the task result. */
  text?: string;
  /** Array of storage asset identifiers related to the result. */
  storageAssetIds?: string[];
}

export function taskResultSerializer(item: TaskResult): any {
  return {
    text: item["text"],
    storageAssetIds: !item["storageAssetIds"]
      ? item["storageAssetIds"]
      : item["storageAssetIds"].map((p: any) => {
          return p;
        }),
  };
}

export function taskResultDeserializer(item: any): TaskResult {
  return {
    text: item["text"],
    storageAssetIds: !item["storageAssetIds"]
      ? item["storageAssetIds"]
      : item["storageAssetIds"].map((p: any) => {
          return p;
        }),
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

/** Request body for starting a task. */
export interface StartTaskRequest {
  /** Assignee that will execute the task. Optional. */
  assignee?: TaskAssignee;
}

export function startTaskRequestSerializer(item: StartTaskRequest): any {
  return {
    assignee: !item["assignee"] ? item["assignee"] : taskAssigneeSerializer(item["assignee"]),
  };
}

/** The writable properties supplied when creating or updating a {@link Task}. */
export type TaskCreateOrUpdateContent = Omit<Task, "name">;

/** The writable properties supplied when creating or updating a {@link Conversation}. */
export type ConversationCreateOrUpdateContent = Omit<Conversation, "name">;

/** The writable properties supplied when creating or updating an {@link Investigation}. */
export type InvestigationCreateOrUpdateContent = Omit<Investigation, "name" | "projectName">;
