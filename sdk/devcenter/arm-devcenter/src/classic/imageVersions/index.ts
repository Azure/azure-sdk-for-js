// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listByProject,
  getByProject,
  listByImage,
  get,
} from "../../api/imageVersions/operations.js";
import type {
  ImageVersionsListByProjectOptionalParams,
  ImageVersionsGetByProjectOptionalParams,
  ImageVersionsListByImageOptionalParams,
  ImageVersionsGetOptionalParams,
} from "../../api/imageVersions/options.js";
import type { ImageVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ImageVersions operations. */
export interface ImageVersionsOperations {
  /** Lists versions for an image. */
  listByProject: (
    resourceGroupName: string,
    projectName: string,
    imageName: string,
    options?: ImageVersionsListByProjectOptionalParams,
  ) => PagedAsyncIterableIterator<ImageVersion>;
  /** Gets an image version. */
  getByProject: (
    resourceGroupName: string,
    projectName: string,
    imageName: string,
    versionName: string,
    options?: ImageVersionsGetByProjectOptionalParams,
  ) => Promise<ImageVersion>;
  /** Lists versions for an image. */
  listByImage: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    imageName: string,
    options?: ImageVersionsListByImageOptionalParams,
  ) => PagedAsyncIterableIterator<ImageVersion>;
  /** Gets an image version. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    imageName: string,
    versionName: string,
    options?: ImageVersionsGetOptionalParams,
  ) => Promise<ImageVersion>;
}

function _getImageVersions(context: DevCenterContext) {
  return {
    listByProject: (
      resourceGroupName: string,
      projectName: string,
      imageName: string,
      options?: ImageVersionsListByProjectOptionalParams,
    ) => listByProject(context, resourceGroupName, projectName, imageName, options),
    getByProject: (
      resourceGroupName: string,
      projectName: string,
      imageName: string,
      versionName: string,
      options?: ImageVersionsGetByProjectOptionalParams,
    ) => getByProject(context, resourceGroupName, projectName, imageName, versionName, options),
    listByImage: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      imageName: string,
      options?: ImageVersionsListByImageOptionalParams,
    ) => listByImage(context, resourceGroupName, devCenterName, galleryName, imageName, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      galleryName: string,
      imageName: string,
      versionName: string,
      options?: ImageVersionsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, devCenterName, galleryName, imageName, versionName, options),
  };
}

export function _getImageVersionsOperations(context: DevCenterContext): ImageVersionsOperations {
  return {
    ..._getImageVersions(context),
  };
}
