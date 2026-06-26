// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _GatewayResourceSkuResults,
  _gatewayResourceSkuResultsDeserializer,
  GatewayResourceSkuResult,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ApiManagementGatewaySkusListAvailableSkusOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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

export async function _listAvailableSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_GatewayResourceSkuResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}
