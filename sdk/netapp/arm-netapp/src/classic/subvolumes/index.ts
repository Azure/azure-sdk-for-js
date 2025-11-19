// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  getMetadata,
  listByVolume,
  $delete,
  update,
  create,
  get,
} from "../../api/subvolumes/operations.js";
import {
  SubvolumesGetMetadataOptionalParams,
  SubvolumesListByVolumeOptionalParams,
  SubvolumesDeleteOptionalParams,
  SubvolumesUpdateOptionalParams,
  SubvolumesCreateOptionalParams,
  SubvolumesGetOptionalParams,
} from "../../api/subvolumes/options.js";
import {
  SubvolumeInfo,
  SubvolumePatchRequest,
  SubvolumeModel,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Subvolumes operations. */
export interface SubvolumesOperations {
  /** Get details of the specified subvolume */
  getMetadata: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    subvolumeName: string,
    options?: SubvolumesGetMetadataOptionalParams,
  ) => PollerLike<OperationState<SubvolumeModel>, SubvolumeModel>;
  /** Returns a list of the subvolumes in the volume */
  listByVolume: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: SubvolumesListByVolumeOptionalParams,
  ) => PagedAsyncIterableIterator<SubvolumeInfo>;
  /** Delete subvolume */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    subvolumeName: string,
    options?: SubvolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch a subvolume */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    subvolumeName: string,
    body: SubvolumePatchRequest,
    options?: SubvolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<SubvolumeInfo>, SubvolumeInfo>;
  /** Creates a subvolume in the path or clones the subvolume mentioned in the parentPath */
  create: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    subvolumeName: string,
    body: SubvolumeInfo,
    options?: SubvolumesCreateOptionalParams,
  ) => PollerLike<OperationState<SubvolumeInfo>, SubvolumeInfo>;
  /** Returns the path associated with the subvolumeName provided */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    subvolumeName: string,
    options?: SubvolumesGetOptionalParams,
  ) => Promise<SubvolumeInfo>;
}

function _getSubvolumes(context: NetAppManagementContext) {
  return {
    getMetadata: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      subvolumeName: string,
      options?: SubvolumesGetMetadataOptionalParams,
    ) =>
      getMetadata(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        subvolumeName,
        options,
      ),
    listByVolume: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: SubvolumesListByVolumeOptionalParams,
    ) =>
      listByVolume(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      subvolumeName: string,
      options?: SubvolumesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        subvolumeName,
        options,
      ),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      subvolumeName: string,
      body: SubvolumePatchRequest,
      options?: SubvolumesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        subvolumeName,
        body,
        options,
      ),
    create: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      subvolumeName: string,
      body: SubvolumeInfo,
      options?: SubvolumesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        subvolumeName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      subvolumeName: string,
      options?: SubvolumesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        subvolumeName,
        options,
      ),
  };
}

export function _getSubvolumesOperations(
  context: NetAppManagementContext,
): SubvolumesOperations {
  return {
    ..._getSubvolumes(context),
  };
}
