// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** An error response from the service. */
export interface CloudErrorBody {
  /**
   * An identifier for the error. Codes are invariant and are intended to be
   * consumed programmatically.
   */
  code: string;
  /**
   * A message describing the error, intended to be suitable for display in a user
   * interface.
   */
  message: string;
  /**
   * The target of the particular error. For example, the name of the property in
   * error.
   */
  target?: string;
  /** A list of additional details about the error. */
  details?: Array<CloudErrorBody>;
}

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
  /**
   * Indicates whether the owner of the Dev Box is a local administrator.
   *
   * Possible values: Enabled, Disabled
   */
  localAdministrator?: string;
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
