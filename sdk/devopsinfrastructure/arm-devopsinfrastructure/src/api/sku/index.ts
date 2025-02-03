// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DevOpsInfrastructureContext as Client,
  SkuListByLocationOptionalParams,
} from "../index.js";
import {
  _ResourceSkuListResult,
  _resourceSkuListResultDeserializer,
  ResourceSku,
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

export function _skuListByLocationSend(
  context: Client,
  subscriptionId: string,
  locationName: string,
  options: SkuListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/locations/{locationName}/skus",
      subscriptionId,
      locationName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _skuListByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceSkuListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _resourceSkuListResultDeserializer(result.body);
}

/** List ResourceSku resources by subscription ID */
export function skuListByLocation(
  context: Client,
  subscriptionId: string,
  locationName: string,
  options: SkuListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceSku> {
  return buildPagedAsyncIterator(
    context,
    () => _skuListByLocationSend(context, subscriptionId, locationName, options),
    _skuListByLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
