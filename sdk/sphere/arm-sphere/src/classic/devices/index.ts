// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import {
  Device,
  DeviceUpdate,
  GenerateCapabilityImageRequest,
  SignedCapabilityImageResponse,
} from "../../models/models.js";
import {
  devicesGet,
  devicesCreateOrUpdate,
  devicesListByDeviceGroup,
  devicesDeleteOperation,
  devicesUpdate,
  devicesDeprecatedGenerateCapabilityImage,
  devicesGenerateCapabilityImage,
} from "../../api/devices/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DevicesGetOptions,
  DevicesCreateOrUpdateOptions,
  DevicesListByDeviceGroupOptions,
  DevicesDeleteOperationOptions,
  DevicesUpdateOptions,
  DevicesDeprecatedGenerateCapabilityImageOptions,
  DevicesGenerateCapabilityImageOptions,
} from "../../models/options.js";

export interface DevicesOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    options?: DevicesGetOptions,
  ) => Promise<Device>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    resource: Device,
    options?: DevicesCreateOrUpdateOptions,
  ) => PollerLike<OperationState<Device>, Device>;
  listByDeviceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DevicesListByDeviceGroupOptions,
  ) => PagedAsyncIterableIterator<Device>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    options?: DevicesDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    properties: DeviceUpdate,
    options?: DevicesUpdateOptions,
  ) => Promise<Device>;
  deprecatedGenerateCapabilityImage: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
    options?: DevicesDeprecatedGenerateCapabilityImageOptions,
  ) => Promise<SignedCapabilityImageResponse>;
  generateCapabilityImage: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
    options?: DevicesGenerateCapabilityImageOptions,
  ) => PollerLike<OperationState<void>, void>;
}

export function getDevices(context: AzureSphereContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      options?: DevicesGetOptions,
    ) =>
      devicesGet(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      resource: Device,
      options?: DevicesCreateOrUpdateOptions,
    ) =>
      devicesCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        resource,
        options,
      ),
    listByDeviceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DevicesListByDeviceGroupOptions,
    ) =>
      devicesListByDeviceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      options?: DevicesDeleteOperationOptions,
    ) =>
      devicesDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      properties: DeviceUpdate,
      options?: DevicesUpdateOptions,
    ) =>
      devicesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        properties,
        options,
      ),
    deprecatedGenerateCapabilityImage: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
      options?: DevicesDeprecatedGenerateCapabilityImageOptions,
    ) =>
      devicesDeprecatedGenerateCapabilityImage(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        generateDeviceCapabilityRequest,
        options,
      ),
    generateCapabilityImage: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
      options?: DevicesGenerateCapabilityImageOptions,
    ) =>
      devicesGenerateCapabilityImage(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        generateDeviceCapabilityRequest,
        options,
      ),
  };
}

export function getDevicesOperations(
  context: AzureSphereContext,
): DevicesOperations {
  return {
    ...getDevices(context),
  };
}
