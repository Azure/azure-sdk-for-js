// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { _ResourceSkuResults, ResourceSkuResult } from "../../models/models.js";
import { errorResponseDeserializer, _resourceSkuResultsDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ApiManagementServiceSkusListAvailableServiceSkusOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
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
    error.details = errorResponseDeserializer(result.body);

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
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}
