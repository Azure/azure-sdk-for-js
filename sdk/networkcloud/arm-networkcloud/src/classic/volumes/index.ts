// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/volumes/operations.js";
import {
  VolumesListBySubscriptionOptionalParams,
  VolumesListByResourceGroupOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOrUpdateOptionalParams,
  VolumesGetOptionalParams,
} from "../../api/volumes/options.js";
import { OperationStatusResult, Volume } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Volumes operations. */
export interface VolumesOperations {
  /** Get a list of volumes in the provided subscription. */
  listBySubscription: (
    options?: VolumesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Volume>;
  /** Get a list of volumes in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VolumesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Volume>;
  /** Delete the provided volume. */
  delete: (
    resourceGroupName: string,
    volumeName: string,
    options?: VolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Update tags associated with the provided volume. */
  update: (
    resourceGroupName: string,
    volumeName: string,
    options?: VolumesUpdateOptionalParams,
  ) => Promise<Volume>;
  /** Create a new volume or update the properties of the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    volumeName: string,
    volumeParameters: Volume,
    options?: VolumesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Get properties of the provided volume. */
  get: (
    resourceGroupName: string,
    volumeName: string,
    options?: VolumesGetOptionalParams,
  ) => Promise<Volume>;
}

function _getVolumes(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: VolumesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VolumesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      volumeName: string,
      options?: VolumesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, volumeName, options),
    update: (
      resourceGroupName: string,
      volumeName: string,
      options?: VolumesUpdateOptionalParams,
    ) => update(context, resourceGroupName, volumeName, options),
    createOrUpdate: (
      resourceGroupName: string,
      volumeName: string,
      volumeParameters: Volume,
      options?: VolumesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, volumeName, volumeParameters, options),
    get: (resourceGroupName: string, volumeName: string, options?: VolumesGetOptionalParams) =>
      get(context, resourceGroupName, volumeName, options),
  };
}

export function _getVolumesOperations(context: NetworkCloudContext): VolumesOperations {
  return {
    ..._getVolumes(context),
  };
}
