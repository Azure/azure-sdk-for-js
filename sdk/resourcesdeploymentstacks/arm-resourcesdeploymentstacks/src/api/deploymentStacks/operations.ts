// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentStacksContext as Client } from "../index.js";
import type {
  DeploymentStack,
  _DeploymentStackListResult,
  DeploymentStackValidateResult,
  DeploymentStackTemplateDefinition,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  deploymentStackSerializer,
  deploymentStackDeserializer,
  _deploymentStackListResultDeserializer,
  deploymentStackValidateResultDeserializer,
  deploymentStackTemplateDefinitionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeploymentStacksExportTemplateAtManagementGroupOptionalParams,
  DeploymentStacksDeleteAtManagementGroupOptionalParams,
  DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
  DeploymentStacksValidateStackAtManagementGroupOptionalParams,
  DeploymentStacksListAtManagementGroupOptionalParams,
  DeploymentStacksGetAtManagementGroupOptionalParams,
  DeploymentStacksExportTemplateAtSubscriptionOptionalParams,
  DeploymentStacksDeleteAtSubscriptionOptionalParams,
  DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
  DeploymentStacksValidateStackAtSubscriptionOptionalParams,
  DeploymentStacksListAtSubscriptionOptionalParams,
  DeploymentStacksGetAtSubscriptionOptionalParams,
  DeploymentStacksExportTemplateAtResourceGroupOptionalParams,
  DeploymentStacksDeleteAtResourceGroupOptionalParams,
  DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
  DeploymentStacksValidateStackAtResourceGroupOptionalParams,
  DeploymentStacksListAtResourceGroupOptionalParams,
  DeploymentStacksGetAtResourceGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _exportTemplateAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  options: DeploymentStacksExportTemplateAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/exportTemplate{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _exportTemplateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStackTemplateDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackTemplateDefinitionDeserializer(result.body);
}

/** Exports the template used to create the Deployment stack at the specified scope. */
export async function exportTemplateAtManagementGroup(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  options: DeploymentStacksExportTemplateAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<DeploymentStackTemplateDefinition> {
  const result = await _exportTemplateAtManagementGroupSend(
    context,
    managementGroupId,
    deploymentStackName,
    options,
  );
  return _exportTemplateAtManagementGroupDeserialize(result);
}

export function _deleteAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  options: DeploymentStacksDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion,unmanageAction.Resources,unmanageAction.ResourceGroups,unmanageAction.ManagementGroups,unmanageAction.ResourcesWithoutDeleteSupport,bypassStackOutOfSyncError}",
    {
      managementGroupId: managementGroupId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "unmanageAction.Resources": options?.unmanageActionResources,
      "unmanageAction.ResourceGroups": options?.unmanageActionResourceGroups,
      "unmanageAction.ManagementGroups": options?.unmanageActionManagementGroups,
      "unmanageAction.ResourcesWithoutDeleteSupport":
        options?.unmanageActionResourcesWithoutDeleteSupport,
      bypassStackOutOfSyncError: options?.bypassStackOutOfSyncError,
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
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
export function deleteAtManagementGroup(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  options: DeploymentStacksDeleteAtManagementGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteAtManagementGroupDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteAtManagementGroupSend(context, managementGroupId, deploymentStackName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentStackSerializer(deploymentStack),
  });
}

export async function _createOrUpdateAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStack> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackDeserializer(result.body);
}

/** Creates or updates a Deployment stack at the specified scope. */
export function createOrUpdateAtManagementGroup(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentStack>, DeploymentStack> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtManagementGroupDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtManagementGroupSend(
          context,
          managementGroupId,
          deploymentStackName,
          deploymentStack,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2025-07-01",
    },
  ) as PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
}

export function _validateStackAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksValidateStackAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/validate{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentStackSerializer(deploymentStack),
  });
}

