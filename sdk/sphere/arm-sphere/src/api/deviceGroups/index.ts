// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DeviceGroupListResult,
  DeviceGroup,
  CountDeviceResponse,
  CountDevicesResponse,
  DeviceGroupUpdate,
  ClaimDevicesRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureSphereContext as Client,
  DeviceGroupsClaimDevices202Response,
  DeviceGroupsClaimDevicesDefaultResponse,
  DeviceGroupsClaimDevicesLogicalResponse,
  DeviceGroupsCountDevices200Response,
  DeviceGroupsCountDevicesDefaultResponse,
  DeviceGroupsCreateOrUpdate200Response,
  DeviceGroupsCreateOrUpdate201Response,
  DeviceGroupsCreateOrUpdateDefaultResponse,
  DeviceGroupsCreateOrUpdateLogicalResponse,
  DeviceGroupsDeleteLogicalResponse,
  DeviceGroupsDeleteOperation200Response,
  DeviceGroupsDeleteOperation202Response,
  DeviceGroupsDeleteOperation204Response,
  DeviceGroupsDeleteOperationDefaultResponse,
  DeviceGroupsDeprecatedClaimDevices202Response,
  DeviceGroupsDeprecatedClaimDevicesDefaultResponse,
  DeviceGroupsDeprecatedCountDevices200Response,
  DeviceGroupsDeprecatedCountDevicesDefaultResponse,
  DeviceGroupsGet200Response,
  DeviceGroupsGetDefaultResponse,
  DeviceGroupsListByProduct200Response,
  DeviceGroupsListByProductDefaultResponse,
  DeviceGroupsUpdate200Response,
  DeviceGroupsUpdate202Response,
  DeviceGroupsUpdateDefaultResponse,
  DeviceGroupsUpdateLogicalResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
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

export function _deviceGroupsListByProductSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: DeviceGroupsListByProductOptions = { requestOptions: {} },
): StreamableMethod<
  | DeviceGroupsListByProduct200Response
  | DeviceGroupsListByProductDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _deviceGroupsListByProductDeserialize(
  result:
    | DeviceGroupsListByProduct200Response
    | DeviceGroupsListByProductDefaultResponse,
): Promise<DeviceGroupListResult> {
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
            description: p.properties?.["description"],
            osFeedType: p.properties?.["osFeedType"],
            updatePolicy: p.properties?.["updatePolicy"],
            allowCrashDumpsCollection:
              p.properties?.["allowCrashDumpsCollection"],
            regionalDataBoundary: p.properties?.["regionalDataBoundary"],
            hasDeployment: p.properties?.["hasDeployment"],
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function deviceGroupsListByProduct(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: DeviceGroupsListByProductOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceGroup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _deviceGroupsListByProductSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        options,
      ),
    _deviceGroupsListByProductDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deviceGroupsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsGetOptions = { requestOptions: {} },
): StreamableMethod<
  DeviceGroupsGet200Response | DeviceGroupsGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deviceGroupsGetDeserialize(
  result: DeviceGroupsGet200Response | DeviceGroupsGetDefaultResponse,
): Promise<DeviceGroup> {
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
          description: result.body.properties?.["description"],
          osFeedType: result.body.properties?.["osFeedType"],
          updatePolicy: result.body.properties?.["updatePolicy"],
          allowCrashDumpsCollection:
            result.body.properties?.["allowCrashDumpsCollection"],
          regionalDataBoundary:
            result.body.properties?.["regionalDataBoundary"],
          hasDeployment: result.body.properties?.["hasDeployment"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export async function deviceGroupsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsGetOptions = { requestOptions: {} },
): Promise<DeviceGroup> {
  const result = await _deviceGroupsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    options,
  );
  return _deviceGroupsGetDeserialize(result);
}

export function _deviceGroupsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  resource: DeviceGroup,
  options: DeviceGroupsCreateOrUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | DeviceGroupsCreateOrUpdate200Response
  | DeviceGroupsCreateOrUpdate201Response
  | DeviceGroupsCreateOrUpdateDefaultResponse
  | DeviceGroupsCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? undefined
          : {
              description: resource.properties?.["description"],
              osFeedType: resource.properties?.["osFeedType"],
              updatePolicy: resource.properties?.["updatePolicy"],
              allowCrashDumpsCollection:
                resource.properties?.["allowCrashDumpsCollection"],
              regionalDataBoundary:
                resource.properties?.["regionalDataBoundary"],
            },
      },
    });
}

