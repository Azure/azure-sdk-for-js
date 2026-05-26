// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _PeeringReceivedRouteListResult,
  _peeringReceivedRouteListResultDeserializer,
  PeeringReceivedRoute,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ReceivedRoutesListByPeeringOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByPeeringSend(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: ReceivedRoutesListByPeeringOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/receivedRoutes{?api%2Dversion,prefix,asPath,originAsValidationState,rpkiValidationState,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringName: peeringName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      prefix: options?.prefix,
      asPath: options?.asPath,
      originAsValidationState: options?.originAsValidationState,
      rpkiValidationState: options?.rpkiValidationState,
      "%24skipToken": options?.skipToken,
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

export async function _listByPeeringDeserialize(
  result: PathUncheckedResponse,
): Promise<_PeeringReceivedRouteListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peeringReceivedRouteListResultDeserializer(result.body);
}

/** Lists the prefixes received over the specified peering under the given subscription and resource group. */
export function listByPeering(
  context: Client,
  resourceGroupName: string,
  peeringName: string,
  options: ReceivedRoutesListByPeeringOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringReceivedRoute> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPeeringSend(context, resourceGroupName, peeringName, options),
    _listByPeeringDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
