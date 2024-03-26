// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  Device,
  DeviceListResult,
  DeviceUpdate,
  GenerateCapabilityImageRequest,
  SignedCapabilityImageResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureSphereContext as Client,
  DevicesCreateOrUpdate200Response,
  DevicesCreateOrUpdate201Response,
  DevicesCreateOrUpdateDefaultResponse,
  DevicesCreateOrUpdateLogicalResponse,
  DevicesDeleteLogicalResponse,
  DevicesDeleteOperation200Response,
  DevicesDeleteOperation202Response,
  DevicesDeleteOperation204Response,
  DevicesDeleteOperationDefaultResponse,
  DevicesDeprecatedGenerateCapabilityImage200Response,
  DevicesDeprecatedGenerateCapabilityImage202Response,
  DevicesDeprecatedGenerateCapabilityImageDefaultResponse,
  DevicesGenerateCapabilityImage200Response,
  DevicesGenerateCapabilityImage202Response,
  DevicesGenerateCapabilityImageDefaultResponse,
  DevicesGenerateCapabilityImageLogicalResponse,
  DevicesGet200Response,
  DevicesGetDefaultResponse,
  DevicesListByDeviceGroup200Response,
  DevicesListByDeviceGroupDefaultResponse,
  DevicesUpdate200Response,
  DevicesUpdate202Response,
  DevicesUpdateDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  DevicesGetOptions,
  DevicesCreateOrUpdateOptions,
  DevicesListByDeviceGroupOptions,
  DevicesDeleteOperationOptions,
  DevicesUpdateOptions,
  DevicesDeprecatedGenerateCapabilityImageOptions,
  DevicesGenerateCapabilityImageOptions,
} from "../../models/options.js";

export function _devicesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  options: DevicesGetOptions = { requestOptions: {} }
): StreamableMethod<DevicesGet200Response | DevicesGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deviceName
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _devicesGetDeserialize(
  result: DevicesGet200Response | DevicesGetDefaultResponse
): Promise<Device> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          deviceId: result.body.properties?.["deviceId"],
          chipSku: result.body.properties?.["chipSku"],
          lastAvailableOsVersion:
            result.body.properties?.["lastAvailableOsVersion"],
          lastInstalledOsVersion:
            result.body.properties?.["lastInstalledOsVersion"],
          lastOsUpdateUtc:
            result.body.properties?.["lastOsUpdateUtc"] !== undefined
              ? new Date(result.body.properties?.["lastOsUpdateUtc"])
              : undefined,
          lastUpdateRequestUtc:
            result.body.properties?.["lastUpdateRequestUtc"] !== undefined
              ? new Date(result.body.properties?.["lastUpdateRequestUtc"])
              : undefined,
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product. */
export async function devicesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  options: DevicesGetOptions = { requestOptions: {} }
): Promise<Device> {
  const result = await _devicesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    deviceName,
    options
  );
  return _devicesGetDeserialize(result);
}

export function _devicesCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  resource: Device,
  options: DevicesCreateOrUpdateOptions = { requestOptions: {} }
): StreamableMethod<
  | DevicesCreateOrUpdate200Response
  | DevicesCreateOrUpdate201Response
  | DevicesCreateOrUpdateDefaultResponse
  | DevicesCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deviceName
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? undefined
          : { deviceId: resource.properties?.["deviceId"] },
      },
    });
}

