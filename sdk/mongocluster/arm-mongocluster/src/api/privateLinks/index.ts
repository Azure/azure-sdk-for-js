// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PrivateLinkResource, _PrivateLinkResourceListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  DocumentDBContext as Client,
  PrivateLinksList200Response,
  PrivateLinksListDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { PrivateLinksListOptionalParams } from "../../models/options.js";

export function _privateLinksListSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: PrivateLinksListOptionalParams = { requestOptions: {} },
): StreamableMethod<PrivateLinksList200Response | PrivateLinksListDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateLinkResources",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateLinksListDeserialize(
  result: PrivateLinksList200Response | PrivateLinksListDefaultResponse,
): Promise<_PrivateLinkResourceListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
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
export function privateLinksList(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: PrivateLinksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _privateLinksListSend(context, subscriptionId, resourceGroupName, mongoClusterName, options),
    _privateLinksListDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
