// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext } from "../../api/blockContext.js";
import {
  getStatus,
  listConnectionParameters,
  listByStoragePool,
  $delete,
  update,
  create,
  get,
} from "../../api/volumeGroups/operations.js";
import type {
  VolumeGroupsGetStatusOptionalParams,
  VolumeGroupsListConnectionParametersOptionalParams,
  VolumeGroupsListByStoragePoolOptionalParams,
  VolumeGroupsDeleteOptionalParams,
  VolumeGroupsUpdateOptionalParams,
  VolumeGroupsCreateOptionalParams,
  VolumeGroupsGetOptionalParams,
} from "../../api/volumeGroups/options.js";
import type {
  VolumeGroup,
  VolumeGroupUpdate,
  ConnectionParametersResponse,
  VolumeGroupStatus,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VolumeGroups operations. */
export interface VolumeGroupsOperations {
  /** Get current status and space information of the volume group */
  getStatus: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    options?: VolumeGroupsGetStatusOptionalParams,
  ) => Promise<VolumeGroupStatus>;
  /** Get connection parameters for ISCSI connection to the volume group */
  listConnectionParameters: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    options?: VolumeGroupsListConnectionParametersOptionalParams,
  ) => Promise<ConnectionParametersResponse>;
  /** List volume groups by storage pool */
  listByStoragePool: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: VolumeGroupsListByStoragePoolOptionalParams,
  ) => PagedAsyncIterableIterator<VolumeGroup>;
  /** Delete a volume group */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    options?: VolumeGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a volume group */
  update: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    properties: VolumeGroupUpdate,
    options?: VolumeGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
  /** Create a volume group */
  create: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    resource: VolumeGroup,
    options?: VolumeGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
  /** Get a volume group */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    volumeGroupName: string,
    options?: VolumeGroupsGetOptionalParams,
  ) => Promise<VolumeGroup>;
}

function _getVolumeGroups(context: BlockContext) {
  return {
    getStatus: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      options?: VolumeGroupsGetStatusOptionalParams,
    ) => getStatus(context, resourceGroupName, storagePoolName, volumeGroupName, options),
    listConnectionParameters: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      options?: VolumeGroupsListConnectionParametersOptionalParams,
    ) =>
      listConnectionParameters(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        options,
      ),
    listByStoragePool: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: VolumeGroupsListByStoragePoolOptionalParams,
    ) => listByStoragePool(context, resourceGroupName, storagePoolName, options),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      options?: VolumeGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storagePoolName, volumeGroupName, options),
    update: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      properties: VolumeGroupUpdate,
      options?: VolumeGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, storagePoolName, volumeGroupName, properties, options),
    create: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      resource: VolumeGroup,
      options?: VolumeGroupsCreateOptionalParams,
    ) => create(context, resourceGroupName, storagePoolName, volumeGroupName, resource, options),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      volumeGroupName: string,
      options?: VolumeGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, volumeGroupName, options),
  };
}

export function _getVolumeGroupsOperations(context: BlockContext): VolumeGroupsOperations {
  return {
    ..._getVolumeGroups(context),
  };
}
