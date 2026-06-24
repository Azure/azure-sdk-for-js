// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  refresh,
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/shares/operations.js";
import {
  SharesRefreshOptionalParams,
  SharesListByDataBoxEdgeDeviceOptionalParams,
  SharesDeleteOptionalParams,
  SharesCreateOrUpdateOptionalParams,
  SharesGetOptionalParams,
} from "../../api/shares/options.js";
import { Share } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Shares operations. */
export interface SharesOperations {
  /** Refreshes the share metadata with the data from the cloud. */
  refresh: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: SharesRefreshOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refresh instead */
  beginRefresh: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: SharesRefreshOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refresh instead */
  beginRefreshAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: SharesRefreshOptionalParams,
  ) => Promise<void>;
  /** Lists all the shares in a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: SharesListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<Share>;
  /** Deletes the share on the Data Box Edge/Data Box Gateway device. */
  delete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: SharesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: SharesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: SharesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new share or updates an existing share on the device. */
  createOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    share: Share,
    options?: SharesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Share>, Share>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    share: Share,
    options?: SharesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Share>, Share>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    share: Share,
    options?: SharesCreateOrUpdateOptionalParams,
  ) => Promise<Share>;
  /** Gets a share by name. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: SharesGetOptionalParams,
  ) => Promise<Share>;
}

function _getShares(context: DataBoxEdgeManagementContext) {
  return {
    refresh: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: SharesRefreshOptionalParams,
    ) => refresh(context, deviceName, name, resourceGroupName, options),
    beginRefresh: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: SharesRefreshOptionalParams,
    ) => {
      const poller = refresh(context, deviceName, name, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: SharesRefreshOptionalParams,
    ) => {
      return await refresh(context, deviceName, name, resourceGroupName, options);
    },
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: SharesListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: SharesDeleteOptionalParams,
    ) => $delete(context, deviceName, name, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: SharesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, name, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: SharesDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, name, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      share: Share,
      options?: SharesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deviceName, name, resourceGroupName, share, options),
    beginCreateOrUpdate: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      share: Share,
      options?: SharesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, deviceName, name, resourceGroupName, share, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      share: Share,
      options?: SharesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, deviceName, name, resourceGroupName, share, options);
    },
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: SharesGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getSharesOperations(context: DataBoxEdgeManagementContext): SharesOperations {
  return {
    ..._getShares(context),
  };
}
