// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  mongoClusterPropertiesSerializer,
  mongoClusterUpdatePropertiesSerializer,
  MongoCluster,
  MongoClusterUpdate,
  ListConnectionStringsResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  _MongoClusterListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  DocumentDBContext as Client,
  MongoClustersCheckNameAvailability200Response,
  MongoClustersCheckNameAvailabilityDefaultResponse,
  MongoClustersCreateOrUpdate200Response,
  MongoClustersCreateOrUpdate201Response,
  MongoClustersCreateOrUpdateDefaultResponse,
  MongoClustersCreateOrUpdateLogicalResponse,
  MongoClustersDelete202Response,
  MongoClustersDelete204Response,
  MongoClustersDeleteDefaultResponse,
  MongoClustersDeleteLogicalResponse,
  MongoClustersGet200Response,
  MongoClustersGetDefaultResponse,
  MongoClustersList200Response,
  MongoClustersListByResourceGroup200Response,
  MongoClustersListByResourceGroupDefaultResponse,
  MongoClustersListConnectionStrings200Response,
  MongoClustersListConnectionStringsDefaultResponse,
  MongoClustersListDefaultResponse,
  MongoClustersUpdate200Response,
  MongoClustersUpdate202Response,
  MongoClustersUpdateDefaultResponse,
  MongoClustersUpdateLogicalResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  MongoClustersGetOptionalParams,
  MongoClustersCreateOrUpdateOptionalParams,
  MongoClustersUpdateOptionalParams,
  MongoClustersDeleteOptionalParams,
  MongoClustersListByResourceGroupOptionalParams,
  MongoClustersListOptionalParams,
  MongoClustersListConnectionStringsOptionalParams,
  MongoClustersCheckNameAvailabilityOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod<
  MongoClustersGet200Response | MongoClustersGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: MongoClustersGet200Response | MongoClustersGetDefaultResponse,
): Promise<MongoCluster> {
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
          createMode: result.body.properties?.["createMode"],
          restoreParameters: !result.body.properties?.restoreParameters
            ? undefined
            : {
                pointInTimeUTC:
                  result.body.properties?.restoreParameters?.[
                    "pointInTimeUTC"
                  ] !== undefined
                    ? new Date(
                        result.body.properties?.restoreParameters?.[
                          "pointInTimeUTC"
                        ],
                      )
                    : undefined,
                sourceResourceId:
                  result.body.properties?.restoreParameters?.[
                    "sourceResourceId"
                  ],
              },
          administratorLogin: result.body.properties?.["administratorLogin"],
          administratorLoginPassword:
            result.body.properties?.["administratorLoginPassword"],
          serverVersion: result.body.properties?.["serverVersion"],
          connectionString: result.body.properties?.["connectionString"],
          earliestRestoreTime: result.body.properties?.["earliestRestoreTime"],
          provisioningState: result.body.properties?.["provisioningState"],
          clusterStatus: result.body.properties?.["clusterStatus"],
          publicNetworkAccess: result.body.properties?.["publicNetworkAccess"],
          nodeGroupSpecs:
            result.body.properties?.["nodeGroupSpecs"] === undefined
              ? result.body.properties?.["nodeGroupSpecs"]
              : result.body.properties?.["nodeGroupSpecs"].map((p) => {
                  return {
                    sku: p["sku"],
                    diskSizeGB: p["diskSizeGB"],
                    enableHa: p["enableHa"],
                    kind: p["kind"],
                    nodeCount: p["nodeCount"],
                  };
                }),
          privateEndpointConnections:
            result.body.properties?.["privateEndpointConnections"] === undefined
              ? result.body.properties?.["privateEndpointConnections"]
              : result.body.properties?.["privateEndpointConnections"].map(
                  (p) => {
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
                            lastModifiedByType:
                              p.systemData?.["lastModifiedByType"],
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
                              status:
                                p.properties?.privateLinkServiceConnectionState[
                                  "status"
                                ],
                              description:
                                p.properties?.privateLinkServiceConnectionState[
                                  "description"
                                ],
                              actionsRequired:
                                p.properties?.privateLinkServiceConnectionState[
                                  "actionsRequired"
                                ],
                            },
                            provisioningState:
                              p.properties?.["provisioningState"],
                          },
                    };
                  },
                ),
        },
  };
}

