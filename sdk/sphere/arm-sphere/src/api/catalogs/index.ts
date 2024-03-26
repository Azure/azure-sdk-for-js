// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DeviceGroupListResult,
  DeviceGroup,
  CountDeviceResponse,
  CountDevicesResponse,
  Device,
  DeviceListResult,
  Deployment,
  Image,
  DeploymentListResult,
  Catalog,
  CatalogUpdate,
  CatalogListResult,
  ListDeviceGroupsRequest,
  PagedDeviceInsight,
  DeviceInsight,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureSphereContext as Client,
  CatalogsCountDevices200Response,
  CatalogsCountDevicesDefaultResponse,
  CatalogsCreateOrUpdate200Response,
  CatalogsCreateOrUpdate201Response,
  CatalogsCreateOrUpdateDefaultResponse,
  CatalogsCreateOrUpdateLogicalResponse,
  CatalogsDeleteLogicalResponse,
  CatalogsDeleteOperation200Response,
  CatalogsDeleteOperation202Response,
  CatalogsDeleteOperation204Response,
  CatalogsDeleteOperationDefaultResponse,
  CatalogsDeprecated200Response,
  CatalogsDeprecatedDefaultResponse,
  CatalogsGet200Response,
  CatalogsGetDefaultResponse,
  CatalogsListByResourceGroup200Response,
  CatalogsListByResourceGroupDefaultResponse,
  CatalogsListBySubscription200Response,
  CatalogsListBySubscriptionDefaultResponse,
  CatalogsListDeployments200Response,
  CatalogsListDeploymentsDefaultResponse,
  CatalogsListDeviceGroups200Response,
  CatalogsListDeviceGroupsDefaultResponse,
  CatalogsListDeviceInsights200Response,
  CatalogsListDeviceInsightsDefaultResponse,
  CatalogsListDevices200Response,
  CatalogsListDevicesDefaultResponse,
  CatalogsUpdate200Response,
  CatalogsUpdateDefaultResponse,
  CatalogsUploadImage202Response,
  CatalogsUploadImageDefaultResponse,
  CatalogsUploadImageLogicalResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  CatalogsGetOptions,
  CatalogsCreateOrUpdateOptions,
  CatalogsUpdateOptions,
  CatalogsDeleteOperationOptions,
  CatalogsListByResourceGroupOptions,
  CatalogsListBySubscriptionOptions,
  CatalogsDeprecatedOptions,
  CatalogsCountDevicesOptions,
  CatalogsListDeviceInsightsOptions,
  CatalogsListDevicesOptions,
  CatalogsListDeploymentsOptions,
  CatalogsListDeviceGroupsOptions,
  CatalogsUploadImageOptions,
} from "../../models/options.js";

export function _catalogsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsGetOptions = { requestOptions: {} },
): StreamableMethod<CatalogsGet200Response | CatalogsGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _catalogsGetDeserialize(
  result: CatalogsGet200Response | CatalogsGetDefaultResponse,
): Promise<Catalog> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    location: result.body["location"],
    tags: result.body["tags"],
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
          tenantId: result.body.properties?.["tenantId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Catalog */
export async function catalogsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsGetOptions = { requestOptions: {} },
): Promise<Catalog> {
  const result = await _catalogsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    options,
  );
  return _catalogsGetDeserialize(result);
}

export function _catalogsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  resource: Catalog,
  options: CatalogsCreateOrUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | CatalogsCreateOrUpdate200Response
  | CatalogsCreateOrUpdate201Response
  | CatalogsCreateOrUpdateDefaultResponse
  | CatalogsCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        location: resource["location"],
        tags: resource["tags"],
        properties: !resource.properties ? undefined : {},
      },
    });
}

export async function _catalogsCreateOrUpdateDeserialize(
  result:
    | CatalogsCreateOrUpdate200Response
    | CatalogsCreateOrUpdate201Response
    | CatalogsCreateOrUpdateDefaultResponse
    | CatalogsCreateOrUpdateLogicalResponse,
): Promise<Catalog> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as CatalogsCreateOrUpdateLogicalResponse;
  return {
    location: result.body["location"],
    tags: result.body["tags"],
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
          tenantId: result.body.properties?.["tenantId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Catalog */
export function catalogsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  resource: Catalog,
  options: CatalogsCreateOrUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<Catalog>, Catalog> {
  return getLongRunningPoller(context, _catalogsCreateOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _catalogsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<Catalog>, Catalog>;
}

export function _catalogsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  properties: CatalogUpdate,
  options: CatalogsUpdateOptions = { requestOptions: {} },
): StreamableMethod<CatalogsUpdate200Response | CatalogsUpdateDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: { tags: properties["tags"] },
    });
}

