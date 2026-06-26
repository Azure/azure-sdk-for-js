// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ResourceSkuListResult,
  _resourceSkuListResultDeserializer,
  ResourceSku,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { SkuListByLocationOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  locationName: string,
  options: SkuListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/locations/{locationName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceSkuListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceSkuListResultDeserializer(result.body);
}

/** List ResourceSku resources by subscription ID */
export function listByLocation(
  context: Client,
  locationName: string,
  options: SkuListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceSku> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, locationName, options),
    _listByLocationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-17-preview",
    },
  );
}
