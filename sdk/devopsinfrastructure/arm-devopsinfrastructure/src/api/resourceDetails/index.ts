// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DevOpsInfrastructureContext as Client,
  ResourceDetailsListByPoolOptionalParams,
} from "../index.js";
import {
  _ResourceDetailsObjectListResult,
  _resourceDetailsObjectListResultDeserializer,
  ResourceDetailsObject,
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

export function _resourceDetailsListByPoolSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  options: ResourceDetailsListByPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}/resources",
      subscriptionId,
      resourceGroupName,
      poolName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _resourceDetailsListByPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceDetailsObjectListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _resourceDetailsObjectListResultDeserializer(result.body);
}

/** List ResourceDetailsObject resources by Pool */
export function resourceDetailsListByPool(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  options: ResourceDetailsListByPoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceDetailsObject> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _resourceDetailsListByPoolSend(context, subscriptionId, resourceGroupName, poolName, options),
    _resourceDetailsListByPoolDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
