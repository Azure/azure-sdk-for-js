// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  BackupAndExportRequest,
  BackupAndExportResponse,
  ValidateBackupResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupAndExportRequestSerializer,
  backupAndExportResponseDeserializer,
  validateBackupResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupAndExportValidateBackupOptionalParams,
  BackupAndExportCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateBackupSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: BackupAndExportValidateBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/validateBackup{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _validateBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateBackupResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validateBackupResponseDeserializer(result.body);
}

/** Validates if backup can be performed for given server. */
export async function validateBackup(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: BackupAndExportValidateBackupOptionalParams = { requestOptions: {} },
): Promise<ValidateBackupResponse> {
  const result = await _validateBackupSend(context, resourceGroupName, serverName, options);
  return _validateBackupDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: BackupAndExportRequest,
  options: BackupAndExportCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupAndExport{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: backupAndExportRequestSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupAndExportResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupAndExportResponseDeserializer(result.body);
}

/** Exports the backup of the given server by creating a backup if not existing. */
export function create(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: BackupAndExportRequest,
  options: BackupAndExportCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupAndExportResponse>, BackupAndExportResponse> {
  return getLongRunningPoller(context, _createDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<BackupAndExportResponse>, BackupAndExportResponse>;
}
