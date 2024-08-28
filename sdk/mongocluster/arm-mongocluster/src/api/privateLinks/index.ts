// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PrivateLinkResource,
  _PrivateLinkResourceListResult,
} from "../../models/models.js";
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
import { PrivateLinksListByMongoClusterOptionalParams } from "../../models/options.js";

export function _privateLinksListByMongoClusterSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: PrivateLinksListByMongoClusterOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateLinkResources",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateLinksListByMongoClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourceListResult> {
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
              groupId: p.properties?.["groupId"],
              requiredMembers: p.properties?.["requiredMembers"],
              requiredZoneNames: p.properties?.["requiredZoneNames"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** list private links on the given resource */
export function privateLinksListByMongoCluster(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: PrivateLinksListByMongoClusterOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _privateLinksListByMongoClusterSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    _privateLinksListByMongoClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
