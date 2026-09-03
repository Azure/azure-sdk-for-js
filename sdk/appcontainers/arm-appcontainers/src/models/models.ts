// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/** App Service error response. */
export interface DefaultErrorResponse {
  /** Error model. */
  readonly error?: DefaultErrorResponseError;
}

export function defaultErrorResponseDeserializer(item: any): DefaultErrorResponse {
  return {
    error: !item["error"] ? item["error"] : defaultErrorResponseErrorDeserializer(item["error"]),
  };
}

/** Error model. */
export interface DefaultErrorResponseError {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
  /** Details or the error */
  details?: DefaultErrorResponseErrorDetailsItem[];
  /** More information to debug error. */
  readonly innererror?: string;
}

export function defaultErrorResponseErrorDeserializer(item: any): DefaultErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : defaultErrorResponseErrorDetailsItemArrayDeserializer(item["details"]),
    innererror: item["innererror"],
  };
}

export function defaultErrorResponseErrorDetailsItemArrayDeserializer(
  result: Array<DefaultErrorResponseErrorDetailsItem>,
): any[] {
  return result.map((item) => {
    return defaultErrorResponseErrorDetailsItemDeserializer(item);
  });
}

/** Detailed errors. */
export interface DefaultErrorResponseErrorDetailsItem {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
}

export function defaultErrorResponseErrorDetailsItemDeserializer(
  item: any,
): DefaultErrorResponseErrorDetailsItem {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** Container Apps Job execution. */
export interface JobExecution extends ProxyResource {
  /** Current running State of the job */
  readonly status?: JobExecutionRunningState;
  /** Job execution start time. */
  startTime?: Date;
  /** Job execution end time. */
  endTime?: Date;
  /** Job's execution container. */
  template?: JobExecutionTemplate;
  /** Detailed status of the job execution. */
  detailedStatus?: ExecutionStatus;
  /** Reason for the current condition of job execution. */
  readonly reason?: string;
  /** Human readable message indicating details about the current condition of the job execution. */
  readonly message?: string;
}

export function jobExecutionDeserializer(item: any): JobExecution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobExecutionPropertiesDeserializer(item["properties"])),
  };
}

/** Container Apps Job execution specific properties. */
export interface JobExecutionProperties {
  /** Current running State of the job */
  readonly status?: JobExecutionRunningState;
  /** Job execution start time. */
  startTime?: Date;
  /** Job execution end time. */
  endTime?: Date;
  /** Job's execution container. */
  template?: JobExecutionTemplate;
  /** Detailed status of the job execution. */
  detailedStatus?: ExecutionStatus;
  /** Reason for the current condition of job execution. */
  readonly reason?: string;
  /** Human readable message indicating details about the current condition of the job execution. */
  readonly message?: string;
}

export function jobExecutionPropertiesDeserializer(item: any): JobExecutionProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    template: !item["template"]
      ? item["template"]
      : jobExecutionTemplateDeserializer(item["template"]),
    detailedStatus: !item["detailedStatus"]
      ? item["detailedStatus"]
      : executionStatusDeserializer(item["detailedStatus"]),
    reason: item["reason"],
    message: item["message"],
  };
}

/** Current running State of the job */
export enum KnownJobExecutionRunningState {
  /** Running */
  Running = "Running",
  /** Processing */
  Processing = "Processing",
  /** Stopped */
  Stopped = "Stopped",
  /** Degraded */
  Degraded = "Degraded",
  /** Failed */
  Failed = "Failed",
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
}

/**
 * Current running State of the job \
 * {@link KnownJobExecutionRunningState} can be used interchangeably with JobExecutionRunningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: Running \
 * **Processing**: Processing \
 * **Stopped**: Stopped \
 * **Degraded**: Degraded \
 * **Failed**: Failed \
 * **Unknown**: Unknown \
 * **Succeeded**: Succeeded
 */
export type JobExecutionRunningState = string;

/** Job's execution template, containing container configuration for a job's execution */
export interface JobExecutionTemplate {
  /** List of container definitions for the Container Apps Job. */
  containers?: JobExecutionContainer[];
  /** List of specialized containers that run before job containers. */
  initContainers?: JobExecutionContainer[];
}

export function jobExecutionTemplateSerializer(item: JobExecutionTemplate): any {
  return {
    containers: !item["containers"]
      ? item["containers"]
      : jobExecutionContainerArraySerializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : jobExecutionContainerArraySerializer(item["initContainers"]),
  };
}

export function jobExecutionTemplateDeserializer(item: any): JobExecutionTemplate {
  return {
    containers: !item["containers"]
      ? item["containers"]
      : jobExecutionContainerArrayDeserializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : jobExecutionContainerArrayDeserializer(item["initContainers"]),
  };
}

export function jobExecutionContainerArraySerializer(result: Array<JobExecutionContainer>): any[] {
  return result.map((item) => {
    return jobExecutionContainerSerializer(item);
  });
}

export function jobExecutionContainerArrayDeserializer(
  result: Array<JobExecutionContainer>,
): any[] {
  return result.map((item) => {
    return jobExecutionContainerDeserializer(item);
  });
}

/** Container Apps Jobs execution container definition. */
export interface JobExecutionContainer {
  /** Container image tag. */
  image?: string;
  /** Custom container name. */
  name?: string;
  /** Container start command. */
  command?: string[];
  /** Container start command arguments. */
  args?: string[];
  /** Container environment variables. */
  env?: EnvironmentVar[];
  /** Container resource requirements. */
  resources?: ContainerResources;
}

export function jobExecutionContainerSerializer(item: JobExecutionContainer): any {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArraySerializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesSerializer(item["resources"]),
  };
}

export function jobExecutionContainerDeserializer(item: any): JobExecutionContainer {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArrayDeserializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesDeserializer(item["resources"]),
  };
}

export function environmentVarArraySerializer(result: Array<EnvironmentVar>): any[] {
  return result.map((item) => {
    return environmentVarSerializer(item);
  });
}

export function environmentVarArrayDeserializer(result: Array<EnvironmentVar>): any[] {
  return result.map((item) => {
    return environmentVarDeserializer(item);
  });
}

/** Container App container environment variable. */
export interface EnvironmentVar {
  /** Environment variable name. */
  name?: string;
  /** Non-secret environment variable value. */
  value?: string;
  /** Name of the Container App secret from which to pull the environment variable value. */
  secretRef?: string;
}

export function environmentVarSerializer(item: EnvironmentVar): any {
  return { name: item["name"], value: item["value"], secretRef: item["secretRef"] };
}

export function environmentVarDeserializer(item: any): EnvironmentVar {
  return {
    name: item["name"],
    value: item["value"],
    secretRef: item["secretRef"],
  };
}

/** Container App container resource requirements. */
export interface ContainerResources {
  /** Required CPU in cores, e.g. 0.5 */
  cpu?: number;
  /** Required memory, e.g. "250Mb" */
  memory?: string;
  /** Ephemeral Storage, e.g. "1Gi" */
  readonly ephemeralStorage?: string;
}

export function containerResourcesSerializer(item: ContainerResources): any {
  return { cpu: item["cpu"], memory: item["memory"] };
}

export function containerResourcesDeserializer(item: any): ContainerResources {
  return {
    cpu: item["cpu"],
    memory: item["memory"],
    ephemeralStorage: item["ephemeralStorage"],
  };
}

/** Container Apps Job execution status. */
export interface ExecutionStatus {
  /** Replicas in the execution. */
  replicas?: ReplicaExecutionStatus[];
}

export function executionStatusDeserializer(item: any): ExecutionStatus {
  return {
    replicas: !item["replicas"]
      ? item["replicas"]
      : replicaExecutionStatusArrayDeserializer(item["replicas"]),
  };
}

export function replicaExecutionStatusArrayDeserializer(
  result: Array<ReplicaExecutionStatus>,
): any[] {
  return result.map((item) => {
    return replicaExecutionStatusDeserializer(item);
  });
}

/** Container Apps Job execution replica status. */
export interface ReplicaExecutionStatus {
  /** Replica Name. */
  name?: string;
  /** Containers in the execution replica */
  containers?: ContainerExecutionStatus[];
}

export function replicaExecutionStatusDeserializer(item: any): ReplicaExecutionStatus {
  return {
    name: item["name"],
    containers: !item["containers"]
      ? item["containers"]
      : containerExecutionStatusArrayDeserializer(item["containers"]),
  };
}

export function containerExecutionStatusArrayDeserializer(
  result: Array<ContainerExecutionStatus>,
): any[] {
  return result.map((item) => {
    return containerExecutionStatusDeserializer(item);
  });
}

/** Container Apps Job execution container status. Contains status code and reason */
export interface ContainerExecutionStatus {
  /** Container Name. */
  name?: string;
  /** Exit code */
  code?: number;
  /** Additional information for the container status */
  additionalInformation?: string;
  /** Status of the container */
  status?: string;
}

