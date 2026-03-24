// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext as Client } from "../index.js";
import type {
  Database,
  DatabaseUpdate,
  _DatabaseList,
  AccessKeys,
  RegenerateKeyParameters,
  ImportClusterParameters,
  ExportClusterParameters,
  ForceUnlinkParameters,
  ForceLinkParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseSerializer,
  databaseDeserializer,
  databaseUpdateSerializer,
  _databaseListDeserializer,
  accessKeysDeserializer,
  regenerateKeyParametersSerializer,
  importClusterParametersSerializer,
  exportClusterParametersSerializer,
  forceUnlinkParametersSerializer,
  forceLinkParametersSerializer,
  flushParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabasesUpgradeDBRedisVersionOptionalParams,
  DatabasesFlushOptionalParams,
  DatabasesForceLinkToReplicationGroupOptionalParams,
  DatabasesForceUnlinkOptionalParams,
  DatabasesExportOptionalParams,
  DatabasesImportOptionalParams,
  DatabasesRegenerateKeyOptionalParams,
  DatabasesListKeysOptionalParams,
  DatabasesListByClusterOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesUpdateOptionalParams,
  DatabasesCreateOptionalParams,
  DatabasesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _upgradeDBRedisVersionSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesUpgradeDBRedisVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/upgradeDBRedisVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _upgradeDBRedisVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Upgrades the database Redis version to the latest available. */
export function upgradeDBRedisVersion(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesUpgradeDBRedisVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _upgradeDBRedisVersionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeDBRedisVersionSend(context, resourceGroupName, clusterName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _flushSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesFlushOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/flush{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["parameters"]
      ? options["parameters"]
      : flushParametersSerializer(options["parameters"]),
  });
}

export async function _flushDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Flushes all the keys in this database and also from its linked databases. */
export function flush(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesFlushOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _flushDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _flushSend(context, resourceGroupName, clusterName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _forceLinkToReplicationGroupSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ForceLinkParameters,
  options: DatabasesForceLinkToReplicationGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/forceLinkToReplicationGroup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: forceLinkParametersSerializer(parameters),
  });
}

export async function _forceLinkToReplicationGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group. */
export function forceLinkToReplicationGroup(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ForceLinkParameters,
  options: DatabasesForceLinkToReplicationGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _forceLinkToReplicationGroupDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _forceLinkToReplicationGroupSend(
          context,
          resourceGroupName,
          clusterName,
          databaseName,
          parameters,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2025-08-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _forceUnlinkSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ForceUnlinkParameters,
  options: DatabasesForceUnlinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/forceUnlink{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: forceUnlinkParametersSerializer(parameters),
  });
}

export async function _forceUnlinkDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Forcibly removes the link to the specified database resource. */
export function forceUnlink(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ForceUnlinkParameters,
  options: DatabasesForceUnlinkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _forceUnlinkDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _forceUnlinkSend(context, resourceGroupName, clusterName, databaseName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$exportSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ExportClusterParameters,
  options: DatabasesExportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/export{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: exportClusterParametersSerializer(parameters),
  });
}

export async function _$exportDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Exports a database file from target database. */
/**
 *  @fixme export is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $export(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ExportClusterParameters,
  options: DatabasesExportOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$exportDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$exportSend(context, resourceGroupName, clusterName, databaseName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$importSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ImportClusterParameters,
  options: DatabasesImportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/import{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: importClusterParametersSerializer(parameters),
  });
}

export async function _$importDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Imports database files to target database. */
/**
 *  @fixme import is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $import(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: ImportClusterParameters,
  options: DatabasesImportOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$importDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$importSend(context, resourceGroupName, clusterName, databaseName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: RegenerateKeyParameters,
  options: DatabasesRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: regenerateKeyParametersSerializer(parameters),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessKeys> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessKeysDeserializer(result.body);
}

/** Regenerates the Redis Enterprise database's access keys. */
export function regenerateKey(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: RegenerateKeyParameters,
  options: DatabasesRegenerateKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AccessKeys>, AccessKeys> {
  return getLongRunningPoller(context, _regenerateKeyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _regenerateKeySend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<AccessKeys>, AccessKeys>;
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

export async function _listKeysDeserialize(result: PathUncheckedResponse): Promise<AccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessKeysDeserializer(result.body);
}

/** Retrieves the access keys for the Redis Enterprise database. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesListKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: DatabasesListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseListDeserializer(result.body);
}

/** Gets all databases in the specified Redis Enterprise cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: DatabasesListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Database> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-08-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a single database */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, databaseName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseUpdate,
  options: DatabasesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Database> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseDeserializer(result.body);
}

/** Updates a database */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseUpdate,
  options: DatabasesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Database>, Database> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, databaseName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<Database>, Database>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: Database,
  options: DatabasesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Database> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseDeserializer(result.body);
}

/** Creates a database */
export function create(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: Database,
  options: DatabasesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Database>, Database> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, clusterName, databaseName, parameters, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<Database>, Database>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Database> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseDeserializer(result.body);
}

/** Gets information about a database in a Redis Enterprise cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesGetOptionalParams = { requestOptions: {} },
): Promise<Database> {
  const result = await _getSend(context, resourceGroupName, clusterName, databaseName, options);
  return _getDeserialize(result);
}
