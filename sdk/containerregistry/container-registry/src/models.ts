// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { ContainerRepositoryProperties, ArtifactTagProperties } from "./generated";

import { ArtifactTagProperties } from "./generated";

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
  iOS = "ios",
  JS = "js",
  Linux = "linux",
  NetBsd = "netbsd",
  OpenBsd = "openbsd",
  Plan9 = "plan9",
  Solaris = "solaris",
  Windows = "windows"
}

/** Manifest attributes details */
export interface ArtifactManifestPlatform {
  /**
   * Manifest digest
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly digest: string;
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
}

/** Manifest attributes details */
export interface ArtifactManifestProperties {
  /**
   * Registry login server name.  This is likely to be similar to <registry-name>.azurecr.io
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly registryLoginServer: string;
  /**
   * Repository name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly repositoryName: string;
  /**
   * Manifest
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly digest: string;
  /**
   * Image size
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly size?: number;
  /**
   * Created time
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly createdOn: Date;
  /**
   * Last update time
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastUpdatedOn: Date;
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
  /**
   * List of manifests referenced by this manifest list.  List will be empty if this manifest is not a manifest list.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly relatedArtifacts: ArtifactManifestPlatform[];
  /**
   * List of tags
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tags: string[];
  /** Delete enabled */
  canDelete?: boolean;
  /** Write enabled */
  canWrite?: boolean;
  /** List enabled */
  canList?: boolean;
  /** Read enabled */
  canRead?: boolean;
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

/**
 * Contains response data for the listRepositoryNames operation.
 */
export interface RepositoryPageResponse extends Array<string> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listManifests operation.
 */
export interface ManifestPageResponse extends Array<ArtifactManifestProperties> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listTags operation.
 */
export interface TagPageResponse extends Array<ArtifactTagProperties> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}
