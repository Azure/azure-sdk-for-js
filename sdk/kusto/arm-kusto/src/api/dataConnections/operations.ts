// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext as Client } from "../index.js";
import type {
  CheckNameResult,
  DataConnectionUnion,
  _DataConnectionListResult,
  DataConnectionValidation,
  DataConnectionValidationListResult,
  DataConnectionCheckNameRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameResultDeserializer,
  dataConnectionUnionSerializer,
  dataConnectionUnionDeserializer,
  _dataConnectionListResultDeserializer,
  dataConnectionValidationSerializer,
  dataConnectionValidationListResultDeserializer,
  dataConnectionCheckNameRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataConnectionsCheckNameAvailabilityOptionalParams,
  DataConnectionsDataConnectionValidationOptionalParams,
  DataConnectionsListByDatabaseOptionalParams,
  DataConnectionsDeleteOptionalParams,
  DataConnectionsUpdateOptionalParams,
  DataConnectionsCreateOrUpdateOptionalParams,
  DataConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: DataConnectionCheckNameRequest,
  options: DataConnectionsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataConnectionCheckNameRequestSerializer(dataConnectionName),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameResultDeserializer(result.body);
}

/** Checks that the data connection name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: DataConnectionCheckNameRequest,
  options: DataConnectionsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    dataConnectionName,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _dataConnectionValidationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DataConnectionValidation,
  options: DataConnectionsDataConnectionValidationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnectionValidation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataConnectionValidationSerializer(parameters),
  });
}

export async function _dataConnectionValidationDeserialize(
  result: PathUncheckedResponse,
): Promise<DataConnectionValidationListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataConnectionValidationListResultDeserializer(result.body);
}

/** Checks that the data connection parameters are valid. */
export function dataConnectionValidation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DataConnectionValidation,
  options: DataConnectionsDataConnectionValidationOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<DataConnectionValidationListResult>,
  DataConnectionValidationListResult
> {
  return getLongRunningPoller(
    context,
    _dataConnectionValidationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _dataConnectionValidationSend(
          context,
          resourceGroupName,
          clusterName,
          databaseName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-14",
    },
  ) as PollerLike<
    OperationState<DataConnectionValidationListResult>,
    DataConnectionValidationListResult
  >;
}

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DataConnectionsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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
): Promise<_DataConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dataConnectionListResultDeserializer(result.body);
}

/** Returns the list of data connections of the given Kusto database. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DataConnectionsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataConnectionUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseSend(context, resourceGroupName, clusterName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  options: DataConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      dataConnectionName: dataConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

/** Deletes the data connection with the given name. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  options: DataConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  parameters: DataConnectionUnion,
  options: DataConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      dataConnectionName: dataConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataConnectionUnionSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataConnectionUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataConnectionUnionDeserializer(result.body);
}

/** Updates a data connection. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  parameters: DataConnectionUnion,
  options: DataConnectionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  parameters: DataConnectionUnion,
  options: DataConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      dataConnectionName: dataConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataConnectionUnionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataConnectionUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataConnectionUnionDeserializer(result.body);
}

/** Creates or updates a data connection. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  parameters: DataConnectionUnion,
  options: DataConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        dataConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<DataConnectionUnion>, DataConnectionUnion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  options: DataConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      dataConnectionName: dataConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DataConnectionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataConnectionUnionDeserializer(result.body);
}

/** Returns a data connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  dataConnectionName: string,
  options: DataConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<DataConnectionUnion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    dataConnectionName,
    options,
  );
  return _getDeserialize(result);
}
