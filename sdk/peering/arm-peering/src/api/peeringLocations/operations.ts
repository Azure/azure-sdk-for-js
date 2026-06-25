// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _PeeringLocationListResult,
  _peeringLocationListResultDeserializer,
  PeeringLocation,
  PeeringLocationsKind,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { PeeringLocationsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  kind: PeeringLocationsKind,
  options: PeeringLocationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peeringLocations{?api%2Dversion,kind,directPeeringType}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      kind: kind,
      directPeeringType: options?.directPeeringType,
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
): Promise<_PeeringLocationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _peeringLocationListResultDeserializer(result.body);
}

/** Lists all of the available peering locations for the specified kind of peering. */
export function list(
  context: Client,
  kind: PeeringLocationsKind,
  options: PeeringLocationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringLocation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, kind, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
