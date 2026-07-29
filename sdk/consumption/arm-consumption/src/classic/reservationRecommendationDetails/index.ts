// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { get } from "../../api/reservationRecommendationDetails/operations.js";
import type { ReservationRecommendationDetailsGetOptionalParams } from "../../api/reservationRecommendationDetails/options.js";
import type {
  ReservationRecommendationDetailsModel,
  Scope,
  Term,
  LookBackPeriod,
} from "../../models/models.js";

/** Interface representing a ReservationRecommendationDetails operations. */
export interface ReservationRecommendationDetailsOperations {
  /** Details of a reservation recommendation for what-if analysis of reserved instances. */
  get: (
    resourceScope: string,
    scope: Scope,
    region: string,
    term: Term,
    lookBackPeriod: LookBackPeriod,
    product: string,
    options?: ReservationRecommendationDetailsGetOptionalParams,
  ) => Promise<ReservationRecommendationDetailsModel | undefined>;
}

function _getReservationRecommendationDetails(context: ConsumptionManagementContext) {
  return {
    get: (
      resourceScope: string,
      scope: Scope,
      region: string,
      term: Term,
      lookBackPeriod: LookBackPeriod,
      product: string,
      options?: ReservationRecommendationDetailsGetOptionalParams,
    ) => get(context, resourceScope, scope, region, term, lookBackPeriod, product, options),
  };
}

export function _getReservationRecommendationDetailsOperations(
  context: ConsumptionManagementContext,
): ReservationRecommendationDetailsOperations {
  return {
    ..._getReservationRecommendationDetails(context),
  };
}
