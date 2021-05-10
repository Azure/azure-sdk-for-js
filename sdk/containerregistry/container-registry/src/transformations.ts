// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ManifestAttributesBase,
  TagOrderBy as ServiceTagOrderBy,
  ManifestOrderBy as ServiceManifestOrderBy
} from "./generated/models";
import { ArtifactManifestProperties, TagOrderBy, ManifestOrderBy } from "./model";

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
    writeableProperties: from.writeableProperties
  };
}

export function toServiceTagOrderBy(orderBy?: TagOrderBy): ServiceTagOrderBy | undefined {
  return orderBy === "timeAsc" ? "timeasc" : orderBy === "timeDesc" ? "timedesc" : undefined;
}

export function toServiceManifestOrderBy(
  orderBy?: ManifestOrderBy
): ServiceManifestOrderBy | undefined {
  return orderBy === "timeAsc" ? "timeasc" : orderBy === "timeDesc" ? "timedesc" : undefined;
}
