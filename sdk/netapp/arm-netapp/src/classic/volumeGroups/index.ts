// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByNetAppAccount,
  $delete,
  create,
  get,
} from "../../api/volumeGroups/operations.js";
import {
  VolumeGroupsListByNetAppAccountOptionalParams,
  VolumeGroupsDeleteOptionalParams,
  VolumeGroupsCreateOptionalParams,
  VolumeGroupsGetOptionalParams,
} from "../../api/volumeGroups/options.js";
import { VolumeGroupDetails, VolumeGroup } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VolumeGroups operations. */
export interface VolumeGroupsOperations {
  /** List all volume groups for given account */
  listByNetAppAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: VolumeGroupsListByNetAppAccountOptionalParams,
  ) => PagedAsyncIterableIterator<VolumeGroup>;
  /** Delete the specified volume group only if there are no volumes under volume group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    volumeGroupName: string,
    options?: VolumeGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a volume group along with specified volumes */
  create: (
    resourceGroupName: string,
    accountName: string,
    volumeGroupName: string,
    body: VolumeGroupDetails,
    options?: VolumeGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroupDetails>, VolumeGroupDetails>;
  /** Get details of the specified volume group */
  get: (
    resourceGroupName: string,
    accountName: string,
    volumeGroupName: string,
    options?: VolumeGroupsGetOptionalParams,
  ) => Promise<VolumeGroupDetails>;
}

function _getVolumeGroups(context: NetAppManagementContext) {
  return {
    listByNetAppAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: VolumeGroupsListByNetAppAccountOptionalParams,
    ) => listByNetAppAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      volumeGroupName: string,
      options?: VolumeGroupsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        volumeGroupName,
        options,
      ),
    create: (
      resourceGroupName: string,
      accountName: string,
      volumeGroupName: string,
      body: VolumeGroupDetails,
      options?: VolumeGroupsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        accountName,
        volumeGroupName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      volumeGroupName: string,
      options?: VolumeGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, volumeGroupName, options),
  };
}

export function _getVolumeGroupsOperations(
  context: NetAppManagementContext,
): VolumeGroupsOperations {
  return {
    ..._getVolumeGroups(context),
  };
}
