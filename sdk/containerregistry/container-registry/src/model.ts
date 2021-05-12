// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-rest-pipeline";
import {
  RepositoryProperties,
  ArtifactTagProperties,
  RepositoryWriteableProperties,
  TagWriteableProperties
} from "./generated";

/**
 * Re-export generated types that are used as public interfaces.
 */
export {
  RepositoryProperties,
  ArtifactTagProperties,
  RepositoryWriteableProperties,
  TagWriteableProperties
};

/**
 * Client options used to configure Container Registry Repository API requests.
 */
export interface ContainerRegistryClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}

/**
 * Defines known {@link ArtifactArchitecture} that the service supports.
 */
export enum KnownArtifactArchitecture {
  I386 = "386",
  Amd64 = "amd64",
  Arm = "arm",
  Arm64 = "arm64",
  Mips = "mips",
  MipsLe = "mipsle",
  Mips64 = "mips64",
  Mips64Le = "mips64le",
  Ppc64 = "ppc64",
  Ppc64Le = "ppc64le",
  RiscV64 = "riscv64",
  S390X = "s390x",
  Wasm = "wasm"
}

/**
 * Defines known {@link ArtifactOperatingSystem} values that the service supports.
 */
export enum KnownArtifactOperatingSystem {
  Aix = "aix",
  Android = "android",
  Darwin = "darwin",
  Dragonfly = "dragonfly",
  FreeBsd = "freebsd",
  Illumos = "illumos",
  IOs = "ios",
  Js = "js",
  Linux = "linux",
  NetBsd = "netbsd",
  OpenBsd = "openbsd",
  Plan9 = "plan9",
  Solaris = "solaris",
  Windows = "windows"
}

/** Changeable attributes */
export interface ManifestWriteableProperties {
  /** Delete enabled */
  canDelete?: boolean;
  /** Write enabled */
  canWrite?: boolean;
  /** List enabled */
  canList?: boolean;
  /** Read enabled */
  canRead?: boolean;
}

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
  readonly writeableProperties?: ManifestWriteableProperties;
}

/**
 * Defines values for TagOrderBy.
 *  this contains the known values that the service supports.
 * ### Know values supported by the service
 * **LastUpdatedOnDescending**: Order tags by LastUpdatedOn field, from most recently updated to least recently updated.
 * **LastUpdatedOnAscending**: Order tags by LastUpdatedOn field, from least recently updated to most recently updated.
 */
export type TagOrderBy = "LastUpdatedOnDescending" | "LastUpdatedOnAscending";

/**
 * Defines values for RegistryArtifactOrderBy.
 *  this contains the known values that the service supports.
 * ### Know values supported by the service
 * **LastUpdatedOnDescending**: Order registry artifacts by LastUpdatedOn field, from most recently updated to least recently updated.
 * **LastUpdatedOnAscending**: Order  registry artifacts by LastUpdatedOn field, from least recently updated to most recently updated.
 */
export type ManifestOrderBy = "LastUpdatedOnDescending" | "LastUpdatedOnAscending";

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
