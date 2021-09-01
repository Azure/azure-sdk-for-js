// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { ContainerRepositoryProperties, ArtifactTagProperties } from "./generated";

import { ArtifactTagProperties } from "./generated";

/**
 * Defines known cloud audiences for Azure Container Registry.
 */
export enum KnownContainerRegistryAudience {
  /** Azure China */
  AzureResourceManagerChina = "https://management.chinacloudapi.cn",
  /** Azure Gemany */
  AzureResourceManagerGermany = "https://management.microsoftazure.de",
  /** Azure Government */
  AzureResourceManagerGovernment = "https://management.usgovcloudapi.net",
  /** Azure Public Cloud */
  AzureResourceManagerPublicCloud = "https://management.azure.com"
}

/**
 * Defines known artifact architectures that the service supports.
 */
export enum KnownArtifactArchitecture {
  /** i386 */
  I386 = "386",
  /** AMD64 */
  Amd64 = "amd64",
  /** ARM */
  Arm = "arm",
  /** ARM64 */
  Arm64 = "arm64",
  /** MIPS */
  Mips = "mips",
  /** MIPSLE */
  MipsLe = "mipsle",
  /** MIPS64 */
  Mips64 = "mips64",
  /** MIPS64LE */
  Mips64Le = "mips64le",
  /** PPC64 */
  Ppc64 = "ppc64",
  /** PPC64LE */
  Ppc64Le = "ppc64le",
  /** RISCv64 */
  RiscV64 = "riscv64",
  /** s390x */
  S390X = "s390x",
  /** Wasm */
  Wasm = "wasm"
}

/**
 * Defines known artifact platform's operating systems that the service supports.
 */
export enum KnownArtifactOperatingSystem {
  /** Aix */
  Aix = "aix",
  /** Android */
  Android = "android",
  /** Darwin */
  Darwin = "darwin",
  /** Dragonfly */
  Dragonfly = "dragonfly",
  /** FreeBSD */
  FreeBsd = "freebsd",
  /** Illumos */
  Illumos = "illumos",
  /** iOS */
  iOS = "ios",
  /** JS */
  JS = "js",
  /** Linux */
  Linux = "linux",
  /** NetBSD */
  NetBsd = "netbsd",
  /** OpenBSD */
  OpenBsd = "openbsd",
  /** Plan9 */
  Plan9 = "plan9",
  /** Solaris */
  Solaris = "solaris",
  /** Windows */
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
