// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  _ArcSqlServerAvailabilityGroupListResult,
  SqlServerAvailabilityGroupResource,
  AvailabilityGroupCreateUpdateConfiguration,
  DistributedAvailabilityGroupCreateUpdateConfiguration,
  ManagedInstanceLinkCreateUpdateConfiguration,
  SqlServerAvailabilityGroupUpdate,
  Databases,
  FailoverMiLinkResourceId,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _arcSqlServerAvailabilityGroupListResultDeserializer,
  sqlServerAvailabilityGroupResourceSerializer,
  sqlServerAvailabilityGroupResourceDeserializer,
  availabilityGroupCreateUpdateConfigurationSerializer,
  distributedAvailabilityGroupCreateUpdateConfigurationSerializer,
  managedInstanceLinkCreateUpdateConfigurationSerializer,
  sqlServerAvailabilityGroupUpdateSerializer,
  databasesSerializer,
  failoverMiLinkResourceIdSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams,
  SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams,
  SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams,
  SqlServerAvailabilityGroupsAddDatabasesOptionalParams,
  SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams,
  SqlServerAvailabilityGroupsFailoverOptionalParams,
  SqlServerAvailabilityGroupsDetailViewOptionalParams,
  SqlServerAvailabilityGroupsListOptionalParams,
  SqlServerAvailabilityGroupsDeleteOptionalParams,
  SqlServerAvailabilityGroupsUpdateOptionalParams,
  SqlServerAvailabilityGroupsCreateOptionalParams,
  SqlServerAvailabilityGroupsGetOptionalParams,
  SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams,
  SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams,
  SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _removeDatabasesSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  databases: Databases,
  options: SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/removeDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databasesSerializer(databases),
  });
}

export async function _removeDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Request removing database(s) from an existing availability group. */
export async function removeDatabases(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  databases: Databases,
  options: SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams = { requestOptions: {} },
): Promise<SqlServerAvailabilityGroupResource> {
  const result = await _removeDatabasesSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    availabilityGroupName,
    databases,
    options,
  );
  return _removeDatabasesDeserialize(result);
}

export function _deleteMiLinkSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/deleteMiLink{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteMiLinkDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the MI Link between an Azure Arc-enabled SQL Server and an Azure SQL Managed Instance. */
export function deleteMiLink(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteMiLinkDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteMiLinkSend(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _failoverMiLinkSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  managedInstanceResourceId: FailoverMiLinkResourceId,
  options: SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/failoverMiLink{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: failoverMiLinkResourceIdSerializer(managedInstanceResourceId),
  });
}

export async function _failoverMiLinkDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Request failover of Arc Sql Server to Azure Managed Instance. */
export function failoverMiLink(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  managedInstanceResourceId: FailoverMiLinkResourceId,
  options: SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SqlServerAvailabilityGroupResource>,
  SqlServerAvailabilityGroupResource
> {
  return getLongRunningPoller(context, _failoverMiLinkDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverMiLinkSend(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        managedInstanceResourceId,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
}

export function _addDatabasesSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  databases: Databases,
  options: SqlServerAvailabilityGroupsAddDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/addDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databasesSerializer(databases),
  });
}

export async function _addDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Request adding database(s) to an existing availability group. */
export async function addDatabases(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  databases: Databases,
  options: SqlServerAvailabilityGroupsAddDatabasesOptionalParams = { requestOptions: {} },
): Promise<SqlServerAvailabilityGroupResource> {
  const result = await _addDatabasesSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    availabilityGroupName,
    databases,
    options,
  );
  return _addDatabasesDeserialize(result);
}

export function _forceFailoverAllowDataLossSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/forceFailoverAllowDataLoss{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _forceFailoverAllowDataLossDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Request forced failover of the availability group to this server. */
export async function forceFailoverAllowDataLoss(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams = {
    requestOptions: {},
  },
): Promise<SqlServerAvailabilityGroupResource> {
  const result = await _forceFailoverAllowDataLossSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    availabilityGroupName,
    options,
  );
  return _forceFailoverAllowDataLossDeserialize(result);
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _failoverDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Request manual failover of the availability group to this server. */
export async function failover(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsFailoverOptionalParams = { requestOptions: {} },
): Promise<SqlServerAvailabilityGroupResource> {
  const result = await _failoverSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    availabilityGroupName,
    options,
  );
  return _failoverDeserialize(result);
}

export function _detailViewSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsDetailViewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/getDetailView{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _detailViewDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Retrieves detailed properties of the Availability Group. */
export async function detailView(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsDetailViewOptionalParams = { requestOptions: {} },
): Promise<SqlServerAvailabilityGroupResource> {
  const result = await _detailViewSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    availabilityGroupName,
    options,
  );
  return _detailViewDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerAvailabilityGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ArcSqlServerAvailabilityGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _arcSqlServerAvailabilityGroupListResultDeserializer(result.body);
}