export async function _devicesCreateOrUpdateDeserialize(
  result:
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdateDefaultResponse
    | DevicesCreateOrUpdateLogicalResponse
): Promise<Device> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DevicesCreateOrUpdateLogicalResponse;
  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          deviceId: result.body.properties?.["deviceId"],
          chipSku: result.body.properties?.["chipSku"],
          lastAvailableOsVersion:
            result.body.properties?.["lastAvailableOsVersion"],
          lastInstalledOsVersion:
            result.body.properties?.["lastInstalledOsVersion"],
          lastOsUpdateUtc:
            result.body.properties?.["lastOsUpdateUtc"] !== undefined
              ? new Date(result.body.properties?.["lastOsUpdateUtc"])
              : undefined,
          lastUpdateRequestUtc:
            result.body.properties?.["lastUpdateRequestUtc"] !== undefined
              ? new Date(result.body.properties?.["lastUpdateRequestUtc"])
              : undefined,
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only. */
export function devicesCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  resource: Device,
  options: DevicesCreateOrUpdateOptions = { requestOptions: {} }
): PollerLike<OperationState<Device>, Device> {
  return getLongRunningPoller(context, _devicesCreateOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _devicesCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        resource,
        options
      ),
  }) as PollerLike<OperationState<Device>, Device>;
}

export function _devicesListByDeviceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DevicesListByDeviceGroupOptions = { requestOptions: {} }
): StreamableMethod<
  DevicesListByDeviceGroup200Response | DevicesListByDeviceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _devicesListByDeviceGroupDeserialize(
  result:
    | DevicesListByDeviceGroup200Response
    | DevicesListByDeviceGroupDefaultResponse
): Promise<DeviceListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            deviceId: p.properties?.["deviceId"],
            chipSku: p.properties?.["chipSku"],
            lastAvailableOsVersion: p.properties?.["lastAvailableOsVersion"],
            lastInstalledOsVersion: p.properties?.["lastInstalledOsVersion"],
            lastOsUpdateUtc:
              p.properties?.["lastOsUpdateUtc"] !== undefined
                ? new Date(p.properties?.["lastOsUpdateUtc"])
                : undefined,
            lastUpdateRequestUtc:
              p.properties?.["lastUpdateRequestUtc"] !== undefined
                ? new Date(p.properties?.["lastUpdateRequestUtc"])
                : undefined,
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Device resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function devicesListByDeviceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DevicesListByDeviceGroupOptions = { requestOptions: {} }
): PagedAsyncIterableIterator<Device> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _devicesListByDeviceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options
      ),
    _devicesListByDeviceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" }
  );
}

export function _devicesDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  options: DevicesDeleteOperationOptions = { requestOptions: {} }
): StreamableMethod<
  | DevicesDeleteOperation200Response
  | DevicesDeleteOperation202Response
  | DevicesDeleteOperation204Response
  | DevicesDeleteOperationDefaultResponse
  | DevicesDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deviceName
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _devicesDeleteOperationDeserialize(
  result:
    | DevicesDeleteOperation200Response
    | DevicesDeleteOperation202Response
    | DevicesDeleteOperation204Response
    | DevicesDeleteOperationDefaultResponse
    | DevicesDeleteLogicalResponse
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DevicesDeleteLogicalResponse;
  return;
}

/** Delete a Device */
export function devicesDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  options: DevicesDeleteOperationOptions = { requestOptions: {} }
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _devicesDeleteOperationDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _devicesDeleteOperationSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deviceName,
        options
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _devicesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  properties: DeviceUpdate,
  options: DevicesUpdateOptions = { requestOptions: {} }
): StreamableMethod<
  | DevicesUpdate200Response
  | DevicesUpdate202Response
  | DevicesUpdateDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deviceName
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !properties.properties
          ? undefined
          : { deviceGroupId: properties.properties?.["deviceGroupId"] },
      },
    });
}

export async function _devicesUpdateDeserialize(
  result:
    | DevicesUpdate200Response
    | DevicesUpdate202Response
    | DevicesUpdateDefaultResponse
): Promise<Device> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DevicesUpdate200Response;
  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          deviceId: result.body.properties?.["deviceId"],
          chipSku: result.body.properties?.["chipSku"],
          lastAvailableOsVersion:
            result.body.properties?.["lastAvailableOsVersion"],
          lastInstalledOsVersion:
            result.body.properties?.["lastInstalledOsVersion"],
          lastOsUpdateUtc:
            result.body.properties?.["lastOsUpdateUtc"] !== undefined
              ? new Date(result.body.properties?.["lastOsUpdateUtc"])
              : undefined,
          lastUpdateRequestUtc:
            result.body.properties?.["lastUpdateRequestUtc"] !== undefined
              ? new Date(result.body.properties?.["lastUpdateRequestUtc"])
              : undefined,
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level. */
export async function devicesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  properties: DeviceUpdate,
  options: DevicesUpdateOptions = { requestOptions: {} }
): Promise<Device> {
  const result = await _devicesUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    deviceName,
    properties,
    options
  );
  return _devicesUpdateDeserialize(result);
}

