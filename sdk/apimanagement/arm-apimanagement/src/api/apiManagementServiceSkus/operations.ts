// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ResourceSkuResults,
  _resourceSkuResultsDeserializer,
  ResourceSkuResult,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ApiManagementServiceSkusListAvailableServiceSkusOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listAvailableServiceSkusSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceSkusListAvailableServiceSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _listAvailableServiceSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceSkuResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceSkuResultsDeserializer(result.body);
}

/** Gets all available SKU for a given API Management service */
export function listAvailableServiceSkus(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceSkusListAvailableServiceSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceSkuResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableServiceSkusSend(context, resourceGroupName, serviceName, options),
    _listAvailableServiceSkusDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}
