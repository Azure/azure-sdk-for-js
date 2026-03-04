// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanManagementContext } from "../../api/elasticSanManagementContext.js";
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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use preRestore instead */
  beginPreRestore: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: DiskSnapshotList,
    options?: VolumesPreRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PreValidationResponse>, PreValidationResponse>>;
  /** @deprecated use preRestore instead */
  beginPreRestoreAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: DiskSnapshotList,
    options?: VolumesPreRestoreOptionalParams,
  ) => Promise<PreValidationResponse>;
  /** Validate whether a disk snapshot backup can be taken for list of volumes. */
  preBackup: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeNameList,
    options?: VolumesPreBackupOptionalParams,
  ) => PollerLike<OperationState<PreValidationResponse>, PreValidationResponse>;
  /** @deprecated use preBackup instead */
  beginPreBackup: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeNameList,
    options?: VolumesPreBackupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PreValidationResponse>, PreValidationResponse>>;
  /** @deprecated use preBackup instead */
  beginPreBackupAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeNameList,
    options?: VolumesPreBackupOptionalParams,
  ) => Promise<PreValidationResponse>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    options?: VolumesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    options?: VolumesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an Volume. */
  update: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: VolumeUpdate,
    options?: VolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: VolumeUpdate,
    options?: VolumesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Volume>, Volume>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: VolumeUpdate,
    options?: VolumesUpdateOptionalParams,
  ) => Promise<Volume>;
  /** Create a Volume. */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: Volume,
    options?: VolumesCreateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: Volume,
    options?: VolumesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Volume>, Volume>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    parameters: Volume,
    options?: VolumesCreateOptionalParams,
  ) => Promise<Volume>;
  /** Get an Volume. */
  get: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    volumeName: string,
    options?: VolumesGetOptionalParams,
  ) => Promise<Volume>;
}

function _getVolumes(context: ElasticSanManagementContext) {
  return {
    preRestore: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: DiskSnapshotList,
      options?: VolumesPreRestoreOptionalParams,
    ) =>
      preRestore(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    beginPreRestore: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: DiskSnapshotList,
      options?: VolumesPreRestoreOptionalParams,
    ) => {
      const poller = preRestore(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPreRestoreAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: DiskSnapshotList,
      options?: VolumesPreRestoreOptionalParams,
    ) => {
      return await preRestore(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
    },
    preBackup: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeNameList,
      options?: VolumesPreBackupOptionalParams,
    ) =>
      preBackup(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    beginPreBackup: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeNameList,
      options?: VolumesPreBackupOptionalParams,
    ) => {
      const poller = preBackup(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPreBackupAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeNameList,
      options?: VolumesPreBackupOptionalParams,
    ) => {
      return await preBackup(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      options?: VolumesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      options?: VolumesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      parameters: VolumeUpdate,
      options?: VolumesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      parameters: VolumeUpdate,
      options?: VolumesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      );
    },
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
    beginCreate: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      parameters: Volume,
      options?: VolumesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      parameters: Volume,
      options?: VolumesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      volumeName: string,
      options?: VolumesGetOptionalParams,
    ) => get(context, resourceGroupName, elasticSanName, volumeGroupName, volumeName, options),
  };
}

export function _getVolumesOperations(context: ElasticSanManagementContext): VolumesOperations {
  return {
    ..._getVolumes(context),
  };
}
