// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DevOpsInfrastructureContext as Client,
  SkuListByLocationOptionalParams,
} from "../index.js";
import type {
  _ResourceSkuListResult,
  ResourceSku} from "../../models/models.js";
import {
  _resourceSkuListResultDeserializer
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
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
