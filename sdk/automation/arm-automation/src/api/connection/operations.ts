// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  Connection,
  ConnectionCreateOrUpdateParameters,
  ConnectionUpdateParameters,
  _ConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectionDeserializer,
  connectionCreateOrUpdateParametersSerializer,
  connectionUpdateParametersSerializer,
  _connectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectionListByAutomationAccountOptionalParams,
  ConnectionDeleteOptionalParams,
  ConnectionUpdateOptionalParams,
  ConnectionCreateOrUpdateOptionalParams,
  ConnectionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: ConnectionListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _listByAutomationAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectionListResultDeserializer(result.body);
}

/** Retrieve a list of connections. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: ConnectionListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Connection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAutomationAccountSend(context, resourceGroupName, automationAccountName, options),
    _listByAutomationAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  options: ConnectionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the connection. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  options: ConnectionDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    connectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  parameters: ConnectionUpdateParameters,
  options: ConnectionUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Connection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Update a connection. */
export async function update(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  parameters: ConnectionUpdateParameters,
  options: ConnectionUpdateOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    automationAccountName,
    connectionName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  parameters: ConnectionCreateOrUpdateParameters,
  options: ConnectionCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Connection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Create or update a connection. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  parameters: ConnectionCreateOrUpdateParameters,
  options: ConnectionCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    automationAccountName,
    connectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  options: ConnectionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Connection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Retrieve the connection identified by connection name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  connectionName: string,
  options: ConnectionGetOptionalParams = { requestOptions: {} },
): Promise<Connection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    connectionName,
    options,
  );
  return _getDeserialize(result);
}
