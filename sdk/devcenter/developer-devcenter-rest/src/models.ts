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

/** A Dev Box. */
export interface DevBox {
  /** The name of the Dev Box pool this machine belongs to. */
  poolName: string;
  /**
   * Indicates whether the owner of the Dev Box is a local administrator.
   *
   * Possible values: "Enabled", "Disabled"
   */
  localAdministrator?: LocalAdminStatus;
}

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

/** Alias for OsType */
export type OsType = string;
/** Alias for SkuName */
export type SkuName = string;
/** Alias for HibernateSupport */
export type HibernateSupport = string;
/** Alias for LocalAdminStatus */
export type LocalAdminStatus = string;
/** Alias for DevBoxProvisioningState */
export type DevBoxProvisioningState = string;
/** Alias for PowerState */
export type PowerState = string;
/** Alias for EnvironmentProvisioningState */
export type EnvironmentProvisioningState = string;
