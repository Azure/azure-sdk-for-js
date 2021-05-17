// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ManifestAttributesBase,
  TagOrderBy as ServiceTagOrderBy,
  ManifestOrderBy as ServiceManifestOrderBy,
  ManifestWriteableProperties as ServiceManifestWritableProperties,
  RepositoryProperties as ServiceRepositoryProperties,
  ArtifactTagProperties as ServiceArtifactTagProperties
} from "./generated/models";
import {
  ArtifactManifestProperties,
  TagOrderBy,
  ManifestOrderBy,
  RepositoryProperties,
  ArtifactTagProperties
} from "./models";

/** Changeable attributes. Filter out `quarantineState` and `quarantineDetails` returned by service */
interface ManifestWriteableProperties {
  /** Delete enabled */
  canDelete?: boolean;
  /** Write enabled */
  canWrite?: boolean;
  /** List enabled */
  canList?: boolean;
  /** Read enabled */
  canRead?: boolean;
}

export function toManifestWritableProperties(
  from?: ServiceManifestWritableProperties
): ManifestWriteableProperties | undefined {
  // don't return unwanted properties, namely `quarantineState` and `quarantineDetails`
  return from
    ? {
        canDelete: from.canDelete,
        canList: from.canList,
        canRead: from.canRead,
        canWrite: from.canWrite
      }
    : undefined;
}

export function toArtifactManifestProperties(
  from: ManifestAttributesBase,
  repositoryName: string
): ArtifactManifestProperties {
  return {
    repositoryName: repositoryName,
    digest: from.digest,
    size: from.size,
    createdOn: from.createdOn,
    lastUpdatedOn: from.lastUpdatedOn,
    architecture: from.architecture ?? undefined,
    operatingSystem: from.operatingSystem ?? undefined,
    manifestReferences: from.manifestReferences ?? [],
    tags: from.tags ?? [],
    ...toManifestWritableProperties(from.writeableProperties)
  };
}

export function toRepositoryProperties(from: ServiceRepositoryProperties): RepositoryProperties {
  return {
    name: from.name,
    createdOn: from.createdOn,
    lastUpdatedOn: from.lastUpdatedOn,
    manifestCount: from.manifestCount,
    tagCount: from.tagCount,
    ...from.writeableProperties
  };
}

export function toArtifactTagProperties(from: ServiceArtifactTagProperties): ArtifactTagProperties {
  return {
    repositoryName: from.repositoryName,
    name: from.name,
    digest: from.digest,
    createdOn: from.createdOn,
    lastUpdatedOn: from.lastUpdatedOn,
    ...from.writeableProperties
  };
}

export function toServiceTagOrderBy(orderBy?: TagOrderBy): ServiceTagOrderBy | undefined {
  return orderBy === "LastUpdatedOnAscending"
    ? "timeasc"
    : orderBy === "LastUpdatedOnDescending"
    ? "timedesc"
    : undefined;
}

export function toServiceManifestOrderBy(
  orderBy?: ManifestOrderBy
): ServiceManifestOrderBy | undefined {
  return orderBy === "LastUpdatedOnAscending"
    ? "timeasc"
    : orderBy === "LastUpdatedOnDescending"
    ? "timedesc"
    : undefined;
}
