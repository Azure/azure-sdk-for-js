// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AccountsCheckNameAvailabilityOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsGetOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsUpdateOptionalParams,
  AzurePlaywrightServiceContext as Client,
} from "../index.js";
import {
  Account,
  accountSerializer,
  accountDeserializer,
  AccountUpdate,
  accountUpdateSerializer,
  _AccountListResult,
  _accountListResultDeserializer,
  CheckNameAvailabilityRequest,
  checkNameAvailabilityRequestSerializer,
  CheckNameAvailabilityResponse,
  checkNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _accountsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  options: AccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
      subscriptionId,
      resourceGroupName,
      accountName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _accountsGetDeserialize(result: PathUncheckedResponse): Promise<Account> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return accountDeserializer(result.body);
}

/** Get a Account */
export async function accountsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  options: AccountsGetOptionalParams = { requestOptions: {} },
): Promise<Account> {
  const result = await _accountsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    accountName,
    options,
  );
  return _accountsGetDeserialize(result);
}

export function _accountsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  resource: Account,
  options: AccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
      subscriptionId,
      resourceGroupName,
      accountName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: accountSerializer(resource),
    });
}

export async function _accountsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Account> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return accountDeserializer(result.body);
}

/** Create a Account */
export function accountsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  resource: Account,
  options: AccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Account>, Account> {
  return getLongRunningPoller(context, _accountsCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _accountsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        accountName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Account>, Account>;
}

export function _accountsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  properties: AccountUpdate,
  options: AccountsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
      subscriptionId,
      resourceGroupName,
      accountName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: accountUpdateSerializer(properties),
    });
}

export async function _accountsUpdateDeserialize(result: PathUncheckedResponse): Promise<Account> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return accountDeserializer(result.body);
}

/** Update a Account */
export async function accountsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  properties: AccountUpdate,
  options: AccountsUpdateOptionalParams = { requestOptions: {} },
): Promise<Account> {
  const result = await _accountsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    accountName,
    properties,
    options,
  );
  return _accountsUpdateDeserialize(result);
}

export function _accountsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  options: AccountsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
      subscriptionId,
      resourceGroupName,
      accountName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _accountsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Account */
export function accountsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  options: AccountsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _accountsDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _accountsDeleteSend(context, subscriptionId, resourceGroupName, accountName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _accountsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: AccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _accountsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _accountListResultDeserializer(result.body);
}

/** List Account resources by resource group */
export function accountsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: AccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Account> {
  return buildPagedAsyncIterator(
    context,
    () => _accountsListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _accountsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _accountsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: AccountsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.AzurePlaywrightService/accounts",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _accountsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _accountListResultDeserializer(result.body);
}

/** List Account resources by subscription ID */
export function accountsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: AccountsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Account> {
  return buildPagedAsyncIterator(
    context,
    () => _accountsListBySubscriptionSend(context, subscriptionId, options),
    _accountsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _accountsCheckNameAvailabilitySend(
  context: Client,
  subscriptionId: string,
  body: CheckNameAvailabilityRequest,
  options: AccountsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.AzurePlaywrightService/checkNameAvailability",
      subscriptionId,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: checkNameAvailabilityRequestSerializer(body),
    });
}

export async function _accountsCheckNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Adds check global name availability operation, normally used if a resource name must be globally unique. */
export async function accountsCheckNameAvailability(
  context: Client,
  subscriptionId: string,
  body: CheckNameAvailabilityRequest,
  options: AccountsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _accountsCheckNameAvailabilitySend(context, subscriptionId, body, options);
  return _accountsCheckNameAvailabilityDeserialize(result);
}
