// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";
import { ErrorModel } from "@azure-rest/core-client";

/** Project details. */
export interface ProjectOutput {
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

/** The current status of an async operation. */
export interface OperationStatusOutput {
  /** Fully qualified ID for the operation status. */
  readonly id: string;
  /** The operation id name. */
  readonly name: string;
  /** Provisioning state of the resource. */
  status: OperationStateOutput;
  /** The id of the resource. */
  resourceId?: string;
  /** The start time of the operation. */
  startTime?: string;
  /** The end time of the operation. */
  endTime?: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** Custom operation properties, populated only for a successful operation. */
  properties?: any;
  /** Operation Error message. */
  error?: ErrorModel;
}

/** A pool of Dev Boxes. */
export interface PoolOutput {
  /** Pool name. */
  readonly name: string;
  /** Azure region where Dev Boxes in the pool are located. */
  location: string;
  /** The operating system type of Dev Boxes in this pool. */
  osType?: OsTypeOutput;
  /** Hardware settings for the Dev Boxes created in this pool. */
  hardwareProfile?: HardwareProfileOutput;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  hibernateSupport?: HibernateSupportOutput;
  /** Storage settings for Dev Box created in this pool. */
  storageProfile?: StorageProfileOutput;
  /** Image settings for Dev Boxes create in this pool. */
  imageReference?: ImageReferenceOutput;
  /**
   * Indicates whether owners of Dev Boxes in this pool are local administrators on
   * the Dev Boxes.
   */
  localAdministrator?: LocalAdminStatusOutput;
  /** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
  stopOnDisconnect?: StopOnDisconnectConfigurationOutput;
  /**
   * Overall health status of the Pool. Indicates whether or not the Pool is
   * available to create Dev Boxes.
   */
  healthStatus: PoolHealthStatusOutput;
}

/** Hardware specifications for the Dev Box. */
export interface HardwareProfileOutput {
  /** The name of the SKU. */
  readonly skuName?: SkuNameOutput;
  /** The number of vCPUs available for the Dev Box. */
  readonly vCPUs?: number;
  /** The amount of memory available for the Dev Box. */
  readonly memoryGB?: number;
}

/** Storage settings for the Dev Box's disks. */
export interface StorageProfileOutput {
  /** Settings for the operating system disk. */
  osDisk?: OsDiskOutput;
}

/** Settings for the operating system disk. */
export interface OsDiskOutput {
  /** The size of the OS Disk in gigabytes. */
  readonly diskSizeGB?: number;
}

/** Specifies information about the image used. */
export interface ImageReferenceOutput {
  /** The name of the image used. */
  readonly name?: string;
  /** The version of the image. */
  readonly version?: string;
  /** The operating system of the image. */
  readonly operatingSystem?: string;
  /** The operating system build number of the image. */
  readonly osBuildNumber?: string;
  /** The datetime that the backing image version was published. */
  readonly publishedDate?: string;
}

/** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
export interface StopOnDisconnectConfigurationOutput {
  /**
   * Indicates whether the feature to stop the devbox on disconnect once the grace
   * period has lapsed is enabled.
   */
  status: StopOnDisconnectEnableStatusOutput;
  /**
   * The specified time in minutes to wait before stopping a Dev Box once disconnect
   * is detected.
   */
  gracePeriodMinutes?: number;
}

/** A Dev Box. */
export interface DevBoxOutput {
  /** Display name for the Dev Box. */
  readonly name: string;
  /** Name of the project this Dev Box belongs to. */
  readonly projectName?: string;
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  readonly hibernateSupport?: HibernateSupportOutput;
  /** The current provisioning state of the Dev Box. */
  readonly provisioningState?: DevBoxProvisioningStateOutput;
  /**
   * The current action state of the Dev Box. This is state is based on previous
   * action performed by user.
   */
  readonly actionState?: string;
  /** The current power state of the Dev Box. */
  readonly powerState?: PowerStateOutput;
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
  readonly osType?: OsTypeOutput;
  /** The AAD object id of the user this Dev Box is assigned to. */
  readonly user?: string;
  /** Information about the Dev Box's hardware resources. */
  readonly hardwareProfile?: HardwareProfileOutput;
  /** Storage settings for this Dev Box. */
  readonly storageProfile?: StorageProfileOutput;
  /** Information about the image used for this Dev Box. */
  readonly imageReference?: ImageReferenceOutput;
  /** Creation time of this Dev Box. */
  readonly createdTime?: string;
  /** Indicates whether the owner of the Dev Box is a local administrator. */
  localAdministrator?: LocalAdminStatusOutput;
}

