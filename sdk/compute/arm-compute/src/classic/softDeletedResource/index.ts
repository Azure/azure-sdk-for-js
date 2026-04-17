// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { listByArtifactName } from "../../api/softDeletedResource/operations.js";
import type { SoftDeletedResourceListByArtifactNameOptionalParams } from "../../api/softDeletedResource/options.js";
import type { GallerySoftDeletedResource } from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SoftDeletedResource operations. */
export interface SoftDeletedResourceOperations {
  /** List soft-deleted resources of an artifact in the gallery, such as soft-deleted gallery image version of an image. */
  listByArtifactName: (
    resourceGroupName: string,
    galleryName: string,
    artifactType: string,
    artifactName: string,
    options?: SoftDeletedResourceListByArtifactNameOptionalParams,
  ) => PagedAsyncIterableIterator<GallerySoftDeletedResource>;
}

function _getSoftDeletedResource(context: ComputeContext) {
  return {
    listByArtifactName: (
      resourceGroupName: string,
      galleryName: string,
      artifactType: string,
      artifactName: string,
      options?: SoftDeletedResourceListByArtifactNameOptionalParams,
    ) =>
      listByArtifactName(
        context,
        resourceGroupName,
        galleryName,
        artifactType,
        artifactName,
        options,
      ),
  };
}

export function _getSoftDeletedResourceOperations(
  context: ComputeContext,
): SoftDeletedResourceOperations {
  return {
    ..._getSoftDeletedResource(context),
  };
}
