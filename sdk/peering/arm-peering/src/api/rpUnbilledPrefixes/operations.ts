// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _RpUnbilledPrefixListResult,
  _rpUnbilledPrefixListResultDeserializer,
  RpUnbilledPrefix,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { RpUnbilledPrefixesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: RpUnbilledPrefixesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/rpUnbilledPrefixes{?api%2Dversion,consolidate}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      consolidate: options?.consolidate,
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
): Promise<_RpUnbilledPrefixListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _rpUnbilledPrefixListResultDeserializer(result.body);
}

/** Lists all of the RP unbilled prefixes for the specified peering */
export function list(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: RpUnbilledPrefixesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RpUnbilledPrefix> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, peeringName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
