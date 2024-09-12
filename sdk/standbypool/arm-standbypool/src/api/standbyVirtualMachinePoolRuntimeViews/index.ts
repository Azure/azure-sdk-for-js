// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  StandbyVirtualMachinePoolRuntimeViewResource,
  _StandbyVirtualMachinePoolRuntimeViewResourceListResult,
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
  StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
  StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
} from "../../models/options.js";

export function _standbyVirtualMachinePoolRuntimeViewsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  runtimeView: string,
  options: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}/runtimeViews/{runtimeView}",
      subscriptionId,
      resourceGroupName,
      standbyVirtualMachinePoolName,
      runtimeView,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyVirtualMachinePoolRuntimeViewsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyVirtualMachinePoolRuntimeViewResource> {
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
              zone: p["zone"],
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

/** Get a StandbyVirtualMachinePoolRuntimeViewResource */
export async function standbyVirtualMachinePoolRuntimeViewsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  runtimeView: string,
  options: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<StandbyVirtualMachinePoolRuntimeViewResource> {
  const result = await _standbyVirtualMachinePoolRuntimeViewsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    standbyVirtualMachinePoolName,
    runtimeView,
    options,
  );
  return _standbyVirtualMachinePoolRuntimeViewsGetDeserialize(result);
}

export function _standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}/runtimeViews",
      subscriptionId,
      resourceGroupName,
      standbyVirtualMachinePoolName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyVirtualMachinePoolRuntimeViewResourceListResult> {
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
                    zone: p["zone"],
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

/** List StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource */
export function standbyVirtualMachinePoolRuntimeViewsListByStandbyPool(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyVirtualMachinePoolRuntimeViewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolSend(
        context,
        subscriptionId,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        options,
      ),
    _standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
