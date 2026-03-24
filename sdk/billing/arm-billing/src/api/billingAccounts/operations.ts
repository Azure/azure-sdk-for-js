// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  BillingAccount,
  BillingAccountPatch,
  _BillingAccountListResult,
  PaymentTerm,
  TransitionDetails,
  _InvoiceSectionWithCreateSubPermissionListResult,
  InvoiceSectionWithCreateSubPermission,
  PaymentTermsEligibilityResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  billingAccountDeserializer,
  billingAccountPatchSerializer,
  _billingAccountListResultDeserializer,
  transitionDetailsDeserializer,
  _invoiceSectionWithCreateSubPermissionListResultDeserializer,
  paymentTermsEligibilityResultDeserializer,
  paymentTermArraySerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BillingAccountsValidatePaymentTermsOptionalParams,
  BillingAccountsListInvoiceSectionsByCreateSubscriptionPermissionOptionalParams,
  BillingAccountsConfirmTransitionOptionalParams,
  BillingAccountsCancelPaymentTermsOptionalParams,
  BillingAccountsAddPaymentTermsOptionalParams,
  BillingAccountsListOptionalParams,
  BillingAccountsUpdateOptionalParams,
  BillingAccountsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validatePaymentTermsSend(
  context: Client,
  billingAccountName: string,
  parameters: PaymentTerm[],
  options: BillingAccountsValidatePaymentTermsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/validatePaymentTerms{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: paymentTermArraySerializer(parameters),
  });
}

export async function _validatePaymentTermsDeserialize(
  result: PathUncheckedResponse,
): Promise<PaymentTermsEligibilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return paymentTermsEligibilityResultDeserializer(result.body);
}

/** Validates payment terms on a billing account with agreement type 'Microsoft Customer Agreement' and account type 'Enterprise'. */
export async function validatePaymentTerms(
  context: Client,
  billingAccountName: string,
  parameters: PaymentTerm[],
  options: BillingAccountsValidatePaymentTermsOptionalParams = { requestOptions: {} },
): Promise<PaymentTermsEligibilityResult> {
  const result = await _validatePaymentTermsSend(context, billingAccountName, parameters, options);
  return _validatePaymentTermsDeserialize(result);
}

export function _listInvoiceSectionsByCreateSubscriptionPermissionSend(
  context: Client,
  billingAccountName: string,
  options: BillingAccountsListInvoiceSectionsByCreateSubscriptionPermissionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/listInvoiceSectionsWithCreateSubscriptionPermission{?api%2Dversion,filter}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
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

export async function _listInvoiceSectionsByCreateSubscriptionPermissionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InvoiceSectionWithCreateSubPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _invoiceSectionWithCreateSubPermissionListResultDeserializer(result.body);
}

/** Lists the invoice sections for which the user has permission to create Azure subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function listInvoiceSectionsByCreateSubscriptionPermission(
  context: Client,
  billingAccountName: string,
  options: BillingAccountsListInvoiceSectionsByCreateSubscriptionPermissionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<InvoiceSectionWithCreateSubPermission> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listInvoiceSectionsByCreateSubscriptionPermissionSend(context, billingAccountName, options),
    _listInvoiceSectionsByCreateSubscriptionPermissionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _confirmTransitionSend(
  context: Client,
  billingAccountName: string,
  options: BillingAccountsConfirmTransitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/confirmTransition{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _confirmTransitionDeserialize(
  result: PathUncheckedResponse,
): Promise<TransitionDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return transitionDetailsDeserializer(result.body);
}

/** Gets the transition details for a billing account that has transitioned from agreement type Microsoft Online Services Program to agreement type Microsoft Customer Agreement. */
export async function confirmTransition(
  context: Client,
  billingAccountName: string,
  options: BillingAccountsConfirmTransitionOptionalParams = { requestOptions: {} },
): Promise<TransitionDetails> {
  const result = await _confirmTransitionSend(context, billingAccountName, options);
  return _confirmTransitionDeserialize(result);
}

