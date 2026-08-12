// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  Variable,
  VariableCreateOrUpdateParameters,
  VariableUpdateParameters,
  _VariableListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  variableDeserializer,
  variableCreateOrUpdateParametersSerializer,
  variableUpdateParametersSerializer,
  _variableListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VariableOperationsListByAutomationAccountOptionalParams,
  VariableOperationsDeleteOptionalParams,
  VariableOperationsUpdateOptionalParams,
  VariableOperationsCreateOrUpdateOptionalParams,
  VariableOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: VariableOperationsListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables{?api%2Dversion}",
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
): Promise<_VariableListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _variableListResultDeserializer(result.body);
}

/** Retrieve a list of variables. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: VariableOperationsListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Variable> {
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
  variableName: string,
  options: VariableOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      variableName: variableName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the variable. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  variableName: string,
  options: VariableOperationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    variableName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  variableName: string,
  parameters: VariableUpdateParameters,
  options: VariableOperationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      variableName: variableName,
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
    body: variableUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Variable> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return variableDeserializer(result.body);
}

/** Update a variable. */
export async function update(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  variableName: string,
  parameters: VariableUpdateParameters,
  options: VariableOperationsUpdateOptionalParams = { requestOptions: {} },
): Promise<Variable> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    automationAccountName,
    variableName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  variableName: string,
  parameters: VariableCreateOrUpdateParameters,
  options: VariableOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      variableName: variableName,
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
    body: variableCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Variable> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return variableDeserializer(result.body);
}

/** Create a variable. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  variableName: string,
  parameters: VariableCreateOrUpdateParameters,
  options: VariableOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Variable> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    automationAccountName,
    variableName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  variableName: string,
  options: VariableOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      variableName: variableName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Variable> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return variableDeserializer(result.body);
}

/** Retrieve the variable identified by variable name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  variableName: string,
  options: VariableOperationsGetOptionalParams = { requestOptions: {} },
): Promise<Variable> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    variableName,
    options,
  );
  return _getDeserialize(result);
}
