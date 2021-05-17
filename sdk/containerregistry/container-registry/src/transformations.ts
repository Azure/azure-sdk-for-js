// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ManifestAttributesBase,
  TagOrderBy as ServiceTagOrderBy,
  ManifestOrderBy as ServiceManifestOrderBy,
  ManifestWriteableProperties as ServiceManifestWritableProperties
} from "./generated/models";
import { ArtifactManifestProperties, TagOrderBy, ManifestOrderBy } from "./models";

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
    ...toManifestWritableProperties(from)
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