/** Gets information about a mongo cluster. */
export async function get(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersGetOptionalParams = { requestOptions: {} },
): Promise<MongoCluster> {
  const result = await _getSend(
    context,
    subscriptionId,
    resourceGroupName,
    mongoClusterName,
    options,
  );
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  resource: MongoCluster,
  options: MongoClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | MongoClustersCreateOrUpdate200Response
  | MongoClustersCreateOrUpdate201Response
  | MongoClustersCreateOrUpdateDefaultResponse
  | MongoClustersCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
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
          : mongoClusterPropertiesSerializer(resource.properties),
      },
    });
}

export async function _createOrUpdateDeserialize(
  result:
    | MongoClustersCreateOrUpdate200Response
    | MongoClustersCreateOrUpdate201Response
    | MongoClustersCreateOrUpdateDefaultResponse
    | MongoClustersCreateOrUpdateLogicalResponse,
): Promise<MongoCluster> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  const res = result as unknown as MongoClustersCreateOrUpdateLogicalResponse;
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
          createMode: res.body.properties?.["createMode"],
          restoreParameters: !res.body.properties?.restoreParameters
            ? undefined
            : {
                pointInTimeUTC:
                  res.body.properties?.restoreParameters?.["pointInTimeUTC"] !==
                  undefined
                    ? new Date(
                        res.body.properties?.restoreParameters?.[
                          "pointInTimeUTC"
                        ],
                      )
                    : undefined,
                sourceResourceId:
                  res.body.properties?.restoreParameters?.["sourceResourceId"],
              },
          administratorLogin: res.body.properties?.["administratorLogin"],
          administratorLoginPassword:
            res.body.properties?.["administratorLoginPassword"],
          serverVersion: res.body.properties?.["serverVersion"],
          connectionString: res.body.properties?.["connectionString"],
          earliestRestoreTime: res.body.properties?.["earliestRestoreTime"],
          provisioningState: res.body.properties?.["provisioningState"],
          clusterStatus: res.body.properties?.["clusterStatus"],
          publicNetworkAccess: res.body.properties?.["publicNetworkAccess"],
          nodeGroupSpecs:
            res.body.properties?.["nodeGroupSpecs"] === undefined
              ? res.body.properties?.["nodeGroupSpecs"]
              : res.body.properties?.["nodeGroupSpecs"].map((p) => {
                  return {
                    sku: p["sku"],
                    diskSizeGB: p["diskSizeGB"],
                    enableHa: p["enableHa"],
                    kind: p["kind"],
                    nodeCount: p["nodeCount"],
                  };
                }),
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
                          lastModifiedByType:
                            p.systemData?.["lastModifiedByType"],
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
                            status:
                              p.properties?.privateLinkServiceConnectionState[
                                "status"
                              ],
                            description:
                              p.properties?.privateLinkServiceConnectionState[
                                "description"
                              ],
                            actionsRequired:
                              p.properties?.privateLinkServiceConnectionState[
                                "actionsRequired"
                              ],
                          },
                          provisioningState:
                            p.properties?.["provisioningState"],
                        },
                  };
                }),
        },
  };
}

/** Create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH. */
export function createOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  resource: MongoCluster,
  options: MongoClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoCluster>, MongoCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<MongoCluster>, MongoCluster>;
}

export function _updateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  properties: MongoClusterUpdate,
  options: MongoClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | MongoClustersUpdate200Response
  | MongoClustersUpdate202Response
  | MongoClustersUpdateDefaultResponse
  | MongoClustersUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags
          ? properties.tags
          : (serializeRecord(properties.tags as any) as any),
        properties: !properties.properties
          ? properties.properties
          : mongoClusterUpdatePropertiesSerializer(properties.properties),
      },
    });
}

