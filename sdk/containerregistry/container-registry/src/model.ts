// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-rest-pipeline";
import {
  ContentProperties,
  DeleteRepositoryResult,
  RepositoryProperties,
  TagProperties
} from "./generated";

/**
 * Re-export generated types that are used as public interfaces.
 */
export { ContentProperties, DeleteRepositoryResult, RepositoryProperties, TagProperties };

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}

/** Manifest attributes details */
export interface RegistryArtifactProperties {
  /** Image name */
  repository?: string;
  /** Manifest */
  digest?: string;
  /** Image size */
  size?: number;
  /** Created time */
  createdOn?: Date;
  /** Last update time */
  lastUpdatedOn?: Date;
  /** CPU architecture */
  cpuArchitecture?: string;
  /** Operating system */
  operatingSystem?: string;
  /** List of manifest attributes details */
  registryArtifacts?: RegistryArtifactProperties[];
  /** List of tags */
  tags?: string[];
  /** Writeable properties of the resource */
  writeableProperties?: ContentProperties;
}

/**
 * Defines values for TagOrderBy.
 *  this contains the known values that the service supports.
 * ### Know values supported by the service
 * **timedesc**: Order tags by LastUpdatedOn field, from most recently updated to least recently updated.
 * **timeasc**: Order tags by LastUpdatedOn field, from least recently updated to most recently updated.
 */
export type TagOrderBy = "timedesc" | "timeasc";

/**
 * Defines values for RegistryArtifactOrderBy.
 *  this contains the known values that the service supports.
 * ### Know values supported by the service
 * **timedesc**: Order registry artifacts by LastUpdatedOn field, from most recently updated to least recently updated.
 * **timeasc**: Order  registry artifacts by LastUpdatedOn field, from least recently updated to most recently updated.
 */
export type RegistryArtifactOrderBy = "timedesc" | "timeasc";
