// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SolutionVersion,
  solutionVersionDeserializer,
  InstallSolutionParameter,
  installSolutionParameterSerializer,
  Target,
  targetSerializer,
  targetDeserializer,
  TargetUpdate,
  targetUpdateSerializer,
  _TargetListResult,
  _targetListResultDeserializer,
  UninstallSolutionParameter,
  uninstallSolutionParameterSerializer,
  RemoveRevisionParameter,
  removeRevisionParameterSerializer,
  SolutionTemplateParameter,
  solutionTemplateParameterSerializer,
  ResolvedConfiguration,
  resolvedConfigurationDeserializer,
  SolutionVersionParameter,
  solutionVersionParameterSerializer,
  UpdateExternalValidationStatusParameter,
  updateExternalValidationStatusParameterSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TargetsUpdateExternalValidationStatusOptionalParams,
  TargetsPublishSolutionVersionOptionalParams,
  TargetsReviewSolutionVersionOptionalParams,
  TargetsResolveConfigurationOptionalParams,
  TargetsRemoveRevisionOptionalParams,
  TargetsUninstallSolutionOptionalParams,
  TargetsInstallSolutionOptionalParams,
  TargetsListBySubscriptionOptionalParams,
  TargetsListByResourceGroupOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsUpdateOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _updateExternalValidationStatusSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: UpdateExternalValidationStatusParameter,
  options: TargetsUpdateExternalValidationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/updateExternalValidationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateExternalValidationStatusParameterSerializer(body),
  });
}

export async function _updateExternalValidationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionVersion> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionVersionDeserializer(result.body);
}

/** Post request to update external validation status */
export function updateExternalValidationStatus(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: UpdateExternalValidationStatusParameter,
  options: TargetsUpdateExternalValidationStatusOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SolutionVersion>, SolutionVersion> {
  return getLongRunningPoller(context, _updateExternalValidationStatusDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateExternalValidationStatusSend(context, resourceGroupName, targetName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
}

export function _publishSolutionVersionSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: SolutionVersionParameter,
  options: TargetsPublishSolutionVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/publishSolutionVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: solutionVersionParameterSerializer(body),
  });
}

export async function _publishSolutionVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionVersion> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionVersionDeserializer(result.body);
}

/** Post request to publish */
export function publishSolutionVersion(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: SolutionVersionParameter,
  options: TargetsPublishSolutionVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SolutionVersion>, SolutionVersion> {
  return getLongRunningPoller(context, _publishSolutionVersionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _publishSolutionVersionSend(context, resourceGroupName, targetName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
}

export function _reviewSolutionVersionSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: SolutionTemplateParameter,
  options: TargetsReviewSolutionVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/reviewSolutionVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: solutionTemplateParameterSerializer(body),
  });
}

export async function _reviewSolutionVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionVersion> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionVersionDeserializer(result.body);
}

/** Post request to review configuration */
export function reviewSolutionVersion(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: SolutionTemplateParameter,
  options: TargetsReviewSolutionVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SolutionVersion>, SolutionVersion> {
  return getLongRunningPoller(context, _reviewSolutionVersionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reviewSolutionVersionSend(context, resourceGroupName, targetName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
}

export function _resolveConfigurationSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: SolutionTemplateParameter,
  options: TargetsResolveConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/resolveConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: solutionTemplateParameterSerializer(body),
  });
}

export async function _resolveConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<ResolvedConfiguration> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resolvedConfigurationDeserializer(result.body);
}

/** Post request to resolve configuration */
export function resolveConfiguration(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: SolutionTemplateParameter,
  options: TargetsResolveConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResolvedConfiguration>, ResolvedConfiguration> {
  return getLongRunningPoller(context, _resolveConfigurationDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resolveConfigurationSend(context, resourceGroupName, targetName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ResolvedConfiguration>, ResolvedConfiguration>;
}

export function _removeRevisionSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: RemoveRevisionParameter,
  options: TargetsRemoveRevisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/removeRevision{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: removeRevisionParameterSerializer(body),
  });
}

export async function _removeRevisionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Post request to remove solution version revision */
export function removeRevision(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: RemoveRevisionParameter,
  options: TargetsRemoveRevisionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _removeRevisionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _removeRevisionSend(context, resourceGroupName, targetName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _uninstallSolutionSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: UninstallSolutionParameter,
  options: TargetsUninstallSolutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/uninstallSolution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: uninstallSolutionParameterSerializer(body),
  });
}

export async function _uninstallSolutionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Post request to uninstall */
export function uninstallSolution(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: UninstallSolutionParameter,
  options: TargetsUninstallSolutionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _uninstallSolutionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _uninstallSolutionSend(context, resourceGroupName, targetName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _installSolutionSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: InstallSolutionParameter,
  options: TargetsInstallSolutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/installSolution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: installSolutionParameterSerializer(body),
  });
}

export async function _installSolutionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Post request to deploy */
export function installSolution(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  body: InstallSolutionParameter,
  options: TargetsInstallSolutionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _installSolutionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _installSolutionSend(context, resourceGroupName, targetName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: TargetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/targets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_TargetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _targetListResultDeserializer(result.body);
}

/** List by subscription */
export function listBySubscription(
  context: Client,
  options: TargetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Target> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: TargetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_TargetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _targetListResultDeserializer(result.body);
}

/** List by specified resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: TargetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Target> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}{?api%2Dversion,forceDelete}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
      forceDelete: options?.forceDelete,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Target Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, targetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  properties: TargetUpdate,
  options: TargetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: targetUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Target> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** update a Target Resource */
export function update(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  properties: TargetUpdate,
  options: TargetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Target>, Target> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, targetName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Target>, Target>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: targetSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Target> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** Create or update a Target Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Target>, Target> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, targetName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Target>, Target>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Target> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** Get a Target Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): Promise<Target> {
  const result = await _getSend(context, resourceGroupName, targetName, options);
  return _getDeserialize(result);
}
