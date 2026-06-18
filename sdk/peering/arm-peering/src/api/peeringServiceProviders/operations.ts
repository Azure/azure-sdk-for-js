// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _PeeringServiceProviderListResult,
  _peeringServiceProviderListResultDeserializer,
  PeeringServiceProvider,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { PeeringServiceProvidersListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: PeeringServiceProvidersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peeringServiceProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PeeringServiceProviderListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _peeringServiceProviderListResultDeserializer(result.body);
}

/** Lists all of the available peering service locations for the specified kind of peering. */
export function list(
  context: Client,
  options: PeeringServiceProvidersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringServiceProvider> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
