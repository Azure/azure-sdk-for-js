// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import {
  generateBySavingsPlanId,
  generateBySavingsPlanOrderId,
  generateByReservationId,
  generateByReservationOrderId,
  generateByBillingProfile,
  generateByBillingAccount,
} from "../../api/generateBenefitUtilizationSummariesReport/operations.js";
import {
  GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
  GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
} from "../../api/generateBenefitUtilizationSummariesReport/options.js";
import {
  BenefitUtilizationSummariesRequest,
  BenefitUtilizationSummariesOperationStatus,
} from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GenerateBenefitUtilizationSummariesReport operations. */
export interface GenerateBenefitUtilizationSummariesReportOperations {
  /** Triggers generation of a benefit utilization summaries report for the provided savings plan. */
  generateBySavingsPlanId: (
    savingsPlanOrderId: string,
    savingsPlanId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** Triggers generation of a benefit utilization summaries report for the provided savings plan order. */
  generateBySavingsPlanOrderId: (
    savingsPlanOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** Triggers generation of a benefit utilization summaries report for the provided reservation. */
  generateByReservationId: (
    reservationOrderId: string,
    reservationId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** Triggers generation of a benefit utilization summaries report for the provided reservation order. */
  generateByReservationOrderId: (
    reservationOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** Triggers generation of a benefit utilization summaries report for the provided billing account and billing profile. */
  generateByBillingProfile: (
    billingAccountId: string,
    billingProfileId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** Triggers generation of a benefit utilization summaries report for the provided billing account. This API supports only enrollment accounts. */
  generateByBillingAccount: (
    billingAccountId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
}

function _getGenerateBenefitUtilizationSummariesReport(context: CostManagementContext) {
  return {
    generateBySavingsPlanId: (
      savingsPlanOrderId: string,
      savingsPlanId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
    ) =>
      generateBySavingsPlanId(
        context,
        savingsPlanOrderId,
        savingsPlanId,
        benefitUtilizationSummariesRequest,
        options,
      ),
    generateBySavingsPlanOrderId: (
      savingsPlanOrderId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
    ) =>
      generateBySavingsPlanOrderId(
        context,
        savingsPlanOrderId,
        benefitUtilizationSummariesRequest,
        options,
      ),
    generateByReservationId: (
      reservationOrderId: string,
      reservationId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
    ) =>
      generateByReservationId(
        context,
        reservationOrderId,
        reservationId,
        benefitUtilizationSummariesRequest,
        options,
      ),
    generateByReservationOrderId: (
      reservationOrderId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
    ) =>
      generateByReservationOrderId(
        context,
        reservationOrderId,
        benefitUtilizationSummariesRequest,
        options,
      ),
    generateByBillingProfile: (
      billingAccountId: string,
      billingProfileId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
    ) =>
      generateByBillingProfile(
        context,
        billingAccountId,
        billingProfileId,
        benefitUtilizationSummariesRequest,
        options,
      ),
    generateByBillingAccount: (
      billingAccountId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
    ) =>
      generateByBillingAccount(
        context,
        billingAccountId,
        benefitUtilizationSummariesRequest,
        options,
      ),
  };
}

export function _getGenerateBenefitUtilizationSummariesReportOperations(
  context: CostManagementContext,
): GenerateBenefitUtilizationSummariesReportOperations {
  return {
    ..._getGenerateBenefitUtilizationSummariesReport(context),
  };
}
