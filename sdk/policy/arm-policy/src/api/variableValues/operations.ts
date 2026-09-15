// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type { VariableValue, _VariableValueListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  variableValueSerializer,
  variableValueDeserializer,
  _variableValueListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VariableValuesListForManagementGroupOptionalParams,
  VariableValuesDeleteAtManagementGroupOptionalParams,
  VariableValuesCreateOrUpdateAtManagementGroupOptionalParams,
  VariableValuesGetAtManagementGroupOptionalParams,
  VariableValuesListOptionalParams,
  VariableValuesDeleteOptionalParams,
  VariableValuesCreateOrUpdateOptionalParams,
  VariableValuesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForManagementGroupSend(
  context: Client,
  managementGroupId: string,
  variableName: string,
  options: VariableValuesListForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables/{variableName}/values{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      variableName: variableName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listForManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_VariableValueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _variableValueListResultDeserializer(result.body);
}

/** This operation retrieves the list of all variable values applicable the variable indicated at the management group scope. */
export function listForManagementGroup(
  context: Client,
  managementGroupId: string,
  variableName: string,
  options: VariableValuesListForManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VariableValue> {
  return buildPagedAsyncIterator(
    context,
    () => _listForManagementGroupSend(context, managementGroupId, variableName, options),
    _listForManagementGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _deleteAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  variableName: string,
  variableValueName: string,
  options: VariableValuesDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables/{variableName}/values/{variableValueName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      variableName: variableName,
      variableValueName: variableValueName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
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

/** This operation deletes a variable value, given its name, the management group it was created in, and the variable it belongs to. The scope of a variable value is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
export async function deleteAtManagementGroup(
  context: Client,
  managementGroupId: string,
  variableName: string,
  variableValueName: string,
  options: VariableValuesDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtManagementGroupSend(
    context,
    managementGroupId,
    variableName,
    variableValueName,
    options,
  );
  return _deleteAtManagementGroupDeserialize(result);
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  variableName: string,
  variableValueName: string,
  parameters: VariableValue,
  options: VariableValuesCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables/{variableName}/values/{variableValueName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      variableName: variableName,
      variableValueName: variableValueName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: variableValueSerializer(parameters),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<VariableValue> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return variableValueDeserializer(result.body);
}

/** This operation creates or updates a variable value with the given management group and name for a given variable. Variable values are scoped to the variable for which they are created for. */
export async function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupId: string,
  variableName: string,
  variableValueName: string,
  parameters: VariableValue,
  options: VariableValuesCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<VariableValue> {
  const result = await _createOrUpdateAtManagementGroupSend(
    context,
    managementGroupId,
    variableName,
    variableValueName,
    parameters,
    options,
  );
  return _createOrUpdateAtManagementGroupDeserialize(result);
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  variableName: string,
  variableValueName: string,
  options: VariableValuesGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables/{variableName}/values/{variableValueName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      variableName: variableName,
      variableValueName: variableValueName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<VariableValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return variableValueDeserializer(result.body);
}

/** This operation retrieves a single variable value; given its name,  management group it was created at and the variable it's created for. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupId: string,
  variableName: string,
  variableValueName: string,
  options: VariableValuesGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<VariableValue> {
  const result = await _getAtManagementGroupSend(
    context,
    managementGroupId,
    variableName,
    variableValueName,
    options,
  );
  return _getAtManagementGroupDeserialize(result);
}

export function _listSend(
  context: Client,
  variableName: string,
  options: VariableValuesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables/{variableName}/values{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      variableName: variableName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<_VariableValueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _variableValueListResultDeserializer(result.body);
}

/** This operation retrieves the list of all variable values associated with the given variable that is at a subscription level. */
export function list(
  context: Client,
  variableName: string,
  options: VariableValuesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VariableValue> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, variableName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  variableName: string,
  variableValueName: string,
  options: VariableValuesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables/{variableName}/values/{variableValueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      variableName: variableName,
      variableValueName: variableValueName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

/** This operation deletes a variable value, given its name, the subscription it was created in, and the variable it belongs to. The scope of a variable value is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
export async function $delete(
  context: Client,
  variableName: string,
  variableValueName: string,
  options: VariableValuesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, variableName, variableValueName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  variableName: string,
  variableValueName: string,
  parameters: VariableValue,
  options: VariableValuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables/{variableName}/values/{variableValueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      variableName: variableName,
      variableValueName: variableValueName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: variableValueSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VariableValue> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return variableValueDeserializer(result.body);
}

/** This operation creates or updates a variable value with the given subscription and name for a given variable. Variable values are scoped to the variable for which they are created for. */
export async function createOrUpdate(
  context: Client,
  variableName: string,
  variableValueName: string,
  parameters: VariableValue,
  options: VariableValuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<VariableValue> {
  const result = await _createOrUpdateSend(
    context,
    variableName,
    variableValueName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  variableName: string,
  variableValueName: string,
  options: VariableValuesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables/{variableName}/values/{variableValueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      variableName: variableName,
      variableValueName: variableValueName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VariableValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return variableValueDeserializer(result.body);
}

/** This operation retrieves a single variable value; given its name, subscription it was created at and the variable it's created for. */
export async function get(
  context: Client,
  variableName: string,
  variableValueName: string,
  options: VariableValuesGetOptionalParams = { requestOptions: {} },
): Promise<VariableValue> {
  const result = await _getSend(context, variableName, variableValueName, options);
  return _getDeserialize(result);
}
