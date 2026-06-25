// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MigrationOperationInput,
  migrationOperationInputSerializer,
  DatabaseMigrationSqlVm,
  databaseMigrationSqlVmSerializer,
  databaseMigrationSqlVmDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DatabaseMigrationsSqlVmCutoverOptionalParams,
  DatabaseMigrationsSqlVmCancelOptionalParams,
  DatabaseMigrationsSqlVmDeleteOptionalParams,
  DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
  DatabaseMigrationsSqlVmGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _cutoverSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  parameters: MigrationOperationInput,
  options: DatabaseMigrationsSqlVmCutoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cutover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineName: sqlVirtualMachineName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: migrationOperationInputSerializer(parameters),
    });
}

export async function _cutoverDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Initiate cutover for in-progress online database migration to SQL VM. */
export function cutover(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  parameters: MigrationOperationInput,
  options: DatabaseMigrationsSqlVmCutoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cutoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cutoverSend(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  parameters: MigrationOperationInput,
  options: DatabaseMigrationsSqlVmCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineName: sqlVirtualMachineName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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

/** Stop in-progress database migration to SQL VM. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  parameters: MigrationOperationInput,
  options: DatabaseMigrationsSqlVmCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelSend(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlVmDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}{?api%2Dversion,force}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineName: sqlVirtualMachineName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      force: options?.force,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseMigrationSqlVm> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationSqlVmDeserializer(result.body);
}

/** Delete Database Migration resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlVmDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sqlVirtualMachineName, targetDbName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  parameters: DatabaseMigrationSqlVm,
  options: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineName: sqlVirtualMachineName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: databaseMigrationSqlVmSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseMigrationSqlVm> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationSqlVmDeserializer(result.body);
}

/** Create a new database migration to a given SQL VM. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  parameters: DatabaseMigrationSqlVm,
  options: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlVmGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}{?api%2Dversion,migrationOperationId,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineName: sqlVirtualMachineName,
      targetDbName: targetDbName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      migrationOperationId: options?.migrationOperationId,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseMigrationSqlVm> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseMigrationSqlVmDeserializer(result.body);
}

/** Retrieve the specified database migration for a given SQL VM. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  targetDbName: string,
  options: DatabaseMigrationsSqlVmGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseMigrationSqlVm> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sqlVirtualMachineName,
    targetDbName,
    options,
  );
  return _getDeserialize(result);
}
