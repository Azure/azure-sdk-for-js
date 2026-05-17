// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  Commit,
  commitSerializer,
  commitDeserializer,
} from "../../models/microsoft/network/models.js";
import { _CommitListResult, _commitListResultDeserializer } from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CommitsListOptionalParams,
  CommitsDeleteOptionalParams,
  CommitsCreateOrUpdateOptionalParams,
  CommitsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  options: CommitsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/commits{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      "api%2Dversion": "2025-07-01",
      "%24top": options?.top,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_CommitListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _commitListResultDeserializer(result.body);
}

/** Lists all commits for the specified network manager. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  options: CommitsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Commit> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkManagerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  commitName: string,
  options: CommitsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/commits/{commitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      commitName: commitName,
      "api%2Dversion": "2025-07-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a commit. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  commitName: string,
  options: CommitsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkManagerName, commitName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  commitName: string,
  resource: Commit,
  options: CommitsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/commits/{commitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      commitName: commitName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commitSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Commit> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return commitDeserializer(result.body);
}

/** Creates or updates a commit. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  commitName: string,
  resource: Commit,
  options: CommitsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Commit>, Commit> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        networkManagerName,
        commitName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<Commit>, Commit>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  commitName: string,
  options: CommitsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/commits/{commitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      commitName: commitName,
      "api%2Dversion": "2025-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Commit> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return commitDeserializer(result.body);
}

/** Gets the specified commit. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  commitName: string,
  options: CommitsGetOptionalParams = { requestOptions: {} },
): Promise<Commit> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkManagerName,
    commitName,
    options,
  );
  return _getDeserialize(result);
}
