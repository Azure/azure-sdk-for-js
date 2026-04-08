// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  ManagedInstanceLongTermRetentionBackup,
  _ManagedInstanceLongTermRetentionBackupListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedInstanceLongTermRetentionBackupDeserializer,
  _managedInstanceLongTermRetentionBackupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams,
  LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
  LongTermRetentionManagedInstanceBackupsGetOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams,
  LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
  LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupInstanceSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  managedInstanceName: string,
  options: LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionManagedInstanceBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
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

export async function _listByResourceGroupInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceLongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceLongTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for a given managed instance. */
export function listByResourceGroupInstance(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  managedInstanceName: string,
  options: LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceGroupInstanceSend(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        options,
      ),
    _listByResourceGroupInstanceDeserialize,
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
  options: LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstanceBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState,%24skip,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
      "%24skip": options?.skip,
      "%24top": options?.top,
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

export async function _listByResourceGroupLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceLongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceLongTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for managed databases in a given location. */
export function listByResourceGroupLocation(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  options: LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup> {
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

export function _listByInstanceSend(
  context: Client,
  locationName: string,
  managedInstanceName: string,
  options: LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionManagedInstanceBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
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

export async function _listByInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceLongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceLongTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for a given managed instance. */
export function listByInstance(
  context: Client,
  locationName: string,
  managedInstanceName: string,
  options: LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstanceSend(context, locationName, managedInstanceName, options),
    _listByInstanceDeserialize,
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
  options: LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstanceBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState,%24skip,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
      databaseState: options?.databaseState,
      "%24skip": options?.skip,
      "%24top": options?.top,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceLongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceLongTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists the long term retention backups for managed databases in a given location. */
export function listByLocation(
  context: Client,
  locationName: string,
  options: LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup> {
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

export function _listByDatabaseSend(
  context: Client,
  locationName: string,
  managedInstanceName: string,
  databaseName: string,
  options: LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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
): Promise<_ManagedInstanceLongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceLongTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists all long term retention backups for a managed database. */
export function listByDatabase(
  context: Client,
  locationName: string,
  managedInstanceName: string,
  databaseName: string,
  options: LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseSend(context, locationName, managedInstanceName, databaseName, options),
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
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, locationName, managedInstanceName, databaseName, backupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  locationName: string,
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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
): Promise<ManagedInstanceLongTermRetentionBackup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceLongTermRetentionBackupDeserializer(result.body);
}

/** Gets a long term retention backup for a managed database. */
export async function get(
  context: Client,
  locationName: string,
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedInstanceLongTermRetentionBackup> {
  const result = await _getSend(
    context,
    locationName,
    managedInstanceName,
    databaseName,
    backupName,
    options,
  );
  return _getDeserialize(result);
}

export function _listByResourceGroupDatabaseSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  managedInstanceName: string,
  databaseName: string,
  options: LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups{?api%2Dversion,onlyLatestPerDatabase,databaseState}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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
): Promise<_ManagedInstanceLongTermRetentionBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceLongTermRetentionBackupListResultDeserializer(result.body);
}

/** Lists all long term retention backups for a managed database. */
export function listByResourceGroupDatabase(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  managedInstanceName: string,
  databaseName: string,
  options: LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionBackup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceGroupDatabaseSend(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        databaseName,
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
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteByResourceGroupDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteByResourceGroupSend(
        context,
        resourceGroupName,
        locationName,
        managedInstanceName,
        databaseName,
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
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
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
): Promise<ManagedInstanceLongTermRetentionBackup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceLongTermRetentionBackupDeserializer(result.body);
}

/** Gets a long term retention backup for a managed database. */
export async function getByResourceGroup(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  managedInstanceName: string,
  databaseName: string,
  backupName: string,
  options: LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedInstanceLongTermRetentionBackup> {
  const result = await _getByResourceGroupSend(
    context,
    resourceGroupName,
    locationName,
    managedInstanceName,
    databaseName,
    backupName,
    options,
  );
  return _getByResourceGroupDeserialize(result);
}