export async function _updateDeserialize(
  result:
    | MongoClustersUpdate200Response
    | MongoClustersUpdate202Response
    | MongoClustersUpdateDefaultResponse
    | MongoClustersUpdateLogicalResponse,
): Promise<MongoCluster> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  const res = result as unknown as MongoClustersUpdateLogicalResponse;
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
          createMode: res.body.properties?.["createMode"],
          restoreParameters: !res.body.properties?.restoreParameters
            ? undefined
            : {
                pointInTimeUTC:
                  res.body.properties?.restoreParameters?.["pointInTimeUTC"] !==
                  undefined
                    ? new Date(
                        res.body.properties?.restoreParameters?.[
                          "pointInTimeUTC"
                        ],
                      )
                    : undefined,
                sourceResourceId:
                  res.body.properties?.restoreParameters?.["sourceResourceId"],
              },
          administratorLogin: res.body.properties?.["administratorLogin"],
          administratorLoginPassword:
            res.body.properties?.["administratorLoginPassword"],
          serverVersion: res.body.properties?.["serverVersion"],
          connectionString: res.body.properties?.["connectionString"],
          earliestRestoreTime: res.body.properties?.["earliestRestoreTime"],
          provisioningState: res.body.properties?.["provisioningState"],
          clusterStatus: res.body.properties?.["clusterStatus"],
          publicNetworkAccess: res.body.properties?.["publicNetworkAccess"],
          nodeGroupSpecs:
            res.body.properties?.["nodeGroupSpecs"] === undefined
              ? res.body.properties?.["nodeGroupSpecs"]
              : res.body.properties?.["nodeGroupSpecs"].map((p) => {
                  return {
                    sku: p["sku"],
                    diskSizeGB: p["diskSizeGB"],
                    enableHa: p["enableHa"],
                    kind: p["kind"],
                    nodeCount: p["nodeCount"],
                  };
                }),
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
                          lastModifiedByType:
                            p.systemData?.["lastModifiedByType"],
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
                            status:
                              p.properties?.privateLinkServiceConnectionState[
                                "status"
                              ],
                            description:
                              p.properties?.privateLinkServiceConnectionState[
                                "description"
                              ],
                            actionsRequired:
                              p.properties?.privateLinkServiceConnectionState[
                                "actionsRequired"
                              ],
                          },
                          provisioningState:
                            p.properties?.["provisioningState"],
                        },
                  };
                }),
        },
  };
}

/** Updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition. */
export function update(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  properties: MongoClusterUpdate,
  options: MongoClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoCluster>, MongoCluster> {
  return getLongRunningPoller(context, _updateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<MongoCluster>, MongoCluster>;
}

export function _$deleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | MongoClustersDelete202Response
  | MongoClustersDelete204Response
  | MongoClustersDeleteDefaultResponse
  | MongoClustersDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(
  result:
    | MongoClustersDelete202Response
    | MongoClustersDelete204Response
    | MongoClustersDeleteDefaultResponse
    | MongoClustersDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a mongo cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: MongoClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | MongoClustersListByResourceGroup200Response
  | MongoClustersListByResourceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listByResourceGroupDeserialize(
  result:
    | MongoClustersListByResourceGroup200Response
    | MongoClustersListByResourceGroupDefaultResponse,
): Promise<_MongoClusterListResult> {
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
              createMode: p.properties?.["createMode"],
              restoreParameters: !p.properties?.restoreParameters
                ? undefined
                : {
                    pointInTimeUTC:
                      p.properties?.restoreParameters?.["pointInTimeUTC"] !==
                      undefined
                        ? new Date(
                            p.properties?.restoreParameters?.["pointInTimeUTC"],
                          )
                        : undefined,
                    sourceResourceId:
                      p.properties?.restoreParameters?.["sourceResourceId"],
                  },
              administratorLogin: p.properties?.["administratorLogin"],
              administratorLoginPassword:
                p.properties?.["administratorLoginPassword"],
              serverVersion: p.properties?.["serverVersion"],
              connectionString: p.properties?.["connectionString"],
              earliestRestoreTime: p.properties?.["earliestRestoreTime"],
              provisioningState: p.properties?.["provisioningState"],
              clusterStatus: p.properties?.["clusterStatus"],
              publicNetworkAccess: p.properties?.["publicNetworkAccess"],
              nodeGroupSpecs:
                p.properties?.["nodeGroupSpecs"] === undefined
                  ? p.properties?.["nodeGroupSpecs"]
                  : p.properties?.["nodeGroupSpecs"].map((p) => {
                      return {
                        sku: p["sku"],
                        diskSizeGB: p["diskSizeGB"],
                        enableHa: p["enableHa"],
                        kind: p["kind"],
                        nodeCount: p["nodeCount"],
                      };
                    }),
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
                              lastModifiedByType:
                                p.systemData?.["lastModifiedByType"],
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
                                status:
                                  p.properties
                                    ?.privateLinkServiceConnectionState[
                                    "status"
                                  ],
                                description:
                                  p.properties
                                    ?.privateLinkServiceConnectionState[
                                    "description"
                                  ],
                                actionsRequired:
                                  p.properties
                                    ?.privateLinkServiceConnectionState[
                                    "actionsRequired"
                                  ],
                              },
                              provisioningState:
                                p.properties?.["provisioningState"],
                            },
                      };
                    }),
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List all the mongo clusters in a given resource group. */
export function listByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: MongoClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MongoCluster> {
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

export function _listSend(
  context: Client,
  subscriptionId: string,
  options: MongoClustersListOptionalParams = { requestOptions: {} },
): StreamableMethod<
  MongoClustersList200Response | MongoClustersListDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/mongoClusters",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listDeserialize(
  result: MongoClustersList200Response | MongoClustersListDefaultResponse,
): Promise<_MongoClusterListResult> {
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
              createMode: p.properties?.["createMode"],
              restoreParameters: !p.properties?.restoreParameters
                ? undefined
                : {
                    pointInTimeUTC:
                      p.properties?.restoreParameters?.["pointInTimeUTC"] !==
                      undefined
                        ? new Date(
                            p.properties?.restoreParameters?.["pointInTimeUTC"],
                          )
                        : undefined,
                    sourceResourceId:
                      p.properties?.restoreParameters?.["sourceResourceId"],
                  },
              administratorLogin: p.properties?.["administratorLogin"],
              administratorLoginPassword:
                p.properties?.["administratorLoginPassword"],
              serverVersion: p.properties?.["serverVersion"],
              connectionString: p.properties?.["connectionString"],
              earliestRestoreTime: p.properties?.["earliestRestoreTime"],
              provisioningState: p.properties?.["provisioningState"],
              clusterStatus: p.properties?.["clusterStatus"],
              publicNetworkAccess: p.properties?.["publicNetworkAccess"],
              nodeGroupSpecs:
                p.properties?.["nodeGroupSpecs"] === undefined
                  ? p.properties?.["nodeGroupSpecs"]
                  : p.properties?.["nodeGroupSpecs"].map((p) => {
                      return {
                        sku: p["sku"],
                        diskSizeGB: p["diskSizeGB"],
                        enableHa: p["enableHa"],
                        kind: p["kind"],
                        nodeCount: p["nodeCount"],
                      };
                    }),
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
                              lastModifiedByType:
                                p.systemData?.["lastModifiedByType"],
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
                                status:
                                  p.properties
                                    ?.privateLinkServiceConnectionState[
                                    "status"
                                  ],
                                description:
                                  p.properties
                                    ?.privateLinkServiceConnectionState[
                                    "description"
                                  ],
                                actionsRequired:
                                  p.properties
                                    ?.privateLinkServiceConnectionState[
                                    "actionsRequired"
                                  ],
                              },
                              provisioningState:
                                p.properties?.["provisioningState"],
                            },
                      };
                    }),
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List all the mongo clusters in a given subscription. */
export function list(
  context: Client,
  subscriptionId: string,
  options: MongoClustersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, subscriptionId, options),
    _listDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listConnectionStringsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersListConnectionStringsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | MongoClustersListConnectionStrings200Response
  | MongoClustersListConnectionStringsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/listConnectionStrings",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _listConnectionStringsDeserialize(
  result:
    | MongoClustersListConnectionStrings200Response
    | MongoClustersListConnectionStringsDefaultResponse,
): Promise<ListConnectionStringsResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    connectionStrings:
      result.body["connectionStrings"] === undefined
        ? result.body["connectionStrings"]
        : result.body["connectionStrings"].map((p) => {
            return {
              connectionString: p["connectionString"],
              description: p["description"],
            };
          }),
  };
}

/** List mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster. */
export async function listConnectionStrings(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersListConnectionStringsOptionalParams = {
    requestOptions: {},
  },
): Promise<ListConnectionStringsResult> {
  const result = await _listConnectionStringsSend(
    context,
    subscriptionId,
    resourceGroupName,
    mongoClusterName,
    options,
  );
  return _listConnectionStringsDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: MongoClustersCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | MongoClustersCheckNameAvailability200Response
  | MongoClustersCheckNameAvailabilityDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/checkMongoClusterNameAvailability",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { name: body["name"], type: body["type"] },
    });
}

export async function _checkNameAvailabilityDeserialize(
  result:
    | MongoClustersCheckNameAvailability200Response
    | MongoClustersCheckNameAvailabilityDefaultResponse,
): Promise<CheckNameAvailabilityResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    nameAvailable: result.body["nameAvailable"],
    reason: result.body["reason"],
    message: result.body["message"],
  };
}

/** Check if mongo cluster name is available for use. */
export async function checkNameAvailability(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: MongoClustersCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}
