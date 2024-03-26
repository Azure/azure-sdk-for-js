// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  Association,
  AssociationUpdate,
  AssociationListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  AssociationsInterfaceCreateOrUpdate200Response,
  AssociationsInterfaceCreateOrUpdate201Response,
  AssociationsInterfaceCreateOrUpdateDefaultResponse,
  AssociationsInterfaceCreateOrUpdateLogicalResponse,
  AssociationsInterfaceDeleteLogicalResponse,
  AssociationsInterfaceDeleteOperation200Response,
  AssociationsInterfaceDeleteOperation202Response,
  AssociationsInterfaceDeleteOperation204Response,
  AssociationsInterfaceDeleteOperationDefaultResponse,
  AssociationsInterfaceGet200Response,
  AssociationsInterfaceGetDefaultResponse,
  AssociationsInterfaceListByTrafficController200Response,
  AssociationsInterfaceListByTrafficControllerDefaultResponse,
  AssociationsInterfaceUpdate200Response,
  AssociationsInterfaceUpdateDefaultResponse,
  isUnexpected,
  ServiceNetworkingContext as Client,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  AssociationsInterfaceGetOptions,
  AssociationsInterfaceCreateOrUpdateOptions,
  AssociationsInterfaceUpdateOptions,
  AssociationsInterfaceDeleteOperationOptions,
  AssociationsInterfaceListByTrafficControllerOptions,
} from "../../models/options.js";

export function _associationsInterfaceGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceGetOptions = { requestOptions: {} },
): StreamableMethod<
  AssociationsInterfaceGet200Response | AssociationsInterfaceGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _associationsInterfaceGetDeserialize(
  result:
    | AssociationsInterfaceGet200Response
    | AssociationsInterfaceGetDefaultResponse,
): Promise<Association> {
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
          associationType: result.body.properties?.["associationType"],
          subnet: !result.body.properties?.subnet
            ? undefined
            : { id: result.body.properties?.subnet?.["id"] },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Association */
export async function associationsInterfaceGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceGetOptions = { requestOptions: {} },
): Promise<Association> {
  const result = await _associationsInterfaceGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    trafficControllerName,
    associationName,
    options,
  );
  return _associationsInterfaceGetDeserialize(result);
}

export function _associationsInterfaceCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  resource: Association,
  options: AssociationsInterfaceCreateOrUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | AssociationsInterfaceCreateOrUpdate200Response
  | AssociationsInterfaceCreateOrUpdate201Response
  | AssociationsInterfaceCreateOrUpdateDefaultResponse
  | AssociationsInterfaceCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        location: resource["location"],
        tags: resource["tags"],
        properties: !resource.properties
          ? undefined
          : {
              associationType: resource.properties?.["associationType"],
              subnet: !resource.properties?.subnet
                ? undefined
                : { id: resource.properties?.subnet?.["id"] },
            },
      },
    });
}

export async function _associationsInterfaceCreateOrUpdateDeserialize(
  result:
    | AssociationsInterfaceCreateOrUpdate200Response
    | AssociationsInterfaceCreateOrUpdate201Response
    | AssociationsInterfaceCreateOrUpdateDefaultResponse
    | AssociationsInterfaceCreateOrUpdateLogicalResponse,
): Promise<Association> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as AssociationsInterfaceCreateOrUpdateLogicalResponse;
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
          associationType: result.body.properties?.["associationType"],
          subnet: !result.body.properties?.subnet
            ? undefined
            : { id: result.body.properties?.subnet?.["id"] },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Association */
export function associationsInterfaceCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  resource: Association,
  options: AssociationsInterfaceCreateOrUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<Association>, Association> {
  return getLongRunningPoller(
    context,
    _associationsInterfaceCreateOrUpdateDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _associationsInterfaceCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          trafficControllerName,
          associationName,
          resource,
          options,
        ),
    },
  ) as PollerLike<OperationState<Association>, Association>;
}

export function _associationsInterfaceUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  properties: AssociationUpdate,
  options: AssociationsInterfaceUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | AssociationsInterfaceUpdate200Response
  | AssociationsInterfaceUpdateDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: properties["tags"],
        properties: !properties.properties
          ? undefined
          : {
              associationType: properties.properties?.["associationType"],
              subnet: !properties.properties?.subnet
                ? undefined
                : { id: properties.properties?.subnet?.["id"] },
            },
      },
    });
}

export async function _associationsInterfaceUpdateDeserialize(
  result:
    | AssociationsInterfaceUpdate200Response
    | AssociationsInterfaceUpdateDefaultResponse,
): Promise<Association> {
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
          associationType: result.body.properties?.["associationType"],
          subnet: !result.body.properties?.subnet
            ? undefined
            : { id: result.body.properties?.subnet?.["id"] },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a Association */
export async function associationsInterfaceUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  properties: AssociationUpdate,
  options: AssociationsInterfaceUpdateOptions = { requestOptions: {} },
): Promise<Association> {
  const result = await _associationsInterfaceUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    trafficControllerName,
    associationName,
    properties,
    options,
  );
  return _associationsInterfaceUpdateDeserialize(result);
}

export function _associationsInterfaceDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | AssociationsInterfaceDeleteOperation200Response
  | AssociationsInterfaceDeleteOperation202Response
  | AssociationsInterfaceDeleteOperation204Response
  | AssociationsInterfaceDeleteOperationDefaultResponse
  | AssociationsInterfaceDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations/{associationName}",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
      associationName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _associationsInterfaceDeleteOperationDeserialize(
  result:
    | AssociationsInterfaceDeleteOperation200Response
    | AssociationsInterfaceDeleteOperation202Response
    | AssociationsInterfaceDeleteOperation204Response
    | AssociationsInterfaceDeleteOperationDefaultResponse
    | AssociationsInterfaceDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as AssociationsInterfaceDeleteLogicalResponse;
  return;
}

/** Delete a Association */
export function associationsInterfaceDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  associationName: string,
  options: AssociationsInterfaceDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _associationsInterfaceDeleteOperationDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _associationsInterfaceDeleteOperationSend(
          context,
          subscriptionId,
          resourceGroupName,
          trafficControllerName,
          associationName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _associationsInterfaceListByTrafficControllerSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: AssociationsInterfaceListByTrafficControllerOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | AssociationsInterfaceListByTrafficController200Response
  | AssociationsInterfaceListByTrafficControllerDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/associations",
      subscriptionId,
      resourceGroupName,
      trafficControllerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _associationsInterfaceListByTrafficControllerDeserialize(
  result:
    | AssociationsInterfaceListByTrafficController200Response
    | AssociationsInterfaceListByTrafficControllerDefaultResponse,
): Promise<AssociationListResult> {
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
            associationType: p.properties?.["associationType"],
            subnet: !p.properties?.subnet
              ? undefined
              : { id: p.properties?.subnet?.["id"] },
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Association resources by TrafficController */
export function associationsInterfaceListByTrafficController(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  trafficControllerName: string,
  options: AssociationsInterfaceListByTrafficControllerOptions = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Association> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _associationsInterfaceListByTrafficControllerSend(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    _associationsInterfaceListByTrafficControllerDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
