// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext as Client } from "../index.js";
import type {
  DatabaseMigrationCosmosDbMongo,
  _DatabaseMigrationCosmosDbMongoListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseMigrationCosmosDbMongoSerializer,
  databaseMigrationCosmosDbMongoDeserializer,
  _databaseMigrationCosmosDbMongoListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams,
  DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
  DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
  DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listForScopeSend(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetResourceName: targetResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseMigrationCosmosDbMongoListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _databaseMigrationCosmosDbMongoListResultDeserializer(result.body);
}

/** Get Database Migration resources for the scope. */
export function listForScope(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DatabaseMigrationCosmosDbMongo> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, resourceGroupName, targetResourceName, options),
    _listForScopeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  migrationName: string,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}{?api%2Dversion,force}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetResourceName: targetResourceName,
      migrationName: migrationName,
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

/** Delete Database Migration resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  migrationName: string,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, targetResourceName, migrationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  migrationName: string,
  parameters: DatabaseMigrationCosmosDbMongo,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetResourceName: targetResourceName,
      migrationName: migrationName,
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
    body: databaseMigrationCosmosDbMongoSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseMigrationCosmosDbMongo> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationCosmosDbMongoDeserializer(result.body);
}

/** Create or Update Database Migration resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  migrationName: string,
  parameters: DatabaseMigrationCosmosDbMongo,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseMigrationCosmosDbMongo>, DatabaseMigrationCosmosDbMongo> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        targetResourceName,
        migrationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<DatabaseMigrationCosmosDbMongo>, DatabaseMigrationCosmosDbMongo>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  migrationName: string,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetResourceName: targetResourceName,
      migrationName: migrationName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
): Promise<DatabaseMigrationCosmosDbMongo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationCosmosDbMongoDeserializer(result.body);
}

/** Get Database Migration resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  targetResourceName: string,
  migrationName: string,
  options: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseMigrationCosmosDbMongo> {
  const result = await _getSend(
    context,
    resourceGroupName,
    targetResourceName,
    migrationName,
    options,
  );
  return _getDeserialize(result);
}
