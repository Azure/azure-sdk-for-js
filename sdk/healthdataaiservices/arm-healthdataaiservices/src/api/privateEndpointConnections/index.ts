// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  privateEndpointConnectionPropertiesSerializer,
  PrivateEndpointConnectionResource,
  _PrivateEndpointConnectionResourceListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  HealthDataAIServicesContext as Client,
  PrivateEndpointConnectionsCreate200Response,
  PrivateEndpointConnectionsCreate201Response,
  PrivateEndpointConnectionsCreateDefaultResponse,
  PrivateEndpointConnectionsCreateLogicalResponse,
  PrivateEndpointConnectionsDelete202Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeleteDefaultResponse,
  PrivateEndpointConnectionsDeleteLogicalResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetDefaultResponse,
  PrivateEndpointConnectionsListByDeidService200Response,
  PrivateEndpointConnectionsListByDeidServiceDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsListByDeidServiceOptionalParams,
} from "../../models/options.js";

export function _privateEndpointConnectionsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod<
  PrivateEndpointConnectionsGet200Response | PrivateEndpointConnectionsGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
      privateEndpointConnectionName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsGetDeserialize(
  result: PrivateEndpointConnectionsGet200Response | PrivateEndpointConnectionsGetDefaultResponse,
): Promise<PrivateEndpointConnectionResource> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
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
    properties: !result.body.properties
      ? undefined
      : {
          groupIds: result.body.properties?.["groupIds"],
          privateEndpoint: !result.body.properties?.privateEndpoint
            ? undefined
            : { id: result.body.properties?.privateEndpoint?.["id"] },
          privateLinkServiceConnectionState: {
            status: result.body.properties?.privateLinkServiceConnectionState["status"],
            description: result.body.properties?.privateLinkServiceConnectionState["description"],
            actionsRequired:
              result.body.properties?.privateLinkServiceConnectionState["actionsRequired"],
          },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a specific private connection */
export async function privateEndpointConnectionsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnectionResource> {
  const result = await _privateEndpointConnectionsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    deidServiceName,
    privateEndpointConnectionName,
    options,
  );
  return _privateEndpointConnectionsGetDeserialize(result);
}

export function _privateEndpointConnectionsCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: PrivateEndpointConnectionsCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | PrivateEndpointConnectionsCreate200Response
  | PrivateEndpointConnectionsCreate201Response
  | PrivateEndpointConnectionsCreateDefaultResponse
  | PrivateEndpointConnectionsCreateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
      privateEndpointConnectionName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? resource.properties
          : privateEndpointConnectionPropertiesSerializer(resource.properties),
      },
    });
}

export async function _privateEndpointConnectionsCreateDeserialize(
  result:
    | PrivateEndpointConnectionsCreate200Response
    | PrivateEndpointConnectionsCreate201Response
    | PrivateEndpointConnectionsCreateDefaultResponse
    | PrivateEndpointConnectionsCreateLogicalResponse,
): Promise<PrivateEndpointConnectionResource> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  const res = result as unknown as PrivateEndpointConnectionsCreateLogicalResponse;
  return {
    id: res.body["id"],
    name: res.body["name"],
    type: res.body["type"],
    systemData: !res.body.systemData
      ? undefined
      : {
          createdBy: res.body.systemData?.["createdBy"],
          createdByType: res.body.systemData?.["createdByType"],
          createdAt:
            res.body.systemData?.["createdAt"] !== undefined
              ? new Date(res.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: res.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: res.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            res.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(res.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !res.body.properties
      ? undefined
      : {
          groupIds: res.body.properties?.["groupIds"],
          privateEndpoint: !res.body.properties?.privateEndpoint
            ? undefined
            : { id: res.body.properties?.privateEndpoint?.["id"] },
          privateLinkServiceConnectionState: {
            status: res.body.properties?.privateLinkServiceConnectionState["status"],
            description: res.body.properties?.privateLinkServiceConnectionState["description"],
            actionsRequired:
              res.body.properties?.privateLinkServiceConnectionState["actionsRequired"],
          },
          provisioningState: res.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Private endpoint connection */
export function privateEndpointConnectionsCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: PrivateEndpointConnectionsCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PrivateEndpointConnectionResource>,
  PrivateEndpointConnectionResource
> {
  return getLongRunningPoller(context, _privateEndpointConnectionsCreateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _privateEndpointConnectionsCreateSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
  }) as PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
}

export function _privateEndpointConnectionsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | PrivateEndpointConnectionsDelete202Response
  | PrivateEndpointConnectionsDelete204Response
  | PrivateEndpointConnectionsDeleteDefaultResponse
  | PrivateEndpointConnectionsDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
      privateEndpointConnectionName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsDeleteDeserialize(
  result:
    | PrivateEndpointConnectionsDelete202Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteDefaultResponse
    | PrivateEndpointConnectionsDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the private endpoint connection */
export function privateEndpointConnectionsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _privateEndpointConnectionsDeleteDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _privateEndpointConnectionsDeleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        privateEndpointConnectionName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _privateEndpointConnectionsListByDeidServiceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateEndpointConnectionsListByDeidServiceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | PrivateEndpointConnectionsListByDeidService200Response
  | PrivateEndpointConnectionsListByDeidServiceDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsListByDeidServiceDeserialize(
  result:
    | PrivateEndpointConnectionsListByDeidService200Response
    | PrivateEndpointConnectionsListByDeidServiceDefaultResponse,
): Promise<_PrivateEndpointConnectionResourceListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
      return {
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
        properties: !p.properties
          ? undefined
          : {
              groupIds: p.properties?.["groupIds"],
              privateEndpoint: !p.properties?.privateEndpoint
                ? undefined
                : { id: p.properties?.privateEndpoint?.["id"] },
              privateLinkServiceConnectionState: {
                status: p.properties?.privateLinkServiceConnectionState["status"],
                description: p.properties?.privateLinkServiceConnectionState["description"],
                actionsRequired: p.properties?.privateLinkServiceConnectionState["actionsRequired"],
              },
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List private endpoint connections on the given resource */
export function privateEndpointConnectionsListByDeidService(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateEndpointConnectionsListByDeidServiceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnectionResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _privateEndpointConnectionsListByDeidServiceSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        options,
      ),
    _privateEndpointConnectionsListByDeidServiceDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
