// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  BillingSubscriptionAlias,
  _BillingSubscriptionAliasListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  billingSubscriptionAliasSerializer,
  billingSubscriptionAliasDeserializer,
  _billingSubscriptionAliasListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BillingSubscriptionsAliasesListByBillingAccountOptionalParams,
  BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
  BillingSubscriptionsAliasesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: BillingSubscriptionsAliasesListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptionAliases{?api%2Dversion,includeDeleted,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingSubscriptionAliasListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingSubscriptionAliasListResultDeserializer(result.body);
}

/** Lists the subscription aliases for a billing account. The operation is supported for seat based billing subscriptions. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: BillingSubscriptionsAliasesListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingSubscriptionAlias> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  billingAccountName: string,
  aliasName: string,
  parameters: BillingSubscriptionAlias,
  options: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptionAliases/{aliasName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      aliasName: aliasName,
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
    body: billingSubscriptionAliasSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingSubscriptionAlias> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionAliasDeserializer(result.body);
}

/** Creates or updates a billing subscription by its alias ID.  The operation is supported for seat based billing subscriptions. */
export function createOrUpdate(
  context: Client,
  billingAccountName: string,
  aliasName: string,
  parameters: BillingSubscriptionAlias,
  options: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingSubscriptionAlias>, BillingSubscriptionAlias> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, billingAccountName, aliasName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingSubscriptionAlias>, BillingSubscriptionAlias>;
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  aliasName: string,
  options: BillingSubscriptionsAliasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptionAliases/{aliasName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      aliasName: aliasName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingSubscriptionAlias> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingSubscriptionAliasDeserializer(result.body);
}

/** Gets a subscription by its alias ID.  The operation is supported for seat based billing subscriptions. */
export async function get(
  context: Client,
  billingAccountName: string,
  aliasName: string,
  options: BillingSubscriptionsAliasesGetOptionalParams = { requestOptions: {} },
): Promise<BillingSubscriptionAlias> {
  const result = await _getSend(context, billingAccountName, aliasName, options);
  return _getDeserialize(result);
}