export function containerExecutionStatusDeserializer(item: any): ContainerExecutionStatus {
  return {
    name: item["name"],
    code: item["code"],
    additionalInformation: item["additionalInformation"],
    status: item["status"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** Available operations of the service */
export interface _AvailableOperations {
  /** The OperationDetail items on this page */
  value: OperationDetail[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _availableOperationsDeserializer(item: any): _AvailableOperations {
  return {
    value: operationDetailArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationDetailArrayDeserializer(result: Array<OperationDetail>): any[] {
  return result.map((item) => {
    return operationDetailDeserializer(item);
  });
}

/** Operation detail payload */
export interface OperationDetail {
  /** Name of the operation */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display of the operation */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
}

export function operationDetailDeserializer(item: any): OperationDetail {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** Operation display payload */
export interface OperationDisplay {
  /** Resource provider of the operation */
  provider?: string;
  /** Resource of the operation */
  resource?: string;
  /** Localized friendly name for the operation */
  operation?: string;
  /** Localized friendly description for the operation */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Container App session pool. */
export interface SessionPool extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource ID of the session pool's environment. */
  environmentId?: string;
  /** The container type of the sessions. You can use your own container to build the session pool, or you can use a predefined container to run workload with specific language. */
  containerType?: ContainerType;
  /** The pool management type of the session pool. */
  poolManagementType?: PoolManagementType;
  /** The number of nodes the session pool is using. */
  readonly nodeCount?: number;
  /** The scale configuration of the session pool. */
  scaleConfiguration?: ScaleConfiguration;
  /** The secrets of the session pool. */
  secrets?: SessionPoolSecret[];
  /** The pool configuration if the poolManagementType is dynamic. */
  dynamicPoolConfiguration?: DynamicPoolConfiguration;
  /** The custom container configuration if the containerType is CustomContainer. */
  customContainerTemplate?: CustomContainerTemplate;
  /** The network configuration of the sessions in the session pool. */
  sessionNetworkConfiguration?: SessionNetworkConfiguration;
  /** The endpoint to manage the pool. */
  readonly poolManagementEndpoint?: string;
  /** Provisioning state of the session pool. */
  readonly provisioningState?: SessionPoolProvisioningState;
  /** Optional settings for a Managed Identity that is assigned to the Session pool. */
  managedIdentitySettings?: ManagedIdentitySetting[];
}

export function sessionPoolSerializer(item: SessionPool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "environmentId",
      "containerType",
      "poolManagementType",
      "scaleConfiguration",
      "secrets",
      "dynamicPoolConfiguration",
      "customContainerTemplate",
      "sessionNetworkConfiguration",
      "managedIdentitySettings",
    ])
      ? undefined
      : _sessionPoolPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function sessionPoolDeserializer(item: any): SessionPool {
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
    ...(!item["properties"]
      ? item["properties"]
      : _sessionPoolPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Container App session pool resource specific properties */
export interface SessionPoolProperties {
  /** Resource ID of the session pool's environment. */
  environmentId?: string;
  /** The container type of the sessions. You can use your own container to build the session pool, or you can use a predefined container to run workload with specific language. */
  containerType?: ContainerType;
  /** The pool management type of the session pool. */
  poolManagementType?: PoolManagementType;
  /** The number of nodes the session pool is using. */
  readonly nodeCount?: number;
  /** The scale configuration of the session pool. */
  scaleConfiguration?: ScaleConfiguration;
  /** The secrets of the session pool. */
  secrets?: SessionPoolSecret[];
  /** The pool configuration if the poolManagementType is dynamic. */
  dynamicPoolConfiguration?: DynamicPoolConfiguration;
  /** The custom container configuration if the containerType is CustomContainer. */
  customContainerTemplate?: CustomContainerTemplate;
  /** The network configuration of the sessions in the session pool. */
  sessionNetworkConfiguration?: SessionNetworkConfiguration;
  /** The endpoint to manage the pool. */
  readonly poolManagementEndpoint?: string;
  /** Provisioning state of the session pool. */
  readonly provisioningState?: SessionPoolProvisioningState;
  /** Optional settings for a Managed Identity that is assigned to the Session pool. */
  managedIdentitySettings?: ManagedIdentitySetting[];
}

export function sessionPoolPropertiesSerializer(item: SessionPoolProperties): any {
  return {
    environmentId: item["environmentId"],
    containerType: item["containerType"],
    poolManagementType: item["poolManagementType"],
    scaleConfiguration: !item["scaleConfiguration"]
      ? item["scaleConfiguration"]
      : scaleConfigurationSerializer(item["scaleConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : sessionPoolSecretArraySerializer(item["secrets"]),
    dynamicPoolConfiguration: !item["dynamicPoolConfiguration"]
      ? item["dynamicPoolConfiguration"]
      : dynamicPoolConfigurationSerializer(item["dynamicPoolConfiguration"]),
    customContainerTemplate: !item["customContainerTemplate"]
      ? item["customContainerTemplate"]
      : customContainerTemplateSerializer(item["customContainerTemplate"]),
    sessionNetworkConfiguration: !item["sessionNetworkConfiguration"]
      ? item["sessionNetworkConfiguration"]
      : sessionNetworkConfigurationSerializer(item["sessionNetworkConfiguration"]),
    managedIdentitySettings: !item["managedIdentitySettings"]
      ? item["managedIdentitySettings"]
      : managedIdentitySettingArraySerializer(item["managedIdentitySettings"]),
  };
}

export function sessionPoolPropertiesDeserializer(item: any): SessionPoolProperties {
  return {
    environmentId: item["environmentId"],
    containerType: item["containerType"],
    poolManagementType: item["poolManagementType"],
    nodeCount: item["nodeCount"],
    scaleConfiguration: !item["scaleConfiguration"]
      ? item["scaleConfiguration"]
      : scaleConfigurationDeserializer(item["scaleConfiguration"]),
    secrets: !item["secrets"]
      ? item["secrets"]
      : sessionPoolSecretArrayDeserializer(item["secrets"]),
    dynamicPoolConfiguration: !item["dynamicPoolConfiguration"]
      ? item["dynamicPoolConfiguration"]
      : dynamicPoolConfigurationDeserializer(item["dynamicPoolConfiguration"]),
    customContainerTemplate: !item["customContainerTemplate"]
      ? item["customContainerTemplate"]
      : customContainerTemplateDeserializer(item["customContainerTemplate"]),
    sessionNetworkConfiguration: !item["sessionNetworkConfiguration"]
      ? item["sessionNetworkConfiguration"]
      : sessionNetworkConfigurationDeserializer(item["sessionNetworkConfiguration"]),
    poolManagementEndpoint: item["poolManagementEndpoint"],
    provisioningState: item["provisioningState"],
    managedIdentitySettings: !item["managedIdentitySettings"]
      ? item["managedIdentitySettings"]
      : managedIdentitySettingArrayDeserializer(item["managedIdentitySettings"]),
  };
}

/** The container type of the sessions. You can use your own container to build the session pool, or you can use a predefined container to run workload with specific language. */
export enum KnownContainerType {
  /** CustomContainer */
  CustomContainer = "CustomContainer",
  /** PythonLTS */
  PythonLTS = "PythonLTS",
}

/**
 * The container type of the sessions. You can use your own container to build the session pool, or you can use a predefined container to run workload with specific language. \
 * {@link KnownContainerType} can be used interchangeably with ContainerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomContainer**: CustomContainer \
 * **PythonLTS**: PythonLTS
 */
export type ContainerType = string;

/** The pool management type of the session pool. */
export enum KnownPoolManagementType {
  /** Manual */
  Manual = "Manual",
  /** Dynamic */
  Dynamic = "Dynamic",
}

/**
 * The pool management type of the session pool. \
 * {@link KnownPoolManagementType} can be used interchangeably with PoolManagementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Manual \
 * **Dynamic**: Dynamic
 */
export type PoolManagementType = string;

/** Scale configuration. */
export interface ScaleConfiguration {
  /** The maximum count of sessions at the same time. */
  maxConcurrentSessions?: number;
  /** The minimum count of ready session instances. */
  readySessionInstances?: number;
}

export function scaleConfigurationSerializer(item: ScaleConfiguration): any {
  return {
    maxConcurrentSessions: item["maxConcurrentSessions"],
    readySessionInstances: item["readySessionInstances"],
  };
}

export function scaleConfigurationDeserializer(item: any): ScaleConfiguration {
  return {
    maxConcurrentSessions: item["maxConcurrentSessions"],
    readySessionInstances: item["readySessionInstances"],
  };
}

export function sessionPoolSecretArraySerializer(result: Array<SessionPoolSecret>): any[] {
  return result.map((item) => {
    return sessionPoolSecretSerializer(item);
  });
}

export function sessionPoolSecretArrayDeserializer(result: Array<SessionPoolSecret>): any[] {
  return result.map((item) => {
    return sessionPoolSecretDeserializer(item);
  });
}

/** Secret definition. */
export interface SessionPoolSecret {
  /** Secret Name. */
  name?: string;
  /** Secret Value. */
  value?: string;
}

export function sessionPoolSecretSerializer(item: SessionPoolSecret): any {
  return { name: item["name"], value: item["value"] };
}

export function sessionPoolSecretDeserializer(item: any): SessionPoolSecret {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Dynamic pool configuration. */
export interface DynamicPoolConfiguration {
  /** The lifecycle configuration of a session in the dynamic session pool */
  lifecycleConfiguration?: LifecycleConfiguration;
}

export function dynamicPoolConfigurationSerializer(item: DynamicPoolConfiguration): any {
  return {
    lifecycleConfiguration: !item["lifecycleConfiguration"]
      ? item["lifecycleConfiguration"]
      : lifecycleConfigurationSerializer(item["lifecycleConfiguration"]),
  };
}

export function dynamicPoolConfigurationDeserializer(item: any): DynamicPoolConfiguration {
  return {
    lifecycleConfiguration: !item["lifecycleConfiguration"]
      ? item["lifecycleConfiguration"]
      : lifecycleConfigurationDeserializer(item["lifecycleConfiguration"]),
  };
}

/** The lifecycle configuration properties of a session in the dynamic session pool */
export interface LifecycleConfiguration {
  /** The lifecycle type of the session pool. */
  lifecycleType?: LifecycleType;
  /** The cooldown period of a session in seconds when the lifecycle type is 'Timed'. */
  cooldownPeriodInSeconds?: number;
  /** The maximum alive period of a session in seconds when the lifecycle type is 'OnContainerExit'. */
  maxAlivePeriodInSeconds?: number;
}

export function lifecycleConfigurationSerializer(item: LifecycleConfiguration): any {
  return {
    lifecycleType: item["lifecycleType"],
    cooldownPeriodInSeconds: item["cooldownPeriodInSeconds"],
    maxAlivePeriodInSeconds: item["maxAlivePeriodInSeconds"],
  };
}

export function lifecycleConfigurationDeserializer(item: any): LifecycleConfiguration {
  return {
    lifecycleType: item["lifecycleType"],
    cooldownPeriodInSeconds: item["cooldownPeriodInSeconds"],
    maxAlivePeriodInSeconds: item["maxAlivePeriodInSeconds"],
  };
}

/** The lifecycle type of the session pool. */
export enum KnownLifecycleType {
  /** Timed */
  Timed = "Timed",
  /** OnContainerExit */
  OnContainerExit = "OnContainerExit",
}

/**
 * The lifecycle type of the session pool. \
 * {@link KnownLifecycleType} can be used interchangeably with LifecycleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Timed**: Timed \
 * **OnContainerExit**: OnContainerExit
 */
export type LifecycleType = string;

/** Custom container configuration. */
export interface CustomContainerTemplate {
  /** Private container registry credentials for containers used by the sessions of the session pool. */
  registryCredentials?: SessionRegistryCredentials;
  /** List of container definitions for the sessions of the session pool. */
  containers?: SessionContainer[];
  /** Session pool ingress configuration. */
  ingress?: SessionIngress;
}

export function customContainerTemplateSerializer(item: CustomContainerTemplate): any {
  return {
    registryCredentials: !item["registryCredentials"]
      ? item["registryCredentials"]
      : sessionRegistryCredentialsSerializer(item["registryCredentials"]),
    containers: !item["containers"]
      ? item["containers"]
      : sessionContainerArraySerializer(item["containers"]),
    ingress: !item["ingress"] ? item["ingress"] : sessionIngressSerializer(item["ingress"]),
  };
}

export function customContainerTemplateDeserializer(item: any): CustomContainerTemplate {
  return {
    registryCredentials: !item["registryCredentials"]
      ? item["registryCredentials"]
      : sessionRegistryCredentialsDeserializer(item["registryCredentials"]),
    containers: !item["containers"]
      ? item["containers"]
      : sessionContainerArrayDeserializer(item["containers"]),
    ingress: !item["ingress"] ? item["ingress"] : sessionIngressDeserializer(item["ingress"]),
  };
}

/** Session pool private registry credentials. */
export interface SessionRegistryCredentials {
  /** Container registry server. */
  server?: string;
  /** Container registry username. */
  username?: string;
  /** The name of the secret that contains the registry login password */
  passwordSecretRef?: string;
  /** A Managed Identity to use to authenticate with Azure Container Registry. For user-assigned identities, use the full user-assigned identity Resource ID. For system-assigned identities, use 'system' */
  identity?: string;
}

export function sessionRegistryCredentialsSerializer(item: SessionRegistryCredentials): any {
  return {
    server: item["server"],
    username: item["username"],
    passwordSecretRef: item["passwordSecretRef"],
    identity: item["identity"],
  };
}

export function sessionRegistryCredentialsDeserializer(item: any): SessionRegistryCredentials {
  return {
    server: item["server"],
    username: item["username"],
    passwordSecretRef: item["passwordSecretRef"],
    identity: item["identity"],
  };
}

export function sessionContainerArraySerializer(result: Array<SessionContainer>): any[] {
  return result.map((item) => {
    return sessionContainerSerializer(item);
  });
}

export function sessionContainerArrayDeserializer(result: Array<SessionContainer>): any[] {
  return result.map((item) => {
    return sessionContainerDeserializer(item);
  });
}

/** Container definitions for the sessions of the session pool. */
export interface SessionContainer {
  /** Container image tag. */
  image?: string;
  /** Custom container name. */
  name?: string;
  /** Container start command. */
  command?: string[];
  /** Container start command arguments. */
  args?: string[];
  /** Container environment variables. */
  env?: EnvironmentVar[];
  /** Container resource requirements. */
  resources?: SessionContainerResources;
  /** List of probes for the container. */
  probes?: SessionProbe[];
}

export function sessionContainerSerializer(item: SessionContainer): any {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArraySerializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : sessionContainerResourcesSerializer(item["resources"]),
    probes: !item["probes"] ? item["probes"] : sessionProbeArraySerializer(item["probes"]),
  };
}

export function sessionContainerDeserializer(item: any): SessionContainer {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArrayDeserializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : sessionContainerResourcesDeserializer(item["resources"]),
    probes: !item["probes"] ? item["probes"] : sessionProbeArrayDeserializer(item["probes"]),
  };
}

/** Container resource requirements for sessions of the session pool. */
export interface SessionContainerResources {
  /** Required CPU in cores, e.g. 0.5 */
  cpu?: number;
  /** Required memory, e.g. "250Mb" */
  memory?: string;
}

export function sessionContainerResourcesSerializer(item: SessionContainerResources): any {
  return { cpu: item["cpu"], memory: item["memory"] };
}

export function sessionContainerResourcesDeserializer(item: any): SessionContainerResources {
  return {
    cpu: item["cpu"],
    memory: item["memory"],
  };
}

export function sessionProbeArraySerializer(result: Array<SessionProbe>): any[] {
  return result.map((item) => {
    return sessionProbeSerializer(item);
  });
}

export function sessionProbeArrayDeserializer(result: Array<SessionProbe>): any[] {
  return result.map((item) => {
    return sessionProbeDeserializer(item);
  });
}

/** Session probe configuration. */
export interface SessionProbe {
  /** Denotes the type of probe. Can be Liveness or Startup, Readiness probe is not supported in sessions. Type must be unique for each probe within the context of a list of probes (SessionProbes). */
  type?: SessionProbeType;
  /** HTTPGet specifies the http request to perform. */
  httpGet?: SessionProbeHttpGet;
  /** TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported. */
  tcpSocket?: SessionProbeTcpSocket;
  /** Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1. Maximum value is 10. */
  failureThreshold?: number;
  /** Number of seconds after the container has started before liveness probes are initiated. Minimum value is 1. Maximum value is 60. */
  initialDelaySeconds?: number;
  /** How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value is 240. */
  periodSeconds?: number;
  /** Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1. Maximum value is 10. */
  successThreshold?: number;
  /** Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is an alpha field and requires enabling ProbeTerminationGracePeriod feature gate. Maximum value is 3600 seconds (1 hour) */
  terminationGracePeriodSeconds?: number;
  /** Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 240. */
  timeoutSeconds?: number;
}

export function sessionProbeSerializer(item: SessionProbe): any {
  return {
    type: item["type"],
    httpGet: !item["httpGet"] ? item["httpGet"] : sessionProbeHttpGetSerializer(item["httpGet"]),
    tcpSocket: !item["tcpSocket"]
      ? item["tcpSocket"]
      : sessionProbeTcpSocketSerializer(item["tcpSocket"]),
    failureThreshold: item["failureThreshold"],
    initialDelaySeconds: item["initialDelaySeconds"],
    periodSeconds: item["periodSeconds"],
    successThreshold: item["successThreshold"],
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    timeoutSeconds: item["timeoutSeconds"],
  };
}

export function sessionProbeDeserializer(item: any): SessionProbe {
  return {
    type: item["type"],
    httpGet: !item["httpGet"] ? item["httpGet"] : sessionProbeHttpGetDeserializer(item["httpGet"]),
    tcpSocket: !item["tcpSocket"]
      ? item["tcpSocket"]
      : sessionProbeTcpSocketDeserializer(item["tcpSocket"]),
    failureThreshold: item["failureThreshold"],
    initialDelaySeconds: item["initialDelaySeconds"],
    periodSeconds: item["periodSeconds"],
    successThreshold: item["successThreshold"],
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    timeoutSeconds: item["timeoutSeconds"],
  };
}

/** Denotes the type of probe. Can be Liveness or Startup, Readiness probe is not supported in sessions. Type must be unique for each probe within the context of a list of probes (SessionProbes). */
export enum KnownSessionProbeType {
  /** Checks whether the session is still running and healthy. */
  Liveness = "Liveness",
  /** Checks whether the session has started successfully. */
  Startup = "Startup",
}

/**
 * Denotes the type of probe. Can be Liveness or Startup, Readiness probe is not supported in sessions. Type must be unique for each probe within the context of a list of probes (SessionProbes). \
 * {@link KnownSessionProbeType} can be used interchangeably with SessionProbeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Liveness**: Checks whether the session is still running and healthy. \
 * **Startup**: Checks whether the session has started successfully.
 */
export type SessionProbeType = string;

/** HTTPGet specifies the http request to perform. */
export interface SessionProbeHttpGet {
  /** Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead. */
  host?: string;
  /** Custom headers to set in the request. HTTP allows repeated headers. */
  httpHeaders?: SessionProbeHttpGetHttpHeadersItem[];
  /** Path to access on the HTTP server. */
  path?: string;
  /** Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. */
  port: number;
  /** Scheme to use for connecting to the host. Defaults to HTTP. */
  scheme?: Scheme;
}

export function sessionProbeHttpGetSerializer(item: SessionProbeHttpGet): any {
  return {
    host: item["host"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : sessionProbeHttpGetHttpHeadersItemArraySerializer(item["httpHeaders"]),
    path: item["path"],
    port: item["port"],
    scheme: item["scheme"],
  };
}

export function sessionProbeHttpGetDeserializer(item: any): SessionProbeHttpGet {
  return {
    host: item["host"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : sessionProbeHttpGetHttpHeadersItemArrayDeserializer(item["httpHeaders"]),
    path: item["path"],
    port: item["port"],
    scheme: item["scheme"],
  };
}

export function sessionProbeHttpGetHttpHeadersItemArraySerializer(
  result: Array<SessionProbeHttpGetHttpHeadersItem>,
): any[] {
  return result.map((item) => {
    return sessionProbeHttpGetHttpHeadersItemSerializer(item);
  });
}

export function sessionProbeHttpGetHttpHeadersItemArrayDeserializer(
  result: Array<SessionProbeHttpGetHttpHeadersItem>,
): any[] {
  return result.map((item) => {
    return sessionProbeHttpGetHttpHeadersItemDeserializer(item);
  });
}

/** HTTPHeader describes a custom header to be used in HTTP probes */
export interface SessionProbeHttpGetHttpHeadersItem {
  /** The header field name */
  name: string;
  /** The header field value */
  value: string;
}

export function sessionProbeHttpGetHttpHeadersItemSerializer(
  item: SessionProbeHttpGetHttpHeadersItem,
): any {
  return { name: item["name"], value: item["value"] };
}

export function sessionProbeHttpGetHttpHeadersItemDeserializer(
  item: any,
): SessionProbeHttpGetHttpHeadersItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Scheme to use for connecting to the host. Defaults to HTTP. */
export enum KnownScheme {
  /** HTTP */
  Http = "HTTP",
  /** HTTPS */
  Https = "HTTPS",
}

/**
 * Scheme to use for connecting to the host. Defaults to HTTP. \
 * {@link KnownScheme} can be used interchangeably with Scheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HTTP**: HTTP \
 * **HTTPS**: HTTPS
 */
export type Scheme = string;

/** TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported. */
export interface SessionProbeTcpSocket {
  /** Optional: Host name to connect to, defaults to the pod IP. */
  host?: string;
  /** Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. */
  port: number;
}

export function sessionProbeTcpSocketSerializer(item: SessionProbeTcpSocket): any {
  return { host: item["host"], port: item["port"] };
}

export function sessionProbeTcpSocketDeserializer(item: any): SessionProbeTcpSocket {
  return {
    host: item["host"],
    port: item["port"],
  };
}

/** Session pool ingress configuration. */
export interface SessionIngress {
  /** Target port in containers for traffic from ingress */
  targetPort?: number;
}

export function sessionIngressSerializer(item: SessionIngress): any {
  return { targetPort: item["targetPort"] };
}

export function sessionIngressDeserializer(item: any): SessionIngress {
  return {
    targetPort: item["targetPort"],
  };
}

/** Session network configuration. */
export interface SessionNetworkConfiguration {
  /** Network status for the sessions. */
  status?: SessionNetworkStatus;
}

export function sessionNetworkConfigurationSerializer(item: SessionNetworkConfiguration): any {
  return { status: item["status"] };
}

export function sessionNetworkConfigurationDeserializer(item: any): SessionNetworkConfiguration {
  return {
    status: item["status"],
  };
}

/** Network status for the sessions. */
export enum KnownSessionNetworkStatus {
  /** EgressEnabled */
  EgressEnabled = "EgressEnabled",
  /** EgressDisabled */
  EgressDisabled = "EgressDisabled",
}

/**
 * Network status for the sessions. \
 * {@link KnownSessionNetworkStatus} can be used interchangeably with SessionNetworkStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EgressEnabled**: EgressEnabled \
 * **EgressDisabled**: EgressDisabled
 */
export type SessionNetworkStatus = string;

/** Provisioning state of the session pool. */
export enum KnownSessionPoolProvisioningState {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the session pool. \
 * {@link KnownSessionPoolProvisioningState} can be used interchangeably with SessionPoolProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting
 */
export type SessionPoolProvisioningState = string;

export function managedIdentitySettingArraySerializer(
  result: Array<ManagedIdentitySetting>,
): any[] {
  return result.map((item) => {
    return managedIdentitySettingSerializer(item);
  });
}

export function managedIdentitySettingArrayDeserializer(
  result: Array<ManagedIdentitySetting>,
): any[] {
  return result.map((item) => {
    return managedIdentitySettingDeserializer(item);
  });
}

/** Optional settings for a Managed Identity that is assigned to the Session pool. */
export interface ManagedIdentitySetting {
  /** The resource ID of a user-assigned managed identity that is assigned to the Session Pool, or 'system' for system-assigned identity. */
  identity: string;
  /** Use to select the lifecycle stages of a Session Pool during which the Managed Identity should be available. */
  lifecycle?: SessionPoolIdentityLifeCycle;
}

export function managedIdentitySettingSerializer(item: ManagedIdentitySetting): any {
  return { identity: item["identity"], lifecycle: item["lifecycle"] };
}

export function managedIdentitySettingDeserializer(item: any): ManagedIdentitySetting {
  return {
    identity: item["identity"],
    lifecycle: item["lifecycle"],
  };
}

/** Use to select the lifecycle stages of a Session Pool during which the Managed Identity should be available. */
export enum KnownSessionPoolIdentityLifeCycle {
  /** Do not use managed identity during any lifecycle stage. */
  None = "None",
  /** Use managed identity during the main stage of the Container App lifecycle. */
  Main = "Main",
}

/**
 * Use to select the lifecycle stages of a Session Pool during which the Managed Identity should be available. \
 * {@link KnownSessionPoolIdentityLifeCycle} can be used interchangeably with SessionPoolIdentityLifeCycle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Do not use managed identity during any lifecycle stage. \
 * **Main**: Use managed identity during the main stage of the Container App lifecycle.
 */
export type SessionPoolIdentityLifeCycle = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

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

/** Container App session pool updatable properties. */
export interface SessionPoolUpdatableProperties {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed identities needed by a session pool to interact with other Azure services to not maintain any secrets or credentials in code. */
  identity?: ManagedServiceIdentity;
  /** The scale configuration of the session pool. */
  scaleConfiguration?: ScaleConfiguration;
  /** The secrets of the session pool. */
  secrets?: SessionPoolSecret[];
  /** The pool configuration if the poolManagementType is dynamic. */
  dynamicPoolConfiguration?: DynamicPoolConfiguration;
  /** The custom container configuration if the containerType is CustomContainer. */
  customContainerTemplate?: CustomContainerTemplate;
  /** The network configuration of the sessions in the session pool. */
  sessionNetworkConfiguration?: SessionNetworkConfiguration;
}

export function sessionPoolUpdatablePropertiesSerializer(
  item: SessionPoolUpdatableProperties,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "scaleConfiguration",
      "secrets",
      "dynamicPoolConfiguration",
      "customContainerTemplate",
      "sessionNetworkConfiguration",
    ])
      ? undefined
      : _sessionPoolUpdatablePropertiesPropertiesSerializer(item),
  };
}

/** Session pool resource specific updatable properties. */
export interface SessionPoolUpdatablePropertiesProperties {
  /** The scale configuration of the session pool. */
  scaleConfiguration?: ScaleConfiguration;
  /** The secrets of the session pool. */
  secrets?: SessionPoolSecret[];
  /** The pool configuration if the poolManagementType is dynamic. */
  dynamicPoolConfiguration?: DynamicPoolConfiguration;
  /** The custom container configuration if the containerType is CustomContainer. */
  customContainerTemplate?: CustomContainerTemplate;
  /** The network configuration of the sessions in the session pool. */
  sessionNetworkConfiguration?: SessionNetworkConfiguration;
}

export function sessionPoolUpdatablePropertiesPropertiesSerializer(
  item: SessionPoolUpdatablePropertiesProperties,
): any {
  return {
    scaleConfiguration: !item["scaleConfiguration"]
      ? item["scaleConfiguration"]
      : scaleConfigurationSerializer(item["scaleConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : sessionPoolSecretArraySerializer(item["secrets"]),
    dynamicPoolConfiguration: !item["dynamicPoolConfiguration"]
      ? item["dynamicPoolConfiguration"]
      : dynamicPoolConfigurationSerializer(item["dynamicPoolConfiguration"]),
    customContainerTemplate: !item["customContainerTemplate"]
      ? item["customContainerTemplate"]
      : customContainerTemplateSerializer(item["customContainerTemplate"]),
    sessionNetworkConfiguration: !item["sessionNetworkConfiguration"]
      ? item["sessionNetworkConfiguration"]
      : sessionNetworkConfigurationSerializer(item["sessionNetworkConfiguration"]),
  };
}

/** Session pool collection Azure resource. */
export interface _SessionPoolCollection {
  /** The SessionPool items on this page */
  value: SessionPool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sessionPoolCollectionDeserializer(item: any): _SessionPoolCollection {
  return {
    value: sessionPoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sessionPoolArraySerializer(result: Array<SessionPool>): any[] {
  return result.map((item) => {
    return sessionPoolSerializer(item);
  });
}

export function sessionPoolArrayDeserializer(result: Array<SessionPool>): any[] {
  return result.map((item) => {
    return sessionPoolDeserializer(item);
  });
}

/** A SandboxGroup resource, representing a group of sandboxes that share configuration defaults and quotas. */
export interface SandboxGroup extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SandboxGroupProperties;
}

export function sandboxGroupSerializer(item: SandboxGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sandboxGroupPropertiesSerializer(item["properties"]),
  };
}

export function sandboxGroupDeserializer(item: any): SandboxGroup {
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
      : sandboxGroupPropertiesDeserializer(item["properties"]),
  };
}

/** SandboxGroup resource specific properties. */
export interface SandboxGroupProperties {
  /** The resource ID of the Azure Container Apps environment to link to the sandbox group. A sandbox group can be linked after creation, but the link cannot then be changed or removed. For subsequent create-or-update (PUT) requests, specify the same environment ID; omitting or changing it returns 409 Conflict. Omitting it from an update (PATCH) request leaves the existing link unchanged. */
  environmentId?: string;
  /** The default domain of the linked Azure Container Apps environment. Sandbox endpoints use subdomains of this domain. This read-only property is populated by the service and is omitted when no environment is linked. */
  readonly defaultDomain?: string;
  readonly provisioningState?: SandboxGroupProvisioningState;
}

export function sandboxGroupPropertiesSerializer(item: SandboxGroupProperties): any {
  return { environmentId: item["environmentId"] };
}

export function sandboxGroupPropertiesDeserializer(item: any): SandboxGroupProperties {
  return {
    environmentId: item["environmentId"],
    defaultDomain: item["defaultDomain"],
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the SandboxGroup. */
export enum KnownSandboxGroupProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned. */
  InProgress = "InProgress",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource is being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the SandboxGroup. \
 * {@link KnownSandboxGroupProvisioningState} can be used interchangeably with SandboxGroupProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **InProgress**: The resource is being provisioned. \
 * **Updating**: The resource is being updated. \
 * **Deleting**: The resource is being deleted.
 */
export type SandboxGroupProvisioningState = string;

/** A SandboxGroup resource for use in patch requests. */
export interface SandboxGroupPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** SandboxGroup properties that can be updated. */
  properties?: SandboxGroupPatchProperties;
}

export function sandboxGroupPatchSerializer(item: SandboxGroupPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : sandboxGroupPatchPropertiesSerializer(item["properties"]),
  };
}

/** SandboxGroup resource specific properties for patch requests. */
export interface SandboxGroupPatchProperties {
  /** The resource ID of the Azure Container Apps environment to link to the sandbox group. A sandbox group can be linked after creation, but the link cannot then be changed or removed. For subsequent create-or-update (PUT) requests, specify the same environment ID; omitting or changing it returns 409 Conflict. Omitting it from an update (PATCH) request leaves the existing link unchanged. */
  environmentId?: string;
}

export function sandboxGroupPatchPropertiesSerializer(item: SandboxGroupPatchProperties): any {
  return { environmentId: item["environmentId"] };
}

/** The response of a SandboxGroup list operation. */
export interface _SandboxGroupListResult {
  /** The SandboxGroup items on this page */
  value: SandboxGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sandboxGroupListResultDeserializer(item: any): _SandboxGroupListResult {
  return {
    value: sandboxGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sandboxGroupArraySerializer(result: Array<SandboxGroup>): any[] {
  return result.map((item) => {
    return sandboxGroupSerializer(item);
  });
}

export function sandboxGroupArrayDeserializer(result: Array<SandboxGroup>): any[] {
  return result.map((item) => {
    return sandboxGroupDeserializer(item);
  });
}

/** A virtual network connection associated with a SandboxGroup. */
export interface VnetConnection extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: VnetConnectionProperties;
}

export function vnetConnectionSerializer(item: VnetConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : vnetConnectionPropertiesSerializer(item["properties"]),
  };
}

export function vnetConnectionDeserializer(item: any): VnetConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : vnetConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** VnetConnection resource specific properties. */
export interface VnetConnectionProperties {
  readonly provisioningState?: VnetConnectionProvisioningState;
  /** Resource ID of the subnet that sandboxes in the parent SandboxGroup will be connected to. */
  subnetId?: string;
}

export function vnetConnectionPropertiesSerializer(item: VnetConnectionProperties): any {
  return { subnetId: item["subnetId"] };
}

export function vnetConnectionPropertiesDeserializer(item: any): VnetConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    subnetId: item["subnetId"],
  };
}

/** Provisioning state of the VnetConnection. */
export enum KnownVnetConnectionProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned. */
  InProgress = "InProgress",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource is being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the VnetConnection. \
 * {@link KnownVnetConnectionProvisioningState} can be used interchangeably with VnetConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **InProgress**: The resource is being provisioned. \
 * **Updating**: The resource is being updated. \
 * **Deleting**: The resource is being deleted.
 */
export type VnetConnectionProvisioningState = string;

/** The response of a VnetConnection list operation. */
export interface _VnetConnectionListResult {
  /** The VnetConnection items on this page */
  value: VnetConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vnetConnectionListResultDeserializer(item: any): _VnetConnectionListResult {
  return {
    value: vnetConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vnetConnectionArraySerializer(result: Array<VnetConnection>): any[] {
  return result.map((item) => {
    return vnetConnectionSerializer(item);
  });
}

export function vnetConnectionArrayDeserializer(result: Array<VnetConnection>): any[] {
  return result.map((item) => {
    return vnetConnectionDeserializer(item);
  });
}

/** Container App SourceControl. */
export interface SourceControl extends ProxyResource {
  /** Current provisioning State of the operation */
  readonly operationState?: SourceControlOperationState;
  /** The repo url which will be integrated to ContainerApp. */
  repoUrl?: string;
  /** The branch which will trigger the auto deployment */
  branch?: string;
  /**
   * Container App Revision Template with all possible settings and the
   * defaults if user did not provide them. The defaults are populated
   * as they were at the creation time
   */
  githubActionConfiguration?: GithubActionConfiguration;
}

export function sourceControlSerializer(item: SourceControl): any {
  return {
    properties: areAllPropsUndefined(item, ["repoUrl", "branch", "githubActionConfiguration"])
      ? undefined
      : _sourceControlPropertiesSerializer(item),
  };
}

export function sourceControlDeserializer(item: any): SourceControl {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sourceControlPropertiesDeserializer(item["properties"])),
  };
}

/** SourceControl resource specific properties */
export interface SourceControlProperties {
  /** Current provisioning State of the operation */
  readonly operationState?: SourceControlOperationState;
  /** The repo url which will be integrated to ContainerApp. */
  repoUrl?: string;
  /** The branch which will trigger the auto deployment */
  branch?: string;
  /**
   * Container App Revision Template with all possible settings and the
   * defaults if user did not provide them. The defaults are populated
   * as they were at the creation time
   */
  githubActionConfiguration?: GithubActionConfiguration;
}

export function sourceControlPropertiesSerializer(item: SourceControlProperties): any {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    githubActionConfiguration: !item["githubActionConfiguration"]
      ? item["githubActionConfiguration"]
      : githubActionConfigurationSerializer(item["githubActionConfiguration"]),
  };
}

export function sourceControlPropertiesDeserializer(item: any): SourceControlProperties {
  return {
    operationState: item["operationState"],
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    githubActionConfiguration: !item["githubActionConfiguration"]
      ? item["githubActionConfiguration"]
      : githubActionConfigurationDeserializer(item["githubActionConfiguration"]),
  };
}

/** Current provisioning State of the operation */
export enum KnownSourceControlOperationState {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Current provisioning State of the operation \
 * {@link KnownSourceControlOperationState} can be used interchangeably with SourceControlOperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type SourceControlOperationState = string;

/** Configuration properties that define the mutable settings of a Container App SourceControl */
export interface GithubActionConfiguration {
  /** Registry configurations. */
  registryInfo?: RegistryInfo;
  /** AzureCredentials configurations. */
  azureCredentials?: AzureCredentials;
  /** Context path */
  contextPath?: string;
  /** One time Github PAT to configure github environment */
  githubPersonalAccessToken?: string;
  /** Image name */
  image?: string;
  /** Code or Image */
  publishType?: string;
  /** Operation system */
  os?: string;
  /** Runtime stack */
  runtimeStack?: string;
  /** Runtime version */
  runtimeVersion?: string;
}

export function githubActionConfigurationSerializer(item: GithubActionConfiguration): any {
  return {
    registryInfo: !item["registryInfo"]
      ? item["registryInfo"]
      : registryInfoSerializer(item["registryInfo"]),
    azureCredentials: !item["azureCredentials"]
      ? item["azureCredentials"]
      : azureCredentialsSerializer(item["azureCredentials"]),
    contextPath: item["contextPath"],
    githubPersonalAccessToken: item["githubPersonalAccessToken"],
    image: item["image"],
    publishType: item["publishType"],
    os: item["os"],
    runtimeStack: item["runtimeStack"],
    runtimeVersion: item["runtimeVersion"],
  };
}

export function githubActionConfigurationDeserializer(item: any): GithubActionConfiguration {
  return {
    registryInfo: !item["registryInfo"]
      ? item["registryInfo"]
      : registryInfoDeserializer(item["registryInfo"]),
    azureCredentials: !item["azureCredentials"]
      ? item["azureCredentials"]
      : azureCredentialsDeserializer(item["azureCredentials"]),
    contextPath: item["contextPath"],
    githubPersonalAccessToken: item["githubPersonalAccessToken"],
    image: item["image"],
    publishType: item["publishType"],
    os: item["os"],
    runtimeStack: item["runtimeStack"],
    runtimeVersion: item["runtimeVersion"],
  };
}

/** Container App registry information. */
export interface RegistryInfo {
  /** registry server Url. */
  registryUrl?: string;
  /** registry username. */
  registryUserName?: string;
  /** registry secret. */
  registryPassword?: string;
}

export function registryInfoSerializer(item: RegistryInfo): any {
  return {
    registryUrl: item["registryUrl"],
    registryUserName: item["registryUserName"],
    registryPassword: item["registryPassword"],
  };
}

export function registryInfoDeserializer(item: any): RegistryInfo {
  return {
    registryUrl: item["registryUrl"],
    registryUserName: item["registryUserName"],
    registryPassword: item["registryPassword"],
  };
}

/** Container App credentials. */
export interface AzureCredentials {
  /** Client Id. */
  clientId?: string;
  /** Client Secret. */
  clientSecret?: string;
  /** Tenant Id. */
  tenantId?: string;
  /** Kind of auth github does for deploying the template */
  kind?: string;
  /** Subscription Id. */
  subscriptionId?: string;
}

export function azureCredentialsSerializer(item: AzureCredentials): any {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    tenantId: item["tenantId"],
    kind: item["kind"],
    subscriptionId: item["subscriptionId"],
  };
}

export function azureCredentialsDeserializer(item: any): AzureCredentials {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    tenantId: item["tenantId"],
    kind: item["kind"],
    subscriptionId: item["subscriptionId"],
  };
}

/** SourceControl collection ARM resource. */
export interface _SourceControlCollection {
  /** The SourceControl items on this page */
  value: SourceControl[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sourceControlCollectionDeserializer(item: any): _SourceControlCollection {
  return {
    value: sourceControlArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sourceControlArraySerializer(result: Array<SourceControl>): any[] {
  return result.map((item) => {
    return sourceControlSerializer(item);
  });
}

export function sourceControlArrayDeserializer(result: Array<SourceControl>): any[] {
  return result.map((item) => {
    return sourceControlDeserializer(item);
  });
}

/** Container App. */
export interface ContainerApp extends TrackedResource {
  /** The complex type of the extended location. */
  extendedLocation?: ExtendedLocation;
  /** managed identities for the Container App to interact with other Azure services without maintaining any secrets or credentials in code. */
  identity?: ManagedServiceIdentity;
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata to represent the container app kind, representing if a container app is workflowapp or functionapp. */
  kind?: Kind;
  /** Provisioning state of the Container App. */
  readonly provisioningState?: ContainerAppProvisioningState;
  /** Running status of the Container App. */
  readonly runningStatus?: ContainerAppRunningStatus;
  /** Deprecated. Resource ID of the Container App's environment. */
  managedEnvironmentId?: string;
  /** Resource ID of environment. */
  environmentId?: string;
  /** Networking configuration for the Container App. */
  networking?: ContainerAppNetworkingConfiguration;
  /** Workload profile name to pin for container app execution. */
  workloadProfileName?: string;
  /** Name of the latest revision of the Container App. */
  readonly latestRevisionName?: string;
  /** Name of the latest ready revision of the Container App. */
  readonly latestReadyRevisionName?: string;
  /** Fully Qualified Domain Name of the latest revision of the Container App. */
  readonly latestRevisionFqdn?: string;
  /** Id used to verify domain name ownership */
  readonly customDomainVerificationId?: string;
  /** Non versioned Container App configuration properties. */
  configuration?: Configuration;
  /** Container App versioned application definition. */
  template?: Template;
  /** Outbound IP Addresses for container app. */
  readonly outboundIpAddresses?: string[];
  /** The endpoint of the eventstream of the container app. */
  readonly eventStreamEndpoint?: string;
}

export function containerAppSerializer(item: ContainerApp): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "managedEnvironmentId",
      "environmentId",
      "networking",
      "workloadProfileName",
      "configuration",
      "template",
    ])
      ? undefined
      : _containerAppPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
  };
}

export function containerAppDeserializer(item: any): ContainerApp {
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
    ...(!item["properties"]
      ? item["properties"]
      : _containerAppPropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
  };
}

/** ContainerApp resource specific properties */
export interface ContainerAppProperties {
  /** Provisioning state of the Container App. */
  readonly provisioningState?: ContainerAppProvisioningState;
  /** Running status of the Container App. */
  readonly runningStatus?: ContainerAppRunningStatus;
  /** Deprecated. Resource ID of the Container App's environment. */
  managedEnvironmentId?: string;
  /** Resource ID of environment. */
  environmentId?: string;
  /** Networking configuration for the Container App. */
  networking?: ContainerAppNetworkingConfiguration;
  /** Workload profile name to pin for container app execution. */
  workloadProfileName?: string;
  /** Name of the latest revision of the Container App. */
  readonly latestRevisionName?: string;
  /** Name of the latest ready revision of the Container App. */
  readonly latestReadyRevisionName?: string;
  /** Fully Qualified Domain Name of the latest revision of the Container App. */
  readonly latestRevisionFqdn?: string;
  /** Id used to verify domain name ownership */
  readonly customDomainVerificationId?: string;
  /** Non versioned Container App configuration properties. */
  configuration?: Configuration;
  /** Container App versioned application definition. */
  template?: Template;
  /** Outbound IP Addresses for container app. */
  readonly outboundIpAddresses?: string[];
  /** The endpoint of the eventstream of the container app. */
  readonly eventStreamEndpoint?: string;
}

export function containerAppPropertiesSerializer(item: ContainerAppProperties): any {
  return {
    managedEnvironmentId: item["managedEnvironmentId"],
    environmentId: item["environmentId"],
    networking: !item["networking"]
      ? item["networking"]
      : containerAppNetworkingConfigurationSerializer(item["networking"]),
    workloadProfileName: item["workloadProfileName"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : configurationSerializer(item["configuration"]),
    template: !item["template"] ? item["template"] : templateSerializer(item["template"]),
  };
}

export function containerAppPropertiesDeserializer(item: any): ContainerAppProperties {
  return {
    provisioningState: item["provisioningState"],
    runningStatus: item["runningStatus"],
    managedEnvironmentId: item["managedEnvironmentId"],
    environmentId: item["environmentId"],
    networking: !item["networking"]
      ? item["networking"]
      : containerAppNetworkingConfigurationDeserializer(item["networking"]),
    workloadProfileName: item["workloadProfileName"],
    latestRevisionName: item["latestRevisionName"],
    latestReadyRevisionName: item["latestReadyRevisionName"],
    latestRevisionFqdn: item["latestRevisionFqdn"],
    customDomainVerificationId: item["customDomainVerificationId"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : configurationDeserializer(item["configuration"]),
    template: !item["template"] ? item["template"] : templateDeserializer(item["template"]),
    outboundIpAddresses: !item["outboundIpAddresses"]
      ? item["outboundIpAddresses"]
      : item["outboundIpAddresses"].map((p: any) => {
          return p;
        }),
    eventStreamEndpoint: item["eventStreamEndpoint"],
  };
}

/** Provisioning state of the Container App. */
export enum KnownContainerAppProvisioningState {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the Container App. \
 * {@link KnownContainerAppProvisioningState} can be used interchangeably with ContainerAppProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting
 */
export type ContainerAppProvisioningState = string;

/** Running status of the Container App. */
export enum KnownContainerAppRunningStatus {
  /** Container App is transitioning between Stopped and Running states. */
  Progressing = "Progressing",
  /** Container App is in Running state. */
  Running = "Running",
  /** Container App is in Stopped state. */
  Stopped = "Stopped",
  /** Container App Job is in Suspended state. */
  Suspended = "Suspended",
  /** Container App Job is in Ready state. */
  Ready = "Ready",
}

/**
 * Running status of the Container App. \
 * {@link KnownContainerAppRunningStatus} can be used interchangeably with ContainerAppRunningStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Progressing**: Container App is transitioning between Stopped and Running states. \
 * **Running**: Container App is in Running state. \
 * **Stopped**: Container App is in Stopped state. \
 * **Suspended**: Container App Job is in Suspended state. \
 * **Ready**: Container App Job is in Ready state.
 */
export type ContainerAppRunningStatus = string;

/** Networking configuration for a Container App. Only supported for Container Apps deployed into an Express managed environment. */
export interface ContainerAppNetworkingConfiguration {
  /** Resource ID of a subnet used for outbound (egress) traffic from this Container App. Only supported for Container Apps in an Express managed environment. Mutually exclusive with the environment-level VNet configuration and immutable after the Container App is created. */
  outboundVnetSubnetId?: string;
}

export function containerAppNetworkingConfigurationSerializer(
  item: ContainerAppNetworkingConfiguration,
): any {
  return { outboundVnetSubnetId: item["outboundVnetSubnetId"] };
}

export function containerAppNetworkingConfigurationDeserializer(
  item: any,
): ContainerAppNetworkingConfiguration {
  return {
    outboundVnetSubnetId: item["outboundVnetSubnetId"],
  };
}

/** Non versioned Container App configuration properties that define the mutable settings of a Container app */
export interface Configuration {
  /** Collection of secrets used by a Container app */
  secrets?: Secret[];
  /** Controls how active revisions are handled for the Container app. */
  activeRevisionsMode?: ActiveRevisionsMode;
  /** Ingress configurations. */
  ingress?: Ingress;
  /** Collection of private container registry credentials for containers used by the Container app */
  registries?: RegistryCredentials[];
  /** Dapr configuration for the Container App. */
  dapr?: Dapr;
  /** App runtime configuration for the Container App. */
  runtime?: Runtime;
  /** Optional. Max inactive revisions a Container App can have. */
  maxInactiveRevisions?: number;
  /** Container App to be a dev Container App Service */
  service?: Service;
  /** Optional settings for Managed Identities that are assigned to the Container App. If a Managed Identity is not specified here, default settings will be used. */
  identitySettings?: IdentitySettings[];
}

export function configurationSerializer(item: Configuration): any {
  return {
    secrets: !item["secrets"] ? item["secrets"] : secretArraySerializer(item["secrets"]),
    activeRevisionsMode: item["activeRevisionsMode"],
    ingress: !item["ingress"] ? item["ingress"] : ingressSerializer(item["ingress"]),
    registries: !item["registries"]
      ? item["registries"]
      : registryCredentialsArraySerializer(item["registries"]),
    dapr: !item["dapr"] ? item["dapr"] : daprSerializer(item["dapr"]),
    runtime: !item["runtime"] ? item["runtime"] : runtimeSerializer(item["runtime"]),
    maxInactiveRevisions: item["maxInactiveRevisions"],
    service: !item["service"] ? item["service"] : serviceSerializer(item["service"]),
    identitySettings: !item["identitySettings"]
      ? item["identitySettings"]
      : identitySettingsArraySerializer(item["identitySettings"]),
  };
}

export function configurationDeserializer(item: any): Configuration {
  return {
    secrets: !item["secrets"] ? item["secrets"] : secretArrayDeserializer(item["secrets"]),
    activeRevisionsMode: item["activeRevisionsMode"],
    ingress: !item["ingress"] ? item["ingress"] : ingressDeserializer(item["ingress"]),
    registries: !item["registries"]
      ? item["registries"]
      : registryCredentialsArrayDeserializer(item["registries"]),
    dapr: !item["dapr"] ? item["dapr"] : daprDeserializer(item["dapr"]),
    runtime: !item["runtime"] ? item["runtime"] : runtimeDeserializer(item["runtime"]),
    maxInactiveRevisions: item["maxInactiveRevisions"],
    service: !item["service"] ? item["service"] : serviceDeserializer(item["service"]),
    identitySettings: !item["identitySettings"]
      ? item["identitySettings"]
      : identitySettingsArrayDeserializer(item["identitySettings"]),
  };
}

export function secretArraySerializer(result: Array<Secret>): any[] {
  return result.map((item) => {
    return secretSerializer(item);
  });
}

export function secretArrayDeserializer(result: Array<Secret>): any[] {
  return result.map((item) => {
    return secretDeserializer(item);
  });
}

/** Secret definition. */
export interface Secret {
  /** Secret Name. */
  name?: string;
  /** Secret Value. */
  value?: string;
  /** Resource ID of a managed identity to authenticate with Azure Key Vault, or System to use a system-assigned identity. */
  identity?: string;
  /** Azure Key Vault URL pointing to the secret referenced by the container app. */
  keyVaultUrl?: string;
}

export function secretSerializer(item: Secret): any {
  return {
    name: item["name"],
    value: item["value"],
    identity: item["identity"],
    keyVaultUrl: item["keyVaultUrl"],
  };
}

export function secretDeserializer(item: any): Secret {
  return {
    name: item["name"],
    value: item["value"],
    identity: item["identity"],
    keyVaultUrl: item["keyVaultUrl"],
  };
}

/** Controls how active revisions are handled for the Container app. */
export enum KnownActiveRevisionsMode {
  /** Multiple */
  Multiple = "Multiple",
  /** Single */
  Single = "Single",
}

/**
 * Controls how active revisions are handled for the Container app. \
 * {@link KnownActiveRevisionsMode} can be used interchangeably with ActiveRevisionsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Multiple**: Multiple \
 * **Single**: Single
 */
export type ActiveRevisionsMode = string;

/** Container App Ingress configuration. */
export interface Ingress {
  /** Hostname. */
  readonly fqdn?: string;
  /** Bool indicating if app exposes an external http endpoint */
  external?: boolean;
  /** Target Port in containers for traffic from ingress */
  targetPort?: number;
  /** Exposed Port in containers for TCP traffic from ingress */
  exposedPort?: number;
  /** Ingress transport protocol */
  transport?: IngressTransportMethod;
  /** Traffic weights for app's revisions */
  traffic?: TrafficWeight[];
  /** custom domain bindings for Container Apps' hostnames. */
  customDomains?: CustomDomain[];
  /** Bool indicating if HTTP connections to is allowed. If set to false HTTP connections are automatically redirected to HTTPS connections */
  allowInsecure?: boolean;
  /** Rules to restrict incoming IP address. */
  ipSecurityRestrictions?: IpSecurityRestrictionRule[];
  /** Sticky Sessions for Single Revision Mode */
  stickySessions?: IngressStickySessions;
  /** Client certificate mode for mTLS authentication. Ignore indicates server drops client certificate on forwarding. Accept indicates server forwards client certificate but does not require a client certificate. Require indicates server requires a client certificate. */
  clientCertificateMode?: IngressClientCertificateMode;
  /** CORS policy for container app */
  corsPolicy?: CorsPolicy;
  /** Settings to expose additional ports on container app */
  additionalPortMappings?: IngressPortMapping[];
}

export function ingressSerializer(item: Ingress): any {
  return {
    external: item["external"],
    targetPort: item["targetPort"],
    exposedPort: item["exposedPort"],
    transport: item["transport"],
    traffic: !item["traffic"] ? item["traffic"] : trafficWeightArraySerializer(item["traffic"]),
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainArraySerializer(item["customDomains"]),
    allowInsecure: item["allowInsecure"],
    ipSecurityRestrictions: !item["ipSecurityRestrictions"]
      ? item["ipSecurityRestrictions"]
      : ipSecurityRestrictionRuleArraySerializer(item["ipSecurityRestrictions"]),
    stickySessions: !item["stickySessions"]
      ? item["stickySessions"]
      : ingressStickySessionsSerializer(item["stickySessions"]),
    clientCertificateMode: item["clientCertificateMode"],
    corsPolicy: !item["corsPolicy"] ? item["corsPolicy"] : corsPolicySerializer(item["corsPolicy"]),
    additionalPortMappings: !item["additionalPortMappings"]
      ? item["additionalPortMappings"]
      : ingressPortMappingArraySerializer(item["additionalPortMappings"]),
  };
}

export function ingressDeserializer(item: any): Ingress {
  return {
    fqdn: item["fqdn"],
    external: item["external"],
    targetPort: item["targetPort"],
    exposedPort: item["exposedPort"],
    transport: item["transport"],
    traffic: !item["traffic"] ? item["traffic"] : trafficWeightArrayDeserializer(item["traffic"]),
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainArrayDeserializer(item["customDomains"]),
    allowInsecure: item["allowInsecure"],
    ipSecurityRestrictions: !item["ipSecurityRestrictions"]
      ? item["ipSecurityRestrictions"]
      : ipSecurityRestrictionRuleArrayDeserializer(item["ipSecurityRestrictions"]),
    stickySessions: !item["stickySessions"]
      ? item["stickySessions"]
      : ingressStickySessionsDeserializer(item["stickySessions"]),
    clientCertificateMode: item["clientCertificateMode"],
    corsPolicy: !item["corsPolicy"]
      ? item["corsPolicy"]
      : corsPolicyDeserializer(item["corsPolicy"]),
    additionalPortMappings: !item["additionalPortMappings"]
      ? item["additionalPortMappings"]
      : ingressPortMappingArrayDeserializer(item["additionalPortMappings"]),
  };
}

/** Ingress transport protocol */
export enum KnownIngressTransportMethod {
  /** auto */
  Auto = "auto",
  /** http */
  Http = "http",
  /** http2 */
  Http2 = "http2",
  /** tcp */
  Tcp = "tcp",
}

/**
 * Ingress transport protocol \
 * {@link KnownIngressTransportMethod} can be used interchangeably with IngressTransportMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **auto**: auto \
 * **http**: http \
 * **http2**: http2 \
 * **tcp**: tcp
 */
export type IngressTransportMethod = string;

export function trafficWeightArraySerializer(result: Array<TrafficWeight>): any[] {
  return result.map((item) => {
    return trafficWeightSerializer(item);
  });
}

export function trafficWeightArrayDeserializer(result: Array<TrafficWeight>): any[] {
  return result.map((item) => {
    return trafficWeightDeserializer(item);
  });
}

/** Traffic weight assigned to a revision */
export interface TrafficWeight {
  /** Name of a revision */
  revisionName?: string;
  /** Traffic weight assigned to a revision */
  weight?: number;
  /** Indicates that the traffic weight belongs to a latest stable revision */
  latestRevision?: boolean;
  /** Associates a traffic label with a revision */
  label?: string;
}

export function trafficWeightSerializer(item: TrafficWeight): any {
  return {
    revisionName: item["revisionName"],
    weight: item["weight"],
    latestRevision: item["latestRevision"],
    label: item["label"],
  };
}

export function trafficWeightDeserializer(item: any): TrafficWeight {
  return {
    revisionName: item["revisionName"],
    weight: item["weight"],
    latestRevision: item["latestRevision"],
    label: item["label"],
  };
}

export function customDomainArraySerializer(result: Array<CustomDomain>): any[] {
  return result.map((item) => {
    return customDomainSerializer(item);
  });
}

export function customDomainArrayDeserializer(result: Array<CustomDomain>): any[] {
  return result.map((item) => {
    return customDomainDeserializer(item);
  });
}

/** Custom Domain of a Container App */
export interface CustomDomain {
  /** Hostname. */
  name: string;
  /** Custom Domain binding type. */
  bindingType?: BindingType;
  /** Resource Id of the Certificate to be bound to this hostname. Must exist in the Managed Environment. */
  certificateId?: string;
}

export function customDomainSerializer(item: CustomDomain): any {
  return {
    name: item["name"],
    bindingType: item["bindingType"],
    certificateId: item["certificateId"],
  };
}

export function customDomainDeserializer(item: any): CustomDomain {
  return {
    name: item["name"],
    bindingType: item["bindingType"],
    certificateId: item["certificateId"],
  };
}

/** Custom Domain binding type. */
export enum KnownBindingType {
  /** Disabled */
  Disabled = "Disabled",
  /** SniEnabled */
  SniEnabled = "SniEnabled",
  /** Auto */
  Auto = "Auto",
}

/**
 * Custom Domain binding type. \
 * {@link KnownBindingType} can be used interchangeably with BindingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **SniEnabled**: SniEnabled \
 * **Auto**: Auto
 */
export type BindingType = string;

export function ipSecurityRestrictionRuleArraySerializer(
  result: Array<IpSecurityRestrictionRule>,
): any[] {
  return result.map((item) => {
    return ipSecurityRestrictionRuleSerializer(item);
  });
}

export function ipSecurityRestrictionRuleArrayDeserializer(
  result: Array<IpSecurityRestrictionRule>,
): any[] {
  return result.map((item) => {
    return ipSecurityRestrictionRuleDeserializer(item);
  });
}

/** Rule to restrict incoming IP address. */
export interface IpSecurityRestrictionRule {
  /** Name for the IP restriction rule. */
  name: string;
  /** Describe the IP restriction rule that is being sent to the container-app. This is an optional field. */
  description?: string;
  /** CIDR notation to match incoming IP address */
  ipAddressRange: string;
  /** Allow or Deny rules to determine for incoming IP. Note: Rules can only consist of ALL Allow or ALL Deny */
  action: Action;
}

export function ipSecurityRestrictionRuleSerializer(item: IpSecurityRestrictionRule): any {
  return {
    name: item["name"],
    description: item["description"],
    ipAddressRange: item["ipAddressRange"],
    action: item["action"],
  };
}

export function ipSecurityRestrictionRuleDeserializer(item: any): IpSecurityRestrictionRule {
  return {
    name: item["name"],
    description: item["description"],
    ipAddressRange: item["ipAddressRange"],
    action: item["action"],
  };
}

/** Allow or Deny rules to determine for incoming IP. Note: Rules can only consist of ALL Allow or ALL Deny */
export enum KnownAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Allow or Deny rules to determine for incoming IP. Note: Rules can only consist of ALL Allow or ALL Deny \
 * {@link KnownAction} can be used interchangeably with Action,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow \
 * **Deny**: Deny
 */
export type Action = string;

/** Sticky Sessions for Single Revision Mode */
export interface IngressStickySessions {
  /** Sticky Session Affinity */
  affinity?: Affinity;
}

export function ingressStickySessionsSerializer(item: IngressStickySessions): any {
  return { affinity: item["affinity"] };
}

export function ingressStickySessionsDeserializer(item: any): IngressStickySessions {
  return {
    affinity: item["affinity"],
  };
}

/** Sticky Session Affinity */
export enum KnownAffinity {
  /** sticky */
  Sticky = "sticky",
  /** none */
  None = "none",
}

/**
 * Sticky Session Affinity \
 * {@link KnownAffinity} can be used interchangeably with Affinity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **sticky**: sticky \
 * **none**: none
 */
export type Affinity = string;

/** Client certificate mode for mTLS authentication. Ignore indicates server drops client certificate on forwarding. Accept indicates server forwards client certificate but does not require a client certificate. Require indicates server requires a client certificate. */
export enum KnownIngressClientCertificateMode {
  /** ignore */
  Ignore = "ignore",
  /** accept */
  Accept = "accept",
  /** require */
  Require = "require",
}

/**
 * Client certificate mode for mTLS authentication. Ignore indicates server drops client certificate on forwarding. Accept indicates server forwards client certificate but does not require a client certificate. Require indicates server requires a client certificate. \
 * {@link KnownIngressClientCertificateMode} can be used interchangeably with IngressClientCertificateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ignore**: ignore \
 * **accept**: accept \
 * **require**: require
 */
export type IngressClientCertificateMode = string;

/** Cross-Origin-Resource-Sharing policy */
export interface CorsPolicy {
  /** Specifies the content for the access-control-allow-origins header */
  allowedOrigins: string[];
  /** Specifies the content for the access-control-allow-methods header */
  allowedMethods?: string[];
  /** Specifies the content for the access-control-allow-headers header */
  allowedHeaders?: string[];
  /** Specifies the content for the access-control-expose-headers header */
  exposeHeaders?: string[];
  /** Specifies the content for the access-control-max-age header */
  maxAge?: number;
  /** Specifies whether the resource allows credentials */
  allowCredentials?: boolean;
}

export function corsPolicySerializer(item: CorsPolicy): any {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
    allowedMethods: !item["allowedMethods"]
      ? item["allowedMethods"]
      : item["allowedMethods"].map((p: any) => {
          return p;
        }),
    allowedHeaders: !item["allowedHeaders"]
      ? item["allowedHeaders"]
      : item["allowedHeaders"].map((p: any) => {
          return p;
        }),
    exposeHeaders: !item["exposeHeaders"]
      ? item["exposeHeaders"]
      : item["exposeHeaders"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

export function corsPolicyDeserializer(item: any): CorsPolicy {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
    allowedMethods: !item["allowedMethods"]
      ? item["allowedMethods"]
      : item["allowedMethods"].map((p: any) => {
          return p;
        }),
    allowedHeaders: !item["allowedHeaders"]
      ? item["allowedHeaders"]
      : item["allowedHeaders"].map((p: any) => {
          return p;
        }),
    exposeHeaders: !item["exposeHeaders"]
      ? item["exposeHeaders"]
      : item["exposeHeaders"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

export function ingressPortMappingArraySerializer(result: Array<IngressPortMapping>): any[] {
  return result.map((item) => {
    return ingressPortMappingSerializer(item);
  });
}

export function ingressPortMappingArrayDeserializer(result: Array<IngressPortMapping>): any[] {
  return result.map((item) => {
    return ingressPortMappingDeserializer(item);
  });
}

/** Port mappings of container app ingress */
export interface IngressPortMapping {
  /** Specifies whether the app port is accessible outside of the environment */
  external: boolean;
  /** Specifies the port user's container listens on */
  targetPort: number;
  /** Specifies the exposed port for the target port. If not specified, it defaults to target port */
  exposedPort?: number;
}

export function ingressPortMappingSerializer(item: IngressPortMapping): any {
  return {
    external: item["external"],
    targetPort: item["targetPort"],
    exposedPort: item["exposedPort"],
  };
}

export function ingressPortMappingDeserializer(item: any): IngressPortMapping {
  return {
    external: item["external"],
    targetPort: item["targetPort"],
    exposedPort: item["exposedPort"],
  };
}

export function registryCredentialsArraySerializer(result: Array<RegistryCredentials>): any[] {
  return result.map((item) => {
    return registryCredentialsSerializer(item);
  });
}

export function registryCredentialsArrayDeserializer(result: Array<RegistryCredentials>): any[] {
  return result.map((item) => {
    return registryCredentialsDeserializer(item);
  });
}

/** Container App Private Registry */
export interface RegistryCredentials {
  /** Container Registry Server */
  server?: string;
  /** Container Registry Username */
  username?: string;
  /** The name of the Secret that contains the registry login password */
  passwordSecretRef?: string;
  /** A Managed Identity to use to authenticate with Azure Container Registry. For user-assigned identities, use the full user-assigned identity Resource ID. For system-assigned identities, use 'system' */
  identity?: string;
}

export function registryCredentialsSerializer(item: RegistryCredentials): any {
  return {
    server: item["server"],
    username: item["username"],
    passwordSecretRef: item["passwordSecretRef"],
    identity: item["identity"],
  };
}

export function registryCredentialsDeserializer(item: any): RegistryCredentials {
  return {
    server: item["server"],
    username: item["username"],
    passwordSecretRef: item["passwordSecretRef"],
    identity: item["identity"],
  };
}

/** Container App Dapr configuration. */
export interface Dapr {
  /** Boolean indicating if the Dapr side car is enabled */
  enabled?: boolean;
  /** Dapr application identifier */
  appId?: string;
  /** Tells Dapr which protocol your application is using. Valid options are http and grpc. Default is http */
  appProtocol?: AppProtocol;
  /** Tells Dapr which port your application is listening on */
  appPort?: number;
  /** Dapr max size of http header read buffer in KB to handle when sending multi-KB headers. Default is 65KB. */
  httpReadBufferSize?: number;
  /** Increasing max size of request body http and grpc servers parameter in MB to handle uploading of big files. Default is 4 MB. */
  httpMaxRequestSize?: number;
  /** Sets the log level for the Dapr sidecar. Allowed values are debug, info, warn, error. Default is info. */
  logLevel?: LogLevel;
  /** Enables API logging for the Dapr sidecar */
  enableApiLogging?: boolean;
  /** Dapr application health check configuration */
  appHealth?: DaprAppHealth;
  /** Maximum number of concurrent requests, events handled by the Dapr sidecar */
  maxConcurrency?: number;
}

export function daprSerializer(item: Dapr): any {
  return {
    enabled: item["enabled"],
    appId: item["appId"],
    appProtocol: item["appProtocol"],
    appPort: item["appPort"],
    httpReadBufferSize: item["httpReadBufferSize"],
    httpMaxRequestSize: item["httpMaxRequestSize"],
    logLevel: item["logLevel"],
    enableApiLogging: item["enableApiLogging"],
    appHealth: !item["appHealth"] ? item["appHealth"] : daprAppHealthSerializer(item["appHealth"]),
    maxConcurrency: item["maxConcurrency"],
  };
}

export function daprDeserializer(item: any): Dapr {
  return {
    enabled: item["enabled"],
    appId: item["appId"],
    appProtocol: item["appProtocol"],
    appPort: item["appPort"],
    httpReadBufferSize: item["httpReadBufferSize"],
    httpMaxRequestSize: item["httpMaxRequestSize"],
    logLevel: item["logLevel"],
    enableApiLogging: item["enableApiLogging"],
    appHealth: !item["appHealth"]
      ? item["appHealth"]
      : daprAppHealthDeserializer(item["appHealth"]),
    maxConcurrency: item["maxConcurrency"],
  };
}

/** Tells Dapr which protocol your application is using. Valid options are http and grpc. Default is http */
export enum KnownAppProtocol {
  /** http */
  Http = "http",
  /** grpc */
  Grpc = "grpc",
}

/**
 * Tells Dapr which protocol your application is using. Valid options are http and grpc. Default is http \
 * {@link KnownAppProtocol} can be used interchangeably with AppProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **http**: http \
 * **grpc**: grpc
 */
export type AppProtocol = string;

/** Sets the log level for the Dapr sidecar. Allowed values are debug, info, warn, error. Default is info. */
export enum KnownLogLevel {
  /** info */
  Info = "info",
  /** debug */
  Debug = "debug",
  /** warn */
  Warn = "warn",
  /** error */
  Error = "error",
}

/**
 * Sets the log level for the Dapr sidecar. Allowed values are debug, info, warn, error. Default is info. \
 * {@link KnownLogLevel} can be used interchangeably with LogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **info**: info \
 * **debug**: debug \
 * **warn**: warn \
 * **error**: error
 */
export type LogLevel = string;

/** Dapr application health check configuration */
export interface DaprAppHealth {
  /** Boolean indicating if the health probe is enabled */
  enabled?: boolean;
  /** Path for the health probe */
  path?: string;
  /** Interval for the health probe in seconds */
  probeIntervalSeconds?: number;
  /** Timeout for the health probe in milliseconds */
  probeTimeoutMilliseconds?: number;
  /** Threshold for the health probe */
  threshold?: number;
}

export function daprAppHealthSerializer(item: DaprAppHealth): any {
  return {
    enabled: item["enabled"],
    path: item["path"],
    probeIntervalSeconds: item["probeIntervalSeconds"],
    probeTimeoutMilliseconds: item["probeTimeoutMilliseconds"],
    threshold: item["threshold"],
  };
}

export function daprAppHealthDeserializer(item: any): DaprAppHealth {
  return {
    enabled: item["enabled"],
    path: item["path"],
    probeIntervalSeconds: item["probeIntervalSeconds"],
    probeTimeoutMilliseconds: item["probeTimeoutMilliseconds"],
    threshold: item["threshold"],
  };
}

/** Container App Runtime configuration. */
export interface Runtime {
  /** Java app configuration */
  java?: RuntimeJava;
}

export function runtimeSerializer(item: Runtime): any {
  return { java: !item["java"] ? item["java"] : runtimeJavaSerializer(item["java"]) };
}

export function runtimeDeserializer(item: any): Runtime {
  return {
    java: !item["java"] ? item["java"] : runtimeJavaDeserializer(item["java"]),
  };
}

/** Java app configuration */
export interface RuntimeJava {
  /** Enable jmx core metrics for the java app */
  enableMetrics?: boolean;
}

export function runtimeJavaSerializer(item: RuntimeJava): any {
  return { enableMetrics: item["enableMetrics"] };
}

export function runtimeJavaDeserializer(item: any): RuntimeJava {
  return {
    enableMetrics: item["enableMetrics"],
  };
}

/** Container App to be a dev service */
export interface Service {
  /** Dev ContainerApp service type */
  type: string;
}

export function serviceSerializer(item: Service): any {
  return { type: item["type"] };
}

export function serviceDeserializer(item: any): Service {
  return {
    type: item["type"],
  };
}

export function identitySettingsArraySerializer(result: Array<IdentitySettings>): any[] {
  return result.map((item) => {
    return identitySettingsSerializer(item);
  });
}

export function identitySettingsArrayDeserializer(result: Array<IdentitySettings>): any[] {
  return result.map((item) => {
    return identitySettingsDeserializer(item);
  });
}

/** Optional settings for a Managed Identity that is assigned to the Container App. */
export interface IdentitySettings {
  /** The resource ID of a user-assigned managed identity that is assigned to the Container App, or 'system' for system-assigned identity. */
  identity: string;
  /** Use to select the lifecycle stages of a Container App during which the Managed Identity should be available. */
  lifecycle?: IdentitySettingsLifeCycle;
}

export function identitySettingsSerializer(item: IdentitySettings): any {
  return { identity: item["identity"], lifecycle: item["lifecycle"] };
}

export function identitySettingsDeserializer(item: any): IdentitySettings {
  return {
    identity: item["identity"],
    lifecycle: item["lifecycle"],
  };
}

/** Use to select the lifecycle stages of a Container App during which the Managed Identity should be available. */
export enum KnownIdentitySettingsLifeCycle {
  /** Do not use managed identity during any lifecycle stage. */
  None = "None",
  /** Use managed identity during the main stage of the Container App lifecycle. */
  Main = "Main",
  /** Use managed identity during the init stage of the Container App lifecycle. */
  Init = "Init",
  /** Use managed identity during all lifecycle stages of the Container App. */
  All = "All",
}

/**
 * Use to select the lifecycle stages of a Container App during which the Managed Identity should be available. \
 * {@link KnownIdentitySettingsLifeCycle} can be used interchangeably with IdentitySettingsLifeCycle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Do not use managed identity during any lifecycle stage. \
 * **Main**: Use managed identity during the main stage of the Container App lifecycle. \
 * **Init**: Use managed identity during the init stage of the Container App lifecycle. \
 * **All**: Use managed identity during all lifecycle stages of the Container App.
 */
export type IdentitySettingsLifeCycle = string;

/**
 * Container App versioned application definition.
 * Defines the desired state of an immutable revision.
 * Any changes to this section Will result in a new revision being created
 */
export interface Template {
  /** User friendly suffix that is appended to the revision name */
  revisionSuffix?: string;
  /** Optional duration in seconds the Container App Instance needs to terminate gracefully. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds. */
  terminationGracePeriodSeconds?: number;
  /** List of specialized containers that run before app containers. */
  initContainers?: InitContainer[];
  /** List of container definitions for the Container App. */
  containers?: Container[];
  /** Scaling properties for the Container App. */
  scale?: Scale;
  /** List of volume definitions for the Container App. */
  volumes?: Volume[];
  /** List of container app services bound to the app */
  serviceBinds?: ServiceBind[];
}

export function templateSerializer(item: Template): any {
  return {
    revisionSuffix: item["revisionSuffix"],
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerArraySerializer(item["initContainers"]),
    containers: !item["containers"]
      ? item["containers"]
      : containerArraySerializer(item["containers"]),
    scale: !item["scale"] ? item["scale"] : scaleSerializer(item["scale"]),
    volumes: !item["volumes"] ? item["volumes"] : volumeArraySerializer(item["volumes"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : serviceBindArraySerializer(item["serviceBinds"]),
  };
}

export function templateDeserializer(item: any): Template {
  return {
    revisionSuffix: item["revisionSuffix"],
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerArrayDeserializer(item["initContainers"]),
    containers: !item["containers"]
      ? item["containers"]
      : containerArrayDeserializer(item["containers"]),
    scale: !item["scale"] ? item["scale"] : scaleDeserializer(item["scale"]),
    volumes: !item["volumes"] ? item["volumes"] : volumeArrayDeserializer(item["volumes"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : serviceBindArrayDeserializer(item["serviceBinds"]),
  };
}

export function initContainerArraySerializer(result: Array<InitContainer>): any[] {
  return result.map((item) => {
    return initContainerSerializer(item);
  });
}

export function initContainerArrayDeserializer(result: Array<InitContainer>): any[] {
  return result.map((item) => {
    return initContainerDeserializer(item);
  });
}

/** Container App init container definition */
export interface InitContainer extends BaseContainer {}

export function initContainerSerializer(item: InitContainer): any {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArraySerializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesSerializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
  };
}

export function initContainerDeserializer(item: any): InitContainer {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArrayDeserializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesDeserializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
  };
}

export function containerArraySerializer(result: Array<Container>): any[] {
  return result.map((item) => {
    return containerSerializer(item);
  });
}

export function containerArrayDeserializer(result: Array<Container>): any[] {
  return result.map((item) => {
    return containerDeserializer(item);
  });
}

/** Container App container definition */
export interface Container extends BaseContainer {
  /** List of probes for the container. */
  probes?: ContainerAppProbe[];
}

export function containerSerializer(item: Container): any {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArraySerializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesSerializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
    probes: !item["probes"] ? item["probes"] : containerAppProbeArraySerializer(item["probes"]),
  };
}

export function containerDeserializer(item: any): Container {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArrayDeserializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesDeserializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
    probes: !item["probes"] ? item["probes"] : containerAppProbeArrayDeserializer(item["probes"]),
  };
}

export function containerAppProbeArraySerializer(result: Array<ContainerAppProbe>): any[] {
  return result.map((item) => {
    return containerAppProbeSerializer(item);
  });
}

export function containerAppProbeArrayDeserializer(result: Array<ContainerAppProbe>): any[] {
  return result.map((item) => {
    return containerAppProbeDeserializer(item);
  });
}

/** Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic. */
export interface ContainerAppProbe {
  /** Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1. Maximum value is 10. */
  failureThreshold?: number;
  /** HTTPGet specifies the http request to perform. */
  httpGet?: ContainerAppProbeHttpGet;
  /** Number of seconds after the container has started before liveness probes are initiated. Minimum value is 1. Maximum value is 60. */
  initialDelaySeconds?: number;
  /** How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value is 240. */
  periodSeconds?: number;
  /** Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1. Maximum value is 10. */
  successThreshold?: number;
  /** TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported. */
  tcpSocket?: ContainerAppProbeTcpSocket;
  /** Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is an alpha field and requires enabling ProbeTerminationGracePeriod feature gate. Maximum value is 3600 seconds (1 hour) */
  terminationGracePeriodSeconds?: number;
  /** Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 240. */
  timeoutSeconds?: number;
  /** The type of probe. */
  type?: Type;
}

export function containerAppProbeSerializer(item: ContainerAppProbe): any {
  return {
    failureThreshold: item["failureThreshold"],
    httpGet: !item["httpGet"]
      ? item["httpGet"]
      : containerAppProbeHttpGetSerializer(item["httpGet"]),
    initialDelaySeconds: item["initialDelaySeconds"],
    periodSeconds: item["periodSeconds"],
    successThreshold: item["successThreshold"],
    tcpSocket: !item["tcpSocket"]
      ? item["tcpSocket"]
      : containerAppProbeTcpSocketSerializer(item["tcpSocket"]),
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    timeoutSeconds: item["timeoutSeconds"],
    type: item["type"],
  };
}

export function containerAppProbeDeserializer(item: any): ContainerAppProbe {
  return {
    failureThreshold: item["failureThreshold"],
    httpGet: !item["httpGet"]
      ? item["httpGet"]
      : containerAppProbeHttpGetDeserializer(item["httpGet"]),
    initialDelaySeconds: item["initialDelaySeconds"],
    periodSeconds: item["periodSeconds"],
    successThreshold: item["successThreshold"],
    tcpSocket: !item["tcpSocket"]
      ? item["tcpSocket"]
      : containerAppProbeTcpSocketDeserializer(item["tcpSocket"]),
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    timeoutSeconds: item["timeoutSeconds"],
    type: item["type"],
  };
}

/** HTTPGet specifies the http request to perform. */
export interface ContainerAppProbeHttpGet {
  /** Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead. */
  host?: string;
  /** Custom headers to set in the request. HTTP allows repeated headers. */
  httpHeaders?: ContainerAppProbeHttpGetHttpHeadersItem[];
  /** Path to access on the HTTP server. */
  path?: string;
  /** Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. */
  port: number;
  /** Scheme to use for connecting to the host. Defaults to HTTP. */
  scheme?: Scheme;
}

export function containerAppProbeHttpGetSerializer(item: ContainerAppProbeHttpGet): any {
  return {
    host: item["host"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : containerAppProbeHttpGetHttpHeadersItemArraySerializer(item["httpHeaders"]),
    path: item["path"],
    port: item["port"],
    scheme: item["scheme"],
  };
}

export function containerAppProbeHttpGetDeserializer(item: any): ContainerAppProbeHttpGet {
  return {
    host: item["host"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : containerAppProbeHttpGetHttpHeadersItemArrayDeserializer(item["httpHeaders"]),
    path: item["path"],
    port: item["port"],
    scheme: item["scheme"],
  };
}

export function containerAppProbeHttpGetHttpHeadersItemArraySerializer(
  result: Array<ContainerAppProbeHttpGetHttpHeadersItem>,
): any[] {
  return result.map((item) => {
    return containerAppProbeHttpGetHttpHeadersItemSerializer(item);
  });
}

export function containerAppProbeHttpGetHttpHeadersItemArrayDeserializer(
  result: Array<ContainerAppProbeHttpGetHttpHeadersItem>,
): any[] {
  return result.map((item) => {
    return containerAppProbeHttpGetHttpHeadersItemDeserializer(item);
  });
}

/** HTTPHeader describes a custom header to be used in HTTP probes */
export interface ContainerAppProbeHttpGetHttpHeadersItem {
  /** The header field name */
  name: string;
  /** The header field value */
  value: string;
}

export function containerAppProbeHttpGetHttpHeadersItemSerializer(
  item: ContainerAppProbeHttpGetHttpHeadersItem,
): any {
  return { name: item["name"], value: item["value"] };
}

export function containerAppProbeHttpGetHttpHeadersItemDeserializer(
  item: any,
): ContainerAppProbeHttpGetHttpHeadersItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported. */
export interface ContainerAppProbeTcpSocket {
  /** Optional: Host name to connect to, defaults to the pod IP. */
  host?: string;
  /** Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. */
  port: number;
}

export function containerAppProbeTcpSocketSerializer(item: ContainerAppProbeTcpSocket): any {
  return { host: item["host"], port: item["port"] };
}

export function containerAppProbeTcpSocketDeserializer(item: any): ContainerAppProbeTcpSocket {
  return {
    host: item["host"],
    port: item["port"],
  };
}

/** The type of probe. */
export enum KnownType {
  /** Liveness */
  Liveness = "Liveness",
  /** Readiness */
  Readiness = "Readiness",
  /** Startup */
  Startup = "Startup",
}

/**
 * The type of probe. \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Liveness**: Liveness \
 * **Readiness**: Readiness \
 * **Startup**: Startup
 */
export type Type = string;

/** Container App scaling configurations. */
export interface Scale {
  /** Optional. Minimum number of container replicas. */
  minReplicas?: number;
  /** Optional. Maximum number of container replicas. Defaults to 10 if not set. */
  maxReplicas?: number;
  /** Optional. KEDA Cooldown Period in seconds. Defaults to 300 seconds if not set. */
  cooldownPeriod?: number;
  /** Optional. KEDA Polling Interval in seconds. Defaults to 30 seconds if not set. */
  pollingInterval?: number;
  /** Optional. Whether custom scale rules can override the automatic scale rules. This property is only applicable to Function Apps. */
  allowScalingRuleOverride?: boolean;
  /** Scaling rules. */
  rules?: ScaleRule[];
}

export function scaleSerializer(item: Scale): any {
  return {
    minReplicas: item["minReplicas"],
    maxReplicas: item["maxReplicas"],
    cooldownPeriod: item["cooldownPeriod"],
    pollingInterval: item["pollingInterval"],
    allowScalingRuleOverride: item["allowScalingRuleOverride"],
    rules: !item["rules"] ? item["rules"] : scaleRuleArraySerializer(item["rules"]),
  };
}

export function scaleDeserializer(item: any): Scale {
  return {
    minReplicas: item["minReplicas"],
    maxReplicas: item["maxReplicas"],
    cooldownPeriod: item["cooldownPeriod"],
    pollingInterval: item["pollingInterval"],
    allowScalingRuleOverride: item["allowScalingRuleOverride"],
    rules: !item["rules"] ? item["rules"] : scaleRuleArrayDeserializer(item["rules"]),
  };
}

export function scaleRuleArraySerializer(result: Array<ScaleRule>): any[] {
  return result.map((item) => {
    return scaleRuleSerializer(item);
  });
}

export function scaleRuleArrayDeserializer(result: Array<ScaleRule>): any[] {
  return result.map((item) => {
    return scaleRuleDeserializer(item);
  });
}

/** Container App container scaling rule. */
export interface ScaleRule {
  /** Scale Rule Name */
  name?: string;
  /** Azure Queue based scaling. */
  azureQueue?: QueueScaleRule;
  /** Custom scale rule. */
  custom?: CustomScaleRule;
  /** HTTP requests based scaling. */
  http?: HttpScaleRule;
  /** Tcp requests based scaling. */
  tcp?: TcpScaleRule;
}

export function scaleRuleSerializer(item: ScaleRule): any {
  return {
    name: item["name"],
    azureQueue: !item["azureQueue"]
      ? item["azureQueue"]
      : queueScaleRuleSerializer(item["azureQueue"]),
    custom: !item["custom"] ? item["custom"] : customScaleRuleSerializer(item["custom"]),
    http: !item["http"] ? item["http"] : httpScaleRuleSerializer(item["http"]),
    tcp: !item["tcp"] ? item["tcp"] : tcpScaleRuleSerializer(item["tcp"]),
  };
}

export function scaleRuleDeserializer(item: any): ScaleRule {
  return {
    name: item["name"],
    azureQueue: !item["azureQueue"]
      ? item["azureQueue"]
      : queueScaleRuleDeserializer(item["azureQueue"]),
    custom: !item["custom"] ? item["custom"] : customScaleRuleDeserializer(item["custom"]),
    http: !item["http"] ? item["http"] : httpScaleRuleDeserializer(item["http"]),
    tcp: !item["tcp"] ? item["tcp"] : tcpScaleRuleDeserializer(item["tcp"]),
  };
}

/** Container App container Azure Queue based scaling rule. */
export interface QueueScaleRule {
  /** Storage account name. required if using managed identity to authenticate */
  accountName?: string;
  /** Queue name. */
  queueName?: string;
  /** Queue length. */
  queueLength?: number;
  /** Authentication secrets for the queue scale rule. */
  auth?: ScaleRuleAuth[];
  /** The resource ID of a user-assigned managed identity that is assigned to the Container App, or 'system' for system-assigned identity. */
  identity?: string;
}

export function queueScaleRuleSerializer(item: QueueScaleRule): any {
  return {
    accountName: item["accountName"],
    queueName: item["queueName"],
    queueLength: item["queueLength"],
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArraySerializer(item["auth"]),
    identity: item["identity"],
  };
}

export function queueScaleRuleDeserializer(item: any): QueueScaleRule {
  return {
    accountName: item["accountName"],
    queueName: item["queueName"],
    queueLength: item["queueLength"],
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArrayDeserializer(item["auth"]),
    identity: item["identity"],
  };
}

export function scaleRuleAuthArraySerializer(result: Array<ScaleRuleAuth>): any[] {
  return result.map((item) => {
    return scaleRuleAuthSerializer(item);
  });
}

export function scaleRuleAuthArrayDeserializer(result: Array<ScaleRuleAuth>): any[] {
  return result.map((item) => {
    return scaleRuleAuthDeserializer(item);
  });
}

/** Auth Secrets for Scale Rule */
export interface ScaleRuleAuth {
  /** Name of the secret from which to pull the auth params. */
  secretRef?: string;
  /** Trigger Parameter that uses the secret */
  triggerParameter?: string;
}

export function scaleRuleAuthSerializer(item: ScaleRuleAuth): any {
  return { secretRef: item["secretRef"], triggerParameter: item["triggerParameter"] };
}

export function scaleRuleAuthDeserializer(item: any): ScaleRuleAuth {
  return {
    secretRef: item["secretRef"],
    triggerParameter: item["triggerParameter"],
  };
}

/** Container App container Custom scaling rule. */
export interface CustomScaleRule {
  /**
   * Type of the custom scale rule
   * eg: azure-servicebus, redis etc.
   */
  type?: string;
  /** Metadata properties to describe custom scale rule. */
  metadata?: Record<string, string>;
  /** Authentication secrets for the custom scale rule. */
  auth?: ScaleRuleAuth[];
  /** The resource ID of a user-assigned managed identity that is assigned to the Container App, or 'system' for system-assigned identity. */
  identity?: string;
}

export function customScaleRuleSerializer(item: CustomScaleRule): any {
  return {
    type: item["type"],
    metadata: item["metadata"],
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArraySerializer(item["auth"]),
    identity: item["identity"],
  };
}

export function customScaleRuleDeserializer(item: any): CustomScaleRule {
  return {
    type: item["type"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArrayDeserializer(item["auth"]),
    identity: item["identity"],
  };
}

/** Container App container Http scaling rule. */
export interface HttpScaleRule {
  /** Metadata properties to describe http scale rule. */
  metadata?: Record<string, string>;
  /** Authentication secrets for the custom scale rule. */
  auth?: ScaleRuleAuth[];
  /** The resource ID of a user-assigned managed identity that is assigned to the Container App, or 'system' for system-assigned identity. */
  identity?: string;
}

export function httpScaleRuleSerializer(item: HttpScaleRule): any {
  return {
    metadata: item["metadata"],
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArraySerializer(item["auth"]),
    identity: item["identity"],
  };
}

export function httpScaleRuleDeserializer(item: any): HttpScaleRule {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArrayDeserializer(item["auth"]),
    identity: item["identity"],
  };
}

/** Container App container Tcp scaling rule. */
export interface TcpScaleRule {
  /** Metadata properties to describe tcp scale rule. */
  metadata?: Record<string, string>;
  /** Authentication secrets for the tcp scale rule. */
  auth?: ScaleRuleAuth[];
  /** The resource ID of a user-assigned managed identity that is assigned to the Container App, or 'system' for system-assigned identity. */
  identity?: string;
}

export function tcpScaleRuleSerializer(item: TcpScaleRule): any {
  return {
    metadata: item["metadata"],
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArraySerializer(item["auth"]),
    identity: item["identity"],
  };
}

export function tcpScaleRuleDeserializer(item: any): TcpScaleRule {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArrayDeserializer(item["auth"]),
    identity: item["identity"],
  };
}

export function volumeArraySerializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeSerializer(item);
  });
}

export function volumeArrayDeserializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeDeserializer(item);
  });
}

/** Volume definitions for the Container App. */
export interface Volume {
  /** Volume name. */
  name?: string;
  /** Storage type for the volume. If not provided, use EmptyDir. */
  storageType?: StorageType;
  /** Name of storage resource. No need to provide for EmptyDir and Secret. */
  storageName?: string;
  /** List of secrets to be added in volume. If no secrets are provided, all secrets in collection will be added to volume. */
  secrets?: SecretVolumeItem[];
  /** Mount options used while mounting the Azure file share or NFS Azure file share. Must be a comma-separated string. */
  mountOptions?: string;
}

export function volumeSerializer(item: Volume): any {
  return {
    name: item["name"],
    storageType: item["storageType"],
    storageName: item["storageName"],
    secrets: !item["secrets"] ? item["secrets"] : secretVolumeItemArraySerializer(item["secrets"]),
    mountOptions: item["mountOptions"],
  };
}

export function volumeDeserializer(item: any): Volume {
  return {
    name: item["name"],
    storageType: item["storageType"],
    storageName: item["storageName"],
    secrets: !item["secrets"]
      ? item["secrets"]
      : secretVolumeItemArrayDeserializer(item["secrets"]),
    mountOptions: item["mountOptions"],
  };
}

/** Storage type for the volume. If not provided, use EmptyDir. */
export enum KnownStorageType {
  /** AzureFile */
  AzureFile = "AzureFile",
  /** EmptyDir */
  EmptyDir = "EmptyDir",
  /** Secret */
  Secret = "Secret",
  /** NfsAzureFile */
  NfsAzureFile = "NfsAzureFile",
}

/**
 * Storage type for the volume. If not provided, use EmptyDir. \
 * {@link KnownStorageType} can be used interchangeably with StorageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureFile**: AzureFile \
 * **EmptyDir**: EmptyDir \
 * **Secret**: Secret \
 * **NfsAzureFile**: NfsAzureFile
 */
export type StorageType = string;

export function secretVolumeItemArraySerializer(result: Array<SecretVolumeItem>): any[] {
  return result.map((item) => {
    return secretVolumeItemSerializer(item);
  });
}

export function secretVolumeItemArrayDeserializer(result: Array<SecretVolumeItem>): any[] {
  return result.map((item) => {
    return secretVolumeItemDeserializer(item);
  });
}

/** Secret to be added to volume. */
export interface SecretVolumeItem {
  /** Name of the Container App secret from which to pull the secret value. */
  secretRef?: string;
  /** Path to project secret to. If no path is provided, path defaults to name of secret listed in secretRef. */
  path?: string;
}

export function secretVolumeItemSerializer(item: SecretVolumeItem): any {
  return { secretRef: item["secretRef"], path: item["path"] };
}

export function secretVolumeItemDeserializer(item: any): SecretVolumeItem {
  return {
    secretRef: item["secretRef"],
    path: item["path"],
  };
}

export function serviceBindArraySerializer(result: Array<ServiceBind>): any[] {
  return result.map((item) => {
    return serviceBindSerializer(item);
  });
}

export function serviceBindArrayDeserializer(result: Array<ServiceBind>): any[] {
  return result.map((item) => {
    return serviceBindDeserializer(item);
  });
}

/** Configuration to bind a ContainerApp to a dev ContainerApp Service */
export interface ServiceBind {
  /** Resource id of the target service */
  serviceId?: string;
  /** Name of the service bind */
  name?: string;
}

export function serviceBindSerializer(item: ServiceBind): any {
  return { serviceId: item["serviceId"], name: item["name"] };
}

export function serviceBindDeserializer(item: any): ServiceBind {
  return {
    serviceId: item["serviceId"],
    name: item["name"],
  };
}

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of extendedLocation. */
export enum KnownExtendedLocationTypes {
  /** CustomLocation */
  CustomLocation = "CustomLocation",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomLocation**: CustomLocation
 */
export type ExtendedLocationTypes = string;

/** Metadata to represent the container app kind, representing if a container app is workflowapp or functionapp. */
export enum KnownKind {
  /** workflowapp */
  Workflowapp = "workflowapp",
  /** functionapp */
  Functionapp = "functionapp",
}

/**
 * Metadata to represent the container app kind, representing if a container app is workflowapp or functionapp. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **workflowapp**: workflowapp \
 * **functionapp**: functionapp
 */
export type Kind = string;

/** Container App base container definition. */
export interface BaseContainer {
  /** Container image tag. */
  image?: string;
  /** Custom container name. */
  name?: string;
  /** Container start command. */
  command?: string[];
  /** Container start command arguments. */
  args?: string[];
  /** Container environment variables. */
  env?: EnvironmentVar[];
  /** Container resource requirements. */
  resources?: ContainerResources;
  /** Container volume mounts. */
  volumeMounts?: VolumeMount[];
}

export function baseContainerSerializer(item: BaseContainer): any {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArraySerializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesSerializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
  };
}

export function baseContainerDeserializer(item: any): BaseContainer {
  return {
    image: item["image"],
    name: item["name"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    args: !item["args"]
      ? item["args"]
      : item["args"].map((p: any) => {
          return p;
        }),
    env: !item["env"] ? item["env"] : environmentVarArrayDeserializer(item["env"]),
    resources: !item["resources"]
      ? item["resources"]
      : containerResourcesDeserializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
  };
}

export function volumeMountArraySerializer(result: Array<VolumeMount>): any[] {
  return result.map((item) => {
    return volumeMountSerializer(item);
  });
}

export function volumeMountArrayDeserializer(result: Array<VolumeMount>): any[] {
  return result.map((item) => {
    return volumeMountDeserializer(item);
  });
}

/** Volume mount for the Container App. */
export interface VolumeMount {
  /** This must match the Name of a Volume. */
  volumeName?: string;
  /** Path within the container at which the volume should be mounted.Must not contain ':'. */
  mountPath?: string;
  /** Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root). */
  subPath?: string;
}

export function volumeMountSerializer(item: VolumeMount): any {
  return { volumeName: item["volumeName"], mountPath: item["mountPath"], subPath: item["subPath"] };
}

export function volumeMountDeserializer(item: any): VolumeMount {
  return {
    volumeName: item["volumeName"],
    mountPath: item["mountPath"],
    subPath: item["subPath"],
  };
}

/** Container App collection ARM resource. */
export interface _ContainerAppCollection {
  /** The ContainerApp items on this page */
  value: ContainerApp[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerAppCollectionDeserializer(item: any): _ContainerAppCollection {
  return {
    value: containerAppArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerAppArraySerializer(result: Array<ContainerApp>): any[] {
  return result.map((item) => {
    return containerAppSerializer(item);
  });
}

export function containerAppArrayDeserializer(result: Array<ContainerApp>): any[] {
  return result.map((item) => {
    return containerAppDeserializer(item);
  });
}

/** Custom domain analysis. */
export interface CustomHostnameAnalysisResult {
  /** Host name that was analyzed */
  readonly hostName?: string;
  /** <code>true</code> if hostname is already verified; otherwise, <code>false</code>. */
  readonly isHostnameAlreadyVerified?: boolean;
  /** DNS verification test result. */
  readonly customDomainVerificationTest?: DnsVerificationTestResult;
  /** Raw failure information if DNS verification fails. */
  readonly customDomainVerificationFailureInfo?: CustomHostnameAnalysisResultCustomDomainVerificationFailureInfo;
  /** <code>true</code> if there is a conflict on the Container App's managed environment; otherwise, <code>false</code>. */
  readonly hasConflictOnManagedEnvironment?: boolean;
  /** <code>true</code> if there is a conflict on the Container App's managed environment level custom domain; otherwise, <code>false</code>. */
  readonly conflictWithEnvironmentCustomDomain?: boolean;
  /** Name of the conflicting Container App on the Managed Environment if it's within the same subscription. */
  readonly conflictingContainerAppResourceId?: string;
  /** CName records visible for this hostname. */
  cNameRecords?: string[];
  /** TXT records visible for this hostname. */
  txtRecords?: string[];
  /** A records visible for this hostname. */
  aRecords?: string[];
  /** Alternate CName records visible for this hostname. */
  alternateCNameRecords?: string[];
  /** Alternate TXT records visible for this hostname. */
  alternateTxtRecords?: string[];
}

export function customHostnameAnalysisResultDeserializer(item: any): CustomHostnameAnalysisResult {
  return {
    hostName: item["hostName"],
    isHostnameAlreadyVerified: item["isHostnameAlreadyVerified"],
    customDomainVerificationTest: item["customDomainVerificationTest"],
    customDomainVerificationFailureInfo: !item["customDomainVerificationFailureInfo"]
      ? item["customDomainVerificationFailureInfo"]
      : customHostnameAnalysisResultCustomDomainVerificationFailureInfoDeserializer(
          item["customDomainVerificationFailureInfo"],
        ),
    hasConflictOnManagedEnvironment: item["hasConflictOnManagedEnvironment"],
    conflictWithEnvironmentCustomDomain: item["conflictWithEnvironmentCustomDomain"],
    conflictingContainerAppResourceId: item["conflictingContainerAppResourceId"],
    cNameRecords: !item["cNameRecords"]
      ? item["cNameRecords"]
      : item["cNameRecords"].map((p: any) => {
          return p;
        }),
    txtRecords: !item["txtRecords"]
      ? item["txtRecords"]
      : item["txtRecords"].map((p: any) => {
          return p;
        }),
    aRecords: !item["aRecords"]
      ? item["aRecords"]
      : item["aRecords"].map((p: any) => {
          return p;
        }),
    alternateCNameRecords: !item["alternateCNameRecords"]
      ? item["alternateCNameRecords"]
      : item["alternateCNameRecords"].map((p: any) => {
          return p;
        }),
    alternateTxtRecords: !item["alternateTxtRecords"]
      ? item["alternateTxtRecords"]
      : item["alternateTxtRecords"].map((p: any) => {
          return p;
        }),
  };
}

/** DNS verification test result. */
export type DnsVerificationTestResult = "Passed" | "Failed" | "Skipped";

/** Raw failure information if DNS verification fails. */
export interface CustomHostnameAnalysisResultCustomDomainVerificationFailureInfo {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
  /** Details or the error */
  details?: CustomHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItem[];
}

export function customHostnameAnalysisResultCustomDomainVerificationFailureInfoDeserializer(
  item: any,
): CustomHostnameAnalysisResultCustomDomainVerificationFailureInfo {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : customHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItemArrayDeserializer(
          item["details"],
        ),
  };
}

export function customHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItemArrayDeserializer(
  result: Array<CustomHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItem>,
): any[] {
  return result.map((item) => {
    return customHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItemDeserializer(
      item,
    );
  });
}

/** Detailed errors. */
export interface CustomHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItem {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
}

export function customHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItemDeserializer(
  item: any,
): CustomHostnameAnalysisResultCustomDomainVerificationFailureInfoDetailsItem {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** Container App Secrets Collection ARM resource. */
export interface SecretsCollection {
  /** Collection of resources. */
  value: ContainerAppSecret[];
}

export function secretsCollectionDeserializer(item: any): SecretsCollection {
  return {
    value: containerAppSecretArrayDeserializer(item["value"]),
  };
}

export function containerAppSecretArrayDeserializer(result: Array<ContainerAppSecret>): any[] {
  return result.map((item) => {
    return containerAppSecretDeserializer(item);
  });
}

/** Container App Secret. */
export interface ContainerAppSecret {
  /** Secret Name. */
  readonly name?: string;
  /** Secret Value. */
  readonly value?: string;
  /** Resource ID of a managed identity to authenticate with Azure Key Vault, or System to use a system-assigned identity. */
  readonly identity?: string;
  /** Azure Key Vault URL pointing to the secret referenced by the container app. */
  readonly keyVaultUrl?: string;
}

export function containerAppSecretDeserializer(item: any): ContainerAppSecret {
  return {
    name: item["name"],
    value: item["value"],
    identity: item["identity"],
    keyVaultUrl: item["keyVaultUrl"],
  };
}

/** Container App Auth Token. */
export interface ContainerAppAuthToken extends TrackedResource {
  /** Auth token value. */
  readonly token?: string;
  /** Token expiration date. */
  readonly expires?: Date;
}

export function containerAppAuthTokenDeserializer(item: any): ContainerAppAuthToken {
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
    ...(!item["properties"]
      ? item["properties"]
      : _containerAppAuthTokenPropertiesDeserializer(item["properties"])),
  };
}

/** Container App auth token resource specific properties */
export interface ContainerAppAuthTokenProperties {
  /** Auth token value. */
  readonly token?: string;
  /** Token expiration date. */
  readonly expires?: Date;
}

export function containerAppAuthTokenPropertiesDeserializer(
  item: any,
): ContainerAppAuthTokenProperties {
  return {
    token: item["token"],
    expires: !item["expires"] ? item["expires"] : new Date(item["expires"]),
  };
}

/** Container App Function. */
export interface ContainerAppsFunction extends ProxyResource {
  /** Invoke URL for the function. */
  readonly invokeUrlTemplate?: string;
  /** Trigger type of the function. */
  readonly triggerType?: string;
  /** Programming language of the function. */
  readonly language?: string;
  /** Indicates whether the function is disabled. This property is deprecated; use `state` instead. */
  readonly isDisabled?: boolean;
  /** The state of the function. */
  readonly state?: ContainerAppsFunctionState;
}

export function containerAppsFunctionDeserializer(item: any): ContainerAppsFunction {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _containerAppsFunctionPropertiesDeserializer(item["properties"])),
  };
}

/** Function resource specific properties */
export interface ContainerAppsFunctionProperties {
  /** Invoke URL for the function. */
  readonly invokeUrlTemplate?: string;
  /** Trigger type of the function. */
  readonly triggerType?: string;
  /** Programming language of the function. */
  readonly language?: string;
  /** Indicates whether the function is disabled. This property is deprecated; use `state` instead. */
  readonly isDisabled?: boolean;
  /** The state of the function. */
  readonly state?: ContainerAppsFunctionState;
}

export function containerAppsFunctionPropertiesDeserializer(
  item: any,
): ContainerAppsFunctionProperties {
  return {
    invokeUrlTemplate: item["invokeUrlTemplate"],
    triggerType: item["triggerType"],
    language: item["language"],
    isDisabled: item["isDisabled"],
    state: item["state"],
  };
}

/** The state of a Container App function. */
export enum KnownContainerAppsFunctionState {
  /** The function is enabled. */
  Enabled = "Enabled",
  /** The function is disabled. */
  Disabled = "Disabled",
}

/**
 * The state of a Container App function. \
 * {@link KnownContainerAppsFunctionState} can be used interchangeably with ContainerAppsFunctionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The function is enabled. \
 * **Disabled**: The function is disabled.
 */
export type ContainerAppsFunctionState = string;

/** Container App Functions collection ARM resource. */
export interface _ContainerAppsFunctionCollection {
  /** The ContainerAppsFunction items on this page */
  value: ContainerAppsFunction[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerAppsFunctionCollectionDeserializer(
  item: any,
): _ContainerAppsFunctionCollection {
  return {
    value: containerAppsFunctionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerAppsFunctionArrayDeserializer(
  result: Array<ContainerAppsFunction>,
): any[] {
  return result.map((item) => {
    return containerAppsFunctionDeserializer(item);
  });
}

/** Container App Revision. */
export interface Revision extends ProxyResource {
  /**
   * Timestamp describing when the revision was created
   * by controller
   */
  readonly createdTime?: Date;
  /** Timestamp describing when the revision was last active. Only meaningful when revision is inactive */
  readonly lastActiveTime?: Date;
  /** Fully qualified domain name of the revision */
  readonly fqdn?: string;
  /**
   * Container App Revision Template with all possible settings and the
   * defaults if user did not provide them. The defaults are populated
   * as they were at the creation time
   */
  readonly template?: Template;
  /** Boolean describing if the Revision is Active */
  readonly active?: boolean;
  /** Number of pods currently running for this revision */
  readonly replicas?: number;
  /** Traffic weight assigned to this revision */
  readonly trafficWeight?: number;
  /** Optional Field - Platform Error Message */
  readonly provisioningError?: string;
  /** Current health State of the revision */
  readonly healthState?: RevisionHealthState;
  /** Current provisioning State of the revision */
  readonly provisioningState?: RevisionProvisioningState;
  /** Current running state of the revision */
  readonly runningState?: RevisionRunningState;
}

export function revisionDeserializer(item: any): Revision {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _revisionPropertiesDeserializer(item["properties"])),
  };
}

/** Revision resource specific properties */
export interface RevisionProperties {
  /**
   * Timestamp describing when the revision was created
   * by controller
   */
  readonly createdTime?: Date;
  /** Timestamp describing when the revision was last active. Only meaningful when revision is inactive */
  readonly lastActiveTime?: Date;
  /** Fully qualified domain name of the revision */
  readonly fqdn?: string;
  /**
   * Container App Revision Template with all possible settings and the
   * defaults if user did not provide them. The defaults are populated
   * as they were at the creation time
   */
  readonly template?: Template;
  /** Boolean describing if the Revision is Active */
  readonly active?: boolean;
  /** Number of pods currently running for this revision */
  readonly replicas?: number;
  /** Traffic weight assigned to this revision */
  readonly trafficWeight?: number;
  /** Optional Field - Platform Error Message */
  readonly provisioningError?: string;
  /** Current health State of the revision */
  readonly healthState?: RevisionHealthState;
  /** Current provisioning State of the revision */
  readonly provisioningState?: RevisionProvisioningState;
  /** Current running state of the revision */
  readonly runningState?: RevisionRunningState;
}

export function revisionPropertiesDeserializer(item: any): RevisionProperties {
  return {
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    lastActiveTime: !item["lastActiveTime"]
      ? item["lastActiveTime"]
      : new Date(item["lastActiveTime"]),
    fqdn: item["fqdn"],
    template: !item["template"] ? item["template"] : templateDeserializer(item["template"]),
    active: item["active"],
    replicas: item["replicas"],
    trafficWeight: item["trafficWeight"],
    provisioningError: item["provisioningError"],
    healthState: item["healthState"],
    provisioningState: item["provisioningState"],
    runningState: item["runningState"],
  };
}

/** Current health State of the revision */
export enum KnownRevisionHealthState {
  /** Healthy */
  Healthy = "Healthy",
  /** Unhealthy */
  Unhealthy = "Unhealthy",
  /** None */
  None = "None",
}

/**
 * Current health State of the revision \
 * {@link KnownRevisionHealthState} can be used interchangeably with RevisionHealthState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: Healthy \
 * **Unhealthy**: Unhealthy \
 * **None**: None
 */
export type RevisionHealthState = string;

/** Current provisioning State of the revision */
export enum KnownRevisionProvisioningState {
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Provisioned */
  Provisioned = "Provisioned",
  /** Failed */
  Failed = "Failed",
  /** Deprovisioning */
  Deprovisioning = "Deprovisioning",
  /** Deprovisioned */
  Deprovisioned = "Deprovisioned",
}

/**
 * Current provisioning State of the revision \
 * {@link KnownRevisionProvisioningState} can be used interchangeably with RevisionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Provisioning \
 * **Provisioned**: Provisioned \
 * **Failed**: Failed \
 * **Deprovisioning**: Deprovisioning \
 * **Deprovisioned**: Deprovisioned
 */
export type RevisionProvisioningState = string;

/** Current running state of the revision */
export enum KnownRevisionRunningState {
  /** Running */
  Running = "Running",
  /** Processing */
  Processing = "Processing",
  /** Stopped */
  Stopped = "Stopped",
  /** Degraded */
  Degraded = "Degraded",
  /** Failed */
  Failed = "Failed",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Current running state of the revision \
 * {@link KnownRevisionRunningState} can be used interchangeably with RevisionRunningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: Running \
 * **Processing**: Processing \
 * **Stopped**: Stopped \
 * **Degraded**: Degraded \
 * **Failed**: Failed \
 * **Unknown**: Unknown
 */
export type RevisionRunningState = string;

/** Container App Revisions collection ARM resource. */
export interface _RevisionCollection {
  /** The Revision items on this page */
  value: Revision[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _revisionCollectionDeserializer(item: any): _RevisionCollection {
  return {
    value: revisionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function revisionArrayDeserializer(result: Array<Revision>): any[] {
  return result.map((item) => {
    return revisionDeserializer(item);
  });
}

/** Container App Label History. */
export interface LabelHistory extends ProxyResource {
  /** Container App Label History resource specific properties */
  properties?: LabelHistoryProperties;
}

export function labelHistoryDeserializer(item: any): LabelHistory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : labelHistoryPropertiesDeserializer(item["properties"]),
  };
}

/** Container App Label History resource specific properties */
export interface LabelHistoryProperties {
  /** List of label history records. */
  readonly records?: LabelHistoryRecordItem[];
}

export function labelHistoryPropertiesDeserializer(item: any): LabelHistoryProperties {
  return {
    records: !item["records"]
      ? item["records"]
      : labelHistoryRecordItemArrayDeserializer(item["records"]),
  };
}

export function labelHistoryRecordItemArrayDeserializer(
  result: Array<LabelHistoryRecordItem>,
): any[] {
  return result.map((item) => {
    return labelHistoryRecordItemDeserializer(item);
  });
}

/** Container App Label History Item resource specific properties */
export interface LabelHistoryRecordItem {
  /** Container App revision name that label was applied to. */
  readonly revision?: string;
  /** Timestamp describing when the label was applied to the revision. */
  readonly start?: Date;
  /** Timestamp describing when the label was removed from the revision. Only meaningful when the label is currently applied to the revision. */
  readonly stop?: Date;
  /** Status of the label history record. */
  readonly status?: Status;
}

export function labelHistoryRecordItemDeserializer(item: any): LabelHistoryRecordItem {
  return {
    revision: item["revision"],
    start: !item["start"] ? item["start"] : new Date(item["start"]),
    stop: !item["stop"] ? item["stop"] : new Date(item["stop"]),
    status: item["status"],
  };
}

/** Status of the label history record. */
export enum KnownStatus {
  /** The label operation completed successfully. */
  Succeeded = "Succeeded",
  /** The label operation failed. */
  Failed = "Failed",
  /** The label operation is starting. */
  Starting = "Starting",
}

/**
 * Status of the label history record. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The label operation completed successfully. \
 * **Failed**: The label operation failed. \
 * **Starting**: The label operation is starting.
 */
export type Status = string;

/** Container App Label History collection ARM resource. */
export interface _LabelHistoryCollection {
  /** The LabelHistory items on this page */
  value: LabelHistory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _labelHistoryCollectionDeserializer(item: any): _LabelHistoryCollection {
  return {
    value: labelHistoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function labelHistoryArrayDeserializer(result: Array<LabelHistory>): any[] {
  return result.map((item) => {
    return labelHistoryDeserializer(item);
  });
}

/** Container App Revision Replica. */
export interface Replica extends ProxyResource {
  /** Timestamp describing when the pod was created by controller */
  readonly createdTime?: Date;
  /** Current running state of the replica */
  readonly runningState?: ContainerAppReplicaRunningState;
  /** The details of replica current running state */
  readonly runningStateDetails?: string;
  /** The containers collection under a replica. */
  containers?: ReplicaContainer[];
  /** The init containers collection under a replica. */
  initContainers?: ReplicaContainer[];
}

export function replicaDeserializer(item: any): Replica {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _replicaPropertiesDeserializer(item["properties"])),
  };
}

/** Replica resource specific properties */
export interface ReplicaProperties {
  /** Timestamp describing when the pod was created by controller */
  readonly createdTime?: Date;
  /** Current running state of the replica */
  readonly runningState?: ContainerAppReplicaRunningState;
  /** The details of replica current running state */
  readonly runningStateDetails?: string;
  /** The containers collection under a replica. */
  containers?: ReplicaContainer[];
  /** The init containers collection under a replica. */
  initContainers?: ReplicaContainer[];
}

export function replicaPropertiesDeserializer(item: any): ReplicaProperties {
  return {
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    runningState: item["runningState"],
    runningStateDetails: item["runningStateDetails"],
    containers: !item["containers"]
      ? item["containers"]
      : replicaContainerArrayDeserializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : replicaContainerArrayDeserializer(item["initContainers"]),
  };
}

/** Current running state of the replica */
export enum KnownContainerAppReplicaRunningState {
  /** Running */
  Running = "Running",
  /** NotRunning */
  NotRunning = "NotRunning",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Current running state of the replica \
 * {@link KnownContainerAppReplicaRunningState} can be used interchangeably with ContainerAppReplicaRunningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: Running \
 * **NotRunning**: NotRunning \
 * **Unknown**: Unknown
 */
export type ContainerAppReplicaRunningState = string;

export function replicaContainerArrayDeserializer(result: Array<ReplicaContainer>): any[] {
  return result.map((item) => {
    return replicaContainerDeserializer(item);
  });
}

/** Container object under Container App Revision Replica. */
export interface ReplicaContainer {
  /** The Name of the Container */
  name?: string;
  /** The Id of the Container */
  containerId?: string;
  /** The container ready status */
  ready?: boolean;
  /** The container start status */
  started?: boolean;
  /** The container restart count */
  restartCount?: number;
  /** Current running state of the container */
  readonly runningState?: ContainerAppContainerRunningState;
  /** The details of container current running state */
  readonly runningStateDetails?: string;
  /** Log Stream endpoint */
  readonly logStreamEndpoint?: string;
  /** Container exec endpoint */
  readonly execEndpoint?: string;
  /** Container debug endpoint */
  readonly debugEndpoint?: string;
}

export function replicaContainerDeserializer(item: any): ReplicaContainer {
  return {
    name: item["name"],
    containerId: item["containerId"],
    ready: item["ready"],
    started: item["started"],
    restartCount: item["restartCount"],
    runningState: item["runningState"],
    runningStateDetails: item["runningStateDetails"],
    logStreamEndpoint: item["logStreamEndpoint"],
    execEndpoint: item["execEndpoint"],
    debugEndpoint: item["debugEndpoint"],
  };
}

/** Current running state of the container */
export enum KnownContainerAppContainerRunningState {
  /** Running */
  Running = "Running",
  /** Terminated */
  Terminated = "Terminated",
  /** Waiting */
  Waiting = "Waiting",
}

/**
 * Current running state of the container \
 * {@link KnownContainerAppContainerRunningState} can be used interchangeably with ContainerAppContainerRunningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: Running \
 * **Terminated**: Terminated \
 * **Waiting**: Waiting
 */
export type ContainerAppContainerRunningState = string;

/** Container App Revision Replicas collection ARM resource. */
export interface ReplicaCollection {
  /** Collection of resources. */
  value: Replica[];
}

export function replicaCollectionDeserializer(item: any): ReplicaCollection {
  return {
    value: replicaArrayDeserializer(item["value"]),
  };
}

export function replicaArrayDeserializer(result: Array<Replica>): any[] {
  return result.map((item) => {
    return replicaDeserializer(item);
  });
}

/** .NET Component. */
export interface DotNetComponent extends ProxyResource {
  /** Type of the .NET Component. */
  componentType?: DotNetComponentType;
  /** Provisioning state of the .NET Component. */
  readonly provisioningState?: DotNetComponentProvisioningState;
  /** List of .NET Components configuration properties */
  configurations?: DotNetComponentConfigurationProperty[];
  /** List of .NET Components that are bound to the .NET component */
  serviceBinds?: DotNetComponentServiceBind[];
}

export function dotNetComponentSerializer(item: DotNetComponent): any {
  return {
    properties: areAllPropsUndefined(item, ["componentType", "configurations", "serviceBinds"])
      ? undefined
      : _dotNetComponentPropertiesSerializer(item),
  };
}

export function dotNetComponentDeserializer(item: any): DotNetComponent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dotNetComponentPropertiesDeserializer(item["properties"])),
  };
}

/** .NET Component resource specific properties */
export interface DotNetComponentProperties {
  /** Type of the .NET Component. */
  componentType?: DotNetComponentType;
  /** Provisioning state of the .NET Component. */
  readonly provisioningState?: DotNetComponentProvisioningState;
  /** List of .NET Components configuration properties */
  configurations?: DotNetComponentConfigurationProperty[];
  /** List of .NET Components that are bound to the .NET component */
  serviceBinds?: DotNetComponentServiceBind[];
}

export function dotNetComponentPropertiesSerializer(item: DotNetComponentProperties): any {
  return {
    componentType: item["componentType"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : dotNetComponentConfigurationPropertyArraySerializer(item["configurations"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : dotNetComponentServiceBindArraySerializer(item["serviceBinds"]),
  };
}

export function dotNetComponentPropertiesDeserializer(item: any): DotNetComponentProperties {
  return {
    componentType: item["componentType"],
    provisioningState: item["provisioningState"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : dotNetComponentConfigurationPropertyArrayDeserializer(item["configurations"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : dotNetComponentServiceBindArrayDeserializer(item["serviceBinds"]),
  };
}

/** Type of the .NET Component. */
export enum KnownDotNetComponentType {
  /** An Aspire dashboard component. */
  AspireDashboard = "AspireDashboard",
}

/**
 * Type of the .NET Component. \
 * {@link KnownDotNetComponentType} can be used interchangeably with DotNetComponentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AspireDashboard**: An Aspire dashboard component.
 */
export type DotNetComponentType = string;

/** Provisioning state of the .NET Component. */
export enum KnownDotNetComponentProvisioningState {
  /** The .NET component was provisioned successfully. */
  Succeeded = "Succeeded",
  /** The .NET component failed to provision. */
  Failed = "Failed",
  /** Provisioning of the .NET component was canceled. */
  Canceled = "Canceled",
  /** The .NET component is being deleted. */
  Deleting = "Deleting",
  /** The .NET component is being provisioned. */
  InProgress = "InProgress",
}

/**
 * Provisioning state of the .NET Component. \
 * {@link KnownDotNetComponentProvisioningState} can be used interchangeably with DotNetComponentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The .NET component was provisioned successfully. \
 * **Failed**: The .NET component failed to provision. \
 * **Canceled**: Provisioning of the .NET component was canceled. \
 * **Deleting**: The .NET component is being deleted. \
 * **InProgress**: The .NET component is being provisioned.
 */
export type DotNetComponentProvisioningState = string;

export function dotNetComponentConfigurationPropertyArraySerializer(
  result: Array<DotNetComponentConfigurationProperty>,
): any[] {
  return result.map((item) => {
    return dotNetComponentConfigurationPropertySerializer(item);
  });
}

export function dotNetComponentConfigurationPropertyArrayDeserializer(
  result: Array<DotNetComponentConfigurationProperty>,
): any[] {
  return result.map((item) => {
    return dotNetComponentConfigurationPropertyDeserializer(item);
  });
}

/** Configuration properties for a .NET Component */
export interface DotNetComponentConfigurationProperty {
  /** The name of the property */
  propertyName?: string;
  /** The value of the property */
  value?: string;
}

export function dotNetComponentConfigurationPropertySerializer(
  item: DotNetComponentConfigurationProperty,
): any {
  return { propertyName: item["propertyName"], value: item["value"] };
}

export function dotNetComponentConfigurationPropertyDeserializer(
  item: any,
): DotNetComponentConfigurationProperty {
  return {
    propertyName: item["propertyName"],
    value: item["value"],
  };
}

export function dotNetComponentServiceBindArraySerializer(
  result: Array<DotNetComponentServiceBind>,
): any[] {
  return result.map((item) => {
    return dotNetComponentServiceBindSerializer(item);
  });
}

export function dotNetComponentServiceBindArrayDeserializer(
  result: Array<DotNetComponentServiceBind>,
): any[] {
  return result.map((item) => {
    return dotNetComponentServiceBindDeserializer(item);
  });
}

/** Configuration to bind a .NET Component to another .NET Component */
export interface DotNetComponentServiceBind {
  /** Name of the service bind */
  name?: string;
  /** Resource id of the target service */
  serviceId?: string;
}

export function dotNetComponentServiceBindSerializer(item: DotNetComponentServiceBind): any {
  return { name: item["name"], serviceId: item["serviceId"] };
}

export function dotNetComponentServiceBindDeserializer(item: any): DotNetComponentServiceBind {
  return {
    name: item["name"],
    serviceId: item["serviceId"],
  };
}

/** .NET Components ARM resource. */
export interface _DotNetComponentsCollection {
  /** The DotNetComponent items on this page */
  value: DotNetComponent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dotNetComponentsCollectionDeserializer(item: any): _DotNetComponentsCollection {
  return {
    value: dotNetComponentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dotNetComponentArraySerializer(result: Array<DotNetComponent>): any[] {
  return result.map((item) => {
    return dotNetComponentSerializer(item);
  });
}

export function dotNetComponentArrayDeserializer(result: Array<DotNetComponent>): any[] {
  return result.map((item) => {
    return dotNetComponentDeserializer(item);
  });
}

/** Java Component. */
export interface JavaComponent extends ProxyResource {
  /** Java Component resource specific properties */
  properties?: JavaComponentPropertiesUnion;
}

export function javaComponentSerializer(item: JavaComponent): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : javaComponentPropertiesUnionSerializer(item["properties"]),
  };
}

export function javaComponentDeserializer(item: any): JavaComponent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : javaComponentPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Java Component common properties. */
export interface JavaComponentProperties {
  /** Type of the Java Component. */
  /** The discriminator possible values: SpringBootAdmin, SpringCloudEureka, SpringCloudConfig */
  componentType: JavaComponentType;
  /** Provisioning state of the Java Component. */
  readonly provisioningState?: JavaComponentProvisioningState;
  /** List of Java Components configuration properties */
  configurations?: JavaComponentConfigurationProperty[];
  /** Java component scaling configurations */
  scale?: JavaComponentPropertiesScale;
  /** List of Java Components that are bound to the Java component */
  serviceBinds?: JavaComponentServiceBind[];
}

export function javaComponentPropertiesSerializer(item: JavaComponentProperties): any {
  return {
    componentType: item["componentType"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArraySerializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleSerializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArraySerializer(item["serviceBinds"]),
  };
}

export function javaComponentPropertiesDeserializer(item: any): JavaComponentProperties {
  return {
    componentType: item["componentType"],
    provisioningState: item["provisioningState"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArrayDeserializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleDeserializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArrayDeserializer(item["serviceBinds"]),
  };
}

/** Alias for JavaComponentPropertiesUnion */
export type JavaComponentPropertiesUnion =
  | SpringBootAdminComponent
  | SpringCloudEurekaComponent
  | SpringCloudConfigComponent
  | JavaComponentProperties;

export function javaComponentPropertiesUnionSerializer(item: JavaComponentPropertiesUnion): any {
  switch (item.componentType) {
    case "SpringBootAdmin":
      return springBootAdminComponentSerializer(item as SpringBootAdminComponent);

    case "SpringCloudEureka":
      return springCloudEurekaComponentSerializer(item as SpringCloudEurekaComponent);

    case "SpringCloudConfig":
      return springCloudConfigComponentSerializer(item as SpringCloudConfigComponent);

    default:
      return javaComponentPropertiesSerializer(item);
  }
}

export function javaComponentPropertiesUnionDeserializer(item: any): JavaComponentPropertiesUnion {
  switch (item["componentType"]) {
    case "SpringBootAdmin":
      return springBootAdminComponentDeserializer(item as SpringBootAdminComponent);

    case "SpringCloudEureka":
      return springCloudEurekaComponentDeserializer(item as SpringCloudEurekaComponent);

    case "SpringCloudConfig":
      return springCloudConfigComponentDeserializer(item as SpringCloudConfigComponent);

    default:
      return javaComponentPropertiesDeserializer(item);
  }
}

/** Type of the Java Component. */
export enum KnownJavaComponentType {
  /** SpringBootAdmin */
  SpringBootAdmin = "SpringBootAdmin",
  /** SpringCloudEureka */
  SpringCloudEureka = "SpringCloudEureka",
  /** SpringCloudConfig */
  SpringCloudConfig = "SpringCloudConfig",
}

/**
 * Type of the Java Component. \
 * {@link KnownJavaComponentType} can be used interchangeably with JavaComponentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SpringBootAdmin**: SpringBootAdmin \
 * **SpringCloudEureka**: SpringCloudEureka \
 * **SpringCloudConfig**: SpringCloudConfig
 */
export type JavaComponentType = string;

/** Provisioning state of the Java Component. */
export enum KnownJavaComponentProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * Provisioning state of the Java Component. \
 * {@link KnownJavaComponentProvisioningState} can be used interchangeably with JavaComponentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting \
 * **InProgress**: InProgress
 */
export type JavaComponentProvisioningState = string;

export function javaComponentConfigurationPropertyArraySerializer(
  result: Array<JavaComponentConfigurationProperty>,
): any[] {
  return result.map((item) => {
    return javaComponentConfigurationPropertySerializer(item);
  });
}

export function javaComponentConfigurationPropertyArrayDeserializer(
  result: Array<JavaComponentConfigurationProperty>,
): any[] {
  return result.map((item) => {
    return javaComponentConfigurationPropertyDeserializer(item);
  });
}

/** Configuration properties for a Java Component */
export interface JavaComponentConfigurationProperty {
  /** The name of the property */
  propertyName?: string;
  /** The value of the property */
  value?: string;
}

export function javaComponentConfigurationPropertySerializer(
  item: JavaComponentConfigurationProperty,
): any {
  return { propertyName: item["propertyName"], value: item["value"] };
}

export function javaComponentConfigurationPropertyDeserializer(
  item: any,
): JavaComponentConfigurationProperty {
  return {
    propertyName: item["propertyName"],
    value: item["value"],
  };
}

/** Java component scaling configurations */
export interface JavaComponentPropertiesScale {
  /** Optional. Minimum number of Java component replicas. Defaults to 1 if not set */
  minReplicas?: number;
  /** Optional. Maximum number of Java component replicas */
  maxReplicas?: number;
}

export function javaComponentPropertiesScaleSerializer(item: JavaComponentPropertiesScale): any {
  return { minReplicas: item["minReplicas"], maxReplicas: item["maxReplicas"] };
}

export function javaComponentPropertiesScaleDeserializer(item: any): JavaComponentPropertiesScale {
  return {
    minReplicas: item["minReplicas"],
    maxReplicas: item["maxReplicas"],
  };
}

export function javaComponentServiceBindArraySerializer(
  result: Array<JavaComponentServiceBind>,
): any[] {
  return result.map((item) => {
    return javaComponentServiceBindSerializer(item);
  });
}

export function javaComponentServiceBindArrayDeserializer(
  result: Array<JavaComponentServiceBind>,
): any[] {
  return result.map((item) => {
    return javaComponentServiceBindDeserializer(item);
  });
}

/** Configuration to bind a Java Component to another Java Component */
export interface JavaComponentServiceBind {
  /** Name of the service bind */
  name?: string;
  /** Resource id of the target service */
  serviceId?: string;
}

export function javaComponentServiceBindSerializer(item: JavaComponentServiceBind): any {
  return { name: item["name"], serviceId: item["serviceId"] };
}

export function javaComponentServiceBindDeserializer(item: any): JavaComponentServiceBind {
  return {
    name: item["name"],
    serviceId: item["serviceId"],
  };
}

/** Spring Boot Admin properties. */
export interface SpringBootAdminComponent extends JavaComponentProperties {
  /** Java Component Ingress configurations. */
  ingress?: JavaComponentIngress;
  /** Type of the Java Component. */
  componentType: "SpringBootAdmin";
}

export function springBootAdminComponentSerializer(item: SpringBootAdminComponent): any {
  return {
    componentType: item["componentType"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArraySerializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleSerializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArraySerializer(item["serviceBinds"]),
    ingress: !item["ingress"] ? item["ingress"] : javaComponentIngressSerializer(item["ingress"]),
  };
}

export function springBootAdminComponentDeserializer(item: any): SpringBootAdminComponent {
  return {
    componentType: item["componentType"],
    provisioningState: item["provisioningState"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArrayDeserializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleDeserializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArrayDeserializer(item["serviceBinds"]),
    ingress: !item["ingress"] ? item["ingress"] : javaComponentIngressDeserializer(item["ingress"]),
  };
}

/** Container App Ingress configuration. */
export interface JavaComponentIngress {
  /** Hostname of the Java Component endpoint */
  readonly fqdn?: string;
}

export function javaComponentIngressSerializer(_item: JavaComponentIngress): any {
  return {};
}

export function javaComponentIngressDeserializer(item: any): JavaComponentIngress {
  return {
    fqdn: item["fqdn"],
  };
}

/** Spring Cloud Eureka properties. */
export interface SpringCloudEurekaComponent extends JavaComponentProperties {
  /** Java Component Ingress configurations. */
  ingress?: JavaComponentIngress;
  /** Type of the Java Component. */
  componentType: "SpringCloudEureka";
}

export function springCloudEurekaComponentSerializer(item: SpringCloudEurekaComponent): any {
  return {
    componentType: item["componentType"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArraySerializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleSerializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArraySerializer(item["serviceBinds"]),
    ingress: !item["ingress"] ? item["ingress"] : javaComponentIngressSerializer(item["ingress"]),
  };
}

export function springCloudEurekaComponentDeserializer(item: any): SpringCloudEurekaComponent {
  return {
    componentType: item["componentType"],
    provisioningState: item["provisioningState"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArrayDeserializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleDeserializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArrayDeserializer(item["serviceBinds"]),
    ingress: !item["ingress"] ? item["ingress"] : javaComponentIngressDeserializer(item["ingress"]),
  };
}

/** Spring Cloud Config properties. */
export interface SpringCloudConfigComponent extends JavaComponentProperties {
  /** Type of the Java Component. */
  componentType: "SpringCloudConfig";
}

export function springCloudConfigComponentSerializer(item: SpringCloudConfigComponent): any {
  return {
    componentType: item["componentType"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArraySerializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleSerializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArraySerializer(item["serviceBinds"]),
  };
}

export function springCloudConfigComponentDeserializer(item: any): SpringCloudConfigComponent {
  return {
    componentType: item["componentType"],
    provisioningState: item["provisioningState"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : javaComponentConfigurationPropertyArrayDeserializer(item["configurations"]),
    scale: !item["scale"] ? item["scale"] : javaComponentPropertiesScaleDeserializer(item["scale"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : javaComponentServiceBindArrayDeserializer(item["serviceBinds"]),
  };
}

/** Java Components ARM resource. */
export interface _JavaComponentsCollection {
  /** The JavaComponent items on this page */
  value: JavaComponent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _javaComponentsCollectionDeserializer(item: any): _JavaComponentsCollection {
  return {
    value: javaComponentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function javaComponentArraySerializer(result: Array<JavaComponent>): any[] {
  return result.map((item) => {
    return javaComponentSerializer(item);
  });
}

export function javaComponentArrayDeserializer(result: Array<JavaComponent>): any[] {
  return result.map((item) => {
    return javaComponentDeserializer(item);
  });
}

/** A logic app extension resource */
export interface LogicApp extends ProxyResource {}

export function logicAppSerializer(_item: LogicApp): any {
  return {};
}

export function logicAppDeserializer(item: any): LogicApp {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Schema for the workflow object. */
export interface WorkflowEnvelope extends ProxyResource {
  /** Additional workflow properties. */
  properties?: WorkflowEnvelopeProperties;
  /** Gets the logic app hybrid workflow kind. */
  kind?: WorkflowKind;
}

export function workflowEnvelopeDeserializer(item: any): WorkflowEnvelope {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workflowEnvelopePropertiesDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** Additional workflow properties. */
export interface WorkflowEnvelopeProperties {
  /** Gets or sets the files. */
  files?: any;
  /** Gets or sets the state of the workflow. */
  flowState?: WorkflowState;
  /** Gets or sets workflow health. */
  health?: WorkflowHealth;
}

export function workflowEnvelopePropertiesDeserializer(item: any): WorkflowEnvelopeProperties {
  return {
    files: item["files"],
    flowState: item["flowState"],
    health: !item["health"] ? item["health"] : workflowHealthDeserializer(item["health"]),
  };
}

/** The workflow state. */
export enum KnownWorkflowState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Completed */
  Completed = "Completed",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
  /** Suspended */
  Suspended = "Suspended",
}

/**
 * The workflow state. \
 * {@link KnownWorkflowState} can be used interchangeably with WorkflowState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Completed**: Completed \
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **Deleted**: Deleted \
 * **Suspended**: Suspended
 */
export type WorkflowState = string;

/** Represents the workflow health. */
export interface WorkflowHealth {
  /** Gets or sets the workflow health state. */
  state: WorkflowHealthState;
  /** Gets or sets the workflow error. */
  error?: ErrorEntity;
}

export function workflowHealthDeserializer(item: any): WorkflowHealth {
  return {
    state: item["state"],
    error: !item["error"] ? item["error"] : errorEntityDeserializer(item["error"]),
  };
}

/** Gets or sets the workflow health state. */
export type WorkflowHealthState = "NotSpecified" | "Healthy" | "Unhealthy" | "Unknown";

/** Body of the error response returned from the API. */
export interface ErrorEntity {
  /** Type of error. */
  extendedCode?: string;
  /** Message template. */
  messageTemplate?: string;
  /** Parameters for the template. */
  parameters?: string[];
  /** Inner errors. */
  innerErrors?: ErrorEntity[];
  /** Error Details. */
  details?: ErrorEntity[];
  /** The error target. */
  target?: string;
  /** Basic error code. */
  code?: string;
  /** Any details of the error. */
  message?: string;
}

export function errorEntityDeserializer(item: any): ErrorEntity {
  return {
    extendedCode: item["extendedCode"],
    messageTemplate: item["messageTemplate"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : item["parameters"].map((p: any) => {
          return p;
        }),
    innerErrors: !item["innerErrors"]
      ? item["innerErrors"]
      : errorEntityArrayDeserializer(item["innerErrors"]),
    details: !item["details"] ? item["details"] : errorEntityArrayDeserializer(item["details"]),
    target: item["target"],
    code: item["code"],
    message: item["message"],
  };
}

export function errorEntityArrayDeserializer(result: Array<ErrorEntity>): any[] {
  return result.map((item) => {
    return errorEntityDeserializer(item);
  });
}

/** Gets the logic app hybrid workflow kind. */
export enum KnownWorkflowKind {
  /** Stateful */
  Stateful = "Stateful",
  /** Stateless */
  Stateless = "Stateless",
  /** Agentic */
  Agentic = "Agentic",
}

/**
 * Gets the logic app hybrid workflow kind. \
 * {@link KnownWorkflowKind} can be used interchangeably with WorkflowKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stateful**: Stateful \
 * **Stateless**: Stateless \
 * **Agentic**: Agentic
 */
export type WorkflowKind = string;

/** Collection of workflow information elements. */
export interface _WorkflowEnvelopeCollection {
  /** The WorkflowEnvelope items on this page */
  value: WorkflowEnvelope[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowEnvelopeCollectionDeserializer(item: any): _WorkflowEnvelopeCollection {
  return {
    value: workflowEnvelopeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowEnvelopeArrayDeserializer(result: Array<WorkflowEnvelope>): any[] {
  return result.map((item) => {
    return workflowEnvelopeDeserializer(item);
  });
}

/** Configuration settings for the Azure ContainerApp Service Authentication / Authorization feature. */
export interface AuthConfig extends ProxyResource {
  /** The configuration settings of the platform of ContainerApp Service Authentication/Authorization. */
  platform?: AuthPlatform;
  /** The configuration settings that determines the validation flow of users using  Service Authentication/Authorization. */
  globalValidation?: GlobalValidation;
  /** The configuration settings of each of the identity providers used to configure ContainerApp Service Authentication/Authorization. */
  identityProviders?: IdentityProviders;
  /** The configuration settings of the login flow of users using ContainerApp Service Authentication/Authorization. */
  login?: Login;
  /** The configuration settings of the HTTP requests for authentication and authorization requests made against ContainerApp Service Authentication/Authorization. */
  httpSettings?: HttpSettings;
  /** The configuration settings of the secrets references of encryption key and signing key for ContainerApp Service Authentication/Authorization. */
  encryptionSettings?: EncryptionSettings;
}

export function authConfigSerializer(item: AuthConfig): any {
  return {
    properties: areAllPropsUndefined(item, [
      "platform",
      "globalValidation",
      "identityProviders",
      "login",
      "httpSettings",
      "encryptionSettings",
    ])
      ? undefined
      : _authConfigPropertiesSerializer(item),
  };
}

export function authConfigDeserializer(item: any): AuthConfig {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _authConfigPropertiesDeserializer(item["properties"])),
  };
}

/** AuthConfig resource specific properties */
export interface AuthConfigProperties {
  /** The configuration settings of the platform of ContainerApp Service Authentication/Authorization. */
  platform?: AuthPlatform;
  /** The configuration settings that determines the validation flow of users using  Service Authentication/Authorization. */
  globalValidation?: GlobalValidation;
  /** The configuration settings of each of the identity providers used to configure ContainerApp Service Authentication/Authorization. */
  identityProviders?: IdentityProviders;
  /** The configuration settings of the login flow of users using ContainerApp Service Authentication/Authorization. */
  login?: Login;
  /** The configuration settings of the HTTP requests for authentication and authorization requests made against ContainerApp Service Authentication/Authorization. */
  httpSettings?: HttpSettings;
  /** The configuration settings of the secrets references of encryption key and signing key for ContainerApp Service Authentication/Authorization. */
  encryptionSettings?: EncryptionSettings;
}

export function authConfigPropertiesSerializer(item: AuthConfigProperties): any {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformSerializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationSerializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersSerializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginSerializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsSerializer(item["httpSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsSerializer(item["encryptionSettings"]),
  };
}

export function authConfigPropertiesDeserializer(item: any): AuthConfigProperties {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformDeserializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationDeserializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersDeserializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginDeserializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsDeserializer(item["httpSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsDeserializer(item["encryptionSettings"]),
  };
}

/** The configuration settings of the platform of ContainerApp Service Authentication/Authorization. */
export interface AuthPlatform {
  /** <code>true</code> if the Authentication / Authorization feature is enabled for the current app; otherwise, <code>false</code>. */
  enabled?: boolean;
  /**
   * The RuntimeVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of certain features in the Authentication / Authorization module.
   */
  runtimeVersion?: string;
}

export function authPlatformSerializer(item: AuthPlatform): any {
  return { enabled: item["enabled"], runtimeVersion: item["runtimeVersion"] };
}

export function authPlatformDeserializer(item: any): AuthPlatform {
  return {
    enabled: item["enabled"],
    runtimeVersion: item["runtimeVersion"],
  };
}

/** The configuration settings that determines the validation flow of users using ContainerApp Service Authentication/Authorization. */
export interface GlobalValidation {
  /** The action to take when an unauthenticated client attempts to access the app. */
  unauthenticatedClientAction?: UnauthenticatedClientActionV2;
  /**
   * The default authentication provider to use when multiple providers are configured.
   * This setting is only needed if multiple providers are configured and the unauthenticated client
   * action is set to "RedirectToLoginPage".
   */
  redirectToProvider?: string;
  /** The paths for which unauthenticated flow would not be redirected to the login page. */
  excludedPaths?: string[];
}

export function globalValidationSerializer(item: GlobalValidation): any {
  return {
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    redirectToProvider: item["redirectToProvider"],
    excludedPaths: !item["excludedPaths"]
      ? item["excludedPaths"]
      : item["excludedPaths"].map((p: any) => {
          return p;
        }),
  };
}

export function globalValidationDeserializer(item: any): GlobalValidation {
  return {
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    redirectToProvider: item["redirectToProvider"],
    excludedPaths: !item["excludedPaths"]
      ? item["excludedPaths"]
      : item["excludedPaths"].map((p: any) => {
          return p;
        }),
  };
}

/** The action to take when an unauthenticated client attempts to access the app. */
export type UnauthenticatedClientActionV2 =
  "RedirectToLoginPage" | "AllowAnonymous" | "Return401" | "Return403";

/** The configuration settings of each of the identity providers used to configure ContainerApp Service Authentication/Authorization. */
export interface IdentityProviders {
  /** The configuration settings of the Azure Active directory provider. */
  azureActiveDirectory?: AzureActiveDirectory;
  /** The configuration settings of the Facebook provider. */
  facebook?: Facebook;
  /** The configuration settings of the GitHub provider. */
  gitHub?: GitHub;
  /** The configuration settings of the Google provider. */
  google?: Google;
  /** The configuration settings of the Twitter provider. */
  twitter?: Twitter;
  /** The configuration settings of the Apple provider. */
  apple?: Apple;
  /** The configuration settings of the Azure Static Web Apps provider. */
  azureStaticWebApps?: AzureStaticWebApps;
  /**
   * The map of the name of the alias of each custom Open ID Connect provider to the
   * configuration settings of the custom Open ID Connect provider.
   */
  customOpenIdConnectProviders?: Record<string, CustomOpenIdConnectProvider>;
}

export function identityProvidersSerializer(item: IdentityProviders): any {
  return {
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectorySerializer(item["azureActiveDirectory"]),
    facebook: !item["facebook"] ? item["facebook"] : facebookSerializer(item["facebook"]),
    gitHub: !item["gitHub"] ? item["gitHub"] : gitHubSerializer(item["gitHub"]),
    google: !item["google"] ? item["google"] : googleSerializer(item["google"]),
    twitter: !item["twitter"] ? item["twitter"] : twitterSerializer(item["twitter"]),
    apple: !item["apple"] ? item["apple"] : appleSerializer(item["apple"]),
    azureStaticWebApps: !item["azureStaticWebApps"]
      ? item["azureStaticWebApps"]
      : azureStaticWebAppsSerializer(item["azureStaticWebApps"]),
    customOpenIdConnectProviders: !item["customOpenIdConnectProviders"]
      ? item["customOpenIdConnectProviders"]
      : customOpenIdConnectProviderRecordSerializer(item["customOpenIdConnectProviders"]),
  };
}

export function identityProvidersDeserializer(item: any): IdentityProviders {
  return {
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectoryDeserializer(item["azureActiveDirectory"]),
    facebook: !item["facebook"] ? item["facebook"] : facebookDeserializer(item["facebook"]),
    gitHub: !item["gitHub"] ? item["gitHub"] : gitHubDeserializer(item["gitHub"]),
    google: !item["google"] ? item["google"] : googleDeserializer(item["google"]),
    twitter: !item["twitter"] ? item["twitter"] : twitterDeserializer(item["twitter"]),
    apple: !item["apple"] ? item["apple"] : appleDeserializer(item["apple"]),
    azureStaticWebApps: !item["azureStaticWebApps"]
      ? item["azureStaticWebApps"]
      : azureStaticWebAppsDeserializer(item["azureStaticWebApps"]),
    customOpenIdConnectProviders: !item["customOpenIdConnectProviders"]
      ? item["customOpenIdConnectProviders"]
      : customOpenIdConnectProviderRecordDeserializer(item["customOpenIdConnectProviders"]),
  };
}

/** The configuration settings of the Azure Active directory provider. */
export interface AzureActiveDirectory {
  /** <code>false</code> if the Azure Active Directory provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Active Directory app registration. */
  registration?: AzureActiveDirectoryRegistration;
  /** The configuration settings of the Azure Active Directory login flow. */
  login?: AzureActiveDirectoryLogin;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AzureActiveDirectoryValidation;
  /**
   * Gets a value indicating whether the Azure AD configuration was auto-provisioned using 1st party tooling.
   * This is an internal flag primarily intended to support the Azure Management Portal. Users should not
   * read or write to this property.
   */
  isAutoProvisioned?: boolean;
}

export function azureActiveDirectorySerializer(item: AzureActiveDirectory): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureActiveDirectoryRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : azureActiveDirectoryLoginSerializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : azureActiveDirectoryValidationSerializer(item["validation"]),
    isAutoProvisioned: item["isAutoProvisioned"],
  };
}

export function azureActiveDirectoryDeserializer(item: any): AzureActiveDirectory {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureActiveDirectoryRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : azureActiveDirectoryLoginDeserializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : azureActiveDirectoryValidationDeserializer(item["validation"]),
    isAutoProvisioned: item["isAutoProvisioned"],
  };
}

/** The configuration settings of the Azure Active Directory app registration. */
export interface AzureActiveDirectoryRegistration {
  /**
   * The OpenID Connect Issuer URI that represents the entity which issues access tokens for this application.
   * When using Azure Active Directory, this value is the URI of the directory tenant, e.g. https://login.microsoftonline.com/v2.0/{tenant-guid}/.
   * This URI is a case-sensitive identifier for the token issuer.
   * More information on OpenID Connect Discovery: http://openid.net/specs/openid-connect-discovery-1_0.html
   */
  openIdIssuer?: string;
  /**
   * The Client ID of this relying party application, known as the client_id.
   * This setting is required for enabling OpenID Connection authentication with Azure Active Directory or
   * other 3rd party OpenID Connect providers.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientId?: string;
  /** The app setting name that contains the client secret of the relying party application. */
  clientSecretSettingName?: string;
  /**
   * An alternative to the client secret, that is the thumbprint of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret. It is also optional.
   */
  clientSecretCertificateThumbprint?: string;
  /**
   * An alternative to the client secret thumbprint, that is the subject alternative name of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret Certificate Thumbprint. It is also optional.
   */
  clientSecretCertificateSubjectAlternativeName?: string;
  /**
   * An alternative to the client secret thumbprint, that is the issuer of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret Certificate Thumbprint. It is also optional.
   */
  clientSecretCertificateIssuer?: string;
}

export function azureActiveDirectoryRegistrationSerializer(
  item: AzureActiveDirectoryRegistration,
): any {
  return {
    openIdIssuer: item["openIdIssuer"],
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    clientSecretCertificateSubjectAlternativeName:
      item["clientSecretCertificateSubjectAlternativeName"],
    clientSecretCertificateIssuer: item["clientSecretCertificateIssuer"],
  };
}

export function azureActiveDirectoryRegistrationDeserializer(
  item: any,
): AzureActiveDirectoryRegistration {
  return {
    openIdIssuer: item["openIdIssuer"],
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    clientSecretCertificateSubjectAlternativeName:
      item["clientSecretCertificateSubjectAlternativeName"],
    clientSecretCertificateIssuer: item["clientSecretCertificateIssuer"],
  };
}

/** The configuration settings of the Azure Active Directory login flow. */
export interface AzureActiveDirectoryLogin {
  /**
   * Login parameters to send to the OpenID Connect authorization endpoint when
   * a user logs in. Each parameter must be in the form "key=value".
   */
  loginParameters?: string[];
  /** <code>true</code> if the www-authenticate provider should be omitted from the request; otherwise, <code>false</code>. */
  disableWWWAuthenticate?: boolean;
}

export function azureActiveDirectoryLoginSerializer(item: AzureActiveDirectoryLogin): any {
  return {
    loginParameters: !item["loginParameters"]
      ? item["loginParameters"]
      : item["loginParameters"].map((p: any) => {
          return p;
        }),
    disableWWWAuthenticate: item["disableWWWAuthenticate"],
  };
}

export function azureActiveDirectoryLoginDeserializer(item: any): AzureActiveDirectoryLogin {
  return {
    loginParameters: !item["loginParameters"]
      ? item["loginParameters"]
      : item["loginParameters"].map((p: any) => {
          return p;
        }),
    disableWWWAuthenticate: item["disableWWWAuthenticate"],
  };
}

/** The configuration settings of the Azure Active Directory token validation flow. */
export interface AzureActiveDirectoryValidation {
  /** The configuration settings of the checks that should be made while validating the JWT Claims. */
  jwtClaimChecks?: JwtClaimChecks;
  /** The list of audiences that can make successful authentication/authorization requests. */
  allowedAudiences?: string[];
  /** The configuration settings of the default authorization policy. */
  defaultAuthorizationPolicy?: DefaultAuthorizationPolicy;
}

export function azureActiveDirectoryValidationSerializer(
  item: AzureActiveDirectoryValidation,
): any {
  return {
    jwtClaimChecks: !item["jwtClaimChecks"]
      ? item["jwtClaimChecks"]
      : jwtClaimChecksSerializer(item["jwtClaimChecks"]),
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    defaultAuthorizationPolicy: !item["defaultAuthorizationPolicy"]
      ? item["defaultAuthorizationPolicy"]
      : defaultAuthorizationPolicySerializer(item["defaultAuthorizationPolicy"]),
  };
}

export function azureActiveDirectoryValidationDeserializer(
  item: any,
): AzureActiveDirectoryValidation {
  return {
    jwtClaimChecks: !item["jwtClaimChecks"]
      ? item["jwtClaimChecks"]
      : jwtClaimChecksDeserializer(item["jwtClaimChecks"]),
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    defaultAuthorizationPolicy: !item["defaultAuthorizationPolicy"]
      ? item["defaultAuthorizationPolicy"]
      : defaultAuthorizationPolicyDeserializer(item["defaultAuthorizationPolicy"]),
  };
}

/** The configuration settings of the checks that should be made while validating the JWT Claims. */
export interface JwtClaimChecks {
  /** The list of the allowed groups. */
  allowedGroups?: string[];
  /** The list of the allowed client applications. */
  allowedClientApplications?: string[];
}

export function jwtClaimChecksSerializer(item: JwtClaimChecks): any {
  return {
    allowedGroups: !item["allowedGroups"]
      ? item["allowedGroups"]
      : item["allowedGroups"].map((p: any) => {
          return p;
        }),
    allowedClientApplications: !item["allowedClientApplications"]
      ? item["allowedClientApplications"]
      : item["allowedClientApplications"].map((p: any) => {
          return p;
        }),
  };
}

export function jwtClaimChecksDeserializer(item: any): JwtClaimChecks {
  return {
    allowedGroups: !item["allowedGroups"]
      ? item["allowedGroups"]
      : item["allowedGroups"].map((p: any) => {
          return p;
        }),
    allowedClientApplications: !item["allowedClientApplications"]
      ? item["allowedClientApplications"]
      : item["allowedClientApplications"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the Azure Active Directory default authorization policy. */
export interface DefaultAuthorizationPolicy {
  /** The configuration settings of the Azure Active Directory allowed principals. */
  allowedPrincipals?: AllowedPrincipals;
  /** The configuration settings of the Azure Active Directory allowed applications. */
  allowedApplications?: string[];
}

export function defaultAuthorizationPolicySerializer(item: DefaultAuthorizationPolicy): any {
  return {
    allowedPrincipals: !item["allowedPrincipals"]
      ? item["allowedPrincipals"]
      : allowedPrincipalsSerializer(item["allowedPrincipals"]),
    allowedApplications: !item["allowedApplications"]
      ? item["allowedApplications"]
      : item["allowedApplications"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultAuthorizationPolicyDeserializer(item: any): DefaultAuthorizationPolicy {
  return {
    allowedPrincipals: !item["allowedPrincipals"]
      ? item["allowedPrincipals"]
      : allowedPrincipalsDeserializer(item["allowedPrincipals"]),
    allowedApplications: !item["allowedApplications"]
      ? item["allowedApplications"]
      : item["allowedApplications"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the Azure Active Directory allowed principals. */
export interface AllowedPrincipals {
  /** The list of the allowed groups. */
  groups?: string[];
  /** The list of the allowed identities. */
  identities?: string[];
}

export function allowedPrincipalsSerializer(item: AllowedPrincipals): any {
  return {
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
    identities: !item["identities"]
      ? item["identities"]
      : item["identities"].map((p: any) => {
          return p;
        }),
  };
}

export function allowedPrincipalsDeserializer(item: any): AllowedPrincipals {
  return {
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
    identities: !item["identities"]
      ? item["identities"]
      : item["identities"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the Facebook provider. */
export interface Facebook {
  /** <code>false</code> if the Facebook provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Facebook provider. */
  registration?: AppRegistration;
  /** The version of the Facebook api to be used while logging in. */
  graphApiVersion?: string;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

export function facebookSerializer(item: Facebook): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appRegistrationSerializer(item["registration"]),
    graphApiVersion: item["graphApiVersion"],
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
  };
}

export function facebookDeserializer(item: any): Facebook {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appRegistrationDeserializer(item["registration"]),
    graphApiVersion: item["graphApiVersion"],
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
  };
}

/** The configuration settings of the app registration for providers that have app ids and app secrets */
export interface AppRegistration {
  /** The App ID of the app used for login. */
  appId?: string;
  /** The app setting name that contains the app secret. */
  appSecretSettingName?: string;
}

export function appRegistrationSerializer(item: AppRegistration): any {
  return { appId: item["appId"], appSecretSettingName: item["appSecretSettingName"] };
}

export function appRegistrationDeserializer(item: any): AppRegistration {
  return {
    appId: item["appId"],
    appSecretSettingName: item["appSecretSettingName"],
  };
}

/** The configuration settings of the login flow, including the scopes that should be requested. */
export interface LoginScopes {
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: string[];
}

export function loginScopesSerializer(item: LoginScopes): any {
  return {
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function loginScopesDeserializer(item: any): LoginScopes {
  return {
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the GitHub provider. */
export interface GitHub {
  /** <code>false</code> if the GitHub provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the GitHub provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

export function gitHubSerializer(item: GitHub): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
  };
}

export function gitHubDeserializer(item: any): GitHub {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
  };
}

/** The configuration settings of the app registration for providers that have client ids and client secrets */
export interface ClientRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

export function clientRegistrationSerializer(item: ClientRegistration): any {
  return { clientId: item["clientId"], clientSecretSettingName: item["clientSecretSettingName"] };
}

export function clientRegistrationDeserializer(item: any): ClientRegistration {
  return {
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
  };
}

/** The configuration settings of the Google provider. */
export interface Google {
  /** <code>false</code> if the Google provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Google provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AllowedAudiencesValidation;
}

export function googleSerializer(item: Google): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : allowedAudiencesValidationSerializer(item["validation"]),
  };
}

export function googleDeserializer(item: any): Google {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : allowedAudiencesValidationDeserializer(item["validation"]),
  };
}

/** The configuration settings of the Allowed Audiences validation flow. */
export interface AllowedAudiencesValidation {
  /** The configuration settings of the allowed list of audiences from which to validate the JWT token. */
  allowedAudiences?: string[];
}

export function allowedAudiencesValidationSerializer(item: AllowedAudiencesValidation): any {
  return {
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
  };
}

export function allowedAudiencesValidationDeserializer(item: any): AllowedAudiencesValidation {
  return {
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the Twitter provider. */
export interface Twitter {
  /** <code>false</code> if the Twitter provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Twitter provider. */
  registration?: TwitterRegistration;
}

export function twitterSerializer(item: Twitter): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : twitterRegistrationSerializer(item["registration"]),
  };
}

export function twitterDeserializer(item: any): Twitter {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : twitterRegistrationDeserializer(item["registration"]),
  };
}

/** The configuration settings of the app registration for the Twitter provider. */
export interface TwitterRegistration {
  /**
   * The OAuth 1.0a consumer key of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  consumerKey?: string;
  /**
   * The app setting name that contains the OAuth 1.0a consumer secret of the Twitter
   * application used for sign-in.
   */
  consumerSecretSettingName?: string;
}

export function twitterRegistrationSerializer(item: TwitterRegistration): any {
  return {
    consumerKey: item["consumerKey"],
    consumerSecretSettingName: item["consumerSecretSettingName"],
  };
}

export function twitterRegistrationDeserializer(item: any): TwitterRegistration {
  return {
    consumerKey: item["consumerKey"],
    consumerSecretSettingName: item["consumerSecretSettingName"],
  };
}

/** The configuration settings of the Apple provider. */
export interface Apple {
  /** <code>false</code> if the Apple provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Apple registration. */
  registration?: AppleRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

export function appleSerializer(item: Apple): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appleRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
  };
}

export function appleDeserializer(item: any): Apple {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appleRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
  };
}

/** The configuration settings of the registration for the Apple provider */
export interface AppleRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

export function appleRegistrationSerializer(item: AppleRegistration): any {
  return { clientId: item["clientId"], clientSecretSettingName: item["clientSecretSettingName"] };
}

export function appleRegistrationDeserializer(item: any): AppleRegistration {
  return {
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
  };
}

/** The configuration settings of the Azure Static Web Apps provider. */
export interface AzureStaticWebApps {
  /** <code>false</code> if the Azure Static Web Apps provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Static Web Apps registration. */
  registration?: AzureStaticWebAppsRegistration;
}

export function azureStaticWebAppsSerializer(item: AzureStaticWebApps): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureStaticWebAppsRegistrationSerializer(item["registration"]),
  };
}

export function azureStaticWebAppsDeserializer(item: any): AzureStaticWebApps {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureStaticWebAppsRegistrationDeserializer(item["registration"]),
  };
}

/** The configuration settings of the registration for the Azure Static Web Apps provider */
export interface AzureStaticWebAppsRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
}

export function azureStaticWebAppsRegistrationSerializer(
  item: AzureStaticWebAppsRegistration,
): any {
  return { clientId: item["clientId"] };
}

export function azureStaticWebAppsRegistrationDeserializer(
  item: any,
): AzureStaticWebAppsRegistration {
  return {
    clientId: item["clientId"],
  };
}

export function customOpenIdConnectProviderRecordSerializer(
  item: Record<string, CustomOpenIdConnectProvider>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : customOpenIdConnectProviderSerializer(item[key]);
  });
  return result;
}

export function customOpenIdConnectProviderRecordDeserializer(
  item: Record<string, any>,
): Record<string, CustomOpenIdConnectProvider> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : customOpenIdConnectProviderDeserializer(item[key]);
  });
  return result;
}

/** The configuration settings of the custom Open ID Connect provider. */
export interface CustomOpenIdConnectProvider {
  /** <code>false</code> if the custom Open ID provider provider should not be enabled; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the custom Open ID Connect provider. */
  registration?: OpenIdConnectRegistration;
  /** The configuration settings of the login flow of the custom Open ID Connect provider. */
  login?: OpenIdConnectLogin;
}

export function customOpenIdConnectProviderSerializer(item: CustomOpenIdConnectProvider): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : openIdConnectRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : openIdConnectLoginSerializer(item["login"]),
  };
}

export function customOpenIdConnectProviderDeserializer(item: any): CustomOpenIdConnectProvider {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : openIdConnectRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : openIdConnectLoginDeserializer(item["login"]),
  };
}

/** The configuration settings of the app registration for the custom Open ID Connect provider. */
export interface OpenIdConnectRegistration {
  /** The client id of the custom Open ID Connect provider. */
  clientId?: string;
  /** The authentication credentials of the custom Open ID Connect provider. */
  clientCredential?: OpenIdConnectClientCredential;
  /** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
  openIdConnectConfiguration?: OpenIdConnectConfig;
}

export function openIdConnectRegistrationSerializer(item: OpenIdConnectRegistration): any {
  return {
    clientId: item["clientId"],
    clientCredential: !item["clientCredential"]
      ? item["clientCredential"]
      : openIdConnectClientCredentialSerializer(item["clientCredential"]),
    openIdConnectConfiguration: !item["openIdConnectConfiguration"]
      ? item["openIdConnectConfiguration"]
      : openIdConnectConfigSerializer(item["openIdConnectConfiguration"]),
  };
}

export function openIdConnectRegistrationDeserializer(item: any): OpenIdConnectRegistration {
  return {
    clientId: item["clientId"],
    clientCredential: !item["clientCredential"]
      ? item["clientCredential"]
      : openIdConnectClientCredentialDeserializer(item["clientCredential"]),
    openIdConnectConfiguration: !item["openIdConnectConfiguration"]
      ? item["openIdConnectConfiguration"]
      : openIdConnectConfigDeserializer(item["openIdConnectConfiguration"]),
  };
}

/** The authentication client credentials of the custom Open ID Connect provider. */
export interface OpenIdConnectClientCredential {
  /** The method that should be used to authenticate the user. */
  method?: "ClientSecretPost";
  /** The app setting that contains the client secret for the custom Open ID Connect provider. */
  clientSecretSettingName?: string;
}

export function openIdConnectClientCredentialSerializer(item: OpenIdConnectClientCredential): any {
  return { method: item["method"], clientSecretSettingName: item["clientSecretSettingName"] };
}

export function openIdConnectClientCredentialDeserializer(
  item: any,
): OpenIdConnectClientCredential {
  return {
    method: item["method"],
    clientSecretSettingName: item["clientSecretSettingName"],
  };
}

/** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
export interface OpenIdConnectConfig {
  /** The endpoint to be used to make an authorization request. */
  authorizationEndpoint?: string;
  /** The endpoint to be used to request a token. */
  tokenEndpoint?: string;
  /** The endpoint that issues the token. */
  issuer?: string;
  /** The endpoint that provides the keys necessary to validate the token. */
  certificationUri?: string;
  /** The endpoint that contains all the configuration endpoints for the provider. */
  wellKnownOpenIdConfiguration?: string;
}

export function openIdConnectConfigSerializer(item: OpenIdConnectConfig): any {
  return {
    authorizationEndpoint: item["authorizationEndpoint"],
    tokenEndpoint: item["tokenEndpoint"],
    issuer: item["issuer"],
    certificationUri: item["certificationUri"],
    wellKnownOpenIdConfiguration: item["wellKnownOpenIdConfiguration"],
  };
}

export function openIdConnectConfigDeserializer(item: any): OpenIdConnectConfig {
  return {
    authorizationEndpoint: item["authorizationEndpoint"],
    tokenEndpoint: item["tokenEndpoint"],
    issuer: item["issuer"],
    certificationUri: item["certificationUri"],
    wellKnownOpenIdConfiguration: item["wellKnownOpenIdConfiguration"],
  };
}

/** The configuration settings of the login flow of the custom Open ID Connect provider. */
export interface OpenIdConnectLogin {
  /** The name of the claim that contains the users name. */
  nameClaimType?: string;
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: string[];
}

export function openIdConnectLoginSerializer(item: OpenIdConnectLogin): any {
  return {
    nameClaimType: item["nameClaimType"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function openIdConnectLoginDeserializer(item: any): OpenIdConnectLogin {
  return {
    nameClaimType: item["nameClaimType"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the login flow of users using ContainerApp Service Authentication/Authorization. */
export interface Login {
  /** The routes that specify the endpoints used for login and logout requests. */
  routes?: LoginRoutes;
  /** The configuration settings of the token store. */
  tokenStore?: TokenStore;
  /** <code>true</code> if the fragments from the request are preserved after the login request is made; otherwise, <code>false</code>. */
  preserveUrlFragmentsForLogins?: boolean;
  /**
   * External URLs that can be redirected to as part of logging in or logging out of the app. Note that the query string part of the URL is ignored.
   * This is an advanced setting typically only needed by Windows Store application backends.
   * Note that URLs within the current domain are always implicitly allowed.
   */
  allowedExternalRedirectUrls?: string[];
  /** The configuration settings of the session cookie's expiration. */
  cookieExpiration?: CookieExpiration;
  /** The configuration settings of the nonce used in the login flow. */
  nonce?: Nonce;
}

export function loginSerializer(item: Login): any {
  return {
    routes: !item["routes"] ? item["routes"] : loginRoutesSerializer(item["routes"]),
    tokenStore: !item["tokenStore"] ? item["tokenStore"] : tokenStoreSerializer(item["tokenStore"]),
    preserveUrlFragmentsForLogins: item["preserveUrlFragmentsForLogins"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    cookieExpiration: !item["cookieExpiration"]
      ? item["cookieExpiration"]
      : cookieExpirationSerializer(item["cookieExpiration"]),
    nonce: !item["nonce"] ? item["nonce"] : nonceSerializer(item["nonce"]),
  };
}

export function loginDeserializer(item: any): Login {
  return {
    routes: !item["routes"] ? item["routes"] : loginRoutesDeserializer(item["routes"]),
    tokenStore: !item["tokenStore"]
      ? item["tokenStore"]
      : tokenStoreDeserializer(item["tokenStore"]),
    preserveUrlFragmentsForLogins: item["preserveUrlFragmentsForLogins"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    cookieExpiration: !item["cookieExpiration"]
      ? item["cookieExpiration"]
      : cookieExpirationDeserializer(item["cookieExpiration"]),
    nonce: !item["nonce"] ? item["nonce"] : nonceDeserializer(item["nonce"]),
  };
}

/** The routes that specify the endpoints used for login and logout requests. */
export interface LoginRoutes {
  /** The endpoint at which a logout request should be made. */
  logoutEndpoint?: string;
}

export function loginRoutesSerializer(item: LoginRoutes): any {
  return { logoutEndpoint: item["logoutEndpoint"] };
}

export function loginRoutesDeserializer(item: any): LoginRoutes {
  return {
    logoutEndpoint: item["logoutEndpoint"],
  };
}

/** The configuration settings of the token store. */
export interface TokenStore {
  /**
   * <code>true</code> to durably store platform-specific security tokens that are obtained during login flows; otherwise, <code>false</code>.
   * The default is <code>false</code>.
   */
  enabled?: boolean;
  /**
   * The number of hours after session token expiration that a session token can be used to
   * call the token refresh API. The default is 72 hours.
   */
  tokenRefreshExtensionHours?: number;
  /** The configuration settings of the storage of the tokens if blob storage is used. */
  azureBlobStorage?: BlobStorageTokenStore;
}

export function tokenStoreSerializer(item: TokenStore): any {
  return {
    enabled: item["enabled"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : blobStorageTokenStoreSerializer(item["azureBlobStorage"]),
  };
}

export function tokenStoreDeserializer(item: any): TokenStore {
  return {
    enabled: item["enabled"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : blobStorageTokenStoreDeserializer(item["azureBlobStorage"]),
  };
}

/** The configuration settings of the storage of the tokens if blob storage is used. */
export interface BlobStorageTokenStore {
  /** The name of the app secrets containing the SAS URL of the blob storage containing the tokens. */
  sasUrlSettingName?: string;
  /** The URI of the blob storage containing the tokens. Should not be used along with sasUrlSettingName. */
  blobContainerUri?: string;
  /** The Client ID of a User-Assigned Managed Identity. Should not be used along with managedIdentityResourceId. */
  clientId?: string;
  /** The Resource ID of a User-Assigned Managed Identity. Should not be used along with clientId. */
  managedIdentityResourceId?: string;
}

export function blobStorageTokenStoreSerializer(item: BlobStorageTokenStore): any {
  return {
    sasUrlSettingName: item["sasUrlSettingName"],
    blobContainerUri: item["blobContainerUri"],
    clientId: item["clientId"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

export function blobStorageTokenStoreDeserializer(item: any): BlobStorageTokenStore {
  return {
    sasUrlSettingName: item["sasUrlSettingName"],
    blobContainerUri: item["blobContainerUri"],
    clientId: item["clientId"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

/** The configuration settings of the session cookie's expiration. */
export interface CookieExpiration {
  /** The convention used when determining the session cookie's expiration. */
  convention?: CookieExpirationConvention;
  /** The time after the request is made when the session cookie should expire. */
  timeToExpiration?: string;
}

export function cookieExpirationSerializer(item: CookieExpiration): any {
  return { convention: item["convention"], timeToExpiration: item["timeToExpiration"] };
}

export function cookieExpirationDeserializer(item: any): CookieExpiration {
  return {
    convention: item["convention"],
    timeToExpiration: item["timeToExpiration"],
  };
}

/** The convention used when determining the session cookie's expiration. */
export type CookieExpirationConvention = "FixedTime" | "IdentityProviderDerived";

/** The configuration settings of the nonce used in the login flow. */
export interface Nonce {
  /** <code>false</code> if the nonce should not be validated while completing the login flow; otherwise, <code>true</code>. */
  validateNonce?: boolean;
  /** The time after the request is made when the nonce should expire. */
  nonceExpirationInterval?: string;
}

export function nonceSerializer(item: Nonce): any {
  return {
    validateNonce: item["validateNonce"],
    nonceExpirationInterval: item["nonceExpirationInterval"],
  };
}

export function nonceDeserializer(item: any): Nonce {
  return {
    validateNonce: item["validateNonce"],
    nonceExpirationInterval: item["nonceExpirationInterval"],
  };
}

/** The configuration settings of the HTTP requests for authentication and authorization requests made against ContainerApp Service Authentication/Authorization. */
export interface HttpSettings {
  /** <code>false</code> if the authentication/authorization responses not having the HTTPS scheme are permissible; otherwise, <code>true</code>. */
  requireHttps?: boolean;
  /** The configuration settings of the paths HTTP requests. */
  routes?: HttpSettingsRoutes;
  /** The configuration settings of a forward proxy used to make the requests. */
  forwardProxy?: ForwardProxy;
}

export function httpSettingsSerializer(item: HttpSettings): any {
  return {
    requireHttps: item["requireHttps"],
    routes: !item["routes"] ? item["routes"] : httpSettingsRoutesSerializer(item["routes"]),
    forwardProxy: !item["forwardProxy"]
      ? item["forwardProxy"]
      : forwardProxySerializer(item["forwardProxy"]),
  };
}

export function httpSettingsDeserializer(item: any): HttpSettings {
  return {
    requireHttps: item["requireHttps"],
    routes: !item["routes"] ? item["routes"] : httpSettingsRoutesDeserializer(item["routes"]),
    forwardProxy: !item["forwardProxy"]
      ? item["forwardProxy"]
      : forwardProxyDeserializer(item["forwardProxy"]),
  };
}

/** The configuration settings of the paths HTTP requests. */
export interface HttpSettingsRoutes {
  /** The prefix that should precede all the authentication/authorization paths. */
  apiPrefix?: string;
}

export function httpSettingsRoutesSerializer(item: HttpSettingsRoutes): any {
  return { apiPrefix: item["apiPrefix"] };
}

export function httpSettingsRoutesDeserializer(item: any): HttpSettingsRoutes {
  return {
    apiPrefix: item["apiPrefix"],
  };
}

/** The configuration settings of a forward proxy used to make the requests. */
export interface ForwardProxy {
  /** The convention used to determine the url of the request made. */
  convention?: ForwardProxyConvention;
  /** The name of the header containing the host of the request. */
  customHostHeaderName?: string;
  /** The name of the header containing the scheme of the request. */
  customProtoHeaderName?: string;
}

export function forwardProxySerializer(item: ForwardProxy): any {
  return {
    convention: item["convention"],
    customHostHeaderName: item["customHostHeaderName"],
    customProtoHeaderName: item["customProtoHeaderName"],
  };
}

export function forwardProxyDeserializer(item: any): ForwardProxy {
  return {
    convention: item["convention"],
    customHostHeaderName: item["customHostHeaderName"],
    customProtoHeaderName: item["customProtoHeaderName"],
  };
}

/** The convention used to determine the url of the request made. */
export type ForwardProxyConvention = "NoProxy" | "Standard" | "Custom";

/** The configuration settings of the secrets references of encryption key and signing key for ContainerApp Service Authentication/Authorization. */
export interface EncryptionSettings {
  /** The secret name which is referenced for EncryptionKey. */
  containerAppAuthEncryptionSecretName?: string;
  /** The secret name which is referenced for SigningKey. */
  containerAppAuthSigningSecretName?: string;
}

export function encryptionSettingsSerializer(item: EncryptionSettings): any {
  return {
    containerAppAuthEncryptionSecretName: item["containerAppAuthEncryptionSecretName"],
    containerAppAuthSigningSecretName: item["containerAppAuthSigningSecretName"],
  };
}

export function encryptionSettingsDeserializer(item: any): EncryptionSettings {
  return {
    containerAppAuthEncryptionSecretName: item["containerAppAuthEncryptionSecretName"],
    containerAppAuthSigningSecretName: item["containerAppAuthSigningSecretName"],
  };
}

/** AuthConfig collection ARM resource. */
export interface _AuthConfigCollection {
  /** The AuthConfig items on this page */
  value: AuthConfig[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _authConfigCollectionDeserializer(item: any): _AuthConfigCollection {
  return {
    value: authConfigArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function authConfigArraySerializer(result: Array<AuthConfig>): any[] {
  return result.map((item) => {
    return authConfigSerializer(item);
  });
}

export function authConfigArrayDeserializer(result: Array<AuthConfig>): any[] {
  return result.map((item) => {
    return authConfigDeserializer(item);
  });
}

/** An environment for Kubernetes cluster specialized for web workloads by Azure App Service */
export interface ConnectedEnvironment extends TrackedResource {
  /** The complex type of the extended location. */
  extendedLocation?: ExtendedLocation;
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?: ConnectedEnvironmentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the connectedEnvironment */
  staticIp?: string;
  /** Application Insights connection string used by Dapr to export Service to Service communication telemetry */
  daprAIConnectionString?: string;
  /** Custom domain configuration for the environment */
  customDomainConfiguration?: CustomDomainConfiguration;
}

export function connectedEnvironmentSerializer(item: ConnectedEnvironment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "staticIp",
      "daprAIConnectionString",
      "customDomainConfiguration",
    ])
      ? undefined
      : _connectedEnvironmentPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function connectedEnvironmentDeserializer(item: any): ConnectedEnvironment {
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
    ...(!item["properties"]
      ? item["properties"]
      : _connectedEnvironmentPropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** ConnectedEnvironment resource specific properties */
export interface ConnectedEnvironmentProperties {
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?: ConnectedEnvironmentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the connectedEnvironment */
  staticIp?: string;
  /** Application Insights connection string used by Dapr to export Service to Service communication telemetry */
  daprAIConnectionString?: string;
  /** Custom domain configuration for the environment */
  customDomainConfiguration?: CustomDomainConfiguration;
}

export function connectedEnvironmentPropertiesSerializer(
  item: ConnectedEnvironmentProperties,
): any {
  return {
    staticIp: item["staticIp"],
    daprAIConnectionString: item["daprAIConnectionString"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationSerializer(item["customDomainConfiguration"]),
  };
}

export function connectedEnvironmentPropertiesDeserializer(
  item: any,
): ConnectedEnvironmentProperties {
  return {
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
    defaultDomain: item["defaultDomain"],
    staticIp: item["staticIp"],
    daprAIConnectionString: item["daprAIConnectionString"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationDeserializer(item["customDomainConfiguration"]),
  };
}

/** Provisioning state of the Kubernetes Environment. */
export enum KnownConnectedEnvironmentProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Waiting */
  Waiting = "Waiting",
  /** InitializationInProgress */
  InitializationInProgress = "InitializationInProgress",
  /** InfrastructureSetupInProgress */
  InfrastructureSetupInProgress = "InfrastructureSetupInProgress",
  /** InfrastructureSetupComplete */
  InfrastructureSetupComplete = "InfrastructureSetupComplete",
  /** ScheduledForDelete */
  ScheduledForDelete = "ScheduledForDelete",
}

/**
 * Provisioning state of the Kubernetes Environment. \
 * {@link KnownConnectedEnvironmentProvisioningState} can be used interchangeably with ConnectedEnvironmentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Waiting**: Waiting \
 * **InitializationInProgress**: InitializationInProgress \
 * **InfrastructureSetupInProgress**: InfrastructureSetupInProgress \
 * **InfrastructureSetupComplete**: InfrastructureSetupComplete \
 * **ScheduledForDelete**: ScheduledForDelete
 */
export type ConnectedEnvironmentProvisioningState = string;

/** Configuration properties for apps environment custom domain */
export interface CustomDomainConfiguration {
  /** Id used to verify domain name ownership */
  readonly customDomainVerificationId?: string;
  /** Dns suffix for the environment domain */
  dnsSuffix?: string;
  /** Certificate stored in Azure Key Vault. */
  certificateKeyVaultProperties?: CertificateKeyVaultProperties;
  /** PFX or PEM blob */
  certificateValue?: Uint8Array;
  /** Certificate password */
  certificatePassword?: string;
  /** Certificate expiration date. */
  readonly expirationDate?: Date;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
}

export function customDomainConfigurationSerializer(item: CustomDomainConfiguration): any {
  return {
    dnsSuffix: item["dnsSuffix"],
    certificateKeyVaultProperties: !item["certificateKeyVaultProperties"]
      ? item["certificateKeyVaultProperties"]
      : certificateKeyVaultPropertiesSerializer(item["certificateKeyVaultProperties"]),
    certificateValue: !item["certificateValue"]
      ? item["certificateValue"]
      : uint8ArrayToString(item["certificateValue"], "base64"),
    certificatePassword: item["certificatePassword"],
  };
}

export function customDomainConfigurationDeserializer(item: any): CustomDomainConfiguration {
  return {
    customDomainVerificationId: item["customDomainVerificationId"],
    dnsSuffix: item["dnsSuffix"],
    certificateKeyVaultProperties: !item["certificateKeyVaultProperties"]
      ? item["certificateKeyVaultProperties"]
      : certificateKeyVaultPropertiesDeserializer(item["certificateKeyVaultProperties"]),
    certificateValue: !item["certificateValue"]
      ? item["certificateValue"]
      : typeof item["certificateValue"] === "string"
        ? stringToUint8Array(item["certificateValue"], "base64")
        : item["certificateValue"],
    certificatePassword: item["certificatePassword"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    thumbprint: item["thumbprint"],
    subjectName: item["subjectName"],
  };
}

/** Properties for a certificate stored in a Key Vault. */
export interface CertificateKeyVaultProperties {
  /** Resource ID of a managed identity to authenticate with Azure Key Vault, or System to use a system-assigned identity. */
  identity?: string;
  /** URL pointing to the Azure Key Vault secret that holds the certificate. */
  keyVaultUrl?: string;
}

export function certificateKeyVaultPropertiesSerializer(item: CertificateKeyVaultProperties): any {
  return { identity: item["identity"], keyVaultUrl: item["keyVaultUrl"] };
}

export function certificateKeyVaultPropertiesDeserializer(
  item: any,
): CertificateKeyVaultProperties {
  return {
    identity: item["identity"],
    keyVaultUrl: item["keyVaultUrl"],
  };
}

/** Connected environment patch properties */
export interface ConnectedEnvironmentPatchResource extends ResourceTags {}

export function connectedEnvironmentPatchResourceSerializer(
  item: ConnectedEnvironmentPatchResource,
): any {
  return { tags: item["tags"] };
}

/** List of key value pairs that describe the resource. This will overwrite the existing tags. */
export interface ResourceTags {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function resourceTagsSerializer(item: ResourceTags): any {
  return { tags: item["tags"] };
}

/** Collection of connectedEnvironments */
export interface _ConnectedEnvironmentCollection {
  /** The ConnectedEnvironment items on this page */
  value: ConnectedEnvironment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectedEnvironmentCollectionDeserializer(
  item: any,
): _ConnectedEnvironmentCollection {
  return {
    value: connectedEnvironmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectedEnvironmentArraySerializer(result: Array<ConnectedEnvironment>): any[] {
  return result.map((item) => {
    return connectedEnvironmentSerializer(item);
  });
}

export function connectedEnvironmentArrayDeserializer(result: Array<ConnectedEnvironment>): any[] {
  return result.map((item) => {
    return connectedEnvironmentDeserializer(item);
  });
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

/** Certificate used for Custom Domain bindings of Container Apps in a Managed Environment */
export interface Certificate extends TrackedResource {
  /** Certificate resource specific properties */
  properties?: CertificateProperties;
}

export function certificateSerializer(item: Certificate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : certificatePropertiesSerializer(item["properties"]),
  };
}

export function certificateDeserializer(item: any): Certificate {
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
      : certificatePropertiesDeserializer(item["properties"]),
  };
}

/** Certificate resource specific properties */
export interface CertificateProperties {
  /** Provisioning state of the certificate. */
  readonly provisioningState?: CertificateProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Properties for a certificate stored in a Key Vault. */
  certificateKeyVaultProperties?: CertificateKeyVaultProperties;
  /** Certificate password. */
  password?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
  /** Subject alternative names the certificate applies to. */
  readonly subjectAlternativeNames?: string[];
  /** PFX or PEM blob */
  value?: Uint8Array;
  /** Certificate issuer. */
  readonly issuer?: string;
  /** Certificate issue Date. */
  readonly issueDate?: Date;
  /** Certificate expiration date. */
  readonly expirationDate?: Date;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Is the certificate valid?. */
  readonly valid?: boolean;
  /** Public key hash. */
  readonly publicKeyHash?: string;
}

export function certificatePropertiesSerializer(item: CertificateProperties): any {
  return {
    certificateKeyVaultProperties: !item["certificateKeyVaultProperties"]
      ? item["certificateKeyVaultProperties"]
      : certificateKeyVaultPropertiesSerializer(item["certificateKeyVaultProperties"]),
    password: item["password"],
    value: !item["value"] ? item["value"] : uint8ArrayToString(item["value"], "base64"),
  };
}

export function certificatePropertiesDeserializer(item: any): CertificateProperties {
  return {
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
    certificateKeyVaultProperties: !item["certificateKeyVaultProperties"]
      ? item["certificateKeyVaultProperties"]
      : certificateKeyVaultPropertiesDeserializer(item["certificateKeyVaultProperties"]),
    password: item["password"],
    subjectName: item["subjectName"],
    subjectAlternativeNames: !item["subjectAlternativeNames"]
      ? item["subjectAlternativeNames"]
      : item["subjectAlternativeNames"].map((p: any) => {
          return p;
        }),
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
    issuer: item["issuer"],
    issueDate: !item["issueDate"] ? item["issueDate"] : new Date(item["issueDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    thumbprint: item["thumbprint"],
    valid: item["valid"],
    publicKeyHash: item["publicKeyHash"],
  };
}

/** Provisioning state of the certificate. */
export enum KnownCertificateProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** DeleteFailed */
  DeleteFailed = "DeleteFailed",
  /** Pending */
  Pending = "Pending",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the certificate. \
 * {@link KnownCertificateProvisioningState} can be used interchangeably with CertificateProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **DeleteFailed**: DeleteFailed \
 * **Pending**: Pending \
 * **Deleting**: Deleting
 */
export type CertificateProvisioningState = string;

/** A certificate to update */
export interface CertificatePatch {
  /** Application-specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function certificatePatchSerializer(item: CertificatePatch): any {
  return { tags: item["tags"] };
}

/** Collection of Certificates. */
export interface _CertificateCollection {
  /** The Certificate items on this page */
  value: Certificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _certificateCollectionDeserializer(item: any): _CertificateCollection {
  return {
    value: certificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateArraySerializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateSerializer(item);
  });
}

export function certificateArrayDeserializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateDeserializer(item);
  });
}

/** An environment for hosting container apps */
export interface ManagedEnvironment extends TrackedResource {
  /** Kind of the Environment. */
  kind?: string;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Provisioning state of the Environment. */
  readonly provisioningState?: EnvironmentProvisioningState;
  /** Azure Monitor instrumentation key used by Dapr to export Service to Service communication telemetry */
  daprAIInstrumentationKey?: string;
  /** Application Insights connection string used by Dapr to export Service to Service communication telemetry */
  daprAIConnectionString?: string;
  /** Vnet configuration for the environment */
  vnetConfiguration?: VnetConfiguration;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the Environment */
  readonly staticIp?: string;
  /** Cluster configuration which enables the log daemon to export app logs to configured destination */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Environment level Application Insights configuration */
  appInsightsConfiguration?: AppInsightsConfiguration;
  /** Environment Open Telemetry configuration */
  openTelemetryConfiguration?: OpenTelemetryConfiguration;
  /** Whether or not this Managed Environment is zone-redundant. */
  zoneRedundant?: boolean;
  /** Custom domain configuration for the environment */
  customDomainConfiguration?: CustomDomainConfiguration;
  /** The endpoint of the eventstream of the Environment. */
  readonly eventStreamEndpoint?: string;
  /** Workload profiles configured for the Managed Environment. */
  workloadProfiles?: WorkloadProfile[];
  /** The configuration of Keda component. */
  kedaConfiguration?: KedaConfiguration;
  /** The configuration of Dapr component. */
  daprConfiguration?: DaprConfiguration;
  /** Name of the platform-managed resource group created for the Managed Environment to host infrastructure resources. If a subnet ID is provided, this resource group will be created in the same subscription as the subnet. */
  infrastructureResourceGroup?: string;
  /** Peer authentication settings for the Managed Environment */
  peerAuthentication?: ManagedEnvironmentPropertiesPeerAuthentication;
  /** Peer traffic settings for the Managed Environment */
  peerTrafficConfiguration?: ManagedEnvironmentPropertiesPeerTrafficConfiguration;
  /** Ingress configuration for the Managed Environment. */
  ingressConfiguration?: IngressConfiguration;
  /** Mode of the environment. Allowed Values: 'ConsumptionOnly', 'WorkloadProfiles', 'Express', 'Archived'. */
  environmentMode?: ManagedEnvironmentMode;
  /** Private endpoint connections to the resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled'. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function managedEnvironmentSerializer(item: ManagedEnvironment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "daprAIInstrumentationKey",
      "daprAIConnectionString",
      "vnetConfiguration",
      "appLogsConfiguration",
      "appInsightsConfiguration",
      "openTelemetryConfiguration",
      "zoneRedundant",
      "customDomainConfiguration",
      "workloadProfiles",
      "kedaConfiguration",
      "daprConfiguration",
      "infrastructureResourceGroup",
      "peerAuthentication",
      "peerTrafficConfiguration",
      "ingressConfiguration",
      "environmentMode",
      "publicNetworkAccess",
    ])
      ? undefined
      : _managedEnvironmentPropertiesSerializer(item),
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function managedEnvironmentDeserializer(item: any): ManagedEnvironment {
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
    ...(!item["properties"]
      ? item["properties"]
      : _managedEnvironmentPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Managed environment resource specific properties */
export interface ManagedEnvironmentProperties {
  /** Provisioning state of the Environment. */
  readonly provisioningState?: EnvironmentProvisioningState;
  /** Azure Monitor instrumentation key used by Dapr to export Service to Service communication telemetry */
  daprAIInstrumentationKey?: string;
  /** Application Insights connection string used by Dapr to export Service to Service communication telemetry */
  daprAIConnectionString?: string;
  /** Vnet configuration for the environment */
  vnetConfiguration?: VnetConfiguration;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the Environment */
  readonly staticIp?: string;
  /** Cluster configuration which enables the log daemon to export app logs to configured destination */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Environment level Application Insights configuration */
  appInsightsConfiguration?: AppInsightsConfiguration;
  /** Environment Open Telemetry configuration */
  openTelemetryConfiguration?: OpenTelemetryConfiguration;
  /** Whether or not this Managed Environment is zone-redundant. */
  zoneRedundant?: boolean;
  /** Custom domain configuration for the environment */
  customDomainConfiguration?: CustomDomainConfiguration;
  /** The endpoint of the eventstream of the Environment. */
  readonly eventStreamEndpoint?: string;
  /** Workload profiles configured for the Managed Environment. */
  workloadProfiles?: WorkloadProfile[];
  /** The configuration of Keda component. */
  kedaConfiguration?: KedaConfiguration;
  /** The configuration of Dapr component. */
  daprConfiguration?: DaprConfiguration;
  /** Name of the platform-managed resource group created for the Managed Environment to host infrastructure resources. If a subnet ID is provided, this resource group will be created in the same subscription as the subnet. */
  infrastructureResourceGroup?: string;
  /** Peer authentication settings for the Managed Environment */
  peerAuthentication?: ManagedEnvironmentPropertiesPeerAuthentication;
  /** Peer traffic settings for the Managed Environment */
  peerTrafficConfiguration?: ManagedEnvironmentPropertiesPeerTrafficConfiguration;
  /** Ingress configuration for the Managed Environment. */
  ingressConfiguration?: IngressConfiguration;
  /** Mode of the environment. Allowed Values: 'ConsumptionOnly', 'WorkloadProfiles', 'Express', 'Archived'. */
  environmentMode?: ManagedEnvironmentMode;
  /** Private endpoint connections to the resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled'. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function managedEnvironmentPropertiesSerializer(item: ManagedEnvironmentProperties): any {
  return {
    daprAIInstrumentationKey: item["daprAIInstrumentationKey"],
    daprAIConnectionString: item["daprAIConnectionString"],
    vnetConfiguration: !item["vnetConfiguration"]
      ? item["vnetConfiguration"]
      : vnetConfigurationSerializer(item["vnetConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationSerializer(item["appLogsConfiguration"]),
    appInsightsConfiguration: !item["appInsightsConfiguration"]
      ? item["appInsightsConfiguration"]
      : appInsightsConfigurationSerializer(item["appInsightsConfiguration"]),
    openTelemetryConfiguration: !item["openTelemetryConfiguration"]
      ? item["openTelemetryConfiguration"]
      : openTelemetryConfigurationSerializer(item["openTelemetryConfiguration"]),
    zoneRedundant: item["zoneRedundant"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationSerializer(item["customDomainConfiguration"]),
    workloadProfiles: !item["workloadProfiles"]
      ? item["workloadProfiles"]
      : workloadProfileArraySerializer(item["workloadProfiles"]),
    kedaConfiguration: !item["kedaConfiguration"]
      ? item["kedaConfiguration"]
      : kedaConfigurationSerializer(item["kedaConfiguration"]),
    daprConfiguration: !item["daprConfiguration"]
      ? item["daprConfiguration"]
      : daprConfigurationSerializer(item["daprConfiguration"]),
    infrastructureResourceGroup: item["infrastructureResourceGroup"],
    peerAuthentication: !item["peerAuthentication"]
      ? item["peerAuthentication"]
      : managedEnvironmentPropertiesPeerAuthenticationSerializer(item["peerAuthentication"]),
    peerTrafficConfiguration: !item["peerTrafficConfiguration"]
      ? item["peerTrafficConfiguration"]
      : managedEnvironmentPropertiesPeerTrafficConfigurationSerializer(
          item["peerTrafficConfiguration"],
        ),
    ingressConfiguration: !item["ingressConfiguration"]
      ? item["ingressConfiguration"]
      : ingressConfigurationSerializer(item["ingressConfiguration"]),
    environmentMode: item["environmentMode"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function managedEnvironmentPropertiesDeserializer(item: any): ManagedEnvironmentProperties {
  return {
    provisioningState: item["provisioningState"],
    daprAIInstrumentationKey: item["daprAIInstrumentationKey"],
    daprAIConnectionString: item["daprAIConnectionString"],
    vnetConfiguration: !item["vnetConfiguration"]
      ? item["vnetConfiguration"]
      : vnetConfigurationDeserializer(item["vnetConfiguration"]),
    deploymentErrors: item["deploymentErrors"],
    defaultDomain: item["defaultDomain"],
    staticIp: item["staticIp"],
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationDeserializer(item["appLogsConfiguration"]),
    appInsightsConfiguration: !item["appInsightsConfiguration"]
      ? item["appInsightsConfiguration"]
      : appInsightsConfigurationDeserializer(item["appInsightsConfiguration"]),
    openTelemetryConfiguration: !item["openTelemetryConfiguration"]
      ? item["openTelemetryConfiguration"]
      : openTelemetryConfigurationDeserializer(item["openTelemetryConfiguration"]),
    zoneRedundant: item["zoneRedundant"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationDeserializer(item["customDomainConfiguration"]),
    eventStreamEndpoint: item["eventStreamEndpoint"],
    workloadProfiles: !item["workloadProfiles"]
      ? item["workloadProfiles"]
      : workloadProfileArrayDeserializer(item["workloadProfiles"]),
    kedaConfiguration: !item["kedaConfiguration"]
      ? item["kedaConfiguration"]
      : kedaConfigurationDeserializer(item["kedaConfiguration"]),
    daprConfiguration: !item["daprConfiguration"]
      ? item["daprConfiguration"]
      : daprConfigurationDeserializer(item["daprConfiguration"]),
    infrastructureResourceGroup: item["infrastructureResourceGroup"],
    peerAuthentication: !item["peerAuthentication"]
      ? item["peerAuthentication"]
      : managedEnvironmentPropertiesPeerAuthenticationDeserializer(item["peerAuthentication"]),
    peerTrafficConfiguration: !item["peerTrafficConfiguration"]
      ? item["peerTrafficConfiguration"]
      : managedEnvironmentPropertiesPeerTrafficConfigurationDeserializer(
          item["peerTrafficConfiguration"],
        ),
    ingressConfiguration: !item["ingressConfiguration"]
      ? item["ingressConfiguration"]
      : ingressConfigurationDeserializer(item["ingressConfiguration"]),
    environmentMode: item["environmentMode"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Provisioning state of the Environment. */
export enum KnownEnvironmentProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Waiting */
  Waiting = "Waiting",
  /** InitializationInProgress */
  InitializationInProgress = "InitializationInProgress",
  /** InfrastructureSetupInProgress */
  InfrastructureSetupInProgress = "InfrastructureSetupInProgress",
  /** InfrastructureSetupComplete */
  InfrastructureSetupComplete = "InfrastructureSetupComplete",
  /** ScheduledForDelete */
  ScheduledForDelete = "ScheduledForDelete",
  /** UpgradeRequested */
  UpgradeRequested = "UpgradeRequested",
  /** UpgradeFailed */
  UpgradeFailed = "UpgradeFailed",
}

/**
 * Provisioning state of the Environment. \
 * {@link KnownEnvironmentProvisioningState} can be used interchangeably with EnvironmentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Waiting**: Waiting \
 * **InitializationInProgress**: InitializationInProgress \
 * **InfrastructureSetupInProgress**: InfrastructureSetupInProgress \
 * **InfrastructureSetupComplete**: InfrastructureSetupComplete \
 * **ScheduledForDelete**: ScheduledForDelete \
 * **UpgradeRequested**: UpgradeRequested \
 * **UpgradeFailed**: UpgradeFailed
 */
export type EnvironmentProvisioningState = string;

/** Configuration properties for apps environment to join a Virtual Network */
export interface VnetConfiguration {
  /** Boolean indicating the environment only has an internal load balancer. These environments do not have a public static IP resource. They must provide infrastructureSubnetId if enabling this property */
  internal?: boolean;
  /** Resource ID of a subnet for infrastructure components. Must not overlap with any other provided IP ranges. */
  infrastructureSubnetId?: string;
  /** CIDR notation IP range assigned to the Docker bridge, network. Must not overlap with any other provided IP ranges. */
  dockerBridgeCidr?: string;
  /** IP range in CIDR notation that can be reserved for environment infrastructure IP addresses. Must not overlap with any other provided IP ranges. */
  platformReservedCidr?: string;
  /** An IP address from the IP range defined by platformReservedCidr that will be reserved for the internal DNS server. */
  platformReservedDnsIP?: string;
}

export function vnetConfigurationSerializer(item: VnetConfiguration): any {
  return {
    internal: item["internal"],
    infrastructureSubnetId: item["infrastructureSubnetId"],
    dockerBridgeCidr: item["dockerBridgeCidr"],
    platformReservedCidr: item["platformReservedCidr"],
    platformReservedDnsIP: item["platformReservedDnsIP"],
  };
}

export function vnetConfigurationDeserializer(item: any): VnetConfiguration {
  return {
    internal: item["internal"],
    infrastructureSubnetId: item["infrastructureSubnetId"],
    dockerBridgeCidr: item["dockerBridgeCidr"],
    platformReservedCidr: item["platformReservedCidr"],
    platformReservedDnsIP: item["platformReservedDnsIP"],
  };
}

/** Configuration of application logs */
export interface AppLogsConfiguration {
  /** Logs destination, can be 'log-analytics', 'azure-monitor' or 'none' */
  destination?: string;
  /** Log Analytics configuration, must only be provided when destination is configured as 'log-analytics' */
  logAnalyticsConfiguration?: LogAnalyticsConfiguration;
}

export function appLogsConfigurationSerializer(item: AppLogsConfiguration): any {
  return {
    destination: item["destination"],
    logAnalyticsConfiguration: !item["logAnalyticsConfiguration"]
      ? item["logAnalyticsConfiguration"]
      : logAnalyticsConfigurationSerializer(item["logAnalyticsConfiguration"]),
  };
}

export function appLogsConfigurationDeserializer(item: any): AppLogsConfiguration {
  return {
    destination: item["destination"],
    logAnalyticsConfiguration: !item["logAnalyticsConfiguration"]
      ? item["logAnalyticsConfiguration"]
      : logAnalyticsConfigurationDeserializer(item["logAnalyticsConfiguration"]),
  };
}

/** Log Analytics configuration, must only be provided when destination is configured as 'log-analytics' */
export interface LogAnalyticsConfiguration {
  /** Log analytics customer id */
  customerId?: string;
  /** Log analytics customer key */
  sharedKey?: string;
}

export function logAnalyticsConfigurationSerializer(item: LogAnalyticsConfiguration): any {
  return { customerId: item["customerId"], sharedKey: item["sharedKey"] };
}

export function logAnalyticsConfigurationDeserializer(item: any): LogAnalyticsConfiguration {
  return {
    customerId: item["customerId"],
    sharedKey: item["sharedKey"],
  };
}

/** Configuration of Application Insights */
export interface AppInsightsConfiguration {
  /** Application Insights connection string */
  connectionString?: string;
}

export function appInsightsConfigurationSerializer(item: AppInsightsConfiguration): any {
  return { connectionString: item["connectionString"] };
}

export function appInsightsConfigurationDeserializer(item: any): AppInsightsConfiguration {
  return {
    connectionString: item["connectionString"],
  };
}

/** Configuration of Open Telemetry */
export interface OpenTelemetryConfiguration {
  /** Open telemetry destinations configuration */
  destinationsConfiguration?: DestinationsConfiguration;
  /** Open telemetry trace configuration */
  tracesConfiguration?: TracesConfiguration;
  /** Open telemetry logs configuration */
  logsConfiguration?: LogsConfiguration;
  /** Open telemetry metrics configuration */
  metricsConfiguration?: MetricsConfiguration;
}

export function openTelemetryConfigurationSerializer(item: OpenTelemetryConfiguration): any {
  return {
    destinationsConfiguration: !item["destinationsConfiguration"]
      ? item["destinationsConfiguration"]
      : destinationsConfigurationSerializer(item["destinationsConfiguration"]),
    tracesConfiguration: !item["tracesConfiguration"]
      ? item["tracesConfiguration"]
      : tracesConfigurationSerializer(item["tracesConfiguration"]),
    logsConfiguration: !item["logsConfiguration"]
      ? item["logsConfiguration"]
      : logsConfigurationSerializer(item["logsConfiguration"]),
    metricsConfiguration: !item["metricsConfiguration"]
      ? item["metricsConfiguration"]
      : metricsConfigurationSerializer(item["metricsConfiguration"]),
  };
}

export function openTelemetryConfigurationDeserializer(item: any): OpenTelemetryConfiguration {
  return {
    destinationsConfiguration: !item["destinationsConfiguration"]
      ? item["destinationsConfiguration"]
      : destinationsConfigurationDeserializer(item["destinationsConfiguration"]),
    tracesConfiguration: !item["tracesConfiguration"]
      ? item["tracesConfiguration"]
      : tracesConfigurationDeserializer(item["tracesConfiguration"]),
    logsConfiguration: !item["logsConfiguration"]
      ? item["logsConfiguration"]
      : logsConfigurationDeserializer(item["logsConfiguration"]),
    metricsConfiguration: !item["metricsConfiguration"]
      ? item["metricsConfiguration"]
      : metricsConfigurationDeserializer(item["metricsConfiguration"]),
  };
}

/** Configuration of Open Telemetry destinations */
export interface DestinationsConfiguration {
  /** Open telemetry datadog destination configuration */
  dataDogConfiguration?: DataDogConfiguration;
  /** Open telemetry otlp configurations */
  otlpConfigurations?: OtlpConfiguration[];
}

export function destinationsConfigurationSerializer(item: DestinationsConfiguration): any {
  return {
    dataDogConfiguration: !item["dataDogConfiguration"]
      ? item["dataDogConfiguration"]
      : dataDogConfigurationSerializer(item["dataDogConfiguration"]),
    otlpConfigurations: !item["otlpConfigurations"]
      ? item["otlpConfigurations"]
      : otlpConfigurationArraySerializer(item["otlpConfigurations"]),
  };
}

export function destinationsConfigurationDeserializer(item: any): DestinationsConfiguration {
  return {
    dataDogConfiguration: !item["dataDogConfiguration"]
      ? item["dataDogConfiguration"]
      : dataDogConfigurationDeserializer(item["dataDogConfiguration"]),
    otlpConfigurations: !item["otlpConfigurations"]
      ? item["otlpConfigurations"]
      : otlpConfigurationArrayDeserializer(item["otlpConfigurations"]),
  };
}

/** Configuration of datadog */
export interface DataDogConfiguration {
  /** The data dog site */
  site?: string;
  /** The data dog api key */
  key?: string;
}

export function dataDogConfigurationSerializer(item: DataDogConfiguration): any {
  return { site: item["site"], key: item["key"] };
}

export function dataDogConfigurationDeserializer(item: any): DataDogConfiguration {
  return {
    site: item["site"],
    key: item["key"],
  };
}

export function otlpConfigurationArraySerializer(result: Array<OtlpConfiguration>): any[] {
  return result.map((item) => {
    return otlpConfigurationSerializer(item);
  });
}

export function otlpConfigurationArrayDeserializer(result: Array<OtlpConfiguration>): any[] {
  return result.map((item) => {
    return otlpConfigurationDeserializer(item);
  });
}

/** Configuration of otlp */
export interface OtlpConfiguration {
  /** The name of otlp configuration */
  name?: string;
  /** The endpoint of otlp configuration */
  endpoint?: string;
  /** Boolean indicating if otlp configuration is insecure */
  insecure?: boolean;
  /** Headers of otlp configurations */
  headers?: Header[];
}

export function otlpConfigurationSerializer(item: OtlpConfiguration): any {
  return {
    name: item["name"],
    endpoint: item["endpoint"],
    insecure: item["insecure"],
    headers: !item["headers"] ? item["headers"] : headerArraySerializer(item["headers"]),
  };
}

export function otlpConfigurationDeserializer(item: any): OtlpConfiguration {
  return {
    name: item["name"],
    endpoint: item["endpoint"],
    insecure: item["insecure"],
    headers: !item["headers"] ? item["headers"] : headerArrayDeserializer(item["headers"]),
  };
}

export function headerArraySerializer(result: Array<Header>): any[] {
  return result.map((item) => {
    return headerSerializer(item);
  });
}

export function headerArrayDeserializer(result: Array<Header>): any[] {
  return result.map((item) => {
    return headerDeserializer(item);
  });
}

/** Header of otlp configuration */
export interface Header {
  /** The key of otlp configuration header */
  key?: string;
  /** The value of otlp configuration header */
  value?: string;
}

export function headerSerializer(item: Header): any {
  return { key: item["key"], value: item["value"] };
}

export function headerDeserializer(item: any): Header {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** Configuration of Open Telemetry traces */
export interface TracesConfiguration {
  /** Boolean indicating if including dapr traces */
  includeDapr?: boolean;
  /** Open telemetry traces destinations */
  destinations?: string[];
}

export function tracesConfigurationSerializer(item: TracesConfiguration): any {
  return {
    includeDapr: item["includeDapr"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
  };
}

export function tracesConfigurationDeserializer(item: any): TracesConfiguration {
  return {
    includeDapr: item["includeDapr"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
  };
}

/** Configuration of Open Telemetry logs */
export interface LogsConfiguration {
  /** Open telemetry logs destinations */
  destinations?: string[];
}

export function logsConfigurationSerializer(item: LogsConfiguration): any {
  return {
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
  };
}

export function logsConfigurationDeserializer(item: any): LogsConfiguration {
  return {
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
  };
}

/** Configuration of Open Telemetry metrics */
export interface MetricsConfiguration {
  /** Boolean indicating if including keda metrics */
  includeKeda?: boolean;
  /** Open telemetry metrics destinations */
  destinations?: string[];
}

export function metricsConfigurationSerializer(item: MetricsConfiguration): any {
  return {
    includeKeda: item["includeKeda"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
  };
}

export function metricsConfigurationDeserializer(item: any): MetricsConfiguration {
  return {
    includeKeda: item["includeKeda"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
  };
}

export function workloadProfileArraySerializer(result: Array<WorkloadProfile>): any[] {
  return result.map((item) => {
    return workloadProfileSerializer(item);
  });
}

export function workloadProfileArrayDeserializer(result: Array<WorkloadProfile>): any[] {
  return result.map((item) => {
    return workloadProfileDeserializer(item);
  });
}

/** Workload profile to scope container app execution. */
export interface WorkloadProfile {
  /** Workload profile type for the workloads to run on. */
  name: string;
  /** Workload profile type for the workloads to run on. */
  workloadProfileType: string;
  /** The minimum capacity. */
  minimumCount?: number;
  /** The maximum capacity. */
  maximumCount?: number;
}

export function workloadProfileSerializer(item: WorkloadProfile): any {
  return {
    name: item["name"],
    workloadProfileType: item["workloadProfileType"],
    minimumCount: item["minimumCount"],
    maximumCount: item["maximumCount"],
  };
}

export function workloadProfileDeserializer(item: any): WorkloadProfile {
  return {
    name: item["name"],
    workloadProfileType: item["workloadProfileType"],
    minimumCount: item["minimumCount"],
    maximumCount: item["maximumCount"],
  };
}

/** Configuration properties Keda component */
export interface KedaConfiguration {
  /** The version of Keda */
  readonly version?: string;
}

export function kedaConfigurationSerializer(_item: KedaConfiguration): any {
  return {};
}

export function kedaConfigurationDeserializer(item: any): KedaConfiguration {
  return {
    version: item["version"],
  };
}

/** Configuration properties Dapr component */
export interface DaprConfiguration {
  /** The version of Dapr */
  readonly version?: string;
}

export function daprConfigurationSerializer(_item: DaprConfiguration): any {
  return {};
}

export function daprConfigurationDeserializer(item: any): DaprConfiguration {
  return {
    version: item["version"],
  };
}

/** Peer authentication settings for the Managed Environment */
export interface ManagedEnvironmentPropertiesPeerAuthentication {
  /** Mutual TLS authentication settings for the Managed Environment */
  mtls?: Mtls;
}

export function managedEnvironmentPropertiesPeerAuthenticationSerializer(
  item: ManagedEnvironmentPropertiesPeerAuthentication,
): any {
  return { mtls: !item["mtls"] ? item["mtls"] : mtlsSerializer(item["mtls"]) };
}

export function managedEnvironmentPropertiesPeerAuthenticationDeserializer(
  item: any,
): ManagedEnvironmentPropertiesPeerAuthentication {
  return {
    mtls: !item["mtls"] ? item["mtls"] : mtlsDeserializer(item["mtls"]),
  };
}

/** Configuration properties for mutual TLS authentication */
export interface Mtls {
  /** Boolean indicating whether the mutual TLS authentication is enabled */
  enabled?: boolean;
}

export function mtlsSerializer(item: Mtls): any {
  return { enabled: item["enabled"] };
}

export function mtlsDeserializer(item: any): Mtls {
  return {
    enabled: item["enabled"],
  };
}

/** Peer traffic settings for the Managed Environment */
export interface ManagedEnvironmentPropertiesPeerTrafficConfiguration {
  /** Peer traffic encryption settings for the Managed Environment */
  encryption?: ManagedEnvironmentPropertiesPeerTrafficConfigurationEncryption;
}

export function managedEnvironmentPropertiesPeerTrafficConfigurationSerializer(
  item: ManagedEnvironmentPropertiesPeerTrafficConfiguration,
): any {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : managedEnvironmentPropertiesPeerTrafficConfigurationEncryptionSerializer(
          item["encryption"],
        ),
  };
}

export function managedEnvironmentPropertiesPeerTrafficConfigurationDeserializer(
  item: any,
): ManagedEnvironmentPropertiesPeerTrafficConfiguration {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : managedEnvironmentPropertiesPeerTrafficConfigurationEncryptionDeserializer(
          item["encryption"],
        ),
  };
}

/** Peer traffic encryption settings for the Managed Environment */
export interface ManagedEnvironmentPropertiesPeerTrafficConfigurationEncryption {
  /** Boolean indicating whether the peer traffic encryption is enabled */
  enabled?: boolean;
}

export function managedEnvironmentPropertiesPeerTrafficConfigurationEncryptionSerializer(
  item: ManagedEnvironmentPropertiesPeerTrafficConfigurationEncryption,
): any {
  return { enabled: item["enabled"] };
}

export function managedEnvironmentPropertiesPeerTrafficConfigurationEncryptionDeserializer(
  item: any,
): ManagedEnvironmentPropertiesPeerTrafficConfigurationEncryption {
  return {
    enabled: item["enabled"],
  };
}

/** Settings for the ingress component, including workload profile, scaling, and connection handling. */
export interface IngressConfiguration {
  /** Name of the workload profile used by the ingress component. Required. */
  workloadProfileName?: string;
  /** Time (in seconds) to allow active connections to complete on termination. Must be between 0 and 3600. Defaults to 480 seconds. */
  terminationGracePeriodSeconds?: number;
  /** Maximum number of headers per request allowed by the ingress. Must be at least 1. Defaults to 100. */
  headerCountLimit?: number;
  /** Duration (in minutes) before idle requests are timed out. Must be between 4 and 30 inclusive. Defaults to 4 minutes. */
  requestIdleTimeout?: number;
}

export function ingressConfigurationSerializer(item: IngressConfiguration): any {
  return {
    workloadProfileName: item["workloadProfileName"],
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    headerCountLimit: item["headerCountLimit"],
    requestIdleTimeout: item["requestIdleTimeout"],
  };
}

export function ingressConfigurationDeserializer(item: any): IngressConfiguration {
  return {
    workloadProfileName: item["workloadProfileName"],
    terminationGracePeriodSeconds: item["terminationGracePeriodSeconds"],
    headerCountLimit: item["headerCountLimit"],
    requestIdleTimeout: item["requestIdleTimeout"],
  };
}

/** Mode of the managed environment. */
export enum KnownManagedEnvironmentMode {
  /** The environment supports consumption-only workloads. */
  ConsumptionOnly = "ConsumptionOnly",
  /** The environment supports workload profiles. */
  WorkloadProfiles = "WorkloadProfiles",
  /** The environment uses the Express mode. */
  Express = "Express",
  /** The environment is archived. */
  Archived = "Archived",
}

/**
 * Mode of the managed environment. \
 * {@link KnownManagedEnvironmentMode} can be used interchangeably with ManagedEnvironmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ConsumptionOnly**: The environment supports consumption-only workloads. \
 * **WorkloadProfiles**: The environment supports workload profiles. \
 * **Express**: The environment uses the Express mode. \
 * **Archived**: The environment is archived.
 */
export type ManagedEnvironmentMode = string;

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Disconnected**: Disconnected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Waiting */
  Waiting = "Waiting",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Pending */
  Pending = "Pending",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Waiting**: Waiting \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Pending**: Pending
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled'. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled'. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type PublicNetworkAccess = string;

/** Collection of Environments */
export interface _ManagedEnvironmentsCollection {
  /** The ManagedEnvironment items on this page */
  value: ManagedEnvironment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedEnvironmentsCollectionDeserializer(
  item: any,
): _ManagedEnvironmentsCollection {
  return {
    value: managedEnvironmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedEnvironmentArraySerializer(result: Array<ManagedEnvironment>): any[] {
  return result.map((item) => {
    return managedEnvironmentSerializer(item);
  });
}

export function managedEnvironmentArrayDeserializer(result: Array<ManagedEnvironment>): any[] {
  return result.map((item) => {
    return managedEnvironmentDeserializer(item);
  });
}

/** Environment Auth Token. */
export interface EnvironmentAuthToken extends TrackedResource {
  /** Auth token value. */
  readonly token?: string;
  /** Token expiration date. */
  readonly expires?: Date;
}

export function environmentAuthTokenDeserializer(item: any): EnvironmentAuthToken {
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
    ...(!item["properties"]
      ? item["properties"]
      : _environmentAuthTokenPropertiesDeserializer(item["properties"])),
  };
}

/** Environment auth token resource specific properties */
export interface EnvironmentAuthTokenProperties {
  /** Auth token value. */
  readonly token?: string;
  /** Token expiration date. */
  readonly expires?: Date;
}

export function environmentAuthTokenPropertiesDeserializer(
  item: any,
): EnvironmentAuthTokenProperties {
  return {
    token: item["token"],
    expires: !item["expires"] ? item["expires"] : new Date(item["expires"]),
  };
}

/** Collection of workloadProfileStates */
export interface _WorkloadProfileStatesCollection {
  /** The workloadProfileStates items on this page */
  value: WorkloadProfileStates[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadProfileStatesCollectionDeserializer(
  item: any,
): _WorkloadProfileStatesCollection {
  return {
    value: workloadProfileStatesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadProfileStatesArrayDeserializer(
  result: Array<WorkloadProfileStates>,
): any[] {
  return result.map((item) => {
    return workloadProfileStatesDeserializer(item);
  });
}

/** Collection of all the workload Profile States for a Managed Environment.. */
export interface WorkloadProfileStates extends ProxyResource {
  /** Workload Profile resource specific properties. */
  properties?: WorkloadProfileStatesProperties;
}

export function workloadProfileStatesDeserializer(item: any): WorkloadProfileStates {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadProfileStatesPropertiesDeserializer(item["properties"]),
  };
}

/** Workload Profile resource specific properties. */
export interface WorkloadProfileStatesProperties {
  /** Minimum count of instances. */
  minimumCount?: number;
  /** Maximum count of nodes. */
  maximumCount?: number;
  /** Current count of nodes. */
  currentCount?: number;
}

export function workloadProfileStatesPropertiesDeserializer(
  item: any,
): WorkloadProfileStatesProperties {
  return {
    minimumCount: item["minimumCount"],
    maximumCount: item["maximumCount"],
    currentCount: item["currentCount"],
  };
}

/** Request body for checking whether a managed environment can migrate to a target mode. */
export interface CheckMigrationEligibilityRequest {
  /** The target environment mode to check migration eligibility against. */
  targetMode: string;
}

export function checkMigrationEligibilityRequestSerializer(
  item: CheckMigrationEligibilityRequest,
): any {
  return { targetMode: item["targetMode"] };
}

/** Result of a read-only managed environment migration eligibility check. */
export interface CheckMigrationEligibilityResponse {
  /** Whether the managed environment can migrate to the requested target mode. */
  isEligible: boolean;
  /** The name of the managed environment that was checked. */
  environmentName: string;
  /** The current mode of the managed environment. */
  currentMode: string;
  /** The requested target mode. */
  targetMode: string;
  /** The blocking reasons preventing migration. Empty when the managed environment is eligible. */
  failureReasons: MigrationEligibilityFailureReason[];
}

export function checkMigrationEligibilityResponseDeserializer(
  item: any,
): CheckMigrationEligibilityResponse {
  return {
    isEligible: item["isEligible"],
    environmentName: item["environmentName"],
    currentMode: item["currentMode"],
    targetMode: item["targetMode"],
    failureReasons: migrationEligibilityFailureReasonArrayDeserializer(item["failureReasons"]),
  };
}

export function migrationEligibilityFailureReasonArrayDeserializer(
  result: Array<MigrationEligibilityFailureReason>,
): any[] {
  return result.map((item) => {
    return migrationEligibilityFailureReasonDeserializer(item);
  });
}

/** A blocking reason that prevents a managed environment migration. */
export interface MigrationEligibilityFailureReason {
  /** The error code identifying the blocker. */
  code: string;
  /** A human-readable description of the blocker. */
  message: string;
}

export function migrationEligibilityFailureReasonDeserializer(
  item: any,
): MigrationEligibilityFailureReason {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Dapr Component. */
export interface DaprComponent extends ProxyResource {
  /** Component type */
  componentType?: string;
  /** Component version */
  version?: string;
  /** Boolean describing if the component errors are ignores */
  ignoreErrors?: boolean;
  /** Initialization timeout */
  initTimeout?: string;
  /** Collection of secrets used by a Dapr component */
  secrets?: Secret[];
  /** Name of a Dapr component to retrieve component secrets from */
  secretStoreComponent?: string;
  /** Component metadata */
  metadata?: DaprMetadata[];
  /** Names of container apps that can use this Dapr component */
  scopes?: string[];
  /** Provisioning state of the Connected Environment Dapr Component. */
  readonly provisioningState?: DaprComponentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
}

export function daprComponentSerializer(item: DaprComponent): any {
  return {
    properties: areAllPropsUndefined(item, [
      "componentType",
      "version",
      "ignoreErrors",
      "initTimeout",
      "secrets",
      "secretStoreComponent",
      "metadata",
      "scopes",
    ])
      ? undefined
      : _daprComponentPropertiesSerializer(item),
  };
}

export function daprComponentDeserializer(item: any): DaprComponent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _daprComponentPropertiesDeserializer(item["properties"])),
  };
}

/** Dapr Component resource specific properties */
export interface DaprComponentProperties {
  /** Component type */
  componentType?: string;
  /** Component version */
  version?: string;
  /** Boolean describing if the component errors are ignores */
  ignoreErrors?: boolean;
  /** Initialization timeout */
  initTimeout?: string;
  /** Collection of secrets used by a Dapr component */
  secrets?: Secret[];
  /** Name of a Dapr component to retrieve component secrets from */
  secretStoreComponent?: string;
  /** Component metadata */
  metadata?: DaprMetadata[];
  /** Names of container apps that can use this Dapr component */
  scopes?: string[];
  /** Provisioning state of the Connected Environment Dapr Component. */
  readonly provisioningState?: DaprComponentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
}

export function daprComponentPropertiesSerializer(item: DaprComponentProperties): any {
  return {
    componentType: item["componentType"],
    version: item["version"],
    ignoreErrors: item["ignoreErrors"],
    initTimeout: item["initTimeout"],
    secrets: !item["secrets"] ? item["secrets"] : secretArraySerializer(item["secrets"]),
    secretStoreComponent: item["secretStoreComponent"],
    metadata: !item["metadata"] ? item["metadata"] : daprMetadataArraySerializer(item["metadata"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function daprComponentPropertiesDeserializer(item: any): DaprComponentProperties {
  return {
    componentType: item["componentType"],
    version: item["version"],
    ignoreErrors: item["ignoreErrors"],
    initTimeout: item["initTimeout"],
    secrets: !item["secrets"] ? item["secrets"] : secretArrayDeserializer(item["secrets"]),
    secretStoreComponent: item["secretStoreComponent"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : daprMetadataArrayDeserializer(item["metadata"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
  };
}

export function daprMetadataArraySerializer(result: Array<DaprMetadata>): any[] {
  return result.map((item) => {
    return daprMetadataSerializer(item);
  });
}

export function daprMetadataArrayDeserializer(result: Array<DaprMetadata>): any[] {
  return result.map((item) => {
    return daprMetadataDeserializer(item);
  });
}

/** Dapr component metadata. */
export interface DaprMetadata {
  /** Metadata property name. */
  name?: string;
  /** Metadata property value. */
  value?: string;
  /** Name of the Dapr Component secret from which to pull the metadata property value. */
  secretRef?: string;
}

export function daprMetadataSerializer(item: DaprMetadata): any {
  return { name: item["name"], value: item["value"], secretRef: item["secretRef"] };
}

export function daprMetadataDeserializer(item: any): DaprMetadata {
  return {
    name: item["name"],
    value: item["value"],
    secretRef: item["secretRef"],
  };
}

/** Provisioning state of the Connected Environment Dapr Component. */
export enum KnownDaprComponentProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** InProgress */
  InProgress = "InProgress",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the Connected Environment Dapr Component. \
 * {@link KnownDaprComponentProvisioningState} can be used interchangeably with DaprComponentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **InProgress**: InProgress \
 * **Deleting**: Deleting
 */
export type DaprComponentProvisioningState = string;

/** Dapr Components ARM resource. */
export interface _DaprComponentsCollection {
  /** The DaprComponent items on this page */
  value: DaprComponent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _daprComponentsCollectionDeserializer(item: any): _DaprComponentsCollection {
  return {
    value: daprComponentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function daprComponentArraySerializer(result: Array<DaprComponent>): any[] {
  return result.map((item) => {
    return daprComponentSerializer(item);
  });
}

export function daprComponentArrayDeserializer(result: Array<DaprComponent>): any[] {
  return result.map((item) => {
    return daprComponentDeserializer(item);
  });
}

/** Dapr component Secrets Collection for ListSecrets Action. */
export interface DaprSecretsCollection {
  /** Collection of secrets used by a Dapr component */
  value: DaprSecret[];
}

export function daprSecretsCollectionDeserializer(item: any): DaprSecretsCollection {
  return {
    value: daprSecretArrayDeserializer(item["value"]),
  };
}

export function daprSecretArrayDeserializer(result: Array<DaprSecret>): any[] {
  return result.map((item) => {
    return daprSecretDeserializer(item);
  });
}

/** Dapr component Secret for ListSecrets Action */
export interface DaprSecret {
  /** Secret Name. */
  readonly name?: string;
  /** Secret Value. */
  readonly value?: string;
}

export function daprSecretDeserializer(item: any): DaprSecret {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Storage resource for connectedEnvironment. */
export interface ConnectedEnvironmentStorage extends ProxyResource {
  /** Storage properties */
  properties?: ConnectedEnvironmentStorageProperties;
}

export function connectedEnvironmentStorageSerializer(item: ConnectedEnvironmentStorage): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectedEnvironmentStoragePropertiesSerializer(item["properties"]),
  };
}

export function connectedEnvironmentStorageDeserializer(item: any): ConnectedEnvironmentStorage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : connectedEnvironmentStoragePropertiesDeserializer(item["properties"]),
  };
}

/** Storage properties */
export interface ConnectedEnvironmentStorageProperties {
  /** Provisioning state of the storage. */
  readonly provisioningState?: ConnectedEnvironmentStorageProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Azure file properties */
  azureFile?: AzureFileProperties;
}

export function connectedEnvironmentStoragePropertiesSerializer(
  item: ConnectedEnvironmentStorageProperties,
): any {
  return {
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFilePropertiesSerializer(item["azureFile"]),
  };
}

export function connectedEnvironmentStoragePropertiesDeserializer(
  item: any,
): ConnectedEnvironmentStorageProperties {
  return {
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFilePropertiesDeserializer(item["azureFile"]),
  };
}

/** Provisioning state of the storage. */
export enum KnownConnectedEnvironmentStorageProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** InProgress */
  InProgress = "InProgress",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the storage. \
 * {@link KnownConnectedEnvironmentStorageProvisioningState} can be used interchangeably with ConnectedEnvironmentStorageProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **InProgress**: InProgress \
 * **Deleting**: Deleting
 */
export type ConnectedEnvironmentStorageProvisioningState = string;

/** Azure File Properties. */
export interface AzureFileProperties {
  /** Storage account name for azure file. */
  accountName?: string;
  /** Storage account key for azure file. */
  accountKey?: string;
  /** Storage account key stored as an Azure Key Vault secret. */
  accountKeyVaultProperties?: SecretKeyVaultProperties;
  /** Access mode for storage */
  accessMode?: AccessMode;
  /** Azure file share name. */
  shareName?: string;
}

export function azureFilePropertiesSerializer(item: AzureFileProperties): any {
  return {
    accountName: item["accountName"],
    accountKey: item["accountKey"],
    accountKeyVaultProperties: !item["accountKeyVaultProperties"]
      ? item["accountKeyVaultProperties"]
      : secretKeyVaultPropertiesSerializer(item["accountKeyVaultProperties"]),
    accessMode: item["accessMode"],
    shareName: item["shareName"],
  };
}

export function azureFilePropertiesDeserializer(item: any): AzureFileProperties {
  return {
    accountName: item["accountName"],
    accountKey: item["accountKey"],
    accountKeyVaultProperties: !item["accountKeyVaultProperties"]
      ? item["accountKeyVaultProperties"]
      : secretKeyVaultPropertiesDeserializer(item["accountKeyVaultProperties"]),
    accessMode: item["accessMode"],
    shareName: item["shareName"],
  };
}

/** Properties for a secret stored in a Key Vault. */
export interface SecretKeyVaultProperties {
  /** Resource ID of a managed identity to authenticate with Azure Key Vault, or System to use a system-assigned identity. */
  identity?: string;
  /** URL pointing to the Azure Key Vault secret. */
  keyVaultUrl?: string;
}

export function secretKeyVaultPropertiesSerializer(item: SecretKeyVaultProperties): any {
  return { identity: item["identity"], keyVaultUrl: item["keyVaultUrl"] };
}

export function secretKeyVaultPropertiesDeserializer(item: any): SecretKeyVaultProperties {
  return {
    identity: item["identity"],
    keyVaultUrl: item["keyVaultUrl"],
  };
}

/** Access mode for storage */
export enum KnownAccessMode {
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Access mode for storage \
 * {@link KnownAccessMode} can be used interchangeably with AccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadOnly**: ReadOnly \
 * **ReadWrite**: ReadWrite
 */
export type AccessMode = string;

/** Collection of Storage for Environments */
export interface ConnectedEnvironmentStoragesCollection {
  /** Collection of storage resources. */
  value: ConnectedEnvironmentStorage[];
}

export function connectedEnvironmentStoragesCollectionDeserializer(
  item: any,
): ConnectedEnvironmentStoragesCollection {
  return {
    value: connectedEnvironmentStorageArrayDeserializer(item["value"]),
  };
}

export function connectedEnvironmentStorageArraySerializer(
  result: Array<ConnectedEnvironmentStorage>,
): any[] {
  return result.map((item) => {
    return connectedEnvironmentStorageSerializer(item);
  });
}

export function connectedEnvironmentStorageArrayDeserializer(
  result: Array<ConnectedEnvironmentStorage>,
): any[] {
  return result.map((item) => {
    return connectedEnvironmentStorageDeserializer(item);
  });
}

/** Managed certificates used for Custom Domain bindings of Container Apps in a Managed Environment */
export interface ManagedCertificate extends TrackedResource {
  /** Certificate resource specific properties */
  properties?: ManagedCertificateProperties;
}

export function managedCertificateSerializer(item: ManagedCertificate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : managedCertificatePropertiesSerializer(item["properties"]),
  };
}

export function managedCertificateDeserializer(item: any): ManagedCertificate {
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
      : managedCertificatePropertiesDeserializer(item["properties"]),
  };
}

/** Certificate resource specific properties */
export interface ManagedCertificateProperties {
  /** Provisioning state of the certificate. */
  readonly provisioningState?: CertificateProvisioningState;
  /** Subject name of the certificate. */
  subjectName?: string;
  /** Any error occurred during the certificate provision. */
  readonly error?: string;
  /** Selected type of domain control validation for managed certificates. */
  domainControlValidation?: ManagedCertificateDomainControlValidation;
  /** A TXT token used for DNS TXT domain control validation when issuing this type of managed certificates. */
  readonly validationToken?: string;
}

export function managedCertificatePropertiesSerializer(item: ManagedCertificateProperties): any {
  return {
    subjectName: item["subjectName"],
    domainControlValidation: item["domainControlValidation"],
  };
}

export function managedCertificatePropertiesDeserializer(item: any): ManagedCertificateProperties {
  return {
    provisioningState: item["provisioningState"],
    subjectName: item["subjectName"],
    error: item["error"],
    domainControlValidation: item["domainControlValidation"],
    validationToken: item["validationToken"],
  };
}

/** Selected type of domain control validation for managed certificates. */
export enum KnownManagedCertificateDomainControlValidation {
  /** CNAME */
  Cname = "CNAME",
  /** HTTP */
  Http = "HTTP",
  /** TXT */
  TXT = "TXT",
}

/**
 * Selected type of domain control validation for managed certificates. \
 * {@link KnownManagedCertificateDomainControlValidation} can be used interchangeably with ManagedCertificateDomainControlValidation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CNAME**: CNAME \
 * **HTTP**: HTTP \
 * **TXT**: TXT
 */
export type ManagedCertificateDomainControlValidation = string;

/** A managed certificate to update */
export interface ManagedCertificatePatch {
  /** Application-specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function managedCertificatePatchSerializer(item: ManagedCertificatePatch): any {
  return { tags: item["tags"] };
}

/** Collection of Managed Certificates. */
export interface _ManagedCertificateCollection {
  /** The ManagedCertificate items on this page */
  value: ManagedCertificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedCertificateCollectionDeserializer(
  item: any,
): _ManagedCertificateCollection {
  return {
    value: managedCertificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedCertificateArraySerializer(result: Array<ManagedCertificate>): any[] {
  return result.map((item) => {
    return managedCertificateSerializer(item);
  });
}

export function managedCertificateArrayDeserializer(result: Array<ManagedCertificate>): any[] {
  return result.map((item) => {
    return managedCertificateDeserializer(item);
  });
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** List of private link resources for a managed environment. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends Resource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Dapr Component Resiliency Policy. */
export interface DaprComponentResiliencyPolicy extends ProxyResource {
  /** The optional inbound component resiliency policy configuration */
  inboundPolicy?: DaprComponentResiliencyPolicyConfiguration;
  /** The optional outbound component resiliency policy configuration */
  outboundPolicy?: DaprComponentResiliencyPolicyConfiguration;
}

export function daprComponentResiliencyPolicySerializer(item: DaprComponentResiliencyPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["inboundPolicy", "outboundPolicy"])
      ? undefined
      : _daprComponentResiliencyPolicyPropertiesSerializer(item),
  };
}

export function daprComponentResiliencyPolicyDeserializer(
  item: any,
): DaprComponentResiliencyPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _daprComponentResiliencyPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Dapr Component Resiliency Policy resource specific properties */
export interface DaprComponentResiliencyPolicyProperties {
  /** The optional inbound component resiliency policy configuration */
  inboundPolicy?: DaprComponentResiliencyPolicyConfiguration;
  /** The optional outbound component resiliency policy configuration */
  outboundPolicy?: DaprComponentResiliencyPolicyConfiguration;
}

export function daprComponentResiliencyPolicyPropertiesSerializer(
  item: DaprComponentResiliencyPolicyProperties,
): any {
  return {
    inboundPolicy: !item["inboundPolicy"]
      ? item["inboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationSerializer(item["inboundPolicy"]),
    outboundPolicy: !item["outboundPolicy"]
      ? item["outboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationSerializer(item["outboundPolicy"]),
  };
}

export function daprComponentResiliencyPolicyPropertiesDeserializer(
  item: any,
): DaprComponentResiliencyPolicyProperties {
  return {
    inboundPolicy: !item["inboundPolicy"]
      ? item["inboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationDeserializer(item["inboundPolicy"]),
    outboundPolicy: !item["outboundPolicy"]
      ? item["outboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationDeserializer(item["outboundPolicy"]),
  };
}

/** Dapr Component Resiliency Policy Configuration. */
export interface DaprComponentResiliencyPolicyConfiguration {
  /** The optional HTTP retry policy configuration */
  httpRetryPolicy?: DaprComponentResiliencyPolicyHttpRetryPolicyConfiguration;
  /** The optional timeout policy configuration */
  timeoutPolicy?: DaprComponentResiliencyPolicyTimeoutPolicyConfiguration;
  /** The optional circuit breaker policy configuration */
  circuitBreakerPolicy?: DaprComponentResiliencyPolicyCircuitBreakerPolicyConfiguration;
}

export function daprComponentResiliencyPolicyConfigurationSerializer(
  item: DaprComponentResiliencyPolicyConfiguration,
): any {
  return {
    httpRetryPolicy: !item["httpRetryPolicy"]
      ? item["httpRetryPolicy"]
      : daprComponentResiliencyPolicyHttpRetryPolicyConfigurationSerializer(
          item["httpRetryPolicy"],
        ),
    timeoutPolicy: !item["timeoutPolicy"]
      ? item["timeoutPolicy"]
      : daprComponentResiliencyPolicyTimeoutPolicyConfigurationSerializer(item["timeoutPolicy"]),
    circuitBreakerPolicy: !item["circuitBreakerPolicy"]
      ? item["circuitBreakerPolicy"]
      : daprComponentResiliencyPolicyCircuitBreakerPolicyConfigurationSerializer(
          item["circuitBreakerPolicy"],
        ),
  };
}

export function daprComponentResiliencyPolicyConfigurationDeserializer(
  item: any,
): DaprComponentResiliencyPolicyConfiguration {
  return {
    httpRetryPolicy: !item["httpRetryPolicy"]
      ? item["httpRetryPolicy"]
      : daprComponentResiliencyPolicyHttpRetryPolicyConfigurationDeserializer(
          item["httpRetryPolicy"],
        ),
    timeoutPolicy: !item["timeoutPolicy"]
      ? item["timeoutPolicy"]
      : daprComponentResiliencyPolicyTimeoutPolicyConfigurationDeserializer(item["timeoutPolicy"]),
    circuitBreakerPolicy: !item["circuitBreakerPolicy"]
      ? item["circuitBreakerPolicy"]
      : daprComponentResiliencyPolicyCircuitBreakerPolicyConfigurationDeserializer(
          item["circuitBreakerPolicy"],
        ),
  };
}

/** Dapr Component Resiliency Policy HTTP Retry Policy Configuration. */
export interface DaprComponentResiliencyPolicyHttpRetryPolicyConfiguration {
  /** The optional maximum number of retries */
  maxRetries?: number;
  /** The optional retry backoff configuration */
  retryBackOff?: DaprComponentResiliencyPolicyHttpRetryBackOffConfiguration;
}

export function daprComponentResiliencyPolicyHttpRetryPolicyConfigurationSerializer(
  item: DaprComponentResiliencyPolicyHttpRetryPolicyConfiguration,
): any {
  return {
    maxRetries: item["maxRetries"],
    retryBackOff: !item["retryBackOff"]
      ? item["retryBackOff"]
      : daprComponentResiliencyPolicyHttpRetryBackOffConfigurationSerializer(item["retryBackOff"]),
  };
}

export function daprComponentResiliencyPolicyHttpRetryPolicyConfigurationDeserializer(
  item: any,
): DaprComponentResiliencyPolicyHttpRetryPolicyConfiguration {
  return {
    maxRetries: item["maxRetries"],
    retryBackOff: !item["retryBackOff"]
      ? item["retryBackOff"]
      : daprComponentResiliencyPolicyHttpRetryBackOffConfigurationDeserializer(
          item["retryBackOff"],
        ),
  };
}

/** Dapr Component Resiliency Policy HTTP Retry Backoff Configuration. */
export interface DaprComponentResiliencyPolicyHttpRetryBackOffConfiguration {
  /** The optional initial delay in milliseconds before an operation is retried */
  initialDelayInMilliseconds?: number;
  /** The optional maximum time interval in milliseconds between retry attempts */
  maxIntervalInMilliseconds?: number;
}

export function daprComponentResiliencyPolicyHttpRetryBackOffConfigurationSerializer(
  item: DaprComponentResiliencyPolicyHttpRetryBackOffConfiguration,
): any {
  return {
    initialDelayInMilliseconds: item["initialDelayInMilliseconds"],
    maxIntervalInMilliseconds: item["maxIntervalInMilliseconds"],
  };
}

export function daprComponentResiliencyPolicyHttpRetryBackOffConfigurationDeserializer(
  item: any,
): DaprComponentResiliencyPolicyHttpRetryBackOffConfiguration {
  return {
    initialDelayInMilliseconds: item["initialDelayInMilliseconds"],
    maxIntervalInMilliseconds: item["maxIntervalInMilliseconds"],
  };
}

/** Dapr Component Resiliency Policy Timeout Policy Configuration. */
export interface DaprComponentResiliencyPolicyTimeoutPolicyConfiguration {
  /** The optional response timeout in seconds */
  responseTimeoutInSeconds?: number;
}

export function daprComponentResiliencyPolicyTimeoutPolicyConfigurationSerializer(
  item: DaprComponentResiliencyPolicyTimeoutPolicyConfiguration,
): any {
  return { responseTimeoutInSeconds: item["responseTimeoutInSeconds"] };
}

export function daprComponentResiliencyPolicyTimeoutPolicyConfigurationDeserializer(
  item: any,
): DaprComponentResiliencyPolicyTimeoutPolicyConfiguration {
  return {
    responseTimeoutInSeconds: item["responseTimeoutInSeconds"],
  };
}

/** Dapr Component Resiliency Policy Circuit Breaker Policy Configuration. */
export interface DaprComponentResiliencyPolicyCircuitBreakerPolicyConfiguration {
  /** The number of consecutive errors before the circuit is opened. */
  consecutiveErrors?: number;
  /** The interval in seconds until a retry attempt is made after the circuit is opened. */
  timeoutInSeconds?: number;
  /** The optional interval in seconds after which the error count resets to 0. An interval of 0 will never reset. If not specified, the timeoutInSeconds value will be used. */
  intervalInSeconds?: number;
}

export function daprComponentResiliencyPolicyCircuitBreakerPolicyConfigurationSerializer(
  item: DaprComponentResiliencyPolicyCircuitBreakerPolicyConfiguration,
): any {
  return {
    consecutiveErrors: item["consecutiveErrors"],
    timeoutInSeconds: item["timeoutInSeconds"],
    intervalInSeconds: item["intervalInSeconds"],
  };
}

export function daprComponentResiliencyPolicyCircuitBreakerPolicyConfigurationDeserializer(
  item: any,
): DaprComponentResiliencyPolicyCircuitBreakerPolicyConfiguration {
  return {
    consecutiveErrors: item["consecutiveErrors"],
    timeoutInSeconds: item["timeoutInSeconds"],
    intervalInSeconds: item["intervalInSeconds"],
  };
}

/** Dapr Component Resiliency Policies ARM resource. */
export interface _DaprComponentResiliencyPoliciesCollection {
  /** The DaprComponentResiliencyPolicy items on this page */
  value: DaprComponentResiliencyPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _daprComponentResiliencyPoliciesCollectionDeserializer(
  item: any,
): _DaprComponentResiliencyPoliciesCollection {
  return {
    value: daprComponentResiliencyPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function daprComponentResiliencyPolicyArraySerializer(
  result: Array<DaprComponentResiliencyPolicy>,
): any[] {
  return result.map((item) => {
    return daprComponentResiliencyPolicySerializer(item);
  });
}

export function daprComponentResiliencyPolicyArrayDeserializer(
  result: Array<DaprComponentResiliencyPolicy>,
): any[] {
  return result.map((item) => {
    return daprComponentResiliencyPolicyDeserializer(item);
  });
}

/** Information about the Maintenance Configuration resource. */
export interface MaintenanceConfigurationResource extends ProxyResource {
  /** List of maintenance schedules for a managed environment. */
  scheduledEntries?: ScheduledEntry[];
}

export function maintenanceConfigurationResourceSerializer(
  item: MaintenanceConfigurationResource,
): any {
  return {
    properties: areAllPropsUndefined(item, ["scheduledEntries"])
      ? undefined
      : _maintenanceConfigurationResourcePropertiesSerializer(item),
  };
}

export function maintenanceConfigurationResourceDeserializer(
  item: any,
): MaintenanceConfigurationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _maintenanceConfigurationResourcePropertiesDeserializer(item["properties"])),
  };
}

/** List of maintenance schedules for a managed environment. */
export interface ScheduledEntries {
  /** List of maintenance schedules for a managed environment. */
  scheduledEntries: ScheduledEntry[];
}

export function scheduledEntriesSerializer(item: ScheduledEntries): any {
  return { scheduledEntries: scheduledEntryArraySerializer(item["scheduledEntries"]) };
}

export function scheduledEntriesDeserializer(item: any): ScheduledEntries {
  return {
    scheduledEntries: scheduledEntryArrayDeserializer(item["scheduledEntries"]),
  };
}

export function scheduledEntryArraySerializer(result: Array<ScheduledEntry>): any[] {
  return result.map((item) => {
    return scheduledEntrySerializer(item);
  });
}

export function scheduledEntryArrayDeserializer(result: Array<ScheduledEntry>): any[] {
  return result.map((item) => {
    return scheduledEntryDeserializer(item);
  });
}

/** Maintenance schedule entry for a managed environment. */
export interface ScheduledEntry {
  /** Day of the week when a managed environment can be patched. */
  weekDay: WeekDay;
  /** Start hour after which managed environment maintenance can start from 0 to 23 hour. */
  startHourUtc: number;
  /** Length of maintenance window range from 8 to 24 hours. */
  durationHours: number;
}

export function scheduledEntrySerializer(item: ScheduledEntry): any {
  return {
    weekDay: item["weekDay"],
    startHourUtc: item["startHourUtc"],
    durationHours: item["durationHours"],
  };
}

export function scheduledEntryDeserializer(item: any): ScheduledEntry {
  return {
    weekDay: item["weekDay"],
    startHourUtc: item["startHourUtc"],
    durationHours: item["durationHours"],
  };
}

/** Day of the week when a managed environment can be patched. */
export type WeekDay =
  "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

/** The response of list maintenance configuration resources. */
export interface _MaintenanceConfigurationCollection {
  /** The MaintenanceConfigurationResource items on this page */
  value: MaintenanceConfigurationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _maintenanceConfigurationCollectionDeserializer(
  item: any,
): _MaintenanceConfigurationCollection {
  return {
    value: maintenanceConfigurationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function maintenanceConfigurationResourceArraySerializer(
  result: Array<MaintenanceConfigurationResource>,
): any[] {
  return result.map((item) => {
    return maintenanceConfigurationResourceSerializer(item);
  });
}

export function maintenanceConfigurationResourceArrayDeserializer(
  result: Array<MaintenanceConfigurationResource>,
): any[] {
  return result.map((item) => {
    return maintenanceConfigurationResourceDeserializer(item);
  });
}

/** Storage resource for managedEnvironment. */
export interface ManagedEnvironmentStorage extends ProxyResource {
  /** Storage properties */
  properties?: ManagedEnvironmentStorageProperties;
}

export function managedEnvironmentStorageSerializer(item: ManagedEnvironmentStorage): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : managedEnvironmentStoragePropertiesSerializer(item["properties"]),
  };
}

export function managedEnvironmentStorageDeserializer(item: any): ManagedEnvironmentStorage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : managedEnvironmentStoragePropertiesDeserializer(item["properties"]),
  };
}

/** Storage properties */
export interface ManagedEnvironmentStorageProperties {
  /** Azure file properties */
  azureFile?: AzureFileProperties;
  /** NFS Azure file properties */
  nfsAzureFile?: NfsAzureFileProperties;
}

export function managedEnvironmentStoragePropertiesSerializer(
  item: ManagedEnvironmentStorageProperties,
): any {
  return {
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFilePropertiesSerializer(item["azureFile"]),
    nfsAzureFile: !item["nfsAzureFile"]
      ? item["nfsAzureFile"]
      : nfsAzureFilePropertiesSerializer(item["nfsAzureFile"]),
  };
}

export function managedEnvironmentStoragePropertiesDeserializer(
  item: any,
): ManagedEnvironmentStorageProperties {
  return {
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFilePropertiesDeserializer(item["azureFile"]),
    nfsAzureFile: !item["nfsAzureFile"]
      ? item["nfsAzureFile"]
      : nfsAzureFilePropertiesDeserializer(item["nfsAzureFile"]),
  };
}

/** NFS Azure File Properties. */
export interface NfsAzureFileProperties {
  /** Server for NFS azure file. Specify the Azure storage account server address. */
  server?: string;
  /** Access mode for storage */
  accessMode?: AccessMode;
  /** NFS Azure file share name. */
  shareName?: string;
}

export function nfsAzureFilePropertiesSerializer(item: NfsAzureFileProperties): any {
  return { server: item["server"], accessMode: item["accessMode"], shareName: item["shareName"] };
}

export function nfsAzureFilePropertiesDeserializer(item: any): NfsAzureFileProperties {
  return {
    server: item["server"],
    accessMode: item["accessMode"],
    shareName: item["shareName"],
  };
}

/** Collection of Storage for Environments */
export interface ManagedEnvironmentStoragesCollection {
  /** Collection of storage resources. */
  value: ManagedEnvironmentStorage[];
}

export function managedEnvironmentStoragesCollectionDeserializer(
  item: any,
): ManagedEnvironmentStoragesCollection {
  return {
    value: managedEnvironmentStorageArrayDeserializer(item["value"]),
  };
}

export function managedEnvironmentStorageArraySerializer(
  result: Array<ManagedEnvironmentStorage>,
): any[] {
  return result.map((item) => {
    return managedEnvironmentStorageSerializer(item);
  });
}

export function managedEnvironmentStorageArrayDeserializer(
  result: Array<ManagedEnvironmentStorage>,
): any[] {
  return result.map((item) => {
    return managedEnvironmentStorageDeserializer(item);
  });
}

/** Container App Job */
export interface Job extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Provisioning state of the Container Apps Job. */
  readonly provisioningState?: JobProvisioningState;
  /** Current running state of the job */
  readonly runningState?: JobRunningState;
  /** Resource ID of environment. */
  environmentId?: string;
  /** Workload profile name to pin for container apps job execution. */
  workloadProfileName?: string;
  /** Container Apps Job configuration properties. */
  configuration?: JobConfiguration;
  /** Container Apps job definition. */
  template?: JobTemplate;
  /** Outbound IP Addresses of a container apps job. */
  readonly outboundIpAddresses?: string[];
  /** The endpoint of the eventstream of the container apps job. */
  readonly eventStreamEndpoint?: string;
}

export function jobSerializer(item: Job): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "environmentId",
      "workloadProfileName",
      "configuration",
      "template",
    ])
      ? undefined
      : _jobPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function jobDeserializer(item: any): Job {
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
    ...(!item["properties"] ? item["properties"] : _jobPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Container Apps Job resource specific properties. */
export interface JobProperties {
  /** Provisioning state of the Container Apps Job. */
  readonly provisioningState?: JobProvisioningState;
  /** Current running state of the job */
  readonly runningState?: JobRunningState;
  /** Resource ID of environment. */
  environmentId?: string;
  /** Workload profile name to pin for container apps job execution. */
  workloadProfileName?: string;
  /** Container Apps Job configuration properties. */
  configuration?: JobConfiguration;
  /** Container Apps job definition. */
  template?: JobTemplate;
  /** Outbound IP Addresses of a container apps job. */
  readonly outboundIpAddresses?: string[];
  /** The endpoint of the eventstream of the container apps job. */
  readonly eventStreamEndpoint?: string;
}

export function jobPropertiesSerializer(item: JobProperties): any {
  return {
    environmentId: item["environmentId"],
    workloadProfileName: item["workloadProfileName"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : jobConfigurationSerializer(item["configuration"]),
    template: !item["template"] ? item["template"] : jobTemplateSerializer(item["template"]),
  };
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    provisioningState: item["provisioningState"],
    runningState: item["runningState"],
    environmentId: item["environmentId"],
    workloadProfileName: item["workloadProfileName"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : jobConfigurationDeserializer(item["configuration"]),
    template: !item["template"] ? item["template"] : jobTemplateDeserializer(item["template"]),
    outboundIpAddresses: !item["outboundIpAddresses"]
      ? item["outboundIpAddresses"]
      : item["outboundIpAddresses"].map((p: any) => {
          return p;
        }),
    eventStreamEndpoint: item["eventStreamEndpoint"],
  };
}

/** Provisioning state of the Container Apps Job. */
export enum KnownJobProvisioningState {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the Container Apps Job. \
 * {@link KnownJobProvisioningState} can be used interchangeably with JobProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting
 */
export type JobProvisioningState = string;

/** Current running state of the job */
export enum KnownJobRunningState {
  /** The job is ready to run. */
  Ready = "Ready",
  /** The job is transitioning to its target state. */
  Progressing = "Progressing",
  /** The job is suspended. */
  Suspended = "Suspended",
}

/**
 * Current running state of the job \
 * {@link KnownJobRunningState} can be used interchangeably with JobRunningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: The job is ready to run. \
 * **Progressing**: The job is transitioning to its target state. \
 * **Suspended**: The job is suspended.
 */
export type JobRunningState = string;

/** Non versioned Container Apps Job configuration properties */
export interface JobConfiguration {
  /** Collection of secrets used by a Container Apps Job */
  secrets?: Secret[];
  /** Trigger type of the job */
  triggerType: TriggerType;
  /** Maximum number of seconds a replica is allowed to run. */
  replicaTimeout: number;
  /** Maximum number of retries before failing the job. */
  replicaRetryLimit?: number;
  /** Manual trigger configuration for a single execution job. Properties replicaCompletionCount and parallelism would be set to 1 by default */
  manualTriggerConfig?: JobConfigurationManualTriggerConfig;
  /** Cron formatted repeating trigger schedule ("* * * * *") for cronjobs. Properties completions and parallelism would be set to 1 by default */
  scheduleTriggerConfig?: JobConfigurationScheduleTriggerConfig;
  /** Trigger configuration of an event driven job. */
  eventTriggerConfig?: JobConfigurationEventTriggerConfig;
  /** Collection of private container registry credentials used by a Container apps job */
  registries?: RegistryCredentials[];
  /** Optional settings for Managed Identities that are assigned to the Container App Job. If a Managed Identity is not specified here, default settings will be used. */
  identitySettings?: IdentitySettings[];
}

export function jobConfigurationSerializer(item: JobConfiguration): any {
  return {
    secrets: !item["secrets"] ? item["secrets"] : secretArraySerializer(item["secrets"]),
    triggerType: item["triggerType"],
    replicaTimeout: item["replicaTimeout"],
    replicaRetryLimit: item["replicaRetryLimit"],
    manualTriggerConfig: !item["manualTriggerConfig"]
      ? item["manualTriggerConfig"]
      : jobConfigurationManualTriggerConfigSerializer(item["manualTriggerConfig"]),
    scheduleTriggerConfig: !item["scheduleTriggerConfig"]
      ? item["scheduleTriggerConfig"]
      : jobConfigurationScheduleTriggerConfigSerializer(item["scheduleTriggerConfig"]),
    eventTriggerConfig: !item["eventTriggerConfig"]
      ? item["eventTriggerConfig"]
      : jobConfigurationEventTriggerConfigSerializer(item["eventTriggerConfig"]),
    registries: !item["registries"]
      ? item["registries"]
      : registryCredentialsArraySerializer(item["registries"]),
    identitySettings: !item["identitySettings"]
      ? item["identitySettings"]
      : identitySettingsArraySerializer(item["identitySettings"]),
  };
}

export function jobConfigurationDeserializer(item: any): JobConfiguration {
  return {
    secrets: !item["secrets"] ? item["secrets"] : secretArrayDeserializer(item["secrets"]),
    triggerType: item["triggerType"],
    replicaTimeout: item["replicaTimeout"],
    replicaRetryLimit: item["replicaRetryLimit"],
    manualTriggerConfig: !item["manualTriggerConfig"]
      ? item["manualTriggerConfig"]
      : jobConfigurationManualTriggerConfigDeserializer(item["manualTriggerConfig"]),
    scheduleTriggerConfig: !item["scheduleTriggerConfig"]
      ? item["scheduleTriggerConfig"]
      : jobConfigurationScheduleTriggerConfigDeserializer(item["scheduleTriggerConfig"]),
    eventTriggerConfig: !item["eventTriggerConfig"]
      ? item["eventTriggerConfig"]
      : jobConfigurationEventTriggerConfigDeserializer(item["eventTriggerConfig"]),
    registries: !item["registries"]
      ? item["registries"]
      : registryCredentialsArrayDeserializer(item["registries"]),
    identitySettings: !item["identitySettings"]
      ? item["identitySettings"]
      : identitySettingsArrayDeserializer(item["identitySettings"]),
  };
}

/** Trigger type of the job */
export enum KnownTriggerType {
  /** Schedule */
  Schedule = "Schedule",
  /** Event */
  Event = "Event",
  /** Manual */
  Manual = "Manual",
}

/**
 * Trigger type of the job \
 * {@link KnownTriggerType} can be used interchangeably with TriggerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Schedule**: Schedule \
 * **Event**: Event \
 * **Manual**: Manual
 */
export type TriggerType = string;

/** Manual trigger configuration for a single execution job. Properties replicaCompletionCount and parallelism would be set to 1 by default */
export interface JobConfigurationManualTriggerConfig {
  /** Minimum number of successful replica completions before overall job completion. */
  replicaCompletionCount?: number;
  /** Number of parallel replicas of a job that can run at a given time. */
  parallelism?: number;
}

export function jobConfigurationManualTriggerConfigSerializer(
  item: JobConfigurationManualTriggerConfig,
): any {
  return {
    replicaCompletionCount: item["replicaCompletionCount"],
    parallelism: item["parallelism"],
  };
}

export function jobConfigurationManualTriggerConfigDeserializer(
  item: any,
): JobConfigurationManualTriggerConfig {
  return {
    replicaCompletionCount: item["replicaCompletionCount"],
    parallelism: item["parallelism"],
  };
}

/** Cron formatted repeating trigger schedule ("* * * * *") for cronjobs. Properties completions and parallelism would be set to 1 by default */
export interface JobConfigurationScheduleTriggerConfig {
  /** Minimum number of successful replica completions before overall job completion. */
  replicaCompletionCount?: number;
  /** Cron formatted repeating schedule ("* * * * *") of a Cron Job. */
  cronExpression: string;
  /** Number of parallel replicas of a job that can run at a given time. */
  parallelism?: number;
}

export function jobConfigurationScheduleTriggerConfigSerializer(
  item: JobConfigurationScheduleTriggerConfig,
): any {
  return {
    replicaCompletionCount: item["replicaCompletionCount"],
    cronExpression: item["cronExpression"],
    parallelism: item["parallelism"],
  };
}

export function jobConfigurationScheduleTriggerConfigDeserializer(
  item: any,
): JobConfigurationScheduleTriggerConfig {
  return {
    replicaCompletionCount: item["replicaCompletionCount"],
    cronExpression: item["cronExpression"],
    parallelism: item["parallelism"],
  };
}

/** Trigger configuration of an event driven job. */
export interface JobConfigurationEventTriggerConfig {
  /** Minimum number of successful replica completions before overall job completion. */
  replicaCompletionCount?: number;
  /** Number of parallel replicas of a job that can run at a given time. */
  parallelism?: number;
  /** Scaling configurations for event driven jobs. */
  scale?: JobScale;
}

export function jobConfigurationEventTriggerConfigSerializer(
  item: JobConfigurationEventTriggerConfig,
): any {
  return {
    replicaCompletionCount: item["replicaCompletionCount"],
    parallelism: item["parallelism"],
    scale: !item["scale"] ? item["scale"] : jobScaleSerializer(item["scale"]),
  };
}

export function jobConfigurationEventTriggerConfigDeserializer(
  item: any,
): JobConfigurationEventTriggerConfig {
  return {
    replicaCompletionCount: item["replicaCompletionCount"],
    parallelism: item["parallelism"],
    scale: !item["scale"] ? item["scale"] : jobScaleDeserializer(item["scale"]),
  };
}

/** Scaling configurations for event driven jobs. */
export interface JobScale {
  /** Interval to check each event source in seconds. Defaults to 30s */
  pollingInterval?: number;
  /** Minimum number of job executions that are created for a trigger, default 0 */
  minExecutions?: number;
  /** Maximum number of job executions that are created for a trigger, default 100. */
  maxExecutions?: number;
  /** Scaling rules. */
  rules?: JobScaleRule[];
}

export function jobScaleSerializer(item: JobScale): any {
  return {
    pollingInterval: item["pollingInterval"],
    minExecutions: item["minExecutions"],
    maxExecutions: item["maxExecutions"],
    rules: !item["rules"] ? item["rules"] : jobScaleRuleArraySerializer(item["rules"]),
  };
}

export function jobScaleDeserializer(item: any): JobScale {
  return {
    pollingInterval: item["pollingInterval"],
    minExecutions: item["minExecutions"],
    maxExecutions: item["maxExecutions"],
    rules: !item["rules"] ? item["rules"] : jobScaleRuleArrayDeserializer(item["rules"]),
  };
}

export function jobScaleRuleArraySerializer(result: Array<JobScaleRule>): any[] {
  return result.map((item) => {
    return jobScaleRuleSerializer(item);
  });
}

export function jobScaleRuleArrayDeserializer(result: Array<JobScaleRule>): any[] {
  return result.map((item) => {
    return jobScaleRuleDeserializer(item);
  });
}

/** Scaling rule. */
export interface JobScaleRule {
  /** Scale Rule Name */
  name?: string;
  /**
   * Type of the scale rule
   * eg: azure-servicebus, redis etc.
   */
  type?: string;
  /** Metadata properties to describe the scale rule. */
  metadata?: any;
  /** Authentication secrets for the scale rule. */
  auth?: ScaleRuleAuth[];
  /** The resource ID of a user-assigned managed identity that is assigned to the job, or 'system' for system-assigned identity. */
  identity?: string;
}

export function jobScaleRuleSerializer(item: JobScaleRule): any {
  return {
    name: item["name"],
    type: item["type"],
    metadata: item["metadata"],
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArraySerializer(item["auth"]),
    identity: item["identity"],
  };
}

export function jobScaleRuleDeserializer(item: any): JobScaleRule {
  return {
    name: item["name"],
    type: item["type"],
    metadata: item["metadata"],
    auth: !item["auth"] ? item["auth"] : scaleRuleAuthArrayDeserializer(item["auth"]),
    identity: item["identity"],
  };
}

/** Container Apps Job versioned application definition. Defines the desired state of an immutable revision. Any changes to this section Will result in a new revision being created */
export interface JobTemplate {
  /** List of specialized containers that run before app containers. */
  initContainers?: InitContainer[];
  /** List of container definitions for the Container App. */
  containers?: Container[];
  /** List of volume definitions for the Container App. */
  volumes?: Volume[];
}

export function jobTemplateSerializer(item: JobTemplate): any {
  return {
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerArraySerializer(item["initContainers"]),
    containers: !item["containers"]
      ? item["containers"]
      : containerArraySerializer(item["containers"]),
    volumes: !item["volumes"] ? item["volumes"] : volumeArraySerializer(item["volumes"]),
  };
}

export function jobTemplateDeserializer(item: any): JobTemplate {
  return {
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerArrayDeserializer(item["initContainers"]),
    containers: !item["containers"]
      ? item["containers"]
      : containerArrayDeserializer(item["containers"]),
    volumes: !item["volumes"] ? item["volumes"] : volumeArrayDeserializer(item["volumes"]),
  };
}

/** Container Apps Job resource specific properties. */
export interface JobPatchProperties {
  /** Managed identities needed by a container app job to interact with other Azure services to not maintain any secrets or credentials in code. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Container Apps Job patch resource properties. */
  properties?: JobPatchPropertiesProperties;
}

export function jobPatchPropertiesSerializer(item: JobPatchProperties): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : jobPatchPropertiesPropertiesSerializer(item["properties"]),
  };
}

/** Container Apps Job patch properties. */
export interface JobPatchPropertiesProperties {
  /** Resource ID of environment. */
  environmentId?: string;
  /** Container Apps Job configuration properties. */
  configuration?: JobConfiguration;
  /** Container Apps job definition. */
  template?: JobTemplate;
  /** Outbound IP Addresses of a container apps job. */
  outboundIpAddresses?: string[];
  /** The endpoint of the eventstream of the container apps job. */
  eventStreamEndpoint?: string;
}

export function jobPatchPropertiesPropertiesSerializer(item: JobPatchPropertiesProperties): any {
  return {
    environmentId: item["environmentId"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : jobConfigurationSerializer(item["configuration"]),
    template: !item["template"] ? item["template"] : jobTemplateSerializer(item["template"]),
    outboundIpAddresses: !item["outboundIpAddresses"]
      ? item["outboundIpAddresses"]
      : item["outboundIpAddresses"].map((p: any) => {
          return p;
        }),
    eventStreamEndpoint: item["eventStreamEndpoint"],
  };
}

/** Container Apps Jobs collection ARM resource. */
export interface _JobsCollection {
  /** The Job items on this page */
  value: Job[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobsCollectionDeserializer(item: any): _JobsCollection {
  return {
    value: jobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobArraySerializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobSerializer(item);
  });
}

export function jobArrayDeserializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobDeserializer(item);
  });
}

/** Container App's Job execution name. */
export interface JobExecutionBase {
  /** Job execution name. */
  name?: string;
  /** Job execution Id. */
  id?: string;
}

export function jobExecutionBaseDeserializer(item: any): JobExecutionBase {
  return {
    name: item["name"],
    id: item["id"],
  };
}

/** Container App executions collection ARM resource. */
export interface ContainerAppJobExecutions {
  /** The JobExecution items on this page */
  value: JobExecution[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function containerAppJobExecutionsDeserializer(item: any): ContainerAppJobExecutions {
  return {
    value: jobExecutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobExecutionArrayDeserializer(result: Array<JobExecution>): any[] {
  return result.map((item) => {
    return jobExecutionDeserializer(item);
  });
}

/** Container Apps Job Secrets Collection ARM resource. */
export interface JobSecretsCollection {
  /** Collection of resources. */
  value: Secret[];
}

export function jobSecretsCollectionDeserializer(item: any): JobSecretsCollection {
  return {
    value: secretArrayDeserializer(item["value"]),
  };
}

/** Diagnostics data collection for a resource. */
export interface DiagnosticsCollection {
  /** The Diagnostics items on this page */
  value: Diagnostics[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function diagnosticsCollectionDeserializer(item: any): DiagnosticsCollection {
  return {
    value: diagnosticsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diagnosticsArrayDeserializer(result: Array<Diagnostics>): any[] {
  return result.map((item) => {
    return diagnosticsDeserializer(item);
  });
}

/** Diagnostics data for a resource. */
export interface Diagnostics extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DiagnosticsProperties;
}

export function diagnosticsDeserializer(item: any): Diagnostics {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : diagnosticsPropertiesDeserializer(item["properties"]),
  };
}

/** Diagnostics resource specific properties */
export interface DiagnosticsProperties {
  /** Metadata of the diagnostics response. */
  metadata?: DiagnosticsDefinition;
  /** Set of data collections associated with the response. */
  dataset?: DiagnosticsDataApiResponse[];
  /** Status of the diagnostics response. */
  status?: DiagnosticsStatus;
  /** List of data providers' metadata. */
  dataProviderMetadata?: DiagnosticDataProviderMetadata;
}

export function diagnosticsPropertiesDeserializer(item: any): DiagnosticsProperties {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : diagnosticsDefinitionDeserializer(item["metadata"]),
    dataset: !item["dataset"]
      ? item["dataset"]
      : diagnosticsDataApiResponseArrayDeserializer(item["dataset"]),
    status: !item["status"] ? item["status"] : diagnosticsStatusDeserializer(item["status"]),
    dataProviderMetadata: !item["dataProviderMetadata"]
      ? item["dataProviderMetadata"]
      : diagnosticDataProviderMetadataDeserializer(item["dataProviderMetadata"]),
  };
}

/** Metadata of the diagnostics response */
export interface DiagnosticsDefinition {
  /** Unique detector name */
  readonly id?: string;
  /** Display Name of the detector */
  readonly name?: string;
  /** Details of the diagnostics info */
  readonly description?: string;
  /** Authors' names of the detector */
  readonly author?: string;
  /** Category of the detector */
  readonly category?: string;
  /** List of support topics */
  supportTopicList?: DiagnosticSupportTopic[];
  /** List of analysis types */
  analysisTypes?: string[];
  /** Authors' names of the detector */
  readonly type?: string;
  /** Authors' names of the detector */
  readonly score?: number;
}

export function diagnosticsDefinitionDeserializer(item: any): DiagnosticsDefinition {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    author: item["author"],
    category: item["category"],
    supportTopicList: !item["supportTopicList"]
      ? item["supportTopicList"]
      : diagnosticSupportTopicArrayDeserializer(item["supportTopicList"]),
    analysisTypes: !item["analysisTypes"]
      ? item["analysisTypes"]
      : item["analysisTypes"].map((p: any) => {
          return p;
        }),
    type: item["type"],
    score: item["score"],
  };
}

export function diagnosticSupportTopicArrayDeserializer(
  result: Array<DiagnosticSupportTopic>,
): any[] {
  return result.map((item) => {
    return diagnosticSupportTopicDeserializer(item);
  });
}

/** Support topic information */
export interface DiagnosticSupportTopic {
  /** Unique topic identifier */
  readonly id?: string;
  /** PES identifier */
  readonly pesId?: string;
}

export function diagnosticSupportTopicDeserializer(item: any): DiagnosticSupportTopic {
  return {
    id: item["id"],
    pesId: item["pesId"],
  };
}

export function diagnosticsDataApiResponseArrayDeserializer(
  result: Array<DiagnosticsDataApiResponse>,
): any[] {
  return result.map((item) => {
    return diagnosticsDataApiResponseDeserializer(item);
  });
}

/** Diagnostics data returned from a detector */
export interface DiagnosticsDataApiResponse {
  /** Table response */
  table?: DiagnosticDataTableResponseObject;
  /** Details of the table response */
  renderingProperties?: DiagnosticRendering;
}

export function diagnosticsDataApiResponseDeserializer(item: any): DiagnosticsDataApiResponse {
  return {
    table: !item["table"]
      ? item["table"]
      : diagnosticDataTableResponseObjectDeserializer(item["table"]),
    renderingProperties: !item["renderingProperties"]
      ? item["renderingProperties"]
      : diagnosticRenderingDeserializer(item["renderingProperties"]),
  };
}

/** Diagnostics data table */
export interface DiagnosticDataTableResponseObject {
  /** Table name */
  tableName?: string;
  /** Columns in the table */
  columns?: DiagnosticDataTableResponseColumn[];
  /** Rows in the table */
  rows?: any[];
}

export function diagnosticDataTableResponseObjectDeserializer(
  item: any,
): DiagnosticDataTableResponseObject {
  return {
    tableName: item["tableName"],
    columns: !item["columns"]
      ? item["columns"]
      : diagnosticDataTableResponseColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p;
        }),
  };
}

export function diagnosticDataTableResponseColumnArrayDeserializer(
  result: Array<DiagnosticDataTableResponseColumn>,
): any[] {
  return result.map((item) => {
    return diagnosticDataTableResponseColumnDeserializer(item);
  });
}

/** Diagnostics data column */
export interface DiagnosticDataTableResponseColumn {
  /** Column name */
  columnName?: string;
  /** Data type of the column */
  dataType?: string;
  /** Column type */
  columnType?: string;
}

export function diagnosticDataTableResponseColumnDeserializer(
  item: any,
): DiagnosticDataTableResponseColumn {
  return {
    columnName: item["columnName"],
    dataType: item["dataType"],
    columnType: item["columnType"],
  };
}

/** Rendering details of a diagnostics table */
export interface DiagnosticRendering {
  /** Rendering type */
  type?: number;
  /** Title of the table */
  title?: string;
  /** Description of the table */
  description?: string;
  /** Flag if the table should be rendered */
  isVisible?: boolean;
}

export function diagnosticRenderingDeserializer(item: any): DiagnosticRendering {
  return {
    type: item["type"],
    title: item["title"],
    description: item["description"],
    isVisible: item["isVisible"],
  };
}

/** Rendering details of a diagnostics table */
export interface DiagnosticsStatus {
  /** Diagnostic message */
  message?: string;
  /** Status */
  statusId?: number;
}

export function diagnosticsStatusDeserializer(item: any): DiagnosticsStatus {
  return {
    message: item["message"],
    statusId: item["statusId"],
  };
}

/** Details of a diagnostics data provider */
export interface DiagnosticDataProviderMetadata {
  /** Name of data provider */
  providerName?: string;
  /** Collection of properties */
  propertyBag?: DiagnosticDataProviderMetadataPropertyBagItem[];
}

export function diagnosticDataProviderMetadataDeserializer(
  item: any,
): DiagnosticDataProviderMetadata {
  return {
    providerName: item["providerName"],
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : diagnosticDataProviderMetadataPropertyBagItemArrayDeserializer(item["propertyBag"]),
  };
}

export function diagnosticDataProviderMetadataPropertyBagItemArrayDeserializer(
  result: Array<DiagnosticDataProviderMetadataPropertyBagItem>,
): any[] {
  return result.map((item) => {
    return diagnosticDataProviderMetadataPropertyBagItemDeserializer(item);
  });
}

/** Property details */
export interface DiagnosticDataProviderMetadataPropertyBagItem {
  /** Property name */
  name?: string;
  /** Property value */
  value?: string;
}

export function diagnosticDataProviderMetadataPropertyBagItemDeserializer(
  item: any,
): DiagnosticDataProviderMetadataPropertyBagItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** A set of host names and http request routing rules for a Container App Environment */
export interface HttpRouteConfig extends ProxyResource {
  /** Http Route Config properties */
  properties?: HttpRouteConfigProperties;
}

export function httpRouteConfigSerializer(item: HttpRouteConfig): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : httpRouteConfigPropertiesSerializer(item["properties"]),
  };
}

export function httpRouteConfigDeserializer(item: any): HttpRouteConfig {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : httpRouteConfigPropertiesDeserializer(item["properties"]),
  };
}

/** Http Route Config properties */
export interface HttpRouteConfigProperties {
  /** The provisioning state of the Http Route Config in cluster */
  readonly provisioningState?: HttpRouteProvisioningState;
  /** List of errors when trying to reconcile http routes */
  readonly provisioningErrors?: HttpRouteProvisioningErrors[];
  /** FQDN of the route resource. */
  readonly fqdn?: string;
  /** Custom domain bindings for http Routes' hostnames. */
  customDomains?: CustomDomain[];
  /** Routing Rules for http route resource. */
  rules?: HttpRouteRule[];
}

export function httpRouteConfigPropertiesSerializer(item: HttpRouteConfigProperties): any {
  return {
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainArraySerializer(item["customDomains"]),
    rules: !item["rules"] ? item["rules"] : httpRouteRuleArraySerializer(item["rules"]),
  };
}

export function httpRouteConfigPropertiesDeserializer(item: any): HttpRouteConfigProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : httpRouteProvisioningErrorsArrayDeserializer(item["provisioningErrors"]),
    fqdn: item["fqdn"],
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : customDomainArrayDeserializer(item["customDomains"]),
    rules: !item["rules"] ? item["rules"] : httpRouteRuleArrayDeserializer(item["rules"]),
  };
}

/** The current provisioning state. */
export enum KnownHttpRouteProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Waiting */
  Waiting = "Waiting",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Pending */
  Pending = "Pending",
}

/**
 * The current provisioning state. \
 * {@link KnownHttpRouteProvisioningState} can be used interchangeably with HttpRouteProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Waiting**: Waiting \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Pending**: Pending
 */
export type HttpRouteProvisioningState = string;

export function httpRouteProvisioningErrorsArrayDeserializer(
  result: Array<HttpRouteProvisioningErrors>,
): any[] {
  return result.map((item) => {
    return httpRouteProvisioningErrorsDeserializer(item);
  });
}

/** List of provisioning errors for a Http Route Config object */
export interface HttpRouteProvisioningErrors {
  /** Timestamp error occured at */
  readonly timestamp?: Date;
  /** Description or error message */
  readonly message?: string;
}

export function httpRouteProvisioningErrorsDeserializer(item: any): HttpRouteProvisioningErrors {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    message: item["message"],
  };
}

export function httpRouteRuleArraySerializer(result: Array<HttpRouteRule>): any[] {
  return result.map((item) => {
    return httpRouteRuleSerializer(item);
  });
}

export function httpRouteRuleArrayDeserializer(result: Array<HttpRouteRule>): any[] {
  return result.map((item) => {
    return httpRouteRuleDeserializer(item);
  });
}

/** A set of routing conditions and targets. */
export interface HttpRouteRule {
  /** Targets- container apps, revisions, labels */
  targets?: HttpRouteTarget[];
  /** Routing configuration that will allow matches on specific paths/headers. */
  routes?: HttpRoute[];
  /** Description of rule. Optional. */
  description?: string;
}

export function httpRouteRuleSerializer(item: HttpRouteRule): any {
  return {
    targets: !item["targets"] ? item["targets"] : httpRouteTargetArraySerializer(item["targets"]),
    routes: !item["routes"] ? item["routes"] : httpRouteArraySerializer(item["routes"]),
    description: item["description"],
  };
}

export function httpRouteRuleDeserializer(item: any): HttpRouteRule {
  return {
    targets: !item["targets"] ? item["targets"] : httpRouteTargetArrayDeserializer(item["targets"]),
    routes: !item["routes"] ? item["routes"] : httpRouteArrayDeserializer(item["routes"]),
    description: item["description"],
  };
}

export function httpRouteTargetArraySerializer(result: Array<HttpRouteTarget>): any[] {
  return result.map((item) => {
    return httpRouteTargetSerializer(item);
  });
}

export function httpRouteTargetArrayDeserializer(result: Array<HttpRouteTarget>): any[] {
  return result.map((item) => {
    return httpRouteTargetDeserializer(item);
  });
}

/** Targets - Container App Names, Revision Names, Labels. */
export interface HttpRouteTarget {
  /** Container App Name to route requests to */
  containerApp: string;
  /** Revision to route requests to */
  revision?: string;
  /** Label to route requests to */
  label?: string;
}

export function httpRouteTargetSerializer(item: HttpRouteTarget): any {
  return { containerApp: item["containerApp"], revision: item["revision"], label: item["label"] };
}

export function httpRouteTargetDeserializer(item: any): HttpRouteTarget {
  return {
    containerApp: item["containerApp"],
    revision: item["revision"],
    label: item["label"],
  };
}

export function httpRouteArraySerializer(result: Array<HttpRoute>): any[] {
  return result.map((item) => {
    return httpRouteSerializer(item);
  });
}

export function httpRouteArrayDeserializer(result: Array<HttpRoute>): any[] {
  return result.map((item) => {
    return httpRouteDeserializer(item);
  });
}

/** Http Routes, including paths to match on and whether or not rewrites are to be done. */
export interface HttpRoute {
  /** Conditions route will match on */
  match?: HttpRouteMatch;
  /** Once route is matched, what is the desired action */
  action?: HttpRouteAction;
}

export function httpRouteSerializer(item: HttpRoute): any {
  return {
    match: !item["match"] ? item["match"] : httpRouteMatchSerializer(item["match"]),
    action: !item["action"] ? item["action"] : httpRouteActionSerializer(item["action"]),
  };
}

export function httpRouteDeserializer(item: any): HttpRoute {
  return {
    match: !item["match"] ? item["match"] : httpRouteMatchDeserializer(item["match"]),
    action: !item["action"] ? item["action"] : httpRouteActionDeserializer(item["action"]),
  };
}

/** Criteria to match on */
export interface HttpRouteMatch {
  /** match on all prefix's. Not exact */
  prefix?: string;
  /** match on exact path */
  path?: string;
  /** match on all prefix's. Not exact */
  pathSeparatedPrefix?: string;
  /** path case sensitive, default is true */
  caseSensitive?: boolean;
}

export function httpRouteMatchSerializer(item: HttpRouteMatch): any {
  return {
    prefix: item["prefix"],
    path: item["path"],
    pathSeparatedPrefix: item["pathSeparatedPrefix"],
    caseSensitive: item["caseSensitive"],
  };
}

export function httpRouteMatchDeserializer(item: any): HttpRouteMatch {
  return {
    prefix: item["prefix"],
    path: item["path"],
    pathSeparatedPrefix: item["pathSeparatedPrefix"],
    caseSensitive: item["caseSensitive"],
  };
}

/** Action to perform once matching of routes is done */
export interface HttpRouteAction {
  /** Rewrite prefix, default is no rewrites */
  prefixRewrite?: string;
}

export function httpRouteActionSerializer(item: HttpRouteAction): any {
  return { prefixRewrite: item["prefixRewrite"] };
}

export function httpRouteActionDeserializer(item: any): HttpRouteAction {
  return {
    prefixRewrite: item["prefixRewrite"],
  };
}

/** Collection of rule based Http Route Config resources. */
export interface _HttpRouteConfigCollection {
  /** The HttpRouteConfig items on this page */
  value: HttpRouteConfig[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _httpRouteConfigCollectionDeserializer(item: any): _HttpRouteConfigCollection {
  return {
    value: httpRouteConfigArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function httpRouteConfigArraySerializer(result: Array<HttpRouteConfig>): any[] {
  return result.map((item) => {
    return httpRouteConfigSerializer(item);
  });
}

export function httpRouteConfigArrayDeserializer(result: Array<HttpRouteConfig>): any[] {
  return result.map((item) => {
    return httpRouteConfigDeserializer(item);
  });
}

/** Collection of available workload profiles in the location. */
export interface _AvailableWorkloadProfilesCollection {
  /** The AvailableWorkloadProfile items on this page */
  value: AvailableWorkloadProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _availableWorkloadProfilesCollectionDeserializer(
  item: any,
): _AvailableWorkloadProfilesCollection {
  return {
    value: availableWorkloadProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function availableWorkloadProfileArrayDeserializer(
  result: Array<AvailableWorkloadProfile>,
): any[] {
  return result.map((item) => {
    return availableWorkloadProfileDeserializer(item);
  });
}

/** A workload profile with specific hardware configure to run container apps. */
export interface AvailableWorkloadProfile extends ProxyResource {
  /** Region of the workload profile. */
  location?: string;
  /** Revision resource specific properties */
  properties?: AvailableWorkloadProfileProperties;
}

export function availableWorkloadProfileDeserializer(item: any): AvailableWorkloadProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : availableWorkloadProfilePropertiesDeserializer(item["properties"]),
  };
}

/** Revision resource specific properties */
export interface AvailableWorkloadProfileProperties {
  /** Used to categorize workload profiles. */
  category?: string;
  /** indicates whether the profile is default for the location. */
  applicability?: Applicability;
  /** Number of cores in CPU. */
  cores?: number;
  /** Memory in GiB. */
  memoryGiB?: number;
  /** Number of GPUs. */
  gpus?: number;
  /** The everyday name of the workload profile. */
  displayName?: string;
}

export function availableWorkloadProfilePropertiesDeserializer(
  item: any,
): AvailableWorkloadProfileProperties {
  return {
    category: item["category"],
    applicability: item["applicability"],
    cores: item["cores"],
    memoryGiB: item["memoryGiB"],
    gpus: item["gpus"],
    displayName: item["displayName"],
  };
}

/** indicates whether the profile is default for the location. */
export enum KnownApplicability {
  /** LocationDefault */
  LocationDefault = "LocationDefault",
  /** Custom */
  Custom = "Custom",
}

/**
 * indicates whether the profile is default for the location. \
 * {@link KnownApplicability} can be used interchangeably with Applicability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LocationDefault**: LocationDefault \
 * **Custom**: Custom
 */
export type Applicability = string;

/** Collection of environment modes available in the location. */
export interface _AvailableEnvironmentModesCollection {
  /** The AvailableEnvironmentMode items on this page */
  value: AvailableEnvironmentMode[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _availableEnvironmentModesCollectionDeserializer(
  item: any,
): _AvailableEnvironmentModesCollection {
  return {
    value: availableEnvironmentModeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function availableEnvironmentModeArrayDeserializer(
  result: Array<AvailableEnvironmentMode>,
): any[] {
  return result.map((item) => {
    return availableEnvironmentModeDeserializer(item);
  });
}

/** An environment mode available to the subscription. */
export interface AvailableEnvironmentMode extends ProxyResource {
  /** The Azure region in which the environment mode is available. */
  location?: string;
  /** The environment mode details. */
  properties?: AvailableEnvironmentModeProperties;
}

export function availableEnvironmentModeDeserializer(item: any): AvailableEnvironmentMode {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : availableEnvironmentModePropertiesDeserializer(item["properties"]),
  };
}

/** Details that describe an available environment mode. */
export interface AvailableEnvironmentModeProperties {
  /** The display name of the environment mode. */
  readonly displayName?: string;
  /** The description of the environment mode. */
  readonly description?: string;
}

export function availableEnvironmentModePropertiesDeserializer(
  item: any,
): AvailableEnvironmentModeProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
  };
}

/** Collection of billing meters. */
export interface BillingMeterCollection {
  /** Collection of billing meters. */
  value: BillingMeter[];
}

export function billingMeterCollectionDeserializer(item: any): BillingMeterCollection {
  return {
    value: billingMeterArrayDeserializer(item["value"]),
  };
}

export function billingMeterArrayDeserializer(result: Array<BillingMeter>): any[] {
  return result.map((item) => {
    return billingMeterDeserializer(item);
  });
}

/** Billing meter. */
export interface BillingMeter extends ProxyResource {
  /** Region for the billing meter. */
  location?: string;
  /** Revision resource specific properties */
  properties?: BillingMeterProperties;
}

export function billingMeterDeserializer(item: any): BillingMeter {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : billingMeterPropertiesDeserializer(item["properties"]),
  };
}

/** Revision resource specific properties */
export interface BillingMeterProperties {
  /** Used to categorize billing meters. */
  category?: string;
  /** Billing meter type. */
  meterType?: string;
  /** The everyday name of the billing meter. */
  displayName?: string;
}

export function billingMeterPropertiesDeserializer(item: any): BillingMeterProperties {
  return {
    category: item["category"],
    meterType: item["meterType"],
    displayName: item["displayName"],
  };
}

/** Paged collection of Usage items */
export interface _ListUsagesResult {
  /** The Usage items on this page */
  value: Usage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listUsagesResultDeserializer(item: any): _ListUsagesResult {
  return {
    value: usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** Describes Compute Resource Usage. */
export interface Usage {
  /** An enum describing the unit of usage measurement. */
  unit: "Count";
  /** The current usage of the resource. */
  currentValue: number;
  /** The maximum permitted usage of the resource. */
  limit: number;
  /** The name of the type of usage. */
  name: UsageName;
}

export function usageDeserializer(item: any): Usage {
  return {
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: usageNameDeserializer(item["name"]),
  };
}

/** The Usage Names. */
export interface UsageName {
  /** The name of the resource. */
  value?: string;
  /** The localized name of the resource. */
  localizedValue?: string;
}

export function usageNameDeserializer(item: any): UsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-01-01 API version. */
  V20260101 = "2026-01-01",
  /** The 2026-07-01 API version. */
  V20260701 = "2026-07-01",
}

export function _jobExecutionPropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    template: !item["template"]
      ? item["template"]
      : jobExecutionTemplateDeserializer(item["template"]),
    detailedStatus: !item["detailedStatus"]
      ? item["detailedStatus"]
      : executionStatusDeserializer(item["detailedStatus"]),
    reason: item["reason"],
    message: item["message"],
  };
}

export function _sessionPoolPropertiesSerializer(item: SessionPool): any {
  return {
    environmentId: item["environmentId"],
    containerType: item["containerType"],
    poolManagementType: item["poolManagementType"],
    scaleConfiguration: !item["scaleConfiguration"]
      ? item["scaleConfiguration"]
      : scaleConfigurationSerializer(item["scaleConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : sessionPoolSecretArraySerializer(item["secrets"]),
    dynamicPoolConfiguration: !item["dynamicPoolConfiguration"]
      ? item["dynamicPoolConfiguration"]
      : dynamicPoolConfigurationSerializer(item["dynamicPoolConfiguration"]),
    customContainerTemplate: !item["customContainerTemplate"]
      ? item["customContainerTemplate"]
      : customContainerTemplateSerializer(item["customContainerTemplate"]),
    sessionNetworkConfiguration: !item["sessionNetworkConfiguration"]
      ? item["sessionNetworkConfiguration"]
      : sessionNetworkConfigurationSerializer(item["sessionNetworkConfiguration"]),
    managedIdentitySettings: !item["managedIdentitySettings"]
      ? item["managedIdentitySettings"]
      : managedIdentitySettingArraySerializer(item["managedIdentitySettings"]),
  };
}

export function _sessionPoolPropertiesDeserializer(item: any) {
  return {
    environmentId: item["environmentId"],
    containerType: item["containerType"],
    poolManagementType: item["poolManagementType"],
    nodeCount: item["nodeCount"],
    scaleConfiguration: !item["scaleConfiguration"]
      ? item["scaleConfiguration"]
      : scaleConfigurationDeserializer(item["scaleConfiguration"]),
    secrets: !item["secrets"]
      ? item["secrets"]
      : sessionPoolSecretArrayDeserializer(item["secrets"]),
    dynamicPoolConfiguration: !item["dynamicPoolConfiguration"]
      ? item["dynamicPoolConfiguration"]
      : dynamicPoolConfigurationDeserializer(item["dynamicPoolConfiguration"]),
    customContainerTemplate: !item["customContainerTemplate"]
      ? item["customContainerTemplate"]
      : customContainerTemplateDeserializer(item["customContainerTemplate"]),
    sessionNetworkConfiguration: !item["sessionNetworkConfiguration"]
      ? item["sessionNetworkConfiguration"]
      : sessionNetworkConfigurationDeserializer(item["sessionNetworkConfiguration"]),
    poolManagementEndpoint: item["poolManagementEndpoint"],
    provisioningState: item["provisioningState"],
    managedIdentitySettings: !item["managedIdentitySettings"]
      ? item["managedIdentitySettings"]
      : managedIdentitySettingArrayDeserializer(item["managedIdentitySettings"]),
  };
}

export function _sessionPoolUpdatablePropertiesPropertiesSerializer(
  item: SessionPoolUpdatableProperties,
): any {
  return {
    scaleConfiguration: !item["scaleConfiguration"]
      ? item["scaleConfiguration"]
      : scaleConfigurationSerializer(item["scaleConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : sessionPoolSecretArraySerializer(item["secrets"]),
    dynamicPoolConfiguration: !item["dynamicPoolConfiguration"]
      ? item["dynamicPoolConfiguration"]
      : dynamicPoolConfigurationSerializer(item["dynamicPoolConfiguration"]),
    customContainerTemplate: !item["customContainerTemplate"]
      ? item["customContainerTemplate"]
      : customContainerTemplateSerializer(item["customContainerTemplate"]),
    sessionNetworkConfiguration: !item["sessionNetworkConfiguration"]
      ? item["sessionNetworkConfiguration"]
      : sessionNetworkConfigurationSerializer(item["sessionNetworkConfiguration"]),
  };
}

export function _sourceControlPropertiesSerializer(item: SourceControl): any {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    githubActionConfiguration: !item["githubActionConfiguration"]
      ? item["githubActionConfiguration"]
      : githubActionConfigurationSerializer(item["githubActionConfiguration"]),
  };
}

export function _sourceControlPropertiesDeserializer(item: any) {
  return {
    operationState: item["operationState"],
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    githubActionConfiguration: !item["githubActionConfiguration"]
      ? item["githubActionConfiguration"]
      : githubActionConfigurationDeserializer(item["githubActionConfiguration"]),
  };
}

export function _containerAppPropertiesSerializer(item: ContainerApp): any {
  return {
    managedEnvironmentId: item["managedEnvironmentId"],
    environmentId: item["environmentId"],
    networking: !item["networking"]
      ? item["networking"]
      : containerAppNetworkingConfigurationSerializer(item["networking"]),
    workloadProfileName: item["workloadProfileName"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : configurationSerializer(item["configuration"]),
    template: !item["template"] ? item["template"] : templateSerializer(item["template"]),
  };
}

export function _containerAppPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    runningStatus: item["runningStatus"],
    managedEnvironmentId: item["managedEnvironmentId"],
    environmentId: item["environmentId"],
    networking: !item["networking"]
      ? item["networking"]
      : containerAppNetworkingConfigurationDeserializer(item["networking"]),
    workloadProfileName: item["workloadProfileName"],
    latestRevisionName: item["latestRevisionName"],
    latestReadyRevisionName: item["latestReadyRevisionName"],
    latestRevisionFqdn: item["latestRevisionFqdn"],
    customDomainVerificationId: item["customDomainVerificationId"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : configurationDeserializer(item["configuration"]),
    template: !item["template"] ? item["template"] : templateDeserializer(item["template"]),
    outboundIpAddresses: !item["outboundIpAddresses"]
      ? item["outboundIpAddresses"]
      : item["outboundIpAddresses"].map((p: any) => {
          return p;
        }),
    eventStreamEndpoint: item["eventStreamEndpoint"],
  };
}

export function _containerAppAuthTokenPropertiesDeserializer(item: any) {
  return {
    token: item["token"],
    expires: !item["expires"] ? item["expires"] : new Date(item["expires"]),
  };
}

export function _containerAppsFunctionPropertiesDeserializer(item: any) {
  return {
    invokeUrlTemplate: item["invokeUrlTemplate"],
    triggerType: item["triggerType"],
    language: item["language"],
    isDisabled: item["isDisabled"],
    state: item["state"],
  };
}

export function _revisionPropertiesDeserializer(item: any) {
  return {
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    lastActiveTime: !item["lastActiveTime"]
      ? item["lastActiveTime"]
      : new Date(item["lastActiveTime"]),
    fqdn: item["fqdn"],
    template: !item["template"] ? item["template"] : templateDeserializer(item["template"]),
    active: item["active"],
    replicas: item["replicas"],
    trafficWeight: item["trafficWeight"],
    provisioningError: item["provisioningError"],
    healthState: item["healthState"],
    provisioningState: item["provisioningState"],
    runningState: item["runningState"],
  };
}

export function _replicaPropertiesDeserializer(item: any) {
  return {
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    runningState: item["runningState"],
    runningStateDetails: item["runningStateDetails"],
    containers: !item["containers"]
      ? item["containers"]
      : replicaContainerArrayDeserializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : replicaContainerArrayDeserializer(item["initContainers"]),
  };
}

export function _dotNetComponentPropertiesSerializer(item: DotNetComponent): any {
  return {
    componentType: item["componentType"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : dotNetComponentConfigurationPropertyArraySerializer(item["configurations"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : dotNetComponentServiceBindArraySerializer(item["serviceBinds"]),
  };
}

export function _dotNetComponentPropertiesDeserializer(item: any) {
  return {
    componentType: item["componentType"],
    provisioningState: item["provisioningState"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : dotNetComponentConfigurationPropertyArrayDeserializer(item["configurations"]),
    serviceBinds: !item["serviceBinds"]
      ? item["serviceBinds"]
      : dotNetComponentServiceBindArrayDeserializer(item["serviceBinds"]),
  };
}

export function _authConfigPropertiesSerializer(item: AuthConfig): any {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformSerializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationSerializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersSerializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginSerializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsSerializer(item["httpSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsSerializer(item["encryptionSettings"]),
  };
}

export function _authConfigPropertiesDeserializer(item: any) {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformDeserializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationDeserializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersDeserializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginDeserializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsDeserializer(item["httpSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsDeserializer(item["encryptionSettings"]),
  };
}

export function _connectedEnvironmentPropertiesSerializer(item: ConnectedEnvironment): any {
  return {
    staticIp: item["staticIp"],
    daprAIConnectionString: item["daprAIConnectionString"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationSerializer(item["customDomainConfiguration"]),
  };
}

export function _connectedEnvironmentPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
    defaultDomain: item["defaultDomain"],
    staticIp: item["staticIp"],
    daprAIConnectionString: item["daprAIConnectionString"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationDeserializer(item["customDomainConfiguration"]),
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _managedEnvironmentPropertiesSerializer(item: ManagedEnvironment): any {
  return {
    daprAIInstrumentationKey: item["daprAIInstrumentationKey"],
    daprAIConnectionString: item["daprAIConnectionString"],
    vnetConfiguration: !item["vnetConfiguration"]
      ? item["vnetConfiguration"]
      : vnetConfigurationSerializer(item["vnetConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationSerializer(item["appLogsConfiguration"]),
    appInsightsConfiguration: !item["appInsightsConfiguration"]
      ? item["appInsightsConfiguration"]
      : appInsightsConfigurationSerializer(item["appInsightsConfiguration"]),
    openTelemetryConfiguration: !item["openTelemetryConfiguration"]
      ? item["openTelemetryConfiguration"]
      : openTelemetryConfigurationSerializer(item["openTelemetryConfiguration"]),
    zoneRedundant: item["zoneRedundant"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationSerializer(item["customDomainConfiguration"]),
    workloadProfiles: !item["workloadProfiles"]
      ? item["workloadProfiles"]
      : workloadProfileArraySerializer(item["workloadProfiles"]),
    kedaConfiguration: !item["kedaConfiguration"]
      ? item["kedaConfiguration"]
      : kedaConfigurationSerializer(item["kedaConfiguration"]),
    daprConfiguration: !item["daprConfiguration"]
      ? item["daprConfiguration"]
      : daprConfigurationSerializer(item["daprConfiguration"]),
    infrastructureResourceGroup: item["infrastructureResourceGroup"],
    peerAuthentication: !item["peerAuthentication"]
      ? item["peerAuthentication"]
      : managedEnvironmentPropertiesPeerAuthenticationSerializer(item["peerAuthentication"]),
    peerTrafficConfiguration: !item["peerTrafficConfiguration"]
      ? item["peerTrafficConfiguration"]
      : managedEnvironmentPropertiesPeerTrafficConfigurationSerializer(
          item["peerTrafficConfiguration"],
        ),
    ingressConfiguration: !item["ingressConfiguration"]
      ? item["ingressConfiguration"]
      : ingressConfigurationSerializer(item["ingressConfiguration"]),
    environmentMode: item["environmentMode"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _managedEnvironmentPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    daprAIInstrumentationKey: item["daprAIInstrumentationKey"],
    daprAIConnectionString: item["daprAIConnectionString"],
    vnetConfiguration: !item["vnetConfiguration"]
      ? item["vnetConfiguration"]
      : vnetConfigurationDeserializer(item["vnetConfiguration"]),
    deploymentErrors: item["deploymentErrors"],
    defaultDomain: item["defaultDomain"],
    staticIp: item["staticIp"],
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationDeserializer(item["appLogsConfiguration"]),
    appInsightsConfiguration: !item["appInsightsConfiguration"]
      ? item["appInsightsConfiguration"]
      : appInsightsConfigurationDeserializer(item["appInsightsConfiguration"]),
    openTelemetryConfiguration: !item["openTelemetryConfiguration"]
      ? item["openTelemetryConfiguration"]
      : openTelemetryConfigurationDeserializer(item["openTelemetryConfiguration"]),
    zoneRedundant: item["zoneRedundant"],
    customDomainConfiguration: !item["customDomainConfiguration"]
      ? item["customDomainConfiguration"]
      : customDomainConfigurationDeserializer(item["customDomainConfiguration"]),
    eventStreamEndpoint: item["eventStreamEndpoint"],
    workloadProfiles: !item["workloadProfiles"]
      ? item["workloadProfiles"]
      : workloadProfileArrayDeserializer(item["workloadProfiles"]),
    kedaConfiguration: !item["kedaConfiguration"]
      ? item["kedaConfiguration"]
      : kedaConfigurationDeserializer(item["kedaConfiguration"]),
    daprConfiguration: !item["daprConfiguration"]
      ? item["daprConfiguration"]
      : daprConfigurationDeserializer(item["daprConfiguration"]),
    infrastructureResourceGroup: item["infrastructureResourceGroup"],
    peerAuthentication: !item["peerAuthentication"]
      ? item["peerAuthentication"]
      : managedEnvironmentPropertiesPeerAuthenticationDeserializer(item["peerAuthentication"]),
    peerTrafficConfiguration: !item["peerTrafficConfiguration"]
      ? item["peerTrafficConfiguration"]
      : managedEnvironmentPropertiesPeerTrafficConfigurationDeserializer(
          item["peerTrafficConfiguration"],
        ),
    ingressConfiguration: !item["ingressConfiguration"]
      ? item["ingressConfiguration"]
      : ingressConfigurationDeserializer(item["ingressConfiguration"]),
    environmentMode: item["environmentMode"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _environmentAuthTokenPropertiesDeserializer(item: any) {
  return {
    token: item["token"],
    expires: !item["expires"] ? item["expires"] : new Date(item["expires"]),
  };
}

export function _daprComponentPropertiesSerializer(item: DaprComponent): any {
  return {
    componentType: item["componentType"],
    version: item["version"],
    ignoreErrors: item["ignoreErrors"],
    initTimeout: item["initTimeout"],
    secrets: !item["secrets"] ? item["secrets"] : secretArraySerializer(item["secrets"]),
    secretStoreComponent: item["secretStoreComponent"],
    metadata: !item["metadata"] ? item["metadata"] : daprMetadataArraySerializer(item["metadata"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function _daprComponentPropertiesDeserializer(item: any) {
  return {
    componentType: item["componentType"],
    version: item["version"],
    ignoreErrors: item["ignoreErrors"],
    initTimeout: item["initTimeout"],
    secrets: !item["secrets"] ? item["secrets"] : secretArrayDeserializer(item["secrets"]),
    secretStoreComponent: item["secretStoreComponent"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : daprMetadataArrayDeserializer(item["metadata"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _daprComponentResiliencyPolicyPropertiesSerializer(
  item: DaprComponentResiliencyPolicy,
): any {
  return {
    inboundPolicy: !item["inboundPolicy"]
      ? item["inboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationSerializer(item["inboundPolicy"]),
    outboundPolicy: !item["outboundPolicy"]
      ? item["outboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationSerializer(item["outboundPolicy"]),
  };
}

export function _daprComponentResiliencyPolicyPropertiesDeserializer(item: any) {
  return {
    inboundPolicy: !item["inboundPolicy"]
      ? item["inboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationDeserializer(item["inboundPolicy"]),
    outboundPolicy: !item["outboundPolicy"]
      ? item["outboundPolicy"]
      : daprComponentResiliencyPolicyConfigurationDeserializer(item["outboundPolicy"]),
  };
}

export function _maintenanceConfigurationResourcePropertiesSerializer(
  item: MaintenanceConfigurationResource,
): any {
  return {
    scheduledEntries: !item["scheduledEntries"]
      ? item["scheduledEntries"]
      : scheduledEntryArraySerializer(item["scheduledEntries"]),
  };
}

export function _maintenanceConfigurationResourcePropertiesDeserializer(item: any) {
  return {
    scheduledEntries: !item["scheduledEntries"]
      ? item["scheduledEntries"]
      : scheduledEntryArrayDeserializer(item["scheduledEntries"]),
  };
}

export function _jobPropertiesSerializer(item: Job): any {
  return {
    environmentId: item["environmentId"],
    workloadProfileName: item["workloadProfileName"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : jobConfigurationSerializer(item["configuration"]),
    template: !item["template"] ? item["template"] : jobTemplateSerializer(item["template"]),
  };
}

export function _jobPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    runningState: item["runningState"],
    environmentId: item["environmentId"],
    workloadProfileName: item["workloadProfileName"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : jobConfigurationDeserializer(item["configuration"]),
    template: !item["template"] ? item["template"] : jobTemplateDeserializer(item["template"]),
    outboundIpAddresses: !item["outboundIpAddresses"]
      ? item["outboundIpAddresses"]
      : item["outboundIpAddresses"].map((p: any) => {
          return p;
        }),
    eventStreamEndpoint: item["eventStreamEndpoint"],
  };
}

export type GetCustomDomainVerificationIdResponse = { body: string };

export type FunctionsExtensionInvokeFunctionsHostResponse = { body: string };
