// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import {
  byBillingProfileId,
  byBillingAccountId,
} from "../../api/generateReservationDetailsReport/operations.js";
import {
  GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
  GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
} from "../../api/generateReservationDetailsReport/options.js";
import { OperationStatus } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GenerateReservationDetailsReport operations. */
export interface GenerateReservationDetailsReportOperations {
  /** Generates the reservations details report for provided date range asynchronously by billing profile. The Reservation usage details can be viewed by only certain enterprise roles by default. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/reservation-utilization#view-utilization-in-the-azure-portal-with-azure-rbac-access */
  byBillingProfileId: (
    billingAccountId: string,
    billingProfileId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingProfileIdOptionalParams,
  ) => PollerLike<OperationState<OperationStatus>, OperationStatus>;
  /** Generates the reservations details report for provided date range asynchronously based on enrollment id. The Reservation usage details can be viewed only by certain enterprise roles. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/understand-ea-roles#usage-and-costs-access-by-role */
  byBillingAccountId: (
    billingAccountId: string,
    startDate: string,
    endDate: string,
    options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
  ) => PollerLike<OperationState<OperationStatus>, OperationStatus>;
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
    byBillingAccountId: (
      billingAccountId: string,
      startDate: string,
      endDate: string,
      options?: GenerateReservationDetailsReportByBillingAccountIdOptionalParams,
    ) => byBillingAccountId(context, billingAccountId, startDate, endDate, options),
  };
}

export function _getGenerateReservationDetailsReportOperations(
  context: CostManagementContext,
): GenerateReservationDetailsReportOperations {
  return {
    ..._getGenerateReservationDetailsReport(context),
  };
}
