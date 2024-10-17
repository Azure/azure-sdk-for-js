// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  sAPVirtualInstancePropertiesSerializer,
  managedServiceIdentitySerializer,
  updateSAPVirtualInstancePropertiesSerializer,
  StartRequest,
  OperationStatusResult,
  StopRequest,
  SAPVirtualInstance,
  UpdateSAPVirtualInstanceRequest,
  SAPSizingRecommendationRequest,
  SAPSupportedSkusRequest,
  SAPSupportedResourceSkusResult,
  SAPDiskConfigurationsRequest,
  SAPDiskConfigurationsResult,
  SAPAvailabilityZoneDetailsRequest,
  SAPAvailabilityZoneDetailsResult,
  SAPSizingRecommendationResultUnion,
  _SAPVirtualInstanceListResult,
} from "../../models/models.js";
import { WorkloadsContext as Client } from "../index.js";
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
  SAPVirtualInstancesGetOptionalParams,
  SAPVirtualInstancesCreateOptionalParams,
  SAPVirtualInstancesUpdateOptionalParams,
  SAPVirtualInstancesDeleteOptionalParams,
  SAPVirtualInstancesListByResourceGroupOptionalParams,
  SAPVirtualInstancesListBySubscriptionOptionalParams,
  SAPVirtualInstancesStartOptionalParams,
  SAPVirtualInstancesStopOptionalParams,
  SAPVirtualInstancesGetSizingRecommendationsOptionalParams,
  SAPVirtualInstancesGetSapSupportedSkuOptionalParams,
  SAPVirtualInstancesGetDiskConfigurationsOptionalParams,
  SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams,
} from "../../models/options.js";

export function _sAPVirtualInstancesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
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
          environment: result.body.properties?.["environment"],
          sapProduct: result.body.properties?.["sapProduct"],
          managedResourcesNetworkAccessType:
            result.body.properties?.["managedResourcesNetworkAccessType"],
          configuration: {
            configurationType:
              result.body.properties?.configuration["configurationType"],
          },
          managedResourceGroupConfiguration: !result.body.properties
            ?.managedResourceGroupConfiguration
            ? undefined
            : {
                name: result.body.properties
                  ?.managedResourceGroupConfiguration?.["name"],
              },
          status: result.body.properties?.["status"],
          health: result.body.properties?.["health"],
          state: result.body.properties?.["state"],
          provisioningState: result.body.properties?.["provisioningState"],
          errors: !result.body.properties?.errors
            ? undefined
            : {
                properties: !result.body.properties?.errors?.properties
                  ? undefined
                  : {
                      code: result.body.properties?.errors?.properties?.[
                        "code"
                      ],
                      message:
                        result.body.properties?.errors?.properties?.["message"],
                      details:
                        result.body.properties?.errors?.properties?.[
                          "details"
                        ] === undefined
                          ? result.body.properties?.errors?.properties?.[
                              "details"
                            ]
                          : result.body.properties?.errors?.properties?.[
                              "details"
                            ].map((p: any) => {
                              return {
                                code: p["code"],
                                message: p["message"],
                                details: !p.details ? undefined : p.details,
                              };
                            }),
                    },
              },
        },
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Gets a Virtual Instance for SAP solutions resource */
export async function sAPVirtualInstancesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesGetOptionalParams = { requestOptions: {} },
): Promise<SAPVirtualInstance> {
  const result = await _sAPVirtualInstancesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  return _sAPVirtualInstancesGetDeserialize(result);
}

export function _sAPVirtualInstancesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  resource: SAPVirtualInstance,
  options: SAPVirtualInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
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
          : sAPVirtualInstancePropertiesSerializer(resource.properties),
        identity: !resource.identity
          ? resource.identity
          : managedServiceIdentitySerializer(resource.identity),
      },
    });
}

