// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext as Client } from "../index.js";
import type { Project, _ProjectListResult, ConnectionUriProperties } from "../../models/models.js";
import {
  errorResponseDeserializer,
  projectSerializer,
  projectDeserializer,
  _projectListResultDeserializer,
  connectionUriPropertiesSerializer,
  connectionUriPropertiesDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProjectsGetConnectionUriOptionalParams,
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getConnectionUriSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  connectionUriParameters: ConnectionUriProperties,
  options: ProjectsGetConnectionUriOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/getConnectionUri{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: connectionUriPropertiesSerializer(connectionUriParameters),
  });
}

export async function _getConnectionUriDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionUriProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return connectionUriPropertiesDeserializer(result.body);
}

/** Action to retrieve the connection URI for the Neon Database. */
export async function getConnectionUri(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  connectionUriParameters: ConnectionUriProperties,
  options: ProjectsGetConnectionUriOptionalParams = { requestOptions: {} },
): Promise<ConnectionUriProperties> {
  const result = await _getConnectionUriSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    connectionUriParameters,
    options,
  );
  return _getConnectionUriDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: ProjectsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ProjectListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _projectListResultDeserializer(result.body);
}

/** List Project resources by OrganizationResource */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: ProjectsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Project> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, organizationName, options),
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
  options: ProjectsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Delete a Project */
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
  options: ProjectsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  resource: Project,
  options: ProjectsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
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
    body: projectSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Project> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return projectDeserializer(result.body);
}

/** Create a Project */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  resource: Project,
  options: ProjectsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Project>, Project> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Project>, Project>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  options: ProjectsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Project> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return projectDeserializer(result.body);
}

/** Get a Project */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  options: ProjectsGetOptionalParams = { requestOptions: {} },
): Promise<Project> {
  const result = await _getSend(context, resourceGroupName, organizationName, projectName, options);
  return _getDeserialize(result);
}
