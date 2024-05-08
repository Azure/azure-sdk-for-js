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

/** A Dev Box */
export interface DevBox {
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /** Indicates whether the owner of the Dev Box is a local administrator. */
  localAdministrator?: LocalAdminStatus;
}

/** Properties of an environment. */
export interface Environment {
  /** Parameters object for the environment. */
  parameters?: unknown;
  /** Environment type. */
  environmentType: string;
  /** Name of the catalog. */
  catalogName: string;
  /** Name of the environment definition. */
  environmentDefinitionName: string;
}

/** Alias for OsType */
export type OsType = "Windows";
/** Alias for HibernateSupport */
export type HibernateSupport = "Enabled" | "Disabled" | "OsUnsupported";
/** Alias for LocalAdminStatus */
export type LocalAdminStatus = "Enabled" | "Disabled";
/** Alias for PowerState */
export type PowerState =
  | "Unknown"
  | "Running"
  | "Deallocated"
  | "PoweredOff"
  | "Hibernated";
