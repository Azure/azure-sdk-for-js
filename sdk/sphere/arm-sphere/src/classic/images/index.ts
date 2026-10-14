// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext } from "../../api/azureSphereContext.js";
import { listByCatalog, $delete, createOrUpdate, get } from "../../api/images/operations.js";
import type {
  ImagesListByCatalogOptionalParams,
  ImagesDeleteOptionalParams,
  ImagesCreateOrUpdateOptionalParams,
  ImagesGetOptionalParams,
} from "../../api/images/options.js";
import type { Image } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Images operations. */
export interface ImagesOperations {
  /** List Image resources by Catalog */
  listByCatalog: (
    resourceGroupName: string,
    catalogName: string,
    options?: ImagesListByCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<Image>;
  /** Delete a Image */
  delete: (
    resourceGroupName: string,
    catalogName: string,
    imageName: string,
    options?: ImagesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Image */
  createOrUpdate: (
    resourceGroupName: string,
    catalogName: string,
    imageName: string,
    resource: Image,
    options?: ImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Image>, Image>;
  /** Get a Image */
  get: (
    resourceGroupName: string,
    catalogName: string,
    imageName: string,
    options?: ImagesGetOptionalParams,
  ) => Promise<Image>;
}

function _getImages(context: AzureSphereContext) {
  return {
    listByCatalog: (
      resourceGroupName: string,
      catalogName: string,
      options?: ImagesListByCatalogOptionalParams,
    ) => listByCatalog(context, resourceGroupName, catalogName, options),
    delete: (
      resourceGroupName: string,
      catalogName: string,
      imageName: string,
      options?: ImagesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, catalogName, imageName, options),
    createOrUpdate: (
      resourceGroupName: string,
      catalogName: string,
      imageName: string,
      resource: Image,
      options?: ImagesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, catalogName, imageName, resource, options),
    get: (
      resourceGroupName: string,
      catalogName: string,
      imageName: string,
      options?: ImagesGetOptionalParams,
    ) => get(context, resourceGroupName, catalogName, imageName, options),
  };
}

export function _getImagesOperations(context: AzureSphereContext): ImagesOperations {
  return {
    ..._getImages(context),
  };
}
