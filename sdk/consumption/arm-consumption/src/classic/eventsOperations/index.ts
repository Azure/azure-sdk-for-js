// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  listByBillingAccount,
  listByBillingProfile,
} from "../../api/eventsOperations/operations.js";
import {
  EventsOperationsListByBillingAccountOptionalParams,
  EventsOperationsListByBillingProfileOptionalParams,
} from "../../api/eventsOperations/options.js";
import { EventSummary } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EventsOperations operations. */
export interface EventsOperationsOperations {
  /** Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. */
  listByBillingAccount: (
    billingAccountId: string,
    options?: EventsOperationsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<EventSummary>;
  /** Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. */
  listByBillingProfile: (
    billingAccountId: string,
    billingProfileId: string,
    startDate: string,
    endDate: string,
    options?: EventsOperationsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<EventSummary>;
}

function _getEventsOperations(context: ConsumptionManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountId: string,
      options?: EventsOperationsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountId, options),
    listByBillingProfile: (
      billingAccountId: string,
      billingProfileId: string,
      startDate: string,
      endDate: string,
      options?: EventsOperationsListByBillingProfileOptionalParams,
    ) =>
      listByBillingProfile(
        context,
        billingAccountId,
        billingProfileId,
        startDate,
        endDate,
        options,
      ),
  };
}

export function _getEventsOperationsOperations(
  context: ConsumptionManagementContext,
): EventsOperationsOperations {
  return {
    ..._getEventsOperations(context),
  };
}
