// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import {
  downloadByBillingAccount,
  downloadByBillingProfile,
  downloadByInvoice,
} from "../../api/priceSheet/operations.js";
import {
  PriceSheetDownloadByBillingAccountOptionalParams,
  PriceSheetDownloadByBillingProfileOptionalParams,
  PriceSheetDownloadByInvoiceOptionalParams,
} from "../../api/priceSheet/options.js";
import { DownloadURL, OperationStatus, PricesheetDownloadProperties } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PriceSheet operations. */
export interface PriceSheetOperations {
  /**
   * Generates the pricesheet for the provided billing period asynchronously based on the Enrollment ID. This is for Enterprise Agreement customers.
   *
   * **Migrate to version 2025-03-01**
   *
   * You can use the 2025-03-01 API version with the new URI:
   *
   * '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.CostManagement/pricesheets/default/download'
   *
   * With a new schema detailed below, the new version of the price sheet provides additional information and includes prices for Azure Reserved Instances (RI) for the current billing period. We recommend downloading an Azure Price Sheet for when entering a new billing period if you would maintain an ongoing record of past Azure Reserved Instance (RI) pricing.
   *
   * The EA Azure price sheet is available for billing periods in the past 13 months. To request a price sheet for a billing period older than 13 months, please contact support.
   *
   * The Azure price sheet download experience has been updated from a single .csv file to a zip file containing multiple .csv files, each with max size of 75MB. The 2023-11-01 version has been upgraded to use http POST method; details can be found below.
   *
   * All versions of the Microsoft.Consumption Azure Price Sheet - Download by Billing Account (including 2022-06-01, 2021-10-01, 2020-01-01-preview, 2019-10-01, 2019-05-01) are scheduled to be retired on 01 June 2026 and will no longer be supported after this date.
   */
  downloadByBillingAccount: (
    billingAccountId: string,
    billingPeriodName: string,
    options?: PriceSheetDownloadByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<OperationStatus>, OperationStatus>;
  /**
   * Gets a URL to download the current month's pricesheet for a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
   *
   * You can use the new 2023-09-01 API version for billing periods January 2023 onwards. Azure Reserved Instance (RI) pricing is only available through the new version of the API.
   *
   * Due to Azure product growth, the Azure price sheet download experience in this preview version will be updated from a single csv/json file to a Zip file containing multiple csv/json files, each with max size of 75MB.
   */
  downloadByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: PriceSheetDownloadByBillingProfileOptionalParams,
  ) => PollerLike<OperationState<PricesheetDownloadProperties>, PricesheetDownloadProperties>;
  /** Gets a URL to download the pricesheet for an invoice. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  downloadByInvoice: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceName: string,
    options?: PriceSheetDownloadByInvoiceOptionalParams,
  ) => PollerLike<OperationState<DownloadURL>, DownloadURL>;
}

function _getPriceSheet(context: CostManagementContext) {
  return {
    downloadByBillingAccount: (
      billingAccountId: string,
      billingPeriodName: string,
      options?: PriceSheetDownloadByBillingAccountOptionalParams,
    ) => downloadByBillingAccount(context, billingAccountId, billingPeriodName, options),
    downloadByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: PriceSheetDownloadByBillingProfileOptionalParams,
    ) => downloadByBillingProfile(context, billingAccountName, billingProfileName, options),
    downloadByInvoice: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceName: string,
      options?: PriceSheetDownloadByInvoiceOptionalParams,
    ) => downloadByInvoice(context, billingAccountName, billingProfileName, invoiceName, options),
  };
}

export function _getPriceSheetOperations(context: CostManagementContext): PriceSheetOperations {
  return {
    ..._getPriceSheet(context),
  };
}
