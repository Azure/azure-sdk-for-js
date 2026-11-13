// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  CostControlPatch,
  ProjectCostControl,
  _ProjectCostControlListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  costControlPatchSerializer,
  projectCostControlSerializer,
  projectCostControlDeserializer,
  _projectCostControlListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProjectCostControlsListOptionalParams,
  ProjectCostControlsDeleteOptionalParams,
  ProjectCostControlsUpdateOptionalParams,
  ProjectCostControlsCreateOrUpdateOptionalParams,
  ProjectCostControlsCheckExistenceOptionalParams,
  ProjectCostControlsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  options: ProjectCostControlsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/costControls{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
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
): Promise<_ProjectCostControlListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _projectCostControlListResultDeserializer(result.body);
}

/** Lists project-owned cost controls. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  options: ProjectCostControlsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProjectCostControl> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, projectName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  options: ProjectCostControlsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
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

/** Deletes a project-owned cost control. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  options: ProjectCostControlsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    costControlName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  properties: CostControlPatch,
  options: ProjectCostControlsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: costControlPatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProjectCostControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return projectCostControlDeserializer(result.body);
}

/**
 * Updates a Foundry project cost control. Omitting properties preserves all existing cost control properties; setting properties to null or an empty object ({}) clears them all.
 * A non-empty properties object updates selected fields, preserving omitted fields; a successful update that leaves the cost control unchanged retains its entity tag.
 * The complete merged result may contain at most one notification, including disabled notifications, and one Block action.
 * Exceeding either limit returns HTTP 400 without changing the stored definition.
 */
export async function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  properties: CostControlPatch,
  options: ProjectCostControlsUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectCostControl> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    costControlName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  resource: ProjectCostControl,
  options: ProjectCostControlsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: projectCostControlSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProjectCostControl> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return projectCostControlDeserializer(result.body);
}

/**
 * Creates or replaces a project-owned cost control.
 * The definition may contain at most one notification, including disabled notifications, and one Block action.
 * Exceeding either limit returns HTTP 400 without persisting the request.
 */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  resource: ProjectCostControl,
  options: ProjectCostControlsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectCostControl> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    costControlName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  options: ProjectCostControlsCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks whether a project-owned cost control exists without returning its body. */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  options: ProjectCostControlsCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    costControlName,
    options,
  );
  return _checkExistenceDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  options: ProjectCostControlsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProjectCostControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return projectCostControlDeserializer(result.body);
}

/** Gets a project-owned cost control and its representation entity tag. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  costControlName: string,
  options: ProjectCostControlsGetOptionalParams = { requestOptions: {} },
): Promise<ProjectCostControl> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    costControlName,
    options,
  );
  return _getDeserialize(result);
}
