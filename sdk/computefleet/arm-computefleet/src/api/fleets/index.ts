// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  fleetPropertiesSerializer,
  managedServiceIdentitySerializer,
  planSerializer,
  managedServiceIdentityUpdateSerializer,
  resourcePlanUpdateSerializer,
  Fleet,
  FleetUpdate,
  VirtualMachineScaleSetListResult,
  _FleetListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureFleetContext as Client,
  CreateOrUpdate200Response,
  CreateOrUpdate201Response,
  CreateOrUpdateDefaultResponse,
  CreateOrUpdateLogicalResponse,
  Delete202Response,
  Delete204Response,
  DeleteDefaultResponse,
  DeleteLogicalResponse,
  Get200Response,
  GetDefaultResponse,
  ListByResourceGroup200Response,
  ListByResourceGroupDefaultResponse,
  ListBySubscription200Response,
  ListBySubscriptionDefaultResponse,
  ListVirtualMachineScaleSets200Response,
  ListVirtualMachineScaleSetsDefaultResponse,
  Update200Response,
  Update202Response,
  UpdateDefaultResponse,
  UpdateLogicalResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  FleetsGetOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod<Get200Response | GetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: Get200Response | GetDefaultResponse,
): Promise<Fleet> {
  if (isUnexpected(result)) {
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
          provisioningState: result.body.properties?.["provisioningState"],
          spotPriorityProfile: !result.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity:
                  result.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity:
                  result.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM:
                  result.body.properties?.spotPriorityProfile?.[
                    "maxPricePerVM"
                  ],
                evictionPolicy:
                  result.body.properties?.spotPriorityProfile?.[
                    "evictionPolicy"
                  ],
                allocationStrategy:
                  result.body.properties?.spotPriorityProfile?.[
                    "allocationStrategy"
                  ],
                maintain:
                  result.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !result.body.properties
            ?.regularPriorityProfile
            ? undefined
            : {
                capacity:
                  result.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity:
                  result.body.properties?.regularPriorityProfile?.[
                    "minCapacity"
                  ],
                allocationStrategy:
                  result.body.properties?.regularPriorityProfile?.[
                    "allocationStrategy"
                  ],
              },
          vmSizesProfile: result.body.properties?.["vmSizesProfile"].map(
            (p) => ({ name: p["name"], rank: p["rank"] }),
          ),
          computeProfile: {
            baseVirtualMachineProfile: {},
            computeApiVersion:
              result.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              result.body.properties?.computeProfile[
                "platformFaultDomainCount"
              ],
          },
        },
    zones: result.body["zones"],
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
    plan: !result.body.plan
      ? undefined
      : {
          name: result.body.plan?.["name"],
          publisher: result.body.plan?.["publisher"],
          product: result.body.plan?.["product"],
          promotionCode: result.body.plan?.["promotionCode"],
          version: result.body.plan?.["version"],
        },
  };
}

/** Get a Fleet */
export async function get(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): Promise<Fleet> {
  const result = await _getSend(
    context,
    subscriptionId,
    resourceGroupName,
    fleetName,
    options,
  );
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | CreateOrUpdate200Response
  | CreateOrUpdate201Response
  | CreateOrUpdateDefaultResponse
  | CreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
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
          : fleetPropertiesSerializer(resource.properties),
        zones: resource["zones"],
        identity: !resource.identity
          ? resource.identity
          : managedServiceIdentitySerializer(resource.identity),
        plan: !resource.plan ? resource.plan : planSerializer(resource.plan),
      },
    });
}

export async function _createOrUpdateDeserialize(
  result:
    | CreateOrUpdate200Response
    | CreateOrUpdate201Response
    | CreateOrUpdateDefaultResponse
    | CreateOrUpdateLogicalResponse,
): Promise<Fleet> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as CreateOrUpdateLogicalResponse;
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
          provisioningState: result.body.properties?.["provisioningState"],
          spotPriorityProfile: !result.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity:
                  result.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity:
                  result.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM:
                  result.body.properties?.spotPriorityProfile?.[
                    "maxPricePerVM"
                  ],
                evictionPolicy:
                  result.body.properties?.spotPriorityProfile?.[
                    "evictionPolicy"
                  ],
                allocationStrategy:
                  result.body.properties?.spotPriorityProfile?.[
                    "allocationStrategy"
                  ],
                maintain:
                  result.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !result.body.properties
            ?.regularPriorityProfile
            ? undefined
            : {
                capacity:
                  result.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity:
                  result.body.properties?.regularPriorityProfile?.[
                    "minCapacity"
                  ],
                allocationStrategy:
                  result.body.properties?.regularPriorityProfile?.[
                    "allocationStrategy"
                  ],
              },
          vmSizesProfile: result.body.properties?.["vmSizesProfile"].map(
            (p) => ({ name: p["name"], rank: p["rank"] }),
          ),
          computeProfile: {
            baseVirtualMachineProfile: {},
            computeApiVersion:
              result.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              result.body.properties?.computeProfile[
                "platformFaultDomainCount"
              ],
          },
        },
    zones: result.body["zones"],
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
    plan: !result.body.plan
      ? undefined
      : {
          name: result.body.plan?.["name"],
          publisher: result.body.plan?.["publisher"],
          product: result.body.plan?.["product"],
          promotionCode: result.body.plan?.["promotionCode"],
          version: result.body.plan?.["version"],
        },
  };
}