/** A Schedule to execute action. */
export interface ScheduleOutput {
  /** Display name for the Schedule. */
  readonly name: string;
  /** Supported type this scheduled task represents. */
  type: ScheduledTypeOutput;
  /** The frequency of this scheduled task. */
  frequency: ScheduledFrequencyOutput;
  /** The target time to trigger the action. The format is HH:MM. */
  time: string;
  /** The IANA timezone id at which the schedule should execute. */
  timeZone: string;
}

/** Provides remote connection information for a Dev Box. */
export interface RemoteConnectionOutput {
  /** URL to open a browser based RDP session. */
  webUrl?: string;
  /** Link to open a Remote Desktop session. */
  rdpConnectionUrl?: string;
}

/** An action which will take place on a Dev Box. */
export interface DevBoxActionOutput {
  /** The name of the action. */
  readonly name: string;
  /** The action that will be taken. */
  actionType: DevBoxActionTypeOutput;
  /** The id of the resource which triggered this action. */
  sourceId: string;
  /** The earliest time that the action could occur (UTC). */
  suspendedUntil?: string;
  /** Details about the next run of this action. */
  next?: DevBoxNextActionOutput;
}

/** Details about the next run of an action. */
export interface DevBoxNextActionOutput {
  /** The time the action will be triggered (UTC). */
  scheduledTime: string;
}

/** The action delay result. */
export interface DevBoxActionDelayResultOutput {
  /** The name of the action. */
  name: string;
  /** The result of the delay operation on this action. */
  result: DevBoxActionDelayResultStatusOutput;
  /** The delayed action. */
  action?: DevBoxActionOutput;
  /** Information about the error that occurred. Only populated on error. */
  error?: ErrorModel;
}

/** Properties of an environment. */
export interface EnvironmentOutput {
  /** Parameters object for the environment. */
  parameters?: Record<string, any>;
  /** Environment name. */
  readonly name: string;
  /** Environment type. */
  environmentType: string;
  /** The AAD object id of the owner of this Environment. */
  readonly user?: string;
  /** The provisioning state of the environment. */
  readonly provisioningState?: EnvironmentProvisioningStateOutput;
  /** The identifier of the resource group containing the environment's resources. */
  readonly resourceGroupId?: string;
  /** Name of the catalog. */
  catalogName: string;
  /** Name of the environment definition. */
  environmentDefinitionName: string;
  /** Provisioning error details. Populated only for error states. */
  readonly error?: ErrorModel;
}

/** A catalog. */
export interface CatalogOutput {
  /** Name of the catalog. */
  readonly name: string;
}

/** An environment definition. */
export interface EnvironmentDefinitionOutput {
  /** The ID of the environment definition. */
  id: string;
  /** Name of the environment definition. */
  readonly name: string;
  /** Name of the catalog. */
  catalogName: string;
  /** A short description of the environment definition. */
  description?: string;
  /** Input parameters passed to an environment. */
  parameters?: Array<EnvironmentDefinitionParameterOutput>;
  /** JSON schema defining the parameters object passed to an environment. */
  parametersSchema?: string;
  /** Path to the Environment Definition entrypoint file. */
  templatePath?: string;
}

