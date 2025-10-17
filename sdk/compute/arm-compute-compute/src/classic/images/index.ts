// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/images/operations.js";
import type {
  ImagesListOptionalParams,
  ImagesListByResourceGroupOptionalParams,
  ImagesDeleteOptionalParams,
  ImagesUpdateOptionalParams,
  ImagesCreateOrUpdateOptionalParams,
  ImagesGetOptionalParams,
} from "../../api/images/options.js";
import type { Image, ImageUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Images operations. */
export interface ImagesOperations {
  /** Gets the list of Images in the subscription. Use nextLink property in the response to get the next page of Images. Do this till nextLink is null to fetch all the Images. */
  list: (options?: ImagesListOptionalParams) => PagedAsyncIterableIterator<Image>;
  /** Gets the list of images under a resource group. Use nextLink property in the response to get the next page of Images. Do this till nextLink is null to fetch all the Images. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ImagesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Image>;
  /** Deletes an Image. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    imageName: string,
    options?: ImagesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an image. */
  update: (
    resourceGroupName: string,
    imageName: string,
    parameters: ImageUpdate,
    options?: ImagesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update an image. */
  createOrUpdate: (
    resourceGroupName: string,
    imageName: string,
    parameters: Image,
    options?: ImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets an image. */
  get: (
    resourceGroupName: string,
    imageName: string,
    options?: ImagesGetOptionalParams,
  ) => Promise<Image>;
}

function _getImages(context: ComputeContext) {
  return {
    list: (options?: ImagesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ImagesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, imageName: string, options?: ImagesDeleteOptionalParams) =>
      $delete(context, resourceGroupName, imageName, options),
    update: (
      resourceGroupName: string,
      imageName: string,
      parameters: ImageUpdate,
      options?: ImagesUpdateOptionalParams,
    ) => update(context, resourceGroupName, imageName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      imageName: string,
      parameters: Image,
      options?: ImagesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, imageName, parameters, options),
    get: (resourceGroupName: string, imageName: string, options?: ImagesGetOptionalParams) =>
      get(context, resourceGroupName, imageName, options),
  };
}

export function _getImagesOperations(context: ComputeContext): ImagesOperations {
  return {
    ..._getImages(context),
  };
}
