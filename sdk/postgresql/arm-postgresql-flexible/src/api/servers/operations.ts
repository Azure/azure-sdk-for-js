// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Server,
  serverSerializer,
  serverDeserializer,
  ServerForPatch,
  serverForPatchSerializer,
  _ServerList,
  _serverListDeserializer,
  restartParameterSerializer,
  MigrateNetworkStatus,
  migrateNetworkStatusDeserializer,
  StartMajorVersionUpgradePrecheckRequest,
  startMajorVersionUpgradePrecheckRequestSerializer,
  StartMajorVersionUpgradePrecheckResponse,
  startMajorVersionUpgradePrecheckResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServersStartMajorVersionUpgradePrecheckOptionalParams,
  ServersMigrateNetworkModeOptionalParams,
  ServersStopOptionalParams,
  ServersStartOptionalParams,
  ServersRestartOptionalParams,
  ServersListBySubscriptionOptionalParams,
  ServersListByResourceGroupOptionalParams,
  ServersDeleteOptionalParams,
  ServersUpdateOptionalParams,
  ServersCreateOrUpdateOptionalParams,
  ServersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _startMajorVersionUpgradePrecheckSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  body: StartMajorVersionUpgradePrecheckRequest,
  options: ServersStartMajorVersionUpgradePrecheckOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/startMajorVersionUpgradePrecheck{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: startMajorVersionUpgradePrecheckRequestSerializer(body),
    });
}

export async function _startMajorVersionUpgradePrecheckDeserialize(
  result: PathUncheckedResponse,
): Promise<StartMajorVersionUpgradePrecheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return startMajorVersionUpgradePrecheckResponseDeserializer(result.body);
}

/** Start Major Version Upgrade Prechecks. */
export function startMajorVersionUpgradePrecheck(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  body: StartMajorVersionUpgradePrecheckRequest,
  options: ServersStartMajorVersionUpgradePrecheckOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<StartMajorVersionUpgradePrecheckResponse>,
  StartMajorVersionUpgradePrecheckResponse
> {
  return getLongRunningPoller(
    context,
    _startMajorVersionUpgradePrecheckDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _startMajorVersionUpgradePrecheckSend(
          context,
          resourceGroupName,
          serverName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  ) as PollerLike<
    OperationState<StartMajorVersionUpgradePrecheckResponse>,
    StartMajorVersionUpgradePrecheckResponse
  >;
}

export function _migrateNetworkModeSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersMigrateNetworkModeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrateNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _migrateNetworkModeDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateNetworkStatus> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return migrateNetworkStatusDeserializer(result.body);
}

/** Migrates an Azure Database for PostgreSQL server from VNet integration to a Private Link network model. */
export function migrateNetworkMode(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersMigrateNetworkModeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrateNetworkStatus>, MigrateNetworkStatus> {
  return getLongRunningPoller(context, _migrateNetworkModeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateNetworkModeSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<MigrateNetworkStatus>, MigrateNetworkStatus>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Stops a server. */
export function stop(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Starts a stopped server. */
export function start(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: !options?.parameters
        ? options?.parameters
        : restartParameterSerializer(options?.parameters),
    });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Restarts PostgreSQL database engine in a server. */
export function restart(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _restartSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ServersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/flexibleServers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<_ServerList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _serverListDeserializer(result.body);
}

/** Lists all servers in a subscription. */
export function listBySubscription(
  context: Client,
  options: ServersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Server> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ServersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<_ServerList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _serverListDeserializer(result.body);
}

/** Lists all servers in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ServersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Server> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes or drops an existing server. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerForPatch,
  options: ServersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
      body: serverForPatchSerializer(parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverDeserializer(result.body);
}

/** Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerForPatch,
  options: ServersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Server>, Server> {
  return getLongRunningPoller(context, _updateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<Server>, Server>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: Server,
  options: ServersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
      body: serverSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverDeserializer(result.body);
}

/** Creates a new server. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: Server,
  options: ServersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Server>, Server> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<Server>, Server>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverDeserializer(result.body);
}

/** Gets information about an existing server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersGetOptionalParams = { requestOptions: {} },
): Promise<Server> {
  const result = await _getSend(context, resourceGroupName, serverName, options);
  return _getDeserialize(result);
}
