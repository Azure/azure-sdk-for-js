// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { listByBillingAccount, listByBillingProfile } from "../../api/events/operations.js";
import type {
  EventsListByBillingAccountOptionalParams,
  EventsListByBillingProfileOptionalParams,
} from "../../api/events/options.js";
import type { EventSummary } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Events operations. */
export interface EventsOperations {
  /** Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. */
  listByBillingAccount: (
    billingAccountId: string,
    options?: EventsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<EventSummary>;
  /** Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. */
  listByBillingProfile: (
    billingAccountId: string,
    billingProfileId: string,
    startDate: string,
    endDate: string,
    options?: EventsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<EventSummary>;
}

function _getEvents(context: ConsumptionManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountId: string,
      options?: EventsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountId, options),
    listByBillingProfile: (
      billingAccountId: string,
      billingProfileId: string,
      startDate: string,
      endDate: string,
      options?: EventsListByBillingProfileOptionalParams,
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

export function _getEventsOperations(context: ConsumptionManagementContext): EventsOperations {
  return {
    ..._getEvents(context),
  };
}
