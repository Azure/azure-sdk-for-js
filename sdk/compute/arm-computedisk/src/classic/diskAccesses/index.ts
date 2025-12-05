// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeDiskContext } from "../../api/computeDiskContext.js";
import {
  getPrivateLinkResources,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/diskAccesses/operations.js";
import type {
  DiskAccessesGetPrivateLinkResourcesOptionalParams,
  DiskAccessesListOptionalParams,
  DiskAccessesListByResourceGroupOptionalParams,
  DiskAccessesDeleteOptionalParams,
  DiskAccessesUpdateOptionalParams,
  DiskAccessesCreateOrUpdateOptionalParams,
  DiskAccessesGetOptionalParams,
} from "../../api/diskAccesses/options.js";
import type {
  DiskAccess,
  DiskAccessUpdate,
  PrivateLinkResourceListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiskAccesses operations. */
export interface DiskAccessesOperations {
  /** Gets the private link resources possible under disk access resource */
  getPrivateLinkResources: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesGetPrivateLinkResourcesOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
  /** Lists all the disk access resources under a subscription. */
  list: (options?: DiskAccessesListOptionalParams) => PagedAsyncIterableIterator<DiskAccess>;
  /** Lists all the disk access resources under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DiskAccessesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DiskAccess>;
  /** Deletes a disk access resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates (patches) a disk access resource. */
  update: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccessUpdate,
    options?: DiskAccessesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccessUpdate,
    options?: DiskAccessesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccessUpdate,
    options?: DiskAccessesUpdateOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a disk access resource */
  createOrUpdate: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccess,
    options?: DiskAccessesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccess,
    options?: DiskAccessesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccess,
    options?: DiskAccessesCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** Gets information about a disk access resource. */
  get: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesGetOptionalParams,
  ) => Promise<DiskAccess>;
}

function _getDiskAccesses(context: ComputeDiskContext) {
  return {
    getPrivateLinkResources: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesGetPrivateLinkResourcesOptionalParams,
    ) => getPrivateLinkResources(context, resourceGroupName, diskAccessName, options),
    list: (options?: DiskAccessesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DiskAccessesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, diskAccessName, options),
    beginDelete: async (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, diskAccessName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, diskAccessName, options);
    },
    update: (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccessUpdate,
      options?: DiskAccessesUpdateOptionalParams,
    ) => update(context, resourceGroupName, diskAccessName, diskAccess, options),
    beginUpdate: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccessUpdate,
      options?: DiskAccessesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, diskAccessName, diskAccess, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccessUpdate,
      options?: DiskAccessesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, diskAccessName, diskAccess, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccess,
      options?: DiskAccessesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, diskAccessName, diskAccess, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccess,
      options?: DiskAccessesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        diskAccessName,
        diskAccess,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccess,
      options?: DiskAccessesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, diskAccessName, diskAccess, options);
    },
    get: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesGetOptionalParams,
    ) => get(context, resourceGroupName, diskAccessName, options),
  };
}

export function _getDiskAccessesOperations(context: ComputeDiskContext): DiskAccessesOperations {
  return {
    ..._getDiskAccesses(context),
  };
}
