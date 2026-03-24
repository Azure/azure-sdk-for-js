// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByBillingProfile,
  listByBillingAccount,
  listByReservationOrder,
  updateByBillingAccount,
  getByReservationOrder,
} from "../../api/reservations/operations.js";
import type {
  ReservationsListByBillingProfileOptionalParams,
  ReservationsListByBillingAccountOptionalParams,
  ReservationsListByReservationOrderOptionalParams,
  ReservationsUpdateByBillingAccountOptionalParams,
  ReservationsGetByReservationOrderOptionalParams,
} from "../../api/reservations/options.js";
import type { Reservation, Patch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Reservations operations. */
export interface ReservationsOperations {
  /** Lists the reservations for a billing profile and the roll up counts of reservations group by provisioning state. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: ReservationsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Reservation>;
  /** Lists the reservations in the billing account and the roll up counts of reservations group by provisioning states. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: ReservationsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Reservation>;
  /** List Reservations within a single ReservationOrder in the billing account. */
  listByReservationOrder: (
    billingAccountName: string,
    reservationOrderId: string,
    options?: ReservationsListByReservationOrderOptionalParams,
  ) => PagedAsyncIterableIterator<Reservation>;
  /** Update reservation by billing account. */
  updateByBillingAccount: (
    billingAccountName: string,
    reservationOrderId: string,
    reservationId: string,
    body: Patch,
    options?: ReservationsUpdateByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<Reservation>, Reservation>;
  /** @deprecated use updateByBillingAccount instead */
  beginUpdateByBillingAccount: (
    billingAccountName: string,
    reservationOrderId: string,
    reservationId: string,
    body: Patch,
    options?: ReservationsUpdateByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Reservation>, Reservation>>;
  /** @deprecated use updateByBillingAccount instead */
  beginUpdateByBillingAccountAndWait: (
    billingAccountName: string,
    reservationOrderId: string,
    reservationId: string,
    body: Patch,
    options?: ReservationsUpdateByBillingAccountOptionalParams,
  ) => Promise<Reservation>;
  /** Get specific Reservation details in the billing account. */
  getByReservationOrder: (
    billingAccountName: string,
    reservationOrderId: string,
    reservationId: string,
    options?: ReservationsGetByReservationOrderOptionalParams,
  ) => Promise<Reservation>;
}

function _getReservations(context: BillingManagementContext) {
  return {
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: ReservationsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    listByBillingAccount: (
      billingAccountName: string,
      options?: ReservationsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    listByReservationOrder: (
      billingAccountName: string,
      reservationOrderId: string,
      options?: ReservationsListByReservationOrderOptionalParams,
    ) => listByReservationOrder(context, billingAccountName, reservationOrderId, options),
    updateByBillingAccount: (
      billingAccountName: string,
      reservationOrderId: string,
      reservationId: string,
      body: Patch,
      options?: ReservationsUpdateByBillingAccountOptionalParams,
    ) =>
      updateByBillingAccount(
        context,
        billingAccountName,
        reservationOrderId,
        reservationId,
        body,
        options,
      ),
    beginUpdateByBillingAccount: async (
      billingAccountName: string,
      reservationOrderId: string,
      reservationId: string,
      body: Patch,
      options?: ReservationsUpdateByBillingAccountOptionalParams,
    ) => {
      const poller = updateByBillingAccount(
        context,
        billingAccountName,
        reservationOrderId,
        reservationId,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateByBillingAccountAndWait: async (
      billingAccountName: string,
      reservationOrderId: string,
      reservationId: string,
      body: Patch,
      options?: ReservationsUpdateByBillingAccountOptionalParams,
    ) => {
      return await updateByBillingAccount(
        context,
        billingAccountName,
        reservationOrderId,
        reservationId,
        body,
        options,
      );
    },
    getByReservationOrder: (
      billingAccountName: string,
      reservationOrderId: string,
      reservationId: string,
      options?: ReservationsGetByReservationOrderOptionalParams,
    ) =>
      getByReservationOrder(
        context,
        billingAccountName,
        reservationOrderId,
        reservationId,
        options,
      ),
  };
}

export function _getReservationsOperations(
  context: BillingManagementContext,
): ReservationsOperations {
  return {
    ..._getReservations(context),
  };
}
