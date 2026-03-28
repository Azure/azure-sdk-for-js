// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type { _CdnPeeringPrefixListResult, CdnPeeringPrefix } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _cdnPeeringPrefixListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CdnPeeringPrefixesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  peeringLocation: string,
  options: CdnPeeringPrefixesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/cdnPeeringPrefixes{?api%2Dversion,peeringLocation}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      peeringLocation: peeringLocation,
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
): Promise<_CdnPeeringPrefixListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _cdnPeeringPrefixListResultDeserializer(result.body);
}

/** Lists all of the advertised prefixes for the specified peering location */
export function list(
  context: Client,
  peeringLocation: string,
  options: CdnPeeringPrefixesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CdnPeeringPrefix> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, peeringLocation, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
