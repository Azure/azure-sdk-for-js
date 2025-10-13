// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { ServerBackupV2, _ServerBackupV2ListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverBackupV2Deserializer,
  _serverBackupV2ListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LongRunningBackupsListOptionalParams,
  LongRunningBackupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: LongRunningBackupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupsV2{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServerBackupV2ListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _serverBackupV2ListResultDeserializer(result.body);
}

/** List all the backups for a given server. */
export function list(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: LongRunningBackupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerBackupV2> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serverName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  backupName: string,
  options: LongRunningBackupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupsV2/{backupName}{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServerBackupV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serverBackupV2Deserializer(result.body);
}

/** Get backup for a given server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  backupName: string,
  options: LongRunningBackupsGetOptionalParams = { requestOptions: {} },
): Promise<ServerBackupV2> {
  const result = await _getSend(context, resourceGroupName, serverName, backupName, options);
  return _getDeserialize(result);
}
