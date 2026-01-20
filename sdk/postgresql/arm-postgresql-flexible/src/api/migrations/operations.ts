// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  Migration,
  MigrationResourceForPatch,
  _MigrationList,
  MigrationNameAvailability,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  migrationSerializer,
  migrationDeserializer,
  migrationResourceForPatchSerializer,
  _migrationListDeserializer,
  migrationNameAvailabilitySerializer,
  migrationNameAvailabilityDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MigrationsCheckNameAvailabilityOptionalParams,
  MigrationsListByTargetServerOptionalParams,
  MigrationsCancelOptionalParams,
  MigrationsUpdateOptionalParams,
  MigrationsCreateOptionalParams,
  MigrationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: MigrationNameAvailability,
  options: MigrationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/checkMigrationNameAvailability{?api%2Dversion}",
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
    body: migrationNameAvailabilitySerializer(parameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationNameAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return migrationNameAvailabilityDeserializer(result.body);
}

/** Checks if a proposed migration name is valid and available. */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: MigrationNameAvailability,
  options: MigrationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<MigrationNameAvailability> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    serverName,
    parameters,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listByTargetServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MigrationsListByTargetServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations{?api%2Dversion,migrationListFilter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
      migrationListFilter: options?.migrationListFilter,
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

export async function _listByTargetServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_MigrationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _migrationListDeserializer(result.body);
}

/** Lists all migrations of a target flexible server. */
export function listByTargetServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: MigrationsListByTargetServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Migration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTargetServerSend(context, resourceGroupName, serverName, options),
    _listByTargetServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  options: MigrationsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      migrationName: migrationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<Migration> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return migrationDeserializer(result.body);
}

/** Cancels an active migration. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  options: MigrationsCancelOptionalParams = { requestOptions: {} },
): Promise<Migration> {
  const result = await _cancelSend(context, resourceGroupName, serverName, migrationName, options);
  return _cancelDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  parameters: MigrationResourceForPatch,
  options: MigrationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      migrationName: migrationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrationResourceForPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Migration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return migrationDeserializer(result.body);
}

/** Updates an existing migration. The request body can contain one to many of the mutable properties present in the migration definition. Certain property updates initiate migration state transitions. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  parameters: MigrationResourceForPatch,
  options: MigrationsUpdateOptionalParams = { requestOptions: {} },
): Promise<Migration> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  parameters: Migration,
  options: MigrationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      migrationName: migrationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrationSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Migration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return migrationDeserializer(result.body);
}

/** Creates a new migration. */
export async function create(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  parameters: Migration,
  options: MigrationsCreateOptionalParams = { requestOptions: {} },
): Promise<Migration> {
  const result = await _createSend(
    context,
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  options: MigrationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      migrationName: migrationName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Migration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return migrationDeserializer(result.body);
}

/** Gets information about a migration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  migrationName: string,
  options: MigrationsGetOptionalParams = { requestOptions: {} },
): Promise<Migration> {
  const result = await _getSend(context, resourceGroupName, serverName, migrationName, options);
  return _getDeserialize(result);
}
