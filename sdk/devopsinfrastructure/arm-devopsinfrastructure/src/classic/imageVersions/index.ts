// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import { imageVersionsListByImage } from "../../api/imageVersions/index.js";
import type { ImageVersionsListByImageOptionalParams } from "../../api/options.js";
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

export function getImageVersions(context: DevOpsInfrastructureContext, subscriptionId: string) {
  return {
    listByImage: (
      resourceGroupName: string,
      imageName: string,
      options?: ImageVersionsListByImageOptionalParams,
    ) => imageVersionsListByImage(context, subscriptionId, resourceGroupName, imageName, options),
  };
}

export function getImageVersionsOperations(
  context: DevOpsInfrastructureContext,
  subscriptionId: string,
): ImageVersionsOperations {
  return {
    ...getImageVersions(context, subscriptionId),
  };
}
