// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext as Client } from "../index.js";
import type {
  _ReservationRecommendationsListResult,
  ReservationRecommendationUnion,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _reservationRecommendationsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ReservationRecommendationsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceScope: string,
  options: ReservationRecommendationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceScope}/providers/Microsoft.Consumption/reservationRecommendations{?api%2Dversion,%24filter}",
    {
      resourceScope: resourceScope,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": options?.filter,
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
): Promise<_ReservationRecommendationsListResult> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationRecommendationsListResultDeserializer(result.body);
}

/** List of recommendations for purchasing reserved instances. */
export function list(
  context: Client,
  resourceScope: string,
  options: ReservationRecommendationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationRecommendationUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceScope, options),
    _listDeserialize,
    ["200", "204"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}
