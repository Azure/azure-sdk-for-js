// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  _SensitivityLabelListResult,
  SensitivityLabel,
  SensitivityLabelUpdateList,
  SensitivityLabelSource,
  CurrentSensitivityLabelSource,
  RecommendedSensitivityLabelSource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _sensitivityLabelListResultDeserializer,
  sensitivityLabelSerializer,
  sensitivityLabelDeserializer,
  sensitivityLabelUpdateListSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams,
  ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams,
  ManagedDatabaseSensitivityLabelsDeleteOptionalParams,
  ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/sensitivityLabels{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24filter": options?.filter,
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_SensitivityLabelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sensitivityLabelListResultDeserializer(result.body);
}

/** Gets the sensitivity labels of a given database */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSensitivityLabelsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SensitivityLabel> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(context, resourceGroupName, managedInstanceName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listRecommendedByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/recommendedSensitivityLabels{?api%2Dversion,%24skipToken,includeDisabledRecommendations,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24skipToken": options?.skipToken,
      includeDisabledRecommendations: options?.includeDisabledRecommendations,
      "%24filter": options?.filter,
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

export async function _listRecommendedByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_SensitivityLabelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sensitivityLabelListResultDeserializer(result.body);
}

/** Gets the sensitivity labels of a given database */
export function listRecommendedByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SensitivityLabel> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listRecommendedByDatabaseSend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      ),
    _listRecommendedByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  parameters: SensitivityLabelUpdateList,
  options: ManagedDatabaseSensitivityLabelsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/currentSensitivityLabels{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: sensitivityLabelUpdateListSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update sensitivity labels of a given database using an operations batch. */
export async function update(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  parameters: SensitivityLabelUpdateList,
  options: ManagedDatabaseSensitivityLabelsUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _listCurrentByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/currentSensitivityLabels{?api%2Dversion,%24skipToken,%24count,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24skipToken": options?.skipToken,
      "%24count": options?.count,
      "%24filter": options?.filter,
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

export async function _listCurrentByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_SensitivityLabelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sensitivityLabelListResultDeserializer(result.body);
}

/** Gets the sensitivity labels of a given database */
export function listCurrentByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SensitivityLabel> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listCurrentByDatabaseSend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      ),
    _listCurrentByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _enableRecommendationSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: RecommendedSensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/enable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      columnName: columnName,
      sensitivityLabelSource: sensitivityLabelSource,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _enableRecommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns) */
export async function enableRecommendation(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: RecommendedSensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _enableRecommendationSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    schemaName,
    tableName,
    columnName,
    sensitivityLabelSource,
    options,
  );
  return _enableRecommendationDeserialize(result);
}

export function _disableRecommendationSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: RecommendedSensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      columnName: columnName,
      sensitivityLabelSource: sensitivityLabelSource,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableRecommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disables sensitivity recommendations on a given column */
export async function disableRecommendation(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: RecommendedSensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _disableRecommendationSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    schemaName,
    tableName,
    columnName,
    sensitivityLabelSource,
    options,
  );
  return _disableRecommendationDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: CurrentSensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      columnName: columnName,
      sensitivityLabelSource: sensitivityLabelSource,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the sensitivity label of a given column */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: CurrentSensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    schemaName,
    tableName,
    columnName,
    sensitivityLabelSource,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: CurrentSensitivityLabelSource,
  parameters: SensitivityLabel,
  options: ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      columnName: columnName,
      sensitivityLabelSource: sensitivityLabelSource,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sensitivityLabelSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SensitivityLabel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sensitivityLabelDeserializer(result.body);
}

/** Creates or updates the sensitivity label of a given column */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: CurrentSensitivityLabelSource,
  parameters: SensitivityLabel,
  options: ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SensitivityLabel> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    schemaName,
    tableName,
    columnName,
    sensitivityLabelSource,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: SensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      schemaName: schemaName,
      tableName: tableName,
      columnName: columnName,
      sensitivityLabelSource: sensitivityLabelSource,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SensitivityLabel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sensitivityLabelDeserializer(result.body);
}

/** Gets the sensitivity label of a given column */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  schemaName: string,
  tableName: string,
  columnName: string,
  sensitivityLabelSource: SensitivityLabelSource,
  options: ManagedDatabaseSensitivityLabelsGetOptionalParams = { requestOptions: {} },
): Promise<SensitivityLabel> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    schemaName,
    tableName,
    columnName,
    sensitivityLabelSource,
    options,
  );
  return _getDeserialize(result);
}
