// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** Paged collection of Project items */
export interface PagedProjectOutput {
  /** The Project items on this page */
  value: Array<ProjectOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

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
  /**
   * Provisioning state of the resource.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** The id of the resource. */
  resourceId?: string;
  /** The start time of the operation, in RFC3339 format. */
  startTime?: string;
  /** The end time of the operation, in RFC3339 format. */
  endTime?: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** Custom operation properties, populated only for a successful operation. */
  properties?: Record<string, any>;
  /** Operation Error message. */
  error?: ErrorModel;
}

/** Paged collection of Pool items */
export interface PagedPoolOutput {
  /** The Pool items on this page */
  value: Array<PoolOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A pool of Dev Boxes. */
export interface PoolOutput {
  /** Pool name. */
  readonly name: string;
  /** Azure region where Dev Boxes in the pool are located. */
  location: string;
  /**
   * The operating system type of Dev Boxes in this pool.
   *
   * Possible values: "Windows"
   */
  osType?: OsTypeOutput;
  /** Hardware settings for the Dev Boxes created in this pool. */
  hardwareProfile?: HardwareProfileOutput;
  /**
   * Indicates whether hibernate is enabled/disabled or unknown.
   *
   * Possible values: "Enabled", "Disabled", "OsUnsupported"
   */
  hibernateSupport?: HibernateSupportOutput;
  /** Storage settings for Dev Box created in this pool. */
  storageProfile?: StorageProfileOutput;
  /** Image settings for Dev Boxes create in this pool. */
  imageReference?: ImageReferenceOutput;
  /**
   * Indicates whether owners of Dev Boxes in this pool are local administrators on
   * the Dev Boxes.
   *
   * Possible values: "Enabled", "Disabled"
   */
  localAdministrator?: LocalAdminStatusOutput;
  /** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
  stopOnDisconnect?: StopOnDisconnectConfigurationOutput;
  /**
   * Overall health status of the Pool. Indicates whether or not the Pool is
   * available to create Dev Boxes.
   *
   * Possible values: "Unknown", "Pending", "Healthy", "Warning", "Unhealthy"
   */
  healthStatus: PoolHealthStatusOutput;
}

/** Hardware specifications for the Dev Box. */
export interface HardwareProfileOutput {
  /**
   * The name of the SKU.
   *
   * Possible values: "general_i_8c32gb256ssd_v2", "general_i_8c32gb512ssd_v2", "general_i_8c32gb1024ssd_v2", "general_i_8c32gb2048ssd_v2", "general_i_16c64gb256ssd_v2", "general_i_16c64gb512ssd_v2", "general_i_16c64gb1024ssd_v2", "general_i_16c64gb2048ssd_v2", "general_i_32c128gb512ssd_v2", "general_i_32c128gb1024ssd_v2", "general_i_32c128gb2048ssd_v2", "general_a_8c32gb256ssd_v2", "general_a_8c32gb512ssd_v2", "general_a_8c32gb1024ssd_v2", "general_a_8c32gb2048ssd_v2", "general_a_16c64gb256ssd_v2", "general_a_16c64gb512ssd_v2", "general_a_16c64gb1024ssd_v2", "general_a_16c64gb2048ssd_v2", "general_a_32c128gb512ssd_v2", "general_a_32c128gb1024ssd_v2", "general_a_32c128gb2048ssd_v2"
   */
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
  /** The datetime that the backing image version was published, in RFC3339 format. */
  readonly publishedDate?: string;
}

/** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
export interface StopOnDisconnectConfigurationOutput {
  /**
   * Indicates whether the feature to stop the devbox on disconnect once the grace
   * period has lapsed is enabled.
   *
   * Possible values: "Enabled", "Disabled"
   */
  status: StopOnDisconnectEnableStatusOutput;
  /**
   * The specified time in minutes to wait before stopping a Dev Box once disconnect
   * is detected.
   */
  gracePeriodMinutes?: number;
}

