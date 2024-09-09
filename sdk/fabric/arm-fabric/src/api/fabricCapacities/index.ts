// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  fabricCapacityPropertiesSerializer,
  rpSkuSerializer,
  fabricCapacityUpdatePropertiesSerializer,
  FabricCapacity,
  FabricCapacityUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  RpSkuDetailsForExistingResource,
  RpSkuDetailsForNewResource,
  _FabricCapacityListResult,
  _RpSkuEnumerationForExistingResourceResult,
  _RpSkuEnumerationForNewResourceResult,
} from "../../models/models.js";
import { FabricContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FabricCapacitiesGetOptionalParams,
  FabricCapacitiesCreateOrUpdateOptionalParams,
  FabricCapacitiesUpdateOptionalParams,
  FabricCapacitiesDeleteOptionalParams,
  FabricCapacitiesListByResourceGroupOptionalParams,
  FabricCapacitiesListBySubscriptionOptionalParams,
  FabricCapacitiesResumeOptionalParams,
  FabricCapacitiesSuspendOptionalParams,
  FabricCapacitiesCheckNameAvailabilityOptionalParams,
  FabricCapacitiesListSkusForCapacityOptionalParams,
  FabricCapacitiesListSkusOptionalParams,
} from "../../models/options.js";

export function _fabricCapacitiesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<FabricCapacity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    tags: result.body["tags"],
    location: result.body["location"],
    id: result.body["id"],
    name: result.body["name"],
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
    properties: {
      provisioningState: result.body.properties["provisioningState"],
      state: result.body.properties["state"],
      administration: {
        members: result.body.properties.administration["members"],
      },
    },
    sku: { name: result.body.sku["name"], tier: result.body.sku["tier"] },
  };
}

/** Get a FabricCapacity */
export async function fabricCapacitiesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesGetOptionalParams = { requestOptions: {} },
): Promise<FabricCapacity> {
  const result = await _fabricCapacitiesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    capacityName,
    options,
  );
  return _fabricCapacitiesGetDeserialize(result);
}

export function _fabricCapacitiesCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  resource: FabricCapacity,
  options: FabricCapacitiesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !resource.tags
          ? resource.tags
          : (serializeRecord(resource.tags as any) as any),
        location: resource["location"],
        properties: fabricCapacityPropertiesSerializer(resource.properties),
        sku: rpSkuSerializer(resource.sku),
      },
    });
}

export async function _fabricCapacitiesCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FabricCapacity> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    tags: result.body["tags"],
    location: result.body["location"],
    id: result.body["id"],
    name: result.body["name"],
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
    properties: {
      provisioningState: result.body.properties["provisioningState"],
      state: result.body.properties["state"],
      administration: {
        members: result.body.properties.administration["members"],
      },
    },
    sku: { name: result.body.sku["name"], tier: result.body.sku["tier"] },
  };
}

/** Create a FabricCapacity */
export function fabricCapacitiesCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  resource: FabricCapacity,
  options: FabricCapacitiesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<FabricCapacity>, FabricCapacity> {
  return getLongRunningPoller(
    context,
    _fabricCapacitiesCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fabricCapacitiesCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          capacityName,
          resource,
          options,
        ),
    },
  ) as PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
}

export function _fabricCapacitiesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  properties: FabricCapacityUpdate,
  options: FabricCapacitiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        sku: !properties.sku ? properties.sku : rpSkuSerializer(properties.sku),
        tags: !properties.tags
          ? properties.tags
          : (serializeRecord(properties.tags as any) as any),
        properties: !properties.properties
          ? properties.properties
          : fabricCapacityUpdatePropertiesSerializer(properties.properties),
      },
    });
}

export async function _fabricCapacitiesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FabricCapacity> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    tags: result.body["tags"],
    location: result.body["location"],
    id: result.body["id"],
    name: result.body["name"],
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
    properties: {
      provisioningState: result.body.properties["provisioningState"],
      state: result.body.properties["state"],
      administration: {
        members: result.body.properties.administration["members"],
      },
    },
    sku: { name: result.body.sku["name"], tier: result.body.sku["tier"] },
  };
}

