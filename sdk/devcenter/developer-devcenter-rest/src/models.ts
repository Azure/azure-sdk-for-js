// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** A Dev Box */
export interface DevBox {
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** Indicates whether the owner of the Dev Box is a local administrator. */
  localAdministrator?: LocalAdminStatus;
}

/** Hardware specifications for the Dev Box. */
export interface HardwareProfile {}

/** Storage settings for the Dev Box's disks */
export interface StorageProfile {
  /** Settings for the operating system disk. */
  osDisk?: OsDisk;
}

/** Settings for the operating system disk. */
export interface OsDisk {}

/** Specifies information about the image used */
export interface ImageReference {}

/** Properties of an environment. */
export interface Environment {
  /** Parameters object for the environment. */
  parameters?: Record<string, unknown>;
  /** Environment type. */
  environmentType: string;
  /** Name of the catalog. */
  catalogName: string;
  /** Name of the environment definition. */
  environmentDefinitionName: string;
}

/** Alias for HibernateSupport */
export type HibernateSupport = "Enabled" | "Disabled" | "OsUnsupported" | string;
/** Alias for DevBoxProvisioningState */
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
  | "NotProvisioned"
  | string;
/** Alias for PowerState */
export type PowerState =
  | "Unknown"
  | "Running"
  | "Deallocated"
  | "PoweredOff"
  | "Hibernated"
  | string;
/** Alias for OsType */
export type OsType = "Windows" | string;
/** Alias for SkuName */
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
  | "general_a_32c128gb2048ssd_v2"
  | string;
/** Alias for LocalAdminStatus */
export type LocalAdminStatus = "Enabled" | "Disabled" | string;
/** Alias for EnvironmentProvisioningState */
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
  | "StorageProvisioningFailed"
  | string;
