// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext as Client } from "../index.js";
import type {
  CheckNameResult,
  DatabaseUnion,
  _DatabaseListResult,
  DatabasePrincipalListResult,
  DatabasePrincipal,
  DatabasePrincipalListRequest,
  CheckNameRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameResultDeserializer,
  databaseUnionSerializer,
  databaseUnionDeserializer,
  _databaseListResultDeserializer,
  databasePrincipalListResultDeserializer,
  databasePrincipalListRequestSerializer,
  checkNameRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabasesCheckNameAvailabilityOptionalParams,
  DatabasesRemovePrincipalsOptionalParams,
  DatabasesAddPrincipalsOptionalParams,
  DatabasesListPrincipalsOptionalParams,
  DatabasesListByClusterOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesUpdateOptionalParams,
  DatabasesCreateOrUpdateOptionalParams,
  DatabasesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resourceName: CheckNameRequest,
  options: DatabasesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
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
    body: checkNameRequestSerializer(resourceName),
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

/** Checks that the databases resource name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resourceName: CheckNameRequest,
  options: DatabasesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    clusterName,
    resourceName,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _removePrincipalsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  databasePrincipalsToRemove: DatabasePrincipalListRequest,
  options: DatabasesRemovePrincipalsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/removePrincipals{?api%2Dversion}",
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
    body: databasePrincipalListRequestSerializer(databasePrincipalsToRemove),
  });
}

export async function _removePrincipalsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabasePrincipalListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databasePrincipalListResultDeserializer(result.body);
}

/** Remove Database principals permissions. */
export async function removePrincipals(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  databasePrincipalsToRemove: DatabasePrincipalListRequest,
  options: DatabasesRemovePrincipalsOptionalParams = { requestOptions: {} },
): Promise<DatabasePrincipalListResult> {
  const result = await _removePrincipalsSend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    databasePrincipalsToRemove,
    options,
  );
  return _removePrincipalsDeserialize(result);
}

export function _addPrincipalsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  databasePrincipalsToAdd: DatabasePrincipalListRequest,
  options: DatabasesAddPrincipalsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/addPrincipals{?api%2Dversion}",
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
    body: databasePrincipalListRequestSerializer(databasePrincipalsToAdd),
  });
}

export async function _addPrincipalsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabasePrincipalListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databasePrincipalListResultDeserializer(result.body);
}

/** Add Database principals permissions. */
export async function addPrincipals(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  databasePrincipalsToAdd: DatabasePrincipalListRequest,
  options: DatabasesAddPrincipalsOptionalParams = { requestOptions: {} },
): Promise<DatabasePrincipalListResult> {
  const result = await _addPrincipalsSend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    databasePrincipalsToAdd,
    options,
  );
  return _addPrincipalsDeserialize(result);
}

export function _listPrincipalsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesListPrincipalsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/listPrincipals{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPrincipalsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabasePrincipalListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databasePrincipalListResultDeserializer(result.body);
}

/** Returns a list of database principals of the given Kusto cluster and database. */
export function listPrincipals(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesListPrincipalsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabasePrincipal> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrincipalsSend(context, resourceGroupName, clusterName, databaseName, options),
    _listPrincipalsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: DatabasesListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases{?api%2Dversion,%24top,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
      "%24top": options?.top,
      "%24skiptoken": options?.skiptoken,
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _databaseListResultDeserializer(result.body);
}

/** Returns the list of databases of the given Kusto cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: DatabasesListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}{?api%2Dversion}",
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

/** Deletes the database with the given name. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, databaseName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseUnion,
  options: DatabasesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}{?api%2Dversion,callerRole}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
      callerRole: options?.callerRole,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseUnionSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DatabaseUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseUnionDeserializer(result.body);
}

/** Updates a database. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseUnion,
  options: DatabasesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseUnion>, DatabaseUnion> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, databaseName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<DatabaseUnion>, DatabaseUnion>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseUnion,
  options: DatabasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}{?api%2Dversion,callerRole}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
      callerRole: options?.callerRole,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseUnionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseUnionDeserializer(result.body);
}

/** Creates or updates a database. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseUnion,
  options: DatabasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseUnion>, DatabaseUnion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<DatabaseUnion>, DatabaseUnion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatabaseUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseUnionDeserializer(result.body);
}

/** Returns a database. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: DatabasesGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseUnion> {
  const result = await _getSend(context, resourceGroupName, clusterName, databaseName, options);
  return _getDeserialize(result);
}