export function _devicesDeprecatedGenerateCapabilityImageSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
  options: DevicesDeprecatedGenerateCapabilityImageOptions = {
    requestOptions: {},
  }
): StreamableMethod<
  | DevicesDeprecatedGenerateCapabilityImage200Response
  | DevicesDeprecatedGenerateCapabilityImage202Response
  | DevicesDeprecatedGenerateCapabilityImageDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}/generateCapabilityImage",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deviceName
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { capabilities: generateDeviceCapabilityRequest["capabilities"] },
    }) as StreamableMethod<
    | DevicesDeprecatedGenerateCapabilityImage200Response
    | DevicesDeprecatedGenerateCapabilityImage202Response
    | DevicesDeprecatedGenerateCapabilityImageDefaultResponse
  >;
}

export async function _devicesDeprecatedGenerateCapabilityImageDeserialize(
  result:
    | DevicesDeprecatedGenerateCapabilityImage200Response
    | DevicesDeprecatedGenerateCapabilityImage202Response
    | DevicesDeprecatedGenerateCapabilityImageDefaultResponse
): Promise<SignedCapabilityImageResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DevicesDeprecatedGenerateCapabilityImage200Response;
  return {
    image: result.body["image"],
  };
}

/** Generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product. */
export async function devicesDeprecatedGenerateCapabilityImage(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
  options: DevicesDeprecatedGenerateCapabilityImageOptions = {
    requestOptions: {},
  }
): Promise<SignedCapabilityImageResponse> {
  const result = await _devicesDeprecatedGenerateCapabilityImageSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    deviceName,
    generateDeviceCapabilityRequest,
    options
  );
  return _devicesDeprecatedGenerateCapabilityImageDeserialize(result);
}

export function _devicesGenerateCapabilityImageSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
  options: DevicesGenerateCapabilityImageOptions = { requestOptions: {} }
): StreamableMethod<
  | DevicesGenerateCapabilityImage200Response
  | DevicesGenerateCapabilityImage202Response
  | DevicesGenerateCapabilityImageDefaultResponse
  | DevicesGenerateCapabilityImageLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}/generateCapabilityImage",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deviceName
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { capabilities: generateDeviceCapabilityRequest["capabilities"] },
    }) as StreamableMethod<
    | DevicesGenerateCapabilityImage200Response
    | DevicesGenerateCapabilityImage202Response
    | DevicesGenerateCapabilityImageDefaultResponse
    | DevicesGenerateCapabilityImageLogicalResponse
  >;
}

export async function _devicesGenerateCapabilityImageDeserialize(
  result:
    | DevicesGenerateCapabilityImage200Response
    | DevicesGenerateCapabilityImage202Response
    | DevicesGenerateCapabilityImageDefaultResponse
    | DevicesGenerateCapabilityImageLogicalResponse
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DevicesGenerateCapabilityImageLogicalResponse;
  return;
}

/** Generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product. */
export function devicesGenerateCapabilityImage(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deviceName: string,
  generateDeviceCapabilityRequest: GenerateCapabilityImageRequest,
  options: DevicesGenerateCapabilityImageOptions = { requestOptions: {} }
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _devicesGenerateCapabilityImageDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _devicesGenerateCapabilityImageSend(
          context,
          subscriptionId,
          resourceGroupName,
          catalogName,
          productName,
          deviceGroupName,
          deviceName,
          generateDeviceCapabilityRequest,
          options
        ),
    }
  ) as PollerLike<OperationState<void>, void>;
}
