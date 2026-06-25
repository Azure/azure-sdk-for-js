// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ContainerApp,
  containerAppSerializer,
  containerAppDeserializer,
  _ContainerAppCollection,
  _containerAppCollectionDeserializer,
  CustomHostnameAnalysisResult,
  customHostnameAnalysisResultDeserializer,
  SecretsCollection,
  secretsCollectionDeserializer,
  ContainerAppAuthToken,
  containerAppAuthTokenDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsStopOptionalParams,
  ContainerAppsStartOptionalParams,
  ContainerAppsGetAuthTokenOptionalParams,
  ContainerAppsListSecretsOptionalParams,
  ContainerAppsListCustomHostNameAnalysisOptionalParams,
  ContainerAppsListBySubscriptionOptionalParams,
  ContainerAppsListByResourceGroupOptionalParams,
  ContainerAppsDeleteOptionalParams,
  ContainerAppsUpdateOptionalParams,
  ContainerAppsCreateOrUpdateOptionalParams,
  ContainerAppsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<ContainerApp> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppDeserializer(result.body);
}

/** Stop a container app */
export function stop(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerApp>, ContainerApp> {
  return getLongRunningPoller(context, _stopDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, containerAppName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ContainerApp>, ContainerApp>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<ContainerApp> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppDeserializer(result.body);
}

/** Start a container app */
export function start(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerApp>, ContainerApp> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, containerAppName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ContainerApp>, ContainerApp>;
}

export function _getAuthTokenSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsGetAuthTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/getAuthtoken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAuthTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerAppAuthToken> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppAuthTokenDeserializer(result.body);
}

/** Get auth token for a container app */
export async function getAuthToken(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsGetAuthTokenOptionalParams = { requestOptions: {} },
): Promise<ContainerAppAuthToken> {
  const result = await _getAuthTokenSend(context, resourceGroupName, containerAppName, options);
  return _getAuthTokenDeserialize(result);
}

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<SecretsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return secretsCollectionDeserializer(result.body);
}

/** List secrets for a container app */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsListSecretsOptionalParams = { requestOptions: {} },
): Promise<SecretsCollection> {
  const result = await _listSecretsSend(context, resourceGroupName, containerAppName, options);
  return _listSecretsDeserialize(result);
}

export function _listCustomHostNameAnalysisSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsListCustomHostNameAnalysisOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/listCustomHostNameAnalysis{?api%2Dversion,customHostname}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      customHostname: options?.customHostname,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listCustomHostNameAnalysisDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomHostnameAnalysisResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customHostnameAnalysisResultDeserializer(result.body);
}

/** Analyzes a custom hostname for a Container App */
export async function listCustomHostNameAnalysis(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsListCustomHostNameAnalysisOptionalParams = { requestOptions: {} },
): Promise<CustomHostnameAnalysisResult> {
  const result = await _listCustomHostNameAnalysisSend(
    context,
    resourceGroupName,
    containerAppName,
    options,
  );
  return _listCustomHostNameAnalysisDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ContainerAppsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/containerApps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerAppCollectionDeserializer(result.body);
}

/** Get the Container Apps in a given subscription. */
export function listBySubscription(
  context: Client,
  options: ContainerAppsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerApp> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ContainerAppsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerAppCollectionDeserializer(result.body);
}

/** Get the Container Apps in a given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ContainerAppsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerApp> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Container App. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, containerAppName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  containerAppEnvelope: ContainerApp,
  options: ContainerAppsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: containerAppSerializer(containerAppEnvelope),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ContainerApp> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppDeserializer(result.body);
}

/** Patches a Container App using JSON Merge Patch */
export function update(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  containerAppEnvelope: ContainerApp,
  options: ContainerAppsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerApp>, ContainerApp> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, containerAppName, containerAppEnvelope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ContainerApp>, ContainerApp>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  containerAppEnvelope: ContainerApp,
  options: ContainerAppsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: containerAppSerializer(containerAppEnvelope),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerApp> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppDeserializer(result.body);
}

/** Create or update a Container App. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  containerAppEnvelope: ContainerApp,
  options: ContainerAppsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerApp>, ContainerApp> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        containerAppName,
        containerAppEnvelope,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ContainerApp>, ContainerApp>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ContainerApp> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppDeserializer(result.body);
}

/** Get the properties of a Container App. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsGetOptionalParams = { requestOptions: {} },
): Promise<ContainerApp> {
  const result = await _getSend(context, resourceGroupName, containerAppName, options);
  return _getDeserialize(result);
}
