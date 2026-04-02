// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  RaiBlocklistItem,
  _RaiBlockListItemsResult,
  RaiBlocklistItemBulkRequest,
  RaiBlocklist,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  raiBlocklistItemSerializer,
  raiBlocklistItemDeserializer,
  _raiBlockListItemsResultDeserializer,
  raiBlocklistDeserializer,
  raiBlocklistItemBulkRequestArraySerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RaiBlocklistItemsBatchDeleteOptionalParams,
  RaiBlocklistItemsBatchAddOptionalParams,
  RaiBlocklistItemsListOptionalParams,
  RaiBlocklistItemsDeleteOptionalParams,
  RaiBlocklistItemsCreateOrUpdateOptionalParams,
  RaiBlocklistItemsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _batchDeleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemsNames: string[],
  options: RaiBlocklistItemsBatchDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/deleteRaiBlocklistItems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      raiBlocklistName: raiBlocklistName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: raiBlocklistItemsNames.map((p: any) => {
      return p;
    }),
  });
}

export async function _batchDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Batch operation to delete blocklist items. */
export async function batchDelete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemsNames: string[],
  options: RaiBlocklistItemsBatchDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _batchDeleteSend(
    context,
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItemsNames,
    options,
  );
  return _batchDeleteDeserialize(result);
}

export function _batchAddSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItems: RaiBlocklistItemBulkRequest[],
  options: RaiBlocklistItemsBatchAddOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/addRaiBlocklistItems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      raiBlocklistName: raiBlocklistName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: raiBlocklistItemBulkRequestArraySerializer(raiBlocklistItems),
  });
}

export async function _batchAddDeserialize(result: PathUncheckedResponse): Promise<RaiBlocklist> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return raiBlocklistDeserializer(result.body);
}

/** Batch operation to add blocklist items. */
export async function batchAdd(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItems: RaiBlocklistItemBulkRequest[],
  options: RaiBlocklistItemsBatchAddOptionalParams = { requestOptions: {} },
): Promise<RaiBlocklist> {
  const result = await _batchAddSend(
    context,
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItems,
    options,
  );
  return _batchAddDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  options: RaiBlocklistItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      raiBlocklistName: raiBlocklistName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<_RaiBlockListItemsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _raiBlockListItemsResultDeserializer(result.body);
}

/** Gets the blocklist items associated with the custom blocklist. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  options: RaiBlocklistItemsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RaiBlocklistItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, raiBlocklistName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: RaiBlocklistItemsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      raiBlocklistName: raiBlocklistName,
      raiBlocklistItemName: raiBlocklistItemName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

/** Deletes the specified blocklist Item associated with the custom blocklist. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: RaiBlocklistItemsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        accountName,
        raiBlocklistName,
        raiBlocklistItemName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  raiBlocklistItem: RaiBlocklistItem,
  options: RaiBlocklistItemsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      raiBlocklistName: raiBlocklistName,
      raiBlocklistItemName: raiBlocklistItemName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: raiBlocklistItemSerializer(raiBlocklistItem),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiBlocklistItem> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return raiBlocklistItemDeserializer(result.body);
}

/** Update the state of specified blocklist item associated with the Azure OpenAI account. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  raiBlocklistItem: RaiBlocklistItem,
  options: RaiBlocklistItemsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RaiBlocklistItem> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItemName,
    raiBlocklistItem,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: RaiBlocklistItemsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      raiBlocklistName: raiBlocklistName,
      raiBlocklistItemName: raiBlocklistItemName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RaiBlocklistItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return raiBlocklistItemDeserializer(result.body);
}

/** Gets the specified custom blocklist Item associated with the custom blocklist. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: RaiBlocklistItemsGetOptionalParams = { requestOptions: {} },
): Promise<RaiBlocklistItem> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItemName,
    options,
  );
  return _getDeserialize(result);
}
