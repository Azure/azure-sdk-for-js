// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  revokeAccess,
  grantAccess,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/disks/operations.js";
import {
  DisksRevokeAccessOptionalParams,
  DisksGrantAccessOptionalParams,
  DisksListOptionalParams,
  DisksListByResourceGroupOptionalParams,
  DisksDeleteOptionalParams,
  DisksUpdateOptionalParams,
  DisksCreateOrUpdateOptionalParams,
  DisksGetOptionalParams,
} from "../../api/disks/options.js";
import {
  Disk,
  DiskUpdate,
  GrantAccessData,
  AccessUri,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Disks operations. */
export interface DisksOperations {
  /** Revokes access to a disk. */
  revokeAccess: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksRevokeAccessOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Grants access to a disk. */
  grantAccess: (
    resourceGroupName: string,
    diskName: string,
    grantAccessData: GrantAccessData,
    options?: DisksGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
  /** Lists all the disks under a subscription. */
  list: (options?: DisksListOptionalParams) => PagedAsyncIterableIterator<Disk>;
  /** Lists all the disks under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DisksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Disk>;
  /** Deletes a disk. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates (patches) a disk. */
  update: (
    resourceGroupName: string,
    diskName: string,
    disk: DiskUpdate,
    options?: DisksUpdateOptionalParams,
  ) => PollerLike<OperationState<Disk>, Disk>;
  /** Creates or updates a disk. */
  createOrUpdate: (
    resourceGroupName: string,
    diskName: string,
    disk: Disk,
    options?: DisksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Disk>, Disk>;
  /** Gets information about a disk. */
  get: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksGetOptionalParams,
  ) => Promise<Disk>;
}

function _getDisks(context: ComputeManagementContext) {
  return {
    revokeAccess: (
      resourceGroupName: string,
      diskName: string,
      options?: DisksRevokeAccessOptionalParams,
    ) => revokeAccess(context, resourceGroupName, diskName, options),
    grantAccess: (
      resourceGroupName: string,
      diskName: string,
      grantAccessData: GrantAccessData,
      options?: DisksGrantAccessOptionalParams,
    ) =>
      grantAccess(
        context,
        resourceGroupName,
        diskName,
        grantAccessData,
        options,
      ),
    list: (options?: DisksListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DisksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      diskName: string,
      options?: DisksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, diskName, options),
    update: (
      resourceGroupName: string,
      diskName: string,
      disk: DiskUpdate,
      options?: DisksUpdateOptionalParams,
    ) => update(context, resourceGroupName, diskName, disk, options),
    createOrUpdate: (
      resourceGroupName: string,
      diskName: string,
      disk: Disk,
      options?: DisksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, diskName, disk, options),
    get: (
      resourceGroupName: string,
      diskName: string,
      options?: DisksGetOptionalParams,
    ) => get(context, resourceGroupName, diskName, options),
  };
}

export function _getDisksOperations(
  context: ComputeManagementContext,
): DisksOperations {
  return {
    ..._getDisks(context),
  };
}
