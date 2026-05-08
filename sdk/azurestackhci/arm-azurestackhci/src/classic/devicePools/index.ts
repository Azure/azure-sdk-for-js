// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  releaseDevices,
  claimDevices,
  listBySubscription,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/devicePools/operations.js";
import type {
  DevicePoolsReleaseDevicesOptionalParams,
  DevicePoolsClaimDevicesOptionalParams,
  DevicePoolsListBySubscriptionOptionalParams,
  DevicePoolsListByResourceGroupOptionalParams,
  DevicePoolsUpdateOptionalParams,
  DevicePoolsDeleteOptionalParams,
  DevicePoolsCreateOrUpdateOptionalParams,
  DevicePoolsGetOptionalParams,
} from "../../api/devicePools/options.js";
import type {
  DevicePool,
  DevicePoolPatch,
  ClaimDeviceRequest,
  ReleaseDeviceRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DevicePools operations. */
export interface DevicePoolsOperations {
  /** Releasing devices of the pool. */
  releaseDevices: (
    resourceGroupName: string,
    devicePoolName: string,
    body: ReleaseDeviceRequest,
    options?: DevicePoolsReleaseDevicesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use releaseDevices instead */
  beginReleaseDevices: (
    resourceGroupName: string,
    devicePoolName: string,
    body: ReleaseDeviceRequest,
    options?: DevicePoolsReleaseDevicesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use releaseDevices instead */
  beginReleaseDevicesAndWait: (
    resourceGroupName: string,
    devicePoolName: string,
    body: ReleaseDeviceRequest,
    options?: DevicePoolsReleaseDevicesOptionalParams,
  ) => Promise<void>;
  /** Claiming devices of the pool. */
  claimDevices: (
    resourceGroupName: string,
    devicePoolName: string,
    body: ClaimDeviceRequest,
    options?: DevicePoolsClaimDevicesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use claimDevices instead */
  beginClaimDevices: (
    resourceGroupName: string,
    devicePoolName: string,
    body: ClaimDeviceRequest,
    options?: DevicePoolsClaimDevicesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use claimDevices instead */
  beginClaimDevicesAndWait: (
    resourceGroupName: string,
    devicePoolName: string,
    body: ClaimDeviceRequest,
    options?: DevicePoolsClaimDevicesOptionalParams,
  ) => Promise<void>;
  /** List all device pools in a subscription. */
  listBySubscription: (
    options?: DevicePoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DevicePool>;
  /** List all device pools in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DevicePoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DevicePool>;
  /** Update a devicePool */
  update: (
    resourceGroupName: string,
    devicePoolName: string,
    properties: DevicePoolPatch,
    options?: DevicePoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<DevicePool>, DevicePool>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    devicePoolName: string,
    properties: DevicePoolPatch,
    options?: DevicePoolsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DevicePool>, DevicePool>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    devicePoolName: string,
    properties: DevicePoolPatch,
    options?: DevicePoolsUpdateOptionalParams,
  ) => Promise<DevicePool>;
  /** Delete a DevicePool */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    devicePoolName: string,
    options?: DevicePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    devicePoolName: string,
    options?: DevicePoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    devicePoolName: string,
    options?: DevicePoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a DevicePool */
  createOrUpdate: (
    resourceGroupName: string,
    devicePoolName: string,
    resource: DevicePool,
    options?: DevicePoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DevicePool>, DevicePool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    devicePoolName: string,
    resource: DevicePool,
    options?: DevicePoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DevicePool>, DevicePool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    devicePoolName: string,
    resource: DevicePool,
    options?: DevicePoolsCreateOrUpdateOptionalParams,
  ) => Promise<DevicePool>;
  /** Get a DevicePool */
  get: (
    resourceGroupName: string,
    devicePoolName: string,
    options?: DevicePoolsGetOptionalParams,
  ) => Promise<DevicePool>;
}

function _getDevicePools(context: AzureStackHCIContext) {
  return {
    releaseDevices: (
      resourceGroupName: string,
      devicePoolName: string,
      body: ReleaseDeviceRequest,
      options?: DevicePoolsReleaseDevicesOptionalParams,
    ) => releaseDevices(context, resourceGroupName, devicePoolName, body, options),
    beginReleaseDevices: async (
      resourceGroupName: string,
      devicePoolName: string,
      body: ReleaseDeviceRequest,
      options?: DevicePoolsReleaseDevicesOptionalParams,
    ) => {
      const poller = releaseDevices(context, resourceGroupName, devicePoolName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReleaseDevicesAndWait: async (
      resourceGroupName: string,
      devicePoolName: string,
      body: ReleaseDeviceRequest,
      options?: DevicePoolsReleaseDevicesOptionalParams,
    ) => {
      return await releaseDevices(context, resourceGroupName, devicePoolName, body, options);
    },
    claimDevices: (
      resourceGroupName: string,
      devicePoolName: string,
      body: ClaimDeviceRequest,
      options?: DevicePoolsClaimDevicesOptionalParams,
    ) => claimDevices(context, resourceGroupName, devicePoolName, body, options),
    beginClaimDevices: async (
      resourceGroupName: string,
      devicePoolName: string,
      body: ClaimDeviceRequest,
      options?: DevicePoolsClaimDevicesOptionalParams,
    ) => {
      const poller = claimDevices(context, resourceGroupName, devicePoolName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginClaimDevicesAndWait: async (
      resourceGroupName: string,
      devicePoolName: string,
      body: ClaimDeviceRequest,
      options?: DevicePoolsClaimDevicesOptionalParams,
    ) => {
      return await claimDevices(context, resourceGroupName, devicePoolName, body, options);
    },
    listBySubscription: (options?: DevicePoolsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DevicePoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      devicePoolName: string,
      properties: DevicePoolPatch,
      options?: DevicePoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, devicePoolName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      devicePoolName: string,
      properties: DevicePoolPatch,
      options?: DevicePoolsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, devicePoolName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      devicePoolName: string,
      properties: DevicePoolPatch,
      options?: DevicePoolsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, devicePoolName, properties, options);
    },
    delete: (
      resourceGroupName: string,
      devicePoolName: string,
      options?: DevicePoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devicePoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      devicePoolName: string,
      options?: DevicePoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, devicePoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      devicePoolName: string,
      options?: DevicePoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, devicePoolName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      devicePoolName: string,
      resource: DevicePool,
      options?: DevicePoolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, devicePoolName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      devicePoolName: string,
      resource: DevicePool,
      options?: DevicePoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, devicePoolName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      devicePoolName: string,
      resource: DevicePool,
      options?: DevicePoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, devicePoolName, resource, options);
    },
    get: (
      resourceGroupName: string,
      devicePoolName: string,
      options?: DevicePoolsGetOptionalParams,
    ) => get(context, resourceGroupName, devicePoolName, options),
  };
}

export function _getDevicePoolsOperations(context: AzureStackHCIContext): DevicePoolsOperations {
  return {
    ..._getDevicePools(context),
  };
}
