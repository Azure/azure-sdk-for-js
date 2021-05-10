// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-rest-pipeline";
import { ContentProperties, RepositoryProperties, ArtifactTagProperties } from "./generated";

/**
 * Re-export generated types that are used as public interfaces.
 */
export { ContentProperties, RepositoryProperties, ArtifactTagProperties };

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}

/**
 * Defines known {@link ArtifactArchitecture} that the service supports.
 */
export type KnownArtifactArchitecture =
  | "386"
  | "amd64"
  | "arm"
  | "arm64"
  | "mips"
  | "mipsle"
  | "mips64"
  | "mips64le"
  | "ppc64"
  | "ppc64le"
  | "riscv64"
  | "s390x"
  | "wasm";

/**
 * Defines known {@link ArtifactOperatingSystem} values that the service supports.
 */
export type KnownArtifactOperatingSystem =
  | "aix"
  | "android"
  | "darwin"
  | "dragonfly"
  | "freebsd"
  | "illumos"
  | "ios"
  | "js"
  | "linux"
  | "netbsd"
  | "openbsd"
  | "plan9"
  | "solaris"
  | "windows";

/** Manifest attributes details */
export interface ArtifactManifestProperties {
  /**
   * Repository name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly repositoryName?: string;
  /**
   * Manifest
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly digest?: string;
  /**
   * Image size
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly size?: number;
  /**
   * Created time
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly createdOn?: Date;
  /**
   * Last update time
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastUpdatedOn?: Date;
  /**
   * CPU architecture. See {@link KnownArtifactArchitecture} for values supported by the service.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly architecture?: string;
  /**
   * Operating system. See {@link KnownArtifactOperatingSystem} for values supported by the service.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly operatingSystem?: string;
  /** List of manifest attributes details */
  manifests: ArtifactManifestProperties[];
  /**
   * List of tags
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tags: string[];
  /**
   * Writeable properties of the resource
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly writeableProperties?: ContentProperties;
}

/**
 * Defines values for TagOrderBy.
 *  this contains the known values that the service supports.
 * ### Know values supported by the service
 * **timedesc**: Order tags by LastUpdatedOn field, from most recently updated to least recently updated.
 * **timeasc**: Order tags by LastUpdatedOn field, from least recently updated to most recently updated.
 */
export type TagOrderBy = "timeDesc" | "timeAsc";

/**
 * Defines values for RegistryArtifactOrderBy.
 *  this contains the known values that the service supports.
 * ### Know values supported by the service
 * **timedesc**: Order registry artifacts by LastUpdatedOn field, from most recently updated to least recently updated.
 * **timeasc**: Order  registry artifacts by LastUpdatedOn field, from least recently updated to most recently updated.
 */
export type ManifestOrderBy = "timeDesc" | "timeAsc";

/** Deleted repository */
export interface DeleteRepositoryResult {
  /**
   * SHA of the deleted image
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly deletedManifests: string[];
  /**
   * Tag of the deleted image
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly deletedTags: string[];
}
