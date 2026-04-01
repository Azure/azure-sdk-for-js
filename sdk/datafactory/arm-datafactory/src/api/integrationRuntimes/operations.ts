// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  IntegrationRuntimeResource,
  UpdateIntegrationRuntimeRequest,
  _IntegrationRuntimeListResponse,
  IntegrationRuntimeStatusResponse,
  IntegrationRuntimeOutboundNetworkDependenciesEndpointsResponse,
  IntegrationRuntimeConnectionInfo,
  IntegrationRuntimeRegenerateKeyParameters,
  IntegrationRuntimeAuthKeys,
  IntegrationRuntimeMonitoringData,
  LinkedIntegrationRuntimeRequest,
  CreateLinkedIntegrationRuntimeRequest,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  integrationRuntimeResourceSerializer,
  integrationRuntimeResourceDeserializer,
  updateIntegrationRuntimeRequestSerializer,
  _integrationRuntimeListResponseDeserializer,
  integrationRuntimeStatusResponseDeserializer,
  integrationRuntimeOutboundNetworkDependenciesEndpointsResponseDeserializer,
  integrationRuntimeConnectionInfoDeserializer,
  integrationRuntimeRegenerateKeyParametersSerializer,
  integrationRuntimeAuthKeysDeserializer,
  integrationRuntimeMonitoringDataDeserializer,
  linkedIntegrationRuntimeRequestSerializer,
  createLinkedIntegrationRuntimeRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams,
  IntegrationRuntimesRemoveLinksOptionalParams,
  IntegrationRuntimesUpgradeOptionalParams,
  IntegrationRuntimesGetMonitoringDataOptionalParams,
  IntegrationRuntimesSyncCredentialsOptionalParams,
  IntegrationRuntimesStopOptionalParams,
  IntegrationRuntimesStartOptionalParams,
  IntegrationRuntimesListAuthKeysOptionalParams,
  IntegrationRuntimesRegenerateAuthKeyOptionalParams,
  IntegrationRuntimesGetConnectionInfoOptionalParams,
  IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams,
  IntegrationRuntimesGetStatusOptionalParams,
  IntegrationRuntimesListByFactoryOptionalParams,
  IntegrationRuntimesDeleteOptionalParams,
  IntegrationRuntimesUpdateOptionalParams,
  IntegrationRuntimesCreateOrUpdateOptionalParams,
  IntegrationRuntimesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createLinkedIntegrationRuntimeSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  createLinkedIntegrationRuntimeRequest: CreateLinkedIntegrationRuntimeRequest,
  options: IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/linkedIntegrationRuntime{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: createLinkedIntegrationRuntimeRequestSerializer(createLinkedIntegrationRuntimeRequest),
  });
}

export async function _createLinkedIntegrationRuntimeDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeStatusResponseDeserializer(result.body);
}

/** Create a linked integration runtime entry in a shared integration runtime. */
export async function createLinkedIntegrationRuntime(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  createLinkedIntegrationRuntimeRequest: CreateLinkedIntegrationRuntimeRequest,
  options: IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeStatusResponse> {
  const result = await _createLinkedIntegrationRuntimeSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    createLinkedIntegrationRuntimeRequest,
    options,
  );
  return _createLinkedIntegrationRuntimeDeserialize(result);
}

export function _removeLinksSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  linkedIntegrationRuntimeRequest: LinkedIntegrationRuntimeRequest,
  options: IntegrationRuntimesRemoveLinksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/removeLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: linkedIntegrationRuntimeRequestSerializer(linkedIntegrationRuntimeRequest),
  });
}

export async function _removeLinksDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Remove all linked integration runtimes under specific data factory in a self-hosted integration runtime. */
export async function removeLinks(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  linkedIntegrationRuntimeRequest: LinkedIntegrationRuntimeRequest,
  options: IntegrationRuntimesRemoveLinksOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeLinksSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    linkedIntegrationRuntimeRequest,
    options,
  );
  return _removeLinksDeserialize(result);
}

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _upgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Upgrade self-hosted integration runtime to latest version if availability. */
export async function upgrade(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesUpgradeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _upgradeSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _upgradeDeserialize(result);
}

export function _getMonitoringDataSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetMonitoringDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/monitoringData{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _getMonitoringDataDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeMonitoringData> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeMonitoringDataDeserializer(result.body);
}

