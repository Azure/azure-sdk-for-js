// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PrivateLinkResource,
  _PrivateLinkResourceListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  DocumentDBContext as Client,
  PrivateLinksListByMongoCluster200Response,
  PrivateLinksListByMongoClusterDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { PrivateLinksListByMongoClusterOptionalParams } from "../../models/options.js";

export function _listByMongoClusterSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: PrivateLinksListByMongoClusterOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  | PrivateLinksListByMongoCluster200Response
  | PrivateLinksListByMongoClusterDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateLinkResources",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listByMongoClusterDeserialize(
  result:
    | PrivateLinksListByMongoCluster200Response
    | PrivateLinksListByMongoClusterDefaultResponse,
): Promise<_PrivateLinkResourceListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
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
    })),
    nextLink: result.body["nextLink"],
  };
}

/** list private links on the given resource */
export function listByMongoCluster(
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
      _listByMongoClusterSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    _listByMongoClusterDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
