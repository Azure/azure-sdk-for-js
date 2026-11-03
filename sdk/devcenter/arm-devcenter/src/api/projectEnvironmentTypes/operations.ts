// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  ProjectEnvironmentType,
  ProjectEnvironmentTypeUpdate,
  _ProjectEnvironmentTypeListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  projectEnvironmentTypeSerializer,
  projectEnvironmentTypeDeserializer,
  projectEnvironmentTypeUpdateSerializer,
  _projectEnvironmentTypeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProjectEnvironmentTypesListOptionalParams,
  ProjectEnvironmentTypesDeleteOptionalParams,
  ProjectEnvironmentTypesUpdateOptionalParams,
  ProjectEnvironmentTypesCreateOrUpdateOptionalParams,
  ProjectEnvironmentTypesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ProjectEnvironmentTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/environmentTypes{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24top": options?.top,
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
): Promise<_ProjectEnvironmentTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _projectEnvironmentTypeListResultDeserializer(result.body);
}

/** Lists environment types for a project. */
export function list(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ProjectEnvironmentTypesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProjectEnvironmentType> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, projectName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  options: ProjectEnvironmentTypesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a project environment type. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  options: ProjectEnvironmentTypesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    projectName,
    environmentTypeName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  body: ProjectEnvironmentTypeUpdate,
  options: ProjectEnvironmentTypesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: projectEnvironmentTypeUpdateSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProjectEnvironmentType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return projectEnvironmentTypeDeserializer(result.body);
}

/** Partially updates a project environment type. */
export async function update(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  body: ProjectEnvironmentTypeUpdate,
  options: ProjectEnvironmentTypesUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectEnvironmentType> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    projectName,
    environmentTypeName,
    body,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  body: ProjectEnvironmentType,
  options: ProjectEnvironmentTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: projectEnvironmentTypeSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProjectEnvironmentType> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return projectEnvironmentTypeDeserializer(result.body);
}

/** Creates or updates a project environment type. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  body: ProjectEnvironmentType,
  options: ProjectEnvironmentTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectEnvironmentType> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    projectName,
    environmentTypeName,
    body,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  options: ProjectEnvironmentTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<ProjectEnvironmentType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return projectEnvironmentTypeDeserializer(result.body);
}

/** Gets a project environment type. */
export async function get(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  options: ProjectEnvironmentTypesGetOptionalParams = { requestOptions: {} },
): Promise<ProjectEnvironmentType> {
  const result = await _getSend(
    context,
    resourceGroupName,
    projectName,
    environmentTypeName,
    options,
  );
  return _getDeserialize(result);
}
