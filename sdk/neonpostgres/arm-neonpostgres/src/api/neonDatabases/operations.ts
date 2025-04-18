// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  NeonDatabase,
  neonDatabaseSerializer,
  neonDatabaseDeserializer,
  _NeonDatabaseListResult,
  _neonDatabaseListResultDeserializer,
} from "../../models/models.js";
import {
  NeonDatabasesListOptionalParams,
  NeonDatabasesDeleteOptionalParams,
  NeonDatabasesUpdateOptionalParams,
  NeonDatabasesCreateOrUpdateOptionalParams,
  NeonDatabasesGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  options: NeonDatabasesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
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
): Promise<_NeonDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _neonDatabaseListResultDeserializer(result.body);
}

/** List NeonDatabase resources by Branch */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  options: NeonDatabasesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeonDatabase> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, organizationName, projectName, branchName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  options: NeonDatabasesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonDatabases/{neonDatabaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonDatabaseName: neonDatabaseName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a NeonDatabase */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  options: NeonDatabasesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    branchName,
    neonDatabaseName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  properties: NeonDatabase,
  options: NeonDatabasesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonDatabases/{neonDatabaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonDatabaseName: neonDatabaseName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: neonDatabaseSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NeonDatabase> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return neonDatabaseDeserializer(result.body);
}

/** Update a NeonDatabase */
export function update(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  properties: NeonDatabase,
  options: NeonDatabasesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NeonDatabase>, NeonDatabase> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonDatabaseName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NeonDatabase>, NeonDatabase>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  resource: NeonDatabase,
  options: NeonDatabasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonDatabases/{neonDatabaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonDatabaseName: neonDatabaseName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: neonDatabaseSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NeonDatabase> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return neonDatabaseDeserializer(result.body);
}

/** Create a NeonDatabase */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  resource: NeonDatabase,
  options: NeonDatabasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NeonDatabase>, NeonDatabase> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonDatabaseName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NeonDatabase>, NeonDatabase>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  options: NeonDatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonDatabases/{neonDatabaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonDatabaseName: neonDatabaseName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NeonDatabase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return neonDatabaseDeserializer(result.body);
}

/** Get a NeonDatabase */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonDatabaseName: string,
  options: NeonDatabasesGetOptionalParams = { requestOptions: {} },
): Promise<NeonDatabase> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    branchName,
    neonDatabaseName,
    options,
  );
  return _getDeserialize(result);
}
