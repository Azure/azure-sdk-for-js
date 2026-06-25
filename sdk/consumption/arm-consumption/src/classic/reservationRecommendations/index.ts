// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { list } from "../../api/reservationRecommendations/operations.js";
import { ReservationRecommendationsListOptionalParams } from "../../api/reservationRecommendations/options.js";
import { ReservationRecommendationUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
