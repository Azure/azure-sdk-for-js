// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  standbyContainerGroupPoolResourcePropertiesSerializer,
  standbyContainerGroupPoolResourceUpdatePropertiesSerializer,
  StandbyContainerGroupPoolResource,
  StandbyContainerGroupPoolResourceUpdate,
  _StandbyContainerGroupPoolResourceListResult,
} from "../../models/models.js";
import { StandbyPoolContext as Client } from "../index.js";
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
  StandbyContainerGroupPoolsGetOptionalParams,
  StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
  StandbyContainerGroupPoolsDeleteOptionalParams,
  StandbyContainerGroupPoolsUpdateOptionalParams,
  StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
} from "../../models/options.js";

export function _standbyContainerGroupPoolsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}",
      subscriptionId,
      resourceGroupName,
      standbyContainerGroupPoolName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyContainerGroupPoolsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolResource> {
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
    properties: !result.body.properties
      ? undefined
      : {
          elasticityProfile: {
            maxReadyCapacity:
              result.body.properties?.elasticityProfile["maxReadyCapacity"],
            refillPolicy:
              result.body.properties?.elasticityProfile["refillPolicy"],
          },
          containerGroupProperties: {
            containerGroupProfile: {
              id: result.body.properties?.containerGroupProperties
                .containerGroupProfile["id"],
              revision:
                result.body.properties?.containerGroupProperties
                  .containerGroupProfile["revision"],
            },
            subnetIds:
              result.body.properties?.containerGroupProperties["subnetIds"] ===
              undefined
                ? result.body.properties?.containerGroupProperties["subnetIds"]
                : result.body.properties?.containerGroupProperties[
                    "subnetIds"
                  ].map((p: any) => {
                    return { id: p["id"] };
                  }),
          },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a StandbyContainerGroupPoolResource */
export async function standbyContainerGroupPoolsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsGetOptionalParams = { requestOptions: {} },
): Promise<StandbyContainerGroupPoolResource> {
  const result = await _standbyContainerGroupPoolsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    standbyContainerGroupPoolName,
    options,
  );
  return _standbyContainerGroupPoolsGetDeserialize(result);
}

export function _standbyContainerGroupPoolsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  resource: StandbyContainerGroupPoolResource,
  options: StandbyContainerGroupPoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}",
      subscriptionId,
      resourceGroupName,
      standbyContainerGroupPoolName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !resource.tags
          ? resource.tags
          : (serializeRecord(resource.tags as any) as any),
        location: resource["location"],
        properties: !resource.properties
          ? resource.properties
          : standbyContainerGroupPoolResourcePropertiesSerializer(
              resource.properties,
            ),
      },
    });
}

export async function _standbyContainerGroupPoolsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolResource> {
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
    properties: !result.body.properties
      ? undefined
      : {
          elasticityProfile: {
            maxReadyCapacity:
              result.body.properties?.elasticityProfile["maxReadyCapacity"],
            refillPolicy:
              result.body.properties?.elasticityProfile["refillPolicy"],
          },
          containerGroupProperties: {
            containerGroupProfile: {
              id: result.body.properties?.containerGroupProperties
                .containerGroupProfile["id"],
              revision:
                result.body.properties?.containerGroupProperties
                  .containerGroupProfile["revision"],
            },
            subnetIds:
              result.body.properties?.containerGroupProperties["subnetIds"] ===
              undefined
                ? result.body.properties?.containerGroupProperties["subnetIds"]
                : result.body.properties?.containerGroupProperties[
                    "subnetIds"
                  ].map((p: any) => {
                    return { id: p["id"] };
                  }),
          },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a StandbyContainerGroupPoolResource */
export function standbyContainerGroupPoolsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  resource: StandbyContainerGroupPoolResource,
  options: StandbyContainerGroupPoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<StandbyContainerGroupPoolResource>,
  StandbyContainerGroupPoolResource
> {
  return getLongRunningPoller(
    context,
    _standbyContainerGroupPoolsCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _standbyContainerGroupPoolsCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          standbyContainerGroupPoolName,
          resource,
          options,
        ),
    },
  ) as PollerLike<
    OperationState<StandbyContainerGroupPoolResource>,
    StandbyContainerGroupPoolResource
  >;
}

export function _standbyContainerGroupPoolsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}",
      subscriptionId,
      resourceGroupName,
      standbyContainerGroupPoolName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyContainerGroupPoolsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a StandbyContainerGroupPoolResource */
export function standbyContainerGroupPoolsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _standbyContainerGroupPoolsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _standbyContainerGroupPoolsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          standbyContainerGroupPoolName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _standbyContainerGroupPoolsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  properties: StandbyContainerGroupPoolResourceUpdate,
  options: StandbyContainerGroupPoolsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}",
      subscriptionId,
      resourceGroupName,
      standbyContainerGroupPoolName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags
          ? properties.tags
          : (serializeRecord(properties.tags as any) as any),
        properties: !properties.properties
          ? properties.properties
          : standbyContainerGroupPoolResourceUpdatePropertiesSerializer(
              properties.properties,
            ),
      },
    });
}

export async function _standbyContainerGroupPoolsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolResource> {
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
    properties: !result.body.properties
      ? undefined
      : {
          elasticityProfile: {
            maxReadyCapacity:
              result.body.properties?.elasticityProfile["maxReadyCapacity"],
            refillPolicy:
              result.body.properties?.elasticityProfile["refillPolicy"],
          },
          containerGroupProperties: {
            containerGroupProfile: {
              id: result.body.properties?.containerGroupProperties
                .containerGroupProfile["id"],
              revision:
                result.body.properties?.containerGroupProperties
                  .containerGroupProfile["revision"],
            },
            subnetIds:
              result.body.properties?.containerGroupProperties["subnetIds"] ===
              undefined
                ? result.body.properties?.containerGroupProperties["subnetIds"]
                : result.body.properties?.containerGroupProperties[
                    "subnetIds"
                  ].map((p: any) => {
                    return { id: p["id"] };
                  }),
          },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a StandbyContainerGroupPoolResource */
export async function standbyContainerGroupPoolsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  properties: StandbyContainerGroupPoolResourceUpdate,
  options: StandbyContainerGroupPoolsUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<StandbyContainerGroupPoolResource> {
  const result = await _standbyContainerGroupPoolsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    standbyContainerGroupPoolName,
    properties,
    options,
  );
  return _standbyContainerGroupPoolsUpdateDeserialize(result);
}

export function _standbyContainerGroupPoolsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: StandbyContainerGroupPoolsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyContainerGroupPoolsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyContainerGroupPoolResourceListResult> {
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
        properties: !p.properties
          ? undefined
          : {
              elasticityProfile: {
                maxReadyCapacity:
                  p.properties?.elasticityProfile["maxReadyCapacity"],
                refillPolicy: p.properties?.elasticityProfile["refillPolicy"],
              },
              containerGroupProperties: {
                containerGroupProfile: {
                  id: p.properties?.containerGroupProperties
                    .containerGroupProfile["id"],
                  revision:
                    p.properties?.containerGroupProperties
                      .containerGroupProfile["revision"],
                },
                subnetIds:
                  p.properties?.containerGroupProperties["subnetIds"] ===
                  undefined
                    ? p.properties?.containerGroupProperties["subnetIds"]
                    : p.properties?.containerGroupProperties["subnetIds"].map(
                        (p: any) => {
                          return { id: p["id"] };
                        },
                      ),
              },
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List StandbyContainerGroupPoolResource resources by resource group */
export function standbyContainerGroupPoolsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: StandbyContainerGroupPoolsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyContainerGroupPoolResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _standbyContainerGroupPoolsListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _standbyContainerGroupPoolsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _standbyContainerGroupPoolsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: StandbyContainerGroupPoolsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.StandbyPool/standbyContainerGroupPools",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyContainerGroupPoolsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyContainerGroupPoolResourceListResult> {
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
        properties: !p.properties
          ? undefined
          : {
              elasticityProfile: {
                maxReadyCapacity:
                  p.properties?.elasticityProfile["maxReadyCapacity"],
                refillPolicy: p.properties?.elasticityProfile["refillPolicy"],
              },
              containerGroupProperties: {
                containerGroupProfile: {
                  id: p.properties?.containerGroupProperties
                    .containerGroupProfile["id"],
                  revision:
                    p.properties?.containerGroupProperties
                      .containerGroupProfile["revision"],
                },
                subnetIds:
                  p.properties?.containerGroupProperties["subnetIds"] ===
                  undefined
                    ? p.properties?.containerGroupProperties["subnetIds"]
                    : p.properties?.containerGroupProperties["subnetIds"].map(
                        (p: any) => {
                          return { id: p["id"] };
                        },
                      ),
              },
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List StandbyContainerGroupPoolResource resources by subscription ID */
export function standbyContainerGroupPoolsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: StandbyContainerGroupPoolsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyContainerGroupPoolResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _standbyContainerGroupPoolsListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _standbyContainerGroupPoolsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
