// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type {
  ConfigTemplateVersion,
  _ConfigTemplateVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  configTemplateVersionSerializer,
  configTemplateVersionDeserializer,
  _configTemplateVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigTemplateVersionsListByConfigTemplateOptionalParams,
  ConfigTemplateVersionsDeleteOptionalParams,
  ConfigTemplateVersionsUpdateOptionalParams,
  ConfigTemplateVersionsCreateOrUpdateOptionalParams,
  ConfigTemplateVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByConfigTemplateSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplateVersionsListByConfigTemplateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listByConfigTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfigTemplateVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _configTemplateVersionListResultDeserializer(result.body);
}

/** List Config Template Version Resources */
export function listByConfigTemplate(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplateVersionsListByConfigTemplateOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigTemplateVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConfigTemplateSend(context, resourceGroupName, configTemplateName, options),
    _listByConfigTemplateDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      configTemplateVersionName: configTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

/** Delete a Config Template Version Resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateVersionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  properties: ConfigTemplateVersion,
  options: ConfigTemplateVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      configTemplateVersionName: configTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configTemplateVersionSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigTemplateVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateVersionDeserializer(result.body);
}

/** Update a Config Template Version Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  properties: ConfigTemplateVersion,
  options: ConfigTemplateVersionsUpdateOptionalParams = { requestOptions: {} },
): Promise<ConfigTemplateVersion> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    configTemplateName,
    configTemplateVersionName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  resource: ConfigTemplateVersion,
  options: ConfigTemplateVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      configTemplateVersionName: configTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configTemplateVersionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigTemplateVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateVersionDeserializer(result.body);
}

/** Create or update a Config Template Version Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  resource: ConfigTemplateVersion,
  options: ConfigTemplateVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConfigTemplateVersion>, ConfigTemplateVersion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateVersionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<ConfigTemplateVersion>, ConfigTemplateVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      configTemplateVersionName: configTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<ConfigTemplateVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateVersionDeserializer(result.body);
}

/** Get a Config Template Version Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ConfigTemplateVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    configTemplateName,
    configTemplateVersionName,
    options,
  );
  return _getDeserialize(result);
}
