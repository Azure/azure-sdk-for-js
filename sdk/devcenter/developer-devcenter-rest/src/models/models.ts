// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorModel } from "@azure-rest/core-client";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of Project items */
export interface _PagedProject {
  /** The Project items on this page */
  value: Project[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedProjectDeserializer(item: any): _PagedProject {
  return {
    value: projectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectArrayDeserializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectDeserializer(item);
  });
}

/** Project details. */
export interface Project {
  /** Name of the project. */
  readonly name: string;
  /** Description of the project. */
  description?: string;
  /**
   * When specified, indicates the maximum number of Dev Boxes a single user can
   * create across all pools in the project.
   */
  maxDevBoxesPerUser?: number;
}

export function projectDeserializer(item: any): Project {
  return {
    name: item["name"],
    description: item["description"],
    maxDevBoxesPerUser: item["maxDevBoxesPerUser"],
  };
}

/** Paged collection of Pool items */
export interface _PagedPool {
  /** The Pool items on this page */
  value: Pool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedPoolDeserializer(item: any): _PagedPool {
  return {
    value: poolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function poolArrayDeserializer(result: Array<Pool>): any[] {
  return result.map((item) => {
    return poolDeserializer(item);
  });
}

/** A pool of Dev Boxes. */
export interface Pool {
  /** Pool name. */
  readonly name: string;
  /** Azure region where Dev Boxes in the pool are located. */
  location: string;
  /** The operating system type of Dev Boxes in this pool. */
  osType?: OsType;
  /** Hardware settings for the Dev Boxes created in this pool. */
  hardwareProfile?: HardwareProfile;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  hibernateSupport?: HibernateSupport;
  /** Storage settings for Dev Box created in this pool. */
  storageProfile?: StorageProfile;
  /** Image settings for Dev Boxes create in this pool. */
  imageReference?: ImageReference;
  /**
   * Indicates whether owners of Dev Boxes in this pool are local administrators on
   * the Dev Boxes.
   */
  localAdministrator?: LocalAdministratorStatus;
  /** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
  stopOnDisconnect?: StopOnDisconnectConfiguration;
  /**
   * Overall health status of the Pool. Indicates whether or not the Pool is
   * available to create Dev Boxes.
   */
  healthStatus: PoolHealthStatus;
}

export function poolDeserializer(item: any): Pool {
  return {
    name: item["name"],
    location: item["location"],
    osType: item["osType"],
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    hibernateSupport: item["hibernateSupport"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    localAdministrator: item["localAdministrator"],
    stopOnDisconnect: !item["stopOnDisconnect"]
      ? item["stopOnDisconnect"]
      : stopOnDisconnectConfigurationDeserializer(item["stopOnDisconnect"]),
    healthStatus: item["healthStatus"],
  };
}

/** The operating system type. */
export type OsType = "Windows";

/** Hardware specifications for the Dev Box. */
export interface HardwareProfile {
  /** The name of the SKU. */
  readonly skuName?: SkuName;
  /** The number of vCPUs available for the Dev Box. */
  readonly vCPUs?: number;
  /** The amount of memory available for the Dev Box. */
  readonly memoryGB?: number;
}

export function hardwareProfileDeserializer(item: any): HardwareProfile {
  return {
    skuName: item["skuName"],
    vCPUs: item["vCPUs"],
    memoryGB: item["memoryGB"],
  };
}

/** Indicates the Dev Box compute. */
export type SkuName =
  | "general_i_8c32gb256ssd_v2"
  | "general_i_8c32gb512ssd_v2"
  | "general_i_8c32gb1024ssd_v2"
  | "general_i_8c32gb2048ssd_v2"
  | "general_i_16c64gb256ssd_v2"
  | "general_i_16c64gb512ssd_v2"
  | "general_i_16c64gb1024ssd_v2"
  | "general_i_16c64gb2048ssd_v2"
  | "general_i_32c128gb512ssd_v2"
  | "general_i_32c128gb1024ssd_v2"
  | "general_i_32c128gb2048ssd_v2"
  | "general_a_8c32gb256ssd_v2"
  | "general_a_8c32gb512ssd_v2"
  | "general_a_8c32gb1024ssd_v2"
  | "general_a_8c32gb2048ssd_v2"
  | "general_a_16c64gb256ssd_v2"
  | "general_a_16c64gb512ssd_v2"
  | "general_a_16c64gb1024ssd_v2"
  | "general_a_16c64gb2048ssd_v2"
  | "general_a_32c128gb512ssd_v2"
  | "general_a_32c128gb1024ssd_v2"
  | "general_a_32c128gb2048ssd_v2";
/** Indicates whether hibernate is supported and enabled, disabled, or unsupported by the operating system. Unknown hibernate support is represented as null. */
export type HibernateSupport = "Enabled" | "Disabled" | "OsUnsupported";

/** Storage settings for the Dev Box's disks. */
export interface StorageProfile {
  /** Settings for the operating system disk. */
  osDisk?: OsDisk;
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskDeserializer(item["osDisk"]),
  };
}

/** Settings for the operating system disk. */
export interface OsDisk {
  /** The size of the OS Disk in gigabytes. */
  readonly diskSizeGB?: number;
}

export function osDiskDeserializer(item: any): OsDisk {
  return {
    diskSizeGB: item["diskSizeGB"],
  };
}

/** Specifies information about the image used. */
export interface ImageReference {
  /** The name of the image used. */
  readonly name?: string;
  /** The version of the image. */
  readonly version?: string;
  /** The operating system of the image. */
  readonly operatingSystem?: string;
  /** The operating system build number of the image. */
  readonly osBuildNumber?: string;
  /** The datetime that the backing image version was published, in RFC3339 format. */
  readonly publishedDate?: Date;
}

export function imageReferenceDeserializer(item: any): ImageReference {
  return {
    name: item["name"],
    version: item["version"],
    operatingSystem: item["operatingSystem"],
    osBuildNumber: item["osBuildNumber"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
  };
}

/** Indicates whether owners of Dev Boxes in a pool are local administrators on the Dev Boxes. */
export type LocalAdministratorStatus = "Enabled" | "Disabled";

/** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
export interface StopOnDisconnectConfiguration {
  /**
   * Indicates whether the feature to stop the devbox on disconnect once the grace
   * period has lapsed is enabled.
   */
  status: StopOnDisconnectStatus;
  /**
   * The specified time in minutes to wait before stopping a Dev Box once disconnect
   * is detected.
   */
  gracePeriodMinutes?: number;
}

export function stopOnDisconnectConfigurationDeserializer(
  item: any,
): StopOnDisconnectConfiguration {
  return {
    status: item["status"],
    gracePeriodMinutes: item["gracePeriodMinutes"],
  };
}

/** Indicates whether the feature to stop the devbox on disconnect once the grace period has lapsed is enabled. */
export type StopOnDisconnectStatus = "Enabled" | "Disabled";
/** Pool status indicating whether a pool is available to create Dev Boxes. */
export type PoolHealthStatus = "Unknown" | "Pending" | "Healthy" | "Warning" | "Unhealthy";

/** Paged collection of Schedule items */
export interface _PagedSchedule {
  /** The Schedule items on this page */
  value: Schedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedScheduleDeserializer(item: any): _PagedSchedule {
  return {
    value: scheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduleArrayDeserializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleDeserializer(item);
  });
}

/** A Schedule to execute action. */
export interface Schedule {
  /** Display name for the Schedule. */
  readonly name: string;
  /** Supported type this scheduled task represents. */
  type: ScheduledType;
  /** The frequency of this scheduled task. */
  frequency: ScheduledFrequency;
  /** The target time to trigger the action. The format is HH:MM. */
  time: string;
  /** The IANA timezone id at which the schedule should execute. */
  timeZone: string;
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    name: item["name"],
    type: item["type"],
    frequency: item["frequency"],
    time: item["time"],
    timeZone: item["timeZone"],
  };
}

/** The supported types for a scheduled task. */
export type ScheduledType = "StopDevBox";
/** The frequency of task execution. */
export type ScheduledFrequency = "Daily";

/** Paged collection of DevBox items */
export interface _PagedDevBox {
  /** The DevBox items on this page */
  value: DevBox[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDevBoxDeserializer(item: any): _PagedDevBox {
  return {
    value: devBoxArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devBoxArraySerializer(result: Array<DevBox>): any[] {
  return result.map((item) => {
    return devBoxSerializer(item);
  });
}

export function devBoxArrayDeserializer(result: Array<DevBox>): any[] {
  return result.map((item) => {
    return devBoxDeserializer(item);
  });
}

/** A Dev Box. */
export interface DevBox {
  /** Display name for the Dev Box. */
  readonly name: string;
  /** Name of the project this Dev Box belongs to. */
  readonly projectName?: string;
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  readonly hibernateSupport?: HibernateSupport;
  /** The current provisioning state of the Dev Box. */
  readonly provisioningState?: DevBoxProvisioningState;
  /**
   * The current action state of the Dev Box. This is state is based on previous
   * action performed by user.
   */
  readonly actionState?: string;
  /** The current power state of the Dev Box. */
  readonly powerState?: PowerState;
  /**
   * A unique identifier for the Dev Box. This is a GUID-formatted string (e.g.
   * 00000000-0000-0000-0000-000000000000).
   */
  readonly uniqueId?: string;
  /** Provisioning or action error details. Populated only for error states. */
  readonly error?: ErrorModel;
  /**
   * Azure region where this Dev Box is located. This will be the same region as the
   * Virtual Network it is attached to.
   */
  readonly location?: string;
  /** The operating system type of this Dev Box. */
  readonly osType?: OsType;
  /** The AAD object id of the user this Dev Box is assigned to. */
  readonly user?: string;
  /** Information about the Dev Box's hardware resources. */
  readonly hardwareProfile?: HardwareProfile;
  /** Storage settings for this Dev Box. */
  readonly storageProfile?: StorageProfile;
  /** Information about the image used for this Dev Box. */
  readonly imageReference?: ImageReference;
  /** Creation time of this Dev Box, in RFC3339 format. */
  readonly createdTime?: Date;
  /** Indicates whether the owner of the Dev Box is a local administrator. */
  readonly localAdministrator?: LocalAdministratorStatus;
}

export function devBoxSerializer(item: DevBox): any {
  return { poolName: item["poolName"] };
}

export function devBoxDeserializer(item: any): DevBox {
  return {
    name: item["name"],
    projectName: item["projectName"],
    poolName: item["poolName"],
    hibernateSupport: item["hibernateSupport"],
    provisioningState: item["provisioningState"],
    actionState: item["actionState"],
    powerState: item["powerState"],
    uniqueId: item["uniqueId"],
    error: !item["error"] ? item["error"] : item["error"],
    location: item["location"],
    osType: item["osType"],
    user: item["user"],
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    localAdministrator: item["localAdministrator"],
  };
}

/** Indicates the provisioning state of the Dev Box. */
export type DevBoxProvisioningState =
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Creating"
  | "Deleting"
  | "Updating"
  | "Starting"
  | "Stopping"
  | "Provisioning"
  | "ProvisionedWithWarning"
  | "InGracePeriod"
  | "NotProvisioned";
/** The power states of a Dev Box. */
export type PowerState = "Unknown" | "Running" | "Deallocated" | "PoweredOff" | "Hibernated";

/** Provides remote connection information for a Dev Box. */
export interface RemoteConnection {
  /** URL to open a browser based RDP session. */
  webUrl?: string;
  /** Link to open a Remote Desktop session. */
  rdpConnectionUrl?: string;
}

export function remoteConnectionDeserializer(item: any): RemoteConnection {
  return {
    webUrl: item["webUrl"],
    rdpConnectionUrl: item["rdpConnectionUrl"],
  };
}

/** Paged collection of DevBoxAction items */
export interface _PagedDevBoxAction {
  /** The DevBoxAction items on this page */
  value: DevBoxAction[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDevBoxActionDeserializer(item: any): _PagedDevBoxAction {
  return {
    value: devBoxActionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devBoxActionArrayDeserializer(result: Array<DevBoxAction>): any[] {
  return result.map((item) => {
    return devBoxActionDeserializer(item);
  });
}

/** An action which will take place on a Dev Box. */
export interface DevBoxAction {
  /** The name of the action. */
  readonly name: string;
  /** The action that will be taken. */
  actionType: DevBoxActionType;
  /** The id of the resource which triggered this action. */
  sourceId: string;
  /** The earliest time that the action could occur (UTC), in RFC3339 format. */
  suspendedUntil?: Date;
  /** Details about the next run of this action. */
  next?: DevBoxNextAction;
}

export function devBoxActionDeserializer(item: any): DevBoxAction {
  return {
    name: item["name"],
    actionType: item["actionType"],
    sourceId: item["sourceId"],
    suspendedUntil: !item["suspendedUntil"]
      ? item["suspendedUntil"]
      : new Date(item["suspendedUntil"]),
    next: !item["next"] ? item["next"] : devBoxNextActionDeserializer(item["next"]),
  };
}

/** The type of action which will take place on a Dev Box. */
export type DevBoxActionType = "Stop";

/** Details about the next run of an action. */
export interface DevBoxNextAction {
  /** The time the action will be triggered (UTC), in RFC3339 format. */
  scheduledTime: Date;
}

export function devBoxNextActionDeserializer(item: any): DevBoxNextAction {
  return {
    scheduledTime: new Date(item["scheduledTime"]),
  };
}

/** Paged collection of DevBoxActionDelayResult items */
export interface _PagedDevBoxActionDelayResult {
  /** The DevBoxActionDelayResult items on this page */
  value: DevBoxActionDelayResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDevBoxActionDelayResultDeserializer(
  item: any,
): _PagedDevBoxActionDelayResult {
  return {
    value: devBoxActionDelayResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devBoxActionDelayResultArrayDeserializer(
  result: Array<DevBoxActionDelayResult>,
): any[] {
  return result.map((item) => {
    return devBoxActionDelayResultDeserializer(item);
  });
}

/** The action delay result. */
export interface DevBoxActionDelayResult {
  /** The name of the action. */
  name: string;
  /** The result of the delay operation on this action. */
  delayStatus: DevBoxActionDelayStatus;
  /** The delayed action. */
  action?: DevBoxAction;
  /** Information about the error that occurred. Only populated on error. */
  error?: ErrorModel;
}

export function devBoxActionDelayResultDeserializer(item: any): DevBoxActionDelayResult {
  return {
    name: item["name"],
    delayStatus: item["result"],
    action: !item["action"] ? item["action"] : devBoxActionDeserializer(item["action"]),
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** The result of the delay operation on this action. */
export type DevBoxActionDelayStatus = "Succeeded" | "Failed";

/** Paged collection of Environment items */
export interface _PagedEnvironment {
  /** The Environment items on this page */
  value: Environment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEnvironmentDeserializer(item: any): _PagedEnvironment {
  return {
    value: environmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentArraySerializer(result: Array<Environment>): any[] {
  return result.map((item) => {
    return environmentSerializer(item);
  });
}

export function environmentArrayDeserializer(result: Array<Environment>): any[] {
  return result.map((item) => {
    return environmentDeserializer(item);
  });
}

/** Properties of an environment. */
export interface Environment {
  /** Parameters object for the environment. */
  parameters?: Record<string, any>;
  /** Environment name. */
  readonly name: string;
  /** Environment type. */
  environmentType: string;
  /** The AAD object id of the owner of this Environment. */
  readonly user?: string;
  /** The provisioning state of the environment. */
  readonly provisioningState?: EnvironmentProvisioningState;
  /** The identifier of the resource group containing the environment's resources. */
  readonly resourceGroupId?: string;
  /** Name of the catalog. */
  catalogName: string;
  /** Name of the environment definition. */
  environmentDefinitionName: string;
  /** Provisioning error details. Populated only for error states. */
  readonly error?: ErrorModel;
}

export function environmentSerializer(item: Environment): any {
  return {
    parameters: item["parameters"],
    environmentType: item["environmentType"],
    catalogName: item["catalogName"],
    environmentDefinitionName: item["environmentDefinitionName"],
  };
}

export function environmentDeserializer(item: any): Environment {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    name: item["name"],
    environmentType: item["environmentType"],
    user: item["user"],
    provisioningState: item["provisioningState"],
    resourceGroupId: item["resourceGroupId"],
    catalogName: item["catalogName"],
    environmentDefinitionName: item["environmentDefinitionName"],
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** The provisioning state of the environment. */
export type EnvironmentProvisioningState =
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Creating"
  | "Accepted"
  | "Deleting"
  | "Updating"
  | "Preparing"
  | "Running"
  | "Syncing"
  | "MovingResources"
  | "TransientFailure"
  | "StorageProvisioningFailed";

/** Paged collection of Catalog items */
export interface _PagedCatalog {
  /** The Catalog items on this page */
  value: Catalog[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedCatalogDeserializer(item: any): _PagedCatalog {
  return {
    value: catalogArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function catalogArrayDeserializer(result: Array<Catalog>): any[] {
  return result.map((item) => {
    return catalogDeserializer(item);
  });
}

/** A catalog. */
export interface Catalog {
  /** Name of the catalog. */
  readonly name: string;
}

export function catalogDeserializer(item: any): Catalog {
  return {
    name: item["name"],
  };
}

/** Paged collection of EnvironmentDefinition items */
export interface _PagedEnvironmentDefinition {
  /** The EnvironmentDefinition items on this page */
  value: EnvironmentDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEnvironmentDefinitionDeserializer(item: any): _PagedEnvironmentDefinition {
  return {
    value: environmentDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentDefinitionArrayDeserializer(
  result: Array<EnvironmentDefinition>,
): any[] {
  return result.map((item) => {
    return environmentDefinitionDeserializer(item);
  });
}

/** An environment definition. */
export interface EnvironmentDefinition {
  /** The ID of the environment definition. */
  id: string;
  /** Name of the environment definition. */
  readonly name: string;
  /** Name of the catalog. */
  catalogName: string;
  /** A short description of the environment definition. */
  description?: string;
  /** Input parameters passed to an environment. */
  parameters?: EnvironmentDefinitionParameter[];
  /** JSON schema defining the parameters object passed to an environment. */
  parametersSchema?: string;
  /** Path to the Environment Definition entrypoint file. */
  templatePath?: string;
}

export function environmentDefinitionDeserializer(item: any): EnvironmentDefinition {
  return {
    id: item["id"],
    name: item["name"],
    catalogName: item["catalogName"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : environmentDefinitionParameterArrayDeserializer(item["parameters"]),
    parametersSchema: item["parametersSchema"],
    templatePath: item["templatePath"],
  };
}

export function environmentDefinitionParameterArrayDeserializer(
  result: Array<EnvironmentDefinitionParameter>,
): any[] {
  return result.map((item) => {
    return environmentDefinitionParameterDeserializer(item);
  });
}

/** Properties of an Environment Definition parameter */
export interface EnvironmentDefinitionParameter {
  /** Unique ID of the parameter. */
  id: string;
  /** Display name of the parameter. */
  name?: string;
  /** Description of the parameter. */
  description?: string;
  /** Default value of the parameter. */
  default?: string;
  /**
   * A string of one of the basic JSON types (number, integer, array, object,
   * boolean, string).
   */
  type: ParameterType;
  /**
   * Whether or not this parameter is read-only.  If true, default should have a
   * value.
   */
  readOnly?: boolean;
  /** Whether or not this parameter is required. */
  required: boolean;
  /** An array of allowed values. */
  allowed?: string[];
}

export function environmentDefinitionParameterDeserializer(
  item: any,
): EnvironmentDefinitionParameter {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    default: item["default"],
    type: item["type"],
    readOnly: item["readOnly"],
    required: item["required"],
    allowed: !item["allowed"]
      ? item["allowed"]
      : item["allowed"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of data a parameter accepts. */
export type ParameterType = "array" | "boolean" | "integer" | "number" | "object" | "string";

/** Paged collection of EnvironmentType items */
export interface _PagedEnvironmentType {
  /** The EnvironmentType items on this page */
  value: EnvironmentType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEnvironmentTypeDeserializer(item: any): _PagedEnvironmentType {
  return {
    value: environmentTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentTypeArrayDeserializer(result: Array<EnvironmentType>): any[] {
  return result.map((item) => {
    return environmentTypeDeserializer(item);
  });
}

/** Properties of an environment type. */
export interface EnvironmentType {
  /** Name of the environment type. */
  readonly name: string;
  /**
   * Id of a subscription or management group that the environment type will be
   * mapped to. The environment's resources will be deployed into this subscription
   * or management group.
   */
  deploymentTargetId: string;
  /** Indicates whether this environment type is enabled for use in this project. */
  status: EnvironmentTypeStatus;
}

export function environmentTypeDeserializer(item: any): EnvironmentType {
  return {
    name: item["name"],
    deploymentTargetId: item["deploymentTargetId"],
    status: item["status"],
  };
}

/** Indicates whether an environment type is enabled for use in a project. */
export type EnvironmentTypeStatus = "Enabled" | "Disabled";

/** DevCenter API versions */
export enum KnownAPIVersions {
  /** The 2023-04-01 service API version */
  V20230401 = "2023-04-01",
}
