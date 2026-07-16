// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  DevBoxDefinition,
  DevBoxDefinitionUpdate,
  _DevBoxDefinitionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  devBoxDefinitionSerializer,
  devBoxDefinitionDeserializer,
  devBoxDefinitionUpdateSerializer,
  _devBoxDefinitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DevBoxDefinitionsListByProjectOptionalParams,
  DevBoxDefinitionsGetByProjectOptionalParams,
  DevBoxDefinitionsListByDevCenterOptionalParams,
  DevBoxDefinitionsDeleteOptionalParams,
  DevBoxDefinitionsUpdateOptionalParams,
  DevBoxDefinitionsCreateOrUpdateOptionalParams,
  DevBoxDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByProjectSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: DevBoxDefinitionsListByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/devboxdefinitions{?api%2Dversion,%24top}",
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

export async function _listByProjectDeserialize(
  result: PathUncheckedResponse,
): Promise<_DevBoxDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _devBoxDefinitionListResultDeserializer(result.body);
}

/** List Dev Box definitions configured for a project. */
export function listByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: DevBoxDefinitionsListByProjectOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevBoxDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProjectSend(context, resourceGroupName, projectName, options),
    _listByProjectDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getByProjectSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  devBoxDefinitionName: string,
  options: DevBoxDefinitionsGetByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/devboxdefinitions/{devBoxDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      devBoxDefinitionName: devBoxDefinitionName,
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

export async function _getByProjectDeserialize(
  result: PathUncheckedResponse,
): Promise<DevBoxDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return devBoxDefinitionDeserializer(result.body);
}

/** Gets a Dev Box definition configured for a project. */
export async function getByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  devBoxDefinitionName: string,
  options: DevBoxDefinitionsGetByProjectOptionalParams = { requestOptions: {} },
): Promise<DevBoxDefinition> {
  const result = await _getByProjectSend(
    context,
    resourceGroupName,
    projectName,
    devBoxDefinitionName,
    options,
  );
  return _getByProjectDeserialize(result);
}

export function _listByDevCenterSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: DevBoxDefinitionsListByDevCenterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
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

export async function _listByDevCenterDeserialize(
  result: PathUncheckedResponse,
): Promise<_DevBoxDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _devBoxDefinitionListResultDeserializer(result.body);
}

/** List Dev Box definitions for a devcenter. */
export function listByDevCenter(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: DevBoxDefinitionsListByDevCenterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevBoxDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDevCenterSend(context, resourceGroupName, devCenterName, options),
    _listByDevCenterDeserialize,
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
  devCenterName: string,
  devBoxDefinitionName: string,
  options: DevBoxDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      devBoxDefinitionName: devBoxDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

/** Deletes a Dev Box definition. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  devBoxDefinitionName: string,
  options: DevBoxDefinitionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, devCenterName, devBoxDefinitionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  devBoxDefinitionName: string,
  body: DevBoxDefinitionUpdate,
  options: DevBoxDefinitionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      devBoxDefinitionName: devBoxDefinitionName,
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
    body: devBoxDefinitionUpdateSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DevBoxDefinition> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return devBoxDefinitionDeserializer(result.body);
}

/** Partially updates a Dev Box definition. */
export function update(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  devBoxDefinitionName: string,
  body: DevBoxDefinitionUpdate,
  options: DevBoxDefinitionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DevBoxDefinition>, DevBoxDefinition> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, devCenterName, devBoxDefinitionName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<DevBoxDefinition>, DevBoxDefinition>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  devBoxDefinitionName: string,
  body: DevBoxDefinition,
  options: DevBoxDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      devBoxDefinitionName: devBoxDefinitionName,
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
    body: devBoxDefinitionSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DevBoxDefinition> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return devBoxDefinitionDeserializer(result.body);
}

/** Creates or updates a Dev Box definition. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  devBoxDefinitionName: string,
  body: DevBoxDefinition,
  options: DevBoxDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DevBoxDefinition>, DevBoxDefinition> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        devCenterName,
        devBoxDefinitionName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<DevBoxDefinition>, DevBoxDefinition>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  devBoxDefinitionName: string,
  options: DevBoxDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      devBoxDefinitionName: devBoxDefinitionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DevBoxDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return devBoxDefinitionDeserializer(result.body);
}

/** Gets a Dev Box definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  devBoxDefinitionName: string,
  options: DevBoxDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<DevBoxDefinition> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    devBoxDefinitionName,
    options,
  );
  return _getDeserialize(result);
}
