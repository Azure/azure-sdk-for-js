// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext as Client } from "../index.js";
import type {
  MigrationService,
  MigrationServiceUpdate,
  _MigrationServiceListResult,
  _DatabaseMigrationBaseListResult,
  DatabaseMigrationBase,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  migrationServiceSerializer,
  migrationServiceDeserializer,
  migrationServiceUpdateSerializer,
  _migrationServiceListResultDeserializer,
  _databaseMigrationBaseListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MigrationServicesListMigrationsOptionalParams,
  MigrationServicesListBySubscriptionOptionalParams,
  MigrationServicesListByResourceGroupOptionalParams,
  MigrationServicesDeleteOptionalParams,
  MigrationServicesUpdateOptionalParams,
  MigrationServicesCreateOrUpdateOptionalParams,
  MigrationServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listMigrationsSend(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  options: MigrationServicesListMigrationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}/listMigrations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      migrationServiceName: migrationServiceName,
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

export async function _listMigrationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseMigrationBaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _databaseMigrationBaseListResultDeserializer(result.body);
}

/** Retrieve the List of database migrations attached to the service. */
export function listMigrations(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  options: MigrationServicesListMigrationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseMigrationBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listMigrationsSend(context, resourceGroupName, migrationServiceName, options),
    _listMigrationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: MigrationServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/migrationServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_MigrationServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _migrationServiceListResultDeserializer(result.body);
}

/** Retrieve all migration services in the subscriptions. */
export function listBySubscription(
  context: Client,
  options: MigrationServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MigrationService> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MigrationServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MigrationServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _migrationServiceListResultDeserializer(result.body);
}

/** Retrieve all migration services in the resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MigrationServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MigrationService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
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
  migrationServiceName: string,
  options: MigrationServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      migrationServiceName: migrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

/** Delete Database Migration Service. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  options: MigrationServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, migrationServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  parameters: MigrationServiceUpdate,
  options: MigrationServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      migrationServiceName: migrationServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrationServiceUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MigrationService> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return migrationServiceDeserializer(result.body);
}

/** Update Database Migration Service. */
export function update(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  parameters: MigrationServiceUpdate,
  options: MigrationServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationService>, MigrationService> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, migrationServiceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<MigrationService>, MigrationService>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  parameters: MigrationService,
  options: MigrationServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      migrationServiceName: migrationServiceName,
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
    body: migrationServiceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return migrationServiceDeserializer(result.body);
}

/** Create or Update Database Migration Service. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  parameters: MigrationService,
  options: MigrationServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrationService>, MigrationService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, migrationServiceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<MigrationService>, MigrationService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  options: MigrationServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      migrationServiceName: migrationServiceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MigrationService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return migrationServiceDeserializer(result.body);
}

/** Retrieve the Database Migration Service */
export async function get(
  context: Client,
  resourceGroupName: string,
  migrationServiceName: string,
  options: MigrationServicesGetOptionalParams = { requestOptions: {} },
): Promise<MigrationService> {
  const result = await _getSend(context, resourceGroupName, migrationServiceName, options);
  return _getDeserialize(result);
}
