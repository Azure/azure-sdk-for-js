// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  InvoiceSection,
  _InvoiceSectionListResult,
  DeleteInvoiceSectionEligibilityResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  invoiceSectionSerializer,
  invoiceSectionDeserializer,
  _invoiceSectionListResultDeserializer,
  deleteInvoiceSectionEligibilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InvoiceSectionsValidateDeleteEligibilityOptionalParams,
  InvoiceSectionsListByBillingProfileOptionalParams,
  InvoiceSectionsDeleteOptionalParams,
  InvoiceSectionsCreateOrUpdateOptionalParams,
  InvoiceSectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateDeleteEligibilitySend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: InvoiceSectionsValidateDeleteEligibilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/validateDeleteEligibility{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
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

export async function _validateDeleteEligibilityDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteInvoiceSectionEligibilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deleteInvoiceSectionEligibilityResultDeserializer(result.body);
}

/** Validates if the invoice section can be deleted. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export async function validateDeleteEligibility(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: InvoiceSectionsValidateDeleteEligibilityOptionalParams = { requestOptions: {} },
): Promise<DeleteInvoiceSectionEligibilityResult> {
  const result = await _validateDeleteEligibilitySend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  );
  return _validateDeleteEligibilityDeserialize(result);
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: InvoiceSectionsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections{?api%2Dversion,includeDeleted,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeDeleted: options?.includeDeleted,
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
): Promise<_InvoiceSectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _invoiceSectionListResultDeserializer(result.body);
}

/** Lists the invoice sections that a user has access to. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: InvoiceSectionsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InvoiceSection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: InvoiceSectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
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

/** Deletes an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: InvoiceSectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: InvoiceSection,
  options: InvoiceSectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: invoiceSectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InvoiceSection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return invoiceSectionDeserializer(result.body);
}

/** Creates or updates an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function createOrUpdate(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: InvoiceSection,
  options: InvoiceSectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InvoiceSection>, InvoiceSection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<InvoiceSection>, InvoiceSection>;
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: InvoiceSectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InvoiceSection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return invoiceSectionDeserializer(result.body);
}

/** Gets an invoice section by its ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function get(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: InvoiceSectionsGetOptionalParams = { requestOptions: {} },
): Promise<InvoiceSection> {
  const result = await _getSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  );
  return _getDeserialize(result);
}
