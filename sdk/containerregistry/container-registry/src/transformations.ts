// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ArtifactTagOrderBy as ServiceTagOrderBy,
  ArtifactManifestOrderBy as ServiceManifestOrderBy,
  ManifestWriteableProperties as ServiceManifestWritableProperties,
  ArtifactManifestProperties as ServiceArtifactManifestProperties,
} from "./generated/models";
import { ArtifactManifestProperties, ArtifactTagOrder, ArtifactManifestOrder } from "./models";

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
        canWrite: from.canWrite,
      }
    : undefined;
}

export function toArtifactManifestProperties(
  from: ServiceArtifactManifestProperties,
  repositoryName: string,
  registryLoginServer: string
): ArtifactManifestProperties {
  return {
    registryLoginServer,
    repositoryName,
    digest: from.digest,
    sizeInBytes: from.size,
    createdOn: from.createdOn,
    lastUpdatedOn: from.lastUpdatedOn,
    architecture: from.architecture ?? undefined,
    operatingSystem: from.operatingSystem ?? undefined,
    relatedArtifacts: from.relatedArtifacts ?? [],
    tags: from.tags ?? [],
    ...toManifestWritableProperties(from),
  };
}

export function toServiceTagOrderBy(orderBy?: ArtifactTagOrder): ServiceTagOrderBy | undefined {
  return orderBy === "LastUpdatedOnAscending"
    ? "timeasc"
    : orderBy === "LastUpdatedOnDescending"
    ? "timedesc"
    : undefined;
}

export function toServiceManifestOrderBy(
  orderBy?: ArtifactManifestOrder
): ServiceManifestOrderBy | undefined {
  return orderBy === "LastUpdatedOnAscending"
    ? "timeasc"
    : orderBy === "LastUpdatedOnDescending"
    ? "timedesc"
    : undefined;
}
