// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DisconnectedOperationsManagementContext } from "../../api/disconnectedOperationsManagementContext.js";
import { listDownloadUri, get, listByDisconnectedOperation } from "../../api/images/operations.js";
import type {
  ImagesListDownloadUriOptionalParams,
  ImagesGetOptionalParams,
  ImagesListByDisconnectedOperationOptionalParams,
} from "../../api/images/options.js";
import type { Image, ImageDownloadResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Images operations. */
export interface ImagesOperations {
  /** Get the URI to download the image. */
  listDownloadUri: (
    resourceGroupName: string,
    name: string,
    imageName: string,
    options?: ImagesListDownloadUriOptionalParams,
  ) => Promise<ImageDownloadResult>;
  /** Get the resource. */
  get: (
    resourceGroupName: string,
    name: string,
    imageName: string,
    options?: ImagesGetOptionalParams,
  ) => Promise<Image>;
  /** List by disconnected operation. */
  listByDisconnectedOperation: (
    resourceGroupName: string,
    name: string,
    options?: ImagesListByDisconnectedOperationOptionalParams,
  ) => PagedAsyncIterableIterator<Image>;
}

function _getImages(context: DisconnectedOperationsManagementContext) {
  return {
    listDownloadUri: (
      resourceGroupName: string,
      name: string,
      imageName: string,
      options?: ImagesListDownloadUriOptionalParams,
    ) => listDownloadUri(context, resourceGroupName, name, imageName, options),
    get: (
      resourceGroupName: string,
      name: string,
      imageName: string,
      options?: ImagesGetOptionalParams,
    ) => get(context, resourceGroupName, name, imageName, options),
    listByDisconnectedOperation: (
      resourceGroupName: string,
      name: string,
      options?: ImagesListByDisconnectedOperationOptionalParams,
    ) => listByDisconnectedOperation(context, resourceGroupName, name, options),
  };
}

export function _getImagesOperations(
  context: DisconnectedOperationsManagementContext,
): ImagesOperations {
  return {
    ..._getImages(context),
  };
}
