// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ProjectListResultOutput {
  /** Current page of results. */
  value: Array<ProjectOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

export interface ProjectOutput {
  /** Name of the project */
  name?: string;
  /** Description of the project. */
  description?: string;
}

export interface CloudErrorOutput {
  /** Error body */
  error: CloudErrorBodyOutput;
}

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

export interface PoolListResultOutput {
  /** Current page of results */
  value: Array<PoolOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export interface PoolOutput {
  /** Pool name */
  name?: string;
  /** Azure region where Dev Boxes in the pool are located */
  location?: string;
  /** The operating system type of Dev Boxes in this pool */
  osType?: "Windows";
  /** Hardware settings for the Dev Boxes created in this pool */
  hardwareProfile?: HardwareProfileOutput;
  /** Storage settings for Dev Box created in this pool */
  storageProfile?: StorageProfileOutput;
  /** Image settings for Dev Boxes create in this pool */
  imageReference?: ImageReferenceOutput;
  /** Indicates whether owners of Dev Boxes in this pool are local administrators on the Dev Boxes. */
  localAdministrator?: "Enabled" | "Disabled";
}

export interface HardwareProfileOutput {
  /** The name of the SKU */
  skuName?: string;
  /** The number of vCPUs available for the Dev Box. */
  vCPUs?: number;
  /** The amount of memory available for the Dev Box. */
  memoryGB?: number;
}

export interface StorageProfileOutput {
  /** Settings for the operating system disk. */
  osDisk?: OSDiskOutput;
}

export interface OSDiskOutput {
  /** The size of the OS Disk in gigabytes. */
  diskSizeGB?: number;
}

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

export interface ScheduleListResultOutput {
  /** Current page of results */
  value: Array<ScheduleOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export interface ScheduleOutput {
  /** Display name for the Schedule */
  name?: string;
  /** Supported type this scheduled task represents. */
  type?: "StopDevBox";
  /** The frequency of this scheduled task. */
  frequency?: "Daily";
  /** The target time to trigger the action. The format is HH:MM. */
  time?: string;
  /** The IANA timezone id at which the schedule should execute. */
  timeZone?: string;
}

export interface DevBoxListResultOutput {
  /** The list of DevBox Dev Boxes */
  value: Array<DevBoxOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export interface DevBoxOutput {
  /** Display name for the Dev Box */
  name?: string;
  /** Name of the project this Dev Box belongs to */
  projectName?: string;
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** The current provisioning state of the Dev Box. */
  provisioningState?: string;
  /** The current action state of the Dev Box. This is state is based on previous action performed by user. */
  actionState?: string;
  /** The current power state of the Dev Box. */
  powerState?:
    | "Unknown"
    | "Deallocated"
    | "PoweredOff"
    | "Running"
    | "Hibernated";
  /** A unique identifier for the Dev Box. This is a GUID-formatted string (e.g. 00000000-0000-0000-0000-000000000000). */
  uniqueId?: string;
  /** Provisioning or action error details. Populated only for error states. */
  errorDetails?: ProvisioningErrorOutput;
  /** Azure region where this Dev Box is located. This will be the same region as the Virtual Network it is attached to. */
  location?: string;
  /** The operating system type of this Dev Box. */
  osType?: "Windows";
  /** User identifier of the user this vm is assigned to. */
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

export interface ProvisioningErrorOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

export interface RemoteConnectionOutput {
  /** URL to open a browser based RDP session */
  webUrl?: string;
  /** Link to open a Remote Desktop session */
  rdpConnectionUrl?: string;
}

export interface EnvironmentListResultOutput {
  /** Current page of results. */
  value: Array<EnvironmentOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

export interface EnvironmentOutput extends EnvironmentUpdatePropertiesOutput {
  /** Environment name. */
  name?: string;
  /** Environment type. */
  environmentType: string;
  /** Identifier of the owner of this Environment. */
  owner?: string;
  /** The provisioning state of the environment. */
  provisioningState?: string;
  /** The identifier of the resource group containing the environment's resources. */
  resourceGroupId?: string;
}

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

export interface ScheduledTaskOutput {
  /** Supported type this scheduled task represents. */
  type: "AutoExpire";
  /** Indicates whether or not this scheduled task is enabled. */
  enabled?: "Enabled" | "Disabled";
  /** Date/time by which the environment should expire */
  startTime: string;
}

export interface ArtifactListResultOutput {
  /** Current page of results. */
  value: Array<ArtifactOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

export interface ArtifactOutput {
  /** Artifact identifier */
  id?: string;
  /** Artifact name */
  name?: string;
  /** Whether artifact is a directory */
  isDirectory?: boolean;
  /** Uri where the file contents can be downloaded */
  downloadUri?: string;
  /** Size of file in bytes, if the artifact is a file */
  fileSize?: number;
  /** Time the artifact was created */
  createdTime?: string;
  /** Time the artifact was last modified */
  lastModifiedTime?: string;
}

export interface CatalogItemListResultOutput {
  /** Current page of results. */
  value: Array<CatalogItemOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

export interface CatalogItemOutput {
  /** Unique identifier of the catalog item. */
  id?: string;
  /** Name of the catalog item. */
  name?: string;
  /** Name of the catalog. */
  catalogName?: string;
}

export interface CatalogItemVersionListResultOutput {
  /** Current page of results. */
  value: Array<CatalogItemVersionOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

export interface CatalogItemVersionOutput {
  /** Unique identifier of the catalog item. */
  catalogItemId?: string;
  /** Name of the catalog item. */
  catalogItemName?: string;
  /** Name of the catalog. */
  catalogName?: string;
  /** The version of the catalog item. */
  version?: string;
  /** A short summary of the catalog item. */
  summary?: string;
  /** A long description of the catalog item. */
  description?: string;
  /** Path to the catalog item entrypoint file. */
  templatePath?: string;
  /** JSON schema defining the parameters object passed to actions */
  parametersSchema?: string;
  /** Input parameters passed to actions */
  parameters?: Array<CatalogItemParameterOutput>;
  /** Custom actions for the catalog item. */
  actions?: Array<CatalogItemActionOutput>;
  /** The default container image to use to execute actions */
  runner?: string;
  /** Defines whether the specific catalog item version can be used. */
  status?: "Enabled" | "Disabled";
  /** Whether the version is eligible to be the latest version. */
  eligibleForLatestVersion?: boolean;
}

export interface CatalogItemParameterOutput {
  /** Unique ID of the parameter */
  id?: string;
  /** Display name of the parameter */
  name?: string;
  /** Description of the parameter */
  description?: string;
  /** Default value of the parameter */
  default?: Record<string, unknown>;
  /** A string of one of the basic JSON types (number, integer, null, array, object, boolean, string) */
  type?:
    | "array"
    | "boolean"
    | "integer"
    | "null"
    | "number"
    | "object"
    | "string";
  /** Whether or not this parameter is read-only.  If true, default should have a value. */
  readOnly?: boolean;
  /** Whether or not this parameter is required */
  required?: boolean;
  /** An array of allowed values */
  allowed?: Array<Record<string, unknown>>;
}

export interface CatalogItemActionOutput {
  /** Unique identifier of the action */
  id?: string;
  /** Display name of the action */
  name?: string;
  /** Description of the action */
  description?: string;
  /** JSON schema defining the parameters specific to the custom action */
  parametersSchema?: string;
  /** Input parameters passed to the action */
  parameters?: Array<CatalogItemParameterOutput>;
  /** The action type. */
  type?: "Custom" | "Deploy" | "Delete";
  /** Name of the custom action type */
  typeName?: string;
  /** The container image to use to execute the action */
  runner?: string;
}

export interface EnvironmentTypeListResultOutput {
  /** Current page of results. */
  value: Array<EnvironmentTypeOutput>;
  /** URL to get the next set of results if there are any. */
  nextLink?: string;
}

export interface EnvironmentTypeOutput {
  /** Name of the environment type */
  name?: string;
  /** Id of a subscription or management group that the environment type will be mapped to. The environment's resources will be deployed into this subscription or management group. */
  deploymentTargetId?: string;
  /** Defines whether this Environment Type can be used in this Project. */
  status?: "Enabled" | "Disabled";
}
