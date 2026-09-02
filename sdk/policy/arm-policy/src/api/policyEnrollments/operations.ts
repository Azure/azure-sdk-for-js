// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type {
  PolicyEnrollment,
  PolicyEnrollmentUpdate,
  _PolicyEnrollmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  policyEnrollmentSerializer,
  policyEnrollmentDeserializer,
  policyEnrollmentUpdateSerializer,
  _policyEnrollmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyEnrollmentsListForResourceOptionalParams,
  PolicyEnrollmentsListOptionalParams,
  PolicyEnrollmentsListForManagementGroupOptionalParams,
  PolicyEnrollmentsListForResourceGroupOptionalParams,
  PolicyEnrollmentsDeleteOptionalParams,
  PolicyEnrollmentsUpdateOptionalParams,
  PolicyEnrollmentsCreateOrUpdateOptionalParams,
  PolicyEnrollmentsGetOptionalParams,
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
  options: PolicyEnrollmentsListForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}/providers/Microsoft.Authorization/policyEnrollments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24filter": options?.filter,
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
): Promise<_PolicyEnrollmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _policyEnrollmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy enrollments associated with the specified resource in the given resource group and subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the resource, including those that apply directly or from all containing scopes, as well as any applied to resources contained within the resource. Three parameters plus the resource name are used to identify a specific resource. If the resource is not part of a parent resource (the more common case), the parent resource path should not be provided (or provided as ''). For example a web app could be specified as ({resourceProviderNamespace} == 'Microsoft.Web', {parentResourcePath} == '', {resourceType} == 'sites', {resourceName} == 'MyWebApp'). If the resource is part of a parent resource, then all parameters should be provided. For example a virtual machine DNS name could be specified as ({resourceProviderNamespace} == 'Microsoft.Compute', {parentResourcePath} == 'virtualMachines/MyVirtualMachine', {resourceType} == 'domainNames', {resourceName} == 'MyComputerName'). A convenient alternative to providing the namespace and type name separately is to provide both in the {resourceType} parameter, format: ({resourceProviderNamespace} == '', {parentResourcePath} == '', {resourceType} == 'Microsoft.Web/sites', {resourceName} == 'MyWebApp'). */
export function listForResource(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  options: PolicyEnrollmentsListForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEnrollment> {
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
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  options: PolicyEnrollmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyEnrollments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24filter": options?.filter,
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
): Promise<_PolicyEnrollmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _policyEnrollmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy enrollments associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription. */
export function list(
  context: Client,
  options: PolicyEnrollmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEnrollment> {
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

export function _listForManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: PolicyEnrollmentsListForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyEnrollments{?api%2Dversion,%24filter}",
    {
      managementGroupId: managementGroupId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24filter": options?.filter,
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
): Promise<_PolicyEnrollmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _policyEnrollmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy enrollments applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter=atScope() is provided, the returned list includes all policy enrollments that are assigned to the management group or the management group's ancestors. */
export function listForManagementGroup(
  context: Client,
  managementGroupId: string,
  options: PolicyEnrollmentsListForManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEnrollment> {
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

export function _listForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PolicyEnrollmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/policyEnrollments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24filter": options?.filter,
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
): Promise<_PolicyEnrollmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _policyEnrollmentListResultDeserializer(result.body);
}

/** This operation retrieves the list of all policy enrollments associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group. */
export function listForResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PolicyEnrollmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEnrollment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceGroupSend(context, resourceGroupName, options),
    _listForResourceGroupDeserialize,
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
  scope: string,
  policyEnrollmentName: string,
  options: PolicyEnrollmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}{?api%2Dversion}",
    {
      scope: scope,
      policyEnrollmentName: policyEnrollmentName,
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

/** This operation deletes a policy enrollment, given its name and the scope it was created in. The scope of a policy enrollment is the part of its ID preceding '/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}'. */
export async function $delete(
  context: Client,
  scope: string,
  policyEnrollmentName: string,
  options: PolicyEnrollmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, policyEnrollmentName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  scope: string,
  policyEnrollmentName: string,
  parameters: PolicyEnrollmentUpdate,
  options: PolicyEnrollmentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}{?api%2Dversion}",
    {
      scope: scope,
      policyEnrollmentName: policyEnrollmentName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyEnrollmentUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PolicyEnrollment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return policyEnrollmentDeserializer(result.body);
}

/** This operation updates a policy enrollment with the given scope and name. */
export async function update(
  context: Client,
  scope: string,
  policyEnrollmentName: string,
  parameters: PolicyEnrollmentUpdate,
  options: PolicyEnrollmentsUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicyEnrollment> {
  const result = await _updateSend(context, scope, policyEnrollmentName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  policyEnrollmentName: string,
  parameters: PolicyEnrollment,
  options: PolicyEnrollmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}{?api%2Dversion}",
    {
      scope: scope,
      policyEnrollmentName: policyEnrollmentName,
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
    body: policyEnrollmentSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyEnrollment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return policyEnrollmentDeserializer(result.body);
}

/** This operation creates or updates a policy enrollment with the given scope and name. Policy enrollments apply to all resources contained within their scope. For example, when you create a policy enrollment at resource group scope for a policy assignment at the same or above level, the enrollment applies to all applicable resources in the resource group. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  policyEnrollmentName: string,
  parameters: PolicyEnrollment,
  options: PolicyEnrollmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicyEnrollment> {
  const result = await _createOrUpdateSend(
    context,
    scope,
    policyEnrollmentName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  policyEnrollmentName: string,
  options: PolicyEnrollmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}{?api%2Dversion}",
    {
      scope: scope,
      policyEnrollmentName: policyEnrollmentName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PolicyEnrollment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return policyEnrollmentDeserializer(result.body);
}

/** This operation retrieves a single policy enrollment, given its name and the scope it was created at. */
export async function get(
  context: Client,
  scope: string,
  policyEnrollmentName: string,
  options: PolicyEnrollmentsGetOptionalParams = { requestOptions: {} },
): Promise<PolicyEnrollment> {
  const result = await _getSend(context, scope, policyEnrollmentName, options);
  return _getDeserialize(result);
}
