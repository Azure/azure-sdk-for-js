// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type {
  PolicyDefinitionVersion,
  _PolicyDefinitionVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  policyDefinitionVersionSerializer,
  policyDefinitionVersionDeserializer,
  _policyDefinitionVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyDefinitionVersionsListAllOptionalParams,
  PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsListAllBuiltinsOptionalParams,
  PolicyDefinitionVersionsListByManagementGroupOptionalParams,
  PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsGetAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsListBuiltInOptionalParams,
  PolicyDefinitionVersionsGetBuiltInOptionalParams,
  PolicyDefinitionVersionsListOptionalParams,
  PolicyDefinitionVersionsDeleteOptionalParams,
  PolicyDefinitionVersionsCreateOrUpdateOptionalParams,
  PolicyDefinitionVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAllSend(
  context: Client,
  options: PolicyDefinitionVersionsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/listPolicyDefinitionVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionVersionListResultDeserializer(result.body);
}

/** This operation lists all the policy definition versions for all policy definitions within a subscription. */
export async function listAll(
  context: Client,
  options: PolicyDefinitionVersionsListAllOptionalParams = { requestOptions: {} },
): Promise<_PolicyDefinitionVersionListResult> {
  const result = await _listAllSend(context, options);
  return _listAllDeserialize(result);
}

export function _listAllAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  options: PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/listPolicyDefinitionVersions{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listAllAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionVersionListResultDeserializer(result.body);
}

/** This operation lists all the policy definition versions for all policy definitions at the management group scope. */
export async function listAllAtManagementGroup(
  context: Client,
  managementGroupName: string,
  options: PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<_PolicyDefinitionVersionListResult> {
  const result = await _listAllAtManagementGroupSend(context, managementGroupName, options);
  return _listAllAtManagementGroupDeserialize(result);
}

export function _listAllBuiltinsSend(
  context: Client,
  options: PolicyDefinitionVersionsListAllBuiltinsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/listPolicyDefinitionVersions{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listAllBuiltinsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionVersionListResultDeserializer(result.body);
}

/** This operation lists all the built-in policy definition versions for all built-in policy definitions. */
export async function listAllBuiltins(
  context: Client,
  options: PolicyDefinitionVersionsListAllBuiltinsOptionalParams = { requestOptions: {} },
): Promise<_PolicyDefinitionVersionListResult> {
  const result = await _listAllBuiltinsSend(context, options);
  return _listAllBuiltinsDeserialize(result);
}

export function _listByManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policyDefinitionName: string,
  options: PolicyDefinitionVersionsListByManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions{?api%2Dversion,%24top}",
    {
      managementGroupName: managementGroupName,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<_PolicyDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionVersionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy definition versions for the given policy definition in the given management group. */
export function listByManagementGroup(
  context: Client,
  managementGroupName: string,
  policyDefinitionName: string,
  options: PolicyDefinitionVersionsListByManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyDefinitionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagementGroupSend(context, managementGroupName, policyDefinitionName, options),
    _listByManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _deleteAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      policyDefinitionName: policyDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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
  managementGroupName: string,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtManagementGroupSend(
    context,
    managementGroupName,
    policyDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _deleteAtManagementGroupDeserialize(result);
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicyDefinitionVersion,
  options: PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      policyDefinitionName: policyDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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
    body: policyDefinitionVersionSerializer(parameters),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyDefinitionVersion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionVersionDeserializer(result.body);
}

/** This operation creates or updates a policy definition version in the given management group with the given name. */
export async function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupName: string,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicyDefinitionVersion,
  options: PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<PolicyDefinitionVersion> {
  const result = await _createOrUpdateAtManagementGroupSend(
    context,
    managementGroupName,
    policyDefinitionName,
    policyDefinitionVersion,
    parameters,
    options,
  );
  return _createOrUpdateAtManagementGroupDeserialize(result);
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      policyDefinitionName: policyDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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
): Promise<PolicyDefinitionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionVersionDeserializer(result.body);
}

/** This operation retrieves the policy definition version in the given management group with the given name. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupName: string,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinitionVersion> {
  const result = await _getAtManagementGroupSend(
    context,
    managementGroupName,
    policyDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _getAtManagementGroupDeserialize(result);
}

export function _listBuiltInSend(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionVersionsListBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions{?api%2Dversion,%24top}",
    {
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<_PolicyDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionVersionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the built-in policy definition versions for the given policy definition. */
export function listBuiltIn(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionVersionsListBuiltInOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyDefinitionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBuiltInSend(context, policyDefinitionName, options),
    _listBuiltInDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _getBuiltInSend(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsGetBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      policyDefinitionName: policyDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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
): Promise<PolicyDefinitionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionVersionDeserializer(result.body);
}

/** This operation retrieves the built-in policy definition version with the given name. */
export async function getBuiltIn(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsGetBuiltInOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinitionVersion> {
  const result = await _getBuiltInSend(
    context,
    policyDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _getBuiltInDeserialize(result);
}

export function _listSend(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<_PolicyDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyDefinitionVersionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy definition versions for the given policy definition. */
export function list(
  context: Client,
  policyDefinitionName: string,
  options: PolicyDefinitionVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyDefinitionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, policyDefinitionName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policyDefinitionName: policyDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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

/** This operation deletes the policy definition version in the given subscription with the given name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    policyDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicyDefinitionVersion,
  options: PolicyDefinitionVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policyDefinitionName: policyDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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
    body: policyDefinitionVersionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyDefinitionVersion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionVersionDeserializer(result.body);
}

/** This operation creates or updates a policy definition in the given subscription with the given name. */
export async function createOrUpdate(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicyDefinitionVersion,
  options: PolicyDefinitionVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinitionVersion> {
  const result = await _createOrUpdateSend(
    context,
    policyDefinitionName,
    policyDefinitionVersion,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policyDefinitionName: policyDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyDefinitionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyDefinitionVersionDeserializer(result.body);
}

/** This operation retrieves the policy definition version in the given subscription with the given name. */
export async function get(
  context: Client,
  policyDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicyDefinitionVersionsGetOptionalParams = { requestOptions: {} },
): Promise<PolicyDefinitionVersion> {
  const result = await _getSend(context, policyDefinitionName, policyDefinitionVersion, options);
  return _getDeserialize(result);
}
