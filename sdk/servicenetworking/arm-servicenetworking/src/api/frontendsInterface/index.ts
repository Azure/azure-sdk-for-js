// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  Frontend,
  FrontendUpdate,
  FrontendListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  FrontendsInterfaceCreateOrUpdate200Response,
  FrontendsInterfaceCreateOrUpdate201Response,
  FrontendsInterfaceCreateOrUpdateDefaultResponse,
  FrontendsInterfaceCreateOrUpdateLogicalResponse,
  FrontendsInterfaceDeleteLogicalResponse,
  FrontendsInterfaceDeleteOperation200Response,
  FrontendsInterfaceDeleteOperation202Response,
  FrontendsInterfaceDeleteOperation204Response,
  FrontendsInterfaceDeleteOperationDefaultResponse,
  FrontendsInterfaceGet200Response,
  FrontendsInterfaceGetDefaultResponse,
  FrontendsInterfaceListByTrafficController200Response,
  FrontendsInterfaceListByTrafficControllerDefaultResponse,
  FrontendsInterfaceUpdate200Response,
  FrontendsInterfaceUpdateDefaultResponse,
  isUnexpected,
  ServiceNetworkingContext as Client,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  FrontendsInterfaceGetOptions,
  FrontendsInterfaceCreateOrUpdateOptions,
  FrontendsInterfaceUpdateOptions,
  FrontendsInterfaceDeleteOperationOptions,
  FrontendsInterfaceListByTrafficControllerOptions,
} from "../../models/options.js";

export function _frontendsInterfaceGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceGetOptions = { requestOptions: {} },
): StreamableMethod<
  FrontendsInterfaceGet200Response | FrontendsInterfaceGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _frontendsInterfaceGetDeserialize(
  result:
    | FrontendsInterfaceGet200Response
    | FrontendsInterfaceGetDefaultResponse,
): Promise<Frontend> {
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
          fqdn: result.body.properties?.["fqdn"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Frontend */
export async function frontendsInterfaceGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceGetOptions = { requestOptions: {} },
): Promise<Frontend> {
  const result = await _frontendsInterfaceGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    trafficControllerName,
    frontendName,
    options,
  );
  return _frontendsInterfaceGetDeserialize(result);
}

export function _frontendsInterfaceCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  resource: Frontend,
  options: FrontendsInterfaceCreateOrUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | FrontendsInterfaceCreateOrUpdate200Response
  | FrontendsInterfaceCreateOrUpdate201Response
  | FrontendsInterfaceCreateOrUpdateDefaultResponse
  | FrontendsInterfaceCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
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

export async function _frontendsInterfaceCreateOrUpdateDeserialize(
  result:
    | FrontendsInterfaceCreateOrUpdate200Response
    | FrontendsInterfaceCreateOrUpdate201Response
    | FrontendsInterfaceCreateOrUpdateDefaultResponse
    | FrontendsInterfaceCreateOrUpdateLogicalResponse,
): Promise<Frontend> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as FrontendsInterfaceCreateOrUpdateLogicalResponse;
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
          fqdn: result.body.properties?.["fqdn"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Frontend */
export function frontendsInterfaceCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  resource: Frontend,
  options: FrontendsInterfaceCreateOrUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<Frontend>, Frontend> {
  return getLongRunningPoller(
    context,
    _frontendsInterfaceCreateOrUpdateDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _frontendsInterfaceCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          trafficControllerName,
          frontendName,
          resource,
          options,
        ),
    },
  ) as PollerLike<OperationState<Frontend>, Frontend>;
}

export function _frontendsInterfaceUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  properties: FrontendUpdate,
  options: FrontendsInterfaceUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  FrontendsInterfaceUpdate200Response | FrontendsInterfaceUpdateDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: { tags: properties["tags"] },
    });
}

export async function _frontendsInterfaceUpdateDeserialize(
  result:
    | FrontendsInterfaceUpdate200Response
    | FrontendsInterfaceUpdateDefaultResponse,
): Promise<Frontend> {
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
          fqdn: result.body.properties?.["fqdn"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a Frontend */
export async function frontendsInterfaceUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  properties: FrontendUpdate,
  options: FrontendsInterfaceUpdateOptions = { requestOptions: {} },
): Promise<Frontend> {
  const result = await _frontendsInterfaceUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    trafficControllerName,
    frontendName,
    properties,
    options,
  );
  return _frontendsInterfaceUpdateDeserialize(result);
}

export function _frontendsInterfaceDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | FrontendsInterfaceDeleteOperation200Response
  | FrontendsInterfaceDeleteOperation202Response
  | FrontendsInterfaceDeleteOperation204Response
  | FrontendsInterfaceDeleteOperationDefaultResponse
  | FrontendsInterfaceDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends/{frontendName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      frontendName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _frontendsInterfaceDeleteOperationDeserialize(
  result:
    | FrontendsInterfaceDeleteOperation200Response
    | FrontendsInterfaceDeleteOperation202Response
    | FrontendsInterfaceDeleteOperation204Response
    | FrontendsInterfaceDeleteOperationDefaultResponse
    | FrontendsInterfaceDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as FrontendsInterfaceDeleteLogicalResponse;
  return;
}

/** Delete a Frontend */
export function frontendsInterfaceDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  frontendName: string,
  options: FrontendsInterfaceDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _frontendsInterfaceDeleteOperationDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _frontendsInterfaceDeleteOperationSend(
          context,
          subscriptionId,
          resourceGroupName,
          trafficControllerName,
          frontendName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _frontendsInterfaceListByTrafficControllerSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: FrontendsInterfaceListByTrafficControllerOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | FrontendsInterfaceListByTrafficController200Response
  | FrontendsInterfaceListByTrafficControllerDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/frontends",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _frontendsInterfaceListByTrafficControllerDeserialize(
  result:
    | FrontendsInterfaceListByTrafficController200Response
    | FrontendsInterfaceListByTrafficControllerDefaultResponse,
): Promise<FrontendListResult> {
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
            fqdn: p.properties?.["fqdn"],
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Frontend resources by TrafficController */
export function frontendsInterfaceListByTrafficController(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: FrontendsInterfaceListByTrafficControllerOptions = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Frontend> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _frontendsInterfaceListByTrafficControllerSend(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    _frontendsInterfaceListByTrafficControllerDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