/** Create a Fleet */
export function createOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        fleetName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _updateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | Update200Response
  | Update202Response
  | UpdateDefaultResponse
  | UpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags
          ? properties.tags
          : (serializeRecord(properties.tags as any) as any),
        identity: !properties.identity
          ? properties.identity
          : managedServiceIdentityUpdateSerializer(properties.identity),
        plan: !properties.plan
          ? properties.plan
          : resourcePlanUpdateSerializer(properties.plan),
        properties: !properties.properties
          ? properties.properties
          : fleetPropertiesSerializer(properties.properties),
      },
    });
}

export async function _updateDeserialize(
  result:
    | Update200Response
    | Update202Response
    | UpdateDefaultResponse
    | UpdateLogicalResponse,
): Promise<Fleet> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as UpdateLogicalResponse;
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
          provisioningState: result.body.properties?.["provisioningState"],
          spotPriorityProfile: !result.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity:
                  result.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity:
                  result.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM:
                  result.body.properties?.spotPriorityProfile?.[
                    "maxPricePerVM"
                  ],
                evictionPolicy:
                  result.body.properties?.spotPriorityProfile?.[
                    "evictionPolicy"
                  ],
                allocationStrategy:
                  result.body.properties?.spotPriorityProfile?.[
                    "allocationStrategy"
                  ],
                maintain:
                  result.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !result.body.properties
            ?.regularPriorityProfile
            ? undefined
            : {
                capacity:
                  result.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity:
                  result.body.properties?.regularPriorityProfile?.[
                    "minCapacity"
                  ],
                allocationStrategy:
                  result.body.properties?.regularPriorityProfile?.[
                    "allocationStrategy"
                  ],
              },
          vmSizesProfile: result.body.properties?.["vmSizesProfile"].map(
            (p) => ({ name: p["name"], rank: p["rank"] }),
          ),
          computeProfile: {
            baseVirtualMachineProfile: {},
            computeApiVersion:
              result.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              result.body.properties?.computeProfile[
                "platformFaultDomainCount"
              ],
          },
        },
    zones: result.body["zones"],
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
    plan: !result.body.plan
      ? undefined
      : {
          name: result.body.plan?.["name"],
          publisher: result.body.plan?.["publisher"],
          product: result.body.plan?.["product"],
          promotionCode: result.body.plan?.["promotionCode"],
          version: result.body.plan?.["version"],
        },
  };
}

