// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext } from "../../api/blockContext.js";
import { AvsVmVolumeUpdate, AvsVmVolume } from "../../models/models.js";
import {
  AvsVmVolumesListByAvsVmOptionalParams,
  AvsVmVolumesDeleteOptionalParams,
  AvsVmVolumesGetOptionalParams,
  AvsVmVolumesUpdateOptionalParams,
} from "../../api/avsVmVolumes/options.js";
import { listByAvsVm, $delete, get, update } from "../../api/avsVmVolumes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AvsVmVolumes operations. */
export interface AvsVmVolumesOperations {
  /** List volumes in an AVS VM */
  listByAvsVm: (
    resourceGroupName: string,
    storagePoolName: string,
    avsVmId: string,
    options?: AvsVmVolumesListByAvsVmOptionalParams,
  ) => PagedAsyncIterableIterator<AvsVmVolume>;
  /** Delete a volume in an AVS VM */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    avsVmId: string,
    volumeId: string,
    options?: AvsVmVolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a volume in an AVS VM */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    avsVmId: string,
    volumeId: string,
    options?: AvsVmVolumesGetOptionalParams,
  ) => Promise<AvsVmVolume>;
  /** Update a volume in an AVS VM */
  update: (
    resourceGroupName: string,
    storagePoolName: string,
    avsVmId: string,
    volumeId: string,
    properties: AvsVmVolumeUpdate,
    options?: AvsVmVolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<AvsVmVolume>, AvsVmVolume>;
}

function _getAvsVmVolumes(context: BlockContext) {
  return {
    listByAvsVm: (
      resourceGroupName: string,
      storagePoolName: string,
      avsVmId: string,
      options?: AvsVmVolumesListByAvsVmOptionalParams,
    ) => listByAvsVm(context, resourceGroupName, storagePoolName, avsVmId, options),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      avsVmId: string,
      volumeId: string,
      options?: AvsVmVolumesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storagePoolName, avsVmId, volumeId, options),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      avsVmId: string,
      volumeId: string,
      options?: AvsVmVolumesGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, avsVmId, volumeId, options),
    update: (
      resourceGroupName: string,
      storagePoolName: string,
      avsVmId: string,
      volumeId: string,
      properties: AvsVmVolumeUpdate,
      options?: AvsVmVolumesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, storagePoolName, avsVmId, volumeId, properties, options),
  };
}

export function _getAvsVmVolumesOperations(context: BlockContext): AvsVmVolumesOperations {
  return {
    ..._getAvsVmVolumes(context),
  };
}
