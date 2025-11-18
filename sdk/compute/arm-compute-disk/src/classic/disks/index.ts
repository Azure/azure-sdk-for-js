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
import {
  SimplePollerLike,
  getSimplePoller,
} from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Disks operations. */
export interface DisksOperations {
  /** Revokes access to a disk. */
  revokeAccess: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksRevokeAccessOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccess: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksRevokeAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccessAndWait: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksRevokeAccessOptionalParams,
  ) => Promise<void>;
  /** Grants access to a disk. */
  grantAccess: (
    resourceGroupName: string,
    diskName: string,
    grantAccessData: GrantAccessData,
    options?: DisksGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
  /** @deprecated use grantAccess instead */
  beginGrantAccess: (
    resourceGroupName: string,
    diskName: string,
    grantAccessData: GrantAccessData,
    options?: DisksGrantAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessUri>, AccessUri>>;
  /** @deprecated use grantAccess instead */
  beginGrantAccessAndWait: (
    resourceGroupName: string,
    diskName: string,
    grantAccessData: GrantAccessData,
    options?: DisksGrantAccessOptionalParams,
  ) => Promise<AccessUri>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    diskName: string,
    options?: DisksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates (patches) a disk. */
  update: (
    resourceGroupName: string,
    diskName: string,
    disk: DiskUpdate,
    options?: DisksUpdateOptionalParams,
  ) => PollerLike<OperationState<Disk>, Disk>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    diskName: string,
    disk: DiskUpdate,
    options?: DisksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Disk>, Disk>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    diskName: string,
    disk: DiskUpdate,
    options?: DisksUpdateOptionalParams,
  ) => Promise<Disk>;
  /** Creates or updates a disk. */
  createOrUpdate: (
    resourceGroupName: string,
    diskName: string,
    disk: Disk,
    options?: DisksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Disk>, Disk>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    diskName: string,
    disk: Disk,
    options?: DisksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Disk>, Disk>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    diskName: string,
    disk: Disk,
    options?: DisksCreateOrUpdateOptionalParams,
  ) => Promise<Disk>;
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
    beginRevokeAccess: async (
      resourceGroupName: string,
      diskName: string,
      options?: DisksRevokeAccessOptionalParams,
    ) => {
      const poller = revokeAccess(
        context,
        resourceGroupName,
        diskName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRevokeAccessAndWait: async (
      resourceGroupName: string,
      diskName: string,
      options?: DisksRevokeAccessOptionalParams,
    ) => {
      return await revokeAccess(context, resourceGroupName, diskName, options);
    },
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
    beginGrantAccess: async (
      resourceGroupName: string,
      diskName: string,
      grantAccessData: GrantAccessData,
      options?: DisksGrantAccessOptionalParams,
    ) => {
      const poller = grantAccess(
        context,
        resourceGroupName,
        diskName,
        grantAccessData,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGrantAccessAndWait: async (
      resourceGroupName: string,
      diskName: string,
      grantAccessData: GrantAccessData,
      options?: DisksGrantAccessOptionalParams,
    ) => {
      return await grantAccess(
        context,
        resourceGroupName,
        diskName,
        grantAccessData,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      diskName: string,
      options?: DisksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, diskName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      diskName: string,
      options?: DisksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, diskName, options);
    },
    update: (
      resourceGroupName: string,
      diskName: string,
      disk: DiskUpdate,
      options?: DisksUpdateOptionalParams,
    ) => update(context, resourceGroupName, diskName, disk, options),
    beginUpdate: async (
      resourceGroupName: string,
      diskName: string,
      disk: DiskUpdate,
      options?: DisksUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        diskName,
        disk,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      diskName: string,
      disk: DiskUpdate,
      options?: DisksUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, diskName, disk, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      diskName: string,
      disk: Disk,
      options?: DisksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, diskName, disk, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      diskName: string,
      disk: Disk,
      options?: DisksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        diskName,
        disk,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      diskName: string,
      disk: Disk,
      options?: DisksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        diskName,
        disk,
        options,
      );
    },
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
