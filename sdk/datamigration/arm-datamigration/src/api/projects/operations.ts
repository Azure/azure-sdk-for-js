// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext as Client } from "../index.js";
import type { Project, _ProjectList } from "../../models/models.js";
import {
  apiErrorDeserializer,
  projectSerializer,
  projectDeserializer,
  _projectListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ProjectsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ProjectList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return _projectListDeserializer(result.body);
}

/** The project resource is a nested resource representing a stored migration project. This method returns a list of projects owned by a service resource. */
export function list(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ProjectsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Project> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, groupName, serviceName, options),
    _listDeserialize,
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
  groupName: string,
  serviceName: string,
  projectName: string,
  options: ProjectsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}{?api%2Dversion,deleteRunningTasks}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      deleteRunningTasks: options?.deleteRunningTasks,
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
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The project resource is a nested resource representing a stored migration project. The DELETE method deletes a project. */
export async function $delete(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  options: ProjectsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, groupName, serviceName, projectName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  parameters: Project,
  options: ProjectsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
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
    body: projectSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Project> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectDeserializer(result.body);
}

/** The project resource is a nested resource representing a stored migration project. The PATCH method updates an existing project. */
export async function update(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  parameters: Project,
  options: ProjectsUpdateOptionalParams = { requestOptions: {} },
): Promise<Project> {
  const result = await _updateSend(
    context,
    groupName,
    serviceName,
    projectName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  parameters: Project,
  options: ProjectsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
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
    body: projectSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Project> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectDeserializer(result.body);
}

/** The project resource is a nested resource representing a stored migration project. The PUT method creates a new project or updates an existing one. */
export async function createOrUpdate(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  parameters: Project,
  options: ProjectsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Project> {
  const result = await _createOrUpdateSend(
    context,
    groupName,
    serviceName,
    projectName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  options: ProjectsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Project> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectDeserializer(result.body);
}

/** The project resource is a nested resource representing a stored migration project. The GET method retrieves information about a project. */
export async function get(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  options: ProjectsGetOptionalParams = { requestOptions: {} },
): Promise<Project> {
  const result = await _getSend(context, groupName, serviceName, projectName, options);
  return _getDeserialize(result);
}
