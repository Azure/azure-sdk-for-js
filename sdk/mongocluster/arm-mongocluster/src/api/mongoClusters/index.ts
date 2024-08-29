// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  mongoClusterPropertiesSerializer,
  mongoClusterUpdatePropertiesSerializer,
  MongoCluster,
  MongoClusterUpdate,
  ListConnectionStringsResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  PromoteReplicaRequest,
  _MongoClusterListResult,
} from "../../models/models.js";
import { DocumentDBContext as Client } from "../index.js";
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
  MongoClustersGetOptionalParams,
  MongoClustersCreateOrUpdateOptionalParams,
  MongoClustersUpdateOptionalParams,
  MongoClustersDeleteOptionalParams,
  MongoClustersListByResourceGroupOptionalParams,
  MongoClustersListOptionalParams,
  MongoClustersListConnectionStringsOptionalParams,
  MongoClustersCheckNameAvailabilityOptionalParams,
  MongoClustersPromoteOptionalParams,
} from "../../models/options.js";

export function _mongoClustersGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _mongoClustersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoCluster> {
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
          createMode: result.body.properties?.["createMode"],
          restoreParameters: !result.body.properties?.restoreParameters
            ? undefined
            : {
                pointInTimeUTC:
                  result.body.properties?.restoreParameters?.["pointInTimeUTC"] !== undefined
                    ? new Date(result.body.properties?.restoreParameters?.["pointInTimeUTC"])
                    : undefined,
                sourceResourceId: result.body.properties?.restoreParameters?.["sourceResourceId"],
              },
          replicaParameters: !result.body.properties?.replicaParameters
            ? undefined
            : {
                sourceResourceId: result.body.properties?.replicaParameters?.["sourceResourceId"],
                sourceLocation: result.body.properties?.replicaParameters?.["sourceLocation"],
              },
          administrator: !result.body.properties?.administrator
            ? undefined
            : {
                userName: result.body.properties?.administrator?.["userName"],
                password: result.body.properties?.administrator?.["password"],
              },
          serverVersion: result.body.properties?.["serverVersion"],
          connectionString: result.body.properties?.["connectionString"],
          provisioningState: result.body.properties?.["provisioningState"],
          clusterStatus: result.body.properties?.["clusterStatus"],
          publicNetworkAccess: result.body.properties?.["publicNetworkAccess"],
          highAvailability: !result.body.properties?.highAvailability
            ? undefined
            : {
                targetMode: result.body.properties?.highAvailability?.["targetMode"],
              },
          storage: !result.body.properties?.storage
            ? undefined
            : { sizeGb: result.body.properties?.storage?.["sizeGb"] },
          sharding: !result.body.properties?.sharding
            ? undefined
            : { shardCount: result.body.properties?.sharding?.["shardCount"] },
          compute: !result.body.properties?.compute
            ? undefined
            : { tier: result.body.properties?.compute?.["tier"] },
          backup: !result.body.properties?.backup
            ? undefined
            : {
                earliestRestoreTime: result.body.properties?.backup?.["earliestRestoreTime"],
              },
          privateEndpointConnections:
            result.body.properties?.["privateEndpointConnections"] === undefined
              ? result.body.properties?.["privateEndpointConnections"]
              : result.body.properties?.["privateEndpointConnections"].map((p: any) => {
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
          previewFeatures: result.body.properties?.["previewFeatures"],
          replica: !result.body.properties?.replica
            ? undefined
            : {
                sourceResourceId: result.body.properties?.replica?.["sourceResourceId"],
                role: result.body.properties?.replica?.["role"],
                replicationState: result.body.properties?.replica?.["replicationState"],
              },
          infrastructureVersion: result.body.properties?.["infrastructureVersion"],
        },
  };
}

/** Gets information about a mongo cluster. */
export async function mongoClustersGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersGetOptionalParams = { requestOptions: {} },
): Promise<MongoCluster> {
  const result = await _mongoClustersGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    mongoClusterName,
    options,
  );
  return _mongoClustersGetDeserialize(result);
}

export function _mongoClustersCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  resource: MongoCluster,
  options: MongoClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
        tags: !resource.tags ? resource.tags : (serializeRecord(resource.tags as any) as any),
        location: resource["location"],
        properties: !resource.properties
          ? resource.properties
          : mongoClusterPropertiesSerializer(resource.properties),
      },
    });
}

