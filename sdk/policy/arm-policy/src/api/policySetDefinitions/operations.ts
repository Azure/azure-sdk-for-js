// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type { PolicySetDefinition, _PolicySetDefinitionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  policySetDefinitionSerializer,
  policySetDefinitionDeserializer,
  _policySetDefinitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicySetDefinitionsListByManagementGroupOptionalParams,
  PolicySetDefinitionsDeleteAtManagementGroupOptionalParams,
  PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicySetDefinitionsGetAtManagementGroupOptionalParams,
  PolicySetDefinitionsListBuiltInOptionalParams,
  PolicySetDefinitionsGetBuiltInOptionalParams,
  PolicySetDefinitionsListOptionalParams,
  PolicySetDefinitionsDeleteOptionalParams,
  PolicySetDefinitionsCreateOrUpdateOptionalParams,
  PolicySetDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: PolicySetDefinitionsListByManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions{?api%2Dversion,%24filter,%24expand,%24top}",
    {
      managementGroupId: managementGroupId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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
): Promise<_PolicySetDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy set definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy set definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn and Custom. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}. */
export function listByManagementGroup(
  context: Client,
  managementGroupId: string,
  options: PolicySetDefinitionsListByManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicySetDefinition> {
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
  policySetDefinitionName: string,
  options: PolicySetDefinitionsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      policySetDefinitionName: policySetDefinitionName,
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

/** This operation deletes the policy set definition in the given management group with the given name. */
export async function deleteAtManagementGroup(
  context: Client,
  managementGroupId: string,
  policySetDefinitionName: string,
  options: PolicySetDefinitionsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtManagementGroupSend(
    context,
    managementGroupId,
    policySetDefinitionName,
    options,
  );
  return _deleteAtManagementGroupDeserialize(result);
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  policySetDefinitionName: string,
  parameters: PolicySetDefinition,
  options: PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      policySetDefinitionName: policySetDefinitionName,
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
    body: policySetDefinitionSerializer(parameters),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicySetDefinition> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionDeserializer(result.body);
}

/** This operation creates or updates a policy set definition in the given management group with the given name. */
export async function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupId: string,
  policySetDefinitionName: string,
  parameters: PolicySetDefinition,
  options: PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<PolicySetDefinition> {
  const result = await _createOrUpdateAtManagementGroupSend(
    context,
    managementGroupId,
    policySetDefinitionName,
    parameters,
    options,
  );
  return _createOrUpdateAtManagementGroupDeserialize(result);
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  policySetDefinitionName: string,
  options: PolicySetDefinitionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}{?api%2Dversion,%24expand}",
    {
      managementGroupId: managementGroupId,
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24expand": options?.expand,
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
): Promise<PolicySetDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionDeserializer(result.body);
}

/** This operation retrieves the policy set definition in the given management group with the given name. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupId: string,
  policySetDefinitionName: string,
  options: PolicySetDefinitionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinition> {
  const result = await _getAtManagementGroupSend(
    context,
    managementGroupId,
    policySetDefinitionName,
    options,
  );
  return _getAtManagementGroupDeserialize(result);
}

export function _listBuiltInSend(
  context: Client,
  options: PolicySetDefinitionsListBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policySetDefinitions{?api%2Dversion,%24filter,%24expand,%24top}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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
): Promise<_PolicySetDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the built-in policy set definitions that match the optional given $filter. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy set definitions whose category match the {value}. */
export function listBuiltIn(
  context: Client,
  options: PolicySetDefinitionsListBuiltInOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicySetDefinition> {
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
  policySetDefinitionName: string,
  options: PolicySetDefinitionsGetBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}{?api%2Dversion,%24expand}",
    {
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24expand": options?.expand,
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
): Promise<PolicySetDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionDeserializer(result.body);
}

/** This operation retrieves the built-in policy set definition with the given name. */
export async function getBuiltIn(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionsGetBuiltInOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinition> {
  const result = await _getBuiltInSend(context, policySetDefinitionName, options);
  return _getBuiltInDeserialize(result);
}

export function _listSend(
  context: Client,
  options: PolicySetDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions{?api%2Dversion,%24filter,%24expand,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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
): Promise<_PolicySetDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy set definitions in a given subscription that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy set definitions associated with the subscription, including those that apply directly or from management groups that contain the given subscription. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given subscription. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn and Custom. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}. */
export function list(
  context: Client,
  options: PolicySetDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicySetDefinition> {
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
  policySetDefinitionName: string,
  options: PolicySetDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policySetDefinitionName: policySetDefinitionName,
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

/** This operation deletes the policy set definition in the given subscription with the given name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, policySetDefinitionName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  policySetDefinitionName: string,
  parameters: PolicySetDefinition,
  options: PolicySetDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policySetDefinitionName: policySetDefinitionName,
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
    body: policySetDefinitionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicySetDefinition> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionDeserializer(result.body);
}

/** This operation creates or updates a policy set definition in the given subscription with the given name. */
export async function createOrUpdate(
  context: Client,
  policySetDefinitionName: string,
  parameters: PolicySetDefinition,
  options: PolicySetDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinition> {
  const result = await _createOrUpdateSend(context, policySetDefinitionName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PolicySetDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionDeserializer(result.body);
}

/** This operation retrieves the policy set definition in the given subscription with the given name. */
export async function get(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinition> {
  const result = await _getSend(context, policySetDefinitionName, options);
  return _getDeserialize(result);
}
