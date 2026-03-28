// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type { Peering, _PeeringListResult, LegacyPeeringsKind } from "../../models/models.js";
import { errorResponseDeserializer, _peeringListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { LegacyPeeringsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  peeringLocation: string,
  kind: LegacyPeeringsKind,
  options: LegacyPeeringsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/legacyPeerings{?api%2Dversion,peeringLocation,kind,asn,directPeeringType}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      peeringLocation: peeringLocation,
      kind: kind,
      asn: options?.asn,
      directPeeringType: options?.directPeeringType,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PeeringListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peeringListResultDeserializer(result.body);
}

/** Lists all of the legacy peerings under the given subscription matching the specified kind and location. */
export function list(
  context: Client,
  peeringLocation: string,
  kind: LegacyPeeringsKind,
  options: LegacyPeeringsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Peering> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, peeringLocation, kind, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
