// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type {
  PolicyAssignment,
  PolicyAssignmentUpdate,
  _PolicyAssignmentListResult,
} from "../../models/models.js";
import {
  policyAssignmentSerializer,
  policyAssignmentDeserializer,
  errorResponseDeserializer,
  policyAssignmentUpdateSerializer,
  _policyAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyAssignmentsListForResourceOptionalParams,
  PolicyAssignmentsListOptionalParams,
  PolicyAssignmentsListForManagementGroupOptionalParams,
  PolicyAssignmentsListForResourceGroupOptionalParams,
  PolicyAssignmentsDeleteOptionalParams,
  PolicyAssignmentsUpdateOptionalParams,
  PolicyAssignmentsCreateOptionalParams,
  PolicyAssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForResourceSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  options: PolicyAssignmentsListForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}/providers/Microsoft.Authorization/policyAssignments{?api%2Dversion,%24filter,%24expand,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
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

export async function _listForResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyAssignmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy assignments associated with the specified resource in the given resource group and subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the resource, including those that apply directly or from all containing scopes, as well as any applied to resources contained within the resource. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the resource, which is everything in the unfiltered list except those applied to resources contained within the resource. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the resource level. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the resource. Three parameters plus the resource name are used to identify a specific resource. If the resource is not part of a parent resource (the more common case), the parent resource path should not be provided (or provided as ''). For example a web app could be specified as ({resourceProviderNamespace} == 'Microsoft.Web', {parentResourcePath} == '', {resourceType} == 'sites', {resourceName} == 'MyWebApp'). If the resource is part of a parent resource, then all parameters should be provided. For example a virtual machine DNS name could be specified as ({resourceProviderNamespace} == 'Microsoft.Compute', {parentResourcePath} == 'virtualMachines/MyVirtualMachine', {resourceType} == 'domainNames', {resourceName} == 'MyComputerName'). A convenient alternative to providing the namespace and type name separately is to provide both in the {resourceType} parameter, format: ({resourceProviderNamespace} == '', {parentResourcePath} == '', {resourceType} == 'Microsoft.Web/sites', {resourceName} == 'MyWebApp'). */
export function listForResource(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  options: PolicyAssignmentsListForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listForResourceSend(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        options,
      ),
    _listForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _listSend(
  context: Client,
  options: PolicyAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyAssignments{?api%2Dversion,%24filter,%24expand,%24top}",
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
): Promise<_PolicyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyAssignmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy assignments associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the subscription, which is everything in the unfiltered list except those applied to objects contained within the subscription. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the subscription. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}. */
export function list(
  context: Client,
  options: PolicyAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _listForManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: PolicyAssignmentsListForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyAssignments{?api%2Dversion,%24filter,%24expand,%24top}",
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

export async function _listForManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyAssignmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy assignments applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter=atScope() is provided, the returned list includes all policy assignments that are assigned to the management group or the management group's ancestors. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the management group. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the management group. */
export function listForManagementGroup(
  context: Client,
  managementGroupId: string,
  options: PolicyAssignmentsListForManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForManagementGroupSend(context, managementGroupId, options),
    _listForManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _listForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PolicyAssignmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/policyAssignments{?api%2Dversion,%24filter,%24expand,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listForResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _policyAssignmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy assignments associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the resource group, which is everything in the unfiltered list except those applied to resources contained within the resource group. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the resource group. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the resource group. */
export function listForResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PolicyAssignmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceGroupSend(context, resourceGroupName, options),
    _listForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  options: PolicyAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      policyAssignmentName: policyAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyAssignment> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyAssignmentDeserializer(result.body);
}

/** This operation deletes a policy assignment, given its name and the scope it was created in. The scope of a policy assignment is the part of its ID preceding '/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}'. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  options: PolicyAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<PolicyAssignment> {
  const result = await _$deleteSend(context, scope, policyAssignmentName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  parameters: PolicyAssignmentUpdate,
  options: PolicyAssignmentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      policyAssignmentName: policyAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyAssignmentUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PolicyAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyAssignmentDeserializer(result.body);
}

/** This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group. */
export async function update(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  parameters: PolicyAssignmentUpdate,
  options: PolicyAssignmentsUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicyAssignment> {
  const result = await _updateSend(context, scope, policyAssignmentName, parameters, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  parameters: PolicyAssignment,
  options: PolicyAssignmentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      policyAssignmentName: policyAssignmentName,
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
    body: policyAssignmentSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<PolicyAssignment> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyAssignmentDeserializer(result.body);
}

/** This operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group. */
export async function create(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  parameters: PolicyAssignment,
  options: PolicyAssignmentsCreateOptionalParams = { requestOptions: {} },
): Promise<PolicyAssignment> {
  const result = await _createSend(context, scope, policyAssignmentName, parameters, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  options: PolicyAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}{?api%2Dversion,%24expand}",
    {
      scope: scope,
      policyAssignmentName: policyAssignmentName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PolicyAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return policyAssignmentDeserializer(result.body);
}

/** This operation retrieves a single policy assignment, given its name and the scope it was created at. */
export async function get(
  context: Client,
  scope: string,
  policyAssignmentName: string,
  options: PolicyAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<PolicyAssignment> {
  const result = await _getSend(context, scope, policyAssignmentName, options);
  return _getDeserialize(result);
}
