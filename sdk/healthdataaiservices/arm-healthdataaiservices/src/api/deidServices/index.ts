// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  deidServicePropertiesSerializer,
  managedServiceIdentitySerializer,
  managedServiceIdentityUpdateSerializer,
  deidPropertiesUpdateSerializer,
  DeidService,
  DeidUpdate,
  _DeidServiceListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  HealthDataAIServicesContext as Client,
  DeidServicesCreate200Response,
  DeidServicesCreate201Response,
  DeidServicesCreateDefaultResponse,
  DeidServicesCreateLogicalResponse,
  DeidServicesDelete202Response,
  DeidServicesDelete204Response,
  DeidServicesDeleteDefaultResponse,
  DeidServicesDeleteLogicalResponse,
  DeidServicesGet200Response,
  DeidServicesGetDefaultResponse,
  DeidServicesListByResourceGroup200Response,
  DeidServicesListByResourceGroupDefaultResponse,
  DeidServicesListBySubscription200Response,
  DeidServicesListBySubscriptionDefaultResponse,
  DeidServicesUpdate200Response,
  DeidServicesUpdate202Response,
  DeidServicesUpdateDefaultResponse,
  DeidServicesUpdateLogicalResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  DeidServicesGetOptionalParams,
  DeidServicesListByResourceGroupOptionalParams,
  DeidServicesListBySubscriptionOptionalParams,
  DeidServicesCreateOptionalParams,
  DeidServicesUpdateOptionalParams,
  DeidServicesDeleteOptionalParams,
} from "../../models/options.js";

export function _deidServicesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod<DeidServicesGet200Response | DeidServicesGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesGetDeserialize(
  result: DeidServicesGet200Response | DeidServicesGetDefaultResponse,
): Promise<DeidService> {
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
          serviceUrl: result.body.properties?.["serviceUrl"],
          privateEndpointConnections:
            result.body.properties?.["privateEndpointConnections"] === undefined
              ? result.body.properties?.["privateEndpointConnections"]
              : result.body.properties?.["privateEndpointConnections"].map((p) => {
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
                            description:
                              p.properties?.privateLinkServiceConnectionState["description"],
                            actionsRequired:
                              p.properties?.privateLinkServiceConnectionState["actionsRequired"],
                          },
                          provisioningState: p.properties?.["provisioningState"],
                        },
                  };
                }),
          publicNetworkAccess: result.body.properties?.["publicNetworkAccess"],
        },
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities: result.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Get a DeidService */
export async function deidServicesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesGetOptionalParams = { requestOptions: {} },
): Promise<DeidService> {
  const result = await _deidServicesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    deidServiceName,
    options,
  );
  return _deidServicesGetDeserialize(result);
}

export function _deidServicesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DeidServicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  DeidServicesListByResourceGroup200Response | DeidServicesListByResourceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesListByResourceGroupDeserialize(
  result:
    | DeidServicesListByResourceGroup200Response
    | DeidServicesListByResourceGroupDefaultResponse,
): Promise<_DeidServiceListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
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
              provisioningState: p.properties?.["provisioningState"],
              serviceUrl: p.properties?.["serviceUrl"],
              privateEndpointConnections:
                p.properties?.["privateEndpointConnections"] === undefined
                  ? p.properties?.["privateEndpointConnections"]
                  : p.properties?.["privateEndpointConnections"].map((p) => {
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
                                description:
                                  p.properties?.privateLinkServiceConnectionState["description"],
                                actionsRequired:
                                  p.properties?.privateLinkServiceConnectionState[
                                    "actionsRequired"
                                  ],
                              },
                              provisioningState: p.properties?.["provisioningState"],
                            },
                      };
                    }),
              publicNetworkAccess: p.properties?.["publicNetworkAccess"],
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

/** List DeidService resources by resource group */
export function deidServicesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DeidServicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DeidService> {
  return buildPagedAsyncIterator(
    context,
    () => _deidServicesListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _deidServicesListByResourceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deidServicesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: DeidServicesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  DeidServicesListBySubscription200Response | DeidServicesListBySubscriptionDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.HealthDataAIServices/deidServices",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesListBySubscriptionDeserialize(
  result: DeidServicesListBySubscription200Response | DeidServicesListBySubscriptionDefaultResponse,
): Promise<_DeidServiceListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
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
              provisioningState: p.properties?.["provisioningState"],
              serviceUrl: p.properties?.["serviceUrl"],
              privateEndpointConnections:
                p.properties?.["privateEndpointConnections"] === undefined
                  ? p.properties?.["privateEndpointConnections"]
                  : p.properties?.["privateEndpointConnections"].map((p) => {
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
                                description:
                                  p.properties?.privateLinkServiceConnectionState["description"],
                                actionsRequired:
                                  p.properties?.privateLinkServiceConnectionState[
                                    "actionsRequired"
                                  ],
                              },
                              provisioningState: p.properties?.["provisioningState"],
                            },
                      };
                    }),
              publicNetworkAccess: p.properties?.["publicNetworkAccess"],
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

