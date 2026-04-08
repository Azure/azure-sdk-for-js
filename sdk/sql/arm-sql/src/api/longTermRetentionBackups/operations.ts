// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  LongTermRetentionBackup,
  _LongTermRetentionBackupListResult,
  ChangeLongTermRetentionBackupAccessTierParameters,
  CopyLongTermRetentionBackupParameters,
  LongTermRetentionBackupOperationResult,
  UpdateLongTermRetentionBackupParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  longTermRetentionBackupDeserializer,
  _longTermRetentionBackupListResultDeserializer,
  changeLongTermRetentionBackupAccessTierParametersSerializer,
  copyLongTermRetentionBackupParametersSerializer,
  longTermRetentionBackupOperationResultDeserializer,
  updateLongTermRetentionBackupParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LongTermRetentionBackupsListByResourceGroupServerOptionalParams,
  LongTermRetentionBackupsListByResourceGroupLocationOptionalParams,
  LongTermRetentionBackupsListByServerOptionalParams,
  LongTermRetentionBackupsListByLocationOptionalParams,
  LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
  LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
  LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
  LongTermRetentionBackupsListByResourceGroupDatabaseOptionalParams,
  LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
  LongTermRetentionBackupsGetByResourceGroupOptionalParams,
  LongTermRetentionBackupsUpdateOptionalParams,
  LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
  LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
  LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
  LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
  LongTermRetentionBackupsCopyOptionalParams,
  LongTermRetentionBackupsChangeAccessTierOptionalParams,
  LongTermRetentionBackupsListByDatabaseOptionalParams,
  LongTermRetentionBackupsDeleteOptionalParams,
  LongTermRetentionBackupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupServerSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  options: LongTermRetentionBackupsListByResourceGroupServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
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