export async function _catalogsUpdateDeserialize(
  result: CatalogsUpdate200Response | CatalogsUpdateDefaultResponse,
): Promise<Catalog> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    location: result.body["location"],
    tags: result.body["tags"],
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
          tenantId: result.body.properties?.["tenantId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a Catalog */
export async function catalogsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  properties: CatalogUpdate,
  options: CatalogsUpdateOptions = { requestOptions: {} },
): Promise<Catalog> {
  const result = await _catalogsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    properties,
    options,
  );
  return _catalogsUpdateDeserialize(result);
}

export function _catalogsDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | CatalogsDeleteOperation200Response
  | CatalogsDeleteOperation202Response
  | CatalogsDeleteOperation204Response
  | CatalogsDeleteOperationDefaultResponse
  | CatalogsDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _catalogsDeleteOperationDeserialize(
  result:
    | CatalogsDeleteOperation200Response
    | CatalogsDeleteOperation202Response
    | CatalogsDeleteOperation204Response
    | CatalogsDeleteOperationDefaultResponse
    | CatalogsDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as CatalogsDeleteLogicalResponse;
  return;
}

/** Delete a Catalog */
export function catalogsDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _catalogsDeleteOperationDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _catalogsDeleteOperationSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _catalogsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: CatalogsListByResourceGroupOptions = { requestOptions: {} },
): StreamableMethod<
  | CatalogsListByResourceGroup200Response
  | CatalogsListByResourceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _catalogsListByResourceGroupDeserialize(
  result:
    | CatalogsListByResourceGroup200Response
    | CatalogsListByResourceGroupDefaultResponse,
): Promise<CatalogListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      location: p["location"],
      tags: p["tags"],
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
            tenantId: p.properties?.["tenantId"],
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Catalog resources by resource group */
export function catalogsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: CatalogsListByResourceGroupOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Catalog> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _catalogsListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _catalogsListByResourceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _catalogsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: CatalogsListBySubscriptionOptions = { requestOptions: {} },
): StreamableMethod<
  | CatalogsListBySubscription200Response
  | CatalogsListBySubscriptionDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.AzureSphere/catalogs",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _catalogsListBySubscriptionDeserialize(
  result:
    | CatalogsListBySubscription200Response
    | CatalogsListBySubscriptionDefaultResponse,
): Promise<CatalogListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      location: p["location"],
      tags: p["tags"],
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
            tenantId: p.properties?.["tenantId"],
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Catalog resources by subscription ID */
export function catalogsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: CatalogsListBySubscriptionOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Catalog> {
  return buildPagedAsyncIterator(
    context,
    () => _catalogsListBySubscriptionSend(context, subscriptionId, options),
    _catalogsListBySubscriptionDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _catalogsDeprecatedSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsDeprecatedOptions = { requestOptions: {} },
): StreamableMethod<
  CatalogsDeprecated200Response | CatalogsDeprecatedDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/countDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
    }) as StreamableMethod<
    CatalogsDeprecated200Response | CatalogsDeprecatedDefaultResponse
  >;
}

export async function _catalogsDeprecatedDeserialize(
  result: CatalogsDeprecated200Response | CatalogsDeprecatedDefaultResponse,
): Promise<CountDeviceResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
  };
}

/** Counts devices in catalog. */
export async function catalogsDeprecated(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsDeprecatedOptions = { requestOptions: {} },
): Promise<CountDeviceResponse> {
  const result = await _catalogsDeprecatedSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    options,
  );
  return _catalogsDeprecatedDeserialize(result);
}

export function _catalogsCountDevicesSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsCountDevicesOptions = { requestOptions: {} },
): StreamableMethod<
  CatalogsCountDevices200Response | CatalogsCountDevicesDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/countDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
    }) as StreamableMethod<
    CatalogsCountDevices200Response | CatalogsCountDevicesDefaultResponse
  >;
}

export async function _catalogsCountDevicesDeserialize(
  result: CatalogsCountDevices200Response | CatalogsCountDevicesDefaultResponse,
): Promise<CountDevicesResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
  };
}

/** Counts devices in catalog. */
export async function catalogsCountDevices(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsCountDevicesOptions = { requestOptions: {} },
): Promise<CountDevicesResponse> {
  const result = await _catalogsCountDevicesSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    options,
  );
  return _catalogsCountDevicesDeserialize(result);
}

export function _catalogsListDeviceInsightsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeviceInsightsOptions = { requestOptions: {} },
): StreamableMethod<
  | CatalogsListDeviceInsights200Response
  | CatalogsListDeviceInsightsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceInsights",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _catalogsListDeviceInsightsDeserialize(
  result:
    | CatalogsListDeviceInsights200Response
    | CatalogsListDeviceInsightsDefaultResponse,
): Promise<PagedDeviceInsight> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      deviceId: p["deviceId"],
      description: p["description"],
      startTimestampUtc: new Date(p["startTimestampUtc"]),
      endTimestampUtc: new Date(p["endTimestampUtc"]),
      eventCategory: p["eventCategory"],
      eventClass: p["eventClass"],
      eventType: p["eventType"],
      eventCount: p["eventCount"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/** Lists device insights for catalog. */
export function catalogsListDeviceInsights(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeviceInsightsOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceInsight> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _catalogsListDeviceInsightsSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    _catalogsListDeviceInsightsDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _catalogsListDevicesSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDevicesOptions = { requestOptions: {} },
): StreamableMethod<
  CatalogsListDevices200Response | CatalogsListDevicesDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDevices",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _catalogsListDevicesDeserialize(
  result: CatalogsListDevices200Response | CatalogsListDevicesDefaultResponse,
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

/** Lists devices for catalog. */
export function catalogsListDevices(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDevicesOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Device> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _catalogsListDevicesSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    _catalogsListDevicesDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _catalogsListDeploymentsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeploymentsOptions = { requestOptions: {} },
): StreamableMethod<
  CatalogsListDeployments200Response | CatalogsListDeploymentsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeployments",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _catalogsListDeploymentsDeserialize(
  result:
    | CatalogsListDeployments200Response
    | CatalogsListDeploymentsDefaultResponse,
): Promise<DeploymentListResult> {
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
            deploymentId: p.properties?.["deploymentId"],
            deployedImages:
              p.properties?.["deployedImages"] === undefined
                ? p.properties?.["deployedImages"]
                : p.properties?.["deployedImages"].map((p) => ({
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
                          lastModifiedByType:
                            p.systemData?.["lastModifiedByType"],
                          lastModifiedAt:
                            p.systemData?.["lastModifiedAt"] !== undefined
                              ? new Date(p.systemData?.["lastModifiedAt"])
                              : undefined,
                        },
                    properties: !p.properties
                      ? undefined
                      : {
                          image: p.properties?.["image"],
                          imageId: p.properties?.["imageId"],
                          imageName: p.properties?.["imageName"],
                          regionalDataBoundary:
                            p.properties?.["regionalDataBoundary"],
                          uri: p.properties?.["uri"],
                          description: p.properties?.["description"],
                          componentId: p.properties?.["componentId"],
                          imageType: p.properties?.["imageType"],
                          provisioningState:
                            p.properties?.["provisioningState"],
                        },
                  })),
            deploymentDateUtc:
              p.properties?.["deploymentDateUtc"] !== undefined
                ? new Date(p.properties?.["deploymentDateUtc"])
                : undefined,
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** Lists deployments for catalog. */
export function catalogsListDeployments(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeploymentsOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _catalogsListDeploymentsSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    _catalogsListDeploymentsDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _catalogsListDeviceGroupsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  listDeviceGroupsRequest: ListDeviceGroupsRequest,
  options: CatalogsListDeviceGroupsOptions = { requestOptions: {} },
): StreamableMethod<
  CatalogsListDeviceGroups200Response | CatalogsListDeviceGroupsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceGroups",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
      body: { deviceGroupName: listDeviceGroupsRequest["deviceGroupName"] },
    });
}

export async function _catalogsListDeviceGroupsDeserialize(
  result:
    | CatalogsListDeviceGroups200Response
    | CatalogsListDeviceGroupsDefaultResponse,
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

/** List the device groups for the catalog. */
export function catalogsListDeviceGroups(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  listDeviceGroupsRequest: ListDeviceGroupsRequest,
  options: CatalogsListDeviceGroupsOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceGroup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _catalogsListDeviceGroupsSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        listDeviceGroupsRequest,
        options,
      ),
    _catalogsListDeviceGroupsDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _catalogsUploadImageSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  uploadImageRequest: Image,
  options: CatalogsUploadImageOptions = { requestOptions: {} },
): StreamableMethod<
  | CatalogsUploadImage202Response
  | CatalogsUploadImageDefaultResponse
  | CatalogsUploadImageLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/uploadImage",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !uploadImageRequest.properties
          ? undefined
          : {
              image: uploadImageRequest.properties?.["image"],
              imageId: uploadImageRequest.properties?.["imageId"],
              regionalDataBoundary:
                uploadImageRequest.properties?.["regionalDataBoundary"],
            },
      },
    });
}

export async function _catalogsUploadImageDeserialize(
  result:
    | CatalogsUploadImage202Response
    | CatalogsUploadImageDefaultResponse
    | CatalogsUploadImageLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as CatalogsUploadImageLogicalResponse;
  return;
}

/** Creates an image. Use this action when the image ID is unknown. */
export function catalogsUploadImage(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  uploadImageRequest: Image,
  options: CatalogsUploadImageOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _catalogsUploadImageDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _catalogsUploadImageSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        uploadImageRequest,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}
