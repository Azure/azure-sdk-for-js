// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type {
  Remediation,
  _RemediationListResult,
  _RemediationDeploymentsListResult,
  RemediationDeployment,
} from "../../models/policyInsightsApi/models.js";
import {
  remediationSerializer,
  remediationDeserializer,
  errorResponseDeserializer,
  _remediationListResultDeserializer,
  _remediationDeploymentsListResultDeserializer,
} from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RemediationsCancelAtManagementGroupOptionalParams,
  RemediationsListDeploymentsAtManagementGroupOptionalParams,
  RemediationsCancelAtResourceOptionalParams,
  RemediationsListDeploymentsAtResourceOptionalParams,
  RemediationsListForResourceOptionalParams,
  RemediationsDeleteAtResourceOptionalParams,
  RemediationsCreateOrUpdateAtResourceOptionalParams,
  RemediationsGetAtResourceOptionalParams,
  RemediationsCancelAtResourceGroupOptionalParams,
  RemediationsListDeploymentsAtResourceGroupOptionalParams,
  RemediationsListForResourceGroupOptionalParams,
  RemediationsDeleteAtResourceGroupOptionalParams,
  RemediationsCreateOrUpdateAtResourceGroupOptionalParams,
  RemediationsGetAtResourceGroupOptionalParams,
  RemediationsCancelAtSubscriptionOptionalParams,
  RemediationsListDeploymentsAtSubscriptionOptionalParams,
  RemediationsListForSubscriptionOptionalParams,
  RemediationsDeleteAtSubscriptionOptionalParams,
  RemediationsCreateOrUpdateAtSubscriptionOptionalParams,
  RemediationsGetAtSubscriptionOptionalParams,
  RemediationsListForManagementGroupOptionalParams,
  RemediationsDeleteAtManagementGroupOptionalParams,
  RemediationsCreateOrUpdateAtManagementGroupOptionalParams,
  RemediationsGetAtManagementGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsCancelAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/cancel{?api%2Dversion}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupId: managementGroupId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _cancelAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Cancels a remediation at management group scope. */
export async function cancelAtManagementGroup(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsCancelAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _cancelAtManagementGroupSend(
    context,
    managementGroupId,
    remediationName,
    options,
  );
  return _cancelAtManagementGroupDeserialize(result);
}

export function _listDeploymentsAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsListDeploymentsAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/listDeployments{?api%2Dversion,%24top}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupId: managementGroupId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
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

export async function _listDeploymentsAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_RemediationDeploymentsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationDeploymentsListResultDeserializer(result.body);
}

