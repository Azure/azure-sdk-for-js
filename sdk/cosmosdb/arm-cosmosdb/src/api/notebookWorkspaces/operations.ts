// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  NotebookWorkspace,
  NotebookWorkspaceName,
  NotebookWorkspaceCreateUpdateParameters,
  _NotebookWorkspaceListResult,
  NotebookWorkspaceConnectionInfoResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  notebookWorkspaceDeserializer,
  notebookWorkspaceCreateUpdateParametersSerializer,
  _notebookWorkspaceListResultDeserializer,
  notebookWorkspaceConnectionInfoResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NotebookWorkspacesStartOptionalParams,
  NotebookWorkspacesRegenerateAuthTokenOptionalParams,
  NotebookWorkspacesListConnectionInfoOptionalParams,
  NotebookWorkspacesListByDatabaseAccountOptionalParams,
  NotebookWorkspacesDeleteOptionalParams,
  NotebookWorkspacesCreateOrUpdateOptionalParams,
  NotebookWorkspacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _startSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      notebookWorkspaceName: notebookWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Starts the notebook workspace */
export function start(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, accountName, notebookWorkspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _regenerateAuthTokenSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesRegenerateAuthTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/regenerateAuthToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      notebookWorkspaceName: notebookWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regenerateAuthTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerates the auth token for the notebook workspace */
export function regenerateAuthToken(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesRegenerateAuthTokenOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _regenerateAuthTokenDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _regenerateAuthTokenSend(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listConnectionInfoSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesListConnectionInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/listConnectionInfo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      notebookWorkspaceName: notebookWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listConnectionInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<NotebookWorkspaceConnectionInfoResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return notebookWorkspaceConnectionInfoResultDeserializer(result.body);
}

/** Retrieves the connection info for the notebook workspace */
export async function listConnectionInfo(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesListConnectionInfoOptionalParams = { requestOptions: {} },
): Promise<NotebookWorkspaceConnectionInfoResult> {
  const result = await _listConnectionInfoSend(
    context,
    resourceGroupName,
    accountName,
    notebookWorkspaceName,
    options,
  );
  return _listConnectionInfoDeserialize(result);
}

export function _listByDatabaseAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: NotebookWorkspacesListByDatabaseAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces{?api%2Dversion}",
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

export async function _listByDatabaseAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_NotebookWorkspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _notebookWorkspaceListResultDeserializer(result.body);
}

/** Gets the notebook workspace resources of an existing Cosmos DB account. */
export function listByDatabaseAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: NotebookWorkspacesListByDatabaseAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NotebookWorkspace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseAccountSend(context, resourceGroupName, accountName, options),
    _listByDatabaseAccountDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      notebookWorkspaceName: notebookWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

/** Deletes the notebook workspace for a Cosmos DB account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, notebookWorkspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
  options: NotebookWorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      notebookWorkspaceName: notebookWorkspaceName,
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
    body: notebookWorkspaceCreateUpdateParametersSerializer(notebookCreateUpdateParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NotebookWorkspace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return notebookWorkspaceDeserializer(result.body);
}

/** Creates the notebook workspace for a Cosmos DB account. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
  options: NotebookWorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NotebookWorkspace>, NotebookWorkspace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        notebookCreateUpdateParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<NotebookWorkspace>, NotebookWorkspace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      notebookWorkspaceName: notebookWorkspaceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NotebookWorkspace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return notebookWorkspaceDeserializer(result.body);
}

/** Gets the notebook workspace for a Cosmos DB account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  notebookWorkspaceName: NotebookWorkspaceName,
  options: NotebookWorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<NotebookWorkspace> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    notebookWorkspaceName,
    options,
  );
  return _getDeserialize(result);
}
