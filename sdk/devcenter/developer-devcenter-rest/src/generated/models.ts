// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Hardware specifications for the Dev Box. */
export interface HardwareProfile {
  /** The name of the SKU */
  skuName?: string;
  /** The number of vCPUs available for the Dev Box. */
  vCPUs?: number;
  /** The amount of memory available for the Dev Box. */
  memoryGB?: number;
}

/** Storage settings for the Dev Box's disks */
export interface StorageProfile {
  /** Settings for the operating system disk. */
  osDisk?: OSDisk;
}

/** Settings for the operating system disk. */
export interface OSDisk {
  /** The size of the OS Disk in gigabytes. */
  diskSizeGB?: number;
}

/** Specifies information about the image used */
export interface ImageReference {
  /** The name of the image used. */
  name?: string;
  /** The version of the image. */
  version?: string;
  /** The operating system of the image. */
  operatingSystem?: string;
  /** The operating system build number of the image. */
  osBuildNumber?: string;
  /** The datetime that the backing image version was published. */
  publishedDate?: Date | string;
}

/** A DevBox Dev Box */
export interface DevBox {
  /** Display name for the Dev Box */
  name?: string;
  /** Name of the project this Dev Box belongs to */
  projectName?: string;
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** Indicates whether hibernate is enabled/disabled or unknown. */
  hibernateSupport?: "Disabled" | "Enabled";
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
  errorDetails?: ProvisioningError;
  /** Azure region where this Dev Box is located. This will be the same region as the Virtual Network it is attached to. */
  location?: string;
  /** The operating system type of this Dev Box. */
  osType?: "Windows";
  /** The AAD object id of the user this Dev Box is assigned to. */
  user?: string;
  /** Information about the Dev Box's hardware resources */
  hardwareProfile?: HardwareProfile;
  /** Storage settings for this Dev Box */
  storageProfile?: StorageProfile;
  /** Information about the image used for this Dev Box */
  imageReference?: ImageReference;
  /** Creation time of this Dev Box */
  createdTime?: Date | string;
  /** Indicates whether the owner of the Dev Box is a local administrator. */
  localAdministrator?: "Enabled" | "Disabled";
}

/** Error details */
export interface ProvisioningError {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

/** Properties of an environment. */
export interface Environment extends EnvironmentUpdateProperties {
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
}

/** Properties of an environment. These properties can be updated after the resource has been created. */
export interface EnvironmentUpdateProperties {
  /** Description of the Environment. */
  description?: string;
  /** Name of the catalog. */
  catalogName?: string;
  /** Name of the catalog item. */
  catalogItemName?: string;
  /** Parameters object for the deploy action */
  parameters?: Record<string, unknown>;
  /** Set of supported scheduled tasks to help manage cost. */
  scheduledTasks?: Record<string, ScheduledTask>;
  /** Key value pairs that will be applied to resources deployed in this environment as tags. */
  tags?: Record<string, string>;
}

/** Scheduled task to auto-expire an environment. */
export interface ScheduledTask {
  /** Supported type this scheduled task represents. */
  type: "AutoExpire";
  /** Indicates whether or not this scheduled task is enabled. */
  enabled?: "Enabled" | "Disabled";
  /** Date/time by which the environment should expire */
  startTime: Date | string;
}

/** Action request */
export interface ActionRequest {
  /** The Catalog Item action id to execute */
  actionId: string;
  /** Parameters object for the Action */
  parameters?: Record<string, unknown>;
}