export async function _sAPVirtualInstancesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
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
          environment: result.body.properties?.["environment"],
          sapProduct: result.body.properties?.["sapProduct"],
          managedResourcesNetworkAccessType:
            result.body.properties?.["managedResourcesNetworkAccessType"],
          configuration: {
            configurationType:
              result.body.properties?.configuration["configurationType"],
          },
          managedResourceGroupConfiguration: !result.body.properties
            ?.managedResourceGroupConfiguration
            ? undefined
            : {
                name: result.body.properties
                  ?.managedResourceGroupConfiguration?.["name"],
              },
          status: result.body.properties?.["status"],
          health: result.body.properties?.["health"],
          state: result.body.properties?.["state"],
          provisioningState: result.body.properties?.["provisioningState"],
          errors: !result.body.properties?.errors
            ? undefined
            : {
                properties: !result.body.properties?.errors?.properties
                  ? undefined
                  : {
                      code: result.body.properties?.errors?.properties?.[
                        "code"
                      ],
                      message:
                        result.body.properties?.errors?.properties?.["message"],
                      details:
                        result.body.properties?.errors?.properties?.[
                          "details"
                        ] === undefined
                          ? result.body.properties?.errors?.properties?.[
                              "details"
                            ]
                          : result.body.properties?.errors?.properties?.[
                              "details"
                            ].map((p: any) => {
                              return {
                                code: p["code"],
                                message: p["message"],
                                details: !p.details ? undefined : p.details,
                              };
                            }),
                    },
              },
        },
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Creates a Virtual Instance for SAP solutions (VIS) resource */
export function sAPVirtualInstancesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  resource: SAPVirtualInstance,
  options: SAPVirtualInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance> {
  return getLongRunningPoller(
    context,
    _sAPVirtualInstancesCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPVirtualInstancesCreateSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
}

export function _sAPVirtualInstancesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  properties: UpdateSAPVirtualInstanceRequest,
  options: SAPVirtualInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags
          ? properties.tags
          : (serializeRecord(properties.tags as any) as any),
        identity: !properties.identity
          ? properties.identity
          : managedServiceIdentitySerializer(properties.identity),
        properties: !properties.properties
          ? properties.properties
          : updateSAPVirtualInstancePropertiesSerializer(properties.properties),
      },
    });
}

