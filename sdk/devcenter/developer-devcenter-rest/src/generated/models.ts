// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Hardware specifications for the Dev Box. */
export interface HardwareProfile {}

/** Storage settings for the Dev Box's disks */
export interface StorageProfile {
  /** Settings for the operating system disk. */
  osDisk?: OSDisk;
}

/** Settings for the operating system disk. */
export interface OSDisk {}

/** Specifies information about the image used */
export interface ImageReference {}

/** A DevBox Dev Box */
export interface DevBox {
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
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
  /** Environment type. */
  environmentType: string;
  /** The AAD object id of the owner of this Environment. */
  user?: string;
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
