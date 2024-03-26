// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import {
  DeviceGroup,
  CountDeviceResponse,
  CountDevicesResponse,
  DeviceGroupUpdate,
  ClaimDevicesRequest,
} from "../../models/models.js";
import {
  deviceGroupsListByProduct,
  deviceGroupsGet,
  deviceGroupsCreateOrUpdate,
  deviceGroupsDeleteOperation,
  deviceGroupsUpdate,
  deviceGroupsDeprecatedCountDevices,
  deviceGroupsCountDevices,
  deviceGroupsDeprecatedClaimDevices,
  deviceGroupsClaimDevices,
} from "../../api/deviceGroups/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DeviceGroupsListByProductOptions,
  DeviceGroupsGetOptions,
  DeviceGroupsCreateOrUpdateOptions,
  DeviceGroupsDeleteOperationOptions,
  DeviceGroupsUpdateOptions,
  DeviceGroupsDeprecatedCountDevicesOptions,
  DeviceGroupsCountDevicesOptions,
  DeviceGroupsDeprecatedClaimDevicesOptions,
  DeviceGroupsClaimDevicesOptions,
} from "../../models/options.js";

export interface DeviceGroupsOperations {
  listByProduct: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: DeviceGroupsListByProductOptions,
  ) => PagedAsyncIterableIterator<DeviceGroup>;
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DeviceGroupsGetOptions,
  ) => Promise<DeviceGroup>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    resource: DeviceGroup,
    options?: DeviceGroupsCreateOrUpdateOptions,
  ) => PollerLike<OperationState<DeviceGroup>, DeviceGroup>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DeviceGroupsDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    properties: DeviceGroupUpdate,
    options?: DeviceGroupsUpdateOptions,
  ) => PollerLike<OperationState<DeviceGroup>, DeviceGroup>;
  deprecatedCountDevices: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DeviceGroupsDeprecatedCountDevicesOptions,
  ) => Promise<CountDeviceResponse>;
  countDevices: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DeviceGroupsCountDevicesOptions,
  ) => Promise<CountDevicesResponse>;
  deprecatedClaimDevices: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    claimDevicesRequest: ClaimDevicesRequest,
    options?: DeviceGroupsDeprecatedClaimDevicesOptions,
  ) => Promise<void>;
  claimDevices: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    claimDevicesRequest: ClaimDevicesRequest,
    options?: DeviceGroupsClaimDevicesOptions,
  ) => PollerLike<OperationState<void>, void>;
}

export function getDeviceGroups(context: AzureSphereContext) {
  return {
    listByProduct: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      options?: DeviceGroupsListByProductOptions,
    ) =>
      deviceGroupsListByProduct(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DeviceGroupsGetOptions,
    ) =>
      deviceGroupsGet(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      resource: DeviceGroup,
      options?: DeviceGroupsCreateOrUpdateOptions,
    ) =>
      deviceGroupsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        resource,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DeviceGroupsDeleteOperationOptions,
    ) =>
      deviceGroupsDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      properties: DeviceGroupUpdate,
      options?: DeviceGroupsUpdateOptions,
    ) =>
      deviceGroupsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        properties,
        options,
      ),
    deprecatedCountDevices: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DeviceGroupsDeprecatedCountDevicesOptions,
    ) =>
      deviceGroupsDeprecatedCountDevices(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    countDevices: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DeviceGroupsCountDevicesOptions,
    ) =>
      deviceGroupsCountDevices(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    deprecatedClaimDevices: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      claimDevicesRequest: ClaimDevicesRequest,
      options?: DeviceGroupsDeprecatedClaimDevicesOptions,
    ) =>
      deviceGroupsDeprecatedClaimDevices(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        claimDevicesRequest,
        options,
      ),
    claimDevices: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      claimDevicesRequest: ClaimDevicesRequest,
      options?: DeviceGroupsClaimDevicesOptions,
    ) =>
      deviceGroupsClaimDevices(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        claimDevicesRequest,
        options,
      ),
  };
}

export function getDeviceGroupsOperations(
  context: AzureSphereContext,
): DeviceGroupsOperations {
  return {
    ...getDeviceGroups(context),
  };
}