export async function _mongoClustersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoCluster> {
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
          createMode: result.body.properties?.["createMode"],
          restoreParameters: !result.body.properties?.restoreParameters
            ? undefined
            : {
                pointInTimeUTC:
                  result.body.properties?.restoreParameters?.["pointInTimeUTC"] !== undefined
                    ? new Date(result.body.properties?.restoreParameters?.["pointInTimeUTC"])
                    : undefined,
                sourceResourceId: result.body.properties?.restoreParameters?.["sourceResourceId"],
              },
          replicaParameters: !result.body.properties?.replicaParameters
            ? undefined
            : {
                sourceResourceId: result.body.properties?.replicaParameters?.["sourceResourceId"],
                sourceLocation: result.body.properties?.replicaParameters?.["sourceLocation"],
              },
          administrator: !result.body.properties?.administrator
            ? undefined
            : {
                userName: result.body.properties?.administrator?.["userName"],
                password: result.body.properties?.administrator?.["password"],
              },
          serverVersion: result.body.properties?.["serverVersion"],
          connectionString: result.body.properties?.["connectionString"],
          provisioningState: result.body.properties?.["provisioningState"],
          clusterStatus: result.body.properties?.["clusterStatus"],
          publicNetworkAccess: result.body.properties?.["publicNetworkAccess"],
          highAvailability: !result.body.properties?.highAvailability
            ? undefined
            : {
                targetMode: result.body.properties?.highAvailability?.["targetMode"],
              },
          storage: !result.body.properties?.storage
            ? undefined
            : { sizeGb: result.body.properties?.storage?.["sizeGb"] },
          sharding: !result.body.properties?.sharding
            ? undefined
            : { shardCount: result.body.properties?.sharding?.["shardCount"] },
          compute: !result.body.properties?.compute
            ? undefined
            : { tier: result.body.properties?.compute?.["tier"] },
          backup: !result.body.properties?.backup
            ? undefined
            : {
                earliestRestoreTime: result.body.properties?.backup?.["earliestRestoreTime"],
              },
          privateEndpointConnections:
            result.body.properties?.["privateEndpointConnections"] === undefined
              ? result.body.properties?.["privateEndpointConnections"]
              : result.body.properties?.["privateEndpointConnections"].map((p: any) => {
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
          previewFeatures: result.body.properties?.["previewFeatures"],
          replica: !result.body.properties?.replica
            ? undefined
            : {
                sourceResourceId: result.body.properties?.replica?.["sourceResourceId"],
                role: result.body.properties?.replica?.["role"],
                replicationState: result.body.properties?.replica?.["replicationState"],
              },
          infrastructureVersion: result.body.properties?.["infrastructureVersion"],
        },
  };
}

/** Create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH. */
export function mongoClustersCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  resource: MongoCluster,
  options: MongoClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoCluster>, MongoCluster> {
  return getLongRunningPoller(context, _mongoClustersCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _mongoClustersCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<MongoCluster>, MongoCluster>;
}

export function _mongoClustersUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  properties: MongoClusterUpdate,
  options: MongoClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
        tags: !properties.tags ? properties.tags : (serializeRecord(properties.tags as any) as any),
        properties: !properties.properties
          ? properties.properties
          : mongoClusterUpdatePropertiesSerializer(properties.properties),
      },
    });
}

export async function _mongoClustersUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MongoCluster> {
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
          createMode: result.body.properties?.["createMode"],
          restoreParameters: !result.body.properties?.restoreParameters
            ? undefined
            : {
                pointInTimeUTC:
                  result.body.properties?.restoreParameters?.["pointInTimeUTC"] !== undefined
                    ? new Date(result.body.properties?.restoreParameters?.["pointInTimeUTC"])
                    : undefined,
                sourceResourceId: result.body.properties?.restoreParameters?.["sourceResourceId"],
              },
          replicaParameters: !result.body.properties?.replicaParameters
            ? undefined
            : {
                sourceResourceId: result.body.properties?.replicaParameters?.["sourceResourceId"],
                sourceLocation: result.body.properties?.replicaParameters?.["sourceLocation"],
              },
          administrator: !result.body.properties?.administrator
            ? undefined
            : {
                userName: result.body.properties?.administrator?.["userName"],
                password: result.body.properties?.administrator?.["password"],
              },
          serverVersion: result.body.properties?.["serverVersion"],
          connectionString: result.body.properties?.["connectionString"],
          provisioningState: result.body.properties?.["provisioningState"],
          clusterStatus: result.body.properties?.["clusterStatus"],
          publicNetworkAccess: result.body.properties?.["publicNetworkAccess"],
          highAvailability: !result.body.properties?.highAvailability
            ? undefined
            : {
                targetMode: result.body.properties?.highAvailability?.["targetMode"],
              },
          storage: !result.body.properties?.storage
            ? undefined
            : { sizeGb: result.body.properties?.storage?.["sizeGb"] },
          sharding: !result.body.properties?.sharding
            ? undefined
            : { shardCount: result.body.properties?.sharding?.["shardCount"] },
          compute: !result.body.properties?.compute
            ? undefined
            : { tier: result.body.properties?.compute?.["tier"] },
          backup: !result.body.properties?.backup
            ? undefined
            : {
                earliestRestoreTime: result.body.properties?.backup?.["earliestRestoreTime"],
              },
          privateEndpointConnections:
            result.body.properties?.["privateEndpointConnections"] === undefined
              ? result.body.properties?.["privateEndpointConnections"]
              : result.body.properties?.["privateEndpointConnections"].map((p: any) => {
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
          previewFeatures: result.body.properties?.["previewFeatures"],
          replica: !result.body.properties?.replica
            ? undefined
            : {
                sourceResourceId: result.body.properties?.replica?.["sourceResourceId"],
                role: result.body.properties?.replica?.["role"],
                replicationState: result.body.properties?.replica?.["replicationState"],
              },
          infrastructureVersion: result.body.properties?.["infrastructureVersion"],
        },
  };
}

/** Updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition. */
export function mongoClustersUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  properties: MongoClusterUpdate,
  options: MongoClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MongoCluster>, MongoCluster> {
  return getLongRunningPoller(context, _mongoClustersUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _mongoClustersUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<MongoCluster>, MongoCluster>;
}

export function _mongoClustersDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _mongoClustersDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a mongo cluster. */
export function mongoClustersDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _mongoClustersDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _mongoClustersDeleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _mongoClustersListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: MongoClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _mongoClustersListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoClusterListResult> {
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
              createMode: p.properties?.["createMode"],
              restoreParameters: !p.properties?.restoreParameters
                ? undefined
                : {
                    pointInTimeUTC:
                      p.properties?.restoreParameters?.["pointInTimeUTC"] !== undefined
                        ? new Date(p.properties?.restoreParameters?.["pointInTimeUTC"])
                        : undefined,
                    sourceResourceId: p.properties?.restoreParameters?.["sourceResourceId"],
                  },
              replicaParameters: !p.properties?.replicaParameters
                ? undefined
                : {
                    sourceResourceId: p.properties?.replicaParameters?.["sourceResourceId"],
                    sourceLocation: p.properties?.replicaParameters?.["sourceLocation"],
                  },
              administrator: !p.properties?.administrator
                ? undefined
                : {
                    userName: p.properties?.administrator?.["userName"],
                    password: p.properties?.administrator?.["password"],
                  },
              serverVersion: p.properties?.["serverVersion"],
              connectionString: p.properties?.["connectionString"],
              provisioningState: p.properties?.["provisioningState"],
              clusterStatus: p.properties?.["clusterStatus"],
              publicNetworkAccess: p.properties?.["publicNetworkAccess"],
              highAvailability: !p.properties?.highAvailability
                ? undefined
                : {
                    targetMode: p.properties?.highAvailability?.["targetMode"],
                  },
              storage: !p.properties?.storage
                ? undefined
                : { sizeGb: p.properties?.storage?.["sizeGb"] },
              sharding: !p.properties?.sharding
                ? undefined
                : { shardCount: p.properties?.sharding?.["shardCount"] },
              compute: !p.properties?.compute
                ? undefined
                : { tier: p.properties?.compute?.["tier"] },
              backup: !p.properties?.backup
                ? undefined
                : {
                    earliestRestoreTime: p.properties?.backup?.["earliestRestoreTime"],
                  },
              privateEndpointConnections:
                p.properties?.["privateEndpointConnections"] === undefined
                  ? p.properties?.["privateEndpointConnections"]
                  : p.properties?.["privateEndpointConnections"].map((p: any) => {
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
                                : {
                                    id: p.properties?.privateEndpoint?.["id"],
                                  },
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
              previewFeatures: p.properties?.["previewFeatures"],
              replica: !p.properties?.replica
                ? undefined
                : {
                    sourceResourceId: p.properties?.replica?.["sourceResourceId"],
                    role: p.properties?.replica?.["role"],
                    replicationState: p.properties?.replica?.["replicationState"],
                  },
              infrastructureVersion: p.properties?.["infrastructureVersion"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List all the mongo clusters in a given resource group. */
export function mongoClustersListByResourceGroup(
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
      _mongoClustersListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _mongoClustersListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _mongoClustersListSend(
  context: Client,
  subscriptionId: string,
  options: MongoClustersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/mongoClusters",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _mongoClustersListDeserialize(
  result: PathUncheckedResponse,
): Promise<_MongoClusterListResult> {
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
              createMode: p.properties?.["createMode"],
              restoreParameters: !p.properties?.restoreParameters
                ? undefined
                : {
                    pointInTimeUTC:
                      p.properties?.restoreParameters?.["pointInTimeUTC"] !== undefined
                        ? new Date(p.properties?.restoreParameters?.["pointInTimeUTC"])
                        : undefined,
                    sourceResourceId: p.properties?.restoreParameters?.["sourceResourceId"],
                  },
              replicaParameters: !p.properties?.replicaParameters
                ? undefined
                : {
                    sourceResourceId: p.properties?.replicaParameters?.["sourceResourceId"],
                    sourceLocation: p.properties?.replicaParameters?.["sourceLocation"],
                  },
              administrator: !p.properties?.administrator
                ? undefined
                : {
                    userName: p.properties?.administrator?.["userName"],
                    password: p.properties?.administrator?.["password"],
                  },
              serverVersion: p.properties?.["serverVersion"],
              connectionString: p.properties?.["connectionString"],
              provisioningState: p.properties?.["provisioningState"],
              clusterStatus: p.properties?.["clusterStatus"],
              publicNetworkAccess: p.properties?.["publicNetworkAccess"],
              highAvailability: !p.properties?.highAvailability
                ? undefined
                : {
                    targetMode: p.properties?.highAvailability?.["targetMode"],
                  },
              storage: !p.properties?.storage
                ? undefined
                : { sizeGb: p.properties?.storage?.["sizeGb"] },
              sharding: !p.properties?.sharding
                ? undefined
                : { shardCount: p.properties?.sharding?.["shardCount"] },
              compute: !p.properties?.compute
                ? undefined
                : { tier: p.properties?.compute?.["tier"] },
              backup: !p.properties?.backup
                ? undefined
                : {
                    earliestRestoreTime: p.properties?.backup?.["earliestRestoreTime"],
                  },
              privateEndpointConnections:
                p.properties?.["privateEndpointConnections"] === undefined
                  ? p.properties?.["privateEndpointConnections"]
                  : p.properties?.["privateEndpointConnections"].map((p: any) => {
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
                                : {
                                    id: p.properties?.privateEndpoint?.["id"],
                                  },
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
              previewFeatures: p.properties?.["previewFeatures"],
              replica: !p.properties?.replica
                ? undefined
                : {
                    sourceResourceId: p.properties?.replica?.["sourceResourceId"],
                    role: p.properties?.replica?.["role"],
                    replicationState: p.properties?.replica?.["replicationState"],
                  },
              infrastructureVersion: p.properties?.["infrastructureVersion"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List all the mongo clusters in a given subscription. */
export function mongoClustersList(
  context: Client,
  subscriptionId: string,
  options: MongoClustersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MongoCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _mongoClustersListSend(context, subscriptionId, options),
    _mongoClustersListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _mongoClustersListConnectionStringsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersListConnectionStringsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/listConnectionStrings",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _mongoClustersListConnectionStringsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListConnectionStringsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    connectionStrings:
      result.body["connectionStrings"] === undefined
        ? result.body["connectionStrings"]
        : result.body["connectionStrings"].map((p: any) => {
            return {
              connectionString: p["connectionString"],
              description: p["description"],
              name: p["name"],
            };
          }),
  };
}

/** List mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster. */
export async function mongoClustersListConnectionStrings(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: MongoClustersListConnectionStringsOptionalParams = {
    requestOptions: {},
  },
): Promise<ListConnectionStringsResult> {
  const result = await _mongoClustersListConnectionStringsSend(
    context,
    subscriptionId,
    resourceGroupName,
    mongoClusterName,
    options,
  );
  return _mongoClustersListConnectionStringsDeserialize(result);
}

export function _mongoClustersCheckNameAvailabilitySend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: MongoClustersCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
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

export async function _mongoClustersCheckNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    nameAvailable: result.body["nameAvailable"],
    reason: result.body["reason"],
    message: result.body["message"],
  };
}

/** Check if mongo cluster name is available for use. */
export async function mongoClustersCheckNameAvailability(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: MongoClustersCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _mongoClustersCheckNameAvailabilitySend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _mongoClustersCheckNameAvailabilityDeserialize(result);
}

export function _mongoClustersPromoteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  body: PromoteReplicaRequest,
  options: MongoClustersPromoteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/promote",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { promoteOption: body["promoteOption"], mode: body["mode"] },
    });
}

export async function _mongoClustersPromoteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Promotes a replica mongo cluster to a primary role. */
export function mongoClustersPromote(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  body: PromoteReplicaRequest,
  options: MongoClustersPromoteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _mongoClustersPromoteDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _mongoClustersPromoteSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        body,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}
