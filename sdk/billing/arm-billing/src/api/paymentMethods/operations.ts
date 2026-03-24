// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  PaymentMethod,
  _PaymentMethodsListResult,
  PaymentMethodLink,
  _PaymentMethodLinksListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  paymentMethodDeserializer,
  _paymentMethodsListResultDeserializer,
  paymentMethodLinkDeserializer,
  _paymentMethodLinksListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PaymentMethodsListByUserOptionalParams,
  PaymentMethodsDeleteByUserOptionalParams,
  PaymentMethodsGetByUserOptionalParams,
  PaymentMethodsListByBillingProfileOptionalParams,
  PaymentMethodsGetByBillingProfileOptionalParams,
  PaymentMethodsListByBillingAccountOptionalParams,
  PaymentMethodsGetByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByUserSend(
  context: Client,
  options: PaymentMethodsListByUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/paymentMethods{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByUserDeserialize(
  result: PathUncheckedResponse,
): Promise<_PaymentMethodsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _paymentMethodsListResultDeserializer(result.body);
}

/** Lists the payment methods owned by the caller. */
export function listByUser(
  context: Client,
  options: PaymentMethodsListByUserOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PaymentMethod> {
  return buildPagedAsyncIterator(
    context,
    () => _listByUserSend(context, options),
    _listByUserDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _deleteByUserSend(
  context: Client,
  paymentMethodName: string,
  options: PaymentMethodsDeleteByUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/paymentMethods/{paymentMethodName}{?api%2Dversion}",
    {
      paymentMethodName: paymentMethodName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByUserDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a payment method owned by the caller. */
export async function deleteByUser(
  context: Client,
  paymentMethodName: string,
  options: PaymentMethodsDeleteByUserOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByUserSend(context, paymentMethodName, options);
  return _deleteByUserDeserialize(result);
}

export function _getByUserSend(
  context: Client,
  paymentMethodName: string,
  options: PaymentMethodsGetByUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/paymentMethods/{paymentMethodName}{?api%2Dversion}",
    {
      paymentMethodName: paymentMethodName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getByUserDeserialize(result: PathUncheckedResponse): Promise<PaymentMethod> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return paymentMethodDeserializer(result.body);
}

/** Gets a payment method owned by the caller. */
export async function getByUser(
  context: Client,
  paymentMethodName: string,
  options: PaymentMethodsGetByUserOptionalParams = { requestOptions: {} },
): Promise<PaymentMethod> {
  const result = await _getByUserSend(context, paymentMethodName, options);
  return _getByUserDeserialize(result);
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: PaymentMethodsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/paymentMethodLinks{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_PaymentMethodLinksListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _paymentMethodLinksListResultDeserializer(result.body);
}

/** Lists payment methods attached to a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: PaymentMethodsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PaymentMethodLink> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  paymentMethodName: string,
  options: PaymentMethodsGetByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/paymentMethodLinks/{paymentMethodName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      paymentMethodName: paymentMethodName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<PaymentMethodLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return paymentMethodLinkDeserializer(result.body);
}

/** Gets a payment method linked with a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function getByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  paymentMethodName: string,
  options: PaymentMethodsGetByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<PaymentMethodLink> {
  const result = await _getByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    paymentMethodName,
    options,
  );
  return _getByBillingProfileDeserialize(result);
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: PaymentMethodsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/paymentMethods{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_PaymentMethodsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _paymentMethodsListResultDeserializer(result.body);
}

/** Lists the payment methods available for a billing account. Along with the payment methods owned by the caller, these payment methods can be attached to a billing profile to make payments. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: PaymentMethodsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PaymentMethod> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  paymentMethodName: string,
  options: PaymentMethodsGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/paymentMethods/{paymentMethodName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      paymentMethodName: paymentMethodName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<PaymentMethod> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return paymentMethodDeserializer(result.body);
}

/** Gets a payment method available for a billing account. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  paymentMethodName: string,
  options: PaymentMethodsGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<PaymentMethod> {
  const result = await _getByBillingAccountSend(
    context,
    billingAccountName,
    paymentMethodName,
    options,
  );
  return _getByBillingAccountDeserialize(result);
}