export async function _listByResourceGroupServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_LongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _longTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for a given server based on resource groups. */
export function listByResourceGroupServer(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  options: LongTermRetentionBackupsListByResourceGroupServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceGroupServerSend(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        options,
      ),
    _listByResourceGroupServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listByResourceGroupLocationSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  options: LongTermRetentionBackupsListByResourceGroupLocationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
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

export async function _listByResourceGroupLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_LongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _longTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for a given location based on resource group. */
export function listByResourceGroupLocation(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  options: LongTermRetentionBackupsListByResourceGroupLocationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupLocationSend(context, resourceGroupName, locationName, options),
    _listByResourceGroupLocationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listByServerSend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  options: LongTermRetentionBackupsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_LongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _longTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for a given server. */
export function listByServer(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  options: LongTermRetentionBackupsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, locationName, longTermRetentionServerName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listByLocationSend(
  context: Client,
  locationName: string,
  options: LongTermRetentionBackupsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_LongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _longTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for a given location. */
export function listByLocation(
  context: Client,
  locationName: string,
  options: LongTermRetentionBackupsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, locationName, options),
    _listByLocationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _updateByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: UpdateLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/update{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateLongTermRetentionBackupParametersSerializer(parameters),
  });
}

export async function _updateByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackupOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupOperationResultDeserializer(result.body);
}

/** Updates an existing long term retention backup. */
export function updateByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: UpdateLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LongTermRetentionBackupOperationResult>,
  LongTermRetentionBackupOperationResult
> {
  return getLongRunningPoller(context, _updateByResourceGroupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateByResourceGroupSend(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
}

export function _setLegalHoldImmutabilityByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/setLegalHoldImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _setLegalHoldImmutabilityByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Set legal hold immutability of an existing long term retention backup. */
export function setLegalHoldImmutabilityByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _setLegalHoldImmutabilityByResourceGroupDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _setLegalHoldImmutabilityByResourceGroupSend(
          context,
          resourceGroupName,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _removeTimeBasedImmutabilityByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeTimeBasedImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _removeTimeBasedImmutabilityByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Remove time based immutability of an existing long term retention backup. */
export function removeTimeBasedImmutabilityByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _removeTimeBasedImmutabilityByResourceGroupDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _removeTimeBasedImmutabilityByResourceGroupSend(
          context,
          resourceGroupName,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _removeLegalHoldImmutabilityByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeLegalHoldImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _removeLegalHoldImmutabilityByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Remove legal hold immutability of an existing long term retention backup. */
export function removeLegalHoldImmutabilityByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _removeLegalHoldImmutabilityByResourceGroupDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _removeLegalHoldImmutabilityByResourceGroupSend(
          context,
          resourceGroupName,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _lockTimeBasedImmutabilityByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/lockTimeBasedImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _lockTimeBasedImmutabilityByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Lock time based immutability of an existing long term retention backup. */
export function lockTimeBasedImmutabilityByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _lockTimeBasedImmutabilityByResourceGroupDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _lockTimeBasedImmutabilityByResourceGroupSend(
          context,
          resourceGroupName,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _copyByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: CopyLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsCopyByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/copy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: copyLongTermRetentionBackupParametersSerializer(parameters),
  });
}

export async function _copyByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackupOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupOperationResultDeserializer(result.body);
}

/** Copy an existing long term retention backup to a different server. */
export function copyByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: CopyLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsCopyByResourceGroupOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LongTermRetentionBackupOperationResult>,
  LongTermRetentionBackupOperationResult
> {
  return getLongRunningPoller(context, _copyByResourceGroupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _copyByResourceGroupSend(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
}

export function _changeAccessTierByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: ChangeLongTermRetentionBackupAccessTierParameters,
  options: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/changeAccessTier{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: changeLongTermRetentionBackupAccessTierParametersSerializer(parameters),
  });
}

export async function _changeAccessTierByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Change a long term retention backup access tier. */
export function changeAccessTierByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: ChangeLongTermRetentionBackupAccessTierParameters,
  options: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _changeAccessTierByResourceGroupDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _changeAccessTierByResourceGroupSend(
          context,
          resourceGroupName,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _listByResourceGroupDatabaseSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  options: LongTermRetentionBackupsListByResourceGroupDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
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

export async function _listByResourceGroupDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_LongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _longTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists all long term retention backups for a database based on a particular resource group. */
export function listByResourceGroupDatabase(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  options: LongTermRetentionBackupsListByResourceGroupDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceGroupDatabaseSend(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        options,
      ),
    _listByResourceGroupDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _deleteByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a long term retention backup. */
export function deleteByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteByResourceGroupDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteByResourceGroupSend(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsGetByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Gets a long term retention backup. */
export async function getByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsGetByResourceGroupOptionalParams = { requestOptions: {} },
): Promise<LongTermRetentionBackup> {
  const result = await _getByResourceGroupSend(
    context,
    resourceGroupName,
    locationName,
    longTermRetentionServerName,
    longTermRetentionDatabaseName,
    backupName,
    options,
  );
  return _getByResourceGroupDeserialize(result);
}

export function _updateSend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: UpdateLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/update{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateLongTermRetentionBackupParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackupOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupOperationResultDeserializer(result.body);
}

/** Updates an existing long term retention backup. */
export function update(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: UpdateLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LongTermRetentionBackupOperationResult>,
  LongTermRetentionBackupOperationResult
> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
}

export function _setLegalHoldImmutabilitySend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/setLegalHoldImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _setLegalHoldImmutabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Set legal hold immutability of an existing long term retention backup. */
export function setLegalHoldImmutability(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _setLegalHoldImmutabilityDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _setLegalHoldImmutabilitySend(
          context,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _removeTimeBasedImmutabilitySend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeTimeBasedImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _removeTimeBasedImmutabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Remove time based immutability of an existing long term retention backup. */
export function removeTimeBasedImmutability(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _removeTimeBasedImmutabilityDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _removeTimeBasedImmutabilitySend(
          context,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _removeLegalHoldImmutabilitySend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeLegalHoldImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _removeLegalHoldImmutabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Remove legal hold immutability of an existing long term retention backup. */
export function removeLegalHoldImmutability(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _removeLegalHoldImmutabilityDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _removeLegalHoldImmutabilitySend(
          context,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _lockTimeBasedImmutabilitySend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/lockTimeBasedImmutability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _lockTimeBasedImmutabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Lock time based immutability of an existing long term retention backup. */
export function lockTimeBasedImmutability(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(
    context,
    _lockTimeBasedImmutabilityDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _lockTimeBasedImmutabilitySend(
          context,
          locationName,
          longTermRetentionServerName,
          longTermRetentionDatabaseName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _copySend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: CopyLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsCopyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/copy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: copyLongTermRetentionBackupParametersSerializer(parameters),
  });
}

export async function _copyDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackupOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupOperationResultDeserializer(result.body);
}

/** Copy an existing long term retention backup. */
export function copy(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: CopyLongTermRetentionBackupParameters,
  options: LongTermRetentionBackupsCopyOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LongTermRetentionBackupOperationResult>,
  LongTermRetentionBackupOperationResult
> {
  return getLongRunningPoller(context, _copyDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _copySend(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
}

export function _changeAccessTierSend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: ChangeLongTermRetentionBackupAccessTierParameters,
  options: LongTermRetentionBackupsChangeAccessTierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/changeAccessTier{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: changeLongTermRetentionBackupAccessTierParametersSerializer(parameters),
  });
}

export async function _changeAccessTierDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Change a long term retention backup access tier. */
export function changeAccessTier(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  parameters: ChangeLongTermRetentionBackupAccessTierParameters,
  options: LongTermRetentionBackupsChangeAccessTierOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup> {
  return getLongRunningPoller(context, _changeAccessTierDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _changeAccessTierSend(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
}

export function _listByDatabaseSend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  options: LongTermRetentionBackupsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_LongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _longTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists all long term retention backups for a database. */
export function listByDatabase(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  options: LongTermRetentionBackupsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        options,
      ),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a long term retention backup. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      longTermRetentionServerName: longTermRetentionServerName,
      longTermRetentionDatabaseName: longTermRetentionDatabaseName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<LongTermRetentionBackup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return longTermRetentionBackupDeserializer(result.body);
}

/** Gets a long term retention backup. */
export async function get(
  context: Client,
  locationName: string,
  longTermRetentionServerName: string,
  longTermRetentionDatabaseName: string,
  backupName: string,
  options: LongTermRetentionBackupsGetOptionalParams = { requestOptions: {} },
): Promise<LongTermRetentionBackup> {
  const result = await _getSend(
    context,
    locationName,
    longTermRetentionServerName,
    longTermRetentionDatabaseName,
    backupName,
    options,
  );
  return _getDeserialize(result);
}
