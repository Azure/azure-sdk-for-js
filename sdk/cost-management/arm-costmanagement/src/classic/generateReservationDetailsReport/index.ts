// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import {
  byBillingProfileId,
  byBillingAccountId,
} from "../../api/generateReservationDetailsReport/operations.js";
import type {
  GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
  GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
} from "../../api/generateReservationDetailsReport/options.js";
import type { OperationStatus } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GenerateReservationDetailsReport operations. */
export interface GenerateReservationDetailsReportOperations {
  /** Generates the reservations details report for provided date range asynchronously by billing profile. The Reservation usage details can be viewed by only certain enterprise roles by default. For more details on the roles see, https://docs.microsoft.com/azure/cost-management-billing/reservations/reservation-utilization#view-utilization-in-the-azure-portal-with-azure-rbac-access */
  byBillingProfileId: (
    billingAccountId: string,
    billingProfileId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
  ) => PollerLike<OperationState<OperationStatus>, OperationStatus>;
  /** @deprecated use byBillingProfileId instead */
  beginByBillingProfileId: (
    billingAccountId: string,
    billingProfileId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatus>, OperationStatus>>;
  /** @deprecated use byBillingProfileId instead */
  beginByBillingProfileIdAndWait: (
    billingAccountId: string,
    billingProfileId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
  ) => Promise<OperationStatus>;
  /** Generates the reservations details report for provided date range asynchronously based on enrollment id. The Reservation usage details can be viewed only by certain enterprise roles. For more details on the roles see, https://docs.microsoft.com/azure/cost-management-billing/manage/understand-ea-roles#usage-and-costs-access-by-role */
  byBillingAccountId: (
    billingAccountId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
  ) => PollerLike<OperationState<OperationStatus>, OperationStatus>;
  /** @deprecated use byBillingAccountId instead */
  beginByBillingAccountId: (
    billingAccountId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatus>, OperationStatus>>;
  /** @deprecated use byBillingAccountId instead */
  beginByBillingAccountIdAndWait: (
    billingAccountId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getGenerateReservationDetailsReport(context: CostManagementContext) {
  return {
    byBillingProfileId: (
      billingAccountId: string,
      billingProfileId: string,
      startDate: string,
      endDate: string,
      options?: GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
    ) =>
      byBillingProfileId(context, billingAccountId, billingProfileId, startDate, endDate, options),
    beginByBillingProfileId: async (
      billingAccountId: string,
      billingProfileId: string,
      startDate: string,
      endDate: string,
      options?: GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
    ) => {
      const poller = byBillingProfileId(
        context,
        billingAccountId,
        billingProfileId,
        startDate,
        endDate,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginByBillingProfileIdAndWait: async (
      billingAccountId: string,
      billingProfileId: string,
      startDate: string,
      endDate: string,
      options?: GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
    ) => {
      return await byBillingProfileId(
        context,
        billingAccountId,
        billingProfileId,
        startDate,
        endDate,
        options,
      );
    },
    byBillingAccountId: (
      billingAccountId: string,
      startDate: string,
      endDate: string,
      options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
    ) => byBillingAccountId(context, billingAccountId, startDate, endDate, options),
    beginByBillingAccountId: async (
      billingAccountId: string,
      startDate: string,
      endDate: string,
      options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
    ) => {
      const poller = byBillingAccountId(context, billingAccountId, startDate, endDate, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginByBillingAccountIdAndWait: async (
      billingAccountId: string,
      startDate: string,
      endDate: string,
      options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
    ) => {
      return await byBillingAccountId(context, billingAccountId, startDate, endDate, options);
    },
  };
}

export function _getGenerateReservationDetailsReportOperations(
  context: CostManagementContext,
): GenerateReservationDetailsReportOperations {
  return {
    ..._getGenerateReservationDetailsReport(context),
  };
}
