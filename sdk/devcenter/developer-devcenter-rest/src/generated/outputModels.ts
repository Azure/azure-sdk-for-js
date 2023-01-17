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
  readonly name?: string;
  /** Description of the project. */
  readonly description?: string;
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
  readonly name?: string;
  /** Azure region where Dev Boxes in the pool are located */
  readonly location?: string;
  /** The operating system type of Dev Boxes in this pool */
  readonly osType?: "Windows";
  /** Hardware settings for the Dev Boxes created in this pool */
  readonly hardwareProfile?: HardwareProfileOutput;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  readonly hibernateSupport?: "Disabled" | "Enabled";
  /** Storage settings for Dev Box created in this pool */
  readonly storageProfile?: StorageProfileOutput;
  /** Image settings for Dev Boxes create in this pool */
  readonly imageReference?: ImageReferenceOutput;
  /** Indicates whether owners of Dev Boxes in this pool are local administrators on the Dev Boxes. */
  localAdministrator?: "Enabled" | "Disabled";
}

/** Hardware specifications for the Dev Box. */
export interface HardwareProfileOutput {
  /** The name of the SKU */
  readonly skuName?: string;
  /** The number of vCPUs available for the Dev Box. */
  readonly vCPUs?: number;
  /** The amount of memory available for the Dev Box. */
  readonly memoryGB?: number;
}

/** Storage settings for the Dev Box's disks */
export interface StorageProfileOutput {
  /** Settings for the operating system disk. */
  osDisk?: OSDiskOutput;
}

/** Settings for the operating system disk. */
export interface OSDiskOutput {
  /** The size of the OS Disk in gigabytes. */
  readonly diskSizeGB?: number;
}

/** Specifies information about the image used */
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
  readonly name?: string;
  /** Supported type this scheduled task represents. */
  readonly type?: "StopDevBox";
  /** The frequency of this scheduled task. */
  readonly frequency?: "Daily";
  /** The target time to trigger the action. The format is HH:MM. */
  readonly time?: string;
  /** The IANA timezone id at which the schedule should execute. */
  readonly timeZone?: string;
}

