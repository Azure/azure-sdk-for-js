// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type {
  PolicySetDefinitionVersion,
  _PolicySetDefinitionVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  policySetDefinitionVersionSerializer,
  policySetDefinitionVersionDeserializer,
  _policySetDefinitionVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicySetDefinitionVersionsListAllOptionalParams,
  PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsListAllBuiltinsOptionalParams,
  PolicySetDefinitionVersionsListByManagementGroupOptionalParams,
  PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsListBuiltInOptionalParams,
  PolicySetDefinitionVersionsGetBuiltInOptionalParams,
  PolicySetDefinitionVersionsListOptionalParams,
  PolicySetDefinitionVersionsDeleteOptionalParams,
  PolicySetDefinitionVersionsCreateOrUpdateOptionalParams,
  PolicySetDefinitionVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAllSend(
  context: Client,
  options: PolicySetDefinitionVersionsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/listPolicySetDefinitionVersions{?api%2Dversion}",
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
): Promise<_PolicySetDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionVersionListResultDeserializer(result.body);
}

/** This operation lists all the policy set definition versions for all policy set definitions within a subscription. */
export async function listAll(
  context: Client,
  options: PolicySetDefinitionVersionsListAllOptionalParams = { requestOptions: {} },
): Promise<_PolicySetDefinitionVersionListResult> {
  const result = await _listAllSend(context, options);
  return _listAllDeserialize(result);
}

export function _listAllAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  options: PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/listPolicySetDefinitionVersions{?api%2Dversion}",
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
): Promise<_PolicySetDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionVersionListResultDeserializer(result.body);
}

/** This operation lists all the policy set definition versions for all policy set definitions at the management group scope. */
export async function listAllAtManagementGroup(
  context: Client,
  managementGroupName: string,
  options: PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<_PolicySetDefinitionVersionListResult> {
  const result = await _listAllAtManagementGroupSend(context, managementGroupName, options);
  return _listAllAtManagementGroupDeserialize(result);
}

export function _listAllBuiltinsSend(
  context: Client,
  options: PolicySetDefinitionVersionsListAllBuiltinsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/listPolicySetDefinitionVersions{?api%2Dversion}",
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
): Promise<_PolicySetDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionVersionListResultDeserializer(result.body);
}

/** This operation lists all the built-in policy set definition versions for all built-in policy set definitions. */
export async function listAllBuiltins(
  context: Client,
  options: PolicySetDefinitionVersionsListAllBuiltinsOptionalParams = { requestOptions: {} },
): Promise<_PolicySetDefinitionVersionListResult> {
  const result = await _listAllBuiltinsSend(context, options);
  return _listAllBuiltinsDeserialize(result);
}

export function _listByManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  options: PolicySetDefinitionVersionsListByManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions{?api%2Dversion,%24expand,%24top}",
    {
      managementGroupName: managementGroupName,
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<_PolicySetDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionVersionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group. */
export function listByManagementGroup(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  options: PolicySetDefinitionVersionsListByManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicySetDefinitionVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByManagementGroupSend(context, managementGroupName, policySetDefinitionName, options),
    _listByManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _deleteAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      policySetDefinitionName: policySetDefinitionName,
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

/** This operation deletes the policy set definition version in the given management group with the given name and version. */
export async function deleteAtManagementGroup(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteAtManagementGroupSend(
    context,
    managementGroupName,
    policySetDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _deleteAtManagementGroupDeserialize(result);
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicySetDefinitionVersion,
  options: PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      managementGroupName: managementGroupName,
      policySetDefinitionName: policySetDefinitionName,
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
    body: policySetDefinitionVersionSerializer(parameters),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicySetDefinitionVersion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionVersionDeserializer(result.body);
}

/** This operation creates or updates a policy set definition version in the given management group with the given name and version. */
export async function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicySetDefinitionVersion,
  options: PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<PolicySetDefinitionVersion> {
  const result = await _createOrUpdateAtManagementGroupSend(
    context,
    managementGroupName,
    policySetDefinitionName,
    policyDefinitionVersion,
    parameters,
    options,
  );
  return _createOrUpdateAtManagementGroupDeserialize(result);
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion,%24expand}",
    {
      managementGroupName: managementGroupName,
      policySetDefinitionName: policySetDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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
): Promise<PolicySetDefinitionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionVersionDeserializer(result.body);
}

/** This operation retrieves the policy set definition version in the given management group with the given name and version. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupName: string,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinitionVersion> {
  const result = await _getAtManagementGroupSend(
    context,
    managementGroupName,
    policySetDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _getAtManagementGroupDeserialize(result);
}

export function _listBuiltInSend(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionVersionsListBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions{?api%2Dversion,%24expand,%24top}",
    {
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<_PolicySetDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionVersionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the built-in policy set definition versions for the given built-in policy set definition. */
export function listBuiltIn(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionVersionsListBuiltInOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicySetDefinitionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBuiltInSend(context, policySetDefinitionName, options),
    _listBuiltInDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _getBuiltInSend(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsGetBuiltInOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion,%24expand}",
    {
      policySetDefinitionName: policySetDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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
): Promise<PolicySetDefinitionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionVersionDeserializer(result.body);
}

/** This operation retrieves the built-in policy set definition version with the given name and version. */
export async function getBuiltIn(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsGetBuiltInOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinitionVersion> {
  const result = await _getBuiltInSend(
    context,
    policySetDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _getBuiltInDeserialize(result);
}

export function _listSend(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions{?api%2Dversion,%24expand,%24top}",
    {
      subscriptionId: context.subscriptionId,
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<_PolicySetDefinitionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policySetDefinitionVersionListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the policy set definition versions for the given policy set definition. */
export function list(
  context: Client,
  policySetDefinitionName: string,
  options: PolicySetDefinitionVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicySetDefinitionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, policySetDefinitionName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policySetDefinitionName: policySetDefinitionName,
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

/** This operation deletes the policy set definition version in the given subscription with the given name and version. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    policySetDefinitionName,
    policyDefinitionVersion,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicySetDefinitionVersion,
  options: PolicySetDefinitionVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      policySetDefinitionName: policySetDefinitionName,
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
    body: policySetDefinitionVersionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicySetDefinitionVersion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionVersionDeserializer(result.body);
}

/** This operation creates or updates a policy set definition version in the given subscription with the given name and version. */
export async function createOrUpdate(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  parameters: PolicySetDefinitionVersion,
  options: PolicySetDefinitionVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinitionVersion> {
  const result = await _createOrUpdateSend(
    context,
    policySetDefinitionName,
    policyDefinitionVersion,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      policySetDefinitionName: policySetDefinitionName,
      policyDefinitionVersion: policyDefinitionVersion,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicySetDefinitionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policySetDefinitionVersionDeserializer(result.body);
}

/** This operation retrieves the policy set definition version in the given subscription with the given name and version. */
export async function get(
  context: Client,
  policySetDefinitionName: string,
  policyDefinitionVersion: string,
  options: PolicySetDefinitionVersionsGetOptionalParams = { requestOptions: {} },
): Promise<PolicySetDefinitionVersion> {
  const result = await _getSend(context, policySetDefinitionName, policyDefinitionVersion, options);
  return _getDeserialize(result);
}