export async function _validateStackAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStackValidateResult> {
  const expectedStatuses = ["202", "200", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackValidateResultDeserializer(result.body);
}

/** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
export function validateStackAtManagementGroup(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksValidateStackAtManagementGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult> {
  return getLongRunningPoller(
    context,
    _validateStackAtManagementGroupDeserialize,
    ["202", "200", "400", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateStackAtManagementGroupSend(
          context,
          managementGroupId,
          deploymentStackName,
          deploymentStack,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-07-01",
    },
  ) as PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
}

export function _listAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  options: DeploymentStacksListAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _listAtManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentStackListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _deploymentStackListResultDeserializer(result.body);
}

/** Lists Deployment stacks at the specified scope. */
export function listAtManagementGroup(
  context: Client,
  managementGroupId: string,
  options: DeploymentStacksListAtManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentStack> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtManagementGroupSend(context, managementGroupId, options),
    _listAtManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _getAtManagementGroupSend(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  options: DeploymentStacksGetAtManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
): Promise<DeploymentStack> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackDeserializer(result.body);
}

/** Gets the Deployment stack with the given name. */
export async function getAtManagementGroup(
  context: Client,
  managementGroupId: string,
  deploymentStackName: string,
  options: DeploymentStacksGetAtManagementGroupOptionalParams = { requestOptions: {} },
): Promise<DeploymentStack> {
  const result = await _getAtManagementGroupSend(
    context,
    managementGroupId,
    deploymentStackName,
    options,
  );
  return _getAtManagementGroupDeserialize(result);
}

export function _exportTemplateAtSubscriptionSend(
  context: Client,
  deploymentStackName: string,
  options: DeploymentStacksExportTemplateAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/exportTemplate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _exportTemplateAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStackTemplateDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackTemplateDefinitionDeserializer(result.body);
}

/** Exports the template used to create the Deployment stack at the specified scope. */
export async function exportTemplateAtSubscription(
  context: Client,
  deploymentStackName: string,
  options: DeploymentStacksExportTemplateAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<DeploymentStackTemplateDefinition> {
  const result = await _exportTemplateAtSubscriptionSend(context, deploymentStackName, options);
  return _exportTemplateAtSubscriptionDeserialize(result);
}

export function _deleteAtSubscriptionSend(
  context: Client,
  deploymentStackName: string,
  options: DeploymentStacksDeleteAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion,unmanageAction.Resources,unmanageAction.ResourceGroups,unmanageAction.ManagementGroups,unmanageAction.ResourcesWithoutDeleteSupport,bypassStackOutOfSyncError}",
    {
      subscriptionId: context.subscriptionId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "unmanageAction.Resources": options?.unmanageActionResources,
      "unmanageAction.ResourceGroups": options?.unmanageActionResourceGroups,
      "unmanageAction.ManagementGroups": options?.unmanageActionManagementGroups,
      "unmanageAction.ResourcesWithoutDeleteSupport":
        options?.unmanageActionResourcesWithoutDeleteSupport,
      bypassStackOutOfSyncError: options?.bypassStackOutOfSyncError,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
export function deleteAtSubscription(
  context: Client,
  deploymentStackName: string,
  options: DeploymentStacksDeleteAtSubscriptionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteAtSubscriptionDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteAtSubscriptionSend(context, deploymentStackName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAtSubscriptionSend(
  context: Client,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentStackSerializer(deploymentStack),
  });
}

export async function _createOrUpdateAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStack> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackDeserializer(result.body);
}

/** Creates or updates a Deployment stack at the specified scope. */
export function createOrUpdateAtSubscription(
  context: Client,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentStack>, DeploymentStack> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtSubscriptionDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtSubscriptionSend(context, deploymentStackName, deploymentStack, options),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2025-07-01",
    },
  ) as PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
}

export function _validateStackAtSubscriptionSend(
  context: Client,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksValidateStackAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentStackSerializer(deploymentStack),
  });
}