/** The Dev Box list result */
export interface DevBoxListResultOutput {
  /** The list of DevBox Dev Boxes */
  value: Array<DevBoxOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** A DevBox Dev Box */
export interface DevBoxOutput {
  /** Display name for the Dev Box */
  readonly name?: string;
  /** Name of the project this Dev Box belongs to */
  readonly projectName?: string;
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  readonly hibernateSupport?: "Disabled" | "Enabled";
  /** The current provisioning state of the Dev Box. */
  readonly provisioningState?: string;
  /** The current action state of the Dev Box. This is state is based on previous action performed by user. */
  readonly actionState?: string;
  /** The current power state of the Dev Box. */
  readonly powerState?:
    | "Unknown"
    | "Deallocated"
    | "PoweredOff"
    | "Running"
    | "Hibernated";
  /** A unique identifier for the Dev Box. This is a GUID-formatted string (e.g. 00000000-0000-0000-0000-000000000000). */
  readonly uniqueId?: string;
  /** Provisioning or action error details. Populated only for error states. */
  readonly errorDetails?: ProvisioningErrorOutput;
  /** Azure region where this Dev Box is located. This will be the same region as the Virtual Network it is attached to. */
  readonly location?: string;
  /** The operating system type of this Dev Box. */
  readonly osType?: "Windows";
  /** The AAD object id of the user this Dev Box is assigned to. */
  readonly user?: string;
  /** Information about the Dev Box's hardware resources */
  readonly hardwareProfile?: HardwareProfileOutput;
  /** Storage settings for this Dev Box */
  readonly storageProfile?: StorageProfileOutput;
  /** Information about the image used for this Dev Box */
  readonly imageReference?: ImageReferenceOutput;
  /** Creation time of this Dev Box */
  readonly createdTime?: string;
  /** Indicates whether the owner of the Dev Box is a local administrator. */
  localAdministrator?: "Enabled" | "Disabled";
}

/** Error details */
export interface ProvisioningErrorOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

/** Provides RDP connection information */
export interface RemoteConnectionOutput {
  /** URL to open a browser based RDP session */
  readonly webUrl?: string;
  /** Link to open a Remote Desktop session */
  readonly rdpConnectionUrl?: string;
}

/** The Upcoming Action list result */
export interface UpcomingActionsListResultOutput {
  /** Current page of results */
  value: Array<UpcomingActionOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** An upcoming Action. */
export interface UpcomingActionOutput {
  /** Uniquely identifies the action. */
  readonly id?: string;
  /** The action that will be taken. */
  readonly actionType?: "Stop";
  /** The reason for this action. */
  readonly reason?: "Schedule";
  /** The target time the action will be triggered (UTC). */
  readonly scheduledTime?: string;
  /** The original scheduled time for the action (UTC). */
  readonly originalScheduledTime?: string;
  /** The id of the resource which triggered this action */
  readonly sourceId?: string;
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
  readonly name?: string;
  /** Environment type. */
  environmentType: string;
  /** The AAD object id of the owner of this Environment. */
  user?: string;
  /** The provisioning state of the environment. */
  readonly provisioningState?: string;
  /** The identifier of the resource group containing the environment's resources. */
  readonly resourceGroupId?: string;
}

/** Properties of an environment. These properties can be updated after the resource has been created. */
export interface EnvironmentUpdatePropertiesOutput {
  /** Description of the Environment. */
  description?: string;
  /** Name of the catalog. */
  catalogName?: string;
  /** Name of the catalog item. */
  catalogItemName?: string;
  /** Parameters object for the deploy action */
  parameters?: Record<string, unknown>;
  /** Set of supported scheduled tasks to help manage cost. */
  scheduledTasks?: Record<string, ScheduledTaskOutput>;
  /** Key value pairs that will be applied to resources deployed in this environment as tags. */
  tags?: Record<string, string>;
}

/** Scheduled task to auto-expire an environment. */
export interface ScheduledTaskOutput {
  /** Supported type this scheduled task represents. */
  type: "AutoExpire";
  /** Indicates whether or not this scheduled task is enabled. */
  enabled?: "Enabled" | "Disabled";
  /** Date/time by which the environment should expire */
  startTime: string;
}

/** Results of the catalog item list operation. */
export interface CatalogItemListResultOutput {
  /** Current page of results. */
  value: Array<CatalogItemOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

/** A catalog item. */
export interface CatalogItemOutput {
  /** Unique identifier of the catalog item. */
  readonly id?: string;
  /** Name of the catalog item. */
  readonly name?: string;
  /** Name of the catalog. */
  readonly catalogName?: string;
}

/** Results of the catalog item list operation. */
export interface CatalogItemVersionListResultOutput {
  /** Current page of results. */
  value: Array<CatalogItemVersionOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

/** A catalog item version. */
export interface CatalogItemVersionOutput {
  /** Unique identifier of the catalog item. */
  readonly catalogItemId?: string;
  /** Name of the catalog item. */
  readonly catalogItemName?: string;
  /** Name of the catalog. */
  readonly catalogName?: string;
  /** The version of the catalog item. */
  readonly version?: string;
  /** A short summary of the catalog item. */
  readonly summary?: string;
  /** A long description of the catalog item. */
  readonly description?: string;
  /** Path to the catalog item entrypoint file. */
  readonly templatePath?: string;
  /** JSON schema defining the parameters object passed to actions */
  readonly parametersSchema?: string;
  /** Input parameters passed to actions */
  readonly parameters?: Array<CatalogItemParameterOutput>;
  /** Custom actions for the catalog item. */
  readonly actions?: Array<CatalogItemActionOutput>;
  /** The default container image to use to execute actions */
  readonly runner?: string;
  /** Defines whether the specific catalog item version can be used. */
  status?: "Enabled" | "Disabled";
  /** Whether the version is eligible to be the latest version. */
  eligibleForLatestVersion?: boolean;
}

/** Properties of an Catalog Item parameter */
export interface CatalogItemParameterOutput {
  /** Unique ID of the parameter */
  readonly id?: string;
  /** Display name of the parameter */
  readonly name?: string;
  /** Description of the parameter */
  readonly description?: string;
  /** Default value of the parameter */
  readonly default?: Record<string, unknown>;
  /** A string of one of the basic JSON types (number, integer, null, array, object, boolean, string) */
  readonly type?:
    | "array"
    | "boolean"
    | "integer"
    | "null"
    | "number"
    | "object"
    | "string";
  /** Whether or not this parameter is read-only.  If true, default should have a value. */
  readonly readOnly?: boolean;
  /** Whether or not this parameter is required */
  readonly required?: boolean;
  /** An array of allowed values */
  readonly allowed?: Array<Record<string, unknown>>;
}

/** An action that can be taken on a catalog item. */
export interface CatalogItemActionOutput {
  /** Unique identifier of the action */
  readonly id?: string;
  /** Display name of the action */
  readonly name?: string;
  /** Description of the action */
  readonly description?: string;
  /** JSON schema defining the parameters specific to the custom action */
  readonly parametersSchema?: string;
  /** Input parameters passed to the action */
  readonly parameters?: Array<CatalogItemParameterOutput>;
  /** The action type. */
  readonly type?: "Custom" | "Deploy" | "Delete";
  /** Name of the custom action type */
  readonly typeName?: string;
  /** The container image to use to execute the action */
  readonly runner?: string;
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
  readonly name?: string;
  /** Id of a subscription or management group that the environment type will be mapped to. The environment's resources will be deployed into this subscription or management group. */
  readonly deploymentTargetId?: string;
  /** Defines whether this Environment Type can be used in this Project. */
  readonly status?: "Enabled" | "Disabled";
}
