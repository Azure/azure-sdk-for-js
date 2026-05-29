// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  DownloadURL,
  downloadURLDeserializer,
  errorResponseDeserializer,
  armErrorResponseDeserializer,
  OperationStatus,
  operationStatusDeserializer,
  PricesheetDownloadProperties,
  pricesheetDownloadPropertiesDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PriceSheetDownloadByBillingAccountOptionalParams,
  PriceSheetDownloadByBillingProfileOptionalParams,
  PriceSheetDownloadByInvoiceOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _downloadByBillingAccountSend(
  context: Client,
  billingAccountId: string,
  billingPeriodName: string,
  options: PriceSheetDownloadByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.CostManagement/pricesheets/default/download{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingPeriodName: billingPeriodName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _downloadByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = armErrorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusDeserializer(result.body);
}

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
export function downloadByBillingAccount(
  context: Client,
  billingAccountId: string,
  billingPeriodName: string,
  options: PriceSheetDownloadByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatus>, OperationStatus> {
  return getLongRunningPoller(
    context,
    _downloadByBillingAccountDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _downloadByBillingAccountSend(context, billingAccountId, billingPeriodName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01",
    },
  ) as PollerLike<OperationState<OperationStatus>, OperationStatus>;
}

export function _downloadByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: PriceSheetDownloadByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/providers/Microsoft.CostManagement/pricesheets/default/download{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _downloadByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<PricesheetDownloadProperties> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return pricesheetDownloadPropertiesDeserializer(result.body);
}

/**
 * Gets a URL to download the current month's pricesheet for a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * You can use the new 2023-09-01 API version for billing periods January 2023 onwards. Azure Reserved Instance (RI) pricing is only available through the new version of the API.
 *
 * Due to Azure product growth, the Azure price sheet download experience in this preview version will be updated from a single csv/json file to a Zip file containing multiple csv/json files, each with max size of 75MB.
 */
export function downloadByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: PriceSheetDownloadByBillingProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PricesheetDownloadProperties>, PricesheetDownloadProperties> {
  return getLongRunningPoller(
    context,
    _downloadByBillingProfileDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _downloadByBillingProfileSend(context, billingAccountName, billingProfileName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01",
    },
  ) as PollerLike<OperationState<PricesheetDownloadProperties>, PricesheetDownloadProperties>;
}

export function _downloadByInvoiceSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceName: string,
  options: PriceSheetDownloadByInvoiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoices/{invoiceName}/providers/Microsoft.CostManagement/pricesheets/default/download{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _downloadByInvoiceDeserialize(
  result: PathUncheckedResponse,
): Promise<DownloadURL> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return downloadURLDeserializer(result.body);
}

/** Gets a URL to download the pricesheet for an invoice. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function downloadByInvoice(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceName: string,
  options: PriceSheetDownloadByInvoiceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DownloadURL>, DownloadURL> {
  return getLongRunningPoller(context, _downloadByInvoiceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _downloadByInvoiceSend(context, billingAccountName, billingProfileName, invoiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<OperationState<DownloadURL>, DownloadURL>;
}
