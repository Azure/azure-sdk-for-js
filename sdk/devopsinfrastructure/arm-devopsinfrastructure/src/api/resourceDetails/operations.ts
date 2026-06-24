// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ResourceDetailsObjectListResult,
  _resourceDetailsObjectListResultDeserializer,
  ResourceDetailsObject,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ResourceDetailsListByPoolOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByPoolSend(
  context: Client,
  resourceGroupName: string,
  poolName: string,
  options: ResourceDetailsListByPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-04-17-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceDetailsObjectListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceDetailsObjectListResultDeserializer(result.body);
}

/** List ResourceDetailsObject resources by Pool */
export function listByPool(
  context: Client,
  resourceGroupName: string,
  poolName: string,
  options: ResourceDetailsListByPoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceDetailsObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPoolSend(context, resourceGroupName, poolName, options),
    _listByPoolDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-17-preview",
    },
  );
}
