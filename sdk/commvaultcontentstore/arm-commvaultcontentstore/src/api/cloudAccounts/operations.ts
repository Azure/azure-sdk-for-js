// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext as Client } from "../index.js";
import type {
  CloudAccount,
  CloudAccountUpdate,
  _CloudAccountListResult,
  SaaSData,
  LatestLinkedSaaSResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudAccountSerializer,
  cloudAccountDeserializer,
  cloudAccountUpdateSerializer,
  _cloudAccountListResultDeserializer,
  saaSDataSerializer,
  latestLinkedSaaSResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CloudAccountsLatestLinkedSaaSOptionalParams,
  CloudAccountsLinkSaaSOptionalParams,
  CloudAccountsListBySubscriptionOptionalParams,
  CloudAccountsListByResourceGroupOptionalParams,
  CloudAccountsDeleteOptionalParams,
  CloudAccountsUpdateOptionalParams,
  CloudAccountsCreateOrUpdateOptionalParams,
  CloudAccountsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _latestLinkedSaaSSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: CloudAccountsLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/latestLinkedSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _latestLinkedSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<LatestLinkedSaaSResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return latestLinkedSaaSResponseDeserializer(result.body);
}

/** Returns the latest SaaS linked to the cloud account. */
export async function latestLinkedSaaS(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: CloudAccountsLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): Promise<LatestLinkedSaaSResponse> {
  const result = await _latestLinkedSaaSSend(context, resourceGroupName, cloudAccountName, options);
  return _latestLinkedSaaSDeserialize(result);
}

export function _linkSaaSSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  body: SaaSData,
  options: CloudAccountsLinkSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/linkSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: saaSDataSerializer(body),
  });
}

export async function _linkSaaSDeserialize(result: PathUncheckedResponse): Promise<CloudAccount> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cloudAccountDeserializer(result.body);
}

/** Links a new SaaS to the cloud account. */
export function linkSaaS(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  body: SaaSData,
  options: CloudAccountsLinkSaaSOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudAccount>, CloudAccount> {
  return getLongRunningPoller(context, _linkSaaSDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkSaaSSend(context, resourceGroupName, cloudAccountName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<CloudAccount>, CloudAccount>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: CloudAccountsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Commvault.ContentStore/cloudAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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
): Promise<_CloudAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _cloudAccountListResultDeserializer(result.body);
}

/** List CloudAccount resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: CloudAccountsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CloudAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-03-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CloudAccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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
): Promise<_CloudAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _cloudAccountListResultDeserializer(result.body);
}

/** List CloudAccount resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CloudAccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CloudAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-03-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: CloudAccountsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a CloudAccount */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: CloudAccountsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, cloudAccountName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  properties: CloudAccountUpdate,
  options: CloudAccountsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cloudAccountUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<CloudAccount> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cloudAccountDeserializer(result.body);
}

/** Update a CloudAccount */
export function update(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  properties: CloudAccountUpdate,
  options: CloudAccountsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudAccount>, CloudAccount> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, cloudAccountName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<CloudAccount>, CloudAccount>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  resource: CloudAccount,
  options: CloudAccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cloudAccountSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudAccount> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cloudAccountDeserializer(result.body);
}

/** Create a CloudAccount */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  resource: CloudAccount,
  options: CloudAccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudAccount>, CloudAccount> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, cloudAccountName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<CloudAccount>, CloudAccount>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: CloudAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CloudAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cloudAccountDeserializer(result.body);
}

/** Get a CloudAccount */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: CloudAccountsGetOptionalParams = { requestOptions: {} },
): Promise<CloudAccount> {
  const result = await _getSend(context, resourceGroupName, cloudAccountName, options);
  return _getDeserialize(result);
}
