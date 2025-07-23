// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Hardware specifications for the Dev Box. */
export interface HardwareProfile {}

/** Storage settings for the Dev Box's disks. */
export interface StorageProfile {
  /** Settings for the operating system disk. */
  osDisk?: OsDisk;
}

/** Settings for the operating system disk. */
export interface OsDisk {}

/** Specifies information about the image used. */
export interface ImageReference {}

/** Indicates which pool properties to align on. */
export interface PoolAlignBody {
  /** The targets to align on. */
  targets: PoolAlignTarget[];
}

/** A Dev Box. */
export interface DevBox {
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
}

/** The active hours configuration for a Dev Box. */
export interface ActiveHoursConfiguration {
  /**
   * Enables or disables whether the Dev Box should be kept awake during active hours.
   *
   * Possible values: "Enabled", "Disabled"
   */
  keepAwakeEnableStatus: KeepAwakeEnableStatus;
  /**
   * Enables or disables whether the Dev Box should be automatically started at commencement of active hours.
   *
   * Possible values: "Enabled", "Disabled"
   */
  autoStartEnableStatus: AutoStartEnableStatus;
  /** The timezone of the active hours. */
  timeZone?: string;
  /** The start time of the active hours. */
  startTimeHour?: number;
  /** The end time of the active hours. */
  endTimeHour?: number;
  /** The days of the week. */
  daysOfWeek?: DayOfWeek[];
}

/** Manual user set active hours configuration. */
export interface UserActiveHoursConfiguration {
  /** The timezone of the active hours. */
  timeZone?: string;
  /** The start time of the active hours. */
  startTimeHour?: number;
  /** The end time of the active hours. */
  endTimeHour?: number;
  /** The days of the week. */
  daysOfWeek?: DayOfWeek[];
}

/** Represents a list of tasks to apply to a Dev Box. */
export interface CustomizationGroup {
  /**
   * Tasks to apply. Note by default tasks are excluded from the response when
   * listing customization groups. To include them, use the `include=tasks` query
   * parameter.
   */
  tasks?: Array<CustomizationTask>;
}

/** A customization task to run on a Dev Box. */
export interface CustomizationTask {
  /** Name of the task. */
  name: string;
  /** Parameters for the task. */
  parameters?: Record<string, string>;
  /** Display name to help differentiate multiple instances of the same task. */
  displayName?: string;
  /** Timeout, in seconds. Overrides any timeout provided on the task definition. */
  timeoutInSeconds?: number;
  /**
   * What account to run the task as.
   *
   * Possible values: "System", "User"
   */
  runAs?: CustomizationTaskExecutionAccount;
}

/** Represents a list of tasks to apply to a Dev Box */
export interface CustomizationTaskList {
  /** Tasks to apply. */
  tasks?: Array<CustomizationTask>;
}

/** A Dev Box addon. */
export interface DevBoxAddOnParent {
  kind: DevBoxAddOnKind;
}

/** The Dev Box Tunnel addon. */
export interface DevBoxTunnel extends DevBoxAddOnParent {
  /** The kind of Dev Box addon. */
  kind: "DevBoxTunnel";
  /**
   * The hosting resource name, either a DevBox or HyperV.
   * Leaving it empty or `Default` if it's for DevBox.
   */
  hostingResourceName?: string;
}

/** Properties of an environment. */
export interface Environment {
  /**
   * The time the expiration date will be triggered (UTC), after which the
   * environment and associated resources will be deleted.
   */
  expirationDate?: Date | string;
  /** Parameters object for the environment. */
  parameters?: Record<string, unknown>;
  /** Environment type. */
  environmentType: string;
  /** Name of the catalog. */
  catalogName: string;
  /** Name of the environment definition. */
  environmentDefinitionName: string;
}

/** Properties of an environment. These properties can be updated via PATCH after the resource has been created. */
export interface EnvironmentPatchProperties {
  /**
   * The time the expiration date will be triggered (UTC), after which the
   * environment and associated resources will be deleted.
   */
  expirationDate?: Date | string;
}

/** A Dev Box addon. */
export type DevBoxAddOn = DevBoxAddOnParent | DevBoxTunnel;
/** Alias for OsType */
export type OsType = string;
/** Alias for SkuName */
export type SkuName = string;
/** Alias for HibernateSupport */
export type HibernateSupport = string;
/** Alias for LocalAdminStatus */
export type LocalAdminStatus = string;
/** Alias for KeepAwakeEnableStatus */
export type KeepAwakeEnableStatus = string;
/** Alias for AutoStartEnableStatus */
export type AutoStartEnableStatus = string;
/** Alias for DayOfWeek */
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
/** Alias for SingleSignOnStatus */
export type SingleSignOnStatus = string;
/** Alias for PoolAlignTarget */
export type PoolAlignTarget = string;
/** Alias for DevBoxProvisioningState */
export type DevBoxProvisioningState = string;
/** Alias for PowerState */
export type PowerState = string;
/** Alias for ListCustomizationGroupsIncludeProperty */
export type ListCustomizationGroupsIncludeProperty = string;
/** Alias for CustomizationTaskExecutionAccount */
export type CustomizationTaskExecutionAccount = string;
/** Alias for CustomizationTaskStatus */
export type CustomizationTaskStatus = string;
/** Alias for CustomizationGroupStatus */
export type CustomizationGroupStatus = string;
/** Alias for DevBoxAddOnKind */
export type DevBoxAddOnKind = string;
/** Alias for ProvisioningState */
export type ProvisioningState = string;
/** Alias for DevBoxTunnelStatus */
export type DevBoxTunnelStatus = string;
/** Alias for EnvironmentProvisioningState */
export type EnvironmentProvisioningState = string;
