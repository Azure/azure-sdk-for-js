// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { ElasticBackup, _ElasticBackupListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  elasticBackupSerializer,
  elasticBackupDeserializer,
  _elasticBackupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ElasticBackupsListByVaultOptionalParams,
  ElasticBackupsDeleteOptionalParams,
  ElasticBackupsUpdateOptionalParams,
  ElasticBackupsCreateOrUpdateOptionalParams,
  ElasticBackupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVaultSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  options: ElasticBackupsListByVaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupVaultName: backupVaultName,
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

export async function _listByVaultDeserialize(
  result: PathUncheckedResponse,
): Promise<_ElasticBackupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _elasticBackupListResultDeserializer(result.body);
}

/** List all elastic backups Under an elastic Backup Vault */
export function listByVault(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  options: ElasticBackupsListByVaultOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ElasticBackup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVaultSend(context, resourceGroupName, accountName, backupVaultName, options),
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
  options: ElasticBackupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups/{backupName}{?api%2Dversion}",
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
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a ElasticBackup */
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
  options: ElasticBackupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, backupVaultName, backupName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: ElasticBackup,
  options: ElasticBackupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups/{backupName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: elasticBackupSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ElasticBackup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticBackupDeserializer(result.body);
}

/** Patch an elastic Backup under the Elastic Backup Vault */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: ElasticBackup,
  options: ElasticBackupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ElasticBackup>, ElasticBackup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        backupName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ElasticBackup>, ElasticBackup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: ElasticBackup,
  options: ElasticBackupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups/{backupName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: elasticBackupSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticBackup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticBackupDeserializer(result.body);
}

/** Create an elastic backup under the elastic Backup Vault */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  body: ElasticBackup,
  options: ElasticBackupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ElasticBackup>, ElasticBackup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        backupVaultName,
        backupName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ElasticBackup>, ElasticBackup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: ElasticBackupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups/{backupName}{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ElasticBackup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticBackupDeserializer(result.body);
}

/** Get the specified Elastic Backup under Elastic Backup Vault. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupVaultName: string,
  backupName: string,
  options: ElasticBackupsGetOptionalParams = { requestOptions: {} },
): Promise<ElasticBackup> {
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
