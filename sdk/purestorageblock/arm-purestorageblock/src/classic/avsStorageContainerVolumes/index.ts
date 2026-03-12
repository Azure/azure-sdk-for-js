// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext } from "../../api/blockContext.js";
import { AvsStorageContainerVolumeUpdate, AvsStorageContainerVolume } from "../../models/models.js";
import {
  AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams,
  AvsStorageContainerVolumesDeleteOptionalParams,
  AvsStorageContainerVolumesGetOptionalParams,
  AvsStorageContainerVolumesUpdateOptionalParams,
} from "../../api/avsStorageContainerVolumes/options.js";
import {
  listByAvsStorageContainer,
  $delete,
  get,
  update,
} from "../../api/avsStorageContainerVolumes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AvsStorageContainerVolumes operations. */
export interface AvsStorageContainerVolumesOperations {
  /** List volumes in an AVS storage container */
  listByAvsStorageContainer: (
    resourceGroupName: string,
    storagePoolName: string,
    storageContainerName: string,
    options?: AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams,
  ) => PagedAsyncIterableIterator<AvsStorageContainerVolume>;
  /** Delete a volume in an AVS storage container */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    storageContainerName: string,
    volumeId: string,
    options?: AvsStorageContainerVolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a volume in an AVS storage container */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    storageContainerName: string,
    volumeId: string,
    options?: AvsStorageContainerVolumesGetOptionalParams,
  ) => Promise<AvsStorageContainerVolume>;
  /** Update a volume in an AVS storage container */
  update: (
    resourceGroupName: string,
    storagePoolName: string,
    storageContainerName: string,
    volumeId: string,
    properties: AvsStorageContainerVolumeUpdate,
    options?: AvsStorageContainerVolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<AvsStorageContainerVolume>, AvsStorageContainerVolume>;
}

function _getAvsStorageContainerVolumes(context: BlockContext) {
  return {
    listByAvsStorageContainer: (
      resourceGroupName: string,
      storagePoolName: string,
      storageContainerName: string,
      options?: AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams,
    ) =>
      listByAvsStorageContainer(
        context,
        resourceGroupName,
        storagePoolName,
        storageContainerName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      storageContainerName: string,
      volumeId: string,
      options?: AvsStorageContainerVolumesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, storagePoolName, storageContainerName, volumeId, options),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      storageContainerName: string,
      volumeId: string,
      options?: AvsStorageContainerVolumesGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, storageContainerName, volumeId, options),
    update: (
      resourceGroupName: string,
      storagePoolName: string,
      storageContainerName: string,
      volumeId: string,
      properties: AvsStorageContainerVolumeUpdate,
      options?: AvsStorageContainerVolumesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        storagePoolName,
        storageContainerName,
        volumeId,
        properties,
        options,
      ),
  };
}

export function _getAvsStorageContainerVolumesOperations(
  context: BlockContext,
): AvsStorageContainerVolumesOperations {
  return {
    ..._getAvsStorageContainerVolumes(context),
  };
}
