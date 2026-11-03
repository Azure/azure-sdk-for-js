// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { list } from "../../api/reservationRecommendations/operations.js";
import type { ReservationRecommendationsListOptionalParams } from "../../api/reservationRecommendations/options.js";
import type { ReservationRecommendationUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReservationRecommendations operations. */
export interface ReservationRecommendationsOperations {
  /** List of recommendations for purchasing reserved instances. */
  list: (
    resourceScope: string,
    options?: ReservationRecommendationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationRecommendationUnion>;
}

function _getReservationRecommendations(context: ConsumptionManagementContext) {
  return {
    list: (resourceScope: string, options?: ReservationRecommendationsListOptionalParams) =>
      list(context, resourceScope, options),
  };
}

export function _getReservationRecommendationsOperations(
  context: ConsumptionManagementContext,
): ReservationRecommendationsOperations {
  return {
    ..._getReservationRecommendations(context),
  };
}