/** Update a FabricCapacity */
export function fabricCapacitiesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  properties: FabricCapacityUpdate,
  options: FabricCapacitiesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FabricCapacity>, FabricCapacity> {
  return getLongRunningPoller(
    context,
    _fabricCapacitiesUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fabricCapacitiesUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          capacityName,
          properties,
          options,
        ),
    },
  ) as PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
}

export function _fabricCapacitiesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a FabricCapacity */
export function fabricCapacitiesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _fabricCapacitiesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fabricCapacitiesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          capacityName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _fabricCapacitiesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FabricCapacitiesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_FabricCapacityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        tags: p["tags"],
        location: p["location"],
        id: p["id"],
        name: p["name"],
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
        properties: {
          provisioningState: p.properties["provisioningState"],
          state: p.properties["state"],
          administration: { members: p.properties.administration["members"] },
        },
        sku: { name: p.sku["name"], tier: p.sku["tier"] },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List FabricCapacity resources by resource group */
export function fabricCapacitiesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FabricCapacitiesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<FabricCapacity> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fabricCapacitiesListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _fabricCapacitiesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fabricCapacitiesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/capacities",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_FabricCapacityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        tags: p["tags"],
        location: p["location"],
        id: p["id"],
        name: p["name"],
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
        properties: {
          provisioningState: p.properties["provisioningState"],
          state: p.properties["state"],
          administration: { members: p.properties.administration["members"] },
        },
        sku: { name: p.sku["name"], tier: p.sku["tier"] },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List FabricCapacity resources by subscription ID */
export function fabricCapacitiesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<FabricCapacity> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fabricCapacitiesListBySubscriptionSend(context, subscriptionId, options),
    _fabricCapacitiesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fabricCapacitiesResumeSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/resume",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesResumeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Resume operation of the specified Fabric capacity instance. */
export function fabricCapacitiesResume(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _fabricCapacitiesResumeDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fabricCapacitiesResumeSend(
          context,
          subscriptionId,
          resourceGroupName,
          capacityName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _fabricCapacitiesSuspendSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/suspend",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesSuspendDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Suspend operation of the specified Fabric capacity instance. */
export function fabricCapacitiesSuspend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesSuspendOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _fabricCapacitiesSuspendDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fabricCapacitiesSuspendSend(
          context,
          subscriptionId,
          resourceGroupName,
          capacityName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _fabricCapacitiesCheckNameAvailabilitySend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: FabricCapacitiesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/locations/{location}/checkNameAvailability",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { name: body["name"], type: body["type"] },
    });
}

export async function _fabricCapacitiesCheckNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    nameAvailable: result.body["nameAvailable"],
    reason: result.body["reason"],
    message: result.body["message"],
  };
}

/** Implements local CheckNameAvailability operations */
export async function fabricCapacitiesCheckNameAvailability(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: FabricCapacitiesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _fabricCapacitiesCheckNameAvailabilitySend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _fabricCapacitiesCheckNameAvailabilityDeserialize(result);
}

export function _fabricCapacitiesListSkusForCapacitySend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesListSkusForCapacityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/skus",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListSkusForCapacityDeserialize(
  result: PathUncheckedResponse,
): Promise<_RpSkuEnumerationForExistingResourceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        resourceType: p["resourceType"],
        sku: { name: p.sku["name"], tier: p.sku["tier"] },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List eligible SKUs for a Microsoft Fabric resource */
export function fabricCapacitiesListSkusForCapacity(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesListSkusForCapacityOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RpSkuDetailsForExistingResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fabricCapacitiesListSkusForCapacitySend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    _fabricCapacitiesListSkusForCapacityDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fabricCapacitiesListSkusSend(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/skus",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_RpSkuEnumerationForNewResourceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        resourceType: p["resourceType"],
        name: p["name"],
        locations: p["locations"],
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List eligible SKUs for Microsoft Fabric resource provider */
export function fabricCapacitiesListSkus(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RpSkuDetailsForNewResource> {
  return buildPagedAsyncIterator(
    context,
    () => _fabricCapacitiesListSkusSend(context, subscriptionId, options),
    _fabricCapacitiesListSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
