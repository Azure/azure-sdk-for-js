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
import type { Image, ImageUpdate } from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    imageName: string,
    options?: ImagesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    imageName: string,
    options?: ImagesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an image. */
  update: (
    resourceGroupName: string,
    imageName: string,
    parameters: ImageUpdate,
    options?: ImagesUpdateOptionalParams,
  ) => PollerLike<OperationState<Image>, Image>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    imageName: string,
    parameters: ImageUpdate,
    options?: ImagesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Image>, Image>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    imageName: string,
    parameters: ImageUpdate,
    options?: ImagesUpdateOptionalParams,
  ) => Promise<Image>;
  /** Create or update an image. */
  createOrUpdate: (
    resourceGroupName: string,
    imageName: string,
    parameters: Image,
    options?: ImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Image>, Image>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    imageName: string,
    parameters: Image,
    options?: ImagesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Image>, Image>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    imageName: string,
    parameters: Image,
    options?: ImagesCreateOrUpdateOptionalParams,
  ) => Promise<Image>;
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
    beginDelete: async (
      resourceGroupName: string,
      imageName: string,
      options?: ImagesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, imageName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      imageName: string,
      options?: ImagesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, imageName, options);
    },
    update: (
      resourceGroupName: string,
      imageName: string,
      parameters: ImageUpdate,
      options?: ImagesUpdateOptionalParams,
    ) => update(context, resourceGroupName, imageName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      imageName: string,
      parameters: ImageUpdate,
      options?: ImagesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, imageName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      imageName: string,
      parameters: ImageUpdate,
      options?: ImagesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, imageName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      imageName: string,
      parameters: Image,
      options?: ImagesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, imageName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      imageName: string,
      parameters: Image,
      options?: ImagesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, imageName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      imageName: string,
      parameters: Image,
      options?: ImagesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, imageName, parameters, options);
    },
    get: (resourceGroupName: string, imageName: string, options?: ImagesGetOptionalParams) =>
      get(context, resourceGroupName, imageName, options),
  };
}

export function _getImagesOperations(context: ComputeContext): ImagesOperations {
  return {
    ..._getImages(context),
  };
}