/** Gets all deployments for a remediation at management group scope. */
export function listDeploymentsAtManagementGroup(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsListDeploymentsAtManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RemediationDeployment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listDeploymentsAtManagementGroupSend(context, managementGroupId, remediationName, options),
    _listDeploymentsAtManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _cancelAtResourceSend(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsCancelAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/cancel{?api%2Dversion}",
    {
      resourceId: resourceId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _cancelAtResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Cancel a remediation at resource scope. */
export async function cancelAtResource(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsCancelAtResourceOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _cancelAtResourceSend(context, resourceId, remediationName, options);
  return _cancelAtResourceDeserialize(result);
}

export function _listDeploymentsAtResourceSend(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsListDeploymentsAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/listDeployments{?api%2Dversion,%24top}",
    {
      resourceId: resourceId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
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

export async function _listDeploymentsAtResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_RemediationDeploymentsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationDeploymentsListResultDeserializer(result.body);
}

/** Gets all deployments for a remediation at resource scope. */
export function listDeploymentsAtResource(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsListDeploymentsAtResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RemediationDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsAtResourceSend(context, resourceId, remediationName, options),
    _listDeploymentsAtResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listForResourceSend(
  context: Client,
  resourceId: string,
  options: RemediationsListForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/remediations{?api%2Dversion,%24top,%24filter}",
    {
      resourceId: resourceId,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
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
): Promise<_RemediationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationListResultDeserializer(result.body);
}

/** Gets all remediations for a resource. */
export function listForResource(
  context: Client,
  resourceId: string,
  options: RemediationsListForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Remediation> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceSend(context, resourceId, options),
    _listForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _deleteAtResourceSend(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsDeleteAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _deleteAtResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation | undefined> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? remediationDeserializer(result.body) : undefined;
}

/** Deletes an existing remediation at individual resource scope. */
export async function deleteAtResource(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsDeleteAtResourceOptionalParams = { requestOptions: {} },
): Promise<Remediation | undefined> {
  const result = await _deleteAtResourceSend(context, resourceId, remediationName, options);
  return _deleteAtResourceDeserialize(result);
}

export function _createOrUpdateAtResourceSend(
  context: Client,
  resourceId: string,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remediationSerializer(parameters),
  });
}

export async function _createOrUpdateAtResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Creates or updates a remediation at resource scope. */
export async function createOrUpdateAtResource(
  context: Client,
  resourceId: string,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtResourceOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _createOrUpdateAtResourceSend(
    context,
    resourceId,
    remediationName,
    parameters,
    options,
  );
  return _createOrUpdateAtResourceDeserialize(result);
}

export function _getAtResourceSend(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsGetAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _getAtResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Gets an existing remediation at resource scope. */
export async function getAtResource(
  context: Client,
  resourceId: string,
  remediationName: string,
  options: RemediationsGetAtResourceOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _getAtResourceSend(context, resourceId, remediationName, options);
  return _getAtResourceDeserialize(result);
}

export function _cancelAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsCancelAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _cancelAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Cancels a remediation at resource group scope. */
export async function cancelAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsCancelAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _cancelAtResourceGroupSend(
    context,
    resourceGroupName,
    remediationName,
    options,
  );
  return _cancelAtResourceGroupDeserialize(result);
}

export function _listDeploymentsAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsListDeploymentsAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/listDeployments{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
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

export async function _listDeploymentsAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_RemediationDeploymentsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationDeploymentsListResultDeserializer(result.body);
}

/** Gets all deployments for a remediation at resource group scope. */
export function listDeploymentsAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsListDeploymentsAtResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RemediationDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsAtResourceGroupSend(context, resourceGroupName, remediationName, options),
    _listDeploymentsAtResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: RemediationsListForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/remediations{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
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
): Promise<_RemediationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationListResultDeserializer(result.body);
}

/** Gets all remediations for the subscription. */
export function listForResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: RemediationsListForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Remediation> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceGroupSend(context, resourceGroupName, options),
    _listForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _deleteAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsDeleteAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _deleteAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation | undefined> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? remediationDeserializer(result.body) : undefined;
}

/** Deletes an existing remediation at resource group scope. */
export async function deleteAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsDeleteAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation | undefined> {
  const result = await _deleteAtResourceGroupSend(
    context,
    resourceGroupName,
    remediationName,
    options,
  );
  return _deleteAtResourceGroupDeserialize(result);
}

export function _createOrUpdateAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remediationSerializer(parameters),
  });
}

export async function _createOrUpdateAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Creates or updates a remediation at resource group scope. */
export async function createOrUpdateAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _createOrUpdateAtResourceGroupSend(
    context,
    resourceGroupName,
    remediationName,
    parameters,
    options,
  );
  return _createOrUpdateAtResourceGroupDeserialize(result);
}

export function _getAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsGetAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _getAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Gets an existing remediation at resource group scope. */
export async function getAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  remediationName: string,
  options: RemediationsGetAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _getAtResourceGroupSend(
    context,
    resourceGroupName,
    remediationName,
    options,
  );
  return _getAtResourceGroupDeserialize(result);
}

