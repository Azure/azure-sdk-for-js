// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  BillingSubscription,
  _BillingSubscriptionListResult,
  BillingSubscriptionPatch,
  CancelSubscriptionRequest,
  BillingSubscriptionMergeRequest,
  MoveBillingSubscriptionRequest,
  BillingSubscriptionSplitRequest,
  MoveBillingSubscriptionEligibilityResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  billingSubscriptionDeserializer,
  _billingSubscriptionListResultDeserializer,
  billingSubscriptionPatchSerializer,
  cancelSubscriptionRequestSerializer,
  billingSubscriptionMergeRequestSerializer,
  moveBillingSubscriptionRequestSerializer,
  billingSubscriptionSplitRequestSerializer,
  moveBillingSubscriptionEligibilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BillingSubscriptionsListByInvoiceSectionOptionalParams,
  BillingSubscriptionsListByEnrollmentAccountOptionalParams,
  BillingSubscriptionsListByCustomerAtBillingAccountOptionalParams,
  BillingSubscriptionsListByCustomerOptionalParams,
  BillingSubscriptionsValidateMoveEligibilityOptionalParams,
  BillingSubscriptionsSplitOptionalParams,
  BillingSubscriptionsMoveOptionalParams,
  BillingSubscriptionsMergeOptionalParams,
  BillingSubscriptionsCancelOptionalParams,
  BillingSubscriptionsListByBillingAccountOptionalParams,
  BillingSubscriptionsDeleteOptionalParams,
  BillingSubscriptionsUpdateOptionalParams,
  BillingSubscriptionsGetOptionalParams,
  BillingSubscriptionsListByBillingProfileOptionalParams,
  BillingSubscriptionsGetByBillingProfileOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingSubscriptionsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/billingSubscriptions{?api%2Dversion,includeDeleted,expand,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeDeleted: options?.includeDeleted,
      expand: options?.expand,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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

export async function _listByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingSubscriptionListResultDeserializer(result.body);
}

/** Lists the subscriptions that are billed to an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function listByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingSubscriptionsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingSubscription> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByInvoiceSectionSend(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    _listByInvoiceSectionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingSubscriptionsListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingSubscriptions{?api%2Dversion,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      enrollmentAccountName: enrollmentAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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

export async function _listByEnrollmentAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingSubscriptionListResultDeserializer(result.body);
}

/** Lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export function listByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingSubscriptionsListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnrollmentAccountSend(context, billingAccountName, enrollmentAccountName, options),
    _listByEnrollmentAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByCustomerAtBillingAccountSend(
  context: Client,
  billingAccountName: string,
  customerName: string,
  options: BillingSubscriptionsListByCustomerAtBillingAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/customers/{customerName}/billingSubscriptions{?api%2Dversion,includeDeleted,expand,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeDeleted: options?.includeDeleted,
      expand: options?.expand,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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

export async function _listByCustomerAtBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingSubscriptionListResultDeserializer(result.body);
}

/** Lists the subscriptions for a customer at billing account level. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export function listByCustomerAtBillingAccount(
  context: Client,
  billingAccountName: string,
  customerName: string,
  options: BillingSubscriptionsListByCustomerAtBillingAccountOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BillingSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCustomerAtBillingAccountSend(context, billingAccountName, customerName, options),
    _listByCustomerAtBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingSubscriptionsListByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/billingSubscriptions{?api%2Dversion,includeDeleted,expand,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeDeleted: options?.includeDeleted,
      expand: options?.expand,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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

export async function _listByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingSubscriptionListResultDeserializer(result.body);
}

/** Lists the subscriptions for a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export function listByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingSubscriptionsListByCustomerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingSubscription> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByCustomerSend(context, billingAccountName, billingProfileName, customerName, options),
    _listByCustomerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _validateMoveEligibilitySend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: MoveBillingSubscriptionRequest,
  options: BillingSubscriptionsValidateMoveEligibilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/validateMoveEligibility{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
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
    body: moveBillingSubscriptionRequestSerializer(parameters),
  });
}

export async function _validateMoveEligibilityDeserialize(
  result: PathUncheckedResponse,
): Promise<MoveBillingSubscriptionEligibilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return moveBillingSubscriptionEligibilityResultDeserializer(result.body);
}

/** Validates if charges for a subscription can be moved to a new invoice section. This operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export async function validateMoveEligibility(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: MoveBillingSubscriptionRequest,
  options: BillingSubscriptionsValidateMoveEligibilityOptionalParams = { requestOptions: {} },
): Promise<MoveBillingSubscriptionEligibilityResult> {
  const result = await _validateMoveEligibilitySend(
    context,
    billingAccountName,
    billingSubscriptionName,
    parameters,
    options,
  );
  return _validateMoveEligibilityDeserialize(result);
}

export function _splitSend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: BillingSubscriptionSplitRequest,
  options: BillingSubscriptionsSplitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/split{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
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
    body: billingSubscriptionSplitRequestSerializer(parameters),
  });
}

export async function _splitDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingSubscription> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionDeserializer(result.body);
}

/** Splits a subscription into a new subscription with quantity less than current subscription quantity and not equal to 0. */
export function split(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: BillingSubscriptionSplitRequest,
  options: BillingSubscriptionsSplitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingSubscription>, BillingSubscription> {
  return getLongRunningPoller(context, _splitDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _splitSend(context, billingAccountName, billingSubscriptionName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
}

export function _moveSend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: MoveBillingSubscriptionRequest,
  options: BillingSubscriptionsMoveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/move{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
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
    body: moveBillingSubscriptionRequestSerializer(parameters),
  });
}

export async function _moveDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingSubscription> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionDeserializer(result.body);
}

