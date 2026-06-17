// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  DeploymentOperation,
  deploymentOperationDeserializer,
  _DeploymentOperationsListResult,
  _deploymentOperationsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DeploymentOperationsListOptionalParams,
  DeploymentOperationsGetOptionalParams,
  DeploymentOperationsListAtSubscriptionScopeOptionalParams,
  DeploymentOperationsGetAtSubscriptionScopeOptionalParams,
  DeploymentOperationsListAtManagementGroupScopeOptionalParams,
  DeploymentOperationsGetAtManagementGroupScopeOptionalParams,
  DeploymentOperationsListAtTenantScopeOptionalParams,
  DeploymentOperationsGetAtTenantScopeOptionalParams,
  DeploymentOperationsListAtScopeOptionalParams,
  DeploymentOperationsGetAtScopeOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentOperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/deployments/{deploymentName}/operations{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentOperationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentOperationsListResultDeserializer(result.body);
}

/** Gets all deployments operations for a deployment. */
export function list(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentOperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, deploymentName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/deployments/{deploymentName}/operations/{operationId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      operationId: operationId,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeploymentOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentOperationDeserializer(result.body);
}

/** Gets a deployments operation. */
export async function get(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetOptionalParams = { requestOptions: {} },
): Promise<DeploymentOperation> {
  const result = await _getSend(context, resourceGroupName, deploymentName, operationId, options);
  return _getDeserialize(result);
}

export function _listAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentOperationsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/operations{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentOperationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentOperationsListResultDeserializer(result.body);
}

/** Gets all deployments operations for a deployment. */
export function listAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  options: DeploymentOperationsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtSubscriptionScopeSend(context, deploymentName, options),
    _listAtSubscriptionScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _getAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentOperationDeserializer(result.body);
}

/** Gets a deployments operation. */
export async function getAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentOperation> {
  const result = await _getAtSubscriptionScopeSend(context, deploymentName, operationId, options);
  return _getAtSubscriptionScopeDeserialize(result);
}

export function _listAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentOperationsListAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/operations{?api%2Dversion,%24top}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentOperationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentOperationsListResultDeserializer(result.body);
}

/** Gets all deployments operations for a deployment. */
export function listAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentOperationsListAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtManagementGroupScopeSend(context, groupId, deploymentName, options),
    _listAtManagementGroupScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _getAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/operations/{operationId}{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentOperationDeserializer(result.body);
}

/** Gets a deployments operation. */
export async function getAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentOperation> {
  const result = await _getAtManagementGroupScopeSend(
    context,
    groupId,
    deploymentName,
    operationId,
    options,
  );
  return _getAtManagementGroupScopeDeserialize(result);
}

export function _listAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentOperationsListAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}/operations{?api%2Dversion,%24top}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentOperationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentOperationsListResultDeserializer(result.body);
}

/** Gets all deployments operations for a deployment. */
export function listAtTenantScope(
  context: Client,
  deploymentName: string,
  options: DeploymentOperationsListAtTenantScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtTenantScopeSend(context, deploymentName, options),
    _listAtTenantScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _getAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}/operations/{operationId}{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentOperationDeserializer(result.body);
}

/** Gets a deployments operation. */
export async function getAtTenantScope(
  context: Client,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtTenantScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentOperation> {
  const result = await _getAtTenantScopeSend(context, deploymentName, operationId, options);
  return _getAtTenantScopeDeserialize(result);
}

export function _listAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentOperationsListAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}/operations{?api%2Dversion,%24top}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentOperationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentOperationsListResultDeserializer(result.body);
}

/** Gets all deployments operations for a deployment. */
export function listAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentOperationsListAtScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtScopeSend(context, scope, deploymentName, options),
    _listAtScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _getAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}/operations/{operationId}{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentOperationDeserializer(result.body);
}

/** Gets a deployments operation. */
export async function getAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  operationId: string,
  options: DeploymentOperationsGetAtScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentOperation> {
  const result = await _getAtScopeSend(context, scope, deploymentName, operationId, options);
  return _getAtScopeDeserialize(result);
}
