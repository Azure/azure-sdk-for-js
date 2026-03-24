// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { _GatewayResourceSkuResults, GatewayResourceSkuResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _gatewayResourceSkuResultsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ApiManagementGatewaySkusListAvailableSkusOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAvailableSkusSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: ApiManagementGatewaySkusListAvailableSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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

export async function _listAvailableSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_GatewayResourceSkuResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gatewayResourceSkuResultsDeserializer(result.body);
}

/** Gets all available SKU for a given API Management gateway */
export function listAvailableSkus(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: ApiManagementGatewaySkusListAvailableSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GatewayResourceSkuResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableSkusSend(context, resourceGroupName, gatewayName, options),
    _listAvailableSkusDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}
