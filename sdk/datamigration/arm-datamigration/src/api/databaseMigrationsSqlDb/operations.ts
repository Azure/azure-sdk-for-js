// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext as Client } from "../index.js";
import type { DatabaseMigrationSqlDb, MigrationOperationInput } from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseMigrationSqlDbSerializer,
  databaseMigrationSqlDbDeserializer,
  migrationOperationInputSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseMigrationsSqlDbRetryOptionalParams,
  DatabaseMigrationsSqlDbCancelOptionalParams,
  DatabaseMigrationsSqlDbDeleteOptionalParams,
  DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
  DatabaseMigrationsSqlDbGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _retrySend(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  migrationOperationInput: MigrationOperationInput,
  options: DatabaseMigrationsSqlDbRetryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/retry{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlDbInstanceName: sqlDbInstanceName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrationOperationInputSerializer(migrationOperationInput),
  });
}

export async function _retryDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseMigrationSqlDb> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationSqlDbDeserializer(result.body);
}

/** Retry on going migration for the database. */
export function retry(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  migrationOperationInput: MigrationOperationInput,
  options: DatabaseMigrationsSqlDbRetryOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb> {
  return getLongRunningPoller(context, _retryDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _retrySend(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        migrationOperationInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb>;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  parameters: MigrationOperationInput,
  options: DatabaseMigrationsSqlDbCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlDbInstanceName: sqlDbInstanceName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: migrationOperationInputSerializer(parameters),
  });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Stop on going migration for the database. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  parameters: MigrationOperationInput,
  options: DatabaseMigrationsSqlDbCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelSend(context, resourceGroupName, sqlDbInstanceName, targetDbName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlDbDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}{?api%2Dversion,force}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlDbInstanceName: sqlDbInstanceName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      force: options?.force,
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete Database Migration resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlDbDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sqlDbInstanceName, targetDbName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  parameters: DatabaseMigrationSqlDb,
  options: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlDbInstanceName: sqlDbInstanceName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseMigrationSqlDbSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseMigrationSqlDb> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationSqlDbDeserializer(result.body);
}

/** Create or Update Database Migration resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  parameters: DatabaseMigrationSqlDb,
  options: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlDbGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}{?api%2Dversion,migrationOperationId,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlDbInstanceName: sqlDbInstanceName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      migrationOperationId: options?.migrationOperationId,
      "%24expand": options?.expand,
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
): Promise<DatabaseMigrationSqlDb> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationSqlDbDeserializer(result.body);
}

/** Retrieve the Database Migration resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlDbInstanceName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlDbGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseMigrationSqlDb> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sqlDbInstanceName,
    targetDbName,
    options,
  );
  return _getDeserialize(result);
}
