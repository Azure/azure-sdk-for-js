// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type { Variable, _VariableListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  variableSerializer,
  variableDeserializer,
  _variableListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VariablesListForManagementGroupOptionalParams,
  VariablesDeleteAtManagementGroupOptionalParams,
  VariablesCreateOrUpdateAtManagementGroupOptionalParams,
  VariablesGetAtManagementGroupOptionalParams,
  VariablesListOptionalParams,
  VariablesDeleteOptionalParams,
  VariablesCreateOrUpdateOptionalParams,
  VariablesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: VariablesListForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
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

/** This operation retrieves the list of all variables applicable to the management group. */
export function listForManagementGroup(
  context: Client,
  managementGroupId: string,
  options: VariablesListForManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Variable> {
  return buildPagedAsyncIterator(
    context,
    () => _listForManagementGroupSend(context, managementGroupId, options),
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
  options: VariablesDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables/{variableName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      variableName: variableName,
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

/** This operation deletes a variable, given its name and the management group it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
export async function deleteAtManagementGroup(
  context: Client,
  managementGroupId: string,
  variableName: string,
  options: VariablesDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtManagementGroupSend(
    context,
    managementGroupId,
    variableName,
    options,
  );
  return _deleteAtManagementGroupDeserialize(result);
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  variableName: string,
  parameters: Variable,
  options: VariablesCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables/{variableName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      variableName: variableName,
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
    body: variableSerializer(parameters),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Variable> {
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

/** This operation creates or updates a variable with the given  management group and name. Policy variables can only be used by a policy definition at the scope they are created or below. */
export async function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupId: string,
  variableName: string,
  parameters: Variable,
  options: VariablesCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<Variable> {
  const result = await _createOrUpdateAtManagementGroupSend(
    context,
    managementGroupId,
    variableName,
    parameters,
    options,
  );
  return _createOrUpdateAtManagementGroupDeserialize(result);
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  variableName: string,
  options: VariablesGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/variables/{variableName}{?api%2Dversion}",
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

export async function _getAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Variable> {
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

/** This operation retrieves a single variable, given its name and the  management group it was created at. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupId: string,
  variableName: string,
  options: VariablesGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<Variable> {
  const result = await _getAtManagementGroupSend(context, managementGroupId, variableName, options);
  return _getAtManagementGroupDeserialize(result);
}

export function _listSend(
  context: Client,
  options: VariablesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

/** This operation retrieves the list of all variables associated with the given subscription. */
export function list(
  context: Client,
  options: VariablesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Variable> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
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
  options: VariablesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables/{variableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      variableName: variableName,
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

/** This operation deletes a variable, given its name and the subscription it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'. */
export async function $delete(
  context: Client,
  variableName: string,
  options: VariablesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, variableName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  variableName: string,
  parameters: Variable,
  options: VariablesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables/{variableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      variableName: variableName,
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
    body: variableSerializer(parameters),
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

/** This operation creates or updates a variable with the given subscription and name. Policy variables can only be used by a policy definition at the scope they are created or below. */
export async function createOrUpdate(
  context: Client,
  variableName: string,
  parameters: Variable,
  options: VariablesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Variable> {
  const result = await _createOrUpdateSend(context, variableName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  variableName: string,
  options: VariablesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/variables/{variableName}{?api%2Dversion}",
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

/** This operation retrieves a single variable, given its name and the subscription it was created at. */
export async function get(
  context: Client,
  variableName: string,
  options: VariablesGetOptionalParams = { requestOptions: {} },
): Promise<Variable> {
  const result = await _getSend(context, variableName, options);
  return _getDeserialize(result);
}
