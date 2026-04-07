// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  TransparentDataEncryptionName,
  LogicalDatabaseTransparentDataEncryption,
  _LogicalDatabaseTransparentDataEncryptionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  logicalDatabaseTransparentDataEncryptionSerializer,
  logicalDatabaseTransparentDataEncryptionDeserializer,
  _logicalDatabaseTransparentDataEncryptionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TransparentDataEncryptionsSuspendOptionalParams,
  TransparentDataEncryptionsResumeOptionalParams,
  TransparentDataEncryptionsListByDatabaseOptionalParams,
  TransparentDataEncryptionsCreateOrUpdateOptionalParams,
  TransparentDataEncryptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _suspendSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  options: TransparentDataEncryptionsSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}/suspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      tdeName: tdeName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _suspendDeserialize(
  result: PathUncheckedResponse,
): Promise<LogicalDatabaseTransparentDataEncryption> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return logicalDatabaseTransparentDataEncryptionDeserializer(result.body);
}

/** Suspend ongoing logical database's Transparent Data Encryption scan configuration. */
export function suspend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  options: TransparentDataEncryptionsSuspendOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LogicalDatabaseTransparentDataEncryption>,
  LogicalDatabaseTransparentDataEncryption
> {
  return getLongRunningPoller(context, _suspendDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _suspendSend(context, resourceGroupName, serverName, databaseName, tdeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<LogicalDatabaseTransparentDataEncryption>,
    LogicalDatabaseTransparentDataEncryption
  >;
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  options: TransparentDataEncryptionsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      tdeName: tdeName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _resumeDeserialize(
  result: PathUncheckedResponse,
): Promise<LogicalDatabaseTransparentDataEncryption> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return logicalDatabaseTransparentDataEncryptionDeserializer(result.body);
}

/** Resume ongoing logical database's Transparent Data Encryption scan configuration. */
export function resume(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  options: TransparentDataEncryptionsResumeOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LogicalDatabaseTransparentDataEncryption>,
  LogicalDatabaseTransparentDataEncryption
> {
  return getLongRunningPoller(context, _resumeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeSend(context, resourceGroupName, serverName, databaseName, tdeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<LogicalDatabaseTransparentDataEncryption>,
    LogicalDatabaseTransparentDataEncryption
  >;
}

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: TransparentDataEncryptionsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogicalDatabaseTransparentDataEncryptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _logicalDatabaseTransparentDataEncryptionListResultDeserializer(result.body);
}

/** Gets a list of the logical database's transparent data encryption. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: TransparentDataEncryptionsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogicalDatabaseTransparentDataEncryption> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseSend(context, resourceGroupName, serverName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  parameters: LogicalDatabaseTransparentDataEncryption,
  options: TransparentDataEncryptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      tdeName: tdeName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: logicalDatabaseTransparentDataEncryptionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogicalDatabaseTransparentDataEncryption> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return logicalDatabaseTransparentDataEncryptionDeserializer(result.body);
}

/** Updates a logical database's transparent data encryption configuration. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  parameters: LogicalDatabaseTransparentDataEncryption,
  options: TransparentDataEncryptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LogicalDatabaseTransparentDataEncryption>,
  LogicalDatabaseTransparentDataEncryption
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        tdeName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<LogicalDatabaseTransparentDataEncryption>,
    LogicalDatabaseTransparentDataEncryption
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  options: TransparentDataEncryptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      tdeName: tdeName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<LogicalDatabaseTransparentDataEncryption> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return logicalDatabaseTransparentDataEncryptionDeserializer(result.body);
}

/** Gets a logical database's transparent data encryption. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  tdeName: TransparentDataEncryptionName,
  options: TransparentDataEncryptionsGetOptionalParams = { requestOptions: {} },
): Promise<LogicalDatabaseTransparentDataEncryption> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    tdeName,
    options,
  );
  return _getDeserialize(result);
}
