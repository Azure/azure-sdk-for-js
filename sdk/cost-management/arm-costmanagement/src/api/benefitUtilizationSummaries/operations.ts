// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _BenefitUtilizationSummariesListResult,
  _benefitUtilizationSummariesListResultDeserializer,
  BenefitUtilizationSummaryUnion,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BenefitUtilizationSummariesListBySavingsPlanIdOptionalParams,
  BenefitUtilizationSummariesListBySavingsPlanOrderOptionalParams,
  BenefitUtilizationSummariesListByBillingProfileIdOptionalParams,
  BenefitUtilizationSummariesListByBillingAccountIdOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySavingsPlanIdSend(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  options: BenefitUtilizationSummariesListBySavingsPlanIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}/providers/Microsoft.CostManagement/benefitUtilizationSummaries{?api%2Dversion,%24filter,grainParameter}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      grainParameter: options?.grainParameter,
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

export async function _listBySavingsPlanIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_BenefitUtilizationSummariesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _benefitUtilizationSummariesListResultDeserializer(result.body);
}

/** Lists the savings plan utilization summaries for daily or monthly grain. */
export function listBySavingsPlanId(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  options: BenefitUtilizationSummariesListBySavingsPlanIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySavingsPlanIdSend(context, savingsPlanOrderId, savingsPlanId, options),
    _listBySavingsPlanIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _listBySavingsPlanOrderSend(
  context: Client,
  savingsPlanOrderId: string,
  options: BenefitUtilizationSummariesListBySavingsPlanOrderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/providers/Microsoft.CostManagement/benefitUtilizationSummaries{?api%2Dversion,%24filter,grainParameter}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      grainParameter: options?.grainParameter,
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

export async function _listBySavingsPlanOrderDeserialize(
  result: PathUncheckedResponse,
): Promise<_BenefitUtilizationSummariesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _benefitUtilizationSummariesListResultDeserializer(result.body);
}

/** Lists the savings plan utilization summaries for daily or monthly grain. */
export function listBySavingsPlanOrder(
  context: Client,
  savingsPlanOrderId: string,
  options: BenefitUtilizationSummariesListBySavingsPlanOrderOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySavingsPlanOrderSend(context, savingsPlanOrderId, options),
    _listBySavingsPlanOrderDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _listByBillingProfileIdSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: BenefitUtilizationSummariesListByBillingProfileIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/benefitUtilizationSummaries{?api%2Dversion,grainParameter,filter}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      grainParameter: options?.grainParameter,
      filter: options?.filter,
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

export async function _listByBillingProfileIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_BenefitUtilizationSummariesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _benefitUtilizationSummariesListResultDeserializer(result.body);
}

/** Lists savings plan utilization summaries for billing profile. Supported at grain values: 'Daily' and 'Monthly'. */
export function listByBillingProfileId(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: BenefitUtilizationSummariesListByBillingProfileIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileIdSend(context, billingAccountId, billingProfileId, options),
    _listByBillingProfileIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _listByBillingAccountIdSend(
  context: Client,
  billingAccountId: string,
  options: BenefitUtilizationSummariesListByBillingAccountIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/benefitUtilizationSummaries{?api%2Dversion,grainParameter,filter}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      grainParameter: options?.grainParameter,
      filter: options?.filter,
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

export async function _listByBillingAccountIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_BenefitUtilizationSummariesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _benefitUtilizationSummariesListResultDeserializer(result.body);
}

/** Lists savings plan utilization summaries for the enterprise agreement scope. Supported at grain values: 'Daily' and 'Monthly'. */
export function listByBillingAccountId(
  context: Client,
  billingAccountId: string,
  options: BenefitUtilizationSummariesListByBillingAccountIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountIdSend(context, billingAccountId, options),
    _listByBillingAccountIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}
