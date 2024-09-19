// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  standbyVirtualMachinePoolResourcePropertiesSerializer,
  standbyVirtualMachinePoolResourceUpdatePropertiesSerializer,
  StandbyVirtualMachinePoolResource,
  StandbyVirtualMachinePoolResourceUpdate,
  _StandbyVirtualMachinePoolResourceListResult,
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
  StandbyVirtualMachinePoolsGetOptionalParams,
  StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
  StandbyVirtualMachinePoolsDeleteOptionalParams,
  StandbyVirtualMachinePoolsUpdateOptionalParams,
  StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
  StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
} from "../../models/options.js";

export function _standbyVirtualMachinePoolsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}",
      subscriptionId,
      resourceGroupName,
      standbyVirtualMachinePoolName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyVirtualMachinePoolsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyVirtualMachinePoolResource> {
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
          elasticityProfile: !result.body.properties?.elasticityProfile
            ? undefined
            : {
                maxReadyCapacity:
                  result.body.properties?.elasticityProfile?.[
                    "maxReadyCapacity"
                  ],
                minReadyCapacity:
                  result.body.properties?.elasticityProfile?.[
                    "minReadyCapacity"
                  ],
              },
          virtualMachineState: result.body.properties?.["virtualMachineState"],
          attachedVirtualMachineScaleSetId:
            result.body.properties?.["attachedVirtualMachineScaleSetId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a StandbyVirtualMachinePoolResource */
export async function standbyVirtualMachinePoolsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolsGetOptionalParams = { requestOptions: {} },
): Promise<StandbyVirtualMachinePoolResource> {
  const result = await _standbyVirtualMachinePoolsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    standbyVirtualMachinePoolName,
    options,
  );
  return _standbyVirtualMachinePoolsGetDeserialize(result);
}

export function _standbyVirtualMachinePoolsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  resource: StandbyVirtualMachinePoolResource,
  options: StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}",
      subscriptionId,
      resourceGroupName,
      standbyVirtualMachinePoolName,
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
          : standbyVirtualMachinePoolResourcePropertiesSerializer(
              resource.properties,
            ),
      },
    });
}

export async function _standbyVirtualMachinePoolsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyVirtualMachinePoolResource> {
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
          elasticityProfile: !result.body.properties?.elasticityProfile
            ? undefined
            : {
                maxReadyCapacity:
                  result.body.properties?.elasticityProfile?.[
                    "maxReadyCapacity"
                  ],
                minReadyCapacity:
                  result.body.properties?.elasticityProfile?.[
                    "minReadyCapacity"
                  ],
              },
          virtualMachineState: result.body.properties?.["virtualMachineState"],
          attachedVirtualMachineScaleSetId:
            result.body.properties?.["attachedVirtualMachineScaleSetId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a StandbyVirtualMachinePoolResource */
export function standbyVirtualMachinePoolsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  resource: StandbyVirtualMachinePoolResource,
  options: StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<StandbyVirtualMachinePoolResource>,
  StandbyVirtualMachinePoolResource
> {
  return getLongRunningPoller(
    context,
    _standbyVirtualMachinePoolsCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _standbyVirtualMachinePoolsCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          standbyVirtualMachinePoolName,
          resource,
          options,
        ),
    },
  ) as PollerLike<
    OperationState<StandbyVirtualMachinePoolResource>,
    StandbyVirtualMachinePoolResource
  >;
}

export function _standbyVirtualMachinePoolsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}",
      subscriptionId,
      resourceGroupName,
      standbyVirtualMachinePoolName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyVirtualMachinePoolsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a StandbyVirtualMachinePoolResource */
export function standbyVirtualMachinePoolsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _standbyVirtualMachinePoolsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _standbyVirtualMachinePoolsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          standbyVirtualMachinePoolName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _standbyVirtualMachinePoolsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  properties: StandbyVirtualMachinePoolResourceUpdate,
  options: StandbyVirtualMachinePoolsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}",
      subscriptionId,
      resourceGroupName,
      standbyVirtualMachinePoolName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags
          ? properties.tags
          : (serializeRecord(properties.tags as any) as any),
        properties: !properties.properties
          ? properties.properties
          : standbyVirtualMachinePoolResourceUpdatePropertiesSerializer(
              properties.properties,
            ),
      },
    });
}

export async function _standbyVirtualMachinePoolsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyVirtualMachinePoolResource> {
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
          elasticityProfile: !result.body.properties?.elasticityProfile
            ? undefined
            : {
                maxReadyCapacity:
                  result.body.properties?.elasticityProfile?.[
                    "maxReadyCapacity"
                  ],
                minReadyCapacity:
                  result.body.properties?.elasticityProfile?.[
                    "minReadyCapacity"
                  ],
              },
          virtualMachineState: result.body.properties?.["virtualMachineState"],
          attachedVirtualMachineScaleSetId:
            result.body.properties?.["attachedVirtualMachineScaleSetId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a StandbyVirtualMachinePoolResource */
export async function standbyVirtualMachinePoolsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  properties: StandbyVirtualMachinePoolResourceUpdate,
  options: StandbyVirtualMachinePoolsUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<StandbyVirtualMachinePoolResource> {
  const result = await _standbyVirtualMachinePoolsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    standbyVirtualMachinePoolName,
    properties,
    options,
  );
  return _standbyVirtualMachinePoolsUpdateDeserialize(result);
}

export function _standbyVirtualMachinePoolsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: StandbyVirtualMachinePoolsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyVirtualMachinePoolsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyVirtualMachinePoolResourceListResult> {
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
              elasticityProfile: !p.properties?.elasticityProfile
                ? undefined
                : {
                    maxReadyCapacity:
                      p.properties?.elasticityProfile?.["maxReadyCapacity"],
                    minReadyCapacity:
                      p.properties?.elasticityProfile?.["minReadyCapacity"],
                  },
              virtualMachineState: p.properties?.["virtualMachineState"],
              attachedVirtualMachineScaleSetId:
                p.properties?.["attachedVirtualMachineScaleSetId"],
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List StandbyVirtualMachinePoolResource resources by resource group */
export function standbyVirtualMachinePoolsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: StandbyVirtualMachinePoolsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _standbyVirtualMachinePoolsListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _standbyVirtualMachinePoolsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _standbyVirtualMachinePoolsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: StandbyVirtualMachinePoolsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _standbyVirtualMachinePoolsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyVirtualMachinePoolResourceListResult> {
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
              elasticityProfile: !p.properties?.elasticityProfile
                ? undefined
                : {
                    maxReadyCapacity:
                      p.properties?.elasticityProfile?.["maxReadyCapacity"],
                    minReadyCapacity:
                      p.properties?.elasticityProfile?.["minReadyCapacity"],
                  },
              virtualMachineState: p.properties?.["virtualMachineState"],
              attachedVirtualMachineScaleSetId:
                p.properties?.["attachedVirtualMachineScaleSetId"],
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List StandbyVirtualMachinePoolResource resources by subscription ID */
export function standbyVirtualMachinePoolsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: StandbyVirtualMachinePoolsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _standbyVirtualMachinePoolsListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _standbyVirtualMachinePoolsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
