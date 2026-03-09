// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext as Client } from "../index.js";
import type {
  AzureTrafficCollector,
  _AzureTrafficCollectorListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _azureTrafficCollectorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AzureTrafficCollectorsBySubscriptionListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AzureTrafficCollectorsBySubscriptionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkFunction/azureTrafficCollectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureTrafficCollectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _azureTrafficCollectorListResultDeserializer(result.body);
}

/** Return list of Azure Traffic Collectors in a subscription */
export function list(
  context: Client,
  options: AzureTrafficCollectorsBySubscriptionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureTrafficCollector> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-11-01" },
  );
}
