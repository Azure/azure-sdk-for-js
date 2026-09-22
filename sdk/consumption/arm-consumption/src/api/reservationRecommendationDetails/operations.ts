// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext as Client } from "../index.js";
import type {
  ReservationRecommendationDetailsModel,
  Scope,
  Term,
  LookBackPeriod,
} from "../../models/models.js";
import {
  reservationRecommendationDetailsModelDeserializer,
  highCasedErrorResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ReservationRecommendationDetailsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceScope: string,
  scope: Scope,
  region: string,
  term: Term,
  lookBackPeriod: LookBackPeriod,
  product: string,
  options: ReservationRecommendationDetailsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceScope}/providers/Microsoft.Consumption/reservationRecommendationDetails{?api%2Dversion,scope,region,term,lookBackPeriod,product,%24filter}",
    {
      resourceScope: resourceScope,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      scope: scope,
      region: region,
      term: term,
      lookBackPeriod: lookBackPeriod,
      product: product,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationRecommendationDetailsModel | undefined> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = highCasedErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? reservationRecommendationDetailsModelDeserializer(result.body) : undefined;
}

/** Details of a reservation recommendation for what-if analysis of reserved instances. */
export async function get(
  context: Client,
  resourceScope: string,
  scope: Scope,
  region: string,
  term: Term,
  lookBackPeriod: LookBackPeriod,
  product: string,
  options: ReservationRecommendationDetailsGetOptionalParams = { requestOptions: {} },
): Promise<ReservationRecommendationDetailsModel | undefined> {
  const result = await _getSend(
    context,
    resourceScope,
    scope,
    region,
    term,
    lookBackPeriod,
    product,
    options,
  );
  return _getDeserialize(result);
}
