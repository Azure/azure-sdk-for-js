// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanContext } from "../../api/elasticSanContext.js";
import {
  preRestore,
  preBackup,
  listByVolumeGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/volumes/operations.js";
import type {
  VolumesPreRestoreOptionalParams,
  VolumesPreBackupOptionalParams,
  VolumesListByVolumeGroupOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOptionalParams,
  VolumesGetOptionalParams,
} from "../../api/volumes/options.js";
import type {
  Volume,
  VolumeUpdate,
  VolumeNameList,
  PreValidationResponse,
  DiskSnapshotList,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Volumes operations. */
export interface VolumesOperations {
  /** Validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes. */
  preRestore: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: DiskSnapshotList,
    options?: VolumesPreRestoreOptionalParams,
  ) => PollerLike<OperationState<PreValidationResponse>, PreValidationResponse>;
  /** Validate whether a disk snapshot backup can be taken for list of volumes. */
  preBackup: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeNameList,
    options?: VolumesPreBackupOptionalParams,
  ) => PollerLike<OperationState<PreValidationResponse>, PreValidationResponse>;
  /** List Volumes in a VolumeGroup. */
  listByVolumeGroup: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumesListByVolumeGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Volume>;
  /** Delete an Volume. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    options?: VolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an Volume. */
  update: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: VolumeUpdate,
    options?: VolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Create a Volume. */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: Volume,
    options?: VolumesCreateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Get an Volume. */
  get: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    options?: VolumesGetOptionalParams,
  ) => Promise<Volume>;
}

function _getVolumes(context: ElasticSanContext) {
  return {
    preRestore: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: DiskSnapshotList,
      options?: VolumesPreRestoreOptionalParams,
    ) =>
      preRestore(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    preBackup: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeNameList,
      options?: VolumesPreBackupOptionalParams,
    ) =>
      preBackup(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    listByVolumeGroup: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      options?: VolumesListByVolumeGroupOptionalParams,
    ) => listByVolumeGroup(context, resourceGroupName, elasticSanName, volumeGroupName, options),
    delete: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      options?: VolumesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, elasticSanName, volumeGroupName, volumeName, options),
    update: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      parameters: VolumeUpdate,
      options?: VolumesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      parameters: Volume,
      options?: VolumesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      options?: VolumesGetOptionalParams,
    ) => get(context, resourceGroupName, elasticSanName, volumeGroupName, volumeName, options),
  };
}

export function _getVolumesOperations(context: ElasticSanContext): VolumesOperations {
  return {
    ..._getVolumes(context),
  };
}
