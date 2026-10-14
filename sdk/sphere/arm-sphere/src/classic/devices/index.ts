// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext } from "../../api/azureSphereContext.js";
import {
  generateCapabilityImage,
  listByDeviceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/devices/operations.js";
import type {
  DevicesGenerateCapabilityImageOptionalParams,
  DevicesListByDeviceGroupOptionalParams,
  DevicesDeleteOptionalParams,
  DevicesUpdateOptionalParams,
  DevicesCreateOrUpdateOptionalParams,
  DevicesGetOptionalParams,
} from "../../api/devices/options.js";
import type {
  Device,
  DeviceUpdate,
  GenerateCapabilityImageRequest,
  SignedCapabilityImageResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Devices operations. */
export interface DevicesOperations {
  /** Generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product. */
  generateCapabilityImage: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
    options?: DevicesGenerateCapabilityImageOptionalParams,
  ) => PollerLike<OperationState<SignedCapabilityImageResponse>, SignedCapabilityImageResponse>;
  /** List Device resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
  listByDeviceGroup: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    options?: DevicesListByDeviceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Device>;
  /** Delete a Device */
  delete: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    options?: DevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level. */
  update: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    properties: DeviceUpdate,
    options?: DevicesUpdateOptionalParams,
  ) => PollerLike<OperationState<Device>, Device>;
  /** Create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only. */
  createOrUpdate: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    resource: Device,
    options?: DevicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Device>, Device>;
  /** Get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product. */
  get: (
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    deviceGroupName: string,
    deviceName: string,
    options?: DevicesGetOptionalParams,
  ) => Promise<Device>;
}

function _getDevices(context: AzureSphereContext) {
  return {
    generateCapabilityImage: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
      options?: DevicesGenerateCapabilityImageOptionalParams,
    ) =>
      generateCapabilityImage(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        generateDeviceCapabilityRequest,
        options,
      ),
    listByDeviceGroup: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      options?: DevicesListByDeviceGroupOptionalParams,
    ) =>
      listByDeviceGroup(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      options?: DevicesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        options,
      ),
    update: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      properties: DeviceUpdate,
      options?: DevicesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      resource: Device,
      options?: DevicesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      catalogName: string,
      productName: string,
      deviceGroupName: string,
      deviceName: string,
      options?: DevicesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        options,
      ),
  };
}

export function _getDevicesOperations(context: AzureSphereContext): DevicesOperations {
  return {
    ..._getDevices(context),
  };
}
