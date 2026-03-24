// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { AssociatedTenant, _AssociatedTenantListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  associatedTenantSerializer,
  associatedTenantDeserializer,
  _associatedTenantListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AssociatedTenantsListByBillingAccountOptionalParams,
  AssociatedTenantsDeleteOptionalParams,
  AssociatedTenantsCreateOrUpdateOptionalParams,
  AssociatedTenantsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: AssociatedTenantsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/associatedTenants{?api%2Dversion,includeRevoked,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeRevoked: options?.includeRevoked,
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
): Promise<_AssociatedTenantListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _associatedTenantListResultDeserializer(result.body);
}

/** Lists the associated tenants that can collaborate with the billing account on commerce activities like viewing and downloading invoices, managing payments, making purchases, and managing or provisioning licenses. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: AssociatedTenantsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AssociatedTenant> {
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
  associatedTenantName: string,
  options: AssociatedTenantsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/associatedTenants/{associatedTenantName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      associatedTenantName: associatedTenantName,
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

/** Deletes an associated tenant for a billing account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  billingAccountName: string,
  associatedTenantName: string,
  options: AssociatedTenantsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, billingAccountName, associatedTenantName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  billingAccountName: string,
  associatedTenantName: string,
  parameters: AssociatedTenant,
  options: AssociatedTenantsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/associatedTenants/{associatedTenantName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      associatedTenantName: associatedTenantName,
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
    body: associatedTenantSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AssociatedTenant> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return associatedTenantDeserializer(result.body);
}

/** Create or update an associated tenant for the billing account. */
export function createOrUpdate(
  context: Client,
  billingAccountName: string,
  associatedTenantName: string,
  parameters: AssociatedTenant,
  options: AssociatedTenantsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AssociatedTenant>, AssociatedTenant> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, billingAccountName, associatedTenantName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<AssociatedTenant>, AssociatedTenant>;
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  associatedTenantName: string,
  options: AssociatedTenantsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/associatedTenants/{associatedTenantName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      associatedTenantName: associatedTenantName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AssociatedTenant> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return associatedTenantDeserializer(result.body);
}

/** Gets an associated tenant by ID. */
export async function get(
  context: Client,
  billingAccountName: string,
  associatedTenantName: string,
  options: AssociatedTenantsGetOptionalParams = { requestOptions: {} },
): Promise<AssociatedTenant> {
  const result = await _getSend(context, billingAccountName, associatedTenantName, options);
  return _getDeserialize(result);
}
