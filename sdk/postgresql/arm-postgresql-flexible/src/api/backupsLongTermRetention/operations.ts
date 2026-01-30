// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  LtrPreBackupRequest,
  LtrPreBackupResponse,
  BackupsLongTermRetentionRequest,
  BackupsLongTermRetentionResponse,
  BackupsLongTermRetentionOperation,
  _LtrServerBackupOperationList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  ltrPreBackupRequestSerializer,
  ltrPreBackupResponseDeserializer,
  backupsLongTermRetentionRequestSerializer,
  backupsLongTermRetentionResponseDeserializer,
  backupsLongTermRetentionOperationDeserializer,
  _ltrServerBackupOperationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupsLongTermRetentionListByServerOptionalParams,
  BackupsLongTermRetentionGetOptionalParams,
  BackupsLongTermRetentionStartOptionalParams,
  BackupsLongTermRetentionCheckPrerequisitesOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: BackupsLongTermRetentionListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/ltrBackupOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
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
): Promise<_LtrServerBackupOperationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _ltrServerBackupOperationListDeserializer(result.body);
}

/** Lists the results of the long term retention backup operations for a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: BackupsLongTermRetentionListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupsLongTermRetentionOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  backupName: string,
  options: BackupsLongTermRetentionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/ltrBackupOperations/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion,
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
): Promise<BackupsLongTermRetentionOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupsLongTermRetentionOperationDeserializer(result.body);
}

/** Gets the results of a long retention backup operation for a server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  backupName: string,
  options: BackupsLongTermRetentionGetOptionalParams = { requestOptions: {} },
): Promise<BackupsLongTermRetentionOperation> {
  const result = await _getSend(context, resourceGroupName, serverName, backupName, options);
  return _getDeserialize(result);
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: BackupsLongTermRetentionRequest,
  options: BackupsLongTermRetentionStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/startLtrBackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupsLongTermRetentionRequestSerializer(parameters),
  });
}

export async function _startDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupsLongTermRetentionResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupsLongTermRetentionResponseDeserializer(result.body);
}

/** Initiates a long term retention backup. */
export function start(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: BackupsLongTermRetentionRequest,
  options: BackupsLongTermRetentionStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupsLongTermRetentionResponse>, BackupsLongTermRetentionResponse> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<BackupsLongTermRetentionResponse>,
    BackupsLongTermRetentionResponse
  >;
}

export function _checkPrerequisitesSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: LtrPreBackupRequest,
  options: BackupsLongTermRetentionCheckPrerequisitesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/ltrPreBackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: ltrPreBackupRequestSerializer(parameters),
  });
}

export async function _checkPrerequisitesDeserialize(
  result: PathUncheckedResponse,
): Promise<LtrPreBackupResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ltrPreBackupResponseDeserializer(result.body);
}

/** Performs all checks required for a long term retention backup operation to succeed. */
export async function checkPrerequisites(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: LtrPreBackupRequest,
  options: BackupsLongTermRetentionCheckPrerequisitesOptionalParams = { requestOptions: {} },
): Promise<LtrPreBackupResponse> {
  const result = await _checkPrerequisitesSend(
    context,
    resourceGroupName,
    serverName,
    parameters,
    options,
  );
  return _checkPrerequisitesDeserialize(result);
}