/** List DeidService resources by subscription ID */
export function deidServicesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: DeidServicesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DeidService> {
  return buildPagedAsyncIterator(
    context,
    () => _deidServicesListBySubscriptionSend(context, subscriptionId, options),
    _deidServicesListBySubscriptionDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deidServicesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  resource: DeidService,
  options: DeidServicesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | DeidServicesCreate200Response
  | DeidServicesCreate201Response
  | DeidServicesCreateDefaultResponse
  | DeidServicesCreateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !resource.tags ? resource.tags : (serializeRecord(resource.tags as any) as any),
        location: resource["location"],
        properties: !resource.properties
          ? resource.properties
          : deidServicePropertiesSerializer(resource.properties),
        identity: !resource.identity
          ? resource.identity
          : managedServiceIdentitySerializer(resource.identity),
      },
    });
}

export async function _deidServicesCreateDeserialize(
  result:
    | DeidServicesCreate200Response
    | DeidServicesCreate201Response
    | DeidServicesCreateDefaultResponse
    | DeidServicesCreateLogicalResponse,
): Promise<DeidService> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  const res = result as unknown as DeidServicesCreateLogicalResponse;
  return {
    tags: res.body["tags"],
    location: res.body["location"],
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
          provisioningState: res.body.properties?.["provisioningState"],
          serviceUrl: res.body.properties?.["serviceUrl"],
          privateEndpointConnections:
            res.body.properties?.["privateEndpointConnections"] === undefined
              ? res.body.properties?.["privateEndpointConnections"]
              : res.body.properties?.["privateEndpointConnections"].map((p) => {
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
                            description:
                              p.properties?.privateLinkServiceConnectionState["description"],
                            actionsRequired:
                              p.properties?.privateLinkServiceConnectionState["actionsRequired"],
                          },
                          provisioningState: p.properties?.["provisioningState"],
                        },
                  };
                }),
          publicNetworkAccess: res.body.properties?.["publicNetworkAccess"],
        },
    identity: !res.body.identity
      ? undefined
      : {
          principalId: res.body.identity?.["principalId"],
          tenantId: res.body.identity?.["tenantId"],
          type: res.body.identity?.["type"],
          userAssignedIdentities: res.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Create a DeidService */
export function deidServicesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  resource: DeidService,
  options: DeidServicesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeidService>, DeidService> {
  return getLongRunningPoller(context, _deidServicesCreateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deidServicesCreateSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<DeidService>, DeidService>;
}

export function _deidServicesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  properties: DeidUpdate,
  options: DeidServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | DeidServicesUpdate200Response
  | DeidServicesUpdate202Response
  | DeidServicesUpdateDefaultResponse
  | DeidServicesUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags ? properties.tags : (serializeRecord(properties.tags as any) as any),
        identity: !properties.identity
          ? properties.identity
          : managedServiceIdentityUpdateSerializer(properties.identity),
        properties: !properties.properties
          ? properties.properties
          : deidPropertiesUpdateSerializer(properties.properties),
      },
    });
}

export async function _deidServicesUpdateDeserialize(
  result:
    | DeidServicesUpdate200Response
    | DeidServicesUpdate202Response
    | DeidServicesUpdateDefaultResponse
    | DeidServicesUpdateLogicalResponse,
): Promise<DeidService> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  const res = result as unknown as DeidServicesUpdateLogicalResponse;
  return {
    tags: res.body["tags"],
    location: res.body["location"],
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
          provisioningState: res.body.properties?.["provisioningState"],
          serviceUrl: res.body.properties?.["serviceUrl"],
          privateEndpointConnections:
            res.body.properties?.["privateEndpointConnections"] === undefined
              ? res.body.properties?.["privateEndpointConnections"]
              : res.body.properties?.["privateEndpointConnections"].map((p) => {
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
                            description:
                              p.properties?.privateLinkServiceConnectionState["description"],
                            actionsRequired:
                              p.properties?.privateLinkServiceConnectionState["actionsRequired"],
                          },
                          provisioningState: p.properties?.["provisioningState"],
                        },
                  };
                }),
          publicNetworkAccess: res.body.properties?.["publicNetworkAccess"],
        },
    identity: !res.body.identity
      ? undefined
      : {
          principalId: res.body.identity?.["principalId"],
          tenantId: res.body.identity?.["tenantId"],
          type: res.body.identity?.["type"],
          userAssignedIdentities: res.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Update a DeidService */
export function deidServicesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  properties: DeidUpdate,
  options: DeidServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeidService>, DeidService> {
  return getLongRunningPoller(context, _deidServicesUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deidServicesUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<DeidService>, DeidService>;
}

export function _deidServicesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | DeidServicesDelete202Response
  | DeidServicesDelete204Response
  | DeidServicesDeleteDefaultResponse
  | DeidServicesDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesDeleteDeserialize(
  result:
    | DeidServicesDelete202Response
    | DeidServicesDelete204Response
    | DeidServicesDeleteDefaultResponse
    | DeidServicesDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a DeidService */
export function deidServicesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deidServicesDeleteDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deidServicesDeleteSend(context, subscriptionId, resourceGroupName, deidServiceName, options),
  }) as PollerLike<OperationState<void>, void>;
}
