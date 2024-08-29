// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  privateEndpointConnectionPropertiesSerializer,
  PrivateEndpointConnectionResource,
  _PrivateEndpointConnectionResourceListResult,
} from "../../models/models.js";
import { DocumentDBContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  PrivateEndpointConnectionsListByMongoClusterOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
} from "../../models/options.js";

export function _privateEndpointConnectionsListByMongoClusterSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: PrivateEndpointConnectionsListByMongoClusterOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsListByMongoClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
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

/** List existing private connections */
export function privateEndpointConnectionsListByMongoCluster(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: PrivateEndpointConnectionsListByMongoClusterOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnectionResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _privateEndpointConnectionsListByMongoClusterSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    _privateEndpointConnectionsListByMongoClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _privateEndpointConnectionsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
      privateEndpointConnectionName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
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
  mongoClusterName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnectionResource> {
  const result = await _privateEndpointConnectionsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    mongoClusterName,
    privateEndpointConnectionName,
    options,
  );
  return _privateEndpointConnectionsGetDeserialize(result);
}

export function _privateEndpointConnectionsCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: PrivateEndpointConnectionsCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
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
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
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

/** Create a Private endpoint connection */
export function privateEndpointConnectionsCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  privateEndpointConnectionName: string,
  resource: PrivateEndpointConnectionResource,
  options: PrivateEndpointConnectionsCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PrivateEndpointConnectionResource>,
  PrivateEndpointConnectionResource
> {
  return getLongRunningPoller(
    context,
    _privateEndpointConnectionsCreateDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _privateEndpointConnectionsCreateSend(
          context,
          subscriptionId,
          resourceGroupName,
          mongoClusterName,
          privateEndpointConnectionName,
          resource,
          options,
        ),
    },
  ) as PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
}

export function _privateEndpointConnectionsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
      privateEndpointConnectionName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateEndpointConnectionsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the private endpoint connection */
export function privateEndpointConnectionsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _privateEndpointConnectionsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _privateEndpointConnectionsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          mongoClusterName,
          privateEndpointConnectionName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}
