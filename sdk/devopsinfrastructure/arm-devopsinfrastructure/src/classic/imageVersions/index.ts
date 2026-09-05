// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import { listByImage } from "../../api/imageVersions/operations.js";
import type { ImageVersionsListByImageOptionalParams } from "../../api/imageVersions/options.js";
import type { ImageVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ImageVersions operations. */
export interface ImageVersionsOperations {
  /** List ImageVersion resources by Image */
  listByImage: (
    resourceGroupName: string,
    imageName: string,
    options?: ImageVersionsListByImageOptionalParams,
  ) => PagedAsyncIterableIterator<ImageVersion>;
}
function _getImageVersions(context: DevOpsInfrastructureContext) {
  return {
    listByImage: (
      resourceGroupName: string,
      imageName: string,
      options?: ImageVersionsListByImageOptionalParams,
    ) => listByImage(context, resourceGroupName, imageName, options),
  };
}
export function _getImageVersionsOperations(
  context: DevOpsInfrastructureContext,
): ImageVersionsOperations {
  return {
    ..._getImageVersions(context),
  };
}
