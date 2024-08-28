// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Replica, _ReplicaListResult } from "../../models/models.js";
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
import { ReplicasListByParentOptionalParams } from "../../models/options.js";

export function _replicasListByParentSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: ReplicasListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/replicas",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _replicasListByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReplicaListResult> {
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
              replicaParameters: !p.properties?.replicaParameters
                ? undefined
                : {
                    sourceResourceId:
                      p.properties?.replicaParameters?.["sourceResourceId"],
                    sourceLocation:
                      p.properties?.replicaParameters?.["sourceLocation"],
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
                    earliestRestoreTime:
                      p.properties?.backup?.["earliestRestoreTime"],
                  },
              privateEndpointConnections:
                p.properties?.["privateEndpointConnections"] === undefined
                  ? p.properties?.["privateEndpointConnections"]
                  : p.properties?.["privateEndpointConnections"].map(
                      (p: any) => {
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
                                lastModifiedBy:
                                  p.systemData?.["lastModifiedBy"],
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
                                  : {
                                      id: p.properties?.privateEndpoint?.["id"],
                                    },
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
                      },
                    ),
              previewFeatures: p.properties?.["previewFeatures"],
              replica: !p.properties?.replica
                ? undefined
                : {
                    sourceResourceId:
                      p.properties?.replica?.["sourceResourceId"],
                    role: p.properties?.replica?.["role"],
                    replicationState:
                      p.properties?.replica?.["replicationState"],
                  },
              infrastructureVersion: p.properties?.["infrastructureVersion"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List all the replicas for the mongo cluster. */
export function replicasListByParent(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: ReplicasListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Replica> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _replicasListByParentSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    _replicasListByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
