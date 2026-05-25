// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { create, get } from "../../api/reservationOrderAlias/operations.js";
import {
  ReservationOrderAliasCreateOptionalParams,
  ReservationOrderAliasGetOptionalParams,
} from "../../api/reservationOrderAlias/options.js";
import {
  ReservationOrderAliasResponse,
  ReservationOrderAliasRequest,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReservationOrderAlias operations. */
export interface ReservationOrderAliasOperations {
  /** Create a reservation order alias. */
  create: (
    reservationOrderAliasName: string,
    body: ReservationOrderAliasRequest,
    options?: ReservationOrderAliasCreateOptionalParams,
  ) => PollerLike<OperationState<ReservationOrderAliasResponse>, ReservationOrderAliasResponse>;
  /** @deprecated use create instead */
  beginCreate: (
    reservationOrderAliasName: string,
    body: ReservationOrderAliasRequest,
    options?: ReservationOrderAliasCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReservationOrderAliasResponse>, ReservationOrderAliasResponse>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    reservationOrderAliasName: string,
    body: ReservationOrderAliasRequest,
    options?: ReservationOrderAliasCreateOptionalParams,
  ) => Promise<ReservationOrderAliasResponse>;
  /** Get a reservation order alias. */
  get: (
    reservationOrderAliasName: string,
    options?: ReservationOrderAliasGetOptionalParams,
  ) => Promise<ReservationOrderAliasResponse>;
}

function _getReservationOrderAlias(context: BillingBenefitsRPContext) {
  return {
    create: (
      reservationOrderAliasName: string,
      body: ReservationOrderAliasRequest,
      options?: ReservationOrderAliasCreateOptionalParams,
    ) => create(context, reservationOrderAliasName, body, options),
    beginCreate: async (
      reservationOrderAliasName: string,
      body: ReservationOrderAliasRequest,
      options?: ReservationOrderAliasCreateOptionalParams,
    ) => {
      const poller = create(context, reservationOrderAliasName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      reservationOrderAliasName: string,
      body: ReservationOrderAliasRequest,
      options?: ReservationOrderAliasCreateOptionalParams,
    ) => {
      return await create(context, reservationOrderAliasName, body, options);
    },
    get: (reservationOrderAliasName: string, options?: ReservationOrderAliasGetOptionalParams) =>
      get(context, reservationOrderAliasName, options),
  };
}

export function _getReservationOrderAliasOperations(
  context: BillingBenefitsRPContext,
): ReservationOrderAliasOperations {
  return {
    ..._getReservationOrderAlias(context),
  };
}
