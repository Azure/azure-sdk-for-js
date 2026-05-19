// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext } from "../../api/blockContext.js";
import { listByVolumeGroup, $delete, update, create, get } from "../../api/volumes/operations.js";
import type {
  VolumesListByVolumeGroupOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOptionalParams,
  VolumesGetOptionalParams,
} from "../../api/volumes/options.js";
import type { Volume, VolumeUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Volumes operations. */
export interface VolumesOperations {
  /** List volumes by volume group */
  listByVolumeGroup: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    options?: VolumesListByVolumeGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Volume>;
  /** Delete a volume */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    volumeName: string,
    options?: VolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a volume */
  update: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    volumeName: string,
    properties: VolumeUpdate,
    options?: VolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Create a volume */
  create: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    volumeName: string,
    resource: Volume,
    options?: VolumesCreateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Get a volume */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    volumeName: string,
    options?: VolumesGetOptionalParams,
  ) => Promise<Volume>;
}

function _getVolumes(context: BlockContext) {
  return {
    listByVolumeGroup: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      options?: VolumesListByVolumeGroupOptionalParams,
    ) => listByVolumeGroup(context, resourceGroupName, storagePoolName, volumeGroupName, options),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      volumeName: string,
      options?: VolumesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storagePoolName, volumeGroupName, volumeName, options),
    update: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      volumeName: string,
      properties: VolumeUpdate,
      options?: VolumesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        volumeName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      volumeName: string,
      resource: Volume,
      options?: VolumesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        volumeName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      volumeName: string,
      options?: VolumesGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, volumeGroupName, volumeName, options),
  };
}

export function _getVolumesOperations(context: BlockContext): VolumesOperations {
  return {
    ..._getVolumes(context),
  };
}
