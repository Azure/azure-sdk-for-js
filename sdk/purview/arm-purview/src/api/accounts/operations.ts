// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext as Client } from "../index.js";
import type {
  Account,
  AccountUpdateParameters,
  _AccountList,
  CollectionAdminUpdate,
  AccessKeys,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import {
  errorResponseModelDeserializer,
  accountSerializer,
  accountDeserializer,
  accountUpdateParametersSerializer,
  _accountListDeserializer,
  collectionAdminUpdateSerializer,
  accessKeysDeserializer,
  checkNameAvailabilityRequestSerializer,
  checkNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccountsCheckNameAvailabilityOptionalParams,
  AccountsListKeysOptionalParams,
  AccountsAddRootCollectionAdminOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: AccountsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Purview/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(checkNameAvailabilityRequest),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Checks if account name is available. */
export async function checkNameAvailability(
  context: Client,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: AccountsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, checkNameAvailabilityRequest, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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

export async function _listKeysDeserialize(result: PathUncheckedResponse): Promise<AccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return accessKeysDeserializer(result.body);
}

/** List the authorization keys associated with this account. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountsListKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _listKeysSend(context, resourceGroupName, accountName, options);
  return _listKeysDeserialize(result);
}

export function _addRootCollectionAdminSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  collectionAdminUpdate: CollectionAdminUpdate,
  options: AccountsAddRootCollectionAdminOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/addRootCollectionAdmin{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: collectionAdminUpdateSerializer(collectionAdminUpdate),
  });
}

export async function _addRootCollectionAdminDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return;
}

/** Add the administrator for root collection associated with this account. */
export async function addRootCollectionAdmin(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  collectionAdminUpdate: CollectionAdminUpdate,
  options: AccountsAddRootCollectionAdminOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _addRootCollectionAdminSend(
    context,
    resourceGroupName,
    accountName,
    collectionAdminUpdate,
    options,
  );
  return _addRootCollectionAdminDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: AccountsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Purview/accounts{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      "%24skipToken": options?.skipToken,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccountList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return _accountListDeserializer(result.body);
}

/** List accounts in Subscription */
export function listBySubscription(
  context: Client,
  options: AccountsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Account> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-04-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      "%24skipToken": options?.skipToken,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccountList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return _accountListDeserializer(result.body);
}

/** List accounts in ResourceGroup */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Account> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an account resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, accountName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  accountUpdateParameters: AccountUpdateParameters,
  options: AccountsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accountUpdateParametersSerializer(accountUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Account> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return accountDeserializer(result.body);
}

/** Updates an account */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  accountUpdateParameters: AccountUpdateParameters,
  options: AccountsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Account>, Account> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, accountUpdateParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01-preview",
  }) as PollerLike<OperationState<Account>, Account>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  account: Account,
  options: AccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accountSerializer(account),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Account> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return accountDeserializer(result.body);
}

/** Creates or updates an account */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  account: Account,
  options: AccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Account>, Account> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, accountName, account, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01-preview",
  }) as PollerLike<OperationState<Account>, Account>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Account> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return accountDeserializer(result.body);
}

/** Get an account */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountsGetOptionalParams = { requestOptions: {} },
): Promise<Account> {
  const result = await _getSend(context, resourceGroupName, accountName, options);
  return _getDeserialize(result);
}
