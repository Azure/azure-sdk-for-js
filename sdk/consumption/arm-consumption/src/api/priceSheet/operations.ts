// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PriceSheetResult,
  priceSheetResultDeserializer,
  OperationStatus,
  operationStatusDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PriceSheetDownloadByBillingAccountPeriodOptionalParams,
  PriceSheetGetOptionalParams,
  PriceSheetGetByBillingPeriodOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _downloadByBillingAccountPeriodSend(
  context: Client,
  billingAccountId: string,
  billingPeriodName: string,
  options: PriceSheetDownloadByBillingAccountPeriodOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/pricesheets/download{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingPeriodName: billingPeriodName,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _downloadByBillingAccountPeriodDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** Generates the pricesheet for the provided billing period asynchronously based on the enrollment id */
export function downloadByBillingAccountPeriod(
  context: Client,
  billingAccountId: string,
  billingPeriodName: string,
  options: PriceSheetDownloadByBillingAccountPeriodOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatus>, OperationStatus> {
  return getLongRunningPoller(
    context,
    _downloadByBillingAccountPeriodDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _downloadByBillingAccountPeriodSend(context, billingAccountId, billingPeriodName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-08-01",
    },
  ) as PollerLike<OperationState<OperationStatus>, OperationStatus>;
}

export function _getSend(
  context: Client,
  options: PriceSheetGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Consumption/pricesheets/default{?api%2Dversion,%24expand,%24skiptoken,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24expand": options?.expand,
      "%24skiptoken": options?.skiptoken,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PriceSheetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return priceSheetResultDeserializer(result.body);
}

/** Gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later. */
export async function get(
  context: Client,
  options: PriceSheetGetOptionalParams = { requestOptions: {} },
): Promise<PriceSheetResult> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}

export function _getByBillingPeriodSend(
  context: Client,
  billingPeriodName: string,
  options: PriceSheetGetByBillingPeriodOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/pricesheets/default{?api%2Dversion,%24expand,%24skiptoken,%24top}",
    {
      subscriptionId: context.subscriptionId,
      billingPeriodName: billingPeriodName,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24expand": options?.expand,
      "%24skiptoken": options?.skiptoken,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getByBillingPeriodDeserialize(
  result: PathUncheckedResponse,
): Promise<PriceSheetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return priceSheetResultDeserializer(result.body);
}

/** Get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later. */
export async function getByBillingPeriod(
  context: Client,
  billingPeriodName: string,
  options: PriceSheetGetByBillingPeriodOptionalParams = { requestOptions: {} },
): Promise<PriceSheetResult> {
  const result = await _getByBillingPeriodSend(context, billingPeriodName, options);
  return _getByBillingPeriodDeserialize(result);
}
