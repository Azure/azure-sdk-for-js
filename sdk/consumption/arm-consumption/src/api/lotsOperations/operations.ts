// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _Lots,
  _lotsDeserializer,
  LotSummary,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  LotsOperationsListByCustomerOptionalParams,
  LotsOperationsListByBillingAccountOptionalParams,
  LotsOperationsListByBillingProfileOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByCustomerSend(
  context: Client,
  billingAccountId: string,
  customerId: string,
  options: LotsOperationsListByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/customers/{customerId}/providers/Microsoft.Consumption/lots{?api%2Dversion,%24filter}",
    {
      billingAccountId: billingAccountId,
      customerId: customerId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": options?.filter,
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

export async function _listByCustomerDeserialize(result: PathUncheckedResponse): Promise<_Lots> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _lotsDeserializer(result.body);
}

/** Lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts. */
export function listByCustomer(
  context: Client,
  billingAccountId: string,
  customerId: string,
  options: LotsOperationsListByCustomerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LotSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCustomerSend(context, billingAccountId, customerId, options),
    _listByCustomerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountId: string,
  options: LotsOperationsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Consumption/lots{?api%2Dversion,%24filter}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": options?.filter,
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_Lots> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _lotsDeserializer(result.body);
}

/** Lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts. */
export function listByBillingAccount(
  context: Client,
  billingAccountId: string,
  options: LotsOperationsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LotSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountId, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: LotsOperationsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Consumption/lots{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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

export async function _listByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_Lots> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _lotsDeserializer(result.body);
}

/** Lists all Azure credits for a billing account or a billing profile. The API is only supported for Microsoft Customer Agreements (MCA) billing accounts. */
export function listByBillingProfile(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: LotsOperationsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LotSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountId, billingProfileId, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}