/** Get the integration runtime monitoring data, which includes the monitor data for all the nodes under this integration runtime. */
export async function getMonitoringData(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetMonitoringDataOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeMonitoringData> {
  const result = await _getMonitoringDataSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _getMonitoringDataDeserialize(result);
}

export function _syncCredentialsSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesSyncCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/syncCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncCredentialsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Force the integration runtime to synchronize credentials across integration runtime nodes, and this will override the credentials across all worker nodes with those available on the dispatcher node. If you already have the latest credential backup file, you should manually import it (preferred) on any self-hosted integration runtime node than using this API directly. */
export async function syncCredentials(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesSyncCredentialsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncCredentialsSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _syncCredentialsDeserialize(result);
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stops a ManagedReserved type integration runtime. */
export function stop(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _startDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeStatusResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeStatusResponseDeserializer(result.body);
}

/** Starts a ManagedReserved type integration runtime. */
export function start(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IntegrationRuntimeStatusResponse>, IntegrationRuntimeStatusResponse> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<
    OperationState<IntegrationRuntimeStatusResponse>,
    IntegrationRuntimeStatusResponse
  >;
}

export function _listAuthKeysSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesListAuthKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/listAuthKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listAuthKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeAuthKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeAuthKeysDeserializer(result.body);
}

/** Retrieves the authentication keys for an integration runtime. */
export async function listAuthKeys(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesListAuthKeysOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeAuthKeys> {
  const result = await _listAuthKeysSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _listAuthKeysDeserialize(result);
}

export function _regenerateAuthKeySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  regenerateKeyParameters: IntegrationRuntimeRegenerateKeyParameters,
  options: IntegrationRuntimesRegenerateAuthKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/regenerateAuthKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: integrationRuntimeRegenerateKeyParametersSerializer(regenerateKeyParameters),
  });
}

export async function _regenerateAuthKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeAuthKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeAuthKeysDeserializer(result.body);
}

/** Regenerates the authentication key for an integration runtime. */
export async function regenerateAuthKey(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  regenerateKeyParameters: IntegrationRuntimeRegenerateKeyParameters,
  options: IntegrationRuntimesRegenerateAuthKeyOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeAuthKeys> {
  const result = await _regenerateAuthKeySend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    regenerateKeyParameters,
    options,
  );
  return _regenerateAuthKeyDeserialize(result);
}

export function _getConnectionInfoSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetConnectionInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getConnectionInfo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _getConnectionInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeConnectionInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeConnectionInfoDeserializer(result.body);
}

/** Gets the on-premises integration runtime connection information for encrypting the on-premises data source credentials. */
export async function getConnectionInfo(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetConnectionInfoOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeConnectionInfo> {
  const result = await _getConnectionInfoSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _getConnectionInfoDeserialize(result);
}

export function _listOutboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listOutboundNetworkDependenciesEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeOutboundNetworkDependenciesEndpointsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeOutboundNetworkDependenciesEndpointsResponseDeserializer(result.body);
}

/** Gets the list of outbound network dependencies for a given Azure-SSIS integration runtime. */
export async function listOutboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): Promise<IntegrationRuntimeOutboundNetworkDependenciesEndpointsResponse> {
  const result = await _listOutboundNetworkDependenciesEndpointsSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _listOutboundNetworkDependenciesEndpointsDeserialize(result);
}

export function _getStatusSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _getStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeStatusResponseDeserializer(result.body);
}

/** Gets detailed status information for an integration runtime. */
export async function getStatus(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetStatusOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeStatusResponse> {
  const result = await _getStatusSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _getStatusDeserialize(result);
}

export function _listByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: IntegrationRuntimesListByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_IntegrationRuntimeListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _integrationRuntimeListResponseDeserializer(result.body);
}

/** Lists integration runtimes. */
export function listByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: IntegrationRuntimesListByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IntegrationRuntimeResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFactorySend(context, resourceGroupName, factoryName, options),
    _listByFactoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an integration runtime. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  updateIntegrationRuntimeRequest: UpdateIntegrationRuntimeRequest,
  options: IntegrationRuntimesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateIntegrationRuntimeRequestSerializer(updateIntegrationRuntimeRequest),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeResourceDeserializer(result.body);
}

/** Updates an integration runtime. */
export async function update(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  updateIntegrationRuntimeRequest: UpdateIntegrationRuntimeRequest,
  options: IntegrationRuntimesUpdateOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    updateIntegrationRuntimeRequest,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  integrationRuntime: IntegrationRuntimeResource,
  options: IntegrationRuntimesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: integrationRuntimeResourceSerializer(integrationRuntime),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeResourceDeserializer(result.body);
}

/** Creates or updates an integration runtime. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  integrationRuntime: IntegrationRuntimeResource,
  options: IntegrationRuntimesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    integrationRuntime,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeResource> {
  const expectedStatuses = ["200", "304"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeResourceDeserializer(result.body);
}

/** Gets an integration runtime. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimesGetOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _getDeserialize(result);
}
