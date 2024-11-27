// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateLinkResource, _PrivateLinkResourceListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  HealthDataAIServicesContext as Client,
  PrivateLinksListByDeidService200Response,
  PrivateLinksListByDeidServiceDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { PrivateLinksListByDeidServiceOptionalParams } from "../../models/options.js";

export function _privateLinksListByDeidServiceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateLinksListByDeidServiceOptionalParams = { requestOptions: {} },
): StreamableMethod<
  PrivateLinksListByDeidService200Response | PrivateLinksListByDeidServiceDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateLinkResources",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _privateLinksListByDeidServiceDeserialize(
  result: PrivateLinksListByDeidService200Response | PrivateLinksListByDeidServiceDefaultResponse,
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

/** List private links on the given resource */
export function privateLinksListByDeidService(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateLinksListByDeidServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _privateLinksListByDeidServiceSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        options,
      ),
    _privateLinksListByDeidServiceDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