export async function _sAPVirtualInstancesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
  const expectedStatuses = ["200", "202"];
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
          environment: result.body.properties?.["environment"],
          sapProduct: result.body.properties?.["sapProduct"],
          managedResourcesNetworkAccessType:
            result.body.properties?.["managedResourcesNetworkAccessType"],
          configuration: {
            configurationType:
              result.body.properties?.configuration["configurationType"],
          },
          managedResourceGroupConfiguration: !result.body.properties
            ?.managedResourceGroupConfiguration
            ? undefined
            : {
                name: result.body.properties
                  ?.managedResourceGroupConfiguration?.["name"],
              },
          status: result.body.properties?.["status"],
          health: result.body.properties?.["health"],
          state: result.body.properties?.["state"],
          provisioningState: result.body.properties?.["provisioningState"],
          errors: !result.body.properties?.errors
            ? undefined
            : {
                properties: !result.body.properties?.errors?.properties
                  ? undefined
                  : {
                      code: result.body.properties?.errors?.properties?.[
                        "code"
                      ],
                      message:
                        result.body.properties?.errors?.properties?.["message"],
                      details:
                        result.body.properties?.errors?.properties?.[
                          "details"
                        ] === undefined
                          ? result.body.properties?.errors?.properties?.[
                              "details"
                            ]
                          : result.body.properties?.errors?.properties?.[
                              "details"
                            ].map((p: any) => {
                              return {
                                code: p["code"],
                                message: p["message"],
                                details: !p.details ? undefined : p.details,
                              };
                            }),
                    },
              },
        },
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Updates a Virtual Instance for SAP solutions resource */
export function sAPVirtualInstancesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  properties: UpdateSAPVirtualInstanceRequest,
  options: SAPVirtualInstancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance> {
  return getLongRunningPoller(
    context,
    _sAPVirtualInstancesUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPVirtualInstancesUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
}

export function _sAPVirtualInstancesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance. */
export function sAPVirtualInstancesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _sAPVirtualInstancesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPVirtualInstancesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _sAPVirtualInstancesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SAPVirtualInstancesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPVirtualInstanceListResult> {
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
              environment: p.properties?.["environment"],
              sapProduct: p.properties?.["sapProduct"],
              managedResourcesNetworkAccessType:
                p.properties?.["managedResourcesNetworkAccessType"],
              configuration: {
                configurationType:
                  p.properties?.configuration["configurationType"],
              },
              managedResourceGroupConfiguration: !p.properties
                ?.managedResourceGroupConfiguration
                ? undefined
                : {
                    name: p.properties?.managedResourceGroupConfiguration?.[
                      "name"
                    ],
                  },
              status: p.properties?.["status"],
              health: p.properties?.["health"],
              state: p.properties?.["state"],
              provisioningState: p.properties?.["provisioningState"],
              errors: !p.properties?.errors
                ? undefined
                : {
                    properties: !p.properties?.errors?.properties
                      ? undefined
                      : {
                          code: p.properties?.errors?.properties?.["code"],
                          message:
                            p.properties?.errors?.properties?.["message"],
                          details:
                            p.properties?.errors?.properties?.["details"] ===
                            undefined
                              ? p.properties?.errors?.properties?.["details"]
                              : p.properties?.errors?.properties?.[
                                  "details"
                                ].map((p: any) => {
                                  return {
                                    code: p["code"],
                                    message: p["message"],
                                    details: !p.details ? undefined : p.details,
                                  };
                                }),
                        },
                  },
            },
        identity: !p.identity
          ? undefined
          : {
              principalId: p.identity?.["principalId"],
              tenantId: p.identity?.["tenantId"],
              type: p.identity?.["type"],
              userAssignedIdentities: p.identity?.["userAssignedIdentities"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** Gets all Virtual Instances for SAP solutions resources in a Resource Group. */
export function sAPVirtualInstancesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SAPVirtualInstancesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPVirtualInstance> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _sAPVirtualInstancesListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _sAPVirtualInstancesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sAPVirtualInstancesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: SAPVirtualInstancesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/sapVirtualInstances",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPVirtualInstanceListResult> {
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
              environment: p.properties?.["environment"],
              sapProduct: p.properties?.["sapProduct"],
              managedResourcesNetworkAccessType:
                p.properties?.["managedResourcesNetworkAccessType"],
              configuration: {
                configurationType:
                  p.properties?.configuration["configurationType"],
              },
              managedResourceGroupConfiguration: !p.properties
                ?.managedResourceGroupConfiguration
                ? undefined
                : {
                    name: p.properties?.managedResourceGroupConfiguration?.[
                      "name"
                    ],
                  },
              status: p.properties?.["status"],
              health: p.properties?.["health"],
              state: p.properties?.["state"],
              provisioningState: p.properties?.["provisioningState"],
              errors: !p.properties?.errors
                ? undefined
                : {
                    properties: !p.properties?.errors?.properties
                      ? undefined
                      : {
                          code: p.properties?.errors?.properties?.["code"],
                          message:
                            p.properties?.errors?.properties?.["message"],
                          details:
                            p.properties?.errors?.properties?.["details"] ===
                            undefined
                              ? p.properties?.errors?.properties?.["details"]
                              : p.properties?.errors?.properties?.[
                                  "details"
                                ].map((p: any) => {
                                  return {
                                    code: p["code"],
                                    message: p["message"],
                                    details: !p.details ? undefined : p.details,
                                  };
                                }),
                        },
                  },
            },
        identity: !p.identity
          ? undefined
          : {
              principalId: p.identity?.["principalId"],
              tenantId: p.identity?.["tenantId"],
              type: p.identity?.["type"],
              userAssignedIdentities: p.identity?.["userAssignedIdentities"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** Gets all Virtual Instances for SAP solutions resources in a Subscription. */
export function sAPVirtualInstancesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: SAPVirtualInstancesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPVirtualInstance> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _sAPVirtualInstancesListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _sAPVirtualInstancesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sAPVirtualInstancesStartSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  body?: StartRequest,
  options: SAPVirtualInstancesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/start",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: body === undefined ? body : { startVm: body["startVm"] },
    });
}

export async function _sAPVirtualInstancesStartDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    status: result.body["status"],
    percentComplete: result.body["percentComplete"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
    operations:
      result.body["operations"] === undefined
        ? result.body["operations"]
        : result.body["operations"].map((p: any) => {
            return {
              id: p["id"],
              name: p["name"],
              status: p["status"],
              percentComplete: p["percentComplete"],
              startTime:
                p["startTime"] !== undefined
                  ? new Date(p["startTime"])
                  : undefined,
              endTime:
                p["endTime"] !== undefined ? new Date(p["endTime"]) : undefined,
              operations: !p.operations ? undefined : (p.operations as any),
              error: !p.error
                ? undefined
                : {
                    code: p.error?.["code"],
                    message: p.error?.["message"],
                    target: p.error?.["target"],
                    details:
                      p.error?.["details"] === undefined
                        ? p.error?.["details"]
                        : p.error?.["details"].map((p: any) => {
                            return {
                              code: p["code"],
                              message: p["message"],
                              target: p["target"],
                              details: !p.details ? undefined : p.details,
                              additionalInfo:
                                p["additionalInfo"] === undefined
                                  ? p["additionalInfo"]
                                  : p["additionalInfo"].map((p: any) => {
                                      return {
                                        type: p["type"],
                                        info: p["info"],
                                      };
                                    }),
                            };
                          }),
                    additionalInfo:
                      p.error?.["additionalInfo"] === undefined
                        ? p.error?.["additionalInfo"]
                        : p.error?.["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  },
            };
          }),
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          target: result.body.error?.["target"],
          details:
            result.body.error?.["details"] === undefined
              ? result.body.error?.["details"]
              : result.body.error?.["details"].map((p: any) => {
                  return {
                    code: p["code"],
                    message: p["message"],
                    target: p["target"],
                    details: !p.details ? undefined : p.details,
                    additionalInfo:
                      p["additionalInfo"] === undefined
                        ? p["additionalInfo"]
                        : p["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  };
                }),
          additionalInfo:
            result.body.error?.["additionalInfo"] === undefined
              ? result.body.error?.["additionalInfo"]
              : result.body.error?.["additionalInfo"].map((p: any) => {
                  return { type: p["type"], info: p["info"] };
                }),
        },
  };
}

/** Starts the SAP application, that is the Central Services instance and Application server instances. */
export function sAPVirtualInstancesStart(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  body?: StartRequest,
  options: SAPVirtualInstancesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPVirtualInstancesStartDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPVirtualInstancesStartSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _sAPVirtualInstancesStopSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  body?: StopRequest,
  options: SAPVirtualInstancesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/stop",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body:
        body === undefined
          ? body
          : {
              softStopTimeoutSeconds: body["softStopTimeoutSeconds"],
              deallocateVm: body["deallocateVm"],
            },
    });
}

export async function _sAPVirtualInstancesStopDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    status: result.body["status"],
    percentComplete: result.body["percentComplete"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
    operations:
      result.body["operations"] === undefined
        ? result.body["operations"]
        : result.body["operations"].map((p: any) => {
            return {
              id: p["id"],
              name: p["name"],
              status: p["status"],
              percentComplete: p["percentComplete"],
              startTime:
                p["startTime"] !== undefined
                  ? new Date(p["startTime"])
                  : undefined,
              endTime:
                p["endTime"] !== undefined ? new Date(p["endTime"]) : undefined,
              operations: !p.operations ? undefined : (p.operations as any),
              error: !p.error
                ? undefined
                : {
                    code: p.error?.["code"],
                    message: p.error?.["message"],
                    target: p.error?.["target"],
                    details:
                      p.error?.["details"] === undefined
                        ? p.error?.["details"]
                        : p.error?.["details"].map((p: any) => {
                            return {
                              code: p["code"],
                              message: p["message"],
                              target: p["target"],
                              details: !p.details ? undefined : p.details,
                              additionalInfo:
                                p["additionalInfo"] === undefined
                                  ? p["additionalInfo"]
                                  : p["additionalInfo"].map((p: any) => {
                                      return {
                                        type: p["type"],
                                        info: p["info"],
                                      };
                                    }),
                            };
                          }),
                    additionalInfo:
                      p.error?.["additionalInfo"] === undefined
                        ? p.error?.["additionalInfo"]
                        : p.error?.["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  },
            };
          }),
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          target: result.body.error?.["target"],
          details:
            result.body.error?.["details"] === undefined
              ? result.body.error?.["details"]
              : result.body.error?.["details"].map((p: any) => {
                  return {
                    code: p["code"],
                    message: p["message"],
                    target: p["target"],
                    details: !p.details ? undefined : p.details,
                    additionalInfo:
                      p["additionalInfo"] === undefined
                        ? p["additionalInfo"]
                        : p["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  };
                }),
          additionalInfo:
            result.body.error?.["additionalInfo"] === undefined
              ? result.body.error?.["additionalInfo"]
              : result.body.error?.["additionalInfo"].map((p: any) => {
                  return { type: p["type"], info: p["info"] };
                }),
        },
  };
}

/** Stops the SAP Application, that is the Application server instances and Central Services instance. */
export function sAPVirtualInstancesStop(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  body?: StopRequest,
  options: SAPVirtualInstancesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPVirtualInstancesStopDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPVirtualInstancesStopSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _sAPVirtualInstancesGetSizingRecommendationsSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSizingRecommendationRequest,
  options: SAPVirtualInstancesGetSizingRecommendationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSizingRecommendations",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        appLocation: body["appLocation"],
        environment: body["environment"],
        sapProduct: body["sapProduct"],
        deploymentType: body["deploymentType"],
        saps: body["saps"],
        dbMemory: body["dbMemory"],
        databaseType: body["databaseType"],
        dbScaleMethod: body["dbScaleMethod"],
        highAvailabilityType: body["highAvailabilityType"],
      },
    });
}

export async function _sAPVirtualInstancesGetSizingRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPSizingRecommendationResultUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Gets the sizing recommendations. */
export async function sAPVirtualInstancesGetSizingRecommendations(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSizingRecommendationRequest,
  options: SAPVirtualInstancesGetSizingRecommendationsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPSizingRecommendationResultUnion> {
  const result = await _sAPVirtualInstancesGetSizingRecommendationsSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetSizingRecommendationsDeserialize(result);
}

export function _sAPVirtualInstancesGetSapSupportedSkuSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSupportedSkusRequest,
  options: SAPVirtualInstancesGetSapSupportedSkuOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSapSupportedSku",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        appLocation: body["appLocation"],
        environment: body["environment"],
        sapProduct: body["sapProduct"],
        deploymentType: body["deploymentType"],
        databaseType: body["databaseType"],
        highAvailabilityType: body["highAvailabilityType"],
      },
    });
}

export async function _sAPVirtualInstancesGetSapSupportedSkuDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPSupportedResourceSkusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    supportedSkus:
      result.body["supportedSkus"] === undefined
        ? result.body["supportedSkus"]
        : result.body["supportedSkus"].map((p: any) => {
            return {
              vmSku: p["vmSku"],
              isAppServerCertified: p["isAppServerCertified"],
              isDatabaseCertified: p["isDatabaseCertified"],
            };
          }),
  };
}

