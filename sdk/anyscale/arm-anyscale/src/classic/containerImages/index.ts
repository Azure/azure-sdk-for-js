// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/containerImages/operations.js";
import type {
  ContainerImagesListByResourceGroupOptionalParams,
  ContainerImagesDeleteOptionalParams,
  ContainerImagesUpdateOptionalParams,
  ContainerImagesCreateOrUpdateOptionalParams,
  ContainerImagesGetOptionalParams,
} from "../../api/containerImages/options.js";
import type { ContainerImage, ContainerImageUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerImages operations. */
export interface ContainerImagesOperations {
  /** Lists container images in a cloud. */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudName: string,
    options?: ContainerImagesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerImage>;
  /** Deletes a container image. */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    containerImageName: string,
    options?: ContainerImagesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a container image. */
  update: (
    resourceGroupName: string,
    cloudName: string,
    containerImageName: string,
    properties: ContainerImageUpdate,
    options?: ContainerImagesUpdateOptionalParams,
  ) => Promise<ContainerImage>;
  /** Creates or updates a container image. */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    containerImageName: string,
    resource: ContainerImage,
    options?: ContainerImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ContainerImage>, ContainerImage>;
  /** Gets a container image. */
  get: (
    resourceGroupName: string,
    cloudName: string,
    containerImageName: string,
    options?: ContainerImagesGetOptionalParams,
  ) => Promise<ContainerImage>;
}

function _getContainerImages(context: PlatformContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudName: string,
      options?: ContainerImagesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudName, options),
    delete: (
      resourceGroupName: string,
      cloudName: string,
      containerImageName: string,
      options?: ContainerImagesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudName, containerImageName, options),
    update: (
      resourceGroupName: string,
      cloudName: string,
      containerImageName: string,
      properties: ContainerImageUpdate,
      options?: ContainerImagesUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudName, containerImageName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      containerImageName: string,
      resource: ContainerImage,
      options?: ContainerImagesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, cloudName, containerImageName, resource, options),
    get: (
      resourceGroupName: string,
      cloudName: string,
      containerImageName: string,
      options?: ContainerImagesGetOptionalParams,
    ) => get(context, resourceGroupName, cloudName, containerImageName, options),
  };
}

export function _getContainerImagesOperations(context: PlatformContext): ContainerImagesOperations {
  return {
    ..._getContainerImages(context),
  };
}
