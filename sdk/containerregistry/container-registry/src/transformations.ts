// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ManifestAttributesBase,
  TagOrderBy as ServiceTagOrderBy,
  ManifestOrderBy as ServiceManifestOrderBy,
  ManifestWriteableProperties as ServiceManifestWritableProperties
} from "./generated/models";
import {
  ArtifactManifestProperties,
  ManifestWriteableProperties,
  TagOrderBy,
  ManifestOrderBy
} from "./model";

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
    manifests:
      from.references?.map((r) => {
        return { ...r, manifests: [], tags: [] };
      }) ?? [],
    tags: from.tags ?? [],
    writeableProperties: toManifestWritableProperties(from.writeableProperties)
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