export async function _deviceGroupsCreateOrUpdateDeserialize(
  result:
    | DeviceGroupsCreateOrUpdate200Response
    | DeviceGroupsCreateOrUpdate201Response
    | DeviceGroupsCreateOrUpdateDefaultResponse
    | DeviceGroupsCreateOrUpdateLogicalResponse,
): Promise<DeviceGroup> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DeviceGroupsCreateOrUpdateLogicalResponse;
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
          description: result.body.properties?.["description"],
          osFeedType: result.body.properties?.["osFeedType"],
          updatePolicy: result.body.properties?.["updatePolicy"],
          allowCrashDumpsCollection:
            result.body.properties?.["allowCrashDumpsCollection"],
          regionalDataBoundary:
            result.body.properties?.["regionalDataBoundary"],
          hasDeployment: result.body.properties?.["hasDeployment"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function deviceGroupsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  resource: DeviceGroup,
  options: DeviceGroupsCreateOrUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<DeviceGroup>, DeviceGroup> {
  return getLongRunningPoller(context, _deviceGroupsCreateOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deviceGroupsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<DeviceGroup>, DeviceGroup>;
}

export function _deviceGroupsDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | DeviceGroupsDeleteOperation200Response
  | DeviceGroupsDeleteOperation202Response
  | DeviceGroupsDeleteOperation204Response
  | DeviceGroupsDeleteOperationDefaultResponse
  | DeviceGroupsDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deviceGroupsDeleteOperationDeserialize(
  result:
    | DeviceGroupsDeleteOperation200Response
    | DeviceGroupsDeleteOperation202Response
    | DeviceGroupsDeleteOperation204Response
    | DeviceGroupsDeleteOperationDefaultResponse
    | DeviceGroupsDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DeviceGroupsDeleteLogicalResponse;
  return;
}

/** Delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function deviceGroupsDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deviceGroupsDeleteOperationDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deviceGroupsDeleteOperationSend(
          context,
          subscriptionId,
          resourceGroupName,
          catalogName,
          productName,
          deviceGroupName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _deviceGroupsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  properties: DeviceGroupUpdate,
  options: DeviceGroupsUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | DeviceGroupsUpdate200Response
  | DeviceGroupsUpdate202Response
  | DeviceGroupsUpdateDefaultResponse
  | DeviceGroupsUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !properties.properties
          ? undefined
          : {
              description: properties.properties?.["description"],
              osFeedType: properties.properties?.["osFeedType"],
              updatePolicy: properties.properties?.["updatePolicy"],
              allowCrashDumpsCollection:
                properties.properties?.["allowCrashDumpsCollection"],
              regionalDataBoundary:
                properties.properties?.["regionalDataBoundary"],
            },
      },
    });
}

export async function _deviceGroupsUpdateDeserialize(
  result:
    | DeviceGroupsUpdate200Response
    | DeviceGroupsUpdate202Response
    | DeviceGroupsUpdateDefaultResponse
    | DeviceGroupsUpdateLogicalResponse,
): Promise<DeviceGroup> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body as any;
}

/** Update a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function deviceGroupsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  properties: DeviceGroupUpdate,
  options: DeviceGroupsUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<DeviceGroup>, DeviceGroup> {
  return getLongRunningPoller(context, _deviceGroupsUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deviceGroupsUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<DeviceGroup>, DeviceGroup>;
}

export function _deviceGroupsDeprecatedCountDevicesSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsDeprecatedCountDevicesOptions = { requestOptions: {} },
): StreamableMethod<
  | DeviceGroupsDeprecatedCountDevices200Response
  | DeviceGroupsDeprecatedCountDevicesDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/countDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
    }) as StreamableMethod<
    | DeviceGroupsDeprecatedCountDevices200Response
    | DeviceGroupsDeprecatedCountDevicesDefaultResponse
  >;
}

export async function _deviceGroupsDeprecatedCountDevicesDeserialize(
  result:
    | DeviceGroupsDeprecatedCountDevices200Response
    | DeviceGroupsDeprecatedCountDevicesDefaultResponse,
): Promise<CountDeviceResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
  };
}

/** Counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export async function deviceGroupsDeprecatedCountDevices(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsDeprecatedCountDevicesOptions = { requestOptions: {} },
): Promise<CountDeviceResponse> {
  const result = await _deviceGroupsDeprecatedCountDevicesSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    options,
  );
  return _deviceGroupsDeprecatedCountDevicesDeserialize(result);
}

export function _deviceGroupsCountDevicesSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsCountDevicesOptions = { requestOptions: {} },
): StreamableMethod<
  DeviceGroupsCountDevices200Response | DeviceGroupsCountDevicesDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/countDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
    }) as StreamableMethod<
    | DeviceGroupsCountDevices200Response
    | DeviceGroupsCountDevicesDefaultResponse
  >;
}

export async function _deviceGroupsCountDevicesDeserialize(
  result:
    | DeviceGroupsCountDevices200Response
    | DeviceGroupsCountDevicesDefaultResponse,
): Promise<CountDevicesResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
  };
}

/** Counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export async function deviceGroupsCountDevices(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsCountDevicesOptions = { requestOptions: {} },
): Promise<CountDevicesResponse> {
  const result = await _deviceGroupsCountDevicesSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    options,
  );
  return _deviceGroupsCountDevicesDeserialize(result);
}

export function _deviceGroupsDeprecatedClaimDevicesSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  claimDevicesRequest: ClaimDevicesRequest,
  options: DeviceGroupsDeprecatedClaimDevicesOptions = { requestOptions: {} },
): StreamableMethod<
  | DeviceGroupsDeprecatedClaimDevices202Response
  | DeviceGroupsDeprecatedClaimDevicesDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/claimDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { deviceIdentifiers: claimDevicesRequest["deviceIdentifiers"] },
    }) as StreamableMethod<
    | DeviceGroupsDeprecatedClaimDevices202Response
    | DeviceGroupsDeprecatedClaimDevicesDefaultResponse
  >;
}

export async function _deviceGroupsDeprecatedClaimDevicesDeserialize(
  result:
    | DeviceGroupsDeprecatedClaimDevices202Response
    | DeviceGroupsDeprecatedClaimDevicesDefaultResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/** Bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only. */
export async function deviceGroupsDeprecatedClaimDevices(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  claimDevicesRequest: ClaimDevicesRequest,
  options: DeviceGroupsDeprecatedClaimDevicesOptions = { requestOptions: {} },
): Promise<void> {
  const result = await _deviceGroupsDeprecatedClaimDevicesSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    claimDevicesRequest,
    options,
  );
  return _deviceGroupsDeprecatedClaimDevicesDeserialize(result);
}

export function _deviceGroupsClaimDevicesSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  claimDevicesRequest: ClaimDevicesRequest,
  options: DeviceGroupsClaimDevicesOptions = { requestOptions: {} },
): StreamableMethod<
  | DeviceGroupsClaimDevices202Response
  | DeviceGroupsClaimDevicesDefaultResponse
  | DeviceGroupsClaimDevicesLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/claimDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { deviceIdentifiers: claimDevicesRequest["deviceIdentifiers"] },
    }) as StreamableMethod<
    | DeviceGroupsClaimDevices202Response
    | DeviceGroupsClaimDevicesDefaultResponse
    | DeviceGroupsClaimDevicesLogicalResponse
  >;
}

export async function _deviceGroupsClaimDevicesDeserialize(
  result:
    | DeviceGroupsClaimDevices202Response
    | DeviceGroupsClaimDevicesDefaultResponse
    | DeviceGroupsClaimDevicesLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DeviceGroupsClaimDevicesLogicalResponse;
  return;
}

/** Bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only. */
export function deviceGroupsClaimDevices(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  claimDevicesRequest: ClaimDevicesRequest,
  options: DeviceGroupsClaimDevicesOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deviceGroupsClaimDevicesDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deviceGroupsClaimDevicesSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        claimDevicesRequest,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}