/** Get a list of SAP supported SKUs for ASCS, Application and Database tier. */
export async function sAPVirtualInstancesGetSapSupportedSku(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSupportedSkusRequest,
  options: SAPVirtualInstancesGetSapSupportedSkuOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPSupportedResourceSkusResult> {
  const result = await _sAPVirtualInstancesGetSapSupportedSkuSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetSapSupportedSkuDeserialize(result);
}

export function _sAPVirtualInstancesGetDiskConfigurationsSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPDiskConfigurationsRequest,
  options: SAPVirtualInstancesGetDiskConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getDiskConfigurations",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        appLocation: body["appLocation"],
        environment: body["environment"],
        sapProduct: body["sapProduct"],
        databaseType: body["databaseType"],
        deploymentType: body["deploymentType"],
        dbVmSku: body["dbVmSku"],
      },
    });
}

export async function _sAPVirtualInstancesGetDiskConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPDiskConfigurationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    volumeConfigurations: result.body["volumeConfigurations"],
  };
}

/** Get the SAP Disk Configuration Layout prod/non-prod SAP System. */
export async function sAPVirtualInstancesGetDiskConfigurations(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPDiskConfigurationsRequest,
  options: SAPVirtualInstancesGetDiskConfigurationsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPDiskConfigurationsResult> {
  const result = await _sAPVirtualInstancesGetDiskConfigurationsSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetDiskConfigurationsDeserialize(result);
}

export function _sAPVirtualInstancesGetAvailabilityZoneDetailsSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPAvailabilityZoneDetailsRequest,
  options: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getAvailabilityZoneDetails",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        appLocation: body["appLocation"],
        sapProduct: body["sapProduct"],
        databaseType: body["databaseType"],
      },
    });
}

export async function _sAPVirtualInstancesGetAvailabilityZoneDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPAvailabilityZoneDetailsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    availabilityZonePairs:
      result.body["availabilityZonePairs"] === undefined
        ? result.body["availabilityZonePairs"]
        : result.body["availabilityZonePairs"].map((p: any) => {
            return { zoneA: p["zoneA"], zoneB: p["zoneB"] };
          }),
  };
}

/** Get the recommended SAP Availability Zone Pair Details for your region. */
export async function sAPVirtualInstancesGetAvailabilityZoneDetails(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPAvailabilityZoneDetailsRequest,
  options: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPAvailabilityZoneDetailsResult> {
  const result = await _sAPVirtualInstancesGetAvailabilityZoneDetailsSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetAvailabilityZoneDetailsDeserialize(result);
}
