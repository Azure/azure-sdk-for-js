// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Backup,
  backupSerializer,
  backupDeserializer,
  backupPatchSerializer,
  _BackupsList,
  _backupsListDeserializer,
  BackupStatus,
  backupStatusDeserializer,
  RestoreStatus,
  restoreStatusDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BackupsGetVolumeLatestRestoreStatusOptionalParams,
  BackupsGetLatestStatusOptionalParams,
  BackupsListByVaultOptionalParams,
  BackupsDeleteOptionalParams,
  BackupsUpdateOptionalParams,
  BackupsCreateOptionalParams,
  BackupsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getVolumeLatestRestoreStatusSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: BackupsGetVolumeLatestRestoreStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/latestRestoreStatus/current{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getVolumeLatestRestoreStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return restoreStatusDeserializer(result.body);
}

/** Get the latest status of the restore for a volume */
export async function getVolumeLatestRestoreStatus(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: BackupsGetVolumeLatestRestoreStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<RestoreStatus> {
  const result = await _getVolumeLatestRestoreStatusSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    options,
  );
  return _getVolumeLatestRestoreStatusDeserialize(result);
}

export function _getLatestStatusSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: BackupsGetLatestStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/latestBackupStatus/current{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getLatestStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupStatusDeserializer(result.body);
}

/** Get the latest status of the backup for a volume */
export async function getLatestStatus(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: BackupsGetLatestStatusOptionalParams = { requestOptions: {} },
): Promise<BackupStatus> {
  const result = await _getLatestStatusSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    options,
  );
  return _getLatestStatusDeserialize(result);
}

export function _listByVaultSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  options: BackupsListByVaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupVaultName: backupVaultName,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listByVaultDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _backupsListDeserializer(result.body);
}

/** List all backups Under a Backup Vault */
export function listByVault(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  options: BackupsListByVaultOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Backup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVaultSend(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        options,
      ),
    _listByVaultDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: BackupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupVaultName: backupVaultName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Backup under the Backup Vault */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: BackupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _$deleteDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _$deleteSend(
          context,
          resourceGroupName,
          accountName,
          backupVaultName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: BackupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupVaultName: backupVaultName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options["body"]
        ? options["body"]
        : backupPatchSerializer(options["body"]),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<Backup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupDeserializer(result.body);
}

/** Patch a Backup under the Backup Vault */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: BackupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Backup>, Backup> {
  return getLongRunningPoller(
    context,
    _updateDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateSend(
          context,
          resourceGroupName,
          accountName,
          backupVaultName,
          backupName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<Backup>, Backup>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: Backup,
  options: BackupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupVaultName: backupVaultName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: backupSerializer(body),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<Backup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupDeserializer(result.body);
}

/** Create a backup under the Backup Vault */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: Backup,
  options: BackupsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Backup>, Backup> {
  return getLongRunningPoller(
    context,
    _createDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createSend(
          context,
          resourceGroupName,
          accountName,
          backupVaultName,
          backupName,
          body,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<Backup>, Backup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: BackupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupVaultName: backupVaultName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<Backup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupDeserializer(result.body);
}

/** Get the specified Backup under Backup Vault. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: BackupsGetOptionalParams = { requestOptions: {} },
): Promise<Backup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    backupVaultName,
    backupName,
    options,
  );
  return _getDeserialize(result);
}