/** List the availability group associated with the given Arc Sql Server. */
export function list(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  options: SqlServerAvailabilityGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlServerAvailabilityGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, sqlServerInstanceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

/** Deletes an Arc Sql Server availability group resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  sqlServerAvailabilityGroupUpdate: SqlServerAvailabilityGroupUpdate,
  options: SqlServerAvailabilityGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerAvailabilityGroupUpdateSerializer(sqlServerAvailabilityGroupUpdate),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Updates an existing Availability Group. */
export function update(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  sqlServerAvailabilityGroupUpdate: SqlServerAvailabilityGroupUpdate,
  options: SqlServerAvailabilityGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SqlServerAvailabilityGroupResource>,
  SqlServerAvailabilityGroupResource
> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        availabilityGroupName,
        sqlServerAvailabilityGroupUpdate,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  sqlServerAvailabilityGroupResource: SqlServerAvailabilityGroupResource,
  options: SqlServerAvailabilityGroupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlServerAvailabilityGroupResourceSerializer(sqlServerAvailabilityGroupResource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Creates or replaces an Arc Sql Server Availability Group. */
export async function create(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  sqlServerAvailabilityGroupResource: SqlServerAvailabilityGroupResource,
  options: SqlServerAvailabilityGroupsCreateOptionalParams = { requestOptions: {} },
): Promise<SqlServerAvailabilityGroupResource> {
  const result = await _createSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    availabilityGroupName,
    sqlServerAvailabilityGroupResource,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      availabilityGroupName: availabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Retrieves an Arc Sql Server availability group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  availabilityGroupName: string,
  options: SqlServerAvailabilityGroupsGetOptionalParams = { requestOptions: {} },
): Promise<SqlServerAvailabilityGroupResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sqlServerInstanceName,
    availabilityGroupName,
    options,
  );
  return _getDeserialize(result);
}

export function _createManagedInstanceLinkSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  createManagedInstanceLinkConfiguration: ManagedInstanceLinkCreateUpdateConfiguration,
  options: SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/createManagedInstanceLink{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedInstanceLinkCreateUpdateConfigurationSerializer(
      createManagedInstanceLinkConfiguration,
    ),
  });
}

export async function _createManagedInstanceLinkDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Create an Managed Instance Link */
export function createManagedInstanceLink(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  createManagedInstanceLinkConfiguration: ManagedInstanceLinkCreateUpdateConfiguration,
  options: SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<SqlServerAvailabilityGroupResource>,
  SqlServerAvailabilityGroupResource
> {
  return getLongRunningPoller(
    context,
    _createManagedInstanceLinkDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createManagedInstanceLinkSend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          createManagedInstanceLinkConfiguration,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
}

export function _createDistributedAvailabilityGroupSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  createDagConfiguration: DistributedAvailabilityGroupCreateUpdateConfiguration,
  options: SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/createDistributedAvailabilityGroup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: distributedAvailabilityGroupCreateUpdateConfigurationSerializer(createDagConfiguration),
  });
}

export async function _createDistributedAvailabilityGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Create a SQL Server distributed availability group */
export function createDistributedAvailabilityGroup(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  createDagConfiguration: DistributedAvailabilityGroupCreateUpdateConfiguration,
  options: SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<SqlServerAvailabilityGroupResource>,
  SqlServerAvailabilityGroupResource
> {
  return getLongRunningPoller(
    context,
    _createDistributedAvailabilityGroupDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createDistributedAvailabilityGroupSend(
          context,
          resourceGroupName,
          sqlServerInstanceName,
          createDagConfiguration,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  ) as PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
}

export function _createAvailabilityGroupSend(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  createAgConfiguration: AvailabilityGroupCreateUpdateConfiguration,
  options: SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/createAvailabilityGroup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlServerInstanceName: sqlServerInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: availabilityGroupCreateUpdateConfigurationSerializer(createAgConfiguration),
  });
}

export async function _createAvailabilityGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlServerAvailabilityGroupResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlServerAvailabilityGroupResourceDeserializer(result.body);
}

/** Create a SQL Server availability group */
export function createAvailabilityGroup(
  context: Client,
  resourceGroupName: string,
  sqlServerInstanceName: string,
  createAgConfiguration: AvailabilityGroupCreateUpdateConfiguration,
  options: SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<SqlServerAvailabilityGroupResource>,
  SqlServerAvailabilityGroupResource
> {
  return getLongRunningPoller(context, _createAvailabilityGroupDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createAvailabilityGroupSend(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        createAgConfiguration,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<
    OperationState<SqlServerAvailabilityGroupResource>,
    SqlServerAvailabilityGroupResource
  >;
}