/** Update a Fleet */
export function update(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _updateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        subscriptionId,
        resourceGroupName,
        fleetName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _$deleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | Delete202Response
  | Delete204Response
  | DeleteDefaultResponse
  | DeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(
  result:
    | Delete202Response
    | Delete204Response
    | DeleteDefaultResponse
    | DeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DeleteLogicalResponse;
  return;
}

/** Delete a Fleet */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        fleetName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod<
  ListByResourceGroup200Response | ListByResourceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listByResourceGroupDeserialize(
  result: ListByResourceGroup200Response | ListByResourceGroupDefaultResponse,
): Promise<_FleetListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
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
            provisioningState: p.properties?.["provisioningState"],
            spotPriorityProfile: !p.properties?.spotPriorityProfile
              ? undefined
              : {
                  capacity: p.properties?.spotPriorityProfile?.["capacity"],
                  minCapacity:
                    p.properties?.spotPriorityProfile?.["minCapacity"],
                  maxPricePerVM:
                    p.properties?.spotPriorityProfile?.["maxPricePerVM"],
                  evictionPolicy:
                    p.properties?.spotPriorityProfile?.["evictionPolicy"],
                  allocationStrategy:
                    p.properties?.spotPriorityProfile?.["allocationStrategy"],
                  maintain: p.properties?.spotPriorityProfile?.["maintain"],
                },
            regularPriorityProfile: !p.properties?.regularPriorityProfile
              ? undefined
              : {
                  capacity: p.properties?.regularPriorityProfile?.["capacity"],
                  minCapacity:
                    p.properties?.regularPriorityProfile?.["minCapacity"],
                  allocationStrategy:
                    p.properties?.regularPriorityProfile?.[
                      "allocationStrategy"
                    ],
                },
            vmSizesProfile: p.properties?.["vmSizesProfile"].map((p) => ({
              name: p["name"],
              rank: p["rank"],
            })),
            computeProfile: {
              baseVirtualMachineProfile: {},
              computeApiVersion:
                p.properties?.computeProfile["computeApiVersion"],
              platformFaultDomainCount:
                p.properties?.computeProfile["platformFaultDomainCount"],
            },
          },
      zones: p["zones"],
      identity: !p.identity
        ? undefined
        : {
            principalId: p.identity?.["principalId"],
            tenantId: p.identity?.["tenantId"],
            type: p.identity?.["type"],
            userAssignedIdentities: p.identity?.["userAssignedIdentities"],
          },
      plan: !p.plan
        ? undefined
        : {
            name: p.plan?.["name"],
            publisher: p.plan?.["publisher"],
            product: p.plan?.["product"],
            promotionCode: p.plan?.["promotionCode"],
            version: p.plan?.["version"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Fleet resources by resource group */
export function listByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _listByResourceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod<
  ListBySubscription200Response | ListBySubscriptionDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listBySubscriptionDeserialize(
  result: ListBySubscription200Response | ListBySubscriptionDefaultResponse,
): Promise<_FleetListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
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
            provisioningState: p.properties?.["provisioningState"],
            spotPriorityProfile: !p.properties?.spotPriorityProfile
              ? undefined
              : {
                  capacity: p.properties?.spotPriorityProfile?.["capacity"],
                  minCapacity:
                    p.properties?.spotPriorityProfile?.["minCapacity"],
                  maxPricePerVM:
                    p.properties?.spotPriorityProfile?.["maxPricePerVM"],
                  evictionPolicy:
                    p.properties?.spotPriorityProfile?.["evictionPolicy"],
                  allocationStrategy:
                    p.properties?.spotPriorityProfile?.["allocationStrategy"],
                  maintain: p.properties?.spotPriorityProfile?.["maintain"],
                },
            regularPriorityProfile: !p.properties?.regularPriorityProfile
              ? undefined
              : {
                  capacity: p.properties?.regularPriorityProfile?.["capacity"],
                  minCapacity:
                    p.properties?.regularPriorityProfile?.["minCapacity"],
                  allocationStrategy:
                    p.properties?.regularPriorityProfile?.[
                      "allocationStrategy"
                    ],
                },
            vmSizesProfile: p.properties?.["vmSizesProfile"].map((p) => ({
              name: p["name"],
              rank: p["rank"],
            })),
            computeProfile: {
              baseVirtualMachineProfile: {},
              computeApiVersion:
                p.properties?.computeProfile["computeApiVersion"],
              platformFaultDomainCount:
                p.properties?.computeProfile["platformFaultDomainCount"],
            },
          },
      zones: p["zones"],
      identity: !p.identity
        ? undefined
        : {
            principalId: p.identity?.["principalId"],
            tenantId: p.identity?.["tenantId"],
            type: p.identity?.["type"],
            userAssignedIdentities: p.identity?.["userAssignedIdentities"],
          },
      plan: !p.plan
        ? undefined
        : {
            name: p.plan?.["name"],
            publisher: p.plan?.["publisher"],
            product: p.plan?.["product"],
            promotionCode: p.plan?.["promotionCode"],
            version: p.plan?.["version"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Fleet resources by subscription ID */
export function listBySubscription(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, subscriptionId, options),
    _listBySubscriptionDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listVirtualMachineScaleSetsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  name: string,
  options: FleetsListVirtualMachineScaleSetsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | ListVirtualMachineScaleSets200Response
  | ListVirtualMachineScaleSetsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets",
      subscriptionId,
      resourceGroupName,
      name,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listVirtualMachineScaleSetsDeserialize(
  result:
    | ListVirtualMachineScaleSets200Response
    | ListVirtualMachineScaleSetsDefaultResponse,
): Promise<VirtualMachineScaleSetListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      type: p["type"],
      operationStatus: p["operationStatus"],
      error: !p.error ? undefined : {},
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List VirtualMachineScaleSet resources by Fleet */
export async function listVirtualMachineScaleSets(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  name: string,
  options: FleetsListVirtualMachineScaleSetsOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineScaleSetListResult> {
  const result = await _listVirtualMachineScaleSetsSend(
    context,
    subscriptionId,
    resourceGroupName,
    name,
    options,
  );
  return _listVirtualMachineScaleSetsDeserialize(result);
}
