// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  TrafficController,
  TrafficControllerUpdate,
  TrafficControllerListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  ServiceNetworkingContext as Client,
  TrafficControllerInterfaceCreateOrUpdate200Response,
  TrafficControllerInterfaceCreateOrUpdate201Response,
  TrafficControllerInterfaceCreateOrUpdateDefaultResponse,
  TrafficControllerInterfaceCreateOrUpdateLogicalResponse,
  TrafficControllerInterfaceDeleteLogicalResponse,
  TrafficControllerInterfaceDeleteOperation200Response,
  TrafficControllerInterfaceDeleteOperation202Response,
  TrafficControllerInterfaceDeleteOperation204Response,
  TrafficControllerInterfaceDeleteOperationDefaultResponse,
  TrafficControllerInterfaceGet200Response,
  TrafficControllerInterfaceGetDefaultResponse,
  TrafficControllerInterfaceListByResourceGroup200Response,
  TrafficControllerInterfaceListByResourceGroupDefaultResponse,
  TrafficControllerInterfaceListBySubscription200Response,
  TrafficControllerInterfaceListBySubscriptionDefaultResponse,
  TrafficControllerInterfaceUpdate200Response,
  TrafficControllerInterfaceUpdateDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  TrafficControllerInterfaceGetOptions,
  TrafficControllerInterfaceCreateOrUpdateOptions,
  TrafficControllerInterfaceUpdateOptions,
  TrafficControllerInterfaceDeleteOperationOptions,
  TrafficControllerInterfaceListByResourceGroupOptions,
  TrafficControllerInterfaceListBySubscriptionOptions,
} from "../../models/options.js";

export function _trafficControllerInterfaceGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceGetOptions = { requestOptions: {} },
): StreamableMethod<
  | TrafficControllerInterfaceGet200Response
  | TrafficControllerInterfaceGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _trafficControllerInterfaceGetDeserialize(
  result:
    | TrafficControllerInterfaceGet200Response
    | TrafficControllerInterfaceGetDefaultResponse,
): Promise<TrafficController> {
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
          configurationEndpoints:
            result.body.properties?.["configurationEndpoints"],
          frontends:
            result.body.properties?.["frontends"] === undefined
              ? result.body.properties?.["frontends"]
              : result.body.properties?.["frontends"].map((p) => ({
                  id: p["id"],
                })),
          associations:
            result.body.properties?.["associations"] === undefined
              ? result.body.properties?.["associations"]
              : result.body.properties?.["associations"].map((p) => ({
                  id: p["id"],
                })),
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a TrafficController */
export async function trafficControllerInterfaceGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceGetOptions = { requestOptions: {} },
): Promise<TrafficController> {
  const result = await _trafficControllerInterfaceGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    trafficControllerName,
    options,
  );
  return _trafficControllerInterfaceGetDeserialize(result);
}

export function _trafficControllerInterfaceCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  resource: TrafficController,
  options: TrafficControllerInterfaceCreateOrUpdateOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | TrafficControllerInterfaceCreateOrUpdate200Response
  | TrafficControllerInterfaceCreateOrUpdate201Response
  | TrafficControllerInterfaceCreateOrUpdateDefaultResponse
  | TrafficControllerInterfaceCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
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

export async function _trafficControllerInterfaceCreateOrUpdateDeserialize(
  result:
    | TrafficControllerInterfaceCreateOrUpdate200Response
    | TrafficControllerInterfaceCreateOrUpdate201Response
    | TrafficControllerInterfaceCreateOrUpdateDefaultResponse
    | TrafficControllerInterfaceCreateOrUpdateLogicalResponse,
): Promise<TrafficController> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as TrafficControllerInterfaceCreateOrUpdateLogicalResponse;
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
          configurationEndpoints:
            result.body.properties?.["configurationEndpoints"],
          frontends:
            result.body.properties?.["frontends"] === undefined
              ? result.body.properties?.["frontends"]
              : result.body.properties?.["frontends"].map((p) => ({
                  id: p["id"],
                })),
          associations:
            result.body.properties?.["associations"] === undefined
              ? result.body.properties?.["associations"]
              : result.body.properties?.["associations"].map((p) => ({
                  id: p["id"],
                })),
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a TrafficController */
export function trafficControllerInterfaceCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  resource: TrafficController,
  options: TrafficControllerInterfaceCreateOrUpdateOptions = {
    requestOptions: {},
  },
): PollerLike<OperationState<TrafficController>, TrafficController> {
  return getLongRunningPoller(
    context,
    _trafficControllerInterfaceCreateOrUpdateDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _trafficControllerInterfaceCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          trafficControllerName,
          resource,
          options,
        ),
    },
  ) as PollerLike<OperationState<TrafficController>, TrafficController>;
}