/** Properties of an Environment Definition parameter */
export interface EnvironmentDefinitionParameterOutput {
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
  type: ParameterTypeOutput;
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

/** Properties of an environment type. */
export interface EnvironmentTypeOutput {
  /** Name of the environment type. */
  name: string;
  /**
   * Id of a subscription or management group that the environment type will be
   * mapped to. The environment's resources will be deployed into this subscription
   * or management group.
   */
  deploymentTargetId: string;
  /** Indicates whether this environment type is enabled for use in this project. */
  status: EnvironmentTypeEnableStatusOutput;
}

/** Paged collection of Project items */
export type PagedProjectOutput = Paged<ProjectOutput>;
/** Enum describing allowed operation states. */
export type OperationStateOutput = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";
/** Paged collection of Pool items */
export type PagedPoolOutput = Paged<PoolOutput>;
/** Alias for OsTypeOutput */
export type OsTypeOutput = "Windows" | string;
/** Alias for SkuNameOutput */
export type SkuNameOutput =
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
  | "general_a_32c128gb2048ssd_v2"
  | string;
/** Alias for HibernateSupportOutput */
export type HibernateSupportOutput = "Enabled" | "Disabled" | "OsUnsupported" | string;
/** Alias for LocalAdminStatusOutput */
export type LocalAdminStatusOutput = "Enabled" | "Disabled" | string;
/** Alias for StopOnDisconnectEnableStatusOutput */
export type StopOnDisconnectEnableStatusOutput = "Enabled" | "Disabled" | string;
/** Alias for PoolHealthStatusOutput */
export type PoolHealthStatusOutput =
  | "Unknown"
  | "Pending"
  | "Healthy"
  | "Warning"
  | "Unhealthy"
  | string;
/** Paged collection of DevBox items */
export type PagedDevBoxOutput = Paged<DevBoxOutput>;
/** Alias for DevBoxProvisioningStateOutput */
export type DevBoxProvisioningStateOutput =
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
  | "NotProvisioned"
  | string;
/** Alias for PowerStateOutput */
export type PowerStateOutput =
  | "Unknown"
  | "Running"
  | "Deallocated"
  | "PoweredOff"
  | "Hibernated"
  | string;
/** Paged collection of Schedule items */
export type PagedScheduleOutput = Paged<ScheduleOutput>;
/** Alias for ScheduledTypeOutput */
export type ScheduledTypeOutput = "StopDevBox" | string;
/** Alias for ScheduledFrequencyOutput */
export type ScheduledFrequencyOutput = "Daily" | string;
/** Paged collection of DevBoxAction items */
export type PagedDevBoxActionOutput = Paged<DevBoxActionOutput>;
/** Alias for DevBoxActionTypeOutput */
export type DevBoxActionTypeOutput = "Stop" | string;
/** Paged collection of DevBoxActionDelayResult items */
export type PagedDevBoxActionDelayResultOutput = Paged<DevBoxActionDelayResultOutput>;
/** Alias for DevBoxActionDelayResultStatusOutput */
export type DevBoxActionDelayResultStatusOutput = "Succeeded" | "Failed" | string;
/** Paged collection of Environment items */
export type PagedEnvironmentOutput = Paged<EnvironmentOutput>;
/** Alias for EnvironmentProvisioningStateOutput */
export type EnvironmentProvisioningStateOutput =
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
  | "StorageProvisioningFailed"
  | string;
/** Paged collection of Catalog items */
export type PagedCatalogOutput = Paged<CatalogOutput>;
/** Paged collection of EnvironmentDefinition items */
export type PagedEnvironmentDefinitionOutput = Paged<EnvironmentDefinitionOutput>;
/** Alias for ParameterTypeOutput */
export type ParameterTypeOutput =
  | "array"
  | "boolean"
  | "integer"
  | "number"
  | "object"
  | "string"
  | string;
/** Paged collection of EnvironmentType items */
export type PagedEnvironmentTypeOutput = Paged<EnvironmentTypeOutput>;
/** Alias for EnvironmentTypeEnableStatusOutput */
export type EnvironmentTypeEnableStatusOutput = "Enabled" | "Disabled" | string;