/** Paged collection of DevBox items */
export interface PagedDevBoxOutput {
  /** The DevBox items on this page */
  value: Array<DevBoxOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A Dev Box. */
export interface DevBoxOutput {
  /** Display name for the Dev Box. */
  readonly name: string;
  /** Name of the project this Dev Box belongs to. */
  readonly projectName?: string;
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /**
   * Indicates whether hibernate is enabled/disabled or unknown.
   *
   * Possible values: "Enabled", "Disabled", "OsUnsupported"
   */
  readonly hibernateSupport?: HibernateSupportOutput;
  /**
   * The current provisioning state of the Dev Box.
   *
   * Possible values: "Succeeded", "Failed", "Canceled", "Creating", "Deleting", "Updating", "Starting", "Stopping", "Provisioning", "ProvisionedWithWarning", "InGracePeriod", "NotProvisioned"
   */
  readonly provisioningState?: DevBoxProvisioningStateOutput;
  /**
   * The current action state of the Dev Box. This is state is based on previous
   * action performed by user.
   */
  readonly actionState?: string;
  /**
   * The current power state of the Dev Box.
   *
   * Possible values: "Unknown", "Running", "Deallocated", "PoweredOff", "Hibernated"
   */
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
  /**
   * The operating system type of this Dev Box.
   *
   * Possible values: "Windows"
   */
  readonly osType?: OsTypeOutput;
  /** The AAD object id of the user this Dev Box is assigned to. */
  readonly user?: string;
  /** Information about the Dev Box's hardware resources. */
  readonly hardwareProfile?: HardwareProfileOutput;
  /** Storage settings for this Dev Box. */
  readonly storageProfile?: StorageProfileOutput;
  /** Information about the image used for this Dev Box. */
  readonly imageReference?: ImageReferenceOutput;
  /** Creation time of this Dev Box, in RFC3339 format. */
  readonly createdTime?: string;
  /**
   * Indicates whether the owner of the Dev Box is a local administrator.
   *
   * Possible values: "Enabled", "Disabled"
   */
  readonly localAdministrator?: LocalAdminStatusOutput;
}

/** Paged collection of Schedule items */
export interface PagedScheduleOutput {
  /** The Schedule items on this page */
  value: Array<ScheduleOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A Schedule to execute action. */
export interface ScheduleOutput {
  /** Display name for the Schedule. */
  readonly name: string;
  /**
   * Supported type this scheduled task represents.
   *
   * Possible values: "StopDevBox"
   */
  type: ScheduledTypeOutput;
  /**
   * The frequency of this scheduled task.
   *
   * Possible values: "Daily"
   */
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

/** Paged collection of DevBoxAction items */
export interface PagedDevBoxActionOutput {
  /** The DevBoxAction items on this page */
  value: Array<DevBoxActionOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** An action which will take place on a Dev Box. */
export interface DevBoxActionOutput {
  /** The name of the action. */
  readonly name: string;
  /**
   * The action that will be taken.
   *
   * Possible values: "Stop"
   */
  actionType: DevBoxActionTypeOutput;
  /** The id of the resource which triggered this action. */
  sourceId: string;
  /** The earliest time that the action could occur (UTC), in RFC3339 format. */
  suspendedUntil?: string;
  /** Details about the next run of this action. */
  next?: DevBoxNextActionOutput;
}

/** Details about the next run of an action. */
export interface DevBoxNextActionOutput {
  /** The time the action will be triggered (UTC), in RFC3339 format. */
  scheduledTime: string;
}

/** Paged collection of DevBoxActionDelayResult items */
export interface PagedDevBoxActionDelayResultOutput {
  /** The DevBoxActionDelayResult items on this page */
  value: Array<DevBoxActionDelayResultOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** The action delay result. */
export interface DevBoxActionDelayResultOutput {
  /** The name of the action. */
  name: string;
  /**
   * The result of the delay operation on this action.
   *
   * Possible values: "Succeeded", "Failed"
   */
  result: DevBoxActionDelayResultStatusOutput;
  /** The delayed action. */
  action?: DevBoxActionOutput;
  /** Information about the error that occurred. Only populated on error. */
  error?: ErrorModel;
}

/** Paged collection of Environment items */
export interface PagedEnvironmentOutput {
  /** The Environment items on this page */
  value: Array<EnvironmentOutput>;
  /** The link to the next page of items */
  nextLink?: string;
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
  /**
   * The provisioning state of the environment.
   *
   * Possible values: "Succeeded", "Failed", "Canceled", "Creating", "Accepted", "Deleting", "Updating", "Preparing", "Running", "Syncing", "MovingResources", "TransientFailure", "StorageProvisioningFailed"
   */
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

/** Paged collection of Catalog items */
export interface PagedCatalogOutput {
  /** The Catalog items on this page */
  value: Array<CatalogOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A catalog. */
export interface CatalogOutput {
  /** Name of the catalog. */
  readonly name: string;
}

/** Paged collection of EnvironmentDefinition items */
export interface PagedEnvironmentDefinitionOutput {
  /** The EnvironmentDefinition items on this page */
  value: Array<EnvironmentDefinitionOutput>;
  /** The link to the next page of items */
  nextLink?: string;
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
   *
   * Possible values: "array", "boolean", "integer", "number", "object", "string"
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

/** Paged collection of EnvironmentType items */
export interface PagedEnvironmentTypeOutput {
  /** The EnvironmentType items on this page */
  value: Array<EnvironmentTypeOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Properties of an environment type. */
export interface EnvironmentTypeOutput {
  /** Name of the environment type. */
  readonly name: string;
  /**
   * Id of a subscription or management group that the environment type will be
   * mapped to. The environment's resources will be deployed into this subscription
   * or management group.
   */
  deploymentTargetId: string;
  /**
   * Indicates whether this environment type is enabled for use in this project.
   *
   * Possible values: "Enabled", "Disabled"
   */
  status: EnvironmentTypeEnableStatusOutput;
}

/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
/** Alias for OsTypeOutput */
export type OsTypeOutput = string;
/** Alias for SkuNameOutput */
export type SkuNameOutput = string;
/** Alias for HibernateSupportOutput */
export type HibernateSupportOutput = string;
/** Alias for LocalAdminStatusOutput */
export type LocalAdminStatusOutput = string;
/** Alias for StopOnDisconnectEnableStatusOutput */
export type StopOnDisconnectEnableStatusOutput = string;
/** Alias for PoolHealthStatusOutput */
export type PoolHealthStatusOutput = string;
/** Alias for DevBoxProvisioningStateOutput */
export type DevBoxProvisioningStateOutput = string;
/** Alias for PowerStateOutput */
export type PowerStateOutput = string;
/** Alias for ScheduledTypeOutput */
export type ScheduledTypeOutput = string;
/** Alias for ScheduledFrequencyOutput */
export type ScheduledFrequencyOutput = string;
/** Alias for DevBoxActionTypeOutput */
export type DevBoxActionTypeOutput = string;
/** Alias for DevBoxActionDelayResultStatusOutput */
export type DevBoxActionDelayResultStatusOutput = string;
/** Alias for EnvironmentProvisioningStateOutput */
export type EnvironmentProvisioningStateOutput = string;
/** Alias for ParameterTypeOutput */
export type ParameterTypeOutput = string;
/** Alias for EnvironmentTypeEnableStatusOutput */
export type EnvironmentTypeEnableStatusOutput = string;