export async function _validateStackAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStackValidateResult> {
  const expectedStatuses = ["202", "200", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackValidateResultDeserializer(result.body);
}

/** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
export function validateStackAtSubscription(
  context: Client,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksValidateStackAtSubscriptionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult> {
  return getLongRunningPoller(
    context,
    _validateStackAtSubscriptionDeserialize,
    ["202", "200", "400", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateStackAtSubscriptionSend(context, deploymentStackName, deploymentStack, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-07-01",
    },
  ) as PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
}

export function _listAtSubscriptionSend(
  context: Client,
  options: DeploymentStacksListAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _listAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentStackListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _deploymentStackListResultDeserializer(result.body);
}

/** Lists Deployment stacks at the specified scope. */
export function listAtSubscription(
  context: Client,
  options: DeploymentStacksListAtSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentStack> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtSubscriptionSend(context, options),
    _listAtSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _getAtSubscriptionSend(
  context: Client,
  deploymentStackName: string,
  options: DeploymentStacksGetAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
): Promise<DeploymentStack> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackDeserializer(result.body);
}

/** Gets the Deployment stack with the given name. */
export async function getAtSubscription(
  context: Client,
  deploymentStackName: string,
  options: DeploymentStacksGetAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<DeploymentStack> {
  const result = await _getAtSubscriptionSend(context, deploymentStackName, options);
  return _getAtSubscriptionDeserialize(result);
}

export function _exportTemplateAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  options: DeploymentStacksExportTemplateAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/exportTemplate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _exportTemplateAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStackTemplateDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackTemplateDefinitionDeserializer(result.body);
}

/** Exports the template used to create the Deployment stack at the specified scope. */
export async function exportTemplateAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  options: DeploymentStacksExportTemplateAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<DeploymentStackTemplateDefinition> {
  const result = await _exportTemplateAtResourceGroupSend(
    context,
    resourceGroupName,
    deploymentStackName,
    options,
  );
  return _exportTemplateAtResourceGroupDeserialize(result);
}

export function _deleteAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  options: DeploymentStacksDeleteAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion,unmanageAction.Resources,unmanageAction.ResourceGroups,unmanageAction.ManagementGroups,unmanageAction.ResourcesWithoutDeleteSupport,bypassStackOutOfSyncError}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "unmanageAction.Resources": options?.unmanageActionResources,
      "unmanageAction.ResourceGroups": options?.unmanageActionResourceGroups,
      "unmanageAction.ManagementGroups": options?.unmanageActionManagementGroups,
      "unmanageAction.ResourcesWithoutDeleteSupport":
        options?.unmanageActionResourcesWithoutDeleteSupport,
      bypassStackOutOfSyncError: options?.bypassStackOutOfSyncError,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
export function deleteAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  options: DeploymentStacksDeleteAtResourceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteAtResourceGroupDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteAtResourceGroupSend(context, resourceGroupName, deploymentStackName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentStackSerializer(deploymentStack),
  });
}

export async function _createOrUpdateAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStack> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackDeserializer(result.body);
}

/** Creates or updates a Deployment stack at the specified scope. */
export function createOrUpdateAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentStack>, DeploymentStack> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtResourceGroupDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtResourceGroupSend(
          context,
          resourceGroupName,
          deploymentStackName,
          deploymentStack,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2025-07-01",
    },
  ) as PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
}

export function _validateStackAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksValidateStackAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentStackSerializer(deploymentStack),
  });
}

export async function _validateStackAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStackValidateResult> {
  const expectedStatuses = ["202", "200", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackValidateResultDeserializer(result.body);
}

/** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
export function validateStackAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  deploymentStack: DeploymentStack,
  options: DeploymentStacksValidateStackAtResourceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult> {
  return getLongRunningPoller(
    context,
    _validateStackAtResourceGroupDeserialize,
    ["202", "200", "400", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateStackAtResourceGroupSend(
          context,
          resourceGroupName,
          deploymentStackName,
          deploymentStack,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-07-01",
    },
  ) as PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
}

export function _listAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DeploymentStacksListAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _listAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentStackListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _deploymentStackListResultDeserializer(result.body);
}

/** Lists Deployment stacks at the specified scope. */
export function listAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DeploymentStacksListAtResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentStack> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtResourceGroupSend(context, resourceGroupName, options),
    _listAtResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _getAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  options: DeploymentStacksGetAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStackName: deploymentStackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
): Promise<DeploymentStack> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStackDeserializer(result.body);
}

/** Gets the Deployment stack with the given name. */
export async function getAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  deploymentStackName: string,
  options: DeploymentStacksGetAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<DeploymentStack> {
  const result = await _getAtResourceGroupSend(
    context,
    resourceGroupName,
    deploymentStackName,
    options,
  );
  return _getAtResourceGroupDeserialize(result);
}
