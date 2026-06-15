// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type { ChaosFaultResource, _ChaosFaultListResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  chaosFaultResourceSerializer,
  chaosFaultResourceDeserializer,
  _chaosFaultListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChaosFaultListOptionalParams,
  ChaosFaultEnableDisableOptionalParams,
  ChaosFaultGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ChaosFaultListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/chaosFaults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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
): Promise<_ChaosFaultListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _chaosFaultListResponseDeserializer(result.body);
}

/** List Chaos Faults for CosmosDB account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ChaosFaultListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChaosFaultResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _enableDisableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  chaosFault: string,
  chaosFaultRequest: ChaosFaultResource,
  options: ChaosFaultEnableDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/chaosFaults/{chaosFault}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      chaosFault: chaosFault,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: chaosFaultResourceSerializer(chaosFaultRequest),
  });
}

export async function _enableDisableDeserialize(
  result: PathUncheckedResponse,
): Promise<ChaosFaultResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return chaosFaultResourceDeserializer(result.body);
}

/** Enable, disable Chaos Fault in a CosmosDB account. */
export function enableDisable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  chaosFault: string,
  chaosFaultRequest: ChaosFaultResource,
  options: ChaosFaultEnableDisableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChaosFaultResource>, ChaosFaultResource> {
  return getLongRunningPoller(context, _enableDisableDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableDisableSend(
        context,
        resourceGroupName,
        accountName,
        chaosFault,
        chaosFaultRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<ChaosFaultResource>, ChaosFaultResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  chaosFault: string,
  options: ChaosFaultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/chaosFaults/{chaosFault}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      chaosFault: chaosFault,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ChaosFaultResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return chaosFaultResourceDeserializer(result.body);
}

/** Get Chaos Fault for a CosmosdB account for a particular Chaos Fault. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  chaosFault: string,
  options: ChaosFaultGetOptionalParams = { requestOptions: {} },
): Promise<ChaosFaultResource> {
  const result = await _getSend(context, resourceGroupName, accountName, chaosFault, options);
  return _getDeserialize(result);
}
