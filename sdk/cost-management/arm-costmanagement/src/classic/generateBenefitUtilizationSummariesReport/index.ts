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
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use generateBySavingsPlanId instead */
  beginGenerateBySavingsPlanId: (
    savingsPlanOrderId: string,
    savingsPlanId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BenefitUtilizationSummariesOperationStatus>,
      BenefitUtilizationSummariesOperationStatus
    >
  >;
  /** @deprecated use generateBySavingsPlanId instead */
  beginGenerateBySavingsPlanIdAndWait: (
    savingsPlanOrderId: string,
    savingsPlanId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
  ) => Promise<BenefitUtilizationSummariesOperationStatus>;
  /** Triggers generation of a benefit utilization summaries report for the provided savings plan order. */
  generateBySavingsPlanOrderId: (
    savingsPlanOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** @deprecated use generateBySavingsPlanOrderId instead */
  beginGenerateBySavingsPlanOrderId: (
    savingsPlanOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BenefitUtilizationSummariesOperationStatus>,
      BenefitUtilizationSummariesOperationStatus
    >
  >;
  /** @deprecated use generateBySavingsPlanOrderId instead */
  beginGenerateBySavingsPlanOrderIdAndWait: (
    savingsPlanOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
  ) => Promise<BenefitUtilizationSummariesOperationStatus>;
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
  /** @deprecated use generateByReservationId instead */
  beginGenerateByReservationId: (
    reservationOrderId: string,
    reservationId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BenefitUtilizationSummariesOperationStatus>,
      BenefitUtilizationSummariesOperationStatus
    >
  >;
  /** @deprecated use generateByReservationId instead */
  beginGenerateByReservationIdAndWait: (
    reservationOrderId: string,
    reservationId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
  ) => Promise<BenefitUtilizationSummariesOperationStatus>;
  /** Triggers generation of a benefit utilization summaries report for the provided reservation order. */
  generateByReservationOrderId: (
    reservationOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** @deprecated use generateByReservationOrderId instead */
  beginGenerateByReservationOrderId: (
    reservationOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BenefitUtilizationSummariesOperationStatus>,
      BenefitUtilizationSummariesOperationStatus
    >
  >;
  /** @deprecated use generateByReservationOrderId instead */
  beginGenerateByReservationOrderIdAndWait: (
    reservationOrderId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
  ) => Promise<BenefitUtilizationSummariesOperationStatus>;
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
  /** @deprecated use generateByBillingProfile instead */
  beginGenerateByBillingProfile: (
    billingAccountId: string,
    billingProfileId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BenefitUtilizationSummariesOperationStatus>,
      BenefitUtilizationSummariesOperationStatus
    >
  >;
  /** @deprecated use generateByBillingProfile instead */
  beginGenerateByBillingProfileAndWait: (
    billingAccountId: string,
    billingProfileId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
  ) => Promise<BenefitUtilizationSummariesOperationStatus>;
  /** Triggers generation of a benefit utilization summaries report for the provided billing account. This API supports only enrollment accounts. */
  generateByBillingAccount: (
    billingAccountId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
  ) => PollerLike<
    OperationState<BenefitUtilizationSummariesOperationStatus>,
    BenefitUtilizationSummariesOperationStatus
  >;
  /** @deprecated use generateByBillingAccount instead */
  beginGenerateByBillingAccount: (
    billingAccountId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BenefitUtilizationSummariesOperationStatus>,
      BenefitUtilizationSummariesOperationStatus
    >
  >;
  /** @deprecated use generateByBillingAccount instead */
  beginGenerateByBillingAccountAndWait: (
    billingAccountId: string,
    benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
    options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
  ) => Promise<BenefitUtilizationSummariesOperationStatus>;
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
    beginGenerateBySavingsPlanId: async (
      savingsPlanOrderId: string,
      savingsPlanId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
    ) => {
      const poller = generateBySavingsPlanId(
        context,
        savingsPlanOrderId,
        savingsPlanId,
        benefitUtilizationSummariesRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateBySavingsPlanIdAndWait: async (
      savingsPlanOrderId: string,
      savingsPlanId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOptionalParams,
    ) => {
      return await generateBySavingsPlanId(
        context,
        savingsPlanOrderId,
        savingsPlanId,
        benefitUtilizationSummariesRequest,
        options,
      );
    },
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
    beginGenerateBySavingsPlanOrderId: async (
      savingsPlanOrderId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
    ) => {
      const poller = generateBySavingsPlanOrderId(
        context,
        savingsPlanOrderId,
        benefitUtilizationSummariesRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateBySavingsPlanOrderIdAndWait: async (
      savingsPlanOrderId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOptionalParams,
    ) => {
      return await generateBySavingsPlanOrderId(
        context,
        savingsPlanOrderId,
        benefitUtilizationSummariesRequest,
        options,
      );
    },
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
    beginGenerateByReservationId: async (
      reservationOrderId: string,
      reservationId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
    ) => {
      const poller = generateByReservationId(
        context,
        reservationOrderId,
        reservationId,
        benefitUtilizationSummariesRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateByReservationIdAndWait: async (
      reservationOrderId: string,
      reservationId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOptionalParams,
    ) => {
      return await generateByReservationId(
        context,
        reservationOrderId,
        reservationId,
        benefitUtilizationSummariesRequest,
        options,
      );
    },
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
    beginGenerateByReservationOrderId: async (
      reservationOrderId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
    ) => {
      const poller = generateByReservationOrderId(
        context,
        reservationOrderId,
        benefitUtilizationSummariesRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateByReservationOrderIdAndWait: async (
      reservationOrderId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOptionalParams,
    ) => {
      return await generateByReservationOrderId(
        context,
        reservationOrderId,
        benefitUtilizationSummariesRequest,
        options,
      );
    },
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
    beginGenerateByBillingProfile: async (
      billingAccountId: string,
      billingProfileId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
    ) => {
      const poller = generateByBillingProfile(
        context,
        billingAccountId,
        billingProfileId,
        benefitUtilizationSummariesRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateByBillingProfileAndWait: async (
      billingAccountId: string,
      billingProfileId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOptionalParams,
    ) => {
      return await generateByBillingProfile(
        context,
        billingAccountId,
        billingProfileId,
        benefitUtilizationSummariesRequest,
        options,
      );
    },
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
    beginGenerateByBillingAccount: async (
      billingAccountId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
    ) => {
      const poller = generateByBillingAccount(
        context,
        billingAccountId,
        benefitUtilizationSummariesRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateByBillingAccountAndWait: async (
      billingAccountId: string,
      benefitUtilizationSummariesRequest: BenefitUtilizationSummariesRequest,
      options?: GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOptionalParams,
    ) => {
      return await generateByBillingAccount(
        context,
        billingAccountId,
        benefitUtilizationSummariesRequest,
        options,
      );
    },
  };
}

export function _getGenerateBenefitUtilizationSummariesReportOperations(
  context: CostManagementContext,
): GenerateBenefitUtilizationSummariesReportOperations {
  return {
    ..._getGenerateBenefitUtilizationSummariesReport(context),
  };
}