export function _trafficControllerInterfaceUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  properties: TrafficControllerUpdate,
  options: TrafficControllerInterfaceUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | TrafficControllerInterfaceUpdate200Response
  | TrafficControllerInterfaceUpdateDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: { tags: properties["tags"] },
    });
}

export async function _trafficControllerInterfaceUpdateDeserialize(
  result:
    | TrafficControllerInterfaceUpdate200Response
    | TrafficControllerInterfaceUpdateDefaultResponse,
): Promise<TrafficController> {
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
          configurationEndpoints:
            result.body.properties?.["configurationEndpoints"],
          frontends:
            result.body.properties?.["frontends"] === undefined
              ? result.body.properties?.["frontends"]
              : result.body.properties?.["frontends"].map((p) => ({
                  id: p["id"],
                })),
          associations:
            result.body.properties?.["associations"] === undefined
              ? result.body.properties?.["associations"]
              : result.body.properties?.["associations"].map((p) => ({
                  id: p["id"],
                })),
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a TrafficController */
export async function trafficControllerInterfaceUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  properties: TrafficControllerUpdate,
  options: TrafficControllerInterfaceUpdateOptions = { requestOptions: {} },
): Promise<TrafficController> {
  const result = await _trafficControllerInterfaceUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    trafficControllerName,
    properties,
    options,
  );
  return _trafficControllerInterfaceUpdateDeserialize(result);
}

export function _trafficControllerInterfaceDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceDeleteOperationOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | TrafficControllerInterfaceDeleteOperation200Response
  | TrafficControllerInterfaceDeleteOperation202Response
  | TrafficControllerInterfaceDeleteOperation204Response
  | TrafficControllerInterfaceDeleteOperationDefaultResponse
  | TrafficControllerInterfaceDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _trafficControllerInterfaceDeleteOperationDeserialize(
  result:
    | TrafficControllerInterfaceDeleteOperation200Response
    | TrafficControllerInterfaceDeleteOperation202Response
    | TrafficControllerInterfaceDeleteOperation204Response
    | TrafficControllerInterfaceDeleteOperationDefaultResponse
    | TrafficControllerInterfaceDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as TrafficControllerInterfaceDeleteLogicalResponse;
  return;
}

/** Delete a TrafficController */
export function trafficControllerInterfaceDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: TrafficControllerInterfaceDeleteOperationOptions = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _trafficControllerInterfaceDeleteOperationDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _trafficControllerInterfaceDeleteOperationSend(
          context,
          subscriptionId,
          resourceGroupName,
          trafficControllerName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _trafficControllerInterfaceListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: TrafficControllerInterfaceListByResourceGroupOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | TrafficControllerInterfaceListByResourceGroup200Response
  | TrafficControllerInterfaceListByResourceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _trafficControllerInterfaceListByResourceGroupDeserialize(
  result:
    | TrafficControllerInterfaceListByResourceGroup200Response
    | TrafficControllerInterfaceListByResourceGroupDefaultResponse,
): Promise<TrafficControllerListResult> {
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
            configurationEndpoints: p.properties?.["configurationEndpoints"],
            frontends:
              p.properties?.["frontends"] === undefined
                ? p.properties?.["frontends"]
                : p.properties?.["frontends"].map((p) => ({ id: p["id"] })),
            associations:
              p.properties?.["associations"] === undefined
                ? p.properties?.["associations"]
                : p.properties?.["associations"].map((p) => ({ id: p["id"] })),
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List TrafficController resources by resource group */
export function trafficControllerInterfaceListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: TrafficControllerInterfaceListByResourceGroupOptions = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<TrafficController> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _trafficControllerInterfaceListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _trafficControllerInterfaceListByResourceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _trafficControllerInterfaceListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: TrafficControllerInterfaceListBySubscriptionOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | TrafficControllerInterfaceListBySubscription200Response
  | TrafficControllerInterfaceListBySubscriptionDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceNetworking/trafficControllers",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _trafficControllerInterfaceListBySubscriptionDeserialize(
  result:
    | TrafficControllerInterfaceListBySubscription200Response
    | TrafficControllerInterfaceListBySubscriptionDefaultResponse,
): Promise<TrafficControllerListResult> {
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
            configurationEndpoints: p.properties?.["configurationEndpoints"],
            frontends:
              p.properties?.["frontends"] === undefined
                ? p.properties?.["frontends"]
                : p.properties?.["frontends"].map((p) => ({ id: p["id"] })),
            associations:
              p.properties?.["associations"] === undefined
                ? p.properties?.["associations"]
                : p.properties?.["associations"].map((p) => ({ id: p["id"] })),
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List TrafficController resources by subscription ID */
export function trafficControllerInterfaceListBySubscription(
  context: Client,
  subscriptionId: string,
  options: TrafficControllerInterfaceListBySubscriptionOptions = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<TrafficController> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _trafficControllerInterfaceListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _trafficControllerInterfaceListBySubscriptionDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
