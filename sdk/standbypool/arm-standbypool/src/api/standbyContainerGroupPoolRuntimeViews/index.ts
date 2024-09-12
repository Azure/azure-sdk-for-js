// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  StandbyContainerGroupPoolRuntimeViewResource,
  _StandbyContainerGroupPoolRuntimeViewResourceListResult,
} from "../../models/models.js";
import { StandbyPoolContext as Client } from "../index.js";
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
import {
  StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
  StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
} from "../../models/options.js";

export function _standbyContainerGroupPoolRuntimeViewsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  runtimeView: string,
  options: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}/runtimeViews/{runtimeView}",
      subscriptionId,
      resourceGroupName,
      standbyContainerGroupPoolName,
      runtimeView,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyContainerGroupPoolRuntimeViewsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolRuntimeViewResource> {
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
          instanceCountSummary: result.body.properties?.[
            "instanceCountSummary"
          ].map((p: any) => {
            return {
              instanceCountsByState: p["instanceCountsByState"].map(
                (p: any) => {
                  return { state: p["state"], count: p["count"] };
                },
              ),
            };
          }),
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a StandbyContainerGroupPoolRuntimeViewResource */
export async function standbyContainerGroupPoolRuntimeViewsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  runtimeView: string,
  options: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<StandbyContainerGroupPoolRuntimeViewResource> {
  const result = await _standbyContainerGroupPoolRuntimeViewsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    standbyContainerGroupPoolName,
    runtimeView,
    options,
  );
  return _standbyContainerGroupPoolRuntimeViewsGetDeserialize(result);
}

export function _standbyContainerGroupPoolRuntimeViewsListByStandbyPoolSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}/runtimeViews",
      subscriptionId,
      resourceGroupName,
      standbyContainerGroupPoolName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyContainerGroupPoolRuntimeViewsListByStandbyPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyContainerGroupPoolRuntimeViewResourceListResult> {
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
              instanceCountSummary: p.properties?.["instanceCountSummary"].map(
                (p: any) => {
                  return {
                    instanceCountsByState: p["instanceCountsByState"].map(
                      (p: any) => {
                        return { state: p["state"], count: p["count"] };
                      },
                    ),
                  };
                },
              ),
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource */
export function standbyContainerGroupPoolRuntimeViewsListByStandbyPool(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyContainerGroupPoolRuntimeViewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _standbyContainerGroupPoolRuntimeViewsListByStandbyPoolSend(
        context,
        subscriptionId,
        resourceGroupName,
        standbyContainerGroupPoolName,
        options,
      ),
    _standbyContainerGroupPoolRuntimeViewsListByStandbyPoolDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
