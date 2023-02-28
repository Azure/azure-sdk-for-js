// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Results of the project list operation. */
export interface ProjectListResultOutput {
  /** Current page of results. */
  value: Array<ProjectOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

/** Project details. */
export interface ProjectOutput {
  /** Name of the project */
  name: string;
  /** Description of the project. */
  description?: string;
  /** When specified, indicates the maximum number of Dev Boxes a single user can create across all pools in the project. */
  maxDevBoxesPerUser?: number;
}

/** An error response from the service. */
export interface CloudErrorOutput {
  /** Error body */
  error: CloudErrorBodyOutput;
}

/** An error response from the service. */
export interface CloudErrorBodyOutput {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: Array<CloudErrorBodyOutput>;
}

/** The Pool list result */
export interface PoolListResultOutput {
  /** Current page of results */
  value: Array<PoolOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** A pool of Dev Boxes. */
export interface PoolOutput {
  /** Pool name */
  name: string;
  /** Azure region where Dev Boxes in the pool are located */
  location: string;
  /** The operating system type of Dev Boxes in this pool */
  osType?: "Windows";
  /** Hardware settings for the Dev Boxes created in this pool */
  hardwareProfile?: HardwareProfileOutput;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  hibernateSupport?: "Enabled" | "Disabled" | "OsUnsupported";
  /** Storage settings for Dev Box created in this pool */
  storageProfile?: StorageProfileOutput;
  /** Image settings for Dev Boxes create in this pool */
  imageReference?: ImageReferenceOutput;
  /** Indicates whether owners of Dev Boxes in this pool are local administrators on the Dev Boxes. */
  localAdministrator?: "Enabled" | "Disabled";
  /** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
  stopOnDisconnect?: StopOnDisconnectConfigurationOutput;
  /** Overall health status of the Pool. Indicates whether or not the Pool is available to create Dev Boxes. */
  healthStatus: "Unknown" | "Pending" | "Healthy" | "Warning" | "Unhealthy";
}

/** Hardware specifications for the Dev Box. */
export interface HardwareProfileOutput {
  /** The name of the SKU */
  skuName?: string;
  /** The number of vCPUs available for the Dev Box. */
  vCPUs?: number;
  /** The amount of memory available for the Dev Box. */
  memoryGB?: number;
}

/** Storage settings for the Dev Box's disks */
export interface StorageProfileOutput {
  /** Settings for the operating system disk. */
  osDisk?: OSDiskOutput;
}

/** Settings for the operating system disk. */
export interface OSDiskOutput {
  /** The size of the OS Disk in gigabytes. */
  diskSizeGB?: number;
}

/** Specifies information about the image used */
export interface ImageReferenceOutput {
  /** The name of the image used. */
  name?: string;
  /** The version of the image. */
  version?: string;
  /** The operating system of the image. */
  operatingSystem?: string;
  /** The operating system build number of the image. */
  osBuildNumber?: string;
  /** The datetime that the backing image version was published. */
  publishedDate?: string;
}

/** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
export interface StopOnDisconnectConfigurationOutput {
  /** Indicates whether the feature to stop the devbox on disconnect once the grace period has lapsed is enabled. */
  status: "Enabled" | "Disabled";
  /** The specified time in minutes to wait before stopping a Dev Box once disconnect is detected. */
  gracePeriodMinutes?: number;
}

/** The Schedule list result */
export interface ScheduleListResultOutput {
  /** Current page of results */
  value: Array<ScheduleOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** A Schedule to execute action. */
export interface ScheduleOutput {
  /** Display name for the Schedule */
  name: string;
  /** Supported type this scheduled task represents. */
  type: "StopDevBox";
  /** The frequency of this scheduled task. */
  frequency: "Daily";
  /** The target time to trigger the action. The format is HH:MM. */
  time: string;
  /** The IANA timezone id at which the schedule should execute. */
  timeZone: string;
}

/** The Dev Box list result */
export interface DevBoxListResultOutput {
  /** The list of DevBox Dev Boxes */
  value: Array<DevBoxOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** A Dev Box */
export interface DevBoxOutput {
  /** Display name for the Dev Box */
  name?: string;
  /** Name of the project this Dev Box belongs to */
  projectName?: string;
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  hibernateSupport?: "Enabled" | "Disabled" | "OsUnsupported";
  /** The current provisioning state of the Dev Box. */
  provisioningState?: string;
  /** The current action state of the Dev Box. This is state is based on previous action performed by user. */
  actionState?: string;
  /** The current power state of the Dev Box. */
  powerState?:
    | "Unknown"
    | "Running"
    | "Deallocated"
    | "PoweredOff"
    | "Hibernated";
  /** A unique identifier for the Dev Box. This is a GUID-formatted string (e.g. 00000000-0000-0000-0000-000000000000). */
  uniqueId?: string;
  /** Provisioning or action error details. Populated only for error states. */
  error?: CloudErrorBodyOutput;
  /** Azure region where this Dev Box is located. This will be the same region as the Virtual Network it is attached to. */
  location?: string;
  /** The operating system type of this Dev Box. */
  osType?: "Windows";
  /** The AAD object id of the user this Dev Box is assigned to. */
  user?: string;
  /** Information about the Dev Box's hardware resources */
  hardwareProfile?: HardwareProfileOutput;
  /** Storage settings for this Dev Box */
  storageProfile?: StorageProfileOutput;
  /** Information about the image used for this Dev Box */
  imageReference?: ImageReferenceOutput;
  /** Creation time of this Dev Box */
  createdTime?: string;
  /** Indicates whether the owner of the Dev Box is a local administrator. */
  localAdministrator?: "Enabled" | "Disabled";
}

/** The current status of an async operation */
export interface OperationStatusOutput {
  /** Fully qualified ID for the operation status. */
  id?: string;
  /** The operation id name */
  name?: string;
  /** Provisioning state of the resource. */
  status: string;
  /** The id of the resource. */
  resourceId?: string;
  /** The start time of the operation */
  startTime?: string;
  /** The end time of the operation */
  endTime?: string;
  /** Percent of the operation that is complete */
  percentComplete?: number;
  /** Custom operation properties, populated only for a successful operation. */
  properties?: Record<string, unknown>;
  /** Operation Error message */
  error?: OperationStatusErrorOutput;
}

/** Operation Error message */
export interface OperationStatusErrorOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

/** Provides remote connection information for a Dev Box. */
export interface RemoteConnectionOutput {
  /** URL to open a browser based RDP session. */
  webUrl?: string;
  /** Link to open a Remote Desktop session. */
  rdpConnectionUrl?: string;
}

/** The actions list result */
export interface DevBoxActionsListResultOutput {
  /** Current page of results */
  value: Array<DevBoxActionOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** An action which will take place on a Dev Box. */
export interface DevBoxActionOutput {
  /** The name of the action. */
  name: string;
  /** The action that will be taken. */
  actionType: "Stop";
  /** The id of the resource which triggered this action */
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

/** The actions list result */
export interface DevBoxActionsDelayMultipleResultOutput {
  /** Current page of results */
  value: Array<DevBoxActionDelayResultOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The action delay result */
export interface DevBoxActionDelayResultOutput {
  /** The name of the action. */
  name: string;
  /** The result of the delay operation on this action. */
  result: "Succeeded" | "Failed";
  /** The delayed action */
  action?: DevBoxActionOutput;
  /** Information about the error that occurred. Only populated on error. */
  error?: CloudErrorBodyOutput;
}

/** Results of the environment list operation. */
export interface EnvironmentListResultOutput {
  /** Current page of results. */
  value: Array<EnvironmentOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

/** Properties of an environment. */
export interface EnvironmentOutput extends EnvironmentUpdatePropertiesOutput {
  /** Environment name. */
  name?: string;
  /** Environment type. */
  environmentType: string;
  /** The AAD object id of the owner of this Environment. */
  user?: string;
  /** The provisioning state of the environment. */
  provisioningState?: string;
  /** The identifier of the resource group containing the environment's resources. */
  resourceGroupId?: string;
  /** Name of the catalog. */
  catalogName: string;
  /** Name of the environment definition. */
  environmentDefinitionName: string;
  /** Provisioning error details. Populated only for error states. */
  error?: CloudErrorBodyOutput;
}

/** Properties of an environment. These properties can be updated after the resource has been created. */
export interface EnvironmentUpdatePropertiesOutput {
  /** Parameters object for the environment. */
  parameters?: Record<string, unknown>;
}

/** Results of the catalog list operation. */
export interface CatalogListResultOutput {
  /** Current page of results. */
  value: Array<CatalogOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

/** A catalog. */
export interface CatalogOutput {
  /** Name of the catalog. */
  name: string;
}

/** Results of the environment definition list operation. */
export interface EnvironmentDefinitionListResultOutput {
  /** Current page of results. */
  value: Array<EnvironmentDefinitionOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

/** An environment definition. */
export interface EnvironmentDefinitionOutput {
  /** The ID of the environment definition. */
  id: string;
  /** Name of the environment definition. */
  name: string;
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
  /** Unique ID of the parameter */
  id: string;
  /** Display name of the parameter */
  name?: string;
  /** Description of the parameter */
  description?: string;
  /** Default value of the parameter */
  default?: string;
  /** A string of one of the basic JSON types (number, integer, array, object, boolean, string) */
  type: "array" | "boolean" | "integer" | "number" | "object" | "string";
  /** Whether or not this parameter is read-only.  If true, default should have a value. */
  readOnly?: boolean;
  /** Whether or not this parameter is required */
  required: boolean;
  /** An array of allowed values */
  allowed?: Array<string>;
}

/** Result of the environment type list operation. */
export interface EnvironmentTypeListResultOutput {
  /** Current page of results. */
  value: Array<EnvironmentTypeOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

/** Properties of an environment type. */
export interface EnvironmentTypeOutput {
  /** Name of the environment type */
  name: string;
  /** Id of a subscription or management group that the environment type will be mapped to. The environment's resources will be deployed into this subscription or management group. */
  deploymentTargetId: string;
  /** Indicates whether this environment type is enabled for use in this project. */
  status: "Enabled" | "Disabled";
}