export function _cancelPaymentTermsSend(
  context: Client,
  billingAccountName: string,
  parameters: Date,
  options: BillingAccountsCancelPaymentTermsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/cancelPaymentTerms{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "text/plain",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: parameters.toISOString(),
  });
}

export async function _cancelPaymentTermsDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingAccount> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountDeserializer(result.body);
}

/** Cancels all the payment terms on billing account that falls after the cancellation date in the request. Currently, cancel payment terms is only served by admin actions and is not a self-serve action. */
export function cancelPaymentTerms(
  context: Client,
  billingAccountName: string,
  parameters: Date,
  options: BillingAccountsCancelPaymentTermsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingAccount>, BillingAccount> {
  return getLongRunningPoller(context, _cancelPaymentTermsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelPaymentTermsSend(context, billingAccountName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingAccount>, BillingAccount>;
}

export function _addPaymentTermsSend(
  context: Client,
  billingAccountName: string,
  parameters: PaymentTerm[],
  options: BillingAccountsAddPaymentTermsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/addPaymentTerms{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: paymentTermArraySerializer(parameters),
  });
}

export async function _addPaymentTermsDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingAccount> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountDeserializer(result.body);
}

/** Adds payment terms to all the billing profiles under the billing account. Currently, payment terms can be added only on billing accounts that have Agreement Type as 'Microsoft Customer Agreement' and AccountType as 'Enterprise'. This action needs pre-authorization and only Field Sellers are authorized to add the payment terms and is not a self-serve action. */
export function addPaymentTerms(
  context: Client,
  billingAccountName: string,
  parameters: PaymentTerm[],
  options: BillingAccountsAddPaymentTermsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingAccount>, BillingAccount> {
  return getLongRunningPoller(context, _addPaymentTermsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addPaymentTermsSend(context, billingAccountName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingAccount>, BillingAccount>;
}

export function _listSend(
  context: Client,
  options: BillingAccountsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts{?api%2Dversion,includeAll,includeAllWithoutBillingProfiles,includeDeleted,includePendingAgreement,includeResellee,legalOwnerTID,legalOwnerOID,filter,expand,top,skip,search}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeAll: options?.includeAll,
      includeAllWithoutBillingProfiles: options?.includeAllWithoutBillingProfiles,
      includeDeleted: options?.includeDeleted,
      includePendingAgreement: options?.includePendingAgreement,
      includeResellee: options?.includeResellee,
      legalOwnerTID: options?.legalOwnerTID,
      legalOwnerOID: options?.legalOwnerOID,
      filter: options?.filter,
      expand: options?.expand,
      top: options?.top,
      skip: options?.skip,
      search: options?.search,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingAccountListResultDeserializer(result.body);
}

/** Lists the billing accounts that a user has access to. */
export function list(
  context: Client,
  options: BillingAccountsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _updateSend(
  context: Client,
  billingAccountName: string,
  parameters: BillingAccountPatch,
  options: BillingAccountsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingAccountPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<BillingAccount> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountDeserializer(result.body);
}

/** Updates the properties of a billing account. Currently, displayName and address can be updated for billing accounts with agreement type Microsoft Customer Agreement. Currently address and notification email address can be updated for billing accounts with agreement type Microsoft Online Services Agreement. Currently, purchase order number can be edited for billing accounts with agreement type Enterprise Agreement. */
export function update(
  context: Client,
  billingAccountName: string,
  parameters: BillingAccountPatch,
  options: BillingAccountsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingAccount>, BillingAccount> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, billingAccountName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingAccount>, BillingAccount>;
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  options: BillingAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BillingAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountDeserializer(result.body);
}

/** Gets a billing account by its ID. */
export async function get(
  context: Client,
  billingAccountName: string,
  options: BillingAccountsGetOptionalParams = { requestOptions: {} },
): Promise<BillingAccount> {
  const result = await _getSend(context, billingAccountName, options);
  return _getDeserialize(result);
}
