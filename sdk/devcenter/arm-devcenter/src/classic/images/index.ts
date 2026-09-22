// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listByProject,
  getByProject,
  listByDevCenter,
  listByGallery,
  get,
} from "../../api/images/operations.js";
import type {
  ImagesListByProjectOptionalParams,
  ImagesGetByProjectOptionalParams,
  ImagesListByDevCenterOptionalParams,
  ImagesListByGalleryOptionalParams,
  ImagesGetOptionalParams,
} from "../../api/images/options.js";
import type { Image } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Images operations. */
export interface ImagesOperations {
  /** Lists images for a project. */
  listByProject: (
    resourceGroupName: string,
    projectName: string,
    options?: ImagesListByProjectOptionalParams,
  ) => PagedAsyncIterableIterator<Image>;
  /** Gets an image. */
  getByProject: (
    resourceGroupName: string,
    projectName: string,
    imageName: string,
    options?: ImagesGetByProjectOptionalParams,
  ) => Promise<Image>;
  /** Lists images for a devcenter. */
  listByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    options?: ImagesListByDevCenterOptionalParams,
  ) => PagedAsyncIterableIterator<Image>;
  /** Lists images for a gallery. */
  listByGallery: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: ImagesListByGalleryOptionalParams,
  ) => PagedAsyncIterableIterator<Image>;
  /** Gets a gallery image. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    imageName: string,
    options?: ImagesGetOptionalParams,
  ) => Promise<Image>;
}

function _getImages(context: DevCenterContext) {
  return {
    listByProject: (
      resourceGroupName: string,
      projectName: string,
      options?: ImagesListByProjectOptionalParams,
    ) => listByProject(context, resourceGroupName, projectName, options),
    getByProject: (
      resourceGroupName: string,
      projectName: string,
      imageName: string,
      options?: ImagesGetByProjectOptionalParams,
    ) => getByProject(context, resourceGroupName, projectName, imageName, options),
    listByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      options?: ImagesListByDevCenterOptionalParams,
    ) => listByDevCenter(context, resourceGroupName, devCenterName, options),
    listByGallery: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      options?: ImagesListByGalleryOptionalParams,
    ) => listByGallery(context, resourceGroupName, devCenterName, galleryName, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      imageName: string,
      options?: ImagesGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, galleryName, imageName, options),
  };
}

export function _getImagesOperations(context: DevCenterContext): ImagesOperations {
  return {
    ..._getImages(context),
  };
}