/** Moves charges for a subscription to a new invoice section. The new invoice section must belong to the same billing profile as the existing invoice section. This operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export function move(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: MoveBillingSubscriptionRequest,
  options: BillingSubscriptionsMoveOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingSubscription>, BillingSubscription> {
  return getLongRunningPoller(context, _moveDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _moveSend(context, billingAccountName, billingSubscriptionName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
}

export function _mergeSend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: BillingSubscriptionMergeRequest,
  options: BillingSubscriptionsMergeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/merge{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
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
    body: billingSubscriptionMergeRequestSerializer(parameters),
  });
}

export async function _mergeDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingSubscription> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionDeserializer(result.body);
}

/** Merges the billing subscription provided in the request with a target billing subscription. */
export function merge(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: BillingSubscriptionMergeRequest,
  options: BillingSubscriptionsMergeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingSubscription>, BillingSubscription> {
  return getLongRunningPoller(context, _mergeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _mergeSend(context, billingAccountName, billingSubscriptionName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
}

export function _cancelSend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: CancelSubscriptionRequest,
  options: BillingSubscriptionsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/cancel{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: cancelSubscriptionRequestSerializer(parameters),
  });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancels a usage-based subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement. */
export function cancel(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: CancelSubscriptionRequest,
  options: BillingSubscriptionsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelSend(context, billingAccountName, billingSubscriptionName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: BillingSubscriptionsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions{?api%2Dversion,includeDeleted,includeTenantSubscriptions,includeFailed,expand,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeDeleted: options?.includeDeleted,
      includeTenantSubscriptions: options?.includeTenantSubscriptions,
      includeFailed: options?.includeFailed,
      expand: options?.expand,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingSubscriptionListResultDeserializer(result.body);
}

/** Lists the subscriptions for a billing account. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: BillingSubscriptionsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  options: BillingSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancels a billing subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement or Microsoft Customer Agreement. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  options: BillingSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, billingAccountName, billingSubscriptionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: BillingSubscriptionPatch,
  options: BillingSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
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
    body: billingSubscriptionPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingSubscription> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionDeserializer(result.body);
}

/** Updates the properties of a billing subscription. */
export function update(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  parameters: BillingSubscriptionPatch,
  options: BillingSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingSubscription>, BillingSubscription> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, billingAccountName, billingSubscriptionName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  options: BillingSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}{?api%2Dversion,expand}",
    {
      billingAccountName: billingAccountName,
      billingSubscriptionName: billingSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      expand: options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BillingSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionDeserializer(result.body);
}

/** Gets a subscription by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement,  Microsoft Partner Agreement, and Enterprise Agreement. */
export async function get(
  context: Client,
  billingAccountName: string,
  billingSubscriptionName: string,
  options: BillingSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<BillingSubscription> {
  const result = await _getSend(context, billingAccountName, billingSubscriptionName, options);
  return _getDeserialize(result);
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingSubscriptionsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingSubscriptions{?api%2Dversion,includeDeleted,expand,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeDeleted: options?.includeDeleted,
      expand: options?.expand,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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

export async function _listByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingSubscriptionListResultDeserializer(result.body);
}

/** Lists the subscriptions that are billed to a billing profile. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Partner Agreement. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingSubscriptionsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingSubscription> {
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
  billingSubscriptionName: string,
  options: BillingSubscriptionsGetByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingSubscriptions/{billingSubscriptionName}{?api%2Dversion,expand}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      billingSubscriptionName: billingSubscriptionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      expand: options?.expand,
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
): Promise<BillingSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionDeserializer(result.body);
}

/** Gets a subscription by its billing profile and ID. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export async function getByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  billingSubscriptionName: string,
  options: BillingSubscriptionsGetByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<BillingSubscription> {
  const result = await _getByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    billingSubscriptionName,
    options,
  );
  return _getByBillingProfileDeserialize(result);
}
