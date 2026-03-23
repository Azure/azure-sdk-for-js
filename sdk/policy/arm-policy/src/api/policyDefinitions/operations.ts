// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type { PolicyDefinition, _PolicyDefinitionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  policyDefinitionSerializer,
  policyDefinitionDeserializer,
  _policyDefinitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyDefinitionsListByManagementGroupOptionalParams,
  PolicyDefinitionsDeleteAtManagementGroupOptionalParams,
  PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicyDefinitionsGetAtManagementGroupOptionalParams,
  PolicyDefinitionsListBuiltInOptionalParams,
  PolicyDefinitionsGetBuiltInOptionalParams,
  PolicyDefinitionsListOptionalParams,
  PolicyDefinitionsDeleteOptionalParams,
  PolicyDefinitionsCreateOrUpdateOptionalParams,
  PolicyDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: PolicyDefinitionsListByManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions{?api%2Dversion,%24filter,%24top}",
    {
      managementGroupId: managementGroupId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listByManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}. */
export function listByManagementGroup(
  context: Client,
  managementGroupId: string,
  options: PolicyDefinitionsListByManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagementGroupSend(context, managementGroupId, options),
    _listByManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _deleteAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  policyDefinitionName: string,
  options: PolicyDefinitionsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation deletes the policy definition in the given management group with the given name. */
export async function deleteAtManagementGroup(
  context: Client,
  managementGroupId: string,
  policyDefinitionName: string,
  options: PolicyDefinitionsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtManagementGroupSend(
    context,
    managementGroupId,
    policyDefinitionName,
    options,
  );
  return _deleteAtManagementGroupDeserialize(result);
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  policyDefinitionName: string,
  parameters: PolicyDefinition,
  options: PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyDefinitionSerializer(parameters),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyDefinition> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionDeserializer(result.body);
}

/** This operation creates or updates a policy definition in the given management group with the given name. */
export async function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupId: string,
  policyDefinitionName: string,
  parameters: PolicyDefinition,
  options: PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinition> {
  const result = await _createOrUpdateAtManagementGroupSend(
    context,
    managementGroupId,
    policyDefinitionName,
    parameters,
    options,
  );
  return _createOrUpdateAtManagementGroupDeserialize(result);
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  policyDefinitionName: string,
  options: PolicyDefinitionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<PolicyDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionDeserializer(result.body);
}

/** This operation retrieves the policy definition in the given management group with the given name. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupId: string,
  policyDefinitionName: string,
  options: PolicyDefinitionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinition> {
  const result = await _getAtManagementGroupSend(
    context,
    managementGroupId,
    policyDefinitionName,
    options,
  );
  return _getAtManagementGroupDeserialize(result);
}

export function _listBuiltInSend(
  context: Client,
  options: PolicyDefinitionsListBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policyDefinitions{?api%2Dversion,%24filter,%24top}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listBuiltInDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the built-in policy definitions that match the optional given $filter. If $filter='policyType -eq {value}' is provided, the returned list only includes all built-in policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy definitions whose category match the {value}. */
export function listBuiltIn(
  context: Client,
  options: PolicyDefinitionsListBuiltInOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listBuiltInSend(context, options),
    _listBuiltInDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _getBuiltInSend(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionsGetBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}{?api%2Dversion}",
    {
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getBuiltInDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionDeserializer(result.body);
}

/** This operation retrieves the built-in policy definition with the given name. */
export async function getBuiltIn(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionsGetBuiltInOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinition> {
  const result = await _getBuiltInSend(context, policyDefinitionName, options);
  return _getBuiltInDeserialize(result);
}

export function _listSend(
  context: Client,
  options: PolicyDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_PolicyDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy definitions in a given subscription that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the subscription, including those that apply directly or from management groups that contain the given subscription. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given subscription. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}. */
export function list(
  context: Client,
  options: PolicyDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation deletes the policy definition in the given subscription with the given name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, policyDefinitionName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  policyDefinitionName: string,
  parameters: PolicyDefinition,
  options: PolicyDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyDefinitionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyDefinition> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionDeserializer(result.body);
}

/** This operation creates or updates a policy definition in the given subscription with the given name. */
export async function createOrUpdate(
  context: Client,
  policyDefinitionName: string,
  parameters: PolicyDefinition,
  options: PolicyDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinition> {
  const result = await _createOrUpdateSend(context, policyDefinitionName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PolicyDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionDeserializer(result.body);
}

/** This operation retrieves the policy definition in the given subscription with the given name. */
export async function get(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinition> {
  const result = await _getSend(context, policyDefinitionName, options);
  return _getDeserialize(result);
}