export function _cancelAtSubscriptionSend(
  context: Client,
  remediationName: string,
  options: RemediationsCancelAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _cancelAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Cancels a remediation at subscription scope. */
export async function cancelAtSubscription(
  context: Client,
  remediationName: string,
  options: RemediationsCancelAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _cancelAtSubscriptionSend(context, remediationName, options);
  return _cancelAtSubscriptionDeserialize(result);
}

export function _listDeploymentsAtSubscriptionSend(
  context: Client,
  remediationName: string,
  options: RemediationsListDeploymentsAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}/listDeployments{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
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

export async function _listDeploymentsAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_RemediationDeploymentsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationDeploymentsListResultDeserializer(result.body);
}

/** Gets all deployments for a remediation at subscription scope. */
export function listDeploymentsAtSubscription(
  context: Client,
  remediationName: string,
  options: RemediationsListDeploymentsAtSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RemediationDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsAtSubscriptionSend(context, remediationName, options),
    _listDeploymentsAtSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listForSubscriptionSend(
  context: Client,
  options: RemediationsListForSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/remediations{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
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

export async function _listForSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_RemediationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationListResultDeserializer(result.body);
}

/** Gets all remediations for the subscription. */
export function listForSubscription(
  context: Client,
  options: RemediationsListForSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Remediation> {
  return buildPagedAsyncIterator(
    context,
    () => _listForSubscriptionSend(context, options),
    _listForSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _deleteAtSubscriptionSend(
  context: Client,
  remediationName: string,
  options: RemediationsDeleteAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _deleteAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation | undefined> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? remediationDeserializer(result.body) : undefined;
}

/** Deletes an existing remediation at subscription scope. */
export async function deleteAtSubscription(
  context: Client,
  remediationName: string,
  options: RemediationsDeleteAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<Remediation | undefined> {
  const result = await _deleteAtSubscriptionSend(context, remediationName, options);
  return _deleteAtSubscriptionDeserialize(result);
}

export function _createOrUpdateAtSubscriptionSend(
  context: Client,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remediationSerializer(parameters),
  });
}

export async function _createOrUpdateAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Creates or updates a remediation at subscription scope. */
export async function createOrUpdateAtSubscription(
  context: Client,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _createOrUpdateAtSubscriptionSend(
    context,
    remediationName,
    parameters,
    options,
  );
  return _createOrUpdateAtSubscriptionDeserialize(result);
}

export function _getAtSubscriptionSend(
  context: Client,
  remediationName: string,
  options: RemediationsGetAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _getAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Gets an existing remediation at subscription scope. */
export async function getAtSubscription(
  context: Client,
  remediationName: string,
  options: RemediationsGetAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _getAtSubscriptionSend(context, remediationName, options);
  return _getAtSubscriptionDeserialize(result);
}

export function _listForManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: RemediationsListForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupId}/providers/Microsoft.PolicyInsights/remediations{?api%2Dversion,%24top,%24filter}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupId: managementGroupId,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
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
): Promise<_RemediationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _remediationListResultDeserializer(result.body);
}

/** Gets all remediations for the management group. */
export function listForManagementGroup(
  context: Client,
  managementGroupId: string,
  options: RemediationsListForManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Remediation> {
  return buildPagedAsyncIterator(
    context,
    () => _listForManagementGroupSend(context, managementGroupId, options),
    _listForManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _deleteAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupId: managementGroupId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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

export async function _deleteAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation | undefined> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? remediationDeserializer(result.body) : undefined;
}

/** Deletes an existing remediation at management group scope. */
export async function deleteAtManagementGroup(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation | undefined> {
  const result = await _deleteAtManagementGroupSend(
    context,
    managementGroupId,
    remediationName,
    options,
  );
  return _deleteAtManagementGroupDeserialize(result);
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupId: managementGroupId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remediationSerializer(parameters),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Remediation> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Creates or updates a remediation at management group scope. */
export async function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  parameters: Remediation,
  options: RemediationsCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _createOrUpdateAtManagementGroupSend(
    context,
    managementGroupId,
    remediationName,
    parameters,
    options,
  );
  return _createOrUpdateAtManagementGroupDeserialize(result);
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupId}/providers/Microsoft.PolicyInsights/remediations/{remediationName}{?api%2Dversion}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupId: managementGroupId,
      remediationName: remediationName,
      "api%2Dversion": "2024-10-01",
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
): Promise<Remediation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return remediationDeserializer(result.body);
}

/** Gets an existing remediation at management group scope. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupId: string,
  remediationName: string,
  options: RemediationsGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<Remediation> {
  const result = await _getAtManagementGroupSend(
    context,
    managementGroupId,
    remediationName,
    options,
  );
  return _getAtManagementGroupDeserialize(result);
}
