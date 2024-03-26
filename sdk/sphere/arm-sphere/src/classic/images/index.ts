// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import { Image } from "../../models/models.js";
import {
  imagesGet,
  imagesListByCatalog,
  imagesCreateOrUpdate,
  imagesDeleteOperation,
} from "../../api/images/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  ImagesGetOptions,
  ImagesListByCatalogOptions,
  ImagesCreateOrUpdateOptions,
  ImagesDeleteOperationOptions,
} from "../../models/options.js";

export interface ImagesOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    imageName: string,
    options?: ImagesGetOptions,
  ) => Promise<Image>;
  listByCatalog: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: ImagesListByCatalogOptions,
  ) => PagedAsyncIterableIterator<Image>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    imageName: string,
    resource: Image,
    options?: ImagesCreateOrUpdateOptions,
  ) => PollerLike<OperationState<Image>, Image>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    imageName: string,
    options?: ImagesDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
}

export function getImages(context: AzureSphereContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      imageName: string,
      options?: ImagesGetOptions,
    ) =>
      imagesGet(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        imageName,
        options,
      ),
    listByCatalog: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: ImagesListByCatalogOptions,
    ) =>
      imagesListByCatalog(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      imageName: string,
      resource: Image,
      options?: ImagesCreateOrUpdateOptions,
    ) =>
      imagesCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        imageName,
        resource,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      imageName: string,
      options?: ImagesDeleteOperationOptions,
    ) =>
      imagesDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        imageName,
        options,
      ),
  };
}

export function getImagesOperations(
  context: AzureSphereContext,
): ImagesOperations {
  return {
    ...getImages(context),
  };
}
