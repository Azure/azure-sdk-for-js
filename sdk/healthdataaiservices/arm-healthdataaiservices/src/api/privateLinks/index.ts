// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HealthDataAIServicesContext as Client,
  PrivateLinksListByDeidServiceOptionalParams,
} from "../index.js";
import {
  _PrivateLinkResourceListResult,
  _privateLinkResourceListResultDeserializer,
  PrivateLinkResource,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _privateLinksListByDeidServiceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateLinksListByDeidServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _privateLinkResourceListResultDeserializer(result.body);
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
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
